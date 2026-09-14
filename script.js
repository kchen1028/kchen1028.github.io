// 导航栏滚动效果
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// 数字滚动动画
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.floor(start + (target - start) * easeOut);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// 检测 hero stats 进入视口时触发数字动画
const heroStats = document.querySelectorAll('.stat-value span:first-child');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      heroStats.forEach((el, i) => {
        const target = parseInt(el.textContent, 10);
        if (!isNaN(target) && target > 0) {
          const original = el.textContent;
          el.textContent = '0';
          setTimeout(() => {
            animateCounter(el, target, 1400 + i * 200);
            // 动画结束后恢复带单位的文本
            setTimeout(() => {
              el.textContent = original;
            }, 1400 + i * 200 + 100);
          }, i * 150);
        }
      });
    }
  });
}, { threshold: 0.5 });

const heroStatsSection = document.querySelector('.hero-stats');
if (heroStatsSection) {
  statsObserver.observe(heroStatsSection);
}

// 回到顶部
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 移动端菜单
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// 点击链接后关闭移动菜单
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// 滚动显现动画
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 为需要动画的元素添加 reveal 类
document.querySelectorAll(
  '.section-header, .about-text, .about-info, .timeline-item, .project-card, .edu-card, .skill-category, .award-item, .contact-card'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// 技能条动画延迟
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach((fill, i) => {
        fill.style.animationDelay = `${i * 0.1}s`;
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => {
  skillObserver.observe(cat);
});

// 平滑滚动偏移（考虑导航栏高度）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 60;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// 当前导航高亮
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(item => {
        item.style.color = '';
        item.style.background = '';
        if (item.getAttribute('href') === `#${id}`) {
          item.style.color = 'var(--primary)';
          item.style.background = 'var(--bg-hover)';
        }
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' });

sections.forEach(section => navObserver.observe(section));
