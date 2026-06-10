# Preconceived Podcast Website — Project Summary

## What this is
A static 4-page website for the Preconceived podcast, built with plain HTML, CSS, and JavaScript. No build tools or server required for editing — open `index.html` in a browser, or run the local server for episodes to load.

## File structure
```
preconceived-website/
  index.html            ← About page
  episodes.html         ← Episodes feed (loads from episodes.json)
  book.html             ← Book page with reviews
  blog.html             ← Blog index (cards linking to blog/*.html)
  youtube.html          ← YouTube Channel page with video thumbnails
  styles.css            ← All styles for all pages
  scripts/
    episodes.js         ← Reads episodes.json and renders episode cards
  assets/
    logo.jpeg           ← Podcast cover art (square, dark navy + yellow)
    zale-photo.png      ← Host headshot
    breakfast-tv.png    ← Screenshot from Breakfast Television interview
  blog/                  ← Individual article pages (12 selected from old site)
    get-to-know-someone-questions.html
    the-irony-of-fiction.html
    a-word-of-non-advice.html
    the-beauty-and-danger-of-moments.html
    unorthodox.html
    circumcision.html
    capitalist-economy.html
    my-first-year-as-a-podcaster.html
    pickup-artists-with-mystery.html
    love-drugs.html
    drugs-versus-medication.html
    how-to-challenge-a-world-preconceived.html
  episodes.json         ← All 360 episodes generated from RSS feed
  fetch-episodes.py     ← Run this to refresh episodes.json from RSS
```

## Navigation (all pages)
About | Episodes | Book | Blog | YouTube Channel

## Blog
Re-creates a subset (12 of 19) of the articles from the old preconceivedpodcast.com/blog. Each article in `blog/` is a standalone page (uses `../` paths back to root assets/styles/nav) with a featured image (sourced from the original Webflow CDN, same images as the old post pages), a navy header bar with title + "Back to Blog" link, and the full article text in `.article-container`. `blog.html` lists all 12 as cards (`.blog-grid` / `.blog-card`) with a thumbnail, title, short excerpt, and "Read More" link.

Articles intentionally NOT carried over (from the original ~19): the rest were skipped per Zale's selection.

## Key details

**RSS feed:** https://feeds.acast.com/public/shows/preconceived
**YouTube channel:** https://www.youtube.com/@preconceivedpodcast
**Instagram:** https://www.instagram.com/preconceived_podcast

**Book:** Preconceived: Challenging the Preconceptions in Our Lives
**Book link:** https://www.amazon.ca/Preconceived-Challenging-preconceptions-our-lives-ebook/dp/B0BDVJ8KV5

**Award images** (hosted on old Webflow CDN):
- 2021 Quill Award (Best Society & Culture): https://cdn.prod.website-files.com/5e4ffae0e2da800ad6d635c1/60d7c02730047bd063da63fb_Preconceived%20-%20Best%20Society%20and%20Culture%20Podcast%20-%20Winner-01.png
- 2022 Quill Award (Most Innovative): https://cdn.prod.website-files.com/5e4ffae0e2da800ad6d635c1/62c609c9ac01b06d7ac91094_2022%20Winners%20-%20Most%20Innovative%20-%20Preconceived-01.png
- Book cover image: https://cdn.prod.website-files.com/5e4ffae0e2da800ad6d635c1/633b46ac1ef25b6fc8498233_FdS6piraUAE0z0C.jpeg

**YouTube videos featured (youtube.html):**
- https://www.youtube.com/watch?v=Xk_IX0wf5m0 (Breakfast Television — uses local assets/breakfast-tv.png)
- https://www.youtube.com/watch?v=4PEGHh4L93U
- https://www.youtube.com/watch?v=wBPVsZjrQI8
- https://www.youtube.com/watch?v=HxoZMpxuDlA
- https://www.youtube.com/watch?v=4RS9YQmCJnY

## Color palette
- Navy: `#1a1e45`
- Yellow: `#f5c200`
- White: `#ffffff`

## How to run locally
Open a terminal and run:
```
cd ~/Desktop/preconceived-website && python3 -m http.server 8000
```
Then open: http://localhost:8000

Keep this terminal open while working. The episodes page requires the server to load episodes.json.

## How to refresh episodes
When a new episode is released, run:
```
cd ~/Desktop/preconceived-website && python3 fetch-episodes.py
```

## Things still to do
- [ ] Deploy to a hosting provider (e.g. Netlify, GitHub Pages) to replace preconceivedpodcast.com
- [ ] When deploying: set up automatic episode refresh so new Acast episodes appear on the site without manually running fetch-episodes.py (scheduled job via Netlify/Vercel or GitHub Actions)

## How to resume with Claude Code
Open Terminal, type `claude`, then paste this file's contents and say:
"I'm rebuilding preconceivedpodcast.com. The project is at ~/Desktop/preconceived-website/. Here's the PROJECT.md for context: [paste this file]"
