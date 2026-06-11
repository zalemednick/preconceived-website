async function loadEpisodes() {
  const container = document.getElementById('episodes-container');

  try {
    const response = await fetch('episodes.json');
    if (!response.ok) throw new Error('episodes.json not found');
    const episodes = await response.json();

    if (!episodes.length) {
      container.innerHTML = '<p class="loading">No episodes found.</p>';
      return;
    }

    container.innerHTML = episodes.map(ep => {
      const dateStr = ep.pubDate
        ? new Date(ep.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '';

      const plain = stripHtml(ep.description || '');
      const excerpt = plain.length > 180 ? plain.slice(0, 180).trimEnd() + '…' : plain;

      return `
        <div class="episode-card">
          <div class="episode-thumb">
            <img
              src="${esc(ep.image || 'assets/logo.jpeg')}"
              alt="${esc(ep.title)}"
              loading="lazy"
              onerror="this.src='assets/logo.jpeg'"
            >
          </div>
          <div class="episode-info">
            <h3 class="episode-title">${esc(ep.title)}</h3>
            <span class="episode-date">${dateStr}</span>
            <p class="episode-desc">${esc(excerpt)}</p>
            <a href="${esc(ep.link)}" target="_blank" rel="noopener" class="episode-listen-btn">Listen Now →</a>
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p class="loading">Could not load episodes. Please try again later.</p>';
  }
}

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || div.innerText || '').trim();
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadEpisodes();
