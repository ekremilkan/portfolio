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
- The projects in `js/data.js` are invented examples.
- Legal pages: put the real text in `src/legal/` and change `ready: no` to
  `ready: yes` in the first line of each file. Until then they show a
  placeholder note and are hidden from search engines.

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
