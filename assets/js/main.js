/* ========== NAV SCROLL ========== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* ========== MOBILE MENU ========== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  if (navLinks.style.display === 'flex') {
    navLinks.style.display = '';
    navLinks.removeAttribute('style');
  } else {
    Object.assign(navLinks.style, {
      display: 'flex', position: 'absolute', top: '100%', left: '0', right: '0',
      flexDirection: 'column', background: 'rgba(10,10,12,.98)',
      padding: '24px', gap: '20px',
      borderBottom: '1px solid rgba(255,255,255,.08)'
    });
  }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth <= 960) {
    navLinks.removeAttribute('style');
    burger.classList.remove('open');
  }
}));

/* ========== SCROLL PROGRESS ========== */
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progress.style.transform = `scaleX(${scrolled})`;
}, { passive: true });

/* ========== CUSTOM CURSOR ========== */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0, cursorInit = false;

if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    if (!cursorInit) { rx = mx; ry = my; cursorInit = true; animateRing(); }
  });
  function animateRing() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  const hoverEls = 'a, button, .project, .service, .review, .contact-link, .social, .why-item, .step, input, textarea';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('hover');
      cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('hover');
      cursorDot.classList.remove('hover');
    });
  });
}

/* ========== HERO CURSOR GLOW ========== */
const heroGlow = document.getElementById('heroGlow');
const heroSection = document.querySelector('.hero');
if (heroSection && heroGlow) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    heroGlow.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    heroGlow.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  });
}

/* ========== PARALLAX ORBS ========== */
const orbs = document.querySelectorAll('.orb');
if (orbs.length) {
  let orbX = 0, orbY = 0, targetX = 0, targetY = 0;
  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  function animateOrbs() {
    orbX += (targetX - orbX) * 0.05;
    orbY += (targetY - orbY) * 0.05;
    orbs.forEach(o => {
      const f = parseFloat(o.dataset.parallax) || 0;
      o.style.transform = `translate(${orbX * 100 * f}px, ${orbY * 100 * f}px)`;
    });
    requestAnimationFrame(animateOrbs);
  }
  animateOrbs();
}

/* ========== REVEAL ========== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ========== COUNTERS ========== */
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.querySelector('span')?.outerHTML || '';
      let current = 0;
      const step = target / 40;
      const tick = () => {
        current += step;
        if (current >= target) el.innerHTML = target + suffix;
        else { el.innerHTML = Math.floor(current) + suffix; requestAnimationFrame(tick); }
      };
      tick();
      counterIO.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

/* ========== SERVICE SPOTLIGHT ========== */
document.querySelectorAll('.service').forEach(s => {
  s.addEventListener('mousemove', e => {
    const rect = s.getBoundingClientRect();
    s.style.setProperty('--x', ((e.clientX - rect.left) / rect.width * 100) + '%');
    s.style.setProperty('--y', ((e.clientY - rect.top) / rect.height * 100) + '%');
  });
});

/* ========== MARQUEE ========== */
const marquee = document.getElementById('marquee');
if (marquee) marquee.innerHTML += marquee.innerHTML;

/* ========== MAGNETIC ========== */
document.querySelectorAll('.btn-primary, .calendly-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ========== FORM VALIDATION & SUBMISSION (TELEGRAM) ========== */
// ⚠️ ВСТАВТЕ СЮДИ ВАШІ ДАНІ (не видаляйте лапки!):
const TG_BOT_TOKEN = '9158736005:AAHHCT2ohF37ZzdbC9m3CMCduwdAOG14y4w';
const TG_CHAT_ID = '822602758';

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const formMsg = document.getElementById('formMsg');

const nameInput = form ? form.querySelector('[name="name"]') : null;
const contactInput = form ? form.querySelector('[name="contact"]') : null;
const messageInput = form ? form.querySelector('[name="message"]') : null;
const honeypotInput = form ? form.querySelector('[name="website_url"]') : null;

// Запам'ятовуємо час, коли сторінка завантажилась
const formLoadTime = Date.now();

// Видаляємо червону рамку при введенні
[nameInput, contactInput, messageInput].forEach(input => {
  if (input) {
    input.addEventListener('input', () => {
      const field = input.closest('.field');
      if (field) field.classList.remove('error');
    });
  }
});

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    formMsg.className = 'form-msg';
    formMsg.textContent = '';

    // 🛡️ АНТИ-СПАМ ПЕРЕВІРКИ (Тихі, щоб не допомагати ботам)
    
    // 1. Перевірка Honeypot (якщо поле заповнене - це бот)
    if (honeypotInput && honeypotInput.value !== '') {
      console.warn("Spam blocked: Honeypot filled.");
      return; // Тихо блокуємо без повідомлення
    }

    // 2. Перевірка швидкості (якщо заповнили швидше ніж за 3 секунди - бот)
    if (Date.now() - formLoadTime < 3000) {
      console.warn("Spam blocked: Too fast.");
      return; 
    }

    // 3. Обмеження: не більше 1 повідомлення на хвилину
    const lastSubmit = localStorage.getItem('lastFormSubmit');
    if (lastSubmit && (Date.now() - lastSubmit < 60000)) {
      formMsg.className = 'form-msg error-global';
      formMsg.textContent = "Please wait a minute before sending another message.";
      return;
    }

    // --- ВАЛІДАЦІЯ ПОЛІВ ---
    const nameVal = nameInput && nameInput.value ? nameInput.value.trim() : '';
    const contactVal = contactInput && contactInput.value ? contactInput.value.trim() : '';
    const messageVal = messageInput && messageInput.value ? messageInput.value.trim() : '';

    let isValid = true;

    if (nameInput) {
      if (nameVal.length < 2) {
        nameInput.closest('.field')?.classList.add('error');
        isValid = false;
      } else {
        nameInput.closest('.field')?.classList.remove('error');
      }
    }

    if (contactInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const tgRegex = /^@?[a-zA-Z0-9_]{3,32}$/;
      if (!(emailRegex.test(contactVal) || tgRegex.test(contactVal))) {
        contactInput.closest('.field')?.classList.add('error');
        isValid = false;
      } else {
        contactInput.closest('.field')?.classList.remove('error');
      }
    }

    if (messageInput) {
      if (messageVal.length < 10) {
        messageInput.closest('.field')?.classList.add('error');
        isValid = false;
      } else {
        messageInput.closest('.field')?.classList.remove('error');
      }
    }

    if (!isValid) return;

    // Блокуємо кнопку
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    btnIcon.style.display = 'none';

    const text = `🚀 New Lead from Website!\n\nName: ${nameVal}\nContact: ${contactVal}\nMessage: ${messageVal}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text: text
        })
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        formMsg.className = 'form-msg success';
        formMsg.textContent = "✓ Got it! I'll reply within 2 business hours — usually much faster.";
        form.reset();
        // Запам'ятовуємо час успішної відправки
        localStorage.setItem('lastFormSubmit', Date.now());
      } else {
        console.error("Telegram API Error:", data);
        throw new Error(data.description || 'API Error');
      }
    } catch (error) {
      console.error('Form error:', error);
      formMsg.className = 'form-msg error-global';
      formMsg.textContent = "Oops! Something went wrong. Please email me directly at pidhrabia@gmail.com.";
    } finally {
      submitBtn.disabled = false;
      btnText.textContent = 'Send message';
      btnIcon.style.display = 'block';
      
      if (formMsg.classList.contains('success')) {
        setTimeout(() => {
          formMsg.className = 'form-msg';
          formMsg.textContent = '';
        }, 6000);
      }
    }
  });
}

/* ========== SMOOTH SCROLL ========== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});