/* ===================================================
   AIToolReview - Scripts
   =================================================== */

// Shared state
let articlesCache = [];

// Dark mode toggle
(() => {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  const btn = document.getElementById('themeToggle');
  if (btn) {
    const current = document.documentElement.getAttribute('data-theme');
    btn.textContent = current === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }
})();

// Mobile menu
(() => {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('navLinks');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('open'));
  }
})();

// Helpers
function starStr(rating) {
  if (!rating) return '';
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return '★'.repeat(full) + (half ? '☆' : '');
}

function typeTag(type) {
  const map = {
    review: ['Review', 'review'],
    compare: ['VS', 'compare'],
    guide: ['Guide', 'guide'],
    tool: ['Tool', 'tool']
  };
  return map[type] || ['Post', 'review'];
}

function cardLink(a) {
  if (a.type === 'review') return `article.html?id=${a.id}`;
  if (a.type === 'compare') return `compare.html`;
  if (a.type === 'guide') return `guide.html`;
  return `article.html?id=${a.id}`;
}

function renderCard(a) {
  const tag = typeTag(a.type);
  return `
  <article class="card">
    <span class="card-tag ${tag[1]}">${tag[0]}</span>
    <h3><a href="${cardLink(a)}">${a.title}</a></h3>
    <p>${a.excerpt}</p>
    <div class="card-meta">
      ${a.rating ? `<span class="stars">${starStr(a.rating)}</span><span class="rating-num">${a.rating}</span>` : ''}
      <span>${a.date || ''}</span>
    </div>
  </article>`;
}

// ===================================================
// Fetch & cache articles
// ===================================================
async function fetchArticles() {
  if (articlesCache.length > 0) return articlesCache;
  try {
    const r = await fetch('articles.json');
    articlesCache = await r.json();
    return articlesCache;
  } catch (e) {
    console.warn('articles.json load failed:', e.message);
    return [];
  }
}

// ===================================================
// Homepage card rendering
// ===================================================
async function loadArticles() {
  const articles = await fetchArticles();

  const reviews = articles.filter(a => a.type === 'review').slice(0, 3);
  const compares = articles.filter(a => a.type === 'compare').slice(0, 3);
  const guides = articles.filter(a => ['guide', 'tool'].includes(a.type)).slice(0, 3);

  const reviewEl = document.getElementById('reviewCards');
  const compareEl = document.getElementById('compareCards');
  const guideEl = document.getElementById('guideCards');

  if (reviewEl) reviewEl.innerHTML = reviews.map(renderCard).join('');
  if (compareEl) compareEl.innerHTML = compares.map(renderCard).join('');
  if (guideEl) guideEl.innerHTML = guides.map(renderCard).join('');
}

// ===================================================
// Search (homepage hero)
// ===================================================
async function initSearch() {
  const input = document.getElementById('searchInput');
  const resultsEl = document.getElementById('searchResults');
  if (!input || !resultsEl) return;

  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    const q = input.value.trim();
    if (q.length < 2) { resultsEl.style.display = 'none'; return; }
    debounce = setTimeout(() => doSearch(q, resultsEl), 200);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length >= 2) doSearch(input.value.trim(), resultsEl);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#heroSearch') && !e.target.closest('#searchResults')) {
      resultsEl.style.display = 'none';
    }
  });
}

async function doSearch(q, resultsEl) {
  const articles = await fetchArticles();
  const lower = q.toLowerCase();
  const hits = articles.filter(a =>
    a.title.toLowerCase().includes(lower) ||
    a.excerpt.toLowerCase().includes(lower) ||
    (a.toolName && a.toolName.toLowerCase().includes(lower)) ||
    (a.category && a.category.toLowerCase().includes(lower))
  );

  if (hits.length === 0) {
    resultsEl.style.display = 'block';
    resultsEl.innerHTML = '<div style="padding:16px;color:var(--text-muted);text-align:center;">No matches found. Try a different keyword.</div>';
    return;
  }

  resultsEl.style.display = 'block';
  resultsEl.innerHTML = hits.slice(0, 8).map(a => {
    const tag = typeTag(a.type);
    const link = cardLink(a);
    return `
    <a href="${link}" style="display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--border-light);text-decoration:none;color:var(--text);transition:background 0.15s;">
      <span style="font-size:1.2rem;">${a.toolLogo || '📄'}</span>
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:0.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.title}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">${a.category || ''} · ${a.rating ? '★ ' + a.rating : ''}</div>
      </div>
      <span class="card-tag ${tag[1]}" style="margin:0;flex-shrink:0;">${tag[0]}</span>
    </a>`;
  }).join('');
}

// ===================================================
// Article detail page (article.html?id=xxx)
// ===================================================
async function loadArticleDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  const articles = await fetchArticles();
  const a = articles.find(x => x.id === id);
  if (!a) return;
  renderArticleDetail(a);
}

function renderArticleDetail(a) {
  const h1 = document.getElementById('articleTitle');
  const excerpt = document.getElementById('articleExcerpt');
  const date = document.getElementById('articleDate');
  const readTime = document.getElementById('articleReadTime');
  const tag = document.getElementById('articleTag');

  if (h1) h1.textContent = a.title;
  if (excerpt) excerpt.textContent = a.excerpt;
  if (date) date.textContent = a.date;
  if (readTime) readTime.textContent = a.readTime;
  if (tag) {
    const t = typeTag(a.type);
    tag.className = `card-tag ${t[1]}`;
    tag.textContent = t[0];
  }

  const scoreEl = document.getElementById('scoreCard');
  if (scoreEl && a.scores) {
    scoreEl.innerHTML = `
      <div class="score-item"><div class="score-value">${a.scores.accuracy}</div><div class="score-label">Accuracy</div></div>
      <div class="score-item"><div class="score-value">${a.scores.speed}</div><div class="score-label">Speed</div></div>
      <div class="score-item"><div class="score-value">${a.scores.features}</div><div class="score-label">Features</div></div>
      <div class="score-item score-overall"><div class="score-value">${starStr(a.rating)}</div><div class="score-label">Overall: ${a.rating} / 5</div></div>`;
  } else if (scoreEl) {
    scoreEl.style.display = 'none';
  }

  const prosEl = document.getElementById('prosList');
  const consEl = document.getElementById('consList');
  if (prosEl) prosEl.innerHTML = a.pros.map(p => `<li>${p}</li>`).join('');
  if (consEl) consEl.innerHTML = a.cons.map(c => `<li>${c}</li>`).join('');

  const sectionsEl = document.getElementById('articleSections');
  if (sectionsEl && a.sections.length > 0) {
    sectionsEl.innerHTML = a.sections.map(s =>
      `<section id="${s.id}"><h2>${s.title}</h2>${s.content}</section>`
    ).join('');
  }

  const tocEl = document.getElementById('tableOfContents');
  if (tocEl && a.sections.length > 0) {
    tocEl.innerHTML = a.sections.map(s => `<a href="#${s.id}">${s.title}</a>`).join('');
  }

  const affEl = document.getElementById('affiliateLinks');
  if (affEl && a.affiliateLinks.length > 0) {
    affEl.innerHTML = a.affiliateLinks.map(al =>
      `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border-light);">
        <div><strong>${al.label}</strong><br><small style="color:var(--text-muted)">${al.desc}</small></div>
        <a href="${al.url}" target="_blank" rel="nofollow sponsored" style="background:var(--accent);color:#fff;padding:6px 14px;border-radius:6px;font-weight:600;font-size:0.85rem;">Visit Site →</a>
      </div>`
    ).join('');
  }

  const relEl = document.getElementById('relatedPosts');
  if (relEl) loadRelatedPosts(a.id, relEl);
}

async function loadRelatedPosts(currentId, container) {
  const articles = await fetchArticles();
  const related = articles.filter(a => a.id !== currentId).slice(0, 4);
  container.innerHTML = related.map(a => `
    <div class="related-post">
      <div>
        <a href="${cardLink(a)}">${a.title}</a>
        <span class="date">${a.date}</span>
      </div>
    </div>
  `).join('');
}

// ===================================================
// Comparison table (compare.html)
// ===================================================
(() => {
  const selects = document.querySelectorAll('.tool-select');
  if (selects.length === 0) return;

  const tools = {
    'chatgpt': { name: 'ChatGPT', price: '$20/mo', rating: '4.5', free: true, api: true, mobile: true, image: true, integrations: '3000+' },
    'claude': { name: 'Claude', price: '$20/mo', rating: '4.6', free: true, api: true, mobile: true, image: true, integrations: '500+' },
    'gemini': { name: 'Google Gemini', price: '$19.99/mo', rating: '4.3', free: true, api: true, mobile: true, image: true, integrations: 'Google Workspace' },
    'perplexity': { name: 'Perplexity AI', price: '$20/mo', rating: '4.4', free: true, api: true, mobile: true, image: false, integrations: 'Limited' },
    'jasper': { name: 'Jasper AI', price: '$49/mo', rating: '4.2', free: false, api: true, mobile: false, image: true, integrations: '500+' },
    'copyai': { name: 'Copy.ai', price: '$49/mo', rating: '4.1', free: true, api: true, mobile: false, image: false, integrations: '200+' },
    'writesonic': { name: 'Writesonic', price: '$20/mo', rating: '4.0', free: true, api: true, mobile: false, image: true, integrations: '100+' },
    'notionai': { name: 'Notion AI', price: '$10/mo', rating: '4.3', free: false, api: false, mobile: true, image: false, integrations: 'Notion native' },
  };

  const rows = {
    'price': (t) => t.price,
    'rating': (t) => `<span style="color:#f59e0b;font-weight:700">★ ${t.rating}/5</span>`,
    'free': (t) => t.free ? '<span class="check">✓</span>' : '<span class="cross">✗</span>',
    'api': (t) => t.api ? '<span class="check">✓</span>' : '<span class="cross">✗</span>',
    'mobile': (t) => t.mobile ? '<span class="check">✓</span>' : '<span class="cross">✗</span>',
    'image': (t) => t.image ? '<span class="check">✓</span>' : '<span class="cross">✗</span>',
    'integrations': (t) => t.integrations,
  };

  function updateCompare() {
    const values = Array.from(selects).map(s => s.value);
    const tbody = document.getElementById('compareBody');
    if (!tbody) return;
    const selected = values.map(v => tools[v] || null);
    const headRow = document.getElementById('compareHead');
    headRow.innerHTML = '<th>Feature</th>' + selected.map(t => t ? `<th>${t.name}</th>` : '<th>Select a tool</th>').join('');
    tbody.innerHTML = Object.entries(rows).map(([feature, fn]) =>
      `<tr><td><strong>${feature.charAt(0).toUpperCase() + feature.slice(1)}</strong></td>` +
      selected.map(t => `<td>${t ? fn(t) : '—'}</td>`).join('') + '</tr>'
    ).join('');
  }

  selects.forEach(s => s.addEventListener('change', updateCompare));
  updateCompare();
})();

// ===================================================
// Init
// ===================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    loadArticleDetail();
    initSearch();
  });
} else {
  loadArticles();
  loadArticleDetail();
  initSearch();
}
