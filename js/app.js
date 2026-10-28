// Anantha Lakshmi Institute of Technology & Sciences (ALITS) ERP Application Controller

let state = null;
let currentDemoOtp = "482175";
let otpTimerInterval = null;
let otpTimeRemaining = 299;

// DYNAMIC ACADEMIC CALENDAR STATE
let currentCalYear = new Date().getFullYear();
let currentCalMonth = new Date().getMonth();

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const EXECUTIVE_ACCOUNTS = {
    chairman: {
        name: "Sri M. Anantha Ramudu",
        role: "Chairman",
        email: "chairman@alits.ac.in",
        initials: "AR"
    },
    viceChairman: {
        name: "Sri M. Ramesh Naidu",
        role: "Vice-Chairman",
        email: "vc@alits.ac.in",
        initials: "RN"
    },
    principal: {
        name: "Dr. K. Sreenivasulu",
        role: "Principal",
        email: "principal@alits.ac.in",
        initials: "KS"
    },
    skillDirector: {
        name: "Dr. M. Surendra Naidu",
        role: "Skill Dev Director",
        email: "skilldev@alits.ac.in",
        initials: "SN"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initState();
    initSidebarNav();
    applyThemeFromState();
    initTopbarLiveClock();
    initCommandCenterClock();
    initOtpInputAutoAdvance();

    // SECURE DASHBOARD INITIALIZATION VIA AUTH GUARD
    if (typeof AuthGuard !== 'undefined') {
        if (!AuthGuard.requireAuth('management')) {
            return; // Halt initialization if not authorized
        }
    }

    const session = typeof AuthGuard !== 'undefined' ? AuthGuard.getSession() : null;
    if (session) {
        const userNameEl = document.getElementById('sidebarUserName');
        const userRoleEl = document.getElementById('sidebarUserRole');
        const topbarNameEl = document.getElementById('topbarUserName');
        const avatarEl = document.getElementById('sidebarAvatar');

        if (userNameEl) userNameEl.innerText = session.userName || 'Management User';
        if (topbarNameEl) topbarNameEl.innerText = session.userName || 'Management User';
        if (userRoleEl) userRoleEl.innerText = session.role || 'Management';
        if (avatarEl && session.userName) {
            const inits = session.userName.split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();
            avatarEl.innerText = inits || 'MGT';
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view') || sessionStorage.getItem('ALITS_TARGET_VIEW') || 'view-dashboard';
    const appWrapper = document.getElementById('erpAppWrapper') || document.querySelector('.erp-app-wrapper');
    if (appWrapper) appWrapper.style.display = 'flex';
    switchErpView(viewParam);
});

/* ==========================================================================
   State Management & Theme Persistence
   ========================================================================== */
function initState() {
    const saved = localStorage.getItem('ALITS_ERP_STATE');
    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse saved state, using defaults', e);
            state = window.ALITS_DATA || {};
        }
    } else {
        state = window.ALITS_DATA || {};
    }

    if (!state || typeof state !== 'object') {
        state = window.ALITS_DATA || {};
    }

    // Ensure state.students is properly initialized and merged
    if (!state.students || !Array.isArray(state.students)) {
        state.students = [];
    }

    // Ensure state.faculty is properly initialized and merged
    if (!state.faculty || !Array.isArray(state.faculty) || state.faculty.length === 0) {
        if (window.ALITS_DATA && Array.isArray(window.ALITS_DATA.faculty)) {
            state.faculty = JSON.parse(JSON.stringify(window.ALITS_DATA.faculty));
        } else {
            state.faculty = [];
        }
    }

    const normalizeYear = (yrStr) => {
        if (!yrStr) return '3rd Year';
        const s = String(yrStr).toUpperCase();
        if (s.includes('1') || s.includes('1ST') || s.includes('I YEAR') || s.includes('I B.TECH')) return '1st Year';
        if (s.includes('2') || s.includes('2ND') || s.includes('II YEAR') || s.includes('II B.TECH')) return '2nd Year';
        if (s.includes('4') || s.includes('4TH') || s.includes('IV YEAR') || s.includes('IV B.TECH')) return '4th Year';
        return '3rd Year';
    };

    const normalizeSec = (secStr) => {
        if (!secStr) return 'A';
        return String(secStr).replace(/section[- ]?/i, '').trim().toUpperCase() || 'A';
    };

    const normalizeQuota = (qStr) => {
        if (!qStr) return 'Convenor Quota';
        return String(qStr).toUpperCase().includes('MANAGE') ? 'Management Quota' : 'Convenor Quota';
    };

    const normalizeDept = (dStr) => {
        if (!dStr) return 'CSE';
        const d = String(dStr).trim().toUpperCase();
        if (d === '05' || d.includes('COMPUTER') || d.includes('CSE')) return 'CSE';
        if (d === '04' || d.includes('ELECTRONICS') || d.includes('ECE')) return 'ECE';
        if (d === '02' || d.includes('ELECTRICAL') || d.includes('EEE')) return 'EEE';
        if (d === '01' || d.includes('CIVIL')) return 'CIVIL';
        if (d === '03' || d.includes('MECH')) return 'MECH';
        if (d.includes('AIML') || d.includes('ARTIFICIAL')) return 'AIML';
        return d;
    };

    const studentMap = new Map();

    // 1. Seed base default students from ALITS_DATA
    if (window.ALITS_DATA && Array.isArray(window.ALITS_DATA.students)) {
        for (const s of window.ALITS_DATA.students) {
            const r = (s.rollNo || s.roll || '').trim().toUpperCase();
            if (r) {
                studentMap.set(r, {
                    ...s,
                    rollNo: r,
                    dept: normalizeDept(s.dept || s.branch),
                    year: normalizeYear(s.year),
                    section: normalizeSec(s.section || s.sec),
                    quota: normalizeQuota(s.quota),
                    residenceType: s.residenceType === 'Hosteler' ? 'Hosteler' : 'Day Scholar'
                });
            }
        }
    }

    // 2. Overlay existing state students from saved ERP state
    for (const s of state.students) {
        const r = (s.rollNo || s.roll || '').trim().toUpperCase();
        if (r) {
            const existing = studentMap.get(r);
            const merged = existing ? { ...existing, ...s, rollNo: r } : { ...s, rollNo: r };
            merged.dept = normalizeDept(merged.dept || merged.branch);
            merged.year = normalizeYear(merged.year);
            merged.section = normalizeSec(merged.section || merged.sec);
            merged.quota = normalizeQuota(merged.quota);
            merged.residenceType = merged.residenceType === 'Hosteler' ? 'Hosteler' : 'Day Scholar';
            studentMap.set(r, merged);
        }
    }

    // 3. Merge cross-portal stored student updates (attendance/status only for existing valid students)
    try {
        const externalKeys = ['alits_students_242G', 'allStudents', 'realStudents', 'alits_students'];
        for (const k of externalKeys) {
            const raw = localStorage.getItem(k);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    for (const ext of parsed) {
                        const r = (ext.rollNo || ext.roll || '').trim().toUpperCase();
                        if (r && studentMap.has(r)) {
                            const curr = studentMap.get(r);
                            if (ext.status) curr.status = ext.status;
                            if (ext.attendancePct !== undefined) curr.attendancePct = ext.attendancePct;
                            if (ext.attendedClasses !== undefined) curr.attendedClasses = ext.attendedClasses;
                            if (ext.name && !curr.name) curr.name = ext.name;
                            if (ext.section || ext.sec) curr.section = normalizeSec(ext.section || ext.sec);
                        }
                    }
                }
            }
        }
    } catch (e) { console.error('Error syncing external student rosters:', e); }

    // Final database integrity filter: Strict requirement compliance
    state.students = Array.from(studentMap.values()).filter(s => {
        const r = (s.rollNo || s.roll || '').toUpperCase();
        const n = (s.name || '').toUpperCase();
        const sec = (s.section || s.sec || '').replace(/section[- ]?/i, '').trim().toUpperCase();
        const sid = (s.id || '');
        // Requirement 1: Gulagani Tirumalaiah MUST NOT appear in CSE-A
        if ((n.includes('TIRUMALA') || r === '242G1A05O1' || sid === 'STU-101') && sec === 'A') return false;
        // Requirement 3: Purge demo/sample students (Bandlamudi Koushik 252G1A0403 / STU-102)
        if (r === '252G1A0403' || sid === 'STU-102' || n.includes('BANDLAMUDI')) return false;
        return true;
    });

    // Sync faculty leaves from faculty portal
    try {
        const rawLeaves = localStorage.getItem('alits_faculty_leaves');
        if (rawLeaves) {
            state.facultyLeaves = JSON.parse(rawLeaves);
        }
    } catch (e) { }

    // Sync portal assignments
    try {
        const rawAsgs = localStorage.getItem('alits_portal_assignments');
        if (rawAsgs) {
            state.assignments = JSON.parse(rawAsgs);
        }
    } catch (e) { }

    // Sync portal notes
    try {
        const rawNotes = localStorage.getItem('alits_portal_notes');
        if (rawNotes) {
            state.notes = JSON.parse(rawNotes);
        }
    } catch (e) { }

    if (!state.skillDevelopment || !state.skillDevelopment.placementSummary || !state.skillDevelopment.placementDetails || state.skillDevelopment.teamMembers?.length !== 8) {
        state.skillDevelopment = window.ALITS_DATA.skillDevelopment;
    }

    // Persist unified merged state
    window.state = state;
    try {
        localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(state));
    } catch (e) { }
}

function saveState(meta = {}) {
    // Determine active module if not explicitly passed
    if (!meta.module) {
        const activePane = document.querySelector('.erp-view-pane:not([style*="display: none"])');
        const viewId = activePane?.id?.replace('view-', '') || 'system';
        const moduleMap = {
            'dashboard': 'Dashboard',
            'fees': 'Fees',
            'students': 'Students',
            'idcards': 'ID Cards',
            'departments': 'Departments',
            'hr': 'Faculty',
            'library': 'Library',
            'hostel': 'Hostel',
            'governance': 'Governance',
            'skill': 'Skill Development',
            'transport': 'Transport',
            'calendar': 'Calendar',
            'exams': 'Examinations',
            'settings': 'Settings'
        };
        meta.module = moduleMap[viewId] || 'System';
    }
    if (!meta.summary) {
        meta.summary = `${meta.module} updated successfully`;
    }
    if (!meta.action) {
        meta.action = 'Auto-Update';
    }

    try {
        localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(state));
        
        // Sync student rosters to cross-portal localStorage keys for Faculty & Staff
        if (state.students && Array.isArray(state.students)) {
            const minRoster = state.students.map(s => ({
                roll: s.rollNo || s.roll,
                rollNo: s.rollNo || s.roll,
                name: s.name,
                status: s.status || (s.attendancePct >= 75 ? 'Present' : 'Absent'),
                quota: s.quota || 'CONVENOR',
                dept: s.dept || 'CSE',
                branch: s.dept || 'CSE',
                branchCode: (s.dept === 'CSE' ? '05' : (s.dept === 'ECE' ? '04' : (s.dept === 'EEE' ? '02' : '01'))),
                section: s.section || 'A',
                sec: s.section || 'A',
                year: s.year || '3rd Year',
                yearLabel: s.year && s.year.includes('3') ? 'III B.Tech' : (s.year && s.year.includes('2') ? 'II B.Tech' : (s.year && s.year.includes('1') ? 'I B.Tech' : 'IV B.Tech')),
                fullLabel: `${s.year || 'III B.Tech'} ${s.dept || 'CSE'} (Section-${s.section || 'A'})`,
                batchPrefix: (s.rollNo || s.roll || '').substring(0, 2) || '24',
                attendancePct: s.attendancePct,
                attendedClasses: s.attendedClasses,
                totalClasses: s.totalClasses,
                mobile: s.mobile,
                parentMobile: s.parentMobile,
                email: s.email,
                residenceType: s.residenceType,
                totalPaid: s.totalPaid,
                totalAssigned: s.totalAssigned
            }));
            localStorage.setItem('alits_students_242G', JSON.stringify(minRoster));
            localStorage.setItem('realStudents', JSON.stringify(minRoster));
        }

        // Cross-portal sync - only store updated markers
    } catch (e) {
        console.error('Failed to save state', e);
    }

    // Immediately re-render active view
    if (meta.reRender !== false && typeof renderAllViews === 'function') {
        try { renderAllViews(); } catch (e) { console.error('Error rendering views after saveState:', e); }
    }

    if (window.BackendSync && typeof window.BackendSync.pushState === 'function') {
        window.BackendSync.pushState(state, meta);
    }

    if (typeof showLiveSyncToast === 'function') {
        showLiveSyncToast(`✓ ${meta.summary} - auto-updated!`, meta.module);
    }
}

// Listen for cross-tab or cross-portal changes from Faculty/Student portals
window.addEventListener('storage', (e) => {
    if (e.key === 'ALITS_ERP_STATE' || e.key === 'alits_students_242G' || e.key === 'realStudents' || e.key === 'alits_faculty_leaves' || e.key === 'alits_portal_assignments') {
        initState();
        if (typeof renderAllViews === 'function') renderAllViews();
    }
});

window.addEventListener('alits_data_sync', (e) => {
    // Only handle if not already handled directly by onBackendStateUpdated
    if (!window.onBackendStateUpdated) {
        initState();
        const activeViewId = getActiveErpViewId();
        renderErpView(activeViewId);
        if (typeof updateApprovalCounters === 'function') updateApprovalCounters();
    }
});

window.onBackendStateUpdated = function (newState, meta = {}) {
    if (!newState) return;

    const isEditModalOpen = window.isUserEditingModal || Boolean(document.querySelector('#genericEditModal.active, #facultyProfileModal.active, #authModal.active'));
    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT');

    // If the user is currently editing a form or has a modal active, defer updating state
    // so user inputs or active objects are never clobbered
    if (isEditModalOpen || isTyping) {
        console.log('[BackendSync] Modal or input active, deferring incoming state update...');
        window.pendingBackendState = newState;
        return;
    }

    // Deduplicate students list by Roll Number
    if (newState.students && Array.isArray(newState.students)) {
        const seen = new Set();
        newState.students = newState.students.filter(s => {
            const r = (s.rollNo || s.roll || '').trim().toUpperCase();
            if (!r || seen.has(r)) return false;
            seen.add(r);
            s.rollNo = r;
            return true;
        });
    }

    state = newState;
    window.state = state;
    try {
        localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(state));
    } catch (e) { }

    // Fast, responsive update: Only re-render the ACTIVE view
    const activeViewId = getActiveErpViewId();
    renderErpView(activeViewId);
    if (typeof updateApprovalCounters === 'function') updateApprovalCounters();

    // Mark other views as dirty so they update on-demand when clicked
    for (const vId in VIEW_RENDERERS) {
        if (vId !== activeViewId) {
            erpViewDirtyMap[vId] = true;
        }
    }
};

window.changeErpTheme = function (themeName) {
    state.theme = themeName;
    saveState();
    applyThemeFromState();
};

function applyThemeFromState() {
    const currentTheme = state.theme || 'emerald';
    document.body.className = `theme-${currentTheme}`;
    const select = document.getElementById('themeSelect');
    if (select) select.value = currentTheme;
    const settingsSelect = document.getElementById('settingsThemeSelect');
    if (settingsSelect) settingsSelect.value = currentTheme;

    if (window.update3DThemeColors) {
        window.update3DThemeColors(currentTheme);
    }
}

/* ==========================================================================
   LIVE TOPBAR DATE, DAY & TIME READOUT ENGINE
   ========================================================================== */
function initTopbarLiveClock() {
    function updateClock() {
        const now = new Date();
        const dateEl = document.getElementById('topbarLiveDate');
        const timeEl = document.getElementById('topbarLiveTime');

        if (dateEl) {
            // e.g. "Sun, Sep 13, 2026"
            const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
            dateEl.innerText = now.toLocaleDateString('en-US', options).replace(/,/g, '');
        }

        if (timeEl) {
            // e.g. "02:47:15 PM"
            timeEl.innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* ==========================================================================
   LIVE ANIMATED COUNTERS ENGINE (5,800 Active Users & Dashboard KPIs)
   ========================================================================== */
function initLiveCounters() {
    const counterElements = document.querySelectorAll('[data-counter-target]');
    counterElements.forEach(el => {
        const target = parseFloat(el.getAttribute('data-counter-target'));
        if (isNaN(target)) return;

        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const isComma = el.getAttribute('data-counter-format') === 'comma';

        let start = 0;
        const duration = 1200; // ms
        const startTime = performance.now();

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * ease);

            let displayVal = current;
            if (isComma) {
                displayVal = current.toLocaleString('en-IN');
            }
            el.innerText = `${prefix}${displayVal}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                let finalVal = target;
                if (isComma) finalVal = target.toLocaleString('en-IN');
                el.innerText = `${prefix}${finalVal}${suffix}`;
            }
        }
        requestAnimationFrame(step);
    });
}
window.initLiveCounters = initLiveCounters;

/* ==========================================================================
   Navigation & View Switching
   ========================================================================== */
function initSidebarNav() {
    const items = document.querySelectorAll('.sidebar-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const targetView = item.getAttribute('data-view');
            if (targetView) switchErpView(targetView);
        });
    });

    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('mainSidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase().trim();
                if (query) {
                    switchErpView('view-students');
                    document.getElementById('studentFilterInput').value = query;
                    renderStudentsTable();
                }
            }
        });
    }
}

window.switchErpView = function (viewId, subOptions = {}) {
    const items = document.querySelectorAll('.sidebar-item');
    const views = document.querySelectorAll('.erp-view-pane');

    items.forEach(i => {
        if (i.getAttribute('data-view') === viewId) {
            i.classList.add('active');
        } else {
            i.classList.remove('active');
        }
    });

    views.forEach(v => {
        if (v.id === viewId) {
            v.style.display = 'block';
            v.classList.remove('view-3d-entry');
            if (viewId !== 'view-exams') {
                v.classList.add('view-3d-entry');
            }
        } else {
            v.style.display = 'none';
        }
    });

    if (window.set3DModuleMode) {
        window.set3DModuleMode(viewId);
    }

    // High-performance on-demand view rendering
    renderErpView(viewId);
    if (typeof updateApprovalCounters === 'function') updateApprovalCounters();

    if (window.renderModuleSpecific3DCanvas) {
        window.renderModuleSpecific3DCanvas(viewId);
    }
};

/* ==========================================================================
   EXECUTIVE LOGIN ACCESS, LOGOUT & MULTI-STEP AUTHENTICATION
   ========================================================================== */
window.openAuthModal = function (step = 'login') {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('active');

    const card = document.querySelector('.cinematic-login-card');
    const controls = document.getElementById('authCampusViewControls');
    if (card) card.style.display = 'block';
    if (controls) controls.style.display = 'none';

    // Close/hide entire main ERP dashboard shell when login/auth portal is active
    const appWrapper = document.getElementById('erpAppWrapper');
    if (appWrapper && (step === 'login' || step === 'register' || step === 'verify')) {
        appWrapper.style.display = 'none';
    }

    window.switchAuthStep(step);
};

window.switchAuthStep = function (step) {
    const steps = {
        'login': 'authStepLogin',
        'register': 'authStepRegister',
        'verify': 'authStepVerifyOtp',
        'welcome': 'authStepWelcome'
    };
    Object.keys(steps).forEach(k => {
        const el = document.getElementById(steps[k]);
        if (el) el.style.display = (k === step) ? 'block' : 'none';
    });
};

window.togglePasswordVisibility = function (inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById('eyeIcon' + inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    } else {
        input.type = 'password';
        if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
};

window.toggle3dAnimationSetting = function (enabled) {
    try {
        localStorage.setItem('alits_3d_animation_enabled', enabled ? 'true' : 'false');
        if (window.BackendSync && typeof window.BackendSync.showToast === 'function') {
            BackendSync.showToast(`3D Canvas visuals ${enabled ? 'Enabled' : 'Disabled'}`, 'Settings');
        }
    } catch (e) { }
};

window.closeAuthModal = function () {
    const card = document.querySelector('.cinematic-login-card');
    const controls = document.getElementById('authCampusViewControls');

    if (sessionStorage.getItem('ALITS_LOGGED_IN') === 'true') {
        const modal = document.getElementById('authModal');
        if (modal) modal.classList.remove('active');
        const appWrapper = document.getElementById('erpAppWrapper');
        if (appWrapper) appWrapper.style.display = 'flex';
    } else {
        // When not yet logged in, closing the login card leaves the pristine full campus background!
        if (card) card.style.display = 'none';
        if (controls) controls.style.display = 'block';
    }
};

window.showAuthCardAgain = function () {
    const card = document.querySelector('.cinematic-login-card');
    const controls = document.getElementById('authCampusViewControls');
    if (card) {
        card.style.display = 'block';
        card.scrollIntoView({ behavior: 'smooth' });
    }
    if (controls) controls.style.display = 'none';
};

document.getElementById('openAuthModalBtn')?.addEventListener('click', () => openAuthModal('login'));

window.currentAuthRole = 'student';

window.switchAuthRole = function (role) {
    window.currentAuthRole = role;

    // Update tab pills active state
    ['student', 'faculty', 'management'].forEach(r => {
        const tabEl = document.getElementById(`authRoleTab-${r}`);
        const gridEl = document.getElementById(`chipsGrid-${r}`);
        if (tabEl) {
            if (r === role) tabEl.classList.add('active');
            else tabEl.classList.remove('active');
        }
        if (gridEl) {
            gridEl.style.display = (r === role) ? 'grid' : 'none';
        }
    });

    const headerTitle = document.getElementById('authRoleHeaderTitle');
    const headerSubtitle = document.getElementById('authRoleHeaderSubtitle');
    const labelEl = document.getElementById('loginIdentifierLabel');
    const iconEl = document.getElementById('loginIdentifierIcon');
    const emailField = document.getElementById('loginEmail');
    const passField = document.getElementById('loginPassword');
    const dividerText = document.getElementById('authDividerText');
    const btnSubmitText = document.getElementById('btnLoginSubmitText');

    if (role === 'student') {
        if (headerTitle) headerTitle.innerText = 'Student & Parent Portal';
        if (headerSubtitle) headerSubtitle.innerText = 'Official portal for attendance, online fee payment, marks & homework';
        if (labelEl) labelEl.innerText = 'Roll Number / Registered Parent Mobile';
        if (iconEl) iconEl.className = 'fa-regular fa-id-card field-icon';
        if (emailField) {
            emailField.placeholder = 'e.g. 242G1A05O1 or 9949903968';
            emailField.value = '242G1A05O1';
        }
        if (passField) {
            passField.placeholder = 'Enter password (demo1234)';
            passField.value = 'demo1234';
        }
        if (dividerText) dividerText.innerText = 'OR ENTER STUDENT / PARENT CREDENTIALS';
        if (btnSubmitText) btnSubmitText.innerText = 'OPEN STUDENT & PARENT PORTAL';
        quickStudentLogin(0);
    } else if (role === 'faculty') {
        if (headerTitle) headerTitle.innerText = 'Faculty & Staff Directorate';
        if (headerSubtitle) headerSubtitle.innerText = 'Academic management, marks entry, student roster & class tools';
        if (labelEl) labelEl.innerText = 'Faculty ID / Official Email Address';
        if (iconEl) iconEl.className = 'fa-solid fa-chalkboard-user field-icon';
        if (emailField) {
            emailField.placeholder = 'e.g. AL00456 or manjula.cse@alits.ac.in';
            emailField.value = 'AL00456';
        }
        if (passField) {
            passField.placeholder = 'Enter password (Default is Faculty ID)';
            passField.value = 'AL00456';
        }
        if (dividerText) dividerText.innerText = 'OR ENTER FACULTY / STAFF CREDENTIALS';
        if (btnSubmitText) btnSubmitText.innerText = 'OPEN FACULTY PORTAL';
        quickFacultyLogin('manjula');
    } else if (role === 'management') {
        if (headerTitle) headerTitle.innerText = 'Management ERP Command Center';
        if (headerSubtitle) headerSubtitle.innerText = 'Executive governance, live institutional KPIs & command controls';
        if (labelEl) labelEl.innerText = 'Executive Email / User ID';
        if (iconEl) iconEl.className = 'fa-regular fa-envelope field-icon';
        if (emailField) {
            emailField.placeholder = 'chairman@alits.ac.in';
            emailField.value = 'chairman@alits.ac.in';
        }
        if (passField) {
            passField.placeholder = 'Enter password (admin456)';
            passField.value = 'admin456';
        }
        if (dividerText) dividerText.innerText = 'OR ENTER EXECUTIVE CREDENTIALS';
        if (btnSubmitText) btnSubmitText.innerText = 'LOGIN TO MANAGEMENT ERP';
        quickExecutiveLogin('chairman');
    }
};

window.quickStudentLogin = function (index = 0) {
    const students = [
        { roll: '242G1A05O1', name: 'Gulagani Tirumalaiah', branch: 'CSE', pass: 'Tirumala@242' },
        { roll: '242G1A05O2', name: 'H.Sreedhar', branch: 'CSE', pass: 'Sreedhar#05O2' },
        { roll: '242G1A05O3', name: 'M. Divya Sree', branch: 'CSE', pass: 'DivyaSree$05O3' },
        { roll: '242G1A05O4', name: 'K. Sai Sharath', branch: 'CSE', pass: 'SaiSharath@05O4' },
        { roll: '242G1A05O5', name: 'P. Bhavana Reddy', branch: 'CSE', pass: 'Bhavana#05O5' },
        { roll: '242G1A05O6', name: 'V. Naresh Kumar', branch: 'CSE', pass: 'Naresh$05O6' },
        { roll: '242G1A05O7', name: 'B. Meghana', branch: 'CSE', pass: 'Meghana@05O7' },
        { roll: '242G1A05O8', name: 'C. Tharun Teja', branch: 'CSE', pass: 'Tharun#05O8' },
        { roll: '242G1A05O9', name: 'D. Anusha', branch: 'CSE', pass: 'Anusha$05O9' },
        { roll: '242G1A05P0', name: 'E. Harish', branch: 'CSE', pass: 'Harish@05P0' },
        { roll: '242G1A05P1', name: 'G. Lokesh', branch: 'CSE', pass: 'Lokesh#05P1' },
        { roll: '242G1A05P2', name: 'J. Pavithra', branch: 'CSE', pass: 'Pavithra$05P2' }
    ];
    const std = students[index] || students[0];
    const emailField = document.getElementById('loginEmail');
    const passField = document.getElementById('loginPassword');
    if (emailField) emailField.value = std.roll;
    if (passField) passField.value = std.pass;

    document.querySelectorAll('#chipsGrid-student .cinematic-chip-card').forEach(c => c.classList.remove('active'));
    document.getElementById(`chip-std-${index + 1}`)?.classList.add('active');

    if (typeof showLiveSyncToast === 'function') {
        showLiveSyncToast(`Selected Student: ${std.name} (${std.roll}). Click to open Student Portal.`, 'student');
    }
};

window.quickParentLogin = function (index = 0) {
    const emailField = document.getElementById('loginEmail');
    const passField = document.getElementById('loginPassword');
    if (emailField) emailField.value = '9949903968';
    if (passField) passField.value = 'demo1234';

    document.querySelectorAll('#chipsGrid-student .cinematic-chip-card').forEach(c => c.classList.remove('active'));
    document.getElementById('chip-parent-1')?.classList.add('active');

    if (typeof showLiveSyncToast === 'function') {
        showLiveSyncToast(`Selected Parent: G. Tirupathaiah (9949903968). Click to open Parent Portal.`, 'parent');
    }
};

window.quickFacultyLogin = function (facKey = 'manjula') {
    const facDirectory = {
        manjula: { id: 'AL00456', email: 'manjula.cse@alits.ac.in', name: 'MS. A. Manjula', chip: 'chip-fac-1' },
        ramanappa: { id: 'AL00457', email: 'hod.cse@alits.ac.in', name: 'Dr. K. Bhargavi', chip: 'chip-fac-2' },
        ramesh: { id: 'AL00458', email: 'ramesh.naidu.alits@gmail.com', name: 'Sri K. Ramesh', chip: 'chip-fac-3' },
        rojaramani: { id: 'AL00459', email: 'rojaramani.cse@alits.ac.in', name: 'Mrs. G. Roja Ramani', chip: 'chip-fac-4' }
    };
    const fac = facDirectory[facKey] || facDirectory.manjula;
    const emailField = document.getElementById('loginEmail');
    const passField = document.getElementById('loginPassword');
    if (emailField) emailField.value = fac.id;
    if (passField) passField.value = fac.id;

    document.querySelectorAll('#chipsGrid-faculty .cinematic-chip-card').forEach(c => c.classList.remove('active'));
    document.getElementById(fac.chip)?.classList.add('active');

    if (typeof showLiveSyncToast === 'function') {
        showLiveSyncToast(`Selected Faculty: ${fac.name} (${fac.id}). Click to open Faculty Portal.`, 'faculty');
    }
};

window.quickExecutiveLogin = function (roleKey) {
    const exec = EXECUTIVE_ACCOUNTS[roleKey] || EXECUTIVE_ACCOUNTS.chairman;

    const emailField = document.getElementById('loginEmail');
    if (emailField) emailField.value = exec.email;

    const passField = document.getElementById('loginPassword');
    if (passField) {
        passField.value = 'admin456';
    }

    // Highlight active chip card in Management grid
    document.querySelectorAll('#chipsGrid-management .cinematic-chip-card').forEach(chip => chip.classList.remove('active'));
    const targetChip = document.getElementById(`chip-${roleKey}`);
    if (targetChip) targetChip.classList.add('active');

    if (typeof showLiveSyncToast === 'function') {
        showLiveSyncToast(`Selected Executive: ${exec.name} (${exec.role}). Click "LOGIN TO MANAGEMENT ERP".`, 'management');
    }
};

window.handleMultiRoleLoginSubmit = function (e) {
    if (e) e.preventDefault();
    const activeRole = window.currentAuthRole || 'management';
    window.location.href = `auth.html?portal=${encodeURIComponent(activeRole)}`;
};

window.handleLoginSubmit = window.handleMultiRoleLoginSubmit;

window.handleExecutiveLogout = function () {
    if (typeof AuthGuard !== 'undefined') {
        AuthGuard.logout();
    } else {
        sessionStorage.clear();
        localStorage.removeItem('alits_portal_user');
        localStorage.removeItem('alits_active_session');
        window.location.replace('auth.html?msg=logged_out');
    }
};

window.changeExecutiveAdminPassword = function () {
    const newPass = document.getElementById('settingsNewPass')?.value;

    if (!newPass || newPass.trim().length < 4) {
        alert('Please enter a valid password (minimum 4 characters)');
        return;
    }

    state.adminPassword = newPass.trim();
    saveState();

    const loginPassField = document.getElementById('loginPassword');
    if (loginPassField) loginPassField.value = state.adminPassword;

    alert(`🔑 SUCCESS! Executive Security Password updated to "${state.adminPassword}"`);
};

window.handleRegisterSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('regFullName').value || 'Dr. K. Sreenivasulu';
    const email = document.getElementById('regEmail').value || 'principal@alits.ac.in';

    document.getElementById('otpTargetEmail').innerText = email;
    document.getElementById('welcomeUserName').innerText = name + '!';

    currentDemoOtp = Math.floor(100000 + Math.random() * 900000).toString();
    document.getElementById('demoOtpCodeDisplay').innerText = currentDemoOtp;

    const pinBoxes = document.querySelectorAll('#otpDigitInputs .otp-pin-box');
    pinBoxes.forEach((box, i) => {
        box.value = currentDemoOtp[i] || '';
    });

    switchAuthStep('verify');
};

function initOtpInputAutoAdvance() {
    const boxes = document.querySelectorAll('#otpDigitInputs .otp-pin-box');
    boxes.forEach((box, idx) => {
        box.addEventListener('keyup', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                if (idx < boxes.length - 1) boxes[idx + 1].focus();
            } else if (e.key === 'Backspace') {
                if (idx > 0) boxes[idx - 1].focus();
            }
        });
    });
}

function startOtpCountdownTimer() {
    clearInterval(otpTimerInterval);
    otpTimeRemaining = 299;

    const timerEl = document.getElementById('otpCountdownTimer');
    otpTimerInterval = setInterval(() => {
        if (otpTimeRemaining <= 0) {
            clearInterval(otpTimerInterval);
            if (timerEl) timerEl.innerText = "00:00 (Expired)";
            return;
        }

        const mins = Math.floor(otpTimeRemaining / 60).toString().padStart(2, '0');
        const secs = (otpTimeRemaining % 60).toString().padStart(2, '0');
        if (timerEl) timerEl.innerText = `${mins}:${secs}`;
        otpTimeRemaining--;
    }, 1000);
}

window.resendDemoOtp = function () {
    currentDemoOtp = Math.floor(100000 + Math.random() * 900000).toString();
    document.getElementById('demoOtpCodeDisplay').innerText = currentDemoOtp;

    const pinBoxes = document.querySelectorAll('#otpDigitInputs .otp-pin-box');
    pinBoxes.forEach((box, i) => {
        box.value = currentDemoOtp[i] || '';
    });

    startOtpCountdownTimer();
    alert(`✓ Resent Demo OTP: ${currentDemoOtp}`);
};

window.handleVerifyOtpSubmit = function () {
    const boxes = document.querySelectorAll('#otpDigitInputs .otp-pin-box');
    let enteredCode = '';
    boxes.forEach(b => enteredCode += b.value);

    if (enteredCode === currentDemoOtp || enteredCode === '482175' || enteredCode.length === 6) {
        const name = document.getElementById('regFullName')?.value || 'Dr. K. Sreenivasulu';
        setExecutiveLoggedInUser({
            name: name,
            role: "Principal",
            initials: "KS"
        });
        switchAuthStep('welcome');
    } else {
        alert('❌ Invalid OTP Code! Please enter the Demo OTP displayed on screen.');
    }
};

function setExecutiveLoggedInUser(exec) {
    const avatarEl = document.getElementById('sidebarAvatar');
    const nameEl = document.getElementById('sidebarUserName');
    const roleEl = document.getElementById('sidebarUserRole');
    const topNameEl = document.getElementById('topbarUserName');
    const topAvatarImg = document.querySelector('.ar-avatar-glow .ar-avatar-img');

    if (avatarEl) {
        if (exec.role?.toLowerCase().includes('vice') || exec.name?.toLowerCase().includes('ramesh')) {
            avatarEl.innerHTML = `<img src="images/vice_chairman_ramesh_naidu.png" alt="${exec.name}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
        } else if (exec.role?.toLowerCase().includes('chairman') || exec.name?.toLowerCase().includes('anantha')) {
            avatarEl.innerHTML = `<img src="images/chairman_anantha_ramudu.png" alt="${exec.name}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
        } else if (exec.role?.toLowerCase().includes('principal') || exec.name?.toLowerCase().includes('sreenivasulu')) {
            avatarEl.innerHTML = `<img src="images/principal_profile.png" alt="${exec.name}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.src='images/principal_sreenivasulu.png'">`;
        } else if (exec.role?.toLowerCase().includes('skill') || exec.name?.toLowerCase().includes('surendra')) {
            avatarEl.innerHTML = `<img src="images/skill_director_surendra_naidu.png" alt="${exec.name}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.src='images/skill_director.png'">`;
        } else {
            avatarEl.innerText = exec.initials || 'EX';
        }
    }

    if (topAvatarImg) {
        if (exec.role?.toLowerCase().includes('vice') || exec.name?.toLowerCase().includes('ramesh')) {
            topAvatarImg.src = 'images/vice_chairman_ramesh_naidu.png';
        } else if (exec.role?.toLowerCase().includes('principal') || exec.name?.toLowerCase().includes('sreenivasulu')) {
            topAvatarImg.src = 'images/principal_profile.png';
        } else if (exec.role?.toLowerCase().includes('skill') || exec.name?.toLowerCase().includes('surendra')) {
            topAvatarImg.src = 'images/skill_director_surendra_naidu.png';
        } else {
            topAvatarImg.src = 'images/chairman_anantha_ramudu.png';
        }
    }

    if (nameEl) nameEl.innerText = exec.name;
    if (roleEl) roleEl.innerText = `${exec.role} (Online)`;
    if (topNameEl) topNameEl.innerText = `${exec.name}`;

    const settingsExecName = document.getElementById('settingsActiveExecName');
    if (settingsExecName) settingsExecName.innerText = `${exec.name} (${exec.role})`;

    window.currentExecutiveRole = exec.role || '';
    sessionStorage.setItem('ALITS_USER_ROLE', exec.role || '');
}

window.enterErpFromAuth = function () {
    closeAuthModal();

    const role = (window.currentExecutiveRole || sessionStorage.getItem('ALITS_USER_ROLE') || '').toLowerCase();

    // AUTOMATIC ROUTING BASED ON EXECUTIVE ROLE:
    if (role.includes('skill') || role.includes('surendra')) {
        // Skill Dev Director -> Automatically open Skill Development Directorate
        switchErpView('view-skill');
    } else if (role.includes('principal') || role.includes('sreenivasulu')) {
        // Principal -> Automatically open Autonomous Examination Center
        switchErpView('view-exams');
    } else {
        // Chairman / Vice-Chairman -> Main Dashboard
        switchErpView('view-dashboard');
    }
};

/* 3D Background Canvas Animation in Auth Portal */
function init3DAuthCanvas() {
    const canvas = document.getElementById('canvas3dAuth');
    if (!canvas) return;

    const modal = document.getElementById('authModal');
    if (!modal || !modal.classList.contains('active')) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement.clientHeight || 540);

    let angle = 0;
    function animate() {
        if (!modal || !modal.classList.contains('active')) return;
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        angle += 0.02;
        const cx = width / 2;
        const cy = height / 2 - 40;

        ctx.strokeStyle = 'rgba(0, 188, 212, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 75 + Math.sin(angle) * 5, 0, Math.PI * 2);
        ctx.stroke();

        for (let i = 0; i < 12; i++) {
            let a = angle + (i * Math.PI / 6);
            let px = cx + Math.cos(a) * 75;
            let py = cy + Math.sin(a) * 75;
            ctx.fillStyle = '#00bcd4';
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    animate();
}

/* Command Center Clock */
function initCommandCenterClock() {
    setInterval(() => {
        const clock = document.getElementById('cmdDigitalClock');
        if (clock) {
            const now = new Date();
            clock.innerText = now.toTimeString().split(' ')[0];
        }
    }, 1000);
}

function renderCommandCenterView() {
    renderAttendanceDonutChart();
    renderCmdFlowChart();
}

function renderAttendanceDonutChart() {
    const canvas = document.getElementById('attendanceDonutCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = 55;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#223344';
    ctx.lineWidth = 18;
    ctx.stroke();

    const presentAngle = Math.PI * 2 * 0.962;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + presentAngle);
    ctx.strokeStyle = '#e040fb';
    ctx.lineWidth = 18;
    ctx.stroke();

    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('96.2%', centerX, centerY);
}

/* ==========================================================================
   COMMAND CENTER FINANCIAL FLOW ENGINE - UP & DOWN OSCILLATION ANIMATION
   ========================================================================== */
window.currentFlowTimeframe = 'week';
let flowAnimFrameId = null;
let flowWavePhase = 0;
let flowParticles = [];

function initFlowParticles(w, h) {
    flowParticles = [];
    for (let i = 0; i < 16; i++) {
        flowParticles.push({
            x: Math.random() * (w || 400),
            y: Math.random() * (h || 160),
            speed: 0.35 + Math.random() * 0.7,
            dir: i % 2 === 0 ? -1 : 1,
            size: 2 + Math.random() * 2.5,
            alpha: 0.25 + Math.random() * 0.55,
            color: i % 2 === 0 ? '#00ffcc' : '#f43f5e',
            icon: i % 2 === 0 ? '▲' : '▼'
        });
    }
}

window.setFinancialFlowTimeframe = function (timeframe) {
    window.currentFlowTimeframe = timeframe;
    const btnDay = document.getElementById('btnFlowDay');
    const btnWeek = document.getElementById('btnFlowWeek');
    const lbl = document.getElementById('flowTimeframeLabel');

    if (btnDay && btnWeek) {
        if (timeframe === 'day') {
            btnDay.classList.add('active');
            btnWeek.classList.remove('active');
            if (lbl) lbl.innerText = 'CURRENT: INTRADAY HOURLY FLOW';
        } else {
            btnWeek.classList.add('active');
            btnDay.classList.remove('active');
            if (lbl) lbl.innerText = 'CURRENT: 7-DAY WEEKLY FLOW';
        }
    }
    renderCmdFlowChart();
};

function renderCmdFlowChart() {
    const canvas = document.getElementById('cmdFlowCanvas');
    if (!canvas) return;

    // Fallback data if backend state hasn't populated yet
    const defaultFin = {
        day: {
            labels: ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"],
            inflow: [45000, 120000, 85000, 160000, 95000, 210000, 140000],
            outflow: [15000, 30000, 25000, 40000, 20000, 55000, 35000],
            totalInflow: 855000,
            totalOutflow: 220000,
            netSurplus: 635000
        },
        week: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            inflow: [520000, 680000, 740000, 610000, 890000, 450000, 180000],
            outflow: [180000, 210000, 195000, 220000, 310000, 140000, 60000],
            totalInflow: 4070000,
            totalOutflow: 1315000,
            netSurplus: 2755000
        }
    };

    const fin = (state && state.financialFlow) ? state.financialFlow : defaultFin;
    const mode = window.currentFlowTimeframe || 'week';
    const activeData = fin[mode] || defaultFin[mode] || defaultFin['week'];

    // Update real-time KPI stats bar
    const inflowEl = document.getElementById('flowInflowVal');
    const outflowEl = document.getElementById('flowOutflowVal');
    const netEl = document.getElementById('flowNetVal');

    if (inflowEl) inflowEl.innerText = `₹${(activeData.totalInflow || 0).toLocaleString('en-IN')}`;
    if (outflowEl) outflowEl.innerText = `₹${(activeData.totalOutflow || 0).toLocaleString('en-IN')}`;
    if (netEl) {
        const net = activeData.netSurplus !== undefined ? activeData.netSurplus : ((activeData.totalInflow || 0) - (activeData.totalOutflow || 0));
        netEl.innerText = `${net >= 0 ? '+' : '-'}₹${Math.abs(net).toLocaleString('en-IN')}`;
        netEl.style.color = net >= 0 ? '#00ffcc' : '#f43f5e';
    }

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const parent = canvas.parentElement;
    const clientW = parent ? parent.clientWidth : 500;
    const clientH = 160;

    if (canvas.width !== clientW * dpr || canvas.height !== clientH * dpr) {
        canvas.width = clientW * dpr;
        canvas.height = clientH * dpr;
        initFlowParticles(clientW, clientH);
    }

    if (flowParticles.length === 0) {
        initFlowParticles(clientW, clientH);
    }

    if (flowAnimFrameId) {
        cancelAnimationFrame(flowAnimFrameId);
    }

    function drawFrame() {
        const cmdPane = document.getElementById('view-command-center');
        if (!cmdPane || cmdPane.style.display === 'none' || !canvas.offsetParent) {
            flowAnimFrameId = null;
            return;
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, clientW, clientH);

        flowWavePhase += 0.038;

        // Subtle glowing grid lines
        const gridSteps = 4;
        ctx.lineWidth = 1;
        for (let g = 0; g <= gridSteps; g++) {
            const gy = 18 + (g * (clientH - 38)) / gridSteps;
            ctx.beginPath();
            ctx.strokeStyle = g === gridSteps ? 'rgba(51, 65, 85, 0.6)' : 'rgba(30, 41, 59, 0.4)';
            ctx.setLineDash(g === gridSteps ? [] : [4, 4]);
            ctx.moveTo(35, gy);
            ctx.lineTo(clientW - 10, gy);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        const labels = activeData.labels || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const inflowVals = activeData.inflow || [0, 0, 0, 0, 0, 0, 0];
        const outflowVals = activeData.outflow || [0, 0, 0, 0, 0, 0, 0];
        const len = labels.length;
        const maxVal = Math.max(...inflowVals, ...outflowVals, 100000) * 1.25;

        const leftPad = 42;
        const rightPad = 20;
        const topPad = 22;
        const bottomPad = 26;
        const chartW = clientW - leftPad - rightPad;
        const chartH = clientH - topPad - bottomPad;
        const stepX = chartW / (len - 1);

        const inflowPoints = [];
        const outflowPoints = [];

        for (let i = 0; i < len; i++) {
            const px = leftPad + i * stepX;
            // Primary wave up/down animation (sinusoidal undulating wave)
            const oscUp = Math.sin(flowWavePhase * 2.6 + i * 0.9) * 7.5;
            const oscDown = Math.cos(flowWavePhase * 2.1 + i * 0.8) * 5.5;

            const baseInflowY = topPad + chartH - ((inflowVals[i] || 0) / maxVal) * chartH;
            const pyInflow = Math.max(topPad, Math.min(topPad + chartH, baseInflowY + oscUp));

            const baseOutflowY = topPad + chartH - ((outflowVals[i] || 0) / maxVal) * chartH;
            const pyOutflow = Math.max(topPad, Math.min(topPad + chartH, baseOutflowY + oscDown));

            inflowPoints.push({ x: px, y: pyInflow, val: inflowVals[i] });
            outflowPoints.push({ x: px, y: pyOutflow, val: outflowVals[i] });
        }

        // 1. Draw Inflow Wave Gradient & Line (Mint/Cyan #00ffcc)
        if (inflowPoints.length > 0) {
            ctx.beginPath();
            ctx.moveTo(inflowPoints[0].x, inflowPoints[0].y);
            for (let i = 0; i < len - 1; i++) {
                const xc = (inflowPoints[i].x + inflowPoints[i + 1].x) / 2;
                const yc = (inflowPoints[i].y + inflowPoints[i + 1].y) / 2;
                ctx.quadraticCurveTo(inflowPoints[i].x, inflowPoints[i].y, xc, yc);
            }
            ctx.lineTo(inflowPoints[len - 1].x, inflowPoints[len - 1].y);

            const fillGrad = ctx.createLinearGradient(0, topPad, 0, topPad + chartH);
            fillGrad.addColorStop(0, 'rgba(0, 255, 204, 0.32)');
            fillGrad.addColorStop(0.6, 'rgba(0, 188, 212, 0.12)');
            fillGrad.addColorStop(1, 'rgba(0, 255, 204, 0.01)');

            ctx.lineTo(inflowPoints[len - 1].x, topPad + chartH);
            ctx.lineTo(inflowPoints[0].x, topPad + chartH);
            ctx.closePath();
            ctx.fillStyle = fillGrad;
            ctx.fill();

            // Stroke line with glow
            ctx.beginPath();
            ctx.moveTo(inflowPoints[0].x, inflowPoints[0].y);
            for (let i = 0; i < len - 1; i++) {
                const xc = (inflowPoints[i].x + inflowPoints[i + 1].x) / 2;
                const yc = (inflowPoints[i].y + inflowPoints[i + 1].y) / 2;
                ctx.quadraticCurveTo(inflowPoints[i].x, inflowPoints[i].y, xc, yc);
            }
            ctx.lineTo(inflowPoints[len - 1].x, inflowPoints[len - 1].y);
            ctx.strokeStyle = '#00ffcc';
            ctx.lineWidth = 2.8;
            ctx.shadowColor = 'rgba(0, 255, 204, 0.7)';
            ctx.shadowBlur = 8;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        // 2. Draw Outflow Wave Gradient & Line (Rose #f43f5e)
        if (outflowPoints.length > 0) {
            ctx.beginPath();
            ctx.moveTo(outflowPoints[0].x, outflowPoints[0].y);
            for (let i = 0; i < len - 1; i++) {
                const xc = (outflowPoints[i].x + outflowPoints[i + 1].x) / 2;
                const yc = (outflowPoints[i].y + outflowPoints[i + 1].y) / 2;
                ctx.quadraticCurveTo(outflowPoints[i].x, outflowPoints[i].y, xc, yc);
            }
            ctx.lineTo(outflowPoints[len - 1].x, outflowPoints[len - 1].y);

            const fillGradOut = ctx.createLinearGradient(0, topPad, 0, topPad + chartH);
            fillGradOut.addColorStop(0, 'rgba(244, 63, 94, 0.22)');
            fillGradOut.addColorStop(1, 'rgba(244, 63, 94, 0.01)');

            ctx.lineTo(outflowPoints[len - 1].x, topPad + chartH);
            ctx.lineTo(outflowPoints[0].x, topPad + chartH);
            ctx.closePath();
            ctx.fillStyle = fillGradOut;
            ctx.fill();

            // Stroke line
            ctx.beginPath();
            ctx.moveTo(outflowPoints[0].x, outflowPoints[0].y);
            for (let i = 0; i < len - 1; i++) {
                const xc = (outflowPoints[i].x + outflowPoints[i + 1].x) / 2;
                const yc = (outflowPoints[i].y + outflowPoints[i + 1].y) / 2;
                ctx.quadraticCurveTo(outflowPoints[i].x, outflowPoints[i].y, xc, yc);
            }
            ctx.lineTo(outflowPoints[len - 1].x, outflowPoints[len - 1].y);
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 2.2;
            ctx.stroke();
        }

        // 3. Draw Breathing Data Nodes & Labels
        for (let i = 0; i < len; i++) {
            const ptIn = inflowPoints[i];
            const ptOut = outflowPoints[i];
            const pulse = Math.sin(flowWavePhase * 3 + i) * 1.5;

            // Inflow dot
            ctx.beginPath();
            ctx.arc(ptIn.x, ptIn.y, 4 + pulse, 0, Math.PI * 2);
            ctx.fillStyle = '#00ffcc';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#051329';
            ctx.stroke();

            // Outflow dot
            ctx.beginPath();
            ctx.arc(ptOut.x, ptOut.y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#f43f5e';
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = '#051329';
            ctx.stroke();

            // X-Axis Day/Time Labels
            ctx.fillStyle = '#94a3b8';
            ctx.font = '600 10px "Inter", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(labels[i], ptIn.x, topPad + chartH + 16);
        }

        // 4. Draw Floating Up & Down Telemetry Particles
        for (let p of flowParticles) {
            p.y += p.dir * p.speed;
            if (p.dir === -1 && p.y < topPad) {
                p.y = topPad + chartH;
                p.x = leftPad + Math.random() * chartW;
            } else if (p.dir === 1 && p.y > topPad + chartH) {
                p.y = topPad;
                p.x = leftPad + Math.random() * chartW;
            }

            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.font = '8px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(p.icon, p.x, p.y);
        }
        ctx.globalAlpha = 1.0;

        ctx.restore();

        if (document.getElementById('cmdFlowCanvas') && cmdPane && cmdPane.style.display !== 'none' && canvas.offsetParent) {
            flowAnimFrameId = requestAnimationFrame(drawFrame);
        } else {
            flowAnimFrameId = null;
        }
    }

    drawFrame();
}

/* ==========================================================================
   Render All Dynamic Views - High-Performance On-Demand & Idle Architecture
   ========================================================================== */
const VIEW_RENDERERS = {
    'view-command-center': () => { if (typeof renderCommandCenterView === 'function') renderCommandCenterView(); },
    'view-fees': () => { if (typeof renderCollectFeesView === 'function') renderCollectFeesView(); },
    'view-students': () => { if (typeof renderStudentsView === 'function') renderStudentsView(); },
    'view-certificates': () => { if (typeof renderCertificatesView === 'function') renderCertificatesView(); },
    'view-departments': () => { if (typeof renderDepartmentsView === 'function') renderDepartmentsView(); },
    'view-dept': () => { if (typeof renderDepartmentsView === 'function') renderDepartmentsView(); },
    'view-leadership': () => { if (typeof renderLeadershipView === 'function') renderLeadershipView(); },
    'view-hostel': () => { if (typeof renderHostelView === 'function') renderHostelView(); },
    'view-library': () => { if (typeof renderLibraryView === 'function') renderLibraryView(); },
    'view-governance': () => { if (typeof renderGovernanceView === 'function') renderGovernanceView(); },
    'view-skill': () => { if (typeof renderSkillDevView === 'function') renderSkillDevView(); },
    'view-transport': () => { if (typeof renderRouteTransportView === 'function') renderRouteTransportView(); },
    'view-hr': () => { if (typeof renderHrView === 'function') renderHrView(); },
    'view-settings': () => { if (typeof renderSettingsView === 'function') renderSettingsView(); },
    'view-idcards': () => {
        if (typeof renderIdCardsGrid === 'function') renderIdCardsGrid();
        if (typeof renderFacultyIdCardsGrid === 'function') renderFacultyIdCardsGrid();
    },
    'view-exams': () => { if (typeof renderExamsView === 'function') renderExamsView(); },
    'view-principal': () => { if (typeof renderPrincipalDirectorateView === 'function') renderPrincipalDirectorateView(); },
    'view-approvals': () => { if (typeof renderApprovalsView === 'function') renderApprovalsView(); },
    'view-dashboard': () => {
        if (typeof renderDashboardCalendar === 'function') renderDashboardCalendar();
        if (typeof renderFeeChart === 'function') renderFeeChart();
        if (typeof initLiveCounters === 'function') initLiveCounters();
    }
};

const erpViewDirtyMap = {};
const erpViewRenderedMap = {};
let idleQueue = [];
let isIdleScheduled = false;

function getActiveErpViewId() {
    const activeItem = document.querySelector('.sidebar-item.active');
    if (activeItem && activeItem.getAttribute('data-view')) {
        return activeItem.getAttribute('data-view');
    }
    const visiblePane = document.querySelector('.erp-view-pane:not([style*="display: none"])');
    return visiblePane ? visiblePane.id : 'view-dashboard';
}

function renderErpView(viewId) {
    const fn = VIEW_RENDERERS[viewId];
    if (fn) {
        try {
            fn();
            erpViewRenderedMap[viewId] = true;
            erpViewDirtyMap[viewId] = false;
        } catch (e) {
            console.error(`[ERP View] Error rendering ${viewId}:`, e);
        }
    }
}

function scheduleIdleViewPrerender() {
    // Disabled to prevent heavy DOM rendering (5,800 students, ID cards) from blocking the active dashboard
    return;
}

function renderAllViews(forceAll = false) {
    const activeViewId = getActiveErpViewId();

    // Immediately render active view with zero delay
    renderErpView(activeViewId);
    if (typeof updateApprovalCounters === 'function') updateApprovalCounters();

    // Mark other views as dirty so they render strictly on-demand
    for (const vId in VIEW_RENDERERS) {
        if (vId !== activeViewId) {
            erpViewDirtyMap[vId] = true;
        }
    }

    if (forceAll) {
        for (const vId in VIEW_RENDERERS) {
            if (vId !== activeViewId) renderErpView(vId);
        }
    }
}

/* ==========================================================================
   DYNAMIC ACADEMIC CALENDAR ENGINE (YEAR, MONTH, DATE & FESTIVALS)
   ========================================================================== */
window.prevCalMonth = function () {
    currentCalMonth--;
    if (currentCalMonth < 0) {
        currentCalMonth = 11;
        currentCalYear--;
    }
    renderDashboardCalendar();
};

window.nextCalMonth = function () {
    currentCalMonth++;
    if (currentCalMonth > 11) {
        currentCalMonth = 0;
        currentCalYear++;
    }
    renderDashboardCalendar();
};

window.resetCalToToday = function () {
    const now = new Date();
    currentCalYear = now.getFullYear();
    currentCalMonth = now.getMonth();
    renderDashboardCalendar();
};

window.viewFestivalDetails = function (name, dateStr) {
    alert(`🎉 ALITS Official Academic Calendar Notification:\n\nFestival / Holiday: ${name}\nDate: ${dateStr}\n\nCollege administrative offices, lectures, and laboratory sessions are suspended as per JNTUA & AP State gazetted notifications.`);
};

function renderDashboardCalendar() {
    const container = document.getElementById('calendarTableContainer');
    if (!container) return;

    const now = new Date();
    const isCurrentMonthView = (now.getFullYear() === currentCalYear && now.getMonth() === currentCalMonth);
    const todayDateNum = now.getDate();
    const todayMonthStr = (now.getMonth() + 1).toString().padStart(2, '0');
    const todayDayStr = now.getDate().toString().padStart(2, '0');
    const todayDateKey = `${now.getFullYear()}-${todayMonthStr}-${todayDayStr}`;

    const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
    const startDay = new Date(currentCalYear, currentCalMonth, 1).getDay();
    const monthName = MONTH_NAMES[currentCalMonth];

    const monthStr = (currentCalMonth + 1).toString().padStart(2, '0');
    const monthPrefix = `${currentCalYear}-${monthStr}`;
    const activeFestivals = (state.festivals || []).filter(f => f.date && f.date.startsWith(monthPrefix));
    const todayFestival = (state.festivals || []).find(f => f.date === todayDateKey);

    let html = `
        <div class="calendar-controls-bar">
            <div style="display: flex; gap: 4px;">
                <button class="btn-cal-ctrl" onclick="prevCalMonth()">&lt; Prev</button>
                <button class="btn-cal-ctrl" onclick="nextCalMonth()">Next &gt;</button>
                <button class="btn-cal-ctrl" style="background: #0088cc;" onclick="resetCalToToday()">Today</button>
            </div>
            <div class="calendar-month-title">${monthName} ${currentCalYear}</div>
            <div style="display: flex; gap: 4px;">
                <span class="code-badge-top" style="background: #00a65a; font-size: 11px;">📅 2026 Live Calendar</span>
            </div>
        </div>

        ${todayFestival ? `
            <div style="background: linear-gradient(90deg, #fff7ed, #fef2f2); border: 1px solid #f97316; border-left: 5px solid #ea580c; border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px rgba(234, 88, 12, 0.1);">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 24px;">🎉</span>
                    <div>
                        <strong style="color: #9a3412; font-size: 13px;">TODAY'S FESTIVAL / HOLIDAY: ${todayFestival.name}</strong>
                        <div style="font-size: 11px; color: #64748b;">Official campus holiday observed at Anantha Lakshmi Institute of Technology and Sciences.</div>
                    </div>
                </div>
                <span style="background: #ea580c; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 800; letter-spacing: 0.5px;">Campus Holiday</span>
            </div>
        ` : ''}

        <table class="calendar-table">
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
    `;

    let dayCount = 1;
    for (let r = 0; r < 6; r++) {
        if (dayCount > daysInMonth) break;
        html += '<tr>';
        for (let c = 0; c < 7; c++) {
            if (r === 0 && c < startDay) {
                html += '<td></td>';
            } else if (dayCount > daysInMonth) {
                html += '<td></td>';
            } else {
                let isToday = (isCurrentMonthView && dayCount === todayDateNum) ? 'today' : '';
                const dateKey = `${monthPrefix}-${dayCount.toString().padStart(2, '0')}`;
                let festival = activeFestivals.find(f => f.date === dateKey);
                let isHoliday = festival ? 'holiday' : '';

                html += `<td class="${isToday} ${isHoliday}" ${festival ? `onclick="viewFestivalDetails('${festival.name.replace(/'/g, "\\'")}', '${festival.date}')" style="cursor: pointer;" title="Click to view holiday notification"` : ''}>
                    <div style="font-size: 12px; font-weight: ${isToday ? '800' : '600'};">${dayCount}</div>
                    ${festival ? `<span style="font-size: 9px; color: #dd4b39; font-weight: 800; display: block; margin-top: 2px;">🎉 ${festival.name}</span>` : ''}
                </td>`;
                dayCount++;
            }
        }
        html += '</tr>';
    }
    html += '</tbody></table>';

    html += `
        <div style="margin-top: 14px; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 4px; padding: 12px;">
            <div style="font-size: 12px; font-weight: 800; color: #333; margin-bottom: 6px; display: flex; justify-content: space-between;">
                <span>🎉 Festivals & Public Holidays in ${monthName} ${currentCalYear}</span>
                <span style="color: #00a65a; font-weight: 800;">${activeFestivals.length} Holidays Listed</span>
            </div>
            ${activeFestivals.length > 0 ? `
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${activeFestivals.map(f => {
        const dayNum = parseInt(f.date.split('-')[2]);
        return `
                            <div onclick="viewFestivalDetails('${f.name.replace(/'/g, "\\'")}', '${f.date}')" style="background: #fff; border: 1px solid #dd4b39; padding: 5px 12px; border-radius: 4px; font-size: 11px; cursor: pointer; transition: transform 0.15s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                                <strong style="color: #dd4b39;">${monthName.substring(0, 3)} ${dayNum}:</strong> ${f.name}
                            </div>
                        `;
    }).join('')}
                </div>
            ` : `
                <div style="font-size: 11px; color: #777;">No major college holidays or gazetted festivals scheduled in ${monthName} ${currentCalYear}.</div>
            `}
        </div>
    `;

    container.innerHTML = html;
}

/* Fee Collection Line Chart Canvas */
function renderFeeChart() {
    const canvas = document.getElementById('feeChartCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = canvas.clientWidth || 300);
    const height = (canvas.height = canvas.clientHeight || 150);

    ctx.clearRect(0, 0, width, height);

    const points = [150, 300, 200, 750, 500, 1400, 650, 1850, 1200, 1760];
    const stepX = width / (points.length - 1);

    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    for (let y = 30; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(0, height - (points[0] / 2000) * height);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(i * stepX, height - (points[i] / 2000) * height);
    }
    ctx.strokeStyle = '#20c997';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = 'rgba(32, 201, 151, 0.15)';
    ctx.fill();
}

/* Finance & Fee Receipt Module */
function renderCollectFeesView() {
    const studentSelect = document.getElementById('feeStudentSelect');
    if (!studentSelect || !state.students) return;

    studentSelect.innerHTML = state.students.map(s => `
        <option value="${s.id}">${s.rollNo} - ${s.name} (${s.dept} ${s.year})</option>
    `).join('');

    if (state.students.length > 0) {
        renderFeeStudentDetails(state.students[0].id);
    }
}

window.renderFeeStudentDetails = function (studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    const card = document.getElementById('feeStudentHeaderCard');
    const tbody = document.getElementById('feesInstallmentsTbody');

    if (card) {
        card.innerHTML = `
            <div>
                <h3 style="font-size: 18px; color: #333; margin-bottom: 4px;">${student.name}</h3>
                <p style="font-size: 12px; color: #666;">Father Name: ${student.fatherName} | Mobile: ${student.mobile}</p>
                <p style="font-size: 12px; color: #666;">Dept: <strong>${student.dept}</strong> | Year & Sec: <strong>${student.year} (${student.section})</strong> | Roll No: <strong style="color: #3c8dbc;">${student.rollNo}</strong></p>
            </div>
            <div style="text-align: right;">
                <p style="font-size: 12px;">Total Assigned: <strong>₹${student.totalAssigned.toLocaleString()}</strong></p>
                <p style="font-size: 12px; color: #00a65a;">Total Paid: <strong>₹${student.totalPaid.toLocaleString()}</strong></p>
                <p style="font-size: 14px; color: #dd4b39; font-weight: 700;">Balance Due: ₹${student.balanceDue.toLocaleString()}</p>
            </div>
        `;
    }

    if (tbody) {
        tbody.innerHTML = student.installments.map((ins, idx) => {
            let badgeClass = ins.status === 'Paid' ? 'paid' : (ins.status === 'Partial' ? 'partial' : 'unpaid');
            return `
                <tr>
                    <td><input type="checkbox" ${ins.status === 'Paid' ? 'disabled checked' : ''} /> ${ins.name}</td>
                    <td>${ins.dueDate}</td>
                    <td><span class="badge-status ${badgeClass}">${ins.status}</span></td>
                    <td>₹${ins.amount.toLocaleString()}</td>
                    <td style="color: #00a65a; font-weight: 700;">₹${ins.paid.toLocaleString()}</td>
                    <td>₹${ins.discount}</td>
                    <td>₹${ins.fine}</td>
                    <td style="color: #dd4b39; font-weight: 700;">₹${ins.balance.toLocaleString()}</td>
                    <td>
                        <button class="btn-cal-ctrl" style="background: #00a65a;" onclick="payInstallment('${student.id}', ${idx})">💵 Pay</button>
                        <button class="btn-cal-ctrl" style="background: #0088cc;" onclick="editFeeInstallment('${student.id}', ${idx})">Edit</button>
                    </td>
                </tr>
            `;
        }).join('');
    }
};

window.payInstallment = function (studentId, insIdx) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    const ins = student.installments[insIdx];
    if (ins.balance <= 0) {
        alert('This installment is already fully paid!');
        return;
    }

    const payAmt = prompt(`Enter Payment Amount for ${ins.name} (Max Balance: ₹${ins.balance}):`, ins.balance);
    if (payAmt && !isNaN(payAmt) && Number(payAmt) > 0) {
        const target = state.students.find(s => s.id === studentId) || student;
        const targetIns = target.installments[insIdx];
        const amt = Math.min(Number(payAmt), targetIns.balance);
        targetIns.paid += amt;
        targetIns.balance -= amt;
        targetIns.status = targetIns.balance === 0 ? 'Paid' : 'Partial';

        target.totalPaid = target.installments.reduce((sum, item) => sum + item.paid, 0);
        target.balanceDue = target.totalAssigned - target.totalPaid;

        saveState({
            module: 'Fees',
            action: 'Fee Payment',
            summary: `Collected ₹${amt.toLocaleString()} fee payment for ${target.name} (${target.rollNo})`
        });
        renderCollectFeesView();
        alert(`✓ Successfully collected ₹${amt.toLocaleString()} for ${target.name}`);
    }
};

window.editFeeInstallment = function (studentId, insIdx) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    const ins = student.installments[insIdx];
    const newAmount = prompt(`Edit Total Amount for ${ins.name}:`, ins.amount);

    if (newAmount && !isNaN(newAmount)) {
        const target = state.students.find(s => s.id === studentId) || student;
        const targetIns = target.installments[insIdx];
        targetIns.amount = Number(newAmount);
        targetIns.balance = Math.max(0, targetIns.amount - targetIns.paid);
        targetIns.status = targetIns.balance === 0 ? 'Paid' : (targetIns.paid > 0 ? 'Partial' : 'Unpaid');

        target.totalAssigned = target.installments.reduce((sum, item) => sum + item.amount, 0);
        target.totalPaid = target.installments.reduce((sum, item) => sum + item.paid, 0);
        target.balanceDue = target.totalAssigned - target.totalPaid;

        saveState({
            module: 'Fees',
            action: 'Edit Installment',
            summary: `Updated ${targetIns.name} to ₹${targetIns.amount.toLocaleString()} for ${target.name}`
        });
        renderCollectFeesView();
    }
};

window.printActiveFeeReceipt = function () {
    const studentId = document.getElementById('feeStudentSelect').value;
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    const area = document.getElementById('printableReceiptArea');
    const modal = document.getElementById('feeReceiptModal');

    const receiptNo = `ALITS/FEE/2026/${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    area.innerHTML = `
        <div style="border: 2px solid #00a65a; padding: 20px; font-family: 'Source Sans Pro', sans-serif;">
            <div style="text-align: center; border-bottom: 2px solid #00a65a; padding-bottom: 12px; margin-bottom: 16px;">
                <h2 style="color: #00a65a; font-size: 20px; font-weight: 800; text-transform: uppercase; margin-bottom: 2px;">
                    Anantha Lakshmi Institute of Technology and Sciences (ALITS)
                </h2>
                <div style="font-size: 11px; color: #555;">
                    AUTONOMOUS INSTITUTION • CODE: 2G • Near Itikalapalli, Ananthapur - Chennai Highway, Anantapur (A.P)
                </div>
                <div style="font-size: 11px; color: #666; font-weight: 600;">
                    Approved by AICTE, Accredited by NBA & NAAC, Affiliated to JNTUA Anantapur
                </div>
                <div style="margin-top: 8px; background: #00a65a; color: white; padding: 2px 14px; border-radius: 12px; font-weight: 700; font-size: 12px; display: inline-block;">
                    OFFICIAL FEE PAYMENT RECEIPT
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 16px; background: #f8fafc; padding: 10px; border: 1px solid #e2e8f0;">
                <div>
                    <div><strong>Receipt No:</strong> ${receiptNo}</div>
                    <div><strong>Roll Number:</strong> <span style="font-family: var(--font-mono); font-weight: 700; color: #0088cc;">${student.rollNo}</span></div>
                    <div><strong>Student Name:</strong> ${student.name}</div>
                    <div><strong>Father's Name:</strong> ${student.fatherName}</div>
                </div>
                <div style="text-align: right;">
                    <div><strong>Date:</strong> ${todayStr}</div>
                    <div><strong>Department:</strong> ${student.dept}</div>
                    <div><strong>Academic Year:</strong> ${student.year} (Section ${student.section})</div>
                    <div><strong>Mobile:</strong> ${student.mobile}</div>
                </div>
            </div>

            <table class="table-custom" style="margin-bottom: 16px;">
                <thead>
                    <tr>
                        <th>Particulars / Fee Installment</th>
                        <th>Status</th>
                        <th>Assigned Amount</th>
                        <th>Amount Paid</th>
                        <th>Balance Due</th>
                    </tr>
                </thead>
                <tbody>
                    ${student.installments.map(ins => `
                        <tr>
                            <td>${ins.name} (${ins.dueDate})</td>
                            <td><strong style="color: ${ins.status === 'Paid' ? '#00a65a' : '#dd4b39'};">${ins.status}</strong></td>
                            <td>₹${ins.amount.toLocaleString()}</td>
                            <td>₹${ins.paid.toLocaleString()}</td>
                            <td>₹${ins.balance.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr style="background: #e8f4fb; font-weight: 700;">
                        <td colspan="2">TOTAL GRAND SUMMARY</td>
                        <td>₹${student.totalAssigned.toLocaleString()}</td>
                        <td style="color: #00a65a;">₹${student.totalPaid.toLocaleString()}</td>
                        <td style="color: #dd4b39;">₹${student.balanceDue.toLocaleString()}</td>
                    </tr>
                </tfoot>
            </table>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; font-size: 12px;">
                <div>
                    <p style="margin-bottom: 4px;"><strong>Payment Mode:</strong> Cash / Online Bank Transfer</p>
                    <p style="color: #666; font-size: 11px;">* Computer generated fee receipt. Keep safely for administrative records.</p>
                </div>
                <div style="text-align: center; border-top: 1px solid #aaa; padding-top: 4px; width: 180px;">
                    <div style="font-weight: 700; color: #333;">Accounts Officer / Cashier</div>
                    <div style="font-size: 10px; color: #777;">ALITS Anantapur</div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
};

window.closeFeeReceiptModal = function () {
    document.getElementById('feeReceiptModal').classList.remove('active');
};

window.sendFeeReceiptViaEmail = function () {
    const studentId = document.getElementById('feeStudentSelect')?.value;
    const student = state.students?.find(s => s.id === studentId);
    const email = student ? `${student.name.toLowerCase().replace(/\s+/g, '')}@alits.ac.in` : 'student@alits.ac.in';
    const mobile = student ? student.mobile : '+91 98491 11223';
    const name = student ? student.name : 'Student';
    const rollNo = student ? student.rollNo : '242G1A0501';
    const paidAmount = student ? (student.totalPaid || 55000).toLocaleString() : '55,000';
    const dueAmount = student ? (student.balanceDue || 0).toLocaleString() : '0';
    const receiptNo = `ALITS/FEE/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    const subject = `ALITS Fee Payment Receipt [${receiptNo}] - ${name} (${rollNo})`;
    const message = `ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES (ALITS)\nAutonomous Institution • Approved by AICTE, Accredited by NBA & NAAC\nNear Itikalapalli, Ananthapur - Chennai Highway, Anantapur (A.P)\n\n--- OFFICIAL ACADEMIC FEE PAYMENT RECEIPT ---\nReceipt Ref No: ${receiptNo}\nDate: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}\n\nStudent Name: ${name}\nRoll / Admission No: ${rollNo}\nDepartment: ${student ? student.dept : 'Engineering'} | Year: ${student ? student.year : '3rd Year'}\nTotal Fee Paid: ₹${paidAmount}\nOutstanding Balance: ₹${dueAmount}\nPayment Status: ${dueAmount === '0' ? 'FULL PAYMENT CLEARED' : 'PARTIAL PAYMENT'}\n\nThank you for your payment. For fee queries, contact ALITS Accounts Section.\nDigital Verification Portal: https://alits.ac.in/verify/fees`;

    openAlitsDispatchDialog({
        title: 'Fee Receipt Dispatch',
        subtitle: `Dispatching fee voucher for ${name} (${rollNo})`,
        docType: 'Official Fee Receipt',
        recipientName: `${name} (Parent / Student)`,
        mobile: mobile,
        email: email,
        subject: subject,
        message: message,
        requiredPermission: 'ALL_USERS',
        directAction: 'email'
    });
};

window.sendFeeReceiptViaWhatsApp = function () {
    const studentId = document.getElementById('feeStudentSelect')?.value;
    const student = state.students?.find(s => s.id === studentId);
    const email = student ? `${student.name.toLowerCase().replace(/\s+/g, '')}@alits.ac.in` : 'student@alits.ac.in';
    const mobile = student ? student.mobile : '+91 98491 11223';
    const name = student ? student.name : 'Student';
    const rollNo = student ? student.rollNo : '242G1A0501';
    const paidAmount = student ? (student.totalPaid || 55000).toLocaleString() : '55,000';
    const dueAmount = student ? (student.balanceDue || 0).toLocaleString() : '0';
    const receiptNo = `ALITS/FEE/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    const subject = `ALITS Fee Payment Receipt [${receiptNo}] - ${name}`;
    const message = `*ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES (ALITS)*\n*Official Fee Payment Receipt*\n\n📄 *Receipt Ref:* ${receiptNo}\n📅 *Date:* ${new Date().toLocaleDateString('en-GB')}\n👤 *Student:* ${name} (${rollNo})\n🎓 *Department:* ${student ? student.dept : 'Engineering'}\n💰 *Amount Paid:* ₹${paidAmount}\n💳 *Balance Due:* ₹${dueAmount}\n✅ *Status:* ${dueAmount === '0' ? 'Fully Cleared' : 'Partial Paid'}\n\n🔗 *Download Official PDF Receipt:* https://alits.ac.in/verify/receipt?id=${rollNo}`;

    openAlitsDispatchDialog({
        title: 'Fee Receipt WhatsApp Dispatch',
        subtitle: `Sending instant WhatsApp fee receipt for ${name}`,
        docType: 'Official Fee Receipt',
        recipientName: `${name} (Parent / Student)`,
        mobile: mobile,
        email: email,
        subject: subject,
        message: message,
        requiredPermission: 'ALL_USERS',
        directAction: 'whatsapp'
    });
};

window.sendFeeReceiptViaSms = window.sendFeeReceiptViaWhatsApp;

/* ==========================================================================
   CERTIFICATES GENERATOR MODULE (STUDY, CONDUCT, BONAFIDE, TRANSFER TC)
   ========================================================================== */
function renderCertificatesView() {
    const studentSelect = document.getElementById('certStudentSelect');
    if (!studentSelect || !state.students) return;

    studentSelect.innerHTML = state.students.map(s => `
        <option value="${s.id}">${s.rollNo} - ${s.name} (${s.dept} ${s.year})</option>
    `).join('');

    if (state.students.length > 0) {
        autoFillCertForm(state.students[0].id);
    }

    toggleCertFields('study');
}

window.autoFillCertForm = function (studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    document.getElementById('certNameInput').value = student.name;
    document.getElementById('certRollInput').value = student.rollNo;
    document.getElementById('certFatherInput').value = student.fatherName;
    document.getElementById('certDeptInput').value = `${student.dept} - ${student.year}`;
    const gmailEl = document.getElementById('certGmailInput');
    if (gmailEl) {
        gmailEl.value = `${student.name.toLowerCase().replace(/\s+/g, '')}@alits.ac.in`;
    }
};

window.toggleCertFields = function (certType) {
    const dynamicArea = document.getElementById('certDynamicFieldsArea');
    if (!dynamicArea) return;

    if (certType === 'degree') {
        dynamicArea.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group-erp">
                    <label>Degree Conferred *</label>
                    <input type="text" class="form-control-erp" id="certDegreeProgram" value="Bachelor of Technology (CSE)" />
                </div>
                <div class="form-group-erp">
                    <label>Autonomous Regulation *</label>
                    <input type="text" class="form-control-erp" id="certRegulation" value="R24 (Autonomous)" />
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group-erp">
                    <label>Final CGPA (out of 10.0) *</label>
                    <input type="text" class="form-control-erp" id="certCgpaVal" value="8.75 / 10.0" />
                </div>
                <div class="form-group-erp">
                    <label>Graduation Division / Honor *</label>
                    <select class="form-control-erp" id="certDivision">
                        <option value="First Class with Distinction" selected>First Class with Distinction</option>
                        <option value="First Class">First Class</option>
                        <option value="Second Class">Second Class</option>
                    </select>
                </div>
            </div>
        `;
    } else if (certType === 'conduct') {
        dynamicArea.innerHTML = `
            <div class="form-group-erp">
                <label>Conduct & Character Grade *</label>
                <select class="form-control-erp" id="certConductGrade">
                    <option value="GOOD AND EXEMPLARY">GOOD AND EXEMPLARY</option>
                    <option value="VERY GOOD">VERY GOOD</option>
                    <option value="SATISFACTORY">SATISFACTORY</option>
                </select>
            </div>
        `;
    } else if (certType === 'bonafide') {
        dynamicArea.innerHTML = `
            <div class="form-group-erp">
                <label>Purpose of Bonafide Issue *</label>
                <input type="text" class="form-control-erp" id="certBonafidePurpose" value="Bank Education Loan & Passport Verification" />
            </div>
        `;
    } else if (certType === 'tc') {
        dynamicArea.innerHTML = `
            <div class="form-group-erp">
                <label>Transfer Certificate Number (TC No) *</label>
                <input type="text" class="form-control-erp" id="certTcNo" value="ALITS/TC/2026/${Math.floor(100 + Math.random() * 900)}" />
            </div>
            <div style="display: flex; gap: 10px;">
                <div class="form-group-erp" style="flex: 1;">
                    <label>Date of Birth</label>
                    <input type="date" class="form-control-erp" id="certDobInput" value="2005-08-14" />
                </div>
                <div class="form-group-erp" style="flex: 1;">
                    <label>Date of Leaving</label>
                    <input type="date" class="form-control-erp" id="certDolInput" value="2028-05-31" />
                </div>
            </div>
            <div class="form-group-erp">
                <label>Reason for Leaving</label>
                <input type="text" class="form-control-erp" id="certTcReason" value="Course Completed Successfully" />
            </div>
        `;
    } else {
        dynamicArea.innerHTML = `
            <div class="form-group-erp">
                <label>Study Period / Academic Duration</label>
                <input type="text" class="form-control-erp" id="certStudyPeriod" value="Academic Years 2024 to 2028" />
            </div>
        `;
    }
};

window.generateAndPreviewCertificate = function () {
    const certType = document.getElementById('certTypeSelect').value;
    const name = document.getElementById('certNameInput').value;
    const rollNo = document.getElementById('certRollInput').value;
    const father = document.getElementById('certFatherInput').value;
    const dept = document.getElementById('certDeptInput').value;
    const batch = document.getElementById('certBatchInput').value;

    const area = document.getElementById('printableCertificateArea');
    const modal = document.getElementById('certificatePrintModal');
    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

    if (certType === 'degree') {
        const degreeProg = document.getElementById('certDegreeProgram')?.value || 'Bachelor of Technology (CSE)';
        const cgpaStr = document.getElementById('certCgpaVal')?.value || '8.75 / 10.0';
        const divisionStr = document.getElementById('certDivision')?.value || 'First Class with Distinction';
        const regStr = document.getElementById('certRegulation')?.value || 'Autonomous Regulations (R24)';

        area.innerHTML = `
            <div style="background: #fdfbf7; border: 8px double #c5a059; padding: 42px 36px; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); position: relative; overflow: hidden; font-family: 'Times New Roman', Georgia, serif;">
                <!-- Watermark Background -->
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 160px; font-weight: 900; color: rgba(197, 160, 89, 0.07); pointer-events: none; letter-spacing: 12px; z-index: 1;">
                    ALITS
                </div>

                <div style="position: relative; z-index: 2;">
                    <!-- HEADER -->
                    <div style="text-align: center; margin-bottom: 22px;">
                        <h2 style="font-size: 22px; font-weight: 900; color: #7a1f1d; letter-spacing: 0.8px; margin: 0 0 6px; text-transform: uppercase;">
                            ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES
                        </h2>
                        <div style="font-size: 12.5px; font-weight: 600; color: #1e293b; margin-bottom: 3px;">
                            (Autonomous - Permanently Affiliated to JNTUA | NAAC 'A+' Accredited)
                        </div>
                        <div style="font-size: 11.5px; color: #64748b;">
                            Near IT Expressway, Anantapuramu - 515721, Andhra Pradesh, India
                        </div>
                    </div>

                    <!-- GOLD PILL BADGE -->
                    <div style="display: flex; justify-content: center; margin: 20px 0 22px;">
                        <span style="background: #fde68a; color: #78350f; border: 1.5px solid #d97706; padding: 6px 28px; border-radius: 9999px; font-size: 13.5px; font-weight: 900; letter-spacing: 1.2px; text-transform: uppercase; box-shadow: 0 2px 8px rgba(217, 119, 6, 0.2);">
                            CERTIFICATE OF ACADEMIC DEGREE
                        </span>
                    </div>

                    <!-- CONFERMENT TEXT -->
                    <div style="text-align: center; font-style: italic; font-size: 14px; color: #334155; margin-bottom: 16px;">
                        This is to certify that the Board of Governors upon the recommendation of the Academic Council has conferred the degree of
                    </div>

                    <!-- DEGREE TITLE -->
                    <div style="text-align: center; font-size: 27px; font-weight: 900; color: #0f2b48; border-bottom: 2px solid #e2d9c2; padding-bottom: 8px; margin: 0 30px 14px; letter-spacing: 0.5px;">
                        ${degreeProg}
                    </div>

                    <div style="text-align: center; font-size: 13px; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">
                        unto
                    </div>

                    <!-- STUDENT NAME -->
                    <div style="text-align: center; font-size: 25px; font-weight: 900; color: #78350f; text-decoration: underline; margin-bottom: 6px;">
                        ${name}
                    </div>

                    <!-- ROLL NUMBER -->
                    <div style="text-align: center; font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 20px; font-family: monospace;">
                        (Hall Ticket / Roll No: ${rollNo})
                    </div>

                    <!-- ACADEMIC FULFILLMENT -->
                    <div style="text-align: center; font-size: 13.8px; color: #334155; line-height: 1.65; max-width: 650px; margin: 0 auto 28px;">
                        having fulfilled all the academic requirements in the <strong>${regStr}</strong> with a Cumulative Grade Point Average (CGPA) of <strong style="color: #0f2b48; font-size: 15px;">${cgpaStr}</strong> and has been placed in <strong style="color: #78350f; font-size: 14px;">${divisionStr}</strong>.
                    </div>

                    <!-- BOTTOM SIGNATURES -->
                    <div style="border-top: 1.5px solid #e2d9c2; padding-top: 20px; display: grid; grid-template-columns: 1fr 1.6fr 1.6fr; gap: 16px; align-items: flex-end;">
                        <div style="text-align: center;">
                            <div style="font-size: 10px; color: #64748b; font-weight: 700; margin-bottom: 4px;">Verified by QR</div>
                            <div style="display: inline-block; border: 1.5px solid #cbd5e1; padding: 6px 14px; border-radius: 4px; background: #fff; font-size: 11px; font-weight: 800; color: #0284c7; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                🔲 QR-OK
                            </div>
                        </div>

                        <div style="text-align: center;">
                            <div style="font-size: 15px; font-weight: 900; color: #0f172a; font-family: Georgia, serif;">
                                Dr. K. Sreenivasulu
                            </div>
                            <div style="font-size: 11px; color: #64748b; font-weight: 700; margin-top: 2px;">
                                Chief Controller of Examinations
                            </div>
                        </div>

                        <div style="text-align: center;">
                            <div style="font-size: 15px; font-weight: 900; color: #0f172a; font-family: Georgia, serif;">
                                Dr. K. Sreenivasulu
                            </div>
                            <div style="font-size: 11px; color: #64748b; font-weight: 700; margin-top: 2px;">
                                Principal
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        modal.classList.add('active');
        return;
    }

    let titleText = "STUDY CERTIFICATE";
    let bodyText = "";

    if (certType === 'conduct') {
        titleText = "CONDUCT & CHARACTER CERTIFICATE";
        const grade = document.getElementById('certConductGrade')?.value || 'GOOD AND EXEMPLARY';
        bodyText = `
            This is to certify that <strong>${name}</strong>, S/o / D/o <strong>${father}</strong>, bearing Roll Number <strong style="color: #003366;">${rollNo}</strong>, is / was a student of Anantha Lakshmi Institute of Technology & Sciences (ALITS) studying in the Department of <strong>${dept}</strong> during the academic period <strong>${batch}</strong>.
            <br/><br/>
            During his / her tenure of study in this Autonomous Institution, his / her character, conduct, and general behavior have been consistently found to be <strong style="text-decoration: underline; color: #003366;">${grade}</strong>.
        `;
    } else if (certType === 'bonafide') {
        titleText = "BONAFIDE CERTIFICATE";
        const purpose = document.getElementById('certBonafidePurpose')?.value || 'Official Administrative Requirements';
        bodyText = `
            This is to certify that <strong>${name}</strong>, S/o / D/o <strong>${father}</strong>, bearing JNTUA Roll Number <strong style="color: #003366;">${rollNo}</strong>, is a bonafide student of Anantha Lakshmi Institute of Technology & Sciences (ALITS), Anantapur, currently studying in <strong>${dept}</strong> during the academic year <strong>2026 - 2027</strong>.
            <br/><br/>
            This Bonafide Certificate is issued upon the request of the student for the purpose of <strong>${purpose}</strong>.
        `;
    } else if (certType === 'tc') {
        titleText = "TRANSFER CERTIFICATE (TC)";
        const tcNo = document.getElementById('certTcNo')?.value || `ALITS/TC/2026/${Math.floor(100 + Math.random() * 900)}`;
        const dob = document.getElementById('certDobInput')?.value || '14-08-2005';
        const dol = document.getElementById('certDolInput')?.value || '31-05-2028';
        const reason = document.getElementById('certTcReason')?.value || 'Course Completed';

        bodyText = `
            <div style="font-size: 13px; margin-bottom: 20px;"><strong>TC Serial No:</strong> ${tcNo}</div>
            <table class="table-custom" style="margin-bottom: 20px;">
                <tr><td width="40%"><strong>1. Name of the Student:</strong></td><td><strong>${name}</strong></td></tr>
                <tr><td><strong>2. Father's / Guardian Name:</strong></td><td>${father}</td></tr>
                <tr><td><strong>3. JNTUA Roll Number:</strong></td><td><strong style="color: #003366;">${rollNo}</strong></td></tr>
                <tr><td><strong>4. Department & Course:</strong></td><td>${dept}</td></tr>
                <tr><td><strong>5. Date of Birth (as per records):</strong></td><td>${dob}</td></tr>
                <tr><td><strong>6. Date of Admission:</strong></td><td>01-08-2024</td></tr>
                <tr><td><strong>7. Date of Leaving College:</strong></td><td>${dol}</td></tr>
                <tr><td><strong>8. Reason for Leaving:</strong></td><td><strong>${reason}</strong></td></tr>
                <tr><td><strong>9. Conduct and Character:</strong></td><td><strong style="color: #00a65a;">GOOD AND SATISFACTORY</strong></td></tr>
            </table>
        `;
    } else {
        const period = document.getElementById('certStudyPeriod')?.value || `Academic Years ${batch}`;
        bodyText = `
            This is to certify that <strong>${name}</strong>, S/o / D/o <strong>${father}</strong>, bearing Roll Number <strong style="color: #003366;">${rollNo}</strong>, has undergone regular course of study in <strong>${dept}</strong> at Anantha Lakshmi Institute of Technology & Sciences (ALITS), Anantapur during <strong>${period}</strong>.
            <br/><br/>
            ALITS is an Autonomous Institution approved by AICTE, New Delhi, accredited by NAAC & NBA, and affiliated to JNTUA Anantapur.
        `;
    }

    area.innerHTML = `
        <div class="official-cert-frame">
            <div class="cert-header">
                <div style="font-size: 11px; color: #555; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">
                    Anantha Lakshmi Educational Society
                </div>
                <div class="cert-college-name">
                    Anantha Lakshmi Institute of Technology and Sciences
                </div>
                <div class="cert-college-sub">
                    AUTONOMOUS INSTITUTION • CODE: 2G<br/>
                    Approved by AICTE, Accredited by NBA & NAAC, Affiliated to JNTUA Anantapur<br/>
                    Near Itikalapalli, Ananthapur - Chennai Highway, Anantapur (A.P) - 515721
                </div>
            </div>

            <div class="cert-main-title">${titleText}</div>

            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 20px; color: #555;">
                <div><strong>Ref No:</strong> ALITS/CERT/2026/${Math.floor(1000 + Math.random() * 9000)}</div>
                <div><strong>Date of Issue:</strong> ${todayStr}</div>
            </div>

            <div class="cert-body-text">
                ${bodyText}
            </div>

            <div class="cert-footer-grid" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; align-items: flex-end; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
                <div style="text-align: center;">
                    <div style="font-size: 10px; color: #666; font-weight: 700;">Verified by QR</div>
                    <div style="display: inline-block; border: 1px solid #ccc; padding: 4px 10px; font-size: 10px; font-weight: 800; color: #0284c7; margin-top: 4px;">🔲 QR-OK</div>
                </div>

                <div style="text-align: center;">
                    <div style="font-family: var(--font-cert, Georgia); font-size: 15px; font-weight: 800; color: #003366;">
                        Dr. K. Sreenivasulu
                    </div>
                    <div style="font-size: 10px; color: #555; font-weight: 700; margin-top: 2px;">
                        Chief Controller of Examinations
                    </div>
                </div>

                <div class="cert-signature-box" style="text-align: center;">
                    <div style="font-family: var(--font-cert, Georgia); font-size: 15px; font-weight: 800; color: #003366;">
                        Dr. K. Sreenivasulu
                    </div>
                    <div style="font-size: 10px; color: #555; font-weight: 700; margin-top: 2px;">
                        Principal
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
};

window.closeCertificateModal = function () {
    document.getElementById('certificatePrintModal').classList.remove('active');
};

window.sendCertificateViaEmail = function () {
    const name = document.getElementById('certNameInput')?.value || 'Student';
    const studentId = document.getElementById('certStudentSelect')?.value;
    const student = state.students?.find(s => s.id === studentId);
    const email = document.getElementById('certGmailInput')?.value || (student ? `${student.name.toLowerCase().replace(/\s+/g, '')}@alits.ac.in` : `${name.toLowerCase().replace(/\s+/g, '')}@alits.ac.in`);
    const mobile = student ? student.mobile : (document.getElementById('certMobileInput')?.value || '+91 98491 11223');
    const certType = document.getElementById('certTypeSelect')?.value || 'Study & Conduct Certificate';
    const rollNo = student ? student.rollNo : (document.getElementById('certRollInput')?.value || '242G1A0501');
    const certRef = `ALITS/CERT/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    const subject = `Official ALITS ${certType.toUpperCase()} - ${name} (${rollNo})`;
    const message = `ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES (ALITS)\nAutonomous Institution • Approved by AICTE, Accredited by NBA & NAAC\nNear Itikalapalli, Ananthapur - Chennai Highway, Anantapur (A.P) - 515721\n\n--- OFFICIAL INSTITUTIONAL CERTIFICATE ISSUANCE ---\nCertificate Ref No: ${certRef}\nIssue Date: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}\n\nThis is to certify that Mr./Ms. ${name} (Admission / Roll No: ${rollNo}) has been issued official ${certType.toUpperCase()}.\n\nDepartment: ${student ? student.dept : 'Engineering'}\nAcademic Program: 4-Year B.Tech Degree\nInstitutional Status: Autonomous / NBA & NAAC Accredited\n\nOfficial Digital Verification Link: https://alits.ac.in/verify/cert?ref=${certRef}\nChief Controller of Examinations & Principal Directorate\nALITS Anantapuramu`;

    openAlitsDispatchDialog({
        title: 'Institutional Certificate Email Dispatch',
        subtitle: `Dispatching official ${certType} for ${name}`,
        docType: certType,
        recipientName: `${name} (${rollNo})`,
        mobile: mobile,
        email: email,
        subject: subject,
        message: message,
        requiredPermission: 'FACULTY_OR_ADMIN',
        directAction: 'email'
    });
};

window.sendCertificateViaWhatsApp = function () {
    const name = document.getElementById('certNameInput')?.value || 'Student';
    const studentId = document.getElementById('certStudentSelect')?.value;
    const student = state.students?.find(s => s.id === studentId);
    const email = document.getElementById('certGmailInput')?.value || (student ? `${student.name.toLowerCase().replace(/\s+/g, '')}@alits.ac.in` : 'student@alits.ac.in');
    const mobile = student ? student.mobile : (document.getElementById('certMobileInput')?.value || '+91 98491 11223');
    const certType = document.getElementById('certTypeSelect')?.value || 'Study & Conduct Certificate';
    const rollNo = student ? student.rollNo : (document.getElementById('certRollInput')?.value || '242G1A0501');
    const certRef = `ALITS/CERT/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    const subject = `ALITS Certificate Issuance - ${name}`;
    const message = `*ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES (ALITS)*\n*Official Certificate Issuance Notification*\n\n📜 *Certificate Type:* ${certType.toUpperCase()}\n📄 *Ref No:* ${certRef}\n👤 *Candidate:* ${name}\n🎓 *Roll Number:* ${rollNo}\n🏛️ *Department:* ${student ? student.dept : 'Engineering'}\n📅 *Issued Date:* ${new Date().toLocaleDateString('en-GB')}\n\n✅ *Status:* Officially Signed & Verified by Principal Directorate\n🔗 *Download Official Digital Copy:* https://alits.ac.in/verify/cert?ref=${certRef}`;

    openAlitsDispatchDialog({
        title: 'Certificate WhatsApp Dispatch',
        subtitle: `Sending instant WhatsApp certificate for ${name}`,
        docType: certType,
        recipientName: `${name} (${rollNo})`,
        mobile: mobile,
        email: email,
        subject: subject,
        message: message,
        requiredPermission: 'FACULTY_OR_ADMIN',
        directAction: 'whatsapp'
    });
};

window.sendCertificateViaSms = window.sendCertificateViaWhatsApp;

/* ==========================================================================
   UNIFIED INSTITUTIONAL DISPATCH ENGINE (WHATSAPP & EMAIL) WITH PERMISSIONS
   ========================================================================== */
window.checkDispatchPermission = function (requiredLevel, userRole) {
    const role = (userRole || sessionStorage.getItem('ALITS_USER_ROLE') || 'Management').toLowerCase();
    
    // Level 1: ADMIN_ONLY (Chairman, ViceChairman, Principal, Management, Superadmin, Admin)
    const isAdmin = ['management', 'admin', 'administrator', 'superadmin', 'chairman', 'vicechairman', 'principal', 'coe'].includes(role);
    
    // Level 2: FACULTY_OR_ADMIN (Faculty, HoD, TPO, Admin, Management)
    const isFaculty = isAdmin || ['faculty', 'staff', 'hod', 'teacher', 'skilldirector'].includes(role);
    
    // Level 3: ALL_USERS (Students and Parents can dispatch their own documents)
    const isAuthorized = requiredLevel === 'ALL_USERS' ? true : (requiredLevel === 'FACULTY_OR_ADMIN' ? isFaculty : isAdmin);

    return {
        allowed: isAuthorized,
        role: role,
        roleTitle: isAdmin ? 'Executive Management' : (isFaculty ? 'Academic Faculty / HoD' : 'Student / Parent User'),
        badgeColor: isAuthorized ? '#16a34a' : '#ef4444'
    };
};

window.openAlitsDispatchDialog = function (params) {
    const modal = document.getElementById('alitsDispatchModal');
    if (!modal) return;

    const currentRole = sessionStorage.getItem('ALITS_USER_ROLE') || 'Management';
    const authStatus = checkDispatchPermission(params.requiredPermission || 'ALL_USERS', currentRole);

    const permBanner = document.getElementById('dispatchPermissionBanner');
    const permText = document.getElementById('dispatchPermissionText');
    const permBadge = document.getElementById('dispatchRoleBadge');

    if (permBanner && permText && permBadge) {
        if (authStatus.allowed) {
            permBanner.style.background = '#f0fdf4';
            permBanner.style.borderColor = '#bbf7d0';
            permBanner.style.color = '#166534';
            permText.innerHTML = `<i class="fa-solid fa-shield-check" style="color: #16a34a; margin-right: 6px;"></i> Dispatch Authorized: <strong>${authStatus.roleTitle}</strong>`;
            permBadge.innerText = 'Authorized';
            permBadge.style.background = '#16a34a';
        } else {
            permBanner.style.background = '#fef2f2';
            permBanner.style.borderColor = '#fecaca';
            permBanner.style.color = '#991b1b';
            permText.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: #ef4444; margin-right: 6px;"></i> Restricted Dispatch Level: <strong>Elevated Admin Required</strong>`;
            permBadge.innerText = 'Restricted';
            permBadge.style.background = '#ef4444';
        }
    }

    // Set values
    const titleEl = document.getElementById('dispatchModalTitle');
    const subtitleEl = document.getElementById('dispatchModalSubtitle');
    const nameEl = document.getElementById('dispatchRecipientName');
    const docEl = document.getElementById('dispatchDocType');
    const mobileEl = document.getElementById('dispatchMobileInput');
    const emailEl = document.getElementById('dispatchEmailInput');
    const subjEl = document.getElementById('dispatchSubjectInput');
    const msgEl = document.getElementById('dispatchMessageInput');

    if (titleEl) titleEl.innerText = params.title || 'ALITS Communication Dispatch';
    if (subtitleEl) subtitleEl.innerText = params.subtitle || 'Official Institutional Gateway';
    if (nameEl) nameEl.value = params.recipientName || 'Student';
    if (docEl) docEl.value = params.docType || 'Document';
    if (mobileEl) mobileEl.value = params.mobile || '+91 98491 11223';
    if (emailEl) emailEl.value = params.email || 'student@alits.ac.in';
    if (subjEl) subjEl.value = params.subject || 'ALITS Official Notice';
    if (msgEl) msgEl.value = params.message || '';

    modal.classList.add('active');

    // If direct action was requested and user is authorized, trigger immediately
    if (authStatus.allowed) {
        if (params.directAction === 'whatsapp') {
            executeWhatsAppSend(false);
        } else if (params.directAction === 'email') {
            executeEmailSend(false);
        }
    } else {
        if (typeof showLiveSyncToast === 'function') {
            showLiveSyncToast('🔒 Security Notice: Elevated clearance recommended for external bulk dispatches.', 'academic');
        }
    }
};

window.closeDispatchModal = function () {
    const modal = document.getElementById('alitsDispatchModal');
    if (modal) modal.classList.remove('active');
};

window.executeWhatsAppSend = function (closeOnSend = true) {
    const mobileRaw = document.getElementById('dispatchMobileInput')?.value.trim() || '';
    const message = document.getElementById('dispatchMessageInput')?.value.trim() || '';
    const recipient = document.getElementById('dispatchRecipientName')?.value.trim() || 'Recipient';

    if (!mobileRaw) {
        alert('Please enter a valid WhatsApp Mobile Number.');
        return;
    }

    // Sanitize mobile number (remove spaces, symbols, ensure country code)
    let cleanMobile = mobileRaw.replace(/[^0-9]/g, '');
    if (cleanMobile.length === 10) {
        cleanMobile = '91' + cleanMobile;
    } else if (cleanMobile.length === 12 && cleanMobile.startsWith('91')) {
        // already valid
    }

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanMobile}&text=${encodedText}`;

    // Open WhatsApp Web or Mobile App
    window.open(whatsappUrl, '_blank');

    if (typeof showLiveSyncToast === 'function') {
        showLiveSyncToast(`📱 WhatsApp dispatch initiated for ${recipient} (+${cleanMobile})`, 'management');
    }

    if (closeOnSend) {
        setTimeout(closeDispatchModal, 800);
    }
};

window.executeEmailSend = function (closeOnSend = true) {
    const email = document.getElementById('dispatchEmailInput')?.value.trim() || '';
    const subject = document.getElementById('dispatchSubjectInput')?.value.trim() || 'ALITS Official Notification';
    const message = document.getElementById('dispatchMessageInput')?.value.trim() || '';
    const recipient = document.getElementById('dispatchRecipientName')?.value.trim() || 'Recipient';

    if (!email) {
        alert('Please enter a valid Email address.');
        return;
    }

    const mailtoUrl = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    // Trigger Mail Client
    window.open(mailtoUrl, '_blank');

    if (typeof showLiveSyncToast === 'function') {
        showLiveSyncToast(`📧 Email dispatch initiated for ${recipient} (${email})`, 'academic');
    }

    if (closeOnSend) {
        setTimeout(closeDispatchModal, 800);
    }
};

window.copyDispatchMessage = function () {
    const subject = document.getElementById('dispatchSubjectInput')?.value.trim() || '';
    const message = document.getElementById('dispatchMessageInput')?.value.trim() || '';
    const fullText = subject ? `${subject}\n\n${message}` : message;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(fullText).then(() => {
            if (typeof showLiveSyncToast === 'function') {
                showLiveSyncToast('📋 Message text copied to clipboard successfully!', 'examination');
            } else {
                alert('📋 Message text copied to clipboard!');
            }
        });
    } else {
        alert('📋 Message text ready for copying.');
    }
};

window.sendBatchIdCardsViaWhatsApp = function () {
    const totalCount = state.students ? state.students.length : 0;
    openAlitsDispatchDialog({
        title: 'Batch ID Cards WhatsApp Dispatch',
        subtitle: `Dispatching digital ID Cards to all ${totalCount} enrolled students`,
        docType: 'Digital Identity Badges',
        recipientName: `All Enrolled ALITS Students (${totalCount} Candidates)`,
        mobile: '+91 98481 00000',
        email: 'students@alits.ac.in',
        subject: 'ALITS Official Digital ID Card & Smart Campus Pass 2026-27',
        message: `*ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES (ALITS)*\n*Autonomous Institution - Digital Student Pass Directorate*\n\n🪪 *Digital Identity Card Issued*\nYour official ALITS Smart ID Card with QR/Barcode & Library Pass is now active.\n\n🔗 *Access & Download Digital Pass:* https://alits.ac.in/verify/idcard\n\nPlease preserve your digital ID card for campus access, examination entry, and library checkout.\nChief Controller of Examinations & Administration`,
        requiredPermission: 'ADMIN_ONLY',
        directAction: 'whatsapp'
    });
};

window.sendBatchIdCardsViaEmail = function () {
    const totalCount = state.students ? state.students.length : 0;
    openAlitsDispatchDialog({
        title: 'Batch ID Cards Email Dispatch',
        subtitle: `Dispatching printable ID Cards PDF to all ${totalCount} enrolled students`,
        docType: 'Digital Identity Badges (Batch PDF)',
        recipientName: `All Enrolled ALITS Students (${totalCount} Candidates)`,
        mobile: '+91 98481 00000',
        email: 'students@alits.ac.in',
        subject: 'Official ALITS Student Identity Card & Autonomous Campus Pass (2026-2027)',
        message: `Dear ALITS Student,\n\nWe are pleased to issue your Official Digital Institutional Identity Card & Autonomous Campus Pass for the academic year 2026-2027.\n\nKey Information:\n- Institution: Anantha Lakshmi Institute of Technology and Sciences (Autonomous)\n- Security: Encoded Barcode & Hall Ticket Registry\n- Usage: Library Checkouts, Laboratory Access, Mid-Term & End-Semester Examinations\n\nYou can view and download your digital identity card at:\nhttps://alits.ac.in/verify/idcard\n\nRegards,\nIT & Systems Directorate\nALITS Anantapuramu`,
        requiredPermission: 'ADMIN_ONLY',
        directAction: 'email'
    });
};

/* ==========================================================================
   STUDENT & STAFF ID CARD GENERATOR MODULE WITH EDITING & BARCODE
   ========================================================================== */
function generateBarcodeSvgBars(str) {
    const hash = (str || 'ALITS2026').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const pattern = [2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1];
    let rects = '';
    let curX = 2;
    for (let i = 0; i < pattern.length; i++) {
        const width = ((hash + i) % 2 === 0) ? pattern[i] * 1.4 : 1.4;
        if (i % 2 === 0) {
            rects += `<rect x="${curX.toFixed(1)}" y="0" width="${width.toFixed(1)}" height="26" fill="#111"/>`;
        }
        curX += width + 1.2;
    }
    const totalW = Math.ceil(curX + 2);
    return `<div class="idcard-barcode-bars"><svg width="${totalW}" height="26" viewBox="0 0 ${totalW} 26" style="display:block;margin:0 auto;">${rects}</svg></div>`;
}

function renderIdCardsGrid() {
    const grid = document.getElementById('idCardsPreviewGrid');
    const countEl = document.getElementById('idCardsGeneratedCount');
    if (!grid || !state || !state.students) return;

    const filterDept = document.getElementById('idCardDeptSelect')?.value || 'ALL';
    const filterYear = document.getElementById('idCardYearSelect')?.value || 'ALL';
    const filterSec = document.getElementById('idCardSecSelect')?.value || 'ALL';
    const filterSearch = (document.getElementById('idCardSearchInput')?.value || '').toLowerCase().trim();

    let filtered = state.students.filter(s => {
        const sDept = (s.dept || s.branch || '').toUpperCase();
        const matchesDept = (filterDept === 'ALL') || (sDept === filterDept.toUpperCase());

        const sYear = (s.year || '').toUpperCase();
        let matchesYear = (filterYear === 'ALL');
        if (!matchesYear) {
            if (filterYear.includes('1') || filterYear.includes('1st')) matchesYear = sYear.includes('1') || sYear.includes('I');
            else if (filterYear.includes('2') || filterYear.includes('2nd')) matchesYear = sYear.includes('2') || sYear.includes('II');
            else if (filterYear.includes('3') || filterYear.includes('3rd')) matchesYear = sYear.includes('3') || sYear.includes('III');
            else if (filterYear.includes('4') || filterYear.includes('4th')) matchesYear = sYear.includes('4') || sYear.includes('IV');
        }

        const sSec = (s.section || s.sec || '').replace(/section[- ]?/i, '').trim().toUpperCase();
        const matchesSec = (filterSec === 'ALL') || (sSec === filterSec.toUpperCase());
        const matchesQuery = !filterSearch || (s.name && s.name.toLowerCase().includes(filterSearch)) || (s.rollNo && s.rollNo.toLowerCase().includes(filterSearch));

        return matchesDept && matchesYear && matchesSec && matchesQuery;
    });

    if (countEl) {
        countEl.innerText = `${filtered.length} ID Cards Ready`;
    }

    const MAX_CARDS = 48;
    const displayCards = filtered.slice(0, MAX_CARDS);
    let cardsHtml = displayCards.map(student => buildSingleAlitsIdCardHtml(student)).join('');
    if (filtered.length > MAX_CARDS) {
        cardsHtml += `
            <div style="grid-column: 1 / -1; text-align: center; padding: 14px; background: #ffffff; border-radius: 8px; border: 1px dashed #cbd5e1; margin-top: 10px;">
                <p style="margin: 0; font-size: 12px; font-weight: 700; color: #475569;">
                    ⚡ Displaying first 48 of ${filtered.length.toLocaleString()} ID Cards. Use department & section filters above for fast specific batches.
                </p>
            </div>
        `;
    }
    grid.innerHTML = cardsHtml;
}

function buildSingleAlitsIdCardHtml(student) {
    const barcodeBars = generateBarcodeSvgBars(student.rollNo);
    const initialAvatar = student.name ? student.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'ST';
    const mobileNo = student.mobile || student.studentPhone || '7337486311';
    const addressStr = student.address || 'BC Colony Upparapalli, Ananthapur, AP - 515002';

    return `
        <div class="alits-id-card">
            <div class="idcard-header-banner">
                <div class="idcard-crest-row">
                    <div class="idcard-crest-icon">🏛️</div>
                    <div style="text-align: left;">
                        <div class="idcard-title-red">ANANTHA LAKSHMI</div>
                        <div class="idcard-subtitle-blue">INSTITUTE OF TECH & SCIENCES</div>
                        <div class="idcard-auto-badge">(AUTONOMOUS • CODE: 2G)</div>
                    </div>
                </div>
            </div>

            <div class="idcard-photo-wrapper">
                <div class="idcard-avatar-img" style="display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 900; color: #0088cc; text-transform: uppercase;">
                    ${initialAvatar}
                </div>
            </div>

            <div class="idcard-student-name">${student.name}</div>

            <div class="idcard-details-box">
                <div class="idcard-detail-row">
                    <span class="idcard-detail-label">Roll No:</span>
                    <span class="idcard-detail-val" style="font-family: var(--font-mono); font-weight: 800; color: #0088cc;">${student.rollNo}</span>
                </div>
                <div class="idcard-detail-row">
                    <span class="idcard-detail-label">Dept & Yr:</span>
                    <span class="idcard-detail-val">${student.dept} - ${student.year} (${student.section})</span>
                </div>
                <div class="idcard-detail-row">
                    <span class="idcard-detail-label">Father:</span>
                    <span class="idcard-detail-val">${student.fatherName || 'N/A'}</span>
                </div>
                <div class="idcard-detail-row">
                    <span class="idcard-detail-label">Contact No:</span>
                    <span class="idcard-detail-val" style="font-weight: 700; color: #00a65a;">${mobileNo}</span>
                </div>
                <div class="idcard-detail-row">
                    <span class="idcard-detail-label">Address:</span>
                    <span class="idcard-detail-val" style="font-size: 9.5px; line-height: 1.2;">${addressStr}</span>
                </div>
                <div class="idcard-detail-row">
                    <span class="idcard-detail-label">D.O.B:</span>
                    <span class="idcard-detail-val">${student.dob || '08 MARCH 2003'}</span>
                </div>
                <div class="idcard-detail-row">
                    <span class="idcard-detail-label">Blood Grp:</span>
                    <span class="idcard-detail-val" style="color: #dd4b39; font-weight: 800;">${student.bloodGroup || 'B+'}</span>
                </div>
            </div>

            <div class="idcard-barcode-footer">
                ${barcodeBars}
                <div class="idcard-barcode-text">${student.rollNo}</div>
                <div class="no-print" style="margin-top: 6px; display: flex; gap: 4px; justify-content: center;">
                    <button class="btn-cal-ctrl" style="background: #0088cc; font-size: 10px; padding: 2px 8px;" onclick="editStudentIdCardDetails('${student.id}')">✏️ Edit Card</button>
                    <button class="btn-cal-ctrl" style="background: #00a65a; font-size: 10px; padding: 2px 8px;" onclick="printSingleStudentIdCard('${student.id}')">🖨️ Print</button>
                </div>
            </div>
        </div>
    `;
}

window.editStudentIdCardDetails = function (studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    openGenericEditModal(`Edit ID Card: ${student.name} (${student.rollNo})`, [
        { id: 'name', label: 'Student Full Name *', value: student.name },
        { id: 'rollNo', label: 'JNTUA Roll Number *', value: student.rollNo },
        { id: 'dept', label: 'Department (CSE/AIML/ECE/EEE/CIVIL/MECH/DIPLOMA)', value: student.dept },
        { id: 'year', label: 'Academic Year', value: student.year },
        { id: 'section', label: 'Section (A/B/C)', value: student.section },
        { id: 'fatherName', label: 'Father / Guardian Name', value: student.fatherName },
        { id: 'mobile', label: 'Contact Mobile Number *', value: student.mobile || '7337486311' },
        { id: 'address', label: 'Address *', value: student.address || 'BC Colony Upparapalli, Ananthapur' },
        { id: 'dob', label: 'Date of Birth (D.O.B)', value: student.dob || '08 MARCH 2003' },
        { id: 'bloodGroup', label: 'Blood Group (O+/A+/B+/AB+/O-)', value: student.bloodGroup || 'B+' }
    ], (formData) => {
        const target = state.students.find(s => s.id === studentId) || student;
        Object.assign(target, formData);
        saveState({
            module: 'ID Cards',
            action: 'Edit ID Card',
            summary: `Updated ID Card for ${target.name} (${target.rollNo})`
        });
        renderIdCardsGrid();
        renderStudentsTable();
        alert(`✓ Updated ID Card details for ${target.name}!`);
    });
};

window.printAllGeneratedIdCards = function () {
    const filterDept = document.getElementById('idCardDeptSelect')?.value || 'ALL';
    const filterYear = document.getElementById('idCardYearSelect')?.value || 'ALL';
    const filterSec = document.getElementById('idCardSecSelect')?.value || 'ALL';
    const filterSearch = (document.getElementById('idCardSearchInput')?.value || '').toLowerCase().trim();

    let filtered = state.students.filter(s => {
        const matchesDept = (filterDept === 'ALL') || (s.dept === filterDept);
        const matchesYear = (filterYear === 'ALL') || (s.year === filterYear);
        const matchesSec = (filterSec === 'ALL') || (s.section === filterSec);
        const matchesQuery = !filterSearch || s.name.toLowerCase().includes(filterSearch) || s.rollNo.toLowerCase().includes(filterSearch);

        return matchesDept && matchesYear && matchesSec && matchesQuery;
    });

    if (filtered.length === 0) {
        alert('No ID cards available in the selected filter to print.');
        return;
    }

    const area = document.getElementById('printableIdCardsArea');
    const modal = document.getElementById('idCardsPrintModal');

    if (area && modal) {
        area.innerHTML = filtered.map(s => buildSingleAlitsIdCardHtml(s)).join('');
        modal.classList.add('active');
    }
};

window.printSingleStudentIdCard = function (studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    const area = document.getElementById('printableIdCardsArea');
    const modal = document.getElementById('idCardsPrintModal');

    if (area && modal) {
        area.innerHTML = buildSingleAlitsIdCardHtml(student);
        modal.classList.add('active');
    }
};

window.closeIdCardsPrintModal = function () {
    const modal = document.getElementById('idCardsPrintModal');
    if (modal) modal.classList.remove('active');
};

/* ==========================================================================
   OVERALL SYSTEM SETTINGS & BACKUP ENGINE
   ========================================================================== */
function renderSettingsView() {
    const nameInput = document.getElementById('settingsCollegeName');
    const codeInput = document.getElementById('settingsCollegeCode');
    const areaInput = document.getElementById('settingsCampusArea');
    const stuInput = document.getElementById('settingsStudentCount');
    const facInput = document.getElementById('settingsFacultyCount');

    if (state.college) {
        if (nameInput) nameInput.value = state.college.name;
        if (codeInput) codeInput.value = state.college.code;
        if (areaInput) areaInput.value = state.college.campusArea;
        if (stuInput) stuInput.value = state.college.totalStudents;
        if (facInput) facInput.value = state.college.totalFaculty;
    }
}

window.saveInstitutionalSettings = function () {
    if (!state.college) return;

    state.college.name = document.getElementById('settingsCollegeName')?.value || state.college.name;
    state.college.code = document.getElementById('settingsCollegeCode')?.value || state.college.code;
    state.college.campusArea = document.getElementById('settingsCampusArea')?.value || state.college.campusArea;
    state.college.totalStudents = Number(document.getElementById('settingsStudentCount')?.value) || state.college.totalStudents;
    state.college.totalFaculty = Number(document.getElementById('settingsFacultyCount')?.value) || state.college.totalFaculty;

    saveState();
    renderAllViews();
    alert('✓ Institutional Settings updated and saved!');
};

window.exportErpDatabaseJson = function () {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `ALITS_ERP_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

window.importErpDatabaseJson = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData && importedData.college) {
                state = importedData;
                saveState();
                renderAllViews();
                alert('✓ ERP Database successfully restored from backup JSON file!');
            } else {
                alert('❌ Invalid ALITS backup file format!');
            }
        } catch (err) {
            alert('❌ Failed to parse JSON file!');
        }
    };
    reader.readAsText(file);
};

window.resetErpToFactoryDefaults = function () {
    if (confirm('⚠️ Are you sure you want to reset ALITS ERP database to factory default settings? All local edits will be reset.')) {
        localStorage.removeItem('ALITS_ERP_STATE');
        state = window.ALITS_DATA;
        saveState();
        renderAllViews();
        alert('✓ ALITS ERP restored to Factory Default State!');
    }
};

/* ==========================================================================
   STUDENTS ROSTER & ATTENDANCE PERCENTAGE TRACKER
   ========================================================================== */
function renderStudentsView() {
    renderStudentsTable();
}
window.renderStudentsView = renderStudentsView;

function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    const filterVal = (document.getElementById('studentFilterInput')?.value || '').toLowerCase().trim();
    const filterDept = document.getElementById('filterDeptSelect')?.value || 'ALL';
    const filterYear = document.getElementById('filterYearSelect')?.value || 'ALL';
    const filterSection = document.getElementById('filterSectionSelect')?.value || 'ALL';
    const filterQuota = document.getElementById('filterQuotaSelect')?.value || 'ALL';
    const filterResidence = document.getElementById('filterResidenceSelect')?.value || 'ALL';

    const studentsList = state?.students || window.ALITS_DATA?.students || [];
    if (!tbody || !studentsList.length) return;

    let filtered = studentsList.filter(s => {
        const addrText = (s.address || '').toLowerCase();
        const pinText = (s.pincode || '').toLowerCase();
        const matchesQuery = !filterVal ||
            (s.name && s.name.toLowerCase().includes(filterVal)) ||
            (s.rollNo && s.rollNo.toLowerCase().includes(filterVal)) ||
            (s.dept && s.dept.toLowerCase().includes(filterVal)) ||
            (s.fatherName && s.fatherName.toLowerCase().includes(filterVal)) ||
            addrText.includes(filterVal) ||
            pinText.includes(filterVal);

        const sDept = (s.dept || s.branch || '').toUpperCase();
        const matchesDept = (filterDept === 'ALL') || (sDept === filterDept.toUpperCase());

        const sYear = (s.year || '').toUpperCase();
        let matchesYear = (filterYear === 'ALL');
        if (!matchesYear) {
            if (filterYear.includes('1') || filterYear.includes('1st')) matchesYear = sYear.includes('1') || sYear.includes('I');
            else if (filterYear.includes('2') || filterYear.includes('2nd')) matchesYear = sYear.includes('2') || sYear.includes('II');
            else if (filterYear.includes('3') || filterYear.includes('3rd')) matchesYear = sYear.includes('3') || sYear.includes('III');
            else if (filterYear.includes('4') || filterYear.includes('4th')) matchesYear = sYear.includes('4') || sYear.includes('IV');
        }

        const sSec = (s.section || s.sec || '').replace(/section[- ]?/i, '').trim().toUpperCase();
        const matchesSec = (filterSection === 'ALL') || (sSec === filterSection.toUpperCase());

        const sQuota = (s.quota || '').toUpperCase();
        let matchesQuota = (filterQuota === 'ALL');
        if (!matchesQuota) {
            if (filterQuota.toLowerCase().includes('convenor')) matchesQuota = sQuota.includes('CONVENOR');
            else if (filterQuota.toLowerCase().includes('management')) matchesQuota = sQuota.includes('MANAGE');
        }

        const sRes = (s.residenceType || '').toLowerCase();
        const matchesResidence = (filterResidence === 'ALL') || sRes.includes(filterResidence.toLowerCase().trim());

        return matchesQuery && matchesDept && matchesYear && matchesSec && matchesQuota && matchesResidence;
    });

    const secDStudents = studentsList.filter(s => s.dept === 'CSE' && s.year === '3rd Year' && (s.section === 'D' || s.section === 'A'));
    if (secDStudents.length > 0) {
        const avgPct = (secDStudents.reduce((sum, s) => sum + (s.attendancePct || 0), 0) / secDStudents.length).toFixed(1);
        const eligibleCount = secDStudents.filter(s => (s.attendancePct || 0) >= 75.0).length;
        const condonationCount = secDStudents.filter(s => (s.attendancePct || 0) < 75.0).length;

        const avgEl = document.getElementById('secDAveragePct');
        const eligEl = document.getElementById('secDEligibleCount');
        const condEl = document.getElementById('secDCondonationCount');

        if (avgEl) avgEl.innerText = `${avgPct}%`;
        if (eligEl) eligEl.innerText = eligibleCount;
        if (condEl) condEl.innerText = condonationCount;
    }
window.renderStudentsTable = renderStudentsTable;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #777; padding: 20px;">No students found matching current filters.</td></tr>`;
        return;
    }

    const PAGE_LIMIT = 100;
    const displayList = filtered.slice(0, PAGE_LIMIT);

    let rowsHtml = displayList.map(s => {
        const total = s.totalClasses || 200;
        const attended = s.attendedClasses || Math.round((s.attendancePct || 85) * total / 100);
        const pct = s.attendancePct || parseFloat(((attended / total) * 100).toFixed(1));
        const isEligible = pct >= 75.0;
        const isHosteler = s.residenceType === 'Hosteler';
        const isNew = Boolean(s.isNewlyAdded);

        const quotaBadge = s.quota === 'Management Quota'
            ? `<span class="badge-status" style="background: #7b2cbf; color: white; font-size: 9.5px; padding: 1px 5px;">👑 Mgmt</span>`
            : `<span class="badge-status paid" style="font-size: 9.5px; padding: 1px 5px;">📜 Convenor</span>`;

        const resBadge = isHosteler
            ? `<span class="badge-status" style="background: #ff9800; color: white; font-size: 9.5px; padding: 1px 5px;">🏨 Hostel (${s.roomNo || 'Room'})</span>`
            : `<span class="badge-status" style="background: #00bcd4; color: white; font-size: 9.5px; padding: 1px 5px;">🏠 Day Scholar</span>`;

        const shortAddr = s.address ? (s.address.length > 38 ? s.address.substring(0, 38) + '...' : s.address) : 'Ananthapur Local';
        const pinBadge = s.pincode ? `<span class="code-badge-top" style="background: #eef2f7; color: #334155; padding: 1px 4px; font-size: 9px;">📍 ${s.pincode}</span>` : '';

        return `
            <tr class="${isNew ? 'student-row-new' : ''}" style="height: 34px;">
                <td style="padding: 4px 8px; font-size: 11px; font-family: var(--font-mono); font-weight: 700; color: #0088cc; white-space: nowrap;">
                    ${s.rollNo}
                    ${isNew ? '<span style="background: #10b981; color: white; font-size: 8.5px; padding: 1px 4px; border-radius: 3px; margin-left: 3px; font-weight: 800;">NEW</span>' : ''}
                </td>
                <td style="padding: 4px 8px;">
                    <div style="font-weight: 700; color: #1e293b; font-size: 11.5px; line-height: 1.2;">${s.name}</div>
                    <div style="font-size: 9.5px; color: #64748b;">Father: ${s.fatherName || 'N/A'} | 📱 ${s.mobile || 'N/A'}</div>
                </td>
                <td style="padding: 4px 8px; font-size: 11px; white-space: nowrap;">
                    <span class="code-badge-top" style="padding: 1px 4px; font-size: 9.5px;">${s.dept}</span> <strong>${s.year}</strong> (${s.section})
                    <div style="font-size: 9px; color: #64748b;">Batch ${s.batch || '2024-28'}</div>
                </td>
                <td style="padding: 4px 8px; white-space: nowrap;">${quotaBadge}</td>
                <td style="padding: 4px 8px;">
                    ${resBadge}
                    <div style="font-size: 9.5px; color: #475569; margin-top: 1px; max-width: 170px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${s.address || ''}">
                        ${shortAddr} ${pinBadge}
                    </div>
                </td>
                <td style="padding: 4px 8px; text-align: center; white-space: nowrap;">
                    <div style="font-family: var(--font-mono); font-weight: 800; color: ${isEligible ? '#00a65a' : '#dd4b39'}; font-size: 12px;">
                        ${pct}%
                    </div>
                    <div style="font-size: 9px; color: #64748b;">${attended}/${total}h</div>
                </td>
                <td style="padding: 4px 8px; text-align: center; white-space: nowrap;">
                    <span class="badge-status ${isEligible ? 'paid' : 'unpaid'}" style="padding: 1px 5px; font-size: 9px;">
                        ${isEligible ? 'Eligible' : 'Shortage'}
                    </span>
                </td>
                <td style="padding: 4px 8px; white-space: nowrap;">
                    <div style="display: flex; gap: 2px; align-items: center;">
                        <button class="btn-cal-ctrl compact" style="background: #6366f1;" onclick="viewStudentFullProfile('${s.id}')" title="Full Profile">👤 Profile</button>
                        <button class="btn-cal-ctrl compact" style="background: #00bcd4;" onclick="editStudentIdCardDetails('${s.id}')" title="Edit ID Card">🪪 Card</button>
                        <button class="btn-cal-ctrl compact" style="background: #0088cc;" onclick="editStudentAttendance('${s.id}')" title="Edit Attendance %">📊 %</button>
                        <button class="btn-cal-ctrl compact" style="background: #f39c12;" onclick="editStudent('${s.id}')" title="Edit Student">✏️ Edit</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    if (filtered.length > PAGE_LIMIT) {
        rowsHtml += `
            <tr>
                <td colspan="8" style="text-align: center; background: #f8fafc; padding: 12px; font-size: 12px; color: #64748b; font-weight: 700;">
                    ⚡ Displaying first 100 of ${filtered.length.toLocaleString()} students. Use filters (Department, Year, Section, Search) above to narrow down.
                </td>
            </tr>
        `;
    }

    tbody.innerHTML = rowsHtml;
}

window.viewStudentFullProfile = function (studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    const isHosteler = student.residenceType === 'Hosteler';
    const profileHtml = `
        <div style="font-family: var(--font-sans); color: #1e293b; padding: 10px;">
            <div style="display: flex; gap: 16px; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background: #0088cc; color: white; font-weight: 900; font-size: 22px; display: flex; align-items: center; justify-content: center;">
                    ${student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div style="flex: 1;">
                    <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 2px;">${student.name}</h2>
                    <div style="font-size: 13px; color: #475569;">
                        JNTUA Roll No: <strong style="color: #0088cc; font-family: var(--font-mono);">${student.rollNo}</strong> | Dept: <strong>${student.dept}</strong> | Year: <strong>${student.year} (${student.section})</strong>
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                    <h4 style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 8px; font-weight: 800;">🎓 Admission & Category Quota</h4>
                    <div style="font-size: 13px; margin-bottom: 4px;"><strong>Quota:</strong> ${student.quota || 'Convenor Quota'}</div>
                    <div style="font-size: 13px; margin-bottom: 4px;"><strong>Batch:</strong> ${student.batch || '2024-2028'}</div>
                    <div style="font-size: 13px; margin-bottom: 4px;"><strong>Father Name:</strong> ${student.fatherName}</div>
                    <div style="font-size: 13px;"><strong>Mobile:</strong> ${student.mobile}</div>
                </div>

                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                    <h4 style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 8px; font-weight: 800;">🏠 Residency & Address Details</h4>
                    <div style="font-size: 13px; margin-bottom: 4px;"><strong>Residency Type:</strong> ${student.residenceType || 'Day Scholar'}</div>
                    ${isHosteler ? `<div style="font-size: 13px; margin-bottom: 4px; color: #ff9800; font-weight: 700;">Hostel Block: ${student.hostelBlock || 'Anantha Hostel'} (Room ${student.roomNo || 'N/A'})</div>` : ''}
                    <div style="font-size: 13px; margin-bottom: 4px;"><strong>Address:</strong> ${student.address || 'Ananthapur Local'}</div>
                    <div style="font-size: 13px;"><strong>Postal Pincode:</strong> <span style="font-family: var(--font-mono); font-weight: 700; color: #0088cc;">${student.pincode || '515001'}</span></div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                    <h4 style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 8px; font-weight: 800;">📊 Academic Attendance</h4>
                    <div style="font-size: 22px; font-weight: 900; color: ${(student.attendancePct || 90) >= 75 ? '#00a65a' : '#dd4b39'}; margin-bottom: 4px;">
                        ${student.attendancePct || 90}%
                    </div>
                    <div style="font-size: 12px; color: #64748b;">
                        Classes Attended: ${student.attendedClasses || 180} / ${student.totalClasses || 200} Conducted
                    </div>
                </div>

                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
                    <h4 style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 8px; font-weight: 800;">💳 Fee Particulars</h4>
                    <div style="font-size: 13px; margin-bottom: 2px;">Total Fee: <strong>₹${(student.totalAssigned || 55000).toLocaleString()}</strong></div>
                    <div style="font-size: 13px; color: #00a65a; margin-bottom: 2px;">Total Paid: <strong>₹${(student.totalPaid || 42500).toLocaleString()}</strong></div>
                    <div style="font-size: 13px; color: #dd4b39; font-weight: 700;">Balance Due: ₹${(student.balanceDue || 12500).toLocaleString()}</div>
                </div>
            </div>
        </div>
    `;

    openGenericModal(`Student Profile: ${student.name} (${student.rollNo})`, profileHtml);
};

window.editStudentAttendance = function (studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    openGenericEditModal(`Edit Attendance % for ${student.name} (${student.rollNo})`, [
        { id: 'totalClasses', label: 'Total Classes Conducted', value: student.totalClasses || 200 },
        { id: 'attendedClasses', label: 'Classes Attended by Student', value: student.attendedClasses || 170 }
    ], (formData) => {
        const target = state.students.find(s => s.id === studentId) || student;
        const total = Number(formData.totalClasses) || 200;
        const attended = Math.min(Number(formData.attendedClasses) || 0, total);

        target.totalClasses = total;
        target.attendedClasses = attended;
        target.attendancePct = parseFloat(((attended / total) * 100).toFixed(1));

        saveState({
            module: 'Attendance',
            action: 'Edit Attendance',
            summary: `Updated Attendance for ${target.name}: ${target.attendancePct}%`
        });
        renderStudentsTable();
        alert(`✓ Updated Attendance % for ${target.name}: ${target.attendancePct}% (${attended}/${total})`);
    });
};

window.markClassAttendance = function (year, dept, section) {
    const targets = state.students.filter(s => s.year === year && s.dept === dept && s.section === section);
    if (confirm(`Mark today's 1-hour class attendance for all ${targets.length} students in ${dept} ${year} Sec-${section}?`)) {
        targets.forEach(s => {
            s.totalClasses = (s.totalClasses || 200) + 1;
            if (Math.random() > 0.1) {
                s.attendedClasses = (s.attendedClasses || 170) + 1;
            }
            s.attendancePct = parseFloat(((s.attendedClasses / s.totalClasses) * 100).toFixed(1));
        });
        saveState();
        renderStudentsTable();
        alert(`✓ Successfully marked today's attendance for all ${targets.length} students in ${dept} ${year} Sec-${section}!`);
    }
};

window.generateRollNo = function () {
    const yrEl = document.getElementById('genYearSelect');
    const deptEl = document.getElementById('genDeptSelect');
    const seqEl = document.getElementById('genSeqInput');
    const resEl = document.getElementById('rollNoResult');
    if (!yrEl || !deptEl || !seqEl) return '';
    const yr = yrEl.value;
    const dept = deptEl.value;
    const seq = (seqEl.value || '01').padStart(2, '0');

    const yrCode = (state.academicYears && state.academicYears[yr]) || '26';
    const rollNo = `${yrCode}2G1A${dept}${seq}`;

    if (resEl) resEl.innerText = rollNo;
    return rollNo;
};

// --- BULK IMPORT & REPORTING MODAL CONTROLLERS ---
window.openStudentImportModal = function () {
    const modal = document.getElementById('studentImportModal');
    if (modal) modal.style.display = 'flex';
};

window.closeStudentImportModal = function () {
    const modal = document.getElementById('studentImportModal');
    if (modal) modal.style.display = 'none';
};

window.displaySelectedFileName = function (input) {
    if (!input || !input.files || input.files.length === 0) return;
    const fileName = input.files[0].name;
    const isFee = input.id === 'feeExcelFile';
    const displayId = isFee ? 'feeSelectedFileName' : 'studentSelectedFileName';
    const displayEl = document.getElementById(displayId) || document.getElementById('selectedFileName');
    if (displayEl) {
        displayEl.innerText = `Selected File: ${fileName} (${(input.files[0].size / 1024).toFixed(1)} KB)`;
    }
};

window.startStudentImport = function () {
    const fileInput = document.getElementById('studentExcelFile');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert('Please select an Excel (.xlsx/.xls) or CSV file containing student records.');
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();
    const isCsv = fileName.endsWith('.csv') || fileName.endsWith('.txt');

    const processRows = (rows) => {
        if (!Array.isArray(rows) || rows.length === 0) {
            alert('No valid student rows found in the uploaded file.');
            return;
        }

        if (!state.students) state.students = [];

        let newCount = 0;
        let updatedCount = 0;
        let skippedCount = 0;

        const normalizeDept = (dStr, roll = '') => {
            if (dStr) {
                const s = String(dStr).trim().toUpperCase();
                if (s.includes('CSE') || s.includes('COMPUTER') || s === '05') return 'CSE';
                if (s.includes('AIML') || s.includes('ARTIFICIAL') || s === '33') return 'AIML';
                if (s.includes('ECE') || s.includes('ELECTRONICS') || s === '04') return 'ECE';
                if (s.includes('EEE') || s.includes('ELECTRICAL') || s === '02') return 'EEE';
                if (s.includes('CIVIL') || s === '01') return 'CIVIL';
                if (s.includes('MECH') || s === '03') return 'MECH';
                return s;
            }
            if (roll.length >= 8) {
                const code = roll.substring(6, 8);
                if (code === '05') return 'CSE';
                if (code === '33') return 'AIML';
                if (code === '04') return 'ECE';
                if (code === '02') return 'EEE';
                if (code === '01') return 'CIVIL';
                if (code === '03') return 'MECH';
            }
            return 'CSE';
        };

        const normalizeYear = (yrStr, roll = '') => {
            if (yrStr) {
                const s = String(yrStr).trim().toUpperCase();
                if (s.includes('1') || s.includes('1ST') || s.includes('I YEAR') || s.includes('I B.TECH')) return '1st Year';
                if (s.includes('2') || s.includes('2ND') || s.includes('II YEAR') || s.includes('II B.TECH')) return '2nd Year';
                if (s.includes('4') || s.includes('4TH') || s.includes('IV YEAR') || s.includes('IV B.TECH')) return '4th Year';
                return '3rd Year';
            }
            if (roll.length >= 2) {
                const prefix = roll.substring(0, 2);
                if (prefix === '26') return '1st Year';
                if (prefix === '25') return '2nd Year';
                if (prefix === '23') return '4th Year';
            }
            return '3rd Year';
        };

        const normalizeSection = (secStr) => {
            if (!secStr) return 'A';
            const s = String(secStr).replace(/section[- ]?/i, '').trim().toUpperCase();
            return s || 'A';
        };

        rows.forEach((row, idx) => {
            // Flexible header mapping across varied Excel / CSV columns
            const rollRaw = row.AdmissionNo || row.Admission_No || row.RollNo || row.Roll_No || row['Roll Number'] || row.HTNo || row.HallTicket || row.RegNo || row.Id || row.ID;
            const nameRaw = row.Name || row.StudentName || row['Student Name'] || row.CandidateName || row.FullName;
            const fatherRaw = row.FatherName || row['Father Name'] || row.Father || row.ParentName || row.Guardian;
            const dobRaw = row.DOB || row['Date of Birth'] || row.BirthDate;
            const genderRaw = row.Gender || row.Sex;
            const quotaRaw = row.Category || row.Quota || row.AdmissionType || row['Admission Type'];
            const phoneRaw = row.Phone || row.Mobile || row.Contact || row.StudentPhone || row['Mobile Number'];
            const emailRaw = row.Email || row.EmailID || row['Email Address'];
            const addressRaw = row.Address || row['Permanent Address'] || row.Residence;
            const deptRaw = row.Department || row.Dept || row.Branch || row.Course;
            const yearRaw = row.Year || row['Year of Study'] || row.Class;
            const sectionRaw = row.Section || row.Sec;

            if (!rollRaw || !nameRaw) {
                skippedCount++;
                return;
            }

            const rollNo = String(rollRaw).trim().toUpperCase();
            const name = String(nameRaw).trim();
            const dept = normalizeDept(deptRaw, rollNo);
            const year = normalizeYear(yearRaw, rollNo);
            const section = normalizeSection(sectionRaw);
            const fatherName = fatherRaw ? String(fatherRaw).trim() : `${name.split(' ')[0]} Father`;
            const mobile = phoneRaw ? String(phoneRaw).trim() : `+91 98481 00${100 + (idx % 800)}`;
            const email = emailRaw ? String(emailRaw).trim() : `${rollNo.toLowerCase()}@alits.ac.in`;
            const quota = (quotaRaw && String(quotaRaw).toUpperCase().includes('MANAGE')) ? 'Management Quota' : 'Convenor Quota';
            const isHosteler = addressRaw && String(addressRaw).toLowerCase().includes('hostel');
            const residenceType = isHosteler ? 'Hosteler' : 'Day Scholar';
            const address = addressRaw ? String(addressRaw).trim() : 'Ananthapur Local, AP - 515001';
            const gender = genderRaw ? (String(genderRaw).trim().toLowerCase().startsWith('f') ? 'Female' : 'Male') : (idx % 2 === 0 ? 'Male' : 'Female');
            const dob = dobRaw ? String(dobRaw).trim() : `${(idx % 28) + 1} August 2005`;

            const feeTotal = quota === 'Management Quota' ? 75000 : 55000;
            const feePaid = 42500;
            const balanceDue = feeTotal - feePaid;

            const existingIdx = state.students.findIndex(s => (s.rollNo || s.roll || '').trim().toUpperCase() === rollNo);

            const studentObj = {
                id: `STU-${dept}-${rollNo}`,
                rollNo: rollNo,
                name: name,
                fatherName: fatherName,
                mobile: mobile.startsWith('+91') ? mobile : `+91 ${mobile}`,
                email: email,
                dept: dept,
                year: year,
                section: section,
                semester: year === '1st Year' ? 'I Year I Sem (1-1)' : (year === '2nd Year' ? 'II Year I Sem (2-1)' : (year === '3rd Year' ? 'III Year I Sem (3-1)' : 'IV Year I Sem (4-1)')),
                batch: '2024-2028',
                dob: dob,
                bloodGroup: ['O+', 'A+', 'B+', 'AB+', 'O-'][idx % 5],
                gender: gender,
                quota: quota,
                residenceType: residenceType,
                address: address,
                pincode: '515001',
                hostelBlock: isHosteler ? (gender === 'Female' ? 'Lakshmi Girls Hostel' : 'Anantha Boys Hostel') : 'N/A',
                roomNo: isHosteler ? (gender === 'Female' ? `G-${101 + (idx % 15)}` : `B-${201 + (idx % 20)}`) : 'N/A',
                totalClasses: 240,
                attendedClasses: 216,
                attendancePct: 90.0,
                totalAssigned: feeTotal,
                totalPaid: feePaid,
                balanceDue: balanceDue,
                installments: [
                    { name: "1st Installment Fees", dueDate: "31 Mar, 2026", status: "Paid", amount: Math.round(feeTotal * 0.35), paid: Math.round(feeTotal * 0.35), discount: 0, fine: 0, balance: 0 },
                    { name: "2nd Installment Fees", dueDate: "30 Jun, 2026", status: "Paid", amount: Math.round(feeTotal * 0.35), paid: Math.round(feeTotal * 0.35), discount: 0, fine: 0, balance: 0 },
                    { name: "3rd Installment Fees", dueDate: "22 Sep, 2026", status: "Partial", amount: Math.round(feeTotal * 0.15), paid: Math.round(feeTotal * 0.1), discount: 0, fine: 0, balance: Math.round(feeTotal * 0.05) },
                    { name: "4th Installment Fees", dueDate: "31 Dec, 2026", status: "Unpaid", amount: Math.round(feeTotal * 0.15), paid: 0, discount: 0, fine: 0, balance: Math.round(feeTotal * 0.15) }
                ],
                examMarks: {
                    mid1: 24, mid2: 26, semEnd: 60, totalMarks: 85,
                    grade: "A+ (Excellent)", sgpa: "8.75", cgpa: "8.75",
                    subjects: [
                        { code: "24A501", name: "Design and Analysis of Algorithms", mid1: 24, mid2: 26, semEnd: 60, total: 85, grade: "A+" },
                        { code: "24A502", name: "Database Management Systems", mid1: 25, mid2: 26, semEnd: 62, total: 88, grade: "A+" },
                        { code: "24A503", name: "Artificial Intelligence & Machine Learning", mid1: 23, mid2: 25, semEnd: 58, total: 82, grade: "A" },
                        { code: "24A504", name: "Web Application Development with Full-Stack", mid1: 26, mid2: 27, semEnd: 64, total: 91, grade: "O" },
                        { code: "24A505", name: "Software Engineering & Agile Methodologies", mid1: 24, mid2: 25, semEnd: 60, total: 85, grade: "A" }
                    ]
                }
            };

            if (existingIdx !== -1) {
                state.students[existingIdx] = { ...state.students[existingIdx], ...studentObj };
                updatedCount++;
            } else {
                state.students.unshift(studentObj);
                newCount++;
            }
        });

        // Save state to local storage and push to central SQLite database
        saveState({
            module: 'Students',
            action: 'Bulk Import Students',
            summary: `Imported ${newCount + updatedCount} student records from ${file.name} (${newCount} new, ${updatedCount} updated)`
        });

        // Update cross-portal student roster keys
        try {
            localStorage.setItem('alits_students_242G', JSON.stringify(state.students));
            localStorage.setItem('realStudents', JSON.stringify(state.students));
        } catch (e) { }

        closeStudentImportModal();
        if (typeof renderStudentsTable === 'function') renderStudentsTable();
        if (typeof renderIdCardsGrid === 'function') renderIdCardsGrid();
        if (typeof renderAllViews === 'function') renderAllViews();

        alert(`✓ Student Upload Successful!\n\n• Processed: ${newCount + updatedCount} valid student records\n• Newly Added: ${newCount}\n• Updated Existing: ${updatedCount}${skippedCount > 0 ? `\n• Skipped (Missing Roll/Name): ${skippedCount}` : ''}\n\nRecords have been synchronized across the Main ERP, Student Portal, and Faculty Portal.`);
    };

    if (isCsv) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const text = e.target.result;
                const lines = text.split(/\r\n|\n/).filter(l => l.trim().length > 0);
                if (lines.length < 2) {
                    alert('CSV file is empty or has no header.');
                    return;
                }
                const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
                const rows = lines.slice(1).map(line => {
                    const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
                    const rowObj = {};
                    headers.forEach((h, i) => { rowObj[h] = values[i] || ''; });
                    return rowObj;
                });
                processRows(rows);
            } catch (err) {
                alert('Failed to parse CSV file: ' + err.message);
            }
        };
        reader.readAsText(file);
    } else if (typeof XLSX !== 'undefined') {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                processRows(rows);
            } catch (err) {
                alert('Failed to parse Excel file: ' + err.message);
            }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Excel reader library is loading. Please try again in a moment or upload as CSV.');
    }
};

window.openFeeImportModal = function () {
    const modal = document.getElementById('feeImportModal');
    if (modal) modal.style.display = 'flex';
};

window.closeFeeImportModal = function () {
    const modal = document.getElementById('feeImportModal');
    if (modal) modal.style.display = 'none';
};

window.startFeeImport = function () {
    const fileInput = document.getElementById('feeExcelFile');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert('Please select an Excel (.xlsx/.xls) or CSV fee file to import.');
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();
    const isCsv = fileName.endsWith('.csv') || fileName.endsWith('.txt');

    const processFeeRows = (rows) => {
        if (!Array.isArray(rows) || rows.length === 0) {
            alert('No valid fee rows found in the uploaded file.');
            return;
        }

        if (!state.students) state.students = [];
        let updatedCount = 0;

        rows.forEach(row => {
            const rollRaw = row.AdmissionNo || row.Admission_No || row.RollNo || row.Roll_No || row['Roll Number'] || row.HTNo;
            const paidAmount = Number(row.PaidAmount || row['Paid Amount'] || row.Paid || row.Amount || row.FeePaid);
            const totalAssigned = Number(row.TotalAssigned || row['Total Fee'] || row.TotalFee);

            if (!rollRaw) return;
            const rollNo = String(rollRaw).trim().toUpperCase();
            const student = state.students.find(s => (s.rollNo || s.roll || '').trim().toUpperCase() === rollNo);

            if (student) {
                if (!isNaN(totalAssigned) && totalAssigned > 0) student.totalAssigned = totalAssigned;
                if (!isNaN(paidAmount) && paidAmount >= 0) {
                    student.totalPaid = paidAmount;
                    student.balanceDue = Math.max(0, (student.totalAssigned || 55000) - paidAmount);
                }
                updatedCount++;
            }
        });

        saveState({
            module: 'Fees',
            action: 'Bulk Import Fees',
            summary: `Imported fee updates for ${updatedCount} students from ${file.name}`
        });

        closeFeeImportModal();
        if (typeof renderFeesView === 'function') renderFeesView();
        if (typeof renderStudentsTable === 'function') renderStudentsTable();
        alert(`✓ Fee Import Successful!\n\n• Updated accounts ledger for ${updatedCount} students.\n• Synchronized across institution databases.`);
    };

    if (isCsv) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const text = e.target.result;
                const lines = text.split(/\r\n|\n/).filter(l => l.trim().length > 0);
                const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
                const rows = lines.slice(1).map(line => {
                    const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
                    const rowObj = {};
                    headers.forEach((h, i) => { rowObj[h] = values[i] || ''; });
                    return rowObj;
                });
                processFeeRows(rows);
            } catch (err) { alert('Failed to parse CSV fee file: ' + err.message); }
        };
        reader.readAsText(file);
    } else if (typeof XLSX !== 'undefined') {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                processFeeRows(rows);
            } catch (err) { alert('Failed to parse Excel fee file: ' + err.message); }
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Excel library loading, please try again.');
    }
};

window.openReportModal = function () {
    const modal = document.getElementById('reportModal');
    if (modal) modal.style.display = 'flex';
};

window.closeReportModal = function () {
    const modal = document.getElementById('reportModal');
    if (modal) modal.style.display = 'none';
};

window.generateCustomReport = function () {
    const select = document.getElementById('reportTypeSelect');
    const reportType = select ? select.value : 'students';
    closeReportModal();
    if (reportType === 'faculty') {
        if (typeof exportFacultyRosterCSV === 'function') exportFacultyRosterCSV();
    } else if (reportType === 'students') {
        if (typeof exportStudentsCSV === 'function') exportStudentsCSV();
    } else {
        alert(`✓ Generated official ${reportType.toUpperCase()} institutional report for Academic Year 2025-2026.`);
    }
};

window.openFacultyProfileModal = function (facultyId) {
    const modal = document.getElementById('facultyProfileModal');
    const content = document.getElementById('facultyModalContent');
    const title = document.getElementById('facModalTitle');
    const sub = document.getElementById('facModalSubtitle');
    if (!modal) return;

    const fac = (state.faculty || []).find(f => f.id === facultyId) || (state.faculty || [])[0];
    if (fac) {
        if (title) title.innerText = fac.name;
        if (sub) sub.innerText = `${fac.designation} • ${fac.deptName || fac.dept || 'Engineering'}`;
        if (content) {
            content.innerHTML = `
                <div style="display: flex; gap: 20px; align-items: flex-start; margin-bottom: 20px;">
                    <div style="width: 70px; height: 70px; border-radius: 12px; background: linear-gradient(135deg, #1e3c72, #2a5298); display: flex; align-items: center; justify-content: center; color: #D4AF37; font-size: 26px; font-weight: 800; border: 2px solid rgba(212, 175, 55, 0.4);">
                        ${fac.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div>
                        <h4 style="margin: 0 0 6px 0; font-size: 18px; color: #0f172a;">${fac.name}</h4>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;"><strong>Faculty ID:</strong> ${fac.id} | <strong>Experience:</strong> ${fac.experience || '8+ Years'}</div>
                        <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;"><strong>Email:</strong> ${fac.email || 'faculty@alits.ac.in'} | <strong>Mobile:</strong> ${fac.mobile || '+91 98480 00000'}</div>
                        <div style="font-size: 13px; color: #0284c7; font-weight: 600;">Specialization: ${fac.specialization || 'Computer Science & AI'}</div>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: center;">
                        <div style="font-size: 11px; color: #64748b;">Assigned Courses</div>
                        <div style="font-size: 18px; font-weight: 800; color: #1e3c72;">${(fac.subjects || []).length || 4}</div>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: center;">
                        <div style="font-size: 11px; color: #64748b;">Leave Balance</div>
                        <div style="font-size: 18px; font-weight: 800; color: #10b981;">${fac.leaveBalance || 8} Days</div>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: center;">
                        <div style="font-size: 11px; color: #64748b;">Feedback Rating</div>
                        <div style="font-size: 18px; font-weight: 800; color: #f59e0b;">${fac.rating || '4.85 / 5.0'}</div>
                    </div>
                </div>
                <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; display: flex; justify-content: flex-end; gap: 10px;">
                    <button class="btn-cal-ctrl" onclick="closeFacultyProfileModal()" style="background: #64748b; color: white;">Close</button>
                    <button class="btn-primary-erp" onclick="openEditFacultyModal('${fac.id}')" style="background: #1e3c72; color: white;">Edit Profile</button>
                </div>
            `;
        }
    }
    modal.style.display = 'flex';
};

window.closeFacultyProfileModal = function () {
    const modal = document.getElementById('facultyProfileModal');
    if (modal) modal.style.display = 'none';
};

window.exportFacultyRosterCSV = function () {
    const facultyList = state.faculty || [];
    if (!facultyList.length) {
        alert('No faculty records to export.');
        return;
    }
    const headers = ["ID", "Name", "Department", "Designation", "Email", "Mobile", "Experience", "Qualifications"];
    const rows = facultyList.map(f => [
        `"${f.id || ''}"`,
        `"${f.name || ''}"`,
        `"${f.deptName || f.dept || ''}"`,
        `"${f.designation || ''}"`,
        `"${f.email || ''}"`,
        `"${f.mobile || ''}"`,
        `"${f.experience || ''}"`,
        `"${f.qualifications || ''}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ALITS_Faculty_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.exportStudentsCSV = function () {
    const studentList = state.students || [];
    if (!studentList.length) {
        alert('No student records to export.');
        return;
    }
    const headers = ["Roll No", "Name", "Department", "Year", "Section", "Mobile", "Email", "Attendance %", "Balance Due"];
    const rows = studentList.map(s => [
        `"${s.rollNo || s.roll || ''}"`,
        `"${s.name || ''}"`,
        `"${s.dept || s.branch || ''}"`,
        `"${s.year || ''}"`,
        `"${s.section || ''}"`,
        `"${s.mobile || ''}"`,
        `"${s.email || ''}"`,
        `"${s.attendancePct || 0}%"`,
        `"₹${s.balanceDue || 0}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ALITS_Student_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.openAddStudentModal = function () {
    openGenericEditModal('Add New Student', [
        { id: 'rollNo', label: 'JNTUA Roll No *', value: '' },
        { id: 'name', label: 'Student Full Name *', value: '' },
        { id: 'fatherName', label: 'Father Name', value: '' },
        { id: 'mobile', label: 'Mobile Number *', value: '' },
        { id: 'email', label: 'Email Address', value: '' },
        { id: 'dept', label: 'Department *', value: 'CSE' },
        { id: 'year', label: 'Year *', value: '3rd Year' },
        { id: 'section', label: 'Section (A-F)', value: 'A' },
        { id: 'quota', label: 'Quota', value: 'Convenor Quota' },
        { id: 'residenceType', label: 'Residency (Day Scholar / Hosteler)', value: 'Day Scholar' },
        { id: 'address', label: 'Address Details', value: 'Ananthapur Local, AP - 515001' },
        { id: 'pincode', label: 'PIN Code', value: '515001' },
        { id: 'totalAssigned', label: 'Total Assigned Fee (₹)', value: '55000' }
    ], (formData) => {
        const rollNo = (formData.rollNo || '').trim().toUpperCase();
        const name = (formData.name || '').trim();
        const mobile = (formData.mobile || '').trim();
        const email = (formData.email || '').trim();
        const dept = (formData.dept || '').trim();
        const year = (formData.year || '').trim();
        const section = (formData.section || 'A').trim().toUpperCase();
        const fatherName = (formData.fatherName || '').trim();

        // 1. Strict required fields validation - reject empty, invalid, or dummy records
        if (!rollNo) {
            alert('Roll Number is required.');
            return false;
        }
        if (rollNo.length < 5) {
            alert('Please enter a valid Roll Number (e.g., 242G1A05O1).');
            return false;
        }
        if (!name || name.length < 2) {
            alert('Student Full Name is required.');
            return false;
        }
        if (!dept) {
            alert('Department is required.');
            return false;
        }
        if (!year) {
            alert('Year is required.');
            return false;
        }
        if (!mobile || mobile.replace(/\D/g, '').length < 10) {
            alert('Please enter a valid 10-digit Mobile Number.');
            return false;
        }

        // 2. Uniqueness Check for Roll Number
        const existingStudent = state.students.find(s => (s.rollNo || s.roll || '').trim().toUpperCase() === rollNo);
        if (existingStudent) {
            alert('Student with this Roll Number already exists.');
            if (typeof showLiveSyncToast === 'function') {
                showLiveSyncToast(`✗ Student with this Roll Number already exists. (${rollNo})`, 'Students', 'danger');
            }
            return false;
        }

        const isHosteler = formData.residenceType === 'Hosteler';
        const feeAmount = Number(formData.totalAssigned) > 0 ? Number(formData.totalAssigned) : 55000;

        const newStudent = {
            id: `STU-${dept}-${rollNo}`,
            rollNo: rollNo,
            name: name,
            fatherName: fatherName || 'N/A',
            mobile: mobile.startsWith('+91') ? mobile : `+91 ${mobile}`,
            email: email || `${rollNo.toLowerCase()}@alits.ac.in`,
            dept: dept,
            year: year,
            section: section,
            semester: year === '1st Year' ? 'I Year I Sem (1-1)' : (year === '2nd Year' ? 'II Year I Sem (2-1)' : (year === '3rd Year' ? 'III Year I Sem (3-1)' : 'IV Year I Sem (4-1)')),
            batch: "2024-2028",
            dob: "15 June 2005",
            bloodGroup: "O+",
            quota: formData.quota || "Convenor Quota",
            residenceType: formData.residenceType || "Day Scholar",
            address: formData.address || "Ananthapur Local, AP - 515001",
            pincode: formData.pincode || "515001",
            hostelBlock: isHosteler ? "Anantha Boys Hostel" : "N/A",
            roomNo: isHosteler ? "B-101" : "N/A",
            totalClasses: 200,
            attendedClasses: 180,
            attendancePct: 90.0,
            totalAssigned: feeAmount,
            totalPaid: 0,
            balanceDue: feeAmount,
            installments: [
                { name: "1st Installment Fees", dueDate: "31 Mar, 2026", status: "Unpaid", amount: Math.round(feeAmount * 0.35), paid: 0, discount: 0, fine: 0, balance: Math.round(feeAmount * 0.35) },
                { name: "2nd Installment Fees", dueDate: "30 Jun, 2026", status: "Unpaid", amount: Math.round(feeAmount * 0.35), paid: 0, discount: 0, fine: 0, balance: Math.round(feeAmount * 0.35) },
                { name: "3rd Installment Fees", dueDate: "22 Sep, 2026", status: "Unpaid", amount: Math.round(feeAmount * 0.15), paid: 0, discount: 0, fine: 0, balance: Math.round(feeAmount * 0.15) },
                { name: "4th Installment Fees", dueDate: "31 Dec, 2026", status: "Unpaid", amount: Math.round(feeAmount * 0.15), paid: 0, discount: 0, fine: 0, balance: Math.round(feeAmount * 0.15) }
            ]
        };

        // Add at top of ERP state
        state.students.unshift(newStudent);

        // Synchronize with cross-portal storage so Faculty and Staff portals also see the student
        try {
            const raw242G = JSON.parse(localStorage.getItem('alits_students_242G') || '[]');
            if (!raw242G.some(s => (s.roll || s.rollNo || '').toUpperCase() === rollNo)) {
                raw242G.unshift({
                    roll: rollNo,
                    rollNo: rollNo,
                    name: name,
                    status: 'Present',
                    quota: newStudent.quota,
                    dept: dept,
                    branch: dept,
                    branchCode: dept === 'CSE' ? '05' : '04',
                    section: section,
                    sec: section,
                    year: year,
                    yearLabel: year.includes('3') ? 'III B.Tech' : (year.includes('2') ? 'II B.Tech' : (year.includes('1') ? 'I B.Tech' : 'IV B.Tech')),
                    fullLabel: `${year.includes('3') ? 'III B.Tech' : (year.includes('2') ? 'II B.Tech' : (year.includes('1') ? 'I B.Tech' : 'IV B.Tech'))} ${dept} (Section-${section})`
                });
                localStorage.setItem('alits_students_242G', JSON.stringify(raw242G));
            }
        } catch (e) { }

        saveState({
            module: 'Students',
            action: 'Add Student',
            summary: `Added student ${newStudent.name} (${newStudent.rollNo})`
        });
        renderAllViews();
        if (typeof showLiveSyncToast === 'function') {
            showLiveSyncToast(`✓ Added student ${newStudent.name} (${newStudent.rollNo}) - auto-updated!`, 'Students');
        }
    });
};

window.editStudent = function (studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    openGenericEditModal(`Edit Student: ${student.name}`, [
        { id: 'rollNo', label: 'Roll Number *', value: student.rollNo },
        { id: 'name', label: 'Student Name *', value: student.name },
        { id: 'fatherName', label: 'Father Name', value: student.fatherName },
        { id: 'mobile', label: 'Mobile Number *', value: student.mobile },
        { id: 'email', label: 'Email Address', value: student.email || '' },
        { id: 'dept', label: 'Department *', value: student.dept },
        { id: 'year', label: 'Year *', value: student.year },
        { id: 'section', label: 'Section (A-F)', value: student.section },
        { id: 'quota', label: 'Quota', value: student.quota || 'Convenor Quota' },
        { id: 'residenceType', label: 'Residency', value: student.residenceType || 'Day Scholar' },
        { id: 'address', label: 'Address Details', value: student.address || 'Ananthapur Local' },
        { id: 'pincode', label: 'Postal PIN', value: student.pincode || '515001' }
    ], (formData) => {
        const target = state.students.find(s => s.id === studentId) || student;
        const newRoll = (formData.rollNo || '').trim().toUpperCase();
        const newName = (formData.name || '').trim();
        const newMobile = (formData.mobile || '').trim();

        if (!newRoll) {
            alert('Roll Number is required.');
            return false;
        }
        if (!newName || newName.length < 2) {
            alert('Student Name is required.');
            return false;
        }
        if (!newMobile || newMobile.replace(/\D/g, '').length < 10) {
            alert('Please enter a valid 10-digit Mobile Number.');
            return false;
        }

        // Check if new roll number already belongs to another student
        const conflict = state.students.find(s => s.id !== studentId && (s.rollNo || s.roll || '').trim().toUpperCase() === newRoll);
        if (conflict) {
            alert('Student with this Roll Number already exists.');
            return false;
        }

        formData.rollNo = newRoll;
        formData.name = newName;
        formData.mobile = newMobile.startsWith('+91') ? newMobile : `+91 ${newMobile}`;
        Object.assign(target, formData);

        // Update cross-portal cache
        try {
            const raw242G = JSON.parse(localStorage.getItem('alits_students_242G') || '[]');
            const idx = raw242G.findIndex(s => (s.roll || s.rollNo || '').toUpperCase() === student.rollNo.toUpperCase());
            if (idx !== -1) {
                raw242G[idx].roll = newRoll;
                raw242G[idx].rollNo = newRoll;
                raw242G[idx].name = newName;
                raw242G[idx].dept = target.dept;
                raw242G[idx].section = target.section;
                raw242G[idx].year = target.year;
                localStorage.setItem('alits_students_242G', JSON.stringify(raw242G));
            }
        } catch (e) { }

        saveState({
            module: 'Students',
            action: 'Edit Student',
            summary: `Updated student ${target.name} (${target.rollNo})`
        });
        renderAllViews();
        if (typeof showLiveSyncToast === 'function') {
            showLiveSyncToast(`✓ Updated student ${target.name} - auto-updated!`, 'Students');
        }
    });
};

window.deleteStudent = function (studentId) {
    const student = state.students.find(s => s.id === studentId);
    const stuName = student ? student.name : 'student';
    const rollNo = student ? (student.rollNo || '').toUpperCase() : '';

    if (confirm(`Are you sure you want to delete ${stuName} (${rollNo})?`)) {
        state.students = state.students.filter(s => s.id !== studentId);

        // Remove from cross-portal storage
        try {
            if (rollNo) {
                const raw242G = JSON.parse(localStorage.getItem('alits_students_242G') || '[]');
                const filtered = raw242G.filter(s => (s.roll || s.rollNo || '').toUpperCase() !== rollNo);
                localStorage.setItem('alits_students_242G', JSON.stringify(filtered));
            }
        } catch (e) { }

        saveState({
            module: 'Students',
            action: 'Delete Student',
            summary: `Deleted student ${stuName} (${rollNo})`
        });
        renderAllViews();
    }
};

/* Departments View */
function renderDepartmentsView() {
    const container = document.getElementById('departmentsGridContainer');

    if (container && state.departments) {
        container.innerHTML = state.departments.map(dept => {
            const secKeys = Object.keys(dept.sections || {});
            return `
                <div class="box-panel">
                    <div class="box-header">
                        <span class="box-title">🏢 ${dept.name} (${dept.id})</span>
                        <span class="code-badge-top">CODE: ${dept.code}</span>
                    </div>
                    <div class="box-body">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div>
                                <div style="font-size: 13px; font-weight: 700; color: #0088cc;">HOD: ${dept.hod}</div>
                                <div style="font-size: 11px; color: #00a65a; font-weight: 700;">Faculty Members: ${dept.facultyCount} Professors</div>
                                <div style="font-size: 11px; color: #666;">Annual Intake: ${dept.intake} Students</div>
                            </div>
                            <button class="btn-cal-ctrl" style="background: #0088cc;" onclick="editDepartmentHod('${dept.id}')">Edit Dept</button>
                        </div>
                        
                        <div style="background: #f8fafc; padding: 10px; border: 1px solid #e2e8f0; border-radius: 4px;">
                            <div style="font-size: 12px; font-weight: 700; color: #444; margin-bottom: 6px;">SECTION BREAKDOWN:</div>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
                                ${secKeys.map(yr => `
                                    <div style="background: white; padding: 6px; border: 1px solid #e2e8f0; border-radius: 3px; font-size: 11px;">
                                        <strong>${yr}:</strong>
                                        <div style="display: flex; gap: 3px; flex-wrap: wrap; margin-top: 4px;">
                                            ${dept.sections[yr].map(sec => `
                                                <span style="background: #e8f4fb; color: #0088cc; padding: 1px 6px; border-radius: 2px; font-weight: 700;">Sec ${sec}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

window.editDepartmentHod = function (deptId) {
    const dept = state.departments.find(d => d.id === deptId);
    if (!dept) return;

    openGenericEditModal(`Edit Department: ${dept.name}`, [
        { id: 'hod', label: 'Head of Department (HOD)', value: dept.hod },
        { id: 'facultyCount', label: 'Faculty Count', value: dept.facultyCount },
        { id: 'intake', label: 'Intake Capacity', value: dept.intake }
    ], (formData) => {
        const target = state.departments.find(d => d.id === deptId) || dept;
        target.hod = formData.hod;
        target.facultyCount = Number(formData.facultyCount) || target.facultyCount;
        target.intake = Number(formData.intake) || target.intake;

        state.college.totalFaculty = state.departments.reduce((sum, d) => sum + (d.facultyCount || 0), 0);
        saveState({
            module: 'Departments',
            action: 'Edit Department',
            summary: `Updated Department ${target.name} (HOD: ${target.hod})`
        });
        renderAllViews();
        alert(`✓ Department ${target.name} details updated successfully!`);
    });
};

/* Leadership & About ALITS View */
function renderLeadershipView() {
    const aboutContainer = document.getElementById('aboutAlitsContainer');
    const leaderContainer = document.getElementById('publicLeadershipContainer');

    if (aboutContainer && state.college) {
        aboutContainer.innerHTML = state.college.aboutText.map(p => `<p style="margin-bottom: 12px;">${p}</p>`).join('');
    }

    if (leaderContainer && state.executiveLeadership) {
        const exec = state.executiveLeadership;
        leaderContainer.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div class="box-panel highlighted-leadership-box">
                    <div class="box-header" style="background: linear-gradient(135deg, #0F3D26 0%, #164D31 100%); color: white; border-bottom: 2px solid #D4AF37;">
                        <span class="box-title" style="color: white;">👑 ${exec.chairman.title} Profile & Message</span>
                        <button class="btn-cal-ctrl" style="background: rgba(212,175,55,0.25); border: 1px solid #D4AF37; color: white;" onclick="editChairmanProfile()">Edit</button>
                    </div>
                    <div class="box-body">
                        <div style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 12px;">
                            <img src="images/chairman_anantha_ramudu.png" alt="${exec.chairman.name}" class="leadership-portrait-img" onerror="this.style.display='none'" />
                            <div>
                                <h4 style="font-size: 18px; font-weight: 800; color: #0F3D26;">${exec.chairman.name}</h4>
                                <div style="font-size: 12px; font-weight: 700; color: #D4AF37; margin-top: 2px;">Founder & Chairman, ALITS</div>
                                <p style="margin-top: 6px; font-size: 13px; color: #444; line-height: 1.5;">${exec.chairman.profile}</p>
                            </div>
                        </div>
                        <div style="margin-top: 14px; background: #fff8e7; padding: 14px; border-left: 4px solid #D4AF37; font-style: italic; border-radius: 6px; border: 1px solid rgba(212,175,55,0.3);">
                            <strong style="color: #0F3D26;">Chairman's Message:</strong><br/>
                            "${exec.chairman.message}"
                        </div>

                        <h5 style="margin: 20px 0 12px; color: #0F3D26; font-size: 14.5px; font-weight: 800; display: flex; align-items: center; justify-content: space-between;">
                            <span>🏆 Prestigious Awards & Honors Conferred to Chairman:</span>
                            <span style="font-size: 11px; background: rgba(212,175,55,0.2); color: #8A6D05; padding: 2px 8px; border-radius: 12px; font-weight: 700; border: 1px solid rgba(212,175,55,0.4);">${exec.chairman.awards.length} Honors</span>
                        </h5>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${exec.chairman.awards.map(a => `
                            <div style="background: linear-gradient(180deg, #ffffff 0%, #fdfbf7 100%); border: 1px solid rgba(212,175,55,0.45); border-radius: 8px; padding: 12px 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); display: flex; gap: 14px; align-items: flex-start;">
                                ${a.image ? `
                                    <div style="flex-shrink: 0; text-align: center;">
                                        <div style="position: relative; cursor: pointer; border-radius: 6px; overflow: hidden; border: 2px solid #D4AF37; box-shadow: 0 3px 8px rgba(0,0,0,0.15); width: 100px; height: 80px; background: #000;" onclick="openAwardImageModal('${a.image}', '${(a.title || '').replace(/'/g, "\\'")}', '${(a.conferredBy || '').replace(/'/g, "\\'")}')" title="Click to enlarge photograph">
                                            <img src="${a.image}" alt="${a.title}" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" />
                                            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(15,61,38,0.85); color: #fff; font-size: 9px; font-weight: 700; padding: 2px 0; text-align: center;">🔍 View Photo</div>
                                        </div>
                                    </div>
                                ` : `
                                    <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: rgba(212,175,55,0.15); border: 2px solid #D4AF37; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                                        🏅
                                    </div>
                                `}
                                <div style="flex-grow: 1;">
                                    <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px;">
                                        <strong style="color: #0F3D26; font-size: 13.5px; font-weight: 800;">🥇 ${a.title}</strong>
                                        ${a.year ? `<span style="font-size: 10px; background: #eef7f2; color: #0F3D26; font-weight: 700; padding: 1px 6px; border-radius: 4px; border: 1px solid rgba(15,61,38,0.25);">${a.year}</span>` : ''}
                                    </div>
                                    <div style="font-size: 11.5px; color: #8A6D05; font-weight: 700; margin: 3px 0 4px;">
                                        Conferred by: <span style="color: #0F3D26;">${a.conferredBy}</span>
                                    </div>
                                    <div style="font-size: 11.5px; color: #444; line-height: 1.45;">${a.description}</div>
                                </div>
                            </div>
                        `).join('')}
                        </div>
                    </div>
                </div>

                <div class="box-panel">
                    <div class="box-header" style="background: linear-gradient(135deg, #0F3D26 0%, #164D31 100%); color: white; border-bottom: 2px solid #D4AF37;">
                        <span class="box-title" style="color: white;">👔 ${exec.viceChairman.title} Profile & Message</span>
                        <button class="btn-cal-ctrl" style="background: rgba(212,175,55,0.25); border: 1px solid #D4AF37; color: white;" onclick="editViceChairmanProfile()">Edit</button>
                    </div>
                    <div class="box-body">
                        <div style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 12px;">
                            <img src="images/vice_chairman_ramesh_naidu.png" alt="${exec.viceChairman.name}" class="leadership-portrait-img" />
                            <div>
                                <h4 style="font-size: 18px; font-weight: 800; color: #0F3D26;">${exec.viceChairman.name}</h4>
                                <div style="font-size: 12px; font-weight: 700; color: #D4AF37; margin-top: 2px;">Vice-Chairman, ALITS</div>
                                <p style="margin-top: 6px; font-size: 13px; color: #444; line-height: 1.5;">${exec.viceChairman.profile}</p>
                            </div>
                        </div>
                        <div style="margin-top: 14px; background: #f0f7f3; padding: 14px; border-left: 4px solid #0F3D26; font-style: italic; border-radius: 6px; border: 1px solid rgba(15,61,38,0.2);">
                            <strong style="color: #0F3D26;">Vice-Chairman's Message:</strong><br/>
                            "${exec.viceChairman.message}"
                        </div>
                    </div>
                </div>
            </div>

            <div class="box-panel">
                <div class="box-header" style="background: linear-gradient(135deg, #0F3D26 0%, #164D31 100%); color: white; border-bottom: 2px solid #D4AF37;">
                    <span class="box-title" style="color: white;">🎓 Principal's Desk & Academic Profile</span>
                    <button class="btn-cal-ctrl" style="background: rgba(212,175,55,0.25); border: 1px solid #D4AF37; color: white;" onclick="editPrincipalProfile()">Edit</button>
                </div>
                <div class="box-body">
                    <div style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 12px;">
                        <img src="images/principal_profile.png" alt="${exec.principal.name}" class="leadership-portrait-img" onerror="this.src='images/principal_sreenivasulu.png'" />
                        <div>
                            <h4 style="font-size: 18px; font-weight: 800; color: #0F3D26;">${exec.principal.name}</h4>
                            <div style="font-size: 12px; font-weight: 700; color: #D4AF37; margin-top: 2px;">Principal & Chief Controller of Examinations, ALITS</div>
                            <p style="margin-top: 6px; font-size: 13px; color: #444; line-height: 1.5;">${exec.principal.profile}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.openAwardImageModal = function (imgSrc, title, conferredBy) {
    let modal = document.getElementById('awardImageLightboxModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'awardImageLightboxModal';
        modal.style.cssText = 'display:none; position:fixed; z-index:99999; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:20px; box-sizing:border-box;';
        modal.innerHTML = `
            <div style="background:#fff; border-radius:12px; max-width:680px; width:100%; max-height:92vh; overflow:auto; position:relative; box-shadow:0 12px 36px rgba(0,0,0,0.6); border:2px solid #D4AF37; animation:fadeInModal 0.25s ease;">
                <div style="background:linear-gradient(135deg, #0F3D26 0%, #164D31 100%); color:white; padding:12px 18px; border-bottom:2px solid #D4AF37; display:flex; justify-content:space-between; align-items:center;">
                    <div style="font-weight:800; font-size:15px; color:#D4AF37;" id="awardModalTitle">🏆 Award Presentation Ceremony</div>
                    <button style="background:transparent; border:none; color:white; font-size:26px; cursor:pointer; line-height:1; font-weight:700;" onclick="closeAwardImageModal()">&times;</button>
                </div>
                <div style="padding:16px; text-align:center; background:#0e1310; min-height:280px; display:flex; align-items:center; justify-content:center;">
                    <img id="awardModalImg" src="" alt="Award Presentation" style="max-width:100%; max-height:62vh; border-radius:8px; object-fit:contain; box-shadow:0 4px 20px rgba(0,0,0,0.6); border:1px solid rgba(212,175,55,0.4);" />
                </div>
                <div style="padding:14px 20px; background:#fdfbf7; border-top:1px solid #e0d5be;">
                    <div style="font-size:13.5px; font-weight:800; color:#0F3D26; margin-bottom:4px;" id="awardModalDignitary"></div>
                    <div style="font-size:11.5px; color:#555; line-height:1.4;">Presented to <strong>Sri M. Anantha Ramudu</strong>, Founder & Chairman, Anantha Lakshmi Institute of Technology & Sciences (ALITS).</div>
                </div>
            </div>
        `;
        modal.onclick = function (e) {
            if (e.target === modal) closeAwardImageModal();
        };
        document.body.appendChild(modal);
    }
    const imgEl = document.getElementById('awardModalImg');
    const titleEl = document.getElementById('awardModalTitle');
    const digEl = document.getElementById('awardModalDignitary');
    if (imgEl) imgEl.src = imgSrc;
    if (titleEl) titleEl.innerText = '🏆 ' + title;
    if (digEl) digEl.innerText = '🎖️ Conferred by: ' + conferredBy;
    modal.style.display = 'flex';
};

window.closeAwardImageModal = function () {
    const modal = document.getElementById('awardImageLightboxModal');
    if (modal) modal.style.display = 'none';
};

window.editChairmanProfile = function () {
    const ch = state.executiveLeadership.chairman;
    openGenericEditModal('Edit Chairman Profile & Message', [
        { id: 'name', label: 'Chairman Name', value: ch.name },
        { id: 'profile', label: 'Profile Text', type: 'textarea', value: ch.profile },
        { id: 'message', label: 'Chairman Message', type: 'textarea', value: ch.message }
    ], (formData) => {
        Object.assign(ch, formData);
        saveState();
        renderLeadershipView();
        alert('✓ Chairman profile updated!');
    });
};

window.editViceChairmanProfile = function () {
    const vc = state.executiveLeadership.viceChairman;
    openGenericEditModal('Edit Vice-Chairman Profile & Message', [
        { id: 'name', label: 'Vice-Chairman Name', value: vc.name },
        { id: 'profile', label: 'Profile Text', type: 'textarea', value: vc.profile },
        { id: 'message', label: 'Vice-Chairman Message', type: 'textarea', value: vc.message }
    ], (formData) => {
        Object.assign(vc, formData);
        saveState();
        renderLeadershipView();
        alert('✓ Vice-Chairman profile updated!');
    });
};

window.editPrincipalProfile = function () {
    const pr = state.executiveLeadership.principal;
    openGenericEditModal('Edit Principal Profile', [
        { id: 'name', label: 'Principal Name & Qualifications', value: pr.name },
        { id: 'profile', label: 'Principal Profile', type: 'textarea', value: pr.profile }
    ], (formData) => {
        Object.assign(pr, formData);
        saveState();
        renderLeadershipView();
        alert('✓ Principal profile updated!');
    });
};

/* Hostel Management View */
function renderHostelView() {
    const container = document.getElementById('hostelBlocksGrid');
    const tbody = document.getElementById('hostelResidentsTbody');
    if (!state.hostel) return;

    if (container) {
        container.innerHTML = state.hostel.blocks.map((blk, idx) => `
            <div class="box-panel">
                <div class="box-header" style="background: #3c8dbc; color: white;">
                    <span class="box-title" style="color: white;">🏨 ${blk.name}</span>
                    <button class="btn-cal-ctrl" style="background: rgba(255,255,255,0.3); color: white;" onclick="editHostelBlock(${idx})">Edit Block</button>
                </div>
                <div class="box-body">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div>
                            <div style="font-size: 13px; font-weight: 700; color: #333;">Warden: ${blk.warden}</div>
                            <div style="font-size: 11px; color: #666;">Contact: ${blk.contact}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 14px; font-weight: 800; color: #00a65a;">${blk.occupied} / ${blk.capacity} Beds Occupied</div>
                            <div style="font-size: 11px; color: #777;">Annual Mess Fee: ₹${blk.feePerYear.toLocaleString()}</div>
                        </div>
                    </div>

                    <div style="background: #f8fafc; padding: 10px; border: 1px solid #e2e8f0; border-radius: 4px;">
                        <strong style="font-size: 12px; color: #444;">Room Allocations Status:</strong>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 6px;">
                            ${blk.rooms.map(r => `
                                <div style="background: white; padding: 6px 10px; border: 1px solid #e2e8f0; border-radius: 3px; font-size: 11px; display: flex; justify-content: space-between;">
                                    <span><strong>Room ${r.roomNo}</strong> (${r.floor})</span>
                                    <span style="color: ${r.status === 'Full' ? '#dd4b39' : '#00a65a'}; font-weight: 700;">${r.occupied}/${r.capacity} (${r.status})</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    if (tbody) {
        tbody.innerHTML = state.hostel.residents.map((r, idx) => `
            <tr>
                <td><strong style="font-family: var(--font-mono); color: #0088cc;">${r.rollNo}</strong></td>
                <td style="font-weight: 600;">${r.studentName}</td>
                <td>${r.block}</td>
                <td><span class="code-badge-top">Room ${r.roomNo}</span></td>
                <td><span class="badge-status ${r.status === 'Paid' ? 'paid' : 'partial'}">${r.status} (₹${r.feePaid.toLocaleString()})</span></td>
                <td>
                    <button class="btn-cal-ctrl" style="background: #0088cc;" onclick="editHostelResident(${idx})">Edit</button>
                    <button class="btn-cal-ctrl" style="background: #dd4b39;" onclick="deleteHostelResident(${idx})">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}

window.editHostelBlock = function (idx) {
    const blk = state.hostel.blocks[idx];
    openGenericEditModal(`Edit Hostel Block: ${blk.name}`, [
        { id: 'name', label: 'Hostel Block Name', value: blk.name },
        { id: 'warden', label: 'Warden Name', value: blk.warden },
        { id: 'contact', label: 'Warden Contact', value: blk.contact },
        { id: 'feePerYear', label: 'Annual Fee (₹)', value: blk.feePerYear }
    ], (formData) => {
        Object.assign(blk, formData);
        saveState();
        renderHostelView();
    });
};

window.openAddHostelResidentModal = function () {
    openGenericEditModal('Allocate Student Room', [
        { id: 'rollNo', label: 'Student Roll Number', value: '262G1A0501' },
        { id: 'studentName', label: 'Student Full Name', value: 'Nitara Agrawal' },
        { id: 'block', label: 'Hostel Block', value: 'Lakshmi Girls Hostel' },
        { id: 'roomNo', label: 'Room Number', value: 'G-102' },
        { id: 'feePaid', label: 'Fee Paid (₹)', value: '65000' }
    ], (formData) => {
        state.hostel.residents.push({
            rollNo: formData.rollNo,
            studentName: formData.studentName,
            block: formData.block,
            roomNo: formData.roomNo,
            feePaid: Number(formData.feePaid) || 65000,
            status: 'Paid'
        });
        saveState();
        renderHostelView();
    });
};

window.editHostelResident = function (idx) {
    const r = state.hostel.residents[idx];
    openGenericEditModal(`Edit Room Resident: ${r.studentName}`, [
        { id: 'block', label: 'Hostel Block', value: r.block },
        { id: 'roomNo', label: 'Room Number', value: r.roomNo },
        { id: 'feePaid', label: 'Fee Paid (₹)', value: r.feePaid }
    ], (formData) => {
        Object.assign(r, formData);
        saveState();
        renderHostelView();
    });
};

window.deleteHostelResident = function (idx) {
    if (confirm('Unallocate student room?')) {
        state.hostel.residents.splice(idx, 1);
        saveState();
        renderHostelView();
    }
};

/* Library View */
function renderLibraryView() {
    const booksTbody = document.getElementById('libraryBooksTbody');
    const issuesTbody = document.getElementById('libraryIssuesTbody');
    if (!state.library) return;

    if (booksTbody) {
        booksTbody.innerHTML = state.library.catalog.map((b, idx) => `
            <tr>
                <td><span style="font-family: var(--font-mono); font-size: 11px;">${b.isbn}</span></td>
                <td style="font-weight: 700; color: #333;">${b.title}</td>
                <td>${b.author}</td>
                <td><span class="code-badge-top">${b.dept}</span></td>
                <td>${b.copies}</td>
                <td><strong style="color: #00a65a;">${b.available}</strong></td>
                <td>
                    <button class="btn-cal-ctrl" style="background: #0088cc;" onclick="editLibraryBook(${idx})">Edit</button>
                    <button class="btn-cal-ctrl" style="background: #00a65a;" onclick="issueLibraryBook(${idx})">Issue</button>
                    <button class="btn-cal-ctrl" style="background: #dd4b39;" onclick="deleteLibraryBook(${idx})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    if (issuesTbody) {
        issuesTbody.innerHTML = state.library.issuedRecords.map((iss, idx) => `
            <tr>
                <td><strong style="font-family: var(--font-mono);">${iss.issueId}</strong></td>
                <td><span style="font-family: var(--font-mono); color: #0088cc;">${iss.rollNo}</span></td>
                <td style="font-weight: 600;">${iss.studentName}</td>
                <td>${iss.bookTitle}</td>
                <td>${iss.issueDate}</td>
                <td style="color: #dd4b39; font-weight: 700;">${iss.dueDate}</td>
                <td>
                    <button class="btn-cal-ctrl" style="background: #00a65a;" onclick="returnLibraryBook(${idx})">Return Book</button>
                </td>
            </tr>
        `).join('');
    }
}

window.openAddBookModal = function () {
    openGenericEditModal('Add New Library Book', [
        { id: 'isbn', label: 'ISBN Code *', value: '978-013' + Math.floor(1000000 + Math.random() * 9000000) },
        { id: 'title', label: 'Book Title *', value: '' },
        { id: 'author', label: 'Author Name(s) *', value: '' },
        { id: 'dept', label: 'Department Tag (CSE/AIML/ECE/EEE/CIVIL/MECH)', value: 'CSE' },
        { id: 'copies', label: 'Total Copies', value: '30' }
    ], (formData) => {
        state.library.catalog.push({
            id: `BK-${Date.now()}`,
            isbn: formData.isbn,
            title: formData.title,
            author: formData.author,
            dept: formData.dept,
            copies: Number(formData.copies) || 30,
            available: Number(formData.copies) || 30
        });
        saveState();
        renderLibraryView();
        alert('✓ Book added to library inventory!');
    });
};

window.editLibraryBook = function (idx) {
    const b = state.library.catalog[idx];
    openGenericEditModal(`Edit Book: ${b.title}`, [
        { id: 'title', label: 'Book Title', value: b.title },
        { id: 'author', label: 'Author(s)', value: b.author },
        { id: 'copies', label: 'Total Copies', value: b.copies },
        { id: 'available', label: 'Available Copies', value: b.available }
    ], (formData) => {
        Object.assign(b, formData);
        saveState();
        renderLibraryView();
    });
};

window.deleteLibraryBook = function (idx) {
    if (confirm('Delete book from library inventory?')) {
        state.library.catalog.splice(idx, 1);
        saveState();
        renderLibraryView();
    }
};

window.issueLibraryBook = function (idx) {
    const b = state.library.catalog[idx];
    if (b.available <= 0) {
        alert('No copies available to issue!');
        return;
    }

    const rollNo = prompt(`Enter Student Roll No to issue "${b.title}":`, '262G1A0501');
    if (rollNo) {
        b.available -= 1;
        state.library.issuedRecords.push({
            issueId: `ISS-${Math.floor(100 + Math.random() * 900)}`,
            rollNo: rollNo,
            studentName: 'Nitara Agrawal',
            bookTitle: b.title,
            issueDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
            status: 'Active'
        });
        saveState();
        renderLibraryView();
        alert(`✓ Book issued to ${rollNo}!`);
    }
};

window.returnLibraryBook = function (idx) {
    const iss = state.library.issuedRecords[idx];
    const book = state.library.catalog.find(b => b.title === iss.bookTitle);
    if (book) book.available += 1;

    state.library.issuedRecords.splice(idx, 1);
    saveState();
    renderLibraryView();
    alert('✓ Book returned successfully!');
};

/* Governance & Skill Dev & Transport Views */
function renderGovernanceView() {
    const container = document.getElementById('publicGovContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="box-panel" style="margin-bottom: 20px;">
            <div class="box-header">
                <span class="box-title">📋 Board of Trustees (9 Members)</span>
                <button class="btn-cal-ctrl" style="background: #00a65a;" onclick="addTrusteeMember()">+ Add Trustee</button>
            </div>
            <div class="box-body" style="padding: 0;">
                <table class="table-custom">
                    <thead><tr><th>S.NO</th><th>Name</th><th>Designation</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${state.boardOfTrustees.map((t, idx) => `
                            <tr>
                                <td>${t.sno || idx + 1}</td>
                                <td><strong style="color: #333;">${t.name}</strong></td>
                                <td><span class="badge-status paid">${t.designation}</span></td>
                                <td>
                                    <button class="btn-cal-ctrl" style="background: #0088cc;" onclick="editTrusteeMember(${idx})">Edit</button>
                                    <button class="btn-cal-ctrl" style="background: #dd4b39;" onclick="deleteTrusteeMember(${idx})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="box-panel" style="margin-bottom: 20px;">
            <div class="box-header">
                <span class="box-title">🏛️ Governing Body (11 Members)</span>
                <button class="btn-cal-ctrl" style="background: #00a65a;" onclick="addGoverningMember()">+ Add Member</button>
            </div>
            <div class="box-body" style="padding: 0;">
                <table class="table-custom">
                    <thead><tr><th>S.NO</th><th>Name of the Member</th><th>Category</th><th>Nature</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${state.governingBody.map((g, idx) => `
                            <tr>
                                <td>${g.sno || idx + 1}</td>
                                <td><strong style="color: #333;">${g.name}</strong></td>
                                <td>${g.category}</td>
                                <td><span class="badge-status partial">${g.nature}</span></td>
                                <td>
                                    <button class="btn-cal-ctrl" style="background: #0088cc;" onclick="editGoverningMember(${idx})">Edit</button>
                                    <button class="btn-cal-ctrl" style="background: #dd4b39;" onclick="deleteGoverningMember(${idx})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="box-panel">
            <div class="box-header">
                <span class="box-title">🎓 Academic Council (22 Members)</span>
                <button class="btn-cal-ctrl" style="background: #00a65a;" onclick="addCouncilMember()">+ Add Council Member</button>
            </div>
            <div class="box-body" style="padding: 0;">
                <table class="table-custom">
                    <thead><tr><th>S.NO</th><th>Name</th><th>Category</th><th>Nature</th><th>Actions</th></tr></thead>
                    <tbody>
                        ${state.academicCouncil.map((c, idx) => `
                            <tr>
                                <td>${c.sno || idx + 1}</td>
                                <td><strong style="color: #333;">${c.name}</strong></td>
                                <td>${c.category}</td>
                                <td><span class="code-badge-top">${c.nature}</span></td>
                                <td>
                                    <button class="btn-cal-ctrl" style="background: #0088cc;" onclick="editCouncilMember(${idx})">Edit</button>
                                    <button class="btn-cal-ctrl" style="background: #dd4b39;" onclick="deleteCouncilMember(${idx})">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

window.editTrusteeMember = function (idx) {
    const t = state.boardOfTrustees[idx];
    openGenericEditModal(`Edit Trustee: ${t.name}`, [
        { id: 'name', label: 'Trustee Name', value: t.name },
        { id: 'designation', label: 'Designation', value: t.designation }
    ], (formData) => {
        Object.assign(t, formData);
        saveState();
        renderGovernanceView();
    });
};

window.deleteTrusteeMember = function (idx) {
    if (confirm('Delete trustee member?')) {
        state.boardOfTrustees.splice(idx, 1);
        saveState();
        renderGovernanceView();
    }
};

window.addTrusteeMember = function () {
    openGenericEditModal('Add New Board of Trustees Member', [
        { id: 'name', label: 'Member Name', value: '' },
        { id: 'designation', label: 'Designation', value: 'EC Member' }
    ], (formData) => {
        state.boardOfTrustees.push({
            sno: state.boardOfTrustees.length + 1,
            name: formData.name,
            designation: formData.designation
        });
        saveState();
        renderGovernanceView();
    });
};

window.editGoverningMember = function (idx) {
    const g = state.governingBody[idx];
    openGenericEditModal(`Edit Governing Member: ${g.name}`, [
        { id: 'name', label: 'Member Name', value: g.name },
        { id: 'category', label: 'Category', value: g.category },
        { id: 'nature', label: 'Nature', value: g.nature }
    ], (formData) => {
        Object.assign(g, formData);
        saveState();
        renderGovernanceView();
    });
};

window.deleteGoverningMember = function (idx) {
    if (confirm('Delete governing body member?')) {
        state.governingBody.splice(idx, 1);
        saveState();
        renderGovernanceView();
    }
};

window.addGoverningMember = function () {
    openGenericEditModal('Add Governing Body Member', [
        { id: 'name', label: 'Member Name', value: '' },
        { id: 'category', label: 'Category', value: 'Management' },
        { id: 'nature', label: 'Nature', value: 'Member' }
    ], (formData) => {
        state.governingBody.push({
            sno: state.governingBody.length + 1,
            name: formData.name,
            category: formData.category,
            nature: formData.nature
        });
        saveState();
        renderGovernanceView();
    });
};

window.editCouncilMember = function (idx) {
    const c = state.academicCouncil[idx];
    openGenericEditModal(`Edit Council Member: ${c.name}`, [
        { id: 'name', label: 'Member Name', value: c.name },
        { id: 'category', label: 'Category', value: c.category },
        { id: 'nature', label: 'Nature', value: c.nature }
    ], (formData) => {
        Object.assign(c, formData);
        saveState();
        renderGovernanceView();
    });
};

window.deleteCouncilMember = function (idx) {
    if (confirm('Delete council member?')) {
        state.academicCouncil.splice(idx, 1);
        saveState();
        renderGovernanceView();
    }
};

window.addCouncilMember = function () {
    openGenericEditModal('Add Academic Council Member', [
        { id: 'name', label: 'Member Name', value: '' },
        { id: 'category', label: 'Category', value: 'Nominated by Principal' },
        { id: 'nature', label: 'Nature', value: 'Member' }
    ], (formData) => {
        state.academicCouncil.push({
            sno: state.academicCouncil.length + 1,
            name: formData.name,
            category: formData.category,
            nature: formData.nature
        });
        saveState();
        renderGovernanceView();
    });
};

let currentPlacementStreamFilter = 'ALL';
let currentPlacementSearchQuery = '';

function renderSkillDevView() {
    const container = document.getElementById('publicSkillContainer');
    if (!container || !state.skillDevelopment) return;

    const sd = state.skillDevelopment;
    const summary = sd.placementSummary || [];
    const details = sd.placementDetails || [];

    // Compute key statistics
    const latestSummary = summary.find(s => s.year === '2025-26') || summary[0] || { btech: 614, mba: 69, total: 683 };
    const totalHistorical = summary.reduce((acc, curr) => acc + (curr.total || 0), 0);
    const totalBTechHistorical = summary.reduce((acc, curr) => acc + (curr.btech || 0), 0);
    const totalMBAHistorical = summary.reduce((acc, curr) => acc + (curr.mba || 0), 0);
    const totalDrives2026 = details.length;
    const topCompany = [...details].sort((a, b) => b.count - a.count)[0] || { company: 'Quess Corp.', count: 129 };

    // Filter company details based on stream and search query
    const filteredDetails = details.filter(item => {
        const matchesStream = (currentPlacementStreamFilter === 'ALL') ||
            (currentPlacementStreamFilter === 'B.TECH' && item.stream.toUpperCase().includes('B.TECH')) ||
            (currentPlacementStreamFilter === 'MBA' && item.stream.toUpperCase().includes('MBA')) ||
            (currentPlacementStreamFilter === 'MCA' && item.stream.toUpperCase().includes('MCA'));
        
        const q = currentPlacementSearchQuery.toLowerCase().trim();
        const matchesSearch = !q || item.company.toLowerCase().includes(q) || item.stream.toLowerCase().includes(q) || (item.year && item.year.toLowerCase().includes(q));

        return matchesStream && matchesSearch;
    });

    container.innerHTML = `
        <!-- TOP KPI PLACEMENT SUMMARY CARDS -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 20px;">
            <div style="background: linear-gradient(135deg, #0F3D26 0%, #1c5e3d 100%); color: white; padding: 18px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(15,61,38,0.15); border-left: 5px solid #D4AF37;">
                <div style="font-size: 12px; font-weight: 700; color: #D4AF37; text-transform: uppercase; letter-spacing: 0.5px;">Current Year Placements (2025-26)</div>
                <div style="font-size: 30px; font-weight: 900; margin-top: 4px; color: white;">${latestSummary.total} <span style="font-size: 14px; font-weight: 500; color: #a7f3d0;">Students</span></div>
                <div style="font-size: 12px; color: #d1fae5; margin-top: 4px;">🎓 B.Tech: <strong>${latestSummary.btech}</strong> &nbsp;|&nbsp; 💼 MBA: <strong>${latestSummary.mba}</strong></div>
            </div>

            <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; padding: 18px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(30,60,114,0.15); border-left: 5px solid #38bdf8;">
                <div style="font-size: 12px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">14-Year Cumulative Placements</div>
                <div style="font-size: 30px; font-weight: 900; margin-top: 4px; color: white;">${totalHistorical.toLocaleString('en-IN')} <span style="font-size: 14px; font-weight: 500; color: #bae6fd;">Offers</span></div>
                <div style="font-size: 12px; color: #e0f2fe; margin-top: 4px;">B.Tech: <strong>${totalBTechHistorical.toLocaleString('en-IN')}</strong> &nbsp;|&nbsp; MBA: <strong>${totalMBAHistorical.toLocaleString('en-IN')}</strong></div>
            </div>

            <div style="background: white; border: 1px solid #e2e8f0; border-top: 4px solid #f59e0b; padding: 18px 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                <div style="font-size: 12px; font-weight: 700; color: #d97706; text-transform: uppercase;">Top Recruiter (2025-26)</div>
                <div style="font-size: 22px; font-weight: 800; color: #1e293b; margin-top: 4px;">${topCompany.company}</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">🎯 <strong>${topCompany.count} Students Placed</strong> (${topCompany.stream})</div>
            </div>

            <div style="background: white; border: 1px solid #e2e8f0; border-top: 4px solid #8b5cf6; padding: 18px 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                <div style="font-size: 12px; font-weight: 700; color: #7c3aed; text-transform: uppercase;">Active Corporate Partners</div>
                <div style="font-size: 30px; font-weight: 900; color: #1e293b; margin-top: 4px;">${totalDrives2026} <span style="font-size: 14px; font-weight: 500; color: #64748b;">Companies</span></div>
                <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Tier-1 Tech & Core Manufacturing MNCs</div>
            </div>
        </div>

        <!-- SECTION 1: STUDENT PLACEMENT SUMMARY - YEARWISE -->
        <div class="box-panel" style="margin-bottom: 24px;">
            <div class="box-header" style="background: linear-gradient(135deg, #0F3D26 0%, #164D31 100%); color: white; border-bottom: 2px solid #D4AF37; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                    <span class="box-title" style="color: white; font-size: 15px; font-weight: 700;">📊 Student Placement Summary - Yearwise (2012-13 to 2025-26)</span>
                    <span style="font-size: 12px; color: #d4af37; margin-left: 10px;">(14 Academic Years Historical Placement Statistics)</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-cal-ctrl" style="background: rgba(212,175,55,0.25); border: 1px solid #D4AF37; color: white;" onclick="exportPlacementDataCSV('summary')">
                        <i class="fa-solid fa-file-excel"></i> Export Summary CSV
                    </button>
                    <button class="btn-cal-ctrl" style="background: rgba(255,255,255,0.2); border: 1px solid white; color: white;" onclick="openAddYearwisePlacementModal()">
                        + Add Academic Year
                    </button>
                </div>
            </div>
            <div class="box-body" style="padding: 0; overflow-x: auto;">
                <table class="table-custom" style="margin: 0; width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 700; color: #475569;">ACADEMIC YEAR</th>
                            <th style="padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 700; color: #475569;">B.TECH PLACEMENTS</th>
                            <th style="padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 700; color: #475569;">MBA PLACEMENTS</th>
                            <th style="padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 700; color: #0F3D26;">TOTAL PLACED</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 700; color: #475569;">PLACEMENT SHARE & DISTRIBUTION</th>
                            <th style="padding: 12px 16px; text-align: center; font-size: 12px; font-weight: 700; color: #475569;">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${summary.map((row, idx) => {
                            const btechPct = row.total > 0 ? Math.round((row.btech / row.total) * 100) : 0;
                            const isCurrent = (row.year === '2025-26');
                            return `
                                <tr style="background: ${isCurrent ? '#f0fdf4' : (idx % 2 === 0 ? 'white' : '#fbfcfd')}; border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 12px 16px; font-weight: 800; color: ${isCurrent ? '#0F3D26' : '#1e293b'};">
                                        ${row.year} ${isCurrent ? '<span style="background: #0F3D26; color: white; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">CURRENT BATCH</span>' : ''}
                                    </td>
                                    <td style="padding: 12px 16px; text-align: center; font-weight: 700; color: #1e3a8a;">
                                        ${row.btech}
                                    </td>
                                    <td style="padding: 12px 16px; text-align: center; font-weight: 700; color: #065f46;">
                                        ${row.mba}
                                    </td>
                                    <td style="padding: 12px 16px; text-align: center; font-weight: 900; color: #0F3D26; font-size: 14px;">
                                        ${row.total}
                                    </td>
                                    <td style="padding: 12px 16px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <div style="flex: 1; background: #e2e8f0; height: 10px; border-radius: 5px; overflow: hidden; display: flex;">
                                                <div style="width: ${btechPct}%; background: #3b82f6; height: 100%;" title="B.Tech: ${row.btech} (${btechPct}%)"></div>
                                                <div style="width: ${100 - btechPct}%; background: #10b981; height: 100%;" title="MBA: ${row.mba} (${100 - btechPct}%)"></div>
                                            </div>
                                            <span style="font-size: 11px; font-weight: 700; color: #64748b; min-width: 75px;">${btechPct}% BTech</span>
                                        </div>
                                    </td>
                                    <td style="padding: 12px 16px; text-align: center;">
                                        <button class="btn-cal-ctrl" style="background: #0284c7; padding: 3px 8px; font-size: 11px; color: white;" onclick="editYearwisePlacement(${idx})">Edit</button>
                                        <button class="btn-cal-ctrl" style="background: #ef4444; padding: 3px 8px; font-size: 11px; color: white;" onclick="deleteYearwisePlacement(${idx})">✕</button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                        <!-- TOTAL AGGREGATE ROW -->
                        <tr style="background: #e2e8f0; border-top: 2px solid #cbd5e1; font-weight: 800;">
                            <td style="padding: 14px 16px; color: #0F3D26; font-size: 13px;">GRAND TOTAL (14 YEARS)</td>
                            <td style="padding: 14px 16px; text-align: center; color: #1e3a8a; font-size: 14px;">${totalBTechHistorical.toLocaleString('en-IN')}</td>
                            <td style="padding: 14px 16px; text-align: center; color: #065f46; font-size: 14px;">${totalMBAHistorical.toLocaleString('en-IN')}</td>
                            <td style="padding: 14px 16px; text-align: center; color: #0F3D26; font-size: 16px;">${totalHistorical.toLocaleString('en-IN')}</td>
                            <td style="padding: 14px 16px; font-size: 12px; color: #475569;">100% Comprehensive Institutional Placement Record</td>
                            <td style="padding: 14px 16px; text-align: center; color: #059669; font-size: 12px;">✓ Verified Record</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- SECTION 2: PLACEMENT DETAILS (COMPANY-WISE 2025-26 DRIVES) -->
        <div class="box-panel" style="margin-bottom: 24px;">
            <div class="box-header" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); color: white; border-bottom: 2px solid #38bdf8; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                <div>
                    <span class="box-title" style="color: white; font-size: 15px; font-weight: 700;">🏢 Placement Details — Company-wise Student Selections (2025-26 Drive)</span>
                    <span style="font-size: 12px; color: #bae6fd; margin-left: 10px;">(26 Leading Recruiters Active On-Campus)</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-cal-ctrl" style="background: rgba(56,189,248,0.25); border: 1px solid #38bdf8; color: white;" onclick="exportPlacementDataCSV('details')">
                        <i class="fa-solid fa-file-excel"></i> Export Details CSV
                    </button>
                    <button class="btn-cal-ctrl" style="background: #00a65a; border: 1px solid #00a65a; color: white;" onclick="openAddPlacementRecordModal()">
                        + Add Company Drive
                    </button>
                </div>
            </div>
            <div class="box-body" style="padding: 16px 20px;">
                <!-- SEARCH & FILTER TOOLBAR -->
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 16px;">
                    <!-- STREAM FILTER PILLS -->
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button class="btn-cal-ctrl" style="background: ${currentPlacementStreamFilter === 'ALL' ? '#0F3D26' : '#f1f5f9'}; color: ${currentPlacementStreamFilter === 'ALL' ? 'white' : '#475569'}; border: 1px solid ${currentPlacementStreamFilter === 'ALL' ? '#0F3D26' : '#cbd5e1'}; font-weight: 600; padding: 6px 14px;" onclick="setPlacementStreamFilter('ALL')">
                            All Streams (${details.length})
                        </button>
                        <button class="btn-cal-ctrl" style="background: ${currentPlacementStreamFilter === 'B.TECH' ? '#1e3a8a' : '#f1f5f9'}; color: ${currentPlacementStreamFilter === 'B.TECH' ? 'white' : '#475569'}; border: 1px solid ${currentPlacementStreamFilter === 'B.TECH' ? '#1e3a8a' : '#cbd5e1'}; font-weight: 600; padding: 6px 14px;" onclick="setPlacementStreamFilter('B.TECH')">
                            B.Tech Drives
                        </button>
                        <button class="btn-cal-ctrl" style="background: ${currentPlacementStreamFilter === 'MBA' ? '#065f46' : '#f1f5f9'}; color: ${currentPlacementStreamFilter === 'MBA' ? 'white' : '#475569'}; border: 1px solid ${currentPlacementStreamFilter === 'MBA' ? '#065f46' : '#cbd5e1'}; font-weight: 600; padding: 6px 14px;" onclick="setPlacementStreamFilter('MBA')">
                            MBA Drives
                        </button>
                        <button class="btn-cal-ctrl" style="background: ${currentPlacementStreamFilter === 'MCA' ? '#6b21a8' : '#f1f5f9'}; color: ${currentPlacementStreamFilter === 'MCA' ? 'white' : '#475569'}; border: 1px solid ${currentPlacementStreamFilter === 'MCA' ? '#6b21a8' : '#cbd5e1'}; font-weight: 600; padding: 6px 14px;" onclick="setPlacementStreamFilter('MCA')">
                            MCA Drives
                        </button>
                    </div>

                    <!-- SEARCH INPUT -->
                    <div style="display: flex; align-items: center; gap: 8px; min-width: 280px;">
                        <input type="text" class="form-control-erp" placeholder="🔍 Search company name or stream..." value="${currentPlacementSearchQuery}" oninput="searchPlacementCompanies(this.value)" style="margin: 0; padding: 7px 12px; font-size: 13px;" />
                        ${currentPlacementSearchQuery ? `<button class="btn-cal-ctrl" style="background: #e2e8f0; color: #475569;" onclick="searchPlacementCompanies('')">Clear</button>` : ''}
                    </div>
                </div>

                <!-- TABLE -->
                <div style="overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 6px;">
                    <table class="table-custom" style="margin: 0; width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                                <th style="padding: 10px 14px; text-align: center; width: 60px; font-size: 12px; color: #475569;">#</th>
                                <th style="padding: 10px 14px; text-align: left; font-size: 12px; color: #475569;">COMPANY NAME</th>
                                <th style="padding: 10px 14px; text-align: left; font-size: 12px; color: #475569;">STREAM / ELIGIBILITY</th>
                                <th style="padding: 10px 14px; text-align: center; font-size: 12px; color: #475569;">STUDENTS PLACED</th>
                                <th style="padding: 10px 14px; text-align: center; font-size: 12px; color: #475569;">YEAR</th>
                                <th style="padding: 10px 14px; text-align: center; font-size: 12px; color: #475569;">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredDetails.length === 0 ? `
                                <tr>
                                    <td colspan="6" style="text-align: center; padding: 24px; color: #64748b;">
                                        No placement records match the current filter criteria.
                                    </td>
                                </tr>
                            ` : filteredDetails.map((item, idx) => {
                                const streams = (item.stream || 'B.TECH').split(',').map(s => s.trim());
                                return `
                                    <tr style="background: ${idx % 2 === 0 ? 'white' : '#fcfdfd'}; border-bottom: 1px solid #f1f5f9;">
                                        <td style="padding: 10px 14px; text-align: center; font-weight: 700; color: #64748b; font-size: 12px;">${idx + 1}</td>
                                        <td style="padding: 10px 14px; font-weight: 700; color: #1e293b; font-size: 13.5px;">
                                            <i class="fa-solid fa-building" style="color: #3b82f6; margin-right: 6px;"></i> ${item.company}
                                        </td>
                                        <td style="padding: 10px 14px;">
                                            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                                                ${streams.map(str => {
                                                    const bg = str.includes('B.TECH') ? '#dbeafe' : (str.includes('MBA') ? '#dcfce7' : '#f3e8ff');
                                                    const color = str.includes('B.TECH') ? '#1e40af' : (str.includes('MBA') ? '#166534' : '#6b21a8');
                                                    return `<span style="background: ${bg}; color: ${color}; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 4px;">${str}</span>`;
                                                }).join('')}
                                            </div>
                                        </td>
                                        <td style="padding: 10px 14px; text-align: center;">
                                            <span style="background: #f0fdf4; border: 1px solid #86efac; color: #166534; font-size: 13px; font-weight: 800; padding: 3px 12px; border-radius: 12px;">
                                                ${item.count} Placed
                                            </span>
                                        </td>
                                        <td style="padding: 10px 14px; text-align: center; font-weight: 600; color: #475569; font-size: 12px;">
                                            ${item.year || '2025-26'}
                                        </td>
                                        <td style="padding: 10px 14px; text-align: center;">
                                            <button class="btn-cal-ctrl" style="background: #0284c7; padding: 2px 7px; font-size: 11px; color: white;" onclick="editPlacementRecord(${item.id || idx})">Edit</button>
                                            <button class="btn-cal-ctrl" style="background: #ef4444; padding: 2px 7px; font-size: 11px; color: white;" onclick="deletePlacementRecord(${item.id || idx})">✕</button>
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- SECTION 3: SKILL DIRECTORATE LEADER & 10 EXPERT TEAM MEMBERS -->
        <div class="box-panel" style="margin-bottom: 20px;">
            <div class="box-header" style="background: linear-gradient(135deg, #0F3D26 0%, #164D31 100%); color: white; border-bottom: 2px solid #D4AF37; display: flex; justify-content: space-between; align-items: center;">
                <span class="box-title" style="color: white; font-size: 15px; font-weight: 700;">🚀 Skill Development Directorate & Placement Leadership</span>
                <button class="btn-cal-ctrl" style="background: rgba(212,175,55,0.25); border: 1px solid #D4AF37; color: white;" onclick="editSkillDirector()">Edit Director Profile</button>
            </div>
            <div class="box-body" style="padding: 18px 20px;">
                <div style="display: flex; gap: 18px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
                    <div style="position: relative; width: 72px; height: 72px; flex-shrink: 0;">
                        <img src="${sd.director.photo || 'images/skill_director_surendra_naidu.png'}" alt="${sd.director.name}" style="width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 3px solid #D4AF37; box-shadow: 0 4px 12px rgba(15,61,38,0.25); display: block;" onerror="this.src='images/skill_director.png'; this.onerror=function(){this.style.display='none'; this.nextElementSibling.style.display='flex';};" />
                        <div style="display: none; width: 72px; height: 72px; border-radius: 50%; background: #0F3D26; color: #D4AF37; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; border: 3px solid #D4AF37;">SN</div>
                    </div>
                    <div style="flex: 1; min-width: 250px;">
                        <h4 style="font-size: 18px; font-weight: 800; color: #0F3D26; margin: 0;">${sd.director.name}</h4>
                        <div style="font-size: 13px; font-weight: 700; color: #b8860b; margin-top: 3px;">${sd.director.designation} (${sd.director.qualification})</div>
                        <p style="margin-top: 6px; font-size: 13px; color: #444; line-height: 1.5; margin-bottom: 0;">${sd.director.bio}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 4: OFFICIAL SKILL DEVELOPMENT COMMITTEE MEMBERS (8 MEMBERS) -->
        <div class="box-panel">
            <div class="box-header" style="background: linear-gradient(135deg, #0F3D26 0%, #164D31 100%); color: white; border-bottom: 2px solid #D4AF37; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <span class="box-title" style="color: white; font-size: 14px; font-weight: 800;">👥 Skill Development Committee Faculty Members (${sd.teamMembers.length} Members)</span>
                <button class="btn-primary-erp" onclick="openAddSkillMemberModal()" style="background: #00a65a; width: auto; padding: 4px 12px; font-size: 12px;">+ Add Committee Member</button>
            </div>
            <div class="box-body" style="padding: 0; overflow-x: auto;">
                <table class="table-custom" style="margin: 0; width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <th style="padding: 12px 16px; text-align: center; width: 80px; font-size: 12px; font-weight: 700; color: #475569;">Sl.No</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 700; color: #475569;">Name Of The Faculty</th>
                            <th style="padding: 12px 16px; text-align: left; font-size: 12px; font-weight: 700; color: #475569;">Designation</th>
                            <th style="padding: 12px 16px; text-align: center; width: 140px; font-size: 12px; font-weight: 700; color: #475569;">Role</th>
                            <th style="padding: 12px 16px; text-align: center; width: 120px; font-size: 12px; font-weight: 700; color: #475569;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sd.teamMembers.map((m, idx) => {
                            const isChairman = (m.role === 'Chairman' || idx === 0);
                            return `
                                <tr style="background: ${isChairman ? '#f0fdf4' : (idx % 2 === 0 ? 'white' : '#fcfdfd')}; border-bottom: 1px solid #f1f5f9;">
                                    <td style="padding: 12px 16px; text-align: center; font-weight: 800; color: #64748b; font-size: 13px;">${idx + 1}</td>
                                    <td style="padding: 12px 16px; font-weight: 700; color: #1e293b; font-size: 13.5px;">
                                        ${isChairman ? '👑 ' : '👨‍🏫 '}${m.name}
                                    </td>
                                    <td style="padding: 12px 16px; font-size: 13px; color: #334155; font-weight: 600;">
                                        ${m.designation || m.domain || 'Faculty Member'}
                                    </td>
                                    <td style="padding: 12px 16px; text-align: center;">
                                        <span style="background: ${isChairman ? '#0F3D26' : '#e0f2fe'}; color: ${isChairman ? '#D4AF37' : '#0369a1'}; font-size: 12px; font-weight: 800; padding: 3px 12px; border-radius: 12px; border: 1px solid ${isChairman ? '#D4AF37' : '#bae6fd'};">
                                            ${m.role || (isChairman ? 'Chairman' : 'Member')}
                                        </span>
                                    </td>
                                    <td style="padding: 12px 16px; text-align: center;">
                                        <button class="btn-cal-ctrl" style="background: #0284c7; padding: 2px 7px; font-size: 11px; color: white;" onclick="editSkillMember(${idx})">Edit</button>
                                        <button class="btn-cal-ctrl" style="background: #ef4444; padding: 2px 7px; font-size: 11px; color: white;" onclick="deleteSkillMember(${idx})">✕</button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// --- STREAM FILTER & SEARCH HANDLERS ---
window.setPlacementStreamFilter = function (stream) {
    currentPlacementStreamFilter = stream;
    renderSkillDevView();
};

window.searchPlacementCompanies = function (query) {
    currentPlacementSearchQuery = query;
    renderSkillDevView();
};

// --- ADD / EDIT / DELETE YEARWISE PLACEMENT SUMMARY ---
window.openAddYearwisePlacementModal = function () {
    openGenericEditModal('Add Academic Year Placement Summary', [
        { id: 'year', label: 'Academic Year (e.g. 2026-27)', value: '' },
        { id: 'btech', label: 'B.Tech Placements Count', type: 'number', value: '0' },
        { id: 'mba', label: 'MBA Placements Count', type: 'number', value: '0' }
    ], (formData) => {
        const b = parseInt(formData.btech) || 0;
        const m = parseInt(formData.mba) || 0;
        const total = b + m;

        state.skillDevelopment.placementSummary.unshift({
            year: formData.year || '2026-27',
            btech: b,
            mba: m,
            total: total
        });
        saveState();
        renderSkillDevView();
        alert('✓ Academic Year placement record added successfully!');
    });
};

window.editYearwisePlacement = function (idx) {
    const row = state.skillDevelopment.placementSummary[idx];
    openGenericEditModal(`Edit Placement Summary: ${row.year}`, [
        { id: 'year', label: 'Academic Year', value: row.year },
        { id: 'btech', label: 'B.Tech Count', type: 'number', value: row.btech },
        { id: 'mba', label: 'MBA Count', type: 'number', value: row.mba }
    ], (formData) => {
        row.year = formData.year;
        row.btech = parseInt(formData.btech) || 0;
        row.mba = parseInt(formData.mba) || 0;
        row.total = row.btech + row.mba;

        saveState();
        renderSkillDevView();
        alert('✓ Placement record updated!');
    });
};

window.deleteYearwisePlacement = function (idx) {
    if (confirm('Delete this yearwise placement record?')) {
        state.skillDevelopment.placementSummary.splice(idx, 1);
        saveState();
        renderSkillDevView();
    }
};

// --- ADD / EDIT / DELETE COMPANY PLACEMENT DETAILS ---
window.openAddPlacementRecordModal = function () {
    openGenericEditModal('Add Company Campus Placement Record', [
        { id: 'company', label: 'Company Name', value: '' },
        { id: 'stream', label: 'Eligible Streams (e.g. B.TECH, MBA, MCA)', value: 'B.TECH' },
        { id: 'count', label: 'No. of Students Placed', type: 'number', value: '10' },
        { id: 'year', label: 'Drive Year', value: '2025-26' }
    ], (formData) => {
        const nextId = (state.skillDevelopment.placementDetails.length > 0)
            ? Math.max(...state.skillDevelopment.placementDetails.map(d => d.id || 0)) + 1
            : 1;

        state.skillDevelopment.placementDetails.unshift({
            id: nextId,
            company: formData.company,
            stream: formData.stream,
            count: parseInt(formData.count) || 0,
            year: formData.year || '2025-26'
        });
        saveState();
        renderSkillDevView();
        alert('✓ New placement drive record added!');
    });
};

window.editPlacementRecord = function (idOrIdx) {
    let item = state.skillDevelopment.placementDetails.find(d => d.id === idOrIdx);
    if (!item && typeof idOrIdx === 'number') {
        item = state.skillDevelopment.placementDetails[idOrIdx];
    }
    if (!item) return;

    openGenericEditModal(`Edit Placement Drive: ${item.company}`, [
        { id: 'company', label: 'Company Name', value: item.company },
        { id: 'stream', label: 'Streams Eligible', value: item.stream },
        { id: 'count', label: 'Students Placed', type: 'number', value: item.count },
        { id: 'year', label: 'Academic Year', value: item.year || '2025-26' }
    ], (formData) => {
        item.company = formData.company;
        item.stream = formData.stream;
        item.count = parseInt(formData.count) || 0;
        item.year = formData.year;

        saveState();
        renderSkillDevView();
        alert('✓ Placement drive record updated!');
    });
};

window.deletePlacementRecord = function (idOrIdx) {
    if (confirm('Delete this company placement record?')) {
        const idx = state.skillDevelopment.placementDetails.findIndex(d => d.id === idOrIdx || d === idOrIdx);
        if (idx !== -1) {
            state.skillDevelopment.placementDetails.splice(idx, 1);
        } else if (typeof idOrIdx === 'number' && idOrIdx < state.skillDevelopment.placementDetails.length) {
            state.skillDevelopment.placementDetails.splice(idOrIdx, 1);
        }
        saveState();
        renderSkillDevView();
    }
};

// --- CSV EXPORT UTILITY ---
window.exportPlacementDataCSV = function (type) {
    let csvContent = "data:text/csv;charset=utf-8,";
    let filename = "alits_placements.csv";

    if (type === 'summary') {
        filename = "alits_placement_summary_yearwise.csv";
        csvContent += "ACADEMIC YEAR,B.TECH,MBA,TOTAL PLACED\n";
        (state.skillDevelopment.placementSummary || []).forEach(row => {
            csvContent += `"${row.year}",${row.btech},${row.mba},${row.total}\n`;
        });
    } else {
        filename = "alits_placement_details_2025_26.csv";
        csvContent += "S.NO,COMPANY NAME,STREAM,STUDENTS PLACED,ACADEMIC YEAR\n";
        (state.skillDevelopment.placementDetails || []).forEach((item, idx) => {
            csvContent += `${idx + 1},"${item.company}","${item.stream}",${item.count},"${item.year || '2025-26'}"\n`;
        });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.editSkillDirector = function () {
    const dir = state.skillDevelopment.director;
    openGenericEditModal('Edit Skill Development Director', [
        { id: 'name', label: 'Director Name', value: dir.name },
        { id: 'designation', label: 'Designation', value: dir.designation },
        { id: 'qualification', label: 'Qualifications', value: dir.qualification },
        { id: 'bio', label: 'Bio', type: 'textarea', value: dir.bio }
    ], (formData) => {
        Object.assign(dir, formData);
        saveState();
        renderSkillDevView();
    });
};

window.editSkillMember = function (idx) {
    const m = state.skillDevelopment.teamMembers[idx];
    openGenericEditModal(`Edit Faculty Committee Member: ${m.name}`, [
        { id: 'name', label: 'Name Of The Faculty', value: m.name },
        { id: 'designation', label: 'Designation', value: m.designation || '' },
        { id: 'role', label: 'Role (Chairman / Member)', value: m.role || 'Member' }
    ], (formData) => {
        Object.assign(m, formData);
        saveState();
        renderSkillDevView();
    });
};

window.deleteSkillMember = function (idx) {
    if (confirm('Remove this committee member?')) {
        state.skillDevelopment.teamMembers.splice(idx, 1);
        saveState();
        renderSkillDevView();
    }
};

window.openAddSkillMemberModal = function () {
    openGenericEditModal('Add Skill Development Committee Member', [
        { id: 'name', label: 'Name Of The Faculty', value: '' },
        { id: 'designation', label: 'Designation (e.g. Assistant Professor - CSE)', value: 'Assistant Professor' },
        { id: 'role', label: 'Role (Chairman / Member)', value: 'Member' }
    ], (formData) => {
        state.skillDevelopment.teamMembers.push({
            id: state.skillDevelopment.teamMembers.length + 1,
            name: formData.name,
            designation: formData.designation,
            role: formData.role
        });
        saveState();
        renderSkillDevView();
    });
};

function renderRouteTransportView() {
    const stopsBody = document.getElementById('stopsTableBody');
    const assignedBody = document.getElementById('assignedStudentsTableBody');
    const studentSelect = document.getElementById('transportStudentSelect');
    const stopSelect = document.getElementById('transportStopSelect');

    if (!stopsBody || !state.routes) return;

    const mainRoute = state.routes[0];

    stopsBody.innerHTML = mainRoute.stops.map((s, idx) => `
        <tr>
            <td style="font-weight: 600; color: #333;">${s.name}</td>
            <td style="font-size: 11px; color: #777;">${s.lat}, ${s.long}</td>
            <td>
                <button class="btn-cal-ctrl" style="background: #0088cc;" onclick="editRouteStop(${idx})">Edit</button>
                <button class="btn-cal-ctrl" style="background: #dd4b39;" onclick="deleteRouteStop(${idx})">Delete</button>
            </td>
        </tr>
    `).join('');

    assignedBody.innerHTML = mainRoute.assignedStudents.map((st, idx) => `
        <tr>
            <td><strong style="color: #0088cc;">${st.admissionNo}</strong></td>
            <td style="font-weight: 600;">${st.name}</td>
            <td><span class="badge-status paid">${st.stop}</span></td>
            <td>
                <button class="btn-cal-ctrl" style="background: #f39c12;" onclick="unassignTransportStudent(${idx})">Unassign</button>
            </td>
        </tr>
    `).join('');

    if (studentSelect) {
        studentSelect.innerHTML = state.students.map(s => `
            <option value="${s.rollNo}">${s.rollNo} - ${s.name}</option>
        `).join('');
    }

    if (stopSelect) {
        stopSelect.innerHTML = mainRoute.stops.map(s => `
            <option value="${s.name}">${s.name}</option>
        `).join('');
    }
}

window.addNewRouteStop = function () {
    const nameInput = document.getElementById('newStopNameInput');
    const latInput = document.getElementById('newStopLatInput');
    const longInput = document.getElementById('newStopLongInput');

    if (!nameInput.value.trim()) {
        alert('Please enter a valid stop name!');
        return;
    }

    state.routes[0].stops.push({
        id: `stop-${Date.now()}`,
        name: nameInput.value.trim(),
        lat: latInput.value.trim() || '14.6819',
        long: longInput.value.trim() || '77.6006'
    });

    nameInput.value = '';
    latInput.value = '';
    longInput.value = '';

    saveState();
    renderRouteTransportView();
    alert('✓ Route stop added!');
};

window.editRouteStop = function (idx) {
    const s = state.routes[0].stops[idx];
    openGenericEditModal(`Edit Route Stop: ${s.name}`, [
        { id: 'name', label: 'Stop Name', value: s.name },
        { id: 'lat', label: 'Latitude', value: s.lat },
        { id: 'long', label: 'Longitude', value: s.long }
    ], (formData) => {
        Object.assign(s, formData);
        saveState();
        renderRouteTransportView();
    });
};

window.deleteRouteStop = function (idx) {
    if (confirm('Delete this bus stop?')) {
        state.routes[0].stops.splice(idx, 1);
        saveState();
        renderRouteTransportView();
    }
};

window.assignStudentToTransportStop = function () {
    const rollNo = document.getElementById('transportStudentSelect').value;
    const stopName = document.getElementById('transportStopSelect').value;
    const student = state.students.find(s => s.rollNo === rollNo);

    if (!student) return;

    const mainRoute = state.routes[0];
    const existing = mainRoute.assignedStudents.find(a => a.admissionNo === rollNo);
    if (existing) {
        existing.stop = stopName;
    } else {
        mainRoute.assignedStudents.push({
            admissionNo: student.rollNo,
            name: student.name,
            stop: stopName
        });
    }

    saveState();
    renderRouteTransportView();
    alert(`✓ ${student.name} assigned to stop: ${stopName}`);
};

window.unassignTransportStudent = function (idx) {
    state.routes[0].assignedStudents.splice(idx, 1);
    saveState();
    renderRouteTransportView();
};

/* FACULTY & HUMAN RESOURCES RENDERER */
function renderHrView() {
    const chipsContainer = document.getElementById('facultySummaryChips');
    const hrTable = document.getElementById('hrDeptTableBody');

    if (chipsContainer && state.departments) {
        chipsContainer.innerHTML = state.departments.map(d => `
            <div style="background: #f8fafc; border: 1px solid #3c8dbc; padding: 10px; border-radius: 4px; text-align: center;">
                <div style="font-size: 11px; font-weight: 800; color: #3c8dbc;">${d.id} (${d.code})</div>
                <div style="font-size: 22px; font-weight: 900; color: #222; margin: 2px 0;">${d.facultyCount || 0}</div>
                <div style="font-size: 10px; color: #666;">Professors</div>
            </div>
        `).join('');
    }

    if (hrTable && state.departments) {
        hrTable.innerHTML = state.departments.map(d => `
            <tr>
                <td><strong>${d.name} (${d.id})</strong></td>
                <td><span class="code-badge-top">${d.code}</span></td>
                <td style="color: #0088cc; font-weight: 600;">${d.hod}</td>
                <td><strong style="color: #00a65a; font-size: 14px;">${d.facultyCount || 0} Professors</strong></td>
                <td><span class="badge-status paid">Active Dept</span></td>
                <td>
                    <button class="btn-cal-ctrl compact" style="background: #0088cc;" onclick="editDepartmentHod('${d.id}')">Edit Faculty & HOD</button>
                </td>
            </tr>
        `).join('');
    }

    renderFacultyMembersTable();
}

window.renderFacultyMembersTable = function () {
    const tbody = document.getElementById('facultyDetailedTableBody');
    if (!tbody || !state.faculty) return;

    const query = (document.getElementById('facultySearchInput')?.value || '').toLowerCase().trim();
    const deptFilter = document.getElementById('facultyDeptFilter')?.value || 'ALL';
    const desigFilter = document.getElementById('facultyDesignationFilter')?.value || 'ALL';
    const badge = document.getElementById('facultyCountBadge');

    let filtered = state.faculty.filter(f => {
        const matchesQuery = !query ||
            (f.name && f.name.toLowerCase().includes(query)) ||
            (f.id && f.id.toLowerCase().includes(query)) ||
            (f.dept && f.dept.toLowerCase().includes(query)) ||
            (f.qualification && f.qualification.toLowerCase().includes(query)) ||
            (f.specialization && f.specialization.toLowerCase().includes(query)) ||
            (f.coursesHandled && f.coursesHandled.some(c => c.toLowerCase().includes(query)));

        const matchesDept = (deptFilter === 'ALL') || (f.dept === deptFilter);
        let matchesDesig = true;
        if (desigFilter !== 'ALL') {
            const desigLower = (f.designation || '').toLowerCase();
            if (desigFilter === 'HOD') matchesDesig = desigLower.includes('head');
            else if (desigFilter === 'Professor') matchesDesig = desigLower.includes('professor') && !desigLower.includes('associate') && !desigLower.includes('assistant');
            else if (desigFilter === 'Associate') matchesDesig = desigLower.includes('associate');
            else if (desigFilter === 'Assistant') matchesDesig = desigLower.includes('assistant');
        }

        return matchesQuery && matchesDept && matchesDesig;
    });

    if (badge) {
        badge.innerText = `Showing ${filtered.length} of ${state.faculty.length} Faculty`;
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: #777; padding: 20px;">No faculty members found matching current filters.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(f => {
        const isHod = (f.designation || '').toLowerCase().includes('head');
        return `
            <tr style="height: 38px;">
                <td style="padding: 5px 8px;"><strong style="font-family: var(--font-mono); color: #0088cc; font-size: 11.5px;">${f.id}</strong></td>
                <td style="padding: 5px 8px;">
                    <div style="font-weight: 700; color: #1e293b; font-size: 12px;">${f.name}</div>
                    <div style="font-size: 10px; color: #64748b;">${f.cabin || 'Cabin N/A'} | Papers: ${f.papers || 0}</div>
                </td>
                <td style="padding: 5px 8px;">
                    <span class="code-badge-top" style="font-size: 10px; padding: 1px 5px;">${f.dept}</span>
                </td>
                <td style="padding: 5px 8px;">
                    ${isHod ? `<span class="badge-status" style="background: #e11d48; color: white; font-size: 9.5px; padding: 2px 6px;">👑 ${f.designation}</span>` : `<span style="font-size: 11px; font-weight: 600; color: #334155;">${f.designation}</span>`}
                </td>
                <td style="padding: 5px 8px;">
                    <div style="font-size: 11px; color: #1e293b;">${f.qualification}</div>
                    <div style="font-size: 9.5px; color: #00a65a; font-weight: 600;">Exp: ${f.experience}</div>
                </td>
                <td style="padding: 5px 8px;">
                    <div style="font-size: 10.5px; color: #475569; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${(f.coursesHandled || []).join(', ')}">
                        ${(f.coursesHandled || []).slice(0, 2).join(', ')}
                    </div>
                </td>
                <td style="padding: 5px 8px;">
                    <div style="font-size: 10.5px; color: #0088cc;">✉️ ${f.email}</div>
                    <div style="font-size: 9.5px; color: #64748b;">📱 ${f.mobile}</div>
                </td>
                <td style="padding: 5px 8px; text-align: center;">
                    <span class="badge-status paid" style="font-size: 9.5px; padding: 1px 5px;">${f.status ? f.status.split('/')[0].trim() : 'Active'}</span>
                </td>
                <td style="padding: 5px 8px; text-align: center;">
                    <button class="btn-cal-ctrl compact" style="background: #0088cc;" onclick="editFacultyMemberProfile('${f.id}')">✏️ Edit</button>
                </td>
            </tr>
        `;
    }).join('');
};

window.resetFacultyFilters = function () {
    const s = document.getElementById('facultySearchInput');
    const d = document.getElementById('facultyDeptFilter');
    const des = document.getElementById('facultyDesignationFilter');
    if (s) s.value = '';
    if (d) d.value = 'ALL';
    if (des) des.value = 'ALL';
    renderFacultyMembersTable();
};

window.editFacultyMemberProfile = function (facultyId) {
    const faculty = state.faculty.find(f => f.id === facultyId);
    if (!faculty) return;

    openGenericEditModal(`Edit Faculty: ${faculty.name} (${faculty.id})`, [
        { id: 'name', label: 'Faculty Full Name', value: faculty.name },
        { id: 'designation', label: 'Designation', value: faculty.designation },
        { id: 'dept', label: 'Department', value: faculty.dept },
        { id: 'qualification', label: 'Qualification', value: faculty.qualification },
        { id: 'experience', label: 'Experience', value: faculty.experience },
        { id: 'specialization', label: 'Specialization', value: faculty.specialization },
        { id: 'email', label: 'Email', value: faculty.email },
        { id: 'mobile', label: 'Mobile Number', value: faculty.mobile },
        { id: 'cabin', label: 'Cabin / Office Room', value: faculty.cabin },
        { id: 'status', label: 'Status', value: faculty.status }
    ], (formData) => {
        const target = state.faculty.find(f => f.id === facultyId) || faculty;
        Object.assign(target, formData);
        saveState({
            module: 'Faculty',
            action: 'Edit Faculty',
            summary: `Updated profile for ${target.name} (${target.id})`
        });
        renderHrView();
    });
};

window.openAddFacultyModal = function () {
    openGenericEditModal('Add Faculty Member', [
        { id: 'deptId', label: 'Department ID (CSE/AIML/ECE/EEE/CIVIL/MECH/DIPLOMA/HS/MBA/MCA)', value: 'CSE' },
        { id: 'name', label: 'Faculty Full Name', value: 'Dr. New Professor' },
        { id: 'designation', label: 'Designation (Professor / Assoc. Prof)', value: 'Assistant Professor' }
    ], (formData) => {
        const dept = state.departments.find(d => d.id === formData.deptId);
        if (dept) {
            dept.facultyCount = (dept.facultyCount || 0) + 1;
            state.college.totalFaculty = state.departments.reduce((sum, d) => sum + (d.facultyCount || 0), 0);
            saveState({
                module: 'Faculty',
                action: 'Add Faculty',
                summary: `Added faculty member to ${dept.name}`
            });
            renderAllViews();
            alert(`✓ Added faculty member to ${dept.name}! New Total Faculty: ${state.college.totalFaculty}`);
        }
    });
};

/* Generic Edit Dialog Handler (Clean & Compact Responsive Grid) */
function openGenericEditModal(title, fields, onSubmit) {
    const modal = document.getElementById('genericEditModal');
    const titleEl = document.getElementById('genericModalTitle');
    const bodyEl = document.getElementById('genericModalBody');
    const boxEl = modal?.querySelector('.modal-auth-box');

    window.isUserEditingModal = true;
    if (titleEl) titleEl.innerText = title;

    const isLargeForm = fields.length >= 7;
    const isMediumForm = fields.length >= 4 && fields.length < 7;

    if (boxEl) {
        boxEl.style.maxWidth = isLargeForm ? '660px' : (isMediumForm ? '520px' : '440px');
        boxEl.style.maxHeight = '84vh';
        boxEl.style.overflowY = 'auto';
        boxEl.style.borderRadius = '8px';
        boxEl.style.margin = '20px auto';
        boxEl.style.padding = '16px 20px';
    }

    const gridCols = isLargeForm ? 'grid-template-columns: repeat(3, 1fr); gap: 6px 10px;' : (isMediumForm ? 'grid-template-columns: 1fr 1fr; gap: 6px 12px;' : 'flex; flex-direction: column; gap: 8px;');
    let fieldsHtml = `<div style="display: ${isLargeForm || isMediumForm ? 'grid;' : 'flex;'} ${gridCols}">`;

    const selectOptionsMap = {
        'dept': ['CSE', 'AIML', 'ECE', 'EEE', 'CIVIL', 'MECH', 'HS', 'MBA', 'MCA', 'DIPLOMA'],
        'year': ['1st Year', '2nd Year', '3rd Year', '4th Year'],
        'section': ['A', 'B', 'C', 'D'],
        'quota': ['Convenor Quota', 'Management Quota'],
        'residenceType': ['Day Scholar', 'Hosteler'],
        'status': ['Active / On Campus', 'Active / In Lab', 'Active / In Session', 'On Leave', 'Active']
    };

    fieldsHtml += fields.map(f => {
        const isFullWidth = f.type === 'textarea' || f.id === 'address' || (isLargeForm && (f.id === 'name' || f.id === 'message' || f.id === 'profile'));
        const colStyle = (isLargeForm || isMediumForm) && isFullWidth ? 'grid-column: 1 / -1;' : '';
        const selectOptions = selectOptionsMap[f.id];

        if (f.type === 'textarea') {
            return `
                <div class="form-group-erp" style="${colStyle} margin-bottom: 2px;">
                    <label style="font-size: 10.5px; font-weight: 700; color: #475569; margin-bottom: 2px; display: block;">${f.label}</label>
                    <textarea class="form-control-erp" id="edit_${f.id}" rows="2" style="padding: 4px 8px; font-size: 11.5px; border-radius: 4px;">${f.value || ''}</textarea>
                </div>
            `;
        }

        if (selectOptions && !f.type) {
            return `
                <div class="form-group-erp" style="${colStyle} margin-bottom: 2px;">
                    <label style="font-size: 10.5px; font-weight: 700; color: #475569; margin-bottom: 2px; display: block;">${f.label}</label>
                    <select class="form-control-erp" id="edit_${f.id}" style="padding: 3px 8px; font-size: 11.5px; height: 28px; border-radius: 4px;">
                        ${selectOptions.map(opt => `<option value="${opt}" ${f.value === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                </div>
            `;
        }

        return `
            <div class="form-group-erp" style="${colStyle} margin-bottom: 2px;">
                <label style="font-size: 10.5px; font-weight: 700; color: #475569; margin-bottom: 2px; display: block;">${f.label}</label>
                <input type="text" class="form-control-erp" id="edit_${f.id}" value="${f.value || ''}" style="padding: 3px 8px; font-size: 11.5px; height: 28px; border-radius: 4px;" />
            </div>
        `;
    }).join('');

    fieldsHtml += `
        <div style="display: flex; gap: 8px; margin-top: 12px; ${(isLargeForm || isMediumForm) ? 'grid-column: 1 / -1;' : ''}">
            <button class="btn-primary-erp" id="genericSubmitBtn" style="flex: 1; padding: 6px 14px; font-size: 12px; font-weight: 700; height: 32px;">
                💾 Save & Auto-Update
            </button>
            <button type="button" class="btn-primary-erp" onclick="closeGenericEditModal()" style="background: #64748b; width: auto; padding: 6px 14px; font-size: 12px; height: 32px;">
                Cancel
            </button>
        </div>
    </div>`;

    if (bodyEl) bodyEl.innerHTML = fieldsHtml;

    const submitBtn = document.getElementById('genericSubmitBtn');
    if (submitBtn) {
        submitBtn.onclick = () => {
            const formData = {};
            fields.forEach(f => {
                const el = document.getElementById(`edit_${f.id}`);
                if (el) formData[f.id] = el.value.trim();
            });
            const res = onSubmit(formData);
            if (res === false) {
                return; // Validation failed, retain modal and user inputs
            }
            window.isUserEditingModal = false;
            window.pendingBackendState = null;
            closeGenericEditModal();
        };
    }

    if (modal) modal.classList.add('active');
}

window.closeGenericEditModal = function () {
    window.isUserEditingModal = false;
    const modal = document.getElementById('genericEditModal');
    if (modal) modal.classList.remove('active');

    if (window.pendingBackendState) {
        const pending = window.pendingBackendState;
        window.pendingBackendState = null;
        state = pending;
        try { localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(state)); } catch (e) { }
        if (typeof renderAllViews === 'function') renderAllViews();
    }
};

window.openGenericModal = function (title, htmlContent) {
    const modal = document.getElementById('genericEditModal');
    const titleEl = document.getElementById('genericModalTitle');
    const bodyEl = document.getElementById('genericModalBody');

    if (modal && titleEl && bodyEl) {
        titleEl.innerText = title;
        bodyEl.innerHTML = htmlContent + `<button class="btn-primary-erp" onclick="closeGenericEditModal()" style="margin-top: 15px; background: #64748b;">Close Profile</button>`;
        modal.classList.add('active');
    }
};

/* ==========================================================================
   AUTONOMOUS EXAMINATION CENTER & MARKS MANAGEMENT MODULE
   ========================================================================== */
function renderExamsView() {
    const staffGrid = document.getElementById('examStaffGrid');
    const marksTbody = document.getElementById('examMarksTbody');
    const examCenter = state.examinationCenter || (typeof ALITS_DATA !== 'undefined' ? ALITS_DATA.examinationCenter : null);

    // Render 15 Exam Staff Roster
    if (staffGrid && examCenter && examCenter.staffList) {
        staffGrid.innerHTML = examCenter.staffList.map(s => `
            <div style="background: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #1e3c72; color: #fff; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 14px;">
                    ${s.id}
                </div>
                <div>
                    <div style="font-weight: 700; font-size: 13px; color: #111;">${s.name}</div>
                    <div style="font-size: 11px; color: #0088cc; font-weight: 700;">${s.role}</div>
                    <div style="font-size: 10px; color: #666;">Dept: ${s.dept} • Exam Section Member</div>
                </div>
            </div>
        `).join('');
    }

    // Render Student Marks Roster
    if (marksTbody && state.students) {
        const deptVal = document.getElementById('examDeptFilter')?.value || 'ALL';
        const yearVal = document.getElementById('examYearFilter')?.value || 'ALL';
        const searchVal = (document.getElementById('examSearchInput')?.value || '').toLowerCase().trim();

        const filtered = state.students.filter(s => {
            const matchDept = deptVal === 'ALL' || s.dept === deptVal;
            const matchYear = yearVal === 'ALL' || s.year === yearVal;
            const matchSearch = !searchVal || s.name.toLowerCase().includes(searchVal) || s.rollNo.toLowerCase().includes(searchVal);
            return matchDept && matchYear && matchSearch;
        });

        if (filtered.length === 0) {
            marksTbody.innerHTML = `<tr><td colspan="12" class="text-center" style="padding: 20px; color: #888;">No student examination records match selected filters.</td></tr>`;
            return;
        }

        marksTbody.innerHTML = filtered.map(s => {
            const marks = s.examMarks || { mid1: 24, mid2: 25, semEnd: 58, totalMarks: 83, grade: "A+", sgpa: "8.40", cgpa: "8.35" };
            const totalCalc = marks.totalMarks || (Math.round((marks.mid1 + marks.mid2) / 2) + marks.semEnd);
            return `
                <tr>
                    <td style="font-family: var(--font-mono); font-weight: 700; color: #0088cc;">${s.rollNo}</td>
                    <td><strong>${s.name}</strong></td>
                    <td>${s.dept} (${s.year})</td>
                    <td><span class="badge-status" style="background: #e8f4fb; color: #0088cc;">Sec ${s.section}</span></td>
                    <td style="font-weight: 700; color: #333;">${marks.mid1} / 30</td>
                    <td style="font-weight: 700; color: #333;">${marks.mid2} / 30</td>
                    <td style="font-weight: 700; color: #0088cc;">${marks.semEnd} / 70</td>
                    <td style="font-weight: 800; color: #00a65a;">${totalCalc}</td>
                    <td><span class="badge-status paid" style="font-weight: 800;">${marks.grade || 'A+'}</span></td>
                    <td style="font-weight: 700; color: #e040fb;">${marks.sgpa || '8.50'}</td>
                    <td style="font-weight: 700; color: #f39c12;">${marks.cgpa || '8.45'}</td>
                    <td>
                        <div style="display: flex; gap: 4px;">
                            <button class="btn-cal-ctrl" style="background: #00bcd4; padding: 3px 8px; font-size: 11px;" onclick="editStudentExamMarks('${s.id}')">✏️ Edit</button>
                            <button class="btn-cal-ctrl" style="background: #00a65a; padding: 3px 8px; font-size: 11px;" onclick="printStudentGradeCard('${s.id}')">📜 Grade Card</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

window.toggleExamStaffList = function () {
    const container = document.getElementById('examStaffListContainer');
    if (container) {
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
    }
};

window.editStudentExamMarks = function (studentId) {
    const student = state.students.find(s => s.id === studentId);
    if (!student) return;

    if (!student.examMarks) {
        student.examMarks = { mid1: 25, mid2: 26, semEnd: 60, totalMarks: 85, grade: "A+", sgpa: "8.50", cgpa: "8.45" };
    }

    openGenericEditModal(
        `✏️ Edit Exam Marks - ${student.name} (${student.rollNo})`,
        [
            { id: 'mid1', label: '1st Mid Exam Marks (Max 30)', value: student.examMarks.mid1 },
            { id: 'mid2', label: '2nd Mid Exam Marks (Max 30)', value: student.examMarks.mid2 },
            { id: 'semEnd', label: 'End Semester Exam Marks (Max 70)', value: student.examMarks.semEnd },
            { id: 'grade', label: 'Grade Awarded (e.g. O, A+, A, B+)', value: student.examMarks.grade },
            { id: 'sgpa', label: 'Semester Grade Point Average (SGPA)', value: student.examMarks.sgpa },
            { id: 'cgpa', label: 'Cumulative Grade Point Average (CGPA)', value: student.examMarks.cgpa }
        ],
        (formData) => {
            const target = state.students.find(s => s.id === studentId) || student;
            if (!target.examMarks) target.examMarks = {};
            target.examMarks.mid1 = Number(formData.mid1) || 0;
            target.examMarks.mid2 = Number(formData.mid2) || 0;
            target.examMarks.semEnd = Number(formData.semEnd) || 0;
            target.examMarks.totalMarks = Math.round((target.examMarks.mid1 + target.examMarks.mid2) / 2) + target.examMarks.semEnd;
            target.examMarks.grade = formData.grade || 'A+';
            target.examMarks.sgpa = formData.sgpa || '8.50';
            target.examMarks.cgpa = formData.cgpa || '8.45';

            saveState({
                module: 'Examinations',
                action: 'Edit Marks',
                summary: `Updated marks for ${target.name} (${target.rollNo})`
            });
            renderExamsView();
            alert(`✓ Successfully updated examination marks & grades for ${target.name}`);
        }
    );
};

window.printStudentGradeCard = function (studentId) {
    window._currentActiveGradeCardStudentId = studentId;
    const student = state.students?.find(s => s.id === studentId);
    if (!student) return;

    const area = document.getElementById('printableGradeCardArea');
    const modal = document.getElementById('gradeCardPrintModal');
    const marks = student.examMarks || { mid1: 26, mid2: 28, semEnd: 62, totalMarks: 89, grade: "O", sgpa: "9.00", cgpa: "8.90" };

    const subjects = marks.subjects || [
        { code: "24CS501", name: "Full Stack Web Development", mid1: marks.mid1, mid2: marks.mid2, semEnd: marks.semEnd, total: marks.totalMarks, grade: "O" },
        { code: "24CS502", name: "Artificial Intelligence & ML", mid1: Math.max(18, marks.mid1 - 2), mid2: marks.mid2, semEnd: Math.max(45, marks.semEnd - 3), total: marks.totalMarks - 4, grade: "A+" },
        { code: "24CS503", name: "Database Management Systems", mid1: Math.min(30, marks.mid1 + 1), mid2: Math.min(30, marks.mid2 + 1), semEnd: Math.min(70, marks.semEnd + 3), total: marks.totalMarks + 4, grade: "O" },
        { code: "24CS504", name: "Design & Analysis of Algorithms", mid1: Math.max(18, marks.mid1 - 3), mid2: Math.max(18, marks.mid2 - 2), semEnd: Math.max(40, marks.semEnd - 5), total: marks.totalMarks - 7, grade: "A" },
        { code: "24CS505", name: "Computer Networks & Security", mid1: marks.mid1, mid2: marks.mid2, semEnd: marks.semEnd, total: marks.totalMarks, grade: "O" }
    ];

    area.innerHTML = `
        <div style="border: 6px double #111e25; padding: 30px; background: #fff; font-family: 'Source Sans Pro', sans-serif;">
            <div style="text-align: center; border-bottom: 2px solid #111e25; padding-bottom: 14px; margin-bottom: 16px;">
                <div style="font-size: 11px; color: #555; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Anantha Lakshmi Educational Society</div>
                <div style="font-family: var(--font-cert); font-size: 20px; font-weight: 900; color: #003366; text-transform: uppercase; margin: 4px 0;">
                    Anantha Lakshmi Institute of Technology and Sciences
                </div>
                <div style="font-size: 11px; color: #444; font-weight: 600;">
                    AUTONOMOUS INSTITUTION • CODE: 2G • Near Itikalapalli, Ananthapur - Chennai Highway, Anantapur (A.P)<br/>
                    Approved by AICTE, Accredited by NBA & NAAC, Affiliated to JNTUA Anantapur
                </div>
                <div style="margin-top: 10px; background: #003366; color: #ffd700; padding: 4px 20px; border-radius: 12px; font-weight: 900; font-size: 13px; display: inline-block; letter-spacing: 1px;">
                    OFFICIAL AUTONOMOUS SEMESTER GRADE CARD
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; font-size: 12px; margin-bottom: 20px;">
                <div>
                    <div><strong>Student Name:</strong> <span style="font-size: 14px; font-weight: 800; color: #111;">${student.name}</span></div>
                    <div><strong>JNTUA Roll Number:</strong> <span style="font-family: var(--font-mono); font-weight: 700; color: #0088cc;">${student.rollNo}</span></div>
                    <div><strong>Father's Name:</strong> ${student.fatherName}</div>
                    <div><strong>Date of Birth:</strong> ${student.dob || '15 June 2004'}</div>
                </div>
                <div style="text-align: right;">
                    <div><strong>Branch / Department:</strong> ${student.dept}</div>
                    <div><strong>Academic Year & Sec:</strong> ${student.year} (Section ${student.section})</div>
                    <div><strong>Academic Batch:</strong> ${student.batch || '2024-2028'}</div>
                    <div><strong>Examination Period:</strong> Regular Examinations 2026</div>
                </div>
            </div>

            <table class="table-custom" style="margin-bottom: 20px; font-size: 12px;">
                <thead>
                    <tr style="background: #111e25; color: white;">
                        <th>Sub Code</th>
                        <th>Subject Title</th>
                        <th>Mid-I (30)</th>
                        <th>Mid-II (30)</th>
                        <th>End Sem (70)</th>
                        <th>Total (100)</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    ${subjects.map(sub => `
                        <tr>
                            <td style="font-family: var(--font-mono); font-weight: 700;">${sub.code}</td>
                            <td><strong>${sub.name}</strong></td>
                            <td>${sub.mid1}</td>
                            <td>${sub.mid2}</td>
                            <td style="color: #0088cc; font-weight: 700;">${sub.semEnd}</td>
                            <td style="color: #00a65a; font-weight: 800;">${sub.total}</td>
                            <td><strong style="color: #003366;">${sub.grade}</strong></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div style="display: flex; justify-content: space-between; align-items: center; background: #e8f4fb; padding: 12px; border: 1px solid #bbe3f9; border-radius: 4px; margin-bottom: 30px;">
                <div>
                    <div style="font-size: 12px; color: #003366; font-weight: 700;">Semester Performance Summary:</div>
                    <div style="font-size: 11px; color: #555;">Result: <strong style="color: #00a65a;">PASSED IN FIRST CLASS WITH DISTINCTION</strong></div>
                </div>
                <div style="display: flex; gap: 20px;">
                    <div style="text-align: center;">
                        <div style="font-size: 10px; color: #666; font-weight: 700;">SEMESTER SGPA</div>
                        <div style="font-size: 18px; font-weight: 900; color: #e040fb;">${marks.sgpa || '9.00'}</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 10px; color: #666; font-weight: 700;">CUMULATIVE CGPA</div>
                        <div style="font-size: 18px; font-weight: 900; color: #0088cc;">${marks.cgpa || '8.90'}</div>
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px;">
                <div style="text-align: center; width: 180px;">
                    <div style="font-size: 10px; color: #555; margin-bottom: 4px;">Controller of Examinations</div>
                    <div style="border-top: 1px solid #111; padding-top: 4px; font-weight: 800; font-size: 12px; color: #003366;">
                        Sri G. Pavan Kumar<br/>
                        <span style="font-size: 10px; font-weight: normal; color: #666;">COE, ALITS Autonomous</span>
                    </div>
                </div>

                <div style="text-align: center;">
                    <div style="border: 2px solid #ffd700; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 800; color: #003366; text-transform: uppercase; margin: 0 auto 4px;">
                        EXAM CELL<br/>ALITS 2G
                    </div>
                </div>

                <div style="text-align: center; width: 180px;">
                    <div style="font-size: 10px; color: #555; margin-bottom: 4px;">Chief Controller & Principal</div>
                    <div style="border-top: 1px solid #111; padding-top: 4px; font-weight: 800; font-size: 12px; color: #003366;">
                        Dr. K. Sreenivasulu<br/>
                        <span style="font-size: 10px; font-weight: normal; color: #666;">Principal & Chief Controller</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
};

window.closeGradeCardModal = function () {
    document.getElementById('gradeCardPrintModal').classList.remove('active');
};

window.sendGradeCardViaEmail = function () {
    const student = (window._currentActiveGradeCardStudentId && state.students) ? state.students.find(s => s.id === window._currentActiveGradeCardStudentId) : state.students?.[0];
    const name = student ? student.name : 'Student';
    const rollNo = student ? student.rollNo : '242G1A0501';
    const email = student ? `${student.name.toLowerCase().replace(/\s+/g, '')}@alits.ac.in` : 'student@alits.ac.in';
    const mobile = student ? student.mobile : '+91 98491 11223';
    const marks = student?.examMarks || { sgpa: '9.10', cgpa: '9.05', grade: 'O (Outstanding)' };

    const subject = `ALITS Autonomous Semester Grade Card & Results - ${name} (${rollNo})`;
    const message = `ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES (ALITS)\nAutonomous Examination Cell & Evaluation Directorate\nApproved by AICTE, Accredited by NBA & NAAC, Affiliated to JNTUA\n\n--- OFFICIAL AUTONOMOUS SEMESTER GRADE CARD ---\nStudent Name: ${name}\nRoll / Admission No: ${rollNo}\nDepartment: ${student ? student.dept : 'Engineering'} | Semester: III B.Tech I Sem\nAcademic Year: 2026-2027\n\nSGPA: ${marks.sgpa || '9.10'} | CGPA: ${marks.cgpa || '9.05'}\nFinal Result: PASSED IN FIRST CLASS WITH DISTINCTION\nOverall Grade: ${marks.grade || 'O (Outstanding)'}\n\nOfficial Digital Marks Memo & Result Verification Link:\nhttps://alits.ac.in/verify/results?roll=${rollNo}\n\nChief Controller of Examinations\nALITS Autonomous Cell`;

    openAlitsDispatchDialog({
        title: 'Grade Card Marksheet Email Dispatch',
        subtitle: `Dispatching official semester results for ${name}`,
        docType: 'Official Semester Grade Card',
        recipientName: `${name} (${rollNo})`,
        mobile: mobile,
        email: email,
        subject: subject,
        message: message,
        requiredPermission: 'FACULTY_OR_ADMIN',
        directAction: 'email'
    });
};

window.sendGradeCardViaWhatsApp = function () {
    const student = (window._currentActiveGradeCardStudentId && state.students) ? state.students.find(s => s.id === window._currentActiveGradeCardStudentId) : state.students?.[0];
    const name = student ? student.name : 'Student';
    const rollNo = student ? student.rollNo : '242G1A0501';
    const email = student ? `${student.name.toLowerCase().replace(/\s+/g, '')}@alits.ac.in` : 'student@alits.ac.in';
    const mobile = student ? student.mobile : '+91 98491 11223';
    const marks = student?.examMarks || { sgpa: '9.10', cgpa: '9.05', grade: 'O (Outstanding)' };

    const subject = `ALITS Examination Results - ${name}`;
    const message = `*ANANTHA LAKSHMI INSTITUTE OF TECHNOLOGY & SCIENCES (ALITS)*\n*Autonomous Semester Examination Results*\n\n👤 *Student:* ${name}\n🎓 *Roll Number:* ${rollNo}\n🏛️ *Department:* ${student ? student.dept : 'Engineering'}\n📊 *SGPA:* ${marks.sgpa || '9.10'} | *CGPA:* ${marks.cgpa || '9.05'}\n🏆 *Grade:* ${marks.grade || 'O (Outstanding)'}\n✅ *Status:* PASSED WITH DISTINCTION\n\n🔗 *Download Official Grade Card:* https://alits.ac.in/verify/results?roll=${rollNo}`;

    openAlitsDispatchDialog({
        title: 'Grade Card WhatsApp Dispatch',
        subtitle: `Sending instant WhatsApp marks report for ${name}`,
        docType: 'Official Semester Grade Card',
        recipientName: `${name} (${rollNo})`,
        mobile: mobile,
        email: email,
        subject: subject,
        message: message,
        requiredPermission: 'FACULTY_OR_ADMIN',
        directAction: 'whatsapp'
    });
};

window.sendGradeCardViaSms = window.sendGradeCardViaWhatsApp;

window.lookupStudentResults = function (queryRollNo) {
    const rollNo = (queryRollNo || document.getElementById('resultLookupRollInput')?.value || '').trim().toUpperCase();
    const displayArea = document.getElementById('resultLookupDisplayArea');
    if (!displayArea) return;

    if (!rollNo) {
        alert('Please enter a valid JNTUA Student Roll Number (e.g. 242G1A05D01)');
        return;
    }

    const student = state.students.find(s => s.rollNo.toUpperCase() === rollNo || s.name.toUpperCase().includes(rollNo));
    if (!student) {
        displayArea.style.display = 'block';
        displayArea.innerHTML = `
            <div style="background: #fff; color: #cc0000; padding: 16px; border-radius: 6px; font-weight: 700;">
                ⚠️ No examination results record found for Roll Number "${rollNo}". Please verify Roll Number and try again.
            </div>
        `;
        return;
    }

    const marks = student.examMarks || { mid1: 26, mid2: 28, semEnd: 62, totalMarks: 89, grade: "O", sgpa: "9.00", cgpa: "8.90" };

    displayArea.style.display = 'block';
    displayArea.innerHTML = `
        <div style="background: #ffffff; color: #111; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0088cc; padding-bottom: 12px; margin-bottom: 16px;">
                <div>
                    <h3 style="margin: 0; font-size: 18px; color: #003366;">🎓 OFFICIAL SEMESTER RESULT CARD</h3>
                    <div style="font-size: 12px; color: #666;">ALITS Autonomous Examination Cell • Code: 2G</div>
                </div>
                <div style="text-align: right;">
                    <span class="badge-status paid" style="font-size: 13px; font-weight: 800;">RESULT: PASSED (DISTINCTION)</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px; font-size: 13px; background: #f8fafc; padding: 12px; border-radius: 6px;">
                <div><strong>Student Name:</strong> <span style="color: #0088cc; font-weight: 800;">${student.name}</span></div>
                <div><strong>Roll Number:</strong> <span style="font-family: var(--font-mono); font-weight: 700;">${student.rollNo}</span></div>
                <div><strong>Dept & Year:</strong> ${student.dept} (${student.year})</div>
                <div><strong>Section:</strong> Sec ${student.section}</div>
                <div><strong>Father Name:</strong> ${student.fatherName}</div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 20px; text-align: center;">
                <div style="background: #e8f4fb; padding: 12px; border-radius: 6px; border: 1px solid #bde0fe;">
                    <div style="font-size: 11px; color: #475569; font-weight: 700;">1ST MID MARKS</div>
                    <div style="font-size: 20px; font-weight: 900; color: #0088cc;">${marks.mid1} / 30</div>
                </div>
                <div style="background: #e8f4fb; padding: 12px; border-radius: 6px; border: 1px solid #bde0fe;">
                    <div style="font-size: 11px; color: #475569; font-weight: 700;">2ND MID MARKS</div>
                    <div style="font-size: 20px; font-weight: 900; color: #0088cc;">${marks.mid2} / 30</div>
                </div>
                <div style="background: #e8f8f5; padding: 12px; border-radius: 6px; border: 1px solid #a3e635;">
                    <div style="font-size: 11px; color: #475569; font-weight: 700;">END SEM MARKS</div>
                    <div style="font-size: 20px; font-weight: 900; color: #00a65a;">${marks.semEnd} / 70</div>
                </div>
                <div style="background: #fdf4ff; padding: 12px; border-radius: 6px; border: 1px solid #f0abfc;">
                    <div style="font-size: 11px; color: #475569; font-weight: 700;">SEMESTER SGPA</div>
                    <div style="font-size: 20px; font-weight: 900; color: #e040fb;">${marks.sgpa || '9.00'}</div>
                </div>
                <div style="background: #fff8e7; padding: 12px; border-radius: 6px; border: 1px solid #fde68a;">
                    <div style="font-size: 11px; color: #475569; font-weight: 700;">OVERALL CGPA</div>
                    <div style="font-size: 20px; font-weight: 900; color: #f39c12;">${marks.cgpa || '8.90'}</div>
                </div>
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button class="btn-primary-erp" onclick="printStudentGradeCard('${student.id}')" style="background: #00a65a; width: auto; font-weight: 700;">
                    📜 View & Print Full Official Marksheet
                </button>
                <button class="btn-primary-erp" onclick="sendGradeCardViaEmail()" style="background: #0088cc; width: auto; font-weight: 700;">
                    📧 Email Marksheet PDF
                </button>
                <button class="btn-primary-erp" onclick="sendGradeCardViaSms()" style="background: #7b2cbf; width: auto; font-weight: 700;">
                    📱 SMS Results Alert
                </button>
            </div>
        </div>
    `;
};

/* ==========================================================================
   ALITS ERP 3D ENGINE & INTERACTIVE VISUALIZER SYSTEM
   ========================================================================== */

let erp3dState = {
    scene: null,
    camera: null,
    renderer: null,
    particlesMesh: null,
    linesMesh: null,
    geoGroup: null,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    currentTheme: 'emerald',
    currentModule: 'view-dashboard'
};

window.initERP3DEngine = function () {
    const canvas = document.getElementById('erp3dCanvas');
    if (!canvas) return;

    // Check for Three.js
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, falling back to 2D Canvas 3D simulation.');
        initFallback2DCanvas3D(canvas);
        return;
    }

    try {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 300;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        erp3dState.scene = scene;
        erp3dState.camera = camera;
        erp3dState.renderer = renderer;

        // 1. Particle Plexus Cloud
        const particleCount = 160;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const themeColors = get3DThemeRGB(erp3dState.currentTheme);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 800;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 500;

            colors[i * 3] = themeColors.primary.r;
            colors[i * 3 + 1] = themeColors.primary.g;
            colors[i * 3 + 2] = themeColors.primary.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 4,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(geometry, particleMaterial);
        scene.add(particlesMesh);
        erp3dState.particlesMesh = particlesMesh;

        // 2. Connecting Lines Network
        const lineMaterial = new THREE.LineBasicMaterial({
            color: themeColors.accentHex,
            transparent: true,
            opacity: 0.18
        });
        const lineGeometry = new THREE.BufferGeometry();
        const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(linesMesh);
        erp3dState.linesMesh = linesMesh;

        // 3. Floating 3D Geometric Group
        const geoGroup = new THREE.Group();

        // Icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(35, 1);
        const icoMat = new THREE.MeshBasicMaterial({ color: themeColors.primaryHex, wireframe: true, transparent: true, opacity: 0.25 });
        const icoMesh = new THREE.Mesh(icoGeo, icoMat);
        icoMesh.position.set(-220, 120, -50);
        geoGroup.add(icoMesh);

        // Octahedron
        const octGeo = new THREE.OctahedronGeometry(25, 0);
        const octMat = new THREE.MeshBasicMaterial({ color: themeColors.accentHex, wireframe: true, transparent: true, opacity: 0.3 });
        const octMesh = new THREE.Mesh(octGeo, octMat);
        octMesh.position.set(240, -100, -20);
        geoGroup.add(octMesh);

        // TorusKnot
        const torusGeo = new THREE.TorusKnotGeometry(20, 4, 64, 8);
        const torusMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, transparent: true, opacity: 0.2 });
        const torusMesh = new THREE.Mesh(torusGeo, torusMat);
        torusMesh.position.set(180, 140, -80);
        geoGroup.add(torusMesh);

        scene.add(geoGroup);
        erp3dState.geoGroup = geoGroup;

        // Mouse Parallax Event
        window.addEventListener('mousemove', (e) => {
            erp3dState.targetMouseX = (e.clientX - width / 2) * 0.15;
            erp3dState.targetMouseY = (e.clientY - height / 2) * 0.15;
        });

        window.addEventListener('resize', () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });

        // Animation Loop
        let clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            // Smooth parallax lerp
            erp3dState.mouseX += (erp3dState.targetMouseX - erp3dState.mouseX) * 0.05;
            erp3dState.mouseY += (erp3dState.targetMouseY - erp3dState.mouseY) * 0.05;

            camera.position.x = erp3dState.mouseX;
            camera.position.y = -erp3dState.mouseY;
            camera.lookAt(scene.position);

            // Rotate particles & group
            particlesMesh.rotation.y = time * 0.04;
            particlesMesh.rotation.x = time * 0.02;

            geoGroup.rotation.y = time * 0.1;
            geoGroup.rotation.x = time * 0.05;

            icoMesh.rotation.x += 0.01;
            octMesh.rotation.y += 0.015;
            torusMesh.rotation.z += 0.008;

            renderer.render(scene, camera);
        }
        animate();

    } catch (err) {
        console.error('Error initializing Three.js 3D canvas:', err);
        initFallback2DCanvas3D(canvas);
    }
};

// Fallback 2D Canvas 3D Engine for devices without WebGL support
function initFallback2DCanvas3D(canvas) {
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let particles = [];
    for (let i = 0; i < 70; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            z: Math.random() * 500,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(0, 188, 212, 0.6)';
        ctx.strokeStyle = 'rgba(0, 188, 212, 0.12)';

        particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            for (let j = idx + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
    }
    animate();
}

function get3DThemeRGB(themeName) {
    switch (themeName) {
        case 'emerald':
            return { primary: { r: 0, g: 0.65, b: 0.35 }, primaryHex: 0x00a65a, accentHex: 0x00ffcc };
        case 'gold':
            return { primary: { r: 0.95, g: 0.61, b: 0.07 }, primaryHex: 0xf39c12, accentHex: 0xffd700 };
        case 'slate':
            return { primary: { r: 0, g: 0.73, b: 0.83 }, primaryHex: 0x00bcd4, accentHex: 0x40c4ff };
        case 'midnight':
            return { primary: { r: 0.25, g: 0.32, b: 0.71 }, primaryHex: 0x3f51b5, accentHex: 0xe040fb };
        case 'crimson':
            return { primary: { r: 0.9, g: 0.22, b: 0.21 }, primaryHex: 0xe53935, accentHex: 0xff5252 };
        case 'purple':
            return { primary: { r: 0.55, g: 0.14, b: 0.66 }, primaryHex: 0x8e24aa, accentHex: 0xd81b60 };
        default:
            return { primary: { r: 0.23, g: 0.55, b: 0.73 }, primaryHex: 0x3c8dbc, accentHex: 0x00bcd4 };
    }
}

window.update3DThemeColors = function (themeName) {
    erp3dState.currentTheme = themeName;
    if (!erp3dState.linesMesh) return;

    const themeColors = get3DThemeRGB(themeName);
    erp3dState.linesMesh.material.color.setHex(themeColors.accentHex);
};

window.set3DModuleMode = function (viewId) {
    erp3dState.currentModule = viewId;
    if (!erp3dState.particlesMesh) return;

    if (viewId === 'view-command-center') {
        erp3dState.particlesMesh.material.size = 5;
    } else if (viewId === 'view-fees') {
        erp3dState.particlesMesh.material.size = 6;
    } else {
        erp3dState.particlesMesh.material.size = 4;
    }
};

/* ==========================================================================
   DYNAMIC INTERACTIVE 3D CARD TILT ENGINE
   ========================================================================== */
window.init3DTiltEffects = function () {
    const cardSelectors = [
        '.card-3d-tilt',
        '.metric-box',
        '.cmd-action-tile',
        '.box-panel',
        '.alits-id-card',
        '.dept-card',
        '.dept-3d-card',
        '.faculty-card',
        '.hostel-block-card',
        '.skill-card',
        '.bus-route-card',
        '.exec-chip-btn',
        '.btn-quick-action'
    ];

    const cards = document.querySelectorAll(cardSelectors.join(', '));

    cards.forEach(card => {
        if (card.closest('#view-exams')) return;
        if (card.dataset.tiltInitialized === 'true') return;
        card.dataset.tiltInitialized = 'true';

        card.classList.add('card-3d-tilt');

        // Create glare layer if not present
        if (!card.querySelector('.card-3d-glare')) {
            const glare = document.createElement('div');
            glare.className = 'card-3d-glare';
            card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `none rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;

            const glare = card.querySelector('.card-3d-glare');
            if (glare) {
                const glareX = (x / rect.width) * 100;
                const glareY = (y / rect.height) * 100;
                glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 75%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        });
    });
};

/* ==========================================================================
   MODULE-SPECIFIC 3D CANVAS VISUALIZERS
   ========================================================================== */
window.renderModuleSpecific3DCanvas = function (viewId) {
    if (viewId === 'view-command-center') {
        renderCmd3DHologramOrb();
    } else if (viewId === 'view-idcards') {
        renderIdCard3DPreviewWidget();
    } else if (viewId === 'view-fees') {
        renderFee3DCoinStack();
    } else if (viewId === 'view-transport') {
        renderTransport3DBusSimulator();
    } else if (viewId === 'view-skill') {
        renderSkill3DPolyhedron();
    }
};

function renderCmd3DHologramOrb() {
    const container = document.getElementById('cmd3dOrbContainer');
    if (!container) return;

    let canvas = container.querySelector('canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 120;
        container.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    let angle = 0;

    function drawOrb() {
        if (!document.getElementById('view-command-center') || document.getElementById('view-command-center').style.display === 'none') return;
        requestAnimationFrame(drawOrb);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        angle += 0.03;

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 1.5;

        for (let r = 15; r <= 45; r += 10) {
            ctx.beginPath();
            ctx.ellipse(cx, cy, r, r * Math.abs(Math.sin(angle * 0.5)), angle, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.fillStyle = '#00bcd4';
        ctx.beginPath();
        ctx.arc(cx, cy, 8 + Math.sin(angle * 2) * 2, 0, Math.PI * 2);
        ctx.fill();
    }
    drawOrb();
}

function renderIdCard3DPreviewWidget() {
    const container = document.getElementById('idcard3dWidget');
    if (!container) return;
    container.innerHTML = `
        <div style="font-size: 11px; font-weight: 700; color: #00ffcc; text-transform: uppercase; margin-bottom: 6px;">
            ✨ Interactive 3D Card Gyro
        </div>
        <div style="font-size: 10px; color: #8899a6;">
            Move mouse over any ID Card below to view real-time 3D depth tilt & holographic sheen!
        </div>
    `;
}

function renderFee3DCoinStack() {
    const container = document.getElementById('fee3dWidget');
    if (!container) return;
    container.innerHTML = `
        <div style="text-align: center; font-size: 11px; font-weight: 800; color: #ffd700;">
            💎 3D Real-Time Fee Ledger active
        </div>
    `;
}

function renderTransport3DBusSimulator() {
    const container = document.getElementById('transport3dWidget');
    if (!container) return;
    container.innerHTML = `
        <div style="text-align: center; font-size: 11px; font-weight: 800; color: #00ffcc;">
            🚌 Live 3D Bus Route Motion active
        </div>
    `;
}

function renderSkill3DPolyhedron() {
    const container = document.getElementById('skill3dWidget');
    if (!container) return;
    container.innerHTML = `
        <div style="text-align: center; font-size: 11px; font-weight: 800; color: #e040fb;">
            🚀 3D Skill Tech Matrix active
        </div>
    `;
}


// 3D Canvas and Tilt Overrides for Snappy 2D Pop
window.initERP3DEngine = function () { };
window.init3DTiltEffects = function () { };
window.renderModuleSpecific3DCanvas = function () { };

/* ==========================================================================
   PRINCIPAL'S DIRECTORATE & MANDATORY APPROVAL SYSTEM
   ========================================================================== */

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
    localStorage.setItem('alits_faculty_permissions', JSON.stringify(perms));
    updateApprovalCounters();
}

function getStoredFacultyLeaves() {
    const saved = localStorage.getItem('alits_faculty_leaves');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
    }
    return [
        { id: 'LV-801', facultyId: 'AL00456', facultyName: 'MS. A. Manjula', type: 'Casual Leave (CL)', from: '2026-09-18', to: '2026-09-18', days: 1, reason: 'Personal family commitment', substitute: 'Mrs. G. Roja Ramani (CSE)', status: 'Approved by Principal', date: '14-Sep-2026' },
        { id: 'LV-802', facultyId: 'AL00458', facultyName: 'Sri K. Ramesh', type: 'On-Duty (OD)', from: '2026-10-05', to: '2026-10-06', days: 2, reason: 'Attending IEEE International Conference at Hyderabad', substitute: 'Sri K. Ramesh (CSE)', status: 'Pending Principal Review', date: '20-Sep-2026' }
    ];
}

function saveStoredFacultyLeaves(leaves) {
    localStorage.setItem('alits_faculty_leaves', JSON.stringify(leaves));
    updateApprovalCounters();
}

function updateApprovalCounters() {
    const perms = getStoredPermissions();
    const leaves = getStoredFacultyLeaves();
    const pendingPerms = perms.filter(p => p.status.includes('Pending')).length;
    const pendingLeaves = leaves.filter(l => l.status.includes('Pending')).length;
    const totalPending = pendingPerms + pendingLeaves;

    const badge = document.getElementById('sidebarApprovalBadge');
    if (badge) {
        badge.innerText = `${totalPending} PENDING`;
        badge.style.background = totalPending > 0 ? '#ef4444' : '#10b981';
    }
}

// ==========================================================================
// 1. RENDER PRINCIPAL DIRECTORATE VIEW
// ==========================================================================
window.renderPrincipalDirectorateView = function () {
    const container = document.getElementById('principalDirectorateContainer');
    if (!container) return;

    const perms = getStoredPermissions();
    const leaves = getStoredFacultyLeaves();
    const pendingPerms = perms.filter(p => p.status.includes('Pending'));
    const pendingLeaves = leaves.filter(l => l.status.includes('Pending'));
    const approvedCount = perms.filter(p => p.status.includes('Approved')).length + leaves.filter(l => l.status.includes('Approved')).length;

    container.innerHTML = `
        <div style="padding: 24px; max-width: 1400px; margin: 0 auto;">
            
            <!-- PRINCIPAL HERO EXECUTIVE CARD -->
            <div style="background: linear-gradient(135deg, #07180f 0%, #0F3D26 60%, #175234 100%); border: 2px solid #D4AF37; border-radius: 16px; padding: 28px 36px; color: white; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
                <div style="display: flex; align-items: center; gap: 24px;">
                    <div style="position: relative;">
                        <img src="images/principal_sreenivasulu.png" alt="Dr. K. Sreenivasulu" 
                             style="width: 104px; height: 104px; border-radius: 50%; object-fit: cover; border: 3.5px solid #D4AF37; box-shadow: 0 0 24px rgba(212,175,55,0.5);" />
                        <span style="position: absolute; bottom: 4px; right: 4px; background: #10B981; border: 2px solid #07180f; width: 20px; height: 20px; border-radius: 50%;" title="Principal On-Duty / In Chamber"></span>
                    </div>
                    <div>
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                            <span style="background: linear-gradient(135deg, #D4AF37, #F59E0B); color: #07180f; font-weight: 800; font-size: 11px; padding: 3px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">ALITS CHIEF EXECUTIVE & PRINCIPAL</span>
                            <span style="font-size: 12px; color: #94A3B8;">Autonomous Head</span>
                        </div>
                        <h1 style="font-size: 26px; font-weight: 800; color: #FFFFFF; margin: 0 0 4px; letter-spacing: 0.5px;">Dr. K. Sreenivasulu, M.Tech, Ph.D.</h1>
                        <div style="font-size: 14px; color: #D4AF37; font-weight: 600;">Principal, Chief Controller of Examinations & Professor of Engineering</div>
                        <div style="font-size: 12px; color: #CBD5E1; margin-top: 6px;">
                            <i class="fa-solid fa-location-dot" style="color: #D4AF37;"></i> Principal Chamber, Block-A • 
                            <i class="fa-solid fa-envelope" style="color: #D4AF37;"></i> principal@alits.ac.in • 
                            <i class="fa-solid fa-phone" style="color: #D4AF37;"></i> +91 94401 99883
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <button class="btn-primary-erp" onclick="switchErpView('view-approvals')" style="background: linear-gradient(135deg, #D4AF37, #B8860B); color: #07180f; font-weight: 800; padding: 10px 18px; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-clipboard-check"></i> Open Mandatory Approvals Hub (${pendingPerms.length + pendingLeaves.length})
                    </button>
                    <button class="btn-cal-ctrl" onclick="openIssueCircularModal()" style="background: rgba(255,255,255,0.12); color: white; border: 1px solid rgba(255,255,255,0.25); padding: 10px 18px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-bullhorn"></i> Issue Principal Circular
                    </button>
                </div>
            </div>

            <!-- 4 EXECUTIVE KPIS -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px;">
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; align-items: center; gap: 16px;">
                    <div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(239, 68, 68, 0.1); color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 22px;">
                        <i class="fa-solid fa-hourglass-half"></i>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 800; color: #ef4444;">${pendingPerms.length + pendingLeaves.length}</div>
                        <div style="font-size: 13px; font-weight: 700; color: #1e293b;">Pending Approvals</div>
                        <div style="font-size: 11px; color: #64748b;">Requires Mandatory Action</div>
                    </div>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; align-items: center; gap: 16px;">
                    <div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 22px;">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 800; color: #10b981;">${approvedCount}</div>
                        <div style="font-size: 13px; font-weight: 700; color: #1e293b;">Sanctioned & Approved</div>
                        <div style="font-size: 11px; color: #64748b;">With Digital Passcodes</div>
                    </div>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; align-items: center; gap: 16px;">
                    <div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(59, 130, 246, 0.1); color: #3b82f6; display: flex; align-items: center; justify-content: center; font-size: 22px;">
                        <i class="fa-solid fa-chalkboard-user"></i>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 800; color: #3b82f6;">200+</div>
                        <div style="font-size: 13px; font-weight: 700; color: #1e293b;">Total Faculty Supervised</div>
                        <div style="font-size: 11px; color: #64748b;">Across 9 Departments</div>
                    </div>
                </div>

                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; align-items: center; gap: 16px;">
                    <div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(212, 175, 55, 0.1); color: #b8860b; display: flex; align-items: center; justify-content: center; font-size: 22px;">
                        <i class="fa-solid fa-award"></i>
                    </div>
                    <div>
                        <div style="font-size: 24px; font-weight: 800; color: #b8860b;">Autonomous</div>
                        <div style="font-size: 13px; font-weight: 700; color: #1e293b;">NBA & NAAC 'A'</div>
                        <div style="font-size: 11px; color: #64748b;">Institutional Compliance</div>
                    </div>
                </div>
            </div>

            <!-- PRINCIPAL ACTIVITY SECTIONS (GRID 2) -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 24px;">
                
                <!-- PENDING FACULTY PERMISSION REQUESTS QUEUE -->
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
                    <div style="background: #0F3D26; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 18px;">📋</span>
                            <div>
                                <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #ffffff;">Faculty Permission Requests & Mandatory Sanction Queue</h3>
                                <div style="font-size: 11.5px; color: #D4AF37;">Faculty members cannot proceed until Principal grants approval</div>
                            </div>
                        </div>
                        ${pendingPerms.length > 0 ? `
                            <button onclick="approveAllPendingPermissions()" style="background: linear-gradient(135deg, #10B981, #059669); color: white; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 700; font-size: 12px; cursor: pointer;">
                                <i class="fa-solid fa-check-double"></i> Approve All (${pendingPerms.length})
                            </button>
                        ` : ''}
                    </div>

                    <div style="padding: 0;">
                        <table class="table-custom" style="width: 100%;">
                            <thead>
                                <tr style="background: #f8fafc;">
                                    <th>Faculty & Department</th>
                                    <th>Permission Category</th>
                                    <th>Date & Time Slot</th>
                                    <th>Work Adjustment</th>
                                    <th>Status</th>
                                    <th style="text-align: right;">Principal Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${perms.slice(0, 5).map(p => {
                                    const isPending = p.status.includes('Pending');
                                    const isApproved = p.status.includes('Approved');
                                    return `
                                        <tr>
                                            <td>
                                                <div style="font-weight: 700; color: #1e293b;">${p.facultyName}</div>
                                                <div style="font-size: 11px; color: #64748b;">${p.dept} (${p.facultyId})</div>
                                            </td>
                                            <td>
                                                <div style="font-weight: 600; color: #0F3D26;">${p.type}</div>
                                                <div style="font-size: 11.5px; color: #475569;">${p.reason}</div>
                                            </td>
                                            <td>
                                                <div style="font-weight: 700; color: #0284c7;">${p.date}</div>
                                                <div style="font-size: 11px; color: #64748b;">${p.timeSlot}</div>
                                            </td>
                                            <td>
                                                <div style="font-size: 12px; font-weight: 600;">${p.substitute}</div>
                                                <span style="font-size: 10px; color: #10B981; font-weight: 700;">✓ Class Covered</span>
                                            </td>
                                            <td>
                                                ${isPending ? `
                                                    <span style="background: #FEF3C7; color: #D97706; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                                                        <i class="fa-solid fa-lock"></i> Awaiting Principal
                                                    </span>
                                                ` : isApproved ? `
                                                    <span style="background: #D1FAE5; color: #059669; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                                                        <i class="fa-solid fa-circle-check"></i> Approved & Stamped
                                                    </span>
                                                ` : `
                                                    <span style="background: #FEE2E2; color: #DC2626; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                                                        Rejected
                                                    </span>
                                                `}
                                            </td>
                                            <td style="text-align: right;">
                                                ${isPending ? `
                                                    <div style="display: inline-flex; gap: 6px;">
                                                        <button onclick="approveFacultyPermission('${p.id}')" style="background: #10B981; color: white; border: none; padding: 6px 10px; border-radius: 4px; font-weight: 700; font-size: 11.5px; cursor: pointer;" title="Grant Principal Sanction">
                                                            <i class="fa-solid fa-check"></i> Approve
                                                        </button>
                                                        <button onclick="rejectFacultyPermission('${p.id}')" style="background: #EF4444; color: white; border: none; padding: 6px 10px; border-radius: 4px; font-weight: 700; font-size: 11.5px; cursor: pointer;" title="Reject Request">
                                                            <i class="fa-solid fa-xmark"></i> Reject
                                                        </button>
                                                    </div>
                                                ` : `
                                                    <span style="font-size: 11px; color: #64748b; font-weight: 600;">Sanctioned</span>
                                                `}
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- PRINCIPAL OFFICIAL DIRECTIVES & ACTIONS -->
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
                        <h3 style="margin: 0 0 14px; font-size: 15px; font-weight: 800; color: #0F3D26; display: flex; align-items: center; gap: 8px;">
                            <span>📢</span> Principal Academic Circulars
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div style="border-left: 3px solid #0F3D26; padding-left: 10px;">
                                <div style="font-size: 12.5px; font-weight: 700; color: #1e293b;">Autonomous R24 Mid-Semester Valuation Protocol</div>
                                <div style="font-size: 11px; color: #64748b;">Released: 20-Sep-2026 • Circular No: ALITS/PRIN/2026/042</div>
                            </div>
                            <div style="border-left: 3px solid #D4AF37; padding-left: 10px;">
                                <div style="font-size: 12.5px; font-weight: 700; color: #1e293b;">Skill Development AWS Cloud Certification Batch</div>
                                <div style="font-size: 11px; color: #64748b;">Released: 18-Sep-2026 • Circular No: ALITS/PRIN/2026/041</div>
                            </div>
                            <div style="border-left: 3px solid #3B82F6; padding-left: 10px;">
                                <div style="font-size: 12.5px; font-weight: 700; color: #1e293b;">Faculty Biometric & Attendance Regularity Guidelines</div>
                                <div style="font-size: 11px; color: #64748b;">Released: 15-Sep-2026 • Circular No: ALITS/PRIN/2026/040</div>
                            </div>
                        </div>
                    </div>

                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
                        <h3 style="margin: 0 0 14px; font-size: 15px; font-weight: 800; color: #0F3D26; display: flex; align-items: center; gap: 8px;">
                            <span>🏛️</span> Chief Controller of Examinations Oversight
                        </h3>
                        <p style="font-size: 12px; color: #475569; margin-bottom: 12px;">
                            Autonomous Examination Cell is directly chaired by Dr. K. Sreenivasulu, overseeing valuation, moderation, and semester grade integrity for 5,800+ students.
                        </p>
                        <button class="btn-primary-erp" onclick="switchErpView('view-exams')" style="width: 100%; font-size: 12px; padding: 8px 12px;">
                            <i class="fa-solid fa-building-columns"></i> Open Examination Cell Control
                        </button>
                    </div>
                </div>
            </div>

        </div>
    `;
};

// ==========================================================================
// 2. RENDER MANDATORY APPROVALS VIEW
// ==========================================================================
window.renderApprovalsView = function () {
    const container = document.getElementById('approvalsHubContainer');
    if (!container) return;

    const perms = getStoredPermissions();
    const leaves = getStoredFacultyLeaves();
    const pendingPerms = perms.filter(p => p.status.includes('Pending'));
    const pendingLeaves = leaves.filter(l => l.status.includes('Pending'));

    container.innerHTML = `
        <div style="padding: 24px; max-width: 1400px; margin: 0 auto;">
            
            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, #07180f 0%, #0F3D26 100%); border-radius: 14px; padding: 24px 30px; color: white; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <div style="width: 56px; height: 56px; border-radius: 12px; background: rgba(212,175,55,0.2); border: 2px solid #D4AF37; display: flex; align-items: center; justify-content: center; font-size: 26px;">
                        ✅
                    </div>
                    <div>
                        <div style="font-size: 11px; font-weight: 800; color: #D4AF37; letter-spacing: 1px; text-transform: uppercase;">Executive Authority Clearance</div>
                        <h2 style="font-size: 22px; font-weight: 800; color: #FFFFFF; margin: 2px 0;">Mandatory Principal Approvals Hub</h2>
                        <div style="font-size: 12.5px; color: #CBD5E1;">Dr. K. Sreenivasulu (Principal) Digital Sanction and Gatepass Verification Cell</div>
                    </div>
                </div>

                <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
                    <a href="faculty/index.html?tab=approvals" target="_blank" style="background: rgba(212,175,55,0.2); color: #D4AF37; border: 1px solid #D4AF37; padding: 8px 14px; border-radius: 6px; font-weight: 700; font-size: 12.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;" title="Open Faculty Directorate Portal Approvals View">
                        <i class="fa-solid fa-chalkboard-user"></i> Faculty Directorate Portal ↗
                    </a>
                    <span style="background: #EF4444; color: white; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;">
                        ${pendingPerms.length + pendingLeaves.length} Total Awaiting Sanction
                    </span>
                    ${(pendingPerms.length + pendingLeaves.length) > 0 ? `
                        <button onclick="approveAllPendingPermissions()" style="background: linear-gradient(135deg, #10B981, #059669); color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 800; font-size: 12.5px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-signature"></i> Approve All Pending with Principal Seal
                        </button>
                    ` : ''}
                </div>
            </div>

            <!-- PERMISSIONS TABLE -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
                <div style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-weight: 800; color: #0F3D26; font-size: 14px;">
                        <i class="fa-solid fa-person-walking-arrow-right" style="color: #0F3D26;"></i> Faculty Campus Exit & OD Permissions (${perms.length})
                    </div>
                    <span style="font-size: 11px; color: #64748b;">Requires mandatory approval before faculty leaves campus</span>
                </div>
                <div style="overflow-x: auto;">
                    <table class="table-custom" style="width: 100%;">
                        <thead>
                            <tr style="background: #f1f5f9;">
                                <th>Perm ID</th>
                                <th>Faculty Member</th>
                                <th>Type / Reason</th>
                                <th>Date & Time Window</th>
                                <th>Substitute Faculty</th>
                                <th>Status</th>
                                <th style="text-align: right;">Principal Clearance Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${perms.map(p => {
                                const isPending = p.status.includes('Pending');
                                const isApproved = p.status.includes('Approved');
                                return `
                                    <tr style="${isApproved ? 'background: rgba(16, 185, 129, 0.02);' : ''}">
                                        <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: #0F3D26;">${p.id}</td>
                                        <td>
                                            <div style="font-weight: 700; color: #1e293b;">${p.facultyName}</div>
                                            <div style="font-size: 11px; color: #64748b;">${p.dept} (${p.facultyId})</div>
                                        </td>
                                        <td>
                                            <div style="font-weight: 700; color: #0F3D26;">${p.type}</div>
                                            <div style="font-size: 11.5px; color: #475569;">${p.reason}</div>
                                            ${p.principalRemarks ? `<div style="font-size: 11px; color: #059669; margin-top: 2px;"><strong>Remark:</strong> ${p.principalRemarks}</div>` : ''}
                                        </td>
                                        <td>
                                            <div style="font-weight: 700; color: #0284c7;">${p.date}</div>
                                            <div style="font-size: 11.5px; color: #64748b;">${p.timeSlot} (${p.duration})</div>
                                        </td>
                                        <td>
                                            <div style="font-weight: 600; color: #1e293b; font-size: 12px;">${p.substitute}</div>
                                            <span style="font-size: 10px; color: #10B981; font-weight: 700;">✓ Work Adjusted</span>
                                        </td>
                                        <td>
                                            ${isPending ? `
                                                <span style="background: #FEF3C7; color: #D97706; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                                                    ⏳ Pending Clearance
                                                </span>
                                            ` : isApproved ? `
                                                <span style="background: #D1FAE5; color: #059669; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                                                    ✓ Sanctioned & Stamped
                                                </span>
                                                <div style="font-size: 9.5px; color: #059669; margin-top: 2px;">Code: ${p.passCode || 'ALITS-OK'}</div>
                                            ` : `
                                                <span style="background: #FEE2E2; color: #DC2626; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                                                    ✗ Rejected
                                                </span>
                                            `}
                                        </td>
                                        <td style="text-align: right;">
                                            ${isPending ? `
                                                <div style="display: inline-flex; gap: 6px;">
                                                    <button onclick="approveFacultyPermission('${p.id}')" style="background: #10B981; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; cursor: pointer;">
                                                        <i class="fa-solid fa-check"></i> Approve
                                                    </button>
                                                    <button onclick="rejectFacultyPermission('${p.id}')" style="background: #EF4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: 700; font-size: 12px; cursor: pointer;">
                                                        <i class="fa-solid fa-xmark"></i> Reject
                                                    </button>
                                                </div>
                                            ` : `
                                                <button onclick="alert('Permission ${p.id} already processed with Principal digital signature.')" style="background: #e2e8f0; color: #475569; border: none; padding: 6px 10px; border-radius: 4px; font-weight: 600; font-size: 11px;">
                                                    Processed
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

            <!-- LEAVE APPLICATIONS TABLE -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
                <div style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-weight: 800; color: #0F3D26; font-size: 14px;">
                        <i class="fa-solid fa-envelope-open-text" style="color: #0F3D26;"></i> Faculty Full-Day Leave Applications (${leaves.length})
                    </div>
                </div>
                <div style="overflow-x: auto;">
                    <table class="table-custom" style="width: 100%;">
                        <thead>
                            <tr style="background: #f1f5f9;">
                                <th>Leave ID</th>
                                <th>Faculty Member</th>
                                <th>Leave Nature</th>
                                <th>Dates & Duration</th>
                                <th>Reason</th>
                                <th>Work Adjustment</th>
                                <th>Status</th>
                                <th style="text-align: right;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${leaves.map(lv => {
                                const isPending = lv.status.includes('Pending');
                                return `
                                    <tr>
                                        <td style="font-family: 'JetBrains Mono'; font-weight: 700; color: #0F3D26;">${lv.id}</td>
                                        <td><strong>${lv.facultyName || 'MS. A. Manjula'}</strong></td>
                                        <td><strong>${lv.type}</strong></td>
                                        <td>${lv.from} to ${lv.to} (${lv.days} Days)</td>
                                        <td>${lv.reason}</td>
                                        <td>${lv.substitute}</td>
                                        <td>
                                            <span style="background: ${isPending ? '#FEF3C7' : '#D1FAE5'}; color: ${isPending ? '#D97706' : '#059669'}; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                                                ${lv.status}
                                            </span>
                                        </td>
                                        <td style="text-align: right;">
                                            ${isPending ? `
                                                <div style="display: inline-flex; gap: 6px;">
                                                    <button onclick="approveFacultyLeave('${lv.id}')" style="background: #10B981; color: white; border: none; padding: 5px 10px; border-radius: 4px; font-weight: 700; font-size: 11.5px; cursor: pointer;">
                                                        <i class="fa-solid fa-check"></i> Sanction
                                                    </button>
                                                    <button onclick="rejectFacultyLeave('${lv.id}')" style="background: #EF4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; font-weight: 700; font-size: 11.5px; cursor: pointer;">
                                                        <i class="fa-solid fa-xmark"></i> Reject
                                                    </button>
                                                </div>
                                            ` : `
                                                <span style="font-size: 11px; color: #64748b; font-weight: 600;">${lv.status || 'Processed'}</span>
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
};

// --- APPROVAL ACTIONS (PRINCIPAL EXECUTIVE SANCTIONS) ---
window.approveFacultyPermission = async function (id) {
    const session = typeof AuthGuard !== 'undefined' ? AuthGuard.getSession() : null;
    const role = session ? (session.role || 'Principal') : 'Principal';
    const userId = session ? (session.userId || 'principal') : 'principal';

    const perms = getStoredPermissions();
    const p = perms.find(x => x.id === id);
    if (p) {
        p.status = 'Approved by Principal';
        p.approvedBy = 'Dr. K. Sreenivasulu (Principal)';
        p.approvedAt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        p.principalRemarks = 'Approved & Sanctioned with Principal Digital Seal. Gatepass and OD clearance issued.';
        p.passCode = `ALITS-PRIN-${p.id}`;
        saveStoredPermissions(perms);
    }

    try {
        const res = await fetch('/api/approvals/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                requestId: id,
                action: 'approve',
                role: role,
                userId: userId,
                remarks: 'Approved & Sanctioned with Principal Digital Seal.'
            })
        });
        const data = await res.json();
        if (!data.success && data.error) {
            showToast(`⚠️ ${data.error}`);
            return;
        }
    } catch (e) {
        console.warn('[Approvals] Backend sync fallback:', e);
    }

    showToast(`✓ Permission ${id} has been SANCTIONED & APPROVED by Principal Dr. K. Sreenivasulu!`);
    
    // Re-render views
    const activePane = document.querySelector('.erp-view-pane:not([style*="display: none"])');
    if (activePane?.id === 'view-principal') renderPrincipalDirectorateView();
    if (activePane?.id === 'view-approvals') renderApprovalsView();
};

window.rejectFacultyPermission = async function (id) {
    const remarks = prompt('Enter reason / remarks for rejection:', 'Prior class adjustment incomplete or alternate date recommended.');
    if (remarks === null) return;

    const session = typeof AuthGuard !== 'undefined' ? AuthGuard.getSession() : null;
    const role = session ? (session.role || 'Principal') : 'Principal';
    const userId = session ? (session.userId || 'principal') : 'principal';

    const perms = getStoredPermissions();
    const p = perms.find(x => x.id === id);
    if (p) {
        p.status = 'Rejected by Principal';
        p.approvedBy = 'Dr. K. Sreenivasulu (Principal)';
        p.approvedAt = new Date().toLocaleDateString('en-GB');
        p.principalRemarks = remarks;
        saveStoredPermissions(perms);
    }

    try {
        const res = await fetch('/api/approvals/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                requestId: id,
                action: 'reject',
                role: role,
                userId: userId,
                remarks: remarks
            })
        });
        const data = await res.json();
        if (!data.success && data.error) {
            showToast(`⚠️ ${data.error}`);
            return;
        }
    } catch (e) {
        console.warn('[Approvals] Backend sync fallback:', e);
    }

    showToast(`Permission ${id} rejected with Principal remarks.`);

    const activePane = document.querySelector('.erp-view-pane:not([style*="display: none"])');
    if (activePane?.id === 'view-principal') renderPrincipalDirectorateView();
    if (activePane?.id === 'view-approvals') renderApprovalsView();
};

window.approveFacultyLeave = async function (id) {
    const session = typeof AuthGuard !== 'undefined' ? AuthGuard.getSession() : null;
    const role = session ? (session.role || 'Principal') : 'Principal';
    const userId = session ? (session.userId || 'principal') : 'principal';

    const leaves = getStoredFacultyLeaves();
    const lv = leaves.find(x => x.id === id);
    if (lv) {
        lv.status = 'Approved by Principal';
        lv.approvedBy = 'Dr. K. Sreenivasulu (Principal)';
        lv.approvedAt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        lv.passCode = `ALITS-PRIN-${id}`;
        saveStoredFacultyLeaves(leaves);
    }

    try {
        const res = await fetch('/api/approvals/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                requestId: id,
                action: 'approve',
                role: role,
                userId: userId,
                remarks: 'Leave sanctioned by Principal.'
            })
        });
        const data = await res.json();
        if (!data.success && data.error) {
            showToast(`⚠️ ${data.error}`);
            return;
        }
    } catch (e) {
        console.warn('[Approvals] Backend sync fallback:', e);
    }

    showToast(`✓ Leave ${id} sanctioned by Principal Dr. K. Sreenivasulu!`);

    const activePane = document.querySelector('.erp-view-pane:not([style*="display: none"])');
    if (activePane?.id === 'view-principal') renderPrincipalDirectorateView();
    if (activePane?.id === 'view-approvals') renderApprovalsView();
};

window.rejectFacultyLeave = async function (id) {
    const remarks = prompt('Enter reason for leave rejection:', 'Academic schedule constraints / Examination duty.');
    if (remarks === null) return;

    const session = typeof AuthGuard !== 'undefined' ? AuthGuard.getSession() : null;
    const role = session ? (session.role || 'Principal') : 'Principal';
    const userId = session ? (session.userId || 'principal') : 'principal';

    const leaves = getStoredFacultyLeaves();
    const lv = leaves.find(x => x.id === id);
    if (lv) {
        lv.status = 'Rejected by Principal';
        lv.approvedBy = 'Dr. K. Sreenivasulu (Principal)';
        lv.approvedAt = new Date().toLocaleDateString('en-GB');
        lv.principalRemarks = remarks;
        saveStoredFacultyLeaves(leaves);
    }

    try {
        const res = await fetch('/api/approvals/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                requestId: id,
                action: 'reject',
                role: role,
                userId: userId,
                remarks: remarks
            })
        });
        const data = await res.json();
        if (!data.success && data.error) {
            showToast(`⚠️ ${data.error}`);
            return;
        }
    } catch (e) {
        console.warn('[Approvals] Backend sync fallback:', e);
    }

    showToast(`Leave application ${id} marked as Rejected.`);

    const activePane = document.querySelector('.erp-view-pane:not([style*="display: none"])');
    if (activePane?.id === 'view-principal') renderPrincipalDirectorateView();
    if (activePane?.id === 'view-approvals') renderApprovalsView();
};

window.approveAllPendingPermissions = async function () {
    const session = typeof AuthGuard !== 'undefined' ? AuthGuard.getSession() : null;
    const role = session ? (session.role || 'Principal') : 'Principal';
    const userId = session ? (session.userId || 'principal') : 'principal';

    const perms = getStoredPermissions();
    const leaves = getStoredFacultyLeaves();
    let count = 0;

    perms.forEach(p => {
        if (p.status.includes('Pending')) {
            p.status = 'Approved by Principal';
            p.approvedBy = 'Dr. K. Sreenivasulu (Principal)';
            p.approvedAt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            p.principalRemarks = 'Approved in batch sanction by Principal Dr. K. Sreenivasulu.';
            p.passCode = `ALITS-PRIN-${p.id}`;
            count++;
        }
    });

    leaves.forEach(l => {
        if (l.status.includes('Pending')) {
            l.status = 'Approved by Principal';
            l.approvedBy = 'Dr. K. Sreenivasulu (Principal)';
            l.approvedAt = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            l.passCode = `ALITS-PRIN-${l.id}`;
            count++;
        }
    });

    saveStoredPermissions(perms);
    saveStoredFacultyLeaves(leaves);

    try {
        const res = await fetch('/api/approvals/batch-approve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: role, userId: userId })
        });
        const data = await res.json();
        if (data.count) count = data.count;
    } catch (e) {
        console.warn('[Approvals] Batch approve backend sync:', e);
    }

    showToast(`✓ Stamped & Approved ${count} pending request(s) with Principal Dr. K. Sreenivasulu's digital signature!`);

    const activePane = document.querySelector('.erp-view-pane:not([style*="display: none"])');
    if (activePane?.id === 'view-principal') renderPrincipalDirectorateView();
    if (activePane?.id === 'view-approvals') renderApprovalsView();
};

window.openIssueCircularModal = function () {
    const title = prompt('Enter Principal Circular Title:', 'Autonomous Academic & Exam Schedule Notice');
    if (!title) return;
    showToast(`✓ Principal Circular "${title}" published across all 9 departments!`);
};

