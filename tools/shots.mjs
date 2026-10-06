/* ==========================================================================
   SHOTS  -  takes the project screenshots that the covers show.
   The site itself needs no packages; this tool does. Once:

     npm i --no-save playwright-core sharp        (Google Chrome must be installed)

   Then:

     node tools/shots.mjs                 every project that has a url
     node tools/shots.mjs kornblume       only this one (ids from js/data.js)

   For each project it opens `url` (the German one) at 1440 x 900 and at
   390 x 780 and writes <shot>-d-1440.webp, <shot>-d-720.webp, <shot>-m.webp.
   A project without a url (it only runs on your machine) gets its address
   from LOCAL below.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import sharp from "sharp";

const LOCAL = { monamie: "http://localhost:4321/" };

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const win = {};
vm.runInNewContext(fs.readFileSync(path.join(DIR, "js/data.js"), "utf8"), {
  window: win,
  Intl,
  Date,
});
const only = process.argv.slice(2);
const todo = win.PROJECTS.filter(
  (p) => p.shot && (!only.length || only.includes(p.id)),
);

const VIEWS = [
  ["d", { width: 1440, height: 900 }],
  ["m", { width: 390, height: 780 }],
];
const PHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1";

/* clicks the first button with one of these names that is really on screen
   (a copy of it may sit in a closed menu) */
async function click(page, names) {
  const vp = page.viewportSize();
  for (const re of names)
    for (const b of await page.getByRole("button", { name: re }).all()) {
      const r = await b.boundingBox().catch(() => null);
      if (!r || !r.width || r.x < 0 || r.y < 0 || r.x > vp.width || r.y > vp.height)
        continue;
      if (await b.click({ timeout: 3000 }).then(() => true, () => false)) {
        await page.waitForTimeout(700);
        break;
      }
    }
}

const browser = await chromium.launch({ channel: "chrome" });
for (const p of todo) {
  /* url is a string or [en, de, tr]: the screenshots are the German page */
  const url = (Array.isArray(p.url) ? p.url[1] : p.url) || LOCAL[p.id];
  if (!url) {
    console.log(`  skipped ${p.id}: no url and no entry in LOCAL`);
    continue;
  }
  for (const [m, vp] of VIEWS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height + 120 },
      deviceScaleFactor: 2,
      locale: "de-DE",
      isMobile: m === "m",
      hasTouch: m === "m",
      userAgent: m === "m" ? PHONE : undefined,
    });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(3000);
    /* cookie banners: the most private choice */
    const refuse = [/^nur notwendige$/i, /^alle ablehnen$/i, /^reject all$/i];
    await click(page, refuse);
    /* a page that opens in English: switch it to German */
    if ((await page.evaluate(() => document.documentElement.lang)) !== "de") {
      await click(page, [/^de$|deutsch/i]);
      await page.waitForTimeout(1800);
      await click(page, refuse);
    }
    await page.mouse.move(vp.width / 2, vp.height - 40);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1800);
    /* a "concept project by ..." notice bar above the page stays out of frame */
    const top = await page.evaluate(() => {
      const el = [...document.querySelectorAll("body *")].find((e) => {
        const r = e.getBoundingClientRect();
        return (
          /^(Concept project by|Konzeptprojekt von)/.test(
            (e.textContent || "").trim(),
          ) &&
          r.top < 5 &&
          r.height < 90
        );
      });
      if (!el) return 0;
      let n = el;
      while (
        n.parentElement &&
        n.parentElement !== document.body &&
        n.parentElement.getBoundingClientRect().height < 90
      )
        n = n.parentElement;
      return Math.round(n.getBoundingClientRect().bottom);
    });
    const png = await page.screenshot({
      clip: { x: 0, y: top, width: vp.width, height: vp.height },
    });
    await ctx.close();
    const out = path.join(DIR, p.shot);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    if (m === "d") {
      await sharp(png).resize(1440).webp({ quality: 78 }).toFile(out + "-d-1440.webp");
      await sharp(png).resize(720).webp({ quality: 80 }).toFile(out + "-d-720.webp");
    } else await sharp(png).resize(390).webp({ quality: 80 }).toFile(out + "-m.webp");
  }
  console.log("  shot " + p.id);
}
await browser.close();
