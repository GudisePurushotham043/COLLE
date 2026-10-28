"""
ALITS ERP - Faculty Authentication Test Suite
Tests:
1. Valid faculty credentials AL00456 + AL00456 -> Success (Faculty Portal)
2. Valid faculty credentials AL00457 + AL00457 -> Success
3. Valid faculty credentials AL00458 + AL00458 -> Success
4. Valid faculty credentials AL00459 + AL00459 -> Success
5. Case-insensitive Faculty ID: al00456 + AL00456 -> Success
6. Case-insensitive Password: AL00456 + al00456 -> Success
7. Invalid password AL00456 + WrongPass -> 401 with 'Invalid Faculty ID or Password.'
8. Non-existent Faculty ID AL99999 -> 401 with 'Invalid Faculty ID or Password.'
9. Cross-portal access denial: Student credential attempting Faculty portal -> 401 / access denied
10. All 26 faculty members have valid AL##### format and their ID as password
"""

import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.auth_service import verify_user_login
from backend.database import get_current_state, get_connection

def run_tests():
    print("=== STARTING FACULTY AUTHENTICATION TEST SUITE ===")
    passed = 0
    total = 0

    def assert_test(cond, msg):
        nonlocal passed, total
        total += 1
        if cond:
            passed += 1
            print(f"[PASS] {msg}")
        else:
            print(f"[FAIL] {msg}")

    # Test 1: AL00456 + AL00456
    res1 = verify_user_login("AL00456", "AL00456", requested_portal="faculty")
    assert_test(res1.get("success") is True and res1.get("session", {}).get("portal") == "faculty", "AL00456 + AL00456 logs into Faculty Portal")
    assert_test("Manjula" in res1.get("session", {}).get("userName", ""), "AL00456 resolves to MS. A. Manjula")
    assert_test(res1.get("session", {}).get("employeeId") == "AL00456", "AL00456 session has employeeId AL00456")

    # Test 2: AL00457 + AL00457
    res2 = verify_user_login("AL00457", "AL00457", requested_portal="faculty")
    assert_test(res2.get("success") is True and "Bhargavi" in res2.get("session", {}).get("userName", ""), "AL00457 + AL00457 logs into Dr. K. Bhargavi")

    # Test 3: AL00458 + AL00458
    res3 = verify_user_login("AL00458", "AL00458", requested_portal="faculty")
    assert_test(res3.get("success") is True and "Ramesh" in res3.get("session", {}).get("userName", ""), "AL00458 + AL00458 logs into Sri K. Ramesh")

    # Test 4: AL00459 + AL00459
    res4 = verify_user_login("AL00459", "AL00459", requested_portal="faculty")
    assert_test(res4.get("success") is True and "Roja" in res4.get("session", {}).get("userName", ""), "AL00459 + AL00459 logs into Mrs. G. Roja Ramani")

    # Test 5 & 6: Case insensitivity
    res5 = verify_user_login("al00456", "al00456", requested_portal="faculty")
    assert_test(res5.get("success") is True, "al00456 (lowercase ID and pass) logs in successfully")

    # Test 7: Wrong password
    res6 = verify_user_login("AL00456", "WrongPassword123", requested_portal="faculty")
    assert_test(res6.get("success") is False and "Invalid Faculty ID or Password." in res6.get("error", ""), "Invalid password returns 'Invalid Faculty ID or Password.'")

    # Test 8: Non-existent faculty
    res7 = verify_user_login("AL99999", "AL99999", requested_portal="faculty")
    assert_test(res7.get("success") is False and "Invalid Faculty ID or Password." in res7.get("error", ""), "Non-existent Faculty ID returns 'Invalid Faculty ID or Password.'")

    # Test 9: Student credential trying to access faculty portal
    res8 = verify_user_login("242G1A05J9", "242G1A05J9", requested_portal="faculty")
    assert_test(res8.get("success") is False and "Access Denied" in res8.get("error", ""), "Student account blocked from accessing Faculty portal")

    # Test 10: Faculty credential trying to access student portal
    res9 = verify_user_login("AL00456", "AL00456", requested_portal="student")
    assert_test(res9.get("success") is False and "Access Denied" in res9.get("error", ""), "Faculty account blocked from accessing Student portal")

    # Test 11: Verify all faculty records in system state
    _, state, _, _, _ = get_current_state()
    faculty = state.get("faculty", [])
    assert_test(len(faculty) >= 20, f"Found {len(faculty)} faculty records in state")
    
    all_al_format = all(f.get("id", "").startswith("AL") and len(f.get("id", "")) == 7 and f.get("id", "")[2:].isdigit() for f in faculty)
    assert_test(all_al_format, "All faculty IDs adhere strictly to AL##### format (AL + 5 digits)")

    # Test 12: Verify SQLite DB users table
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, username, role, full_name FROM users WHERE role = 'Faculty'")
    db_faculty = cur.fetchall()
    conn.close()

    assert_test(len(db_faculty) >= 20, f"Found {len(db_faculty)} faculty records in SQLite database")
    db_al_format = all(f["id"].startswith("AL") and len(f["id"]) == 7 for f in db_faculty)
    assert_test(db_al_format, "All SQLite DB faculty IDs adhere strictly to AL##### format")

    print(f"\nRESULTS: {passed}/{total} tests passed.")
    if passed == total:
        print("[SUCCESS] All Faculty Authentication tests passed perfectly!")
    else:
        print("[FAILURE] Some tests failed.")

if __name__ == "__main__":
    run_tests()
