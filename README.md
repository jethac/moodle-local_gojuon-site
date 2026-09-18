# Gojūon website

The public website for [Gojūon participants index](https://github.com/jethac/moodle-local_gojuon), a Moodle plugin for Japanese phonetic-name navigation.

**Live:** https://moodle-gojuon.jethachan.net/

## Development

Requires Node.js 24+. No application dependencies or installation step.

```sh
npm run dev
npm test
npm run build
```

The preview runs at http://127.0.0.1:4173. The build copies `public/` to `dist/` after validating linked assets. Only `dist/` is published.

## Deployment

Pushes to `main` run the filter tests, build the site, and deploy to the Cloudflare Pages project `moodle-local-gojuon-site`. GitHub Actions requires repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Credentials are never stored in source.

## Content

- `public/index.html`: landing page, installation instructions, metadata.
- `public/styles.css`: responsive presentation.
- `public/demo.js`: fictional roster and accessible demo controls.
- `public/filter.js`: leading-character classification and two-axis filtering.
- `public/assets/`: approved logo and actual plugin screenshots.
- `public/og.png`: social sharing artwork.

The interactive roster is a simplified, browser-only illustration, not a live Moodle instance. It does not collect or store participant data. Kana buckets follow the plugin's `classes/kana.php`; maintain both together if the plugin's behavior changes.

The layout follows the introduction → problem → hands-on demo pattern of [tokyuland-demo](https://tokyuland-demo.jethachan.net/), adapted to Gojūon's identity.

GPL-3.0-or-later. See `LICENSE`.
