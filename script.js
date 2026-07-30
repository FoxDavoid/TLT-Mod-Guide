'use strict';

const pills    = document.querySelectorAll('.nav-pill');
const sections = document.querySelectorAll('h3[id]');

function updateActivePill() {
  const mid = window.scrollY + window.innerHeight / 2;
  let activeId = null;

  for (let i = 0; i < sections.length; i++) {
    if (sections[i].offsetTop <= mid) activeId = sections[i].id;
  }

  for (let j = 0; j < pills.length; j++) {
    pills[j].classList.toggle('active', pills[j].dataset.target === activeId);
  }
}

for (const pill of pills) {
  pill.addEventListener('click', () => {
    const target = document.getElementById(pill.dataset.target);
    if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', () => requestAnimationFrame(updateActivePill), { passive: true });
window.addEventListener('resize', () => requestAnimationFrame(updateActivePill), { passive: true });
updateActivePill();
