/* ═══════════════════════════════════════════
   APOPHERO HEALTH — USER ACCOUNT SYSTEM
═══════════════════════════════════════════ */

const USER_API = 'https://apophero-backend.onrender.com/api/v1';
let currentUser  = null;
let userToken    = null;

// ── Init: restore session ──────────────────
function initUserAuth() {
  const stored = localStorage.getItem('userToken');
  const user   = localStorage.getItem('userData');
  if (stored && user) {
    userToken   = stored;
    currentUser = JSON.parse(user);
    updateNavAccount();
  }
}

// ── API helper ─────────────────────────────
async function userFetch(endpoint, options = {}) {
  const res = await fetch(`${USER_API}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(userToken ? { 'Authorization': `Bearer ${userToken}` } : {}),
      ...options.headers
    },
    credentials: 'include',
    ...options
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data;
}

// ── Save session ───────────────────────────
function saveUserSession(token, user) {
  userToken   = token;
  currentUser = user;
  localStorage.setItem('userToken', token);
  localStorage.setItem('userData', JSON.stringify(user));
  updateNavAccount();
}

// ── Clear session ──────────────────────────
function clearUserSession() {
  userToken   = null;
  currentUser = null;
  localStorage.removeItem('userToken');
  localStorage.removeItem('userData');
  updateNavAccount();
}

// ── Update navbar account icon ─────────────
function updateNavAccount() {
  const btn = document.getElementById('navAccountBtn');
  if (!btn) return;
  if (currentUser) {
    const initials = currentUser.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    btn.innerHTML  = `<div class="nav-avatar">${initials}</div>`;
    btn.title      = currentUser.name;
  } else {
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>`;
    btn.title = 'Sign In';
  }
}

// ═══════════════════════════════════════════
//  AUTH MODAL
// ═══════════════════════════════════════════
function openAuthModal(tab = 'login') {
  document.getElementById('authModal')?.remove();

  document.body.insertAdjacentHTML('beforeend', `
  <style>
    .auth-modal-bg {
      position:fixed; inset:0; z-index:9999;
      background:rgba(22,25,25,.75); backdrop-filter:blur(6px);
      display:flex; align-items:center; justify-content:center; padding:1rem;
      animation:fadeIn .2s ease;
    }
    .auth-modal {
      background:#fff; border-radius:24px; width:100%; max-width:440px;
      box-shadow:0 24px 60px rgba(0,0,0,.25); animation:fadeUp .3s ease;
      overflow:hidden;
    }
    .auth-tabs {
      display:grid; grid-template-columns:1fr 1fr;
      border-bottom:1px solid #f0f2f0;
    }
    .auth-tab {
      padding:1.1rem; text-align:center; cursor:pointer;
      font-weight:600; font-size:.88rem; border:none; background:none;
      color:#848B8C; transition:all .2s; font-family:var(--font-body);
      border-bottom:2px solid transparent;
    }
    .auth-tab.active { color:#161919; border-bottom-color:#09C8B8; }
    .auth-body { padding:2rem; }
    .auth-field { margin-bottom:1.1rem; }
    .auth-label { display:block; font-size:.74rem; font-weight:700; color:#161919; margin-bottom:.4rem; text-transform:uppercase; letter-spacing:.4px; }
    .auth-input {
      width:100%; padding:.78rem 1rem;
      border:1.5px solid #e8ebe8; border-radius:10px;
      font-size:.9rem; font-family:var(--font-body); color:#161919;
      outline:none; transition:border-color .2s, box-shadow .2s;
    }
    .auth-input:focus { border-color:#09C8B8; box-shadow:0 0 0 3px rgba(9,200,184,.1); }
    .auth-btn {
      width:100%; padding:.9rem; border-radius:10px; border:none; cursor:pointer;
      background:#09C8B8; color:#fff; font-size:.95rem; font-weight:700;
      font-family:var(--font-body); transition:all .2s; margin-top:.3rem;
    }
    .auth-btn:hover { background:#07a89a; transform:translateY(-1px); }
    .auth-btn:disabled { opacity:.6; cursor:not-allowed; transform:none; }
    .auth-error {
      background:#fee2e2; border:1px solid #fecaca; border-radius:8px;
      padding:.75rem 1rem; color:#991b1b; font-size:.82rem; margin-bottom:1rem; display:none;
    }
    .auth-success {
      background:#d1fae5; border:1px solid #a7f3d0; border-radius:8px;
      padding:.75rem 1rem; color:#065f46; font-size:.82rem; margin-bottom:1rem; display:none;
    }
    .auth-divider { text-align:center; font-size:.78rem; color:#848B8C; margin:.8rem 0; }
    .auth-switch { text-align:center; font-size:.82rem; color:#848B8C; margin-top:1rem; }
    .auth-switch a { color:#09C8B8; cursor:pointer; font-weight:600; }
    .auth-close-btn {
      position:absolute; top:1rem; right:1rem;
      width:32px; height:32px; border-radius:50%; border:none;
      background:#f3f4f6; cursor:pointer; font-size:1rem;
      display:flex; align-items:center; justify-content:center;
    }
    .nav-avatar {
      width:32px; height:32px; border-radius:50%;
      background:#09C8B8; color:#fff;
      display:flex; align-items:center; justify-content:center;
      font-size:.75rem; font-weight:700;
    }
  </style>

  <div class="auth-modal-bg" id="authModal" onclick="handleAuthBackdrop(event)">
    <div class="auth-modal" style="position:relative">
      <button class="auth-close-btn" onclick="closeAuthModal()">✕</button>

      <!-- TABS -->
      <div class="auth-tabs">
        <button class="auth-tab ${tab==='login'?'active':''}" id="loginTab" onclick="switchAuthTab('login')">Sign In</button>
        <button class="auth-tab ${tab==='register'?'active':''}" id="registerTab" onclick="switchAuthTab('register')">Create Account</button>
      </div>

      <!-- LOGIN FORM -->
      <div class="auth-body" id="loginForm" style="display:${tab==='login'?'block':'none'}">
        <div class="auth-error" id="loginError"></div>
        <div class="auth-success" id="loginSuccess"></div>
        <form onsubmit="submitLogin(event)">
          <div class="auth-field">
            <label class="auth-label">Email Address</label>
            <input class="auth-input" id="loginEmail" type="email" placeholder="your@email.com" required>
          </div>
          <div class="auth-field">
            <label class="auth-label">Password</label>
            <input class="auth-input" id="loginPassword" type="password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="auth-btn" id="loginBtn">Sign In →</button>
        </form>
        <div class="auth-switch">
          <a onclick="showForgotPassword()">Forgot your password?</a>
        </div>
        <div class="auth-switch">
          Don't have an account? <a onclick="switchAuthTab('register')">Create one free</a>
        </div>
      </div>

      <!-- REGISTER FORM -->
      <div class="auth-body" id="registerForm" style="display:${tab==='register'?'block':'none'}">
        <div class="auth-error" id="registerError"></div>
        <form onsubmit="submitRegister(event)">
          <div class="auth-field">
            <label class="auth-label">Full Name</label>
            <input class="auth-input" id="regName" type="text" placeholder="Jane Doe" required>
          </div>
          <div class="auth-field">
            <label class="auth-label">Email Address</label>
            <input class="auth-input" id="regEmail" type="email" placeholder="your@email.com" required>
          </div>
          <div class="auth-field">
            <label class="auth-label">Password</label>
            <input class="auth-input" id="regPassword" type="password" placeholder="Min 8 chars, uppercase + number" required>
          </div>
          <button type="submit" class="auth-btn" id="registerBtn">Create Account →</button>
        </form>
        <div class="auth-switch">
          Already have an account? <a onclick="switchAuthTab('login')">Sign in</a>
        </div>
      </div>

      <!-- FORGOT PASSWORD FORM -->
      <div class="auth-body" id="forgotForm" style="display:none">
        <div style="font-weight:700;font-size:1rem;margin-bottom:.4rem">Reset Password</div>
        <p style="font-size:.82rem;color:#848B8C;margin-bottom:1.2rem">Enter your email and we'll send you a reset link.</p>
        <div class="auth-error" id="forgotError"></div>
        <div class="auth-success" id="forgotSuccess"></div>
        <form onsubmit="submitForgotPassword(event)">
          <div class="auth-field">
            <label class="auth-label">Email Address</label>
            <input class="auth-input" id="forgotEmail" type="email" placeholder="your@email.com" required>
          </div>
          <button type="submit" class="auth-btn" id="forgotBtn">Send Reset Link →</button>
        </form>
        <div class="auth-switch"><a onclick="switchAuthTab('login')">← Back to Sign In</a></div>
      </div>

    </div>
  </div>`);

  // Close on Escape
  document.addEventListener('keydown', handleAuthEscape);
}

function handleAuthBackdrop(e) {
  if (e.target.id === 'authModal') closeAuthModal();
}

function handleAuthEscape(e) {
  if (e.key === 'Escape') closeAuthModal();
}

function closeAuthModal() {
  document.getElementById('authModal')?.remove();
  document.removeEventListener('keydown', handleAuthEscape);
}

function switchAuthTab(tab) {
  document.getElementById('loginForm').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('forgotForm').style.display   = 'none';
  document.getElementById('loginTab').classList.toggle('active',    tab === 'login');
  document.getElementById('registerTab').classList.toggle('active', tab === 'register');
}

function showForgotPassword() {
  document.getElementById('loginForm').style.display  = 'none';
  document.getElementById('forgotForm').style.display = 'block';
  document.getElementById('loginTab').classList.remove('active');
  document.getElementById('registerTab').classList.remove('active');
}

// ── LOGIN ──────────────────────────────────
async function submitLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  const err = document.getElementById('loginError');
  err.style.display = 'none';
  btn.textContent = 'Signing in…'; btn.disabled = true;

  try {
    const data = await userFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email:    document.getElementById('loginEmail').value.trim(),
        password: document.getElementById('loginPassword').value
      })
    });

    saveUserSession(data.data.token, data.data.user);
    closeAuthModal();
    showToast(`Welcome back, ${data.data.user.name.split(' ')[0]}! 👋`);

    // If on account page, refresh it
    if (window.location.hash === '#account') navigate('account');

  } catch (e2) {
    err.textContent   = e2.message || 'Invalid email or password';
    err.style.display = 'block';
    btn.textContent   = 'Sign In →'; btn.disabled = false;
  }
}

// ── REGISTER ───────────────────────────────
async function submitRegister(e) {
  e.preventDefault();
  const btn = document.getElementById('registerBtn');
  const err = document.getElementById('registerError');
  err.style.display = 'none';
  btn.textContent = 'Creating account…'; btn.disabled = true;

  try {
    const data = await userFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name:     document.getElementById('regName').value.trim(),
        email:    document.getElementById('regEmail').value.trim(),
        password: document.getElementById('regPassword').value
      })
    });

    saveUserSession(data.data.token, data.data.user);
    closeAuthModal();
    showToast(`Welcome to Apophero Health, ${data.data.user.name.split(' ')[0]}! 🎉`);
    if (window.location.hash === '#account') navigate('account');

  } catch (e2) {
    err.textContent   = e2.message || 'Registration failed. Please try again.';
    err.style.display = 'block';
    btn.textContent   = 'Create Account →'; btn.disabled = false;
  }
}

// ── FORGOT PASSWORD ────────────────────────
async function submitForgotPassword(e) {
  e.preventDefault();
  const btn = document.getElementById('forgotBtn');
  const err = document.getElementById('forgotError');
  const suc = document.getElementById('forgotSuccess');
  err.style.display = 'none'; suc.style.display = 'none';
  btn.textContent = 'Sending…'; btn.disabled = true;

  try {
    await userFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email: document.getElementById('forgotEmail').value.trim() })
    });
    suc.textContent   = 'Reset link sent! Check your inbox.';
    suc.style.display = 'block';
    btn.textContent   = '✓ Email Sent'; btn.disabled = true;
  } catch (e2) {
    err.textContent   = e2.message;
    err.style.display = 'block';
    btn.textContent   = 'Send Reset Link →'; btn.disabled = false;
  }
}

// ── USER LOGOUT ────────────────────────────
function userLogout() {
  clearUserSession();
  showToast('Signed out successfully');
  navigate('home');
}

// ═══════════════════════════════════════════
//  ACCOUNT PAGE
// ═══════════════════════════════════════════
pages['account'] = function() {
  if (!currentUser) {
    // Not logged in — show prompt
    return `
    <style>
      .account-gate {
        min-height:80vh; display:flex; align-items:center; justify-content:center;
        flex-direction:column; text-align:center; padding:2rem;
        padding-top:calc(var(--nav-h) + 2rem);
      }
    </style>
    <div class="account-gate">
      <div style="font-size:4rem;margin-bottom:1.5rem">👤</div>
      <h2 class="display-md" style="margin-bottom:.8rem">Your Account</h2>
      <p class="lead" style="max-width:400px;margin:0 auto 2rem">Sign in to view your profile, bookings, and download history.</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center">
        <button class="btn btn-primary btn-lg" onclick="openAuthModal('login')">Sign In</button>
        <button class="btn btn-outline btn-lg" onclick="openAuthModal('register')">Create Account</button>
      </div>
    </div>`;
  }

  return renderAccountDashboard();
};

function renderAccountDashboard() {
  const u = currentUser;
  const initials = u.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

  return `
  <style>
    .account-shell {
      padding-top:var(--nav-h); min-height:100vh; background:#f4f5f4;
    }
    .account-hero {
      background:linear-gradient(135deg,#161919 0%,#2a2e2e 100%);
      padding:3rem 5% 5rem; position:relative; overflow:hidden;
    }
    .account-hero::before {
      content:''; position:absolute; top:-100px; right:-100px;
      width:400px; height:400px; border-radius:50%;
      background:radial-gradient(circle,rgba(9,200,184,.12) 0%,transparent 65%);
    }
    .account-hero-inner {
      max-width:900px; margin:0 auto;
      display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap;
    }
    .account-avatar-lg {
      width:72px; height:72px; border-radius:50%;
      background:linear-gradient(135deg,#09C8B8,#07a89a);
      color:#fff; display:flex; align-items:center; justify-content:center;
      font-size:1.6rem; font-weight:700; flex-shrink:0;
      font-family:var(--font-display);
    }
    .account-hero-name { font-family:var(--font-display); font-size:1.8rem; font-weight:700; color:#fff; }
    .account-hero-email { font-size:.85rem; color:rgba(255,255,255,.5); margin-top:.2rem; }
    .account-hero-actions { margin-left:auto; display:flex; gap:.8rem; }

    .account-tabs-bar {
      background:#fff; border-bottom:1px solid #e8ebe8;
      display:flex; gap:0; padding:0 5%; max-width:100%; overflow-x:auto;
    }
    .account-tab {
      padding:1rem 1.4rem; font-size:.85rem; font-weight:600; cursor:pointer;
      border:none; background:none; color:#848B8C; font-family:var(--font-body);
      border-bottom:2px solid transparent; white-space:nowrap;
      transition:color .2s, border-color .2s;
    }
    .account-tab.active { color:#09C8B8; border-bottom-color:#09C8B8; }
    .account-tab:hover { color:#161919; }

    .account-content {
      max-width:900px; margin:0 auto; padding:2rem 5%;
    }

    /* Profile form */
    .account-card {
      background:#fff; border-radius:16px; border:1px solid #e8ebe8;
      padding:2rem; margin-bottom:1.5rem;
    }
    .account-card-title { font-weight:700; font-size:1rem; color:#161919; margin-bottom:1.5rem; }
    .account-form-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
    .account-field { margin-bottom:1.2rem; }
    .account-label { display:block; font-size:.74rem; font-weight:700; color:#161919; margin-bottom:.4rem; text-transform:uppercase; letter-spacing:.4px; }
    .account-input {
      width:100%; padding:.75rem 1rem; border:1.5px solid #e8ebe8; border-radius:10px;
      font-size:.9rem; font-family:var(--font-body); color:#161919;
      outline:none; transition:border-color .2s, box-shadow .2s;
    }
    .account-input:focus { border-color:#09C8B8; box-shadow:0 0 0 3px rgba(9,200,184,.1); }
    .account-input:disabled { background:#f9faf9; color:#848B8C; }

    /* Bookings */
    .booking-item {
      border:1px solid #e8ebe8; border-radius:12px; padding:1.2rem 1.5rem;
      margin-bottom:.8rem; display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
    }
    .booking-icon { font-size:1.5rem; flex-shrink:0; }
    .booking-ref { font-size:.72rem; font-weight:700; color:#09C8B8; text-transform:uppercase; letter-spacing:.5px; }
    .booking-session { font-weight:600; font-size:.92rem; margin:.2rem 0; }
    .booking-date { font-size:.78rem; color:#848B8C; }
    .booking-status {
      margin-left:auto; padding:.3rem .85rem; border-radius:100px;
      font-size:.72rem; font-weight:700; text-transform:uppercase;
    }
    .status-pending   { background:#fef3c7; color:#92400e; }
    .status-confirmed { background:#d1fae5; color:#065f46; }
    .status-completed { background:#e3f8f7; color:#07a89a; }
    .status-cancelled { background:#fee2e2; color:#991b1b; }

    /* Downloads */
    .download-item {
      border:1px solid #e8ebe8; border-radius:12px; padding:1.2rem 1.5rem;
      margin-bottom:.8rem; display:flex; align-items:center; gap:1rem;
    }
    .download-icon { font-size:1.5rem; flex-shrink:0; }
    .download-title { font-weight:600; font-size:.92rem; }
    .download-date { font-size:.78rem; color:#848B8C; margin-top:.2rem; }
    .download-btn {
      margin-left:auto; padding:.4rem .9rem; border-radius:8px;
      background:#09C8B8; color:#fff; border:none; cursor:pointer;
      font-size:.78rem; font-weight:600; font-family:var(--font-body);
      transition:background .2s; text-decoration:none; white-space:nowrap;
    }
    .download-btn:hover { background:#07a89a; }

    /* Danger zone */
    .danger-zone {
      border:1px solid #fecaca; border-radius:12px; padding:1.5rem;
      background:#fff5f5;
    }
    .danger-zone h4 { color:#991b1b; font-weight:700; margin-bottom:.5rem; }
    .danger-zone p  { font-size:.84rem; color:#6b7280; margin-bottom:1rem; }

    @media(max-width:600px) {
      .account-form-row { grid-template-columns:1fr; }
      .account-hero-actions { margin-left:0; width:100%; }
    }
  </style>

  <div class="account-shell">
    <!-- Hero -->
    <div class="account-hero">
      <div class="account-hero-inner">
        <div class="account-avatar-lg">${initials}</div>
        <div>
          <div class="account-hero-name">${u.name}</div>
          <div class="account-hero-email">${u.email}</div>
        </div>
        <div class="account-hero-actions">
          <button class="btn btn-outline-white" onclick="userLogout()">Sign Out</button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="account-tabs-bar">
      <button class="account-tab active" id="tab-profile"   onclick="switchAccountTab('profile')">👤 Profile</button>
      <button class="account-tab"        id="tab-bookings"  onclick="switchAccountTab('bookings')">📅 My Bookings</button>
      <button class="account-tab"        id="tab-downloads" onclick="switchAccountTab('downloads')">⬇ My Downloads</button>
      <button class="account-tab"        id="tab-security"  onclick="switchAccountTab('security')">🔒 Security</button>
    </div>

    <!-- Content -->
    <div class="account-content" id="accountContent">
      <!-- Profile tab loads by default -->
    </div>
  </div>`;
}

// ── Switch account tab ─────────────────────
function switchAccountTab(tab) {
  document.querySelectorAll('.account-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tab}`)?.classList.add('active');

  const content = document.getElementById('accountContent');
  content.innerHTML = `<div style="text-align:center;padding:3rem;color:#848B8C">Loading…</div>`;

  switch(tab) {
    case 'profile':   loadProfileTab(content);   break;
    case 'bookings':  loadBookingsTab(content);   break;
    case 'downloads': loadDownloadsTab(content);  break;
    case 'security':  loadSecurityTab(content);   break;
  }
}

// ── PROFILE TAB ────────────────────────────
function loadProfileTab(content) {
  const u = currentUser;
  content.innerHTML = `
    <div class="account-card">
      <div class="account-card-title">Personal Information</div>
      <div class="auth-error" id="profileError" style="display:none"></div>
      <div class="auth-success" id="profileSuccess" style="display:none;background:#d1fae5;border:1px solid #a7f3d0;border-radius:8px;padding:.75rem 1rem;color:#065f46;font-size:.82rem;margin-bottom:1rem"></div>
      <form onsubmit="saveProfile(event)">
        <div class="account-form-row">
          <div class="account-field">
            <label class="account-label">Full Name</label>
            <input class="account-input" id="profileName" type="text" value="${u.name}" required>
          </div>
          <div class="account-field">
            <label class="account-label">Email Address</label>
            <input class="account-input" id="profileEmail" type="email" value="${u.email}" required>
          </div>
        </div>
        <div class="account-field">
          <label class="account-label">Member Since</label>
          <input class="account-input" type="text" value="${new Date(u.createdAt || Date.now()).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}" disabled>
        </div>
        <button type="submit" class="btn btn-primary" id="saveProfileBtn">Save Changes</button>
      </form>
    </div>`;
}

async function saveProfile(e) {
  e.preventDefault();
  const btn = document.getElementById('saveProfileBtn');
  const err = document.getElementById('profileError');
  const suc = document.getElementById('profileSuccess');
  err.style.display = 'none'; suc.style.display = 'none';
  btn.textContent = 'Saving…'; btn.disabled = true;

  try {
    const data = await userFetch('/auth/update-me', {
      method: 'PATCH',
      body: JSON.stringify({
        name:  document.getElementById('profileName').value.trim(),
        email: document.getElementById('profileEmail').value.trim()
      })
    });
    currentUser = data.data.user;
    localStorage.setItem('userData', JSON.stringify(currentUser));
    updateNavAccount();
    suc.textContent   = '✓ Profile updated successfully!';
    suc.style.display = 'block';
    showToast('Profile updated! ✓');
  } catch (e2) {
    err.textContent   = e2.message;
    err.style.display = 'block';
  } finally {
    btn.textContent = 'Save Changes'; btn.disabled = false;
  }
}

// ── BOOKINGS TAB ───────────────────────────
async function loadBookingsTab(content) {
  try {
    const data     = await userFetch('/bookings/my');
    const bookings = data.data.bookings;

    if (!bookings.length) {
      content.innerHTML = `
        <div class="account-card" style="text-align:center;padding:3rem">
          <div style="font-size:3rem;margin-bottom:1rem">📅</div>
          <h3 style="margin-bottom:.5rem">No Bookings Yet</h3>
          <p style="color:#848B8C;margin-bottom:1.5rem">You haven't booked a consultation yet.</p>
          <a class="btn btn-primary" onclick="navigate('book')">Book a Consultation →</a>
        </div>`; return;
    }

    const items = bookings.map(b => `
      <div class="booking-item">
        <div class="booking-icon">📅</div>
        <div>
          <div class="booking-ref">${b.bookingRef}</div>
          <div class="booking-session">${b.sessionType.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</div>
          <div class="booking-date">${b.concern.replace(/-/g,' ')} · ${new Date(b.createdAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div>
        </div>
        <span class="booking-status status-${b.status}">${b.status}</span>
      </div>`).join('');

    content.innerHTML = `
      <div class="account-card">
        <div class="account-card-title">My Consultations (${bookings.length})</div>
        ${items}
        <div style="margin-top:1.5rem">
          <a class="btn btn-primary" onclick="navigate('book')">+ Book Another Session</a>
        </div>
      </div>`;

  } catch(err) {
    content.innerHTML = `<div class="account-card" style="color:#ef4444;text-align:center;padding:2rem">${err.message}</div>`;
  }
}

// ── DOWNLOADS TAB ──────────────────────────
async function loadDownloadsTab(content) {
  try {
    // Fetch user's downloads by email
    const data      = await userFetch(`/downloads/my`).catch(() => ({ data: { downloads: [] } }));
    const downloads = data.data?.downloads || [];

    if (!downloads.length) {
      content.innerHTML = `
        <div class="account-card" style="text-align:center;padding:3rem">
          <div style="font-size:3rem;margin-bottom:1rem">📚</div>
          <h3 style="margin-bottom:.5rem">No Downloads Yet</h3>
          <p style="color:#848B8C;margin-bottom:1.5rem">You haven't downloaded any guides yet.</p>
          <a class="btn btn-primary" onclick="navigate('shop')">Browse Free Guides →</a>
        </div>`; return;
    }

    const items = downloads.map(d => `
      <div class="download-item">
        <div class="download-icon">📄</div>
        <div>
          <div class="download-title">${d.guideTitle}</div>
          <div class="download-date">Downloaded ${new Date(d.createdAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div>
        </div>
        <a href="${d.guideUrl || '#'}" download class="download-btn">⬇ Download Again</a>
      </div>`).join('');

    content.innerHTML = `
      <div class="account-card">
        <div class="account-card-title">My Downloads (${downloads.length})</div>
        ${items}
      </div>`;

  } catch(err) {
    content.innerHTML = `
      <div class="account-card" style="text-align:center;padding:3rem">
        <div style="font-size:3rem;margin-bottom:1rem">📚</div>
        <h3 style="margin-bottom:.5rem">No Downloads Yet</h3>
        <p style="color:#848B8C;margin-bottom:1.5rem">Browse our free guides and download your first one.</p>
        <a class="btn btn-primary" onclick="navigate('shop')">Browse Free Guides →</a>
      </div>`;
  }
}

// ── SECURITY TAB ───────────────────────────
function loadSecurityTab(content) {
  content.innerHTML = `
    <div class="account-card">
      <div class="account-card-title">Change Password</div>
      <div class="auth-error"   id="pwError"   style="display:none"></div>
      <div class="auth-success" id="pwSuccess" style="display:none;background:#d1fae5;border:1px solid #a7f3d0;border-radius:8px;padding:.75rem 1rem;color:#065f46;font-size:.82rem;margin-bottom:1rem"></div>
      <form onsubmit="changePassword(event)">
        <div class="account-field">
          <label class="account-label">Current Password</label>
          <input class="account-input" id="currentPw" type="password" placeholder="••••••••" required>
        </div>
        <div class="account-field">
          <label class="account-label">New Password</label>
          <input class="account-input" id="newPw" type="password" placeholder="Min 8 chars, uppercase + number" required>
        </div>
        <div class="account-field">
          <label class="account-label">Confirm New Password</label>
          <input class="account-input" id="confirmPw" type="password" placeholder="Repeat new password" required>
        </div>
        <button type="submit" class="btn btn-primary" id="changePwBtn">Update Password</button>
      </form>
    </div>

    <div class="account-card">
      <div class="account-card-title" style="color:#991b1b">Danger Zone</div>
      <div class="danger-zone">
        <h4>Delete Account</h4>
        <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button class="btn" style="background:#fee2e2;color:#991b1b;border:1px solid #fecaca" onclick="confirmDeleteAccount()">
          Delete My Account
        </button>
      </div>
    </div>`;
}

async function changePassword(e) {
  e.preventDefault();
  const btn = document.getElementById('changePwBtn');
  const err = document.getElementById('pwError');
  const suc = document.getElementById('pwSuccess');
  err.style.display = 'none'; suc.style.display = 'none';

  const newPw     = document.getElementById('newPw').value;
  const confirmPw = document.getElementById('confirmPw').value;

  if (newPw !== confirmPw) {
    err.textContent = 'New passwords do not match.';
    err.style.display = 'block'; return;
  }

  btn.textContent = 'Updating…'; btn.disabled = true;

  try {
    await userFetch('/auth/change-password', {
      method: 'PATCH',
      body: JSON.stringify({
        currentPassword: document.getElementById('currentPw').value,
        newPassword:     newPw
      })
    });
    suc.textContent   = '✓ Password updated successfully!';
    suc.style.display = 'block';
    e.target.reset();
    showToast('Password updated! ✓');
  } catch (e2) {
    err.textContent   = e2.message;
    err.style.display = 'block';
  } finally {
    btn.textContent = 'Update Password'; btn.disabled = false;
  }
}

async function confirmDeleteAccount() {
  const confirmed = confirm(
    'Are you absolutely sure?\n\nThis will permanently delete your account and all your data. This CANNOT be undone.'
  );
  if (!confirmed) return;

  try {
    await userFetch('/users/me', { method: 'DELETE' });
    clearUserSession();
    showToast('Account deleted. We\'re sorry to see you go.');
    navigate('home');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ── Add user endpoint for downloads ────────
// GET /api/v1/downloads/my — fetch user's own downloads by email
// This requires a backend route — add to downloadRoutes.js

// ── Auto-init on load ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initUserAuth();

  // Load profile tab by default when on account page
  const observer = new MutationObserver(() => {
    const content = document.getElementById('accountContent');
    if (content && !content.innerHTML.trim()) {
      switchAccountTab('profile');
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
