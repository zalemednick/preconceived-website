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

The "About" nav link and the "PRECONCEIVED" logo (top-left) both link to `index.html#about-show`, which smooth-scrolls down to the "About the Show" section.

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
- https://www.youtube.com/watch?v=mmXwsjm3zm8

**Hero banner:** `assets/banner.jpg` — dark lightbulb image with "PRECONCEIVED" and "Challenging the Preconceptions in Our Lives" text baked into the image itself.

**Social links:** Instagram and YouTube only (Twitter/X was removed from nav and footer — link no longer worked).

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

## Deployment plan (in progress)
The site currently lives at `~/Desktop/preconceived-website/` and is now a **git repo** (initialized, first commit made on local `main` branch).

**Domain:** preconceivedpodcast.com — registered at GoDaddy, DNS also managed via GoDaddy nameservers (ns53/ns54.domaincontrol.com). Currently points to Webflow (`cdn.webflow.com`).

**Plan:**
1. Push this repo to a new GitHub repository (Zale to create the repo on github.com and share the URL).
2. Connect that GitHub repo to **Netlify** (free tier) for continuous deployment — no build command needed, publish directory is the repo root.
3. Add `preconceivedpodcast.com` as a custom domain in Netlify, then update the DNS records at GoDaddy to point to Netlify (replacing the Webflow records).
4. Set up a **GitHub Actions** scheduled workflow that runs `fetch-episodes.py` periodically, commits `episodes.json` if it changed, and pushes — Netlify auto-redeploys on push, so new Acast episodes appear automatically with no manual steps.
5. Once the new site is live and verified on the domain, cancel/delete the Webflow project.

**Going forward, day-to-day editing workflow:** edits still happen locally with Claude Code (as before). "Publishing" a change = committing and pushing to GitHub — Netlify picks it up and updates the live site automatically (~30 seconds). There's no separate visual editor like Webflow.

## Things still to do
- [ ] Zale creates a GitHub repo and shares the URL so the code can be pushed
- [ ] Connect the repo to Netlify and do the first deploy
- [ ] Point preconceivedpodcast.com (GoDaddy DNS) at Netlify
- [ ] Add GitHub Actions workflow for automatic episode refresh
- [ ] Decommission/delete the Webflow project once the new site is confirmed live

## How to resume with Claude Code
Open Terminal, type `claude`, then paste this file's contents and say:
"I'm rebuilding preconceivedpodcast.com. The project is at ~/Desktop/preconceived-website/. Here's the PROJECT.md for context: [paste this file]"
