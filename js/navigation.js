/* Naseej — navigation, app state and shared shell.
   Vanilla port of App.tsx (useState + navigate) and components/Nav.tsx. */
var NASEEJ = window.NASEEJ || {};
window.NASEEJ = NASEEJ;

/* ── App state (was useState in App.tsx) ─────────────────────────────────────
   page: 'home' | 'discover' | 'thread' | 'place' | 'profile'             */
NASEEJ.state = { page: 'home', threadId: null, waypointId: null };

/* Per-page local state (was useState inside each page component).
   Dropped when a page unmounts, kept when only its params change.           */
NASEEJ.ui = {};

NASEEJ.esc = function (s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
};

/* Attribute bundle used to drive navigation from markup (was onClick). */
NASEEJ.N = function (page, threadId, waypointId) {
  return 'data-nav="' + page + '"' +
    (threadId != null ? ' data-thread="' + threadId + '"' : '') +
    (waypointId != null ? ' data-wp="' + waypointId + '"' : '');
};

/* ── Routing (state <-> location.hash so Back / refresh work) ─────────────── */
var PAGES = ['home', 'discover', 'thread', 'place', 'profile'];

function hashFor() {
  var h = '#/' + NASEEJ.state.page;
  if ((NASEEJ.state.page === 'thread' || NASEEJ.state.page === 'place') &&
      NASEEJ.state.threadId != null) {
    h += '/' + NASEEJ.state.threadId;
    if (NASEEJ.state.page === 'place' && NASEEJ.state.waypointId != null) h += '/' + NASEEJ.state.waypointId;
  }
  return h;
}

NASEEJ.navigate = function (page, threadId, waypointId) {
  if (threadId !== undefined) NASEEJ.state.threadId = threadId;
  if (waypointId !== undefined) NASEEJ.state.waypointId = waypointId;
  NASEEJ.state.page = page;
  var h = hashFor();
  if (location.hash === h) {
    /* React: setCurrentPage() with an identical value bails out of the re-render,
       so each page's useState survives. Keep NASEEJ.ui, just scroll and repaint. */
    window.scrollTo(0, 0);
    NASEEJ.paint();
  } else location.hash = h; // hashchange -> route() -> mount()
};

/* Which page is currently mounted. React re-renders one page component when
   only its props change, so thread -> thread and place -> place keep their
   local state; leaving the page unmounts it and clears that state.          */
var mountedPage = null;

function route() {
  var p = location.hash.replace(/^#\/?/, '').split('/');
  if (PAGES.indexOf(p[0]) < 0) p = ['home']; // first visit -> home
  var samePage = mountedPage === p[0];
  NASEEJ.state.page = p[0];
  if (p[1] && !isNaN(+p[1])) NASEEJ.state.threadId = +p[1];
  if (p[2] && !isNaN(+p[2])) NASEEJ.state.waypointId = +p[2];
  mountedPage = p[0];
  NASEEJ.mount(!samePage);
}

window.addEventListener('hashchange', route);

/* ── Nav (components/Nav.tsx) ─────────────────────────────────────────────── */
NASEEJ.navBar = function () {
  var items = [
    ['Home', 'home'],
    ['Discover', 'discover'],
    ['Threads', 'thread'],
    ['Community', 'profile'],
  ];
  return '<nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4"' +
    ' style="background-color:rgba(249,247,243,0.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid #E8E0D0">' +
    '<button ' + NASEEJ.N('home') + ' class="flex items-center gap-3 group">' +
    '<img src="' + ASSETS.logoIcon + '" alt="Naseej emblem" style="width:39px;height:34px;object-fit:contain">' +
    '<img src="' + ASSETS.logoText + '" alt="Naseej" style="width:74px;height:34px;object-fit:contain"></button>' +
    '<div class="flex items-center gap-8">' + items.map(function (i) {
      return '<button ' + NASEEJ.N(i[1]) +
        ' class="text-sm font-medium transition-colors"' +
        ' style="color:' + (NASEEJ.state.page === i[1] ? '#D98A6C' : '#2C2417') + '">' + i[0] + '</button>';
    }).join('') + '</div>' +
    '<div class="flex items-center gap-3">' +
    '<button ' + NASEEJ.N('profile') +
    ' class="text-sm font-medium px-5 py-2 rounded-full transition-all" style="color:#2C2417;border:1px solid #C9BDA8">Sign In</button>' +
    '<button ' + NASEEJ.N('discover') +
    ' class="text-sm font-medium px-5 py-2 rounded-full transition-all" style="background-color:#6B8E23;color:white">Start Naseej</button>' +
    '</div></nav>';
};

/* Small eyebrow label: hairline + uppercase caption (used across pages). */
NASEEJ.eyebrow = function (color, width, text, trailingRule) {
  var rule = '<div class="' + width + ' h-px" style="background-color:' + color + '"></div>';
  return '<div class="inline-flex items-center gap-2 mb-3" style="color:' + color + '">' + rule +
    '<span class="text-xs font-body font-medium tracking-widest uppercase">' + text + '</span>' +
    (trailingRule ? rule : '') + '</div>';
};

/* ── Mount / repaint ──────────────────────────────────────────────────────── */

/* innerHTML destroys the focused node, so React's reconciliation behaviour
   (focus survives a re-render) is restored by re-focusing the equivalent
   control after the swap. Identity = id, else data-* attrs + position. */
var FOCUSABLE = '[data-nav],[data-act]';

function focusKey(el) {
  if (!el || !el.tagName) return '';
  var d = el.dataset || {};
  return [el.tagName, d.nav || '', d.act || '', d.v || '', d.thread || '', d.wp || ''].join('|');
}

NASEEJ.paint = function () {
  if (!NASEEJ.pages) return;
  var host = document.getElementById('app');

  var act = document.activeElement;
  var restore = act && host.contains(act);
  var key = restore ? focusKey(act) : '';
  var byId = restore && act.id ? act.id : '';
  var idx = -1;
  if (restore && !byId) {
    idx = Array.prototype.indexOf.call(host.querySelectorAll(FOCUSABLE), act);
  }

  host.innerHTML = NASEEJ.navBar() + NASEEJ.pages[NASEEJ.state.page]();

  if (restore) {
    var target = null;
    if (byId) {
      target = document.getElementById(byId);
    } else if (idx >= 0) {
      var list = host.querySelectorAll(FOCUSABLE);
      var cand = list[idx];
      if (cand && focusKey(cand) === key) target = cand;
    }
    if (target && target.focus) target.focus();
  }

  /* The library keeps a live <input>, so it patches itself instead of
     re-rendering the whole page (would drop focus while typing). */
  if (NASEEJ.state.page === 'discover') NASEEJ.updateLibrary();
};

NASEEJ.mount = function (fresh) {
  /* `fresh` gates only the page-local state reset. App.tsx's navigate() called
     window.scrollTo(0, 0) unconditionally, so scrolling stays unconditional. */
  if (fresh) {
    NASEEJ.ui = NASEEJ.state.page === 'discover'
      ? { category: 'All', search: '', city: null }
      : {};
  }
  window.scrollTo(0, 0);
  NASEEJ.paint();
};

/* ── Events (was JSX onClick / onChange) ──────────────────────────────────── */
document.addEventListener('click', function (ev) {
  var el = ev.target.closest && ev.target.closest('[data-nav],[data-act]');
  if (!el) return;
  if (el.dataset.nav) {
    NASEEJ.navigate(
      el.dataset.nav,
      el.dataset.thread != null ? +el.dataset.thread : undefined,
      el.dataset.wp != null ? +el.dataset.wp : undefined
    );
    return;
  }
  var v = el.dataset.v;
  var ui = NASEEJ.ui;
  switch (el.dataset.act) {
    case 'node': ui.activeNode = +v; NASEEJ.paint(); break;
    case 'img': ui.activeImage = +v; NASEEJ.paint(); break;
    case 'prev': ui.activeImage = Math.max(0, (ui.activeImage || 0) - 1); NASEEJ.paint(); break;
    case 'next': ui.activeImage = Math.min((ui.galleryLen || 4) - 1, (ui.activeImage || 0) + 1); NASEEJ.paint(); break;
    case 'qr':
      ui.challengeOpen = true;
      ui.qr = [];
      for (var r = 0; r < 7; r++) {
        for (var c = 0; c < 7; c++) {
          ui.qr.push(
            (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3) || Math.random() > 0.45
          );
        }
      }
      NASEEJ.paint();
      break;
    case 'tab': ui.tab = v; NASEEJ.paint(); break;
    case 'cat': ui.category = v; NASEEJ.updateLibrary(); break;
    case 'clear': ui.category = 'All'; NASEEJ.updateLibrary(); break;
    case 'city': ui.city = (v === '' || ui.city === v) ? null : v; NASEEJ.updateLibrary(); break;
  }
});

document.addEventListener('input', function (ev) {
  if (ev.target.id === 'lib-search') {
    NASEEJ.ui.search = ev.target.value;
    NASEEJ.updateLibrary();
  }
});

NASEEJ.route = route;
