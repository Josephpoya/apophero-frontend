/* ═══════════════════════════════════════════
   APOPHERO HEALTH — ADMIN DASHBOARD
   Accessed via #admin (login protected)
═══════════════════════════════════════════ */

const ADMIN_API = 'https://apophero-backend.onrender.com/api/v1';
let adminToken  = null;
let adminUser   = null;
let currentAdminSection = 'overview';

// ── Check if logged in ─────────────────────
function isAdminLoggedIn() {
  const stored = localStorage.getItem('adminToken');
  if (stored) { adminToken = stored; return true; }
  return false;
}

// ── Admin API helper ───────────────────────
async function adminFetch(endpoint, options = {}) {
  const res = await fetch(`${ADMIN_API}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`,
      ...options.headers
    },
    ...options
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data;
}

// ── SHOW TOAST ─────────────────────────────
function adminToast(msg, type = 'success') {
  let t = document.getElementById('adminToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'adminToast';
    t.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(20px);
      background:#161919;color:#fff;padding:.85rem 2rem;border-radius:12px;
      font-size:.88rem;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,.3);
      z-index:99999;opacity:0;transition:all .3s;pointer-events:none;white-space:nowrap;
      font-family:'Outfit',sans-serif;`;
    document.body.appendChild(t);
  }
  const icon = type === 'success' ? '✓ ' : type === 'error' ? '✕ ' : 'ℹ ';
  const color = type === 'success' ? '#09C8B8' : type === 'error' ? '#ef4444' : '#f59e0b';
  t.innerHTML = `<span style="color:${color};font-weight:700">${icon}</span>${msg}`;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(20px)';
  }, 3500);
}

// ── ADMIN LOGIN PAGE ───────────────────────
pages['admin'] = function() {
  if (isAdminLoggedIn()) {
    return renderAdminDashboard();
  }
  return renderAdminLogin();
};

function renderAdminLogin() {
  return `
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    .admin-login-wrap {
      min-height:100vh; display:flex; align-items:center; justify-content:center;
      background:linear-gradient(135deg,#0d1111 0%,#161919 50%,#1a2020 100%);
      padding:2rem; padding-top:calc(var(--nav-h) + 2rem);
      position:relative; overflow:hidden;
    }
    .admin-login-wrap::before {
      content:''; position:absolute; top:-200px; left:50%; transform:translateX(-50%);
      width:700px; height:700px; border-radius:50%;
      background:radial-gradient(circle,rgba(9,200,184,.08) 0%,transparent 65%);
    }
    .admin-login-card {
      background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.08);
      border-radius:24px; padding:3rem; width:100%; max-width:420px;
      backdrop-filter:blur(20px); position:relative; z-index:1;
    }
    .admin-login-logo {
      text-align:center; margin-bottom:2.5rem;
    }
    .admin-login-logo .logo-text {
      font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:700;
      color:#fff; display:block;
    }
    .admin-login-logo .logo-text span { color:#09C8B8; }
    .admin-login-logo .logo-sub {
      font-size:.75rem; color:rgba(255,255,255,.3); font-weight:500;
      text-transform:uppercase; letter-spacing:2px; margin-top:.3rem; display:block;
    }
    .admin-login-title {
      font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:700;
      color:#fff; margin-bottom:.4rem;
    }
    .admin-login-sub { font-size:.82rem; color:rgba(255,255,255,.4); margin-bottom:2rem; }
    .admin-field { margin-bottom:1.2rem; }
    .admin-field label {
      display:block; font-size:.75rem; font-weight:600;
      color:rgba(255,255,255,.5); margin-bottom:.5rem; text-transform:uppercase; letter-spacing:.5px;
    }
    .admin-field input {
      width:100%; padding:.85rem 1.1rem;
      background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
      border-radius:10px; color:#fff; font-size:.92rem; font-family:'Outfit',sans-serif;
      outline:none; transition:border-color .2s, box-shadow .2s;
    }
    .admin-field input:focus {
      border-color:#09C8B8;
      box-shadow:0 0 0 3px rgba(9,200,184,.12);
    }
    .admin-field input::placeholder { color:rgba(255,255,255,.2); }
    .admin-login-btn {
      width:100%; padding:1rem; border-radius:10px; border:none; cursor:pointer;
      background:linear-gradient(135deg,#09C8B8,#07a89a);
      color:#fff; font-size:.95rem; font-weight:700; font-family:'Outfit',sans-serif;
      transition:opacity .2s, transform .15s; margin-top:.5rem;
    }
    .admin-login-btn:hover { opacity:.9; transform:translateY(-1px); }
    .admin-login-btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }
    .admin-login-error {
      background:rgba(239,68,68,.1); border:1px solid rgba(239,68,68,.2);
      border-radius:8px; padding:.8rem 1rem;
      color:#fca5a5; font-size:.82rem; margin-bottom:1rem; display:none;
    }
    .admin-back {
      text-align:center; margin-top:1.5rem;
      font-size:.8rem; color:rgba(255,255,255,.25);
    }
    .admin-back a { color:rgba(9,200,184,.7); cursor:pointer; }
    .admin-back a:hover { color:#09C8B8; }
  </style>

  <div class="admin-login-wrap">
    <div class="admin-login-card">
      <div class="admin-login-logo">
        <span class="logo-text">Apophero <span>Health</span></span>
        <span class="logo-sub">Admin Dashboard</span>
      </div>
      <h2 class="admin-login-title">Welcome back</h2>
      <p class="admin-login-sub">Sign in to manage your content</p>
      <div class="admin-login-error" id="loginError"></div>
      <form onsubmit="submitAdminLogin(event)">
        <div class="admin-field">
          <label>Email Address</label>
          <input type="email" id="loginEmail" placeholder="admin@apopherohealth.com" required>
        </div>
        <div class="admin-field">
          <label>Password</label>
          <input type="password" id="loginPassword" placeholder="••••••••" required>
        </div>
        <button type="submit" class="admin-login-btn" id="loginBtn">Sign In →</button>
      </form>
      <div class="admin-back">
        <a onclick="navigate('home')">← Back to website</a>
      </div>
    </div>
  </div>`;
}

async function submitAdminLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  const err = document.getElementById('loginError');
  btn.textContent = 'Signing in…'; btn.disabled = true;
  err.style.display = 'none';

  try {
    const data = await fetch(`${ADMIN_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:    document.getElementById('loginEmail').value.trim(),
        password: document.getElementById('loginPassword').value
      })
    }).then(r => r.json());

    if (!data.success) throw new Error(data.message);
    if (data.data.user.role !== 'admin') throw new Error('Access denied. Admin only.');

    adminToken = data.data.token;
    adminUser  = data.data.user;
    localStorage.setItem('adminToken', adminToken);

    // Reload admin page
    const app = document.getElementById('app');
    app.innerHTML = renderAdminDashboard() + renderFooter();
    initReveal();

  } catch (err2) {
    err.textContent = err2.message || 'Login failed. Check your credentials.';
    err.style.display = 'block';
    btn.textContent = 'Sign In →'; btn.disabled = false;
  }
}

function adminLogout() {
  adminToken = null; adminUser = null;
  localStorage.removeItem('adminToken');
  navigate('home');
}

// ── MAIN DASHBOARD SHELL ───────────────────
function renderAdminDashboard() {
  return `
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* ── ADMIN SHELL ── */
    .admin-shell {
      display:grid; grid-template-columns:260px 1fr;
      min-height:100vh; padding-top:var(--nav-h);
      background:#f4f5f4; font-family:'Outfit',sans-serif;
    }

    /* ── SIDEBAR ── */
    .admin-sidebar {
      background:#161919; position:sticky; top:var(--nav-h);
      height:calc(100vh - var(--nav-h)); overflow-y:auto;
      display:flex; flex-direction:column; padding:1.5rem 0;
    }
    .admin-sidebar::-webkit-scrollbar { width:4px; }
    .admin-sidebar::-webkit-scrollbar-thumb { background:#09C8B8; border-radius:2px; }
    .admin-brand {
      padding:0 1.5rem 1.5rem;
      border-bottom:1px solid rgba(255,255,255,.07);
      margin-bottom:1rem;
    }
    .admin-brand-name {
      font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700;
      color:#fff; display:block;
    }
    .admin-brand-name span { color:#09C8B8; }
    .admin-brand-role {
      font-size:.7rem; color:rgba(255,255,255,.3); text-transform:uppercase; letter-spacing:1px;
    }
    .admin-nav-section {
      padding:0 1rem; margin-bottom:1.5rem;
    }
    .admin-nav-label {
      font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:1.2px;
      color:rgba(255,255,255,.2); padding:.5rem .5rem .8rem; display:block;
    }
    .admin-nav-item {
      display:flex; align-items:center; gap:.8rem;
      padding:.72rem .9rem; border-radius:10px; cursor:pointer;
      color:rgba(255,255,255,.5); font-size:.85rem; font-weight:500;
      transition:all .2s; margin-bottom:.2rem; border:none; background:none;
      width:100%; text-align:left;
    }
    .admin-nav-item:hover { background:rgba(255,255,255,.06); color:#fff; }
    .admin-nav-item.active { background:rgba(9,200,184,.15); color:#09C8B8; }
    .admin-nav-item.active .nav-icon { color:#09C8B8; }
    .nav-icon { font-size:1rem; width:20px; text-align:center; flex-shrink:0; }
    .admin-nav-badge {
      margin-left:auto; background:#09C8B8; color:#fff;
      font-size:.65rem; font-weight:700; padding:.15rem .5rem; border-radius:100px;
    }
    .admin-nav-badge.red { background:#ef4444; }
    .admin-sidebar-footer {
      margin-top:auto; padding:1.5rem 1rem 0;
      border-top:1px solid rgba(255,255,255,.07);
    }
    .admin-logout-btn {
      display:flex; align-items:center; gap:.8rem;
      padding:.72rem .9rem; border-radius:10px; cursor:pointer;
      color:rgba(255,255,255,.35); font-size:.85rem; font-weight:500;
      transition:all .2s; border:none; background:none; width:100%; text-align:left;
    }
    .admin-logout-btn:hover { background:rgba(239,68,68,.1); color:#fca5a5; }

    /* ── MAIN CONTENT ── */
    .admin-main { padding:2rem; overflow-y:auto; }
    .admin-topbar {
      display:flex; align-items:center; justify-content:space-between;
      margin-bottom:2rem; flex-wrap:wrap; gap:1rem;
    }
    .admin-page-title {
      font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:700; color:#161919;
    }
    .admin-page-sub { font-size:.82rem; color:#848B8C; margin-top:.2rem; }

    /* ── STAT CARDS ── */
    .stat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:1.2rem; margin-bottom:2rem; }
    .stat-card {
      background:#fff; border-radius:16px; padding:1.5rem;
      border:1px solid #e8ebe8;
      transition:transform .2s, box-shadow .2s;
    }
    .stat-card:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.08); }
    .stat-icon { font-size:1.5rem; margin-bottom:.8rem; }
    .stat-label { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.8px; color:#848B8C; }
    .stat-num { font-family:'Cormorant Garamond',serif; font-size:2.4rem; font-weight:700; color:#161919; line-height:1; margin:.3rem 0; }
    .stat-change { font-size:.75rem; color:#09C8B8; font-weight:600; }
    .stat-change.down { color:#ef4444; }

    /* ── TABLES ── */
    .admin-card {
      background:#fff; border-radius:16px; border:1px solid #e8ebe8;
      overflow:hidden; margin-bottom:1.5rem;
    }
    .admin-card-header {
      padding:1.2rem 1.5rem; border-bottom:1px solid #f0f2f0;
      display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:.8rem;
    }
    .admin-card-title { font-weight:700; font-size:1rem; color:#161919; }
    .admin-table { width:100%; border-collapse:collapse; }
    .admin-table th {
      text-align:left; padding:.9rem 1.5rem;
      font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.8px;
      color:#848B8C; background:#f9faf9; border-bottom:1px solid #f0f2f0;
    }
    .admin-table td {
      padding:.9rem 1.5rem; font-size:.85rem; color:#2a2e2a;
      border-bottom:1px solid #f5f6f5;
    }
    .admin-table tr:last-child td { border-bottom:none; }
    .admin-table tr:hover td { background:#fafbfa; }
    .admin-table-empty {
      text-align:center; padding:3rem; color:#848B8C; font-size:.88rem;
    }

    /* ── BADGES ── */
    .badge-status {
      display:inline-block; padding:.25rem .75rem; border-radius:100px;
      font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.4px;
    }
    .badge-pending  { background:#fef3c7; color:#92400e; }
    .badge-confirmed{ background:#d1fae5; color:#065f46; }
    .badge-new      { background:#dbeafe; color:#1e40af; }
    .badge-read     { background:#f3f4f6; color:#6b7280; }
    .badge-published{ background:#d1fae5; color:#065f46; }
    .badge-draft    { background:#fef3c7; color:#92400e; }
    .badge-free     { background:#e3f8f7; color:#07a89a; }

    /* ── ACTION BUTTONS ── */
    .btn-admin {
      padding:.45rem .9rem; border-radius:8px; font-size:.78rem; font-weight:600;
      cursor:pointer; border:none; transition:all .15s; font-family:'Outfit',sans-serif;
    }
    .btn-admin-primary { background:#09C8B8; color:#fff; }
    .btn-admin-primary:hover { background:#07a89a; }
    .btn-admin-dark { background:#161919; color:#fff; }
    .btn-admin-dark:hover { background:#2a2e2e; }
    .btn-admin-danger { background:#fee2e2; color:#991b1b; }
    .btn-admin-danger:hover { background:#fecaca; }
    .btn-admin-ghost { background:#f3f4f6; color:#374151; }
    .btn-admin-ghost:hover { background:#e5e7eb; }
    .btn-admin-sm { padding:.3rem .7rem; font-size:.72rem; }

    /* ── FORMS ── */
    .admin-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.2rem; }
    .admin-form-group { margin-bottom:1.2rem; }
    .admin-form-group.full { grid-column:1/-1; }
    .admin-form-label { display:block; font-size:.75rem; font-weight:700; color:#161919; margin-bottom:.4rem; text-transform:uppercase; letter-spacing:.4px; }
    .admin-form-input, .admin-form-select, .admin-form-textarea {
      width:100%; padding:.75rem 1rem;
      border:1.5px solid #e8ebe8; border-radius:10px;
      font-size:.88rem; font-family:'Outfit',sans-serif; color:#161919;
      background:#fff; outline:none;
      transition:border-color .2s, box-shadow .2s;
    }
    .admin-form-input:focus, .admin-form-select:focus, .admin-form-textarea:focus {
      border-color:#09C8B8; box-shadow:0 0 0 3px rgba(9,200,184,.1);
    }
    .admin-form-textarea { resize:vertical; min-height:120px; }

    /* ── RICH TEXT EDITOR ── */
    .rte-toolbar {
      display:flex; gap:.3rem; flex-wrap:wrap; padding:.75rem 1rem;
      background:#f9faf9; border:1.5px solid #e8ebe8;
      border-bottom:none; border-radius:10px 10px 0 0;
    }
    .rte-btn {
      padding:.35rem .65rem; border-radius:6px; border:1px solid #e8ebe8;
      background:#fff; font-size:.8rem; cursor:pointer; font-family:'Outfit',sans-serif;
      font-weight:600; color:#374151; transition:all .15s;
    }
    .rte-btn:hover { background:#09C8B8; color:#fff; border-color:#09C8B8; }
    .rte-sep { width:1px; background:#e8ebe8; margin:0 .3rem; }
    .rte-content {
      border:1.5px solid #e8ebe8; border-radius:0 0 10px 10px;
      min-height:300px; padding:1rem 1.2rem;
      font-family:'Outfit',sans-serif; font-size:.92rem; line-height:1.75;
      outline:none; color:#161919;
    }
    .rte-content:focus { border-color:#09C8B8; box-shadow:0 0 0 3px rgba(9,200,184,.1); }
    .rte-content h2 { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-weight:700; margin:1rem 0 .5rem; }
    .rte-content h3 { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:600; margin:.8rem 0 .4rem; }
    .rte-content blockquote { border-left:3px solid #09C8B8; padding:.5rem 1rem; background:#e3f8f7; margin:1rem 0; border-radius:0 8px 8px 0; }
    .rte-content ul, .rte-content ol { margin:0 0 .8rem 1.5rem; }

    /* ── UPLOAD ZONE ── */
    .upload-zone {
      border:2px dashed #e8ebe8; border-radius:12px; padding:2rem;
      text-align:center; cursor:pointer; transition:all .2s;
      background:#fafbfa;
    }
    .upload-zone:hover { border-color:#09C8B8; background:#e3f8f7; }
    .upload-zone-icon { font-size:2rem; margin-bottom:.5rem; }
    .upload-zone-text { font-size:.85rem; color:#848B8C; }
    .upload-zone-text strong { color:#09C8B8; }
    .upload-preview {
      width:100%; height:160px; border-radius:10px; object-fit:cover;
      margin-top:1rem; display:none;
    }

    /* ── SEARCH / FILTER BAR ── */
    .admin-filter-bar {
      display:flex; gap:.8rem; margin-bottom:1.5rem; flex-wrap:wrap;
    }
    .admin-search {
      flex:1; min-width:200px; padding:.65rem 1rem;
      border:1.5px solid #e8ebe8; border-radius:10px;
      font-size:.85rem; font-family:'Outfit',sans-serif;
      outline:none; transition:border-color .2s;
    }
    .admin-search:focus { border-color:#09C8B8; }
    .admin-select-filter {
      padding:.65rem 1rem; border:1.5px solid #e8ebe8; border-radius:10px;
      font-size:.85rem; font-family:'Outfit',sans-serif; outline:none;
      background:#fff; cursor:pointer;
    }

    /* ── MODAL ── */
    .admin-modal-bg {
      position:fixed; inset:0; background:rgba(22,25,25,.6);
      backdrop-filter:blur(4px); z-index:9998;
      display:flex; align-items:center; justify-content:center; padding:1rem;
    }
    .admin-modal {
      background:#fff; border-radius:20px;
      width:100%; max-width:720px; max-height:90vh;
      overflow-y:auto; animation:fadeUp .3s ease;
    }
    .admin-modal-header {
      padding:1.5rem 2rem; border-bottom:1px solid #f0f2f0;
      display:flex; align-items:center; justify-content:space-between;
      position:sticky; top:0; background:#fff; z-index:1;
    }
    .admin-modal-title { font-weight:700; font-size:1.1rem; color:#161919; }
    .admin-modal-close {
      width:36px; height:36px; border-radius:50%; border:none;
      background:#f3f4f6; cursor:pointer; font-size:1rem;
      display:flex; align-items:center; justify-content:center;
      transition:background .2s;
    }
    .admin-modal-close:hover { background:#e5e7eb; }
    .admin-modal-body { padding:2rem; }
    .admin-modal-footer {
      padding:1.2rem 2rem; border-top:1px solid #f0f2f0;
      display:flex; justify-content:flex-end; gap:.8rem;
      position:sticky; bottom:0; background:#fff;
    }

    /* ── PAGINATION ── */
    .admin-pagination {
      display:flex; align-items:center; justify-content:center; gap:.5rem;
      padding:1.2rem; border-top:1px solid #f0f2f0;
    }
    .admin-page-btn {
      width:36px; height:36px; border-radius:8px; border:1px solid #e8ebe8;
      background:#fff; cursor:pointer; font-size:.85rem; font-family:'Outfit',sans-serif;
      display:flex; align-items:center; justify-content:center;
      transition:all .15s; color:#374151;
    }
    .admin-page-btn:hover { background:#09C8B8; color:#fff; border-color:#09C8B8; }
    .admin-page-btn.active { background:#09C8B8; color:#fff; border-color:#09C8B8; }
    .admin-page-btn:disabled { opacity:.4; cursor:not-allowed; }

    /* ── RESPONSIVE ── */
    @media(max-width:960px) {
      .admin-shell { grid-template-columns:1fr; }
      .admin-sidebar { position:relative; height:auto; }
      .admin-form-grid { grid-template-columns:1fr; }
    }
  </style>

  <div class="admin-shell">
    <!-- SIDEBAR -->
    <aside class="admin-sidebar">
      <div class="admin-brand">
        <span class="admin-brand-name">Apophero <span>Health</span></span>
        <span class="admin-brand-role">Admin Dashboard</span>
      </div>

      <div class="admin-nav-section">
        <span class="admin-nav-label">Main</span>
        <button class="admin-nav-item active" id="nav-overview" onclick="adminNavigate('overview')">
          <span class="nav-icon">📊</span> Overview
        </button>
        <button class="admin-nav-item" id="nav-blog" onclick="adminNavigate('blog')">
          <span class="nav-icon">✍️</span> Blog Posts
        </button>
        <button class="admin-nav-item" id="nav-guides" onclick="adminNavigate('guides')">
          <span class="nav-icon">📚</span> Guides & Products
        </button>
      </div>

      <div class="admin-nav-section">
        <span class="admin-nav-label">Customers</span>
        <button class="admin-nav-item" id="nav-bookings" onclick="adminNavigate('bookings')">
          <span class="nav-icon">📅</span> Bookings
          <span class="admin-nav-badge red" id="badge-bookings">…</span>
        </button>
        <button class="admin-nav-item" id="nav-contacts" onclick="adminNavigate('contacts')">
          <span class="nav-icon">✉️</span> Messages
          <span class="admin-nav-badge red" id="badge-contacts">…</span>
        </button>
        <button class="admin-nav-item" id="nav-downloads" onclick="adminNavigate('downloads')">
          <span class="nav-icon">⬇️</span> Downloads
        </button>
        <button class="admin-nav-item" id="nav-newsletter" onclick="adminNavigate('newsletter')">
          <span class="nav-icon">📧</span> Newsletter
        </button>
      </div>

      <div class="admin-sidebar-footer">
        <button class="admin-logout-btn" onclick="adminLogout()">
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="admin-main" id="adminContent">
      <div style="text-align:center;padding:4rem;color:#848B8C">
        <div style="font-size:2rem;margin-bottom:1rem">⏳</div>
        Loading dashboard…
      </div>
    </main>
  </div>`;
}

// ── ADMIN NAVIGATION ───────────────────────
async function adminNavigate(section) {
  currentAdminSection = section;

  // Update sidebar active
  document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
  document.getElementById(`nav-${section}`)?.classList.add('active');

  const content = document.getElementById('adminContent');
  content.innerHTML = `<div style="text-align:center;padding:4rem;color:#848B8C"><div style="font-size:2rem;margin-bottom:1rem">⏳</div>Loading…</div>`;

  try {
    switch(section) {
      case 'overview':  await loadOverview();  break;
      case 'blog':      await loadBlog();      break;
      case 'guides':    await loadGuides();    break;
      case 'bookings':  await loadBookings();  break;
      case 'contacts':  await loadContacts();  break;
      case 'downloads': await loadDownloads(); break;
      case 'newsletter':await loadNewsletter();break;
    }
  } catch (err) {
    content.innerHTML = `
      <div style="text-align:center;padding:4rem">
        <div style="font-size:2rem;margin-bottom:1rem">❌</div>
        <p style="color:#ef4444;font-weight:600">${err.message}</p>
        <button class="btn-admin btn-admin-ghost" style="margin-top:1rem" onclick="adminNavigate('${section}')">Retry</button>
      </div>`;
  }
}

// ─────────────────────────────────────────
//  OVERVIEW
// ─────────────────────────────────────────
async function loadOverview() {
  const data = await adminFetch('/admin/dashboard');
  const s    = data.data.stats;
  const r    = data.data.recent;

  // Update sidebar badges
  document.getElementById('badge-bookings').textContent = s.bookings.pending || 0;
  document.getElementById('badge-contacts').textContent = s.contacts.unread  || 0;

  const recentBookings = r.bookings.slice(0,5).map(b => `
    <tr>
      <td><strong>${b.firstName} ${b.lastName}</strong><br><span style="color:#848B8C;font-size:.75rem">${b.email}</span></td>
      <td><span class="badge-status badge-${b.status}">${b.status}</span></td>
      <td style="color:#848B8C">${b.sessionType}</td>
      <td style="color:#848B8C">${new Date(b.createdAt).toLocaleDateString()}</td>
      <td><button class="btn-admin btn-admin-ghost btn-admin-sm" onclick="adminNavigate('bookings')">View</button></td>
    </tr>`).join('') || `<tr><td colspan="5" class="admin-table-empty">No bookings yet</td></tr>`;

  const recentContacts = r.contacts.slice(0,5).map(c => `
    <tr>
      <td><strong>${c.firstName} ${c.lastName}</strong></td>
      <td style="color:#848B8C;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.subject}</td>
      <td><span class="badge-status badge-${c.status}">${c.status}</span></td>
      <td style="color:#848B8C">${new Date(c.createdAt).toLocaleDateString()}</td>
    </tr>`).join('') || `<tr><td colspan="4" class="admin-table-empty">No messages yet</td></tr>`;

  document.getElementById('adminContent').innerHTML = `
    <div class="admin-topbar">
      <div>
        <h1 class="admin-page-title">Good ${new Date().getHours()<12?'morning':'afternoon'} 👋</h1>
        <p class="admin-page-sub">Here's what's happening with Apophero Health today</p>
      </div>
      <button class="btn-admin btn-admin-primary" onclick="adminNavigate('blog')">+ New Blog Post</button>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-label">Total Users</div>
        <div class="stat-num">${s.users.total}</div>
        <div class="stat-change">+${s.users.thisMonth} this month</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📅</div>
        <div class="stat-label">Bookings</div>
        <div class="stat-num">${s.bookings.total}</div>
        <div class="stat-change">${s.bookings.pending} pending</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✉️</div>
        <div class="stat-label">Messages</div>
        <div class="stat-num">${s.contacts.total}</div>
        <div class="stat-change" style="color:${s.contacts.unread>0?'#ef4444':'#09C8B8'}">${s.contacts.unread} unread</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📧</div>
        <div class="stat-label">Subscribers</div>
        <div class="stat-num">${s.newsletter.active}</div>
        <div class="stat-change">of ${s.newsletter.total} total</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-label">Blog Posts</div>
        <div class="stat-num">${s.blog.published}</div>
        <div class="stat-change">${s.blog.total} total</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
      <div class="admin-card">
        <div class="admin-card-header">
          <span class="admin-card-title">Recent Bookings</span>
          <button class="btn-admin btn-admin-ghost btn-admin-sm" onclick="adminNavigate('bookings')">View All</button>
        </div>
        <table class="admin-table">
          <thead><tr><th>Client</th><th>Status</th><th>Session</th><th>Date</th><th></th></tr></thead>
          <tbody>${recentBookings}</tbody>
        </table>
      </div>
      <div class="admin-card">
        <div class="admin-card-header">
          <span class="admin-card-title">Recent Messages</span>
          <button class="btn-admin btn-admin-ghost btn-admin-sm" onclick="adminNavigate('contacts')">View All</button>
        </div>
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Subject</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>${recentContacts}</tbody>
        </table>
      </div>
    </div>`;
}

// ─────────────────────────────────────────
//  BLOG MANAGEMENT
// ─────────────────────────────────────────
async function loadBlog(page = 1) {
  const data = await adminFetch(`/admin/blog?page=${page}&limit=10`);
  const posts = data.data.posts;
  const meta  = data.meta;

  const rows = posts.map(p => `
    <tr>
      <td>
        <div style="font-weight:600;color:#161919">${p.title}</div>
        <div style="font-size:.73rem;color:#848B8C;margin-top:.2rem">${p.category} · ${p.readTime || '5 min read'}</div>
      </td>
      <td><span class="badge-status badge-${p.status}">${p.status}</span></td>
      <td style="color:#848B8C">${p.author?.name || 'Admin'}</td>
      <td style="color:#848B8C">${p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '—'}</td>
      <td style="color:#848B8C">${p.views || 0}</td>
      <td>
        <div style="display:flex;gap:.4rem">
          <button class="btn-admin btn-admin-ghost btn-admin-sm" onclick="openBlogEditor('${p._id}')">Edit</button>
          <button class="btn-admin btn-admin-danger btn-admin-sm" onclick="deleteBlogPost('${p._id}','${p.title.replace(/'/g,"\\'")}')">Delete</button>
        </div>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" class="admin-table-empty">No blog posts yet. Create your first one!</td></tr>`;

  const pagination = meta ? `
    <div class="admin-pagination">
      <button class="admin-page-btn" onclick="loadBlog(${meta.page-1})" ${!meta.hasPrev?'disabled':''}>‹</button>
      <span style="font-size:.82rem;color:#848B8C">Page ${meta.page} of ${meta.pages}</span>
      <button class="admin-page-btn" onclick="loadBlog(${meta.page+1})" ${!meta.hasNext?'disabled':''}>›</button>
    </div>` : '';

  document.getElementById('adminContent').innerHTML = `
    <div class="admin-topbar">
      <div>
        <h1 class="admin-page-title">Blog Posts</h1>
        <p class="admin-page-sub">Create and manage your health articles</p>
      </div>
      <button class="btn-admin btn-admin-primary" onclick="openBlogEditor()">+ New Post</button>
    </div>
    <div class="admin-card">
      <div class="admin-card-header">
        <span class="admin-card-title">All Posts (${meta?.total || posts.length})</span>
        <div style="display:flex;gap:.6rem">
          <select class="admin-select-filter" onchange="loadBlogFiltered(this.value)">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      <table class="admin-table">
        <thead><tr><th>Title</th><th>Status</th><th>Author</th><th>Published</th><th>Views</th><th>Actions</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${pagination}
    </div>`;
}

async function loadBlogFiltered(status) {
  const data = await adminFetch(`/admin/blog?${status?'status='+status:''}&limit=20`);
  const posts = data.data.posts;
  const rows = posts.map(p => `
    <tr>
      <td><div style="font-weight:600">${p.title}</div><div style="font-size:.73rem;color:#848B8C">${p.category}</div></td>
      <td><span class="badge-status badge-${p.status}">${p.status}</span></td>
      <td style="color:#848B8C">${p.author?.name || 'Admin'}</td>
      <td style="color:#848B8C">${p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '—'}</td>
      <td style="color:#848B8C">${p.views || 0}</td>
      <td>
        <div style="display:flex;gap:.4rem">
          <button class="btn-admin btn-admin-ghost btn-admin-sm" onclick="openBlogEditor('${p._id}')">Edit</button>
          <button class="btn-admin btn-admin-danger btn-admin-sm" onclick="deleteBlogPost('${p._id}','${p.title.replace(/'/g,"\\'")}')">Delete</button>
        </div>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" class="admin-table-empty">No posts found</td></tr>`;

  document.querySelector('.admin-table tbody').innerHTML = rows;
}

function openBlogEditor(postId = null) {
  const isEdit = !!postId;
  const modalHtml = `
    <div class="admin-modal-bg" id="blogModal">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <span class="admin-modal-title">${isEdit ? 'Edit Blog Post' : 'New Blog Post'}</span>
          <button class="admin-modal-close" onclick="closeModal('blogModal')">✕</button>
        </div>
        <div class="admin-modal-body">
          <div class="admin-form-grid">
            <div class="admin-form-group full">
              <label class="admin-form-label">Post Title *</label>
              <input class="admin-form-input" id="blogTitle" placeholder="Enter a compelling title…">
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Category *</label>
              <select class="admin-form-select" id="blogCategory">
                <option value="">Select category…</option>
                <option>Weight Loss</option>
                <option>Men's Health</option>
                <option>Women's Health</option>
                <option>Wellness</option>
                <option>Mental Health</option>
                <option>Nutrition</option>
              </select>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Topic *</label>
              <select class="admin-form-select" id="blogTopic">
                <option value="">Select topic…</option>
                <option value="weight">Weight</option>
                <option value="hormones">Hormones</option>
                <option value="sexual-health">Sexual Health</option>
                <option value="pregnancy">Pregnancy</option>
                <option value="mental-health">Mental Health</option>
                <option value="wellness">Wellness</option>
                <option value="nutrition">Nutrition</option>
              </select>
            </div>
            <div class="admin-form-group full">
              <label class="admin-form-label">Excerpt * (max 300 chars)</label>
              <textarea class="admin-form-textarea" id="blogExcerpt" rows="2" placeholder="A brief summary shown on the blog listing page…" style="min-height:70px"></textarea>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Read Time</label>
              <input class="admin-form-input" id="blogReadTime" placeholder="e.g. 8 min read">
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Status</label>
              <select class="admin-form-select" id="blogStatus">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Cover Image Emoji</label>
              <input class="admin-form-input" id="blogEmoji" placeholder="e.g. 🔥">
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Featured?</label>
              <select class="admin-form-select" id="blogFeatured">
                <option value="false">No</option>
                <option value="true">Yes — show on homepage</option>
              </select>
            </div>
            <div class="admin-form-group full">
              <label class="admin-form-label">Article Content *</label>
              <div class="rte-toolbar">
                <button class="rte-btn" onclick="rteCmd('bold')" title="Bold"><b>B</b></button>
                <button class="rte-btn" onclick="rteCmd('italic')" title="Italic"><i>I</i></button>
                <button class="rte-btn" onclick="rteCmd('underline')" title="Underline"><u>U</u></button>
                <div class="rte-sep"></div>
                <button class="rte-btn" onclick="rteHeading(2)">H2</button>
                <button class="rte-btn" onclick="rteHeading(3)">H3</button>
                <div class="rte-sep"></div>
                <button class="rte-btn" onclick="rteCmd('insertUnorderedList')">• List</button>
                <button class="rte-btn" onclick="rteCmd('insertOrderedList')">1. List</button>
                <div class="rte-sep"></div>
                <button class="rte-btn" onclick="rteBlockquote()">❝ Quote</button>
                <button class="rte-btn" onclick="rteLink()">🔗 Link</button>
                <div class="rte-sep"></div>
                <button class="rte-btn" onclick="rteCmd('removeFormat')">✕ Clear</button>
              </div>
              <div class="rte-content" id="blogContent" contenteditable="true"
                   placeholder="Start writing your article here…"></div>
            </div>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button class="btn-admin btn-admin-ghost" onclick="closeModal('blogModal')">Cancel</button>
          <button class="btn-admin btn-admin-primary" onclick="saveBlogPost('${postId || ''}')">
            ${isEdit ? 'Save Changes' : 'Create Post'}
          </button>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  if (isEdit) loadBlogPostForEdit(postId);
}

async function loadBlogPostForEdit(postId) {
  try {
    const data = await adminFetch(`/blog/${postId}`);
    const p    = data.data.post;
    document.getElementById('blogTitle').value    = p.title    || '';
    document.getElementById('blogCategory').value = p.category || '';
    document.getElementById('blogTopic').value    = p.topic    || '';
    document.getElementById('blogExcerpt').value  = p.excerpt  || '';
    document.getElementById('blogReadTime').value = p.readTime || '';
    document.getElementById('blogStatus').value   = p.status   || 'draft';
    document.getElementById('blogEmoji').value    = p.emoji    || '';
    document.getElementById('blogFeatured').value = p.featured ? 'true' : 'false';
    document.getElementById('blogContent').innerHTML = p.content || '';
  } catch (err) {
    adminToast('Failed to load post: ' + err.message, 'error');
  }
}

async function saveBlogPost(postId) {
  const title    = document.getElementById('blogTitle').value.trim();
  const category = document.getElementById('blogCategory').value;
  const topic    = document.getElementById('blogTopic').value;
  const excerpt  = document.getElementById('blogExcerpt').value.trim();
  const content  = document.getElementById('blogContent').innerHTML.trim();

  if (!title || !category || !topic || !excerpt || !content) {
    adminToast('Please fill in all required fields', 'error'); return;
  }

  const payload = {
    title, category, topic, excerpt, content,
    readTime: document.getElementById('blogReadTime').value || '5 min read',
    status:   document.getElementById('blogStatus').value,
    emoji:    document.getElementById('blogEmoji').value || '📝',
    featured: document.getElementById('blogFeatured').value === 'true'
  };

  try {
    if (postId) {
      await adminFetch(`/blog/${postId}`, { method:'PATCH', body:JSON.stringify(payload) });
      adminToast('Post updated successfully! ✓');
    } else {
      await adminFetch('/blog', { method:'POST', body:JSON.stringify(payload) });
      adminToast('Post created successfully! ✓');
    }
    closeModal('blogModal');
    await loadBlog();
  } catch (err) {
    adminToast(err.message, 'error');
  }
}

async function deleteBlogPost(id, title) {
  if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
  try {
    await adminFetch(`/blog/${id}`, { method:'DELETE' });
    adminToast('Post deleted');
    await loadBlog();
  } catch (err) { adminToast(err.message, 'error'); }
}

// Rich text editor helpers
function rteCmd(cmd) {
  document.getElementById('blogContent').focus();
  document.execCommand(cmd, false, null);
}
function rteHeading(level) {
  document.getElementById('blogContent').focus();
  document.execCommand('formatBlock', false, `h${level}`);
}
function rteBlockquote() {
  document.getElementById('blogContent').focus();
  document.execCommand('formatBlock', false, 'blockquote');
}
function rteLink() {
  const url = prompt('Enter URL:');
  if (url) { document.getElementById('blogContent').focus(); document.execCommand('createLink', false, url); }
}

// ─────────────────────────────────────────
//  GUIDES MANAGEMENT
// ─────────────────────────────────────────
async function loadGuides() {
  let guides = [];
  try {
    const data = await adminFetch('/admin/guides');
    guides = data.data.guides || [];
  } catch(_) {}

  const rows = guides.map(g => `
    <tr>
      <td><strong>${g.name}</strong></td>
      <td style="color:#848B8C">${g.size}</td>
      <td style="color:#848B8C">${new Date(g.createdAt).toLocaleDateString()}</td>
      <td>
        <div style="display:flex;gap:.4rem">
          <a href="${g.url}" target="_blank" class="btn-admin btn-admin-ghost btn-admin-sm">View</a>
          <button class="btn-admin btn-admin-danger btn-admin-sm" onclick="deleteGuide('${g.name}')">Delete</button>
        </div>
      </td>
    </tr>`).join('') || `<tr><td colspan="4" class="admin-table-empty">No guides uploaded yet</td></tr>`;

  document.getElementById('adminContent').innerHTML = `
    <div class="admin-topbar">
      <div>
        <h1 class="admin-page-title">Guides & Products</h1>
        <p class="admin-page-sub">Upload and manage your free health guides (PDFs)</p>
      </div>
      <button class="btn-admin btn-admin-primary" onclick="openUploadGuide()">+ Upload Guide</button>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem">
      <div class="admin-card" style="padding:1.5rem">
        <div style="font-size:1.5rem;margin-bottom:.5rem">📄</div>
        <div style="font-weight:700;color:#161919;margin-bottom:.3rem">Upload a PDF Guide</div>
        <div style="font-size:.82rem;color:#848B8C;margin-bottom:1rem">Upload your health guide PDFs. They will be hosted on Cloudinary and served to users who download.</div>
        <div class="upload-zone" onclick="document.getElementById('guideFileInput').click()">
          <input type="file" id="guideFileInput" accept=".pdf" style="display:none" onchange="handleGuideUpload(this)">
          <div class="upload-zone-icon">📤</div>
          <div class="upload-zone-text"><strong>Click to upload</strong> or drag and drop<br>PDF files only · Max 50MB</div>
        </div>
        <div id="guideUploadProgress" style="display:none;margin-top:1rem">
          <div style="font-size:.82rem;color:#848B8C;margin-bottom:.4rem" id="guideUploadStatus">Uploading…</div>
          <div style="height:4px;background:#e8ebe8;border-radius:2px;overflow:hidden">
            <div id="guideProgressBar" style="height:100%;background:#09C8B8;width:0;transition:width .3s;border-radius:2px"></div>
          </div>
        </div>
      </div>
      <div class="admin-card" style="padding:1.5rem">
        <div style="font-size:1.5rem;margin-bottom:.5rem">🔗</div>
        <div style="font-weight:700;color:#161919;margin-bottom:.3rem">How to Link a Guide</div>
        <div style="font-size:.82rem;color:#848B8C;line-height:1.7">
          After uploading, copy the URL from the table below.<br><br>
          Then open <strong>js/global.js</strong> in your frontend and update the <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px">link</code> field for the matching product in the <strong>PRODUCTS</strong> array.<br><br>
          The download modal will automatically serve the new PDF link to users.
        </div>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-card-header">
        <span class="admin-card-title">Uploaded Guides (${guides.length})</span>
        <button class="btn-admin btn-admin-ghost btn-admin-sm" onclick="loadGuides()">↻ Refresh</button>
      </div>
      <table class="admin-table">
        <thead><tr><th>File Name</th><th>Size</th><th>Uploaded</th><th>Actions</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

async function handleGuideUpload(input) {
  const file = input.files[0];
  if (!file) return;

  const progress = document.getElementById('guideUploadProgress');
  const status   = document.getElementById('guideUploadStatus');
  const bar      = document.getElementById('guideProgressBar');
  progress.style.display = 'block';
  status.textContent = `Uploading ${file.name}…`;
  bar.style.width = '30%';

  const formData = new FormData();
  formData.append('pdf', file);

  try {
    bar.style.width = '60%';
    const res = await fetch(`${ADMIN_API}/admin/guides/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: formData
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    bar.style.width = '100%';
    status.textContent = '✓ Uploaded successfully!';
    status.style.color = '#09C8B8';
    adminToast(`${file.name} uploaded! Copy the URL from the table below.`);

    setTimeout(() => {
      progress.style.display = 'none';
      bar.style.width = '0';
      status.style.color = '';
      loadGuides();
    }, 2000);

  } catch (err) {
    bar.style.background = '#ef4444';
    status.textContent = 'Upload failed: ' + err.message;
    adminToast(err.message, 'error');
  }
}

async function deleteGuide(name) {
  if (!confirm(`Delete guide "${name}"? This cannot be undone.`)) return;
  try {
    await adminFetch(`/admin/guides/${encodeURIComponent(name)}`, { method:'DELETE' });
    adminToast('Guide deleted');
    loadGuides();
  } catch (err) { adminToast(err.message, 'error'); }
}

// ─────────────────────────────────────────
//  BOOKINGS
// ─────────────────────────────────────────
async function loadBookings(page = 1) {
  const data     = await adminFetch(`/admin/bookings?page=${page}&limit=15`);
  const bookings = data.data.bookings;
  const meta     = data.meta;

  const rows = bookings.map(b => `
    <tr>
      <td>
        <strong>${b.firstName} ${b.lastName}</strong>
        <div style="font-size:.73rem;color:#848B8C">${b.email}</div>
      </td>
      <td style="font-size:.8rem;color:#848B8C">${b.bookingRef}</td>
      <td style="font-size:.82rem">${b.sessionType.replace(/-/g,' ')}</td>
      <td style="font-size:.82rem;color:#848B8C">${b.concern.replace(/-/g,' ')}</td>
      <td><span class="badge-status badge-${b.status}">${b.status}</span></td>
      <td style="color:#848B8C;font-size:.8rem">${new Date(b.createdAt).toLocaleDateString()}</td>
      <td>
        <div style="display:flex;gap:.4rem">
          <button class="btn-admin btn-admin-primary btn-admin-sm" onclick="updateBookingStatus('${b._id}','confirmed')">Confirm</button>
          <button class="btn-admin btn-admin-ghost btn-admin-sm" onclick="viewBookingDetails('${b._id}')">View</button>
        </div>
      </td>
    </tr>`).join('') || `<tr><td colspan="7" class="admin-table-empty">No bookings yet</td></tr>`;

  const pagination = meta ? `
    <div class="admin-pagination">
      <button class="admin-page-btn" onclick="loadBookings(${meta.page-1})" ${!meta.hasPrev?'disabled':''}>‹</button>
      <span style="font-size:.82rem;color:#848B8C">Page ${meta.page} of ${meta.pages} · ${meta.total} total</span>
      <button class="admin-page-btn" onclick="loadBookings(${meta.page+1})" ${!meta.hasNext?'disabled':''}>›</button>
    </div>` : '';

  document.getElementById('adminContent').innerHTML = `
    <div class="admin-topbar">
      <div>
        <h1 class="admin-page-title">Bookings</h1>
        <p class="admin-page-sub">Manage consultation requests</p>
      </div>
      <div style="display:flex;gap:.8rem">
        <select class="admin-select-filter" onchange="filterBookings(this.value)">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
    <div class="admin-card">
      <div class="admin-card-header">
        <span class="admin-card-title">All Bookings (${meta?.total || bookings.length})</span>
      </div>
      <table class="admin-table">
        <thead><tr><th>Client</th><th>Reference</th><th>Session</th><th>Concern</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody id="bookingsBody">${rows}</tbody>
      </table>
      ${pagination}
    </div>`;
}

async function updateBookingStatus(id, status) {
  try {
    await adminFetch(`/admin/bookings/${id}`, { method:'PATCH', body:JSON.stringify({ status }) });
    adminToast(`Booking ${status}! ✓`);
    loadBookings();
  } catch (err) { adminToast(err.message, 'error'); }
}

async function filterBookings(status) {
  const data = await adminFetch(`/admin/bookings?${status?'status='+status:''}&limit=50`);
  const bookings = data.data.bookings;
  document.getElementById('bookingsBody').innerHTML = bookings.map(b => `
    <tr>
      <td><strong>${b.firstName} ${b.lastName}</strong><div style="font-size:.73rem;color:#848B8C">${b.email}</div></td>
      <td style="font-size:.8rem;color:#848B8C">${b.bookingRef}</td>
      <td style="font-size:.82rem">${b.sessionType.replace(/-/g,' ')}</td>
      <td style="font-size:.82rem;color:#848B8C">${b.concern.replace(/-/g,' ')}</td>
      <td><span class="badge-status badge-${b.status}">${b.status}</span></td>
      <td style="color:#848B8C;font-size:.8rem">${new Date(b.createdAt).toLocaleDateString()}</td>
      <td><button class="btn-admin btn-admin-primary btn-admin-sm" onclick="updateBookingStatus('${b._id}','confirmed')">Confirm</button></td>
    </tr>`).join('') || `<tr><td colspan="7" class="admin-table-empty">No bookings found</td></tr>`;
}

// ─────────────────────────────────────────
//  CONTACTS
// ─────────────────────────────────────────
async function loadContacts(page = 1) {
  const data     = await adminFetch(`/admin/contacts?page=${page}&limit=15`);
  const contacts = data.data.contacts;
  const meta     = data.meta;

  const rows = contacts.map(c => `
    <tr>
      <td>
        <strong>${c.firstName} ${c.lastName}</strong>
        <div style="font-size:.73rem;color:#848B8C">${c.email}</div>
      </td>
      <td style="font-size:.85rem">${c.subject}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.82rem;color:#848B8C">${c.message}</td>
      <td><span class="badge-status badge-${c.status}">${c.status}</span></td>
      <td style="color:#848B8C;font-size:.8rem">${new Date(c.createdAt).toLocaleDateString()}</td>
      <td>
        <div style="display:flex;gap:.4rem">
          <button class="btn-admin btn-admin-ghost btn-admin-sm" onclick="viewContact('${c._id}','${c.firstName.replace(/'/g,"\\'")} ${c.lastName.replace(/'/g,"\\'")}','${c.email}','${c.subject.replace(/'/g,"\\'")}','${c.message.replace(/'/g,"\\'").replace(/\n/g,' ')}')">Read</button>
          <a href="mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject)}" class="btn-admin btn-admin-primary btn-admin-sm">Reply</a>
        </div>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" class="admin-table-empty">No messages yet</td></tr>`;

  const pagination = meta ? `
    <div class="admin-pagination">
      <button class="admin-page-btn" onclick="loadContacts(${meta.page-1})" ${!meta.hasPrev?'disabled':''}>‹</button>
      <span style="font-size:.82rem;color:#848B8C">Page ${meta.page} of ${meta.pages} · ${meta.total} total</span>
      <button class="admin-page-btn" onclick="loadContacts(${meta.page+1})" ${!meta.hasNext?'disabled':''}>›</button>
    </div>` : '';

  document.getElementById('adminContent').innerHTML = `
    <div class="admin-topbar">
      <div>
        <h1 class="admin-page-title">Messages</h1>
        <p class="admin-page-sub">Contact form submissions from your website visitors</p>
      </div>
      <select class="admin-select-filter" onchange="filterContacts(this.value)">
        <option value="">All</option>
        <option value="new">New</option>
        <option value="read">Read</option>
        <option value="replied">Replied</option>
      </select>
    </div>
    <div class="admin-card">
      <div class="admin-card-header">
        <span class="admin-card-title">All Messages (${meta?.total || contacts.length})</span>
      </div>
      <table class="admin-table">
        <thead><tr><th>Sender</th><th>Subject</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${pagination}
    </div>`;
}

function viewContact(id, name, email, subject, message) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="admin-modal-bg" id="contactModal">
      <div class="admin-modal" style="max-width:560px">
        <div class="admin-modal-header">
          <span class="admin-modal-title">Message from ${name}</span>
          <button class="admin-modal-close" onclick="closeModal('contactModal')">✕</button>
        </div>
        <div class="admin-modal-body">
          <div style="margin-bottom:1rem">
            <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;color:#848B8C;margin-bottom:.3rem">From</div>
            <div style="font-weight:600">${name} · <a href="mailto:${email}" style="color:#09C8B8">${email}</a></div>
          </div>
          <div style="margin-bottom:1rem">
            <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;color:#848B8C;margin-bottom:.3rem">Subject</div>
            <div style="font-weight:600">${subject}</div>
          </div>
          <div>
            <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;color:#848B8C;margin-bottom:.3rem">Message</div>
            <div style="background:#f9faf9;border-radius:10px;padding:1rem;font-size:.9rem;line-height:1.7;color:#2a2e2a">${message}</div>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button class="btn-admin btn-admin-ghost" onclick="closeModal('contactModal');markContactRead('${id}')">Mark as Read</button>
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="btn-admin btn-admin-primary" onclick="closeModal('contactModal')">Reply via Email →</a>
        </div>
      </div>
    </div>`);
  markContactRead(id);
}

async function markContactRead(id) {
  try { await adminFetch(`/admin/contacts/${id}`, { method:'PATCH', body:JSON.stringify({ status:'read' }) }); }
  catch(_) {}
}

async function filterContacts(status) {
  const data = await adminFetch(`/admin/contacts?${status?'status='+status:''}&limit=50`);
  // re-render table body only
  loadContacts();
}

// ─────────────────────────────────────────
//  DOWNLOADS
// ─────────────────────────────────────────
async function loadDownloads() {
  const [dlData, statsData] = await Promise.all([
    adminFetch('/admin/downloads?limit=20'),
    adminFetch('/admin/downloads/stats').catch(() => ({ data: { stats:[], total:0 } }))
  ]);

  const downloads = dlData.data.downloads;
  const stats     = statsData.data;

  const statsCards = stats.stats?.map(s => `
    <div class="stat-card">
      <div class="stat-label">${s.title}</div>
      <div class="stat-num">${s.count}</div>
      <div class="stat-change">downloads</div>
    </div>`).join('') || '';

  const rows = downloads.map(d => `
    <tr>
      <td><strong>${d.firstName} ${d.lastName}</strong><div style="font-size:.73rem;color:#848B8C">${d.email}</div></td>
      <td style="font-size:.82rem">${d.guideTitle}</td>
      <td style="font-size:.8rem;color:#848B8C">${d.phone || '—'}</td>
      <td style="color:#848B8C;font-size:.8rem">${new Date(d.createdAt).toLocaleDateString()}</td>
    </tr>`).join('') || `<tr><td colspan="4" class="admin-table-empty">No downloads tracked yet</td></tr>`;

  document.getElementById('adminContent').innerHTML = `
    <div class="admin-topbar">
      <div>
        <h1 class="admin-page-title">Downloads</h1>
        <p class="admin-page-sub">Track who downloaded your guides and when</p>
      </div>
    </div>
    <div style="margin-bottom:1rem">
      <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;color:#848B8C;margin-bottom:1rem;letter-spacing:.8px">Downloads per Guide</div>
      <div class="stat-grid">${statsCards || '<p style="color:#848B8C;font-size:.85rem">No download data yet</p>'}</div>
    </div>
    <div class="admin-card">
      <div class="admin-card-header">
        <span class="admin-card-title">Recent Downloads (${stats.total || 0} total)</span>
      </div>
      <table class="admin-table">
        <thead><tr><th>Person</th><th>Guide</th><th>Phone</th><th>Date</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// ─────────────────────────────────────────
//  NEWSLETTER
// ─────────────────────────────────────────
async function loadNewsletter(page = 1) {
  const data = await adminFetch(`/admin/newsletter?page=${page}&limit=20`);
  const subs = data.data.subscribers;
  const meta = data.meta;

  const rows = subs.map(s => `
    <tr>
      <td><strong>${s.email}</strong></td>
      <td style="color:#848B8C">${s.firstName || '—'}</td>
      <td><span class="badge-status ${s.isActive?'badge-confirmed':'badge-read'}">${s.isActive?'Active':'Unsubscribed'}</span></td>
      <td style="color:#848B8C;font-size:.8rem">${s.source || 'website'}</td>
      <td style="color:#848B8C;font-size:.8rem">${new Date(s.createdAt).toLocaleDateString()}</td>
      <td>
        <button class="btn-admin btn-admin-danger btn-admin-sm" onclick="deleteSubscriber('${s._id}','${s.email}')">Remove</button>
      </td>
    </tr>`).join('') || `<tr><td colspan="6" class="admin-table-empty">No subscribers yet</td></tr>`;

  const pagination = meta ? `
    <div class="admin-pagination">
      <button class="admin-page-btn" onclick="loadNewsletter(${meta.page-1})" ${!meta.hasPrev?'disabled':''}>‹</button>
      <span style="font-size:.82rem;color:#848B8C">Page ${meta.page} of ${meta.pages} · ${meta.total} total</span>
      <button class="admin-page-btn" onclick="loadNewsletter(${meta.page+1})" ${!meta.hasNext?'disabled':''}>›</button>
    </div>` : '';

  document.getElementById('adminContent').innerHTML = `
    <div class="admin-topbar">
      <div>
        <h1 class="admin-page-title">Newsletter Subscribers</h1>
        <p class="admin-page-sub">Everyone who signed up for your newsletter</p>
      </div>
      <button class="btn-admin btn-admin-ghost" onclick="exportSubscribers()">⬇ Export CSV</button>
    </div>
    <div class="admin-card">
      <div class="admin-card-header">
        <span class="admin-card-title">Subscribers (${meta?.total || subs.length})</span>
        <input class="admin-search" style="max-width:220px" placeholder="Search email…" oninput="searchSubscribers(this.value)">
      </div>
      <table class="admin-table">
        <thead><tr><th>Email</th><th>Name</th><th>Status</th><th>Source</th><th>Joined</th><th>Action</th></tr></thead>
        <tbody id="subsBody">${rows}</tbody>
      </table>
      ${pagination}
    </div>`;
}

async function deleteSubscriber(id, email) {
  if (!confirm(`Remove ${email} from newsletter?`)) return;
  try {
    await adminFetch(`/admin/newsletter/${id}`, { method:'DELETE' });
    adminToast('Subscriber removed');
    loadNewsletter();
  } catch (err) { adminToast(err.message, 'error'); }
}

function exportSubscribers() {
  adminToast('Preparing CSV export…', 'info');
  adminFetch('/admin/newsletter?limit=1000&isActive=true').then(data => {
    const subs = data.data.subscribers;
    const csv  = ['Email,First Name,Source,Joined',
      ...subs.map(s => `${s.email},${s.firstName||''},${s.source||''},${new Date(s.createdAt).toLocaleDateString()}`)
    ].join('\n');
    const blob = new Blob([csv], { type:'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `subscribers-${Date.now()}.csv`;
    a.click(); URL.revokeObjectURL(url);
    adminToast('CSV downloaded! ✓');
  }).catch(err => adminToast(err.message, 'error'));
}

async function searchSubscribers(query) {
  if (query.length < 2) { loadNewsletter(); return; }
  const data = await adminFetch(`/admin/newsletter?search=${encodeURIComponent(query)}&limit=50`);
  const subs = data.data.subscribers;
  document.getElementById('subsBody').innerHTML = subs.map(s => `
    <tr>
      <td><strong>${s.email}</strong></td>
      <td style="color:#848B8C">${s.firstName||'—'}</td>
      <td><span class="badge-status ${s.isActive?'badge-confirmed':'badge-read'}">${s.isActive?'Active':'Unsubscribed'}</span></td>
      <td style="color:#848B8C;font-size:.8rem">${s.source||'website'}</td>
      <td style="color:#848B8C;font-size:.8rem">${new Date(s.createdAt).toLocaleDateString()}</td>
      <td><button class="btn-admin btn-admin-danger btn-admin-sm" onclick="deleteSubscriber('${s._id}','${s.email}')">Remove</button></td>
    </tr>`).join('') || `<tr><td colspan="6" class="admin-table-empty">No results</td></tr>`;
}

// ── UTILS ──────────────────────────────────
function closeModal(id) {
  document.getElementById(id)?.remove();
}

// ── AUTO LOAD OVERVIEW ─────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#admin' && isAdminLoggedIn()) {
    setTimeout(() => adminNavigate('overview'), 300);
  }
});
