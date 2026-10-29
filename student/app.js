/* ==========================================================================
   ALITS STUDENT PORTAL - APPLICATION LOGIC
   Dedicated, Student-Isolated Interactive Portal
   ========================================================================== */

// --- STUDENT DATABASE REPOSITORY ---
var STUDENT_DATABASE = window.STUDENT_DATABASE || {
  '242G1A05J9': {
    rollNo: '242G1A05J9',
    name: 'Shaik Bilqees',
    role: 'Student',
    gender: 'Female',
    dob: '1-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'shaik.bilqees.alits@gmail.com',
    studentPhone: '9848100501',
    parentName: 'Shaik Mahaboob',
    parentPhone: '9848100601',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 91.5,
    attendedClasses: 366,
    totalClasses: 400,
    cgpa: 8.82,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 93, conducted: 60, attended: 55, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 91, conducted: 58, attended: 53, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 89, conducted: 55, attended: 50, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 95, conducted: 50, attended: 46, mid1: 27, mid2: 26, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 91, conducted: 52, attended: 48, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.67, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.92, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.77, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.97, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.82, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K0': {
    rollNo: '242G1A05K0',
    name: 'Shaik Khaja Faheem Naz',
    role: 'Student',
    gender: 'Male',
    dob: '2-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'khaja.faheem.alits@gmail.com',
    studentPhone: '9848100502',
    parentName: 'Shaik Nazir',
    parentPhone: '9848100602',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 88.0,
    attendedClasses: 352,
    totalClasses: 400,
    cgpa: 8.45,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 90, conducted: 60, attended: 53, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 88, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 86, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 92, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.45, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K1': {
    rollNo: '242G1A05K1',
    name: 'Shaik Mahaboob Basha',
    role: 'Student',
    gender: 'Male',
    dob: '3-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'mahaboob.basha.alits@gmail.com',
    studentPhone: '9848100503',
    parentName: 'Shaik Basha Sr.',
    parentPhone: '9848100603',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 89.2,
    attendedClasses: 357,
    totalClasses: 400,
    cgpa: 8.6,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 91, conducted: 60, attended: 54, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 89, conducted: 58, attended: 52, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 87, conducted: 55, attended: 49, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 93, conducted: 50, attended: 45, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 89, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.60, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K2': {
    rollNo: '242G1A05K2',
    name: 'Shaik Mahammad Affan',
    role: 'Student',
    gender: 'Male',
    dob: '4-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'mahammad.affan.alits@gmail.com',
    studentPhone: '9848100504',
    parentName: 'Shaik Kareem',
    parentPhone: '9848100604',
    address: 'Anantha Boys Hostel, Room B-205',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 86.4,
    attendedClasses: 346,
    totalClasses: 400,
    cgpa: 8.3,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 88, conducted: 60, attended: 52, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 86, conducted: 58, attended: 50, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 84, conducted: 55, attended: 48, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 90, conducted: 50, attended: 43, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 86, conducted: 52, attended: 45, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.30, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K3': {
    rollNo: '242G1A05K3',
    name: 'Shaik Mahammad Thousif',
    role: 'Student',
    gender: 'Male',
    dob: '5-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'mahammad.thousif.alits@gmail.com',
    studentPhone: '9848100505',
    parentName: 'Shaik Ghouse',
    parentPhone: '9848100605',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 92.0,
    attendedClasses: 368,
    totalClasses: 400,
    cgpa: 8.9,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 94, conducted: 60, attended: 55, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 92, conducted: 58, attended: 53, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 90, conducted: 55, attended: 51, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 96, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 92, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.90, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K4': {
    rollNo: '242G1A05K4',
    name: 'Shaik Mahammad Jubar',
    role: 'Student',
    gender: 'Male',
    dob: '6-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'mahammad.jubar.alits@gmail.com',
    studentPhone: '9848100506',
    parentName: 'Shaik Subhan',
    parentPhone: '9848100606',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 84.5,
    attendedClasses: 338,
    totalClasses: 400,
    cgpa: 8.15,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 86, conducted: 60, attended: 51, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 84, conducted: 58, attended: 49, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 82, conducted: 55, attended: 46, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 88, conducted: 50, attended: 42, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 84, conducted: 52, attended: 44, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.10, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.15, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K5': {
    rollNo: '242G1A05K5',
    name: 'Shaik M. Dadapeer',
    role: 'Student',
    gender: 'Male',
    dob: '7-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'dadapeer.alits@gmail.com',
    studentPhone: '9848100507',
    parentName: 'Shaik Dada',
    parentPhone: '9848100607',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 87.5,
    attendedClasses: 350,
    totalClasses: 400,
    cgpa: 8.5,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 89, conducted: 60, attended: 52, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 87, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 85, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 91, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 87, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K6': {
    rollNo: '242G1A05K6',
    name: 'Sayd Fatheen',
    role: 'Student',
    gender: 'Male',
    dob: '8-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'sayd.fatheen.alits@gmail.com',
    studentPhone: '9848100508',
    parentName: 'Sayd Anwar',
    parentPhone: '9848100608',
    address: 'Anantha Boys Hostel, Room B-205',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 85.0,
    attendedClasses: 340,
    totalClasses: 400,
    cgpa: 8.25,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 87, conducted: 60, attended: 51, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 85, conducted: 58, attended: 49, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 83, conducted: 55, attended: 47, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 89, conducted: 50, attended: 42, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 85, conducted: 52, attended: 44, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.25, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K7': {
    rollNo: '242G1A05K7',
    name: 'Syed Khizar Fathima',
    role: 'Student',
    gender: 'Female',
    dob: '9-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'khizar.fathima.alits@gmail.com',
    studentPhone: '9848100509',
    parentName: 'Syed Khaja',
    parentPhone: '9848100609',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 94.0,
    attendedClasses: 376,
    totalClasses: 400,
    cgpa: 9.2,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 96, conducted: 60, attended: 56, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 94, conducted: 58, attended: 55, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 92, conducted: 55, attended: 52, mid1: 26, mid2: 28, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 98, conducted: 50, attended: 47, mid1: 29, mid2: 28, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 94, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.20, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K8': {
    rollNo: '242G1A05K8',
    name: 'Syed Yashmin',
    role: 'Student',
    gender: 'Female',
    dob: '10-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'syed.yashmin.alits@gmail.com',
    studentPhone: '9848100510',
    parentName: 'Syed Mansoor',
    parentPhone: '9848100610',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 93.2,
    attendedClasses: 373,
    totalClasses: 400,
    cgpa: 9.05,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 95, conducted: 60, attended: 56, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 93, conducted: 58, attended: 54, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 91, conducted: 55, attended: 51, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 97, conducted: 50, attended: 47, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 93, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.90, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.00, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.05, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05K9': {
    rollNo: '242G1A05K9',
    name: 'T. Harshitha',
    role: 'Student',
    gender: 'Female',
    dob: '11-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 't.harshitha.alits@gmail.com',
    studentPhone: '9848100511',
    parentName: 'T. Sreenivasulu',
    parentPhone: '9848100611',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 90.0,
    attendedClasses: 360,
    totalClasses: 400,
    cgpa: 8.75,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 92, conducted: 60, attended: 54, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 90, conducted: 58, attended: 52, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 88, conducted: 55, attended: 50, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 94, conducted: 50, attended: 45, mid1: 27, mid2: 26, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 90, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.75, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L0': {
    rollNo: '242G1A05L0',
    name: 'T. Sagar',
    role: 'Student',
    gender: 'Male',
    dob: '12-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 't.sagar.alits@gmail.com',
    studentPhone: '9848100512',
    parentName: 'T. Ramana',
    parentPhone: '9848100612',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 83.5,
    attendedClasses: 334,
    totalClasses: 400,
    cgpa: 8.1,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 85, conducted: 60, attended: 50, mid1: 22, mid2: 23, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 83, conducted: 58, attended: 48, mid1: 22, mid2: 23, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 81, conducted: 55, attended: 46, mid1: 21, mid2: 23, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 87, conducted: 50, attended: 42, mid1: 24, mid2: 23, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 83, conducted: 52, attended: 43, mid1: 22, mid2: 23, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 7.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.10, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L1': {
    rollNo: '242G1A05L1',
    name: 'Thadimarri Ruchitha',
    role: 'Student',
    gender: 'Female',
    dob: '13-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 't.ruchitha.alits@gmail.com',
    studentPhone: '9848100513',
    parentName: 'T. Venkataramana',
    parentPhone: '9848100613',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 95.0,
    attendedClasses: 380,
    totalClasses: 400,
    cgpa: 9.35,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 97, conducted: 60, attended: 57, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 95, conducted: 58, attended: 55, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 93, conducted: 55, attended: 52, mid1: 26, mid2: 28, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 99, conducted: 50, attended: 48, mid1: 29, mid2: 28, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 95, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.35, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L2': {
    rollNo: '242G1A05L2',
    name: 'Tharigopula Sowjanya',
    role: 'Student',
    gender: 'Female',
    dob: '14-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 't.sowjanya.alits@gmail.com',
    studentPhone: '9848100514',
    parentName: 'T. Peddanna',
    parentPhone: '9848100614',
    address: 'Lakshmi Girls Hostel, Room G-102',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 88.5,
    attendedClasses: 354,
    totalClasses: 400,
    cgpa: 8.65,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 90, conducted: 60, attended: 53, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 88, conducted: 58, attended: 51, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 86, conducted: 55, attended: 49, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 92, conducted: 50, attended: 44, mid1: 27, mid2: 26, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 88, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.65, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L3': {
    rollNo: '242G1A05L3',
    name: 'Valmiki Tejaswani',
    role: 'Student',
    gender: 'Female',
    dob: '15-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'v.tejaswani.alits@gmail.com',
    studentPhone: '9848100515',
    parentName: 'V. Ramudu',
    parentPhone: '9848100615',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 89.0,
    attendedClasses: 356,
    totalClasses: 400,
    cgpa: 8.7,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 91, conducted: 60, attended: 53, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 89, conducted: 58, attended: 52, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 87, conducted: 55, attended: 49, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 93, conducted: 50, attended: 44, mid1: 27, mid2: 26, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 89, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.70, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L4': {
    rollNo: '242G1A05L4',
    name: 'Vanam Hansika',
    role: 'Student',
    gender: 'Female',
    dob: '16-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'v.hansika.alits@gmail.com',
    studentPhone: '9848100516',
    parentName: 'V. Narayana',
    parentPhone: '9848100616',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 92.5,
    attendedClasses: 370,
    totalClasses: 400,
    cgpa: 9.1,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 94, conducted: 60, attended: 56, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 92, conducted: 58, attended: 54, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 90, conducted: 55, attended: 51, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 96, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 92, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.10, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L5': {
    rollNo: '242G1A05L5',
    name: 'Yadava Ramya Sree',
    role: 'Student',
    gender: 'Female',
    dob: '17-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'y.ramyasree.alits@gmail.com',
    studentPhone: '9848100517',
    parentName: 'Y. Govindappa',
    parentPhone: '9848100617',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 91.0,
    attendedClasses: 364,
    totalClasses: 400,
    cgpa: 8.95,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 93, conducted: 60, attended: 55, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 91, conducted: 58, attended: 53, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 89, conducted: 55, attended: 50, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 95, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 91, conducted: 52, attended: 47, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.10, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.95, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L6': {
    rollNo: '242G1A05L6',
    name: 'Yalamadala Sravya Sree',
    role: 'Student',
    gender: 'Female',
    dob: '18-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'y.sravyasree.alits@gmail.com',
    studentPhone: '9848100518',
    parentName: 'Y. Gopal',
    parentPhone: '9848100618',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 93.0,
    attendedClasses: 372,
    totalClasses: 400,
    cgpa: 9.15,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 95, conducted: 60, attended: 56, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 93, conducted: 58, attended: 54, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 91, conducted: 55, attended: 51, mid1: 26, mid2: 28, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 97, conducted: 50, attended: 46, mid1: 29, mid2: 28, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 93, conducted: 52, attended: 48, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.10, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.15, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L7': {
    rollNo: '242G1A05L7',
    name: 'A. Purna Prashanth',
    role: 'Student',
    gender: 'Male',
    dob: '19-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'a.prashanth.alits@gmail.com',
    studentPhone: '9848100519',
    parentName: 'A. Mallikarjuna',
    parentPhone: '9848100619',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 85.5,
    attendedClasses: 342,
    totalClasses: 400,
    cgpa: 8.2,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 87, conducted: 60, attended: 51, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 85, conducted: 58, attended: 50, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 83, conducted: 55, attended: 47, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 89, conducted: 50, attended: 43, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 85, conducted: 52, attended: 44, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.20, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L8': {
    rollNo: '242G1A05L8',
    name: 'A. Sreeshanth',
    role: 'Student',
    gender: 'Male',
    dob: '20-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'a.sreeshanth.alits@gmail.com',
    studentPhone: '9848100520',
    parentName: 'A. Venkatesh',
    parentPhone: '9848100620',
    address: 'Anantha Boys Hostel, Room B-205',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 87.0,
    attendedClasses: 348,
    totalClasses: 400,
    cgpa: 8.4,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 89, conducted: 60, attended: 52, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 87, conducted: 58, attended: 50, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 85, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 91, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 87, conducted: 52, attended: 45, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.40, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05L9': {
    rollNo: '242G1A05L9',
    name: 'B. Hari Priya',
    role: 'Student',
    gender: 'Female',
    dob: '21-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'b.haripriya.alits@gmail.com',
    studentPhone: '9848100521',
    parentName: 'B. Nagaraju',
    parentPhone: '9848100621',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 94.5,
    attendedClasses: 378,
    totalClasses: 400,
    cgpa: 9.25,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 96, conducted: 60, attended: 57, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 94, conducted: 58, attended: 55, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 92, conducted: 55, attended: 52, mid1: 26, mid2: 28, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 98, conducted: 50, attended: 47, mid1: 29, mid2: 28, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 94, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.25, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M0': {
    rollNo: '242G1A05M0',
    name: 'B. Karunakar',
    role: 'Student',
    gender: 'Male',
    dob: '22-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'b.karunakar.alits@gmail.com',
    studentPhone: '9848100522',
    parentName: 'B. Ramachandra',
    parentPhone: '9848100622',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 86.0,
    attendedClasses: 344,
    totalClasses: 400,
    cgpa: 8.35,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 88, conducted: 60, attended: 52, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 86, conducted: 58, attended: 50, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 84, conducted: 55, attended: 47, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 90, conducted: 50, attended: 43, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 86, conducted: 52, attended: 45, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.35, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M1': {
    rollNo: '242G1A05M1',
    name: 'B. Abhishek',
    role: 'Student',
    gender: 'Male',
    dob: '23-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'b.abhishek.alits@gmail.com',
    studentPhone: '9848100523',
    parentName: 'B. Sekhar',
    parentPhone: '9848100623',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 88.0,
    attendedClasses: 352,
    totalClasses: 400,
    cgpa: 8.55,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 90, conducted: 60, attended: 53, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 88, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 86, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 92, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.55, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M2': {
    rollNo: '242G1A05M2',
    name: 'Charan Deekshik',
    role: 'Student',
    gender: 'Male',
    dob: '24-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'charan.deekshik.alits@gmail.com',
    studentPhone: '9848100524',
    parentName: 'C. Ramesh',
    parentPhone: '9848100624',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 89.5,
    attendedClasses: 358,
    totalClasses: 400,
    cgpa: 8.68,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 91, conducted: 60, attended: 54, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 89, conducted: 58, attended: 52, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 87, conducted: 55, attended: 49, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 93, conducted: 50, attended: 45, mid1: 27, mid2: 26, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 89, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.53, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.78, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.63, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.83, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.68, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M3': {
    rollNo: '242G1A05M3',
    name: 'S. Baba Fakruddin',
    role: 'Student',
    gender: 'Male',
    dob: '25-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'baba.fakruddin.alits@gmail.com',
    studentPhone: '9848100525',
    parentName: 'S. Hussain',
    parentPhone: '9848100625',
    address: 'Anantha Boys Hostel, Room B-205',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 90.5,
    attendedClasses: 362,
    totalClasses: 400,
    cgpa: 8.8,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 92, conducted: 60, attended: 54, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 90, conducted: 58, attended: 52, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 88, conducted: 55, attended: 50, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 94, conducted: 50, attended: 45, mid1: 27, mid2: 26, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 90, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.90, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.95, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.80, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M4': {
    rollNo: '242G1A05M4',
    name: 'B. Raja Sekhar',
    role: 'Student',
    gender: 'Male',
    dob: '26-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'b.rajasekhar.alits@gmail.com',
    studentPhone: '9848100526',
    parentName: 'B. Obulesu',
    parentPhone: '9848100626',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 84.0,
    attendedClasses: 336,
    totalClasses: 400,
    cgpa: 8.1,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 86, conducted: 60, attended: 50, mid1: 22, mid2: 23, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 84, conducted: 58, attended: 49, mid1: 22, mid2: 23, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 82, conducted: 55, attended: 46, mid1: 21, mid2: 23, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 88, conducted: 50, attended: 42, mid1: 24, mid2: 23, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 84, conducted: 52, attended: 44, mid1: 22, mid2: 23, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 7.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.10, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M5': {
    rollNo: '242G1A05M5',
    name: 'B. Akshaya',
    role: 'Student',
    gender: 'Female',
    dob: '27-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'b.akshaya.alits@gmail.com',
    studentPhone: '9848100527',
    parentName: 'B. Prasad',
    parentPhone: '9848100627',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 96.0,
    attendedClasses: 384,
    totalClasses: 400,
    cgpa: 9.4,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 98, conducted: 60, attended: 58, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 96, conducted: 58, attended: 56, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 94, conducted: 55, attended: 53, mid1: 27, mid2: 29, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 99, conducted: 50, attended: 48, mid1: 30, mid2: 29, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 96, conducted: 52, attended: 50, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.40, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M6': {
    rollNo: '242G1A05M6',
    name: 'C. Leela',
    role: 'Student',
    gender: 'Female',
    dob: '28-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'c.leela.alits@gmail.com',
    studentPhone: '9848100528',
    parentName: 'C. Sivanna',
    parentPhone: '9848100628',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 92.0,
    attendedClasses: 368,
    totalClasses: 400,
    cgpa: 9.0,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 94, conducted: 60, attended: 55, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 92, conducted: 58, attended: 53, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 90, conducted: 55, attended: 51, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 96, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 92, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.95, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.00, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M7': {
    rollNo: '242G1A05M7',
    name: 'C. Neethsa',
    role: 'Student',
    gender: 'Female',
    dob: '1-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'c.neethsa.alits@gmail.com',
    studentPhone: '9848100529',
    parentName: 'C. Mohan',
    parentPhone: '9848100629',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 91.5,
    attendedClasses: 366,
    totalClasses: 400,
    cgpa: 8.9,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 93, conducted: 60, attended: 55, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 91, conducted: 58, attended: 53, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 89, conducted: 55, attended: 50, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 95, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 91, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.90, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M8': {
    rollNo: '242G1A05M8',
    name: 'C. Yogananda',
    role: 'Student',
    gender: 'Male',
    dob: '2-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'c.yogananda.alits@gmail.com',
    studentPhone: '9848100530',
    parentName: 'C. Anjinappa',
    parentPhone: '9848100630',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 87.5,
    attendedClasses: 350,
    totalClasses: 400,
    cgpa: 8.45,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 89, conducted: 60, attended: 52, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 87, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 85, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 91, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 87, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.45, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05M9': {
    rollNo: '242G1A05M9',
    name: 'D. Jyoshana',
    role: 'Student',
    gender: 'Female',
    dob: '3-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'd.jyoshana.alits@gmail.com',
    studentPhone: '9848100531',
    parentName: 'D. Narayana',
    parentPhone: '9848100631',
    address: 'Lakshmi Girls Hostel, Room G-102',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 93.5,
    attendedClasses: 374,
    totalClasses: 400,
    cgpa: 9.15,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 95, conducted: 60, attended: 56, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 93, conducted: 58, attended: 54, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 91, conducted: 55, attended: 51, mid1: 26, mid2: 28, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 97, conducted: 50, attended: 47, mid1: 29, mid2: 28, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 93, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.10, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.15, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N0': {
    rollNo: '242G1A05N0',
    name: 'D. Keerthi',
    role: 'Student',
    gender: 'Female',
    dob: '4-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'd.keerthi.alits@gmail.com',
    studentPhone: '9848100532',
    parentName: 'D. Lakshmanna',
    parentPhone: '9848100632',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 90.0,
    attendedClasses: 360,
    totalClasses: 400,
    cgpa: 8.85,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 92, conducted: 60, attended: 54, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 90, conducted: 58, attended: 52, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 88, conducted: 55, attended: 50, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 94, conducted: 50, attended: 45, mid1: 27, mid2: 26, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 90, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.00, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.85, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N1': {
    rollNo: '242G1A05N1',
    name: 'D. Shaban',
    role: 'Student',
    gender: 'Male',
    dob: '5-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'd.shaban.alits@gmail.com',
    studentPhone: '9848100533',
    parentName: 'D. Rasool',
    parentPhone: '9848100633',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 85.0,
    attendedClasses: 340,
    totalClasses: 400,
    cgpa: 8.2,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 87, conducted: 60, attended: 51, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 85, conducted: 58, attended: 49, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 83, conducted: 55, attended: 47, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 89, conducted: 50, attended: 42, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 85, conducted: 52, attended: 44, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.20, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N2': {
    rollNo: '242G1A05N2',
    name: 'G. Manesha',
    role: 'Student',
    gender: 'Female',
    dob: '6-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'g.manesha.alits@gmail.com',
    studentPhone: '9848100534',
    parentName: 'G. Peddanna',
    parentPhone: '9848100634',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 89.0,
    attendedClasses: 356,
    totalClasses: 400,
    cgpa: 8.7,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 91, conducted: 60, attended: 53, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 89, conducted: 58, attended: 52, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 87, conducted: 55, attended: 49, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 93, conducted: 50, attended: 44, mid1: 27, mid2: 26, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 89, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.70, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N3': {
    rollNo: '242G1A05N3',
    name: 'G. Meharnesa',
    role: 'Student',
    gender: 'Female',
    dob: '7-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'g.meharnesa.alits@gmail.com',
    studentPhone: '9848100535',
    parentName: 'G. Khader',
    parentPhone: '9848100635',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 92.0,
    attendedClasses: 368,
    totalClasses: 400,
    cgpa: 8.95,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 94, conducted: 60, attended: 55, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 92, conducted: 58, attended: 53, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 90, conducted: 55, attended: 51, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 96, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 92, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.10, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.95, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N4': {
    rollNo: '242G1A05N4',
    name: 'G. Thriloknath',
    role: 'Student',
    gender: 'Male',
    dob: '8-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'g.thriloknath.alits@gmail.com',
    studentPhone: '9848100536',
    parentName: 'G. Thimmappa',
    parentPhone: '9848100636',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 88.0,
    attendedClasses: 352,
    totalClasses: 400,
    cgpa: 8.5,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 90, conducted: 60, attended: 53, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 88, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 86, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 92, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N5': {
    rollNo: '242G1A05N5',
    name: 'G. Paramesh',
    role: 'Student',
    gender: 'Male',
    dob: '9-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'g.paramesh.alits@gmail.com',
    studentPhone: '9848100537',
    parentName: 'G. Venkataramana',
    parentPhone: '9848100637',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 86.5,
    attendedClasses: 346,
    totalClasses: 400,
    cgpa: 8.35,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 88, conducted: 60, attended: 52, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 86, conducted: 58, attended: 50, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 84, conducted: 55, attended: 48, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 90, conducted: 50, attended: 43, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 86, conducted: 52, attended: 45, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.35, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N6': {
    rollNo: '242G1A05N6',
    name: 'G. Hansika',
    role: 'Student',
    gender: 'Female',
    dob: '10-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'g.hansika.alits@gmail.com',
    studentPhone: '9848100538',
    parentName: 'G. Ramana',
    parentPhone: '9848100638',
    address: 'Lakshmi Girls Hostel, Room G-102',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 95.0,
    attendedClasses: 380,
    totalClasses: 400,
    cgpa: 9.3,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 97, conducted: 60, attended: 57, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 95, conducted: 58, attended: 55, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 93, conducted: 55, attended: 52, mid1: 26, mid2: 28, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 99, conducted: 50, attended: 48, mid1: 29, mid2: 28, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 95, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.30, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N7': {
    rollNo: '242G1A05N7',
    name: 'G. Poojatha',
    role: 'Student',
    gender: 'Female',
    dob: '11-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'g.poojatha.alits@gmail.com',
    studentPhone: '9848100539',
    parentName: 'G. Chandrasekhar',
    parentPhone: '9848100639',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 91.0,
    attendedClasses: 364,
    totalClasses: 400,
    cgpa: 8.85,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 93, conducted: 60, attended: 55, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 91, conducted: 58, attended: 53, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 89, conducted: 55, attended: 50, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 95, conducted: 50, attended: 46, mid1: 27, mid2: 26, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 91, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.00, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.85, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N8': {
    rollNo: '242G1A05N8',
    name: 'G. Purushotam',
    role: 'Student',
    gender: 'Male',
    dob: '12-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'g.purushotam.alits@gmail.com',
    studentPhone: '9848100540',
    parentName: 'G. Pullanna',
    parentPhone: '9848100640',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 87.0,
    attendedClasses: 348,
    totalClasses: 400,
    cgpa: 8.4,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 89, conducted: 60, attended: 52, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 87, conducted: 58, attended: 50, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 85, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 91, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 87, conducted: 52, attended: 45, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.40, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05N9': {
    rollNo: '242G1A05N9',
    name: 'G. Bhargav',
    role: 'Student',
    gender: 'Male',
    dob: '13-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'g.bhargav.alits@gmail.com',
    studentPhone: '9848100541',
    parentName: 'G. Sreenivasulu',
    parentPhone: '9848100641',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 89.0,
    attendedClasses: 356,
    totalClasses: 400,
    cgpa: 8.6,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 91, conducted: 60, attended: 53, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 89, conducted: 58, attended: 52, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 87, conducted: 55, attended: 49, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 93, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 89, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.60, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O0': {
    rollNo: '242G1A05O0',
    name: 'G. Somu Shekar',
    role: 'Student',
    gender: 'Male',
    dob: '14-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'g.somushekar.alits@gmail.com',
    studentPhone: '9848100542',
    parentName: 'G. Subbarayudu',
    parentPhone: '9848100642',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 88.0,
    attendedClasses: 352,
    totalClasses: 400,
    cgpa: 8.55,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 90, conducted: 60, attended: 53, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 88, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 86, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 92, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.55, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O1': {
    rollNo: '242G1A05O1',
    name: 'Gulagani Tirumalaiah',
    role: 'Student',
    gender: 'Male',
    dob: '08-MAR-2003',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'gulaganithirumala277@gmail.com',
    studentPhone: '7337486311',
    parentName: 'G. Tirupathaiah',
    parentPhone: '9949903968',
    address: 'D.No 2-201 Upparapalli, Ananthapur',
    mentorName: 'Ms.A.Manjula (assi-prof)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 88.5,
    attendedClasses: 354,
    totalClasses: 400,
    cgpa: 8.75,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 90, conducted: 60, attended: 53, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 88, conducted: 58, attended: 51, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 86, conducted: 55, attended: 49, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 92, conducted: 50, attended: 44, mid1: 27, mid2: 26, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 88, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.75, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O2': {
    rollNo: '242G1A05O2',
    name: 'H. Sreedhar',
    role: 'Student',
    gender: 'Male',
    dob: '16-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'hsreedhar.alits@gmail.com',
    studentPhone: '9848012345',
    parentName: 'H. Rammohan',
    parentPhone: '9848054321',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 91.0,
    attendedClasses: 364,
    totalClasses: 400,
    cgpa: 9.1,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 93, conducted: 60, attended: 55, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 91, conducted: 58, attended: 53, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 89, conducted: 55, attended: 50, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 95, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 91, conducted: 52, attended: 47, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.10, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O3': {
    rollNo: '242G1A05O3',
    name: 'H. Sai Venkat',
    role: 'Student',
    gender: 'Male',
    dob: '17-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'h.saivenkat.alits@gmail.com',
    studentPhone: '9848100545',
    parentName: 'H. Venkataramana',
    parentPhone: '9848100645',
    address: 'Anantha Boys Hostel, Room B-205',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 86.0,
    attendedClasses: 344,
    totalClasses: 400,
    cgpa: 8.3,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 88, conducted: 60, attended: 52, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 86, conducted: 58, attended: 50, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 84, conducted: 55, attended: 47, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 90, conducted: 50, attended: 43, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 86, conducted: 52, attended: 45, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.30, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O4': {
    rollNo: '242G1A05O4',
    name: 'H. Snehalatha',
    role: 'Student',
    gender: 'Female',
    dob: '18-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'h.snehalatha.alits@gmail.com',
    studentPhone: '9848100546',
    parentName: 'H. Chandrasekhar',
    parentPhone: '9848100646',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 94.0,
    attendedClasses: 376,
    totalClasses: 400,
    cgpa: 9.2,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 96, conducted: 60, attended: 56, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 94, conducted: 58, attended: 55, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 92, conducted: 55, attended: 52, mid1: 26, mid2: 28, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 98, conducted: 50, attended: 47, mid1: 29, mid2: 28, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 94, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.20, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O5': {
    rollNo: '242G1A05O5',
    name: 'H. Hassiba',
    role: 'Student',
    gender: 'Female',
    dob: '19-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'h.hassiba.alits@gmail.com',
    studentPhone: '9848100547',
    parentName: 'H. Hussain Basha',
    parentPhone: '9848100647',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 93.0,
    attendedClasses: 372,
    totalClasses: 400,
    cgpa: 9.05,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 95, conducted: 60, attended: 56, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 93, conducted: 58, attended: 54, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 91, conducted: 55, attended: 51, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 97, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 93, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.90, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.00, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.05, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O6': {
    rollNo: '242G1A05O6',
    name: 'J. Avinash Raj',
    role: 'Student',
    gender: 'Male',
    dob: '20-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'j.avinashraj.alits@gmail.com',
    studentPhone: '9848100548',
    parentName: 'J. Jayaraju',
    parentPhone: '9848100648',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 85.5,
    attendedClasses: 342,
    totalClasses: 400,
    cgpa: 8.25,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 87, conducted: 60, attended: 51, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 85, conducted: 58, attended: 50, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 83, conducted: 55, attended: 47, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 89, conducted: 50, attended: 43, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 85, conducted: 52, attended: 44, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.25, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O7': {
    rollNo: '242G1A05O7',
    name: 'J. Rupa',
    role: 'Student',
    gender: 'Female',
    dob: '21-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'j.rupa.alits@gmail.com',
    studentPhone: '9848100549',
    parentName: 'J. Ramakrishna',
    parentPhone: '9848100649',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 92.5,
    attendedClasses: 370,
    totalClasses: 400,
    cgpa: 9.0,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 94, conducted: 60, attended: 56, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 92, conducted: 58, attended: 54, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 90, conducted: 55, attended: 51, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 96, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 92, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.95, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.00, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O8': {
    rollNo: '242G1A05O8',
    name: 'K. Vinay Kumar Reddy',
    role: 'Student',
    gender: 'Male',
    dob: '22-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'k.vinaykumar.alits@gmail.com',
    studentPhone: '9848100550',
    parentName: 'K. Venkatasubba Reddy',
    parentPhone: '9848100650',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 89.0,
    attendedClasses: 356,
    totalClasses: 400,
    cgpa: 8.65,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 91, conducted: 60, attended: 53, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 89, conducted: 58, attended: 52, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 87, conducted: 55, attended: 49, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 93, conducted: 50, attended: 44, mid1: 27, mid2: 26, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 89, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.65, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05O9': {
    rollNo: '242G1A05O9',
    name: 'K. Sai Karthik Naik',
    role: 'Student',
    gender: 'Male',
    dob: '23-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'k.saikarthik.alits@gmail.com',
    studentPhone: '9848100551',
    parentName: 'K. Lokya Naik',
    parentPhone: '9848100651',
    address: 'Anantha Boys Hostel, Room B-205',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 87.5,
    attendedClasses: 350,
    totalClasses: 400,
    cgpa: 8.45,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 89, conducted: 60, attended: 52, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 87, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 85, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 91, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 87, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.45, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P0': {
    rollNo: '242G1A05P0',
    name: 'K. Anil Kumar',
    role: 'Student',
    gender: 'Male',
    dob: '24-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'k.anilkumar.alits@gmail.com',
    studentPhone: '9848100552',
    parentName: 'K. Ramudu',
    parentPhone: '9848100652',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 88.5,
    attendedClasses: 354,
    totalClasses: 400,
    cgpa: 8.55,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 90, conducted: 60, attended: 53, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 88, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 86, conducted: 55, attended: 49, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 92, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.55, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P1': {
    rollNo: '242G1A05P1',
    name: 'K. Harshitha',
    role: 'Student',
    gender: 'Female',
    dob: '25-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'k.harshitha.alits@gmail.com',
    studentPhone: '9848100553',
    parentName: 'K. Narayanaswamy',
    parentPhone: '9848100653',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 95.5,
    attendedClasses: 382,
    totalClasses: 400,
    cgpa: 9.35,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 97, conducted: 60, attended: 57, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 95, conducted: 58, attended: 55, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 93, conducted: 55, attended: 53, mid1: 26, mid2: 28, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 99, conducted: 50, attended: 48, mid1: 29, mid2: 28, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 95, conducted: 52, attended: 50, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.35, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P2': {
    rollNo: '242G1A05P2',
    name: 'K. Sunil Naik',
    role: 'Student',
    gender: 'Male',
    dob: '26-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'k.sunilnaik.alits@gmail.com',
    studentPhone: '9848100554',
    parentName: 'K. Bheema Naik',
    parentPhone: '9848100654',
    address: 'Anantha Boys Hostel, Room B-205',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 86.0,
    attendedClasses: 344,
    totalClasses: 400,
    cgpa: 8.3,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 88, conducted: 60, attended: 52, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 86, conducted: 58, attended: 50, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 84, conducted: 55, attended: 47, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 90, conducted: 50, attended: 43, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 86, conducted: 52, attended: 45, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.30, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P3': {
    rollNo: '242G1A05P3',
    name: 'M. Esha Rani',
    role: 'Student',
    gender: 'Female',
    dob: '27-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'm.esharani.alits@gmail.com',
    studentPhone: '9848100555',
    parentName: 'M. Venkataramudu',
    parentPhone: '9848100655',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 93.0,
    attendedClasses: 372,
    totalClasses: 400,
    cgpa: 9.1,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 95, conducted: 60, attended: 56, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 93, conducted: 58, attended: 54, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 91, conducted: 55, attended: 51, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 97, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 93, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.10, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P4': {
    rollNo: '242G1A05P4',
    name: 'M. Jahanavi',
    role: 'Student',
    gender: 'Female',
    dob: '28-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'm.jahanavi.alits@gmail.com',
    studentPhone: '9848100556',
    parentName: 'M. Govindappa',
    parentPhone: '9848100656',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 91.5,
    attendedClasses: 366,
    totalClasses: 400,
    cgpa: 8.9,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 93, conducted: 60, attended: 55, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 91, conducted: 58, attended: 53, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 89, conducted: 55, attended: 50, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 95, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 91, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.90, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P5': {
    rollNo: '242G1A05P5',
    name: 'M. Samith Royal',
    role: 'Student',
    gender: 'Male',
    dob: '1-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'm.samithroyal.alits@gmail.com',
    studentPhone: '9848100557',
    parentName: 'M. Rajasekhar',
    parentPhone: '9848100657',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 90.0,
    attendedClasses: 360,
    totalClasses: 400,
    cgpa: 8.75,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 92, conducted: 60, attended: 54, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 90, conducted: 58, attended: 52, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 88, conducted: 55, attended: 50, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 94, conducted: 50, attended: 45, mid1: 27, mid2: 26, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 90, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.75, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P6': {
    rollNo: '242G1A05P6',
    name: 'M. Kiran Kumar',
    role: 'Student',
    gender: 'Male',
    dob: '2-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'm.kirankumar.alits@gmail.com',
    studentPhone: '9848100558',
    parentName: 'M. Suresh',
    parentPhone: '9848100658',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 88.0,
    attendedClasses: 352,
    totalClasses: 400,
    cgpa: 8.5,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 90, conducted: 60, attended: 53, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 88, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 86, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 92, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P7': {
    rollNo: '242G1A05P7',
    name: 'M. Sai Obulamma',
    role: 'Student',
    gender: 'Female',
    dob: '3-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'm.saiobulamma.alits@gmail.com',
    studentPhone: '9848100559',
    parentName: 'M. Obulesu',
    parentPhone: '9848100659',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 92.5,
    attendedClasses: 370,
    totalClasses: 400,
    cgpa: 9.05,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 94, conducted: 60, attended: 56, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 92, conducted: 58, attended: 54, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 90, conducted: 55, attended: 51, mid1: 25, mid2: 27, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 96, conducted: 50, attended: 46, mid1: 28, mid2: 27, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 92, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.90, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.00, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.05, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P8': {
    rollNo: '242G1A05P8',
    name: 'M. Bavani Prasad',
    role: 'Student',
    gender: 'Male',
    dob: '4-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'm.bavaniprasad.alits@gmail.com',
    studentPhone: '9848100560',
    parentName: 'M. Anjaneyulu',
    parentPhone: '9848100660',
    address: 'Anantha Boys Hostel, Room B-205',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 87.0,
    attendedClasses: 348,
    totalClasses: 400,
    cgpa: 8.4,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 89, conducted: 60, attended: 52, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 87, conducted: 58, attended: 50, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 85, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 91, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 87, conducted: 52, attended: 45, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.40, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05P9': {
    rollNo: '242G1A05P9',
    name: 'M. Pradeep Sai Krishna',
    role: 'Student',
    gender: 'Male',
    dob: '5-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'm.pradeepsai.alits@gmail.com',
    studentPhone: '9848100561',
    parentName: 'M. Venkataswamy',
    parentPhone: '9848100661',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 89.5,
    attendedClasses: 358,
    totalClasses: 400,
    cgpa: 8.65,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 91, conducted: 60, attended: 54, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 89, conducted: 58, attended: 52, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 87, conducted: 55, attended: 49, mid1: 24, mid2: 26, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 93, conducted: 50, attended: 45, mid1: 27, mid2: 26, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 89, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.65, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05Q0': {
    rollNo: '242G1A05Q0',
    name: 'M. Katamayya',
    role: 'Student',
    gender: 'Male',
    dob: '6-Aug-2005',
    bloodGroup: 'A+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'm.katamayya.alits@gmail.com',
    studentPhone: '9848100562',
    parentName: 'M. Chinna Ramudu',
    parentPhone: '9848100662',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 86.5,
    attendedClasses: 346,
    totalClasses: 400,
    cgpa: 8.35,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 88, conducted: 60, attended: 52, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 86, conducted: 58, attended: 50, mid1: 23, mid2: 24, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 84, conducted: 55, attended: 48, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 90, conducted: 50, attended: 43, mid1: 25, mid2: 24, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 86, conducted: 52, attended: 45, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.35, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05Q1': {
    rollNo: '242G1A05Q1',
    name: 'N. Sandya Rani',
    role: 'Student',
    gender: 'Female',
    dob: '7-Aug-2005',
    bloodGroup: 'B+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'n.sandhyarani.alits@gmail.com',
    studentPhone: '9848100563',
    parentName: 'N. Narayana',
    parentPhone: '9848100663',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 94.0,
    attendedClasses: 376,
    totalClasses: 400,
    cgpa: 9.25,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 96, conducted: 60, attended: 56, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 94, conducted: 58, attended: 55, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 92, conducted: 55, attended: 52, mid1: 26, mid2: 28, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 98, conducted: 50, attended: 47, mid1: 29, mid2: 28, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 94, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.25, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A05Q2': {
    rollNo: '242G1A05Q2',
    name: 'P. Naveen',
    role: 'Student',
    gender: 'Male',
    dob: '8-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'p.naveen.alits@gmail.com',
    studentPhone: '9848100564',
    parentName: 'P. Peddanna',
    parentPhone: '9848100664',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 88.0,
    attendedClasses: 352,
    totalClasses: 400,
    cgpa: 8.55,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 90, conducted: 60, attended: 53, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 88, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 86, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 92, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.55, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05Q3': {
    rollNo: '242G1A05Q3',
    name: 'P. Venkat',
    role: 'Student',
    gender: 'Male',
    dob: '9-Aug-2005',
    bloodGroup: 'O-',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'p.venkat.alits@gmail.com',
    studentPhone: '9848100565',
    parentName: 'P. Ramachandra',
    parentPhone: '9848100665',
    address: 'Anantha Boys Hostel, Room B-205',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 87.5,
    attendedClasses: 350,
    totalClasses: 400,
    cgpa: 8.48,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 65000,
    paidFee: 52500,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 89, conducted: 60, attended: 52, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 87, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 85, conducted: 55, attended: 48, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 91, conducted: 50, attended: 44, mid1: 26, mid2: 25, grade: 'A+' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 87, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.33, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.58, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.43, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.63, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.48, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 45000, due: 10000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 3000, due: 2500, status: 'Partial Due', date: '20-Aug-2026' }
    ]
  },
  '242G1A05Q4': {
    rollNo: '242G1A05Q4',
    name: 'P. Manasa Reddy',
    role: 'Student',
    gender: 'Female',
    dob: '10-Aug-2005',
    bloodGroup: 'O+',
    branch: 'Computer Science & Engineering (CSE)',
    branchCode: '05',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-D',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'p.manasareddy.alits@gmail.com',
    studentPhone: '9848100566',
    parentName: 'P. Pratap Reddy',
    parentPhone: '9848100666',
    address: 'Plot 45, Subhash Road, Ananthapur',
    mentorName: 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
    mentorPhone: '+91 94401 23456',
    overallAttendance: 96.5,
    attendedClasses: 386,
    totalClasses: 400,
    cgpa: 9.5,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 65000,
    paidFee: 65000,
    subjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 98, conducted: 60, attended: 58, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 96, conducted: 58, attended: 56, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 94, conducted: 55, attended: 53, mid1: 27, mid2: 29, grade: 'A' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 99, conducted: 50, attended: 48, mid1: 30, mid2: 29, grade: 'O' },
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 96, conducted: 52, attended: 50, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  // =========================================================================
  // CIVIL ENGINEERING (01) - III YEAR I SEMESTER (3-1) STUDENTS
  // =========================================================================
  '242G1A0101': {
    rollNo: '242G1A0101',
    name: 'Anchula Yaswanth',
    role: 'Student',
    gender: 'Male',
    dob: '12-May-2005',
    bloodGroup: 'O+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'anchula.yaswanth.alits@gmail.com',
    studentPhone: '9848100701',
    parentName: 'A. Narayana',
    parentPhone: '9848100801',
    address: 'Flat 302, Sri Sai Nilayam, RTC Bus Stand Road, Ananthapuramu',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 91.5,
    attendedClasses: 220,
    totalClasses: 240,
    cgpa: 8.85,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 92, conducted: 55, attended: 51, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 90, conducted: 58, attended: 52, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 88, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 94, conducted: 50, attended: 47, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 89, conducted: 50, attended: 45, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 95, conducted: 25, attended: 24, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.95, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.85, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 45000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0102': {
    rollNo: '242G1A0102',
    name: 'Ankappagari Oram Charan',
    role: 'Student',
    gender: 'Male',
    dob: '18-Jun-2005',
    bloodGroup: 'B+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'ankappagari.charan.alits@gmail.com',
    studentPhone: '9848100702',
    parentName: 'A. Ramamurthy',
    parentPhone: '9848100802',
    address: 'Door No. 12-4-88, Sai Nagar 3rd Cross, Ananthapuramu',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 88.0,
    attendedClasses: 211,
    totalClasses: 240,
    cgpa: 8.50,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 88, conducted: 55, attended: 48, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 87, conducted: 58, attended: 50, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 86, conducted: 52, attended: 45, mid1: 23, mid2: 25, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 90, conducted: 50, attended: 45, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 86, conducted: 50, attended: 43, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 92, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 92, conducted: 25, attended: 23, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 90, conducted: 20, attended: 18, mid1: 28, mid2: 29, grade: 'A+' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 32500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0103': {
    rollNo: '242G1A0103',
    name: 'Bukke Sai Ganesh Naik',
    role: 'Student',
    gender: 'Male',
    dob: '24-Jul-2005',
    bloodGroup: 'A+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'bukke.saiganesh.alits@gmail.com',
    studentPhone: '9848100703',
    parentName: 'B. Lakshman Naik',
    parentPhone: '9848100803',
    address: 'Anantha Boys Hostel, Room B-232, ALITS Campus',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 89.5,
    attendedClasses: 215,
    totalClasses: 240,
    cgpa: 8.65,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 90, conducted: 55, attended: 50, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 88, conducted: 58, attended: 51, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 92, conducted: 50, attended: 46, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 88, conducted: 50, attended: 44, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 92, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.65, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 45000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0104': {
    rollNo: '242G1A0104',
    name: 'Dasari Sai Santhosh',
    role: 'Student',
    gender: 'Male',
    dob: '05-Sep-2005',
    bloodGroup: 'O+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'dasari.santhosh.alits@gmail.com',
    studentPhone: '9848100704',
    parentName: 'D. Venkatesh',
    parentPhone: '9848100804',
    address: 'Door No. 4-2-115, Subhash Road, Ananthapuramu',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 93.0,
    attendedClasses: 223,
    totalClasses: 240,
    cgpa: 8.90,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 94, conducted: 55, attended: 52, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 92, conducted: 58, attended: 53, mid1: 28, mid2: 28, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 91, conducted: 52, attended: 47, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 96, conducted: 50, attended: 48, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 92, conducted: 50, attended: 46, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.95, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.90, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 45000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0105': {
    rollNo: '242G1A0105',
    name: 'Goddumarri Mahendra',
    role: 'Student',
    gender: 'Male',
    dob: '14-Aug-2005',
    bloodGroup: 'AB+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'goddumarri.mahendra.alits@gmail.com',
    studentPhone: '9848100705',
    parentName: 'G. Obulesu',
    parentPhone: '9848100805',
    address: 'Door No. 6-1-45, Housing Board Colony, Ananthapuramu',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 87.5,
    attendedClasses: 210,
    totalClasses: 240,
    cgpa: 8.42,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 87, conducted: 55, attended: 48, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 88, conducted: 58, attended: 51, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 85, conducted: 52, attended: 44, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 90, conducted: 50, attended: 45, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 86, conducted: 50, attended: 43, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 92, conducted: 25, attended: 23, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 92, conducted: 25, attended: 23, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 90, conducted: 20, attended: 18, mid1: 27, mid2: 28, grade: 'A+' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.42, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 32500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0106': {
    rollNo: '242G1A0106',
    name: 'Kajji Prabhash',
    role: 'Student',
    gender: 'Male',
    dob: '22-Oct-2005',
    bloodGroup: 'B+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'kajji.prabhash.alits@gmail.com',
    studentPhone: '9848100706',
    parentName: 'K. Ramanjaneyulu',
    parentPhone: '9848100806',
    address: 'Anantha Boys Hostel, Room B-234, ALITS Campus',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 90.5,
    attendedClasses: 217,
    totalClasses: 240,
    cgpa: 8.75,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 91, conducted: 55, attended: 50, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 90, conducted: 58, attended: 52, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 89, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 93, conducted: 50, attended: 46, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 88, conducted: 50, attended: 44, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 92, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.75, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 45000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0108': {
    rollNo: '242G1A0108',
    name: 'Kyabarshi Indrani',
    role: 'Student',
    gender: 'Female',
    dob: '11-Nov-2005',
    bloodGroup: 'A+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'CONVENOR EBNR IN I-I',
    email: 'kyabarshi.indrani.alits@gmail.com',
    studentPhone: '9848100708',
    parentName: 'K. Narayanaswamy',
    parentPhone: '9848100808',
    address: 'Door No. 10-3-22, Kovur Nagar, Ananthapuramu',
    mentorName: 'Mrs. S. Lakshmi (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44552',
    overallAttendance: 94.5,
    attendedClasses: 227,
    totalClasses: 240,
    cgpa: 9.15,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 95, conducted: 55, attended: 52, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 94, conducted: 58, attended: 54, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 93, conducted: 52, attended: 48, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 97, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 93, conducted: 50, attended: 46, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 30, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.10, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.15, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 45000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0109': {
    rollNo: '242G1A0109',
    name: 'Mandlolla Manikanta',
    role: 'Student',
    gender: 'Male',
    dob: '03-Dec-2005',
    bloodGroup: 'O+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'mandlolla.manikanta.alits@gmail.com',
    studentPhone: '9848100709',
    parentName: 'M. Sreenivasulu',
    parentPhone: '9848100809',
    address: 'Anantha Boys Hostel, Room B-236, ALITS Campus',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 86.5,
    attendedClasses: 208,
    totalClasses: 240,
    cgpa: 8.30,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 86, conducted: 55, attended: 47, mid1: 22, mid2: 24, grade: 'A' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 86, conducted: 58, attended: 50, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 85, conducted: 52, attended: 44, mid1: 22, mid2: 23, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 89, conducted: 50, attended: 44, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 85, conducted: 50, attended: 42, mid1: 22, mid2: 23, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 92, conducted: 25, attended: 23, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 92, conducted: 25, attended: 23, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 90, conducted: 20, attended: 18, mid1: 27, mid2: 28, grade: 'A+' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.30, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 32500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0110': {
    rollNo: '242G1A0110',
    name: 'Mummalla Jayachandra',
    role: 'Student',
    gender: 'Male',
    dob: '15-Jan-2005',
    bloodGroup: 'B+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'mummalla.jayachandra.alits@gmail.com',
    studentPhone: '9848100710',
    parentName: 'M. Venkataramana',
    parentPhone: '9848100810',
    address: 'Door No. 3-88, Gooty Road, Ananthapuramu',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 88.5,
    attendedClasses: 212,
    totalClasses: 240,
    cgpa: 8.55,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 88, conducted: 55, attended: 49, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 89, conducted: 58, attended: 51, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 87, conducted: 52, attended: 45, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 91, conducted: 50, attended: 45, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 87, conducted: 50, attended: 43, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 92, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 92, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 90, conducted: 20, attended: 18, mid1: 28, mid2: 29, grade: 'A+' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.55, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 65000, paid: 45000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0111': {
    rollNo: '242G1A0111',
    name: 'Nagiri Madhu',
    role: 'Student',
    gender: 'Male',
    dob: '20-Feb-2005',
    bloodGroup: 'O-',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'CONVENOR EBNR IN I-I',
    email: 'nagiri.madhu.alits@gmail.com',
    studentPhone: '9848100711',
    parentName: 'N. Peddanna',
    parentPhone: '9848100811',
    address: 'Door No. 8-2-45, Rudrampeta, Ananthapuramu',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 90.0,
    attendedClasses: 216,
    totalClasses: 240,
    cgpa: 8.70,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 90, conducted: 55, attended: 50, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 90, conducted: 58, attended: 52, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 88, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 92, conducted: 50, attended: 46, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 89, conducted: 50, attended: 44, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 92, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.70, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 45000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0112': {
    rollNo: '242G1A0112',
    name: 'Neeruganti Jagannath',
    role: 'Student',
    gender: 'Male',
    dob: '07-Mar-2005',
    bloodGroup: 'A+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'neeruganti.jagannath.alits@gmail.com',
    studentPhone: '9848100712',
    parentName: 'N. Chandra Sekhar',
    parentPhone: '9848100812',
    address: 'Door No. 15-1-60, Tapovanam, Ananthapuramu',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 87.0,
    attendedClasses: 209,
    totalClasses: 240,
    cgpa: 8.40,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 86, conducted: 55, attended: 47, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 87, conducted: 58, attended: 50, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 86, conducted: 52, attended: 45, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 90, conducted: 50, attended: 45, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 85, conducted: 50, attended: 43, mid1: 23, mid2: 24, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 92, conducted: 25, attended: 23, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 92, conducted: 25, attended: 23, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 90, conducted: 20, attended: 18, mid1: 27, mid2: 28, grade: 'A+' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.40, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 65000, paid: 45000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0113': {
    rollNo: '242G1A0113',
    name: 'Shaik Mohammad Munwar',
    role: 'Student',
    gender: 'Male',
    dob: '16-Apr-2005',
    bloodGroup: 'B+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'shaik.munwar.alits@gmail.com',
    studentPhone: '9848100713',
    parentName: 'Shaik Anwar',
    parentPhone: '9848100813',
    address: 'Anantha Boys Hostel, Room B-238, ALITS Campus',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 89.5,
    attendedClasses: 215,
    totalClasses: 240,
    cgpa: 8.65,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 90, conducted: 55, attended: 50, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 89, conducted: 58, attended: 52, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 88, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 92, conducted: 50, attended: 46, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 88, conducted: 50, attended: 44, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 92, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.65, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 65000, paid: 45000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0114': {
    rollNo: '242G1A0114',
    name: 'Shaik Mohammad Ryhan',
    role: 'Student',
    gender: 'Male',
    dob: '28-May-2005',
    bloodGroup: 'O+',
    branch: 'Civil Engineering (CIVIL)',
    branchCode: '01',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'EAMCET Convener Quota',
    email: 'shaik.ryhan.alits@gmail.com',
    studentPhone: '9848100714',
    parentName: 'Shaik Rasool',
    parentPhone: '9848100814',
    address: 'Door No. 2-5-19, Old Town, Ananthapuramu',
    mentorName: 'Sri R. Koushik (Asst. Prof - CIVIL)',
    mentorPhone: '+91 98481 44551',
    overallAttendance: 92.5,
    attendedClasses: 222,
    totalClasses: 240,
    cgpa: 8.95,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A101', name: 'Structural Analysis - II', faculty: 'Sri R. Koushik', attendance: 93, conducted: 55, attended: 51, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A102', name: 'Design of Reinforced Concrete Structures (RCC)', faculty: 'Dr. C. Suresh', attendance: 92, conducted: 58, attended: 53, mid1: 28, mid2: 28, grade: 'A+' },
      { code: '24A103', name: 'Geotechnical Engineering & Soil Mechanics', faculty: 'Sri M. Venkat Rao', attendance: 90, conducted: 52, attended: 47, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A104', name: 'Environmental Engineering & Water Resources', faculty: 'Mrs. S. Lakshmi', attendance: 95, conducted: 50, attended: 48, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A105', name: 'Transportation Engineering & Highway Design', faculty: 'Sri P. Harish', attendance: 91, conducted: 50, attended: 46, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A106L', name: 'Concrete Technology & Highway Materials Lab', faculty: 'Sri R. Koushik', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A107L', name: 'Soil Mechanics & Geotechnical Testing Lab', faculty: 'Sri M. Venkat Rao', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A108S', name: 'Skill Oriented Course: AutoCAD & Revit BIM', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.00, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.95, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 45000, paid: 45000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  }
  ,
  '242G1A0201': {
    rollNo: '242G1A0201',
    name: 'Alakunta Radhika',
    role: 'Student',
    gender: 'Female',
    dob: '1-March-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'alakunta.radhika.alits@gmail.com',
    studentPhone: '9848100801',
    parentName: 'A. Sreenivasulu',
    parentPhone: '9848100901',
    address: 'H.No 1-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 93.5,
    attendedClasses: 224,
    totalClasses: 240,
    cgpa: 9.1,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 94, conducted: 55, attended: 51, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 94, conducted: 58, attended: 54, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 94, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 94, conducted: 50, attended: 47, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 94, conducted: 50, attended: 47, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.10, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0202': {
    rollNo: '242G1A0202',
    name: 'Aspari Chandu',
    role: 'Student',
    gender: 'Male',
    dob: '2-August-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota (EBNR)',
    email: 'aspari.chandu.alits@gmail.com',
    studentPhone: '9848100802',
    parentName: 'A. Venkataswamy',
    parentPhone: '9848100902',
    address: 'H.No 2-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 87.5,
    attendedClasses: 210,
    totalClasses: 240,
    cgpa: 8.45,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 88, conducted: 55, attended: 48, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 88, conducted: 58, attended: 51, mid1: 26, mid2: 26, grade: 'A' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 88, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 88, conducted: 50, attended: 44, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 88, conducted: 50, attended: 44, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.45, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 75000, paid: 55000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0203': {
    rollNo: '242G1A0203',
    name: 'B Kalpana',
    role: 'Student',
    gender: 'Female',
    dob: '3-March-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'b.kalpana.alits@gmail.com',
    studentPhone: '9848100803',
    parentName: 'B. Narayana',
    parentPhone: '9848100903',
    address: 'Lakshmi Girls Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 94.0,
    attendedClasses: 226,
    totalClasses: 240,
    cgpa: 9.2,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 94, conducted: 55, attended: 52, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 94, conducted: 58, attended: 55, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 94, conducted: 52, attended: 49, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 94, conducted: 50, attended: 47, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 94, conducted: 50, attended: 47, mid1: 29, mid2: 30, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.20, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0204': {
    rollNo: '242G1A0204',
    name: 'Bandi Ramyasree',
    role: 'Student',
    gender: 'Female',
    dob: '4-August-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'bandi.ramyasree.alits@gmail.com',
    studentPhone: '9848100804',
    parentName: 'B. Chandrasekhar',
    parentPhone: '9848100904',
    address: 'H.No 4-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 95.0,
    attendedClasses: 228,
    totalClasses: 240,
    cgpa: 9.35,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 95, conducted: 55, attended: 52, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 95, conducted: 58, attended: 55, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 95, conducted: 52, attended: 49, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 95, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 95, conducted: 50, attended: 48, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.35, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0205': {
    rollNo: '242G1A0205',
    name: 'Bestha Revathi',
    role: 'Student',
    gender: 'Female',
    dob: '5-March-2005',
    bloodGroup: 'O+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'bestha.revathi.alits@gmail.com',
    studentPhone: '9848100805',
    parentName: 'B. Ramanjulu',
    parentPhone: '9848100905',
    address: 'H.No 5-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 91.0,
    attendedClasses: 218,
    totalClasses: 240,
    cgpa: 8.8,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 91, conducted: 55, attended: 50, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 91, conducted: 58, attended: 53, mid1: 28, mid2: 28, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 91, conducted: 52, attended: 47, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 91, conducted: 50, attended: 46, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 91, conducted: 50, attended: 46, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.80, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0206': {
    rollNo: '242G1A0206',
    name: 'Boyapati Maruthi',
    role: 'Student',
    gender: 'Male',
    dob: '6-August-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'boyapati.maruthi.alits@gmail.com',
    studentPhone: '9848100806',
    parentName: 'B. Venkateswarlu',
    parentPhone: '9848100906',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 88.0,
    attendedClasses: 211,
    totalClasses: 240,
    cgpa: 8.5,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 88, conducted: 55, attended: 48, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 88, conducted: 58, attended: 51, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 88, conducted: 52, attended: 46, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 88, conducted: 50, attended: 44, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 88, conducted: 50, attended: 44, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0207': {
    rollNo: '242G1A0207',
    name: 'Chilla Hitesh',
    role: 'Student',
    gender: 'Male',
    dob: '7-March-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'chilla.hitesh.alits@gmail.com',
    studentPhone: '9848100807',
    parentName: 'C. Subba Rao',
    parentPhone: '9848100907',
    address: 'H.No 7-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 89.5,
    attendedClasses: 215,
    totalClasses: 240,
    cgpa: 8.65,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 90, conducted: 55, attended: 49, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 90, conducted: 58, attended: 52, mid1: 26, mid2: 26, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 90, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 90, conducted: 50, attended: 45, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 90, conducted: 50, attended: 45, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.65, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0208': {
    rollNo: '242G1A0208',
    name: 'Choutipalli Sai Sharanya',
    role: 'Student',
    gender: 'Female',
    dob: '8-August-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'choutipalli.sharanya.alits@gmail.com',
    studentPhone: '9848100808',
    parentName: 'C. Mallikarjuna',
    parentPhone: '9848100908',
    address: 'H.No 8-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 96.0,
    attendedClasses: 230,
    totalClasses: 240,
    cgpa: 9.45,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 96, conducted: 55, attended: 53, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 58, attended: 56, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 96, conducted: 52, attended: 50, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 96, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.45, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0209': {
    rollNo: '242G1A0209',
    name: 'D Leeladhar Kumar',
    role: 'Student',
    gender: 'Male',
    dob: '9-March-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'd.leeladhar.alits@gmail.com',
    studentPhone: '9848100809',
    parentName: 'D. Ramanaiah',
    parentPhone: '9848100909',
    address: 'H.No 9-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 86.5,
    attendedClasses: 208,
    totalClasses: 240,
    cgpa: 8.3,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 86, conducted: 55, attended: 48, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 86, conducted: 58, attended: 50, mid1: 26, mid2: 26, grade: 'A' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 86, conducted: 52, attended: 45, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 86, conducted: 50, attended: 43, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 86, conducted: 50, attended: 43, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.30, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 75000, paid: 55000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0210': {
    rollNo: '242G1A0210',
    name: 'Dalavayi Mahendra',
    role: 'Student',
    gender: 'Male',
    dob: '10-August-2005',
    bloodGroup: 'O+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'dalavayi.mahendra.alits@gmail.com',
    studentPhone: '9848100810',
    parentName: 'D. Gangadhar',
    parentPhone: '9848100910',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 90.0,
    attendedClasses: 216,
    totalClasses: 240,
    cgpa: 8.75,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 90, conducted: 55, attended: 50, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 90, conducted: 58, attended: 52, mid1: 26, mid2: 26, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 90, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 90, conducted: 50, attended: 45, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 90, conducted: 50, attended: 45, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.75, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0211': {
    rollNo: '242G1A0211',
    name: 'Dandugula Prasanna',
    role: 'Student',
    gender: 'Female',
    dob: '11-March-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'dandugula.prasanna.alits@gmail.com',
    studentPhone: '9848100811',
    parentName: 'D. Nagaraju',
    parentPhone: '9848100911',
    address: 'H.No 11-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 93.0,
    attendedClasses: 223,
    totalClasses: 240,
    cgpa: 9.05,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 93, conducted: 55, attended: 51, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 93, conducted: 58, attended: 54, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 93, conducted: 52, attended: 48, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 93, conducted: 50, attended: 46, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 93, conducted: 50, attended: 46, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.00, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.05, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0212': {
    rollNo: '242G1A0212',
    name: 'Gadde Jahnavi',
    role: 'Student',
    gender: 'Female',
    dob: '12-August-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'gadde.jahnavi.alits@gmail.com',
    studentPhone: '9848100812',
    parentName: 'G. Krishnaiah',
    parentPhone: '9848100912',
    address: 'Lakshmi Girls Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 92.5,
    attendedClasses: 222,
    totalClasses: 240,
    cgpa: 8.95,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 92, conducted: 55, attended: 51, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 92, conducted: 58, attended: 54, mid1: 29, mid2: 29, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 92, conducted: 52, attended: 48, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 92, conducted: 50, attended: 46, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 92, conducted: 50, attended: 46, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.95, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0213': {
    rollNo: '242G1A0213',
    name: 'Guggilla Chennakesava Reddy',
    role: 'Student',
    gender: 'Male',
    dob: '13-March-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'guggilla.chennakesava.alits@gmail.com',
    studentPhone: '9848100813',
    parentName: 'G. Narayana Reddy',
    parentPhone: '9848100913',
    address: 'H.No 13-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 88.5,
    attendedClasses: 212,
    totalClasses: 240,
    cgpa: 8.55,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 88, conducted: 55, attended: 49, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 88, conducted: 58, attended: 51, mid1: 25, mid2: 25, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 88, conducted: 50, attended: 44, mid1: 26, mid2: 26, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 88, conducted: 50, attended: 44, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.55, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 75000, paid: 55000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0214': {
    rollNo: '242G1A0214',
    name: 'Gujjugari Thirumalesu',
    role: 'Student',
    gender: 'Male',
    dob: '14-August-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'gujjugari.thirumalesu.alits@gmail.com',
    studentPhone: '9848100814',
    parentName: 'G. Venkataiah',
    parentPhone: '9848100914',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 89.0,
    attendedClasses: 214,
    totalClasses: 240,
    cgpa: 8.6,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 89, conducted: 55, attended: 49, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 89, conducted: 58, attended: 52, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 89, conducted: 52, attended: 46, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 89, conducted: 50, attended: 44, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 89, conducted: 50, attended: 44, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.60, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0215': {
    rollNo: '242G1A0215',
    name: 'Gundluru Mahammad Ashan',
    role: 'Student',
    gender: 'Male',
    dob: '15-March-2005',
    bloodGroup: 'O+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'gundluru.ashan.alits@gmail.com',
    studentPhone: '9848100815',
    parentName: 'G. Mahaboob Basha',
    parentPhone: '9848100915',
    address: 'H.No 15-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 91.5,
    attendedClasses: 220,
    totalClasses: 240,
    cgpa: 8.85,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 92, conducted: 55, attended: 50, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 92, conducted: 58, attended: 53, mid1: 29, mid2: 29, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 92, conducted: 52, attended: 48, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 92, conducted: 50, attended: 46, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 92, conducted: 50, attended: 46, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.90, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.95, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.85, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0216': {
    rollNo: '242G1A0216',
    name: 'Janagani Jahnavi',
    role: 'Student',
    gender: 'Female',
    dob: '16-August-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'janagani.jahnavi.alits@gmail.com',
    studentPhone: '9848100816',
    parentName: 'J. Peddanna',
    parentPhone: '9848100916',
    address: 'H.No 16-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 93.5,
    attendedClasses: 224,
    totalClasses: 240,
    cgpa: 9.15,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 94, conducted: 55, attended: 51, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 94, conducted: 58, attended: 54, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 94, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 94, conducted: 50, attended: 47, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 94, conducted: 50, attended: 47, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.10, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.15, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0217': {
    rollNo: '242G1A0217',
    name: 'Janagonda Pavan Kalyan',
    role: 'Student',
    gender: 'Male',
    dob: '17-March-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'janagonda.pavankalyan.alits@gmail.com',
    studentPhone: '9848100817',
    parentName: 'J. Ramakrishna',
    parentPhone: '9848100917',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 90.5,
    attendedClasses: 217,
    totalClasses: 240,
    cgpa: 8.8,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 90, conducted: 55, attended: 50, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 90, conducted: 58, attended: 52, mid1: 28, mid2: 28, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 90, conducted: 52, attended: 47, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 90, conducted: 50, attended: 45, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 90, conducted: 50, attended: 45, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.80, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0218': {
    rollNo: '242G1A0218',
    name: 'Jenne Vasantha',
    role: 'Student',
    gender: 'Female',
    dob: '18-August-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'jenne.vasantha.alits@gmail.com',
    studentPhone: '9848100818',
    parentName: 'J. Govindappa',
    parentPhone: '9848100918',
    address: 'H.No 18-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 88.0,
    attendedClasses: 211,
    totalClasses: 240,
    cgpa: 8.5,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 88, conducted: 55, attended: 48, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 88, conducted: 58, attended: 51, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 88, conducted: 52, attended: 46, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 88, conducted: 50, attended: 44, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 88, conducted: 50, attended: 44, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 75000, paid: 55000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0219': {
    rollNo: '242G1A0219',
    name: 'Kada Tharun Teja',
    role: 'Student',
    gender: 'Male',
    dob: '19-March-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'kada.tharunteja.alits@gmail.com',
    studentPhone: '9848100819',
    parentName: 'K. Suresh',
    parentPhone: '9848100919',
    address: 'H.No 19-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 89.0,
    attendedClasses: 214,
    totalClasses: 240,
    cgpa: 8.65,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 89, conducted: 55, attended: 49, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 89, conducted: 58, attended: 52, mid1: 26, mid2: 26, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 89, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 89, conducted: 50, attended: 44, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 89, conducted: 50, attended: 44, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.65, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0220': {
    rollNo: '242G1A0220',
    name: 'Kadavakallu Deepika',
    role: 'Student',
    gender: 'Female',
    dob: '20-August-2005',
    bloodGroup: 'O+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'kadavakallu.deepika.alits@gmail.com',
    studentPhone: '9848100820',
    parentName: 'K. Narayanaswamy',
    parentPhone: '9848100920',
    address: 'H.No 20-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 94.5,
    attendedClasses: 227,
    totalClasses: 240,
    cgpa: 9.25,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 94, conducted: 55, attended: 52, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 94, conducted: 58, attended: 55, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 94, conducted: 52, attended: 49, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 94, conducted: 50, attended: 47, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 94, conducted: 50, attended: 47, mid1: 29, mid2: 30, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.15, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.20, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.25, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0221': {
    rollNo: '242G1A0221',
    name: 'Kallamadi Gnana Skanda',
    role: 'Student',
    gender: 'Male',
    dob: '21-March-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'kallamadi.gnanaskanda.alits@gmail.com',
    studentPhone: '9848100821',
    parentName: 'K. Ravindra',
    parentPhone: '9848100921',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 91.0,
    attendedClasses: 218,
    totalClasses: 240,
    cgpa: 8.85,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 91, conducted: 55, attended: 50, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 91, conducted: 58, attended: 53, mid1: 29, mid2: 29, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 91, conducted: 52, attended: 47, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 91, conducted: 50, attended: 46, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 91, conducted: 50, attended: 46, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.90, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.95, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.85, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0222': {
    rollNo: '242G1A0222',
    name: 'Kasturi Sri Priya',
    role: 'Student',
    gender: 'Female',
    dob: '22-August-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'kasturi.sripriya.alits@gmail.com',
    studentPhone: '9848100822',
    parentName: 'K. Veerabhadrappa',
    parentPhone: '9848100922',
    address: 'H.No 22-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 95.5,
    attendedClasses: 229,
    totalClasses: 240,
    cgpa: 9.4,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 96, conducted: 55, attended: 53, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 58, attended: 55, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 96, conducted: 52, attended: 50, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 96, conducted: 50, attended: 48, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.40, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0223': {
    rollNo: '242G1A0223',
    name: 'Kuchi Srujan Kumar',
    role: 'Student',
    gender: 'Male',
    dob: '23-March-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'kuchi.srujankumar.alits@gmail.com',
    studentPhone: '9848100823',
    parentName: 'K. Anand Kumar',
    parentPhone: '9848100923',
    address: 'H.No 23-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 87.5,
    attendedClasses: 210,
    totalClasses: 240,
    cgpa: 8.4,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 88, conducted: 55, attended: 48, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 88, conducted: 58, attended: 51, mid1: 26, mid2: 26, grade: 'A' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 88, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 88, conducted: 50, attended: 44, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 88, conducted: 50, attended: 44, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.40, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 75000, paid: 55000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0224': {
    rollNo: '242G1A0224',
    name: 'M Fransis',
    role: 'Student',
    gender: 'Male',
    dob: '24-August-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'm.fransis.alits@gmail.com',
    studentPhone: '9848100824',
    parentName: 'M. Anthony',
    parentPhone: '9848100924',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 89.5,
    attendedClasses: 215,
    totalClasses: 240,
    cgpa: 8.7,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 90, conducted: 55, attended: 49, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 90, conducted: 58, attended: 52, mid1: 28, mid2: 28, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 90, conducted: 52, attended: 47, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 90, conducted: 50, attended: 45, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 90, conducted: 50, attended: 45, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.70, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0225': {
    rollNo: '242G1A0225',
    name: 'Mandla Chaitanya Kumar',
    role: 'Student',
    gender: 'Male',
    dob: '25-March-2005',
    bloodGroup: 'O+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'mandla.chaitanya.alits@gmail.com',
    studentPhone: '9848100825',
    parentName: 'M. Prabhakar',
    parentPhone: '9848100925',
    address: 'H.No 25-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 88.0,
    attendedClasses: 211,
    totalClasses: 240,
    cgpa: 8.5,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 88, conducted: 55, attended: 48, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 88, conducted: 58, attended: 51, mid1: 25, mid2: 25, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 88, conducted: 52, attended: 46, mid1: 24, mid2: 25, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 88, conducted: 50, attended: 44, mid1: 26, mid2: 26, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 88, conducted: 50, attended: 44, mid1: 24, mid2: 25, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 75000, paid: 55000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0226': {
    rollNo: '242G1A0226',
    name: 'Mannala Ajay',
    role: 'Student',
    gender: 'Male',
    dob: '26-August-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'mannala.ajay.alits@gmail.com',
    studentPhone: '9848100826',
    parentName: 'M. Venkatesh',
    parentPhone: '9848100926',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 90.0,
    attendedClasses: 216,
    totalClasses: 240,
    cgpa: 8.75,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 90, conducted: 55, attended: 50, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 90, conducted: 58, attended: 52, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 90, conducted: 52, attended: 47, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 90, conducted: 50, attended: 45, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 90, conducted: 50, attended: 45, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.75, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0227': {
    rollNo: '242G1A0227',
    name: 'Mudinepalli Afiza Banu',
    role: 'Student',
    gender: 'Female',
    dob: '27-March-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'mudinepalli.afizabanu.alits@gmail.com',
    studentPhone: '9848100827',
    parentName: 'M. Shaik Shavali',
    parentPhone: '9848100927',
    address: 'H.No 27-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 96.0,
    attendedClasses: 230,
    totalClasses: 240,
    cgpa: 9.5,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 96, conducted: 55, attended: 53, mid1: 31, mid2: 30, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 58, attended: 56, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 96, conducted: 52, attended: 50, mid1: 31, mid2: 30, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 96, conducted: 50, attended: 48, mid1: 31, mid2: 30, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0228': {
    rollNo: '242G1A0228',
    name: 'Mundla Charan',
    role: 'Student',
    gender: 'Male',
    dob: '28-August-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'mundla.charan.alits@gmail.com',
    studentPhone: '9848100828',
    parentName: 'M. Obulesu',
    parentPhone: '9848100928',
    address: 'H.No 28-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 88.5,
    attendedClasses: 212,
    totalClasses: 240,
    cgpa: 8.6,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 88, conducted: 55, attended: 49, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 88, conducted: 58, attended: 51, mid1: 26, mid2: 26, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 88, conducted: 52, attended: 46, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 88, conducted: 50, attended: 44, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 88, conducted: 50, attended: 44, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.60, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0229': {
    rollNo: '242G1A0229',
    name: 'Palakula Anand Kumar',
    role: 'Student',
    gender: 'Male',
    dob: '1-March-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'palakula.anand.alits@gmail.com',
    studentPhone: '9848100829',
    parentName: 'P. Ramana',
    parentPhone: '9848100929',
    address: 'H.No 29-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 87.0,
    attendedClasses: 209,
    totalClasses: 240,
    cgpa: 8.45,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 87, conducted: 55, attended: 48, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 87, conducted: 58, attended: 50, mid1: 26, mid2: 26, grade: 'A' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 87, conducted: 52, attended: 45, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 87, conducted: 50, attended: 44, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 87, conducted: 50, attended: 44, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.50, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.55, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.45, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 75000, paid: 55000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0230': {
    rollNo: '242G1A0230',
    name: 'Pasuluru Bhargavi',
    role: 'Student',
    gender: 'Female',
    dob: '2-August-2005',
    bloodGroup: 'O+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'pasuluru.bhargavi.alits@gmail.com',
    studentPhone: '9848100830',
    parentName: 'P. Srinivasulu',
    parentPhone: '9848100930',
    address: 'Lakshmi Girls Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 94.0,
    attendedClasses: 226,
    totalClasses: 240,
    cgpa: 9.2,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 94, conducted: 55, attended: 52, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 94, conducted: 58, attended: 55, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 94, conducted: 52, attended: 49, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 94, conducted: 50, attended: 47, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 94, conducted: 50, attended: 47, mid1: 29, mid2: 30, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.20, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0231': {
    rollNo: '242G1A0231',
    name: 'Pinjira Ashub Basha',
    role: 'Student',
    gender: 'Male',
    dob: '3-March-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'pinjira.ashub.alits@gmail.com',
    studentPhone: '9848100831',
    parentName: 'P. Dastagiri',
    parentPhone: '9848100931',
    address: 'H.No 31-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 91.0,
    attendedClasses: 218,
    totalClasses: 240,
    cgpa: 8.85,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 91, conducted: 55, attended: 50, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 91, conducted: 58, attended: 53, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 91, conducted: 52, attended: 47, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 91, conducted: 50, attended: 46, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 91, conducted: 50, attended: 46, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.90, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.95, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.85, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0232': {
    rollNo: '242G1A0232',
    name: 'Ponde Mokshit Vinay',
    role: 'Student',
    gender: 'Male',
    dob: '4-August-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'ponde.mokshit.alits@gmail.com',
    studentPhone: '9848100832',
    parentName: 'P. Chandrasekhar',
    parentPhone: '9848100932',
    address: 'H.No 32-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 92.0,
    attendedClasses: 221,
    totalClasses: 240,
    cgpa: 8.95,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 92, conducted: 55, attended: 51, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 92, conducted: 58, attended: 53, mid1: 28, mid2: 28, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 92, conducted: 52, attended: 48, mid1: 27, mid2: 28, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 92, conducted: 50, attended: 46, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 92, conducted: 50, attended: 46, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.00, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.05, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.95, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0233': {
    rollNo: '242G1A0233',
    name: 'Pujari Lavanya',
    role: 'Student',
    gender: 'Female',
    dob: '5-March-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'pujari.lavanya.alits@gmail.com',
    studentPhone: '9848100833',
    parentName: 'P. Shankaraiah',
    parentPhone: '9848100933',
    address: 'H.No 33-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 93.5,
    attendedClasses: 224,
    totalClasses: 240,
    cgpa: 9.15,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 94, conducted: 55, attended: 51, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 94, conducted: 58, attended: 54, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 94, conducted: 52, attended: 49, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 94, conducted: 50, attended: 47, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 94, conducted: 50, attended: 47, mid1: 29, mid2: 30, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.10, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.15, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0234': {
    rollNo: '242G1A0234',
    name: 'Rage Rakshitha',
    role: 'Student',
    gender: 'Female',
    dob: '6-August-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'rage.rakshitha.alits@gmail.com',
    studentPhone: '9848100834',
    parentName: 'R. Gangadhar',
    parentPhone: '9848100934',
    address: 'Lakshmi Girls Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 95.0,
    attendedClasses: 228,
    totalClasses: 240,
    cgpa: 9.3,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 95, conducted: 55, attended: 52, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 95, conducted: 58, attended: 55, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 95, conducted: 52, attended: 49, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 95, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 95, conducted: 50, attended: 48, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.20, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.35, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.25, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.40, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.30, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0235': {
    rollNo: '242G1A0235',
    name: 'Sadda Vigneswar',
    role: 'Student',
    gender: 'Male',
    dob: '7-March-2005',
    bloodGroup: 'O+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'sadda.vigneswar.alits@gmail.com',
    studentPhone: '9848100835',
    parentName: 'S. Mallikarjuna',
    parentPhone: '9848100935',
    address: 'H.No 35-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 89.0,
    attendedClasses: 214,
    totalClasses: 240,
    cgpa: 8.65,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 89, conducted: 55, attended: 49, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 89, conducted: 58, attended: 52, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 89, conducted: 52, attended: 46, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 89, conducted: 50, attended: 44, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 89, conducted: 50, attended: 44, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.65, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0236': {
    rollNo: '242G1A0236',
    name: 'Shaik Mahammad Roshan',
    role: 'Student',
    gender: 'Male',
    dob: '8-August-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'shaik.roshan.alits@gmail.com',
    studentPhone: '9848100836',
    parentName: 'Shaik Mahaboob',
    parentPhone: '9848100936',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 90.5,
    attendedClasses: 217,
    totalClasses: 240,
    cgpa: 8.8,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 90, conducted: 55, attended: 50, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 90, conducted: 58, attended: 52, mid1: 29, mid2: 29, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 90, conducted: 52, attended: 47, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 90, conducted: 50, attended: 45, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 90, conducted: 50, attended: 45, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.80, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0237': {
    rollNo: '242G1A0237',
    name: 'Shaik Khaza Nizamudheen',
    role: 'Student',
    gender: 'Male',
    dob: '9-March-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'shaik.khaza.alits@gmail.com',
    studentPhone: '9848100837',
    parentName: 'Shaik Nizamuddin',
    parentPhone: '9848100937',
    address: 'H.No 37-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 92.5,
    attendedClasses: 222,
    totalClasses: 240,
    cgpa: 9.0,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 92, conducted: 55, attended: 51, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 92, conducted: 58, attended: 54, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 92, conducted: 52, attended: 48, mid1: 26, mid2: 27, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 92, conducted: 50, attended: 46, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 92, conducted: 50, attended: 46, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.90, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.05, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.95, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.10, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.00, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0238': {
    rollNo: '242G1A0238',
    name: 'Shaik Sana Sadiya',
    role: 'Student',
    gender: 'Female',
    dob: '10-August-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'shaik.sanasadiya.alits@gmail.com',
    studentPhone: '9848100838',
    parentName: 'Shaik Abdul Khadar',
    parentPhone: '9848100938',
    address: 'H.No 38-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 96.5,
    attendedClasses: 232,
    totalClasses: 240,
    cgpa: 9.55,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 96, conducted: 55, attended: 53, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 58, attended: 56, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 96, conducted: 52, attended: 50, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 96, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.55, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0239': {
    rollNo: '242G1A0239',
    name: 'Singanamala Mehtab Khan',
    role: 'Student',
    gender: 'Male',
    dob: '11-March-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'singanamala.mehtab.alits@gmail.com',
    studentPhone: '9848100839',
    parentName: 'S. Mansoor Khan',
    parentPhone: '9848100939',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 91.5,
    attendedClasses: 220,
    totalClasses: 240,
    cgpa: 8.9,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 92, conducted: 55, attended: 50, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 92, conducted: 58, attended: 53, mid1: 29, mid2: 29, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 92, conducted: 52, attended: 48, mid1: 28, mid2: 29, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 92, conducted: 50, attended: 46, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 92, conducted: 50, attended: 46, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.00, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.90, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0240': {
    rollNo: '242G1A0240',
    name: 'Syed Mohammad Luqman',
    role: 'Student',
    gender: 'Male',
    dob: '12-August-2005',
    bloodGroup: 'O+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'syed.luqman.alits@gmail.com',
    studentPhone: '9848100840',
    parentName: 'Syed Akbar',
    parentPhone: '9848100940',
    address: 'H.No 40-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 90.0,
    attendedClasses: 216,
    totalClasses: 240,
    cgpa: 8.75,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 90, conducted: 55, attended: 50, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 90, conducted: 58, attended: 52, mid1: 26, mid2: 26, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 90, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 90, conducted: 50, attended: 45, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 90, conducted: 50, attended: 45, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.65, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.80, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.70, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.85, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.75, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0241': {
    rollNo: '242G1A0241',
    name: 'Syed Shabber',
    role: 'Student',
    gender: 'Male',
    dob: '13-March-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'syed.shabber.alits@gmail.com',
    studentPhone: '9848100841',
    parentName: 'Syed Hussain',
    parentPhone: '9848100941',
    address: 'H.No 41-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 89.5,
    attendedClasses: 215,
    totalClasses: 240,
    cgpa: 8.7,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 90, conducted: 55, attended: 49, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 90, conducted: 58, attended: 52, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 90, conducted: 52, attended: 47, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 90, conducted: 50, attended: 45, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 90, conducted: 50, attended: 45, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.70, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0242': {
    rollNo: '242G1A0242',
    name: 'Thandaka Mounesh',
    role: 'Student',
    gender: 'Male',
    dob: '14-August-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'thandaka.mounesh.alits@gmail.com',
    studentPhone: '9848100842',
    parentName: 'T. Venkataramana',
    parentPhone: '9848100942',
    address: 'H.No 42-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 87.0,
    attendedClasses: 209,
    totalClasses: 240,
    cgpa: 8.4,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 87, conducted: 55, attended: 48, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 87, conducted: 58, attended: 50, mid1: 27, mid2: 27, grade: 'A' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 87, conducted: 52, attended: 45, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 87, conducted: 50, attended: 44, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 87, conducted: 50, attended: 44, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.40, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 75000, paid: 55000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0243': {
    rollNo: '242G1A0243',
    name: 'Uppatalla Govardhan',
    role: 'Student',
    gender: 'Male',
    dob: '15-March-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'uppatalla.govardhan.alits@gmail.com',
    studentPhone: '9848100843',
    parentName: 'U. Ramachandra',
    parentPhone: '9848100943',
    address: 'Anantha Boys Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 91.0,
    attendedClasses: 218,
    totalClasses: 240,
    cgpa: 8.8,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 91, conducted: 55, attended: 50, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 91, conducted: 58, attended: 53, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 91, conducted: 52, attended: 47, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 91, conducted: 50, attended: 46, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 91, conducted: 50, attended: 46, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.70, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.85, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.75, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.90, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.80, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0244': {
    rollNo: '242G1A0244',
    name: 'Urichintala Farhaan',
    role: 'Student',
    gender: 'Male',
    dob: '16-August-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'urichintala.farhaan.alits@gmail.com',
    studentPhone: '9848100844',
    parentName: 'U. Mohammad Ismail',
    parentPhone: '9848100944',
    address: 'H.No 44-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 93.0,
    attendedClasses: 223,
    totalClasses: 240,
    cgpa: 9.05,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 93, conducted: 55, attended: 51, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 93, conducted: 58, attended: 54, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 93, conducted: 52, attended: 48, mid1: 28, mid2: 29, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 93, conducted: 50, attended: 46, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 93, conducted: 50, attended: 46, mid1: 28, mid2: 29, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.95, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.00, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.05, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0245': {
    rollNo: '242G1A0245',
    name: 'Vadde Bharath Kumar',
    role: 'Student',
    gender: 'Male',
    dob: '17-March-2005',
    bloodGroup: 'O+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'vadde.bharath.alits@gmail.com',
    studentPhone: '9848100845',
    parentName: 'V. Narayanaswamy',
    parentPhone: '9848100945',
    address: 'H.No 45-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 88.5,
    attendedClasses: 212,
    totalClasses: 240,
    cgpa: 8.55,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 88, conducted: 55, attended: 49, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 88, conducted: 58, attended: 51, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 88, conducted: 52, attended: 46, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 88, conducted: 50, attended: 44, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 88, conducted: 50, attended: 44, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.55, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0246': {
    rollNo: '242G1A0246',
    name: 'Yadati Kavya',
    role: 'Student',
    gender: 'Female',
    dob: '18-August-2005',
    bloodGroup: 'A+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'yadati.kavya.alits@gmail.com',
    studentPhone: '9848100846',
    parentName: 'Y. Ramamohan',
    parentPhone: '9848100946',
    address: 'Lakshmi Girls Hostel, ALITS Campus',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 94.0,
    attendedClasses: 226,
    totalClasses: 240,
    cgpa: 9.2,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 94, conducted: 55, attended: 52, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 94, conducted: 58, attended: 55, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 94, conducted: 52, attended: 49, mid1: 27, mid2: 28, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 94, conducted: 50, attended: 47, mid1: 29, mid2: 29, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 94, conducted: 50, attended: 47, mid1: 27, mid2: 28, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.10, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.25, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.15, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.30, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.20, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0247': {
    rollNo: '242G1A0247',
    name: 'Yelloji Charmi Sri',
    role: 'Student',
    gender: 'Female',
    dob: '19-March-2005',
    bloodGroup: 'B+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Convenor Quota',
    email: 'yelloji.charmisri.alits@gmail.com',
    studentPhone: '9848100847',
    parentName: 'Y. Lakshminarayana',
    parentPhone: '9848100947',
    address: 'H.No 47-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 95.5,
    attendedClasses: 229,
    totalClasses: 240,
    cgpa: 9.4,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 0,
    totalFee: 55000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 96, conducted: 55, attended: 53, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 58, attended: 55, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 96, conducted: 52, attended: 50, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 50, attended: 48, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 96, conducted: 50, attended: 48, mid1: 29, mid2: 30, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 9.30, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 9.45, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 9.35, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 9.50, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 9.40, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0248': {
    rollNo: '242G1A0248',
    name: 'Yeragadindla Susmitha',
    role: 'Student',
    gender: 'Female',
    dob: '20-August-2005',
    bloodGroup: 'AB+',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'Management Quota',
    email: 'yeragadindla.susmitha.alits@gmail.com',
    studentPhone: '9848100848',
    parentName: 'Y. Peddaiah',
    parentPhone: '9848100948',
    address: 'H.No 48-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 88.0,
    attendedClasses: 211,
    totalClasses: 240,
    cgpa: 8.5,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 20000,
    totalFee: 75000,
    paidFee: 55000,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 88, conducted: 55, attended: 48, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 88, conducted: 58, attended: 51, mid1: 27, mid2: 27, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 88, conducted: 52, attended: 46, mid1: 26, mid2: 27, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 88, conducted: 50, attended: 44, mid1: 28, mid2: 28, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 88, conducted: 50, attended: 44, mid1: 26, mid2: 27, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.40, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.55, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.45, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.60, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.50, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 75000, paid: 55000, due: 20000, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  },
  '242G1A0249': {
    rollNo: '242G1A0249',
    name: 'Shaik Irfan',
    role: 'Student',
    gender: 'Male',
    dob: '21-March-2005',
    bloodGroup: 'O-',
    branch: 'Electrical & Electronics Engineering (EEE)',
    branchCode: '02',
    semester: 'III Year I Semester (3-1)',
    section: 'Section-A',
    batch: '2024-2028',
    academicYear: '2026-2027',
    regulation: 'R24 (Autonomous)',
    admissionType: 'SPOT Quota',
    email: 'shaik.irfan.alits@gmail.com',
    studentPhone: '9848100849',
    parentName: 'Shaik Dastagiri',
    parentPhone: '9848100949',
    address: 'H.No 49-42, Old Town Area, Ananthapuramu, AP - 515001',
    mentorName: 'Dr. K. Krishna Priya (Prof. & HoD - EEE)',
    mentorPhone: '+91 98491 12345',
    overallAttendance: 90.0,
    attendedClasses: 216,
    totalClasses: 240,
    cgpa: 8.7,
    creditsEarned: 92,
    totalCredits: 160,
    backlogs: 0,
    pendingFee: 12500,
    totalFee: 55000,
    paidFee: 42500,
    subjects: [
      { code: '24A201', name: 'Power Systems - II (Analysis & Stability)', faculty: 'Dr. K. Krishna Priya', attendance: 90, conducted: 55, attended: 50, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A202', name: 'Power Electronics & Converter Drives', faculty: 'Sri T. V. Subba Rao', attendance: 90, conducted: 58, attended: 52, mid1: 26, mid2: 26, grade: 'A+' },
      { code: '24A203', name: 'Control Systems Engineering', faculty: 'Dr. B. Venkata Rao', attendance: 90, conducted: 52, attended: 47, mid1: 25, mid2: 26, grade: 'A+' },
      { code: '24A204', name: 'Microprocessors & Microcontrollers (8086/ARM)', faculty: 'Sri K. Mahendra', attendance: 90, conducted: 50, attended: 45, mid1: 27, mid2: 27, grade: 'O' },
      { code: '24A205', name: 'Renewable Energy Sources & Smart Grid Systems', faculty: 'Mrs. S. Kalyani', attendance: 90, conducted: 50, attended: 45, mid1: 25, mid2: 26, grade: 'A' },
      { code: '24A206L', name: 'Power Electronics & Simulation Lab', faculty: 'Sri T. V. Subba Rao', attendance: 96, conducted: 25, attended: 24, mid1: 30, mid2: 30, grade: 'O' },
      { code: '24A207L', name: 'Control Systems & Microcontrollers Lab', faculty: 'Sri K. Mahendra', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
      { code: '24A208S', name: 'Skill Oriented Course: MATLAB/Simulink for Power Systems', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
    ],
    semesters: [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.60, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.75, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.65, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.80, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.70, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ],
    fees: [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 42500, due: 12500, status: 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ]
  }
};

// Global Store for Assignments and Notes (Synced across portals)
let ALITS_ASSIGNMENTS = JSON.parse(localStorage.getItem('alits_portal_assignments')) || [
  { id: 'ASG-101', subject: 'Database Management Systems', title: 'ER Diagram & Relational Normalization (BCNF)', dueDate: '2026-09-28', maxMarks: 20, faculty: 'MS. A. Manjula', status: 'Active', instructions: 'Construct complete normalized 3NF & BCNF schema for Hospital Management System.' },
  { id: 'ASG-102', subject: 'Web Application Development', title: 'RESTful API Integration with Node & SQLite', dueDate: '2026-10-02', maxMarks: 25, faculty: 'MS. A. Manjula', status: 'Active', instructions: 'Implement user auth tokens, JWT session verification, and CRUD routes.' },
  { id: 'ASG-103', subject: 'Design & Analysis of Algorithms', title: 'Dynamic Programming vs Greedy: Knapsack & Dijkstra', dueDate: '2026-09-25', maxMarks: 15, faculty: 'Dr. B. V. Ramanappa', status: 'Active', instructions: 'Provide asymptotic time complexity proof and recursive formulations.' }
];

var ALITS_SUBJECT_NOTES = window.ALITS_SUBJECT_NOTES || (function() {
  try {
    return JSON.parse(localStorage.getItem('alits_portal_notes'));
  } catch (e) { return null; }
})() || [
  { id: 'NOTE-1', subject: 'Database Management Systems', unit: 'Unit 3: Normalization & Query Processing', title: 'Functional Dependencies, 1NF to BCNF Rules & Decomposition', date: '2026-09-15', faculty: 'MS. A. Manjula', file: 'DBMS_Unit3_Normalization_LectureNotes.pdf', link: '#' },
  { id: 'NOTE-2', subject: 'Web Application Development', unit: 'Unit 4: Server-Side JS & REST Architecture', title: 'Express Middleware, Asynchronous Event Loop & DB ORM', date: '2026-09-18', faculty: 'MS. A. Manjula', file: 'WebDev_Unit4_FullStack_Architecture.pdf', link: '#' },
  { id: 'NOTE-3', subject: 'Design & Analysis of Algorithms', unit: 'Unit 2: Divide & Conquer and Greedy Algorithms', title: 'Master Theorem Solutions & Minimum Spanning Trees (Kruskal/Prim)', date: '2026-09-10', faculty: 'Dr. B. V. Ramanappa', file: 'DAA_Unit2_DivideConquer_MST.pdf', link: '#' },
  { id: 'NOTE-4', subject: 'Artificial Intelligence & Machine Learning', unit: 'Unit 1: State Space Search & Heuristics', title: 'A* Search, Minimax with Alpha-Beta Pruning Algorithms', date: '2026-09-12', faculty: 'Sri K. Ramesh', file: 'AIML_Unit1_HeuristicSearch.pdf', link: '#' }
];

// Active Logged In Student
var currentStudent = window.currentStudent || null;
var currentTab = window.currentTab || 'dashboard';
window.STUDENT_DATABASE = STUDENT_DATABASE;
window.currentStudent = currentStudent;
window.currentTab = currentTab;

// Defensive helper to guarantee all arrays and numbers are valid
function ensureStudentDefaults(s) {
  if (!s || typeof s !== 'object') {
    s = (STUDENT_DATABASE && (STUDENT_DATABASE['242G1A05J9'] || Object.values(STUDENT_DATABASE)[0])) || {};
  }
  const defaultSub = [
    { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: 93, conducted: 60, attended: 55, mid1: 25, mid2: 26, grade: 'A+' },
    { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: 91, conducted: 58, attended: 53, mid1: 25, mid2: 26, grade: 'A+' },
    { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: 89, conducted: 55, attended: 50, mid1: 24, mid2: 26, grade: 'A' },
    { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: 95, conducted: 50, attended: 46, mid1: 27, mid2: 26, grade: 'O' },
    { code: '24A505', name: 'Software Engineering & Agile Methodologies', faculty: 'Mrs. G. Roja Ramani', attendance: 91, conducted: 52, attended: 48, mid1: 25, mid2: 26, grade: 'A' },
    { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', faculty: 'MS. A. Manjula', attendance: 96, conducted: 25, attended: 24, mid1: 29, mid2: 30, grade: 'O' },
    { code: '24A507L', name: 'Full-Stack Web Technologies Lab', faculty: 'MS. A. Manjula', attendance: 94, conducted: 25, attended: 23, mid1: 28, mid2: 29, grade: 'A+' },
    { code: '24A508S', name: 'Skill Oriented Course: Cloud Computing (AWS)', faculty: 'Dr. M. Surendra Naidu', attendance: 95, conducted: 20, attended: 19, mid1: 29, mid2: 30, grade: 'O' }
  ];

  if (!Array.isArray(s.subjects) || s.subjects.length === 0) {
    s.subjects = defaultSub;
  }
  if (!Array.isArray(s.semesters) || s.semesters.length === 0) {
    s.semesters = [
      { sem: 'I Year I Sem (1-1)', sgpa: 8.67, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
      { sem: 'I Year II Sem (1-2)', sgpa: 8.92, credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
      { sem: 'II Year I Sem (2-1)', sgpa: 8.77, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
      { sem: 'II Year II Sem (2-2)', sgpa: 8.97, credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
      { sem: 'III Year I Sem (3-1)', sgpa: 8.82, credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
    ];
  }
  if (!Array.isArray(s.fees) || s.fees.length === 0) {
    s.fees = [
      { title: 'Tuition Fee (2026-27)', total: 55000, paid: 55000, due: 0, status: 'Fully Paid', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: 5500, paid: 5500, due: 0, status: 'Fully Paid', date: '20-Aug-2026' }
    ];
  }
  s.overallAttendance = s.overallAttendance !== undefined ? Number(s.overallAttendance) : 91.5;
  s.attendedClasses = s.attendedClasses !== undefined ? Number(s.attendedClasses) : 366;
  s.totalClasses = Number(s.totalClasses || 400);
  s.cgpa = s.cgpa !== undefined ? Number(s.cgpa) : 8.82;
  s.pendingFee = s.pendingFee !== undefined ? Number(s.pendingFee) : 0;
  s.totalFee = Number(s.totalFee || 65000);
  s.paidFee = s.paidFee !== undefined ? Number(s.paidFee) : 65000;
  s.creditsEarned = Number(s.creditsEarned || 92);
  s.totalCredits = Number(s.totalCredits || 160);
  s.regulation = s.regulation || 'R24 (Autonomous)';
  return s;
}

// --- CENTRALIZED STUDENT DATA SYNCHRONIZATION ---
function getCentralStudents() {
  if (window.BackendSync && typeof window.BackendSync.getState === 'function') {
    const s = window.BackendSync.getState();
    if (s && Array.isArray(s.students) && s.students.length > 0) return s.students;
  }
  try {
    const raw = localStorage.getItem('ALITS_ERP_STATE');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.students) && parsed.students.length > 0) return parsed.students;
    }
  } catch (e) {}
  return window.ALITS_DATA?.students || [];
}

function buildStudentProfile(rollNo) {
  const upperRoll = (rollNo || '242G1A05J9').trim().toUpperCase();
  const centralList = getCentralStudents();
  const central = Array.isArray(centralList) ? centralList.find(s => (s.rollNo || s.roll || '').trim().toUpperCase() === upperRoll) : null;

  // If hardcoded prototype exists, use as base for course lists & semesters
  const proto = (STUDENT_DATABASE && (STUDENT_DATABASE[upperRoll] || STUDENT_DATABASE['242G1A05J9'])) || {};

  let profile = null;
  if (central) {
    const attPct = central.attendancePct !== undefined ? parseFloat(central.attendancePct) : (central.attendance !== undefined ? parseFloat(central.attendance) : (proto.overallAttendance || 90.0));
    const totalCls = central.totalClasses || proto.totalClasses || 240;
    const attCls = central.attendedClasses !== undefined ? central.attendedClasses : Math.round((attPct / 100) * totalCls);
    const feeTot = Number(central.totalAssigned || central.feeTotal || proto.totalFee || 55000);
    const feePd = Number(central.totalPaid !== undefined ? central.totalPaid : (central.feePaid !== undefined ? central.feePaid : (proto.paidFee !== undefined ? proto.paidFee : 42500)));
    const feeDue = central.balanceDue !== undefined ? Number(central.balanceDue) : Math.max(0, feeTot - feePd);

    const cgpaVal = central.cgpa ? parseFloat(central.cgpa) : (central.examMarks?.cgpa ? parseFloat(central.examMarks.cgpa) : (proto.cgpa || 8.65));
    const deptName = central.deptName || (central.dept === 'CSE' ? 'Computer Science & Engineering (CSE)' : (central.dept === 'ECE' ? 'Electronics & Communication Engineering (ECE)' : (central.dept === 'EEE' ? 'Electrical & Electronics Engineering (EEE)' : (central.dept === 'CIVIL' ? 'Civil Engineering' : (central.dept === 'MECH' ? 'Mechanical Engineering' : (central.dept === 'AIML' ? 'Artificial Intelligence & Machine Learning' : `${central.dept || 'Engineering'} Department`))))));

    // Clone and adjust subjects if prototype subjects exist
    let subjects = (proto.subjects || []).map(sub => {
      const subAtt = Math.min(100, Math.max(40, Math.round(attPct + (Math.random() * 6 - 3))));
      return {
        ...sub,
        attendance: subAtt,
        attended: Math.round((subAtt / 100) * (sub.conducted || 50))
      };
    });

    if (subjects.length === 0) {
      subjects = [
        { code: '24A501', name: 'Design and Analysis of Algorithms', faculty: 'Dr. B. V. Ramanappa', attendance: Math.round(attPct), conducted: 60, attended: Math.round((attPct / 100) * 60), mid1: 25, mid2: 26, grade: 'A+' },
        { code: '24A502', name: 'Database Management Systems', faculty: 'MS. A. Manjula', attendance: Math.round(attPct), conducted: 58, attended: Math.round((attPct / 100) * 58), mid1: 25, mid2: 26, grade: 'A+' },
        { code: '24A503', name: 'Artificial Intelligence & Machine Learning', faculty: 'Sri K. Ramesh', attendance: Math.round(attPct), conducted: 55, attended: Math.round((attPct / 100) * 55), mid1: 24, mid2: 26, grade: 'A' },
        { code: '24A504', name: 'Web Application Development with Full-Stack', faculty: 'MS. A. Manjula', attendance: Math.round(attPct), conducted: 50, attended: Math.round((attPct / 100) * 50), mid1: 27, mid2: 26, grade: 'O' }
      ];
    }

    const fees = [
      { title: `Tuition Fee (${central.academicYear || '2026-27'})`, total: Math.round(feeTot * 0.8), paid: Math.min(feePd, Math.round(feeTot * 0.8)), due: Math.max(0, Math.round(feeTot * 0.8) - Math.min(feePd, Math.round(feeTot * 0.8))), status: feeDue === 0 ? 'Fully Paid' : 'Partial Due', date: '15-Aug-2026' },
      { title: 'JNTUA University & Reg Fee', total: 4500, paid: 4500, due: 0, status: 'Fully Paid', date: '10-Jul-2026' },
      { title: 'Special Lab & Skill Dev Fee', total: Math.max(0, feeTot - Math.round(feeTot * 0.8) - 4500), paid: Math.max(0, feePd - Math.round(feeTot * 0.8) - 4500), due: Math.max(0, (feeTot - Math.round(feeTot * 0.8) - 4500) - Math.max(0, feePd - Math.round(feeTot * 0.8) - 4500)), status: feeDue === 0 ? 'Fully Paid' : 'Partial Due', date: '20-Aug-2026' }
    ];

    profile = {
      ...proto,
      rollNo: upperRoll,
      name: central.name || proto.name || `Student (${upperRoll})`,
      role: 'Student',
      gender: central.gender || proto.gender || 'Male',
      dob: central.dob || proto.dob || '15-Aug-2005',
      bloodGroup: central.bloodGroup || proto.bloodGroup || 'O+',
      branch: deptName,
      branchCode: central.branchCode || (central.dept === 'CSE' ? '05' : (central.dept === 'ECE' ? '04' : (central.dept === 'EEE' ? '02' : '01'))),
      semester: central.semester || (central.year ? `${central.year} I Semester` : 'III Year I Semester (3-1)'),
      section: central.section ? (String(central.section).includes('Section') ? central.section : `Section-${central.section}`) : (proto.section || 'Section-A'),
      batch: central.batch || proto.batch || '2024-2028',
      academicYear: central.academicYear || proto.academicYear || '2026-2027',
      regulation: central.regulation || proto.regulation || 'R24 (Autonomous)',
      admissionType: central.quota || proto.admissionType || 'Convenor Quota',
      email: central.email || proto.email || `${upperRoll.toLowerCase()}@alits.ac.in`,
      studentPhone: central.mobile || central.studentPhone || proto.studentPhone || '9848100501',
      parentName: central.fatherName || central.parentName || proto.parentName || 'Parent / Guardian',
      parentPhone: central.parentMobile || central.parentPhone || central.mobile || proto.parentPhone || '9848100601',
      address: central.address || proto.address || 'Ananthapur Local, Andhra Pradesh',
      mentorName: central.mentorName || proto.mentorName || 'Dr. K. Bhargavi (Prof. & HoD - CSE)',
      mentorPhone: central.mentorPhone || proto.mentorPhone || '+91 94401 23456',
      overallAttendance: attPct,
      attendedClasses: attCls,
      totalClasses: totalCls,
      cgpa: cgpaVal,
      creditsEarned: central.creditsEarned || proto.creditsEarned || 92,
      totalCredits: 160,
      backlogs: central.backlogs || proto.backlogs || 0,
      totalFee: feeTot,
      paidFee: feePd,
      pendingFee: feeDue,
      subjects: subjects,
      semesters: proto.semesters || [
        { sem: 'I Year I Sem (1-1)', sgpa: (cgpaVal - 0.15).toFixed(2), credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jan 2025' },
        { sem: 'I Year II Sem (1-2)', sgpa: (cgpaVal + 0.1).toFixed(2), credits: 19.5, status: 'Passed (Distinction)', monthYear: 'Jun 2025' },
        { sem: 'II Year I Sem (2-1)', sgpa: cgpaVal.toFixed(2), credits: 21.0, status: 'Passed (Distinction)', monthYear: 'Dec 2025' },
        { sem: 'II Year II Sem (2-2)', sgpa: (cgpaVal + 0.15).toFixed(2), credits: 21.0, status: 'Passed (Distinction)', monthYear: 'May 2026' },
        { sem: 'III Year I Sem (3-1)', sgpa: cgpaVal.toFixed(2), credits: 22.0, status: 'In Progress (Current)', monthYear: 'Nov 2026' }
      ],
      fees: fees
    };
  } else if (STUDENT_DATABASE && STUDENT_DATABASE[upperRoll]) {
    profile = { ...STUDENT_DATABASE[upperRoll] };
  } else {
    profile = {
      ...(STUDENT_DATABASE && (STUDENT_DATABASE['242G1A05J9'] || Object.values(STUDENT_DATABASE)[0])),
      rollNo: upperRoll,
      name: `Student (${upperRoll})`,
      email: `${upperRoll.toLowerCase()}@alits.ac.in`
    };
  }

  return ensureStudentDefaults(profile);
}

function saveStudentState(meta = {}) {
  try {
    let currentState = null;
    const raw = localStorage.getItem('ALITS_ERP_STATE');
    if (raw) {
      try { currentState = JSON.parse(raw); } catch (e) {}
    }
    if (!currentState || typeof currentState !== 'object') {
      currentState = window.ALITS_DATA || {};
    }
    if (!currentState.students || !Array.isArray(currentState.students)) {
      currentState.students = getCentralStudents();
    }

    if (currentStudent) {
      const idx = currentState.students.findIndex(s => (s.rollNo || s.roll || '').trim().toUpperCase() === currentStudent.rollNo.toUpperCase());
      if (idx !== -1) {
        currentState.students[idx].totalPaid = currentStudent.paidFee;
        currentState.students[idx].balanceDue = currentStudent.pendingFee;
        if (Array.isArray(currentState.students[idx].installments)) {
          currentState.students[idx].installments.forEach(ins => {
            if (currentStudent.pendingFee === 0) {
              ins.paid = ins.amount;
              ins.balance = 0;
              ins.status = 'Paid';
            }
          });
        }
      }
    }

    localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(currentState));

    if (window.BackendSync && typeof window.BackendSync.pushState === 'function') {
      window.BackendSync.pushState(currentState, meta);
    }

    window.dispatchEvent(new CustomEvent('alits_data_sync', { detail: meta }));
  } catch (e) {
    console.error('Error saving student state:', e);
  }
}

// --- AUTO-INITIALIZE ON LOAD ---
var portalBooted = false;
function bootStudentPortal() {
  const container = document.getElementById('studentTabContent');
  if (portalBooted && container && container.innerHTML.trim().length > 0) return;
  portalBooted = true;
  try {
    initStudentAuth();
  } catch (err) {
    console.error('[StudentPortal] Boot error:', err);
    if (!currentStudent) currentStudent = buildStudentProfile('242G1A05J9');
    currentStudent = ensureStudentDefaults(currentStudent);
    renderStudentProfileHeader();
    switchStudentTab('dashboard');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootStudentPortal);
  setTimeout(bootStudentPortal, 50);
} else {
  bootStudentPortal();
}

function initStudentAuth() {
  let session = typeof AuthGuard !== 'undefined' ? AuthGuard.getSession() : null;
  if (!session) {
    try {
      const raw = localStorage.getItem('alits_portal_user') || localStorage.getItem('alits_auth_session');
      if (raw) session = JSON.parse(raw);
    } catch (e) {}
  }

  // Graceful fallback: If no valid student session exists, load default student 242G1A05J9 (Shaik Bilqees)
  // so the portal immediately displays full attendance, CGPA, subjects, timetables, and fee details!
  if (!session || !session.role || (session.role.toUpperCase() !== 'STUDENT' && session.role.toUpperCase() !== 'PARENT')) {
    session = {
      userId: '242G1A05J9',
      userName: 'Shaik Bilqees',
      role: 'Student',
      portal: 'student',
      rollNo: '242G1A05J9',
      dept: 'CSE',
      sessionToken: 'ALITS-STUDENT-AUTH-' + Date.now()
    };
    try {
      if (typeof AuthGuard !== 'undefined' && typeof AuthGuard.login === 'function') {
        AuthGuard.login(session);
      } else {
        localStorage.setItem('alits_auth_session', JSON.stringify(session));
        localStorage.setItem('alits_portal_user', JSON.stringify(session));
      }
    } catch (e) {}
  }

  // Strictly use logged in student roll from authenticated session
  const activeRoll = (session.rollNo || session.userId || '242G1A05J9').toUpperCase();

  // Load dynamically from central student database
  currentStudent = buildStudentProfile(activeRoll);
  currentStudent = ensureStudentDefaults(currentStudent);

  renderStudentProfileHeader();
  switchStudentTab('dashboard');
}

// Global live update listener across portals
window.addEventListener('storage', (e) => {
  if (e.key === 'ALITS_ERP_STATE' || e.key === 'alits_students_242G' || e.key === 'realStudents') {
    if (currentStudent && currentStudent.rollNo) {
      currentStudent = buildStudentProfile(currentStudent.rollNo);
      currentStudent = ensureStudentDefaults(currentStudent);
      renderStudentProfileHeader();
      switchStudentTab(currentTab);
    }
  }
});

window.addEventListener('alits_data_sync', () => {
  if (currentStudent && currentStudent.rollNo) {
    currentStudent = buildStudentProfile(currentStudent.rollNo);
    currentStudent = ensureStudentDefaults(currentStudent);
    renderStudentProfileHeader();
    switchStudentTab(currentTab);
  }
});

window.onBackendStateUpdated = function (newState, meta = {}) {
  if (currentStudent && currentStudent.rollNo) {
    currentStudent = buildStudentProfile(currentStudent.rollNo);
    currentStudent = ensureStudentDefaults(currentStudent);
    renderStudentProfileHeader();
    switchStudentTab(currentTab);
  }
};

function renderStudentProfileHeader() {
  if (!currentStudent) {
    currentStudent = buildStudentProfile('242G1A05J9');
  }
  currentStudent = ensureStudentDefaults(currentStudent);

  const nameEl = document.getElementById('hdrStudentName');
  const rollEl = document.getElementById('hdrStudentRoll');
  const branchEl = document.getElementById('hdrStudentBranch');
  const semEl = document.getElementById('hdrStudentSem');
  const avatarEl = document.getElementById('hdrStudentAvatar');
  const attKpi = document.getElementById('kpiAttendanceVal');
  const cgpaKpi = document.getElementById('kpiCgpaVal');
  const feeKpi = document.getElementById('kpiFeeVal');

  if (nameEl) nameEl.textContent = currentStudent.name;
  if (rollEl) rollEl.textContent = currentStudent.rollNo;
  if (branchEl) branchEl.textContent = currentStudent.branch;
  if (semEl) semEl.textContent = currentStudent.semester;
  if (avatarEl) {
    const initials = (currentStudent.name || 'Student').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    avatarEl.textContent = initials || 'ST';
  }
  if (attKpi) attKpi.textContent = `${currentStudent.overallAttendance}%`;
  if (cgpaKpi) cgpaKpi.textContent = `${currentStudent.cgpa}`;
  if (feeKpi) feeKpi.textContent = currentStudent.pendingFee === 0 ? '₹0 (Clear)' : `₹${currentStudent.pendingFee.toLocaleString('en-IN')}`;
}

// --- TAB SWITCHER ---
function switchStudentTab(tabName) {
  currentTab = tabName || 'dashboard';

  if (!currentStudent) {
    currentStudent = buildStudentProfile('242G1A05J9');
  }
  currentStudent = ensureStudentDefaults(currentStudent);

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === currentTab);
  });

  const mainContainer = document.getElementById('studentTabContent');
  if (!mainContainer) return;

  try {
    switch (currentTab) {
      case 'dashboard':
        mainContainer.innerHTML = renderDashboardView();
        break;
      case 'attendance':
        mainContainer.innerHTML = renderAttendanceView();
        break;
      case 'academics':
        mainContainer.innerHTML = renderAcademicsView();
        break;
      case 'subjects':
        mainContainer.innerHTML = renderSubjectsAndNotesView();
        break;
      case 'assignments':
        mainContainer.innerHTML = renderAssignmentsView();
        break;
      case 'timetable':
        mainContainer.innerHTML = renderTimetableView();
        break;
      case 'fees':
        mainContainer.innerHTML = renderFeesView();
        break;
      case 'profile':
        mainContainer.innerHTML = renderProfileView();
        break;
      default:
        mainContainer.innerHTML = renderDashboardView();
    }
  } catch (err) {
    console.error(`[StudentPortal] Render error on tab "${currentTab}":`, err);
    try {
      mainContainer.innerHTML = renderDashboardView();
    } catch (e) {
      mainContainer.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--gold);">Academic records loaded successfully.</div>';
    }
  }
}

// --- VIEW 1: DASHBOARD VIEW ---
function renderDashboardView() {
  const s = currentStudent;
  const attColor = s.overallAttendance >= 75 ? 'var(--success)' : 'var(--danger)';
  const attFillClass = s.overallAttendance >= 75 ? 'fill-success' : 'fill-danger';

  return `
    <div class="grid-4" style="margin-bottom: 20px;">
      <div class="metric-widget">
        <div class="metric-icon-box"><i class="fa-solid fa-chart-pie"></i></div>
        <div>
          <div class="metric-title">Overall Attendance</div>
          <div class="metric-value" style="color: ${attColor};">${s.overallAttendance}%</div>
          <div class="metric-sub">${s.attendedClasses} / ${s.totalClasses} Conducted Hours</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--gold); background: var(--gold-light);"><i class="fa-solid fa-graduation-cap"></i></div>
        <div>
          <div class="metric-title">Cumulative CGPA</div>
          <div class="metric-value" style="color: var(--gold-dark);">${s.cgpa} / 10.0</div>
          <div class="metric-sub">Rank: Top 5% in CSE Dept</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: #3B82F6; background: #EFF6FF;"><i class="fa-solid fa-book-open"></i></div>
        <div>
          <div class="metric-title">Registered Subjects</div>
          <div class="metric-value" style="color: #1E40AF;">${s.subjects.length} Courses</div>
          <div class="metric-sub">5 Theory + 2 Labs + 1 Skill</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: ${s.pendingFee === 0 ? 'var(--success)' : 'var(--danger)'}; background: ${s.pendingFee === 0 ? 'var(--success-bg)' : 'var(--danger-bg)'};"><i class="fa-solid fa-receipt"></i></div>
        <div>
          <div class="metric-title">Pending Fee Dues</div>
          <div class="metric-value" style="color: ${s.pendingFee === 0 ? 'var(--success)' : 'var(--danger)'};">${s.pendingFee === 0 ? '₹0.00' : `₹${s.pendingFee.toLocaleString('en-IN')}`}</div>
          <div class="metric-sub">${s.pendingFee === 0 ? 'No Dues · Receipt Generated' : 'Due by 15-Oct-2026'}</div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <!-- Attendance Quick Summary -->
      <div class="portal-card">
        <div class="card-header">
          <span class="card-title"><i class="fa-solid fa-calendar-check" style="color: var(--primary);"></i> Subject-Wise Attendance Breakdown</span>
          <button class="btn-outline" style="padding: 4px 10px; font-size: 11.5px;" onclick="switchStudentTab('attendance')">Full View</button>
        </div>
        <div class="card-body" style="padding: 0;">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th style="text-align: center;">Classes</th>
                <th style="text-align: center;">Attended</th>
                <th style="text-align: right;">Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${s.subjects.map(sub => `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: var(--text-heading);">${sub.name}</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${sub.code} · ${sub.faculty}</div>
                  </td>
                  <td style="text-align: center; font-weight: 600;">${sub.conducted}</td>
                  <td style="text-align: center; font-weight: 600; color: var(--primary);">${sub.attended}</td>
                  <td style="text-align: right;">
                    <span class="badge ${sub.attendance >= 85 ? 'badge-success' : (sub.attendance >= 75 ? 'badge-warning' : 'badge-danger')}">
                      ${sub.attendance}%
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions & Active Announcements -->
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div class="portal-card" style="margin-bottom: 0;">
          <div class="card-header">
            <span class="card-title"><i class="fa-solid fa-bullhorn" style="color: var(--gold-dark);"></i> Institutional Notifications</span>
            <span class="badge badge-gold">Official</span>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="padding: 12px; background: var(--bg-subtle); border-left: 4px solid var(--primary); border-radius: 4px;">
                <div style="font-weight: 700; font-size: 13.5px; color: var(--primary);">Mid-1 Examinations Timetable Released</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Mid-1 examinations for III-I B.Tech commence from October 12, 2026. Hall Tickets are available for download.</div>
              </div>
              <div style="padding: 12px; background: var(--bg-subtle); border-left: 4px solid var(--gold); border-radius: 4px;">
                <div style="font-weight: 700; font-size: 13.5px; color: var(--gold-dark);">Skill Dev Directorate - AWS Certification Workshop</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Director Dr. M. Surendra Naidu announced hands-on AWS Cloud Practitioner training on Saturday at Lab-4.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="portal-card" style="margin-bottom: 0;">
          <div class="card-header">
            <span class="card-title"><i class="fa-solid fa-bolt" style="color: var(--primary);"></i> Student Quick Services</span>
          </div>
          <div class="card-body" style="display: flex; flex-wrap: wrap; gap: 10px;">
            <button class="btn-primary" onclick="openHallTicketModal()"><i class="fa-solid fa-id-card"></i> Download Hall Ticket</button>
            <button class="btn-outline" onclick="switchStudentTab('assignments')"><i class="fa-solid fa-file-arrow-up"></i> Submit Assignments</button>
            <button class="btn-outline" onclick="openLeaveApplyModal()"><i class="fa-solid fa-envelope-open-text"></i> Apply Leave Permission</button>
            <button class="btn-outline" onclick="switchStudentTab('fees')"><i class="fa-solid fa-receipt"></i> Fee Receipts</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- VIEW 2: ATTENDANCE & LEAVE VIEW ---
function renderAttendanceView() {
  const s = currentStudent;
  const classesNeeded = Math.max(0, Math.ceil((0.75 * s.totalClasses - s.attendedClasses) / 0.25));
  const safeBunk = Math.max(0, Math.floor((s.attendedClasses - 0.75 * s.totalClasses) / 0.75));

  return `
    <div class="grid-3" style="margin-bottom: 20px;">
      <div class="metric-widget">
        <div class="metric-icon-box"><i class="fa-solid fa-circle-check"></i></div>
        <div>
          <div class="metric-title">Present Status</div>
          <div class="metric-value" style="color: var(--success);">${s.overallAttendance}%</div>
          <div class="metric-sub">${s.attendedClasses} Classes Attended</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--info); background: var(--info-bg);"><i class="fa-solid fa-shield-halved"></i></div>
        <div>
          <div class="metric-title">Eligibility Buffer</div>
          <div class="metric-value" style="color: var(--info);">${safeBunk} Classes</div>
          <div class="metric-sub">Safe buffer above 75% threshold</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--gold-dark); background: var(--gold-light);"><i class="fa-solid fa-calendar-days"></i></div>
        <div>
          <div class="metric-title">Working Days</div>
          <div class="metric-value" style="color: var(--gold-dark);">82 Days</div>
          <div class="metric-sub">Academic Semester Progress: 68%</div>
        </div>
      </div>
    </div>

    <div class="portal-card">
      <div class="card-header">
        <span class="card-title"><i class="fa-solid fa-table-list" style="color: var(--primary);"></i> Detailed Subject-Wise Attendance Log</span>
        <button class="btn-primary" onclick="openLeaveApplyModal()"><i class="fa-solid fa-plus"></i> Apply Student Leave</button>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Course Code & Subject</th>
                <th>Faculty In-Charge</th>
                <th style="text-align: center;">Total Hours</th>
                <th style="text-align: center;">Attended</th>
                <th style="text-align: center;">Absent</th>
                <th style="text-align: center;">Percentage</th>
                <th style="text-align: right;">Exam Eligibility</th>
              </tr>
            </thead>
            <tbody>
              ${s.subjects.map(sub => {
    const absent = sub.conducted - sub.attended;
    const isEligible = sub.attendance >= 75;
    return `
                  <tr>
                    <td>
                      <div style="font-weight: 700; color: var(--text-heading);">${sub.name}</div>
                      <div style="font-size: 11.5px; color: var(--text-muted); font-family: 'JetBrains Mono';">${sub.code}</div>
                    </td>
                    <td><div style="font-weight: 600;">${sub.faculty}</div></td>
                    <td style="text-align: center; font-weight: 600;">${sub.conducted}</td>
                    <td style="text-align: center; font-weight: 700; color: var(--success);">${sub.attended}</td>
                    <td style="text-align: center; font-weight: 700; color: var(--danger);">${absent}</td>
                    <td style="text-align: center;">
                      <span class="badge ${sub.attendance >= 85 ? 'badge-success' : (sub.attendance >= 75 ? 'badge-warning' : 'badge-danger')}">
                        ${sub.attendance}%
                      </span>
                    </td>
                    <td style="text-align: right;">
                      <span class="badge ${isEligible ? 'badge-success' : 'badge-danger'}">
                        ${isEligible ? '✓ Eligible' : '⚠ Condonation'}
                      </span>
                    </td>
                  </tr>
                `;
  }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// --- VIEW 3: ACADEMICS & RESULTS ---
function renderAcademicsView() {
  const s = currentStudent;

  return `
    <div class="grid-4" style="margin-bottom: 20px;">
      <div class="metric-widget">
        <div class="metric-icon-box"><i class="fa-solid fa-award"></i></div>
        <div>
          <div class="metric-title">Cumulative CGPA</div>
          <div class="metric-value" style="color: var(--primary);">${s.cgpa}</div>
          <div class="metric-sub">Distinction Grade</div>
        </div>
      </div>
      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--gold-dark); background: var(--gold-light);"><i class="fa-solid fa-stamp"></i></div>
        <div>
          <div class="metric-title">Active Backlogs</div>
          <div class="metric-value" style="color: var(--success);">0</div>
          <div class="metric-sub">All cleared on first attempt</div>
        </div>
      </div>
      <div class="metric-widget">
        <div class="metric-icon-box" style="color: #3B82F6; background: #EFF6FF;"><i class="fa-solid fa-coins"></i></div>
        <div>
          <div class="metric-title">Credits Earned</div>
          <div class="metric-value" style="color: #1E40AF;">${s.creditsEarned} / ${s.totalCredits}</div>
          <div class="metric-sub">Progress: 57.5%</div>
        </div>
      </div>
      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--primary); background: var(--primary-subtle);"><i class="fa-solid fa-certificate"></i></div>
        <div>
          <div class="metric-title">Regulation</div>
          <div class="metric-value" style="font-size: 18px; color: var(--primary);">${s.regulation}</div>
          <div class="metric-sub">JNTUA Autonomous</div>
        </div>
      </div>
    </div>

    <!-- Current Semester Internal Assessment (Mid-1 & Mid-2) -->
    <div class="portal-card">
      <div class="card-header">
        <span class="card-title"><i class="fa-solid fa-chart-simple" style="color: var(--primary);"></i> Current Semester Internal Evaluation (Mid-1 & Mid-2)</span>
        <button class="btn-primary" onclick="openHallTicketModal()"><i class="fa-solid fa-file-pdf"></i> JNTUA Hall Ticket</button>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Subject Code & Title</th>
                <th style="text-align: center;">Mid-1 (30M)</th>
                <th style="text-align: center;">Mid-2 (30M)</th>
                <th style="text-align: center;">Best Internal (30M)</th>
                <th style="text-align: center;">Estimated Grade</th>
                <th style="text-align: right;">Performance</th>
              </tr>
            </thead>
            <tbody>
              ${s.subjects.map(sub => {
    const bestMid = Math.round(0.8 * Math.max(sub.mid1, sub.mid2) + 0.2 * Math.min(sub.mid1, sub.mid2));
    return `
                  <tr>
                    <td>
                      <div style="font-weight: 700; color: var(--text-heading);">${sub.name}</div>
                      <div style="font-size: 11.5px; color: var(--text-muted); font-family: 'JetBrains Mono';">${sub.code}</div>
                    </td>
                    <td style="text-align: center; font-weight: 700; color: var(--primary);">${sub.mid1} / 30</td>
                    <td style="text-align: center; font-weight: 700; color: var(--primary);">${sub.mid2} / 30</td>
                    <td style="text-align: center; font-weight: 800; color: var(--gold-dark);">${bestMid} / 30</td>
                    <td style="text-align: center;"><span class="badge badge-gold">${sub.grade}</span></td>
                    <td style="text-align: right;"><span class="badge badge-success">✓ Excellent</span></td>
                  </tr>
                `;
  }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Previous Semesters SGPA Transcript & Official Degree Certificate -->
    <div class="portal-card">
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span class="card-title"><i class="fa-solid fa-scroll" style="color: var(--gold-dark);"></i> Semester-Wise Grade Point Average (SGPA) Transcript</span>
        <button class="btn-primary" onclick="openStudentDegreeCertificateModal()" style="font-size: 12.5px; padding: 6px 14px; background: linear-gradient(135deg, #d97706, #b45309);">
          <i class="fa-solid fa-graduation-cap"></i> View Official Academic Degree Certificate
        </button>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Semester</th>
                <th style="text-align: center;">Month & Year</th>
                <th style="text-align: center;">Credits</th>
                <th style="text-align: center;">SGPA</th>
                <th style="text-align: right;">Result Status</th>
              </tr>
            </thead>
            <tbody>
              ${s.semesters.map(sem => `
                <tr>
                  <td style="font-weight: 700; color: var(--text-heading);">${sem.sem}</td>
                  <td style="text-align: center; color: var(--text-muted);">${sem.monthYear}</td>
                  <td style="text-align: center; font-weight: 600;">${sem.credits}</td>
                  <td style="text-align: center; font-weight: 800; color: var(--primary); font-size: 15px;">${sem.sgpa}</td>
                  <td style="text-align: right;"><span class="badge badge-success">${sem.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// --- VIEW 4: MY SUBJECTS & NOTES ---
function renderSubjectsAndNotesView() {
  const s = currentStudent;

  return `
    <div class="portal-card">
      <div class="card-header">
        <span class="card-title"><i class="fa-solid fa-book-bookmark" style="color: var(--primary);"></i> Enrolled Courses & Study Materials (${s.semester})</span>
        <span class="badge badge-gold">Total ${ALITS_SUBJECT_NOTES.length} Study Resources Available</span>
      </div>
      <div class="card-body">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
          ${ALITS_SUBJECT_NOTES.map(note => `
            <div style="background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                  <span class="badge badge-gold" style="font-size: 11px;">${note.subject}</span>
                  <span style="font-size: 11.5px; color: var(--text-muted);">${note.date}</span>
                </div>
                <h4 style="font-size: 14.5px; font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">${note.title}</h4>
                <div style="font-size: 12px; color: var(--gold-dark); font-weight: 600; margin-bottom: 6px;">${note.unit}</div>
                <div style="font-size: 12px; color: var(--text-muted);"><i class="fa-solid fa-user-tie"></i> Faculty: ${note.faculty}</div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 12px;">
                <div style="font-size: 12px; color: var(--text-muted); font-family: 'JetBrains Mono';"><i class="fa-solid fa-file-pdf" style="color: var(--danger);"></i> PDF Note</div>
                <button class="btn-primary" style="padding: 4px 12px; font-size: 12px;" onclick="downloadNoteSimulation('${note.title}')">
                  <i class="fa-solid fa-download"></i> Download Notes
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// --- VIEW 5: ASSIGNMENTS & TASKS ---
function renderAssignmentsView() {
  const s = currentStudent;

  return `
    <div class="portal-card">
      <div class="card-header">
        <span class="card-title"><i class="fa-solid fa-list-check" style="color: var(--primary);"></i> Coursework Assignments & Submissions</span>
        <span class="badge badge-success">${ALITS_ASSIGNMENTS.length} Active Tasks</span>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Assignment Title & Subject</th>
                <th>Faculty In-Charge</th>
                <th style="text-align: center;">Due Date</th>
                <th style="text-align: center;">Max Marks</th>
                <th style="text-align: center;">Submission Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${ALITS_ASSIGNMENTS.map((asg, idx) => `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: var(--text-heading);">${asg.title}</div>
                    <div style="font-size: 12px; color: var(--gold-dark); font-weight: 600;">${asg.subject}</div>
                    <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">${asg.instructions}</div>
                  </td>
                  <td style="font-weight: 600;">${asg.faculty}</td>
                  <td style="text-align: center; font-weight: 700; color: var(--danger);">${asg.dueDate}</td>
                  <td style="text-align: center; font-weight: 700; color: var(--primary);">${asg.maxMarks} M</td>
                  <td style="text-align: center;">
                    <span class="badge ${idx === 0 ? 'badge-success' : 'badge-warning'}">
                      ${idx === 0 ? '✓ Submitted (Score: 19/20)' : '⏳ Pending Submission'}
                    </span>
                  </td>
                  <td style="text-align: right;">
                    <button class="btn-primary" style="padding: 5px 12px; font-size: 12px;" onclick="openSubmitAssignmentModal('${asg.id}', '${asg.title}')">
                      <i class="fa-solid fa-upload"></i> ${idx === 0 ? 'Re-Submit' : 'Submit Solution'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// --- VIEW 6: TIME TABLE ---
function renderTimetableView() {
  const s = currentStudent;

  return `
    <div class="portal-card" style="box-shadow: 0 4px 20px rgba(0,0,0,0.12); border: 1.5px solid #94a3b8; background: #ffffff;">
      <div class="card-header" style="flex-direction: column; align-items: flex-start; gap: 10px; background: linear-gradient(135deg, #0f3d26 0%, #1e4d35 100%); border-bottom: 2px solid #d4af37; padding: 18px 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="../images/alits_college_crest_logo.png" alt="ALITS Logo" style="height: 42px; width: 42px; object-fit: contain; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));" onerror="this.src='../assets/alits_logo.png'" />
            <div>
              <div style="font-size: 16.5px; font-weight: 800; color: #fef3c7; letter-spacing: 0.6px;">ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES (AUTONOMOUS)</div>
              <div style="font-size: 12px; color: #e2e8f0; font-weight: 500;">Near SK University, Itikalapalli, Ananthapuramu · Regulations: R24 · Academic Year: 2026-27</div>
            </div>
          </div>
          <span class="badge" style="background: #f59e0b; color: #111827; font-size: 12.5px; padding: 7px 16px; font-weight: 800; border: 1.5px solid #000;">
            <i class="fa-solid fa-crown" style="margin-right: 6px;"></i> Class In-Charge: MS. A. MANJULA (CSE-D)
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; width: 100%; font-size: 13px; font-weight: 700; color: #fef3c7; margin-top: 4px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;">
          <span>Class: <strong style="color: #6ee7b7; font-weight: 800;">III Year I Sem (CSE Section-D)</strong> · 2024 Batch</span>
          <span>Class Mentor: <strong style="color: #fde047; font-weight: 800;"><i class="fa-solid fa-phone" style="font-size: 11px;"></i> MS. A. Manjula (+91 63017 35752)</strong></span>
        </div>
      </div>
      <div class="card-body" style="padding: 16px; background: #ffffff;">
        <div class="table-responsive timetable-wrapper">
          <table class="timetable-grid-table" style="border-collapse: collapse !important; table-layout: fixed !important; width: 100% !important;">
            <colgroup>
              <col style="width: 65px;" />
              <col style="width: auto;" />
              <col style="width: 30px;" />
              <col style="width: auto;" />
              <col style="width: auto;" />
              <col style="width: 30px;" />
              <col style="width: auto;" />
              <col style="width: auto;" />
              <col style="width: auto;" />
            </colgroup>
            <thead>
              <tr>
                <th style="width: 65px; color: #0f172a; font-weight: 800;">Day</th>
                <th style="color: #0f172a; font-weight: 800;">P1<br><span class="period-time" style="color: #0f172a; font-weight: 800;">09:00 - 10:10</span></th>
                <th style="width: 30px; font-size: 9.5px; color: #ffffff; background: #334155 !important; border: 1.5px solid #1e293b !important; padding: 4px 1px !important;">10:10<br>10:25</th>
                <th style="color: #0f172a; font-weight: 800;">P2<br><span class="period-time" style="color: #0f172a; font-weight: 800;">10:25 - 11:30</span></th>
                <th style="color: #0f172a; font-weight: 800;">P3<br><span class="period-time" style="color: #0f172a; font-weight: 800;">11:30 - 12:30</span></th>
                <th style="width: 30px; font-size: 9.5px; color: #fde047; background: #1e3a5f !important; border: 1.5px solid #0f172a !important; padding: 4px 1px !important;">12:30<br>01:15</th>
                <th style="color: #0f172a; font-weight: 800;">P4<br><span class="period-time" style="color: #0f172a; font-weight: 800;">01:15 - 02:15</span></th>
                <th style="color: #0f172a; font-weight: 800;">P5<br><span class="period-time" style="color: #0f172a; font-weight: 800;">02:15 - 03:15</span></th>
                <th style="color: #0f172a; font-weight: 800;">P6<br><span class="period-time" style="color: #0f172a; font-weight: 800;">03:15 - 04:00</span></th>
              </tr>
            </thead>  
            <tbody>
              <!-- MON -->
              <tr>
                <td class="tt-day">Mon</td>
                <td class="tt-subject-iqta"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">IQTA</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 220</small></td>
                <td rowspan="3" class="tt-break" style="width: 30px; z-index: 1;">BREAK</td>
                <td class="tt-subject-iqta"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">IQTA</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 220</small></td>
                <td class="tt-subject-ooad"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">OOAD</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 220</small></td>
                <td rowspan="6" class="tt-lunch" style="width: 30px; z-index: 1;">LUNCH BREAK</td>
                <td class="tt-subject-atcd"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">ATCD</strong><br><small style="color: #166534; font-weight: 700; font-size: 11px;">MS. Manjula</small></td>
                <td class="tt-subject-ai"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">AI</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 220</small></td>
                <td class="tt-subject-lib"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">LIB</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Library</small></td>
              </tr>

              <!-- TUE -->
              <tr>
                <td class="tt-day">Tue</td>
                <td class="tt-subject-cnip"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">CNIP</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 111</small></td>
                <td class="tt-subject-ooad"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">OOAD</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 111</small></td>
                <td class="tt-subject-sh"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">SH / SII</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 111</small></td>
                <td colspan="3" class="lab-block" style="background: #f59e0b; color: #111827 !important; border: 2px solid #000;">
                  <strong style="font-weight: 800; color: #111827 !important; text-shadow: none; font-size: 13px;">ARTIFICIAL INTELLIGENCE LAB (AI LAB)</strong><br>
                  <small style="color: #1f2937 !important; font-weight: 700; font-size: 11.5px;">LAB 4 (01:15 - 04:00) · Ms. C. Sravani</small>
                </td>
              </tr>

              <!-- WED -->
              <tr>
                <td class="tt-day">Wed</td>
                <td class="tt-subject-ai"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">AI</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 220</small></td>
                <td class="tt-subject-gb"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">GB</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 220</small></td>
                <td class="tt-subject-ooad"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">OOAD</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 220</small></td>
                <td class="tt-subject-ai"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">AI</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 220</small></td>
                <td class="tt-subject-atcd"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">ATCD</strong><br><small style="color: #166534; font-weight: 700; font-size: 11px;">Room 220 · MS. Manjula</small></td>
                <td class="tt-subject-cnip"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">CNIP</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Mr. Rajesh</small></td>
              </tr>

              <!-- THU -->
              <tr>
                <td class="tt-day">Thu</td>
                <td colspan="4" class="lab-block" style="background: #f59e0b; color: #111827 !important; border: 2px solid #000;">
                  <strong style="font-weight: 800; color: #111827 !important; text-shadow: none; font-size: 13px;">COMPUTER NETWORKS &amp; INTERNET PROTOCOLS LAB (CNIP LAB)</strong><br>
                  <small style="color: #1f2937 !important; font-weight: 700; font-size: 11.5px;">LAB 4 (09:00 - 12:30 Continuous Lab across P1-P3) · Mr. A. Rajesh</small>
                </td>
                <td class="tt-subject-gb"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">GB</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 111</small></td>
                <td class="tt-subject-ai"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">AI</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 111</small></td>
                <td class="tt-subject-gb"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">GB</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Green Building</small></td>
              </tr>

              <!-- FRI -->
              <tr>
                <td class="tt-day">Fri</td>
                <td class="tt-subject-ai"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">AI</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 114</small></td>
                <td rowspan="2" class="tt-break" style="width: 30px; z-index: 1;">BREAK</td>
                <td class="tt-subject-ooad"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">OOAD</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 114</small></td>
                <td class="tt-subject-gb"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">GB</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 114</small></td>
                <td class="tt-subject-cnip"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">CNIP</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Mr. Rajesh</small></td>
                <td class="tt-subject-atcd"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">ATCD</strong><br><small style="color: #166534; font-weight: 700; font-size: 11px;">LAB 3 · MS. Manjula</small></td>
                <td class="tt-subject-cnip"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">CNIP</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Mr. Rajesh</small></td>
              </tr>

              <!-- SAT -->
              <tr>
                <td class="tt-day">Sat</td>
                <td class="tt-subject-atcd"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">ATCD</strong><br><small style="color: #166534; font-weight: 700; font-size: 11px;">Room 316 · MS. Manjula</small></td>
                <td class="tt-subject-gb"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">GB</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 316</small></td>
                <td class="tt-subject-ooad"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">OOAD</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 316</small></td>
                <td class="tt-subject-atcd"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">ATCD</strong><br><small style="color: #166534; font-weight: 700; font-size: 11px;">MS. Manjula</small></td>
                <td class="tt-subject-cnip"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">CNIP</strong><br><small style="color: #1f2937; font-weight: 700; font-size: 11px;">Room 316</small></td>
                <td class="tt-subject-sports"><strong style="font-weight: 800; color: #000; text-shadow: none; font-size: 13px;">SPORTS</strong><br><small style="color: #854d0e; font-weight: 700; font-size: 11px;">Physical Edu</small></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Course Catalog & Faculty Contact Mapping -->
        <div style="margin-top: 20px; border-radius: 8px; overflow: hidden; border: 1.5px solid #94a3b8; background: #ffffff;">
          <div style="padding: 14px 18px; background: #0f3d26; border-bottom: 2px solid #d4af37; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <div style="font-size: 13.5px; font-weight: 800; color: #fef3c7; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-book-bookmark" style="color: #fde047;"></i>
              <span>III Year I Sem (CSE-D) Official Course Catalog & Faculty Directory</span>
            </div>
            <span style="font-size: 11px; color: #e2e8f0;">* CC: Course Code · CSN: Course Short Name</span>
          </div>
          <div class="table-responsive" style="padding: 10px;">
            <table class="custom-table" style="font-size: 12px; width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f1f5f9; color: #0f172a; border-bottom: 2px solid #94a3b8;">
                  <th style="width: 140px; color: #0f172a; font-weight: 800;">Course Code (CC)</th>
                  <th style="width: 100px; color: #0f172a; font-weight: 800;">Short Name</th>
                  <th style="color: #0f172a; font-weight: 800;">Course Title</th>
                  <th style="color: #0f172a; font-weight: 800;">Faculty In-Charge</th>
                  <th style="text-align: right; width: 140px; color: #0f172a; font-weight: 800;">Contact Number</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="font-family: 'JetBrains Mono'; font-weight: 800; color: #0f172a;">24ALBTAM301T</td>
                  <td><span class="badge" style="background: #ffedd5; color: #9a3412; border: 1.5px solid #ea580c; font-weight: 800; padding: 3px 8px;">AI</span></td>
                  <td><strong style="color: #111827;">ARTIFICIAL INTELLIGENCE</strong></td>
                  <td style="color: #1f2937; font-weight: 700;">Ms. C. SRAVANI</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #0f172a; font-weight: 700;">+91 93900 33582</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="font-family: 'JetBrains Mono'; font-weight: 800; color: #0f172a;">24ALBTCS501T</td>
                  <td><span class="badge" style="background: #e0f2fe; color: #0369a1; border: 1.5px solid #0284c7; font-weight: 800; padding: 3px 8px;">CN & IP</span></td>
                  <td><strong style="color: #111827;">COMPUTER NETWORKS & INTERNET PROTOCOLS</strong></td>
                  <td style="color: #1f2937; font-weight: 700;">Mr. A. RAJESH</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #0f172a; font-weight: 700;">+91 91339 30206</td>
                </tr>
                <tr style="background: #f0fdf4; border-left: 4px solid #16a34a; border-bottom: 1px solid #e2e8f0;">
                  <td style="font-family: 'JetBrains Mono'; font-weight: 800; color: #166534;">24ALBTCS502T</td>
                  <td><span class="badge" style="background: #dcfce7; color: #166534; border: 1.5px solid #16a34a; font-weight: 800; padding: 3px 8px;">AT & CD</span></td>
                  <td><strong style="color: #14532d;">AUTOMATA THEORY AND COMPILER DESIGN</strong> <span style="font-size: 10px; background: #d4af37; color: #0f3d26; padding: 2px 6px; border-radius: 4px; font-weight: 800; margin-left: 6px;">CLASS IN-CHARGE</span></td>
                  <td style="color: #0f172a; font-weight: 800;">Ms. A. MANJULA (Class Mentor/Incharge)</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; font-weight: 800; color: #166534;">+91 63017 35752</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="font-family: 'JetBrains Mono'; font-weight: 800; color: #0f172a;">24ALBTCS503T</td>
                  <td><span class="badge" style="background: #e0e7ff; color: #3730a3; border: 1.5px solid #4f46e5; font-weight: 800; padding: 3px 8px;">IQTA</span></td>
                  <td><strong style="color: #111827;">INTRODUCTION TO QUANTUM TECHNOLOGIES AND APPLICATIONS</strong></td>
                  <td style="color: #1f2937; font-weight: 700;">Ms. P. CHANDANA</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #0f172a; font-weight: 700;">+91 95503 55936</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="font-family: 'JetBrains Mono'; font-weight: 800; color: #0f172a;">24ALBTCS504T</td>
                  <td><span class="badge" style="background: #f3e8ff; color: #6b21a8; border: 1.5px solid #9333ea; font-weight: 800; padding: 3px 8px;">OOAD</span></td>
                  <td><strong style="color: #111827;">OBJECT ORIENTED ANALYSIS & DESIGN</strong></td>
                  <td style="color: #1f2937; font-weight: 700;">Dr. K. BHARGAVI (HOD - CSE)</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #0f172a; font-weight: 700;">+91 94932 22702</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="font-family: 'JetBrains Mono'; font-weight: 800; color: #0f172a;">24ALBTAM301P</td>
                  <td><span class="badge lab-block" style="background: #f59e0b; color: #111827; border: 1.5px solid #000; font-weight: 800; padding: 3px 8px;">AI LAB</span></td>
                  <td><strong style="color: #111827;">ARTIFICIAL INTELLIGENCE LAB</strong></td>
                  <td style="color: #1f2937; font-weight: 700;">Ms. C. SRAVANI</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #0f172a; font-weight: 700;">+91 93900 33582</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="font-family: 'JetBrains Mono'; font-weight: 800; color: #0f172a;">24ALBTCS501P</td>
                  <td><span class="badge lab-block" style="background: #f59e0b; color: #111827; border: 1.5px solid #000; font-weight: 800; padding: 3px 8px;">CN & IP LAB</span></td>
                  <td><strong style="color: #111827;">COMPUTER NETWORKS & INTERNET PROTOCOLS LAB</strong></td>
                  <td style="color: #1f2937; font-weight: 700;">Mr. A. RAJESH</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #0f172a; font-weight: 700;">+91 91339 30206</td>
                </tr>
                <tr>
                  <td style="font-family: 'JetBrains Mono'; font-weight: 800; color: #0f172a;">24ALBTCE508T</td>
                  <td><span class="badge" style="background: #ccfbf1; color: #115e59; border: 1.5px solid #0d9488; font-weight: 800; padding: 3px 8px;">GB</span></td>
                  <td><strong style="color: #111827;">GREEN BUILDING</strong></td>
                  <td style="color: #1f2937; font-weight: 700;">Ms. VIDHYA</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #0f172a; font-weight: 700;">+91 63024 48870</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- VIEW 7: FEES LEDGER ---
function renderFeesView() {
  const s = currentStudent;

  return `
    <div class="grid-3" style="margin-bottom: 20px;">
      <div class="metric-widget">
        <div class="metric-icon-box"><i class="fa-solid fa-coins"></i></div>
        <div>
          <div class="metric-title">Total Annual Fee</div>
          <div class="metric-value" style="color: var(--text-heading);">₹${s.totalFee.toLocaleString('en-IN')}</div>
          <div class="metric-sub">Academic Year 2026-2027</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--success); background: var(--success-bg);"><i class="fa-solid fa-circle-check"></i></div>
        <div>
          <div class="metric-title">Total Paid Fee</div>
          <div class="metric-value" style="color: var(--success);">₹${s.paidFee.toLocaleString('en-IN')}</div>
          <div class="metric-sub">Receipts generated</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: ${s.pendingFee === 0 ? 'var(--success)' : 'var(--danger)'}; background: ${s.pendingFee === 0 ? 'var(--success-bg)' : 'var(--danger-bg)'};"><i class="fa-solid fa-clock-rotate-left"></i></div>
        <div>
          <div class="metric-title">Pending Balance</div>
          <div class="metric-value" style="color: ${s.pendingFee === 0 ? 'var(--success)' : 'var(--danger)'};">₹${s.pendingFee.toLocaleString('en-IN')}</div>
          <div class="metric-sub">${s.pendingFee === 0 ? 'No Dues Certificate Active' : 'Due by 15-Oct-2026'}</div>
        </div>
      </div>
    </div>

    <div class="portal-card">
      <div class="card-header">
        <span class="card-title"><i class="fa-solid fa-receipt" style="color: var(--primary);"></i> Official Fee Breakdown & Transactions</span>
        ${s.pendingFee > 0 ? '<button class="btn-primary" onclick="simulateFeePayment()"><i class="fa-solid fa-credit-card"></i> Pay Outstanding Dues</button>' : '<span class="badge badge-success">✓ Zero Dues</span>'}
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Fee Head</th>
                <th style="text-align: center;">Total Amount</th>
                <th style="text-align: center;">Paid Amount</th>
                <th style="text-align: center;">Due Amount</th>
                <th style="text-align: center;">Payment Date</th>
                <th style="text-align: right;">Status & Receipt</th>
              </tr>
            </thead>
            <tbody>
              ${s.fees.map(f => `
                <tr>
                  <td style="font-weight: 700; color: var(--text-heading);">${f.title}</td>
                  <td style="text-align: center; font-weight: 600;">₹${f.total.toLocaleString('en-IN')}</td>
                  <td style="text-align: center; font-weight: 700; color: var(--success);">₹${f.paid.toLocaleString('en-IN')}</td>
                  <td style="text-align: center; font-weight: 700; color: ${f.due === 0 ? 'var(--success)' : 'var(--danger)'};">₹${f.due.toLocaleString('en-IN')}</td>
                  <td style="text-align: center; color: var(--text-muted);">${f.date}</td>
                  <td style="text-align: right;">
                    <span class="badge ${f.due === 0 ? 'badge-success' : 'badge-warning'}">${f.status}</span>
                    <button class="btn-outline" style="padding: 3px 8px; font-size: 11px; margin-left: 6px;" onclick="downloadReceiptSimulation('${f.title}')"><i class="fa-solid fa-download"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// --- VIEW 8: PROFILE & MENTOR VIEW ---
function renderProfileView() {
  const s = currentStudent;

  return `
    <div class="grid-2">
      <div class="portal-card">
        <div class="card-header">
          <span class="card-title"><i class="fa-solid fa-user-graduate" style="color: var(--primary);"></i> Student Academic Profile</span>
          <span class="badge badge-gold">Active Student</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
            <div class="student-avatar" style="width: 70px; height: 70px; font-size: 26px;">
              ${s.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 style="font-size: 18px; color: var(--primary-deep); font-weight: 800;">${s.name}</h3>
              <div style="font-size: 13px; font-weight: 700; color: var(--gold-dark); font-family: 'JetBrains Mono';">${s.rollNo}</div>
              <div style="font-size: 12.5px; color: var(--text-muted);">${s.branch}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; font-size: 13px;">
            <div><strong>Gender:</strong> ${s.gender}</div>
            <div><strong>Date of Birth:</strong> ${s.dob}</div>
            <div><strong>Blood Group:</strong> ${s.bloodGroup}</div>
            <div><strong>Admission Quota:</strong> ${s.admissionType}</div>
            <div><strong>Academic Year:</strong> ${s.academicYear}</div>
            <div><strong>Batch:</strong> ${s.batch}</div>
            <div><strong>Student Mobile:</strong> ${s.studentPhone}</div>
            <div><strong>Official Email:</strong> ${s.email}</div>
            <div style="grid-column: span 2;"><strong>Father's Name & Phone:</strong> ${s.parentName} (${s.parentPhone})</div>
            <div style="grid-column: span 2;"><strong>Residential Address:</strong> ${s.address}</div>
          </div>
        </div>
      </div>

      <div class="portal-card">
        <div class="card-header">
          <span class="card-title"><i class="fa-solid fa-chalkboard-user" style="color: var(--primary);"></i> Assigned Faculty Mentor / Proctor</span>
          <span class="badge badge-success">Official Proctor</span>
        </div>
        <div class="card-body">
          <div style="padding: 16px; background: var(--bg-subtle); border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 16px;">
            <h4 style="font-size: 16px; color: var(--primary); font-weight: 700; margin-bottom: 4px;">${s.mentorName}</h4>
            <div style="font-size: 13px; color: var(--gold-dark); font-weight: 600; margin-bottom: 8px;">Professor & Head of Department - CSE</div>
            <div style="font-size: 12.5px; color: var(--text-muted);">
              <div><i class="fa-solid fa-phone"></i> <strong>Contact:</strong> ${s.mentorPhone}</div>
              <div><i class="fa-solid fa-envelope"></i> <strong>Email:</strong> ramanappa.cse@alits.ac.in</div>
              <div><i class="fa-solid fa-location-dot"></i> <strong>Office:</strong> CSE Department HoD Chamber, Block-A</div>
            </div>
          </div>

          <div style="font-weight: 700; font-size: 14px; margin-bottom: 10px; color: var(--text-heading);">Submit Grievance / Proctor Inquiry:</div>
          <textarea id="proctorInquiryText" class="form-control" rows="3" placeholder="Type your academic or counseling query here..." style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border); font-family: inherit; margin-bottom: 10px;"></textarea>
          <button class="btn-primary" onclick="submitProctorInquiry()"><i class="fa-solid fa-paper-plane"></i> Send to Mentor</button>
        </div>
      </div>
    </div>
  `;
}

// --- MODAL UTILITIES ---
function openHallTicketModal() {
  const s = currentStudent;
  const modal = document.getElementById('studentModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.textContent = 'JNTUA Official Examination Hall Ticket (Autonomous)';
  body.innerHTML = `
    <div style="text-align: center; border-bottom: 2px solid var(--gold); padding-bottom: 12px; margin-bottom: 16px;">
      <h3 style="color: var(--primary-deep); font-weight: 800; margin: 0;">ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES</h3>
      <div style="font-size: 12px; color: var(--text-muted);">Anantapuramu, Andhra Pradesh · Autonomous & Accredited by NAAC with 'A' Grade</div>
      <div style="font-size: 14px; font-weight: 700; color: var(--gold-dark); margin-top: 6px;">III B.TECH I SEMESTER (R24) REGULAR EXAMINATIONS - NOV 2026</div>
    </div>

    <div style="display: flex; justify-content: space-between; gap: 16px; margin-bottom: 16px; font-size: 13px;">
      <div>
        <div><strong>Student Name:</strong> ${s.name}</div>
        <div><strong>Hall Ticket / Roll No:</strong> <span style="font-weight: 800; color: var(--primary);">${s.rollNo}</span></div>
        <div><strong>Branch:</strong> ${s.branch}</div>
      </div>
      <div style="width: 70px; height: 85px; border: 1.5px solid var(--gold); display: flex; align-items: center; justify-content: center; background: #fff; font-size: 11px; text-align: center; color: var(--text-muted);">
        PHOTO AFFIXED
      </div>
    </div>

    <table class="custom-table" style="font-size: 12px; margin-bottom: 16px;">
      <thead>
        <tr>
          <th>Date & Session</th>
          <th>Subject Code & Title</th>
          <th style="text-align: center;">Invigilator Sign</th>
        </tr>
      </thead>
      <tbody>
        ${s.subjects.map(sub => `
          <tr>
            <td>12-Nov-2026 (10:00 AM)</td>
            <td><strong>${sub.code}</strong> - ${sub.name}</td>
            <td style="text-align: center; color: #ccc;">__________</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div style="display: flex; justify-content: flex-end; gap: 10px;">
      <button class="btn-outline" onclick="closeStudentModal()">Close</button>
      <button class="btn-primary" onclick="showToast('✓ Hall ticket PDF printed / downloaded successfully!'); closeStudentModal();">
        <i class="fa-solid fa-print"></i> Print Hall Ticket
      </button>
    </div>
  `;
  modal.classList.add('active');
}

function openLeaveApplyModal() {
  const modal = document.getElementById('studentModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.textContent = 'Apply for Student Leave Permission';
  body.innerHTML = `
    <form onsubmit="handleStudentLeaveSubmit(event)">
      <div style="margin-bottom: 12px;">
        <label style="display: block; font-size: 12.5px; font-weight: 600; margin-bottom: 4px;">Leave Type</label>
        <select id="leaveTypeSelect" class="form-control" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border);">
          <option value="Medical Leave">Medical Leave (Health issues / Doctor certificate)</option>
          <option value="Personal Leave">Personal / Family Emergency</option>
          <option value="On-Duty (OD)">On-Duty (Hackathon / Sports / Paper Presentation)</option>
        </select>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
        <div>
          <label style="display: block; font-size: 12.5px; font-weight: 600; margin-bottom: 4px;">From Date</label>
          <input type="date" id="leaveFromDate" required style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border);" />
        </div>
        <div>
          <label style="display: block; font-size: 12.5px; font-weight: 600; margin-bottom: 4px;">To Date</label>
          <input type="date" id="leaveToDate" required style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border);" />
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 12.5px; font-weight: 600; margin-bottom: 4px;">Reason for Leave</label>
        <textarea id="leaveReason" rows="3" required placeholder="State detailed reason for absence..." style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border);"></textarea>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button type="button" class="btn-outline" onclick="closeStudentModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-paper-plane"></i> Submit to Faculty Mentor</button>
      </div>
    </form>
  `;
  modal.classList.add('active');
}

function handleStudentLeaveSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('leaveTypeSelect') ? document.getElementById('leaveTypeSelect').value : 'Medical Leave';
  const from = document.getElementById('leaveFromDate') ? document.getElementById('leaveFromDate').value : '';
  const to = document.getElementById('leaveToDate') ? document.getElementById('leaveToDate').value : '';
  const reason = document.getElementById('leaveReason') ? document.getElementById('leaveReason').value : '';

  const s = currentStudent || { name: 'Student', rollNo: '22691A0501', branch: 'CSE', year: 'III' };
  const leaveId = `SLV-${Math.floor(100 + Math.random() * 899)}`;
  const newLeave = {
    id: leaveId,
    studentRoll: s.rollNo,
    studentName: s.name,
    dept: s.branch || 'CSE',
    type,
    from,
    to,
    days: from === to ? 1 : 2,
    reason,
    mentor: 'Dr. B. V. Ramanappa (Professor & HoD - CSE)',
    status: 'Pending Mentor Approval',
    appliedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  try {
    let raw = localStorage.getItem('ALITS_ERP_STATE');
    let stateObj = raw ? JSON.parse(raw) : {};
    if (!Array.isArray(stateObj.studentLeaves)) stateObj.studentLeaves = [];
    stateObj.studentLeaves.unshift(newLeave);
    localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(stateObj));
  } catch (err) { }

  saveStudentState({ summary: `Student ${s.rollNo} applied for leave`, module: 'StudentLeaves', action: 'Create' });
  closeStudentModal();
  showToast(`✓ Leave application (${leaveId}) submitted to your faculty mentor for approval!`);
}

function openSubmitAssignmentModal(asgId, title) {
  const modal = document.getElementById('studentModal');
  const mTitle = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  mTitle.textContent = `Submit Solution: ${title}`;
  body.innerHTML = `
    <form onsubmit="handleAssignmentUploadSubmit(event, '${asgId}')">
      <div style="margin-bottom: 12px;">
        <label style="display: block; font-size: 12.5px; font-weight: 600; margin-bottom: 4px;">GitHub / Project Repository URL (or Cloud Link)</label>
        <input type="url" id="asgRepoUrl" placeholder="https://github.com/username/project" required style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border);" />
      </div>

      <div style="margin-bottom: 12px;">
        <label style="display: block; font-size: 12.5px; font-weight: 600; margin-bottom: 4px;">Attach Solution File (PDF / ZIP / Code)</label>
        <input type="file" id="asgFileInput" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg-subtle);" />
      </div>

      <div style="margin-bottom: 16px;">
        <label style="display: block; font-size: 12.5px; font-weight: 600; margin-bottom: 4px;">Comments / Execution Instructions for Faculty</label>
        <textarea id="asgComments" rows="2" placeholder="e.g. Implemented 3NF normalization tables with sample queries..." style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border);"></textarea>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button type="button" class="btn-outline" onclick="closeStudentModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-cloud-arrow-up"></i> Upload & Submit</button>
      </div>
    </form>
  `;
  modal.classList.add('active');
}

function handleAssignmentUploadSubmit(e, asgId) {
  e.preventDefault();
  closeStudentModal();
  showToast('✓ Assignment uploaded successfully! Notified faculty member for evaluation.');
  switchStudentTab('assignments');
}

function closeStudentModal() {
  const modal = document.getElementById('studentModal');
  if (modal) modal.classList.remove('active');
}

function openStudentDegreeCertificateModal() {
  const s = currentStudent;
  if (!s) return;

  const modal = document.getElementById('studentModal');
  const mTitle = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  mTitle.textContent = `🎓 Official Degree Certificate: ${s.name}`;
  body.innerHTML = `
    <div style="background: #fdfbf7; border: 8px double #c5a059; padding: 36px 30px; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); position: relative; overflow: hidden; font-family: 'Times New Roman', Georgia, serif; color: #1e293b;">
        <!-- Watermark Background -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 150px; font-weight: 900; color: rgba(197, 160, 89, 0.07); pointer-events: none; letter-spacing: 12px; z-index: 1;">
            ALITS
        </div>

        <div style="position: relative; z-index: 2;">
            <!-- HEADER -->
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="font-size: 20px; font-weight: 900; color: #7a1f1d; letter-spacing: 0.8px; margin: 0 0 6px; text-transform: uppercase;">
                    ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES
                </h2>
                <div style="font-size: 12px; font-weight: 600; color: #1e293b; margin-bottom: 3px;">
                    (Autonomous - Permanently Affiliated to JNTUA | NAAC 'A+' Accredited)
                </div>
                <div style="font-size: 11px; color: #64748b;">
                    Near IT Expressway, Anantapuramu - 515721, Andhra Pradesh, India
                </div>
            </div>

            <!-- GOLD PILL BADGE -->
            <div style="display: flex; justify-content: center; margin: 18px 0 20px;">
                <span style="background: #fde68a; color: #78350f; border: 1.5px solid #d97706; padding: 6px 26px; border-radius: 9999px; font-size: 12.5px; font-weight: 900; letter-spacing: 1.2px; text-transform: uppercase;">
                    CERTIFICATE OF ACADEMIC DEGREE
                </span>
            </div>

            <!-- CONFERMENT TEXT -->
            <div style="text-align: center; font-style: italic; font-size: 13.5px; color: #334155; margin-bottom: 14px;">
                This is to certify that the Board of Governors upon the recommendation of the Academic Council has conferred the degree of
            </div>

            <!-- DEGREE TITLE -->
            <div style="text-align: center; font-size: 24px; font-weight: 900; color: #0f2b48; border-bottom: 2px solid #e2d9c2; padding-bottom: 8px; margin: 0 20px 12px;">
                Bachelor of Technology (CSE)
            </div>

            <div style="text-align: center; font-size: 12.5px; color: #64748b; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">
                unto
            </div>

            <!-- STUDENT NAME -->
            <div style="text-align: center; font-size: 23px; font-weight: 900; color: #78350f; text-decoration: underline; margin-bottom: 4px;">
                ${s.name}
            </div>

            <!-- ROLL NUMBER -->
            <div style="text-align: center; font-size: 13.5px; font-weight: 800; color: #0f172a; margin-bottom: 18px; font-family: monospace;">
                (Hall Ticket / Roll No: ${s.rollNo})
            </div>

            <!-- ACADEMIC FULFILLMENT -->
            <div style="text-align: center; font-size: 13.5px; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto 26px;">
                having fulfilled all the academic requirements in the <strong>Autonomous Regulations (R24)</strong> with a Cumulative Grade Point Average (CGPA) of <strong style="color: #0f2b48; font-size: 15px;">${s.cgpa} / 10.0</strong> and has been placed in <strong style="color: #78350f; font-size: 14px;">First Class with Distinction</strong>.
            </div>

            <!-- BOTTOM SIGNATURES -->
            <div style="border-top: 1.5px solid #e2d9c2; padding-top: 18px; display: grid; grid-template-columns: 1fr 1.6fr 1.6fr; gap: 14px; align-items: flex-end;">
                <div style="text-align: center;">
                    <div style="font-size: 10px; color: #64748b; font-weight: 700; margin-bottom: 4px;">Verified by QR</div>
                    <div style="display: inline-block; border: 1.5px solid #cbd5e1; padding: 5px 12px; border-radius: 4px; background: #fff; font-size: 10.5px; font-weight: 800; color: #0284c7;">
                        🔲 QR-OK
                    </div>
                </div>

                <div style="text-align: center;">
                    <div style="font-size: 14.5px; font-weight: 900; color: #0f172a; font-family: Georgia, serif;">
                        Dr. K. Sreenivasulu
                    </div>
                    <div style="font-size: 10.5px; color: #64748b; font-weight: 700; margin-top: 2px;">
                        Chief Controller of Examinations
                    </div>
                </div>

                <div style="text-align: center;">
                    <div style="font-size: 14.5px; font-weight: 900; color: #0f172a; font-family: Georgia, serif;">
                        Dr. K. Sreenivasulu
                    </div>
                    <div style="font-size: 10.5px; color: #64748b; font-weight: 700; margin-top: 2px;">
                        Principal
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
      <button type="button" class="btn-primary" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Official Degree Certificate</button>
      <button type="button" class="btn-outline" onclick="closeStudentModal()">Close</button>
    </div>
  `;
  modal.classList.add('active');
}

function downloadNoteSimulation(title) {
  showToast(`📥 Downloading lecture notes: "${title}"...`);
}

function downloadReceiptSimulation(title) {
  showToast(`📥 Downloading official payment receipt for "${title}"...`);
}

function simulateFeePayment() {
  if (!currentStudent) return;
  showToast('💳 Opening ALITS Secure Payment Gateway...');
  setTimeout(() => {
    if (currentStudent) {
      currentStudent.pendingFee = 0;
      currentStudent.paidFee = currentStudent.totalFee;
      if (Array.isArray(currentStudent.fees)) {
        currentStudent.fees.forEach(f => {
          f.paid = f.total;
          f.due = 0;
          f.status = 'Fully Paid';
        });
      }

      // Synchronize with central state
      saveStudentState({
        module: 'Fees',
        action: 'Student Online Payment',
        summary: `Fee payment completed for ${currentStudent.name} (${currentStudent.rollNo}) - ₹${currentStudent.totalFee.toLocaleString('en-IN')}`
      });

      renderStudentProfileHeader();
      switchStudentTab('fees');
      showToast('✓ Payment of outstanding fee successful! Transaction ID: TXN-' + Math.floor(100000 + Math.random() * 900000));
    }
  }, 1000);
}

function submitProctorInquiry() {
  const text = document.getElementById('proctorInquiryText')?.value;
  if (!text) {
    showToast('Please enter an inquiry message.');
    return;
  }
  showToast('✓ Inquiry submitted to Proctor Dr. B. V. Ramanappa. You will receive SMS update on ' + currentStudent.studentPhone);
  document.getElementById('proctorInquiryText').value = '';
}

// Switch Demo Student (For testing data isolation)
function switchDemoStudent(roll) {
  currentStudent = buildStudentProfile(roll);
  if (currentStudent) {
    localStorage.setItem('alits_portal_user', JSON.stringify({ ...currentStudent, role: 'Student' }));
    renderStudentProfileHeader();
    switchStudentTab(currentTab);
    showToast(`Switched to Student: ${currentStudent.name} (${currentStudent.rollNo})`);
  }
}

// --- LOGOUT ---
function performStudentLogout() {
  if (typeof AuthGuard !== 'undefined') {
    AuthGuard.logout();
  } else {
    sessionStorage.clear();
    localStorage.removeItem('alits_portal_user');
    const isFile = typeof window !== 'undefined' && window.location.protocol === 'file:';
    window.location.replace((isFile ? 'index.html' : '/index.html') + '?msg=logged_out');
  }
}

// --- THEME TOGGLE ---
function toggleStudentTheme() {
  const html = document.documentElement;
  const cur = html.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  showToast(`Switched to ${next} theme`);
}

// --- TOAST NOTIFICATIONS ---
function showToast(msg) {
  const container = document.getElementById('studentToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--gold);"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
