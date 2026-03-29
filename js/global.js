/* ═══════════════════════════════════════════
   APOPHERO HEALTH — GLOBAL JS
═══════════════════════════════════════════ */

/* ── PRODUCTS DATA ── */
const API_BASE = 'https://apophero-backend.onrender.com';

const PRODUCTS = [
  {
    id: 'metabolic-blueprint',
    title: 'Unfatting: The Metabolic Blueprint to Permanent Weight Loss',
    shortTitle: 'Metabolic Blueprint',
    category: 'Weight Management',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774712777/StockCake-Fitness_Journey_Begins-203913-medium_wjxzwm.jpg',
    topic: 'weight',
    desc: 'Rewire your metabolism for lasting results. No crash diets — just science-backed, sustainable strategy built around how your body actually works.',
    emoji: '⚖️',
    gradient: 'linear-gradient(135deg,#161919,#2a2e2e)',
    link: `https://res.cloudinary.com/dl4fatwns/image/upload/v1774687007/metabolic-blueprint_nwz5du.pdf`,
    featured: true,
    tags: ['Metabolism', 'Fat Loss', 'Nutrition'],
    readTime: '45 min read'
  },
  {
    id: 'testosterone',
    title: 'Boosting Your Testosterone Naturally',
    shortTitle: 'Testosterone Guide',
    category: "Men's Health",
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774712780/StockCake-Neon_Fitness_Future-3614500-medium_zkvfnp.webp',
    topic: 'hormones',
    desc: 'Simple, evidence-based lifestyle changes for optimal hormone health. Feel stronger, sharper, and more energetic — without medication.',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg,#09C8B8,#07a89a)',
    link: `https://res.cloudinary.com/dl4fatwns/image/upload/v1774687006/testosterone-guide_uzqj8p.pdf`,
    featured: true,
    tags: ['Hormones', 'Energy', 'Performance'],
    readTime: '35 min read'
  },
  {
    id: 'premature-ejaculation',
    title: 'Overcoming Premature Ejaculation Naturally',
    shortTitle: 'Overcome PE',
    category: "Men's Health",
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774712758/StockCake-Couple_Sleeping_Peacefully-1126526-medium_xqjant.webp',
    topic: 'sexual-health',
    desc: 'A practical, discreet, and clinically-grounded guide to lasting longer and building sexual confidence — naturally and permanently.',
    emoji: '🛡️',
    gradient: 'linear-gradient(135deg,#A06046,#705C52)',
    link: `https://res.cloudinary.com/dl4fatwns/image/upload/v1774687002/premature-ejaculation_wsvsut.pdf`,
    featured: false,
    tags: ['Sexual Health', 'Confidence', 'Natural'],
    readTime: '40 min read'
  },
  {
    id: 'pcos',
    title: 'Personalized PCOS Prevention & Reversal Protocol',
    shortTitle: 'PCOS Protocol',
    category: "Women's Health",
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774708507/Your_Personalized_PCOS_Prevention_Reversal_Protocol_jycrcq.png',
    topic: 'hormones',
    desc: 'Take control of polycystic ovarian syndrome through targeted natural strategies — personalized to your body, your symptoms, your goals.',
    emoji: '🌸',
    gradient: 'linear-gradient(135deg,#A06046,#161919)',
    link: `https://res.cloudinary.com/dl4fatwns/image/upload/v1774693763/pcos_ch1p2x.pdf`,
    featured: true,
    tags: ['PCOS', 'Hormones', 'Women'],
    readTime: '50 min read'
  },
  {
    id: 'antenatal',
    title: 'Full Complete Antenatal Wellness Plan',
    shortTitle: 'Antenatal Wellness',
    category: "Women's Health",
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774708965/ANTENATAL_WELLNESS_PLAN_COVER_1_fk0xgd.png',
    topic: 'pregnancy',
    desc: 'Your essential guide to a healthy pregnancy — covering nutrition, movement, mental wellness, and optimal maternal-fetal outcomes.',
    emoji: '🤱',
    gradient: 'linear-gradient(135deg,#705C52,#A06046)',
    link: `https://res.cloudinary.com/dl4fatwns/image/upload/v1774692614/antenatal-wellness_lnc8h9.pdf`,
    featured: false,
    tags: ['Pregnancy', 'Maternal Health', 'Wellness'],
    readTime: '60 min read'
  },
  {
    id: 'wellness-journal',
    title: 'Wellness Journal & Monthly Budget Tracker',
    shortTitle: 'Wellness Journal',
    category: 'Wellness',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774713193/StockCake-Sunset_Jogging_Couple-1117006-medium_k3zvsz.jpg',
    topic: 'wellness',
    desc: 'Track your habits, moods, health goals, and monthly budget all in one beautifully designed journal. Build momentum, one day at a time.',
    emoji: '📔',
    gradient: 'linear-gradient(135deg,#848B8C,#705C52)',
    link: `https://res.cloudinary.com/dl4fatwns/image/upload/v1774687003/wellness-journal_rylmyw.pdf`,
    featured: false,
    tags: ['Habits', 'Journaling', 'Budget'],
    readTime: 'Daily use'
  },
  {
    id: 'masturbation-addiction',
    title: 'Overcome Masturbation & Pornography Addiction',
    shortTitle: 'Freedom Protocol',
    category: "Men's Health",
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774712762/StockCake-Late-night_screen_glow-580861-medium_ih13bg.jpg',
    topic: 'mental-health',
    desc: 'A personalized 3-month transformation plan to break free from compulsive behaviors and reclaim your focus, energy, and authentic confidence.',
    emoji: '🧠',
    gradient: 'linear-gradient(135deg,#161919,#848B8C)',
    link: `https://res.cloudinary.com/dl4fatwns/image/upload/v1774687002/freedom-protocol_pzmnoh.pdf`,
    featured: false,
    tags: ['Mental Health', 'Addiction', 'Transformation'],
    readTime: '3 Month Plan'
  },
  {
    id: 'wellness-habits',
    title: '30 Simple Wellness Habits for Busy People',
    shortTitle: '30 Wellness Habits',
    category: 'Wellness',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774713299/StockCake-Cyclists_in_Autumn-658852-medium_wt5yiu.jpg',
    topic: 'wellness',
    desc: 'Thirty practical, science-backed habits that fit into any schedule. Small changes that compound into extraordinary health over time.',
    emoji: '✨',
    gradient: 'linear-gradient(135deg,#09C8B8,#161919)',
    link: `https://res.cloudinary.com/dl4fatwns/image/upload/v1774692631/wellness-habits_jcdtb7.pdf`,
    featured: false,
    tags: ['Habits', 'Lifestyle', 'Productivity'],
    readTime: '25 min read'
  }
];

/* ── DOWNLOAD MODAL ── */
function showDownloadModal(product) {
  // Remove existing modal if any
  document.getElementById('dlModal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'dlModal';
  modal.innerHTML = `
    <div id="dlBackdrop" style="
      position:fixed;inset:0;z-index:9999;
      background:rgba(22,25,25,.75);backdrop-filter:blur(6px);
      display:flex;align-items:center;justify-content:center;padding:1rem;
      animation:fadeIn .2s ease">
      <div style="
        background:#fff;border-radius:20px;padding:2.5rem;
        width:100%;max-width:460px;position:relative;
        box-shadow:0 24px 60px rgba(0,0,0,.3);
        animation:fadeUp .3s ease">

        <!-- Close -->
        <button onclick="document.getElementById('dlModal').remove()"
          style="position:absolute;top:1rem;right:1rem;background:var(--sage);
          border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;
          font-size:1.1rem;color:var(--warm-brown);display:flex;align-items:center;justify-content:center">
          ✕
        </button>

        <!-- Header -->
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <div style="width:52px;height:52px;border-radius:12px;overflow:hidden;flex-shrink:0;
                      background:${product.gradient}">
            ${product.coverImage
              ? `<img src="${product.coverImage}" style="width:100%;height:100%;object-fit:cover">`
              : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.5rem">${product.emoji}</div>`
            }
          </div>
          <div>
            <div style="font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--teal);margin-bottom:.2rem">${product.category}</div>
            <div style="font-family:var(--font-display);font-size:1rem;font-weight:700;color:var(--black);line-height:1.3">${product.shortTitle}</div>
          </div>
        </div>

        <p style="font-size:.85rem;color:var(--warm-brown);margin-bottom:1.5rem;line-height:1.6">
          Enter your details to get instant access. We'll also email you the download link.
        </p>

        <!-- Form -->
        <form id="dlForm" onsubmit="submitDownload(event, '${product.id}', '${product.title.replace(/'/g,"\\'")}', '${product.link}')">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-bottom:.8rem">
            <div>
              <label style="font-size:.75rem;font-weight:600;color:var(--black);display:block;margin-bottom:.3rem">First Name *</label>
              <input id="dlFirstName" class="form-input" type="text" placeholder="Jane" required
                style="width:100%;padding:.7rem .9rem;border:1.5px solid var(--border);border-radius:8px;font-size:.88rem">
            </div>
            <div>
              <label style="font-size:.75rem;font-weight:600;color:var(--black);display:block;margin-bottom:.3rem">Last Name *</label>
              <input id="dlLastName" class="form-input" type="text" placeholder="Doe" required
                style="width:100%;padding:.7rem .9rem;border:1.5px solid var(--border);border-radius:8px;font-size:.88rem">
            </div>
          </div>
          <div style="margin-bottom:.8rem">
            <label style="font-size:.75rem;font-weight:600;color:var(--black);display:block;margin-bottom:.3rem">Email Address *</label>
            <input id="dlEmail" class="form-input" type="email" placeholder="jane@example.com" required
              style="width:100%;padding:.7rem .9rem;border:1.5px solid var(--border);border-radius:8px;font-size:.88rem">
          </div>
          <div style="margin-bottom:1.4rem">
            <label style="font-size:.75rem;font-weight:600;color:var(--black);display:block;margin-bottom:.3rem">WhatsApp (optional)</label>
            <input id="dlPhone" class="form-input" type="tel" placeholder="+256 700 000 000"
              style="width:100%;padding:.7rem .9rem;border:1.5px solid var(--border);border-radius:8px;font-size:.88rem">
          </div>
          <button type="submit" id="dlSubmitBtn" style="
            width:100%;padding:.9rem;border-radius:8px;border:none;cursor:pointer;
            background:var(--teal);color:#fff;font-size:.95rem;font-weight:700;
            font-family:var(--font-body);transition:background .2s">
            ⬇ Get My Free Guide →
          </button>
          <p style="font-size:.72rem;color:var(--slate);margin-top:.8rem;text-align:center">
            🔒 Your info is private. Unsubscribe from emails anytime.
          </p>
        </form>
      </div>
    </div>`;

  document.body.appendChild(modal);

  // Close on backdrop click
  document.getElementById('dlBackdrop').addEventListener('click', function(e) {
    if (e.target === this) document.getElementById('dlModal')?.remove();
  });

  // Focus first input
  setTimeout(() => document.getElementById('dlFirstName')?.focus(), 100);
}

async function submitDownload(e, guideId, guideTitle, guideUrl) {
  e.preventDefault();
  const btn = document.getElementById('dlSubmitBtn');
  btn.textContent = 'Processing…';
  btn.disabled = true;

  try {
    const res = await fetch('https://apophero-backend.onrender.com/api/v1/downloads', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guideId,
        guideTitle,
        guideUrl,
        firstName: document.getElementById('dlFirstName').value.trim(),
        lastName:  document.getElementById('dlLastName').value.trim(),
        email:     document.getElementById('dlEmail').value.trim(),
        phone:     document.getElementById('dlPhone').value.trim()
      })
    });

    const result = await res.json();
    if (!result.success) throw new Error(result.message);

    // Success — close modal and trigger download
    document.getElementById('dlModal').remove();
    showToast('Guide sent to your email! Starting download… 🎉');

    // Trigger actual file download
    const a = document.createElement('a');
    a.href = guideUrl;
    a.download = guideTitle;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  } catch (err) {
    btn.textContent = '⬇ Get My Free Guide →';
    btn.disabled = false;
    showToast(err.message || 'Something went wrong. Please try again.');
  }
}

/* ── BLOG DATA ── */
const BLOG_POSTS = [
  {
    id: 'metabolism-myths',
    title: '5 Metabolism Myths That Are Keeping You Fat',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774705355/StockCake-Fitness_Tracker_Check-571421-standard_mk6u4x.jpg',
    excerpt: 'Everything you\'ve been told about metabolism and weight loss is probably wrong. Here\'s what the science actually says.',
    category: 'Weight Loss',
    topic: 'weight',
    emoji: '🔥',
    date: 'March 15, 2026',
    readTime: '8 min read',
    gradient: 'linear-gradient(135deg,#161919,#2a2e2e)'
  },
  {
    id: 'testosterone-foods',
    title: 'The 10 Best Foods to Naturally Boost Testosterone',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774709499/StockCake-Colorful_Street_Food-937121-medium_dcy6ti.jpg',
    excerpt: 'What you eat directly shapes your hormone levels. These ten foods are backed by clinical studies to raise T naturally.',
    category: "Men's Health",
    topic: 'hormones',
    emoji: '⚡',
    date: 'March 8, 2026',
    readTime: '6 min read',
    gradient: 'linear-gradient(135deg,#09C8B8,#07a89a)'
  },
  {
    id: 'pcos-lifestyle',
    title: 'How Lifestyle Changes Can Reverse PCOS Symptoms',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774709675/StockCake-Woman_feeling_distressed-1374140-medium_bpd3an.webp',
    excerpt: 'PCOS doesn\'t have to be a life sentence. Mounting evidence shows lifestyle interventions can dramatically reduce — and even reverse — symptoms.',
    category: "Women's Health",
    topic: 'hormones',
    emoji: '🌸',
    date: 'February 28, 2026',
    readTime: '10 min read',
    gradient: 'linear-gradient(135deg,#A06046,#705C52)'
  },
  {
    id: 'sleep-hormones',
    title: 'Why Sleep Is Your Most Powerful Hormone Regulator',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774709498/StockCake-Peaceful_Nighttime_Rest-3809725-medium_b46wdl.webp',
    excerpt: 'Poor sleep is silently destroying your hormonal health. Here\'s the science behind sleep and what to do about it tonight.',
    category: 'Wellness',
    topic: 'wellness',
    emoji: '🌙',
    date: 'February 20, 2026',
    readTime: '7 min read',
    gradient: 'linear-gradient(135deg,#848B8C,#161919)'
  },
  {
    id: 'stress-weight',
    title: 'The Hidden Link Between Chronic Stress and Weight Gain',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774709497/StockCake-Indulgent_Food_Fest-776050-medium_e5he4h.webp',
    excerpt: 'Cortisol doesn\'t just make you anxious — it\'s actively making you store fat. Understanding this connection is the first step to breaking the cycle.',
    category: 'Weight Loss',
    topic: 'weight',
    emoji: '🧬',
    date: 'February 12, 2026',
    readTime: '9 min read',
    gradient: 'linear-gradient(135deg,#705C52,#A06046)'
  },
  {
    id: 'morning-routine',
    title: 'The 20-Minute Morning Routine That Changes Everything',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774705356/StockCake-Sculpted_Strength_Defined-4049072-standard_mneleh.jpg',
    excerpt: 'You don\'t need two hours of morning rituals. These five focused practices can transform your energy, focus, and health — in just 20 minutes.',
    category: 'Wellness',
    topic: 'wellness',
    emoji: '☀️',
    date: 'February 5, 2026',
    readTime: '5 min read',
    gradient: 'linear-gradient(135deg,#09C8B8,#A06046)'
  }
];

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `show ${type}`;
  setTimeout(() => { t.className = ''; }, 3500);
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ── NAV ── */
function toggleMobileMenu() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    ham.classList.add('open');
    menu.classList.add('open');
    document.body.classList.add('menu-open');
  }
}

function closeMobileMenu() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  ham?.classList.remove('open');
  menu?.classList.remove('open');
  document.body.classList.remove('menu-open');
}

function initNav() {
  const nav = document.getElementById('navbar');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const ham  = document.getElementById('hamburger');
    if (menu?.classList.contains('open') &&
        !menu.contains(e.target) &&
        !ham?.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Active nav link
  const page = window.location.hash.replace('#','') || 'home';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href')?.replace('#','') || '';
    a.classList.toggle('active', href === page);
  });
}

/* ── NEWSLETTER FORM ── */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#09C8B8';
      btn.disabled = true;
      showToast('Welcome to Apophero Health! Check your inbox.');
      form.querySelector('input').value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    });
  });
}

/* ── RENDER NAVBAR ── */
function renderNav() {
  return `
  <style>
    /* ── MOBILE MENU OVERLAY ── */
    .mobile-menu {
      display:none;
      position:fixed; inset:0; z-index:998;
      background:var(--black);
      flex-direction:column;
      padding:0;
      opacity:0; transform:translateX(100%);
      transition:opacity .35s ease, transform .35s cubic-bezier(.4,0,.2,1);
      pointer-events:none;
      overflow-y:auto;
    }
    .mobile-menu.open {
      opacity:1; transform:translateX(0);
      pointer-events:all;
    }
    @media(max-width:960px) {
      .mobile-menu { display:flex; }
    }

    /* header inside mobile menu */
    .mob-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:1.2rem 5%;
      border-bottom:1px solid rgba(255,255,255,.07);
      position:sticky; top:0; background:var(--black); z-index:2;
    }
    .mob-logo {
      font-family:var(--font-display); font-size:1.4rem; font-weight:700;
      color:#fff; text-decoration:none;
    }
    .mob-logo span { color:var(--teal); }
    .mob-close {
      width:40px; height:40px; border-radius:50%;
      background:rgba(255,255,255,.07); border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      color:#fff; font-size:1.2rem;
      transition:background .2s;
    }
    .mob-close:hover { background:rgba(255,255,255,.15); }

    /* nav links */
    .mob-nav {
      padding:1.5rem 5%; flex:1;
      display:flex; flex-direction:column;
    }
    .mob-link {
      display:flex; align-items:center; justify-content:space-between;
      padding:1.1rem 0;
      border-bottom:1px solid rgba(255,255,255,.06);
      text-decoration:none; cursor:pointer;
      transition:padding-left .2s;
    }
    .mob-link:hover { padding-left:.5rem; }
    .mob-link-left { display:flex; align-items:center; gap:1rem; }
    .mob-link-icon {
      width:40px; height:40px; border-radius:10px;
      background:rgba(255,255,255,.06);
      display:flex; align-items:center; justify-content:center;
      font-size:1.1rem; flex-shrink:0;
      transition:background .2s;
    }
    .mob-link:hover .mob-link-icon { background:rgba(9,200,184,.15); }
    .mob-link-text { color:#fff; font-size:1.05rem; font-weight:600; }
    .mob-link-sub { color:rgba(255,255,255,.4); font-size:.75rem; margin-top:.15rem; }
    .mob-link-arrow { color:rgba(255,255,255,.25); font-size:1rem; transition:color .2s, transform .2s; }
    .mob-link:hover .mob-link-arrow { color:var(--teal); transform:translateX(4px); }

    /* CTA button */
    .mob-cta {
      margin:1.5rem 5% 2rem;
      display:block; text-align:center;
      background:var(--teal); color:#fff;
      padding:1rem; border-radius:var(--radius-md);
      font-size:1rem; font-weight:700;
      text-decoration:none; cursor:pointer;
      transition:background .2s, transform .15s;
      box-shadow:0 4px 20px rgba(9,200,184,.3);
    }
    .mob-cta:hover { background:var(--teal-dark); transform:translateY(-1px); }

    /* social + footer */
    .mob-footer {
      padding:1.5rem 5% 3rem;
      border-top:1px solid rgba(255,255,255,.07);
    }
    .mob-social-label {
      font-size:.7rem; font-weight:700; letter-spacing:1px;
      text-transform:uppercase; color:rgba(255,255,255,.3);
      margin-bottom:1rem;
    }
    .mob-social-row { display:flex; gap:.7rem; }
    .mob-social-btn {
      width:40px; height:40px; border-radius:50%;
      background:rgba(255,255,255,.07); border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      color:rgba(255,255,255,.5); font-size:.9rem; text-decoration:none;
      transition:background .2s, color .2s;
    }
    .mob-social-btn:hover { background:var(--teal); color:#fff; }
    .mob-copy {
      font-size:.72rem; color:rgba(255,255,255,.2);
      margin-top:1.5rem;
    }

    /* hamburger */
    .hamburger {
      display:none; flex-direction:column;
      justify-content:center; gap:5px;
      width:40px; height:40px; cursor:pointer;
      background:rgba(22,25,25,.08); border-radius:8px;
      padding:8px; border:none;
    }
    @media(max-width:960px) { .hamburger { display:flex; } }
    .hamburger span {
      display:block; height:2px; border-radius:2px;
      background:var(--black); transition:all .3s ease;
    }
    .hamburger span:nth-child(1) { width:100%; }
    .hamburger span:nth-child(2) { width:70%; }
    .hamburger span:nth-child(3) { width:100%; }
    .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); width:100%; }
    .hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
    .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); width:100%; }

    /* body lock when menu open */
    body.menu-open { overflow:hidden; }
  </style>

  <nav id="navbar">
    <a href="#home" class="nav-logo" onclick="navigate('home')">Apophero <span>Health</span></a>
    <ul class="nav-links">
      <li><a href="#home"  onclick="navigate('home')">Home</a></li>
      <li><a href="#shop"  onclick="navigate('shop')">Shop</a></li>
      <li><a href="#blog"  onclick="navigate('blog')">Blog</a></li>
      <li><a href="#about" onclick="navigate('about')">About</a></li>
      <li><a href="#contact" onclick="navigate('contact')">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <a class="btn btn-nav" href="#book" onclick="navigate('book')">Book Consultation</a>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Open menu" onclick="toggleMobileMenu()">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <!-- MOBILE MENU -->
  <div class="mobile-menu" id="mobileMenu">

    <!-- Header -->
    <div class="mob-header">
      <a class="mob-logo" onclick="closeMobileMenu(); navigate('home')">
        Apophero <span>Health</span>
      </a>
      <button class="mob-close" onclick="closeMobileMenu()" aria-label="Close menu">✕</button>
    </div>

    <!-- Nav Links -->
    <nav class="mob-nav">
      <a class="mob-link" onclick="closeMobileMenu(); navigate('home')">
        <div class="mob-link-left">
          <div class="mob-link-icon">🏠</div>
          <div>
            <div class="mob-link-text">Home</div>
            <div class="mob-link-sub">Back to homepage</div>
          </div>
        </div>
        <span class="mob-link-arrow">→</span>
      </a>

      <a class="mob-link" onclick="closeMobileMenu(); navigate('shop')">
        <div class="mob-link-left">
          <div class="mob-link-icon">📚</div>
          <div>
            <div class="mob-link-text">Shop</div>
            <div class="mob-link-sub">Browse all free guides</div>
          </div>
        </div>
        <span class="mob-link-arrow">→</span>
      </a>

      <a class="mob-link" onclick="closeMobileMenu(); navigate('blog')">
        <div class="mob-link-left">
          <div class="mob-link-icon">✍️</div>
          <div>
            <div class="mob-link-text">Blog</div>
            <div class="mob-link-sub">Health articles & tips</div>
          </div>
        </div>
        <span class="mob-link-arrow">→</span>
      </a>

      <a class="mob-link" onclick="closeMobileMenu(); navigate('about')">
        <div class="mob-link-left">
          <div class="mob-link-icon">👥</div>
          <div>
            <div class="mob-link-text">About Us</div>
            <div class="mob-link-sub">Our story & team</div>
          </div>
        </div>
        <span class="mob-link-arrow">→</span>
      </a>

      <a class="mob-link" onclick="closeMobileMenu(); navigate('contact')">
        <div class="mob-link-left">
          <div class="mob-link-icon">✉️</div>
          <div>
            <div class="mob-link-text">Contact</div>
            <div class="mob-link-sub">Get in touch with us</div>
          </div>
        </div>
        <span class="mob-link-arrow">→</span>
      </a>
    </nav>

    <!-- CTA -->
    <a class="mob-cta" onclick="closeMobileMenu(); navigate('book')">
      📅 Book a Free Consultation →
    </a>

    <!-- Footer -->
    <div class="mob-footer">
      <div class="mob-social-label">Follow Us</div>
      <div class="mob-social-row">
        <a href="https://www.instagram.com/apopherohealth?igsh=MWVsMXZubmZhcmoxYQ==" target="_blank" class="mob-social-btn" aria-label="Instagram">◎</a>
        <a href="https://x.com/Apopherohealth" target="_blank" class="mob-social-btn" aria-label="X">𝕏</a>
        <a href="https://www.tiktok.com/@apopherohealth?_r=1&_t=ZM-92xezzgcbyC" target="_blank" class="mob-social-btn" aria-label="TikTok">♪</a>
        <a href="https://www.facebook.com/share/1A5jLRFoxk/" target="_blank" class="mob-social-btn" aria-label="Facebook">f</a>
        <a href="https://www.threads.com/@apopherohealth" target="_blank" class="mob-social-btn" aria-label="Threads">@</a>
      </div>
      <div class="mob-copy">© 2026 Apophero Health. All rights reserved.</div>
    </div>

  </div>`;
}

/* ── RENDER FOOTER ── */
function renderFooter() {
  return `
  <footer id="footer">
    <div class="footer-grid">
      <div class="footer-brand-col">
        <div class="nav-logo">Apophero <span style="color:var(--teal)">Health</span></div>
        <p>Transforming health through practical, personalized, and private healthcare frameworks. Education, treatment, and 1-on-1 support.</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/apopherohealth?igsh=MWVsMXZubmZhcmoxYQ==" target="_blank" aria-label="Instagram">◎</a>
          <a href="https://x.com/Apopherohealth" target="_blank" aria-label="X">𝕏</a>
          <a href="https://www.tiktok.com/@apopherohealth?_r=1&_t=ZM-92xezzgcbyC" target="_blank" aria-label="TikTok">♪</a>
          <a href="https://www.facebook.com/share/1A5jLRFoxk/" target="_blank" aria-label="Facebook">f</a>
          <a href="https://www.threads.com/@apopherohealth" target="_blank" aria-label="Threads">@</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <ul>
          <li><a href="#shop" onclick="navigate('shop')">All Guides</a></li>
          <li><a href="#shop" onclick="navigate('shop','weight')">Weight Loss</a></li>
          <li><a href="#shop" onclick="navigate('shop','hormones')">Hormones</a></li>
          <li><a href="#shop" onclick="navigate('shop','wellness')">Wellness</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="#about" onclick="navigate('about')">About Us</a></li>
          <li><a href="#blog" onclick="navigate('blog')">Blog</a></li>
          <li><a href="#book" onclick="navigate('book')">Consultations</a></li>
          <li><a href="#contact" onclick="navigate('contact')">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Medical Disclaimer</a></li>
          <li><a href="#">Cookie Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Apophero Health. All rights reserved.</p>
      <a href="#">Medical Disclaimer: Content is for informational purposes only.</a>
    </div>
  </footer>`;
}

/* ── RENDER NEWSLETTER ── */
function renderNewsletter() {
  return `
  <section class="newsletter-strip">
    <div>
      <h2>Get Free Health Guides<br>Straight to Your Inbox</h2>
      <p>Join thousands taking control of their health. No spam, ever.</p>
    </div>
    <form class="newsletter-form" onsubmit="handleNewsletter(event)">
      <input type="email" placeholder="Your email address" required>
      <button type="submit">Subscribe Free →</button>
    </form>
  </section>`;
}

function handleNewsletter(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ You\'re in!';
  btn.style.background = '#07a89a';
  btn.disabled = true;
  showToast('Welcome! Your first guide is on its way.');
  e.target.querySelector('input').value = '';
  setTimeout(() => { btn.textContent = 'Subscribe Free →'; btn.style.background = ''; btn.disabled = false; }, 4000);
}

/* ── RENDER WA WIDGET ── */
function renderWA() {
  return `
  <div id="wa-widget">
    <span class="wa-tooltip">Chat with us on WhatsApp</span>
    <a class="wa-btn" href="https://wa.me/256700000000?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20Apophero%20Health"
       target="_blank" aria-label="WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  </div>`;
}

/* ── ROUTER ── */
const pages = {};

function navigate(page, param = null) {
  window.scrollTo(0, 0);
  const app = document.getElementById('app');

  // update nav active
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href')?.replace('#','') || '';
    a.classList.toggle('active', href === page);
  });

  if (pages[page]) {
    app.innerHTML = pages[page](param);
    initReveal();
    initNewsletter();
    setTimeout(initReveal, 100);
  }
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  const shell = document.getElementById('shell');
  shell.insertAdjacentHTML('afterbegin', renderNav());
  shell.insertAdjacentHTML('beforeend', renderWA());
  shell.insertAdjacentHTML('beforeend', '<div id="toast"></div>');
  initNav();
});
