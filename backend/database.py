"""
ALITS ERP - SQLite Database & Persistence Engine
Manages ERP state snapshots, versioning, audit activity logs, and user credentials.
"""

import sqlite3
import json
import os
import datetime
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "alits_erp.db"
SEED_PATH = DATA_DIR / "seed_data.json"
STATE_BACKUP_PATH = DATA_DIR / "erp_state.json"

def get_connection():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH), check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cur = conn.cursor()

    # State snapshots table with auto-incrementing versions
    cur.execute("""
        CREATE TABLE IF NOT EXISTS system_state (
            id INTEGER PRIMARY KEY,
            version INTEGER NOT NULL,
            state_json TEXT NOT NULL,
            updated_by TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            change_summary TEXT
        )
    """)

    # Activity and auto-update audit log
    cur.execute("""
        CREATE TABLE IF NOT EXISTS activity_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            module TEXT NOT NULL,
            action TEXT NOT NULL,
            details TEXT NOT NULL,
            source TEXT NOT NULL
        )
    """)

    # Users and auth
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT UNIQUE,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL,
            full_name TEXT NOT NULL,
            student_roll_no TEXT,
            employee_id TEXT,
            email TEXT,
            mobile TEXT,
            status TEXT DEFAULT 'active',
            last_login TEXT,
            created_at TEXT
        )
    """)

    conn.commit()

    # Seed initial state if empty
    cur.execute("SELECT COUNT(*) as cnt FROM system_state")
    count = cur.fetchone()["cnt"]

    if count == 0:
        initial_state = {}
        if SEED_PATH.exists():
            try:
                with open(SEED_PATH, "r", encoding="utf-8") as f:
                    initial_state = json.load(f)
            except Exception as e:
                print(f"[DB] Error loading seed data: {e}")

        now_str = datetime.datetime.now().isoformat()
        state_str = json.dumps(initial_state)
        cur.execute("""
            INSERT INTO system_state (id, version, state_json, updated_by, updated_at, change_summary)
            VALUES (1, 1, ?, 'system_seed', ?, 'Initial ALITS ERP Seed Data Loaded')
        """, (state_str, now_str))

        # Also write state backup json
        with open(STATE_BACKUP_PATH, "w", encoding="utf-8") as f:
            f.write(state_str)

        # Log initial event
        cur.execute("""
            INSERT INTO activity_logs (timestamp, module, action, details, source)
            VALUES (?, 'System', 'Seed Initialized', 'Loaded complete ALITS college roster and academic structure', 'python_backend')
        """, (now_str,))

        conn.commit()
        print(f"[DB] Database initialized with Version 1 (Students: {len(initial_state.get('students', []))})")
    conn.close()

# In-memory snapshot cache for ultra-fast dashboard queries
_cached_version = None
_cached_state = None
_cached_updated_at = None
_cached_updated_by = None
_cached_summary = None

def get_current_state():
    global _cached_version, _cached_state, _cached_updated_at, _cached_updated_by, _cached_summary

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT version FROM system_state WHERE id = 1")
    ver_row = cur.fetchone()
    if not ver_row:
        conn.close()
        return 1, {}, datetime.datetime.now().isoformat(), "none", ""

    db_version = ver_row["version"]
    if _cached_version == db_version and _cached_state is not None:
        conn.close()
        return _cached_version, _cached_state, _cached_updated_at, _cached_updated_by, _cached_summary

    cur.execute("SELECT version, state_json, updated_by, updated_at, change_summary FROM system_state WHERE id = 1")
    row = cur.fetchone()
    conn.close()

    if not row:
        return 1, {}, datetime.datetime.now().isoformat(), "none", ""

    version = row["version"]
    updated_by = row["updated_by"]
    updated_at = row["updated_at"]
    change_summary = row["change_summary"] or ""
    try:
        state_dict = json.loads(row["state_json"])
    except Exception:
        state_dict = {}

    if "financialFlow" not in state_dict:
        state_dict["financialFlow"] = {
            "day": {
                "labels": ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"],
                "inflow": [45000, 120000, 85000, 160000, 95000, 210000, 140000],
                "outflow": [15000, 30000, 25000, 40000, 20000, 55000, 35000],
                "totalInflow": 855000,
                "totalOutflow": 220000,
                "netSurplus": 635000
            },
            "week": {
                "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                "inflow": [520000, 680000, 740000, 610000, 890000, 450000, 180000],
                "outflow": [180000, 210000, 195000, 220000, 310000, 140000, 60000],
                "totalInflow": 4070000,
                "totalOutflow": 1315000,
                "netSurplus": 2755000
            }
        }

    if "permissions" not in state_dict or not isinstance(state_dict["permissions"], list):
        state_dict["permissions"] = [
            {
                "id": "PRM-101",
                "facultyId": "AL00456",
                "facultyName": "MS. A. Manjula",
                "dept": "Computer Science & Engineering",
                "deptCode": "CSE",
                "type": "Campus Exit / Short Permission (2 Hours)",
                "date": "2026-09-22",
                "timeSlot": "02:00 PM - 04:00 PM",
                "duration": "2 Hours",
                "reason": "Urgent university documentation submission at SBI Main Branch",
                "substitute": "Mrs. G. Roja Ramani (Assistant Professor - CSE)",
                "substituteStatus": "Class Adjusted",
                "status": "Pending Principal Approval",
                "appliedAt": "21-Sep-2026 10:15 AM",
                "approvedBy": None,
                "approvedAt": None,
                "principalRemarks": "",
                "passCode": None
            },
            {
                "id": "PRM-102",
                "facultyId": "AL00457",
                "facultyName": "Dr. K. Bhargavi",
                "dept": "Computer Science & Engineering",
                "deptCode": "CSE",
                "type": "On-Duty (OD) Research & Exam Duty",
                "date": "2026-09-23",
                "timeSlot": "10:00 AM - 05:00 PM",
                "duration": "Full Day OD",
                "reason": "JNTUA University Autonomous Examination Moderation Committee Meeting",
                "substitute": "Sri K. Ramesh (Associate Professor - CSE)",
                "substituteStatus": "Class Adjusted",
                "status": "Approved by Principal",
                "appliedAt": "19-Sep-2026 09:30 AM",
                "approvedBy": "Dr. K. Sreenivasulu (Principal)",
                "approvedAt": "20-Sep-2026 11:00 AM",
                "principalRemarks": "OD Sanctioned with duty allowance. Please submit completion certificate.",
                "passCode": "ALITS-PRIN-OD-9481"
            },
            {
                "id": "PRM-103",
                "facultyId": "AL00458",
                "facultyName": "Sri K. Ramesh",
                "dept": "Computer Science & Engineering",
                "deptCode": "CSE",
                "type": "Lab Equipment Vendor Inspection",
                "date": "2026-09-24",
                "timeSlot": "01:30 PM - 03:30 PM",
                "duration": "2 Hours",
                "reason": "Visiting Electronics Component Vendor for AI/IoT Laboratory setup",
                "substitute": "Mr. B. Vijaya Bhaskar Reddy (Assistant Professor - CSE)",
                "substituteStatus": "Class Adjusted",
                "status": "Pending Principal Approval",
                "appliedAt": "21-Sep-2026 11:45 AM",
                "approvedBy": None,
                "approvedAt": None,
                "principalRemarks": "",
                "passCode": None
            }
        ]

    if "leaves" not in state_dict or not isinstance(state_dict["leaves"], list):
        state_dict["leaves"] = [
            {
                "id": "LV-989",
                "facultyId": "AL00456",
                "facultyName": "MS. A. Manjula",
                "dept": "Computer Science & Engineering",
                "deptCode": "CSE",
                "type": "Casual Leave (CL)",
                "from": "2026-09-25",
                "to": "2026-09-26",
                "days": 2,
                "reason": "Family welfare function & personal commitment at native place",
                "substitute": "Sri K. Ramesh (Associate Professor - CSE)",
                "status": "Pending Principal Approval",
                "appliedAt": "21-Sep-2026 09:45 AM",
                "approvedBy": None,
                "approvedAt": None,
                "principalRemarks": "",
                "passCode": None
            },
            {
                "id": "LV-990",
                "facultyId": "AL00457",
                "facultyName": "Dr. K. Bhargavi",
                "dept": "Computer Science & Engineering",
                "deptCode": "CSE",
                "type": "Medical Leave (ML)",
                "from": "2026-09-12",
                "to": "2026-09-13",
                "days": 2,
                "reason": "Medical appointment and recovery checkup",
                "substitute": "MS. A. Manjula (Assistant Professor - CSE)",
                "status": "Approved by Principal",
                "appliedAt": "11-Sep-2026 04:30 PM",
                "approvedBy": "Dr. K. Sreenivasulu (Principal)",
                "approvedAt": "12-Sep-2026 08:30 AM",
                "principalRemarks": "Medical leave sanctioned. Get well soon.",
                "passCode": "ALITS-PRIN-LV-990"
            }
        ]

    _cached_version = version
    _cached_state = state_dict
    _cached_updated_at = updated_at
    _cached_updated_by = updated_by
    _cached_summary = change_summary

    return version, state_dict, updated_at, updated_by, change_summary

def get_version_info():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT version, updated_at, updated_by, change_summary FROM system_state WHERE id = 1")
    row = cur.fetchone()
    conn.close()
    if not row:
        return {"version": 1, "updated_at": datetime.datetime.now().isoformat(), "updated_by": "system", "change_summary": ""}
    return {
        "version": row["version"],
        "updated_at": row["updated_at"],
        "updated_by": row["updated_by"],
        "change_summary": row["change_summary"] or ""
    }

def update_state(new_state, updated_by="user", change_summary="State updated", module="System", action="Update"):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT version FROM system_state WHERE id = 1")
    row = cur.fetchone()
    current_ver = row["version"] if row else 0
    next_ver = current_ver + 1
    now_str = datetime.datetime.now().isoformat()

    # Backend uniqueness and data integrity safeguards
    if isinstance(new_state, dict) and "students" in new_state and isinstance(new_state["students"], list):
        seen_rolls = set()
        clean_students = []
        for stu in new_state["students"]:
            r = str(stu.get("rollNo") or stu.get("roll") or "").strip().upper()
            name = str(stu.get("name") or "").strip()
            sec = str(stu.get("section") or stu.get("sec") or "").replace("Section-", "").replace("section-", "").strip().upper()
            sid = str(stu.get("id") or "")

            # Safeguard 1: Gulagani Tirumalaiah MUST NOT appear in CSE-A
            if ("TIRUMALA" in name.upper() or r == "242G1A05O1" or sid == "STU-101") and sec == "A":
                continue

            # Safeguard 2: Purge unnecessary demo students (Bandlamudi Koushik 252G1A0403 / STU-102)
            if r == "252G1A0403" or sid == "STU-102" or "BANDLAMUDI" in name.upper():
                continue

            if r and r not in seen_rolls:
                seen_rolls.add(r)
                stu["rollNo"] = r
                clean_students.append(stu)
        new_state["students"] = clean_students

    state_str = json.dumps(new_state)

    cur.execute("""
        INSERT INTO system_state (id, version, state_json, updated_by, updated_at, change_summary)
        VALUES (1, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            version = excluded.version,
            state_json = excluded.state_json,
            updated_by = excluded.updated_by,
            updated_at = excluded.updated_at,
            change_summary = excluded.change_summary
    """, (next_ver, state_str, updated_by, now_str, change_summary))

    # Log activity
    cur.execute("""
        INSERT INTO activity_logs (timestamp, module, action, details, source)
        VALUES (?, ?, ?, ?, ?)
    """, (now_str, module, action, change_summary, updated_by))

    conn.commit()
    conn.close()

    # Async mirror to JSON file for quick local inspection (throttle on auto-updates to prevent OneDrive disk freeze)
    if updated_by != "python_auto_updater" or next_ver % 10 == 0:
        try:
            with open(STATE_BACKUP_PATH, "w", encoding="utf-8") as f:
                f.write(state_str)
        except Exception as e:
            print(f"[DB] Backup file write warning: {e}")

    global _cached_version, _cached_state, _cached_updated_at, _cached_updated_by, _cached_summary
    _cached_version = next_ver
    _cached_state = new_state
    _cached_updated_at = now_str
    _cached_updated_by = updated_by
    _cached_summary = change_summary

    return next_ver, now_str

def log_activity(module, action, details, source="python_backend"):
    conn = get_connection()
    cur = conn.cursor()
    now_str = datetime.datetime.now().isoformat()
    cur.execute("""
        INSERT INTO activity_logs (timestamp, module, action, details, source)
        VALUES (?, ?, ?, ?, ?)
    """, (now_str, module, action, details, source))
    conn.commit()
    conn.close()

def get_recent_logs(limit=30):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, timestamp, module, action, details, source
        FROM activity_logs
        ORDER BY id DESC LIMIT ?
    """, (limit,))
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]
