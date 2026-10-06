/* ==========================================================================
   BUILD  -  run "node build.mjs" after changing src/, js/i18n.js or js/data.js.
   No packages to install. It writes the pages a browser (and Google) opens:

     index.html            German, the main language of the site
     en/index.html         English
     tr/index.html         Turkish
     impressum/ datenschutz/ agb/   legal pages, from src/legal/
     404.html  sitemap.xml  robots.txt

   The generated files are committed with the rest, so any static host can
   serve the folder as it is, without running anything.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => fs.readFileSync(path.join(DIR, f), "utf8");
function write(f, s) {
  const p = path.join(DIR, f);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, s);
  console.log("  wrote " + f);
}

/* js/i18n.js and js/data.js are plain browser scripts that fill window.* */
const win = {};
for (const f of ["js/i18n.js", "js/data.js"])
  vm.runInNewContext(read(f), { window: win, Intl, Date });
const { T, PRICING, FOOTER, SITE, FORM, CURRENCY, PROJECTS } = win;

/* the first language is the main one: it lives at "/" and is x-default.
   ix = position of the language in the ['English','Deutsch','Türkçe'] triples */
const LANGS = [
  { code: "de", dir: "", ix: 1, og: "de_DE" },
  { code: "en", dir: "en/", ix: 0, og: "en_US" },
  { code: "tr", dir: "tr/", ix: 2, og: "tr_TR" },
];
const URL0 = String(SITE.url || "").replace(/\/+$/, "");
const urlOf = (l) => URL0 + "/" + l.dir;
const rootOf = (l) => (l.dir ? "../" : "");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s) => esc(s).replace(/"/g, "&quot;");
const pick = (a, l) => (Array.isArray(a) ? a[l.ix] || a[0] : a);
const money = (n, l) =>
  new Intl.NumberFormat(CURRENCY.locale[l.code], {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

/* ---- structured data (schema.org) ---- */
function jsonLd(l) {
  const t = T[l.code];
  const graph = [
    {
      "@type": "Organization",
      "@id": URL0 + "/#org",
      name: SITE.name,
      url: URL0 + "/",
      description: T.de.meta_d,
      image: URL0 + "/og.png",
      email: FOOTER.email,
      areaServed: { "@type": "Country", name: "Germany" },
      knowsLanguage: LANGS.map((x) => x.code),
    },
    {
      "@type": "WebSite",
      "@id": URL0 + "/#website",
      url: URL0 + "/",
      name: SITE.name,
      inLanguage: LANGS.map((x) => x.code),
      publisher: { "@id": URL0 + "/#org" },
    },
    {
      "@type": "WebPage",
      "@id": urlOf(l) + "#page",
      url: urlOf(l),
      name: t.meta_t,
      description: t.meta_d,
      inLanguage: l.code,
      isPartOf: { "@id": URL0 + "/#website" },
      about: { "@id": URL0 + "/#org" },
    },
    {
      "@type": "FAQPage",
      "@id": urlOf(l) + "#faq",
      inLanguage: l.code,
      mainEntity: PRICING.faq.map((f) => ({
        "@type": "Question",
        name: pick(f.q, l),
        acceptedAnswer: {
          "@type": "Answer",
          text: pick(f.a, l).replace(/\{(\w+)\}/g, (m, id) => {
            const p = PRICING.plans.find((x) => x.id === id);
            return p ? money(p.price, l) : m;
          }),
        },
      })),
    },
  ];
  return JSON.stringify(
    { "@context": "https://schema.org", "@graph": graph },
    null,
    2,
  ).replace(/</g, "\\u003c");
}

/* ---- everything search engines and link previews read in <head> ---- */
function headOf(l) {
  const t = T[l.code],
    root = rootOf(l),
    o = [];
  o.push(`<link rel="canonical" href="${urlOf(l)}" />`);
  for (const x of LANGS)
    o.push(`<link rel="alternate" hreflang="${x.code}" href="${urlOf(x)}" />`);
  o.push(
    `<link rel="alternate" hreflang="x-default" href="${urlOf(LANGS[0])}" />`,
    `<link rel="icon" href="${root}favicon.svg" type="image/svg+xml" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${attr(SITE.name)}" />`,
    `<meta property="og:title" content="${attr(t.meta_t)}" />`,
    `<meta property="og:description" content="${attr(t.meta_d)}" />`,
    `<meta property="og:url" content="${urlOf(l)}" />`,
    `<meta property="og:image" content="${URL0}/og.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${l.og}" />`,
  );
  for (const x of LANGS)
    if (x !== l)
      o.push(`<meta property="og:locale:alternate" content="${x.og}" />`);
  o.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">\n${jsonLd(l)}\n    </script>`,
  );
  return o.join("\n    ");
}

/* ---- home page, once per language ---- */
function page(tpl, l) {
  const t = T[l.code];
  let h = tpl;
  /* text of every <x data-i18n="key">...</x> (always plain text) */
  h = h.replace(
    /(<[^>]*\bdata-i18n="(\w+)"[^>]*>)[^<]*/g,
    (m, tag, k) => tag + (t[k] == null ? "" : esc(t[k])),
  );
  /* the hover copy of a label: <span class="roll" data-t="..."><span data-i18n> */
  h = h.replace(
    /data-t="[^"]*"(\s*>\s*<span[^>]*\bdata-i18n="(\w+)")/g,
    (m, rest, k) => `data-t="${attr(t[k])}"${rest}`,
  );
  /* aria-label of every tag that has data-i18n-al="key" */
  h = h.replace(/<[^>]*\bdata-i18n-al="(\w+)"[^>]*>/g, (tag, k) => {
    const n = (tag.match(/\bdata-n="([^"]*)"/) || [])[1] || "";
    return tag.replace(
      /\baria-label="[^"]*"/,
      `aria-label="${attr(t[k].replace("{n}", n))}"`,
    );
  });
  /* the language buttons: mark the language of this page */
  h = h.replace(/<button[^>]*\bdata-set="(\w+)"[^>]*>/g, (tag, c) =>
    tag.replace(/aria-pressed="[^"]*"/, `aria-pressed="${c === l.code}"`),
  );
  /* first word of the rotating headline, so the <h1> is complete without JS */
  h = h.replace(
    '<span class="rot" id="rot"></span>',
    `<span class="rot" id="rot"><span class="on">${esc(t.words[0])}</span></span>`,
  );
  return h
    .replace(/<!-- TEMPLATE[\s\S]*?-->\n/, "<!-- GENERATED by build.mjs from src/index.html. Do not edit. -->\n")
    .replaceAll("{{lang}}", l.code)
    .replaceAll("{{root}}", rootOf(l))
    .replaceAll("{{title}}", esc(t.meta_t))
    .replaceAll("{{desc}}", attr(t.meta_d))
    .replaceAll("{{count}}", String(PROJECTS.length).padStart(2, "0"))
    .replace("{{head}}", headOf(l));
}

/* ---- legal pages: src/legal/<name>.html inside src/legal/_layout.html ----
   The first line of each file is <!-- title: ... | ready: no -->.
   ready: no  = still a placeholder: a note is shown and search engines are
                told not to list the page. Set it to "yes" once the text is real. */
function legal(layout, name) {
  const src = read(`src/legal/${name}.html`),
    m = /^<!--\s*title:\s*(.*?)\s*\|\s*ready:\s*(\w+)\s*-->\n?/.exec(src);
  if (!m) throw new Error(`src/legal/${name}.html: first line must be <!-- title: ... | ready: yes/no -->`);
  const ready = m[2] === "yes";
  return {
    ready,
    html: layout
      .replace("{{content}}", src.slice(m[0].length).trim())
      .replaceAll("{{title}}", esc(m[1]))
      .replaceAll("{{name}}", esc(SITE.name))
      .replaceAll("{{email}}", esc(FOOTER.email))
      .replaceAll("{{year}}", String(new Date().getFullYear()))
      .replaceAll("{{root}}", "../")
      .replace("{{robots}}", ready ? "index, follow" : "noindex, follow")
      .replace("{{canonical}}", `${URL0}/${name}/`)
      .replace(
        "{{note}}",
        ready
          ? ""
          : '<p class="pg-note">Platzhalter: Dieser Text ist noch nicht final und wird vor der Veröffentlichung ersetzt.</p>',
      ),
  };
}

/* ---- projects: the honesty rules of js/data.js, checked on every build ----
   A concept has no client, so it can have no testimonial and no timeline.
   Every screenshot a project names has to be on disk. */
function checkProjects() {
  const bad = [],
    ids = new Set();
  for (const p of PROJECTS) {
    const say = (m) => bad.push(`${p.id || "?"}: ${m}`);
    if (!p.id || ids.has(p.id)) say("id is missing or used twice");
    ids.add(p.id);
    if (p.status !== "live" && p.status !== "concept")
      say('status must be "live" or "concept"');
    if (p.status === "concept" && (p.quote || p.time))
      say("a concept project cannot have a quote or a timeline");
    for (const c of [].concat(p.cat))
      if (!["web", "shop", "app"].includes(c)) say(`unknown cat "${c}"`);
    for (const k of ["client", "summary"])
      if (!Array.isArray(p[k]) || p[k].length !== LANGS.length)
        say(`${k} needs one text per language`);
    if (p.shot)
      for (const f of ["-d-720.webp", "-d-1440.webp", "-m.webp"])
        if (!fs.existsSync(path.join(DIR, p.shot + f)))
          say(`screenshot ${p.shot + f} is missing`);
  }
  if (bad.length) throw new Error("js/data.js PROJECTS\n  " + bad.join("\n  "));
}

/* ---- run ---- */
console.log("Building " + (URL0 || "(no SITE.url)"));
checkProjects();
const tpl = read("src/index.html");
for (const l of LANGS) {
  const out = page(tpl, l),
    left = out.match(/\{\{\w+\}\}/);
  if (left) throw new Error(`unfilled ${left[0]} in ${l.dir}index.html`);
  write(l.dir + "index.html", out);
}

const layout = read("src/legal/_layout.html");
const notReady = [];
for (const name of ["impressum", "datenschutz", "agb"]) {
  const p = legal(layout, name);
  if (!p.ready) notReady.push(name);
  write(name + "/index.html", p.html);
}

write(
  "404.html",
  read("src/404.html")
    .replaceAll("{{name}}", esc(SITE.name))
    .replaceAll("{{home}}", URL0 + "/"),
);

const day = new Date().toISOString().slice(0, 10);
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map(
  (l) => `  <url>
    <loc>${urlOf(l)}</loc>
    <lastmod>${day}</lastmod>
${LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${x.code}" href="${urlOf(x)}" />`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlOf(LANGS[0])}" />
  </url>`,
).join("\n")}
</urlset>
`,
);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${URL0}/sitemap.xml\n`);

/* ---- what is still a placeholder ---- */
const todo = [];
if (/yourdomain/.test(URL0) || !URL0)
  todo.push("SITE.url in js/data.js is still the placeholder domain");
if (/yourdomain/.test(FOOTER.email))
  todo.push("the e-mail address in js/data.js (FOOTER, PRICING) is a placeholder");
if (/^490+$/.test(String(FOOTER.whatsapp)))
  todo.push("FOOTER.whatsapp in js/data.js is a placeholder number");
if (!FORM.key)
  todo.push("FORM.key in js/data.js is empty: the estimator opens the visitor's e-mail app instead of sending");
if (/yourname/i.test(SITE.name))
  todo.push('the studio name is still "yourname" (js/data.js, js/i18n.js, src/)');
if (notReady.length)
  todo.push("legal pages still marked ready: no -> " + notReady.join(", "));
if (!fs.existsSync(path.join(DIR, "og.png")))
  todo.push("og.png is missing (see README: link preview image)");
if (todo.length) {
  console.log("\nBefore going live:");
  for (const x of todo) console.log("  - " + x);
}
