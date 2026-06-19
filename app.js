/* ==========================================================================
   RENTMANAGER APPLICATION CONTROLLER (DYNAMIC SPA EDITION)
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. PRECONFIGURED SYSTEM DATABASE ENGINE ---
  const DEFAULT_DB = {
    users: [
      {
        id: "admin_0",
        role: "admin",
        username: "@jrfarkade",
        password: "@Sahil26",
        name: "System Administrator",
        status: "active"
      }
    ],
    rooms: []
  };

  // --- 2. STATIC SIGN-IN PAGE TEMPLATE ---
  const LOGIN_HTML = `
    <div class="login-wrapper">
      <!-- LEFT PANEL: BRAND & GRAPHIC -->
      <div class="login-brand-side">
        <!-- Hero Background Image -->
        <img src="login_hero.png" alt="Modern Apartments Hero" class="login-hero-img">
        <!-- Dark overlay to ensure text readability -->
        <div class="login-hero-overlay"></div>
        
        <div class="login-brand-content">
          <div class="login-logo-container">
            <svg class="brand-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <div class="brand-meta">
              <span class="brand-title">RentManage</span>
              <span class="brand-subtitle">Smart Rental Management System</span>
            </div>
          </div>

          <div class="login-brand-desc">
            <h1>Welcome <span class="text-highlight-blue">Back!</span></h1>
            <p>Please login to continue to your account</p>
          </div>
        </div>
      </div>

      <!-- RIGHT PANEL: INTERACTIVE SIGN-IN CARD -->
      <div class="login-form-side">
        <!-- Substate 1: Role Selection Grid -->
        <div id="login-role-selector" class="login-substate active">
          <div class="role-selector-card">
            <h2 class="form-title">Login As</h2>
            <p class="form-subtitle">Choose your role to continue</p>
            
            <div class="role-grid">
              <!-- Admin Card -->
              <div class="role-card" onclick="app.showLoginState('admin')">
                <div class="role-icon-wrapper role-admin-color">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3>Admin</h3>
                <p>Manage properties, tenants, payments and system settings</p>
                <button class="role-login-btn btn-admin">Login as Admin &rarr;</button>
              </div>

              <!-- Tenant Card -->
              <div class="role-card" onclick="app.showLoginState('tenant')">
                <div class="role-icon-wrapper role-tenant-color">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <h3>Tenant</h3>
                <p>View your rent details, make payments and raise complaints</p>
                <button class="role-login-btn btn-tenant">Login as Tenant &rarr;</button>
              </div>

              <!-- Owner Card -->
              <div class="role-card" onclick="app.showLoginState('owner')">
                <div class="role-icon-wrapper role-owner-color">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                </div>
                <h3>Owner</h3>
                <p>Manage your properties, tenants and view reports</p>
                <button class="role-login-btn btn-owner">Login as Owner &rarr;</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Substate 2: Admin/Owner Credentials Form -->
        <div id="login-credentials-form" class="login-substate">
          <div class="credentials-card">
            <button class="back-btn" onclick="app.showLoginState('roles')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back
            </button>
            <h2 id="login-form-title" class="form-title">Login</h2>
            <p id="login-form-subtitle" class="form-subtitle">Enter your account credentials to continue</p>
            
            <form id="credentials-form" onsubmit="app.handleLoginSubmit(event)">
              <input type="hidden" id="login-role-input">
              
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" required placeholder="Enter username">
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" required placeholder="Enter password">
              </div>

              <button type="submit" class="btn-primary w-full" id="login-submit-btn">Login &rarr;</button>
            </form>

            <div class="register-promo" id="register-promo-box">
              <p>New Owner? <a href="#" onclick="app.showLoginState('register')">Register Property Owner</a></p>
            </div>
          </div>
        </div>

        <!-- Substate 3: Owner Registration Form -->
        <div id="login-register-owner" class="login-substate">
          <div class="credentials-card">
            <button class="back-btn" onclick="app.showLoginState('roles')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back
            </button>
            <h2 class="form-title">Owner Registration</h2>
            <p class="form-subtitle">Join RentManage to manage your properties</p>
            
            <form id="owner-register-form" onsubmit="app.handleOwnerRegister(event)">
              <div class="form-row-2">
                <div class="form-group">
                  <label for="reg-name">Full Name</label>
                  <input type="text" id="reg-name" required placeholder="Enter Full Name">
                </div>
                <div class="form-group">
                  <label for="reg-phone">Phone Number</label>
                  <input type="tel" id="reg-phone" required placeholder="Enter Phone Number">
                </div>
              </div>

              <div class="form-group">
                <label for="reg-email">Email Address</label>
                <input type="email" id="reg-email" required placeholder="Enter Email Address">
              </div>

              <div class="form-group">
                <label for="reg-property">Property / Building Name</label>
                <input type="text" id="reg-property" required placeholder="Enter Property or Building Name">
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label for="reg-username">Username</label>
                  <input type="text" id="reg-username" required placeholder="Enter Username">
                </div>
                <div class="form-group">
                  <label for="reg-password">Password</label>
                  <input type="password" id="reg-password" required placeholder="Enter Password">
                </div>
              </div>

              <button type="submit" class="btn-primary w-full">Create Owner Account &amp; Register &rarr;</button>
            </form>
          </div>
        </div>

        <!-- Substate 4: Tenant Verification Page (Page 1 requested) -->
        <div id="login-tenant-verify" class="login-substate">
          <div class="credentials-card">
            <button class="back-btn" onclick="app.showLoginState('roles')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back
            </button>
            <h2 class="form-title">Tenant Access</h2>
            <p class="form-subtitle">Enter verification details to retrieve room statements</p>
            
            <form onsubmit="app.handleTenantVerify(event)">
              <div class="form-group">
                <label for="verify-property-code">Owner Property Code</label>
                <input type="text" id="verify-property-code" required placeholder="Enter Property Code">
              </div>

              <div class="form-group">
                <label for="verify-room-number">Room Access ID / Room Number</label>
                <input type="text" id="verify-room-number" required placeholder="Enter Room Number">
              </div>

              <button type="submit" class="btn-primary w-full mt-4 py-3">Verify and Continue &rarr;</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Centered footer on login page -->
    <footer class="login-footer-text">
      &copy; 2026 RentManage. All rights reserved.
    </footer>
  `;

  // --- 3. DYNAMIC HTML TEMPLATE ENGINES ---
  const TEMPLATES = {
    tenantDashboard: (room, owner, ledger, currentMonthTransactionsHTML, billingHistoryRowsHTML) => `
      <div id="view-tenant-dashboard" class="view-section active">
        <header class="dashboard-header">
          <div class="header-left">
            <div class="brand-logo">
              <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <div class="brand-meta">
                <span class="brand-title">RentManage</span>
                <span class="brand-subtitle">Tenant Portal</span>
              </div>
            </div>
          </div>
          <div class="header-right">
            <div class="header-notification">
              <button class="btn-icon-badge" aria-label="Notifications">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span class="badge-dot"></span>
              </button>
            </div>
            <div class="user-profile-menu">
              <div class="avatar">${room.tenantName.charAt(0)}</div>
              <div class="profile-details-text">
                <strong>${room.tenantName}</strong>
                <small>Tenant</small>
              </div>
              <button class="logout-link-btn" onclick="app.logout()" title="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
              </button>
            </div>
          </div>
        </header>

        <main class="dashboard-content">
          <div class="welcome-banner">
            <div class="welcome-text">
              <h2>Welcome, ${room.tenantName}! 👋</h2>
              <p>Here's your room statement for <strong>${room.currentMonth || 'June 2026'}</strong>.</p>
            </div>
            <div class="room-badge-large">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              Room ${room.roomNumber}
            </div>
          </div>

          <div class="grid-2-col">
            <!-- Details Card -->
            <div class="dashboard-card">
              <div class="card-header">
                <div class="card-header-title">
                  <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                  <h3>Room &amp; Tenant Details</h3>
                </div>
              </div>
              <div class="card-body">
                <div class="details-grid">
                  <div class="detail-item">
                    <span class="detail-label">Room Number</span>
                    <span class="detail-value">${room.roomNumber}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Landlord Name</span>
                    <span class="detail-value">${owner.name}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Property Name</span>
                    <span class="detail-value">${owner.propertyName}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Joined On</span>
                    <span class="detail-value">${room.joiningDate}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Monthly Rent</span>
                    <span class="detail-value text-primary font-semibold">₹${room.monthlyRent.toLocaleString()}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Security Deposit</span>
                    <span class="detail-value">₹${(room.securityDeposit || 0).toLocaleString()}</span>
                  </div>
                  <div class="detail-item col-span-2 mt-2 pt-2 border-top">
                    <span class="detail-label">Owner Contact Info</span>
                    <div class="contact-details">
                      <span>📞 ${owner.phone}</span>
                      <span>✉️ ${owner.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Utility Meter Overview -->
            <div class="dashboard-card">
              <div class="card-header">
                <div class="card-header-title">
                  <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  <h3>Utility &amp; Electricity Overview</h3>
                </div>
              </div>
              <div class="card-body">
                <div class="meter-readings-row">
                  <div class="reading-box">
                    <span class="reading-title">Last Reading</span>
                    <strong class="reading-value">${room.initialMeterReading} Unit</strong>
                  </div>
                  <div class="reading-icon">-</div>
                  <div class="reading-box">
                    <span class="reading-title">Current Reading</span>
                    <strong class="reading-value">${room.currentMeterReading} Unit</strong>
                  </div>
                  <div class="reading-icon">=</div>
                  <div class="reading-box bg-highlight">
                    <span class="reading-title">Units Used</span>
                    <strong class="reading-value text-primary">${ledger.unitsUsed} Unit</strong>
                  </div>
                </div>

                <div class="charges-summary-bar">
                  <div class="charge-summary-item">
                    <span>Utility Rate</span>
                    <strong>₹${room.electricityCostPerUnit}/Unit</strong>
                  </div>
                  <div class="charge-summary-separator"></div>
                  <div class="charge-summary-item highlight-box">
                    <span>Total Due Amount</span>
                    <strong class="text-large text-primary">₹${ledger.totalOutstanding.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-2-col mt-6">
            <!-- Statement Breakdown -->
            <div class="dashboard-card">
              <div class="card-header">
                <div class="card-header-title">
                  <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <h3>Bill Ledger (${room.currentMonth || 'June 2026'})</h3>
                </div>
              </div>
              <div class="card-body">
                <table class="breakdown-table">
                  <tbody>
                    <tr>
                      <td>Monthly Base Rent</td>
                      <td class="text-right">₹${room.monthlyRent.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Electricity Charges (${ledger.unitsUsed} Units &times; ₹${room.electricityCostPerUnit})</td>
                      <td class="text-right">₹${ledger.electricityCost.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Previous Due Carried Forward</td>
                      <td class="text-right text-danger">+ ₹${ledger.previousDue.toLocaleString()}</td>
                    </tr>
                    <tr class="border-top">
                      <td><strong>Total Outstanding Amount</strong></td>
                      <td class="text-right"><strong>₹${ledger.totalOutstanding.toLocaleString()}</strong></td>
                    </tr>
                    <tr>
                      <td>Amount Paid this Month</td>
                      <td class="text-right text-success">- ₹${ledger.totalPaid.toLocaleString()}</td>
                    </tr>
                    <tr class="grand-total-row">
                      <td>Remaining Balance Dues</td>
                      <td class="text-right">₹${ledger.remainingBalance.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Payment Status & Quick Pay -->
            <div class="dashboard-card justify-between">
              <div>
                <div class="card-header">
                  <div class="card-header-title">
                    <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    <h3>Payment Status</h3>
                  </div>
                  <span class="status-badge status-${ledger.paymentStatus.toLowerCase().replace(' ', '-')}">${ledger.paymentStatus}</span>
                </div>
                <div class="card-body py-4">
                  <div class="payment-due-date">
                    <span>Outstanding Dues:</span>
                    <strong>₹${ledger.remainingBalance.toLocaleString()}</strong>
                  </div>
                  ${ledger.remainingBalance > 0 
                    ? `<button class="btn-primary w-full mt-4 py-3" onclick="app.payTenantBill()">Pay Dues Now &rarr;</button>`
                    : `<button class="btn-secondary w-full mt-4 py-3" disabled style="opacity:0.6; cursor:not-allowed;">Statement Settled ✓</button>`
                  }
                  <div class="payment-security-note">🔒 Simulated payment transaction.</div>
                </div>
              </div>
              <div class="border-top pt-2">
                <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--color-text-muted); margin-bottom:4px;">Payments Logged this Month</h4>
                ${currentMonthTransactionsHTML}
              </div>
            </div>
          </div>

          <!-- History Table -->
          <div class="dashboard-card mt-6">
            <div class="card-header">
              <div class="card-header-title">
                <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                <h3>Statement History (Finalized Bills)</h3>
              </div>
            </div>
            <div class="card-body no-padding table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Billing Month</th>
                    <th>Base Rent</th>
                    <th>Utility Charges</th>
                    <th>Total Due</th>
                    <th>Status</th>
                    <th>Payment Breakdown</th>
                  </tr>
                </thead>
                <tbody>
                  ${billingHistoryRowsHTML}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    `,

    ownerDashboard: (owner, ownerRooms, totalRooms, occupiedRooms, occPct, totalMonthlyRent, pendingAmount, roomsTabsHTML, roomDetailHTML, recentPaymentsHTML) => `
      <div id="view-owner-dashboard" class="view-section dashboard-layout active">
        <!-- SIDEBAR -->
        <aside class="dashboard-sidebar">
          <div class="sidebar-brand">
            <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <div class="brand-meta">
              <span class="brand-title">RentManage</span>
              <span class="brand-subtitle">Owner Panel</span>
            </div>
          </div>
          
          <nav class="sidebar-nav">
            <a href="#" class="nav-item ${app.ownerActiveTab === 'dashboard' ? 'active' : ''}" onclick="app.setOwnerActiveTab('dashboard')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
              Dashboard
            </a>
            <a href="#" class="nav-item ${app.ownerActiveTab === 'rooms' ? 'active' : ''}" onclick="app.setOwnerActiveTab('rooms')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              Rooms
            </a>
            <a href="#" class="nav-item ${app.ownerActiveTab === 'tenants' ? 'active' : ''}" onclick="app.setOwnerActiveTab('tenants')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              Tenants
            </a>
            <a href="#" class="nav-item ${app.ownerActiveTab === 'bills' ? 'active' : ''}" onclick="app.setOwnerActiveTab('bills')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Bills &amp; Payments
            </a>
          </nav>

          <div class="sidebar-footer">
            <div class="need-help-card">
              <h4>Need Help?</h4>
              <p>We're here to help you manage your property easily.</p>
              <button class="btn-outline-small w-full">📞 Contact Support</button>
            </div>
          </div>
        </aside>

        <!-- MAIN AREA -->
        <div class="dashboard-main">
          <!-- TOPBAR -->
          <header class="topbar">
            <div class="topbar-left">
              <button class="sidebar-toggle-btn" onclick="app.toggleSidebar()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <div class="property-code-indicator">
                <span>Property Code:</span>
                <strong class="code-badge">${owner.propertyCode}</strong>
              </div>
            </div>
            <div class="topbar-right">
              <div class="notification-wrapper">
                <button class="btn-icon-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  <span class="badge-count">2</span>
                </button>
              </div>
              <div class="user-profile-menu">
                <div class="avatar">O</div>
                <div class="profile-details-text">
                  <strong>${owner.name}</strong>
                  <small>Property Owner</small>
                </div>
                <button class="logout-link-btn" onclick="app.logout()" title="Logout">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                </button>
              </div>
            </div>
          </header>

          <div class="main-content-scroll">
            
            <!-- PANEL: DASHBOARD ACTIVE -->
            ${app.ownerActiveTab === 'dashboard' ? `
              <div class="welcome-row">
                <div class="welcome-text">
                  <h2>Welcome back, Owner! 👋</h2>
                  <p>Here's what's happening with your property today.</p>
                </div>
                <button class="btn-primary" onclick="app.openModal('add-room-modal')">Add New Room</button>
              </div>

              <!-- Stats Row -->
              <div class="stats-row">
                <div class="stat-card">
                  <div class="stat-icon-wrapper blue-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg></div>
                  <div class="stat-details">
                    <span class="stat-label">Total Rooms</span>
                    <strong class="stat-number">${totalRooms}</strong>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon-wrapper green-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg></div>
                  <div class="stat-details">
                    <span class="stat-label">Occupied Rooms</span>
                    <strong class="stat-number">${occupiedRooms}</strong>
                    <span class="stat-subtext text-success">${occPct}% Occupied</span>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon-wrapper orange-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                  <div class="stat-details">
                    <span class="stat-label">Monthly rent</span>
                    <strong class="stat-number">₹${totalMonthlyRent.toLocaleString()}</strong>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon-wrapper red-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></div>
                  <div class="stat-details">
                    <span class="stat-label">Pending</span>
                    <strong class="stat-number">₹${pendingAmount.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              <!-- Active room calculations view -->
              <div class="dashboard-card mt-6">
                <div class="card-header">
                  <div class="card-header-title"><h3>Rooms Monitor</h3></div>
                </div>
                <div class="card-body pb-0">
                  <div class="room-tabs-container">${roomsTabsHTML}</div>
                </div>
                <div class="room-details-pane bg-tint" id="owner-room-details-pane">
                  ${roomDetailHTML}
                </div>
              </div>

              <div class="grid-2-col mt-6">
                <div class="dashboard-card">
                  <div class="card-header"><h3>Recent Payments</h3></div>
                  <div class="card-body no-padding table-responsive">
                    <table class="data-table">
                      <thead>
                        <tr><th>Date</th><th>Room</th><th>Tenant</th><th>Amount</th><th>Status</th></tr>
                      </thead>
                      <tbody>
                        ${recentPaymentsHTML}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="dashboard-card">
                  <div class="card-header"><h3>Quick Actions</h3></div>
                  <div class="card-body">
                    <div class="quick-actions-grid">
                      <button class="quick-action-card" onclick="app.openModal('add-room-modal')">
                        <div class="quick-action-icon blue-tint">+</div>
                        <strong>Add Room</strong>
                      </button>
                      <button class="quick-action-card" onclick="app.setOwnerActiveTab('rooms')">
                        <div class="quick-action-icon green-tint">☷</div>
                        <strong>Manage Rooms</strong>
                      </button>
                      <button class="quick-action-card" onclick="app.openUpdateReadingModalFromQuick()">
                        <div class="quick-action-icon orange-tint">⚡</div>
                        <strong>Add Reading</strong>
                      </button>
                      <button class="quick-action-card" onclick="app.ownerGenerateBillQuick()">
                        <div class="quick-action-icon red-tint">⎀</div>
                        <strong>Generate Bill</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- PANEL: ROOMS ACTIVE -->
            ${app.ownerActiveTab === 'rooms' ? `
              <div class="welcome-row">
                <div class="welcome-text">
                  <h2>Manage Rooms &amp; Leases</h2>
                  <p>View, edit, or delete room configurations and tenants</p>
                </div>
                <button class="btn-primary" onclick="app.openModal('add-room-modal')">Add New Room</button>
              </div>
              <div class="dashboard-card">
                <div class="card-body no-padding table-responsive">
                  <table class="data-table">
                    <thead>
                      <tr><th>Room ID</th><th>Room Number</th><th>Tenant</th><th>Rent</th><th>Meter Reading</th><th>Status</th><th class="text-center">Actions</th></tr>
                    </thead>
                    <tbody id="owner-rooms-table-rows"></tbody>
                  </table>
                </div>
              </div>
            ` : ''}

            <!-- PANEL: TENANTS ACTIVE -->
            ${app.ownerActiveTab === 'tenants' ? `
              <div class="welcome-row">
                <div class="welcome-text">
                  <h2>Tenants Database</h2>
                  <p>Consolidated directory of active property tenants</p>
                </div>
              </div>
              <div class="dashboard-card">
                <div class="card-body no-padding table-responsive">
                  <table class="data-table">
                    <thead>
                      <tr><th>Tenant Name</th><th>Room</th><th>Joining Date</th><th>Security Deposit</th><th>Rent (Base)</th><th>Electricity</th><th>Status</th></tr>
                    </thead>
                    <tbody id="owner-tenants-table-rows"></tbody>
                  </table>
                </div>
              </div>
            ` : ''}

            <!-- PANEL: BILLS ACTIVE -->
            ${app.ownerActiveTab === 'bills' ? `
              <div class="welcome-row">
                <div class="welcome-text">
                  <h2>Bills &amp; Invoices</h2>
                  <p>Track historical invoices and payment settlements</p>
                </div>
              </div>
              <div class="dashboard-card">
                <div class="card-body no-padding table-responsive">
                  <table class="data-table">
                    <thead>
                      <tr><th>Month</th><th>Room</th><th>Tenant</th><th>Base Rent</th><th>Utility Charges</th><th>Total Invoice</th><th>Status</th><th>Settled On</th><th>Action</th></tr>
                    </thead>
                    <tbody id="owner-bills-table-rows"></tbody>
                  </table>
                </div>
              </div>
            ` : ''}

          </div>
        </div>
      </div>

      <!-- MODALS PORTAL -->
      <div id="add-room-modal" class="modal-backdrop">
        <div class="modal-card">
          <div class="modal-header"><h3>Add New Room</h3><button class="close-btn" onclick="app.closeModal('add-room-modal')">&times;</button></div>
          <form id="add-room-form" onsubmit="app.handleAddRoomSubmit(event)">
            <div class="modal-body">
              <div class="form-row-2">
                <div class="form-group"><label>Room Number *</label><input type="text" id="room-num" required placeholder="Enter Room Number"></div>
                <div class="form-group"><label>Monthly Rent (₹) *</label><input type="number" id="room-rent" required placeholder="Enter Monthly Rent" min="0"></div>
              </div>
              <div class="form-row-2">
                <div class="form-group"><label>Tenant Name *</label><input type="text" id="room-tenant" required placeholder="Enter Tenant Name"></div>
                <div class="form-group"><label>Joining Date *</label><input type="date" id="room-join" required></div>
              </div>
              <div class="form-row-3">
                <div class="form-group"><label>Initial Meter (Unit) *</label><input type="number" id="room-meter-init" required placeholder="Enter Initial Meter Reading" min="0"></div>
                <div class="form-group"><label>Cost Per Unit (₹) *</label><input type="number" id="room-elec-cost" required min="0" step="0.1" placeholder="Enter Cost Per Unit"></div>
                <div class="form-group"><label>Security Deposit (₹)</label><input type="number" id="room-deposit" placeholder="Enter Security Deposit" min="0"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-secondary" onclick="app.closeModal('add-room-modal')">Cancel</button>
              <button type="submit" class="btn-primary">Create Room &amp; Assign Tenant</button>
            </div>
          </form>
        </div>
      </div>

      <div id="update-reading-modal" class="modal-backdrop">
        <div class="modal-card">
          <div class="modal-header"><h3>Update Electricity Reading</h3><button class="close-btn" onclick="app.closeModal('update-reading-modal')">&times;</button></div>
          <form id="update-reading-form" onsubmit="app.handleUpdateReadingSubmit(event)">
            <input type="hidden" id="reading-room-id">
            <div class="modal-body">
              <div class="reading-info-strip">
                <div>Room: <strong id="reading-room-num-text"></strong></div>
                <div>Tenant: <strong id="reading-tenant-name-text"></strong></div>
              </div>
              <div class="form-group"><label>Previous Meter Reading (Unit)</label><input type="number" id="reading-prev" disabled class="bg-disabled"></div>
              <div class="form-group"><label>Current Meter Reading (Unit) *</label><input type="number" id="reading-curr" required placeholder="Enter new reading" min="0"><small class="input-hint text-warning" id="reading-warning-text"></small></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-secondary" onclick="app.closeModal('update-reading-modal')">Cancel</button>
              <button type="submit" class="btn-primary">Save Utility Value</button>
            </div>
          </form>
        </div>
      </div>

      <div id="edit-room-modal" class="modal-backdrop">
        <div class="modal-card">
          <div class="modal-header"><h3>Edit Tenant details</h3><button class="close-btn" onclick="app.closeModal('edit-room-modal')">&times;</button></div>
          <form id="edit-room-form" onsubmit="app.handleEditRoomSubmit(event)">
            <input type="hidden" id="edit-room-id">
            <div class="modal-body">
              <div class="form-row-2">
                <div class="form-group"><label>Room Number *</label><input type="text" id="edit-room-num" required></div>
                <div class="form-group"><label>Monthly Rent (₹) *</label><input type="number" id="edit-room-rent" required min="0"></div>
              </div>
              <div class="form-row-2">
                <div class="form-group"><label>Tenant Name *</label><input type="text" id="edit-room-tenant" required></div>
                <div class="form-group"><label>Joining Date *</label><input type="date" id="edit-room-join" required></div>
              </div>
              <div class="form-row-3">
                <div class="form-group"><label>Initial Meter (Unit) *</label><input type="number" id="edit-room-meter-init" required min="0"></div>
                <div class="form-group"><label>Cost Per Unit (₹) *</label><input type="number" id="edit-room-elec-cost" required min="0" step="0.1"></div>
                <div class="form-group"><label>Security Deposit (₹)</label><input type="number" id="edit-room-deposit" min="0"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-secondary" onclick="app.closeModal('edit-room-modal')">Cancel</button>
              <button type="submit" class="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <div id="record-payment-modal" class="modal-backdrop">
        <div class="modal-card">
          <div class="modal-header"><h3>Record Tenant Payment</h3><button class="close-btn" onclick="app.closeModal('record-payment-modal')">&times;</button></div>
          <form id="record-payment-form" onsubmit="app.handleRecordPaymentSubmit(event)">
            <input type="hidden" id="record-payment-room-id">
            <div class="modal-body">
              <div class="reading-info-strip">
                <div>Room: <strong id="record-payment-room-num-text"></strong></div>
                <div>Tenant: <strong id="record-payment-tenant-name-text"></strong></div>
              </div>
              <div class="reading-info-strip" style="flex-direction:column; gap:4px; align-items:stretch; margin-top:-8px; margin-bottom:16px;">
                <div style="display:flex; justify-content:space-between; font-size:0.85rem;"><span>Total Bill Amount:</span><strong id="record-payment-total-text">₹0</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem;"><span>Already Paid:</span><strong id="record-payment-paid-text" class="text-success">₹0</strong></div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; border-top:1px dashed var(--color-border); padding-top:4px; margin-top:4px;"><span>Remaining Balance:</span><strong id="record-payment-remaining-text" class="text-primary">₹0</strong></div>
              </div>
              <div class="form-group">
                <label>Amount Paid (₹) *</label>
                <input type="number" id="record-payment-amount" required placeholder="Enter amount paid" min="1">
              </div>
              <div class="form-group">
                <label>Payment Date *</label>
                <input type="date" id="record-payment-date" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-secondary" onclick="app.closeModal('record-payment-modal')">Cancel</button>
              <button type="submit" class="btn-primary">Record Payment</button>
            </div>
          </form>
        </div>
      </div>

      <div id="edit-payment-modal" class="modal-backdrop">
        <div class="modal-card">
          <div class="modal-header"><h3>Edit Payment Transaction</h3><button class="close-btn" onclick="app.closeModal('edit-payment-modal')">&times;</button></div>
          <form id="edit-payment-form" onsubmit="app.handleEditPaymentSubmit(event)">
            <input type="hidden" id="edit-payment-room-id">
            <input type="hidden" id="edit-payment-id">
            <div class="modal-body">
              <div class="form-group">
                <label>Amount Paid (₹) *</label>
                <input type="number" id="edit-payment-amount" required placeholder="Enter amount paid" min="1">
              </div>
              <div class="form-group">
                <label>Payment Date *</label>
                <input type="date" id="edit-payment-date" required>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-secondary" onclick="app.closeModal('edit-payment-modal')">Cancel</button>
              <button type="submit" class="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    `,

    adminDashboard: (ownersHTML, roomsHTML, totalOwners, totalRooms, activeLeases, systemVolume) => `
      <div id="view-admin-dashboard" class="view-section dashboard-layout active">
        <!-- SIDEBAR -->
        <aside class="dashboard-sidebar">
          <div class="sidebar-brand">
            <svg class="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <div class="brand-meta">
              <span class="brand-title">RentManage</span>
              <span class="brand-subtitle">Admin Panel</span>
            </div>
          </div>
          
          <nav class="sidebar-nav">
            <a href="#" class="nav-item ${app.adminActiveTab === 'stats' ? 'active' : ''}" onclick="app.setAdminActiveTab('stats')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
              System Stats
            </a>
            <a href="#" class="nav-item ${app.adminActiveTab === 'owners' ? 'active' : ''}" onclick="app.setAdminActiveTab('owners')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              Manage Owners
            </a>
            <a href="#" class="nav-item ${app.adminActiveTab === 'properties' ? 'active' : ''}" onclick="app.setAdminActiveTab('properties')">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              Monitor Properties
            </a>
          </nav>

          <div class="sidebar-footer">
            <div class="need-help-card">
              <h4>Global Console</h4>
              <p>System Administrator mode.</p>
            </div>
          </div>
        </aside>

        <!-- MAIN AREA -->
        <div class="dashboard-main">
          <header class="topbar">
            <div class="topbar-left">
              <button class="sidebar-toggle-btn" onclick="app.toggleSidebar()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <div class="admin-badge">SYSTEM ADMIN</div>
            </div>
            <div class="topbar-right">
              <div class="user-profile-menu">
                <div class="avatar bg-admin-avatar">A</div>
                <div class="profile-details-text">
                  <strong>Admin Console</strong>
                  <small>Global Administrator</small>
                </div>
                <button class="logout-link-btn" onclick="app.logout()" title="Logout">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                </button>
              </div>
            </div>
          </header>

          <div class="main-content-scroll">
            
            <!-- PANEL: SYSTEM STATS ACTIVE -->
            ${app.adminActiveTab === 'stats' ? `
              <div class="welcome-row">
                <div class="welcome-text">
                  <h2>System Performance Console</h2>
                  <p>Overview of system metrics and status</p>
                </div>
              </div>

              <!-- Stats Row -->
              <div class="stats-row">
                <div class="stat-card">
                  <div class="stat-icon-wrapper blue-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg></div>
                  <div class="stat-details">
                    <span class="stat-label">Registered Owners</span>
                    <strong class="stat-number">${totalOwners}</strong>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon-wrapper green-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg></div>
                  <div class="stat-details">
                    <span class="stat-label">Active Tenants</span>
                    <strong class="stat-number">${activeLeases}</strong>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon-wrapper orange-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg></div>
                  <div class="stat-details">
                    <span class="stat-label">Audited Spaces</span>
                    <strong class="stat-number">${totalRooms}</strong>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon-wrapper red-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                  <div class="stat-details">
                    <span class="stat-label">System Value (Gross)</span>
                    <strong class="stat-number">₹${systemVolume.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              <!-- General panel audit note -->
              <div class="dashboard-card mt-6">
                <div class="card-header"><h3>Audit Summary</h3></div>
                <div class="card-body">
                  <p>Authorized access console. Use this pane to manage properties and owner compliance indicators. System logs are serialized in the local browser context.</p>
                </div>
              </div>
            ` : ''}

            <!-- PANEL: OWNERS DIRECTORY ACTIVE -->
            ${app.adminActiveTab === 'owners' ? `
              <div class="welcome-row">
                <div class="welcome-text">
                  <h2>Manage Property Owners</h2>
                  <p>Audit registered owner accounts and suspend/unsuspend credentials</p>
                </div>
              </div>
              <div class="dashboard-card">
                <div class="card-body no-padding table-responsive">
                  <table class="data-table">
                    <thead>
                      <tr><th>Owner ID</th><th>Owner Name</th><th>Email</th><th>Property</th><th>Access Code</th><th>Status</th><th class="text-center">Actions</th></tr>
                    </thead>
                    <tbody>
                      ${ownersHTML}
                    </tbody>
                  </table>
                </div>
              </div>
            ` : ''}

            <!-- PANEL: PROPERTIES AUDIT ACTIVE -->
            ${app.adminActiveTab === 'properties' ? `
              <div class="welcome-row">
                <div class="welcome-text">
                  <h2>Monitor System Spaces</h2>
                  <p>Global monitor auditing all room allocations and payment compliance</p>
                </div>
              </div>
              <div class="dashboard-card">
                <div class="card-body no-padding table-responsive">
                  <table class="data-table">
                    <thead>
                      <tr><th>Room ID</th><th>Landlord</th><th>Property</th><th>Room Number</th><th>Tenant</th><th>Rent</th><th>Payment</th><th class="text-center">Action</th></tr>
                    </thead>
                    <tbody>
                      ${roomsHTML}
                    </tbody>
                  </table>
                </div>
              </div>
            ` : ''}

          </div>
        </div>
      </div>
    `
  };

  // --- 4. MAIN CONTROLLER CLASS ---
  class RentManagerApp {
    constructor() {
      this.db = null;
      this.currentUser = null;
      this.activeOwnerRoomId = null; // Tab selector in Owner dashboard
      
      // Subview active tabs
      this.ownerActiveTab = 'dashboard';
      this.adminActiveTab = 'stats';
      
      this.init();
    }

    getRoomLedger(room) {
      const unitsUsed = Math.max(0, (room.currentMeterReading || 0) - (room.initialMeterReading || 0));
      const electricityCost = unitsUsed * (room.electricityCostPerUnit || 0);
      const previousDue = room.previousDue || 0;
      const totalOutstanding = room.monthlyRent + electricityCost + previousDue;
      
      const currentMonth = room.currentMonth || 'June 2026';
      const currentMonthPayments = (room.paymentHistory || []).filter(p => p.month === currentMonth || !p.month);
      const totalPaid = currentMonthPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
      
      const remainingBalance = Math.max(0, totalOutstanding - totalPaid);
      
      let paymentStatus = 'Unpaid';
      if (totalPaid >= totalOutstanding) {
        paymentStatus = 'Paid';
      } else if (totalPaid > 0) {
        paymentStatus = 'Partially Paid';
      }
      
      return {
        unitsUsed,
        electricityCost,
        previousDue,
        totalOutstanding,
        totalPaid,
        remainingBalance,
        paymentStatus,
        currentMonth
      };
    }

    getNextMonth(monthStr) {
      if (!monthStr) return 'June 2026';
      const parts = monthStr.split(' ');
      if (parts.length !== 2) return monthStr;
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let monthIndex = months.indexOf(parts[0]);
      let year = parseInt(parts[1]);
      if (monthIndex === -1 || isNaN(year)) return monthStr;
      monthIndex++;
      if (monthIndex > 11) {
        monthIndex = 0;
        year++;
      }
      return `${months[monthIndex]} ${year}`;
    }

    ownerGenerateMonthlyBill(roomId) {
      const index = this.db.rooms.findIndex(r => r.id === roomId);
      if (index === -1) return;
      
      const room = this.db.rooms[index];
      const ledger = this.getRoomLedger(room);
      
      const billArchive = {
        month: ledger.currentMonth,
        rent: room.monthlyRent,
        electricity: ledger.electricityCost,
        previousDue: ledger.previousDue,
        totalOutstanding: ledger.totalOutstanding,
        totalPaid: ledger.totalPaid,
        remainingBalance: ledger.remainingBalance,
        status: ledger.paymentStatus,
        finalizedOn: new Date().toISOString().split('T')[0]
      };
      
      if (!room.billHistory) room.billHistory = [];
      room.billHistory.unshift(billArchive);
      
      room.paymentHistory = [];
      room.previousDue = ledger.remainingBalance;
      room.currentMonth = this.getNextMonth(ledger.currentMonth);
      room.initialMeterReading = room.currentMeterReading;
      
      this.saveDB();
      this.renderOwnerDashboard();
      this.showToast('Bill Finalized', `Statement generated for ${ledger.currentMonth}. Started billing cycle for ${room.currentMonth}.`, 'success');
    }

    init() {
      // 1. Load DB from LocalStorage
      let localData = localStorage.getItem('rentmanager_db');
      if (localData) {
        try {
          this.db = JSON.parse(localData);
          
          // Purge old mockup profiles if any exist to respect empty slate requirement
          if (this.db.users.some(u => u.username === 'owner1' || u.username === 'owner2')) {
            localStorage.removeItem('rentmanager_db');
            this.db = DEFAULT_DB;
          } else {
            // Force pre-configured admin credentials in system database
            let adminUser = this.db.users.find(u => u.role === 'admin');
            if (adminUser) {
              adminUser.username = '@jrfarkade';
              adminUser.password = '@Sahil26';
            } else {
              this.db.users.push({
                id: "admin_0",
                role: "admin",
                username: "@jrfarkade",
                password: "@Sahil26",
                name: "System Administrator",
                status: "active"
              });
            }
          }
          this.saveDB();
        } catch (e) {
          console.error("Error parsing database, resetting to default.", e);
          this.db = DEFAULT_DB;
          this.saveDB();
        }
      } else {
        this.db = DEFAULT_DB;
        this.saveDB();
      }

      // 2. Initialize UI Switcher
      this.initThemeSwitcher();

      // 3. Render Login Cards View by default
      this.renderLogin();

      // 5. Restore user session if present
      const savedSession = sessionStorage.getItem('rentmanager_session');
      if (savedSession) {
        try {
          const session = JSON.parse(savedSession);
          if (session.role === 'tenant') {
            const room = this.db.rooms.find(r => r.id === session.roomId);
            if (room) {
              const owner = this.db.users.find(u => u.id === room.ownerId);
              this.currentUser = { role: 'tenant', room, owner };
              this.renderTenantDashboard();
            } else {
              this.logout();
            }
          } else {
            const user = this.db.users.find(u => u.id === session.userId);
            if (user && user.status === 'active') {
              this.currentUser = user;
              if (user.role === 'admin') {
                this.renderAdminDashboard();
              } else if (user.role === 'owner') {
                this.renderOwnerDashboard();
              }
            } else {
              this.logout();
            }
          }
        } catch (e) {
          sessionStorage.removeItem('rentmanager_session');
        }
      }
    }

    saveDB() {
      localStorage.setItem('rentmanager_db', JSON.stringify(this.db));
    }

    // --- TOAST NOTIFICATIONS ---
    showToast(title, message, type = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      
      let svgIcon = '';
      if (type === 'success') {
        svgIcon = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      } else if (type === 'error') {
        svgIcon = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      } else {
        svgIcon = `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      }

      toast.innerHTML = `
        ${svgIcon}
        <div class="toast-content">
          <strong>${title}</strong>
          <p>${message}</p>
        </div>
        <button class="toast-close" aria-label="Close Toast">&times;</button>
      `;

      toast.querySelector('.toast-close').addEventListener('click', () => {
        this.dismissToast(toast);
      });

      container.appendChild(toast);

      setTimeout(() => {
        this.dismissToast(toast);
      }, 4000);
    }

    dismissToast(toast) {
      if (!toast.parentNode) return;
      toast.classList.add('toast-exit');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }

    // --- THEME SWITCHER ---
    initThemeSwitcher() {
      const savedTheme = localStorage.getItem('rentmanager_theme') || 'light';
      this.setTheme(savedTheme);
      
      const switcherBtn = document.getElementById('uiSwitcherBtn');
      if (switcherBtn) {
        switcherBtn.onclick = () => this.toggleTheme();
      }
    }

    toggleTheme() {
      const currentTheme = localStorage.getItem('rentmanager_theme') || 'light';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(nextTheme);
      this.showToast('Theme Changed', `Switched UI style to ${nextTheme === 'light' ? 'Light Mode' : 'Dark Mode'}`, 'info');
    }

    setTheme(themeName) {
      if (themeName === 'saas' || themeName === 'cards') {
        themeName = 'light';
      }
      document.body.className = `theme-${themeName}`;
      localStorage.setItem('rentmanager_theme', themeName);
      
      const sunIcon = document.getElementById('theme-icon-sun');
      const moonIcon = document.getElementById('theme-icon-moon');
      const textSpan = document.getElementById('uiSwitcherText');
      
      if (sunIcon && moonIcon) {
        if (themeName === 'light') {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'inline-block';
          if (textSpan) textSpan.innerText = 'Dark Mode';
        } else {
          sunIcon.style.display = 'inline-block';
          moonIcon.style.display = 'none';
          if (textSpan) textSpan.innerText = 'Light Mode';
        }
      }
    }

    // --- LOGIN RENDER & INTERFACE HANDLERS ---
    renderLogin() {
      const container = document.getElementById('app');
      container.className = '';
      container.innerHTML = LOGIN_HTML;
      this.showLoginState('roles');
    }

    showLoginState(state) {
      const roleSelector = document.getElementById('login-role-selector');
      const credsForm = document.getElementById('login-credentials-form');
      const regOwner = document.getElementById('login-register-owner');
      const tenantVerify = document.getElementById('login-tenant-verify');

      if (!roleSelector || !credsForm || !regOwner || !tenantVerify) return;

      roleSelector.classList.remove('active');
      credsForm.classList.remove('active');
      regOwner.classList.remove('active');
      tenantVerify.classList.remove('active');

      if (state === 'roles') {
        roleSelector.classList.add('active');
      } else if (state === 'admin') {
        credsForm.classList.add('active');
        document.getElementById('login-form-title').innerText = 'Admin Login';
        document.getElementById('login-form-subtitle').innerText = 'Authorized system administration only';
        document.getElementById('login-role-input').value = 'admin';
        document.getElementById('register-promo-box').style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
      } else if (state === 'owner') {
        credsForm.classList.add('active');
        document.getElementById('login-form-title').innerText = 'Owner Login';
        document.getElementById('login-form-subtitle').innerText = 'Log in to manage rooms, utility rates, and payments';
        document.getElementById('login-role-input').value = 'owner';
        document.getElementById('register-promo-box').style.display = 'block';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
      } else if (state === 'register') {
        regOwner.classList.add('active');
        document.getElementById('owner-register-form').reset();
      } else if (state === 'tenant') {
        tenantVerify.classList.add('active');
        document.getElementById('verify-property-code').value = '';
        document.getElementById('verify-room-number').value = '';
      }
    }

    logout() {
      this.currentUser = null;
      this.activeOwnerRoomId = null;
      sessionStorage.removeItem('rentmanager_session');
      this.renderLogin();
      this.showToast('Logged Out', 'You have been safely signed out.', 'info');
    }

    // --- FORM ACTIONS ---
    handleLoginSubmit(event) {
      event.preventDefault();
      const role = document.getElementById('login-role-input').value;
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;

      if (role === 'admin') {
        const user = this.db.users.find(u => u.role === 'admin' && u.username === username);

        if (!user || user.password !== password) {
          this.showToast('Login Failed', 'Incorrect Administrator credentials.', 'error');
          return;
        }

        this.currentUser = user;
        sessionStorage.setItem('rentmanager_session', JSON.stringify({ userId: user.id, role: 'admin' }));
        this.adminActiveTab = 'stats';
        this.renderAdminDashboard();
        this.showToast('Welcome Admin', 'Global Management Console unlocked.', 'success');
      } else if (role === 'owner') {
        const user = this.db.users.find(u => u.role === 'owner' && u.username.toLowerCase() === username.toLowerCase());

        if (!user || user.password !== password) {
          this.showToast('Login Failed', 'Incorrect username or password.', 'error');
          return;
        }

        if (user.status === 'suspended') {
          this.showToast('Access Blocked', 'This owner account is suspended.', 'error');
          return;
        }

        this.currentUser = user;
        sessionStorage.setItem('rentmanager_session', JSON.stringify({ userId: user.id, role: 'owner' }));
        this.ownerActiveTab = 'dashboard';
        this.renderOwnerDashboard();
        this.showToast('Welcome Back', `Logged in as Owner: ${user.name}.`, 'success');
      }
    }

    handleOwnerRegister(event) {
      event.preventDefault();
      
      const name = document.getElementById('reg-name').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const propertyName = document.getElementById('reg-property').value.trim();
      const username = document.getElementById('reg-username').value.trim();
      const password = document.getElementById('reg-password').value;

      const userExists = this.db.users.find(u => u.username.toLowerCase() === username.toLowerCase());
      if (userExists) {
        this.showToast('Registration Error', 'Username is already taken.', 'error');
        return;
      }

      // Generate Code
      const cleanProp = propertyName.replace(/[^a-zA-Z]/g, '').toUpperCase();
      let code = cleanProp.substring(0, 5);
      if (code.length < 5) code = (code + "PROP").substring(0, 5);
      code = code + (Math.floor(Math.random() * 9) + 1);

      const newOwner = {
        id: 'owner_' + Date.now(),
        role: 'owner',
        username,
        password,
        name,
        phone,
        email,
        propertyName,
        propertyCode: code,
        status: 'active'
      };

      this.db.users.push(newOwner);
      this.saveDB();

      this.currentUser = newOwner;
      sessionStorage.setItem('rentmanager_session', JSON.stringify({ userId: newOwner.id, role: 'owner' }));

      this.ownerActiveTab = 'dashboard';
      this.renderOwnerDashboard();
      this.showToast('Registration Successful', `Property Code Generated: ${code}`, 'success');
    }

    handleTenantVerify(event) {
      event.preventDefault();
      const code = document.getElementById('verify-property-code').value.trim().toUpperCase();
      const roomNum = document.getElementById('verify-room-number').value.trim();

      const owner = this.db.users.find(u => u.role === 'owner' && u.propertyCode === code);
      if (!owner) {
        this.showToast('Verification Failed', 'Invalid Access Code.', 'error');
        return;
      }

      if (owner.status === 'suspended') {
        this.showToast('Access Blocked', 'This property dashboard is currently suspended.', 'error');
        return;
      }

      const room = this.db.rooms.find(r => r.ownerId === owner.id && r.roomNumber.toLowerCase() === roomNum.toLowerCase());
      if (!room) {
        this.showToast('Verification Failed', `No lease found for Room ${roomNum} at this property.`, 'error');
        return;
      }

      this.currentUser = { role: 'tenant', room, owner };
      sessionStorage.setItem('rentmanager_session', JSON.stringify({ role: 'tenant', roomId: room.id }));

      this.renderTenantDashboard();
      this.showToast('Lease Verified', `Access granted for Room ${room.roomNumber}.`, 'success');
    }

    // --- TENANT PORTAL ENGINE ---
    renderTenantDashboard() {
      if (!this.currentUser || this.currentUser.role !== 'tenant') return;

      const room = this.db.rooms.find(r => r.id === this.currentUser.room.id);
      const owner = this.currentUser.owner;
      const ledger = this.getRoomLedger(room);

      // History rows HTML
      let billingHistoryRowsHTML = '';
      if (!room.billHistory || room.billHistory.length === 0) {
        billingHistoryRowsHTML = `<tr><td colspan="6" class="text-center text-muted">No finalized statements found.</td></tr>`;
      } else {
        room.billHistory.forEach(h => {
          billingHistoryRowsHTML += `
            <tr>
              <td><strong>${h.month}</strong></td>
              <td>₹${h.rent.toLocaleString()}</td>
              <td>₹${h.electricity.toLocaleString()}</td>
              <td class="font-semibold text-primary">₹${h.totalOutstanding.toLocaleString()}</td>
              <td><span class="status-badge status-${h.status.toLowerCase().replace(' ', '-')}">${h.status}</span></td>
              <td>Paid: ₹${h.totalPaid.toLocaleString()} (Bal: ₹${h.remainingBalance.toLocaleString()})</td>
            </tr>
          `;
        });
      }

      // Current Month Transactions Logged
      let currentMonthTransactionsHTML = '';
      const currentMonthPayments = (room.paymentHistory || []).filter(p => p.month === ledger.currentMonth || !p.month);
      if (currentMonthPayments.length === 0) {
        currentMonthTransactionsHTML = `<p class="text-muted" style="font-size:0.85rem; padding: 4px 0;">No payments logged for the current month.</p>`;
      } else {
        currentMonthTransactionsHTML = `<div style="max-height:120px; overflow-y:auto; display:flex; flex-direction:column; gap:4px; margin-top:8px;">`;
        currentMonthPayments.forEach(p => {
          currentMonthTransactionsHTML += `
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:4px 8px; background:var(--color-bg-page); border-radius:6px; border: 1px solid var(--color-border);">
              <span>📅 ${p.date}</span>
              <strong class="text-success">₹${p.amount.toLocaleString()}</strong>
            </div>
          `;
        });
        currentMonthTransactionsHTML += `</div>`;
      }

      const container = document.getElementById('app');
      container.className = ''; // Remove centered page wrapper styles
      container.innerHTML = TEMPLATES.tenantDashboard(room, owner, ledger, currentMonthTransactionsHTML, billingHistoryRowsHTML);
    }

    payTenantBill() {
      const room = this.currentUser.room;
      const index = this.db.rooms.findIndex(r => r.id === room.id);
      if (index === -1) return;

      const liveRoom = this.db.rooms[index];
      const ledger = this.getRoomLedger(liveRoom);
      
      if (ledger.remainingBalance <= 0) {
        this.showToast('No Balance', 'Your statement for this month is already settled.', 'info');
        return;
      }

      const inputVal = prompt(`Enter payment amount (Outstanding: ₹${ledger.remainingBalance.toLocaleString()}):`, ledger.remainingBalance);
      if (inputVal === null) return; // cancelled
      
      const amount = parseInt(inputVal);
      if (isNaN(amount) || amount <= 0) {
        this.showToast('Invalid Amount', 'Please enter a valid positive payment amount.', 'error');
        return;
      }
      
      if (amount > ledger.remainingBalance) {
        this.showToast('Excess Payment', 'Payment amount cannot exceed the remaining outstanding balance.', 'error');
        return;
      }

      const transaction = {
        id: 'tx_' + Date.now(),
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        month: ledger.currentMonth
      };

      if (!liveRoom.paymentHistory) liveRoom.paymentHistory = [];
      liveRoom.paymentHistory.push(transaction);

      this.saveDB();
      this.renderTenantDashboard();
      this.showToast('Payment Recorded', `Recorded payment of ₹${amount.toLocaleString()} successfully.`, 'success');
    }

    // --- OWNER PORTAL ENGINE ---
    setOwnerActiveTab(tab) {
      this.ownerActiveTab = tab;
      this.renderOwnerDashboard();
    }

    renderOwnerDashboard() {
      if (!this.currentUser || this.currentUser.role !== 'owner') return;

      const owner = this.currentUser;
      const ownerRooms = this.db.rooms.filter(r => r.ownerId === owner.id);

      // Math metrics
      const totalRooms = ownerRooms.length;
      const occupiedRooms = ownerRooms.filter(r => r.tenantName && r.tenantName !== '').length;
      const occPct = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
      
      let totalMonthlyRent = 0;
      let pendingAmount = 0;
      
      ownerRooms.forEach(r => {
        totalMonthlyRent += r.monthlyRent || 0;
        const ledger = this.getRoomLedger(r);
        pendingAmount += ledger.remainingBalance;
      });

      // Tabs html
      let tabsHTML = '';
      let roomDetailHTML = '';
      if (ownerRooms.length === 0) {
        tabsHTML = `<span class="input-hint">Create your first room.</span>`;
        roomDetailHTML = `<div class="text-center py-4">No rooms added. Use "Add New Room" button.</div>`;
      } else {
        if (!this.activeOwnerRoomId || !ownerRooms.find(r => r.id === this.activeOwnerRoomId)) {
          this.activeOwnerRoomId = ownerRooms[0].id;
        }

        ownerRooms.forEach(r => {
          tabsHTML += `<button class="room-tab ${this.activeOwnerRoomId === r.id ? 'active' : ''}" onclick="app.selectOwnerRoom('${r.id}')">Room ${r.roomNumber}</button>`;
        });

        // Current room calculations
        const activeRoom = ownerRooms.find(r => r.id === this.activeOwnerRoomId);
        const ledger = this.getRoomLedger(activeRoom);

        // Generate payments list for current room
        let activeRoomPaymentsHTML = '';
        const currentMonthPayments = (activeRoom.paymentHistory || []).filter(p => p.month === ledger.currentMonth || !p.month);
        if (currentMonthPayments.length === 0) {
          activeRoomPaymentsHTML = `<p class="text-muted" style="font-size:0.85rem; text-align:center; padding:12px 0;">No payments logged for ${ledger.currentMonth}.</p>`;
        } else {
          activeRoomPaymentsHTML = `
            <table class="data-table" style="font-size:0.85rem; margin-top:8px;">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
          `;
          currentMonthPayments.forEach(p => {
            activeRoomPaymentsHTML += `
              <tr>
                <td>📅 ${p.date}</td>
                <td class="text-success font-semibold">₹${p.amount.toLocaleString()}</td>
                <td class="text-center">
                  <button class="btn-action-icon" onclick="app.openEditPaymentModal('${activeRoom.id}', '${p.id}', ${p.amount}, '${p.date}')" title="Edit">🖊</button>
                  <button class="btn-action-icon danger" onclick="app.ownerDeletePayment('${activeRoom.id}', '${p.id}')" title="Delete">🗑</button>
                </td>
              </tr>
            `;
          });
          activeRoomPaymentsHTML += `</tbody></table>`;
        }

        roomDetailHTML = `
          <div class="card-header justify-between">
            <h3>Room ${activeRoom.roomNumber} Status (${ledger.currentMonth})</h3>
            <span class="status-badge status-${ledger.paymentStatus.toLowerCase().replace(' ', '-')}">${ledger.paymentStatus}</span>
          </div>
          <div class="room-pane-layout">
            <div class="calc-card-box">
              <h4 style="margin-bottom:8px; font-size:0.75rem; text-transform:uppercase; color:var(--color-text-muted);">Occupant Info &amp; Actions</h4>
              <div class="detail-item"><span class="detail-label">Tenant Name</span><strong style="font-size:1.1rem; color:var(--color-text-main);">${activeRoom.tenantName}</strong></div>
              <div class="detail-item mt-2"><span class="detail-label">Joining Date</span><span>${activeRoom.joiningDate}</span></div>
              <div class="detail-item mt-2"><span class="detail-label">Security Deposit</span><span>₹${(activeRoom.securityDeposit || 0).toLocaleString()}</span></div>
              
              <div class="detail-item mt-2 pt-2 border-top"><span class="detail-label">Current Bill</span><strong>₹${ledger.totalOutstanding.toLocaleString()}</strong></div>
              <div class="detail-item mt-1"><span class="detail-label">Amount Paid</span><strong class="text-success">₹${ledger.totalPaid.toLocaleString()}</strong></div>
              <div class="detail-item mt-1"><span class="detail-label">Remaining Balance</span><strong class="text-primary">₹${ledger.remainingBalance.toLocaleString()}</strong></div>
              <div class="detail-item mt-1"><span class="detail-label">Payment Status</span><span class="status-badge status-${ledger.paymentStatus.toLowerCase().replace(' ', '-')}">${ledger.paymentStatus}</span></div>
              
              <div class="mt-4 pt-4 border-top" style="display:flex; flex-direction:column; gap:8px;">
                <button class="btn-primary w-full" onclick="app.openRecordPaymentModal('${activeRoom.id}')">Record Payment</button>
                <button class="btn-outline-small w-full" onclick="app.ownerGenerateMonthlyBill('${activeRoom.id}')" style="border-color:var(--color-primary); color:var(--color-primary);">Generate Monthly Bill</button>
              </div>
            </div>
            
            <div class="calc-card-box">
              <h4 style="margin-bottom:8px; font-size:0.75rem; text-transform:uppercase; color:var(--color-text-muted);">Electricity &amp; Billing Ledger</h4>
              <div class="calc-formula-grid">
                <div class="formula-row">
                  <div class="formula-item"><span>Last Unit</span><strong>${activeRoom.initialMeterReading}</strong></div>
                  <div class="formula-sign">&minus;</div>
                  <div class="formula-item"><span>Current Unit</span><strong>${activeRoom.currentMeterReading}</strong></div>
                  <div class="formula-sign">&equals;</div>
                  <div class="formula-item bg-highlight"><span>Used</span><strong>${ledger.unitsUsed} Unit</strong></div>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.8rem; color:var(--color-text-muted);">Rate: ₹${activeRoom.electricityCostPerUnit}/Unit</span>
                  <button class="btn-outline-small" onclick="app.openUpdateReadingModal('${activeRoom.id}')">Update Reading</button>
                </div>
                
                <div class="bill-summary-list mt-2">
                  <div class="bill-summary-item"><span>Base Monthly Rent:</span><strong>₹${activeRoom.monthlyRent.toLocaleString()}</strong></div>
                  <div class="bill-summary-item"><span>Electricity charges:</span><strong>₹${ledger.electricityCost.toLocaleString()}</strong></div>
                  <div class="bill-summary-item"><span>Previous Dues (Carried forward):</span><strong class="text-danger">+ ₹${ledger.previousDue.toLocaleString()}</strong></div>
                  <div class="bill-summary-item total-payable"><span>Total Outstanding Dues:</span><strong>₹${ledger.totalOutstanding.toLocaleString()}</strong></div>
                  <div class="bill-summary-item"><span>Amount Paid this Month:</span><strong class="text-success">- ₹${ledger.totalPaid.toLocaleString()}</strong></div>
                  <div class="bill-summary-item" style="font-weight:700; border-top:1px solid var(--color-border); padding-top:6px;"><span>Remaining Balance:</span><strong class="text-primary">₹${ledger.remainingBalance.toLocaleString()}</strong></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="dashboard-card mt-6" style="box-shadow:none; border: 1px solid var(--color-border);">
            <div class="card-header justify-between" style="margin-bottom:8px; padding-bottom:8px;">
              <h3>Logged Transactions (${ledger.currentMonth})</h3>
            </div>
            <div class="card-body no-padding table-responsive">
              ${activeRoomPaymentsHTML}
            </div>
          </div>
        `;
      }

      // Recent payments
      let recentPaymentsHTML = '';
      let payments = [];
      ownerRooms.forEach(r => {
        const currentMonthPayments = (r.paymentHistory || []);
        currentMonthPayments.forEach(h => {
          payments.push({ roomNum: r.roomNumber, tenant: r.tenantName, amount: h.amount, date: h.date, month: h.month || r.currentMonth });
        });
      });

      payments.sort((a,b) => b.date.localeCompare(a.date));

      if (payments.length === 0) {
        recentPaymentsHTML = `<tr><td colspan="5" class="text-center text-muted">No payments logged yet.</td></tr>`;
      } else {
        payments.slice(0, 5).forEach(p => {
          recentPaymentsHTML += `<tr><td>${p.date}</td><td>Room ${p.roomNum}</td><td>${p.tenant}</td><td class="text-success font-semibold">₹${p.amount.toLocaleString()}</td><td><span class="status-badge status-paid">Paid</span></td></tr>`;
        });
      }

      const container = document.getElementById('app');
      container.className = '';
      container.innerHTML = TEMPLATES.ownerDashboard(owner, ownerRooms, totalRooms, occupiedRooms, occPct, totalMonthlyRent, pendingAmount, tabsHTML, roomDetailHTML, recentPaymentsHTML);

      // Populate secondary lists depending on sub-tab
      if (this.ownerActiveTab === 'rooms') {
        const rows = document.getElementById('owner-rooms-table-rows');
        rows.innerHTML = '';
        if (ownerRooms.length === 0) {
          rows.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No rooms added.</td></tr>`;
        } else {
          ownerRooms.forEach(r => {
            const ledger = this.getRoomLedger(r);
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${r.id}</td>
              <td><strong>Room ${r.roomNumber}</strong></td>
              <td>${r.tenantName || 'Vacant'}</td>
              <td>₹${r.monthlyRent.toLocaleString()}</td>
              <td>${r.currentMeterReading} Unit</td>
              <td><span class="status-badge status-${ledger.paymentStatus.toLowerCase().replace(' ', '-')}">${ledger.paymentStatus}</span></td>
              <td class="text-center">
                <button class="btn-action-icon" onclick="app.openEditRoomModal('${r.id}')">🖊</button>
                <button class="btn-action-icon danger" onclick="app.ownerDeleteRoom('${r.id}')">🗑</button>
              </td>
            `;
            rows.appendChild(tr);
          });
        }
      } 
      else if (this.ownerActiveTab === 'tenants') {
        const rows = document.getElementById('owner-tenants-table-rows');
        rows.innerHTML = '';
        const occupied = ownerRooms.filter(r => r.tenantName && r.tenantName !== '');
        if (occupied.length === 0) {
          rows.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No active tenant registrations.</td></tr>`;
        } else {
          occupied.forEach(r => {
            const ledger = this.getRoomLedger(r);
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td><strong>${r.tenantName}</strong></td>
              <td>Room ${r.roomNumber}</td>
              <td>${r.joiningDate}</td>
              <td>₹${(r.securityDeposit || 0).toLocaleString()}</td>
              <td>₹${r.monthlyRent.toLocaleString()}</td>
              <td>₹${ledger.electricityCost.toLocaleString()} (${ledger.unitsUsed} Units)</td>
              <td><span class="status-badge status-${ledger.paymentStatus.toLowerCase().replace(' ', '-')}">${ledger.paymentStatus}</span></td>
            `;
            rows.appendChild(tr);
          });
        }
      } 
      else if (this.ownerActiveTab === 'bills') {
        const rows = document.getElementById('owner-bills-table-rows');
        rows.innerHTML = '';
        
        let allBills = [];
        ownerRooms.forEach(r => {
          const ledger = this.getRoomLedger(r);
          allBills.push({
            roomId: r.id, 
            roomNum: r.roomNumber, 
            tenant: r.tenantName, 
            month: ledger.currentMonth, 
            base: r.monthlyRent, 
            electricity: ledger.electricityCost, 
            previousDue: ledger.previousDue,
            total: ledger.totalOutstanding, 
            paid: ledger.totalPaid,
            balance: ledger.remainingBalance,
            status: ledger.paymentStatus, 
            paidOn: ledger.paymentStatus === 'Paid' ? 'Current Month' : 'Pending', 
            isCurrent: true
          });
          
          if (r.billHistory) {
            r.billHistory.forEach(h => {
              allBills.push({
                roomId: r.id,
                roomNum: r.roomNumber,
                tenant: r.tenantName,
                month: h.month,
                base: h.rent,
                electricity: h.electricity,
                previousDue: h.previousDue,
                total: h.totalOutstanding,
                paid: h.totalPaid,
                balance: h.remainingBalance,
                status: h.status,
                paidOn: h.finalizedOn,
                isCurrent: false
              });
            });
          }
        });

        if (allBills.length === 0) {
          rows.innerHTML = `<tr><td colspan="9" class="text-center text-muted">No billing logs compiled.</td></tr>`;
        } else {
          allBills.forEach(b => {
            const tr = document.createElement('tr');
            const action = b.isCurrent 
              ? `<button class="btn-accent" onclick="app.openRecordPaymentModal('${b.roomId}')">Record Pay</button>` 
              : '-';
            tr.innerHTML = `
              <td><strong>${b.month}</strong></td>
              <td>Room ${b.roomNum}</td>
              <td>${b.tenant}</td>
              <td>₹${b.base.toLocaleString()}</td>
              <td>₹${b.electricity.toLocaleString()}</td>
              <td class="text-primary font-semibold">₹${b.total.toLocaleString()} (Bal: ₹${b.balance.toLocaleString()})</td>
              <td><span class="status-badge status-${b.status.toLowerCase().replace(' ', '-')}">${b.status}</span></td>
              <td>${b.paidOn}</td>
              <td>${action}</td>
            `;
            rows.appendChild(tr);
          });
        }
      }
    }

    selectOwnerRoom(roomId) {
      this.activeOwnerRoomId = roomId;
      this.renderOwnerDashboard();
    }

    ownerMarkBillAsPaid(roomId) {
      const index = this.db.rooms.findIndex(r => r.id === roomId);
      if (index === -1) return;

      const room = this.db.rooms[index];
      const ledger = this.getRoomLedger(room);

      if (ledger.remainingBalance <= 0) {
        this.showToast('Settled', 'This room is already fully paid.', 'info');
        return;
      }

      const transaction = {
        id: 'tx_' + Date.now(),
        amount: ledger.remainingBalance,
        date: new Date().toISOString().split('T')[0],
        month: ledger.currentMonth
      };

      if (!room.paymentHistory) room.paymentHistory = [];
      room.paymentHistory.push(transaction);

      this.saveDB();
      this.renderOwnerDashboard();
      this.showToast('Statement Settled', `Recorded full payment of ₹${ledger.remainingBalance.toLocaleString()} for Room ${room.roomNumber}.`, 'success');
    }

    ownerDeleteRoom(roomId) {
      if (!confirm('Remove this room and its tenant records? This is permanent.')) return;
      this.db.rooms = this.db.rooms.filter(r => r.id !== roomId);
      this.saveDB();
      if (this.activeOwnerRoomId === roomId) this.activeOwnerRoomId = null;
      this.renderOwnerDashboard();
      this.showToast('Room Deleted', 'Room wiped from system registries.', 'success');
    }

    ownerGenerateBillQuick() {
      if (this.activeOwnerRoomId) {
        const room = this.db.rooms.find(r => r.id === this.activeOwnerRoomId);
        if (room && confirm(`Generate monthly bill for Room ${room.roomNumber}? This will finalize ${room.currentMonth || 'June 2026'} and carry forward any remaining balance.`)) {
          this.ownerGenerateMonthlyBill(room.id);
        }
      } else {
        this.showToast('Select Room', 'Select a room tab first to generate its monthly bill.', 'warning');
      }
    }

    openRecordPaymentModal(roomId) {
      const room = this.db.rooms.find(r => r.id === roomId);
      if (!room) return;

      const ledger = this.getRoomLedger(room);

      document.getElementById('record-payment-room-id').value = room.id;
      document.getElementById('record-payment-room-num-text').innerText = room.roomNumber;
      document.getElementById('record-payment-tenant-name-text').innerText = room.tenantName;
      
      document.getElementById('record-payment-total-text').innerText = '₹' + ledger.totalOutstanding.toLocaleString();
      document.getElementById('record-payment-paid-text').innerText = '₹' + ledger.totalPaid.toLocaleString();
      document.getElementById('record-payment-remaining-text').innerText = '₹' + ledger.remainingBalance.toLocaleString();
      
      document.getElementById('record-payment-amount').value = ledger.remainingBalance;
      document.getElementById('record-payment-date').value = new Date().toISOString().split('T')[0];

      this.openModal('record-payment-modal');
    }

    handleRecordPaymentSubmit(event) {
      event.preventDefault();
      const id = document.getElementById('record-payment-room-id').value;
      const amount = parseInt(document.getElementById('record-payment-amount').value);
      const date = document.getElementById('record-payment-date').value;

      const idx = this.db.rooms.findIndex(r => r.id === id);
      if (idx === -1) return;

      const room = this.db.rooms[idx];
      const ledger = this.getRoomLedger(room);

      if (amount <= 0) {
        this.showToast('Invalid Amount', 'Payment amount must be greater than zero.', 'error');
        return;
      }
      if (amount > ledger.remainingBalance) {
        this.showToast('Excess Payment', 'Payment amount cannot exceed the remaining outstanding balance.', 'error');
        return;
      }

      const transaction = {
        id: 'tx_' + Date.now(),
        amount: amount,
        date: date,
        month: ledger.currentMonth
      };

      if (!room.paymentHistory) room.paymentHistory = [];
      room.paymentHistory.push(transaction);

      this.saveDB();
      this.closeModal('record-payment-modal');
      this.renderOwnerDashboard();
      this.showToast('Payment Recorded', `Recorded payment of ₹${amount.toLocaleString()} for Room ${room.roomNumber}.`, 'success');
    }

    openEditPaymentModal(roomId, paymentId, amount, date) {
      document.getElementById('edit-payment-room-id').value = roomId;
      document.getElementById('edit-payment-id').value = paymentId;
      document.getElementById('edit-payment-amount').value = amount;
      document.getElementById('edit-payment-date').value = date;

      this.openModal('edit-payment-modal');
    }

    handleEditPaymentSubmit(event) {
      event.preventDefault();
      const roomId = document.getElementById('edit-payment-room-id').value;
      const paymentId = document.getElementById('edit-payment-id').value;
      const amount = parseInt(document.getElementById('edit-payment-amount').value);
      const date = document.getElementById('edit-payment-date').value;

      const idx = this.db.rooms.findIndex(r => r.id === roomId);
      if (idx === -1) return;

      const room = this.db.rooms[idx];
      const ledger = this.getRoomLedger(room);
      
      const txIdx = room.paymentHistory.findIndex(p => p.id === paymentId);
      if (txIdx === -1) return;

      if (amount <= 0) {
        this.showToast('Invalid Amount', 'Payment amount must be greater than zero.', 'error');
        return;
      }

      const oldAmount = room.paymentHistory[txIdx].amount;
      const maxAllowed = ledger.remainingBalance + oldAmount;
      if (amount > maxAllowed) {
        this.showToast('Excess Payment', `Payment amount cannot exceed the total outstanding of ₹${maxAllowed.toLocaleString()}.`, 'error');
        return;
      }

      room.paymentHistory[txIdx].amount = amount;
      room.paymentHistory[txIdx].date = date;

      this.saveDB();
      this.closeModal('edit-payment-modal');
      this.renderOwnerDashboard();
      this.showToast('Transaction Updated', `Updated transaction to ₹${amount.toLocaleString()} successfully.`, 'success');
    }

    ownerDeletePayment(roomId, paymentId) {
      if (!confirm('Are you sure you want to delete this payment transaction?')) return;

      const idx = this.db.rooms.findIndex(r => r.id === roomId);
      if (idx === -1) return;

      const room = this.db.rooms[idx];
      const initialLen = room.paymentHistory.length;
      room.paymentHistory = room.paymentHistory.filter(p => p.id !== paymentId);

      if (room.paymentHistory.length < initialLen) {
        this.saveDB();
        this.renderOwnerDashboard();
        this.showToast('Transaction Deleted', 'The payment transaction was deleted.', 'success');
      }
    }

    suggestNextRoomNumber() {
      const owner = this.currentUser;
      if (!owner) return '';
      const ownerRooms = this.db.rooms.filter(r => r.ownerId === owner.id);
      if (ownerRooms.length === 0) return '01';
      
      let maxNum = -1;
      let paddingLength = 2;
      
      ownerRooms.forEach(r => {
        const val = parseInt(r.roomNumber);
        if (!isNaN(val)) {
          if (val > maxNum) {
            maxNum = val;
            paddingLength = r.roomNumber.length;
          }
        }
      });
      
      if (maxNum === -1) return '01';
      const nextNum = maxNum + 1;
      return String(nextNum).padStart(paddingLength, '0');
    }

    openModal(id) {
      const modal = document.getElementById(id);
      if (modal) {
        modal.classList.add('active');
        if (id === 'add-room-modal') {
          const suggestion = this.suggestNextRoomNumber();
          document.getElementById('room-num').value = suggestion;
        }
      }
    }

    closeModal(id) {
      const modal = document.getElementById(id);
      if (modal) modal.classList.remove('active');
    }

    handleAddRoomSubmit(event) {
      event.preventDefault();
      const num = document.getElementById('room-num').value.trim();
      const rent = parseInt(document.getElementById('room-rent').value);
      const tenant = document.getElementById('room-tenant').value.trim();
      const join = document.getElementById('room-join').value;
      const init = parseInt(document.getElementById('room-meter-init').value);
      const cost = parseFloat(document.getElementById('room-elec-cost').value);
      const deposit = parseInt(document.getElementById('room-deposit').value) || 0;

      const roomNumRegex = /^\d+$/;
      if (!roomNumRegex.test(num)) {
        this.showToast('Validation Error', 'Room Number must contain only numbers.', 'error');
        return;
      }

      const owner = this.currentUser;
      const exists = this.db.rooms.find(r => r.ownerId === owner.id && r.roomNumber.toLowerCase() === num.toLowerCase());
      if (exists) {
        this.showToast('Creation Error', `Room ${num} already exists.`, 'error');
        return;
      }

      const newRoom = {
        id: 'room_' + Date.now(),
        ownerId: owner.id,
        roomNumber: num,
        tenantName: tenant,
        monthlyRent: rent,
        joiningDate: join,
        initialMeterReading: init,
        currentMeterReading: init,
        electricityCostPerUnit: cost,
        paymentStatus: 'unpaid',
        securityDeposit: deposit,
        previousDue: 0,
        paymentHistory: [],
        billHistory: [],
        currentMonth: 'June 2026'
      };

      this.db.rooms.push(newRoom);
      this.saveDB();
      this.closeModal('add-room-modal');
      document.getElementById('add-room-form').reset();
      this.activeOwnerRoomId = newRoom.id;
      this.renderOwnerDashboard();
      this.showToast('Room Added', `Room ${num} is registered for ${tenant}.`, 'success');
    }

    openUpdateReadingModal(roomId) {
      const room = this.db.rooms.find(r => r.id === roomId);
      if (!room) return;

      document.getElementById('reading-room-id').value = room.id;
      document.getElementById('reading-room-num-text').innerText = room.roomNumber;
      document.getElementById('reading-tenant-name-text').innerText = room.tenantName;
      document.getElementById('reading-prev').value = room.initialMeterReading;
      
      const curr = document.getElementById('reading-curr');
      curr.value = room.currentMeterReading;
      curr.min = room.initialMeterReading;
      
      const warn = document.getElementById('reading-warning-text');
      warn.innerText = '';

      curr.oninput = () => {
        if (parseInt(curr.value) < room.initialMeterReading) {
          warn.innerText = `Must be at least ${room.initialMeterReading} Unit`;
        } else {
          warn.innerText = '';
        }
      };

      this.openModal('update-reading-modal');
    }

    openUpdateReadingModalFromQuick() {
      if (this.activeOwnerRoomId) this.openUpdateReadingModal(this.activeOwnerRoomId);
      else this.showToast('Select Room', 'Select a room tab first.', 'warning');
    }

    handleUpdateReadingSubmit(event) {
      event.preventDefault();
      const id = document.getElementById('reading-room-id').value;
      const reading = parseInt(document.getElementById('reading-curr').value);

      const index = this.db.rooms.findIndex(r => r.id === id);
      if (index === -1) return;

      const room = this.db.rooms[index];
      if (reading < room.initialMeterReading) {
        this.showToast('Input Error', 'Reading cannot be less than initial meter value.', 'error');
        return;
      }

      this.db.rooms[index].currentMeterReading = reading;

      this.saveDB();
      this.closeModal('update-reading-modal');
      this.renderOwnerDashboard();
      this.showToast('Reading Saved', `Saved meter reading: ${reading} for Room ${room.roomNumber}.`, 'success');
    }

    openEditRoomModal(roomId) {
      const room = this.db.rooms.find(r => r.id === roomId);
      if (!room) return;

      document.getElementById('edit-room-id').value = room.id;
      document.getElementById('edit-room-num').value = room.roomNumber;
      document.getElementById('edit-room-rent').value = room.monthlyRent;
      document.getElementById('edit-room-tenant').value = room.tenantName;
      document.getElementById('edit-room-join').value = room.joiningDate;
      document.getElementById('edit-room-meter-init').value = room.initialMeterReading;
      document.getElementById('edit-room-elec-cost').value = room.electricityCostPerUnit;
      document.getElementById('edit-room-deposit').value = room.securityDeposit || 0;

      this.openModal('edit-room-modal');
    }

    handleEditRoomSubmit(event) {
      event.preventDefault();
      const id = document.getElementById('edit-room-id').value;
      const idx = this.db.rooms.findIndex(r => r.id === id);
      if (idx === -1) return;

      const num = document.getElementById('edit-room-num').value.trim();
      const roomNumRegex = /^\d+$/;
      if (!roomNumRegex.test(num)) {
        this.showToast('Validation Error', 'Room Number must contain only numbers.', 'error');
        return;
      }

      const ownerId = this.db.rooms[idx].ownerId;
      const exists = this.db.rooms.find(r => r.ownerId === ownerId && r.id !== id && r.roomNumber.toLowerCase() === num.toLowerCase());
      if (exists) {
        this.showToast('Edit Error', `Room ${num} already exists.`, 'error');
        return;
      }

      const updated = {
        ...this.db.rooms[idx],
        roomNumber: num,
        monthlyRent: parseInt(document.getElementById('edit-room-rent').value),
        tenantName: document.getElementById('edit-room-tenant').value.trim(),
        joiningDate: document.getElementById('edit-room-join').value,
        initialMeterReading: parseInt(document.getElementById('edit-room-meter-init').value),
        electricityCostPerUnit: parseFloat(document.getElementById('edit-room-elec-cost').value),
        securityDeposit: parseInt(document.getElementById('edit-room-deposit').value) || 0
      };

      if (updated.currentMeterReading < updated.initialMeterReading) {
        updated.currentMeterReading = updated.initialMeterReading;
      }

      this.db.rooms[idx] = updated;
      this.saveDB();
      this.closeModal('edit-room-modal');
      this.renderOwnerDashboard();
      this.showToast('Changes Saved', `Tenant details updated.`, 'success');
    }

    toggleSidebar() {
      const sidebar = document.querySelector('.dashboard-sidebar');
      if (sidebar) sidebar.classList.toggle('mobile-open');
    }

    // --- ADMIN PORTAL ENGINE ---
    setAdminActiveTab(tab) {
      this.adminActiveTab = tab;
      this.renderAdminDashboard();
    }

    renderAdminDashboard() {
      if (!this.currentUser || this.currentUser.role !== 'admin') return;

      const owners = this.db.users.filter(u => u.role === 'owner');
      const rooms = this.db.rooms;
      
      const totalOwners = owners.length;
      const totalRooms = rooms.length;
      const activeLeases = rooms.filter(r => r.tenantName && r.tenantName !== '').length;
      
      let systemVolume = 0;
      rooms.forEach(r => {
        const ledger = this.getRoomLedger(r);
        systemVolume += ledger.totalOutstanding;
      });

      // Secondary lists strings
      let ownersHTML = '';
      if (owners.length === 0) {
        ownersHTML = `<tr><td colspan="7" class="text-center text-muted">No owners registered.</td></tr>`;
      } else {
        owners.forEach(o => {
          const action = o.status === 'suspended' 
            ? `<button class="btn-accent" onclick="app.adminToggleUserSuspension('${o.id}')">Activate</button>`
            : `<button class="btn-outline-small" onclick="app.adminToggleUserSuspension('${o.id}')">Suspend</button>`;
          ownersHTML += `
            <tr>
              <td>${o.id}</td>
              <td><strong>${o.name}</strong></td>
              <td>${o.email}</td>
              <td>${o.propertyName}</td>
              <td><code class="code-badge">${o.propertyCode}</code></td>
              <td><span class="status-badge status-${o.status}">${o.status}</span></td>
              <td class="text-center">
                ${action}
                <button class="btn-action-icon danger" onclick="app.adminDeleteOwner('${o.id}')" style="margin-left:6px;">🗑</button>
              </td>
            </tr>
          `;
        });
      }

      let roomsHTML = '';
      if (rooms.length === 0) {
        roomsHTML = `<tr><td colspan="8" class="text-center text-muted">No spaces configured in system.</td></tr>`;
      } else {
        rooms.forEach(r => {
          const o = this.db.users.find(u => u.id === r.ownerId);
          const ledger = this.getRoomLedger(r);
          roomsHTML += `
            <tr>
              <td>${r.id}</td>
              <td>${o ? o.name : 'System'}</td>
              <td>${o ? o.propertyName : 'Direct'}</td>
              <td><strong>Room ${r.roomNumber}</strong></td>
              <td>${r.tenantName || 'Vacant'}</td>
              <td>₹${r.monthlyRent.toLocaleString()}</td>
              <td><span class="status-badge status-${ledger.paymentStatus.toLowerCase().replace(' ', '-')}">${ledger.paymentStatus}</span></td>
              <td class="text-center">
                <button class="btn-action-icon danger" onclick="app.adminDeleteRoom('${r.id}')">🗑</button>
              </td>
            </tr>
          `;
        });
      }

      const container = document.getElementById('app');
      container.className = '';
      container.innerHTML = TEMPLATES.adminDashboard(ownersHTML, roomsHTML, totalOwners, totalRooms, activeLeases, systemVolume);
    }

    adminToggleUserSuspension(userId) {
      const idx = this.db.users.findIndex(u => u.id === userId);
      if (idx === -1) return;
      const status = this.db.users[idx].status === 'active' ? 'suspended' : 'active';
      this.db.users[idx].status = status;
      this.saveDB();
      this.renderAdminDashboard();
      this.showToast('Account Updated', `Status updated: ${status}`, 'success');
    }

    adminDeleteOwner(ownerId) {
      if (!confirm('Remove this Owner? All their properties and tenant listings will be wiped.')) return;
      this.db.users = this.db.users.filter(u => u.id !== ownerId);
      this.db.rooms = this.db.rooms.filter(r => r.ownerId !== ownerId);
      this.saveDB();
      this.renderAdminDashboard();
      this.showToast('Owner Deleted', 'Account and properties removed.', 'success');
    }

    adminDeleteRoom(roomId) {
      if (!confirm('Remove this room from database?')) return;
      this.db.rooms = this.db.rooms.filter(r => r.id !== roomId);
      this.saveDB();
      this.renderAdminDashboard();
      this.showToast('Room Deleted', 'Wiped room listing.', 'success');
    }
  }

  // Bind to global context
  window.app = new RentManagerApp();

})();
 
