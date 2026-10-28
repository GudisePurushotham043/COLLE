/* ==========================================================================
   ALITS FACULTY PORTAL - APPLICATION LOGIC
   Dedicated, Autonomous Faculty Directorate System
   ========================================================================== */

// --- FACULTY REPOSITORY ---
const FACULTY_DATABASE = {
  'AL00456': {
    id: 'AL00456',
    name: 'MS. A. Manjula, M.Tech, (Ph.D.)',
    shortName: 'MS. A. Manjula',
    designation: 'Assistant Professor & Class Mentor / In-Charge (III Year CSE-D)',
    dept: 'Computer Science & Engineering',
    deptCode: 'CSE',
    experience: '8.5 Years',
    specialization: 'Database Systems, Full-Stack Web Development, Data Mining',
    email: 'manjula.cse@alits.ac.in',
    phone: '+91 98480 11223',
    room: 'Faculty Cabin 14, Block-A',
    avatar: 'MJ',
    activeClasses: 4,
    totalStudents: 186,
    classesToday: 3,
    leaveBalance: { cl: 8, ml: 10, od: 6, el: 12 },
    assignedSubjects: [
      { code: '24A502', name: 'Database Management Systems', class: 'III B.Tech I Sem (CSE-D)', studentsCount: 64, room: 'LH-304' },
      { code: '24A504', name: 'Web Application Development with Full-Stack', class: 'III B.Tech I Sem (CSE-D)', studentsCount: 64, room: 'LH-304' },
      { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', class: 'III B.Tech I Sem (CSE-D Batch 1 & 2)', studentsCount: 64, room: 'Lab-2' },
      { code: '24A507L', name: 'Full-Stack Web Technologies Lab', class: 'III B.Tech I Sem (CSE-D Batch 1 & 2)', studentsCount: 64, room: 'Lab-3' }
    ]
  },
  'AL00457': {
    id: 'AL00457',
    name: 'Dr. K. Bhargavi, Ph.D., M.Tech',
    shortName: 'Dr. K. Bhargavi',
    designation: 'Professor & Head of Department (HOD - CSE)',
    dept: 'Computer Science & Engineering',
    deptCode: 'CSE',
    experience: '22 Years',
    specialization: 'Cloud Computing, Big Data Analytics, Distributed Systems',
    email: 'hod.cse@alits.ac.in',
    phone: '+91 98491 22001',
    room: 'HoD Chamber, Block-A Room 201',
    avatar: 'KB',
    activeClasses: 2,
    totalStudents: 128,
    classesToday: 2,
    leaveBalance: { cl: 11, ml: 12, od: 8, el: 15 },
    assignedSubjects: [
      { code: '24A501', name: 'Design and Analysis of Algorithms', class: 'III B.Tech I Sem (CSE-D)', studentsCount: 64, room: 'LH-304' },
      { code: '24A701', name: 'Advanced Cryptography & Cloud Security', class: 'IV B.Tech I Sem (CSE-A)', studentsCount: 64, room: 'LH-402' }
    ]
  },
  'AL00458': {
    id: 'AL00458',
    name: 'Sri K. Ramesh, M.Tech',
    shortName: 'Sri K. Ramesh',
    designation: 'Associate Professor',
    dept: 'Computer Science & Engineering',
    deptCode: 'CSE',
    experience: '12 Years',
    specialization: 'Artificial Intelligence, Soft Computing, Machine Learning',
    email: 'ramesh.naidu.alits@gmail.com',
    phone: '+91 94402 33445',
    room: 'Faculty Cabin 08, Block-A',
    avatar: 'KR',
    activeClasses: 3,
    totalStudents: 180,
    classesToday: 2,
    leaveBalance: { cl: 6, ml: 8, od: 4, el: 10 },
    assignedSubjects: [
      { code: '24A503', name: 'Artificial Intelligence & Machine Learning', class: 'III B.Tech I Sem (CSE-D)', studentsCount: 64, room: 'LH-304' }
    ]
  },
  'AL00459': {
    id: 'AL00459',
    name: 'Mrs. G. Roja Ramani, M.Tech',
    shortName: 'Mrs. G. Roja Ramani',
    designation: 'Associate Professor',
    dept: 'Computer Science & Engineering',
    deptCode: 'CSE',
    experience: '11 Years',
    specialization: 'Software Engineering, Agile Methodologies, Testing',
    email: 'rojaramani.cse@alits.ac.in',
    phone: '+91 94403 44556',
    room: 'Faculty Cabin 11, Block-A',
    avatar: 'RR',
    activeClasses: 3,
    totalStudents: 160,
    classesToday: 2,
    leaveBalance: { cl: 7, ml: 9, od: 5, el: 11 },
    assignedSubjects: [
      { code: '24A505', name: 'Software Engineering & Agile Methodologies', class: 'III B.Tech I Sem (CSE-D)', studentsCount: 64, room: 'LH-304' }
    ]
  }
};

// Centralized ERP State & Shared Data Source
let facultyState = { students: [], faculty: [], assignments: [], notices: [], submittedAssignments: [] };
try {
  const rawERP = localStorage.getItem('ALITS_ERP_STATE');
  if (rawERP) {
    const parsed = JSON.parse(rawERP);
    if (parsed && typeof parsed === 'object') facultyState = parsed;
  }
} catch (e) {
  console.warn('[FacultyPortal] Error loading local ERP state:', e);
}

if ((!facultyState.students || facultyState.students.length === 0) && typeof ALITS_DATA !== 'undefined' && Array.isArray(ALITS_DATA.students)) {
  facultyState = { ...ALITS_DATA, ...facultyState, students: ALITS_DATA.students };
}

function getCentralStudents() {
  if (facultyState && Array.isArray(facultyState.students) && facultyState.students.length > 0) {
    return facultyState.students;
  }
  try {
    const raw = localStorage.getItem('ALITS_ERP_STATE');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.students) && parsed.students.length > 0) {
        facultyState = parsed;
        return parsed.students;
      }
    }
  } catch (e) { }
  if (typeof ALITS_DATA !== 'undefined' && Array.isArray(ALITS_DATA.students) && ALITS_DATA.students.length > 0) {
    if (!facultyState.students || facultyState.students.length === 0) {
      facultyState.students = ALITS_DATA.students;
    }
    return ALITS_DATA.students;
  }
  return [];
}

function saveFacultyState(meta = {}) {
  try {
    localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(facultyState));
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }

  let actorName = 'faculty_user';
  if (currentFaculty && currentFaculty.name) {
    actorName = `faculty_${currentFaculty.id || 'staff'}_${currentFaculty.shortName || currentFaculty.name}`;
  }

  if (window.BackendSync && typeof window.BackendSync.pushState === 'function') {
    window.BackendSync.pushState(facultyState, {
      updatedBy: actorName,
      summary: meta.summary || 'Faculty Portal Data Updated',
      module: meta.module || 'Faculty',
      action: meta.action || 'Save'
    });
  }

  window.dispatchEvent(new CustomEvent('alits_data_sync', {
    detail: {
      module: meta.module || 'Faculty',
      summary: meta.summary || '',
      timestamp: Date.now()
    }
  }));
}

// Global SSE & Version Update Listener for Real-Time Synchronization
window.onBackendStateUpdated = function (newState, meta = {}) {
  if (!newState || typeof newState !== 'object') return;

  facultyState = newState;
  try {
    localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(facultyState));
  } catch (e) { }

  // Recalculate faculty KPI counts
  renderFacultyHeader();
  updateFacultyApprovalsBadge();

  // Dynamically refresh active tab view without whole page reload
  if (currentFacultyTab === 'students') {
    renderStudentsListTable();
  } else if (currentFacultyTab === 'attendance') {
    handleAcademicFilterChange();
  } else if (currentFacultyTab === 'assignments') {
    const mainContainer = document.getElementById('facultyTabContent');
    if (mainContainer && typeof renderAssignmentsManagerView === 'function') {
      mainContainer.innerHTML = renderAssignmentsManagerView();
    }
  } else if (currentFacultyTab === 'approvals') {
    const mainContainer = document.getElementById('facultyTabContent');
    if (mainContainer && typeof renderApprovalsView === 'function') {
      mainContainer.innerHTML = renderApprovalsView();
    }
  }
};

window.addEventListener('storage', (e) => {
  if (e.key === 'ALITS_ERP_STATE' || e.key === 'alits_faculty_permissions' || e.key === 'alits_faculty_leaves') {
    try {
      const raw = localStorage.getItem('ALITS_ERP_STATE');
      if (raw) facultyState = JSON.parse(raw);
      renderFacultyHeader();
      updateFacultyApprovalsBadge();
      if (currentFacultyTab === 'students') renderStudentsListTable();
      else if (currentFacultyTab === 'attendance') handleAcademicFilterChange();
      else if (currentFacultyTab === 'approvals') {
        const mainContainer = document.getElementById('facultyTabContent');
        if (mainContainer && typeof renderApprovalsView === 'function') mainContainer.innerHTML = renderApprovalsView();
      }
    } catch (err) { }
  }
});

window.addEventListener('alits_data_sync', (e) => {
  try {
    const raw = localStorage.getItem('ALITS_ERP_STATE');
    if (raw) facultyState = JSON.parse(raw);
  } catch (err) { }
  renderFacultyHeader();
  updateFacultyApprovalsBadge();
  if (currentFacultyTab === 'students') renderStudentsListTable();
  else if (currentFacultyTab === 'attendance') handleAcademicFilterChange();
  else if (currentFacultyTab === 'approvals') {
    const mainContainer = document.getElementById('facultyTabContent');
    if (mainContainer && typeof renderApprovalsView === 'function') mainContainer.innerHTML = renderApprovalsView();
  }
});

let currentFaculty = null;
let currentFacultyTab = 'students';
let activeLiveRoster = [];

function getRelevantPendingApprovalsCount() {
  const fId = currentFaculty ? (currentFaculty.id || currentFaculty.employeeId || 'AL00456') : 'AL00456';
  const fDept = currentFaculty ? (currentFaculty.deptCode || (currentFaculty.dept || '').substring(0, 3)).toUpperCase() : 'CSE';

  const perms = getStoredPermissions();
  const leaves = getStoredFacultyLeaves();

  const seenIds = new Set();
  let pendingCount = 0;

  (perms || []).forEach(p => {
    if (p && p.id && !seenIds.has(p.id)) {
      seenIds.add(p.id);
      const isRelevant = !p.facultyId || p.facultyId === fId || (p.dept && p.dept.toUpperCase().includes(fDept));
      if (isRelevant) {
        const st = (p.status || '').toLowerCase();
        if (st.includes('pending') && !st.includes('approved') && !st.includes('rejected')) {
          pendingCount++;
        }
      }
    }
  });

  (leaves || []).forEach(l => {
    if (l && l.id && !seenIds.has(l.id)) {
      seenIds.add(l.id);
      const isRelevant = !l.facultyId || l.facultyId === fId || (l.dept && l.dept.toUpperCase().includes(fDept));
      if (isRelevant) {
        const st = (l.status || '').toLowerCase();
        if (st.includes('pending') && !st.includes('approved') && !st.includes('rejected')) {
          pendingCount++;
        }
      }
    }
  });

  const studentLeaves = (facultyState && Array.isArray(facultyState.studentLeaves)) ? facultyState.studentLeaves : [];
  (studentLeaves || []).forEach(sl => {
    if (sl && sl.id && !seenIds.has(sl.id)) {
      seenIds.add(sl.id);
      const isRelevant = !sl.dept || sl.dept.toUpperCase().includes(fDept);
      if (isRelevant) {
        const st = (sl.status || '').toLowerCase();
        if (st.includes('pending') && !st.includes('approved') && !st.includes('rejected')) {
          pendingCount++;
        }
      }
    }
  });

  return pendingCount;
}

function updateFacultyApprovalsBadge() {
  const badge = document.getElementById('navApprovalsCountBadge');
  const count = getRelevantPendingApprovalsCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = 'inline-block';
    if (count > 0) {
      badge.style.background = 'rgba(239, 68, 68, 0.25)';
      badge.style.color = '#EF4444';
      badge.style.border = '1px solid #EF4444';
    } else {
      badge.style.background = 'rgba(212, 175, 55, 0.2)';
      badge.style.color = '#D4AF37';
      badge.style.border = '1px solid #D4AF37';
    }
  }

  const pendingCardVal = document.getElementById('approvalsPendingCardVal');
  if (pendingCardVal) pendingCardVal.textContent = count;
  const headerBadge = document.getElementById('approvalsHeaderBadge');
  if (headerBadge) {
    headerBadge.innerHTML = count > 0 
      ? `<i class="fa-solid fa-hourglass-half fa-spin"></i> ${count} Request(s) Awaiting Clearance`
      : `<i class="fa-solid fa-circle-check"></i> All Sanction Orders Cleared`;
  }
}

async function initFacultyAuth() {
  let session = typeof AuthGuard !== 'undefined' ? AuthGuard.getSession() : null;
  if (!session) {
    session = {
      userId: 'AL00456',
      userName: 'MS. A. Manjula, M.Tech, (Ph.D.)',
      role: 'Faculty',
      portal: 'faculty',
      employeeId: 'AL00456',
      email: 'manjula.cse@alits.ac.in',
      dept: 'Computer Science & Engineering',
      loginTime: new Date().toISOString(),
      sessionToken: 'ALITS-FACULTY-ACTIVE-SESSION'
    };
    if (typeof AuthGuard !== 'undefined' && typeof AuthGuard.login === 'function') {
      AuthGuard.login(session);
    }
  }

  // Ensure latest authoritative state from backend API if local state is unpopulated
  if (!facultyState || !Array.isArray(facultyState.students) || facultyState.students.length === 0) {
    try {
      const apiBase = (window.location.protocol === 'http:' || window.location.protocol === 'https:') && window.location.port === '5000' ? '/api' : 'http://localhost:5000/api';
      const res = await fetch(`${apiBase}/state`, { cache: 'no-store' });
      if (res.ok) {
        const payload = await res.json();
        if (payload && payload.state) {
          facultyState = payload.state;
          try {
            localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(facultyState));
          } catch (e) { }
        }
      }
    } catch (e) {
      console.warn('[FacultyPortal] API fetch state fallback:', e);
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab') || urlParams.get('view');

  const activeFacultyId = session.employeeId || session.userId || 'AL00456';

  if (FACULTY_DATABASE[activeFacultyId]) {
    currentFaculty = FACULTY_DATABASE[activeFacultyId];
  } else {
    const dynamicFaculty = (facultyState.faculty && Array.isArray(facultyState.faculty))
      ? facultyState.faculty.find(f => 
          (f.id && f.id.toUpperCase() === activeFacultyId.toUpperCase()) || 
          (f.employee_id && f.employee_id.toUpperCase() === activeFacultyId.toUpperCase()) ||
          (f.username && f.username.toUpperCase() === activeFacultyId.toUpperCase()) ||
          (f.email && f.email.toLowerCase() === (session.email || '').toLowerCase()) ||
          (session.userName && f.name && f.name.toLowerCase().includes(session.userName.toLowerCase()))
        )
      : null;

    if (dynamicFaculty) {
      currentFaculty = {
        id: dynamicFaculty.id || activeFacultyId,
        name: dynamicFaculty.name || session.userName || 'MS. A. Manjula, M.Tech, (Ph.D.)',
        shortName: dynamicFaculty.shortName || dynamicFaculty.name || 'MS. A. Manjula',
        designation: dynamicFaculty.designation || 'Assistant Professor & Class Mentor / In-Charge (III Year CSE-D)',
        dept: dynamicFaculty.deptName || dynamicFaculty.dept || 'Computer Science & Engineering',
        deptCode: dynamicFaculty.dept || 'CSE',
        experience: dynamicFaculty.experience || '8.5 Years',
        specialization: dynamicFaculty.specialization || 'Database Systems, Full-Stack Web Development, Data Mining',
        email: dynamicFaculty.email || session.email || 'manjula.cse@alits.ac.in',
        phone: dynamicFaculty.mobile || dynamicFaculty.phone || '+91 98480 11223',
        room: dynamicFaculty.cabin || dynamicFaculty.room || 'Faculty Cabin 14, Block-A',
        avatar: (dynamicFaculty.name || session.userName || 'MJ').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        activeClasses: (dynamicFaculty.assignedSubjects || dynamicFaculty.coursesHandled || []).length || 4,
        totalStudents: dynamicFaculty.totalStudents || 186,
        classesToday: dynamicFaculty.classesToday || 3,
        leaveBalance: dynamicFaculty.leaveBalance || { cl: 8, ml: 10, od: 6, el: 12 },
        assignedSubjects: dynamicFaculty.assignedSubjects || [
          { code: '24A502', name: 'Database Management Systems', class: 'III B.Tech I Sem (CSE-D)', studentsCount: 64, room: 'LH-304' },
          { code: '24A504', name: 'Web Application Development with Full-Stack', class: 'III B.Tech I Sem (CSE-D)', studentsCount: 64, room: 'LH-304' },
          { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', class: 'III B.Tech I Sem (CSE-D Batch 1 & 2)', studentsCount: 64, room: 'Lab-2' },
          { code: '24A507L', name: 'Full-Stack Web Technologies Lab', class: 'III B.Tech I Sem (CSE-D Batch 1 & 2)', studentsCount: 64, room: 'Lab-3' }
        ]
      };
    } else {
      currentFaculty = Object.values(FACULTY_DATABASE).find(f => f.email && f.email.toLowerCase() === (session.email || '').toLowerCase()) || FACULTY_DATABASE['AL00456'];
    }
  }

  localStorage.setItem('alits_portal_user', JSON.stringify({ ...currentFaculty, role: 'Faculty' }));

  renderFacultyHeader();
  updateFacultyApprovalsBadge();

  const targetTab = tabParam || 'students';
  switchFacultyTab(targetTab);
}

function renderFacultyHeader() {
  if (!currentFaculty) return;

  const allStudents = getCentralStudents();
  const fDept = (currentFaculty.deptCode || currentFaculty.dept || 'CSE').toUpperCase();
  const deptStudents = allStudents.filter(s => {
    const sDept = (s.dept || s.branch || '').toUpperCase();
    return sDept.includes(fDept) || (fDept === 'CSE' && (s.rollNo || '').includes('1A05'));
  });

  const activeCount = deptStudents.length > 0 ? deptStudents.length : allStudents.length;

  const nameEl = document.getElementById('hdrFacultyName');
  const idEl = document.getElementById('hdrFacultyId');
  const desigEl = document.getElementById('hdrFacultyDesig');
  const deptEl = document.getElementById('hdrFacultyDept');
  const avatarEl = document.getElementById('hdrFacultyAvatar');
  const classesKpi = document.getElementById('kpiClassesVal');
  const stdsKpi = document.getElementById('kpiStudentsVal');
  const clKpi = document.getElementById('kpiClVal');

  if (nameEl) nameEl.textContent = currentFaculty.name;
  if (idEl) idEl.textContent = currentFaculty.id;
  if (desigEl) desigEl.textContent = currentFaculty.designation;
  if (deptEl) deptEl.textContent = currentFaculty.dept;
  if (avatarEl) avatarEl.textContent = currentFaculty.avatar || 'FC';
  if (classesKpi) classesKpi.textContent = `${currentFaculty.assignedSubjects ? currentFaculty.assignedSubjects.length : 4} Courses`;
  if (stdsKpi) stdsKpi.textContent = `${activeCount} Active`;
  if (clKpi) clKpi.textContent = `${currentFaculty.leaveBalance?.cl || 8} Days`;

  updateFacultyApprovalsBadge();
}

// --- TAB SWITCHER ---
function switchFacultyTab(tabName) {
  currentFacultyTab = tabName;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });

  const mainContainer = document.getElementById('facultyTabContent');
  if (!mainContainer) return;

  switch (tabName) {
    case 'students':
      mainContainer.innerHTML = renderStudentsListView();
      renderStudentsListTable();
      break;
    case 'attendance':
      mainContainer.innerHTML = renderLiveAttendanceView();
      handleAcademicFilterChange();
      break;
    case 'approvals':
      mainContainer.innerHTML = renderApprovalsView();
      break;
    case 'leaves':
      mainContainer.innerHTML = renderLeavePermissionView();
      break;
    case 'assignments':
      mainContainer.innerHTML = renderAssignmentsManagerView();
      break;
    case 'notes':
      mainContainer.innerHTML = renderSubjectNotesManagerView();
      break;
    case 'timetable':
      mainContainer.innerHTML = renderFacultyTimetableView();
      break;
    case 'profile':
      mainContainer.innerHTML = renderFacultyProfileView();
      break;
    default:
      mainContainer.innerHTML = renderStudentsListView();
      renderStudentsListTable();
  }

  updateFacultyApprovalsBadge();
}

// ==========================================================================
// 1. CENTRAL STUDENT FILTERING & MAPPING
// ==========================================================================

function getYearPrefix(str) {
  if (!str) return '24';
  if (str.includes('IV') || str.includes('4th') || str.includes('4')) return '23';
  if (str.includes('III') || str.includes('3rd') || str.includes('3')) return '24';
  if (str.includes('II') || str.includes('2nd') || str.includes('2')) return '25';
  if (str.includes('I') || str.includes('1st') || str.includes('1')) return '26';
  return '24';
}

function filterRealStudents(selectedDept, selectedSection, selectedYear, selectedProgram) {
  if (!selectedSection || selectedSection === '' || selectedSection === 'NONE') {
    return [];
  }

  const allStudents = getCentralStudents();
  if (!allStudents || allStudents.length === 0) return [];

  const deptNorm = (selectedDept || 'CSE').trim().toUpperCase();
  const secNorm = selectedSection.replace(/section[- ]?/i, '').trim().toUpperCase();
  const yearNorm = (selectedYear || '3rd Year').trim().toUpperCase();

  const exactMatch = allStudents.filter(s => {
    const sRoll = (s.rollNo || s.roll || '').trim().toUpperCase();
    if (!sRoll) return false;

    const sDept = (s.dept || s.branch || '').trim().toUpperCase();
    let deptMatches = (deptNorm === 'ALL') || (sDept === deptNorm);
    if (!deptMatches) {
      if (deptNorm === 'CSE' && (sDept.includes('CSE') || sRoll.includes('1A05'))) deptMatches = true;
      else if (deptNorm === 'ECE' && (sDept.includes('ECE') || sRoll.includes('1A04'))) deptMatches = true;
      else if (deptNorm === 'EEE' && (sDept.includes('EEE') || sRoll.includes('1A02'))) deptMatches = true;
      else if (deptNorm === 'CIVIL' && (sDept.includes('CIVIL') || sRoll.includes('1A01'))) deptMatches = true;
      else if (deptNorm === 'MECH' && (sDept.includes('MECH') || sRoll.includes('1A03'))) deptMatches = true;
      else if (deptNorm === 'AIML' && (sDept.includes('AIML') || sRoll.includes('1A33'))) deptMatches = true;
    }

    const sSec = (s.section || s.sec || '').replace(/section[- ]?/i, '').trim().toUpperCase();
    const secMatches = (secNorm === 'ALL') || (sSec === secNorm);

    const sYear = (s.year || '').toUpperCase();
    let yearMatches = (yearNorm === 'ALL');
    if (!yearMatches) {
      if (yearNorm.includes('1') || yearNorm.includes('I')) yearMatches = sYear.includes('1') || sYear.includes('I') || sRoll.startsWith('26');
      else if (yearNorm.includes('2') || yearNorm.includes('II')) yearMatches = sYear.includes('2') || sYear.includes('II') || sRoll.startsWith('25');
      else if (yearNorm.includes('3') || yearNorm.includes('III')) yearMatches = sYear.includes('3') || sYear.includes('III') || sRoll.startsWith('24');
      else if (yearNorm.includes('4') || yearNorm.includes('IV')) yearMatches = sYear.includes('4') || sYear.includes('IV') || sRoll.startsWith('23');
    }

    return deptMatches && secMatches && yearMatches;
  });

  // Deduplicate strictly by unique roll number
  const uniqueMap = new Map();
  for (const s of exactMatch) {
    const r = (s.rollNo || s.roll || '').trim().toUpperCase();
    if (r && !uniqueMap.has(r)) {
      uniqueMap.set(r, {
        ...s,
        roll: r,
        rollNo: r,
        status: s.status || ((s.attendancePct || 90) >= 75 ? 'Present' : 'Absent')
      });
    }
  }

  // Return strictly matching section students (empty if none exist in that section)
  return Array.from(uniqueMap.values());
}

// ==========================================================================
// 2. DEDICATED STUDENTS LIST MODULE (ROLE-PERMITTED FACULTY VIEW)
// ==========================================================================

function renderStudentsListView() {
  const fDept = currentFaculty ? (currentFaculty.deptCode || 'CSE') : 'CSE';

  return `
    <!-- Top Filter Bar -->
    <div class="acad-selector-card">
      <div class="acad-selector-header" style="justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="acad-selector-title">
            <i class="fa-solid fa-user-graduate" style="color: #2563eb;"></i> Central Students Directorate Roster
          </div>
          <span class="badge" style="background: rgba(37,99,235,0.15); color: #2563eb; border: 1px solid rgba(37,99,235,0.3); font-size: 11px; padding: 2px 8px; border-radius: 9999px;">
            Single Database Source
          </span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-primary" onclick="openAddFacultyStudentModal()" style="background: var(--gold-dark);">
            <i class="fa-solid fa-user-plus"></i> + Enroll New Student
          </button>
        </div>
      </div>

      <div class="acad-selector-body">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 12px;">
          <div>
            <label class="form-label">Search Student / Roll No</label>
            <input type="text" class="acad-input-box" id="stuListSearchInput" placeholder="Type name or roll..." oninput="renderStudentsListTable()" />
          </div>
          <div>
            <label class="form-label">Department / Branch</label>
            <select class="acad-input-box" id="stuListDeptSelect" onchange="renderStudentsListTable()">
              <option value="ALL">All Departments</option>
              <option value="CSE" selected>CSE – Computer Science</option>
              <option value="AIML">AIML – Artificial Intelligence</option>
              <option value="CSD">CSD – Data Science</option>
              <option value="ECE">ECE – Electronics & Comm</option>
              <option value="EEE">EEE – Electrical & Electronics</option>
              <option value="CIVIL">CIVIL – Civil Engineering</option>
              <option value="MECH">MECH – Mechanical Engg</option>
            </select>
          </div>
          <div>
            <label class="form-label">Year of Study</label>
            <select class="acad-input-box" id="stuListYearSelect" onchange="renderStudentsListTable()">
              <option value="ALL">All Years</option>
              <option value="1st Year">1st Year (I B.Tech)</option>
              <option value="2nd Year">2nd Year (II B.Tech)</option>
              <option value="3rd Year" selected>3rd Year (III B.Tech)</option>
              <option value="4th Year">4th Year (IV B.Tech)</option>
            </select>
          </div>
          <div>
            <label class="form-label">Section</label>
            <select class="acad-input-box" id="stuListSecSelect" onchange="renderStudentsListTable()">
              <option value="ALL" selected>All Sections (A-F)</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
              <option value="E">Section E</option>
              <option value="F">Section F</option>
            </select>
          </div>
          <div>
            <label class="form-label">Quota</label>
            <select class="acad-input-box" id="stuListQuotaSelect" onchange="renderStudentsListTable()">
              <option value="ALL" selected>All Quotas</option>
              <option value="CONVENOR">Convenor Quota</option>
              <option value="MANAGEMENT">Management Quota</option>
            </select>
          </div>
          <div>
            <label class="form-label">Residency</label>
            <select class="acad-input-box" id="stuListResSelect" onchange="renderStudentsListTable()">
              <option value="ALL" selected>All Residences</option>
              <option value="Day Scholar">Day Scholar</option>
              <option value="Hosteler">Hosteler</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid-4" style="margin-bottom: 20px;">
      <div class="metric-widget">
        <div class="metric-icon-box"><i class="fa-solid fa-users"></i></div>
        <div>
          <div class="metric-title">Enrolled Students</div>
          <div class="metric-value" id="stuKpiTotal">0</div>
          <div class="metric-sub">Matching Filters</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--success); background: var(--success-bg);"><i class="fa-solid fa-user-check"></i></div>
        <div>
          <div class="metric-title">Good Attendance (≥75%)</div>
          <div class="metric-value" style="color: var(--success);" id="stuKpiGoodAtt">0</div>
          <div class="metric-sub">Exam Eligible</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--danger); background: var(--danger-bg);"><i class="fa-solid fa-triangle-exclamation"></i></div>
        <div>
          <div class="metric-title">Attendance Shortage (&lt;75%)</div>
          <div class="metric-value" style="color: var(--danger);" id="stuKpiShortage">0</div>
          <div class="metric-sub">Condonation Alert</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--warning); background: var(--warning-bg);"><i class="fa-solid fa-building-user"></i></div>
        <div>
          <div class="metric-title">Hostelers / Boarders</div>
          <div class="metric-value" style="color: var(--warning);" id="stuKpiHostel">0</div>
          <div class="metric-sub">Campus Residential</div>
        </div>
      </div>
    </div>

    <!-- Authoritative Students Table -->
    <div class="portal-card">
      <div class="card-header" style="justify-content: space-between;">
        <span class="card-title">
          <i class="fa-solid fa-address-book" style="color: var(--primary);"></i> Enrolled Students Directory
        </span>
        <span style="font-size: 12px; color: var(--text-muted);" id="stuListCountNotice">Loading live records...</span>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th style="width: 60px; text-align: center;">S.No</th>
                <th>Roll Number</th>
                <th>Student Full Name</th>
                <th>Class / Dept / Sec</th>
                <th>Quota</th>
                <th>Residency</th>
                <th style="text-align: center;">Attendance %</th>
                <th style="text-align: center;">Performance</th>
                <th style="text-align: right; width: 220px;">Faculty Actions</th>
              </tr>
            </thead>
            <tbody id="stuListTableBody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderStudentsListTable() {
  const tbody = document.getElementById('stuListTableBody');
  if (!tbody) return;

  const q = (document.getElementById('stuListSearchInput')?.value || '').toLowerCase().trim();
  const deptFilter = document.getElementById('stuListDeptSelect')?.value || 'ALL';
  const yearFilter = document.getElementById('stuListYearSelect')?.value || 'ALL';
  const secFilter = document.getElementById('stuListSecSelect')?.value || 'ALL';
  const quotaFilter = document.getElementById('stuListQuotaSelect')?.value || 'ALL';
  const resFilter = document.getElementById('stuListResSelect')?.value || 'ALL';

  const allCentral = getCentralStudents();

  let filtered = allCentral.filter(s => {
    const sRoll = (s.rollNo || s.roll || '').toUpperCase();
    const sName = (s.name || '').toLowerCase();
    const sFather = (s.fatherName || '').toLowerCase();
    const sMobile = (s.mobile || '').toLowerCase();

    const matchesSearch = !q || sRoll.includes(q.toUpperCase()) || sName.includes(q) || sFather.includes(q) || sMobile.includes(q);

    const sDept = (s.dept || s.branch || '').toUpperCase();
    let matchesDept = (deptFilter === 'ALL') || (sDept === deptFilter.toUpperCase());
    if (!matchesDept) {
      if (deptFilter === 'CSE' && (sDept.includes('CSE') || sRoll.includes('1A05'))) matchesDept = true;
      else if (deptFilter === 'ECE' && (sDept.includes('ECE') || sRoll.includes('1A04'))) matchesDept = true;
      else if (deptFilter === 'EEE' && (sDept.includes('EEE') || sRoll.includes('1A02'))) matchesDept = true;
      else if (deptFilter === 'CIVIL' && (sDept.includes('CIVIL') || sRoll.includes('1A01'))) matchesDept = true;
      else if (deptFilter === 'MECH' && (sDept.includes('MECH') || sRoll.includes('1A03'))) matchesDept = true;
    }

    const sYear = (s.year || '').toUpperCase();
    let matchesYear = (yearFilter === 'ALL');
    if (!matchesYear) {
      if (yearFilter.includes('1')) matchesYear = sYear.includes('1') || sYear.includes('I') || sRoll.startsWith('26');
      else if (yearFilter.includes('2')) matchesYear = sYear.includes('2') || sYear.includes('II') || sRoll.startsWith('25');
      else if (yearFilter.includes('3')) matchesYear = sYear.includes('3') || sYear.includes('III') || sRoll.startsWith('24');
      else if (yearFilter.includes('4')) matchesYear = sYear.includes('4') || sYear.includes('IV') || sRoll.startsWith('23');
    }

    const sSec = (s.section || s.sec || 'A').replace(/section[- ]?/i, '').trim().toUpperCase();
    const matchesSec = (secFilter === 'ALL') || (sSec === secFilter.toUpperCase());

    const sQuota = (s.quota || 'CONVENOR').toUpperCase();
    let matchesQuota = (quotaFilter === 'ALL');
    if (!matchesQuota) {
      if (quotaFilter === 'CONVENOR') matchesQuota = sQuota.includes('CONVENOR');
      else if (quotaFilter === 'MANAGEMENT') matchesQuota = sQuota.includes('MANAGE');
    }

    const sRes = (s.residenceType || 'Day Scholar').toLowerCase();
    const matchesRes = (resFilter === 'ALL') || sRes.includes(resFilter.toLowerCase().trim());

    return matchesSearch && matchesDept && matchesYear && matchesSec && matchesQuota && matchesRes;
  });

  // Deduplicate by unique roll number
  const seen = new Set();
  filtered = filtered.filter(s => {
    const r = (s.rollNo || s.roll || '').trim().toUpperCase();
    if (!r || seen.has(r)) return false;
    seen.add(r);
    s.rollNo = r;
    return true;
  });

  // Update KPI counters
  const totalCount = filtered.length;
  const goodAttCount = filtered.filter(s => (s.attendancePct || 90) >= 75).length;
  const shortageCount = totalCount - goodAttCount;
  const hostelCount = filtered.filter(s => (s.residenceType || '').toLowerCase().includes('hostel')).length;

  const kpiTotal = document.getElementById('stuKpiTotal');
  const kpiGood = document.getElementById('stuKpiGoodAtt');
  const kpiShort = document.getElementById('stuKpiShortage');
  const kpiHostel = document.getElementById('stuKpiHostel');
  const noticeEl = document.getElementById('stuListCountNotice');

  if (kpiTotal) kpiTotal.textContent = totalCount;
  if (kpiGood) kpiGood.textContent = goodAttCount;
  if (kpiShort) kpiShort.textContent = shortageCount;
  if (kpiHostel) kpiHostel.textContent = hostelCount;
  if (noticeEl) noticeEl.textContent = `Showing ${totalCount} authoritative records from central database`;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 45px 20px; color: var(--text-muted);">
          <div style="font-size: 32px; margin-bottom: 12px; opacity: 0.4;"><i class="fa-solid fa-users-slash"></i></div>
          <div style="font-size: 15px; font-weight: 600; color: var(--text-heading); margin-bottom: 4px;">No student records found</div>
          <div style="font-size: 12.5px; opacity: 0.8;">No students match the selected filter criteria. Click <strong>"+ Enroll New Student"</strong> above to add records.</div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map((s, idx) => {
    const roll = s.rollNo || s.roll;
    const total = s.totalClasses || 200;
    const attended = s.attendedClasses || Math.round(((s.attendancePct || 90) * total) / 100);
    const pct = s.attendancePct || parseFloat(((attended / total) * 100).toFixed(1));
    const isEligible = pct >= 75.0;
    const isHosteler = (s.residenceType || '').toLowerCase().includes('hostel');

    const quotaBadge = (s.quota || '').toUpperCase().includes('MANAGE')
      ? `<span class="badge" style="background: rgba(123, 44, 191, 0.15); color: #7b2cbf; border: 1px solid rgba(123, 44, 191, 0.3); font-size: 9.5px; padding: 2px 6px; border-radius: 4px;">Mgmt</span>`
      : `<span class="badge badge-success" style="font-size: 9.5px; padding: 2px 6px;">Convenor</span>`;

    const resBadge = isHosteler
      ? `<span class="badge" style="background: rgba(245, 158, 11, 0.15); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 9.5px; padding: 2px 6px; border-radius: 4px;"><i class="fa-solid fa-hotel"></i> Hostel (${s.roomNo || 'Room'})</span>`
      : `<span class="badge" style="background: rgba(6, 182, 212, 0.15); color: #0891b2; border: 1px solid rgba(6, 182, 212, 0.3); font-size: 9.5px; padding: 2px 6px; border-radius: 4px;"><i class="fa-solid fa-house-user"></i> Day Scholar</span>`;

    const gradeText = s.examMarks?.grade || (pct >= 85 ? 'O (Distinction)' : (pct >= 75 ? 'A+ (Very Good)' : 'B (Average)'));

    return `
      <tr>
        <td style="text-align: center; color: var(--text-muted); font-weight: 600;">${idx + 1}</td>
        <td style="font-weight: 700; color: var(--primary); font-family: 'JetBrains Mono'; white-space: nowrap;">
          <a href="javascript:void(0)" onclick="viewFacultyStudentProfile('${roll}')" style="color: var(--primary); text-decoration: none; font-weight: 800;">
            ${roll}
          </a>
        </td>
        <td>
          <div style="font-weight: 700; color: var(--text-heading); font-size: 13px;">${s.name}</div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 1px;">
            Father: ${s.fatherName || 'N/A'} | 📱 ${s.mobile || 'N/A'}
          </div>
        </td>
        <td style="white-space: nowrap;">
          <span style="font-weight: 700; color: var(--text-heading);">${s.dept || 'CSE'}</span> 
          <span style="color: var(--text-muted); font-size: 12px;">${s.year || '3rd Year'}</span> 
          <span class="badge" style="background: rgba(0,0,0,0.06); font-size: 10px; padding: 1px 4px; border-radius: 3px;">Sec-${s.section || 'A'}</span>
        </td>
        <td>${quotaBadge}</td>
        <td>${resBadge}</td>
        <td style="text-align: center; white-space: nowrap;">
          <div style="font-weight: 800; font-size: 13px; color: ${isEligible ? 'var(--success)' : 'var(--danger)'}; font-family: 'JetBrains Mono';">
            ${pct}%
          </div>
          <div style="font-size: 10px; color: var(--text-muted);">${attended}/${total} hrs</div>
        </td>
        <td style="text-align: center; white-space: nowrap;">
          <span class="badge ${isEligible ? 'badge-success' : 'badge-danger'}" style="font-size: 10px; padding: 2px 6px;">
            ${gradeText}
          </span>
        </td>
        <td style="text-align: right; white-space: nowrap;">
          <div style="display: inline-flex; gap: 4px;">
            <button class="btn-outline" style="padding: 4px 8px; font-size: 11px;" onclick="viewFacultyStudentProfile('${roll}')" title="View Full Academic Dossier">
              <i class="fa-solid fa-id-card"></i> Dossier
            </button>
            <button class="btn-outline" style="padding: 4px 8px; font-size: 11px; color: #2563eb; border-color: rgba(37,99,235,0.4);" onclick="editFacultyStudentAttendance('${roll}')" title="Update Attendance Hours">
              <i class="fa-solid fa-calendar-check"></i> Att %
            </button>
            <button class="btn-outline" style="padding: 4px 8px; font-size: 11px; color: #d97706; border-color: rgba(217,119,6,0.4);" onclick="editFacultyStudentMarks('${roll}')" title="Enter Mid/Internal Marks">
              <i class="fa-solid fa-pen-to-square"></i> Marks
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================================================
// 3. FACULTY ROLE-BASED STUDENT ACTION MODALS
// ==========================================================================

function viewFacultyStudentProfile(rollNo) {
  const allStudents = getCentralStudents();
  const student = allStudents.find(s => (s.rollNo || s.roll || '').toUpperCase() === rollNo.toUpperCase());
  if (!student) {
    showToast('Student record not found in central database', 'Error');
    return;
  }

  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  const total = student.totalClasses || 200;
  const attended = student.attendedClasses || Math.round(((student.attendancePct || 90) * total) / 100);
  const pct = student.attendancePct || parseFloat(((attended / total) * 100).toFixed(1));
  const isHosteler = (student.residenceType || '').toLowerCase().includes('hostel');

  title.textContent = `Student Academic Dossier: ${student.name} (${student.rollNo})`;
  body.innerHTML = `
    <div style="color: var(--text-heading); font-family: inherit;">
      <div style="display: flex; gap: 16px; align-items: center; background: rgba(37,99,235,0.06); border: 1px solid rgba(37,99,235,0.2); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <div style="width: 54px; height: 54px; border-radius: 50%; background: var(--primary); color: white; font-weight: 800; font-size: 20px; display: flex; align-items: center; justify-content: center;">
          ${(student.name || 'ST').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
        </div>
        <div style="flex: 1;">
          <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 2px; color: var(--text-heading);">${student.name}</h3>
          <div style="font-size: 12.5px; color: var(--text-muted);">
            Roll No: <strong style="color: var(--primary); font-family: 'JetBrains Mono';">${student.rollNo}</strong> | 
            Dept: <strong>${student.dept || 'CSE'}</strong> | 
            Class: <strong>${student.year || '3rd Year'} (Section-${student.section || 'A'})</strong>
          </div>
        </div>
      </div>

      <div class="grid-2" style="gap: 12px; margin-bottom: 14px;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px;">
          <h4 style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 800; margin-bottom: 8px;">
            🎓 Academic Information
          </h4>
          <div style="font-size: 12.5px; margin-bottom: 4px;"><strong>Program:</strong> B.Tech (Autonomous R24)</div>
          <div style="font-size: 12.5px; margin-bottom: 4px;"><strong>Admission Quota:</strong> ${student.quota || 'Convenor Quota'}</div>
          <div style="font-size: 12.5px; margin-bottom: 4px;"><strong>Academic Batch:</strong> ${student.batch || '2024-2028'}</div>
          <div style="font-size: 12.5px;"><strong>Class Mentor:</strong> ${currentFaculty ? currentFaculty.name : 'Faculty Directorate'}</div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px;">
          <h4 style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 800; margin-bottom: 8px;">
            📞 Contact & Guardian Details
          </h4>
          <div style="font-size: 12.5px; margin-bottom: 4px;"><strong>Student Mobile:</strong> ${student.mobile || 'N/A'}</div>
          <div style="font-size: 12.5px; margin-bottom: 4px;"><strong>Father / Guardian:</strong> ${student.fatherName || 'N/A'}</div>
          <div style="font-size: 12.5px; margin-bottom: 4px;"><strong>Residency:</strong> ${student.residenceType || 'Day Scholar'} ${isHosteler ? `(Room ${student.roomNo || 'N/A'})` : ''}</div>
          <div style="font-size: 12.5px;"><strong>Address:</strong> ${student.address || 'Ananthapur Local'}</div>
        </div>
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px;">
          <h4 style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 800; margin-bottom: 8px;">
            📊 Live Attendance Statistics
          </h4>
          <div style="font-size: 22px; font-weight: 900; color: ${pct >= 75 ? 'var(--success)' : 'var(--danger)'}; font-family: 'JetBrains Mono'; margin-bottom: 2px;">
            ${pct}%
          </div>
          <div style="font-size: 12px; color: var(--text-muted);">
            Attended: <strong>${attended}</strong> / Total: <strong>${total}</strong> Periods Conducted
          </div>
        </div>

        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px;">
          <h4 style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 800; margin-bottom: 8px;">
            🏆 Continuous Internal Evaluation (CIE)
          </h4>
          <div style="font-size: 12.5px; margin-bottom: 4px;">Mid-I Marks: <strong>${student.examMarks?.mid1 || 26} / 30</strong></div>
          <div style="font-size: 12.5px; margin-bottom: 4px;">Mid-II Marks: <strong>${student.examMarks?.mid2 || 27} / 30</strong></div>
          <div style="font-size: 12.5px;">Overall Grade: <strong style="color: var(--primary);">${student.examMarks?.grade || 'O (Outstanding)'}</strong></div>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 18px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Close</button>
        <button type="button" class="btn-primary" onclick="closeFacultyModal(); editFacultyStudentAttendance('${student.rollNo}')">
          <i class="fa-solid fa-pen"></i> Edit Attendance
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function editFacultyStudentAttendance(rollNo) {
  const allStudents = getCentralStudents();
  const student = allStudents.find(s => (s.rollNo || s.roll || '').toUpperCase() === rollNo.toUpperCase());
  if (!student) return;

  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  const total = student.totalClasses || 200;
  const attended = student.attendedClasses || Math.round(((student.attendancePct || 90) * total) / 100);

  title.textContent = `Update Attendance: ${student.name} (${student.rollNo})`;
  body.innerHTML = `
    <form onsubmit="handleSaveFacultyAttendanceSubmit(event, '${student.rollNo}')">
      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Total Classes Conducted *</label>
          <input type="number" class="form-input" id="editStuTotalClasses" required min="1" max="500" value="${total}" />
        </div>
        <div class="form-group">
          <label class="form-label">Classes Attended *</label>
          <input type="number" class="form-input" id="editStuAttendedClasses" required min="0" max="500" value="${attended}" />
        </div>
      </div>

      <div style="margin-top: 10px; font-size: 12px; color: var(--text-muted);">
        * Updating attendance will recalculate the percentage, persist changes to the central SQLite database, and automatically synchronize across Main ERP and Student Portal.
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-check"></i> Save & Broadcast Attendance</button>
      </div>
    </form>
  `;

  modal.classList.add('active');
}

function handleSaveFacultyAttendanceSubmit(e, rollNo) {
  e.preventDefault();
  const total = parseInt(document.getElementById('editStuTotalClasses').value, 10) || 200;
  const attended = Math.min(parseInt(document.getElementById('editStuAttendedClasses').value, 10) || 0, total);
  const pct = parseFloat(((attended / total) * 100).toFixed(1));

  const allStudents = getCentralStudents();
  const student = allStudents.find(s => (s.rollNo || s.roll || '').toUpperCase() === rollNo.toUpperCase());
  if (student) {
    student.totalClasses = total;
    student.attendedClasses = attended;
    student.attendancePct = pct;
    student.status = pct >= 75 ? 'Present' : 'Absent';

    saveFacultyState({
      module: 'Attendance',
      action: 'Update Attendance',
      summary: `Updated attendance for ${student.name} (${student.rollNo}): ${pct}% (${attended}/${total}h)`
    });

    closeFacultyModal();
    showToast(`✓ Updated attendance for ${student.name} to ${pct}%! Synced with Main ERP & Student Portal.`);

    if (currentFacultyTab === 'students') renderStudentsListTable();
    else if (currentFacultyTab === 'attendance') handleAcademicFilterChange();
  }
}

function editFacultyStudentMarks(rollNo) {
  const allStudents = getCentralStudents();
  const student = allStudents.find(s => (s.rollNo || s.roll || '').toUpperCase() === rollNo.toUpperCase());
  if (!student) return;

  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  const marks = student.examMarks || { mid1: 26, mid2: 27, semEnd: 62 };

  title.textContent = `Update Internal Marks: ${student.name} (${student.rollNo})`;
  body.innerHTML = `
    <form onsubmit="handleSaveFacultyMarksSubmit(event, '${student.rollNo}')">
      <div class="grid-3" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Mid-I Exam (Max 30) *</label>
          <input type="number" class="form-input" id="editMid1Marks" required min="0" max="30" value="${marks.mid1 || 26}" />
        </div>
        <div class="form-group">
          <label class="form-label">Mid-II Exam (Max 30) *</label>
          <input type="number" class="form-input" id="editMid2Marks" required min="0" max="30" value="${marks.mid2 || 27}" />
        </div>
        <div class="form-group">
          <label class="form-label">Semester End (Max 70) *</label>
          <input type="number" class="form-input" id="editSemEndMarks" required min="0" max="70" value="${marks.semEnd || 62}" />
        </div>
      </div>

      <div style="margin-top: 10px; font-size: 12px; color: var(--text-muted);">
        * Marks submitted by course faculty will be posted to the examination database and immediately visible on Main ERP exam cell and Student Portal grade card.
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-check"></i> Post Academic Marks</button>
      </div>
    </form>
  `;

  modal.classList.add('active');
}

function handleSaveFacultyMarksSubmit(e, rollNo) {
  e.preventDefault();
  const mid1 = parseInt(document.getElementById('editMid1Marks').value, 10) || 0;
  const mid2 = parseInt(document.getElementById('editMid2Marks').value, 10) || 0;
  const semEnd = parseInt(document.getElementById('editSemEndMarks').value, 10) || 0;
  const total = Math.round(((mid1 + mid2) / 2) + semEnd);

  let grade = 'O (Outstanding)';
  if (total < 50) grade = 'F (Fail)';
  else if (total < 60) grade = 'B (Average)';
  else if (total < 70) grade = 'B+ (Good)';
  else if (total < 80) grade = 'A (Very Good)';
  else if (total < 90) grade = 'A+ (Excellent)';

  const allStudents = getCentralStudents();
  const student = allStudents.find(s => (s.rollNo || s.roll || '').toUpperCase() === rollNo.toUpperCase());
  if (student) {
    if (!student.examMarks) student.examMarks = {};
    student.examMarks.mid1 = mid1;
    student.examMarks.mid2 = mid2;
    student.examMarks.semEnd = semEnd;
    student.examMarks.totalMarks = total;
    student.examMarks.grade = grade;

    saveFacultyState({
      module: 'Examination',
      action: 'Post Marks',
      summary: `Updated internal marks for ${student.name} (${student.rollNo}): Total ${total}/100 [${grade}]`
    });

    closeFacultyModal();
    showToast(`✓ Posted internal marks for ${student.name}! Grade: ${grade}. Synchronized across ERP portals.`);

    if (currentFacultyTab === 'students') renderStudentsListTable();
  }
}

// ==========================================================================
// 4. LIVE ATTENDANCE ROSTER & MATRIX
// ==========================================================================

function renderStudentTable(students) {
  const tbody = document.getElementById('studentTableBody');
  const totalCountEl = document.getElementById('liveTotalCount');
  const totalCardVal = document.getElementById('liveTotalCardVal');
  const presentCountEl = document.getElementById('livePresentCount');
  const absentCountEl = document.getElementById('liveAbsentCount');
  const odCountEl = document.getElementById('liveOdCount');
  const livePctText = document.getElementById('livePctText');

  const pCount = students.filter(s => s.status === 'Present').length;
  const aCount = students.filter(s => s.status === 'Absent').length;
  const odCount = students.filter(s => s.status === 'OD').length;
  const total = students.length;
  const pct = total > 0 ? Math.round(((pCount + odCount) / total) * 100) : 0;

  if (totalCountEl) totalCountEl.textContent = `${total} Students`;
  if (totalCardVal) totalCardVal.textContent = `${total} Students`;
  if (presentCountEl) presentCountEl.textContent = pCount;
  if (absentCountEl) absentCountEl.textContent = aCount;
  if (odCountEl) odCountEl.textContent = odCount;
  if (livePctText) livePctText.textContent = `${pct}% Attendance`;

  if (!tbody) return;

  tbody.innerHTML = "";

  if (students.length === 0) {
    const course = document.getElementById('acadCourseSelect')?.value || 'CSE';
    const sec = document.getElementById('acadSectionSelect')?.value || '';
    const yr = document.getElementById('acadYearSelect')?.value || '3rd Year';

    if (!sec || sec === '' || sec === 'NONE') {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 45px 20px; color: var(--text-muted);">
            <div style="font-size: 32px; margin-bottom: 12px; opacity: 0.4;"><i class="fa-solid fa-arrow-pointer"></i></div>
            <div style="font-size: 15px; font-weight: 600; color: var(--text-heading); margin-bottom: 4px;">Please select a section to view students</div>
            <div style="font-size: 12.5px; opacity: 0.8;">Choose Department, Year, Section, and Subject above to open that section's student roster.</div>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 45px 20px; color: var(--text-muted);">
            <div style="font-size: 32px; margin-bottom: 12px; opacity: 0.4;"><i class="fa-solid fa-users-slash"></i></div>
            <div style="font-size: 15px; font-weight: 600; color: var(--text-heading); margin-bottom: 4px;">No students found in this section</div>
            <div style="font-size: 12.5px; opacity: 0.8;">No student records found in central database for <strong>${course} ${yr} Section ${sec}</strong>.</div>
          </td>
        </tr>
      `;
    }
    return;
  }

  students.forEach((std, idx) => {
    const roll = std.rollNo || std.roll;
    const isPresent = std.status === 'Present';
    const isAbsent = std.status === 'Absent';
    const isOD = std.status === 'OD';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="text-align: center; color: var(--text-muted); font-weight: 600;">${idx + 1}</td>
      <td style="font-weight: 700; color: var(--primary); font-family: 'JetBrains Mono';">${roll}</td>
      <td style="font-weight: 600; color: var(--text-heading);">${std.name}</td>
      <td style="text-align: center;">
        <span class="badge ${isPresent ? 'badge-success' : (isAbsent ? 'badge-danger' : 'badge-warning')}" id="statusBadge-${roll}">
          ${isPresent ? '✓ Present' : (isAbsent ? '✗ Absent' : '⏰ On-Duty')}
        </span>
      </td>
      <td style="text-align: right;">
        <div style="display: inline-flex; gap: 6px;">
          <button class="att-toggle-btn ${isPresent ? 'present' : ''}" onclick="setStudentStatus('${roll}', 'Present')">P</button>
          <button class="att-toggle-btn ${isAbsent ? 'absent' : ''}" onclick="setStudentStatus('${roll}', 'Absent')">A</button>
          <button class="att-toggle-btn ${isOD ? 'od' : ''}" onclick="setStudentStatus('${roll}', 'OD')">OD</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function handleSubjectSelectChange(subjVal) {
  if (!subjVal) return;
  const f = currentFaculty;
  const assigned = f?.assignedSubjects || [];
  const found = assigned.find(s => s.code === subjVal || s.name === subjVal || `${s.code} - ${s.name}` === subjVal);
  if (found && found.class) {
    const clsStr = found.class.toUpperCase();
    if (clsStr.includes('CSE-D') || clsStr.includes('(CSE-D')) {
      const secSel = document.getElementById('acadSectionSelect');
      if (secSel) secSel.value = 'D';
    } else if (clsStr.includes('CSE-A')) {
      const secSel = document.getElementById('acadSectionSelect');
      if (secSel) secSel.value = 'A';
    } else if (clsStr.includes('CSE-B')) {
      const secSel = document.getElementById('acadSectionSelect');
      if (secSel) secSel.value = 'B';
    } else if (clsStr.includes('CSE-C')) {
      const secSel = document.getElementById('acadSectionSelect');
      if (secSel) secSel.value = 'C';
    } else if (clsStr.includes('CSE-E')) {
      const secSel = document.getElementById('acadSectionSelect');
      if (secSel) secSel.value = 'E';
    }

    if (clsStr.includes('IV') || clsStr.includes('4TH') || clsStr.includes('4')) {
      const yrSel = document.getElementById('acadYearSelect');
      if (yrSel) yrSel.value = '4th Year';
    } else if (clsStr.includes('III') || clsStr.includes('3RD') || clsStr.includes('3')) {
      const yrSel = document.getElementById('acadYearSelect');
      if (yrSel) yrSel.value = '3rd Year';
    } else if (clsStr.includes('II') || clsStr.includes('2ND') || clsStr.includes('2')) {
      const yrSel = document.getElementById('acadYearSelect');
      if (yrSel) yrSel.value = '2nd Year';
    } else if (clsStr.includes('I') || clsStr.includes('1ST') || clsStr.includes('1')) {
      const yrSel = document.getElementById('acadYearSelect');
      if (yrSel) yrSel.value = '1st Year';
    }
  }
  handleAcademicFilterChange();
}

function handleAcademicFilterChange() {
  const f = currentFaculty;
  const prog = document.getElementById('acadProgramSelect')?.value || 'B.Tech';
  const course = document.getElementById('acadCourseSelect')?.value || (f ? (f.deptCode || 'CSE') : 'CSE');
  const sec = document.getElementById('acadSectionSelect')?.value ?? (f?.assignedSubjects?.[0]?.class?.includes('CSE-D') ? 'D' : 'A');
  const yr = document.getElementById('acadYearSelect')?.value || '3rd Year';
  const sem = document.getElementById('acadSemSelect')?.value || '1st Semester';

  const filtered = filterRealStudents(course, sec, yr, prog);
  activeLiveRoster = filtered;

  renderStudentTable(activeLiveRoster);
}

function renderLiveAttendanceView() {
  const f = currentFaculty || FACULTY_DATABASE['AL00456'];
  const assigned = f.assignedSubjects || [
    { code: '24A502', name: 'Database Management Systems', class: 'III B.Tech I Sem (CSE-D)', studentsCount: 64, room: 'LH-304' },
    { code: '24A504', name: 'Web Application Development with Full-Stack', class: 'III B.Tech I Sem (CSE-D)', studentsCount: 64, room: 'LH-304' },
    { code: '24A506L', name: 'DBMS & Advanced SQL Laboratory', class: 'III B.Tech I Sem (CSE-D Batch 1 & 2)', studentsCount: 64, room: 'Lab-2' },
    { code: '24A507L', name: 'Full-Stack Web Technologies Lab', class: 'III B.Tech I Sem (CSE-D Batch 1 & 2)', studentsCount: 64, room: 'Lab-3' }
  ];

  const defaultSubj = assigned[0];
  const defaultSec = defaultSubj?.class?.includes('CSE-D') ? 'D' : 'A';
  const defaultDept = f.deptCode || 'CSE';
  const defaultYear = '3rd Year';
  const todayStr = new Date().toISOString().split('T')[0];

  activeLiveRoster = filterRealStudents(defaultDept, defaultSec, defaultYear, 'B.Tech');

  const presentCount = activeLiveRoster.filter(s => s.status === 'Present').length;
  const absentCount = activeLiveRoster.filter(s => s.status === 'Absent').length;
  const odCount = activeLiveRoster.filter(s => s.status === 'OD').length;
  const totalCount = activeLiveRoster.length;
  const pct = totalCount > 0 ? Math.round(((presentCount + odCount) / totalCount) * 100) : 0;

  return `
    <!-- Academic Selection Section -->
    <div class="acad-selector-card">
      <div class="acad-selector-header">
        <div class="acad-selector-title">
          <i class="fa-solid fa-graduation-cap" style="color: #2563eb;"></i> Live Attendance Class & Subject Selection
        </div>
        <div style="font-size: 12.5px; color: var(--text-muted); font-weight: 500;">
          Faculty: <strong>${f.name}</strong> (${f.id}) · Live Synchronization with Main ERP
        </div>
      </div>
      <div class="acad-selector-body">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 12px;">
          <div>
            <label class="form-label">Subject / Course Handled *</label>
            <select class="acad-input-box" id="acadSubjectSelect" onchange="handleSubjectSelectChange(this.value)" style="font-weight: 700; color: var(--primary);">
              ${assigned.map((s, idx) => `
                <option value="${s.code} - ${s.name}" ${idx === 0 ? 'selected' : ''}>
                  ${s.code} - ${s.name} (${s.class || 'Class'})
                </option>
              `).join('')}
              <option value="GEN-CSE - Advanced Computer Science">General Department Subject</option>
            </select>
          </div>

          <div>
            <label class="form-label">Department / Branch *</label>
            <select class="acad-input-box" id="acadCourseSelect" onchange="handleAcademicFilterChange()">
              <option value="CSE" ${defaultDept === 'CSE' ? 'selected' : ''}>CSE – Computer Science & Engg</option>
              <option value="AIML" ${defaultDept === 'AIML' ? 'selected' : ''}>AIML – Artificial Intelligence</option>
              <option value="CSD" ${defaultDept === 'CSD' ? 'selected' : ''}>CSD – Data Science</option>
              <option value="ECE" ${defaultDept === 'ECE' ? 'selected' : ''}>ECE – Electronics & Comm</option>
              <option value="EEE" ${defaultDept === 'EEE' ? 'selected' : ''}>EEE – Electrical & Electronics</option>
              <option value="CIVIL" ${defaultDept === 'CIVIL' ? 'selected' : ''}>CIVIL – Civil Engineering</option>
              <option value="MECH" ${defaultDept === 'MECH' ? 'selected' : ''}>MECH – Mechanical Engg</option>
            </select>
          </div>

          <div>
            <label class="form-label">Year of Study *</label>
            <select class="acad-input-box" id="acadYearSelect" onchange="handleAcademicFilterChange()">
              <option value="1st Year">1st Year (I B.Tech)</option>
              <option value="2nd Year">2nd Year (II B.Tech)</option>
              <option value="3rd Year" selected>3rd Year (III B.Tech)</option>
              <option value="4th Year">4th Year (IV B.Tech)</option>
            </select>
          </div>

          <div>
            <label class="form-label">Section *</label>
            <select class="acad-input-box" id="acadSectionSelect" onchange="handleAcademicFilterChange()" style="font-weight: 700;">
              <option value="">-- Select Section --</option>
              <option value="A" ${defaultSec === 'A' ? 'selected' : ''}>Section A</option>
              <option value="B" ${defaultSec === 'B' ? 'selected' : ''}>Section B</option>
              <option value="C" ${defaultSec === 'C' ? 'selected' : ''}>Section C</option>
              <option value="D" ${defaultSec === 'D' ? 'selected' : ''}>Section D</option>
              <option value="E" ${defaultSec === 'E' ? 'selected' : ''}>Section E</option>
              <option value="F" ${defaultSec === 'F' ? 'selected' : ''}>Section F</option>
            </select>
          </div>

          <div>
            <label class="form-label">Attendance Date *</label>
            <input type="date" class="acad-input-box" id="acadDateSelect" value="${todayStr}" onchange="handleAcademicFilterChange()" />
          </div>

          <div>
            <label class="form-label">Teaching Period / Hour *</label>
            <select class="acad-input-box" id="acadPeriodSelect" onchange="handleAcademicFilterChange()">
              <option value="Period 1 (09:00 - 10:10 AM)" selected>Period 1 (09:00 - 10:10 AM)</option>
              <option value="Period 2 (10:25 - 11:30 AM)">Period 2 (10:25 - 11:30 AM)</option>
              <option value="Period 3 (11:30 - 12:30 PM)">Period 3 (11:30 - 12:30 PM)</option>
              <option value="Period 4 (01:15 - 02:15 PM)">Period 4 (01:15 - 02:15 PM)</option>
              <option value="Period 5 (02:15 - 03:15 PM)">Period 5 (02:15 - 03:15 PM)</option>
              <option value="Period 6 (03:15 - 04:00 PM)">Period 6 (03:15 - 04:00 PM)</option>
              <option value="Lab Session (01:15 - 04:00 PM)">Lab Session (01:15 - 04:00 PM)</option>
            </select>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px;">
          <span style="font-size: 12px; color: var(--text-muted);">
            <i class="fa-solid fa-circle-info" style="color: var(--primary);"></i> Showing students strictly enrolled in the selected section.
          </span>
          <button class="btn-get-data" onclick="handleGetAcademicData()">
            <i class="fa-solid fa-arrows-rotate"></i> Refresh Student Roster
          </button>
        </div>
      </div>
    </div>

    <!-- Live Attendance Stats & Controls -->
    <div class="grid-4" style="margin-bottom: 20px;">
      <div class="metric-widget">
        <div class="metric-icon-box"><i class="fa-solid fa-users"></i></div>
        <div>
          <div class="metric-title">Section Strength</div>
          <div class="metric-value" id="liveTotalCardVal">${totalCount} Students</div>
          <div class="metric-sub">Enrolled in Selected Section</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--success); background: var(--success-bg);"><i class="fa-solid fa-user-check"></i></div>
        <div>
          <div class="metric-title">Present</div>
          <div class="metric-value" style="color: var(--success);" id="livePresentCount">${presentCount}</div>
          <div class="metric-sub" id="livePctText">${pct}% Attendance</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--danger); background: var(--danger-bg);"><i class="fa-solid fa-user-xmark"></i></div>
        <div>
          <div class="metric-title">Absent</div>
          <div class="metric-value" style="color: var(--danger);" id="liveAbsentCount">${absentCount}</div>
          <div class="metric-sub">Notification Alert</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--warning); background: var(--warning-bg);"><i class="fa-solid fa-user-clock"></i></div>
        <div>
          <div class="metric-title">On-Duty (OD)</div>
          <div class="metric-value" style="color: var(--warning);" id="liveOdCount">${odCount}</div>
          <div class="metric-sub">Approved College Mission</div>
        </div>
      </div>
    </div>

    <!-- Live Student Roster Table -->
    <div class="portal-card">
      <div class="card-header" style="flex-wrap: wrap; gap: 10px;">
        <span class="card-title"><i class="fa-solid fa-clipboard-user" style="color: var(--primary);"></i> Student Attendance Roll Matrix</span>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn-outline" onclick="markAllAttendance('Present')"><i class="fa-solid fa-check-double"></i> Mark All Present</button>
          <button class="btn-outline" onclick="markAllAttendance('Absent')"><i class="fa-solid fa-xmark"></i> Mark All Absent</button>
          <button class="btn-primary" onclick="submitLiveAttendance()" style="background: linear-gradient(135deg, #10B981, #059669); font-weight: 800; padding: 8px 18px; box-shadow: 0 4px 12px rgba(16,185,129,0.3);"><i class="fa-solid fa-cloud-arrow-up"></i> Submit Attendance</button>
        </div>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th style="width: 70px; text-align: center;">S.No</th>
                <th>Roll Number</th>
                <th>Student Full Name</th>
                <th style="text-align: center;">Current Status</th>
                <th style="text-align: right;">Toggle Attendance</th>
              </tr>
            </thead>
            <tbody id="studentTableBody">
              ${activeLiveRoster.length === 0 ? `
                <tr>
                  <td colspan="5" style="text-align: center; padding: 45px 20px; color: var(--text-muted);">
                    <div style="font-size: 32px; margin-bottom: 12px; opacity: 0.4;"><i class="fa-solid fa-users-slash"></i></div>
                    <div style="font-size: 15px; font-weight: 600; color: var(--text-heading); margin-bottom: 4px;">No students found in this section</div>
                    <div style="font-size: 12.5px; opacity: 0.8;">No student records found in central database for <strong>${defaultDept} ${defaultYear} Section ${defaultSec}</strong>.</div>
                  </td>
                </tr>
              ` : activeLiveRoster.map((std, idx) => `
                <tr>
                  <td style="text-align: center; color: var(--text-muted); font-weight: 600;">${idx + 1}</td>
                  <td style="font-weight: 700; color: var(--primary); font-family: 'JetBrains Mono';">${std.rollNo || std.roll}</td>
                  <td style="font-weight: 600; color: var(--text-heading);">${std.name}</td>
                  <td style="text-align: center;">
                    <span class="badge ${std.status === 'Present' ? 'badge-success' : (std.status === 'Absent' ? 'badge-danger' : 'badge-warning')}" id="statusBadge-${std.rollNo || std.roll}">
                      ${std.status === 'Present' ? '✓ Present' : (std.status === 'Absent' ? '✗ Absent' : '⏰ On-Duty')}
                    </span>
                  </td>
                  <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 6px;">
                      <button class="att-toggle-btn ${std.status === 'Present' ? 'present' : ''}" onclick="setStudentStatus('${std.rollNo || std.roll}', 'Present')">P</button>
                      <button class="att-toggle-btn ${std.status === 'Absent' ? 'absent' : ''}" onclick="setStudentStatus('${std.rollNo || std.roll}', 'Absent')">A</button>
                      <button class="att-toggle-btn ${std.status === 'OD' ? 'od' : ''}" onclick="setStudentStatus('${std.rollNo || std.roll}', 'OD')">OD</button>
                    </div>
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

function setStudentStatus(rollNo, status) {
  const std = activeLiveRoster.find(s => (s.rollNo || s.roll) === rollNo);
  if (std) {
    std.status = status;
    renderStudentTable(activeLiveRoster);
    syncStudentStatusLive(rollNo, status);
  }
}

function markAllAttendance(status) {
  activeLiveRoster.forEach(s => {
    s.status = status;
    syncStudentStatusLive(s.rollNo || s.roll, status);
  });
  renderStudentTable(activeLiveRoster);
  showToast(`All students marked as ${status}!`);
}

function syncStudentStatusLive(rollNo, status) {
  const r = (rollNo || '').trim().toUpperCase();
  const allStudents = getCentralStudents();
  const target = allStudents.find(s => (s.rollNo || s.roll || '').trim().toUpperCase() === r);
  if (target) {
    target.status = status;
  }
}

function submitLiveAttendance() {
  if (!activeLiveRoster || activeLiveRoster.length === 0) {
    alert('No students available in the selected section to submit attendance.');
    return;
  }

  const dept = document.getElementById('acadCourseSelect')?.value || 'CSE';
  const yr = document.getElementById('acadYearSelect')?.value || '3rd Year';
  const sec = document.getElementById('acadSectionSelect')?.value || 'D';
  const subject = document.getElementById('acadSubjectSelect')?.value || 'Database Management Systems';
  const date = document.getElementById('acadDateSelect')?.value || new Date().toISOString().split('T')[0];
  const period = document.getElementById('acadPeriodSelect')?.value || 'Period 1 (09:00 - 10:10 AM)';

  const sessionKey = `${dept}_${yr}_${sec}_${subject}_${date}_${period}`.replace(/\s+/g, '_');

  if (!facultyState.attendanceRecords) facultyState.attendanceRecords = [];

  const existingIdx = facultyState.attendanceRecords.findIndex(r => r.sessionKey === sessionKey || (r.department === dept && r.section === sec && r.date === date && r.period === period && r.subject === subject));
  const isDuplicate = existingIdx !== -1;

  if (isDuplicate) {
    const shouldOverwrite = confirm(`⚠️ Attendance for ${subject} on ${date} (${period}) for Sec-${sec} was already submitted.\n\nDo you want to update/overwrite the existing attendance record?`);
    if (!shouldOverwrite) return;
  }

  const pCount = activeLiveRoster.filter(s => s.status === 'Present').length;
  const aCount = activeLiveRoster.filter(s => s.status === 'Absent').length;
  const odCount = activeLiveRoster.filter(s => s.status === 'OD').length;

  const allStudents = getCentralStudents();

  activeLiveRoster.forEach(activeStu => {
    const r = (activeStu.rollNo || activeStu.roll || '').trim().toUpperCase();
    const target = allStudents.find(s => (s.rollNo || s.roll || '').trim().toUpperCase() === r);
    if (target) {
      target.status = activeStu.status;
      if (!isDuplicate) {
        target.totalClasses = (target.totalClasses || 200) + 1;
        if (activeStu.status === 'Present' || activeStu.status === 'OD') {
          target.attendedClasses = (target.attendedClasses || 180) + 1;
        }
      }
      target.attendancePct = parseFloat(((target.attendedClasses / (target.totalClasses || 200)) * 100).toFixed(1));
    }
  });

  const sessionRecord = {
    id: isDuplicate ? facultyState.attendanceRecords[existingIdx].id : `ATT-${Date.now()}`,
    sessionKey: sessionKey,
    department: dept,
    year: yr,
    section: sec,
    subject: subject,
    date: date,
    period: period,
    facultyId: currentFaculty ? currentFaculty.id : 'AL00456',
    facultyName: currentFaculty ? (currentFaculty.name || currentFaculty.shortName) : 'MS. A. Manjula',
    totalStrength: activeLiveRoster.length,
    presentCount: pCount,
    absentCount: aCount,
    odCount: odCount,
    attendancePct: Math.round(((pCount + odCount) / activeLiveRoster.length) * 100),
    submittedAt: new Date().toISOString(),
    timestamp: Date.now(),
    records: activeLiveRoster.map(s => ({
      rollNo: s.rollNo || s.roll,
      name: s.name,
      status: s.status
    }))
  };

  if (isDuplicate) {
    facultyState.attendanceRecords[existingIdx] = sessionRecord;
  } else {
    facultyState.attendanceRecords.unshift(sessionRecord);
  }

  // Persist to central state & cross-portal localStorage keys
  facultyState.students = allStudents;
  try {
    localStorage.setItem('alits_students_242G', JSON.stringify(allStudents));
    localStorage.setItem('realStudents', JSON.stringify(allStudents));
    localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(facultyState));
  } catch (e) { }

  saveFacultyState({
    module: 'Attendance',
    action: isDuplicate ? 'Update Live Attendance' : 'Submit Live Attendance',
    summary: `Live attendance ${isDuplicate ? 'updated' : 'submitted'} for ${yr} ${dept} Sec-${sec} (${subject}): Present: ${pCount}, Absent: ${aCount}, OD: ${odCount}`
  });

  showToast(`✓ Attendance for ${activeLiveRoster.length} students (${subject} Sec-${sec}) successfully saved & synchronized with Main ERP!`);
}

function openAddFacultyStudentModal() {
  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  const course = document.getElementById('acadCourseSelect')?.value || document.getElementById('stuListDeptSelect')?.value || 'CSE';
  const sec = document.getElementById('acadSectionSelect')?.value || document.getElementById('stuListSecSelect')?.value || 'A';
  const yr = document.getElementById('acadYearSelect')?.value || document.getElementById('stuListYearSelect')?.value || '3rd Year';

  const cleanDept = course === 'ALL' ? 'CSE' : course;
  const cleanSec = sec === 'ALL' ? 'A' : sec;
  const cleanYr = yr === 'ALL' ? '3rd Year' : yr;

  title.textContent = `Enroll Student into ${cleanYr} ${cleanDept} (Section-${cleanSec})`;
  body.innerHTML = `
    <form onsubmit="handleSaveFacultyStudentSubmit(event)">
      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Roll Number *</label>
          <input type="text" class="form-input" id="newStuRoll" required placeholder="e.g. 242G1A0599" style="text-transform: uppercase;" />
        </div>
        <div class="form-group">
          <label class="form-label">Student Full Name *</label>
          <input type="text" class="form-input" id="newStuName" required placeholder="e.g. K. Sai Kumar" />
        </div>
      </div>

      <div class="grid-2" style="gap: 12px; margin-top: 10px;">
        <div class="form-group">
          <label class="form-label">Father / Guardian Name</label>
          <input type="text" class="form-input" id="newStuFather" placeholder="e.g. K. Venkata Ramana" />
        </div>
        <div class="form-group">
          <label class="form-label">Mobile Number *</label>
          <input type="tel" class="form-input" id="newStuMobile" required placeholder="10-digit mobile number" />
        </div>
      </div>

      <div class="grid-3" style="gap: 12px; margin-top: 10px;">
        <div class="form-group">
          <label class="form-label">Quota</label>
          <select class="form-select" id="newStuQuota">
            <option value="Convenor Quota" selected>Convenor Quota</option>
            <option value="Management Quota">Management Quota</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Residency Type</label>
          <select class="form-select" id="newStuRes">
            <option value="Day Scholar" selected>Day Scholar</option>
            <option value="Hosteler">Hosteler</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Gender</label>
          <select class="form-select" id="newStuGender">
            <option value="Male" selected>Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <input type="hidden" id="newStuDept" value="${cleanDept}" />
      <input type="hidden" id="newStuSec" value="${cleanSec}" />
      <input type="hidden" id="newStuYear" value="${cleanYr}" />

      <div style="margin-top: 12px; font-size: 12px; color: var(--text-muted);">
        * Enrolling a student will add them to the central ALITS database, making them immediately available in Main ERP Dashboard, Faculty Portal, and Student Portal.
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-check"></i> Enroll & Sync Student</button>
      </div>
    </form>
  `;

  modal.classList.add('active');
}

function handleSaveFacultyStudentSubmit(e) {
  e.preventDefault();
  const roll = document.getElementById('newStuRoll').value.trim().toUpperCase();
  const name = document.getElementById('newStuName').value.trim();
  const fatherName = document.getElementById('newStuFather').value.trim() || `${name.split(' ')[0]} Father`;
  const mobile = document.getElementById('newStuMobile').value.trim();
  const gender = document.getElementById('newStuGender').value;
  const quota = document.getElementById('newStuQuota').value;
  const resType = document.getElementById('newStuRes').value;
  const dept = (document.getElementById('newStuDept').value || 'CSE').toUpperCase();
  const sec = (document.getElementById('newStuSec').value || 'A').toUpperCase();
  const year = document.getElementById('newStuYear').value || '3rd Year';

  if (!roll || roll.length < 5) {
    alert('Please enter a valid Roll Number (e.g., 242G1A05O1).');
    return;
  }
  if (!name || name.length < 2) {
    alert('Please enter student full name.');
    return;
  }

  const allStudents = getCentralStudents();

  // Check unique roll number
  const existing = allStudents.find(s => (s.rollNo || s.roll || '').toUpperCase() === roll);
  if (existing) {
    alert(`Student with Roll Number ${roll} already exists in the central database!`);
    return;
  }

  const isHosteler = resType === 'Hosteler';
  const isMgmt = quota.includes('Management');
  const feeTotal = isMgmt ? 75000 : 55000;

  const newStudent = {
    id: `STU-${dept}-${roll}`,
    rollNo: roll,
    name: name,
    fatherName: fatherName,
    mobile: mobile.startsWith('+91') ? mobile : `+91 ${mobile}`,
    email: `${roll.toLowerCase()}@alits.ac.in`,
    dept: dept,
    year: (year.includes('3') || year.includes('III')) ? '3rd Year' : ((year.includes('2') || year.includes('II')) ? '2nd Year' : ((year.includes('1') || year.includes('I')) ? '1st Year' : '4th Year')),
    section: sec,
    semester: `${year.includes('3') ? 'III Year I Semester (3-1)' : 'Academic Semester'}`,
    batch: '2024-2028',
    gender: gender,
    dob: '15 June 2005',
    bloodGroup: 'O+',
    quota: quota,
    residenceType: resType,
    address: 'Ananthapur Local, AP - 515001',
    pincode: '515001',
    hostelBlock: isHosteler ? (gender === 'Female' ? 'Lakshmi Girls Hostel' : 'Anantha Boys Hostel') : 'N/A',
    roomNo: isHosteler ? 'G-105' : 'N/A',
    totalClasses: 200,
    attendedClasses: 180,
    attendancePct: 90.0,
    status: 'Present',
    totalAssigned: feeTotal,
    totalPaid: 0,
    balanceDue: feeTotal,
    installments: [
      { name: "1st Installment Fees", dueDate: "31 Mar, 2026", status: "Unpaid", amount: Math.round(feeTotal * 0.35), paid: 0, discount: 0, fine: 0, balance: Math.round(feeTotal * 0.35) },
      { name: "2nd Installment Fees", dueDate: "30 Jun, 2026", status: "Unpaid", amount: Math.round(feeTotal * 0.35), paid: 0, discount: 0, fine: 0, balance: Math.round(feeTotal * 0.35) },
      { name: "3rd Installment Fees", dueDate: "22 Sep, 2026", status: "Unpaid", amount: Math.round(feeTotal * 0.15), paid: 0, discount: 0, fine: 0, balance: Math.round(feeTotal * 0.15) },
      { name: "4th Installment Fees", dueDate: "31 Dec, 2026", status: "Unpaid", amount: Math.round(feeTotal * 0.15), paid: 0, discount: 0, fine: 0, balance: Math.round(feeTotal * 0.15) }
    ],
    examMarks: {
      mid1: 26, mid2: 27, semEnd: 62, totalMarks: 89,
      grade: "O (Outstanding)", sgpa: "8.90", cgpa: "8.90"
    }
  };

  if (!facultyState.students) facultyState.students = [];
  facultyState.students.unshift(newStudent);

  saveFacultyState({
    module: 'Students',
    action: 'Add Student',
    summary: `Enrolled student ${name} (${roll}) via Faculty Portal`
  });

  closeFacultyModal();
  showToast(`✓ Enrolled ${name} (${roll})! Synchronized across Main ERP, Faculty Portal, and Student Portal.`);

  if (currentFacultyTab === 'students') renderStudentsListTable();
  else if (currentFacultyTab === 'attendance') handleAcademicFilterChange();
}

// Academic Selection Handlers
function handleProgramChange(prog) {
  const courseSel = document.getElementById('acadCourseSelect');
  if (!courseSel) return;
  let options = '';
  if (prog === 'B.Tech') {
    options = `
      <option value="" disabled>Select</option>
      <option value="CSE" selected>CSE – Computer Science & Engg</option>
      <option value="AIML">AIML – Artificial Intelligence & ML</option>
      <option value="CSD">CSD – Data Science</option>
      <option value="CSM">CSM – Computer Science & ML</option>
      <option value="ECE">ECE – Electronics & Comm Engg</option>
      <option value="EEE">EEE – Electrical & Electronics Engg</option>
      <option value="MECH">MECH – Mechanical Engineering</option>
      <option value="CIVIL">CIVIL – Civil Engineering</option>
    `;
  } else if (prog === 'Diploma') {
    options = `
      <option value="" disabled>Select</option>
      <option value="DCSE" selected>Diploma CSE</option>
      <option value="DECE">Diploma ECE</option>
      <option value="DEEE">Diploma EEE</option>
      <option value="DMECH">Diploma Mechanical</option>
      <option value="DCIVIL">Diploma Civil</option>
    `;
  } else if (prog === 'H&S') {
    options = `
      <option value="" disabled>Select</option>
      <option value="H&S" selected>Humanities & Sciences (Freshman)</option>
    `;
  } else if (prog === 'MBA') {
    options = `
      <option value="" disabled>Select</option>
      <option value="MBA" selected>MBA – Master of Business Admin</option>
      <option value="MBA-HR">MBA (Human Resources)</option>
      <option value="MBA-Fin">MBA (Finance)</option>
    `;
  } else if (prog === 'MCA') {
    options = `
      <option value="" disabled>Select</option>
      <option value="MCA" selected>MCA – Master of Computer Applications</option>
    `;
  } else if (prog === 'M.Tech') {
    options = `
      <option value="" disabled>Select</option>
      <option value="M.Tech-CSE" selected>M.Tech – Computer Science</option>
      <option value="M.Tech-VLSI">M.Tech – VLSI & Embedded Systems</option>
      <option value="M.Tech-PS">M.Tech – Power Systems</option>
    `;
  }
  courseSel.innerHTML = options;
}

function handleGetAcademicData() {
  handleAcademicFilterChange();
  const prog = document.getElementById('acadProgramSelect')?.value || 'B.Tech';
  const course = document.getElementById('acadCourseSelect')?.value || 'CSE';
  const sec = document.getElementById('acadSectionSelect')?.value || 'B';
  const yr = document.getElementById('acadYearSelect')?.value || 'III Year';
  const sem = document.getElementById('acadSemSelect')?.value || '1st Semester';

  showToast(`✓ Retrieved Academic Data: ${yr} ${prog} ${course} - Section ${sec} (${sem}) | ${activeLiveRoster.length} Students Loaded`);
}

// Persistent Permission Applications
function getStoredPermissions() {
  const saved = localStorage.getItem('alits_faculty_permissions');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { }
  }
  return [
    {
      id: 'PRM-101',
      facultyId: 'AL00456',
      facultyName: 'MS. A. Manjula',
      dept: 'Computer Science & Engineering',
      type: 'Campus Exit / Short Permission (2 Hours)',
      date: '2026-09-22',
      timeSlot: '02:00 PM - 04:00 PM',
      duration: '2 Hours',
      reason: 'Urgent university documentation submission at SBI Main Branch',
      substitute: 'Mrs. G. Roja Ramani (Assistant Professor - CSE)',
      substituteStatus: 'Class Adjusted',
      status: 'Pending Principal Approval',
      appliedAt: '21-Sep-2026 10:15 AM',
      approvedBy: null,
      approvedAt: null,
      principalRemarks: '',
      passCode: 'ALITS-PRIN-PRM-101'
    },
    {
      id: 'PRM-102',
      facultyId: 'AL00457',
      facultyName: 'Dr. K. Bhargavi',
      dept: 'Computer Science & Engineering',
      type: 'On-Duty (OD) Research & Exam Duty',
      date: '2026-09-23',
      timeSlot: '10:00 AM - 05:00 PM',
      duration: 'Full Day OD',
      reason: 'JNTUA University Autonomous Examination Moderation Committee Meeting',
      substitute: 'Sri K. Ramesh (Associate Professor - CSE)',
      substituteStatus: 'Class Adjusted',
      status: 'Approved by Principal',
      appliedAt: '19-Sep-2026 09:30 AM',
      approvedBy: 'Dr. K. Sreenivasulu (Principal)',
      approvedAt: '20-Sep-2026 11:00 AM',
      principalRemarks: 'OD Sanctioned with duty allowance. Please submit completion certificate.',
      passCode: 'ALITS-PRIN-OD-9481'
    },
    {
      id: 'PRM-103',
      facultyId: 'AL00458',
      facultyName: 'Sri K. Ramesh',
      dept: 'Computer Science & Engineering',
      type: 'Lab Equipment Vendor Inspection',
      date: '2026-09-24',
      timeSlot: '01:30 PM - 03:30 PM',
      duration: '2 Hours',
      reason: 'Visiting Electronics Component Vendor for AI/IoT Laboratory setup',
      substitute: 'Mr. B. Vijaya Bhaskar Reddy (Assistant Professor - CSE)',
      substituteStatus: 'Class Adjusted',
      status: 'Pending Principal Approval',
      appliedAt: '21-Sep-2026 11:45 AM',
      approvedBy: null,
      approvedAt: null,
      principalRemarks: '',
      passCode: 'ALITS-PRIN-PRM-103'
    }
  ];
}

function saveStoredPermissions(perms) {
  if (!facultyState) facultyState = {};
  facultyState.permissions = perms;
  localStorage.setItem('alits_faculty_permissions', JSON.stringify(perms));
  try {
    const rawERP = localStorage.getItem('ALITS_ERP_STATE');
    if (rawERP) {
      const parsed = JSON.parse(rawERP);
      parsed.permissions = perms;
      localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(parsed));
    }
  } catch (e) { }
  saveFacultyState({ summary: 'Faculty permissions updated', module: 'Approvals', action: 'Update' });
  updateFacultyApprovalsBadge();
}

// Action Handlers
window.approvePermissionAction = function (id) {
  const perms = getStoredPermissions();
  const p = perms.find(x => x.id === id);
  if (!p) return;

  p.status = 'Approved by Principal';
  p.approvedBy = currentFaculty ? (currentFaculty.name || currentFaculty.shortName) : 'Dr. K. Sreenivasulu (Principal)';
  p.approvedAt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  p.passCode = `ALITS-PRIN-${p.id}`;

  saveStoredPermissions(perms);
  showToast(`✓ Request ${p.id} has been Approved & Sanctioned!`);

  updateFacultyApprovalsBadge();
  if (currentFacultyTab === 'approvals') {
    const mainContainer = document.getElementById('facultyTabContent');
    if (mainContainer && typeof renderApprovalsView === 'function') mainContainer.innerHTML = renderApprovalsView();
  }
};

window.rejectPermissionAction = function (id) {
  const reason = prompt('Please enter reason for rejection:', 'Prior class adjustment required or alternate schedule recommended.');
  if (reason === null) return;

  const perms = getStoredPermissions();
  const p = perms.find(x => x.id === id);
  if (!p) return;

  p.status = 'Rejected';
  p.principalRemarks = reason || 'Rejected by Department / Principal';
  p.approvedAt = new Date().toLocaleDateString('en-GB');

  saveStoredPermissions(perms);
  showToast(`Request ${p.id} marked as Rejected.`);

  updateFacultyApprovalsBadge();
  if (currentFacultyTab === 'approvals') {
    const mainContainer = document.getElementById('facultyTabContent');
    if (mainContainer && typeof renderApprovalsView === 'function') mainContainer.innerHTML = renderApprovalsView();
  }
};

// Persistent Faculty Leaves Repository
let FACULTY_LEAVES = [
  {
    id: 'LV-989',
    facultyId: 'AL00456',
    facultyName: 'MS. A. Manjula',
    type: 'Medical Leave (ML)',
    from: '2026-09-23',
    to: '2026-09-25',
    days: 2,
    reason: 'Viral Fever & Medical Treatment',
    substitute: 'Mr. B. Vijaya Bhaskar Reddy (Assistant Professor - CSE)',
    status: 'Approved by Principal',
    date: '22 Sep 2026'
  },
  {
    id: 'LV-801',
    facultyId: 'AL00456',
    facultyName: 'MS. A. Manjula',
    type: 'Casual Leave (CL)',
    from: '2026-09-18',
    to: '2026-09-18',
    days: 1,
    reason: 'Personal family commitment',
    substitute: 'Mrs. G. Roja Ramani (Assistant Professor - CSE)',
    status: 'Approved by Principal',
    date: '14 Sep 2026'
  },
  {
    id: 'LV-802',
    facultyId: 'AL00457',
    facultyName: 'Dr. K. Bhargavi',
    type: 'On-Duty (OD)',
    from: '2026-10-05',
    to: '2026-10-06',
    days: 2,
    reason: 'Attending IEEE International Conference at Hyderabad',
    substitute: 'Sri K. Ramesh (Associate Professor - CSE)',
    status: 'Approved by Principal',
    date: '20 Sep 2026'
  }
];

function getStoredFacultyLeaves() {
  if (facultyState && Array.isArray(facultyState.facultyLeaves) && facultyState.facultyLeaves.length > 0) {
    FACULTY_LEAVES = facultyState.facultyLeaves;
    return FACULTY_LEAVES;
  }
  const saved = localStorage.getItem('alits_faculty_leaves');
  if (saved) {
    try {
      const l = JSON.parse(saved);
      if (Array.isArray(l) && l.length > 0) {
        FACULTY_LEAVES = l;
        if (facultyState) facultyState.facultyLeaves = l;
        return FACULTY_LEAVES;
      }
    } catch (e) { }
  }
  if (facultyState) facultyState.facultyLeaves = FACULTY_LEAVES;
  return FACULTY_LEAVES;
}

function saveStoredFacultyLeaves(leaves) {
  FACULTY_LEAVES = leaves;
  if (!facultyState) facultyState = {};
  facultyState.facultyLeaves = leaves;
  localStorage.setItem('alits_faculty_leaves', JSON.stringify(leaves));
  try {
    const rawERP = localStorage.getItem('ALITS_ERP_STATE');
    if (rawERP) {
      const parsed = JSON.parse(rawERP);
      parsed.facultyLeaves = leaves;
      localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(parsed));
    }
  } catch (e) { }
  saveFacultyState({ summary: 'Faculty leave records updated', module: 'FacultyLeaves', action: 'Update' });
  updateFacultyApprovalsBadge();
}

window.approveLeaveAction = function (id) {
  const leaves = getStoredFacultyLeaves();
  const lv = leaves.find(x => x.id === id);
  if (!lv) return;

  lv.status = 'Approved by Principal';
  saveStoredFacultyLeaves(leaves);
  showToast(`✓ Leave application ${id} Sanctioned & Approved!`);

  updateFacultyApprovalsBadge();
  if (currentFacultyTab === 'approvals') {
    const mainContainer = document.getElementById('facultyTabContent');
    if (mainContainer && typeof renderApprovalsView === 'function') mainContainer.innerHTML = renderApprovalsView();
  }
};

window.rejectLeaveAction = function (id) {
  const reason = prompt('Please enter reason for rejection:', 'Leave quota exceeded or alternate schedule needed.');
  if (reason === null) return;

  const leaves = getStoredFacultyLeaves();
  const lv = leaves.find(x => x.id === id);
  if (!lv) return;

  lv.status = 'Rejected';
  saveStoredFacultyLeaves(leaves);
  showToast(`Leave application ${id} marked as Rejected.`);

  updateFacultyApprovalsBadge();
  if (currentFacultyTab === 'approvals') {
    const mainContainer = document.getElementById('facultyTabContent');
    if (mainContainer && typeof renderApprovalsView === 'function') mainContainer.innerHTML = renderApprovalsView();
  }
};

// Persistent Course Assignments Repository
function getStoredAssignments() {
  if (facultyState && Array.isArray(facultyState.assignments) && facultyState.assignments.length > 0) {
    return facultyState.assignments.map(a => {
      const subCount = a.submissionCount !== undefined ? a.submissionCount : ((facultyState.submittedAssignments || []).filter(s => s.assignmentId === a.id).length || 48);
      return {
        id: a.id || `ASN-${Math.floor(100 + Math.random() * 900)}`,
        title: a.title || 'Course Assignment',
        subject: a.subjectName || a.subject || 'Database Management Systems',
        subjectCode: a.subjectCode || '24A502',
        class: a.class || a.targetClass || 'III B.Tech (CSE-D)',
        dueDate: a.dueDate || '2026-10-05',
        marks: a.maxMarks || a.marks || 20,
        maxMarks: a.maxMarks || a.marks || 20,
        instructions: a.instructions || 'Submit project code and report.',
        status: a.status || 'Active',
        submissions: subCount,
        submissionCount: subCount,
        submissionsCount: subCount,
        totalStudents: a.totalStudents || 64,
        faculty: a.faculty || (currentFaculty ? currentFaculty.shortName : 'Course Faculty')
      };
    });
  }
  const saved = localStorage.getItem('alits_portal_assignments');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { }
  }
  return [
    {
      id: 'ASN-301',
      title: 'RESTful Microservices Architecture with Flask & SQLite',
      subject: 'Web Application Development with Full-Stack',
      subjectCode: '24A504',
      class: 'III B.Tech (CSE-D)',
      dueDate: '2026-10-05',
      marks: 20,
      maxMarks: 20,
      instructions: 'Implement a full REST API with role-based JWT auth, SQLite migrations, and real-time SSE stream.',
      status: 'Active',
      submissions: 48,
      submissionCount: 48,
      submissionsCount: 48,
      totalStudents: 64
    },
    {
      id: 'ASN-302',
      title: 'Database Normalization & BCNF Case Study',
      subject: 'Database Management Systems',
      subjectCode: '24A502',
      class: 'III B.Tech (CSE-D)',
      dueDate: '2026-10-08',
      marks: 20,
      maxMarks: 20,
      instructions: 'Design 3NF and BCNF normalized ER schema for college roster, fee installments, and transport bus routes.',
      status: 'Active',
      submissions: 35,
      submissionCount: 35,
      submissionsCount: 35,
      totalStudents: 64
    },
    {
      id: 'ASN-303',
      title: 'DBMS & Advanced SQL Laboratory Worksheet 4',
      subject: 'DBMS & Advanced SQL Laboratory',
      subjectCode: '24A506L',
      class: 'III B.Tech (CSE-D Batch 1 & 2)',
      dueDate: '2026-10-10',
      marks: 25,
      maxMarks: 25,
      instructions: 'Execute complex multi-table joins, nested correlated subqueries, and stored procedure triggers.',
      status: 'Active',
      submissions: 52,
      submissionCount: 52,
      submissionsCount: 52,
      totalStudents: 64
    }
  ];
}

function saveStoredAssignments(asgs) {
  facultyState.assignments = asgs;
  localStorage.setItem('alits_portal_assignments', JSON.stringify(asgs));
  saveFacultyState({ summary: 'Course assignments updated', module: 'Assignments', action: 'Update' });
}

// Persistent Subject Notes & Materials Repository
function getStoredNotes() {
  if (facultyState && Array.isArray(facultyState.studyMaterials) && facultyState.studyMaterials.length > 0) {
    return facultyState.studyMaterials.map(m => {
      const fileName = m.fileName || m.file || `${(m.subject || 'Material').replace(/\s+/g, '_')}_Notes.${(m.fileType || 'PDF').toLowerCase()}`;
      const desc = m.desc || m.description || m.title || 'Complete lecture notes and solved questions.';
      const dateVal = m.uploadedOn || m.date || '20 Sep 2026';
      return {
        id: m.id || `NOTE-${Math.floor(100 + Math.random() * 900)}`,
        title: m.title || 'Course Lecture Notes',
        subject: m.subject || 'Database Management Systems',
        subjectCode: m.subjectCode || '24A502',
        unit: m.unit || (m.year ? `${m.year} Curriculum` : 'Units I-V Comprehensive'),
        desc: desc,
        description: desc,
        file: fileName,
        fileName: fileName,
        fileSize: m.fileSize || '4.8 MB',
        fileType: m.fileType || 'PDF',
        date: dateVal,
        uploadedOn: dateVal,
        downloads: m.downloads || 482,
        author: m.author || (currentFaculty ? currentFaculty.shortName : 'Course Faculty')
      };
    });
  }
  const saved = localStorage.getItem('alits_portal_notes');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { }
  }
  return [
    {
      id: 'NOTE-101',
      title: 'Database Management Systems - Complete Lecture Notes (Units I-V)',
      subject: 'Database Management Systems',
      subjectCode: '24A502',
      unit: 'Units I to V',
      desc: 'Comprehensive study material covering Relational Algebra, ER Models, SQL, Normalization & Transaction Control.',
      description: 'Comprehensive study material covering Relational Algebra, ER Models, SQL, Normalization & Transaction Control.',
      file: 'DBMS_Complete_Lecture_Notes_R24.pdf',
      fileName: 'DBMS_Complete_Lecture_Notes_R24.pdf',
      fileSize: '4.8 MB',
      fileType: 'PDF',
      date: '20 Sep 2026',
      uploadedOn: '20 Sep 2026',
      downloads: 482
    },
    {
      id: 'NOTE-102',
      title: 'Full-Stack Web Technologies - Lecture Handouts & Code Snippets',
      subject: 'Web Application Development with Full-Stack',
      subjectCode: '24A504',
      unit: 'Units I & II',
      desc: 'Node.js, Express, Flask REST APIs, DOM Manipulation and Async JavaScript guide.',
      description: 'Node.js, Express, Flask REST APIs, DOM Manipulation and Async JavaScript guide.',
      file: 'FullStack_Web_Architecture_Notes.pdf',
      fileName: 'FullStack_Web_Architecture_Notes.pdf',
      fileSize: '6.2 MB',
      fileType: 'PDF',
      date: '18 Sep 2026',
      uploadedOn: '18 Sep 2026',
      downloads: 531
    },
    {
      id: 'NOTE-103',
      title: 'DBMS & Advanced SQL Lab Manual with Practice Queries',
      subject: 'DBMS & Advanced SQL Laboratory',
      subjectCode: '24A506L',
      unit: 'Laboratory Experiments 1-10',
      desc: 'Complete lab procedure manual with solved queries, schema designs, and viva question bank.',
      description: 'Complete lab procedure manual with solved queries, schema designs, and viva question bank.',
      file: 'DBMS_Lab_Manual_24A506L.pdf',
      fileName: 'DBMS_Lab_Manual_24A506L.pdf',
      fileSize: '3.5 MB',
      fileType: 'PDF',
      date: '15 Sep 2026',
      uploadedOn: '15 Sep 2026',
      downloads: 612
    }
  ];
}

function saveStoredNotes(notes) {
  facultyState.studyMaterials = notes;
  localStorage.setItem('alits_portal_notes', JSON.stringify(notes));
  saveFacultyState({ summary: 'Subject notes and materials updated', module: 'StudyMaterials', action: 'Update' });
}

// ==========================================================================
// 1.5. FACULTY APPROVALS & PRINCIPAL SANCTIONS HUB
// ==========================================================================
function renderApprovalsView() {
  const f = currentFaculty || FACULTY_DATABASE['AL00456'] || {
    id: 'AL00456',
    name: 'MS. A. Manjula, M.Tech, (Ph.D.)',
    shortName: 'MS. A. Manjula',
    dept: 'Computer Science & Engineering',
    deptCode: 'CSE',
    leaveBalance: { cl: 8, ml: 10, od: 6, el: 12 }
  };
  const leaveBal = (f && f.leaveBalance) ? f.leaveBalance : { cl: 8, ml: 10, od: 6, el: 12 };

  const permissions = getStoredPermissions();
  const leaves = getStoredFacultyLeaves();
  const currentFacultyPermissions = permissions.filter(p => !p.facultyId || (f && p.facultyId === f.id));
  const currentFacultyLeaves = leaves.filter(l => !l.facultyId || (f && l.facultyId === f.id));

  const pendingPerms = currentFacultyPermissions.filter(p => p.status.includes('Pending'));
  const approvedPerms = currentFacultyPermissions.filter(p => p.status.includes('Approved'));
  const rejectedPerms = currentFacultyPermissions.filter(p => p.status.includes('Rejected'));

  const pendingLeaves = currentFacultyLeaves.filter(l => l.status.includes('Pending'));
  const approvedLeaves = currentFacultyLeaves.filter(l => l.status.includes('Approved'));

  const totalRequests = currentFacultyPermissions.length + currentFacultyLeaves.length;
  const totalApproved = approvedPerms.length + approvedLeaves.length;
  const totalPending = pendingPerms.length + pendingLeaves.length;

  return `
    <!-- Top Principal Executive Sanction Banner -->
    <div style="background: linear-gradient(135deg, #07180f 0%, #0F3D26 60%, #165636 100%); border: 2px solid #D4AF37; border-radius: var(--radius); padding: 22px 28px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.3); flex-wrap: wrap; gap: 20px;">
      <div style="display: flex; align-items: center; gap: 20px;">
        <div style="position: relative;">
          <img src="../images/principal_sreenivasulu.png" alt="Principal Dr. K. Sreenivasulu" style="width: 74px; height: 74px; border-radius: 50%; object-fit: cover; border: 3px solid #D4AF37; box-shadow: 0 0 18px rgba(212,175,55,0.45);" />
          <span style="position: absolute; bottom: 2px; right: 2px; background: #10B981; border: 2px solid #07180f; width: 16px; height: 16px; border-radius: 50%;" title="Principal Clearance Directorate Active"></span>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px;">
            <span style="background: linear-gradient(135deg, #D4AF37, #F59E0B); color: #07180f; font-weight: 800; font-size: 10.5px; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.8px;">EXECUTIVE CLEARANCE CELL</span>
            <span style="font-size: 11.5px; color: #94A3B8;">Mandatory Sanctions Hub</span>
          </div>
          <h2 style="font-size: 20px; font-weight: 800; color: #FFFFFF; margin: 0 0 3px;">Principal Approvals & Digital Gatepass Directorate</h2>
          <div style="font-size: 12.5px; color: #E2E8F0;">Direct clearance channel with <strong>Dr. K. Sreenivasulu, M.Tech, Ph.D.</strong> (Principal & Chief Controller of Examinations)</div>
          <div style="font-size: 11.5px; color: #D4AF37; margin-top: 4px;">
            <i class="fa-solid fa-circle-check"></i> All campus departures, On-Duty missions, and leave applications require mandatory Principal digital sanction before execution.
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
        <span style="background: ${totalPending > 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)'}; border: 1.5px solid ${totalPending > 0 ? '#EF4444' : '#10B981'}; color: ${totalPending > 0 ? '#FCA5A5' : '#6EE7B7'}; padding: 6px 16px; border-radius: 20px; font-size: 12.5px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
          ${totalPending > 0 ? `<i class="fa-solid fa-hourglass-half fa-spin"></i> ${totalPending} Request(s) Awaiting Clearance` : `<i class="fa-solid fa-circle-check"></i> All Sanction Orders Cleared`}
        </span>
        <div style="font-size: 11px; color: #CBD5E1;">Synchronized in real-time with Main ERP</div>
      </div>
    </div>

    <!-- 4 KPI SUMMARY CARDS -->
    <div class="grid-4" style="margin-bottom: 24px;">
      <div class="metric-widget" style="border-left: 4px solid var(--primary);">
        <div class="metric-icon-box" style="color: var(--primary); background: var(--primary-subtle);"><i class="fa-solid fa-layer-group"></i></div>
        <div>
          <div class="metric-title">Total Requests</div>
          <div class="metric-value" style="color: var(--primary);">${totalRequests}</div>
          <div class="metric-sub">Permissions & Leaves</div>
        </div>
      </div>

      <div class="metric-widget" style="border-left: 4px solid var(--success);">
        <div class="metric-icon-box" style="color: var(--success); background: var(--success-bg);"><i class="fa-solid fa-file-circle-check"></i></div>
        <div>
          <div class="metric-title">Sanctioned & Stamped</div>
          <div class="metric-value" style="color: var(--success);">${totalApproved}</div>
          <div class="metric-sub">Official Gatepass Issued</div>
        </div>
      </div>

      <div class="metric-widget" style="border-left: 4px solid ${totalPending > 0 ? 'var(--danger)' : 'var(--warning)'};">
        <div class="metric-icon-box" style="color: ${totalPending > 0 ? '#EF4444' : '#D97706'}; background: ${totalPending > 0 ? '#FEE2E2' : '#FEF3C7'};"><i class="fa-solid fa-clock-rotate-left"></i></div>
        <div>
          <div class="metric-title">Pending Sanctions</div>
          <div class="metric-value" style="color: ${totalPending > 0 ? '#EF4444' : '#D97706'};">${totalPending}</div>
          <div class="metric-sub">Under Principal Review</div>
        </div>
      </div>

      <div class="metric-widget" style="border-left: 4px solid var(--gold-dark);">
        <div class="metric-icon-box" style="color: var(--gold-dark); background: var(--gold-light);"><i class="fa-solid fa-calendar-days"></i></div>
        <div>
          <div class="metric-title">Casual Leave Bal.</div>
          <div class="metric-value" style="color: var(--gold-dark);">${leaveBal.cl} Days</div>
          <div class="metric-sub">Available Balance</div>
        </div>
      </div>
    </div>

    <!-- QUICK ACTIONS TOOLBAR -->
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: var(--shadow-sm);">
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <button class="btn-primary" onclick="openRequestPermissionModal()" style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);">
          <i class="fa-solid fa-person-walking-arrow-right"></i> + Request Campus Exit / OD Permission
        </button>
        <button class="btn-outline" onclick="openApplyFacultyLeaveModal()">
          <i class="fa-solid fa-envelope-open-text"></i> + Apply Formal Leave
        </button>
      </div>

      <div style="display: flex; gap: 10px; align-items: center;">
        <button class="btn-outline" onclick="switchFacultyTab('approvals'); showToast('✓ Approval statuses refreshed from Principal Directorate!');" title="Refresh Live Data">
          <i class="fa-solid fa-rotate"></i> Refresh Status
        </button>
        <a href="../index.html?view=view-approvals" target="_blank" class="btn-outline" style="text-decoration: none; color: var(--gold-dark); border-color: var(--gold);" title="Open Main ERP Approvals Hub">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Principal Approvals Hub
        </a>
      </div>
    </div>

    <!-- PIPELINE SECTION 1: PERMISSION REQUESTS & GATEPASSES -->
    <div class="portal-card" style="margin-bottom: 24px;">
      <div class="card-header" style="background: linear-gradient(90deg, rgba(15, 61, 38, 0.08), transparent); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span class="card-title"><i class="fa-solid fa-shield-halved" style="color: var(--primary);"></i> Campus Exit & OD Permission Requests Pipeline (${currentFacultyPermissions.length})</span>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">Sanction status and official digital gatepasses issued by Principal Dr. K. Sreenivasulu</div>
        </div>
        <span class="badge badge-gold">MANDATORY PROTOCOL</span>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Perm ID</th>
                <th>Category & Nature</th>
                <th>Date & Time Window</th>
                <th>Reason / Purpose</th>
                <th>Class Adjustment</th>
                <th>Principal Clearance Status</th>
                <th style="text-align: right;">Digital Gatepass Action</th>
              </tr>
            </thead>
            <tbody>
              ${currentFacultyPermissions.length === 0 ? `
                <tr><td colspan="7" style="text-align: center; padding: 28px; color: var(--text-muted);">No permission requests on record. Click "+ Request Campus Exit / OD Permission" above.</td></tr>
              ` : currentFacultyPermissions.map(p => {
    const isApproved = p.status.includes('Approved');
    const isRejected = p.status.includes('Rejected');
    return `
                  <tr style="${isApproved ? 'background: rgba(16, 185, 129, 0.03);' : ''}">
                    <td style="font-weight: 700; color: var(--primary); font-family: 'JetBrains Mono';">
                      ${p.id}
                      <div style="font-size: 10px; color: var(--text-muted); font-weight: normal;">${p.appliedAt || 'Recent'}</div>
                    </td>
                    <td>
                      <div style="font-weight: 700; color: var(--text-heading);">${p.type}</div>
                      <div style="font-size: 11px; color: var(--text-muted);">${p.facultyName || f.shortName} (${p.dept || f.deptCode})</div>
                    </td>
                    <td>
                      <div style="font-weight: 700; color: #0284c7;">${p.date}</div>
                      <div style="font-size: 11.5px; color: var(--text-muted);"><i class="fa-regular fa-clock"></i> ${p.timeSlot} (${p.duration})</div>
                    </td>
                    <td style="max-width: 240px; font-size: 12.5px;">
                      <div>${p.reason}</div>
                      ${p.principalRemarks ? `
                        <div style="margin-top: 4px; font-size: 11px; color: #059669; background: rgba(16,185,129,0.1); border-left: 3px solid #10B981; padding: 3px 8px; border-radius: 3px;">
                          <strong>Principal Note:</strong> ${p.principalRemarks}
                        </div>
                      ` : ''}
                    </td>
                    <td>
                      <div style="font-weight: 600; color: var(--text-heading); font-size: 12px;">${p.substitute}</div>
                      <span class="badge badge-success" style="font-size: 10px; margin-top: 2px;">✓ ${p.substituteStatus || 'Class Adjusted'}</span>
                    </td>
                    <td>
                      ${isApproved ? `
                        <span class="badge badge-success" style="padding: 6px 12px; font-weight: 700; font-size: 11.5px; display: inline-flex; align-items: center; gap: 5px;">
                          <i class="fa-solid fa-circle-check"></i> Approved by Principal
                        </span>
                        <div style="font-size: 10.5px; color: #059669; font-weight: 700; margin-top: 3px; font-family: 'JetBrains Mono';">
                          Pass: ${p.passCode || 'ALITS-OK'}
                        </div>
                      ` : isRejected ? `
                        <span class="badge" style="background: #EF4444; color: white; padding: 6px 12px; font-weight: 700; font-size: 11.5px; display: inline-flex; align-items: center; gap: 5px;">
                          <i class="fa-solid fa-circle-xmark"></i> Rejected
                        </span>
                        <div style="font-size: 10px; color: #EF4444; margin-top: 2px;">Contact Principal Office</div>
                      ` : `
                        <span class="badge badge-warning" style="padding: 6px 12px; font-weight: 700; font-size: 11.5px; display: inline-flex; align-items: center; gap: 5px;">
                          <i class="fa-solid fa-clock"></i> Pending Clearance
                        </span>
                        <div style="font-size: 10px; color: #D97706; margin-top: 2px;">Mandatory Sanction Required</div>
                      `}
                    </td>
                    <td style="text-align: right;">
                      ${isApproved ? `
                        <button class="btn-primary" style="padding: 6px 14px; font-size: 12px; font-weight: 700; background: linear-gradient(135deg, #10B981, #059669); box-shadow: 0 2px 8px rgba(16,185,129,0.3);" onclick="openPrincipalSanctionPass('${p.id}')">
                          <i class="fa-solid fa-qrcode"></i> View Gatepass
                        </button>
                      ` : isRejected ? `
                        <button class="btn-outline" style="padding: 6px 10px; font-size: 11px; opacity: 0.5; cursor: not-allowed;" disabled>
                          <i class="fa-solid fa-ban"></i> Gatepass Disallowed
                        </button>
                      ` : `
                        <div style="display: inline-flex; gap: 6px;">
                          <button class="btn-primary" style="padding: 6px 12px; font-size: 11.5px; background: #10B981; border: none; font-weight: 700; cursor: pointer;" onclick="approvePermissionAction('${p.id}')">
                            <i class="fa-solid fa-check"></i> Approve
                          </button>
                          <button class="btn-outline" style="padding: 6px 10px; font-size: 11.5px; color: #EF4444; border-color: #EF4444; font-weight: 700; cursor: pointer;" onclick="rejectPermissionAction('${p.id}')">
                            <i class="fa-solid fa-xmark"></i> Reject
                          </button>
                        </div>
                      `}
                    </td>
                  </tr>
                `;
  }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- PIPELINE SECTION 2: FORMAL LEAVE APPLICATIONS -->
    <div class="portal-card">
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span class="card-title"><i class="fa-solid fa-envelope-open-text" style="color: var(--primary);"></i> Full-Day Leave Applications & Sanction Logs (${currentFacultyLeaves.length})</span>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">Sanction status for Casual Leave, Medical Leave, and On-Duty Leave</div>
        </div>
        <button class="btn-primary" onclick="openApplyFacultyLeaveModal()"><i class="fa-solid fa-plus"></i> Apply for Leave</button>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Leave Nature</th>
                <th>From & To Dates</th>
                <th>Days Count</th>
                <th>Reason for Absence</th>
                <th>Work Adjustment Faculty</th>
                <th style="text-align: right;">Sanction Status</th>
              </tr>
            </thead>
            <tbody>
              ${currentFacultyLeaves.map(lv => {
    const isApproved = lv.status && lv.status.includes('Approved');
    const isRejected = lv.status && lv.status.includes('Rejected');
    const isPending = !isApproved && !isRejected;
    return `
                  <tr>
                    <td style="font-weight: 700; color: var(--primary); font-family: 'JetBrains Mono';">${lv.id}</td>
                    <td style="font-weight: 700; color: var(--text-heading);">${lv.type}</td>
                    <td><strong>${lv.from}</strong> to <strong>${lv.to}</strong></td>
                    <td><span class="badge badge-gold">${lv.days} Day(s)</span></td>
                    <td style="color: var(--text-main); font-size: 12.5px;">${lv.reason}</td>
                    <td style="color: var(--primary); font-weight: 600; font-size: 12.5px;">${lv.substitute}</td>
                    <td style="text-align: right;">
                      ${isPending ? `
                        <div style="display: inline-flex; gap: 6px;">
                          <button class="btn-primary" style="padding: 5px 10px; font-size: 11px; background: #10B981; border: none; font-weight: 700; cursor: pointer;" onclick="approveLeaveAction('${lv.id}')">
                            <i class="fa-solid fa-check"></i> Sanction
                          </button>
                          <button class="btn-outline" style="padding: 5px 8px; font-size: 11px; color: #EF4444; border-color: #EF4444; font-weight: 700; cursor: pointer;" onclick="rejectLeaveAction('${lv.id}')">
                            <i class="fa-solid fa-xmark"></i> Reject
                          </button>
                        </div>
                      ` : `
                        <span class="badge ${isApproved ? 'badge-success' : 'badge-warning'}" style="padding: 6px 12px; font-weight: 700; ${isRejected ? 'background: #EF4444; color: white;' : ''}">
                          ${isApproved ? '<i class="fa-solid fa-check"></i> ' : isRejected ? '<i class="fa-solid fa-xmark"></i> ' : '<i class="fa-solid fa-hourglass"></i> '}${lv.status}
                        </span>
                      `}
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

// ==========================================================================
// 2. LEAVE & PERMISSION MODULE WITH MANDATORY PRINCIPAL APPROVAL
// ==========================================================================
function renderLeavePermissionView() {
  const f = currentFaculty || FACULTY_DATABASE['AL00456'] || {
    id: 'AL00456',
    name: 'MS. A. Manjula, M.Tech, (Ph.D.)',
    shortName: 'MS. A. Manjula',
    dept: 'Computer Science & Engineering',
    deptCode: 'CSE',
    leaveBalance: { cl: 8, ml: 10, od: 6, el: 12 }
  };
  const leaveBal = (f && f.leaveBalance) ? f.leaveBalance : { cl: 8, ml: 10, od: 6, el: 12 };

  const permissions = getStoredPermissions();
  const leaves = getStoredFacultyLeaves();
  const currentFacultyPermissions = permissions.filter(p => !p.facultyId || (f && p.facultyId === f.id));
  const currentFacultyLeaves = leaves.filter(l => !l.facultyId || (f && l.facultyId === f.id));

  const pendingCount = currentFacultyPermissions.filter(p => p.status.includes('Pending')).length;

  return `
    <!-- Top Mandatory Protocol Banner -->
    <div style="background: linear-gradient(135deg, rgba(15, 61, 38, 0.95), rgba(7, 24, 15, 0.95)); border: 1.5px solid #D4AF37; border-radius: var(--radius-lg); padding: 18px 24px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 20px rgba(0,0,0,0.35); flex-wrap: wrap; gap: 14px;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <img src="../images/principal_sreenivasulu.png" alt="Principal Dr. K. Sreenivasulu" style="width: 58px; height: 58px; border-radius: 50%; object-fit: cover; border: 2.5px solid #D4AF37; box-shadow: 0 0 14px rgba(212,175,55,0.4);" />
        <div>
          <div style="font-size: 11px; font-weight: 800; color: #D4AF37; letter-spacing: 1px; text-transform: uppercase;">Institutional Executive Protocol</div>
          <div style="font-size: 16px; font-weight: 800; color: #FFFFFF; margin: 2px 0;">Mandatory Principal Approval System Enforced</div>
          <div style="font-size: 12.5px; color: #E2E8F0;">All faculty permissions, campus exits, and OD duties require explicit sanction from <strong>Dr. K. Sreenivasulu (Principal)</strong> before departure or execution.</div>
        </div>
      </div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <span style="background: ${pendingCount > 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)'}; border: 1px solid ${pendingCount > 0 ? '#EF4444' : '#10B981'}; color: ${pendingCount > 0 ? '#FCA5A5' : '#6EE7B7'}; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;">
          ${pendingCount > 0 ? `⏳ ${pendingCount} Permission(s) Awaiting Principal Approval` : '✅ All Permissions Sanctioned'}
        </span>
      </div>
    </div>

    <!-- Metric Widgets -->
    <div class="grid-4" style="margin-bottom: 20px;">
      <div class="metric-widget">
        <div class="metric-icon-box"><i class="fa-solid fa-mug-hot"></i></div>
        <div>
          <div class="metric-title">Casual Leave (CL)</div>
          <div class="metric-value" style="color: var(--primary);">${leaveBal.cl} Days</div>
          <div class="metric-sub">Available Balance</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: #3B82F6; background: #EFF6FF;"><i class="fa-solid fa-briefcase-medical"></i></div>
        <div>
          <div class="metric-title">Medical Leave (ML)</div>
          <div class="metric-value" style="color: #1E40AF;">${leaveBal.ml} Days</div>
          <div class="metric-sub">Available Balance</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--gold-dark); background: var(--gold-light);"><i class="fa-solid fa-graduation-cap"></i></div>
        <div>
          <div class="metric-title">Academic / OD</div>
          <div class="metric-value" style="color: var(--gold-dark);">${leaveBal.od} Days</div>
          <div class="metric-sub">Conference / Exam Duty</div>
        </div>
      </div>

      <div class="metric-widget">
        <div class="metric-icon-box" style="color: var(--success); background: var(--success-bg);"><i class="fa-solid fa-calendar-check"></i></div>
        <div>
          <div class="metric-title">Earned Leave (EL)</div>
          <div class="metric-value" style="color: var(--success);">${leaveBal.el} Days</div>
          <div class="metric-sub">Accumulated</div>
        </div>
      </div>
    </div>

    <!-- SECTION 1: FACULTY PERMISSION REQUESTS (MANDATORY APPROVAL) -->
    <div class="portal-card" style="margin-bottom: 24px;">
      <div class="card-header" style="background: linear-gradient(90deg, rgba(15, 61, 38, 0.08), transparent);">
        <div>
          <span class="card-title"><i class="fa-solid fa-person-walking-arrow-right" style="color: var(--primary);"></i> Campus Exit & OD Permission Requests</span>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 3px;">Mandatory clearance from Principal Dr. K. Sreenivasulu required prior to exit</div>
        </div>
        <button class="btn-primary" onclick="openRequestPermissionModal()"><i class="fa-solid fa-plus"></i> Request New Permission</button>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Permission ID</th>
                <th>Permission Type & Category</th>
                <th>Date & Time Slot</th>
                <th>Purpose / Reason</th>
                <th>Class Work Adjustment</th>
                <th>Principal Approval Status</th>
                <th style="text-align: right;">Activity Execution</th>
              </tr>
            </thead>
            <tbody>
              ${currentFacultyPermissions.length === 0 ? `
                <tr><td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">No permission requests submitted. Click "Request New Permission" above.</td></tr>
              ` : currentFacultyPermissions.map(p => {
    const isApproved = p.status.includes('Approved');
    const isRejected = p.status.includes('Rejected');
    return `
                  <tr style="${isApproved ? 'background: rgba(16, 185, 129, 0.03);' : ''}">
                    <td style="font-weight: 700; color: var(--primary); font-family: 'JetBrains Mono';">${p.id}</td>
                    <td>
                      <div style="font-weight: 700; color: var(--text-heading);">${p.type}</div>
                      <div style="font-size: 11.5px; color: var(--text-muted);">Applied: ${p.appliedAt || 'Recent'}</div>
                    </td>
                    <td>
                      <div style="font-weight: 700; color: var(--primary);">${p.date}</div>
                      <div style="font-size: 11.5px; color: var(--text-muted);"><i class="fa-regular fa-clock"></i> ${p.timeSlot} (${p.duration})</div>
                    </td>
                    <td style="max-width: 220px; font-size: 12.5px;">
                      <div>${p.reason}</div>
                      ${p.principalRemarks ? `<div style="margin-top: 4px; font-size: 11px; color: #10B981; background: rgba(16,185,129,0.1); padding: 2px 6px; border-radius: 4px;"><strong>Principal Note:</strong> ${p.principalRemarks}</div>` : ''}
                    </td>
                    <td>
                      <div style="font-weight: 600; color: var(--text-heading); font-size: 12.5px;">${p.substitute}</div>
                      <span class="badge badge-success" style="font-size: 10px;">✓ ${p.substituteStatus || 'Class Adjusted'}</span>
                    </td>
                    <td>
                      ${isApproved ? `
                        <span class="badge badge-success" style="padding: 6px 10px; font-weight: 700; font-size: 11.5px;">
                          <i class="fa-solid fa-circle-check"></i> Approved by Principal
                        </span>
                        <div style="font-size: 10px; color: #10B981; margin-top: 3px;">Sanction Code: ${p.passCode || 'ALITS-OK'}</div>
                      ` : isRejected ? `
                        <span class="badge" style="background: #EF4444; color: white; padding: 6px 10px; font-weight: 700; font-size: 11.5px;">
                          <i class="fa-solid fa-circle-xmark"></i> Rejected by Principal
                        </span>
                      ` : `
                        <span class="badge badge-warning" style="padding: 6px 10px; font-weight: 700; font-size: 11.5px; animation: pulse 2s infinite;">
                          <i class="fa-solid fa-clock"></i> Pending Principal Approval
                        </span>
                        <div style="font-size: 10px; color: #D97706; margin-top: 3px;">Awaiting Dr. K. Sreenivasulu</div>
                      `}
                    </td>
                    <td style="text-align: right;">
                      ${isApproved ? `
                        <button class="btn-primary" style="padding: 6px 12px; font-size: 12px; background: linear-gradient(135deg, #10B981, #059669);" onclick="openPrincipalSanctionPass('${p.id}')">
                          <i class="fa-solid fa-file-shield"></i> View Gatepass
                        </button>
                      ` : isRejected ? `
                        <button class="btn-outline" style="padding: 6px 10px; font-size: 11px; opacity: 0.6; cursor: not-allowed;" disabled>
                          <i class="fa-solid fa-ban"></i> Blocked
                        </button>
                      ` : `
                        <button class="btn-outline" style="padding: 6px 10px; font-size: 11.5px; color: #D97706; border-color: #F59E0B; background: rgba(245, 158, 11, 0.08); cursor: not-allowed;" title="Cannot proceed until Principal approves from Main Dashboard">
                          <i class="fa-solid fa-lock"></i> Locked Pending Approval
                        </button>
                      `}
                    </td>
                  </tr>
                `;
  }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- SECTION 2: FULL-DAY LEAVE APPLICATIONS & SANCTION LOGS -->
    <div class="portal-card">
      <div class="card-header">
        <div>
          <span class="card-title"><i class="fa-solid fa-envelope-open-text" style="color: var(--primary);"></i> Faculty Leave Applications (CL / ML / EL)</span>
          <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 3px;">Formal leave applications submitted for sanction</div>
        </div>
        <button class="btn-primary" onclick="openApplyFacultyLeaveModal()"><i class="fa-solid fa-plus"></i> Apply for Leave</button>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Leave ID</th>
                <th>Leave Type</th>
                <th>Dates & Duration</th>
                <th>Reason for Leave</th>
                <th>Work Adjustment Faculty</th>
                <th style="text-align: right;">Sanction Status</th>
              </tr>
            </thead>
            <tbody>
              ${currentFacultyLeaves.map(lv => `
                <tr>
                  <td style="font-weight: 700; color: var(--primary); font-family: 'JetBrains Mono';">${lv.id}</td>
                  <td style="font-weight: 700; color: var(--text-heading);">${lv.type}</td>
                  <td>
                    <div><strong>${lv.from}</strong> to <strong>${lv.to}</strong></div>
                    <div style="font-size: 11.5px; color: var(--text-muted);">${lv.days} Day(s)</div>
                  </td>
                  <td style="color: var(--text-main); font-size: 12.5px;">${lv.reason}</td>
                  <td style="color: var(--primary); font-weight: 600; font-size: 12.5px;">${lv.substitute}</td>
                  <td style="text-align: right;">
                    <span class="badge ${lv.status.includes('Approved') ? 'badge-success' : 'badge-warning'}">
                      ${lv.status}
                    </span>
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

// Request Permission Modal
function openRequestPermissionModal() {
  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  const todayStr = new Date().toISOString().split('T')[0];

  title.textContent = 'Submit Permission Request to Principal';
  body.innerHTML = `
    <form onsubmit="handleFacultyPermissionSubmit(event)">
      <div style="background: rgba(15, 61, 38, 0.08); border-left: 4px solid var(--primary); padding: 10px 14px; border-radius: 6px; margin-bottom: 16px; font-size: 12.5px; color: var(--text-heading);">
        <i class="fa-solid fa-circle-info" style="color: var(--primary);"></i> 
        <strong>Mandatory Protocol:</strong> This request will appear immediately in Principal <strong>Dr. K. Sreenivasulu's</strong> Approval Hub on the Main Dashboard. You may proceed only after clearance is granted.
      </div>

      <div class="form-group">
        <label class="form-label">Permission Nature / Type</label>
        <select class="form-select" id="facPermType" required>
          <option value="Campus Exit / Short Permission (2 Hours)">Campus Exit / Short Permission (2 Hours)</option>
          <option value="On-Duty (OD) Research & Exam Duty">On-Duty (OD) Research & Exam Duty</option>
          <option value="University JNTUA Official Duty">University JNTUA Official Duty</option>
          <option value="Lab Equipment & Vendor Inspection">Lab Equipment & Vendor Inspection</option>
          <option value="Emergency Medical / Personal Exit">Emergency Medical / Personal Exit</option>
        </select>
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Date of Permission</label>
          <input type="date" class="form-input" id="facPermDate" value="${todayStr}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Time Window (Slot)</label>
          <input type="text" class="form-input" id="facPermTimeSlot" placeholder="e.g. 02:00 PM - 04:00 PM" required />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Class Work Adjustment (Alternative Faculty)</label>
        <select class="form-select" id="facPermSubstitute" required>
          <option value="Mrs. G. Roja Ramani (Assistant Professor - CSE)">Mrs. G. Roja Ramani (Assistant Professor - CSE)</option>
          <option value="Sri K. Ramesh (Associate Professor - CSE)">Sri K. Ramesh (Associate Professor - CSE)</option>
          <option value="Mr. B. Vijaya Bhaskar Reddy (Assistant Professor - CSE)">Mr. B. Vijaya Bhaskar Reddy (Assistant Professor - CSE)</option>
          <option value="Dr. B. V. Ramanappa (Professor & HoD - CSE)">Dr. B. V. Ramanappa (Professor & HoD - CSE)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Detailed Official Reason for Permission</label>
        <textarea class="form-textarea" rows="3" id="facPermReason" required placeholder="State comprehensive reason, destination, and expected return time..."></textarea>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
        <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #0F3D26 0%, #11998e 100%);"><i class="fa-solid fa-paper-plane"></i> Submit to Principal for Mandatory Approval</button>
      </div>
    </form>
  `;
  modal.classList.add('active');
}

function handleFacultyPermissionSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('facPermType').value;
  const date = document.getElementById('facPermDate').value;
  const timeSlot = document.getElementById('facPermTimeSlot').value;
  const substitute = document.getElementById('facPermSubstitute').value;
  const reason = document.getElementById('facPermReason').value;

  const permissions = getStoredPermissions();
  const nextId = `PRM-${Math.floor(100 + Math.random() * 899)}`;

  const newPerm = {
    id: nextId,
    facultyId: currentFaculty.id,
    facultyName: currentFaculty.shortName || currentFaculty.name,
    dept: currentFaculty.dept,
    type,
    date,
    timeSlot,
    duration: type.includes('2 Hours') ? '2 Hours' : 'Full Day',
    reason,
    substitute,
    substituteStatus: 'Class Adjusted',
    status: 'Pending Principal Approval',
    appliedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    approvedBy: null,
    approvedAt: null,
    principalRemarks: '',
    passCode: `ALITS-PRIN-${nextId}`
  };

  permissions.unshift(newPerm);
  saveStoredPermissions(permissions);

  closeFacultyModal();
  showToast(`✓ Permission request ${nextId} sent to Principal Dr. K. Sreenivasulu! Awaiting mandatory clearance.`);
  switchFacultyTab(currentFacultyTab === 'approvals' ? 'approvals' : 'leaves');
}

// Modal: Official Principal Approved Gate Pass / Sanction Pass
function openPrincipalSanctionPass(permId) {
  const permissions = getStoredPermissions();
  const p = permissions.find(x => x.id === permId);
  if (!p) return;

  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.textContent = `Official Principal Gate Pass & Sanction Order - ${p.id}`;
  body.innerHTML = `
    <div style="border: 2px solid #D4AF37; border-radius: 10px; padding: 24px; background: #FAFAFA; font-family: 'Plus Jakarta Sans', sans-serif; color: #1e293b; position: relative;">
      
      <!-- Top Crest & Header -->
      <div style="text-align: center; border-bottom: 2px solid #0F3D26; padding-bottom: 14px; margin-bottom: 16px;">
        <img src="../images/alits_college_crest_logo.png" alt="ALITS Crest" style="height: 48px; margin-bottom: 6px;" />
        <div style="font-size: 15px; font-weight: 800; color: #0F3D26; text-transform: uppercase; letter-spacing: 0.5px;">Anantha Lakshmi Institute of Technology & Sciences</div>
        <div style="font-size: 11px; color: #64748b; font-weight: 600;">AUTONOMOUS • Near Itikalapalli, Anantapur - Chennai Highway, AP - 515721</div>
        <div style="display: inline-block; background: #0F3D26; color: #D4AF37; padding: 3px 14px; font-size: 11px; font-weight: 800; border-radius: 4px; margin-top: 6px; letter-spacing: 1px;">
          OFFICIAL FACULTY PERMISSION & CAMPUS EXIT SANCTION PASS
        </div>
      </div>

      <!-- Watermark Stamp -->
      <div style="position: absolute; right: 28px; top: 120px; border: 2px dashed #10B981; border-radius: 8px; padding: 8px 12px; text-align: center; transform: rotate(-5deg); background: rgba(16, 185, 129, 0.06);">
        <div style="font-size: 11px; font-weight: 800; color: #10B981;">SANCTIONED & APPROVED</div>
        <div style="font-size: 9.5px; color: #059669; font-weight: 700;">PRINCIPAL'S DIRECTORATE</div>
        <div style="font-size: 9px; color: #64748b;">${p.approvedAt || '21-Sep-2026'}</div>
      </div>

      <!-- Pass Details Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12.5px; margin-bottom: 16px;">
        <div><strong>Pass Identifier:</strong> <span style="font-family: 'JetBrains Mono'; font-weight: 700; color: #0F3D26;">${p.passCode || p.id}</span></div>
        <div><strong>Date of Permission:</strong> <span style="font-weight: 700; color: #0F3D26;">${p.date}</span></div>
        <div><strong>Faculty Name:</strong> ${p.facultyName}</div>
        <div><strong>Department:</strong> ${p.dept}</div>
        <div><strong>Allowed Time Slot:</strong> <span style="font-weight: 700; color: #d97706;">${p.timeSlot} (${p.duration})</span></div>
        <div><strong>Class Adjustment:</strong> ${p.substitute}</div>
        <div style="grid-column: 1 / -1;"><strong>Sanctioned Reason:</strong> ${p.reason}</div>
        ${p.principalRemarks ? `<div style="grid-column: 1 / -1; background: #EFF6FF; border: 1px solid #BFDBFE; padding: 6px 10px; border-radius: 4px;"><strong>Principal's Executive Endorsement:</strong> ${p.principalRemarks}</div>` : ''}
      </div>

      <!-- Security QR & Principal Signature -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px dashed #CBD5E1; padding-top: 14px; margin-top: 12px;">
        <div style="text-align: center;">
          <div style="width: 70px; height: 70px; background: #0F3D26; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; border-radius: 6px;">
            <i class="fa-solid fa-qrcode"></i>
          </div>
          <div style="font-size: 9.5px; color: #64748b; margin-top: 4px;">Security Gate QR</div>
        </div>

        <div style="text-align: right;">
          <img src="../images/principal_sreenivasulu.png" alt="Principal" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #0F3D26; margin-bottom: 2px;" />
          <div style="font-size: 13px; font-weight: 800; color: #0F3D26;">Dr. K. Sreenivasulu</div>
          <div style="font-size: 10.5px; color: #475569; font-weight: 600;">Principal & Chief Controller of Examinations</div>
          <div style="font-size: 9.5px; color: #D4AF37; font-weight: 700;">ALITS Executive Directorate</div>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px;">
      <button type="button" class="btn-outline" onclick="closeFacultyModal()">Close</button>
      <button type="button" class="btn-primary" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Official Gatepass</button>
    </div>
  `;
  modal.classList.add('active');
}

function openApplyFacultyLeaveModal() {
  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.textContent = 'Submit Faculty Leave Application to Principal';
  body.innerHTML = `
    <form onsubmit="handleFacultyLeaveSubmit(event)">
      <div class="form-group">
        <label class="form-label">Leave Nature / Type</label>
        <select class="form-select" id="facLeaveType" required>
          <option value="Casual Leave (CL)">Casual Leave (CL)</option>
          <option value="Medical Leave (ML)">Medical Leave (ML)</option>
          <option value="On-Duty / Academic Leave (OD)">On-Duty / Academic Leave (OD)</option>
          <option value="Earned Leave (EL)">Earned Leave (EL)</option>
        </select>
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">From Date</label>
          <input type="date" class="form-input" id="facLeaveFrom" required />
        </div>
        <div class="form-group">
          <label class="form-label">To Date</label>
          <input type="date" class="form-input" id="facLeaveTo" required />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Class Work Adjustment (Alternative Faculty)</label>
        <select class="form-select" id="facLeaveSub" required>
          <option value="Mrs. G. Roja Ramani (Assistant Professor - CSE)">Mrs. G. Roja Ramani (Assistant Professor - CSE)</option>
          <option value="Sri K. Ramesh (Associate Professor - CSE)">Sri K. Ramesh (Associate Professor - CSE)</option>
          <option value="Mr. B. Vijaya Bhaskar Reddy (Assistant Professor - CSE)">Mr. B. Vijaya Bhaskar Reddy (Assistant Professor - CSE)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Detailed Reason for Absence</label>
        <textarea class="form-textarea" rows="3" id="facLeaveReason" required placeholder="State comprehensive reason for leave..."></textarea>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-paper-plane"></i> Submit to Principal</button>
      </div>
    </form>
  `;
  modal.classList.add('active');
}

function handleFacultyLeaveSubmit(e) {
  e.preventDefault();
  const type = document.getElementById('facLeaveType').value;
  const from = document.getElementById('facLeaveFrom').value;
  const to = document.getElementById('facLeaveTo').value;
  const sub = document.getElementById('facLeaveSub').value;
  const reason = document.getElementById('facLeaveReason').value;

  const newLeave = {
    id: `LV-${Math.floor(800 + Math.random() * 199)}`,
    facultyId: currentFaculty.id,
    facultyName: currentFaculty.shortName || currentFaculty.name,
    type,
    from,
    to,
    days: 1,
    reason,
    substitute: sub,
    status: 'Pending Principal Review',
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  FACULTY_LEAVES.unshift(newLeave);
  saveStoredFacultyLeaves(FACULTY_LEAVES);
  closeFacultyModal();
  showToast('✓ Leave application sent to Principal Dr. K. Sreenivasulu for approval!');
  switchFacultyTab(currentFacultyTab === 'approvals' ? 'approvals' : 'leaves');
}

// ==========================================================================
// 3. ASSIGNMENTS MANAGEMENT (WITH ADD AND EDIT)
// ==========================================================================
function renderAssignmentsManagerView() {
  const asgs = getStoredAssignments();

  return `
    <div class="portal-card">
      <div class="card-header">
        <span class="card-title"><i class="fa-solid fa-list-check" style="color: var(--primary);"></i> Manage Course Assignments (${asgs.length} Total)</span>
        <button class="btn-primary" onclick="openAddAssignmentModal()"><i class="fa-solid fa-plus"></i> Add New Assignment</button>
      </div>
      <div class="card-body" style="padding: 0;">
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Assignment Title & Subject</th>
                <th>Target Class</th>
                <th style="text-align: center;">Due Date</th>
                <th style="text-align: center;">Max Marks</th>
                <th style="text-align: center;">Submissions</th>
                <th style="text-align: center;">Status</th>
                <th style="text-align: right;">Actions (Add / Edit)</th>
              </tr>
            </thead>
            <tbody>
              ${asgs.map(asg => `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: var(--text-heading); font-size: 14px;">${asg.title}</div>
                    <div style="font-size: 12px; color: var(--gold-dark); font-weight: 600;">${asg.subject} (${asg.subjectCode || '24A502'})</div>
                    <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">${asg.instructions}</div>
                  </td>
                  <td><span class="badge badge-gold">${asg.class || 'III B.Tech CSE'}</span></td>
                  <td style="text-align: center; font-weight: 700; color: var(--danger);">${asg.dueDate}</td>
                  <td style="text-align: center; font-weight: 700; color: var(--primary);">${asg.maxMarks} M</td>
                  <td style="text-align: center;">
                    <div style="font-weight: 700; color: var(--primary);">${asg.submissionsCount || 48} / ${asg.totalStudents || 64}</div>
                    <button class="btn-outline" style="padding: 2px 8px; font-size: 11px; margin-top: 4px;" onclick="viewAssignmentSubmissions('${asg.id}', '${asg.title}')">View All</button>
                  </td>
                  <td style="text-align: center;">
                    <span class="badge ${asg.status === 'Active' ? 'badge-success' : 'badge-warning'}">${asg.status}</span>
                  </td>
                  <td style="text-align: right;">
                    <div style="display: inline-flex; gap: 6px;">
                      <button class="btn-primary" style="padding: 4px 10px; font-size: 12px;" onclick="openEditAssignmentModal('${asg.id}')">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                      <button class="btn-danger" style="padding: 4px 8px; font-size: 12px;" onclick="deleteAssignment('${asg.id}')" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
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

function openAddAssignmentModal() {
  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.textContent = 'Add New Course Assignment';
  body.innerHTML = `
    <form onsubmit="handleSaveAssignmentSubmit(event, 'NEW')">
      <div class="form-group">
        <label class="form-label">Assignment Title</label>
        <input type="text" class="form-input" id="asgTitleInput" required placeholder="e.g. Relational Calculus & Complex SQL Queries" />
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Course / Subject</label>
          <select class="form-select" id="asgSubjectInput">
            <option value="Database Management Systems">Database Management Systems (24A502)</option>
            <option value="Web Application Development">Web Application Development (24A504)</option>
            <option value="DBMS & Advanced SQL Laboratory">DBMS & SQL Lab (24A506L)</option>
            <option value="Full-Stack Web Technologies Lab">Full-Stack Lab (24A507L)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Target Class & Section</label>
          <select class="form-select" id="asgClassInput">
            <option value="III B.Tech I Sem (CSE-D)">III B.Tech I Sem (CSE-D)</option>
            <option value="III B.Tech I Sem (CSE-A)">III B.Tech I Sem (CSE-A)</option>
            <option value="III B.Tech I Sem (CSE-B)">III B.Tech I Sem (CSE-B)</option>
          </select>
        </div>
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Submission Due Date</label>
          <input type="date" class="form-input" id="asgDueDateInput" required />
        </div>
        <div class="form-group">
          <label class="form-label">Maximum Marks</label>
          <input type="number" class="form-input" id="asgMarksInput" value="20" min="5" max="50" required />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Assignment Instructions & Problem Statement</label>
        <textarea class="form-textarea" rows="3" id="asgInstructionsInput" required placeholder="Describe problem statement and expected submission deliverables..."></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Attach Reference Specification (PDF / Document Link)</label>
        <input type="text" class="form-input" id="asgAttachmentInput" placeholder="e.g. Assignment_Spec_ProblemSet.pdf" />
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-floppy-disk"></i> Publish Assignment</button>
      </div>
    </form>
  `;
  modal.classList.add('active');
}

function openEditAssignmentModal(asgId) {
  const asgs = getStoredAssignments();
  const asg = asgs.find(a => a.id === asgId);
  if (!asg) return;

  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.textContent = `Edit Assignment: ${asg.id}`;
  body.innerHTML = `
    <form onsubmit="handleSaveAssignmentSubmit(event, '${asg.id}')">
      <div class="form-group">
        <label class="form-label">Assignment Title</label>
        <input type="text" class="form-input" id="asgTitleInput" required value="${asg.title}" />
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Course / Subject</label>
          <select class="form-select" id="asgSubjectInput">
            <option value="Database Management Systems" ${asg.subject.includes('Database') ? 'selected' : ''}>Database Management Systems (24A502)</option>
            <option value="Web Application Development" ${asg.subject.includes('Web') ? 'selected' : ''}>Web Application Development (24A504)</option>
            <option value="DBMS & Advanced SQL Laboratory" ${asg.subject.includes('DBMS &') ? 'selected' : ''}>DBMS & SQL Lab (24A506L)</option>
            <option value="Full-Stack Web Technologies Lab" ${asg.subject.includes('Full-Stack') ? 'selected' : ''}>Full-Stack Lab (24A507L)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Target Class & Section</label>
          <select class="form-select" id="asgClassInput">
            <option value="III B.Tech I Sem (CSE-D)">III B.Tech I Sem (CSE-D)</option>
            <option value="III B.Tech I Sem (CSE-A)">III B.Tech I Sem (CSE-A)</option>
            <option value="III B.Tech I Sem (CSE-B)">III B.Tech I Sem (CSE-B)</option>
          </select>
        </div>
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Submission Due Date</label>
          <input type="date" class="form-input" id="asgDueDateInput" value="${asg.dueDate}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Maximum Marks</label>
          <input type="number" class="form-input" id="asgMarksInput" value="${asg.maxMarks}" min="5" max="50" required />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Assignment Instructions & Problem Statement</label>
        <textarea class="form-textarea" rows="3" id="asgInstructionsInput" required>${asg.instructions}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="asgStatusInput">
          <option value="Active" ${asg.status === 'Active' ? 'selected' : ''}>Active (Open for Submissions)</option>
          <option value="Closed" ${asg.status === 'Closed' ? 'selected' : ''}>Closed (Evaluation Phase)</option>
          <option value="Draft" ${asg.status === 'Draft' ? 'selected' : ''}>Draft</option>
        </select>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-floppy-disk"></i> Update Assignment</button>
      </div>
    </form>
  `;
  modal.classList.add('active');
}

function handleSaveAssignmentSubmit(e, mode) {
  e.preventDefault();
  const asgs = getStoredAssignments();
  const title = document.getElementById('asgTitleInput').value.trim();
  const subject = document.getElementById('asgSubjectInput').value;
  const targetClass = document.getElementById('asgClassInput').value;
  const dueDate = document.getElementById('asgDueDateInput').value;
  const maxMarks = parseInt(document.getElementById('asgMarksInput').value, 10);
  const instructions = document.getElementById('asgInstructionsInput').value.trim();
  const status = document.getElementById('asgStatusInput')?.value || 'Active';

  if (mode === 'NEW') {
    const newAsg = {
      id: `ASG-${Math.floor(100 + Math.random() * 899)}`,
      title,
      subject,
      subjectCode: subject.includes('Database') ? '24A502' : '24A504',
      class: targetClass,
      dueDate,
      maxMarks,
      instructions,
      status,
      faculty: currentFaculty.shortName,
      submissionsCount: 0,
      totalStudents: 64
    };
    asgs.unshift(newAsg);
    showToast(`✓ New assignment "${title}" published and synced to student portals!`);
  } else {
    const idx = asgs.findIndex(a => a.id === mode);
    if (idx !== -1) {
      asgs[idx] = {
        ...asgs[idx],
        title,
        subject,
        class: targetClass,
        dueDate,
        maxMarks,
        instructions,
        status
      };
      showToast(`✓ Assignment "${title}" updated successfully!`);
    }
  }

  saveStoredAssignments(asgs);
  closeFacultyModal();
  switchFacultyTab('assignments');
}

function deleteAssignment(asgId) {
  if (confirm('Are you sure you want to delete this assignment?')) {
    let asgs = getStoredAssignments();
    asgs = asgs.filter(a => a.id !== asgId);
    saveStoredAssignments(asgs);
    showToast('Assignment deleted.');
    switchFacultyTab('assignments');
  }
}

function viewAssignmentSubmissions(asgId, title) {
  const modal = document.getElementById('facultyModal');
  const mTitle = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  const allStudents = getCentralStudents();
  const cseStudents = allStudents.filter(s => {
    const d = (s.dept || s.branch || '').toUpperCase();
    const sec = (s.section || s.sec || '').toUpperCase();
    return (d.includes('CSE') || (s.rollNo || '').includes('1A05'));
  }).slice(0, 10);

  const subList = (facultyState.submittedAssignments || []).filter(s => s.assignmentId === asgId);

  mTitle.textContent = `Student Submissions & Evaluation: ${title}`;
  body.innerHTML = `
    <div style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
      <span class="badge badge-success" style="padding: 6px 12px; font-size: 12px;">
        <i class="fa-solid fa-circle-check"></i> ${subList.length > 0 ? subList.length : 48} Submissions Received
      </span>
      <button class="btn-primary" onclick="showToast('✓ Grade report exported successfully!');"><i class="fa-solid fa-file-excel"></i> Export Grades</button>
    </div>
    <div class="table-responsive" style="max-height: 360px; overflow-y: auto;">
      <table class="custom-table" style="font-size: 12.5px;">
        <thead>
          <tr>
            <th style="width: 50px;">S.No</th>
            <th>Roll No</th>
            <th>Student Full Name</th>
            <th>Submission Status</th>
            <th style="text-align: center;">Score (Max 20M)</th>
            <th style="text-align: right;">Evaluation Action</th>
          </tr>
        </thead>
        <tbody>
          ${cseStudents.map((std, idx) => {
            const roll = std.rollNo || std.roll;
            const existingSub = subList.find(s => (s.rollNo || '').toUpperCase() === roll.toUpperCase());
            const score = existingSub?.score || (idx % 3 === 0 ? 19 : (idx % 2 === 0 ? 18 : 20));
            const subDate = existingSub?.submittedAt || '24-Sep-2026, 11:30 AM';
            return `
              <tr>
                <td style="color: var(--text-muted); font-weight: 600;">${idx + 1}</td>
                <td style="font-weight: 700; color: var(--primary); font-family: 'JetBrains Mono';">${roll}</td>
                <td><div style="font-weight: 600; color: var(--text-heading);">${std.name}</div><div style="font-size: 11px; color: var(--text-muted);">${subDate}</div></td>
                <td><span class="badge badge-success" style="font-size: 10.5px;"><i class="fa-solid fa-check"></i> Submitted</span></td>
                <td style="text-align: center;">
                  <input type="number" id="subScore-${roll}" value="${score}" min="0" max="20" style="width: 55px; padding: 4px 6px; border: 1px solid var(--border-color); border-radius: 4px; text-align: center; font-weight: 700; color: var(--primary);" />
                </td>
                <td style="text-align: right;">
                  <button class="btn-outline" style="padding: 3px 8px; font-size: 11px; color: var(--success); border-color: var(--success);" onclick="showToast('✓ Marks awarded to ${roll}!')">
                    <i class="fa-solid fa-check"></i> Grade
                  </button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px;">
      <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
      <button class="btn-primary" onclick="showToast('✓ Grades saved and broadcast to student grade cards!'); closeFacultyModal();">
        <i class="fa-solid fa-floppy-disk"></i> Save & Publish All Grades
      </button>
    </div>
  `;
  modal.classList.add('active');
}

// ==========================================================================
// 4. SUBJECT NOTES MANAGEMENT (WITH ADD AND EDIT)
// ==========================================================================
function renderSubjectNotesManagerView() {
  const notes = getStoredNotes();

  return `
    <div class="portal-card">
      <div class="card-header">
        <span class="card-title"><i class="fa-solid fa-book-open-reader" style="color: var(--primary);"></i> Subject Lecture Notes & Course Resources (${notes.length} Files)</span>
        <button class="btn-primary" onclick="openAddNoteModal()"><i class="fa-solid fa-cloud-arrow-up"></i> Upload New Subject Notes</button>
      </div>
      <div class="card-body">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;">
          ${notes.map(note => `
            <div style="background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                  <span class="badge badge-gold">${note.subject}</span>
                  <span style="font-size: 11.5px; color: var(--text-muted);">${note.date}</span>
                </div>
                <h4 style="font-size: 14.5px; font-weight: 700; color: var(--text-heading); margin-bottom: 4px;">${note.title}</h4>
                <div style="font-size: 12.5px; color: var(--gold-dark); font-weight: 600; margin-bottom: 6px;">${note.unit}</div>
                <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4; margin-bottom: 0;">${note.description}</p>
              </div>

              <div style="border-top: 1px solid var(--border); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 11.5px; color: var(--text-muted); font-family: 'JetBrains Mono';">
                  <i class="fa-solid fa-file-pdf" style="color: var(--danger);"></i> ${note.file}
                </div>
                <div style="display: flex; gap: 6px;">
                  <button class="btn-primary" style="padding: 4px 8px; font-size: 11.5px;" onclick="openEditNoteModal('${note.id}')" title="Edit Note">
                    <i class="fa-solid fa-pen"></i> Edit
                  </button>
                  <button class="btn-danger" style="padding: 4px 8px; font-size: 11.5px;" onclick="deleteNote('${note.id}')" title="Delete Note">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function openAddNoteModal() {
  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.textContent = 'Upload New Subject Notes';
  body.innerHTML = `
    <form onsubmit="handleSaveNoteSubmit(event, 'NEW')">
      <div class="form-group">
        <label class="form-label">Subject / Course</label>
        <select class="form-select" id="noteSubjectInput">
          <option value="Database Management Systems">Database Management Systems (24A502)</option>
          <option value="Web Application Development">Web Application Development (24A504)</option>
          <option value="Design and Analysis of Algorithms">Design and Analysis of Algorithms (24A501)</option>
          <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning (24A503)</option>
        </select>
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Unit Number</label>
          <select class="form-select" id="noteUnitInput">
            <option value="Unit 1: Fundamentals & Architecture">Unit 1: Fundamentals & Architecture</option>
            <option value="Unit 2: Core Concepts & Algorithms">Unit 2: Core Concepts & Algorithms</option>
            <option value="Unit 3: Advanced Topics & Normalization">Unit 3: Advanced Topics & Normalization</option>
            <option value="Unit 4: Integration & Server Technologies">Unit 4: Integration & Server Technologies</option>
            <option value="Unit 5: Applications & Case Studies">Unit 5: Applications & Case Studies</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Lecture Topic / Chapter Title</label>
          <input type="text" class="form-input" id="noteTitleInput" required placeholder="e.g. Transaction ACID Properties & Concurrency Control" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Summary / Description of Content</label>
        <textarea class="form-textarea" rows="3" id="noteDescInput" required placeholder="Provide brief outline of concepts, proofs, and examples included in this material..."></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Upload Note File / Document Link</label>
        <input type="text" class="form-input" id="noteFileInput" placeholder="e.g. DBMS_Unit3_Transactions_LectureNotes.pdf" required />
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-cloud-arrow-up"></i> Publish Notes</button>
      </div>
    </form>
  `;
  modal.classList.add('active');
}

function openEditNoteModal(noteId) {
  const notes = getStoredNotes();
  const note = notes.find(n => n.id === noteId);
  if (!note) return;

  const modal = document.getElementById('facultyModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  title.textContent = `Edit Subject Notes: ${note.title}`;
  body.innerHTML = `
    <form onsubmit="handleSaveNoteSubmit(event, '${note.id}')">
      <div class="form-group">
        <label class="form-label">Subject / Course</label>
        <select class="form-select" id="noteSubjectInput">
          <option value="Database Management Systems" ${note.subject.includes('Database') ? 'selected' : ''}>Database Management Systems (24A502)</option>
          <option value="Web Application Development" ${note.subject.includes('Web') ? 'selected' : ''}>Web Application Development (24A504)</option>
          <option value="Design and Analysis of Algorithms" ${note.subject.includes('Algorithms') ? 'selected' : ''}>Design and Analysis of Algorithms (24A501)</option>
          <option value="Artificial Intelligence & Machine Learning" ${note.subject.includes('Artificial') ? 'selected' : ''}>Artificial Intelligence & Machine Learning (24A503)</option>
        </select>
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="form-group">
          <label class="form-label">Unit Number</label>
          <input type="text" class="form-input" id="noteUnitInput" value="${note.unit}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Lecture Topic / Chapter Title</label>
          <input type="text" class="form-input" id="noteTitleInput" value="${note.title}" required />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Summary / Description of Content</label>
        <textarea class="form-textarea" rows="3" id="noteDescInput" required>${note.description}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Note File Name / Document Link</label>
        <input type="text" class="form-input" id="noteFileInput" value="${note.file}" required />
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px;">
        <button type="button" class="btn-outline" onclick="closeFacultyModal()">Cancel</button>
        <button type="submit" class="btn-primary"><i class="fa-solid fa-floppy-disk"></i> Update Notes</button>
      </div>
    </form>
  `;
  modal.classList.add('active');
}

function handleSaveNoteSubmit(e, mode) {
  e.preventDefault();
  const notes = getStoredNotes();
  const subject = document.getElementById('noteSubjectInput').value;
  const unit = document.getElementById('noteUnitInput').value;
  const title = document.getElementById('noteTitleInput').value.trim();
  const description = document.getElementById('noteDescInput').value.trim();
  const file = document.getElementById('noteFileInput').value.trim();

  if (mode === 'NEW') {
    const newNote = {
      id: `NOTE-${Math.floor(10 + Math.random() * 89)}`,
      subject,
      subjectCode: subject.includes('Database') ? '24A502' : '24A504',
      unit,
      title,
      description,
      file,
      link: '#',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      faculty: currentFaculty.shortName,
      downloads: 0
    };
    notes.unshift(newNote);
    showToast(`✓ Subject notes for "${title}" published and accessible to students!`);
  } else {
    const idx = notes.findIndex(n => n.id === mode);
    if (idx !== -1) {
      notes[idx] = {
        ...notes[idx],
        subject,
        unit,
        title,
        description,
        file
      };
      showToast(`✓ Subject notes "${title}" updated successfully!`);
    }
  }

  saveStoredNotes(notes);
  closeFacultyModal();
  switchFacultyTab('notes');
}

function deleteNote(noteId) {
  if (confirm('Are you sure you want to delete this subject note?')) {
    let notes = getStoredNotes();
    notes = notes.filter(n => n.id !== noteId);
    saveStoredNotes(notes);
    showToast('Subject note deleted.');
    switchFacultyTab('notes');
  }
}

// ==========================================================================
// 5. TIMETABLE VIEW
// ==========================================================================
function renderFacultyTimetableView() {
  const f = currentFaculty;

  return `
    <!-- Master Class Timetable (Class In-Charge: MS. A. Manjula) -->
    <div class="portal-card" style="margin-bottom: 24px;">
      <div class="card-header" style="flex-direction: column; align-items: flex-start; gap: 8px; border-bottom: 2px solid rgba(212, 175, 55, 0.4); background: linear-gradient(135deg, rgba(19, 57, 38, 0.4) 0%, rgba(30, 77, 53, 0.2) 100%);">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="../images/alits_college_crest_logo.png" alt="ALITS Logo" style="height: 38px; width: 38px; object-fit: contain;" onerror="this.src='../assets/alits_logo.png'" />
            <div>
              <span class="card-title" style="font-size: 16px; color: #D4AF37; letter-spacing: 0.5px;"><i class="fa-solid fa-calendar-week"></i> III Year I Sem :: Master Class Timetable (CSE-D)</span>
              <div style="font-size: 12px; color: var(--text-muted);">Autonomous R24 Regulations · 2024 Batch · Academic Year: 2026-27</div>
            </div>
          </div>
          <span class="badge badge-gold" style="padding: 6px 14px; font-size: 12px;"><i class="fa-solid fa-user-tie"></i> Class In-Charge: MS. A. MANJULA</span>
        </div>
      </div>
      <div class="card-body" style="padding: 16px;">
        <div class="table-responsive timetable-wrapper">
          <table class="timetable-grid-table">
            <thead>
              <tr>
                <th style="width: 85px;">Day</th>
                <th>P1<br><span style="font-size: 10px; font-weight: normal; color: #e2e8f0;">09:00 - 10:10</span></th>
                <th style="width: 44px; font-size: 9.5px; color: #cbd5e1; background: linear-gradient(180deg, #1e293b, #0f172a) !important;">10:10<br>10:25</th>
                <th>P2<br><span style="font-size: 10px; font-weight: normal; color: #e2e8f0;">10:25 - 11:30</span></th>
                <th>P3<br><span style="font-size: 10px; font-weight: normal; color: #e2e8f0;">11:30 - 12:30</span></th>
                <th style="width: 48px; font-size: 9.5px; color: #fbbf24; background: linear-gradient(180deg, #2a2114, #141e18) !important;">12:30<br>01:15</th>
                <th>P4<br><span style="font-size: 10px; font-weight: normal; color: #e2e8f0;">01:15 - 02:15</span></th>
                <th>P5<br><span style="font-size: 10px; font-weight: normal; color: #e2e8f0;">02:15 - 03:15</span></th>
                <th>P6<br><span style="font-size: 10px; font-weight: normal; color: #e2e8f0;">03:15 - 04:00</span></th>
              </tr>
            </thead>
            <tbody>
              <!-- MON -->
              <tr>
                <td class="tt-day">Mon</td>
                <td class="tt-subject-iqta"><strong>IQTA</strong><br><small>Room 220</small></td>
                <td rowspan="3" class="tt-break" style="width: 30px; z-index: 1;">BREAK</td>
                <td class="tt-subject-iqta"><strong>IQTA</strong><br><small>Room 220</small></td>
                <td class="tt-subject-ooad"><strong>OOAD</strong><br><small>Room 220</small></td>
                <td rowspan="6" class="tt-lunch" style="width: 30px; z-index: 1;">LUNCH BREAK</td>
                <td class="tt-subject-atcd" style="border: 2px solid rgba(74, 222, 128, 0.6) !important;"><strong>ATCD</strong><br><small>MS. Manjula</small></td>
                <td class="tt-subject-ai"><strong>AI</strong><br><small>Room 220</small></td>
                <td class="tt-subject-lib"><strong>LIB</strong><br><small>Library</small></td>
              </tr>

              <!-- TUE -->
              <tr>
                <td class="tt-day">Tue</td>
                <td class="tt-subject-cnip"><strong>CNIP</strong><br><small>Room 111</small></td>
                <td class="tt-subject-ooad"><strong>OOAD</strong><br><small>Room 111</small></td>
                <td class="tt-subject-sh"><strong>SH / SII</strong><br><small>Room 111</small></td>
                <td colspan="3" class="lab-block" style="background: #f59e0b; color: #111827 !important; border: 2px solid #000;">
                  <strong style="font-weight: 800; color: #111827 !important;">ARTIFICIAL INTELLIGENCE LAB (AI LAB)</strong><br>
                  <small style="color: #1f2937 !important; font-weight: 700;">LAB 4 (01:15 - 04:00) · Ms. C. Sravani</small>
                </td>
              </tr>

              <!-- WED -->
              <tr>
                <td class="tt-day">Wed</td>
                <td class="tt-subject-ai"><strong>AI</strong><br><small>Room 220</small></td>
                <td class="tt-subject-gb"><strong>GB</strong><br><small>Room 220</small></td>
                <td class="tt-subject-ooad"><strong>OOAD</strong><br><small>Room 220</small></td>
                <td class="tt-subject-ai"><strong>AI</strong><br><small>Room 220</small></td>
                <td class="tt-subject-atcd" style="border: 2px solid rgba(74, 222, 128, 0.6) !important;"><strong>ATCD</strong><br><small>Room 220 · MS. Manjula</small></td>
                <td class="tt-subject-cnip"><strong>CNIP</strong><br><small>Mr. Rajesh</small></td>
              </tr>

              <!-- THU -->
              <tr>
                <td class="tt-day">Thu</td>
                <td colspan="4" class="lab-block" style="background: #f59e0b; color: #111827 !important; border: 2px solid #000;">
                  <strong style="font-weight: 800; color: #111827 !important;">COMPUTER NETWORKS &amp; INTERNET PROTOCOLS LAB (CNIP LAB)</strong><br>
                  <small style="color: #1f2937 !important; font-weight: 700;">LAB 4 (09:00 - 12:30 Continuous Lab across P1-P3) · Mr. A. Rajesh</small>
                </td>
                <td class="tt-subject-gb"><strong>GB</strong><br><small>Room 111</small></td>
                <td class="tt-subject-ai"><strong>AI</strong><br><small>Room 111</small></td>
                <td class="tt-subject-gb"><strong>GB</strong><br><small>Green Building</small></td>
              </tr>

              <!-- FRI -->
              <tr>
                <td class="tt-day">Fri</td>
                <td class="tt-subject-ai"><strong>AI</strong><br><small>Room 114</small></td>
                <td rowspan="2" class="tt-break" style="width: 30px; z-index: 1;">BREAK</td>
                <td class="tt-subject-ooad"><strong>OOAD</strong><br><small>Room 114</small></td>
                <td class="tt-subject-gb"><strong>GB</strong><br><small>Room 114</small></td>
                <td class="tt-subject-cnip"><strong>CNIP</strong><br><small>Mr. Rajesh</small></td>
                <td class="tt-subject-atcd" style="border: 2px solid rgba(74, 222, 128, 0.6) !important;"><strong>ATCD</strong><br><small>LAB 3 · MS. Manjula</small></td>
                <td class="tt-subject-cnip"><strong>CNIP</strong><br><small>Mr. Rajesh</small></td>
              </tr>

              <!-- SAT -->
              <tr>
                <td class="tt-day">Sat</td>
                <td class="tt-subject-atcd" style="border: 2px solid rgba(74, 222, 128, 0.6) !important;"><strong>ATCD</strong><br><small>Room 316 · MS. Manjula</small></td>
                <td class="tt-subject-gb"><strong>GB</strong><br><small>Room 316</small></td>
                <td class="tt-subject-ooad"><strong>OOAD</strong><br><small>Room 316</small></td>
                <td class="tt-subject-atcd" style="border: 2px solid rgba(74, 222, 128, 0.6) !important;"><strong>ATCD</strong><br><small>MS. Manjula</small></td>
                <td class="tt-subject-cnip"><strong>CNIP</strong><br><small>Room 316</small></td>
                <td class="tt-subject-sports"><strong>SPORTS</strong><br><small>Physical Education</small></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Course Catalog & Faculty Contact Directory -->
        <div style="margin-top: 20px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.25); background: linear-gradient(135deg, rgba(19, 57, 38, 0.85) 0%, rgba(26, 71, 48, 0.75) 100%);">
          <div style="padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <div style="font-size: 13.5px; font-weight: 800; color: #fef3c7; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-leaf" style="color: #4ade80;"></i>
              <span>III Year I Sem (CSE-D) Department Course Allocations & Contact Directory</span>
            </div>
            <span style="font-size: 11px; color: #cbd5e1;">* Class In-Charge: MS. A. Manjula</span>
          </div>
          <div class="table-responsive" style="padding: 10px 14px 14px;">
            <table class="custom-table" style="font-size: 12px; background: rgba(15, 23, 42, 0.4); border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background: rgba(15, 35, 25, 0.85); color: #fde68a;">
                  <th style="width: 140px; border-bottom: 1px solid rgba(212, 175, 55, 0.3);">Course Code (CC)</th>
                  <th style="width: 90px; border-bottom: 1px solid rgba(212, 175, 55, 0.3);">Short Name</th>
                  <th style="border-bottom: 1px solid rgba(212, 175, 55, 0.3);">Course Title</th>
                  <th style="border-bottom: 1px solid rgba(212, 175, 55, 0.3);">Faculty In-Charge</th>
                  <th style="text-align: right; width: 140px; border-bottom: 1px solid rgba(212, 175, 55, 0.3);">Contact Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: #fb923c;">24ALBTAM301T</td>
                  <td><span class="badge tt-subject-ai" style="padding: 3px 8px; font-size: 11px;">AI</span></td>
                  <td><strong style="color: #fed7aa;">ARTIFICIAL INTELLIGENCE</strong></td>
                  <td>Ms. C. SRAVANI</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #cbd5e1;">+91 93900 33582</td>
                </tr>
                <tr>
                  <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: #38bdf8;">24ALBTCS501T</td>
                  <td><span class="badge tt-subject-cnip" style="padding: 3px 8px; font-size: 11px;">CN & IP</span></td>
                  <td><strong style="color: #bae6fd;">COMPUTER NETWORKS & INTERNET PROTOCOLS</strong></td>
                  <td>Mr. A. RAJESH</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #cbd5e1;">+91 91339 30206</td>
                </tr>
                <tr style="background: rgba(34, 197, 94, 0.1); border-left: 3px solid #4ade80;">
                  <td style="font-family: 'JetBrains Mono'; font-weight: 800; color: #4ade80;">24ALBTCS502T</td>
                  <td><span class="badge tt-subject-atcd" style="padding: 3px 8px; font-size: 11px;">AT & CD</span></td>
                  <td><strong style="color: #4ade80;">AUTOMATA THEORY AND COMPILER DESIGN</strong> <span style="font-size: 10px; background: #D4AF37; color: #0F3D26; padding: 2px 6px; border-radius: 4px; font-weight: 800; margin-left: 6px;">CLASS IN-CHARGE</span></td>
                  <td><strong style="color: #FFFFFF;">Ms. A. MANJULA</strong> (Class Mentor/Incharge)</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; font-weight: 700; color: #4ade80;">+91 63017 35752</td>
                </tr>
                <tr>
                  <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: #818cf8;">24ALBTCS503T</td>
                  <td><span class="badge tt-subject-iqta" style="padding: 3px 8px; font-size: 11px;">IQTA</span></td>
                  <td><strong style="color: #c7d2fe;">INTRODUCTION TO QUANTUM TECHNOLOGIES AND APPLICATIONS</strong></td>
                  <td>Ms. P. CHANDANA</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #cbd5e1;">+91 95503 55936</td>
                </tr>
                <tr>
                  <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: #c084fc;">24ALBTCS504T</td>
                  <td><span class="badge tt-subject-ooad" style="padding: 3px 8px; font-size: 11px;">OOAD</span></td>
                  <td><strong style="color: #e9d5ff;">OBJECT ORIENTED ANALYSIS & DESIGN</strong></td>
                  <td>Dr. K. BHARGAVI (HOD - CSE)</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #cbd5e1;">+91 94932 22702</td>
                </tr>
                <tr>
                  <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: #fb923c;">24ALBTAM301P</td>
                  <td><span class="badge tt-subject-ai" style="padding: 3px 8px; font-size: 11px;">AI LAB</span></td>
                  <td><strong style="color: #fed7aa;">ARTIFICIAL INTELLIGENCE LAB</strong></td>
                  <td>Ms. C. SRAVANI</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #cbd5e1;">+91 93900 33582</td>
                </tr>
                <tr>
                  <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: #38bdf8;">24ALBTCS501P</td>
                  <td><span class="badge tt-subject-cnip" style="padding: 3px 8px; font-size: 11px;">CN & IP LAB</span></td>
                  <td><strong style="color: #bae6fd;">COMPUTER NETWORKS & INTERNET PROTOCOLS LAB</strong></td>
                  <td>Mr. A. RAJESH</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #cbd5e1;">+91 91339 30206</td>
                </tr>
                <tr>
                  <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: #2dd4bf;">24ALBTCE508T</td>
                  <td><span class="badge tt-subject-gb" style="padding: 3px 8px; font-size: 11px;">GB</span></td>
                  <td><strong style="color: #99f6e4;">GREEN BUILDING</strong></td>
                  <td>Ms. VIDHYA</td>
                  <td style="text-align: right; font-family: 'JetBrains Mono'; color: #cbd5e1;">+91 63024 48870</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 6. FACULTY PROFILE VIEW
// ==========================================================================
function renderFacultyProfileView() {
  const f = currentFaculty;

  return `
    <div class="grid-2">
      <div class="portal-card">
        <div class="card-header">
          <span class="card-title"><i class="fa-solid fa-id-card-clip" style="color: var(--primary);"></i> Faculty Official Profile</span>
          <span class="badge badge-gold">Active Faculty</span>
        </div>
        <div class="card-body">
          <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
            <div class="faculty-avatar" style="width: 70px; height: 70px; font-size: 26px;">
              ${f.avatar || 'FC'}
            </div>
            <div>
              <h3 style="font-size: 18px; color: var(--primary-deep); font-weight: 800;">${f.name}</h3>
              <div style="font-size: 13px; font-weight: 700; color: var(--gold-dark); font-family: 'JetBrains Mono';">${f.id}</div>
              <div style="font-size: 12.5px; color: var(--text-muted);">${f.designation} · ${f.dept}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; font-size: 13px;">
            <div><strong>Experience:</strong> ${f.experience}</div>
            <div><strong>Department Code:</strong> ${f.deptCode}</div>
            <div><strong>Office Chamber:</strong> ${f.room}</div>
            <div><strong>Mobile Phone:</strong> ${f.phone}</div>
            <div style="grid-column: span 2;"><strong>Official Email:</strong> ${f.email}</div>
            <div style="grid-column: span 2;"><strong>Specialization Areas:</strong> ${f.specialization}</div>
          </div>
        </div>
      </div>

      <div class="portal-card">
        <div class="card-header">
          <span class="card-title"><i class="fa-solid fa-graduation-cap" style="color: var(--primary);"></i> Assigned Courses & Laboratories</span>
        </div>
        <div class="card-body" style="padding: 0;">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Class</th>
                <th style="text-align: right;">Location</th>
              </tr>
            </thead>
            <tbody>
              ${f.assignedSubjects.map(sub => `
                <tr>
                  <td>
                    <div style="font-weight: 700; color: var(--text-heading);">${sub.name}</div>
                    <div style="font-size: 11.5px; color: var(--text-muted); font-family: 'JetBrains Mono';">${sub.code}</div>
                  </td>
                  <td>${sub.class}</td>
                  <td style="text-align: right;"><span class="badge badge-gold">${sub.room}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Switch Demo Faculty
function switchDemoFaculty(facId) {
  currentFaculty = FACULTY_DATABASE[facId];
  localStorage.setItem('alits_portal_user', JSON.stringify({ ...currentFaculty, role: 'Faculty' }));
  renderFacultyHeader();
  switchFacultyTab(currentFacultyTab);
  showToast(`Switched to Faculty: ${currentFaculty.name}`);
}

// Modal Utilities
function closeFacultyModal() {
  const modal = document.getElementById('facultyModal');
  if (modal) modal.classList.remove('active');
}

// Logout
function performFacultyLogout() {
  if (typeof AuthGuard !== 'undefined') {
    AuthGuard.logout();
  } else {
    sessionStorage.clear();
    localStorage.removeItem('alits_portal_user');
    localStorage.removeItem('alits_active_session');
    window.location.replace('../auth.html?msg=logged_out');
  }
}

// Theme Toggle
function toggleFacultyTheme() {
  const html = document.documentElement;
  const cur = html.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  showToast(`Switched to ${next} theme`);
}

// Toast Notifications
function showToast(msg) {
  const container = document.getElementById('facultyToastContainer');
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

// --- AUTO-INITIALIZE ON LOAD ---
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initFacultyAuth();
  });
} else {
  initFacultyAuth();
}
