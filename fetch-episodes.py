#!/usr/bin/env python3
"""Run this script to refresh episodes.json from the RSS feed."""

import json
import urllib.request
import xml.etree.ElementTree as ET

FEED_URL = 'https://feeds.acast.com/public/shows/preconceived'
OUTPUT = 'episodes.json'
ITUNES_NS = 'http://www.itunes.com/dtds/podcast-1.0.dtd'

print(f'Fetching {FEED_URL}...')
req = urllib.request.Request(FEED_URL, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as r:
    data = r.read()

root = ET.fromstring(data)
channel = root.find('channel')

channel_image = ''
img = channel.find('image')
if img is not None:
    url_el = img.find('url')
    if url_el is not None:
        channel_image = url_el.text or ''

episodes = []
items = channel.findall('item')
total = len(items)

for i, item in enumerate(items):
    def get(tag):
        el = item.find(tag)
        return (el.text or '').strip() if el is not None else ''

    def get_itunes(tag):
        el = item.find(f'{{{ITUNES_NS}}}{tag}')
        if el is None:
            return ''
        return el.get('href') or (el.text or '').strip()

    title = get('title')
    pub_date = get('pubDate')
    description = get('description')
    link = get('link')
    enclosure = item.find('enclosure')
    audio_url = enclosure.get('url', '') if enclosure is not None else ''
    image = item.find(f'{{{ITUNES_NS}}}image')
    ep_image = image.get('href', '') if image is not None else channel_image

    episodes.append({
        'epNum': total - i,
        'title': title,
        'pubDate': pub_date,
        'description': description,
        'link': link or audio_url,
        'image': ep_image or channel_image,
    })

with open(OUTPUT, 'w', encoding='utf-8') as f:
    json.dump(episodes, f, ensure_ascii=False, indent=2)

print(f'Done — {len(episodes)} episodes saved to {OUTPUT}')
