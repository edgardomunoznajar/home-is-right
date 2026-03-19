/**
 * HOME IS A RIGHT
 * Main interaction layer
 */

(function () {
  'use strict';

  // ============ SCROLL ANIMATIONS ============

  const animateOnScroll = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });
  };

  // ============ BARRIER STAGGER ============

  const animateBarriers = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const barriers = entry.target.querySelectorAll('.barrier');
            barriers.forEach((barrier, i) => {
              setTimeout(() => {
                barrier.classList.add('is-visible');
              }, i * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const stack = document.querySelector('.barriers__stack');
    if (stack) observer.observe(stack);
  };

  // ============ BAR CHART ANIMATION ============

  const animateBars = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.gap__bar');
            bars.forEach((bar) => {
              const height = bar.dataset.height;
              bar.style.setProperty('--bar-height', height + '%');
              setTimeout(() => bar.classList.add('is-grown'), 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const chart = document.querySelector('.gap__chart');
    if (chart) observer.observe(chart);
  };

  // ============ COUNTDOWN TIMER ============

  const startCountdown = () => {
    // July 2026 UN deadline -- using July 1 as target
    const deadline = new Date('2026-07-01T00:00:00+10:00').getTime();

    const update = () => {
      const now = Date.now();
      const diff = deadline - now;

      if (diff <= 0) {
        document.getElementById('countdown-days').textContent = '0';
        document.getElementById('countdown-hours').textContent = '0';
        document.getElementById('countdown-minutes').textContent = '0';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      document.getElementById('countdown-days').textContent = days;
      document.getElementById('countdown-hours').textContent = hours;
      document.getElementById('countdown-minutes').textContent = minutes;
    };

    update();
    setInterval(update, 60000);
  };

  // ============ NAV ============

  const initNav = () => {
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');
    const nav = document.querySelector('.nav');

    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isOpen);
        links.classList.toggle('is-open');
      });

      // Close menu on link click
      links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          toggle.setAttribute('aria-expanded', 'false');
          links.classList.remove('is-open');
        });
      });
    }

    // Scroll state
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('is-scrolled', window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    });
  };

  // ============ HERO COUNTER ANIMATION ============

  const animateHeroCounters = () => {
    const houseEl = document.querySelector('.hero__counter--house .hero__counter-value');
    const salaryEl = document.querySelector('.hero__counter--salary .hero__counter-value');

    if (!houseEl || !salaryEl) return;

    const houseTarget = parseInt(houseEl.dataset.target);
    const salaryTarget = parseInt(salaryEl.dataset.target);

    const formatCurrency = (n) =>
      '$' + Math.round(n).toLocaleString('en-AU');

    // Animate from 0 to target
    const duration = 2000;
    const start = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      houseEl.textContent = formatCurrency(houseTarget * eased);
      salaryEl.textContent = formatCurrency(salaryTarget * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    // Only animate when hero is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(document.querySelector('.hero'));
  };

  // ============ SHARE ============

  const initShare = () => {
    document.querySelectorAll('[data-share]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.share;
        const url = window.location.href;
        const text =
          "A kid starting high school today in Adelaide won't afford a house until they're nearly 40. The maths no longer works.";

        if (type === 'copy') {
          navigator.clipboard
            .writeText(url)
            .then(() => {
              btn.textContent = 'Copied';
              setTimeout(() => (btn.textContent = 'Copy link'), 2000);
            })
            .catch(() => {
              // Fallback
              btn.textContent = 'Try again';
            });
        } else if (type === 'twitter') {
          window.open(
            `https://bsky.app/intent/compose?text=${encodeURIComponent(text + ' ' + url)}`,
            '_blank',
            'noopener,noreferrer'
          );
        }
      });
    });
  };

  // ============ STORY FORM ============

  const initForm = () => {
    const form = document.getElementById('story-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Thank you. Your story matters.';
      btn.disabled = true;
      btn.style.background = 'var(--navy)';

      // In production, this would POST to an API
      // For now, store locally
      const story = {
        age: document.getElementById('story-age').value,
        city: document.getElementById('story-city').value,
        text: document.getElementById('story-text').value,
        timestamp: new Date().toISOString(),
      };

      try {
        const stories = JSON.parse(localStorage.getItem('hiar-stories') || '[]');
        stories.push(story);
        localStorage.setItem('hiar-stories', JSON.stringify(stories));
      } catch (err) {
        // Silent fail -- localStorage may not be available
      }
    });
  };

  // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 70; // nav height
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  };

  // ============ GOOGLE ADS CONVERSION TRACKING ============

  const initConversionTracking = () => {
    // Track petition button clicks
    // REPLACE AW-18026262582/YYYYYYYYYY with your actual conversion action ID
    document.querySelectorAll('a[href*="c.org/hBjfHWZYxf"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            send_to: 'AW-18026262582/YYYYYYYYYY',
            event_callback: function () {},
          });
        }
      });
    });

    // Track share button clicks as secondary conversions
    document.querySelectorAll('[data-share]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            send_to: 'AW-18026262582/ZZZZZZZZZZ',
            value: 0.5,
            currency: 'AUD',
          });
        }
      });
    });

    // Track story form submissions
    const form = document.getElementById('story-form');
    if (form) {
      form.addEventListener('submit', () => {
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            send_to: 'AW-18026262582/WWWWWWWWWW',
            value: 1.0,
            currency: 'AUD',
          });
        }
      });
    }
  };

  // ============ INIT ============

  document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateBarriers();
    animateBars();
    animateHeroCounters();
    startCountdown();
    initNav();
    initShare();
    initForm();
    initSmoothScroll();
    initConversionTracking();
  });
})();
