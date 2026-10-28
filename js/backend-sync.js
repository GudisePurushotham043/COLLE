/**
 * ALITS ERP - Python Backend Live Synchronization Engine
 * Manages real-time Server-Sent Events (SSE), fallback heartbeat polling,
 * asynchronous state persistence to Python SQLite backend, and UI live status readout.
 */

(function () {
    'use strict';

    const API_BASE = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
        && window.location.port === '5000'
        ? '/api'
        : 'http://localhost:5000/api';

    const BackendSync = {
        isConnected: false,
        version: 0,
        autoUpdateEnabled: true,
        eventSource: null,
        pollTimer: null,
        isPushing: false,
        lastSyncTime: null,
        recentTicks: [],

        init() {
            this.injectTopBarPill();
            this.injectToastContainer();
            this.checkConnectionAndBootstrap();
            this.connectSSE();
            this.startHeartbeatPolling();

            console.log('[BackendSync] Initialized with API Base:', API_BASE);
        },

        getApiUrl(endpoint) {
            return `${API_BASE}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
        },

        async checkConnectionAndBootstrap() {
            try {
                const res = await fetch(this.getApiUrl('/health'), { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    this.isConnected = true;
                    this.version = data.version || 1;
                    this.autoUpdateEnabled = data.auto_updater_active !== false;
                    this.lastSyncTime = new Date();
                    this.updateStatusPill();

                    // Load current authoritative state from backend
                    await this.pullState();
                } else {
                    this.setDisconnected();
                }
            } catch (err) {
                console.warn('[BackendSync] Python backend offline or not yet started, using local cache:', err.message);
                this.setDisconnected();
            }
        },

        setDisconnected() {
            this.isConnected = false;
            this.updateStatusPill();
        },

        connectSSE() {
            if (this.eventSource) {
                this.eventSource.close();
            }

            try {
                this.eventSource = new EventSource(this.getApiUrl('/events'));

                this.eventSource.onopen = () => {
                    this.isConnected = true;
                    this.updateStatusPill();
                    console.log('[BackendSync] SSE stream connected successfully');
                };

                this.eventSource.onmessage = (e) => {
                    if (!e.data || e.data.trim() === 'ping') return;
                    try {
                        const payload = JSON.parse(e.data);
                        this.handleLiveEvent(payload);
                    } catch (parseErr) {
                        console.error('[BackendSync] Failed to parse SSE payload:', parseErr);
                    }
                };

                this.eventSource.onerror = () => {
                    // EventSource automatically attempts reconnection
                    if (this.isConnected) {
                        this.isConnected = false;
                        this.updateStatusPill();
                    }
                };
            } catch (e) {
                console.warn('[BackendSync] Could not initialize EventSource:', e);
            }
        },

        startHeartbeatPolling() {
            if (this.pollTimer) clearInterval(this.pollTimer);
            // Check version every 12 seconds as fail-safe fallback (skips if SSE is actively connected)
            this.pollTimer = setInterval(async () => {
                // If SSE is active and healthy, bypass polling
                if (this.eventSource && this.eventSource.readyState === 1 && this.isConnected) {
                    return;
                }
                try {
                    const res = await fetch(this.getApiUrl('/version'), { cache: 'no-store' });
                    if (res.ok) {
                        const info = await res.json();
                        const wasOffline = !this.isConnected;
                        this.isConnected = true;

                        if (info.version > this.version) {
                            console.log(`[BackendSync] Detected new backend version (v${info.version} > v${this.version}), pulling updates...`);
                            await this.pullState();
                        } else if (wasOffline) {
                            this.updateStatusPill();
                        }
                    } else {
                        if (this.isConnected) this.setDisconnected();
                    }
                } catch (e) {
                    if (this.isConnected) this.setDisconnected();
                }
            }, 12000);
        },

        async pullState() {
            try {
                const res = await fetch(this.getApiUrl('/state'), { cache: 'no-store' });
                if (!res.ok) return;

                const payload = await res.json();
                if (payload && payload.state) {
                    this.version = payload.version;
                    this.lastSyncTime = new Date();

                    try {
                        localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(payload.state));
                    } catch (e) { }

                    if (window.onBackendStateUpdated) {
                        window.onBackendStateUpdated(payload.state, {
                            version: payload.version,
                            summary: payload.change_summary,
                            source: payload.updated_by
                        });
                    } else {
                        window.dispatchEvent(new CustomEvent('alits_data_sync', {
                            detail: {
                                version: payload.version,
                                summary: payload.change_summary,
                                source: payload.updated_by,
                                timestamp: Date.now()
                            }
                        }));
                    }

                    this.updateStatusPill();
                }
            } catch (err) {
                console.error('[BackendSync] Failed to pull state from backend:', err);
            }
        },

        async pushState(newState, meta = {}) {
            if (this.isPushing) {
                this.pendingPush = { newState, meta };
                return;
            }
            this.isPushing = true;

            try {
                // Ensure local storage is immediately updated
                try {
                    localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(newState));
                } catch (e) { }

                let actorName = meta.updatedBy || 'admin_user';
                try {
                    const session = typeof AuthGuard !== 'undefined' ? AuthGuard.getSession() : null;
                    if (session && session.userName) {
                        actorName = `${session.role || 'user'}_${session.userName}`;
                    }
                } catch (e) { }

                const payload = {
                    state: newState,
                    updated_by: actorName,
                    change_summary: meta.summary || 'Updated via ALITS ERP Portal',
                    module: meta.module || 'System',
                    action: meta.action || 'Save'
                };

                const res = await fetch(this.getApiUrl('/state'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (res.ok) {
                    const data = await res.json();
                    this.isConnected = true;
                    this.version = data.version;
                    this.lastSyncTime = new Date();
                    this.updateStatusPill();
                    if (meta.summary) {
                        this.showToast(meta.summary, meta.module || 'Auto Update');
                    }

                    window.dispatchEvent(new CustomEvent('alits_data_sync', {
                        detail: {
                            version: data.version,
                            summary: meta.summary,
                            module: meta.module,
                            timestamp: Date.now()
                        }
                    }));
                }
            } catch (err) {
                console.warn('[BackendSync] Could not push to backend, saved to localStorage fallback:', err.message);
                this.setDisconnected();
            } finally {
                this.isPushing = false;
                if (this.pendingPush) {
                    const next = this.pendingPush;
                    this.pendingPush = null;
                    await this.pushState(next.newState, next.meta);
                }
            }
        },

        handleLiveEvent(event) {
            if (!event) return;

            if (event.type === 'connected') {
                this.version = event.version || this.version;
                this.updateStatusPill();
                return;
            }

            if (event.type === 'auto_update' || event.type === 'client_update' || event.type === 'factory_reset' || event.type === 'fee_payment' || event.type === 'assignment_submitted' || event.type === 'faculty_request_submitted' || event.type === 'approval_status_updated') {
                // If this event has a version older than what we already have, discard it
                if (event.version && this.version && event.version < this.version) {
                    console.log(`[BackendSync] Discarded older SSE event (v${event.version} < current v${this.version})`);
                    return;
                }

                // If a user edit is currently pushing, do not let an auto_update tick preempt it
                if (this.isPushing && event.type === 'auto_update') {
                    console.log('[BackendSync] Deferring auto_update event while local edit push is active...');
                    return;
                }

                this.version = event.version;
                this.lastSyncTime = new Date();

                if (event.state) {
                    try {
                        localStorage.setItem('ALITS_ERP_STATE', JSON.stringify(event.state));
                    } catch (e) { }

                    if (window.onBackendStateUpdated) {
                        window.onBackendStateUpdated(event.state, {
                            version: event.version,
                            summary: event.summary,
                            module: event.module,
                            action: event.action
                        });
                    } else {
                        window.dispatchEvent(new CustomEvent('alits_data_sync', {
                            detail: {
                                version: event.version,
                                summary: event.summary,
                                module: event.module,
                                timestamp: Date.now()
                            }
                        }));
                    }
                }

                this.updateStatusPill();

                // Show toast for auto-updates or remote updates
                if (event.type === 'auto_update' && event.summary) {
                    this.showToast(event.summary, event.module || 'Live Update');
                } else if (event.type === 'client_update' && event.summary) {
                    this.showToast(`Updated: ${event.summary}`, 'System Sync');
                } else if (event.type === 'fee_payment' && event.receipt) {
                    this.showToast(`Fee Payment: ₹${event.receipt.amount} paid by ${event.receipt.studentName}`, 'Fees Sync');
                } else if (event.type === 'assignment_submitted') {
                    this.showToast(`Assignment Submitted by Roll ${event.rollNo}`, 'Academics');
                } else if (event.type === 'faculty_request_submitted') {
                    this.showToast(`📋 New ${event.request_type || 'Faculty'} request awaiting Principal approval`, 'Approvals Hub');
                } else if (event.type === 'approval_status_updated') {
                    const actText = event.action === 'approve' ? 'Approved & Sanctioned' : (event.action === 'batch_approve' ? 'Batch Approved' : 'Rejected');
                    this.showToast(`⚖️ Principal Dr. K. Sreenivasulu ${actText} request${event.requestId ? ' ' + event.requestId : ''}`, 'Principal Clearance');
                }
            }
        },

        async toggleAutoUpdater() {
            try {
                const res = await fetch(this.getApiUrl('/auto-update/toggle'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (res.ok) {
                    const data = await res.json();
                    this.autoUpdateEnabled = data.enabled;
                    this.showToast(`Auto-Update Engine is now ${data.enabled ? 'ACTIVE (Live)' : 'PAUSED'}`, 'Engine Status');
                    this.updateStatusPill();
                }
            } catch (err) {
                this.showToast('Failed to reach Python backend', 'Error');
            }
        },

        async triggerManualTick() {
            try {
                this.showToast('Triggering immediate auto-update tick...', 'Sync Request');
                const res = await fetch(this.getApiUrl('/auto-update/tick'), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.tick && data.tick.summary) {
                        this.showToast(`✓ ${data.tick.summary}`, data.tick.module || 'Auto-Update');
                    }
                }
            } catch (err) {
                this.showToast('Could not trigger backend tick', 'Error');
            }
        },

        injectTopBarPill() {
            if (document.getElementById('pythonBackendPill')) return;

            const pill = document.createElement('div');
            pill.id = 'pythonBackendPill';
            pill.className = 'python-backend-pill';
            pill.innerHTML = `
                <div class="backend-pill-content" id="backendPillContent" title="Python Backend Auto-Update Engine (Always Active)">
                    <span class="backend-dot" id="backendStatusDot"></span>
                    <span class="backend-label" id="backendStatusLabel">Python Live</span>
                    <span class="backend-badge" id="backendVersionBadge">v1</span>
                    <button type="button" class="backend-btn" id="backendManualSyncBtn" title="Instant Sync / Trigger tick">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            `;

            // Insert into top bar if exists, else append to body
            const topbarActions = document.querySelector('.topbar-right')
                || document.querySelector('.topbar-actions')
                || document.querySelector('.header-actions')
                || document.querySelector('.header-top > div:last-child')
                || document.querySelector('.header-top')
                || document.querySelector('.header-right')
                || document.querySelector('header');

            if (topbarActions) {
                topbarActions.insertBefore(pill, topbarActions.firstChild);
            } else {
                document.body.appendChild(pill);
            }

            // Bind manual sync button
            document.getElementById('backendManualSyncBtn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = e.currentTarget.querySelector('i');
                if (icon) icon.classList.add('fa-spin');
                this.triggerManualTick().finally(() => {
                    setTimeout(() => { if (icon) icon.classList.remove('fa-spin'); }, 700);
                });
            });

            this.injectStyles();
        },

        updateStatusPill() {
            const dot = document.getElementById('backendStatusDot');
            const label = document.getElementById('backendStatusLabel');
            const badge = document.getElementById('backendVersionBadge');

            if (!dot || !label || !badge) return;

            // Ensure auto updater is always active
            this.autoUpdateEnabled = true;

            if (this.isConnected) {
                dot.className = 'backend-dot connected';
                label.innerText = 'Python Live';
                badge.innerText = `v${this.version}`;
                badge.style.display = 'inline-block';
            } else {
                dot.className = 'backend-dot disconnected';
                label.innerText = 'Python (Cache)';
                badge.innerText = `v${this.version || 1}`;
            }
        },

        injectToastContainer() {
            if (document.getElementById('liveToastContainer')) return;
            const container = document.createElement('div');
            container.id = 'liveToastContainer';
            container.className = 'live-toast-container';
            document.body.appendChild(container);
        },

        showToast(message, title = 'Auto-Update') {
            const container = document.getElementById('liveToastContainer');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = 'live-toast animate-slide-in';
            toast.innerHTML = `
                <div class="toast-icon"><i class="fas fa-bolt"></i></div>
                <div class="toast-body">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
                <button type="button" class="toast-close">&times;</button>
            `;

            toast.querySelector('.toast-close').onclick = () => {
                toast.classList.add('animate-fade-out');
                setTimeout(() => toast.remove(), 250);
            };

            container.appendChild(toast);

            // Keep max 4 toasts at once
            while (container.children.length > 4) {
                container.removeChild(container.firstChild);
            }

            // Auto dismiss after 4 seconds
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.classList.add('animate-fade-out');
                    setTimeout(() => toast.remove(), 250);
                }
            }, 4000);
        },

        injectStyles() {
            if (document.getElementById('backendSyncStyles')) return;
            const style = document.createElement('style');
            style.id = 'backendSyncStyles';
            style.textContent = `
                .python-backend-pill {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 6px;
                    font-family: inherit;
                    user-select: none;
                }
                .backend-pill-content {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 3px 8px;
                    border-radius: 16px;
                    background: rgba(10, 41, 26, 0.8);
                    border: 1px solid rgba(212, 175, 55, 0.35);
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    font-size: 11px;
                    color: #FFFFFF;
                    backdrop-filter: blur(8px);
                }
                .backend-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #9ca3af;
                    display: inline-block;
                }
                .backend-dot.connected {
                    background: #10b981;
                    box-shadow: 0 0 6px #10b981;
                    animation: backendPulse 2s infinite;
                }
                .backend-dot.disconnected {
                    background: #f59e0b;
                    box-shadow: 0 0 6px #f59e0b;
                }
                @keyframes backendPulse {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                    70% { transform: scale(1.15); box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }
                .backend-label {
                    font-weight: 600;
                    letter-spacing: 0.01em;
                    font-size: 10.5px;
                }
                .backend-badge {
                    background: rgba(212, 175, 55, 0.2);
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    padding: 1px 5px;
                    border-radius: 6px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #D4AF37;
                }
                .backend-btn {
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    color: #D4AF37;
                    width: 18px;
                    height: 18px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 9.5px;
                    transition: all 0.2s ease;
                }
                .backend-btn:hover {
                    background: rgba(212, 175, 55, 0.25);
                    color: white;
                    transform: scale(1.1);
                }

                /* Toast Notifications */
                .live-toast-container {
                    position: fixed;
                    top: 75px;
                    right: 20px;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    max-width: 380px;
                    pointer-events: none;
                }
                .live-toast {
                    pointer-events: auto;
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 12px 16px;
                    background: rgba(17, 24, 39, 0.94);
                    border: 1px solid rgba(16, 185, 129, 0.4);
                    border-left: 4px solid #10b981;
                    border-radius: 10px;
                    color: #f3f4f6;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(12px);
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .live-toast .toast-icon {
                    color: #10b981;
                    font-size: 1.1rem;
                    margin-top: 1px;
                }
                .live-toast .toast-body {
                    flex: 1;
                }
                .live-toast .toast-title {
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #34d399;
                    margin-bottom: 2px;
                }
                .live-toast .toast-message {
                    font-size: 0.82rem;
                    line-height: 1.35;
                    color: #e5e7eb;
                }
                .live-toast .toast-close {
                    background: none;
                    border: none;
                    color: #9ca3af;
                    font-size: 1.2rem;
                    line-height: 1;
                    cursor: pointer;
                    padding: 0;
                }
                .live-toast .toast-close:hover {
                    color: #ffffff;
                }
                .animate-slide-in {
                    animation: toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-out {
                    animation: toastFadeOut 0.25s forwards;
                }
                @keyframes toastSlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes toastFadeOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    };

    window.BackendSync = BackendSync;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => BackendSync.init());
    } else {
        BackendSync.init();
    }
})();
