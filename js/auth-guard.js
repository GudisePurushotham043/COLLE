/**
 * ALITS SMART ERP - Centralized Authentication & Route Guard
 * Enforces strict session verification, role-based access control (RBAC),
 * route protection across all portals, and prevents unauthorized back-navigation.
 */

(function (global) {
  'use strict';

  const SESSION_STORAGE_KEY = 'alits_auth_session';
  const REMEMBER_STORAGE_KEY = 'alits_remember_session';

  // Role Mappings to Portals
  const PORTAL_ROLES = {
    management: ['MANAGEMENT', 'ADMIN', 'CHAIRMAN', 'VICECHAIRMAN', 'PRINCIPAL', 'SKILLDIRECTOR', 'EXECUTIVE'],
    student: ['STUDENT', 'PARENT', 'MANAGEMENT', 'ADMIN', 'CHAIRMAN', 'VICECHAIRMAN', 'PRINCIPAL', 'SKILLDIRECTOR', 'EXECUTIVE'],
    faculty: ['FACULTY', 'STAFF', 'TEACHER', 'HOD', 'PROFESSOR', 'MANAGEMENT', 'ADMIN', 'CHAIRMAN', 'VICECHAIRMAN', 'PRINCIPAL', 'SKILLDIRECTOR', 'EXECUTIVE']
  };

  const PORTAL_PATHS = {
    management: 'index.html',
    student: 'student/index.html',
    faculty: 'faculty/index.html'
  };

  const AuthGuard = {
    /**
     * Retrieve the current active session
     * @returns {Object|null} Valid session or null
     */
    getSession: function () {
      try {
        let raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (!raw) {
          raw = localStorage.getItem(SESSION_STORAGE_KEY);
        }

        if (raw) {
          const session = JSON.parse(raw);
          // Purge legacy auto-login mock session if present in browser cache
          if (session && (
            session.sessionToken === 'ALITS-MGT-SESSION-EXEC' ||
            session.sessionToken === 'ALITS-FACULTY-ACTIVE-SESSION' ||
            !session.sessionToken ||
            typeof session.sessionToken !== 'string' ||
            !session.sessionToken.startsWith('ALITS-AUTH-')
          )) {
            this.clearSession();
            return null;
          }
          if (session && session.sessionToken && session.role) {
            return session;
          }
        }

        // Clean up legacy mock keys from browser storage
        try {
          localStorage.removeItem('alits_portal_user');
          localStorage.removeItem('alits_active_session');
          localStorage.removeItem('ALITS_LOGGED_IN');
          localStorage.removeItem('ALITS_EXEC_SESSION');
        } catch (e) { }

        return null;
      } catch (e) {
        console.error('[AuthGuard] Failed to parse session:', e);
        return null;
      }
    },

    /**
     * Check if current user is authenticated
     * @returns {boolean}
     */
    isAuthenticated: function () {
      const session = this.getSession();
      return !!(session && session.sessionToken);
    },

    /**
     * Validate session against a specific portal/role requirement
     * @param {string} requiredPortal - 'management', 'student', or 'faculty'
     * @returns {boolean}
     */
    hasPortalAccess: function (requiredPortal) {
      const session = this.getSession();
      if (!session) return false;

      const userRole = (session.role || '').toUpperCase().replace(/[\s\-_]/g, '');
      const userPortal = (session.portal || '').toLowerCase();

      // Explicit portal match check
      if (userPortal && userPortal === requiredPortal.toLowerCase()) {
        return true;
      }

      // Check allowed roles for the portal
      const allowedRoles = PORTAL_ROLES[requiredPortal.toLowerCase()] || [];
      return allowedRoles.some(r => r.toUpperCase().replace(/[\s\-_]/g, '') === userRole);
    },

    /**
     * Route Protection Guard - Call at the very top of each protected page.
     * Blocks access immediately if session is missing or role does not match.
     * @param {string} requiredPortal - 'management', 'student', or 'faculty'
     * @returns {boolean} True if authorized, otherwise redirects and returns false.
     */
    requireAuth: function (requiredPortal) {
      const session = this.getSession();
      const currentPath = window.location.pathname;
      const isInSubdir = currentPath.includes('/student/') || currentPath.includes('/faculty/') || currentPath.includes('/staff/');
      const authPath = isInSubdir ? '../auth.html' : 'auth.html';

      // 1. Check if authenticated
      if (!session || !session.sessionToken) {
        console.warn(`[AuthGuard] Access denied to ${requiredPortal}. No active session found.`);
        this.clearSession();
        window.location.replace(`${authPath}?portal=${encodeURIComponent(requiredPortal)}&msg=auth_required`);
        return false;
      }

      // 2. Check role/portal authorization
      if (!this.hasPortalAccess(requiredPortal)) {
        console.warn(`[AuthGuard] Access denied to ${requiredPortal}. User role "${session.role}" not authorized.`);
        window.location.replace(`${authPath}?portal=${encodeURIComponent(requiredPortal)}&error=access_denied&role=${encodeURIComponent(session.role)}`);
        return false;
      }

      // 3. User authorized - initialize back button protection
      this.preventBackNavigation();
      return true;
    },

    /**
     * Create an authenticated session
     * @param {Object} userData
     * @param {boolean} rememberDevice
     */
    login: function (userData, rememberDevice = false) {
      if (!userData) return false;

      const sessionToken = 'ALITS-AUTH-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
      const roleStr = (userData.role || 'Management').toUpperCase();

      let targetPortal = 'management';
      if (PORTAL_ROLES.student.includes(roleStr) || (userData.portal && userData.portal.toLowerCase() === 'student')) {
        targetPortal = 'student';
      } else if (PORTAL_ROLES.faculty.includes(roleStr) || (userData.portal && userData.portal.toLowerCase() === 'faculty')) {
        targetPortal = 'faculty';
      }

      const session = {
        userId: userData.id || userData.username || userData.rollNo || 'user',
        userName: userData.name || userData.full_name || 'ALITS User',
        role: userData.role || 'Management',
        portal: targetPortal,
        rollNo: userData.rollNo || userData.student_roll_no || null,
        employeeId: userData.id || userData.employee_id || null,
        email: userData.email || null,
        dept: userData.dept || userData.branch || null,
        loginTime: new Date().toISOString(),
        sessionToken: sessionToken
      };

      // Store primary session in sessionStorage
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

      // Synchronize legacy flags for backward compatibility across sub-modules
      sessionStorage.setItem('ALITS_LOGGED_IN', 'true');
      sessionStorage.setItem('ALITS_USER_ROLE', session.role);
      sessionStorage.setItem('alits_current_token', sessionToken);
      localStorage.setItem('alits_portal_user', JSON.stringify(session));

      if (rememberDevice) {
        localStorage.setItem(REMEMBER_STORAGE_KEY, JSON.stringify({
          userId: session.userId,
          role: session.role,
          portal: session.portal,
          savedAt: Date.now()
        }));
      }

      return session;
    },

    /**
     * Destroy current session and redirect to login
     */
    logout: function () {
      this.clearSession();
      const currentPath = window.location.pathname;
      const isInSubdir = currentPath.includes('/student/') || currentPath.includes('/faculty/') || currentPath.includes('/staff/');
      const authPath = isInSubdir ? '../auth.html' : 'auth.html';
      
      // Use replace to prevent back button from reopening the page
      window.location.replace(`${authPath}?msg=logged_out`);
    },

    /**
     * Clear all session data from browser storage
     */
    clearSession: function () {
      try {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        sessionStorage.removeItem('ALITS_LOGGED_IN');
        sessionStorage.removeItem('ALITS_USER_ROLE');
        sessionStorage.removeItem('ALITS_EXEC_SESSION');
        sessionStorage.removeItem('ALITS_FACULTY_SESSION');
        sessionStorage.removeItem('ALITS_TARGET_VIEW');
        sessionStorage.removeItem('alits_current_token');
        localStorage.removeItem(SESSION_STORAGE_KEY);
        localStorage.removeItem(REMEMBER_STORAGE_KEY);
        localStorage.removeItem('alits_portal_user');
        localStorage.removeItem('alits_active_session');
        localStorage.removeItem('ALITS_LOGGED_IN');
        localStorage.removeItem('ALITS_EXEC_SESSION');
      } catch (e) { }
    },

    /**
     * Prevent back button / bfcache restore after logout
     */
    preventBackNavigation: function () {
      // Re-verify session on page show (handles bfcache when pressing back button)
      window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
          const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
          if (!raw) {
            window.location.reload();
          }
        }
      });
    },

    /**
     * Navigation helper for portal buttons
     * @param {string} targetPortal - 'management', 'student', or 'faculty'
     */
    navigateToPortal: function (targetPortal) {
      const session = this.getSession();
      const currentPath = window.location.pathname;
      const isInSubdir = currentPath.includes('/student/') || currentPath.includes('/faculty/') || currentPath.includes('/staff/');
      const prefix = isInSubdir ? '../' : '';

      // If already logged in and role matches target portal, open portal directly
      if (session && this.hasPortalAccess(targetPortal)) {
        const dest = prefix + PORTAL_PATHS[targetPortal.toLowerCase()];
        window.location.href = dest;
      } else {
        // Otherwise redirect to auth page with target portal parameter
        const authUrl = `${prefix}auth.html?portal=${encodeURIComponent(targetPortal.toLowerCase())}`;
        window.location.href = authUrl;
      }
    }
  };

  global.AuthGuard = AuthGuard;

})(typeof window !== 'undefined' ? window : this);
