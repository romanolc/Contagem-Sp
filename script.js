/* ============================================
   SP2026 — script.js
   Countdown · Particles · Scroll Reveal
   ============================================ */

/* ── Countdown ────────────────────────────── */
(function initCountdown() {
  // Target: 05 Aug 2026 00:00 Brasília (UTC-3)
  const TARGET = new Date('2026-08-05T03:00:00Z').getTime();

  const els = {
    days:    document.querySelector('#cd-days .cd-val'),
    hours:   document.querySelector('#cd-hours .cd-val'),
    minutes: document.querySelector('#cd-minutes .cd-val'),
    seconds: document.querySelector('#cd-seconds .cd-val'),
    wrap:    document.getElementById('countdown'),
    msg:     document.getElementById('arrivedMsg'),
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = Date.now();
    const diff = TARGET - now;

    if (diff <= 0) {
      els.wrap.style.display = 'none';
      els.msg.style.display  = 'block';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    // Flip animation on change
    function update(el, val) {
      const pval = pad(val);
      if (el.textContent !== pval) {
        el.style.transform = 'translateY(-8px)';
        el.style.opacity   = '0';
        el.style.transition = 'none';
        requestAnimationFrame(() => {
          el.textContent = pval;
          requestAnimationFrame(() => {
            el.style.transition = 'transform .25s ease, opacity .25s ease';
            el.style.transform  = 'translateY(0)';
            el.style.opacity    = '1';
          });
        });
      }
    }

    update(els.days,    d);
    update(els.hours,   h);
    update(els.minutes, m);
    update(els.seconds, s);
  }

  tick();
  setInterval(tick, 1000);
})();


/* ── Particles ────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.floor(W * H / 18000);
    particles = Array.from({ length: count }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.5 + .3,
      vx:   (Math.random() - .5) * .25,
      vy:   (Math.random() - .5) * .25,
      a:    Math.random() * .5 + .1,
      hue:  Math.random() < .6 ? 195 : 270, // cyan or purple
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.a})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
})();


/* ── Scroll Reveal ────────────────────────── */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
})();


/* ── Parallax on hero image ───────────────── */
(function initParallax() {
  const bg = document.getElementById('heroBg');
  if (!bg) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bg.style.transform = `scale(1.15) translateY(${y * 0.18}px)`;
  }, { passive: true });
})();
