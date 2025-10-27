(function () {
  if (window.__navBound) return;           // 중복 바인딩 방지(라이브리로드/Blade include 대비)
  window.__navBound = true;

  const nav = document.querySelector('nav');
  const openBtn = document.getElementById('navOpen');   // 없어도 됨
  const backdrop = document.querySelector('.nav-backdrop');
  const headerBtn = document.querySelector('.header-toggle'); // 헤더 햄버거
  if (!nav || !backdrop) return;

  let lastFocus = null;

  const focusables = () =>
    nav.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');

  const trapFocus = (e) => {
    if (e.key !== 'Tab') return;
    const f = focusables(); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  };

const open = () => {
  lastFocus = document.activeElement;
  nav.classList.add('is-open');
  if (openBtn) openBtn.hidden = true;
  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';

  document.body.classList.add('nav-open');   // ← 추가

  (focusables()[0] || nav).focus();
  document.addEventListener('keydown', trapFocus);
};

const close = () => {
  nav.classList.remove('is-open');
  if (openBtn) openBtn.hidden = false;
  backdrop.hidden = true;
  document.body.style.overflow = '';

  document.body.classList.remove('nav-open'); // ← 추가

  document.removeEventListener('keydown', trapFocus);
  if (lastFocus && lastFocus.focus) lastFocus.focus();
};


  // 열기 토글(헤더 버튼/기존 버튼 둘 다 지원)
  if (headerBtn) headerBtn.addEventListener('click', () =>
    nav.classList.contains('is-open') ? close() : open()
  );
  if (openBtn) openBtn.addEventListener('click', open);

  // ✅ 닫기: 이벤트 위임으로 언제나 동작
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-close')) { e.preventDefault(); close(); }   // X 버튼
    if (e.target.closest('.nav-backdrop') && !backdrop.hidden) close();    // 백드롭
  });

  // ESC
  addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // 뷰포트 전환 시 닫기
  const mq = matchMedia('(min-width: 992px)');
  const sync = () => { if (mq.matches) close(); };
  mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);

  // ===== (기존) 모바일 아코디언 init 유지 =====
  const initAccordion = () => {
    const isMobile = matchMedia('(max-width: 991px)').matches;
    const root = document.querySelector('.main-nav');
    if (!isMobile || !root) return;
    if (root.dataset.accordion === '1') return;
    root.dataset.accordion = '1';

    const headers = Array.from(root.querySelectorAll('.group-hd'));
    headers.forEach(hd => {
      const panel = document.createElement('div'); panel.className = 'group-panel';
      let sib = hd.nextElementSibling; const moves = [];
      while (sib && !sib.classList.contains('group-hd') && !sib.classList.contains('divider')) {
        if (sib.classList.contains('no-sub')) moves.push(sib);
        sib = sib.nextElementSibling;
      }
      if (!moves.length) return;
      hd.after(panel); moves.forEach(li => panel.appendChild(li));

      hd.setAttribute('role','button'); hd.setAttribute('tabindex','0');

      const setOpen = (o) => {
        hd.setAttribute('aria-expanded', o ? 'true' : 'false');
        panel.style.maxHeight = o ? (panel.scrollHeight + 'px') : '0px';
      };
      setOpen(!!panel.querySelector('a[aria-current="page"]'));

      const toggle = () => setOpen(hd.getAttribute('aria-expanded') !== 'true');
      hd.addEventListener('click', toggle);
      hd.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        if (e.key === 'ArrowRight') setOpen(true);
        if (e.key === 'ArrowLeft')  setOpen(false);
      });

      new ResizeObserver(() => {
        if (hd.getAttribute('aria-expanded') === 'true') panel.style.maxHeight = panel.scrollHeight + 'px';
      }).observe(panel);
    });
  };
  initAccordion();
  const mqMobile = matchMedia('(max-width: 991px)');
  const onMQ = () => { if (mqMobile.matches) initAccordion(); else document.querySelectorAll('.group-panel').forEach(p => p.style.maxHeight='none'); };
  mqMobile.addEventListener ? mqMobile.addEventListener('change', onMQ) : mqMobile.addListener(onMQ);

  // 필요하면 전역에서 접근
  window.Sidebar = { open, close };
})();
