/* ═══════════════════════════════════════════
   APOPHERO HEALTH — GLOBAL JS
═══════════════════════════════════════════ */

/* ── PRODUCTS DATA ── */
const PRODUCTS = [
  {
    id: 'metabolic-blueprint',
    title: 'Unfatting: The Metabolic Blueprint to Permanent Weight Loss',
    shortTitle: 'Metabolic Blueprint',
    category: 'Weight Management',
    topic: 'weight',
    desc: 'Rewire your metabolism for lasting results. No crash diets — just science-backed, sustainable strategy built around how your body actually works.',
    emoji: '⚖️',
    gradient: 'linear-gradient(135deg,#161919,#2a2e2e)',
    link: 'hhttps://res.cloudinary.com/dl4fatwns/image/upload/v1774687007/metabolic-blueprint_nwz5du.pdf',
    featured: true,
    tags: ['Metabolism', 'Fat Loss', 'Nutrition'],
    readTime: '45 min read'
  },
  {
    id: 'testosterone',
    title: 'Boosting Your Testosterone Naturally',
    shortTitle: 'Testosterone Guide',
    category: "Men's Health",
    topic: 'hormones',
    desc: 'Simple, evidence-based lifestyle changes for optimal hormone health. Feel stronger, sharper, and more energetic — without medication.',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg,#09C8B8,#07a89a)',
    link: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774687006/testosterone-guide_uzqj8p.pdf',
    featured: true,
    tags: ['Hormones', 'Energy', 'Performance'],
    readTime: '35 min read'
  },
  {
    id: 'premature-ejaculation',
    title: 'Overcoming Premature Ejaculation Naturally',
    shortTitle: 'Overcome PE',
    category: "Men's Health",
    topic: 'sexual-health',
    desc: 'A practical, discreet, and clinically-grounded guide to lasting longer and building sexual confidence — naturally and permanently.',
    emoji: '🛡️',
    gradient: 'linear-gradient(135deg,#A06046,#705C52)',
    link: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774687002/premature-ejaculation_wsvsut.pdf',
    featured: false,
    tags: ['Sexual Health', 'Confidence', 'Natural'],
    readTime: '40 min read'
  },
  {
    id: 'pcos',
    title: 'Personalized PCOS Prevention & Reversal Protocol',
    shortTitle: 'PCOS Protocol',
    category: "Women's Health",
    topic: 'hormones',
    desc: 'Take control of polycystic ovarian syndrome through targeted natural strategies — personalized to your body, your symptoms, your goals.',
    emoji: '🌸',
    gradient: 'linear-gradient(135deg,#A06046,#161919)',
    link: 'hhttps://res.cloudinary.com/dl4fatwns/image/upload/v1774693763/pcos_ch1p2x.pdf',
    featured: true,
    tags: ['PCOS', 'Hormones', 'Women'],
    readTime: '50 min read'
  },
  {
    id: 'antenatal',
    title: 'Full Complete Antenatal Wellness Plan',
    shortTitle: 'Antenatal Wellness',
    category: "Women's Health",
    topic: 'pregnancy',
    desc: 'Your essential guide to a healthy pregnancy — covering nutrition, movement, mental wellness, and optimal maternal-fetal outcomes.',
    emoji: '🤱',
    gradient: 'linear-gradient(135deg,#705C52,#A06046)',
    link: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774692614/antenatal-wellness_lnc8h9.pdf',
    featured: false,
    tags: ['Pregnancy', 'Maternal Health', 'Wellness'],
    readTime: '60 min read'
  },
  {
    id: 'wellness-journal',
    title: 'Wellness Journal & Monthly Budget Tracker',
    shortTitle: 'Wellness Journal',
    category: 'Wellness',
    topic: 'wellness',
    desc: 'Track your habits, moods, health goals, and monthly budget all in one beautifully designed journal. Build momentum, one day at a time.',
    emoji: '📔',
    gradient: 'linear-gradient(135deg,#848B8C,#705C52)',
    link: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774687003/wellness-journal_rylmyw.pdf',
    featured: false,
    tags: ['Habits', 'Journaling', 'Budget'],
    readTime: 'Daily use'
  },
  {
    id: 'masturbation-addiction',
    title: 'Overcome Masturbation & Pornography Addiction',
    shortTitle: 'Freedom Protocol',
    category: "Men's Health",
    topic: 'mental-health',
    desc: 'A personalized 3-month transformation plan to break free from compulsive behaviors and reclaim your focus, energy, and authentic confidence.',
    emoji: '🧠',
    gradient: 'linear-gradient(135deg,#161919,#848B8C)',
    link: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774687002/freedom-protocol_pzmnoh.pdf',
    featured: false,
    tags: ['Mental Health', 'Addiction', 'Transformation'],
    readTime: '3 Month Plan'
  },
  {
    id: 'wellness-habits',
    title: '30 Simple Wellness Habits for Busy People',
    shortTitle: '30 Wellness Habits',
    category: 'Wellness',
    topic: 'wellness',
    desc: 'Thirty practical, science-backed habits that fit into any schedule. Small changes that compound into extraordinary health over time.',
    emoji: '✨',
    gradient: 'linear-gradient(135deg,#09C8B8,#161919)',
    link: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774692631/wellness-habits_jcdtb7.pdf',
    featured: false,
    tags: ['Habits', 'Lifestyle', 'Productivity'],
    readTime: '25 min read'
  }
];

/* ── BLOG DATA ── */
const BLOG_POSTS = [
  {
    id: 'metabolism-myths',
    title: '5 Metabolism Myths That Are Keeping You Fat',
    excerpt: 'Everything you\'ve been told about metabolism and weight loss is probably wrong. Here\'s what the science actually says.',
    category: 'Weight Loss',
    topic: 'weight',
    emoji: '🔥',
    date: 'March 15, 2026',
    readTime: '8 min read',
    gradient: 'linear-gradient(135deg,#161919,#2a2e2e)',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774705355/StockCake-Fitness_Tracker_Check-571421-standard_mk6u4x.jpg',  // add your Cloudinary URL here
    author: 'Dr. A. Okello',
    authorRole: 'Lead Health Consultant',
    content: `
      <p>Write your full article content here. You can use HTML tags for formatting.</p>
      <h2>Your First Section Heading</h2>
      <p>Your section content goes here...</p>
      <h2>Your Second Section Heading</h2>
      <p>More content here...</p>
    `
  },
  {
    id: 'testosterone-foods',
    title: 'The 10 Best Foods to Naturally Boost Testosterone',
    excerpt: 'What you eat directly shapes your hormone levels. These ten foods are backed by clinical studies to raise T naturally.',
    category: "Men's Health",
    topic: 'hormones',
    emoji: '⚡',
    date: 'March 8, 2026',
    readTime: '6 min read',
    gradient: 'linear-gradient(135deg,#09C8B8,#07a89a)',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774709499/StockCake-Colorful_Street_Food-937121-medium_dcy6ti.jpg',
    author: 'Brian Kiprotich',
    authorRole: "Men's Health Coach",
    content: `
      <p>Write your full article content here.</p>
      <h2>1. Fatty Fish</h2>
      <p>Your content here...</p>
    `
  },
  {
    id: 'pcos-lifestyle',
    title: 'How Lifestyle Changes Can Reverse PCOS Symptoms',
    excerpt: 'PCOS doesn\'t have to be a life sentence. Mounting evidence shows lifestyle interventions can dramatically reduce symptoms.',
    category: "Women's Health",
    topic: 'hormones',
    emoji: '🌸',
    date: 'February 28, 2026',
    readTime: '10 min read',
    gradient: 'linear-gradient(135deg,#A06046,#705C52)',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774709675/StockCake-Woman_feeling_distressed-1374140-medium_bpd3an.webp',
    author: 'Sarah Nakato',
    authorRole: "Women's Health Specialist",
    content: `
      <p>Write your full article content here.</p>
      <h2>Understanding PCOS</h2>
      <p>Your content here...</p>
    `
  },
  {
    id: 'sleep-hormones',
    title: 'Why Sleep Is Your Most Powerful Hormone Regulator',
    excerpt: 'Poor sleep is silently destroying your hormonal health. Here\'s the science and what to do about it tonight.',
    category: 'Wellness',
    topic: 'wellness',
    emoji: '🌙',
    date: 'February 20, 2026',
    readTime: '7 min read',
    gradient: 'linear-gradient(135deg,#848B8C,#161919)',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774709498/StockCake-Peaceful_Nighttime_Rest-3809725-medium_b46wdl.webp',
    author: 'Dr. A. Okello',
    authorRole: 'Lead Health Consultant',
    content: `
      <p>Write your full article content here.</p>
      <h2>The Sleep-Hormone Connection</h2>
      <p>Your content here...</p>
    `
  },
  {
    id: 'stress-weight',
    title: 'The Hidden Link Between Chronic Stress and Weight Gain',
    excerpt: 'Cortisol doesn\'t just make you anxious — it\'s actively making you store fat.',
    category: 'Weight Loss',
    topic: 'weight',
    emoji: '🧬',
    date: 'February 12, 2026',
    readTime: '9 min read',
    gradient: 'linear-gradient(135deg,#705C52,#A06046)',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774709497/StockCake-Indulgent_Food_Fest-776050-medium_e5he4h.webp',
    author: 'Dr. A. Okello',
    authorRole: 'Lead Health Consultant',
    content: `
      <p>Write your full article content here.</p>
      <h2>How Cortisol Drives Fat Storage</h2>
      <p>Your content here...</p>
    `
  },
  {
    id: 'morning-routine',
    title: 'The 20-Minute Morning Routine That Changes Everything',
    excerpt: 'You don\'t need two hours of morning rituals. These five focused practices can transform your energy and health.',
    category: 'Wellness',
    topic: 'wellness',
    emoji: '☀️',
    date: 'February 5, 2026',
    readTime: '5 min read',
    gradient: 'linear-gradient(135deg,#09C8B8,#A06046)',
    coverImage: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774705356/StockCake-Sculpted_Strength_Defined-4049072-standard_mneleh.jpg',
    author: 'Sarah Nakato',
    authorRole: "Women's Health Specialist",
    content: `
      <p>Write your full article content here.</p>
      <h2>Step 1: Hydration First</h2>
      <p>Your content here...</p>
    `
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
function initNav() {
  const nav = document.getElementById('navbar');
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  ham?.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });

  mob?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      mob.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // active link
  const page = window.location.hash.replace('#','') || 'home';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
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
  <nav id="navbar">
    <a href="#home" class="nav-logo" onclick="navigate('home')">Apophero <span>Health</span></a>
    <ul class="nav-links">
      <li><a href="#home" onclick="navigate('home')">Home</a></li>
      <li><a href="#shop" onclick="navigate('shop')">Shop</a></li>
      <li><a href="#blog" onclick="navigate('blog')">Blog</a></li>
      <li><a href="#about" onclick="navigate('about')">About</a></li>
      <li><a href="#contact" onclick="navigate('contact')">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <button id="navAccountBtn" onclick="handleAccountClick()"
        style="width:38px;height:38px;border-radius:50%;border:1.5px solid var(--border);
        background:var(--white);cursor:pointer;display:flex;align-items:center;
        justify-content:center;color:var(--warm-brown);transition:all .2s;"
        onmouseover="this.style.borderColor='var(--teal)';this.style.color='var(--teal)'"
        onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--warm-brown)'"
        title="Account">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </button>
      <a class="btn btn-nav" href="#book" onclick="navigate('book')">Book Consultation</a>
    </div>
    <div class="hamburger" id="hamburger">
      <span></span><span></span><span></span>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    <a href="#home" onclick="navigate('home')">Home</a>
    <a href="#shop" onclick="navigate('shop')">Shop</a>
    <a href="#blog" onclick="navigate('blog')">Blog</a>
    <a href="#about" onclick="navigate('about')">About</a>
    <a href="#contact" onclick="navigate('contact')">Contact</a>
    <a href="#book" onclick="navigate('book')">Book Consultation</a>
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
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="Twitter">𝕏</a>
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">◎</a>
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
    <a class="wa-btn" href="https://wa.me/256761702168?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20Apophero%20Health"
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

/* ── ACCOUNT CLICK HANDLER ── */
function handleAccountClick() {
  // If logged in — go to account page
  if (typeof currentUser !== 'undefined' && currentUser) {
    navigate('account');
  } else {
    // Not logged in — open auth modal
    if (typeof openAuthModal === 'function') {
      openAuthModal('login');
    } else {
      navigate('account');
    }
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
