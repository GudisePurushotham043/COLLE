/* ==========================================================================
   ALITS FACULTY ATTENDANCE MODULE
   Strict Real-Student Filtering & Dynamic On-Change Table Refresh
   ========================================================================== */

function getYearPrefix(str) {
  if (!str) return '24';
  if (str.includes('IV') || str.includes('4th') || str.includes('4')) return '23';
  if (str.includes('III') || str.includes('3rd') || str.includes('3')) return '24';
  if (str.includes('II') || str.includes('2nd') || str.includes('2')) return '25';
  if (str.includes('I') || str.includes('1st') || str.includes('1')) return '26';
  return '24';
}

function filterRealStudents(selectedDept, selectedSection, selectedYear, selectedProgram) {
  let storedStudents = [];
  try {
    const rawERP = localStorage.getItem("ALITS_ERP_STATE");
    if (rawERP) {
      const stateObj = JSON.parse(rawERP);
      if (stateObj && Array.isArray(stateObj.students)) {
        storedStudents.push(...stateObj.students.map(s => ({
          roll: s.rollNo || s.roll,
          rollNo: s.rollNo || s.roll,
          name: s.name,
          status: s.status || (s.attendancePct >= 75 ? 'Present' : 'Absent'),
          quota: (s.quota || 'CONVENOR').toUpperCase().includes('MANAGE') ? 'MANAGEMENT' : 'CONVENOR',
          dept: s.dept || 'CSE',
          branch: s.dept || 'CSE',
          branchCode: s.dept === 'CSE' ? '05' : (s.dept === 'ECE' ? '04' : (s.dept === 'EEE' ? '02' : '01')),
          section: (s.section || 'A').toUpperCase(),
          sec: (s.section || 'A').toUpperCase(),
          year: s.year || 'III Year',
          yearLabel: s.year && s.year.includes('3') ? 'III B.Tech' : (s.year && s.year.includes('2') ? 'II B.Tech' : (s.year && s.year.includes('1') ? 'I B.Tech' : 'IV B.Tech')),
          fullLabel: `${s.year || 'III B.Tech'} ${s.dept || 'CSE'} (Section-${s.section || 'A'})`,
          batchPrefix: (s.rollNo || s.roll || '').substring(0, 2) || '24',
          attendancePct: s.attendancePct,
          mobile: s.mobile,
          parentMobile: s.parentMobile,
          residenceType: s.residenceType || 'Day Scholar'
        })));
      }
    }
    const raw242G = localStorage.getItem("alits_students_242G");
    const rawAll = localStorage.getItem("allStudents");
    const rawReal = localStorage.getItem("realStudents") || localStorage.getItem("alits_students");
    if (raw242G) storedStudents.push(...JSON.parse(raw242G));
    if (rawAll) storedStudents.push(...JSON.parse(rawAll));
    if (rawReal) storedStudents.push(...JSON.parse(rawReal));
  } catch (e) { }

  const baseRoster = [
    ...(typeof CSE_A_3RD_YEAR_ROSTER !== 'undefined' ? CSE_A_3RD_YEAR_ROSTER : []).map(s => ({
      roll: s.rollNo,
      rollNo: s.rollNo,
      name: s.name,
      status: s.status || 'Present',
      quota: s.quota || 'CONVENOR',
      dept: 'CSE',
      branch: 'CSE',
      branchCode: '05',
      section: 'A',
      sec: 'A',
      year: 'III Year',
      yearLabel: 'III B.Tech',
      fullLabel: 'III B.Tech CSE (Section-A)',
      batchPrefix: '24'
    })),
    ...(typeof CSE_B_3RD_YEAR_ROSTER !== 'undefined' ? CSE_B_3RD_YEAR_ROSTER : []).map(s => ({
      roll: s.rollNo,
      rollNo: s.rollNo,
      name: s.name,
      status: s.status || 'Present',
      quota: s.quota || 'CONVENOR',
      dept: 'CSE',
      branch: 'CSE',
      branchCode: '05',
      section: 'B',
      sec: 'B',
      year: 'III Year',
      yearLabel: 'III B.Tech',
      fullLabel: 'III B.Tech CSE (Section-B)',
      batchPrefix: '24'
    })),
    ...(typeof CSE_C_3RD_YEAR_ROSTER !== 'undefined' ? CSE_C_3RD_YEAR_ROSTER : []).map(s => ({
      roll: s.rollNo,
      rollNo: s.rollNo,
      name: s.name,
      status: s.status || 'Present',
      quota: s.quota || 'CONVENOR',
      dept: 'CSE',
      branch: 'CSE',
      branchCode: '05',
      section: 'C',
      sec: 'C',
      year: 'III Year',
      yearLabel: 'III B.Tech',
      fullLabel: 'III B.Tech CSE (Section-C)',
      batchPrefix: '24'
    })),
    ...(typeof CSE_E_3RD_YEAR_ROSTER !== 'undefined' ? CSE_E_3RD_YEAR_ROSTER : []).map(s => ({
      roll: s.rollNo,
      rollNo: s.rollNo,
      name: s.name,
      status: s.status || 'Present',
      quota: s.quota || 'CONVENOR',
      dept: 'CSE',
      branch: 'CSE',
      branchCode: '05',
      section: 'E',
      sec: 'E',
      year: 'III Year',
      yearLabel: 'III B.Tech',
      fullLabel: 'III B.Tech CSE (Section-E)',
      batchPrefix: '24'
    })),
    ...(typeof CLASS_STUDENTS_ROSTER !== 'undefined' ? CLASS_STUDENTS_ROSTER : []).map(s => ({
      roll: s.rollNo,
      rollNo: s.rollNo,
      name: s.name,
      status: s.status || 'Present',
      quota: s.quota || 'CONVENOR',
      dept: 'CSE',
      branch: 'CSE',
      branchCode: '05',
      section: 'D',
      sec: 'D',
      year: 'III Year',
      yearLabel: 'III B.Tech',
      fullLabel: 'III B.Tech CSE (Section-D)',
      batchPrefix: '24'
    }))
  ];

  const allStudents = storedStudents.length > 0 ? [...storedStudents, ...baseRoster] : baseRoster;
  const yearPrefix = getYearPrefix(selectedYear || 'III Year');
  const deptNorm = (selectedDept || 'CSE').trim().toUpperCase();
  const secNorm = (selectedSection || 'B').replace('Section-', '').trim().toUpperCase();

  const exactMatch = allStudents.filter(s => {
    const sRoll = (s.rollNo || s.roll || '').toUpperCase();
    const sDept = (s.dept || s.branch || s.branchCode || '').toUpperCase();
    const sSec = (s.section || s.sec || '').replace('Section-', '').trim().toUpperCase();
    const sYear = s.year || s.yearLabel || '';
    const sBatch = s.batchPrefix || (sRoll.length >= 2 ? sRoll.substring(0, 2) : '');

    // Match department strictly
    const deptMatches = sDept === deptNorm ||
      (s.fullLabel && s.fullLabel.toUpperCase().includes(deptNorm)) ||
      (deptNorm === 'CSE' && (sDept.includes('CSE') || s.branchCode === '05'));

    // Match section strictly
    const secMatches = sSec === secNorm;

    // Match year prefix strictly
    const yearMatches = sBatch === yearPrefix || sYear.includes(selectedYear ? selectedYear.split(' ')[0] : 'III');

    return deptMatches && secMatches && yearMatches;
  });

  // Prevent duplicates using roll number as unique key
  const uniqueStudents = [...new Map(exactMatch.map(s => [(s.rollNo || s.roll), s])).values()];
  return uniqueStudents;
}

function renderStudentTable(students) {
  const tbody = document.getElementById('studentTableBody');
  const totalCountEl = document.getElementById('liveTotalCount');
  const totalCardVal = document.getElementById('liveTotalCardVal');
  const presentCountEl = document.getElementById('livePresentCount');
  const absentCountEl = document.getElementById('liveAbsentCount');
  const odCountEl = document.getElementById('liveOdCount');

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

  if (!tbody) return;

  // IMPORTANT: Clear old students first
  tbody.innerHTML = "";

  if (students.length === 0) {
    const course = document.getElementById('acadCourseSelect')?.value || 'CSE';
    const sec = document.getElementById('acadSectionSelect')?.value || 'A';
    const yr = document.getElementById('acadYearSelect')?.value || 'III Year';
    const prog = document.getElementById('acadProgramSelect')?.value || 'B.Tech';

    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 45px 20px; color: var(--text-muted);">
          <div style="font-size: 32px; margin-bottom: 12px; opacity: 0.4;"><i class="fa-solid fa-users-slash"></i></div>
          <div style="font-size: 15px; font-weight: 600; color: var(--text-heading); margin-bottom: 4px;">No students found in this section</div>
          <div style="font-size: 12.5px; opacity: 0.8;">No student records found in central database for <strong>${course} ${yr} Section ${sec}</strong>.</div>
        </td>
      </tr>
    `;
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

function handleAcademicFilterChange() {
  const prog = document.getElementById('acadProgramSelect')?.value || 'B.Tech';
  const course = document.getElementById('acadCourseSelect')?.value || 'CSE';
  const sec = document.getElementById('acadSectionSelect')?.value || 'B';
  const yr = document.getElementById('acadYearSelect')?.value || 'III Year';
  const sem = document.getElementById('acadSemSelect')?.value || '1st Semester';

  const filtered = filterRealStudents(course, sec, yr, prog);
  if (typeof activeLiveRoster !== 'undefined') {
    activeLiveRoster = filtered;
  }

  renderStudentTable(filtered);
}
