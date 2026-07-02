gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile nav toggle
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');
if (burger) {
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }));
}

if (!reduced) {

  // ---- Hero load sequence ----
  const heroTl = gsap.timeline({ delay: 0.2 });

  heroTl
    .from('.hero__title .line', {
      y: 46, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12
    })
    .from('.hero__sub, .hero__actions', {
      y: 20, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08
    }, '-=0.5')
    .to('.beam--white', {
      strokeDashoffset: 0, duration: 0.5, ease: 'power1.out'
    }, '-=0.9')
    .from('.prism-shape', {
      opacity: 0, scale: 0.7, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2)'
    }, '-=0.15')
    .to('.beam--c', {
      strokeDashoffset: 0, duration: 0.9, ease: 'power2.out', stagger: 0.05
    }, '-=0.1')
    .from('.hero__fox', {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
    }, '-=0.9')
    .to('.spectrum-word', {
      backgroundPosition: '200% 0%', duration: 2.5, ease: 'none', repeat: -1, yoyo: true
    }, '-=0.3');

  // ---- Scroll reveals ----
  const revealGroups = [
    '.about__text p',
    '.about__cards .card',
    '.service',
    '.clients__row',
    '.team__founder',
    '.team__item',
    '.contact__text > *',
  ];

  revealGroups.forEach(sel => {
    const items = gsap.utils.toArray(sel);
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0,
      y: 26,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: items[0].closest('section') || items[0],
        start: 'top 78%',
        once: true
      }
    });
  });

  gsap.from('.services__fox', {
    opacity: 0, x: 40, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '.services', start: 'top 60%', once: true }
  });

  gsap.from('.contact__fox', {
    opacity: 0, y: 30, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.contact', start: 'top 70%', once: true }
  });

  // Marquee speeds up slightly on fast scroll
  let marqueeTrack = document.querySelector('.marquee__track');
  let lastY = window.scrollY;
  let speed = 26;
  window.addEventListener('scroll', () => {
    const delta = Math.abs(window.scrollY - lastY);
    lastY = window.scrollY;
    const target = Math.max(8, 26 - delta * 0.4);
    speed += (target - speed) * 0.15;
    if (marqueeTrack) marqueeTrack.style.animationDuration = speed + 's';
  }, { passive: true });

} else {
  // Reduced motion: just make everything visible, no animation
  document.querySelectorAll('.beam--white, .beam--c').forEach(el => el.style.strokeDashoffset = 0);
}
