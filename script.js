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
        btn.style.color = "var(--accent)"; // Uses the blue accent you defined
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
    const clickables = document.querySelectorAll('a, .btn-primary, .btn-ghost, .tag');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('hover-effect');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('hover-effect');
      });
    });

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
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
