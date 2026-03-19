(function () {
  'use strict';

  var pills    = document.querySelectorAll('.nav-pill');
  var sections = document.querySelectorAll('h3[id]');
  var rafPending = false;

  function updateActivePill() {
    var mid = window.scrollY + window.innerHeight / 2;
    var activeId = null;

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= mid) activeId = sections[i].id;
    }

    for (var j = 0; j < pills.length; j++) {
      var matches = pills[j].dataset.target === activeId;
      pills[j].classList.toggle('active', matches);
    }
  }

  function onScroll() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function () {
      updateActivePill();
      rafPending = false;
    });
  }

  function makeGoTo(pill) {
    return function () {
      var target = document.getElementById(pill.dataset.target);
      if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
    };
  }

  for (var k = 0; k < pills.length; k++) {
    var goTo = makeGoTo(pills[k]);
    pills[k].addEventListener('click', goTo);
    pills[k].addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); makeGoTo(this)(); }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateActivePill();
}());