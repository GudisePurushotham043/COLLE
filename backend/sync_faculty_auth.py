"""
ALITS ERP - Faculty Portal Authentication & Data Synchronizer
Standardizes all Faculty IDs to AL##### format (starting at AL00456),
sets Faculty ID as default password, computes SHA-256 hashes,
and updates SQLite DB users table, system_state, seed_data.json, and erp_state.json.
"""

import json
import sqlite3
import hashlib
import datetime
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "backend" / "data"
DB_PATH = DATA_DIR / "alits_erp.db"
SEED_PATH = DATA_DIR / "seed_data.json"
STATE_BACKUP_PATH = DATA_DIR / "erp_state.json"

def hash_password(password: str) -> str:
    return hashlib.sha256(password.strip().encode("utf-8")).hexdigest()

# Define Faculty Registry with AL##### IDs starting at AL00456
# MS. A. Manjula is AL00456 (Mentor and Incharge of III Year CSE-D)
FACULTY_RECORDS = [
    {
        "id": "AL00456",
        "name": "MS. A. Manjula, M.Tech, (Ph.D.)",
        "shortName": "MS. A. Manjula",
        "role": "Faculty",
        "designation": "Assistant Professor & Class Mentor / In-Charge (III Year CSE-D)",
        "dept": "CSE",
        "deptName": "Computer Science & Engineering",
        "experience": "8.5 Years",
        "experienceYears": 8.5,
        "qualification": "Ph.D. (Pursuing), M.Tech (CSE), B.Tech",
        "specialization": "Database Systems, Full-Stack Web Development, Data Mining",
        "email": "manjula.cse@alits.ac.in",
        "mobile": "+91 98480 11223",
        "cabin": "Faculty Cabin 14, Block-A",
        "room": "Faculty Cabin 14, Block-A",
        "avatar": "MJ",
        "joiningDate": "12 July 2017",
        "papers": 18,
        "bio": "Assistant Professor and Class Mentor & In-Charge for III Year B.Tech CSE Section-D. Expert in DBMS, SQL, and Full-Stack Engineering.",
        "status": "Active / On Campus",
        "activeClasses": 4,
        "totalStudents": 186,
        "classesToday": 3,
        "leaveBalance": {"cl": 8, "ml": 10, "od": 6, "el": 12},
        "assignedSubjects": [
            {"code": "24A502", "name": "Database Management Systems", "class": "III B.Tech I Sem (CSE-D)", "studentsCount": 64, "room": "LH-304"},
            {"code": "24A504", "name": "Web Application Development with Full-Stack", "class": "III B.Tech I Sem (CSE-D)", "studentsCount": 64, "room": "LH-304"},
            {"code": "24A506L", "name": "DBMS & Advanced SQL Laboratory", "class": "III B.Tech I Sem (CSE-D Batch 1 & 2)", "studentsCount": 64, "room": "Lab-2"},
            {"code": "24A507L", "name": "Full-Stack Web Technologies Lab", "class": "III B.Tech I Sem (CSE-D Batch 1 & 2)", "studentsCount": 64, "room": "Lab-3"}
        ],
        "mentorClass": "III B.Tech I Sem (CSE-D) - Class Mentor & Section In-Charge"
    },
    {
        "id": "AL00457",
        "name": "Dr. K. Bhargavi, Ph.D., M.Tech",
        "shortName": "Dr. K. Bhargavi",
        "role": "Faculty",
        "designation": "Professor & Head of Department (HOD - CSE)",
        "dept": "CSE",
        "deptName": "Computer Science & Engineering",
        "experience": "22 Years",
        "experienceYears": 22,
        "qualification": "Ph.D., M.Tech (CSE), B.Tech",
        "specialization": "Cloud Computing, Big Data Analytics, Distributed Systems",
        "email": "hod.cse@alits.ac.in",
        "mobile": "+91 98491 22001",
        "cabin": "HoD Chamber, Block-A Room 201",
        "room": "HoD Chamber, Block-A",
        "avatar": "KB",
        "joiningDate": "16 June 2010",
        "papers": 48,
        "bio": "Senior Professor and HOD of CSE with over two decades of research and teaching excellence. Fellow of ISTE and Senior Member IEEE.",
        "status": "Active / On Campus",
        "activeClasses": 2,
        "totalStudents": 128,
        "classesToday": 2,
        "leaveBalance": {"cl": 11, "ml": 12, "od": 8, "el": 15},
        "assignedSubjects": [
            {"code": "24A501", "name": "Design and Analysis of Algorithms", "class": "III B.Tech I Sem (CSE-D)", "studentsCount": 64, "room": "LH-304"},
            {"code": "24A701", "name": "Advanced Cryptography & Cloud Security", "class": "IV B.Tech I Sem (CSE-A)", "studentsCount": 64, "room": "LH-402"}
        ]
    },
    {
        "id": "AL00458",
        "name": "Sri K. Ramesh, M.Tech",
        "shortName": "Sri K. Ramesh",
        "role": "Faculty",
        "designation": "Associate Professor",
        "dept": "CSE",
        "deptName": "Computer Science & Engineering",
        "experience": "12 Years",
        "experienceYears": 12,
        "qualification": "M.Tech (CSE), B.Tech",
        "specialization": "Artificial Intelligence, Soft Computing, Machine Learning",
        "email": "ramesh.naidu.alits@gmail.com",
        "mobile": "+91 94402 33445",
        "cabin": "Faculty Cabin 08, Block-A",
        "room": "Faculty Cabin 08, Block-A",
        "avatar": "KR",
        "joiningDate": "10 August 2014",
        "papers": 16,
        "bio": "Associate Professor in CSE handling core subjects in Artificial Intelligence & Machine Learning.",
        "status": "Active / On Campus",
        "activeClasses": 3,
        "totalStudents": 180,
        "classesToday": 2,
        "leaveBalance": {"cl": 6, "ml": 8, "od": 4, "el": 10},
        "assignedSubjects": [
            {"code": "24A503", "name": "Artificial Intelligence & Machine Learning", "class": "III B.Tech I Sem (CSE-D)", "studentsCount": 64, "room": "LH-304"}
        ]
    },
    {
        "id": "AL00459",
        "name": "Mrs. G. Roja Ramani, M.Tech",
        "shortName": "Mrs. G. Roja Ramani",
        "role": "Faculty",
        "designation": "Associate Professor",
        "dept": "CSE",
        "deptName": "Computer Science & Engineering",
        "experience": "11 Years",
        "experienceYears": 11,
        "qualification": "M.Tech (CSE), B.Tech",
        "specialization": "Software Engineering, Agile Methodologies, Testing",
        "email": "rojaramani.cse@alits.ac.in",
        "mobile": "+91 94403 44556",
        "cabin": "Faculty Cabin 11, Block-A",
        "room": "Faculty Cabin 11, Block-A",
        "avatar": "RR",
        "joiningDate": "15 July 2015",
        "papers": 14,
        "bio": "Associate Professor in CSE specializing in Software Engineering and System Architecture.",
        "status": "Active / On Campus",
        "activeClasses": 3,
        "totalStudents": 160,
        "classesToday": 2,
        "leaveBalance": {"cl": 7, "ml": 9, "od": 5, "el": 11},
        "assignedSubjects": [
            {"code": "24A505", "name": "Software Engineering & Agile Methodologies", "class": "III B.Tech I Sem (CSE-D)", "studentsCount": 64, "room": "LH-304"}
        ]
    },
    {
        "id": "AL00460",
        "name": "Dr. S. Anjaneyulu, Ph.D., M.Tech",
        "shortName": "Dr. S. Anjaneyulu",
        "role": "Faculty",
        "designation": "Associate Professor",
        "dept": "CSE",
        "deptName": "Computer Science & Engineering",
        "experience": "14 Years",
        "experienceYears": 14,
        "qualification": "Ph.D., M.Tech",
        "specialization": "Data Structures, Algorithm Optimization, Graph Theory",
        "email": "anjaneyulu.cse@alits.ac.in",
        "mobile": "+91 98491 22003",
        "cabin": "Block-A Room 208",
        "room": "Block-A Room 208",
        "avatar": "SA",
        "joiningDate": "10 August 2015",
        "papers": 24,
        "bio": "Mentored 100+ competitive programmers for ACM-ICPC and national hackathons.",
        "status": "Active / In Session"
    },
    {
        "id": "AL00461",
        "name": "Smt. B. Swathi, M.Tech",
        "shortName": "Smt. B. Swathi",
        "role": "Faculty",
        "designation": "Associate Professor",
        "dept": "CSE",
        "deptName": "Computer Science & Engineering",
        "experience": "12 Years",
        "experienceYears": 12,
        "qualification": "M.Tech (CSE)",
        "specialization": "Automata Theory, Compiler Design",
        "email": "swathi.cse@alits.ac.in",
        "mobile": "+91 98491 22004",
        "cabin": "Block-A Room 210",
        "room": "Block-A Room 210",
        "avatar": "BS",
        "joiningDate": "05 January 2016",
        "papers": 12,
        "bio": "Specialist in compiler construction and high-performance computing frameworks.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00462",
        "name": "Sri M. Venkata Reddy, M.Tech",
        "shortName": "Sri M. Venkata Reddy",
        "role": "Faculty",
        "designation": "Assistant Professor",
        "dept": "CSE",
        "deptName": "Computer Science & Engineering",
        "experience": "9 Years",
        "experienceYears": 9,
        "qualification": "M.Tech (CSE)",
        "specialization": "Computer Networks, Cyber Forensics",
        "email": "venkata.cse@alits.ac.in",
        "mobile": "+91 98491 22005",
        "cabin": "Block-A Room 212",
        "room": "Block-A Room 212",
        "avatar": "VR",
        "joiningDate": "18 June 2017",
        "papers": 8,
        "bio": "Network security expert with CISCO CCNA certification credentials.",
        "status": "Active / In Session"
    },
    {
        "id": "AL00463",
        "name": "Sri K. Dileep Kumar, M.Tech",
        "shortName": "Sri K. Dileep Kumar",
        "role": "Faculty",
        "designation": "Assistant Professor",
        "dept": "CSE",
        "deptName": "Computer Science & Engineering",
        "experience": "7 Years",
        "experienceYears": 7,
        "qualification": "M.Tech (CSE)",
        "specialization": "Python Programming, Data Analytics",
        "email": "dileep.cse@alits.ac.in",
        "mobile": "+91 98491 22006",
        "cabin": "Block-A Room 214",
        "room": "Block-A Room 214",
        "avatar": "DK",
        "joiningDate": "02 July 2019",
        "papers": 6,
        "bio": "Data analytics consultant and faculty coordinator for open-source initiatives.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00464",
        "name": "Ms. A. Sandhya Rani, M.Tech",
        "shortName": "Ms. A. Sandhya Rani",
        "role": "Faculty",
        "designation": "Professor & HOD (AIML)",
        "dept": "AIML",
        "deptName": "Artificial Intelligence & Machine Learning",
        "experience": "16 Years",
        "experienceYears": 16,
        "qualification": "M.Tech (Ph.D)",
        "specialization": "Deep Learning, Natural Language Processing",
        "email": "hod.aiml@alits.ac.in",
        "mobile": "+91 98491 22007",
        "cabin": "Block-C Room 101",
        "room": "Block-C Room 101",
        "avatar": "SR",
        "joiningDate": "14 June 2018",
        "papers": 28,
        "bio": "Pioneered the AI & ML department curriculum and established NVIDIA GPU research lab.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00465",
        "name": "Dr. K. Divya, Ph.D.",
        "shortName": "Dr. K. Divya",
        "role": "Faculty",
        "designation": "Associate Professor",
        "dept": "AIML",
        "deptName": "Artificial Intelligence & Machine Learning",
        "experience": "11 Years",
        "experienceYears": 11,
        "qualification": "Ph.D., M.Tech",
        "specialization": "Computer Vision, Generative AI",
        "email": "divya.aiml@alits.ac.in",
        "mobile": "+91 98491 22008",
        "cabin": "Block-C Room 104",
        "room": "Block-C Room 104",
        "avatar": "KD",
        "joiningDate": "20 August 2020",
        "papers": 19,
        "bio": "Author of 3 published patents in autonomous object detection using edge TPUs.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00466",
        "name": "Sri B. Rajesh, M.Tech",
        "shortName": "Sri B. Rajesh",
        "role": "Faculty",
        "designation": "Assistant Professor",
        "dept": "AIML",
        "deptName": "Artificial Intelligence & Machine Learning",
        "experience": "8 Years",
        "experienceYears": 8,
        "qualification": "M.Tech (AI)",
        "specialization": "Reinforcement Learning, Robotics",
        "email": "rajesh.aiml@alits.ac.in",
        "mobile": "+91 98491 22009",
        "cabin": "Block-C Room 106",
        "room": "Block-C Room 106",
        "avatar": "BR",
        "joiningDate": "11 January 2021",
        "papers": 9,
        "bio": "Lead researcher for autonomous drone mapping projects supported by state DST grant.",
        "status": "Active / In Lab"
    },
    {
        "id": "AL00467",
        "name": "Smt. V. Keerthi, M.Tech",
        "shortName": "Smt. V. Keerthi",
        "role": "Faculty",
        "designation": "Assistant Professor",
        "dept": "AIML",
        "deptName": "Artificial Intelligence & Machine Learning",
        "experience": "6 Years",
        "experienceYears": 6,
        "qualification": "M.Tech",
        "specialization": "Knowledge Graphs, Conversational AI",
        "email": "keerthi.aiml@alits.ac.in",
        "mobile": "+91 98491 22010",
        "cabin": "Block-C Room 108",
        "room": "Block-C Room 108",
        "avatar": "VK",
        "joiningDate": "05 July 2022",
        "papers": 5,
        "bio": "Mentors the college student chatbot innovation team and speech processing research.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00468",
        "name": "Dr. Y. L. Ajay Kumar, Ph.D.",
        "shortName": "Dr. Y. L. Ajay Kumar",
        "role": "Faculty",
        "designation": "Professor & HOD (ECE)",
        "dept": "ECE",
        "deptName": "Electronics & Communication Engineering",
        "experience": "20 Years",
        "experienceYears": 20,
        "qualification": "Ph.D., M.Tech",
        "specialization": "VLSI Design, Embedded Systems, IoT",
        "email": "hod.ece@alits.ac.in",
        "mobile": "+91 98491 22011",
        "cabin": "Block-B Room 101",
        "room": "Block-B Room 101",
        "avatar": "AK",
        "joiningDate": "15 June 2011",
        "papers": 42,
        "bio": "Senior academician with expertise in Cadence/Synopsys VLSI toolchain and ARM architectures.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00469",
        "name": "Sri G. Pavan Kumar, M.Tech",
        "shortName": "Sri G. Pavan Kumar",
        "role": "Faculty",
        "designation": "Professor & Controller of Examinations",
        "dept": "ECE",
        "deptName": "Electronics & Communication Engineering",
        "experience": "17 Years",
        "experienceYears": 17,
        "qualification": "M.Tech (ECE)",
        "specialization": "Digital Signal Processing, Wireless Comms",
        "email": "coe@alits.ac.in",
        "mobile": "+91 98491 22012",
        "cabin": "Exam Branch Main Office",
        "room": "Exam Branch Main Office",
        "avatar": "PK",
        "joiningDate": "18 July 2013",
        "papers": 26,
        "bio": "Heads the Autonomous Examination Directorate, driving automated QP generation and fast valuation.",
        "status": "Active / In Session"
    },
    {
        "id": "AL00470",
        "name": "Dr. G. Madhav, Ph.D.",
        "shortName": "Dr. G. Madhav",
        "role": "Faculty",
        "designation": "Associate Professor",
        "dept": "ECE",
        "deptName": "Electronics & Communication Engineering",
        "experience": "13 Years",
        "experienceYears": 13,
        "qualification": "Ph.D., M.Tech",
        "specialization": "Microwave Engineering, Antennas",
        "email": "madhav.ece@alits.ac.in",
        "mobile": "+91 98491 22013",
        "cabin": "Block-B Room 106",
        "room": "Block-B Room 106",
        "avatar": "GM",
        "joiningDate": "12 August 2016",
        "papers": 21,
        "bio": "Specializes in 5G microstrip antenna arrays with multiple IEEE Transactions citations.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00471",
        "name": "Smt. R. Lakshmi, M.Tech",
        "shortName": "Smt. R. Lakshmi",
        "role": "Faculty",
        "designation": "Assistant Professor",
        "dept": "ECE",
        "deptName": "Electronics & Communication Engineering",
        "experience": "8 Years",
        "experienceYears": 8,
        "qualification": "M.Tech",
        "specialization": "Digital Systems, Microcontrollers",
        "email": "lakshmi.ece@alits.ac.in",
        "mobile": "+91 98491 22014",
        "cabin": "Block-B Room 108",
        "room": "Block-B Room 108",
        "avatar": "RL",
        "joiningDate": "04 July 2018",
        "papers": 7,
        "bio": "Coordinator for Texas Instruments embedded systems laboratory.",
        "status": "Active / In Lab"
    },
    {
        "id": "AL00472",
        "name": "Dr. K. Krishna Priya, Ph.D.",
        "shortName": "Dr. K. Krishna Priya",
        "role": "Faculty",
        "designation": "Professor & HOD (EEE)",
        "dept": "EEE",
        "deptName": "Electrical & Electronics Engineering",
        "experience": "19 Years",
        "experienceYears": 19,
        "qualification": "Ph.D., M.Tech",
        "specialization": "Power Systems, Smart Grids, Renewable Energy",
        "email": "hod.eee@alits.ac.in",
        "mobile": "+91 98491 22015",
        "cabin": "Block-D Room 101",
        "room": "Block-D Room 101",
        "avatar": "KP",
        "joiningDate": "10 June 2012",
        "papers": 36,
        "bio": "Principal investigator for campus 200kW solar micro-grid synchronization.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00473",
        "name": "Sri T. V. Subba Rao, M.Tech",
        "shortName": "Sri T. V. Subba Rao",
        "role": "Faculty",
        "designation": "Associate Professor",
        "dept": "EEE",
        "deptName": "Electrical & Electronics Engineering",
        "experience": "15 Years",
        "experienceYears": 15,
        "qualification": "M.Tech (EEE)",
        "specialization": "Power Electronics, EV Drives",
        "email": "subbarao.eee@alits.ac.in",
        "mobile": "+91 98491 22016",
        "cabin": "Block-D Room 104",
        "room": "Block-D Room 104",
        "avatar": "SR",
        "joiningDate": "20 July 2014",
        "papers": 18,
        "bio": "Lead researcher for electric vehicle motor controllers and regenerative braking simulation.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00474",
        "name": "Smt. D. Sunita, M.Tech",
        "shortName": "Smt. D. Sunita",
        "role": "Faculty",
        "designation": "Assistant Professor",
        "dept": "EEE",
        "deptName": "Electrical & Electronics Engineering",
        "experience": "7 Years",
        "experienceYears": 7,
        "qualification": "M.Tech",
        "specialization": "Control Systems, Industrial Automation",
        "email": "sunita.eee@alits.ac.in",
        "mobile": "+91 98491 22017",
        "cabin": "Block-D Room 107",
        "room": "Block-D Room 107",
        "avatar": "DS",
        "joiningDate": "08 August 2019",
        "papers": 6,
        "bio": "Coordinates PLC & SCADA industrial training workshops.",
        "status": "Active / In Session"
    },
    {
        "id": "AL00475",
        "name": "Mr. K. Nagabhushanam, M.Tech",
        "shortName": "Mr. K. Nagabhushanam",
        "role": "Faculty",
        "designation": "Associate Professor & HOD (CIVIL)",
        "dept": "CIVIL",
        "deptName": "Civil Engineering",
        "experience": "17 Years",
        "experienceYears": 17,
        "qualification": "M.Tech (Structural Eng)",
        "specialization": "Structural Dynamics, Seismic Design",
        "email": "hod.civil@alits.ac.in",
        "mobile": "+91 98491 22018",
        "cabin": "Civil Block Room 101",
        "room": "Civil Block Room 101",
        "avatar": "NB",
        "joiningDate": "14 June 2013",
        "papers": 22,
        "bio": "Consultant for high-rise earthquake resistant structures and STAAD.Pro analytics.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00476",
        "name": "Sri R. Koushik, M.Tech",
        "shortName": "Sri R. Koushik",
        "role": "Faculty",
        "designation": "Assistant Professor",
        "dept": "CIVIL",
        "deptName": "Civil Engineering",
        "experience": "8 Years",
        "experienceYears": 8,
        "qualification": "M.Tech (Geotech)",
        "specialization": "Geotechnical Eng, GIS & Remote Sensing",
        "email": "koushik.civil@alits.ac.in",
        "mobile": "+91 98491 22019",
        "cabin": "Civil Block Room 104",
        "room": "Civil Block Room 104",
        "avatar": "RK",
        "joiningDate": "19 July 2018",
        "papers": 8,
        "bio": "Expert in soil stabilization and GIS mapping for watershed management.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00477",
        "name": "Mr. M. Ashok, M.Tech",
        "shortName": "Mr. M. Ashok",
        "role": "Faculty",
        "designation": "Associate Professor & HOD (MECH)",
        "dept": "MECH",
        "deptName": "Mechanical Engineering",
        "experience": "18 Years",
        "experienceYears": 18,
        "qualification": "M.Tech (Thermal Eng)",
        "specialization": "Thermal Eng, CFD, Renewable Energy",
        "email": "hod.mech@alits.ac.in",
        "mobile": "+91 98491 22020",
        "cabin": "Mech Block Room 101",
        "room": "Mech Block Room 101",
        "avatar": "MA",
        "joiningDate": "11 June 2012",
        "papers": 25,
        "bio": "Specialist in ANSYS Fluent simulation and solar thermal collector design.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00478",
        "name": "Sri V. Prashanth, M.Tech",
        "shortName": "Sri V. Prashanth",
        "role": "Faculty",
        "designation": "Assistant Professor",
        "dept": "MECH",
        "deptName": "Mechanical Engineering",
        "experience": "9 Years",
        "experienceYears": 9,
        "qualification": "M.Tech (CAD/CAM)",
        "specialization": "3D Printing, CNC Automation",
        "email": "prashanth.mech@alits.ac.in",
        "mobile": "+91 98491 22021",
        "cabin": "Mech Block Room 105",
        "room": "Mech Block Room 105",
        "avatar": "VP",
        "joiningDate": "16 July 2017",
        "papers": 10,
        "bio": "In-charge for advanced CNC machining center and college prototyping cell.",
        "status": "Active / In Lab"
    },
    {
        "id": "AL00479",
        "name": "Dr. C. Rajeswari, Ph.D.",
        "shortName": "Dr. C. Rajeswari",
        "role": "Faculty",
        "designation": "Professor & HOD (H&S)",
        "dept": "HS",
        "deptName": "Humanities & Sciences",
        "experience": "21 Years",
        "experienceYears": 21,
        "qualification": "Ph.D. (Mathematics)",
        "specialization": "Applied Mathematics, Numerical Methods",
        "email": "hod.hs@alits.ac.in",
        "mobile": "+91 98491 22022",
        "cabin": "H&S Block Room 101",
        "room": "H&S Block Room 101",
        "avatar": "CR",
        "joiningDate": "01 June 2010",
        "papers": 34,
        "bio": "Heads the foundational Sciences department, mentoring I B.Tech students in advanced calculus.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00480",
        "name": "Dr. M. Surendra Naidu, Ph.D.",
        "shortName": "Dr. M. Surendra Naidu",
        "role": "Faculty",
        "designation": "Professor, TPO & Skill Development Director",
        "dept": "CSE",
        "deptName": "Skill Development & Placements",
        "experience": "20 Years",
        "experienceYears": 20,
        "qualification": "Ph.D., M.Tech, MBA",
        "specialization": "Corporate Relations, Full-Stack, Cloud (AWS/Azure)",
        "email": "surendranaidu.tpo@gmail.com",
        "mobile": "+91 94401 99884",
        "cabin": "T&P Directorate Cell, Block-A",
        "room": "T&P Directorate Cell, Block-A",
        "avatar": "SN",
        "joiningDate": "05 July 2011",
        "papers": 30,
        "bio": "Directs campus placement drives, corporate MOUs, and advanced technical training across ALITS.",
        "status": "Active / On Campus"
    },
    {
        "id": "AL00481",
        "name": "Prof. T. Suresh, M.Tech",
        "shortName": "Prof. T. Suresh",
        "role": "Faculty",
        "designation": "Principal / Director (Polytechnic)",
        "dept": "DIPLOMA",
        "deptName": "Polytechnic / Diploma Stream",
        "experience": "22 Years",
        "experienceYears": 22,
        "qualification": "M.Tech",
        "specialization": "Polytechnic Education, Technical Skill Training",
        "email": "director.polytechnic@alits.ac.in",
        "mobile": "+91 98491 22026",
        "cabin": "Diploma Block Room 101",
        "room": "Diploma Block Room 101",
        "avatar": "TS",
        "joiningDate": "01 June 2009",
        "papers": 15,
        "bio": "Directs the diploma polytechnic education wing with hands-on industrial curriculum.",
        "status": "Active / On Campus"
    }
]

def sync_all():
    print("[1/5] Syncing seed_data.json...")
    with open(SEED_PATH, "r", encoding="utf-8") as f:
        seed_data = json.load(f)

    # Attach initial password = ID to each faculty
    for fac in FACULTY_RECORDS:
        fac["password"] = fac["id"]

    seed_data["faculty"] = FACULTY_RECORDS

    with open(SEED_PATH, "w", encoding="utf-8") as f:
        json.dump(seed_data, f, indent=2, ensure_ascii=False)

    print(f"[OK] Saved {len(FACULTY_RECORDS)} faculty records to {SEED_PATH}")

    print("[2/5] Syncing erp_state.json...")
    with open(STATE_BACKUP_PATH, "w", encoding="utf-8") as f:
        json.dump(seed_data, f, indent=2, ensure_ascii=False)
    print(f"[OK] Saved {len(FACULTY_RECORDS)} faculty records to {STATE_BACKUP_PATH}")

    print("[3/5] Updating SQLite Database...")
    conn = sqlite3.connect(str(DB_PATH))
    cur = conn.cursor()

    # Ensure users table schema
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

    # Remove any old faculty rows from users table (e.g. STF-CSE-102, etc.)
    cur.execute("DELETE FROM users WHERE role = 'Faculty' OR username LIKE 'STF-%' OR username LIKE 'FAC-%'")

    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Insert all updated faculty
    for fac in FACULTY_RECORDS:
        fac_id = fac["id"]
        pwd_hash = hash_password(fac_id) # Initial/Default password is their own Faculty ID
        cur.execute("""
            INSERT OR REPLACE INTO users (
                id, username, password_hash, role, full_name, student_roll_no,
                employee_id, email, mobile, status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            fac_id,
            fac_id.lower(),
            pwd_hash,
            "Faculty",
            fac["name"],
            None,
            fac_id,
            fac.get("email"),
            fac.get("mobile", "").replace(" ", "").replace("+91", ""),
            "active",
            now_str
        ))

    # Update system_state row 1
    state_str = json.dumps(seed_data)
    cur.execute("""
        UPDATE system_state
        SET state_json = ?, updated_at = ?, change_summary = 'Updated Faculty Roster to AL##### IDs and Auth credentials'
        WHERE id = 1
    """, (state_str, datetime.datetime.now().isoformat()))

    conn.commit()
    conn.close()
    print("[OK] SQLite Database users and system_state successfully updated.")

if __name__ == "__main__":
    sync_all()
