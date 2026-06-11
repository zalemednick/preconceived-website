async function loadFeaturedEpisodes() {
  const container = document.getElementById('featured-episodes');

  try {
    const response = await fetch('episodes.json');
    if (!response.ok) throw new Error('episodes.json not found');
    const episodes = await response.json();

    if (!episodes.length) {
      container.innerHTML = '<p class="loading">No episodes found.</p>';
      return;
    }

    container.innerHTML = episodes.slice(0, 3).map(ep => {
      const dateStr = ep.pubDate
        ? new Date(ep.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '';

      return `
        <a href="${esc(ep.link)}" target="_blank" rel="noopener" class="featured-card">
          <div class="featured-card-body">
            <h3>${esc(ep.title)}</h3>
            <span class="episode-date">${dateStr}</span>
            <span class="featured-card-link">Listen Now →</span>
          </div>
        </a>
      `;
    }).join('');

  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p class="loading">Could not load episodes. Please try again later.</p>';
  }
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadFeaturedEpisodes();
