import os
import sys
import json
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Add root directory to sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from server import app
from backend.database import init_db, get_current_state, update_state
from backend.auth_service import verify_user_login

print("=== STARTING END-TO-END SYSTEM INTEGRATION TESTS ===")

# Initialize DB
init_db()

# Create Flask test client
client = app.test_client()

# 1. Test Health Endpoint
print("\n[Test 1] Testing /api/health...")
res = client.get('/api/health')
assert res.status_code == 200, f"Health check failed: {res.status_code}"
health_data = res.get_json()
print(f"  ✓ Health Status: {health_data.get('status')}, Version: {health_data.get('version')}")

# 2. Test Version Endpoint
print("\n[Test 2] Testing /api/version...")
res = client.get('/api/version')
assert res.status_code == 200
v_data = res.get_json()
print(f"  ✓ Version: {v_data.get('version')}")

# 3. Test State Retrieval
print("\n[Test 3] Testing /api/state GET...")
res = client.get('/api/state')
assert res.status_code == 200
state_data = res.get_json()
st = state_data.get('state', {})
print(f"  ✓ Retrieved state with {len(st.get('students', []))} students, {len(st.get('faculty', []))} faculty, {len(st.get('departments', []))} departments.")

# 4. Test State Update (State Sync)
print("\n[Test 4] Testing /api/state POST (Sync Engine)...")
res = client.post('/api/state', json={
    "state": st,
    "updated_by": "test_e2e_runner",
    "change_summary": "E2E Test State Sync",
    "module": "Testing",
    "action": "Sync"
})
assert res.status_code == 200
update_res = res.get_json()
print(f"  ✓ State saved successfully, new version: v{update_res.get('version')}")

# 5. Test Authentication for Student
print("\n[Test 5] Testing Student Portal Authentication...")
# Student login with roll number and roll number as default password
res = client.post('/api/auth/login', json={
    "identifier": "242G1A05O1",
    "password": "242G1A05O1",
    "portal": "student"
})
assert res.status_code == 200, f"Student auth failed: {res.get_json()}"
stu_auth = res.get_json()
print(f"  ✓ Student Login: Success! User: {stu_auth['session']['userName']} ({stu_auth['session']['role']})")

# 6. Test Authentication for Faculty
print("\n[Test 6] Testing Faculty Portal Authentication...")
# Faculty login with ID AL00456
res = client.post('/api/auth/login', json={
    "identifier": "AL00456",
    "password": "AL00456",
    "portal": "faculty"
})
assert res.status_code == 200, f"Faculty auth failed: {res.get_json()}"
fac_auth = res.get_json()
print(f"  ✓ Faculty Login: Success! User: {fac_auth['session']['userName']} ({fac_auth['session']['role']})")

# 7. Test Authentication for Management
print("\n[Test 7] Testing Management Portal Authentication...")
res = client.post('/api/auth/login', json={
    "identifier": "admin",
    "password": "admin456",
    "portal": "management"
})
assert res.status_code == 200, f"Management auth failed: {res.get_json()}"
mgmt_auth = res.get_json()
print(f"  ✓ Management Login: Success! User: {mgmt_auth['session']['userName']} ({mgmt_auth['session']['role']})")

# 8. Test Student Mobile/Parent Login Endpoint
print("\n[Test 8] Testing /api/auth/student-parent-login...")
res = client.post('/api/auth/student-parent-login', json={
    "identifier": "242G1A05O1",
    "password": "242G1A05O1",
    "role": "student"
})
assert res.status_code == 200
sp_res = res.get_json()
print(f"  ✓ Student/Parent Login: {sp_res.get('message')}")

# 9. Test Student Submit Assignment Endpoint
print("\n[Test 9] Testing /api/student/submit-assignment...")
res = client.post('/api/student/submit-assignment', json={
    "rollNo": "242G1A05O1",
    "assignmentId": "ASG-CSE-01",
    "notes": "E2E automated test submission",
    "fileName": "Algorithms_Unit1.pdf"
})
assert res.status_code == 200
asg_res = res.get_json()
print(f"  ✓ Assignment Submission: {asg_res.get('message')}")

# 10. Test Student Fee Payment Endpoint
print("\n[Test 10] Testing /api/student/pay-fee...")
res = client.post('/api/student/pay-fee', json={
    "rollNo": "242G1A05O1",
    "amount": 5000,
    "installmentName": "1st Installment Fees",
    "paymentMethod": "UPI Instant"
})
assert res.status_code == 200
fee_res = res.get_json()
print(f"  ✓ Fee Payment: {fee_res.get('message')}")

# 11. Test Static Routes
print("\n[Test 11] Testing Static Route Serving...")
for route in ["/", "/auth", "/faculty", "/student", "/staff"]:
    res = client.get(route)
    assert res.status_code == 200, f"Route {route} failed with {res.status_code}"
    print(f"  ✓ Route '{route}' returned status 200 OK")

# 12. Test Auto-Updater Manual Tick
print("\n[Test 12] Testing Auto-Updater Force Tick...")
res = client.post('/api/auto-update/tick')
assert res.status_code == 200
tick_res = res.get_json()
print(f"  ✓ Auto-Updater Tick: {tick_res.get('tick', {}).get('summary')}")

# 13. Test Faculty Live Attendance Submission & State Sync
print("\n[Test 13] Testing Faculty Live Attendance Submission & Real-time State Synchronization...")
state_res = client.get('/api/state')
current_st = state_res.get_json().get('state', {})
students = current_st.get('students', [])
assert len(students) > 0, "No students found in state"

# Mark attendance for CSE-D students
cse_d_students = [s for s in students if s.get('dept') == 'CSE' and (s.get('section') == 'D' or s.get('sec') == 'D')]
assert len(cse_d_students) > 0, "No CSE-D students found in state"

target_student = cse_d_students[0]
roll = target_student.get('rollNo') or target_student.get('roll')
initial_attended = target_student.get('attendedClasses', 180)
initial_total = target_student.get('totalClasses', 200)

attendance_record = {
    "id": f"ATT-TEST-{roll}",
    "sessionKey": "CSE_3rd_Year_D_24A502_2026-09-28_Period_1",
    "department": "CSE",
    "year": "3rd Year",
    "section": "D",
    "subject": "24A502 - Database Management Systems",
    "date": "2026-09-28",
    "period": "Period 1 (09:00 - 10:10 AM)",
    "facultyId": "AL00456",
    "facultyName": "MS. A. Manjula",
    "totalStrength": len(cse_d_students),
    "presentCount": len(cse_d_students) - 1,
    "absentCount": 1,
    "odCount": 0,
    "attendancePct": 98.5,
    "records": [{"rollNo": s.get('rollNo') or s.get('roll'), "name": s.get('name'), "status": "Present" if idx != 0 else "Absent"} for idx, s in enumerate(cse_d_students)]
}

# Update student attendance in central state
target_student['status'] = 'Absent'
target_student['totalClasses'] = initial_total + 1
target_student['attendancePct'] = round((initial_attended / (initial_total + 1)) * 100, 1)

if 'attendanceRecords' not in current_st:
    current_st['attendanceRecords'] = []
current_st['attendanceRecords'].insert(0, attendance_record)

sync_res = client.post('/api/state', json={
    "state": current_st,
    "updated_by": "faculty_AL00456_MS_A_Manjula",
    "change_summary": "Live attendance submitted for 3rd Year CSE Sec-D (Database Management Systems)",
    "module": "Attendance",
    "action": "Submit Live Attendance"
})
assert sync_res.status_code == 200

# Verify state updated in DB
verify_res = client.get('/api/state')
new_st = verify_res.get_json().get('state', {})
saved_rec = new_st.get('attendanceRecords', [])[0]
assert saved_rec.get('sessionKey') == "CSE_3rd_Year_D_24A502_2026-09-28_Period_1"
print(f"  ✓ Live Attendance submitted for {len(cse_d_students)} students in CSE-D (Subject: 24A502). Central DB verified!")

# 14. Test Complete Student Upload → Database → Main ERP → Student Portal → Faculty Portal Flow
print("\n[Test 14] Testing Complete Student Upload → Database → Main ERP → Student Portal → Faculty Portal Flow...")
upload_state_res = client.get('/api/state')
base_st = upload_state_res.get_json().get('state', {})
curr_students = base_st.get('students', [])

# Simulate an uploaded student (e.g. from Excel/CSV upload)
new_uploaded_student = {
    "id": "STU-CSE-242G1A05Z9",
    "rollNo": "242G1A05Z9",
    "name": "K. Venkata Sai Teja",
    "fatherName": "K. Narayana Swamy",
    "mobile": "+91 98481 00999",
    "email": "242g1a05z9@alits.ac.in",
    "dept": "CSE",
    "year": "3rd Year",
    "section": "D",
    "semester": "III Year I Sem (3-1)",
    "batch": "2024-2028",
    "dob": "15 August 2005",
    "bloodGroup": "B+",
    "gender": "Male",
    "quota": "Convenor Quota",
    "residenceType": "Day Scholar",
    "address": "D.No 45, Arvind Nagar, Anantapur",
    "pincode": "515002",
    "totalClasses": 240,
    "attendedClasses": 220,
    "attendancePct": 91.7,
    "totalAssigned": 55000,
    "totalPaid": 42500,
    "balanceDue": 12500,
    "status": "Present"
}

# 1. Upload & Deduplication in Central DB
existing_idx = next((i for i, s in enumerate(curr_students) if (s.get('rollNo') or s.get('roll')) == new_uploaded_student['rollNo']), None)
if existing_idx is not None:
    curr_students[existing_idx] = new_uploaded_student
else:
    curr_students.insert(0, new_uploaded_student)

base_st['students'] = curr_students

upload_push = client.post('/api/state', json={
    "state": base_st,
    "updated_by": "management_admin",
    "change_summary": "Uploaded student roster: Added 242G1A05Z9 (K. Venkata Sai Teja)",
    "module": "Students",
    "action": "Bulk Import Students"
})
assert upload_push.status_code == 200
print("  ✓ Step 1 (Upload → Database): Uploaded student saved in central database.")

# 2. Verify Main ERP Reads the Uploaded Student
erp_check = client.get('/api/state')
erp_st = erp_check.get_json().get('state', {})
erp_matched = next((s for s in erp_st.get('students', []) if (s.get('rollNo') or s.get('roll')) == "242G1A05Z9"), None)
assert erp_matched is not None, "Uploaded student not found in Main ERP state"
assert erp_matched.get('name') == "K. Venkata Sai Teja"
print("  ✓ Step 2 (Database → Main ERP): Main ERP retrieved uploaded student details.")

# 3. Verify Student Portal Login for the Uploaded Student
stu_login_res = client.post('/api/auth/login', json={
    "identifier": "242G1A05Z9",
    "password": "242G1A05Z9",
    "portal": "student"
})
assert stu_login_res.status_code == 200, f"Uploaded student login failed: {stu_login_res.get_json()}"
stu_session = stu_login_res.get_json().get('session', {})
assert stu_session.get('userName') == "K. Venkata Sai Teja"
print(f"  ✓ Step 3 (Main ERP → Student Portal): Uploaded student successfully logged in: {stu_session.get('userName')} ({stu_session.get('role')}).")

# 4. Verify Faculty Portal Roster & Live Attendance for Uploaded Student
fac_st = erp_st.get('students', [])
faculty_section_d = [s for s in fac_st if s.get('dept') == 'CSE' and (s.get('section') == 'D' or s.get('sec') == 'D')]
assert any((s.get('rollNo') or s.get('roll')) == "242G1A05Z9" for s in faculty_section_d), "Uploaded student missing from Faculty Section-D roster"
print(f"  ✓ Step 4 (Student Portal → Faculty Portal): Faculty Live Attendance Section-D includes uploaded student ({len(faculty_section_d)} total students in Sec-D).")

# Clean up temporary test student to keep original 392 students list completely unchanged
erp_st['students'] = [s for s in erp_st.get('students', []) if (s.get('rollNo') or s.get('roll')) != "242G1A05Z9"]
client.post('/api/state', json={
    "state": erp_st,
    "updated_by": "test_e2e_cleanup",
    "change_summary": "Test cleanup: Restored exact 392 student list",
    "module": "Testing",
    "action": "Cleanup"
})

print("\n=======================================================")
print("  ALL END-TO-END INTEGRATION TESTS PASSED SUCCESSFULLY!  ")
print("=======================================================")



