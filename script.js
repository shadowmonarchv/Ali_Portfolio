// Toggle AI simplified vs technical description
function toggleAI(btn, projectId) {
  const techDesc = document.getElementById(`desc-${projectId}-tech`);
  const simpleDesc = document.getElementById(`desc-${projectId}-simple`);
  if (techDesc.style.display === "none") {
    techDesc.style.display = "block";
    simpleDesc.style.display = "none";
    btn.innerText = "🤖 Simplify";
    btn.style.color = "var(--gold)";
  } else {
    techDesc.style.display = "none";
    simpleDesc.style.display = "block";
    btn.innerText = "⚙️ Technical";
    btn.style.color = "var(--accent)";
  }
}

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
});
function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

// Make cursor react to links and buttons
const clickables = document.querySelectorAll('a, .btn-primary, .btn-ghost, .btn-resume, .nav-resume-btn, .tag');
clickables.forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover-effect'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover-effect'));
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Intersection observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const siblings = el.parentElement.querySelectorAll('.timeline-item, .skill-card, .project-card');
      const idx = Array.from(siblings).indexOf(el);
      setTimeout(() => el.classList.add('visible'), idx * 120);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.timeline-item, .skill-card, .project-card').forEach(el => observer.observe(el));

// Smart Contextual Greeting
function updateGreeting() {
  const greetingElement = document.getElementById('smart-greeting');
  const hour = new Date().getHours();
  let dynamicText = "";
  if (hour >= 22 || hour < 5) {
    dynamicText = "Late night coding? Welcome. · ";
  } else if (hour >= 5 && hour < 12) {
    dynamicText = "Good morning. Let's build. · ";
  } else if (hour >= 12 && hour < 18) {
    dynamicText = "Good afternoon. · ";
  } else {
    dynamicText = "Good evening. · ";
  }
  greetingElement.innerHTML = dynamicText + "Mumbai, Maharashtra · Open to Remote";
}
updateGreeting();

// 1-Click Copy Email
function copyEmail(btn) {
  const email = "alimehdimirza1010@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    const originalText = btn.innerText;
    btn.innerText = "Copied to clipboard! ✓";
    btn.style.color = "var(--white)";
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.color = "var(--gold)";
    }, 2000);
  });
}

// ✅ FORMSPREE CONTACT FORM — AJAX submission (no page redirect)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitIcon = document.getElementById('submit-icon');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    // Loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitIcon.style.display = 'none';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Success
        contactForm.reset();
        successMsg.style.display = 'block';
        submitText.textContent = '✓ Sent!';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitText.textContent = 'Send Message';
          submitIcon.style.display = 'inline';
        }, 4000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      // Error
      errorMsg.style.display = 'block';
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
      submitIcon.style.display = 'inline';
    }
  });
}
// Scroll progress bar
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
});

// Dark / Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const iconMoon = document.getElementById('icon-moon');
const iconSun = document.getElementById('icon-sun');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'light') {
    iconMoon.style.display = 'none';
    iconSun.style.display = 'block';
  } else {
    iconMoon.style.display = 'block';
    iconSun.style.display = 'none';
  }
}

// On page load — check localStorage first, then system preference
const savedTheme = localStorage.getItem('theme');
const systemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = savedTheme || (systemLight ? 'light' : 'dark');
applyTheme(initialTheme);

// On toggle click
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});
// On toggle click
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ✅ ADD HERE — Scroll animations for sections
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate], [data-animate-left]').forEach(el => {
  animateObserver.observe(el);
});