(function() {
  'use strict';

  function updateFooterStats(stats) {
    var container = document.getElementById('umami-footer-stats');
    var pageviews = document.getElementById('umami-site-pv');
    var visitors = document.getElementById('umami-site-uv');

    if (!container || !pageviews || !visitors) {
      return;
    }

    if (!stats || typeof stats.pageviews !== 'number' || typeof stats.visitors !== 'number') {
      return;
    }

    pageviews.textContent = stats.pageviews.toLocaleString('zh-CN');
    visitors.textContent = stats.visitors.toLocaleString('zh-CN');
    container.style.display = 'block';
  }

  fetch('/umami-stats.json', { cache: 'no-store' })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to load Umami stats');
      }
      return response.json();
    })
    .then(updateFooterStats)
    .catch(function(error) {
      console.warn('[umami-footer-stats]', error);
    });
})();
