// ===================================================
// AIToolReview - Affiliate Link Manager
// ===================================================

window.__AFFILIATE__ = {
  // Global disclosure — shown on every page footer
  disclosure: 'We may earn a commission if you click links and make a purchase, at no extra cost to you.',

  // Affiliate programs
  programs: {
    claude:       { name: 'Claude',            url: 'https://claude.ai',           tag: '', desc: 'Starts at $20/mo' },
    chatgpt:      { name: 'ChatGPT',           url: 'https://chatgpt.com',         tag: '', desc: 'Starts at $20/mo' },
    midjourney:   { name: 'Midjourney V7',     url: 'https://midjourney.com',      tag: '', desc: 'Starts at $10/mo' },
    jasper:       { name: 'Jasper AI',         url: 'https://jasper.ai',           tag: '', desc: 'Free trial, then $49/mo' },
    copilot:      { name: 'GitHub Copilot',    url: 'https://github.com/features/copilot', tag: '', desc: 'Free trial, then $10/mo' },
    elevenlabs:   { name: 'ElevenLabs',        url: 'https://elevenlabs.io',       tag: '', desc: 'Free tier, Pro $5/mo' },
    cursor:       { name: 'Cursor',            url: 'https://cursor.sh',           tag: '', desc: 'Free tier, Pro $20/mo' },
    perplexity:   { name: 'Perplexity AI',     url: 'https://perplexity.ai',       tag: '', desc: 'Free tier, Pro $20/mo' },
    runway:       { name: 'Runway ML',         url: 'https://runwayml.com',        tag: '', desc: 'Free tier, Pro $15/mo' },
    writesonic:   { name: 'Writesonic',        url: 'https://writesonic.com',      tag: '', desc: 'Free tier, $20/mo' },
    notionai:     { name: 'Notion AI',         url: 'https://notion.so',           tag: '', desc: 'AI add-on $10/mo' },
    grammarly:    { name: 'Grammarly',         url: 'https://grammarly.com',       tag: '', desc: 'Free tier, Premium $12/mo' },
    synthesia:    { name: 'Synthesia',         url: 'https://synthesia.io',        tag: '', desc: 'Starts at $22/mo' },
    heygen:       { name: 'HeyGen',            url: 'https://heygen.com',          tag: '', desc: 'Free tier, $24/mo' },
    descript:     { name: 'Descript',          url: 'https://descript.com',        tag: '', desc: 'Free tier, Pro $24/mo' },
    stable:       { name: 'Stable Diffusion',  url: 'https://stability.ai',        tag: '', desc: 'Free / Open Source' },
    gemini:       { name: 'Google Gemini',     url: 'https://gemini.google.com',   tag: '', desc: 'Starts at $19.99/mo' },
    copyai:       { name: 'Copy.ai',           url: 'https://copy.ai',             tag: '', desc: 'Free tier, $49/mo' },
  },

  // Build an affiliate link with optional tracking
  buildLink: function(programKey, options) {
    const p = this.programs[programKey];
    if (!p) return '#';
    let url = p.url;
    if (options && options.ref) url += (url.includes('?') ? '&' : '?') + 'ref=' + options.ref;
    if (options && options.coupon) url += (url.includes('?') ? '&' : '?') + 'coupon=' + options.coupon;
    return url;
  },

  // Render a CTA button for affiliate links
  renderCTA: function(programKey, containerEl) {
    const p = this.programs[programKey];
    if (!p || !containerEl) return;
    const url = this.buildLink(programKey);
    containerEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border-light);">
        <div><strong>${p.name}</strong><br><small style="color:var(--text-muted)">${p.desc}</small></div>
        <a href="${url}" target="_blank" rel="nofollow sponsored" style="background:var(--accent);color:#fff;padding:6px 16px;border-radius:6px;font-weight:600;font-size:0.85rem;text-decoration:none;">Try ${p.name} →</a>
      </div>`;
  },

  // Render disclosure text
  renderDisclosure: function(containerEl) {
    if (!containerEl) return;
    containerEl.innerHTML = `<em style="font-size:0.8rem;color:var(--text-muted);">Disclosure: ${this.disclosure}</em>`;
  }
};
