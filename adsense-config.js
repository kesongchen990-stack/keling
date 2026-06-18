// ===================================================
// AIToolReview - AdSense Configuration
// Replace these IDs with your actual AdSense IDs
// ===================================================

window.__ADSENSE_CONFIG__ = {
  // Your Google AdSense Publisher ID
  publisherId: 'ca-pub-XXXXXXXXXXXXXXXX', // ← REPLACE THIS

  // Ad slot definitions
  slots: {
    // Homepage
    'home-hero-banner':      { id: '1234567890', format: 'horizontal', width: 728, height: 90, responsive: true },
    'home-content-break':    { id: '1234567891', format: 'horizontal', width: 728, height: 90, responsive: true },

    // Article pages
    'article-top':           { id: '1234567892', format: 'horizontal', width: 728, height: 90, responsive: true },
    'article-mid':           { id: '1234567893', format: 'horizontal', width: 728, height: 90, responsive: true },
    'article-end':           { id: '1234567894', format: 'horizontal', width: 728, height: 90, responsive: true },
    'article-sidebar-1':     { id: '1234567895', format: 'vertical',   width: 300, height: 250, responsive: true },
    'article-sidebar-2':     { id: '1234567896', format: 'vertical',   width: 300, height: 250, responsive: true },

    // Guide page
    'guide-top':             { id: '1234567897', format: 'horizontal', width: 728, height: 90, responsive: true },
    'guide-mid':             { id: '1234567898', format: 'horizontal', width: 728, height: 90, responsive: true },
    'guide-end':             { id: '1234567899', format: 'horizontal', width: 728, height: 90, responsive: true },
    'guide-sidebar-1':       { id: '1234567890', format: 'vertical',   width: 300, height: 250, responsive: true },
    'guide-sidebar-2':       { id: '1234567891', format: 'vertical',   width: 300, height: 250, responsive: true },

    // Compare page
    'compare-top':           { id: '1234567892', format: 'horizontal', width: 728, height: 90, responsive: true },
    'compare-bottom':        { id: '1234567893', format: 'horizontal', width: 728, height: 90, responsive: true },

    // Quiz page
    'quiz-result':           { id: '1234567894', format: 'horizontal', width: 728, height: 90, responsive: true },
  }
};

// ===================================================
// Ad Loader — call this to insert an ad unit
// ===================================================
(function() {
  // Check if ads are loaded (will be replaced by real AdSense script)
  if (document.getElementById('adsense-script')) return;

  // When you're ready to go live, uncomment the block below
  // and remove the placeholder renderer.

  /*
  const script = document.createElement('script');
  script.id = 'adsense-script';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${window.__ADSENSE_CONFIG__.publisherId}`;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  */
})();

// ===================================================
// Placeholder renderer — renders placeholder banners.
// Remove this entire block when going live with real AdSense.
// ===================================================
function renderAd(slotName) {
  const els = document.querySelectorAll(`[data-ad="${slotName}"]`);
  els.forEach(el => {
    const cfg = window.__ADSENSE_CONFIG__.slots[slotName];
    if (!cfg) return;
    const w = cfg.responsive ? 'responsive' : `${cfg.width}×${cfg.height}`;
    el.innerHTML = `<span>📢 AdSense (${w}) — ${slotName.replace(/-/g, ' ')}</span>`;
  });
}

// Auto-render all data-ad elements on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-ad]').forEach(el => {
    const slot = el.dataset.ad;
    if (window.__ADSENSE_CONFIG__.slots[slot]) {
      renderAd(slot);
    }
  });
});
