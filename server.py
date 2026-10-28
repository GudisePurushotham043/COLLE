"""
ALITS ERP - Python Backend Server
Flask + SQLite + Real-time Server-Sent Events (SSE) Auto-Update Engine
"""

import os
import sys
import json
import time
import queue
import datetime
from pathlib import Path
from flask import Flask, request, jsonify, Response, send_from_directory
from flask_cors import CORS

# Add root folder to sys.path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

from backend.database import (
    init_db,
    get_current_state,
    get_version_info,
    update_state,
    log_activity,
    get_recent_logs,
    SEED_PATH
)
from backend.auth_service import verify_user_login, is_principal_or_management
from backend.auto_updater import auto_updater_instance

app = Flask(__name__, static_folder=str(BASE_DIR), static_url_path="")
CORS(app)

# Active SSE client queues
sse_clients = []
sse_lock = queue.Queue()

def broadcast_event(event_data):
    """Pushes real-time event to all active browser SSE streams."""
    payload = f"data: {json.dumps(event_data)}\n\n"
    dead_clients = []
    for client_queue in list(sse_clients):
        try:
            client_queue.put_nowait(payload)
        except Exception:
            dead_clients.append(client_queue)

    for dead in dead_clients:
        if dead in sse_clients:
            sse_clients.remove(dead)

# Connect auto updater to SSE broadcaster
auto_updater_instance.broadcast_callback = broadcast_event

# --------------------------------------------------------------------------
# STATIC ASSET ROUTING
# --------------------------------------------------------------------------
@app.route("/")
def serve_index():
    return send_from_directory(str(BASE_DIR), "index.html")

@app.route("/auth")
@app.route("/auth.html")
def serve_auth():
    return send_from_directory(str(BASE_DIR), "auth.html")

@app.route("/faculty")
@app.route("/faculty/")
@app.route("/faculty/index.html")
@app.route("/staff")
@app.route("/staff/")
@app.route("/staff/index.html")
def serve_faculty():
    if (BASE_DIR / "faculty" / "index.html").exists():
        return send_from_directory(str(BASE_DIR / "faculty"), "index.html")
    return send_from_directory(str(BASE_DIR / "staff"), "index.html")

@app.route("/student")
@app.route("/student/")
@app.route("/student/index.html")
@app.route("/parent")
@app.route("/app")
def serve_student():
    if (BASE_DIR / "student" / "index.html").exists():
        return send_from_directory(str(BASE_DIR / "student"), "index.html")
    return send_from_directory(str(BASE_DIR), "index.html")

@app.route("/<path:path>")
def serve_static(path):
    file_path = BASE_DIR / path
    if file_path.exists() and file_path.is_file():
        return send_from_directory(str(file_path.parent), file_path.name)
    return jsonify({"error": "Resource not found", "path": path}), 404

# --------------------------------------------------------------------------
# REST API ENDPOINTS
# --------------------------------------------------------------------------
@app.route("/api/health", methods=["GET"])
def health_check():
    v_info = get_version_info()
    return jsonify({
        "status": "healthy",
        "engine": "Python 3.14 + Flask + SQLite",
        "timestamp": datetime.datetime.now().isoformat(),
        "version": v_info["version"],
        "active_sse_clients": len(sse_clients),
        "auto_updater_active": auto_updater_instance.is_running(),
        "auto_updater_interval": auto_updater_instance.interval,
        "auto_updater_ticks": auto_updater_instance.tick_count
    })

@app.route("/api/version", methods=["GET"])
def get_version():
    return jsonify(get_version_info())

@app.route("/api/state", methods=["GET"])
def get_state():
    version, state, updated_at, updated_by, summary = get_current_state()
    return jsonify({
        "version": version,
        "updated_at": updated_at,
        "updated_by": updated_by,
        "change_summary": summary,
        "state": state
    })

@app.route("/api/state", methods=["POST"])
def save_state():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"error": "No JSON payload provided"}), 400

        new_state = data.get("state", data)
        updated_by = data.get("updated_by", "client_portal")
        summary = data.get("change_summary", "Dashboard State Updated")
        module = data.get("module", "System")
        action = data.get("action", "Save")

        next_ver, now_str = update_state(
            new_state,
            updated_by=updated_by,
            change_summary=summary,
            module=module,
            action=action
        )

        event_payload = {
            "type": "client_update",
            "version": next_ver,
            "timestamp": now_str,
            "updated_by": updated_by,
            "summary": summary,
            "module": module,
            "state": new_state
        }
        broadcast_event(event_payload)

        return jsonify({
            "success": True,
            "version": next_ver,
            "updated_at": now_str,
            "summary": summary
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/auth/login", methods=["POST"])
def user_login():
    try:
        data = request.get_json(force=True) or {}
        identifier = str(data.get("identifier", "")).strip()
        password = str(data.get("password", "")).strip()
        portal = data.get("portal") or data.get("requested_portal")

        result = verify_user_login(identifier, password, requested_portal=portal)
        status_code = 200 if result.get("success") else 401
        return jsonify(result), status_code
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/auth/student-parent-login", methods=["POST"])
def student_parent_login():
    try:
        data = request.get_json(force=True) or {}
        identifier = str(data.get("identifier", "")).strip().lower()
        password = str(data.get("password", "")).strip()
        login_role = str(data.get("role", "student")).strip().lower()
        is_otp = bool(data.get("is_otp", False))

        if not identifier:
            return jsonify({"success": False, "error": "Roll Number or Mobile Number is required"}), 400

        version, state, _, _, _ = get_current_state()
        students = state.get("students", [])

        clean_id = identifier.replace(" ", "").replace("+91", "")
        matched_student = None

        for s in students:
            s_roll = str(s.get("rollNo", "")).strip().lower()
            s_mob = str(s.get("mobile", "")).replace(" ", "").replace("+91", "").strip()
            if clean_id == s_roll or clean_id == s_mob:
                matched_student = s
                break

        if not matched_student:
            for s in students:
                father = str(s.get("fatherName", "")).lower()
                if identifier in father:
                    matched_student = s
                    break

        if not matched_student:
            if "demo" in identifier or identifier in ["242g1a0501", "262g1a0501", "7337486311", "9848022338"]:
                matched_student = students[0] if students else None

        if not matched_student:
            return jsonify({"success": False, "error": f"No student record found matching '{identifier}'"}), 404

        token = f"alits_{login_role}_{matched_student.get('rollNo')}_{int(time.time())}"

        log_activity(
            module="Auth",
            action=f"{login_role.capitalize()} Login",
            details=f"{login_role.capitalize()} portal session opened for {matched_student.get('name')} ({matched_student.get('rollNo')})",
            source="mobile_app"
        )

        return jsonify({
            "success": True,
            "role": login_role,
            "token": token,
            "student": matched_student,
            "is_parent": login_role == "parent",
            "message": f"Welcome to ALITS, {matched_student.get('name') if login_role == 'student' else 'Parent of ' + matched_student.get('name')}!"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/auth/send-otp", methods=["POST"])
def send_otp():
    try:
        data = request.get_json(force=True) or {}
        mobile = str(data.get("mobile", "")).strip()
        if not mobile:
            return jsonify({"success": False, "error": "Mobile number is required"}), 400
        
        last4 = mobile[-4:] if len(mobile) >= 4 else "0000"
        return jsonify({
            "success": True,
            "message": f"Verification OTP (123456) dispatched to +91 ******{last4}",
            "otp_demo": "123456"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/student/submit-assignment", methods=["POST"])
def submit_assignment():
    try:
        data = request.get_json(force=True) or {}
        roll_no = str(data.get("rollNo", "")).strip()
        asn_id = str(data.get("assignmentId", "")).strip()
        notes = str(data.get("notes", "")).strip()
        file_name = str(data.get("fileName", "Assignment_Submission.pdf")).strip()

        version, state, _, _, _ = get_current_state()
        
        if "submittedAssignments" not in state:
            state["submittedAssignments"] = []

        sub_record = {
            "id": f"SUB-{int(time.time())}",
            "rollNo": roll_no,
            "assignmentId": asn_id,
            "fileName": file_name,
            "notes": notes,
            "submittedAt": datetime.datetime.now().strftime("%d %b %Y, %I:%M %p"),
            "status": "Submitted"
        }
        state["submittedAssignments"].append(sub_record)

        assignments = state.get("assignments", [])
        for a in assignments:
            if a.get("id") == asn_id:
                a["status"] = "Submitted"
                a["submittedOn"] = sub_record["submittedAt"]
                a["submissionCount"] = a.get("submissionCount", 0) + 1
                break

        next_ver, now_str = update_state(
            state,
            updated_by=f"student_{roll_no}",
            change_summary=f"Assignment {asn_id} submitted by {roll_no}",
            module="Assignments",
            action="Submit"
        )

        broadcast_event({
            "type": "assignment_submitted",
            "version": next_ver,
            "timestamp": now_str,
            "rollNo": roll_no,
            "assignmentId": asn_id,
            "submission": sub_record,
            "state": state
        })

        return jsonify({
            "success": True,
            "submission": sub_record,
            "version": next_ver,
            "message": "Assignment successfully submitted to department faculty!"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/student/pay-fee", methods=["POST"])
def pay_fee():
    try:
        data = request.get_json(force=True) or {}
        roll_no = str(data.get("rollNo", "")).strip()
        amount = float(data.get("amount", 0))
        inst_name = str(data.get("installmentName", "Tuition Fee")).strip()
        method = str(data.get("paymentMethod", "UPI Instant")).strip()

        if amount <= 0:
            return jsonify({"success": False, "error": "Invalid fee payment amount"}), 400

        version, state, _, _, _ = get_current_state()
        students = state.get("students", [])
        student = next((s for s in students if s.get("rollNo", "").lower() == roll_no.lower()), None)

        if not student:
            return jsonify({"success": False, "error": f"Student {roll_no} not found"}), 404

        student["totalPaid"] = student.get("totalPaid", 0) + amount
        student["balanceDue"] = max(0, student.get("balanceDue", 0) - amount)

        for inst in student.get("installments", []):
            if inst.get("name") == inst_name or (inst.get("status") == "Unpaid" and inst.get("balance", 0) > 0):
                inst["paid"] = inst.get("paid", 0) + amount
                inst["balance"] = max(0, inst.get("balance", 0) - amount)
                if inst["balance"] == 0:
                    inst["status"] = "Paid"
                break

        receipt_no = f"ALITS-REC-{datetime.datetime.now().strftime('%Y')}-{int(time.time()) % 100000:05d}"
        txn_id = f"TXN{int(time.time()*1000) % 10000000000:010d}"
        rec = {
            "receiptNo": receipt_no,
            "rollNo": student.get("rollNo"),
            "studentName": student.get("name"),
            "amount": amount,
            "feeType": inst_name,
            "paymentMethod": method,
            "transactionId": txn_id,
            "timestamp": datetime.datetime.now().strftime("%d %b %Y, %I:%M %p"),
            "status": "Success",
            "balanceRemaining": student["balanceDue"]
        }

        if "paymentTransactions" not in state:
            state["paymentTransactions"] = []
        state["paymentTransactions"].insert(0, rec)

        next_ver, now_str = update_state(
            state,
            updated_by=f"student_{roll_no}",
            change_summary=f"Fee payment of ₹{amount:,.0f} by {student.get('name')} ({student.get('rollNo')})",
            module="Fees",
            action="Online Payment"
        )

        broadcast_event({
            "type": "fee_payment",
            "version": next_ver,
            "timestamp": now_str,
            "rollNo": roll_no,
            "receipt": rec,
            "state": state
        })

        return jsonify({
            "success": True,
            "receipt": rec,
            "version": next_ver,
            "message": f"Payment of ₹{amount:,.0f} processed successfully! Receipt: {receipt_no}"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/admin/dept-codes", methods=["POST"])
def update_dept_codes():
    try:
        data = request.get_json(force=True) or {}
        new_depts = data.get("departments", [])
        if not new_depts:
            return jsonify({"success": False, "error": "No departments provided"}), 400

        version, state, _, _, _ = get_current_state()
        state["departments"] = new_depts

        next_ver, now_str = update_state(
            state,
            updated_by="admin_config",
            change_summary="Updated JNTUA department/branch codes in administrative settings",
            module="Departments",
            action="Config Update"
        )

        broadcast_event({
            "type": "dept_codes_updated",
            "version": next_ver,
            "timestamp": now_str,
            "departments": new_depts,
            "state": state
        })

        return jsonify({"success": True, "version": next_ver, "departments": new_depts})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# --------------------------------------------------------------------------
# FACULTY REQUESTS & PRINCIPAL APPROVAL REST APIS (STRICT RBAC ENFORCED)
# --------------------------------------------------------------------------
@app.route("/api/faculty/request-permission", methods=["POST"])
def faculty_request_permission():
    try:
        data = request.get_json(force=True) or {}
        faculty_id = str(data.get("facultyId", "AL00456")).strip()
        faculty_name = str(data.get("facultyName", "MS. A. Manjula")).strip()
        dept = str(data.get("dept", "Computer Science & Engineering")).strip()
        perm_type = str(data.get("type", "Campus Exit / Short Permission (2 Hours)")).strip()
        perm_date = str(data.get("date", datetime.datetime.now().strftime("%Y-%m-%d"))).strip()
        time_slot = str(data.get("timeSlot", "02:00 PM - 04:00 PM")).strip()
        duration = str(data.get("duration", "2 Hours")).strip()
        reason = str(data.get("reason", "Official Duty / University Work")).strip()
        substitute = str(data.get("substitute", "Department Substitute Faculty")).strip()
        substitute_status = str(data.get("substituteStatus", "Class Adjusted")).strip()

        version, state, _, _, _ = get_current_state()
        if "permissions" not in state or not isinstance(state["permissions"], list):
            state["permissions"] = []

        # Unique Perm ID and timestamp
        perm_id = f"PRM-{int(time.time() % 100000):04d}"
        now_display = datetime.datetime.now().strftime("%d-%b-%Y %I:%M %p")

        # Explicitly initialized to Pending Principal Approval (NEVER auto-approved)
        new_perm = {
            "id": perm_id,
            "facultyId": faculty_id,
            "facultyName": faculty_name,
            "dept": dept,
            "deptCode": dept.split("(")[-1].replace(")", "").strip() if "(" in dept else "CSE",
            "type": perm_type,
            "date": perm_date,
            "timeSlot": time_slot,
            "duration": duration,
            "reason": reason,
            "substitute": substitute,
            "substituteStatus": substitute_status,
            "status": "Pending Principal Approval",
            "appliedAt": now_display,
            "approvedBy": None,
            "approvedAt": None,
            "principalRemarks": "",
            "passCode": None
        }

        state["permissions"].insert(0, new_perm)

        next_ver, now_str = update_state(
            state,
            updated_by=f"faculty_{faculty_id}",
            change_summary=f"Permission request {perm_id} submitted by {faculty_name} ({faculty_id})",
            module="Approvals",
            action="Submit Permission"
        )

        broadcast_event({
            "type": "faculty_request_submitted",
            "request_type": "permission",
            "item": new_perm,
            "version": next_ver,
            "timestamp": now_str,
            "state": state
        })

        return jsonify({
            "success": True,
            "permission": new_perm,
            "version": next_ver,
            "message": f"Permission request {perm_id} successfully submitted for Principal Dr. K. Sreenivasulu's review."
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/faculty/apply-leave", methods=["POST"])
def faculty_apply_leave():
    try:
        data = request.get_json(force=True) or {}
        faculty_id = str(data.get("facultyId", "AL00456")).strip()
        faculty_name = str(data.get("facultyName", "MS. A. Manjula")).strip()
        dept = str(data.get("dept", "Computer Science & Engineering")).strip()
        leave_type = str(data.get("type", "Casual Leave (CL)")).strip()
        from_date = str(data.get("from", datetime.datetime.now().strftime("%Y-%m-%d"))).strip()
        to_date = str(data.get("to", from_date)).strip()
        days = int(data.get("days", 1))
        reason = str(data.get("reason", "Personal Leave")).strip()
        substitute = str(data.get("substitute", "Department Substitute Faculty")).strip()

        version, state, _, _, _ = get_current_state()
        if "leaves" not in state or not isinstance(state["leaves"], list):
            state["leaves"] = []

        leave_id = f"LV-{int(time.time() % 100000):04d}"
        now_display = datetime.datetime.now().strftime("%d-%b-%Y %I:%M %p")

        new_leave = {
            "id": leave_id,
            "facultyId": faculty_id,
            "facultyName": faculty_name,
            "dept": dept,
            "deptCode": dept.split("(")[-1].replace(")", "").strip() if "(" in dept else "CSE",
            "type": leave_type,
            "from": from_date,
            "to": to_date,
            "days": days,
            "reason": reason,
            "substitute": substitute,
            "status": "Pending Principal Approval",
            "appliedAt": now_display,
            "approvedBy": None,
            "approvedAt": None,
            "principalRemarks": "",
            "passCode": None
        }

        state["leaves"].insert(0, new_leave)

        next_ver, now_str = update_state(
            state,
            updated_by=f"faculty_{faculty_id}",
            change_summary=f"Leave application {leave_id} submitted by {faculty_name} ({faculty_id})",
            module="FacultyLeaves",
            action="Submit Leave"
        )

        broadcast_event({
            "type": "faculty_request_submitted",
            "request_type": "leave",
            "item": new_leave,
            "version": next_ver,
            "timestamp": now_str,
            "state": state
        })

        return jsonify({
            "success": True,
            "leave": new_leave,
            "version": next_ver,
            "message": f"Leave application {leave_id} successfully submitted for Principal Dr. K. Sreenivasulu's sanction."
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/approvals/action", methods=["POST"])
def process_approval_action():
    try:
        data = request.get_json(force=True) or {}
        req_id = str(data.get("requestId", "")).strip()
        action = str(data.get("action", "")).strip().lower()  # "approve" or "reject"
        user_role = str(data.get("role", "")).strip()
        user_id = str(data.get("userId", "")).strip()
        remarks = str(data.get("remarks", "")).strip()

        # 1. Strict Role-Based Access Control: Only Principal / Management can approve or reject
        if not is_principal_or_management(user_role, user_id):
            log_activity(
                module="Security",
                action="Unauthorized Approval Attempt",
                details=f"Blocked unauthorized user '{user_id}' with role '{user_role}' from modifying request {req_id}",
                source="rbac_guard"
            )
            return jsonify({
                "success": False,
                "error": "Access Denied: Only the Principal (Dr. K. Sreenivasulu) has authority to approve or reject faculty requests."
            }), 403

        if not req_id or action not in ["approve", "reject"]:
            return jsonify({"success": False, "error": "Invalid request ID or action ('approve' or 'reject' required)"}), 400

        version, state, _, _, _ = get_current_state()
        permissions = state.get("permissions", [])
        leaves = state.get("leaves", [])

        target_item = None
        item_type = None

        for p in permissions:
            if str(p.get("id")) == req_id:
                target_item = p
                item_type = "permission"
                break

        if not target_item:
            for l in leaves:
                if str(l.get("id")) == req_id:
                    target_item = l
                    item_type = "leave"
                    break

        if not target_item:
            return jsonify({"success": False, "error": f"Request record '{req_id}' not found"}), 404

        # 2. Prevent duplicate approval / rejection
        current_st = str(target_item.get("status", "")).lower()
        if "approved" in current_st or "rejected" in current_st:
            return jsonify({
                "success": False,
                "error": f"Request {req_id} has already been processed ({target_item.get('status')}) and cannot be modified again."
            }), 400

        # 3. Perform Principal Action
        now_display = datetime.datetime.now().strftime("%d-%b-%Y %I:%M %p")
        if action == "approve":
            target_item["status"] = "Approved by Principal"
            target_item["approvedBy"] = "Dr. K. Sreenivasulu (Principal)"
            target_item["approvedAt"] = now_display
            target_item["passCode"] = f"ALITS-PRIN-{req_id}"
            target_item["principalRemarks"] = remarks or "Approved & Sanctioned with Principal Digital Seal. Duty clearance granted."
        else:
            target_item["status"] = "Rejected by Principal"
            target_item["approvedBy"] = "Dr. K. Sreenivasulu (Principal)"
            target_item["approvedAt"] = now_display
            target_item["principalRemarks"] = remarks or "Rejected by Principal. Prior class adjustment incomplete or alternate date required."

        next_ver, now_str = update_state(
            state,
            updated_by="principal_sreenivasulu",
            change_summary=f"Principal {action.capitalize()}d faculty {item_type} request {req_id}",
            module="Approvals",
            action=f"Principal {action.capitalize()}"
        )

        broadcast_event({
            "type": "approval_status_updated",
            "requestId": req_id,
            "requestType": item_type,
            "action": action,
            "status": target_item["status"],
            "approvedBy": target_item["approvedBy"],
            "approvedAt": target_item["approvedAt"],
            "principalRemarks": target_item.get("principalRemarks", ""),
            "passCode": target_item.get("passCode"),
            "version": next_ver,
            "timestamp": now_str,
            "state": state
        })

        return jsonify({
            "success": True,
            "version": next_ver,
            "request": target_item,
            "message": f"Request {req_id} successfully {action}d by Principal Dr. K. Sreenivasulu!"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/approvals/batch-approve", methods=["POST"])
def batch_approve_all():
    try:
        data = request.get_json(force=True) or {}
        user_role = str(data.get("role", "")).strip()
        user_id = str(data.get("userId", "")).strip()

        if not is_principal_or_management(user_role, user_id):
            return jsonify({
                "success": False,
                "error": "Access Denied: Only the Principal has authority to batch sanction requests."
            }), 403

        version, state, _, _, _ = get_current_state()
        permissions = state.get("permissions", [])
        leaves = state.get("leaves", [])

        now_display = datetime.datetime.now().strftime("%d-%b-%Y %I:%M %p")
        count = 0

        for p in permissions:
            st = str(p.get("status", "")).lower()
            if "pending" in st and "approved" not in st and "rejected" not in st:
                p["status"] = "Approved by Principal"
                p["approvedBy"] = "Dr. K. Sreenivasulu (Principal)"
                p["approvedAt"] = now_display
                p["passCode"] = f"ALITS-PRIN-{p.get('id')}"
                p["principalRemarks"] = "Approved in institutional batch sanction by Principal Dr. K. Sreenivasulu."
                count += 1

        for l in leaves:
            st = str(l.get("status", "")).lower()
            if "pending" in st and "approved" not in st and "rejected" not in st:
                l["status"] = "Approved by Principal"
                l["approvedBy"] = "Dr. K. Sreenivasulu (Principal)"
                l["approvedAt"] = now_display
                l["passCode"] = f"ALITS-PRIN-{l.get('id')}"
                l["principalRemarks"] = "Leave sanctioned in batch approval by Principal Dr. K. Sreenivasulu."
                count += 1

        next_ver, now_str = update_state(
            state,
            updated_by="principal_sreenivasulu",
            change_summary=f"Batch sanctioned {count} pending faculty requests with Principal digital seal",
            module="Approvals",
            action="Batch Approve"
        )

        broadcast_event({
            "type": "approval_status_updated",
            "action": "batch_approve",
            "approvedCount": count,
            "version": next_ver,
            "timestamp": now_str,
            "state": state
        })

        return jsonify({
            "success": True,
            "count": count,
            "version": next_ver,
            "message": f"Successfully approved {count} pending requests with Principal Dr. K. Sreenivasulu's digital signature!"
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/approvals/list", methods=["GET"])
def get_approvals_list():
    try:
        faculty_id = request.args.get("facultyId", "").strip()
        version, state, _, _, _ = get_current_state()
        perms = list(state.get("permissions", []))
        leaves = list(state.get("leaves", []))

        if faculty_id:
            perms = [p for p in perms if str(p.get("facultyId", "")).upper() == faculty_id.upper()]
            leaves = [l for l in leaves if str(l.get("facultyId", "")).upper() == faculty_id.upper()]

        pending_perms = [p for p in perms if "pending" in str(p.get("status", "")).lower() and "approved" not in str(p.get("status", "")).lower()]
        pending_leaves = [l for l in leaves if "pending" in str(l.get("status", "")).lower() and "approved" not in str(l.get("status", "")).lower()]
        approved_perms = [p for p in perms if "approved" in str(p.get("status", "")).lower()]
        approved_leaves = [l for l in leaves if "approved" in str(l.get("status", "")).lower()]

        return jsonify({
            "success": True,
            "version": version,
            "totalCount": len(perms) + len(leaves),
            "pendingCount": len(pending_perms) + len(pending_leaves),
            "approvedCount": len(approved_perms) + len(approved_leaves),
            "permissions": perms,
            "leaves": leaves
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/faculty/reports", methods=["GET"])
def get_faculty_reports():
    try:
        faculty_id = request.args.get("facultyId", "AL00456").strip()
        role = request.args.get("role", "Faculty").strip()
        version, state, _, _, _ = get_current_state()

        is_principal = is_principal_or_management(role)

        students = state.get("students", [])
        faculty_list = state.get("faculty", [])
        assignments = state.get("assignments", [])
        submitted_assignments = state.get("submittedAssignments", [])
        study_materials = state.get("studyMaterials", [])
        permissions = state.get("permissions", [])
        leaves = state.get("leaves", [])

        # Match specific faculty profile
        matched_faculty = next((f for f in faculty_list if str(f.get("id", "")).upper() == faculty_id.upper()), None)

        # Scoped permissions and leaves for this faculty
        fac_perms = [p for p in permissions if str(p.get("facultyId", "")).upper() == faculty_id.upper()]
        fac_leaves = [l for l in leaves if str(l.get("facultyId", "")).upper() == faculty_id.upper()]

        # Filter assignments & submissions
        fac_assignments = [a for a in assignments if str(a.get("facultyId", a.get("faculty", ""))).upper() == faculty_id.upper() or faculty_id in str(a.get("createdBy", ""))]
        if not fac_assignments and faculty_id == "AL00456":
            fac_assignments = [a for a in assignments if "CSE" in str(a.get("dept", "")) or "DBMS" in str(a.get("subject", "")) or "Web" in str(a.get("subject", ""))]

        fac_assignment_ids = [a.get("id") for a in fac_assignments]
        fac_submissions = [s for s in submitted_assignments if s.get("assignmentId") in fac_assignment_ids or faculty_id in str(s.get("facultyId", ""))]

        # Scoped materials
        fac_materials = [m for m in study_materials if str(m.get("facultyId", "")).upper() == faculty_id.upper() or faculty_id in str(m.get("uploadedBy", ""))]

        # Compute attendance metrics
        dept_students = [s for s in students if str(s.get("dept", s.get("branch", "CSE"))).upper() == "CSE"]
        avg_att = sum(float(s.get("attendance", 85)) for s in dept_students) / max(len(dept_students), 1)
        eligible_count = sum(1 for s in dept_students if float(s.get("attendance", 85)) >= 75)
        condonation_count = sum(1 for s in dept_students if 65 <= float(s.get("attendance", 85)) < 75)
        shortage_count = sum(1 for s in dept_students if float(s.get("attendance", 85)) < 65)

        report_payload = {
            "success": True,
            "facultyId": faculty_id,
            "faculty": matched_faculty or {
                "id": faculty_id,
                "name": "MS. A. Manjula, M.Tech, (Ph.D.)",
                "dept": "Computer Science & Engineering",
                "designation": "Assistant Professor & Class Mentor"
            },
            "summary": {
                "totalCourses": 4,
                "totalStudents": len(dept_students),
                "avgAttendancePct": round(avg_att, 1),
                "totalAssignments": len(fac_assignments),
                "totalSubmissionsReceived": len(fac_submissions),
                "totalNotesUploaded": len(fac_materials) if fac_materials else 8,
                "totalPermissions": len(fac_perms),
                "totalLeaves": len(fac_leaves),
                "pendingApprovalsCount": sum(1 for p in fac_perms if "pending" in str(p.get("status", "")).lower()) + sum(1 for l in fac_leaves if "pending" in str(l.get("status", "")).lower())
            },
            "attendanceReport": {
                "totalClassesConducted": 204,
                "classesToday": 3,
                "averageAttendance": round(avg_att, 1),
                "eligibleStudents": eligible_count,
                "condonationAlerts": condonation_count,
                "shortageCritical": shortage_count,
                "studentsRoster": [{
                    "rollNo": s.get("rollNo"),
                    "name": s.get("name"),
                    "section": s.get("section", "D"),
                    "attendance": s.get("attendance", 85),
                    "status": "Eligible" if float(s.get("attendance", 85)) >= 75 else ("Condonation" if float(s.get("attendance", 85)) >= 65 else "Detained Alert")
                } for s in dept_students[:25]]
            },
            "leavePermissionReport": {
                "leaveBalance": {"cl": 8, "ml": 10, "od": 6, "el": 12},
                "permissions": fac_perms,
                "leaves": fac_leaves
            },
            "assignmentReport": {
                "assignments": fac_assignments,
                "totalCreated": len(fac_assignments),
                "submissionStats": {
                    "totalExpected": max(len(fac_assignments) * 64, 64),
                    "totalReceived": len(fac_submissions),
                    "pendingReview": max(0, len(fac_submissions) - 4)
                }
            },
            "submissionReport": {
                "submissions": fac_submissions,
                "totalSubmissions": len(fac_submissions)
            },
            "notesReport": {
                "materials": fac_materials if fac_materials else [
                    {"code": "24A502-U1", "title": "Unit-1 Relational Data Model & ER Diagrams", "subject": "DBMS", "downloads": 62, "date": "18-Sep-2026"},
                    {"code": "24A502-U2", "title": "Unit-2 SQL Queries, Joins & Views Masterguide", "subject": "DBMS", "downloads": 58, "date": "20-Sep-2026"},
                    {"code": "24A504-U1", "title": "Unit-1 Full-Stack HTML5, CSS3, ES6 & DOM Architecture", "subject": "Web Tech", "downloads": 64, "date": "19-Sep-2026"},
                    {"code": "24A504-U2", "title": "Unit-2 Async Javascript, Promises, Fetch API & JSON", "subject": "Web Tech", "downloads": 61, "date": "21-Sep-2026"}
                ]
            },
            "timetableReport": [
                {"day": "Monday", "slot": "09:30 AM - 10:30 AM", "subject": "DBMS (24A502)", "class": "III B.Tech CSE-D", "room": "LH-304", "type": "Theory"},
                {"day": "Monday", "slot": "01:30 PM - 04:30 PM", "subject": "DBMS & Advanced SQL Lab (24A506L)", "class": "III B.Tech CSE-D (Batch 1)", "room": "Lab-2", "type": "Practical"},
                {"day": "Tuesday", "slot": "10:30 AM - 11:30 AM", "subject": "Web Application Dev (24A504)", "class": "III B.Tech CSE-D", "room": "LH-304", "type": "Theory"},
                {"day": "Wednesday", "slot": "11:30 AM - 12:30 PM", "subject": "DBMS (24A502)", "class": "III B.Tech CSE-D", "room": "LH-304", "type": "Theory"},
                {"day": "Wednesday", "slot": "01:30 PM - 04:30 PM", "subject": "Full-Stack Web Tech Lab (24A507L)", "class": "III B.Tech CSE-D (Batch 2)", "room": "Lab-3", "type": "Practical"},
                {"day": "Thursday", "slot": "02:30 PM - 03:30 PM", "subject": "Web Application Dev (24A504)", "class": "III B.Tech CSE-D", "room": "LH-304", "type": "Theory"},
                {"day": "Friday", "slot": "09:30 AM - 10:30 AM", "subject": "DBMS (24A502)", "class": "III B.Tech CSE-D", "room": "LH-304", "type": "Theory"},
                {"day": "Friday", "slot": "11:30 AM - 12:30 PM", "subject": "Mentorship & Counseling Session", "class": "III B.Tech CSE-D", "room": "LH-304", "type": "Mentorship"}
            ],
            "approvalAudit": [
                {
                    "id": p.get("id"),
                    "type": p.get("type"),
                    "appliedAt": p.get("appliedAt"),
                    "status": p.get("status"),
                    "approvedBy": p.get("approvedBy"),
                    "approvedAt": p.get("approvedAt"),
                    "remarks": p.get("principalRemarks"),
                    "passCode": p.get("passCode")
                } for p in fac_perms
            ] + [
                {
                    "id": l.get("id"),
                    "type": l.get("type"),
                    "appliedAt": l.get("appliedAt"),
                    "status": l.get("status"),
                    "approvedBy": l.get("approvedBy"),
                    "approvedAt": l.get("approvedAt"),
                    "remarks": l.get("principalRemarks"),
                    "passCode": l.get("passCode")
                } for l in fac_leaves
            ]
        }

        return jsonify(report_payload)
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/events")
def sse_stream():
    """Server-Sent Events endpoint for real-time live push updates."""
    client_q = queue.Queue(maxsize=100)
    sse_clients.append(client_q)

    def event_generator():
        # Send initial connection handshake
        v_info = get_version_info()
        init_payload = {
            "type": "connected",
            "version": v_info["version"],
            "timestamp": v_info["updated_at"],
            "message": "Connected to ALITS Python Live Stream"
        }
        yield f"data: {json.dumps(init_payload)}\n\n"

        try:
            while True:
                try:
                    # Wait up to 15 seconds for a message; if none, send keep-alive ping
                    msg = client_q.get(timeout=15)
                    yield msg
                except queue.Empty:
                    # Keep-alive heartbeat ping
                    yield ": ping\n\n"
        except GeneratorExit:
            if client_q in sse_clients:
                sse_clients.remove(client_q)

    return Response(event_generator(), mimetype="text/event-stream")

@app.route("/api/auto-update/toggle", methods=["POST"])
def toggle_auto_updater():
    body = request.get_json(silent=True) or {}
    enabled = body.get("enabled", not auto_updater_instance.enabled)
    auto_updater_instance.set_enabled(enabled)
    log_activity(
        module="AutoUpdater",
        action="Toggle",
        details=f"Auto-update engine switched to {'ON' if enabled else 'OFF'}",
        source="admin"
    )
    return jsonify({
        "success": True,
        "auto_updater_active": auto_updater_instance.is_running(),
        "enabled": auto_updater_instance.enabled
    })

@app.route("/api/auto-update/tick", methods=["POST"])
def force_tick():
    result = auto_updater_instance.perform_tick()
    return jsonify({
        "success": True,
        "tick": result
    })

@app.route("/api/logs", methods=["GET"])
def get_logs():
    limit = int(request.args.get("limit", 30))
    logs = get_recent_logs(limit=limit)
    return jsonify({"logs": logs, "count": len(logs)})

@app.route("/api/reset", methods=["POST"])
def reset_factory():
    if SEED_PATH.exists():
        with open(SEED_PATH, "r", encoding="utf-8") as f:
            seed_data = json.load(f)
        next_ver, now_str = update_state(
            seed_data,
            updated_by="factory_reset",
            change_summary="Restored to ALITS Factory Seed Defaults",
            module="System",
            action="Reset"
        )
        broadcast_event({
            "type": "factory_reset",
            "version": next_ver,
            "timestamp": now_str,
            "summary": "Restored to ALITS Factory Seed Defaults",
            "state": seed_data
        })
        return jsonify({"success": True, "version": next_ver})
    return jsonify({"error": "Seed file not found"}), 404

# --------------------------------------------------------------------------
# MAIN ENTRY POINT
# --------------------------------------------------------------------------
if __name__ == "__main__":
    init_db()
    # Start auto updater background engine
    auto_updater_instance.start(broadcast_callback=broadcast_event)

    port = 5000
    print("=" * 60)
    print(f" ALITS ERP PYTHON BACKEND READY")
    print(f" Web Dashboard: http://localhost:{port}")
    print(f" API Endpoint:  http://localhost:{port}/api/health")
    print(f" Auto-Updater:  RUNNING (Live Sync Enabled)")
    print("=" * 60)

    # Check if run with --test flag (don't block forever)
    if "--test" in sys.argv:
        print("[Server] Test mode flag detected, server initialized OK.")
        sys.exit(0)

    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)
