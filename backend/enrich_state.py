"""
Enrich central ALITS database state with student/parent app features:
notices, assignments, timetables, exam timetables, study materials, academic calendar, transport routes.
"""

import json
import datetime
from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from backend.database import get_current_state, update_state, SEED_PATH

def enrich():
    ver, state, updated_at, updated_by, summary = get_current_state()

    # Ensure academicYears has 1st -> 26, 2nd -> 25, 3rd -> 24, 4th -> 23
    state["academicYears"] = {
        "1st Year": "26",
        "2nd Year": "25",
        "3rd Year": "24",
        "4th Year": "23"
    }
    state["collegeCode"] = "2G1A"

    # Ensure all required departments are present with configurable codes
    target_departments = [
        {"id": "CSE", "name": "Computer Science & Engineering", "code": "05", "hod": "Dr. P. Ramanjaneyulu", "intake": 180},
        {"id": "AIML", "name": "Artificial Intelligence & Machine Learning", "code": "33", "hod": "Dr. S. Murali Krishna", "intake": 120},
        {"id": "ECE", "name": "Electronics & Communication Engineering", "code": "04", "hod": "Dr. K. Srinivas", "intake": 120},
        {"id": "EEE", "name": "Electrical & Electronics Engineering", "code": "02", "hod": "Dr. B. Venkata Rao", "intake": 60},
        {"id": "MECH", "name": "Mechanical Engineering", "code": "03", "hod": "Dr. C. Madhava Reddy", "intake": 60},
        {"id": "CIVIL", "name": "Civil Engineering", "code": "01", "hod": "Dr. G. Ramesh Kumar", "intake": 60},
        {"id": "HS", "name": "Humanities & Sciences (H&S)", "code": "00", "hod": "Dr. M. Sridevi", "intake": 480},
        {"id": "DIPLOMA", "name": "Diploma Polytechnic Courses", "code": "D1", "hod": "Prof. T. Anjaneyulu", "intake": 180},
        {"id": "MBA", "name": "Master of Business Administration", "code": "1E", "hod": "Dr. N. Rajesh", "intake": 120},
        {"id": "MCA", "name": "Master of Computer Applications", "code": "1F", "hod": "Dr. K. Jayachandra", "intake": 60}
    ]

    dept_map = {d["id"]: d for d in target_departments}
    existing_depts = state.get("departments", [])
    merged_depts = []
    for ed in existing_depts:
        did = ed.get("id")
        if did in dept_map:
            merged = {**dept_map[did], **ed}
            merged_depts.append(merged)
            del dept_map[did]
        elif did == "MBA_MCA":
            continue
        else:
            merged_depts.append(ed)
    for remaining in dept_map.values():
        merged_depts.append(remaining)

    state["departments"] = merged_depts

    # Notices
    if not state.get("notices"):
        state["notices"] = [
            {
                "id": "NOT-201",
                "title": "Autonomous End-Semester Theory & Practical Exam Schedule Released",
                "category": "Exams",
                "badge": "URGENT",
                "badgeColor": "#ef4444",
                "date": "Today, 08:30 AM",
                "author": "Controller of Examinations (CoE)",
                "content": "JNTUA Autonomous End-Semester Regular & Supplementary examinations for III B.Tech I Semester (R23/R20) will commence from 05-Oct-2026. Hall tickets are now available for digital download in the Student & Parent mobile app. Students with fee clearances can download directly.",
                "hasAttachment": True,
                "attachmentName": "TimeTable_III_BTech_Autonomous_Oct2026.pdf"
            },
            {
                "id": "NOT-202",
                "title": "Campus Recruitment Drive: TCS Ninja & Digital for IV Year B.Tech",
                "category": "Placements",
                "badge": "PLACEMENTS",
                "badgeColor": "#10b981",
                "date": "Yesterday",
                "author": "Training & Placement Cell",
                "content": "Tata Consultancy Services (TCS) invites applications for Ninja (3.6 LPA) and Digital (7.2 LPA) roles. All eligible students from CSE, AIML, ECE & EEE with minimum 65% aggregate and zero active backlogs must submit their application on the portal before 15-Sep-2026.",
                "hasAttachment": True,
                "attachmentName": "TCS_Campus_Drive_Registration_Guidelines.pdf"
            },
            {
                "id": "NOT-203",
                "title": "Anantha Tech Fest 2026: National Level Technical Symposium",
                "category": "Events",
                "badge": "FEST",
                "badgeColor": "#8b5cf6",
                "date": "02 Sep 2026",
                "author": "ALITS Student Affairs",
                "content": "Annual National Level Symposium 'ANANTHA TECH FEST 2026' featuring Paper Presentations, Coding Hackathons, Robo-Wars, and Project Expos is scheduled for 24-25 Sep 2026. Win cash prizes worth ₹1,50,000! Register with your department coordinator.",
                "hasAttachment": False
            },
            {
                "id": "NOT-204",
                "title": "Parents-Teachers Interactive Meet (PTM) for III B.Tech Students",
                "category": "Academic",
                "badge": "ACADEMIC",
                "badgeColor": "#0284c7",
                "date": "28 Aug 2026",
                "author": "Dean Academics & HoDs",
                "content": "All parents and guardians of III B.Tech students are cordially invited for the Parent-Teacher Meet on Saturday, 12-Sep-2026 at 10:00 AM at the ALITS Auditorium to discuss student academic progress, CIE Mid marks, and placement readiness.",
                "hasAttachment": False
            },
            {
                "id": "NOT-205",
                "title": "Autonomous Academic Regulations & Condonation Guidelines",
                "category": "General",
                "badge": "NOTICE",
                "badgeColor": "#f59e0b",
                "date": "25 Aug 2026",
                "author": "Principal's Office",
                "content": "Students are strictly reminded that a minimum of 75% attendance is mandatory to appear for autonomous end-semester examinations. Condonation is strictly limited between 65% - 75% on genuine medical grounds with prior approval.",
                "hasAttachment": True,
                "attachmentName": "ALITS_Autonomous_Academic_Regulations_R24.pdf"
            }
        ]

    # Homework / Assignments
    if not state.get("assignments"):
        state["assignments"] = [
            {
                "id": "ASN-301",
                "subjectCode": "24CS501",
                "subjectName": "Full Stack Web Development",
                "title": "RESTful Microservices Architecture with Flask & SQLite",
                "faculty": "Dr. P. Ramanjaneyulu",
                "dueDate": "15 Sep 2026",
                "maxMarks": 20,
                "status": "Pending",
                "submissionCount": 48,
                "instructions": "Implement a full REST API with role-based JWT/token auth, SQLite database migrations, and real-time SSE stream for automated updates. Submit project GitHub link and 5-page PDF report.",
                "resources": "Sample_Boilerplate_Code.zip"
            },
            {
                "id": "ASN-302",
                "subjectCode": "24CS502",
                "subjectName": "Artificial Intelligence & ML",
                "title": "Convolutional Neural Network Implementation on MNIST Dataset",
                "faculty": "Prof. S. Murali Krishna",
                "dueDate": "18 Sep 2026",
                "maxMarks": 20,
                "status": "Submitted",
                "submittedOn": "03 Sep 2026",
                "obtainedMarks": "19/20",
                "facultyFeedback": "Excellent model accuracy (98.4%) and clean visualization graphs.",
                "instructions": "Train a 4-layer CNN in PyTorch/TensorFlow, evaluate confusion matrix, precision, recall, and plot training loss curves."
            },
            {
                "id": "ASN-303",
                "subjectCode": "24CS503",
                "subjectName": "Database Management Systems",
                "title": "Autonomous College ERP Schema Normalization Case Study",
                "faculty": "Dr. K. Srinivas",
                "dueDate": "20 Sep 2026",
                "maxMarks": 20,
                "status": "Pending",
                "submissionCount": 35,
                "instructions": "Design 3NF and BCNF normalized ER schema for college roster, fee installments, internal marks, and transport bus routes. Include DDL SQL statements."
            },
            {
                "id": "ASN-304",
                "subjectCode": "24CS504",
                "subjectName": "Design & Analysis of Algorithms",
                "title": "Dynamic Programming & Greedy Algorithms Problem Set",
                "faculty": "Prof. V. Lakshmi",
                "dueDate": "22 Sep 2026",
                "maxMarks": 20,
                "status": "Pending",
                "submissionCount": 52,
                "instructions": "Solve 0/1 Knapsack, Longest Common Subsequence, and Dijkstra's Single Source Shortest Path with complete time-space complexity proof."
            },
            {
                "id": "ASN-305",
                "subjectCode": "24CS505",
                "subjectName": "Computer Networks & Security",
                "title": "TCP Congestion Control & Socket Programming in Python",
                "faculty": "Dr. M. Suresh",
                "dueDate": "25 Sep 2026",
                "maxMarks": 20,
                "status": "Pending",
                "submissionCount": 41,
                "instructions": "Build client-server chat architecture using BSD sockets with AES-256 encrypted payload transmission."
            }
        ]

    # Weekly class timetable
    if not state.get("classTimetables"):
        state["classTimetables"] = {
            "Monday": [
                {"period": "1", "time": "09:30 - 10:30 AM", "subject": "Full Stack Web Dev", "code": "24CS501", "room": "Room CS-301", "faculty": "Dr. P. Ramanjaneyulu"},
                {"period": "2", "time": "10:30 - 11:30 AM", "subject": "Artificial Intelligence & ML", "code": "24CS502", "room": "Room CS-301", "faculty": "Prof. S. Murali Krishna"},
                {"period": "Break", "time": "11:30 - 11:45 AM", "subject": "Tea Break", "code": "BREAK", "room": "Campus Cafeteria", "faculty": "-"},
                {"period": "3", "time": "11:45 - 12:45 PM", "subject": "Database Management Systems", "code": "24CS503", "room": "Room CS-301", "faculty": "Dr. K. Srinivas"},
                {"period": "Lunch", "time": "12:45 - 01:30 PM", "subject": "Lunch Break", "code": "LUNCH", "room": "College Canteen", "faculty": "-"},
                {"period": "4-6", "time": "01:30 - 04:30 PM", "subject": "Full Stack Development Lab", "code": "24CS506", "room": "Lab Center 3", "faculty": "Dr. P. Ramanjaneyulu & Team"}
            ],
            "Tuesday": [
                {"period": "1", "time": "09:30 - 10:30 AM", "subject": "Design & Analysis of Algorithms", "code": "24CS504", "room": "Room CS-301", "faculty": "Prof. V. Lakshmi"},
                {"period": "2", "time": "10:30 - 11:30 AM", "subject": "Computer Networks & Security", "code": "24CS505", "room": "Room CS-301", "faculty": "Dr. M. Suresh"},
                {"period": "Break", "time": "11:30 - 11:45 AM", "subject": "Tea Break", "code": "BREAK", "room": "Campus Cafeteria", "faculty": "-"},
                {"period": "3", "time": "11:45 - 12:45 PM", "subject": "Artificial Intelligence & ML", "code": "24CS502", "room": "Room CS-301", "faculty": "Prof. S. Murali Krishna"},
                {"period": "Lunch", "time": "12:45 - 01:30 PM", "subject": "Lunch Break", "code": "LUNCH", "room": "College Canteen", "faculty": "-"},
                {"period": "4-6", "time": "01:30 - 04:30 PM", "subject": "AI & Machine Learning Lab", "code": "24CS507", "room": "Lab Center 2", "faculty": "Prof. S. Murali Krishna"}
            ],
            "Wednesday": [
                {"period": "1", "time": "09:30 - 10:30 AM", "subject": "Database Management Systems", "code": "24CS503", "room": "Room CS-301", "faculty": "Dr. K. Srinivas"},
                {"period": "2", "time": "10:30 - 11:30 AM", "subject": "Full Stack Web Dev", "code": "24CS501", "room": "Room CS-301", "faculty": "Dr. P. Ramanjaneyulu"},
                {"period": "Break", "time": "11:30 - 11:45 AM", "subject": "Tea Break", "code": "BREAK", "room": "Campus Cafeteria", "faculty": "-"},
                {"period": "3", "time": "11:45 - 12:45 PM", "subject": "Design & Analysis of Algorithms", "code": "24CS504", "room": "Room CS-301", "faculty": "Prof. V. Lakshmi"},
                {"period": "Lunch", "time": "12:45 - 01:30 PM", "subject": "Lunch Break", "code": "LUNCH", "room": "College Canteen", "faculty": "-"},
                {"period": "4", "time": "01:30 - 02:30 PM", "subject": "Skill Development: Cloud Computing", "code": "24CS508", "room": "Seminar Hall", "faculty": "Prof. N. Harish"},
                {"period": "5-6", "time": "02:30 - 04:30 PM", "subject": "DBMS Laboratory", "code": "24CS509", "room": "Lab Center 1", "faculty": "Dr. K. Srinivas"}
            ],
            "Thursday": [
                {"period": "1", "time": "09:30 - 10:30 AM", "subject": "Computer Networks & Security", "code": "24CS505", "room": "Room CS-301", "faculty": "Dr. M. Suresh"},
                {"period": "2", "time": "10:30 - 11:30 AM", "subject": "Database Management Systems", "code": "24CS503", "room": "Room CS-301", "faculty": "Dr. K. Srinivas"},
                {"period": "Break", "time": "11:30 - 11:45 AM", "subject": "Tea Break", "code": "BREAK", "room": "Campus Cafeteria", "faculty": "-"},
                {"period": "3", "time": "11:45 - 12:45 PM", "subject": "Full Stack Web Dev", "code": "24CS501", "room": "Room CS-301", "faculty": "Dr. P. Ramanjaneyulu"},
                {"period": "Lunch", "time": "12:45 - 01:30 PM", "subject": "Lunch Break", "code": "LUNCH", "room": "College Canteen", "faculty": "-"},
                {"period": "4-5", "time": "01:30 - 03:30 PM", "subject": "Competitive Coding & Aptitude", "code": "TRAIN", "room": "Digital Auditorium", "faculty": "T&P Training Team"},
                {"period": "6", "time": "03:30 - 04:30 PM", "subject": "Library / Research Period", "code": "LIB", "room": "Central Library", "faculty": "Mr. C. Somasekhar"}
            ],
            "Friday": [
                {"period": "1", "time": "09:30 - 10:30 AM", "subject": "Artificial Intelligence & ML", "code": "24CS502", "room": "Room CS-301", "faculty": "Prof. S. Murali Krishna"},
                {"period": "2", "time": "10:30 - 11:30 AM", "subject": "Design & Analysis of Algorithms", "code": "24CS504", "room": "Room CS-301", "faculty": "Prof. V. Lakshmi"},
                {"period": "Break", "time": "11:30 - 11:45 AM", "subject": "Tea Break", "code": "BREAK", "room": "Campus Cafeteria", "faculty": "-"},
                {"period": "3", "time": "11:45 - 12:45 PM", "subject": "Computer Networks & Security", "code": "24CS505", "room": "Room CS-301", "faculty": "Dr. M. Suresh"},
                {"period": "Lunch", "time": "12:45 - 01:30 PM", "subject": "Lunch Break", "code": "LUNCH", "room": "College Canteen", "faculty": "-"},
                {"period": "4-6", "time": "01:30 - 04:30 PM", "subject": "Networks & Security Lab", "code": "24CS510", "room": "Lab Center 4", "faculty": "Dr. M. Suresh"}
            ],
            "Saturday": [
                {"period": "1", "time": "09:30 - 10:30 AM", "subject": "Constitution of India / Ethics", "code": "24MC501", "room": "Room CS-301", "faculty": "Dr. G. Prasad"},
                {"period": "2", "time": "10:30 - 11:30 AM", "subject": "Mentoring & Counseling Session", "code": "MENTOR", "room": "Room CS-301", "faculty": "Faculty Mentors"},
                {"period": "Break", "time": "11:30 - 11:45 AM", "subject": "Tea Break", "code": "BREAK", "room": "Campus Cafeteria", "faculty": "-"},
                {"period": "3-4", "time": "11:45 - 01:30 PM", "subject": "Student Club & Sports Activities", "code": "CLUBS", "room": "Grounds / Activity Hall", "faculty": "Physical Director"}
            ]
        }

    # Exam timetables (Autonomous semester-end exams)
    if not state.get("examTimetables"):
        state["examTimetables"] = [
            {
                "code": "24CS501",
                "name": "Full Stack Web Development",
                "date": "05 Oct 2026",
                "day": "Monday",
                "time": "10:00 AM - 01:00 PM",
                "hall": "Examination Hall A-102",
                "type": "Autonomous Theory Regular"
            },
            {
                "code": "24CS502",
                "name": "Artificial Intelligence & ML",
                "date": "07 Oct 2026",
                "day": "Wednesday",
                "time": "10:00 AM - 01:00 PM",
                "hall": "Examination Hall A-102",
                "type": "Autonomous Theory Regular"
            },
            {
                "code": "24CS503",
                "name": "Database Management Systems",
                "date": "09 Oct 2026",
                "day": "Friday",
                "time": "10:00 AM - 01:00 PM",
                "hall": "Examination Hall A-102",
                "type": "Autonomous Theory Regular"
            },
            {
                "code": "24CS504",
                "name": "Design & Analysis of Algorithms",
                "date": "12 Oct 2026",
                "day": "Monday",
                "time": "10:00 AM - 01:00 PM",
                "hall": "Examination Hall A-102",
                "type": "Autonomous Theory Regular"
            },
            {
                "code": "24CS505",
                "name": "Computer Networks & Security",
                "date": "14 Oct 2026",
                "day": "Wednesday",
                "time": "10:00 AM - 01:00 PM",
                "hall": "Examination Hall A-102",
                "type": "Autonomous Theory Regular"
            }
        ]

    # Study materials / study centre
    if not state.get("studyMaterials"):
        state["studyMaterials"] = [
            {
                "id": "SM-101",
                "title": "Full Stack Web Development - Complete Lecture Notes (Units I-V)",
                "subject": "Full Stack Web Dev",
                "dept": "CSE",
                "year": "3rd Year",
                "fileType": "PDF",
                "fileSize": "4.8 MB",
                "author": "Dr. P. Ramanjaneyulu",
                "downloads": 482,
                "downloadUrl": "#download"
            },
            {
                "id": "SM-102",
                "title": "Artificial Intelligence & ML - Comprehensive Formula & Algorithms Handbook",
                "subject": "Artificial Intelligence & ML",
                "dept": "CSE",
                "year": "3rd Year",
                "fileType": "PDF",
                "fileSize": "6.2 MB",
                "author": "Prof. S. Murali Krishna",
                "downloads": 531,
                "downloadUrl": "#download"
            },
            {
                "id": "SM-103",
                "title": "DBMS Solved Previous 5 Years Autonomous Question Papers with Keys",
                "subject": "Database Management Systems",
                "dept": "CSE",
                "year": "3rd Year",
                "fileType": "PDF",
                "fileSize": "3.5 MB",
                "author": "ALITS Exam Cell",
                "downloads": 612,
                "downloadUrl": "#download"
            },
            {
                "id": "SM-104",
                "title": "Design & Analysis of Algorithms - Lab Manual & Code Repository",
                "subject": "Design & Analysis of Algorithms",
                "dept": "CSE",
                "year": "3rd Year",
                "fileType": "ZIP",
                "fileSize": "8.1 MB",
                "author": "Prof. V. Lakshmi",
                "downloads": 395,
                "downloadUrl": "#download"
            },
            {
                "id": "SM-105",
                "title": "Computer Networks & Security - RFC Standards & Wireshark Lab Notes",
                "subject": "Computer Networks & Security",
                "dept": "CSE",
                "year": "3rd Year",
                "fileType": "PDF",
                "fileSize": "5.1 MB",
                "author": "Dr. M. Suresh",
                "downloads": 344,
                "downloadUrl": "#download"
            },
            {
                "id": "SM-106",
                "title": "JNTUA Autonomous R23/R20 Academic Curriculum & Complete Syllabus",
                "subject": "All Subjects",
                "dept": "All",
                "year": "All Years",
                "fileType": "PDF",
                "fileSize": "2.9 MB",
                "author": "ALITS Academic Council",
                "downloads": 1280,
                "downloadUrl": "#download"
            }
        ]

    # Academic calendar & events
    if not state.get("academicCalendar"):
        state["academicCalendar"] = [
            {"date": "15 Jul 2026", "title": "Commencement of III B.Tech I Semester Class Work", "type": "Academic"},
            {"date": "15 Aug 2026", "title": "Independence Day Celebrations", "type": "Holiday"},
            {"date": "18 - 22 Aug 2026", "title": "Continuous Internal Evaluation (CIE) Mid-1 Exams", "type": "Exam"},
            {"date": "05 Sep 2026", "title": "Teachers' Day Celebrations & Student Felicitations", "type": "Event"},
            {"date": "24 - 25 Sep 2026", "title": "ANANTHA TECH FEST 2026 - National Level Symposium", "type": "Event"},
            {"date": "28 Sep - 03 Oct 2026", "title": "CIE Mid-2 Exams & Practical Laboratory Sem Exams", "type": "Exam"},
            {"date": "05 - 19 Oct 2026", "title": "Autonomous Semester End Regular Theory Exams", "type": "Exam"},
            {"date": "20 - 27 Oct 2026", "title": "Dussera Vacation / Semester Break", "type": "Holiday"},
            {"date": "01 Dec 2026", "title": "Commencement of III B.Tech II Semester Class Work", "type": "Academic"}
        ]

    # Transport bus details
    if not state.get("transportRoutes"):
        state["transportRoutes"] = [
            {
                "routeNo": "Route 4",
                "routeName": "Clock Tower → ALITS Campus (Super Express)",
                "busNo": "AP 02 TE 4591",
                "driverName": "Mr. R. Nagendra",
                "driverPhone": "+91 94401 22910",
                "morningDeparture": "08:15 AM",
                "eveningDeparture": "04:45 PM",
                "incharge": "Mr. P. Somu (+91 98480 34512)",
                "stops": [
                    {"name": "Clock Tower (Origin)", "time": "08:15 AM", "status": "Passed"},
                    {"name": "Subhash Road Junction", "time": "08:22 AM", "status": "Passed"},
                    {"name": "Saptagiri Circle", "time": "08:30 AM", "status": "Passed"},
                    {"name": "RTC Bus Stand Overbridge", "time": "08:37 AM", "status": "Passed"},
                    {"name": "Maruthi Nagar Circle", "time": "08:45 AM", "status": "Current / On Time"},
                    {"name": "Rudrampeta Bypass", "time": "08:52 AM", "status": "Upcoming"},
                    {"name": "ALITS Autonomous Campus", "time": "09:05 AM", "status": "Destination"}
                ]
            },
            {
                "routeNo": "Route 1",
                "routeName": "Tadipatri ↔ ALITS Campus",
                "busNo": "AP 02 TE 3822",
                "driverName": "Mr. M. Ramana",
                "driverPhone": "+91 98492 88410",
                "morningDeparture": "07:30 AM",
                "eveningDeparture": "04:45 PM",
                "incharge": "Mr. K. Narayana",
                "stops": []
            },
            {
                "routeNo": "Route 2",
                "routeName": "Guntakal ↔ ALITS Campus",
                "busNo": "AP 02 TE 4120",
                "driverName": "Mr. K. Chandrasekhar",
                "driverPhone": "+91 94411 77319",
                "morningDeparture": "07:20 AM",
                "eveningDeparture": "04:45 PM",
                "incharge": "Mr. T. Ramesh",
                "stops": []
            }
        ]

    # Payment transactions log
    if not state.get("paymentTransactions"):
        state["paymentTransactions"] = [
            {
                "receiptNo": "ALITS-REC-2026-00412",
                "rollNo": "242G1A05O1",
                "studentName": "Gulagani Tirumalaiah",
                "amount": 15000,
                "feeType": "1st Installment Tuition Fee",
                "paymentMethod": "HDFC NetBanking / UPI",
                "transactionId": "TXN982347101",
                "timestamp": "31 Mar 2026, 11:20 AM",
                "status": "Success",
                "receiptUrl": "#receipt"
            },
            {
                "receiptNo": "ALITS-REC-2026-00891",
                "rollNo": "242G1A05O1",
                "studentName": "Gulagani Tirumalaiah",
                "amount": 15000,
                "feeType": "2nd Installment Tuition Fee",
                "paymentMethod": "PhonePe UPI",
                "transactionId": "TXN993411029",
                "timestamp": "28 Jun 2026, 04:45 PM",
                "status": "Success",
                "receiptUrl": "#receipt"
            }
        ]

    # Ensure submittedAssignments list exists
    if "submittedAssignments" not in state:
        state["submittedAssignments"] = []

    # Save to SQLite DB
    next_ver, now_str = update_state(
        state,
        updated_by="system_enrichment",
        change_summary="Enriched state with notices, assignments, timetables, study materials and JNTUA department codes",
        module="System",
        action="Enrich"
    )
    print(f"[OK] Database state updated to version {next_ver} at {now_str}")

    # Also update seed_data.json
    try:
        with open(SEED_PATH, "w", encoding="utf-8") as f:
            json.dump(state, f, indent=2)
        print("[OK] seed_data.json updated successfully.")
    except Exception as e:
        print(f"[WARN] Failed to write seed_data.json: {e}")

if __name__ == "__main__":
    enrich()
