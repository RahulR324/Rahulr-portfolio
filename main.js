// Custom cursor
const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateCursorRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Enlarge cursor on interactive elements
  document.querySelectorAll('a, button, .pill, .skill-group, .learning-card, .achievement-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursorRing.style.width = '60px';
      cursorRing.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursorRing.style.width = '40px';
      cursorRing.style.height = '40px';
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Nav active state
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href').endsWith('#' + current)
        ? 'var(--accent)' : '';
    });
  });

  // Timeline hover
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Timeline progress bar scroll animation
  const timelineProgress = document.getElementById('timelineProgress');
  const experienceSection = document.getElementById('experience');

  if (timelineProgress && experienceSection) {
    window.addEventListener('scroll', () => {
      const rect = experienceSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const scrollProgress = (viewportHeight - sectionTop) / (sectionHeight + viewportHeight);
      const progress = Math.min(Math.max(scrollProgress * 100, 0), 100);

      timelineProgress.style.height = progress + '%';
    });
  }

  // Smooth nav scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Terminal typing animation
const editorText = document.getElementById('editorText');
if (editorText) {
  const code = [
    '// Laravel chat route',
    "Route::post('/chat/send', [ChatController::class, 'send']);",
    '',
    '// React exam timer',
    'useEffect(() => {',
    '  const t = setInterval(() => setTime(s => s - 1), 1000);',
    '  return () => clearInterval(t);',
    '}, []);',
  ];
  let i = 0, j = 0, current = '';
  function typeCode() {
    if (i < code.length) {
      if (j < code[i].length) {
        current += code[i][j++];
        editorText.textContent = current;
        setTimeout(typeCode, 35);
      } else {
        current += '\n';
        editorText.textContent = current;
        i++; j = 0;
        setTimeout(typeCode, 200);
      }
    }
  }
  typeCode();
}
  document.addEventListener("DOMContentLoaded", () => {
    const year = new Date().getFullYear();
    document.querySelectorAll(".current-year").forEach(el => {
      el.textContent = year;
    });
  });