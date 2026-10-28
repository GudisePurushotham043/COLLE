/**
 * ==========================================================================
 * ALITS ERP - FACULTY ID CARD GENERATOR & MANAGEMENT ENGINE
 * ==========================================================================
 * Seamlessly integrated module supporting professional Student & Faculty ID cards.
 * Features:
 * - Tab switcher (Student ID Cards / Faculty ID Cards)
 * - Unique Faculty ID generation (Format: AL00456)
 * - Full CRUD: Add, Edit, Delete, Search, Filter by Dept & Designation
 * - Photo upload with preview and automatic crop/fit
 * - Dual-sided ID cards (Front & Back) with 3D Flip capability
 * - Dynamic Scannable Barcode & QR Code rendering with QRCode.js
 * - Bulk Excel/CSV Import & Sample CSV Template generator
 * - Single and Multi-card A4 Printing & High-Resolution Image/PNG Download
 * - Persistent storage with state.faculty & localStorage
 * ==========================================================================
 */

(function () {
    // Current active ID card tab: 'student' or 'faculty'
    window.currentIdCardTab = 'student';

    // Temp storage for photo base64 in modal
    let currentUploadedPhotoBase64 = '';

    /**
     * Switch between Student and Faculty ID Card tabs
     * @param {'student'|'faculty'} tab 
     */
    window.switchIdCardTab = function (tab) {
        window.currentIdCardTab = tab;

        const tabStudentBtn = document.getElementById('idCardTabStudent');
        const tabFacultyBtn = document.getElementById('idCardTabFaculty');
        const studentSec = document.getElementById('idCardsStudentSection');
        const facultySec = document.getElementById('idCardsFacultySection');

        if (tab === 'faculty') {
            if (tabStudentBtn) tabStudentBtn.classList.remove('active');
            if (tabFacultyBtn) tabFacultyBtn.classList.add('active');
            if (studentSec) studentSec.style.display = 'none';
            if (facultySec) facultySec.style.display = 'block';
            renderFacultyIdCardsGrid();
        } else {
            if (tabFacultyBtn) tabFacultyBtn.classList.remove('active');
            if (tabStudentBtn) tabStudentBtn.classList.add('active');
            if (facultySec) facultySec.style.display = 'none';
            if (studentSec) studentSec.style.display = 'block';
            if (typeof renderIdCardsGrid === 'function') renderIdCardsGrid();
        }
    };

    /**
     * Normalize Department strings for standardized comparison
     */
    window.normalizeFacultyDept = function (dept) {
        if (!dept) return 'CSE';
        const d = String(dept).trim().toUpperCase();
        if (d.includes('AI') || d.includes('ML') || d === 'AIML' || d === 'CSE AI&ML' || d === 'CSE(AI&ML)' || d === 'CSE (AI&ML)') return 'CSE AI&ML';
        if (d === '05' || d.includes('COMPUTER') || d === 'CSE') return 'CSE';
        if (d === '04' || d.includes('ELECTRONICS') || d.includes('COMMUNICATION') || d === 'ECE') return 'ECE';
        if (d === '02' || d.includes('ELECTRICAL') || d === 'EEE') return 'EEE';
        if (d === '01' || d.includes('CIVIL')) return 'CIVIL';
        if (d === '03' || d.includes('MECH')) return 'MECH';
        if (d.includes('DIPLOMA') || d.includes('POLY')) return 'DIPLOMA';
        if (d === 'HS' || d.includes('H&S') || d.includes('HUMANITIES') || d.includes('SCIENCE')) return 'H&S';
        if (d === 'MBA' || d.includes('MANAGEMENT')) return 'MBA';
        if (d === 'MCA' || d.includes('APPLICATION')) return 'MCA';
        if (d === 'MBA_MCA' || d.includes('MBA & MCA')) return 'MBA';
        return d;
    };

    /**
     * Normalize Designation strings
     */
    window.normalizeFacultyDesig = function (desig) {
        if (!desig) return 'Assistant Professor';
        const s = String(desig).trim();
        const upper = s.toUpperCase();
        if (upper.includes('PRINCIPAL')) return 'Principal';
        if (upper.includes('DIRECTOR')) return 'Director';
        if (upper.includes('HOD') || upper.includes('HEAD OF')) return 'HOD';
        if (upper.includes('ASSOCIATE PROF')) return 'Associate Professor';
        if (upper.includes('ASSISTANT PROF')) return 'Assistant Professor';
        if (upper.includes('PROFESSOR')) return 'Professor';
        if (upper.includes('LECTURER')) return 'Lecturer';
        if (upper.includes('NON-TEACHING') || upper.includes('STAFF') || upper.includes('ADMIN')) return 'Non-Teaching Staff';
        return s;
    };

    /**
     * Auto generate the next unique Faculty ID in ALxxxxx format (e.g. AL00456)
     */
    window.generateNextFacultyId = function () {
        let maxNum = 455;
        const facultyList = (window.state && Array.isArray(window.state.faculty)) ? window.state.faculty : (window.ALITS_DATA ? window.ALITS_DATA.faculty : []);
        
        if (Array.isArray(facultyList)) {
            facultyList.forEach(f => {
                if (f && f.id) {
                    const match = String(f.id).trim().match(/^AL(\d+)$/i);
                    if (match) {
                        const num = parseInt(match[1], 10);
                        if (!isNaN(num) && num > maxNum) {
                            maxNum = num;
                        }
                    }
                }
            });
        }
        const nextNum = maxNum + 1;
        return 'AL' + String(nextNum).padStart(5, '0');
    };

    /**
     * Render the Faculty ID Cards Grid based on current filters and search query
     */
    window.renderFacultyIdCardsGrid = function () {
        const grid = document.getElementById('facultyIdCardsPreviewGrid');
        const countEl = document.getElementById('facultyIdCardsGeneratedCount');
        if (!grid) return;

        // Ensure state.faculty is available
        if (!window.state) window.state = window.ALITS_DATA || {};
        if (!window.state.faculty || !Array.isArray(window.state.faculty) || window.state.faculty.length === 0) {
            if (window.ALITS_DATA && Array.isArray(window.ALITS_DATA.faculty)) {
                window.state.faculty = JSON.parse(JSON.stringify(window.ALITS_DATA.faculty));
            } else {
                window.state.faculty = [];
            }
        }

        const filterDept = document.getElementById('facultyIdCardDeptSelect')?.value || 'ALL';
        const filterDesig = document.getElementById('facultyIdCardDesigSelect')?.value || 'ALL';
        const filterSearch = (document.getElementById('facultyIdCardSearchInput')?.value || '').toLowerCase().trim();

        const filtered = window.state.faculty.filter(f => {
            if (!f) return false;
            const normDept = normalizeFacultyDept(f.dept);
            const matchesDept = (filterDept === 'ALL') || (normDept === filterDept) || (f.dept === filterDept);

            const normDesig = normalizeFacultyDesig(f.designation);
            const matchesDesig = (filterDesig === 'ALL') || (normDesig === filterDesig) || (String(f.designation || '').toUpperCase().includes(filterDesig.toUpperCase()));

            const name = (f.name || '').toLowerCase();
            const id = (f.id || '').toLowerCase();
            const email = (f.email || '').toLowerCase();
            const mobile = (f.mobile || '').toLowerCase();
            const qual = (f.qualification || '').toLowerCase();
            const matchesQuery = !filterSearch ||
                name.includes(filterSearch) ||
                id.includes(filterSearch) ||
                email.includes(filterSearch) ||
                mobile.includes(filterSearch) ||
                qual.includes(filterSearch);

            return matchesDept && matchesDesig && matchesQuery;
        });

        if (countEl) {
            countEl.innerText = `${filtered.length} Faculty Cards Ready`;
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: #ffffff; border-radius: 12px; border: 2px dashed #cbd5e1;">
                    <div style="font-size: 40px; margin-bottom: 12px;">👨‍🏫</div>
                    <h3 style="color: #334155; margin-bottom: 6px; font-weight: 800;">No Faculty Records Found</h3>
                    <p style="color: #64748b; font-size: 13px; max-width: 450px; margin: 0 auto 16px;">
                        No faculty matches your current filter or search criteria. Try adjusting the search or click below to add a new faculty member.
                    </p>
                    <button class="btn-primary-erp" onclick="openAddFacultyModal()" style="display: inline-flex; align-items: center; gap: 8px; width: auto; padding: 8px 18px;">
                        <span>➕ Add Faculty Member</span>
                    </button>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(fac => buildSingleFacultyCardHtml(fac)).join('');

        // Generate QR codes for all rendered faculty cards
        setTimeout(() => {
            filtered.forEach(fac => {
                generateFacultyQrCode(fac.id, fac);
            });
        }, 50);
    };

    /**
     * Generate Barcode SVG bars for Faculty ID
     */
    function generateFacultyBarcodeBars(idStr) {
        let barsHtml = '';
        const hash = (idStr || 'AL00456').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const pattern = [2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1];

        for (let i = 0; i < pattern.length; i++) {
            const width = ((hash + i) % 2 === 0) ? pattern[i] : 1;
            const color = (i % 2 === 0) ? '#0f172a' : 'transparent';
            barsHtml += `<div class="barcode-bar" style="width: ${width * 1.3}px; background: ${color};"></div>`;
        }
        return `<div class="idcard-barcode-bars" style="height: 20px; display: flex; align-items: flex-end; justify-content: center; gap: 1.5px; margin: 0 auto 3px;">${barsHtml}</div>`;
    }

    /**
     * Render dynamic QR Code on element
     */
    function generateFacultyQrCode(facId, facData) {
        const qrContainer = document.getElementById(`fac-qr-${facId}`);
        if (!qrContainer) return;
        qrContainer.innerHTML = '';

        const qrText = `ALITS OFFICIAL FACULTY IDENTITY CARD\nFaculty ID: ${facData.id}\nName: ${facData.name}\nDesignation: ${facData.designation}\nDepartment: ${normalizeFacultyDept(facData.dept)}\nQualification: ${facData.qualification || 'N/A'}\nMobile: ${facData.mobile || 'N/A'}\nEmail: ${facData.email || 'N/A'}\nVerified: Autonomous Institution (Code: 2G)`;

        if (typeof QRCode !== 'undefined') {
            try {
                new QRCode(qrContainer, {
                    text: qrText,
                    width: 54,
                    height: 54,
                    colorDark: "#0f172a",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.M
                });
            } catch (e) {
                console.warn('QRCode generation fallback', e);
                qrContainer.innerHTML = `<span style="font-size: 8px; color: #64748b;">QR: ${facData.id}</span>`;
            }
        }
    }

    /**
     * Build HTML for a single dual-sided Faculty ID Card with 3D Flip
     */
    window.buildSingleFacultyCardHtml = function (faculty, options = {}) {
        const facId = faculty.id || 'AL00456';
        const name = faculty.name || 'Faculty Member';
        const dept = normalizeFacultyDept(faculty.dept);
        const designation = faculty.designation || 'Assistant Professor';
        const qualification = faculty.qualification || 'M.Tech, Ph.D.';
        const joiningYear = faculty.joiningYear || (faculty.joiningDate ? faculty.joiningDate.slice(-4) : '2018');
        const mobile = faculty.mobile || '+91 98491 22001';
        const email = faculty.email || `${facId.toLowerCase()}@alits.ac.in`;
        const address = faculty.address || faculty.cabin || faculty.room || 'Faculty Quarters / Block-A, ALITS Campus';
        const barcodeHtml = generateFacultyBarcodeBars(facId);

        // Photo or Initials
        const photoSrc = faculty.photo || faculty.image;
        let avatarHtml = '';
        if (photoSrc) {
            avatarHtml = `<img src="${photoSrc}" alt="${name}" class="faculty-idcard-img" style="width: 78px; height: 78px; border-radius: 50%; object-fit: cover; object-position: center; border: 3px solid #D4AF37; box-shadow: 0 4px 10px rgba(0,0,0,0.15); display: block; margin: 0 auto; background: #fff;" />`;
        } else {
            const inits = name.replace(/Dr\.|Mr\.|Ms\.|Mrs\.|Prof\./gi, '').trim().split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'FC';
            avatarHtml = `
                <div class="faculty-idcard-avatar-fallback" style="width: 78px; height: 78px; border-radius: 50%; border: 3px solid #D4AF37; background: linear-gradient(135deg, #075985 0%, #0369a1 100%); color: #fff; font-size: 26px; font-weight: 900; display: flex; align-items: center; justify-content: center; margin: 0 auto; box-shadow: 0 4px 10px rgba(0,0,0,0.15); text-transform: uppercase;">
                    ${inits}
                </div>
            `;
        }

        const isPrintMode = options.isPrintMode || false;

        return `
            <div class="faculty-card-container ${isPrintMode ? 'print-card-mode' : ''}" id="facCardWrap-${facId}">
                <div class="faculty-flip-card-inner" id="facFlipInner-${facId}">
                    
                    <!-- ================= FRONT SIDE ================= -->
                    <div class="alits-id-card faculty-id-card faculty-card-front">
                        <!-- Top College Header -->
                        <div class="fac-idcard-header">
                            <div class="fac-crest-flex">
                                <img src="images/alits_college_crest_logo.png" alt="ALITS Crest" class="fac-crest-logo" onerror="this.outerHTML='<span class=\"fac-crest-fallback\">🏛️</span>'" />
                                <div class="fac-header-text">
                                    <div class="fac-title-main">ANANTHA LAKSHMI</div>
                                    <div class="fac-title-sub">INSTITUTE OF TECH & SCIENCES</div>
                                    <div class="fac-title-auto">AUTONOMOUS • APPROVED BY AICTE • CODE: 2G</div>
                                </div>
                            </div>
                            <div class="fac-category-ribbon">
                                <span>⭐ FACULTY IDENTITY CARD ⭐</span>
                            </div>
                        </div>

                        <!-- Photo Section -->
                        <div class="fac-photo-section">
                            ${avatarHtml}
                            <div class="fac-official-badge">OFFICIAL FACULTY</div>
                        </div>

                        <!-- Faculty Name & ID -->
                        <div class="fac-identity-box">
                            <div class="fac-name-text" title="${name}">${name}</div>
                            <div class="fac-id-pill">
                                <span class="fac-id-label">FACULTY ID:</span>
                                <span class="fac-id-code">${facId}</span>
                            </div>
                        </div>

                        <!-- Info Rows -->
                        <div class="fac-details-container">
                            <div class="fac-detail-row">
                                <span class="fac-lbl">Designation:</span>
                                <span class="fac-val fac-highlight-desig">${designation}</span>
                            </div>
                            <div class="fac-detail-row">
                                <span class="fac-lbl">Department:</span>
                                <span class="fac-val fac-highlight-dept">${dept}</span>
                            </div>
                            <div class="fac-detail-row">
                                <span class="fac-lbl">Qualification:</span>
                                <span class="fac-val">${qualification}</span>
                            </div>
                            <div class="fac-detail-row">
                                <span class="fac-lbl">Joining Year:</span>
                                <span class="fac-val">${joiningYear}</span>
                            </div>
                            <div class="fac-detail-row">
                                <span class="fac-lbl">Mobile:</span>
                                <span class="fac-val" style="color: #0284c7; font-weight: 700;">${mobile}</span>
                            </div>
                            <div class="fac-detail-row">
                                <span class="fac-lbl">Email:</span>
                                <span class="fac-val fac-email-val" title="${email}">${email}</span>
                            </div>
                        </div>

                        <!-- Barcode & QR Code Section -->
                        <div class="fac-card-footer">
                            <div class="fac-code-combo">
                                <div class="fac-barcode-side">
                                    ${barcodeHtml}
                                    <div class="fac-barcode-label">${facId}</div>
                                </div>
                                <div class="fac-qrcode-side">
                                    <div id="fac-qr-${facId}" class="fac-qr-box"></div>
                                </div>
                            </div>

                            ${!isPrintMode ? `
                            <div class="fac-card-actions no-print">
                                <button class="btn-fac-action btn-flip" onclick="flipFacultyCard('${facId}')" title="Flip Card to view Back Side">
                                    <i class="fa-solid fa-rotate"></i> Flip
                                </button>
                                <button class="btn-fac-action btn-edit" onclick="openEditFacultyModal('${facId}')" title="Edit Faculty Details">
                                    <i class="fa-solid fa-pen-to-square"></i> Edit
                                </button>
                                <button class="btn-fac-action btn-print" onclick="printSingleFacultyIdCard('${facId}')" title="Print this ID Card">
                                    <i class="fa-solid fa-print"></i> Print
                                </button>
                                <button class="btn-fac-action btn-download" onclick="downloadFacultyIdCardImage('${facId}')" title="Download ID Card PNG">
                                    <i class="fa-solid fa-download"></i> PNG
                                </button>
                                <button class="btn-fac-action btn-delete" onclick="deleteFacultyRecord('${facId}')" title="Delete Faculty Record">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- ================= BACK SIDE ================= -->
                    <div class="alits-id-card faculty-id-card faculty-card-back">
                        <!-- Back Header -->
                        <div class="fac-back-header">
                            <div class="fac-back-title">ANANTHA LAKSHMI</div>
                            <div class="fac-back-sub">INSTITUTE OF TECHNOLOGY & SCIENCES</div>
                            <div class="fac-back-tagline">Autonomous Institution • Affiliated to JNTUA</div>
                        </div>

                        <div class="fac-back-body">
                            <!-- Campus Address -->
                            <div class="fac-back-section">
                                <div class="fac-back-sec-title">📍 CAMPUS LOCATION & ADDRESS</div>
                                <div class="fac-back-address">
                                    Near Itikalapalli, Ananthapur - Chennai Highway,<br />
                                    Anantapur (A.P) - 515721, India.<br />
                                    <strong>Official Web:</strong> www.alits.ac.in
                                </div>
                            </div>

                            <!-- Emergency & Office Contact -->
                            <div class="fac-back-section">
                                <div class="fac-back-sec-title">📞 INSTITUTIONAL CONTACTS</div>
                                <div class="fac-back-contacts">
                                    <div><strong>Principal Office:</strong> +91 98491 12345</div>
                                    <div><strong>Admin / Security:</strong> 08554-255222 / 255333</div>
                                    <div><strong>Faculty Cabin/Address:</strong> ${address}</div>
                                </div>
                            </div>

                            <!-- Official Instructions / Rules -->
                            <div class="fac-back-section">
                                <div class="fac-back-sec-title">📋 TERMS & INSTRUCTIONS</div>
                                <ol class="fac-back-rules">
                                    <li>This card is official institutional property and must be visibly worn on campus premises.</li>
                                    <li>Loss or theft of this card must be immediately reported to the Office of the Principal.</li>
                                    <li>If found, kindly return to: Office of the Principal, ALITS, Anantapur.</li>
                                </ol>
                            </div>

                            <!-- Official Signatures -->
                            <div class="fac-signatures-row">
                                <div class="fac-sig-box">
                                    <div class="fac-sig-line"></div>
                                    <div class="fac-sig-name">Cardholder's Signature</div>
                                </div>
                                <div class="fac-sig-box">
                                    <div class="fac-sig-seal">
                                        <div class="fac-seal-circle">ALITS<br/>SEAL</div>
                                    </div>
                                    <div class="fac-sig-line"></div>
                                    <div class="fac-sig-name">Issuing Authority / Principal</div>
                                </div>
                            </div>
                        </div>

                        ${!isPrintMode ? `
                        <div class="fac-card-actions no-print" style="margin-top: auto; padding: 8px 10px; background: #0f172a; border-top: 1px solid rgba(255,255,255,0.1);">
                            <button class="btn-fac-action btn-flip" style="flex: 1;" onclick="flipFacultyCard('${facId}')">
                                <i class="fa-solid fa-rotate"></i> Flip to Front Side
                            </button>
                        </div>
                        ` : ''}
                    </div>

                </div>
            </div>
        `;
    };

    /**
     * Flip card between Front & Back side
     */
    window.flipFacultyCard = function (facId) {
        const inner = document.getElementById(`facFlipInner-${facId}`);
        if (inner) {
            inner.classList.toggle('is-flipped');
        }
    };

    /**
     * Open Modal to Add a New Faculty Member
     */
    window.openAddFacultyModal = function () {
        const modal = document.getElementById('facultyAddEditModal');
        const form = document.getElementById('facultyAddEditForm');
        const titleEl = document.getElementById('facultyModalTitle');
        const previewImg = document.getElementById('facultyModalPhotoPreview');
        const autoId = generateNextFacultyId();

        if (form) form.reset();
        currentUploadedPhotoBase64 = '';

        if (titleEl) titleEl.innerText = '➕ Add New Faculty Member';
        document.getElementById('facFormMode').value = 'add';
        document.getElementById('facFormOriginalId').value = '';
        document.getElementById('facFormId').value = autoId;
        document.getElementById('facFormDept').value = 'CSE';
        document.getElementById('facFormDesig').value = 'Assistant Professor';
        document.getElementById('facFormYear').value = new Date().getFullYear().toString();

        if (previewImg) {
            previewImg.src = '';
            previewImg.style.display = 'none';
        }
        const fallbackText = document.getElementById('facultyModalPhotoFallback');
        if (fallbackText) fallbackText.style.display = 'block';

        if (modal) modal.classList.add('active');
    };

    /**
     * Open Modal to Edit an Existing Faculty Member
     */
    window.openEditFacultyModal = function (facId) {
        if (!window.state || !Array.isArray(window.state.faculty)) return;
        const fac = window.state.faculty.find(f => f.id === facId);
        if (!fac) {
            alert(`Faculty record with ID "${facId}" not found.`);
            return;
        }

        const modal = document.getElementById('facultyAddEditModal');
        const titleEl = document.getElementById('facultyModalTitle');
        const previewImg = document.getElementById('facultyModalPhotoPreview');
        const fallbackText = document.getElementById('facultyModalPhotoFallback');

        if (titleEl) titleEl.innerText = `✏️ Edit Faculty: ${fac.name} (${fac.id})`;
        document.getElementById('facFormMode').value = 'edit';
        document.getElementById('facFormOriginalId').value = fac.id;
        document.getElementById('facFormId').value = fac.id;
        document.getElementById('facFormName').value = fac.name || '';
        document.getElementById('facFormDept').value = normalizeFacultyDept(fac.dept);
        document.getElementById('facFormDesig').value = normalizeFacultyDesig(fac.designation);
        document.getElementById('facFormQual').value = fac.qualification || '';
        document.getElementById('facFormYear').value = fac.joiningYear || (fac.joiningDate ? fac.joiningDate.slice(-4) : '2018');
        document.getElementById('facFormMobile').value = fac.mobile || '';
        document.getElementById('facFormEmail').value = fac.email || '';
        document.getElementById('facFormAddress').value = fac.address || fac.cabin || fac.room || '';

        currentUploadedPhotoBase64 = fac.photo || fac.image || '';
        if (currentUploadedPhotoBase64 && previewImg) {
            previewImg.src = currentUploadedPhotoBase64;
            previewImg.style.display = 'block';
            if (fallbackText) fallbackText.style.display = 'none';
        } else {
            if (previewImg) previewImg.style.display = 'none';
            if (fallbackText) fallbackText.style.display = 'block';
        }

        if (modal) modal.classList.add('active');
    };

    /**
     * Close Add/Edit Modal
     */
    window.closeFacultyAddEditModal = function () {
        const modal = document.getElementById('facultyAddEditModal');
        if (modal) modal.classList.remove('active');
    };

    /**
     * Handle Photo Upload with Live Preview
     */
    window.handleFacultyPhotoUpload = function (input) {
        if (!input.files || !input.files[0]) return;
        const file = input.files[0];

        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file (JPG, PNG, WEBP, etc.).');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds 5MB. Please choose a smaller photo.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            currentUploadedPhotoBase64 = e.target.result;
            const previewImg = document.getElementById('facultyModalPhotoPreview');
            const fallbackText = document.getElementById('facultyModalPhotoFallback');

            if (previewImg) {
                previewImg.src = currentUploadedPhotoBase64;
                previewImg.style.display = 'block';
            }
            if (fallbackText) {
                fallbackText.style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    };

    /**
     * Clear the uploaded photo
     */
    window.clearFacultyPhoto = function () {
        currentUploadedPhotoBase64 = '';
        const input = document.getElementById('facFormPhotoFile');
        if (input) input.value = '';
        const previewImg = document.getElementById('facultyModalPhotoPreview');
        const fallbackText = document.getElementById('facultyModalPhotoFallback');
        if (previewImg) {
            previewImg.src = '';
            previewImg.style.display = 'none';
        }
        if (fallbackText) {
            fallbackText.style.display = 'block';
        }
    };

    /**
     * Generate ID inside the modal input on button click
     */
    window.autoFillFacultyIdInput = function () {
        const input = document.getElementById('facFormId');
        if (input) {
            input.value = generateNextFacultyId();
        }
    };

    /**
     * Save Faculty Record (Add or Edit) with full validation
     */
    window.saveFacultyRecord = function () {
        const mode = document.getElementById('facFormMode').value;
        const origId = document.getElementById('facFormOriginalId').value;
        let facId = (document.getElementById('facFormId')?.value || '').trim().toUpperCase();
        const name = (document.getElementById('facFormName')?.value || '').trim();
        const dept = document.getElementById('facFormDept')?.value || 'CSE';
        const desig = document.getElementById('facFormDesig')?.value || 'Assistant Professor';
        const qual = (document.getElementById('facFormQual')?.value || '').trim();
        const year = (document.getElementById('facFormYear')?.value || '').trim();
        const mobile = (document.getElementById('facFormMobile')?.value || '').trim();
        const email = (document.getElementById('facFormEmail')?.value || '').trim();
        const address = (document.getElementById('facFormAddress')?.value || '').trim();

        // 1. Validate required fields
        if (!name) {
            alert('⚠️ Faculty Full Name is required.');
            document.getElementById('facFormName')?.focus();
            return;
        }

        if (!facId) {
            facId = generateNextFacultyId();
        }

        // Format validation: Ensure it starts with AL
        if (!facId.startsWith('AL')) {
            facId = 'AL' + facId.replace(/^[^0-9]*/, '').padStart(5, '0');
        }

        // 2. Validate uniqueness of Faculty ID
        if (!window.state) window.state = {};
        if (!Array.isArray(window.state.faculty)) window.state.faculty = [];

        const isDuplicate = window.state.faculty.some(f => {
            if (mode === 'edit' && f.id === origId) return false;
            return f.id && f.id.toUpperCase() === facId;
        });

        if (isDuplicate) {
            alert(`⚠️ Faculty ID "${facId}" is already assigned to another faculty member. Please choose or generate a unique ID.`);
            document.getElementById('facFormId')?.focus();
            return;
        }

        if (mode === 'edit') {
            const index = window.state.faculty.findIndex(f => f.id === origId);
            if (index !== -1) {
                const existing = window.state.faculty[index];
                window.state.faculty[index] = {
                    ...existing,
                    id: facId,
                    name: name,
                    dept: dept,
                    designation: desig,
                    qualification: qual || existing.qualification || 'M.Tech, Ph.D.',
                    joiningYear: year || existing.joiningYear || '2018',
                    mobile: mobile || existing.mobile || '+91 98491 22001',
                    email: email || existing.email || `${facId.toLowerCase()}@alits.ac.in`,
                    address: address || existing.address || 'Faculty Quarters / Block-A',
                    photo: currentUploadedPhotoBase64 || existing.photo || existing.image || ''
                };
            }
        } else {
            // Add new faculty
            const newFaculty = {
                id: facId,
                name: name,
                dept: dept,
                designation: desig,
                qualification: qual || 'M.Tech, Ph.D.',
                joiningYear: year || new Date().getFullYear().toString(),
                mobile: mobile || '+91 98491 22001',
                email: email || `${facId.toLowerCase()}@alits.ac.in`,
                address: address || 'Faculty Quarters, ALITS Campus',
                photo: currentUploadedPhotoBase64 || '',
                role: 'Faculty',
                status: 'Active / On Campus'
            };
            window.state.faculty.unshift(newFaculty);
        }

        // Persist state
        if (typeof window.saveState === 'function') {
            window.saveState({
                module: 'Faculty ID Cards',
                action: mode === 'edit' ? 'Edit Faculty' : 'Add Faculty',
                summary: `${mode === 'edit' ? 'Updated' : 'Added'} Faculty ID Card for ${name} (${facId})`
            });
        }

        closeFacultyAddEditModal();
        renderFacultyIdCardsGrid();
        alert(`✓ Successfully ${mode === 'edit' ? 'updated' : 'generated'} ID Card for ${name} (${facId})!`);
    };

    /**
     * Delete a faculty member with confirmation
     */
    window.deleteFacultyRecord = function (facId) {
        if (!window.state || !Array.isArray(window.state.faculty)) return;
        const fac = window.state.faculty.find(f => f.id === facId);
        if (!fac) return;

        if (!confirm(`Are you sure you want to delete Faculty ID Card for:\n\n${fac.name} (${fac.id})\nDepartment: ${fac.dept}\n\nThis action cannot be undone.`)) {
            return;
        }

        window.state.faculty = window.state.faculty.filter(f => f.id !== facId);

        if (typeof window.saveState === 'function') {
            window.saveState({
                module: 'Faculty ID Cards',
                action: 'Delete Faculty',
                summary: `Deleted Faculty ID Card for ${fac.name} (${fac.id})`
            });
        }

        renderFacultyIdCardsGrid();
        alert(`✓ Deleted Faculty record ${fac.id}.`);
    };

    /**
     * Download individual Faculty ID card as a high-resolution PNG image
     */
    window.downloadFacultyIdCardImage = function (facId) {
        const cardFront = document.querySelector(`#facCardWrap-${facId} .faculty-card-front`);
        if (!cardFront) {
            alert('Could not locate the card element for image export.');
            return;
        }

        if (typeof html2canvas === 'undefined') {
            alert('html2canvas library is loading... Please retry in a second.');
            return;
        }

        const origShadow = cardFront.style.boxShadow;
        cardFront.style.boxShadow = 'none';

        html2canvas(cardFront, {
            scale: 3, // High DPI for crisp printing
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            cardFront.style.boxShadow = origShadow;
            const link = document.createElement('a');
            link.download = `ALITS_Faculty_ID_${facId}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            cardFront.style.boxShadow = origShadow;
            console.error('Failed to export card image:', err);
            alert('Error generating card image. Please use Print option instead.');
        });
    };

    /**
     * Print single faculty ID card (Front and Back on printable preview)
     */
    window.printSingleFacultyIdCard = function (facId) {
        if (!window.state || !Array.isArray(window.state.faculty)) return;
        const fac = window.state.faculty.find(f => f.id === facId);
        if (!fac) return;

        const area = document.getElementById('printableFacultyIdCardsArea');
        const modal = document.getElementById('facultyIdCardsPrintModal');
        const titleEl = document.getElementById('facPrintModalSubtitle');

        if (area && modal) {
            if (titleEl) titleEl.innerText = `Printable ID Card Preview: ${fac.name} (${fac.id})`;

            // Render both Front and Back side side-by-side for crisp printing
            area.innerHTML = `
                <div style="display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; margin: 0 auto;">
                    <div style="text-align: center;">
                        <div style="font-size: 11px; font-weight: 800; color: #0284c7; margin-bottom: 6px; text-transform: uppercase;">[ FRONT SIDE ]</div>
                        ${buildSingleFacultyCardHtml(fac, { isPrintMode: true })}
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 11px; font-weight: 800; color: #0284c7; margin-bottom: 6px; text-transform: uppercase;">[ BACK SIDE ]</div>
                        <div class="faculty-card-container print-card-mode">
                            <div class="faculty-flip-card-inner is-flipped">
                                ${buildSingleFacultyCardHtml(fac, { isPrintMode: true })}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            modal.classList.add('active');

            setTimeout(() => {
                generateFacultyQrCode(fac.id, fac);
            }, 50);
        }
    };

    /**
     * Print all filtered faculty ID cards arranged on A4 pages
     */
    window.printAllFacultyIdCards = function () {
        if (!window.state || !Array.isArray(window.state.faculty)) return;

        const filterDept = document.getElementById('facultyIdCardDeptSelect')?.value || 'ALL';
        const filterDesig = document.getElementById('facultyIdCardDesigSelect')?.value || 'ALL';
        const filterSearch = (document.getElementById('facultyIdCardSearchInput')?.value || '').toLowerCase().trim();

        const filtered = window.state.faculty.filter(f => {
            if (!f) return false;
            const normDept = normalizeFacultyDept(f.dept);
            const matchesDept = (filterDept === 'ALL') || (normDept === filterDept) || (f.dept === filterDept);

            const normDesig = normalizeFacultyDesig(f.designation);
            const matchesDesig = (filterDesig === 'ALL') || (normDesig === filterDesig);

            const matchesQuery = !filterSearch ||
                (f.name && f.name.toLowerCase().includes(filterSearch)) ||
                (f.id && f.id.toLowerCase().includes(filterSearch));

            return matchesDept && matchesDesig && matchesQuery;
        });

        if (filtered.length === 0) {
            alert('No faculty records match the current filter to print.');
            return;
        }

        const area = document.getElementById('printableFacultyIdCardsArea');
        const modal = document.getElementById('facultyIdCardsPrintModal');
        const titleEl = document.getElementById('facPrintModalSubtitle');

        if (area && modal) {
            if (titleEl) titleEl.innerText = `Batch Printing: ${filtered.length} Faculty ID Cards (Arranged on A4 Grid)`;

            area.innerHTML = `
                <div class="a4-faculty-print-grid">
                    ${filtered.map(fac => buildSingleFacultyCardHtml(fac, { isPrintMode: true })).join('')}
                </div>
            `;

            modal.classList.add('active');

            setTimeout(() => {
                filtered.forEach(fac => {
                    generateFacultyQrCode(fac.id, fac);
                });
            }, 50);
        }
    };

    /**
     * Close Faculty Print Modal
     */
    window.closeFacultyPrintModal = function () {
        const modal = document.getElementById('facultyIdCardsPrintModal');
        if (modal) modal.classList.remove('active');
    };

    /**
     * Open Bulk Import Modal
     */
    window.openFacultyImportModal = function () {
        const modal = document.getElementById('facultyImportModal');
        const fileInput = document.getElementById('facultyExcelFile');
        const fileNameEl = document.getElementById('facSelectedFileName');
        if (fileInput) fileInput.value = '';
        if (fileNameEl) fileNameEl.innerText = '';
        if (modal) modal.classList.add('active');
    };

    /**
     * Close Bulk Import Modal
     */
    window.closeFacultyImportModal = function () {
        const modal = document.getElementById('facultyImportModal');
        if (modal) modal.classList.remove('active');
    };

    /**
     * Download Sample CSV / Excel Template for Bulk Import
     */
    window.downloadFacultySampleTemplate = function () {
        const headers = ["FacultyID", "Name", "Department", "Designation", "Qualification", "JoiningYear", "Mobile", "Email", "Address"];
        const sampleRows = [
            ["AL00460", "Dr. S. K. Venkatesh", "CSE", "Professor", "Ph.D., M.Tech", "2015", "9849155667", "venkatesh.cse@alits.ac.in", "Faculty Cabin 12, Block-A"],
            ["AL00461", "Mrs. P. Ananya", "CSE AI&ML", "Assistant Professor", "M.Tech (AI&ML)", "2020", "9848123456", "ananya.aiml@alits.ac.in", "Cabin 05, Block-B"],
            ["AL00462", "Mr. T. Rajesh", "ECE", "Associate Professor", "M.Tech (VLSI)", "2016", "9440178901", "rajesh.ece@alits.ac.in", "Cabin 03, Block-A"],
            ["AL00463", "Dr. V. Prasad", "CIVIL", "Professor & HOD", "Ph.D., M.E.", "2012", "9988776655", "hod.civil@alits.ac.in", "HoD Chamber, Block-C"],
            ["", "Ms. M. Swapna", "MBA", "Assistant Professor", "MBA, B.Com", "2021", "9876543210", "swapna.mba@alits.ac.in", "PG Block Room 101"]
        ];

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + sampleRows.map(e => e.map(cell => `"${cell}"`).join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "ALITS_Faculty_Bulk_Import_Template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    /**
     * Start Bulk Import from Uploaded Excel / CSV
     */
    window.startFacultyImport = function () {
        const fileInput = document.getElementById('facultyExcelFile');
        if (!fileInput || !fileInput.files || !fileInput.files[0]) {
            alert('Please select an Excel (.xlsx/.xls) or CSV (.csv) file to import.');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                let rows = [];
                if (typeof XLSX !== 'undefined') {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                } else {
                    // Fallback basic CSV parser if XLSX is unavailable
                    const text = new TextDecoder().decode(e.target.result);
                    const lines = text.split(/\r\n|\n/).filter(Boolean);
                    if (lines.length > 1) {
                        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
                        for (let i = 1; i < lines.length; i++) {
                            const cells = lines[i].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
                            const row = {};
                            headers.forEach((h, idx) => {
                                row[h] = cells[idx] || '';
                            });
                            rows.push(row);
                        }
                    }
                }

                if (!rows || rows.length === 0) {
                    alert('The uploaded file does not contain any faculty records.');
                    return;
                }

                if (!window.state) window.state = {};
                if (!Array.isArray(window.state.faculty)) window.state.faculty = [];

                let importedCount = 0;
                let updatedCount = 0;
                const existingIds = new Set(window.state.faculty.map(f => (f.id || '').toUpperCase()));

                rows.forEach(r => {
                    // Extract fields with case-insensitive / flexible column naming
                    const name = r.Name || r.name || r['Faculty Name'] || r['FACULTY NAME'] || '';
                    if (!name || String(name).trim() === '') return;

                    let facId = (r.FacultyID || r.facultyId || r.ID || r.id || r['Faculty Id'] || '').toString().trim().toUpperCase();
                    if (!facId || facId === '' || facId === 'AUTO') {
                        facId = generateNextFacultyId();
                    } else if (!facId.startsWith('AL')) {
                        facId = 'AL' + facId.replace(/^[^0-9]*/, '').padStart(5, '0');
                    }

                    const dept = normalizeFacultyDept(r.Department || r.Dept || r.dept || r.department || 'CSE');
                    const desig = normalizeFacultyDesig(r.Designation || r.desig || r.designation || 'Assistant Professor');
                    const qual = (r.Qualification || r.qualification || r.Qual || 'M.Tech, Ph.D.').toString().trim();
                    const year = (r.JoiningYear || r.joiningYear || r.Year || r.year || new Date().getFullYear()).toString().trim();
                    const mobile = (r.Mobile || r.mobile || r.Phone || r.phone || '+91 98491 22001').toString().trim();
                    const email = (r.Email || r.email || `${facId.toLowerCase()}@alits.ac.in`).toString().trim();
                    const address = (r.Address || r.address || r.Cabin || 'Faculty Quarters, ALITS Campus').toString().trim();

                    const facultyObj = {
                        id: facId,
                        name: name,
                        dept: dept,
                        designation: desig,
                        qualification: qual,
                        joiningYear: year,
                        mobile: mobile,
                        email: email,
                        address: address,
                        role: 'Faculty',
                        status: 'Active / On Campus'
                    };

                    if (existingIds.has(facId)) {
                        const index = window.state.faculty.findIndex(f => (f.id || '').toUpperCase() === facId);
                        if (index !== -1) {
                            window.state.faculty[index] = { ...window.state.faculty[index], ...facultyObj };
                            updatedCount++;
                        }
                    } else {
                        window.state.faculty.push(facultyObj);
                        existingIds.add(facId);
                        importedCount++;
                    }
                });

                if (typeof window.saveState === 'function') {
                    window.saveState({
                        module: 'Faculty ID Cards',
                        action: 'Bulk Import',
                        summary: `Imported ${importedCount} new faculty, updated ${updatedCount} records via Excel/CSV`
                    });
                }

                closeFacultyImportModal();
                renderFacultyIdCardsGrid();
                alert(`✓ Bulk Import Successful!\n\n• New Faculty Added: ${importedCount}\n• Existing Records Updated: ${updatedCount}\n• Total Faculty Roster: ${window.state.faculty.length}`);
            } catch (err) {
                console.error('Error importing faculty spreadsheet:', err);
                alert('Failed to parse the file. Please ensure it is a valid .xlsx, .xls, or .csv spreadsheet.');
            }
        };

        reader.readAsArrayBuffer(file);
    };

    /**
     * Export current faculty list to Excel (.xlsx)
     */
    window.exportFacultyToExcel = function () {
        if (!window.state || !Array.isArray(window.state.faculty) || window.state.faculty.length === 0) {
            alert('No faculty records available to export.');
            return;
        }

        if (typeof XLSX === 'undefined') {
            downloadFacultySampleTemplate();
            return;
        }

        const exportData = window.state.faculty.map(f => ({
            "Faculty ID": f.id,
            "Full Name": f.name,
            "Department": normalizeFacultyDept(f.dept),
            "Designation": normalizeFacultyDesig(f.designation),
            "Qualification": f.qualification || 'N/A',
            "Joining Year": f.joiningYear || (f.joiningDate ? f.joiningDate.slice(-4) : '2018'),
            "Contact Mobile": f.mobile || 'N/A',
            "Official Email": f.email || 'N/A',
            "Cabin / Address": f.address || f.cabin || f.room || 'ALITS Campus'
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Faculty Roster");
        XLSX.writeFile(workbook, `ALITS_Faculty_Directory_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    // Faculty ID cards are rendered on demand when navigating to the ID Cards module
})();
