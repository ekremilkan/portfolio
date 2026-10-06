# Studio website

A static site: no server, no packages. German is the main language (`/`),
English (`/en/`) and Turkish (`/tr/`) are extra pages.

## Where to change things

| What                                               | File                    |
| -------------------------------------------------- | ----------------------- |
| Projects, prices, FAQ, estimator, footer, contact  | `js/data.js`            |
| Every other text, in all three languages           | `js/i18n.js`            |
| Page structure                                     | `src/index.html`        |
| Impressum, Datenschutz, AGB                        | `src/legal/*.html`      |
| Styles                                             | `css/style.css`         |

After any change in `src/`, `js/i18n.js` or `js/data.js`, run:

```
node build.mjs
```

It rewrites `index.html`, `en/`, `tr/`, the legal pages, `404.html`,
`sitemap.xml` and `robots.txt`. **Never edit those by hand**, they are
overwritten. Commit them with the rest: the host serves the folder as it is.

To look at the site locally: `python3 -m http.server` and open
`http://localhost:8000`.

## Before going live

`node build.mjs` prints what is still a placeholder. The list:

- `SITE.url` in `js/data.js`: the real domain (canonical links, sitemap and
  link previews all use it).
- `FORM.key` in `js/data.js`: a free access key from https://web3forms.com.
  Without it the estimator opens the visitor's e-mail app instead of sending
  the request to your inbox.
- E-mail address, phone and WhatsApp number in `js/data.js`.
- The studio name (`yourname` / `YN`) in `js/data.js`, `js/i18n.js`, `src/`
  and `favicon.svg`.
- Legal pages: put the real text in `src/legal/` and change `ready: no` to
  `ready: yes` in the first line of each file. Until then they show a
  placeholder note and are hidden from search engines.

## Projects

Every project in `js/data.js` has a `status`:

- `live`: a real client project. It may show a client, a timeline, results
  and a quote, but only ones that are real. Leave out what you do not have,
  the section then simply does not appear.
- `concept`: our own work for a fictional brand. The page says so, shows the
  design idea instead of a testimonial and links to the demo. `node build.mjs`
  stops if a concept has a quote or a timeline.

Numbers under "The result" are measured (Lighthouse) or counted in the demo
itself. Never put a business result there that nobody measured.

The covers are real screenshots in `img/work/`: `<id>-d-1440.webp` and
`<id>-d-720.webp` (desktop, 1440 x 900) and `<id>-m.webp` (phone, 390 x 780).
The browser and phone frames around them are drawn in CSS.

To take them again after a demo changed or a project was added:

```
npm i --no-save playwright-core sharp     # once; the site itself needs no packages
node tools/shots.mjs                      # all projects, or: node tools/shots.mjs kornblume
```

## Link preview image

`og.png` is the picture shown when the site is shared. Its source is
`src/og.html`. To render it again after a change (macOS, Chrome installed):

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --hide-scrollbars --window-size=1200,630 \
  --screenshot="$PWD/og.png" "file://$PWD/src/og.html"
```

## Links you can share

- `…/#work/<project id>` opens that case study.
- `…/#estimate` opens the price estimator.
