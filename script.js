// ============================================================
// 交互脚本
// 依赖：无（i18n.js 独立，通过 languagechange 事件解耦）
// ============================================================

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// ============================================================
// 导航栏滚动状态 + 回到顶部按钮
// 用 requestAnimationFrame 节流，避免滚动时每帧多次读写布局
// ============================================================
let ticking = false;

function onScroll() {
  const y = window.scrollY;

  if (nav) nav.classList.toggle('scrolled', y > 20);
  if (backToTop) backToTop.classList.toggle('visible', y > 400);

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });

onScroll();

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

// ============================================================
// 移动端菜单
// ============================================================
function setMenuOpen(open) {
  if (!navLinks || !navToggle) return;
  navLinks.classList.toggle('open', open);
  // 同步无障碍状态，否则屏幕阅读器不知道菜单是开是关
  navToggle.setAttribute('aria-expanded', String(open));
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    setMenuOpen(!navLinks.classList.contains('open'));
  });
}

// 点击菜单项后收起
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}

// Esc 关闭菜单并归还焦点
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || !navLinks || !navLinks.classList.contains('open')) return;
  setMenuOpen(false);
  navToggle.focus();
});

// 点击菜单外部收起
document.addEventListener('click', e => {
  if (!navLinks || !navLinks.classList.contains('open')) return;
  if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
  setMenuOpen(false);
});

// ============================================================
// Hero 数字滚动动画
// ============================================================
function animateCounter(el, target, duration) {
  const startTime = performance.now();

  function update(now) {
    // 上下界都要钳制：rAF 的时间戳在某些环境下可能早于 startTime，
    // 只做 Math.min 会让 progress 变成负数，算出负的计数值
    const progress = Math.min(Math.max((now - startTime) / duration, 0), 1);
    const easeOut = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.round(target * easeOut);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const heroStatsSection = document.querySelector('.hero-stats');
const statValueEls = document.querySelectorAll('.stat-value span:first-child');

if (heroStatsSection && statValueEls.length && !reduceMotion) {
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || statsAnimated) return;
      statsAnimated = true;

      statValueEls.forEach((el, i) => {
        const target = parseInt(el.textContent.trim(), 10);
        if (isNaN(target) || target <= 0) return;

        el.textContent = '0';
        setTimeout(() => {
          animateCounter(el, target, 1400 + i * 200);
        }, i * 150);
      });

      statsObserver.disconnect();
    });
  }, { threshold: 0.5 });

  statsObserver.observe(heroStatsSection);
}

// ============================================================
// 滚动显现
// ============================================================
const revealTargets = document.querySelectorAll(
  '.section-header, .about-text, .about-info, .timeline-item, .project-card, ' +
  '.edu-card, .skill-category, .award-item, .contact-card'
);

if (reduceMotion || !('IntersectionObserver' in window)) {
  // 不做动画时直接显示，绝不能留成 opacity: 0
  revealTargets.forEach(el => el.classList.add('reveal', 'visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

// ============================================================
// 当前导航高亮
// 用 class 切换而非 inline style —— inline style 优先级高于 :hover，
// 会让高亮项失去悬停反馈
// ============================================================
const navItems = document.querySelectorAll('.nav-links li:not(.nav-item-cta) > a');
const sections = document.querySelectorAll('section[id]');

if (navItems.length && sections.length && 'IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    });
  }, { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(section => navObserver.observe(section));
}
