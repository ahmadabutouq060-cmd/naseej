/* Naseej — bootstrap.
   First visit with no hash lands on the landing page. */
(function () {
  'use strict';

  function boot() {
    NASEEJ.route();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
