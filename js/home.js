/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
pages['home'] = function() {
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 3);

  const featuredCards = featured.map((p, i) => `
    <div class="prod-card reveal reveal-delay-${i+1}">
      <div class="prod-card-img" style="background:${p.gradient};padding:0;overflow:hidden;position:relative">
        ${p.coverImage
          ? `<img src="${p.coverImage}" alt="${p.title}"
                  style="width:100%;height:100%;object-fit:cover;display:block">`
          : `<span style="font-size:3rem">${p.emoji}</span>`
        }
        <span class="badge" style="position:absolute;top:12px;right:12px">Free</span>
      </div>
      <div class="prod-card-body">
        <div class="prod-card-cat">${p.category}</div>
        <div class="prod-card-title">${p.title}</div>
        <div class="prod-card-desc">${p.desc}</div>
        <div class="prod-card-footer">
          <span class="prod-price">Free</span>
          <button onclick="showDownloadModal(PRODUCTS.find(x=>x.id==='${p.id}'))"
  class="btn btn-dark btn-sm">⬇ Download Free</button>
        </div>
      </div>
    </div>`).join('');

  const testimonials = [
    { init:'JM', name:'James M.', role:'Weight Loss Guide', stars:5,
      photo: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774710082/StockCake-Confident_Business_Professional-3993867-medium_rzntmc.webp',
      quote:'The Metabolic Blueprint completely changed how I think about food. Lost 9kg in 3 months without feeling deprived once.' },
    { init:'DK', name:'David K.', role:'Testosterone Guide', stars:5,
      photo: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774710082/StockCake-Confident_Business_Professional-3993867-medium_rzntmc.webp',
      quote:'Skeptical about a free guide actually helping — the testosterone protocol is genuinely thorough. Results after 6 weeks speak for themselves.' },
    { init:'AS', name:'Amara S.', role:'PCOS Protocol', stars:5,
      photo: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774710082/StockCake-Minimalist_Digital_Beauty-2376223-medium_tgqbkg.jpg',
      quote:'More useful, actionable information than years of vague doctor advice. I finally understand my own body.' },
    { init:'RC', name:'Reuben C.', role:'PE Guide', stars:5,
      photo: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774710082/StockCake-Confident_Business_Professional-3993867-medium_rzntmc.webp',
      quote:'Discreet, practical, and it actually works. The guide is thorough without being overwhelming. Completely changed my confidence.' },
    { init:'NK', name:'Nadia K.', role:'Antenatal Plan', stars:5,
      photo: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774710082/StockCake-Minimalist_Digital_Beauty-2376223-medium_tgqbkg.jpg',
      quote:'The antenatal wellness plan gave me confidence throughout my entire pregnancy. Highly recommend to any expectant mother.' },
    { init:'BM', name:'Brian M.', role:'Freedom Protocol', stars:5,
      photo: 'https://res.cloudinary.com/dl4fatwns/image/upload/v1774710082/StockCake-Confident_Business_Professional-3993867-medium_rzntmc.webp',
      quote:'3 months in and I genuinely feel like a different person. The structure of the program makes it actually achievable.' }
  ].map((t, i) => `
    <div class="testi-card reveal reveal-delay-${(i%3)+1}">
      <div class="testi-stars">${'★'.repeat(t.stars)}</div>
      <p class="testi-quote">"${t.quote}"</p>
      <div class="testi-author">
        <div class="testi-avatar" style="${t.photo ? 'padding:0;overflow:hidden;background:#f0f0f0' : ''}">
          ${t.photo
            ? `<img src="${t.photo}" alt="${t.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
            : t.init
          }
        </div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    </div>`).join('');

  const faqs = [
    { q:'Are all the guides really free?', a:'Yes — every guide on Apophero Health is completely free to download. We believe everyone deserves access to quality health information regardless of budget.' },
    { q:'What makes your guides different from generic health advice?', a:'Our guides are personalized frameworks, not generic lists. Each one gives you a structured protocol tailored to a specific condition, with practical steps you can start today.' },
    { q:'Do I need a medical background to understand the guides?', a:'Not at all. Every guide is written in plain language for real people. We translate complex health science into simple, actionable steps.' },
    { q:'Can I book a 1-on-1 consultation?', a:'Absolutely. Our consultation service gives you personalized guidance, answers to your specific questions, and an accountability partner on your health journey. Visit the Book a Consultation page to get started.' },
    { q:'Is my health information kept private?', a:'100%. Your data and health information are never sold or shared. We take privacy extremely seriously — it\'s core to everything we do.' },
    { q:'What topics do you cover?', a:'We cover weight management, men\'s hormonal and sexual health, women\'s health (PCOS, pregnancy), mental wellness, and general lifestyle habits.' }
  ].map((f, i) => `
    <div class="faq-item reveal" data-open="false">
      <button class="faq-q" onclick="toggleFaq(this)">
        <span>${f.q}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
    </div>`).join('');

  return `
  <style>
    /* ── HERO ── */
    .home-hero {
      min-height:100vh; padding-top:var(--nav-h);
      display:grid; grid-template-columns:1fr 1fr;
      align-items:center;
      background:
        linear-gradient(to right, rgba(22,25,25,.90) 0%, rgba(22,25,25,.85) 45%, rgba(22,25,25,.35) 100%),
        url('https://res.cloudinary.com/dl4fatwns/image/upload/v1774705326/StockCake-Pushing_Physical_Limits-4079449-standard_sde1vx.jpg') center/cover no-repeat;
      position:relative; overflow:hidden;
    }
    .hero-left {
      padding:5rem 4% 5rem 8%;
      animation:fadeUp .9s ease both;
    }
    .hero-right {
      padding:4rem 8% 4rem 2%;
      animation:fadeUp .9s .15s ease both;
      opacity:0; animation-fill-mode:forwards;
    }
    .hero-badge {
      display:inline-flex; align-items:center; gap:.5rem;
      background:rgba(9,200,184,.2); border:1px solid rgba(9,200,184,.5);
      color:var(--teal); padding:.4rem 1.1rem; border-radius:100px;
      font-size:.75rem; font-weight:700; letter-spacing:.8px;
      text-transform:uppercase; margin-bottom:1.6rem;
    }
    .hero-badge::before { content:'●'; font-size:.45rem; }
    .hero-h1 {
      margin-bottom:1.4rem;
      color:#ffffff;
      text-shadow:0 2px 12px rgba(0,0,0,.5);
    }
    .hero-h1 em { font-style:italic; color:var(--teal); }
    .hero-sub {
      font-size:1.05rem;
      color:rgba(255,255,255,.9);
      line-height:1.75;
      max-width:480px; margin-bottom:2.4rem; font-weight:400;
      text-shadow:0 1px 6px rgba(0,0,0,.6);
    }
    .hero-actions { display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:2.8rem; }
    .hero-stats { display:flex; gap:2.2rem; flex-wrap:wrap; }
    .hero-stat .num {
      font-family:var(--font-display); font-size:2rem; font-weight:700;
      color:var(--teal); line-height:1;
    }
    .hero-stat .lbl {
      font-size:.72rem;
      color:rgba(255,255,255,.85);
      font-weight:600; margin-top:.25rem;
      text-shadow:0 1px 4px rgba(0,0,0,.5);
    }

    /* floating product cards */
    .hero-cards { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
    .hero-card {
      background:var(--white); border-radius:var(--radius-lg);
      overflow:hidden; box-shadow:var(--shadow-md);
      border:1px solid var(--border);
      transition:transform .25s, box-shadow .25s; cursor:pointer;
    }
    .hero-card:hover { transform:translateY(-5px); box-shadow:var(--shadow-lg); }
    .hero-card.tall { grid-row:span 2; }
    .hero-card-cat { font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.8px; color:var(--teal); margin-bottom:.3rem; }
    .hero-card-title { font-family:var(--font-display); font-size:.95rem; font-weight:600; line-height:1.3; color:var(--black); }
    /* ── REDESIGNED HERO CARDS ── */
    .hero-cards { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }

    /* tall left card */
    .hero-card {
      border-radius:var(--radius-lg); overflow:hidden;
      background:var(--black); cursor:pointer;
      transition:transform .25s, box-shadow .25s;
      display:flex; flex-direction:column;
    }
    .hero-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(0,0,0,.5); }
    .hero-card.tall { grid-row:span 2; }
    .hero-card-media {
      width:100%; height:200px; position:relative; overflow:hidden; flex-shrink:0;
    }
    .hero-card.tall .hero-card-media { height:260px; }
    .hero-card-media img {
      width:100%; height:100%; object-fit:cover; display:block;
      transition:transform .4s ease;
    }
    .hero-card:hover .hero-card-media img { transform:scale(1.05); }
    .hero-card-overlay {
      position:absolute; inset:0;
      background:linear-gradient(to bottom, transparent 40%, rgba(22,25,25,.95) 100%);
    }
    .hero-card-body.dark { padding:1rem 1.2rem 1.4rem; flex:1; }
    .hero-card-cat { font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--teal); margin-bottom:.4rem; }
    .hero-card-title { font-family:var(--font-display); font-size:1.05rem; font-weight:700; line-height:1.3; color:#fff; margin-bottom:.5rem; }
    .hero-card-desc { font-size:.78rem; color:rgba(255,255,255,.5); line-height:1.6; margin-bottom:1rem; }
    .hero-dl-btn {
      display:inline-flex; align-items:center; gap:.4rem;
      background:var(--teal); color:#fff;
      padding:.55rem 1.1rem; border-radius:var(--radius-sm);
      font-size:.8rem; font-weight:700; text-decoration:none;
      transition:background .2s, transform .15s;
    }
    .hero-dl-btn:hover { background:var(--teal-dark); transform:translateY(-1px); }
    .hero-free-badge {
      position:absolute; top:10px; right:10px;
      background:var(--teal); color:#fff;
      font-size:.65rem; font-weight:700; letter-spacing:.6px;
      padding:.25rem .65rem; border-radius:100px;
    }

    /* right column wide cards */
    .hero-col { display:flex; flex-direction:column; gap:1rem; }
    .hero-card-wide {
      border-radius:var(--radius-lg); overflow:hidden;
      background:var(--black); cursor:pointer; flex:1;
      display:flex; flex-direction:column;
      transition:transform .25s, box-shadow .25s;
      min-height:160px;
    }
    .hero-card-wide:hover { transform:translateY(-4px); box-shadow:0 14px 35px rgba(0,0,0,.45); }
    .hero-card-wide-media {
      position:relative; height:100px; overflow:hidden; flex-shrink:0;
    }
    .hero-card-wide-media img {
      width:100%; height:100%; object-fit:cover; display:block;
      transition:transform .4s ease;
    }
    .hero-card-wide:hover .hero-card-wide-media img { transform:scale(1.05); }
    .hero-card-wide-overlay {
      position:absolute; inset:0;
      background:linear-gradient(to bottom, transparent 30%, rgba(22,25,25,.9) 100%);
    }
    .hero-card-wide-body {
      padding:.8rem 1rem 1rem;
      display:flex; align-items:center; justify-content:space-between; gap:.5rem;
    }
    .hero-wide-arrow {
      width:32px; height:32px; border-radius:50%; flex-shrink:0;
      border:1.5px solid rgba(9,200,184,.25);
      display:flex; align-items:center; justify-content:center;
      color:var(--teal); font-size:1rem;
      transition:background .2s, border-color .2s;
    }
    .hero-card-wide:hover .hero-wide-arrow { background:var(--teal); color:#fff; border-color:var(--teal); }

    /* ── TRUST BAR ── */
    .trust-bar {
      background:var(--black); padding:1.2rem 5%;
      display:flex; align-items:center; justify-content:center; gap:3rem; flex-wrap:wrap;
    }
    .trust-item { display:flex; align-items:center; gap:.6rem; color:rgba(255,255,255,.65); font-size:.82rem; font-weight:500; }
    .trust-dot { width:6px; height:6px; border-radius:50%; background:var(--teal); flex-shrink:0; }

    /* ── HOW IT WORKS ── */
    .how-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; }
    .how-card {
      padding:2.5rem 2rem; border-radius:var(--radius-lg);
      border:1.5px solid var(--border);
      transition:border-color .25s, box-shadow .25s, transform .25s;
      position:relative; overflow:hidden;
    }
    .how-card::before {
      content:''; position:absolute; inset:0;
      background:linear-gradient(135deg, transparent 60%, rgba(9,200,184,.04));
      pointer-events:none;
    }
    .how-card:hover { border-color:var(--teal); box-shadow:var(--shadow-md); transform:translateY(-4px); }
    .how-num {
      font-family:var(--font-display); font-size:4rem; font-weight:700;
      line-height:1; margin-bottom:1rem;
      -webkit-text-stroke:2px var(--teal); color:transparent;
    }
    .how-card h3 { font-size:1.1rem; font-weight:600; margin-bottom:.7rem; }
    .how-card p { font-size:.87rem; color:var(--warm-brown); line-height:1.7; }

    /* ── TESTIMONIALS ── */
    .testimonials-bg { background:var(--off-white); }
    .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.8rem; }
    .testi-card {
      background:var(--white); border-radius:var(--radius-lg);
      padding:2rem; border:1.5px solid var(--border);
      transition:box-shadow .25s, transform .25s;
    }
    .testi-card:hover { box-shadow:var(--shadow-md); transform:translateY(-3px); }
    .testi-stars { color:#f5a623; font-size:1rem; letter-spacing:2px; margin-bottom:1rem; }
    .testi-quote { font-size:.88rem; color:var(--warm-brown); line-height:1.75; margin-bottom:1.4rem; font-style:italic; }
    .testi-author { display:flex; align-items:center; gap:.9rem; }
    .testi-avatar {
      width:42px; height:42px; border-radius:50%;
      background:var(--teal-light); color:var(--teal-dark);
      display:flex; align-items:center; justify-content:center;
      font-weight:700; font-size:.88rem; flex-shrink:0;
    }
    .testi-name { font-weight:600; font-size:.88rem; }
    .testi-role { font-size:.74rem; color:var(--slate); }

    /* ── FAQ ── */
    .faq-list { max-width:760px; margin:0 auto; display:flex; flex-direction:column; gap:.8rem; }
    .faq-item {
      background:var(--white); border-radius:var(--radius-md);
      border:1.5px solid var(--border); overflow:hidden;
      transition:border-color .2s;
    }
    .faq-item[data-open="true"] { border-color:var(--teal); }
    .faq-q {
      width:100%; display:flex; align-items:center; justify-content:space-between;
      padding:1.3rem 1.5rem; cursor:pointer; background:none;
      font-size:.95rem; font-weight:600; text-align:left; gap:1rem;
      transition:color .2s;
    }
    .faq-item[data-open="true"] .faq-q { color:var(--teal); }
    .faq-icon { font-size:1.3rem; font-weight:300; color:var(--teal); flex-shrink:0; transition:transform .25s; }
    .faq-item[data-open="true"] .faq-icon { transform:rotate(45deg); }
    .faq-a { max-height:0; overflow:hidden; transition:max-height .35s cubic-bezier(.4,0,.2,1); }
    .faq-item[data-open="true"] .faq-a { max-height:300px; }
    .faq-a-inner { padding:0 1.5rem 1.3rem; font-size:.88rem; color:var(--warm-brown); line-height:1.75; }

    /* ── CTA STRIP ── */
    .cta-strip {
      background:var(--black); padding:7rem 5%;
      display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center;
      position:relative; overflow:hidden;
    }
    .cta-strip::before {
      content:''; position:absolute; top:-100px; right:-100px;
      width:500px; height:500px; border-radius:50%;
      background:radial-gradient(circle,rgba(9,200,184,.12) 0%,transparent 65%);
      pointer-events:none;
    }
    .cta-strip h2 { color:var(--white); }
    .cta-strip p { color:rgba(255,255,255,.55); margin-top:.8rem; font-size:.95rem; line-height:1.7; }
    .cta-strip-actions { display:flex; flex-direction:column; gap:1rem; align-items:flex-start; }
    .cta-stat-row { display:flex; gap:2.5rem; margin-top:2rem; }
    .cta-stat .n { font-family:var(--font-display); font-size:2.2rem; font-weight:700; color:var(--teal); }
    .cta-stat .l { font-size:.75rem; color:rgba(255,255,255,.4); margin-top:.2rem; }

    /* ── RESPONSIVE ── */
    @media(max-width:960px) {
      .home-hero { grid-template-columns:1fr; min-height:auto; }
      .hero-left { padding:5rem 5% 2rem; }
      .hero-right { padding:1rem 5% 4rem; }
      .how-grid { grid-template-columns:1fr; }
      .testi-grid { grid-template-columns:1fr; }
      .cta-strip { grid-template-columns:1fr; padding:5rem 5%; }
    }
    @media(max-width:600px) {
      .hero-cards { grid-template-columns:1fr; }
      .hero-stats { gap:1.5rem; }
    }
  </style>

  <!-- HERO -->
  <section class="home-hero">
    <div class="hero-left">
      <div class="hero-badge">Evidence-Based Health Guidance</div>
      <h1 class="display-xl hero-h1">Reclaim Your Health.<br><em>On Your Terms.</em></h1>
      <p class="hero-sub">Personalized, private health protocols for weight loss, hormonal balance, and long-term wellness — backed by science, built for real life.</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg btn-arrow" onclick="navigate('shop')">Browse Free Guides</a>
        <a class="btn btn-outline-white btn-lg" onclick="navigate('book')">Book a Consultation</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat"><div class="num">8+</div><div class="lbl">Free Guides</div></div>
        <div class="hero-stat"><div class="num">100%</div><div class="lbl">Private & Secure</div></div>
        <div class="hero-stat"><div class="num">1:1</div><div class="lbl">Counselling</div></div>
        <div class="hero-stat"><div class="num">5★</div><div class="lbl">Rated</div></div>
      </div>
    </div>

    <div class="hero-right">
      <div class="hero-cards">

        <!-- TALL FEATURED CARD — LEFT -->
        <div class="hero-card tall" onclick="showDownloadModal(PRODUCTS[0])">
          <div class="hero-card-media">
            ${PRODUCTS[0].coverImage
              ? `<img src="${PRODUCTS[0].coverImage}" alt="${PRODUCTS[0].shortTitle}">`
              : `<div class="hero-card-media-fallback" style="background:${PRODUCTS[0].gradient}"></div>`
            }
            <div class="hero-card-overlay"></div>
            <span class="hero-free-badge">FREE</span>
          </div>
          <div class="hero-card-body dark">
            <div class="hero-card-cat">${PRODUCTS[0].category}</div>
            <div class="hero-card-title">${PRODUCTS[0].shortTitle}</div>
            <div class="hero-card-desc">${PRODUCTS[0].desc.slice(0,80)}…</div>
            <a href="${PRODUCTS[0].link}" download class="hero-dl-btn">⬇ Download Free</a>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="hero-col">

          <!-- CARD 2 -->
          <div class="hero-card-wide" onclick="showDownloadModal(PRODUCTS[0])">
            <div class="hero-card-wide-media">
              ${PRODUCTS[1].coverImage
                ? `<img src="${PRODUCTS[1].coverImage}" alt="${PRODUCTS[1].shortTitle}">`
                : `<div style="width:100%;height:100%;background:${PRODUCTS[1].gradient}"></div>`
              }
              <div class="hero-card-wide-overlay"></div>
              <span class="hero-free-badge">FREE</span>
            </div>
            <div class="hero-card-wide-body">
              <div class="hero-card-cat">${PRODUCTS[1].category}</div>
              <div class="hero-card-title">${PRODUCTS[1].shortTitle}</div>
              <div class="hero-wide-arrow">→</div>
            </div>
          </div>

          <!-- CARD 3 -->
          <div class="hero-card-wide" onclick="showDownloadModal(PRODUCTS[0])">
            <div class="hero-card-wide-media">
              ${PRODUCTS[3].coverImage
                ? `<img src="${PRODUCTS[3].coverImage}" alt="${PRODUCTS[3].shortTitle}">`
                : `<div style="width:100%;height:100%;background:${PRODUCTS[3].gradient}"></div>`
              }
              <div class="hero-card-wide-overlay"></div>
              <span class="hero-free-badge" style="background:var(--terracotta)">FREE</span>
            </div>
            <div class="hero-card-wide-body">
              <div class="hero-card-cat" style="color:var(--terracotta)">${PRODUCTS[3].category}</div>
              <div class="hero-card-title">${PRODUCTS[3].shortTitle}</div>
              <div class="hero-wide-arrow" style="border-color:rgba(160,96,70,.2);color:var(--terracotta)">→</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- TRUST BAR -->
  <div class="trust-bar">
    <div class="trust-item"><span class="trust-dot"></span> 100% Private & Confidential</div>
    <div class="trust-item"><span class="trust-dot"></span> Evidence-Based Protocols</div>
    <div class="trust-item"><span class="trust-dot"></span> Personalized to Your Goals</div>
    <div class="trust-item"><span class="trust-dot"></span> 1-on-1 Counselling Available</div>
    <div class="trust-item"><span class="trust-dot"></span> Always Free to Download</div>
  </div>

  <!-- HOW IT WORKS -->
  <section class="section-pad" style="background:var(--white)">
    <div class="container">
      <div class="section-header center reveal">
        <div class="eyebrow">How It Works</div>
        <h2 class="display-md" style="margin-top:.6rem">Your Path to Better Health</h2>
        <p class="lead">A simple, framework built around your specific condition, lifestyle, and goals that addresses symptoms, treats root causes, and adjusts your behaviours, for immediate relief and long-term optimal health .</p>
      </div>
      <div class="how-grid">
        <div class="how-card reveal">
          <div class="how-num">01</div>
          <h3>Download Your Free Guide</h3>
          <p>Start with one of our research-backed health guides tailored to your specific concern — weight, hormones, reproductive health, or general wellness.</p>
        </div>
        <div class="how-card reveal reveal-delay-1">
          <div class="how-num">02</div>
          <h3>Follow Your Protocol</h3>
          <p>Apply the step-by-step framework at your own pace. Every recommendation is practical, natural-first, and built to fit a real, busy life.</p>
        </div>
        <div class="how-card reveal reveal-delay-2">
          <div class="how-num">03</div>
          <h3>Get Personalised Support</h3>
          <p>Need more? Book a private 1-on-1 counselling session. We'll refine your protocol, answer your questions, and keep you accountable.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED PRODUCTS -->
  <section class="section-pad" style="background:var(--sage)">
    <div class="container">
      <div class="section-header reveal" style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:2.5rem">
        <div>
          <div class="eyebrow">Featured Resources</div>
          <h2 class="display-md" style="margin-top:.6rem">Guides Built for Real Results</h2>
        </div>
        <a class="btn btn-outline btn-arrow" onclick="navigate('shop')">View All Guides</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.8rem">
        ${featuredCards}
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="section-pad testimonials-bg">
    <div class="container">
      <div class="section-header center reveal">
        <div class="eyebrow">Real Stories</div>
        <h2 class="display-md" style="margin-top:.6rem">People Who Took Control</h2>
        <p class="lead">Hear from real people who used Apophero Health guides to transform their wellbeing.</p>
      </div>
      <div class="testi-grid">${testimonials}</div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section-pad" style="background:var(--white)">
    <div class="container">
      <div class="section-header center reveal">
        <div class="eyebrow">FAQ</div>
        <h2 class="display-md" style="margin-top:.6rem">Common Questions</h2>
        <p class="lead">Everything you need to know before getting started.</p>
      </div>
      <div class="faq-list">${faqs}</div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <section class="cta-strip">
    <div>
      <h2 class="display-md">Ready to Start<br>Your Health Journey?</h2>
      <p>Download any of our free guides, or book a private 1-on-1 consultation. Your health transformation starts with one step.</p>
      <div class="cta-stat-row">
        <div class="cta-stat"><div class="n">8+</div><div class="l">Free Resources</div></div>
        <div class="cta-stat"><div class="n">100%</div><div class="l">Free Forever</div></div>
        <div class="cta-stat"><div class="n">1:1</div><div class="l">Counselling</div></div>
      </div>
    </div>
    <div class="cta-strip-actions reveal">
      <a class="btn btn-primary btn-lg btn-arrow" onclick="navigate('shop')">Browse All Free Guides</a>
      <a class="btn btn-outline-white btn-lg" onclick="navigate('book')">Book a Consultation</a>
      <a class="btn btn-outline-white" onclick="navigate('contact')">Get in Touch →</a>
    </div>
  </section>

  ${renderNewsletter()}`;
};

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.getAttribute('data-open') === 'true';
  document.querySelectorAll('.faq-item').forEach(f => f.setAttribute('data-open','false'));
  item.setAttribute('data-open', isOpen ? 'false' : 'true');
}
