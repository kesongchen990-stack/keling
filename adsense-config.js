// ===================================================
// AIToolReview - AdSense Configuration
// Publisher: pub-4048429728677245
// ===================================================

window.__ADSENSE_CONFIG__ = {
  // Your Google AdSense Publisher ID
  publisherId: 'ca-pub-4048429728677245',

  // Ad slot definitions — rename these in AdSense console to match
  slots: {
    // Homepage
    'home-hero-banner':      { id: 'home_hero_banner', format: 'horizontal', width: 728, height: 90, responsive: true },
    'home-content-break':    { id: 'home_content_break', format: 'horizontal', width: 728, height: 90, responsive: true },

    // Article pages
    'article-top':           { id: 'article_top', format: 'horizontal', width: 728, height: 90, responsive: true },
    'article-mid':           { id: 'article_mid', format: 'horizontal', width: 728, height: 90, responsive: true },
    'article-end':           { id: 'article_end', format: 'horizontal', width: 728, height: 90, responsive: true },
    'article-sidebar-1':     { id: 'article_sidebar_1', format: 'vertical',   width: 300, height: 250, responsive: true },
    'article-sidebar-2':     { id: 'article_sidebar_2', format: 'vertical',   width: 300, height: 250, responsive: true },

    // Guide page
    'guide-top':             { id: 'guide_top', format: 'horizontal', width: 728, height: 90, responsive: true },
    'guide-mid':             { id: 'guide_mid', format: 'horizontal', width: 728, height: 90, responsive: true },
    'guide-end':             { id: 'guide_end', format: 'horizontal', width: 728, height: 90, responsive: true },
    'guide-sidebar-1':       { id: 'guide_sidebar_1', format: 'vertical',   width: 300, height: 250, responsive: true },
    'guide-sidebar-2':       { id: 'guide_sidebar_2', format: 'vertical',   width: 300, height: 250, responsive: true },

    // Compare page
    'compare-top':           { id: 'compare_top', format: 'horizontal', width: 728, height: 90, responsive: true },
    'compare-bottom':        { id: 'compare_bottom', format: 'horizontal', width: 728, height: 90, responsive: true },

    // Quiz page
    'quiz-result':           { id: 'quiz_result', format: 'horizontal', width: 728, height: 90, responsive: true },
  }
};

// ===================================================
// AdSense Script Loader — load the real AdSense script
// The script is commented out until you're ready to go live.
// Uncomment the block below when:
//   1. Your site is live on a custom domain
//   2. AdSense has approved your site
// ===================================================
(function() {
  if (document.getElementById('adsense-script')) return;

  // === UNCOMMENT BELOW WHEN GOING LIVE ===
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
// Ad Renderer — renders either real AdSense units or placeholders
// When adsbygoogle.js is loaded (uncommented above), this uses
// proper <ins class="adsbygoogle"> tags for real ads.
// Otherwise it shows placeholder banners for development.
// ===================================================
function renderAd(slotName) {
  const els = document.querySelectorAll(`[data-ad="${slotName}"]`);
  els.forEach(el => {
    const cfg = window.__ADSENSE_CONFIG__.slots[slotName];
    if (!cfg) return;

    // If real AdSense script is loaded, create real ad tag
    if (typeof adsbygoogle !== 'undefined') {
      el.innerHTML = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${window.__ADSENSE_CONFIG__.publisherId}"
             data-ad-slot="${cfg.id}"
             data-ad-format="${cfg.responsive ? 'auto' : cfg.format}"
             ${cfg.responsive ? '' : `data-full-width-responsive="true"`}>
        </ins>`;
      try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
    } else {
      // Placeholder for development
      const w = cfg.responsive ? 'responsive' : `${cfg.width}×${cfg.height}`;
      el.innerHTML = `<span>📢 AdSense (${w}) — ${slotName.replace(/-/g, ' ')}</span>
        <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">
          Publisher: ca-pub-4048429728677245 · Slot: ${cfg.id}
        </div>`;
    }
  });
}

// Auto-render on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-ad]').forEach(el => {
    const slot = el.dataset.ad;
    if (window.__ADSENSE_CONFIG__.slots[slot]) {
      renderAd(slot);
    }
  });
});
