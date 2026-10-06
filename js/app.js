(function () {
  var T = window.T,
    LNAME = window.LNAME;

  /* ---- money ----
     Every price on the page is in EUR and goes through formatMoney(), which
     formats it for the page language ("199 €" in German, "€199" in English).
     The number locale per language comes from window.CURRENCY. */
  var CUR = window.CURRENCY || { locale: {} },
    NF = {};
  function locOf(lang) {
    return (CUR.locale && CUR.locale[lang]) || "en-US";
  }
  function formatMoney(eur, lang) {
    lang = lang || curLang || "en";
    if (!NF[lang]) {
      var o = {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        currencyDisplay: "narrowSymbol",
      };
      try {
        NF[lang] = new Intl.NumberFormat(locOf(lang), o);
      } catch (e) {
        delete o.currencyDisplay;
        NF[lang] = new Intl.NumberFormat(locOf(lang), o);
      }
    }
    return NF[lang].format(eur);
  }
  function num(n, d) {
    return new Intl.NumberFormat(locOf(curLang || "en"), {
      minimumFractionDigits: d || 0,
      maximumFractionDigits: d || 0,
    }).format(n);
  }
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var wrap = document.getElementById("navWrap"),
    burger = document.getElementById("burger"),
    menu = document.getElementById("menu"),
    main = document.getElementById("top");

  /* ---- scroll: pill morph, progress, scroll-spy ---- */
  var ids = ["work", "services", "why", "pricing", "contact"],
    lastId = "__";
  function onScroll() {
    var y = window.scrollY,
      max = document.documentElement.scrollHeight - window.innerHeight;
    wrap.classList.toggle("scrolled", y > 40);
    wrap.style.setProperty("--p", max > 0 ? Math.min(1, y / max) : 0);
    var pos = y + window.innerHeight * 0.4,
      id = null;
    ids.forEach(function (i) {
      var el = document.getElementById(i);
      if (el && el.offsetTop <= pos) id = i;
    });
    if (id !== lastId) {
      lastId = id;
      document.querySelectorAll(".links a, .menu li a").forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + id);
      });
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- mobile menu ---- */
  function toggle(open) {
    if (open && typeof langOpen === "function") langOpen(false);
    if (open) {
      var r = burger.getBoundingClientRect();
      menu.style.setProperty("--bx", r.left + r.width / 2 + "px");
      menu.style.setProperty("--by", r.top + r.height / 2 + "px");
    }
    burger.setAttribute("aria-expanded", open);
    menu.classList.toggle("open", open);
    wrap.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    menu.inert = !open;
    main.inert = open;
  }
  burger.addEventListener("click", function () {
    toggle(burger.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) toggle(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      toggle(false);
      burger.focus();
    }
  });
  window
    .matchMedia("(min-width:981px)")
    .addEventListener("change", function (e) {
      if (e.matches) toggle(false);
    });

  /* ---- CTA: cursor-origin fill + magnetic pull ---- */
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  document.querySelectorAll(".cta").forEach(function (b) {
    b.addEventListener("pointerenter", function (e) {
      var r = b.getBoundingClientRect();
      b.style.setProperty("--x", e.clientX - r.left + "px");
      b.style.setProperty("--y", e.clientY - r.top + "px");
    });
    b.addEventListener("pointerleave", function (e) {
      var r = b.getBoundingClientRect();
      b.style.setProperty("--x", e.clientX - r.left + "px");
      b.style.setProperty("--y", e.clientY - r.top + "px");
      b.style.transform = "";
    });
    if (fine && !reduce && b.hasAttribute("data-magnet")) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform =
          "translate(" +
          (e.clientX - r.left - r.width / 2) * 0.16 +
          "px," +
          (e.clientY - r.top - r.height / 2) * 0.3 +
          "px)";
      });
    }
  });

  /* ---- language ----
     LANGUAGES: DE / EN / TR, one page per language: "/" is German, "/en/" and
     "/tr/" are the other two (written by build.mjs from src/index.html). The
     page language is the <html lang> of the page that was opened; the switcher
     is a link to the same place on another page. ROOT is the path back to the
     site root ("" on the German page, "../" on the others). */
  function put(el, txt) {
    el.textContent = txt;
    var p = el.parentElement;
    if (p && p.dataset && p.hasAttribute("data-t")) p.dataset.t = txt;
  }
  var I18N = window.I18N || { langs: ["de", "en", "tr"], lang: "de" },
    ROOT = document.documentElement.getAttribute("data-root") || "";
  function langUrl(l) {
    return l === "de" ? ROOT || "./" : ROOT + l + "/";
  }
  function goLang(l) {
    location.href = langUrl(l) + location.hash;
  }
  /* phones: some elements (data-i18n-m) use a shorter text, e.g. the bar CTA */
  var MOB = window.matchMedia("(max-width:980px)");
  function i18nKey(el) {
    return (MOB.matches && el.dataset.i18nM) || el.dataset.i18n;
  }
  MOB.addEventListener("change", function () {
    document.querySelectorAll("[data-i18n-m]").forEach(function (el) {
      put(el, T[curLang][i18nKey(el)]);
    });
  });
  var LANG_BTNS = ".lang button, .lang-pop button",
    langMB = document.getElementById("langMB"),
    langPop = document.getElementById("langPop");
  function setLang(l) {
    if (!T[l]) l = "de";
    curLang = l;
    var d = document.documentElement,
      md = document.querySelector('meta[name="description"]');
    d.lang = l;
    document.title = T[l].meta_t;
    if (md) md.setAttribute("content", T[l].meta_d);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      put(el, T[l][i18nKey(el)]);
    });
    document.querySelectorAll("[data-i18n-al]").forEach(function (el) {
      el.setAttribute(
        "aria-label",
        T[l][el.dataset.i18nAl].replace("{n}", el.dataset.n || ""),
      );
    });
    document.querySelectorAll(LANG_BTNS).forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.set === l);
    });
    if (langMB) {
      document.getElementById("langMT").textContent = l.toLocaleUpperCase(l);
      langMB.setAttribute("aria-label", T[l].lang_g + ": " + LNAME[l]);
    }
    onLang();
  }
  document.querySelectorAll(LANG_BTNS).forEach(function (b) {
    b.addEventListener("click", function () {
      var inPop = langPop && langPop.contains(b);
      if (inPop) langOpen(false, true);
      if (b.dataset.set !== curLang) goLang(b.dataset.set);
    });
  });
  /* mobile language picker: opens under the button, closes on a choice,
     on Escape, on a tap outside and when the full-screen menu opens */
  function langOpen(open, refocus) {
    if (!langPop) return;
    langPop.hidden = !open;
    langMB.setAttribute("aria-expanded", open);
    if (open) {
      var on = langPop.querySelector('[aria-pressed="true"]');
      if (on) on.focus();
    } else if (refocus) langMB.focus();
  }
  if (langMB) {
    langMB.addEventListener("click", function () {
      langOpen(langPop.hidden);
    });
    document.addEventListener("pointerdown", function (e) {
      if (!langPop.hidden && !e.target.closest(".lang-m")) langOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !langPop.hidden) langOpen(false, true);
    });
    langPop.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      var bs = [].slice.call(langPop.querySelectorAll("button")),
        k = bs.indexOf(document.activeElement);
      bs[(k + (e.key === "ArrowDown" ? 1 : bs.length - 1)) % bs.length].focus();
    });
    MOB.addEventListener("change", function (e) {
      if (!e.matches) langOpen(false);
    });
  }
  setLang(I18N.lang);

  /* ================= v3 JS ================= */
  var curLang;

  /* liquid pill */
  var links = document.getElementById("links"),
    pill = document.createElement("li");
  pill.className = "pill";
  pill.setAttribute("aria-hidden", "true");
  links.prepend(pill);
  var linkEls = [].slice.call(links.querySelectorAll("a"));
  function pillTo(a) {
    linkEls.forEach(function (x) {
      x.classList.toggle("hov", x === a);
    });
    if (!a) {
      pill.style.opacity = 0;
      return;
    }
    var first = pill.style.opacity !== "1";
    if (first) pill.style.transition = "none";
    pill.style.width = a.offsetWidth + "px";
    pill.style.transform = "translateX(" + a.offsetLeft + "px)";
    if (first) {
      pill.offsetWidth;
      pill.style.transition = "";
    }
    pill.style.opacity = 1;
  }

  /* hover pill for the nav links */
  var nav = document.querySelector(".nav");
  linkEls.forEach(function (a) {
    a.addEventListener("mouseenter", function () {
      pillTo(a);
    });
    a.addEventListener("focus", function () {
      pillTo(a);
    });
  });
  links.addEventListener("mouseleave", function () {
    pillTo(null);
  });
  links.addEventListener("focusout", function (e) {
    if (!links.contains(e.relatedTarget)) pillTo(null);
  });

  /* command palette */
  var cmd = document.getElementById("cmd"),
    cin = document.getElementById("cmdIn"),
    clist = document.getElementById("cmdList"),
    items = [],
    sel = 0,
    lastFocus = null;
  document.getElementById("kbdKey").textContent = /Mac|iPhone|iPad/.test(
    navigator.platform || navigator.userAgent,
  )
    ? "⌘"
    : "Ctrl";
  function jump(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  function commands() {
    var t = T[curLang || "en"];
    var c = ids.map(function (id) {
      return {
        label: t.go + " " + t[id],
        hint: "#" + id,
        run: function () {
          jump(id);
        },
      };
    });
    c.push({
      label: t.cta,
      hint: "#pricing",
      run: function () {
        jump("pricing");
      },
    });
    c.push({
      label: t.cmd_es,
      hint: "€",
      run: function () {
        if (typeof eOpen === "function") eOpen();
      },
    });
    c.push({
      label: t.wa_t,
      hint: "WA",
      run: function () {
        window.open(waHref(), "_blank", "noopener");
      },
    });
    I18N.langs.forEach(function (o) {
      if (o === curLang) return;
      c.push({
        label: t.sw.replace("{l}", LNAME[o]),
        hint: o.toLocaleUpperCase(curLang),
        run: function () {
          goLang(o);
        },
      });
    });
    return c;
  }
  function low(s) {
    /* Turkish-aware: "İletişim" -> "iletişim", "I" -> "ı" */
    try {
      return s.toLocaleLowerCase(curLang);
    } catch (e) {
      return s.toLowerCase();
    }
  }
  function render(q) {
    q = low(q || "").trim();
    items = commands().filter(function (c) {
      return (
        !q ||
        low(c.label).indexOf(q) > -1 ||
        low(c.hint).indexOf(q) > -1
      );
    });
    sel = 0;
    clist.innerHTML = "";
    if (!items.length) {
      var e = document.createElement("li");
      e.className = "cmd-empty";
      e.textContent = T[curLang || "en"].none;
      clist.appendChild(e);
      return;
    }
    items.forEach(function (c, i) {
      var li = document.createElement("li"),
        s = document.createElement("span"),
        h = document.createElement("small");
      li.setAttribute("role", "option");
      li.id = "cmd" + i;
      li.setAttribute("aria-selected", i === 0);
      s.textContent = c.label;
      h.textContent = c.hint;
      li.appendChild(s);
      li.appendChild(h);
      li.addEventListener("mousemove", function () {
        if (sel !== i) choose(i);
      });
      li.addEventListener("click", function () {
        run(i);
      });
      clist.appendChild(li);
    });
    cin.setAttribute("aria-activedescendant", "cmd0");
  }
  function choose(i) {
    sel = i;
    [].forEach.call(clist.children, function (li, k) {
      li.setAttribute("aria-selected", k === i);
    });
    cin.setAttribute("aria-activedescendant", "cmd" + i);
  }
  function run(i) {
    var c = items[i];
    if (!c) return;
    cmdToggle(false);
    setTimeout(c.run, 60);
  }
  function cmdToggle(open) {
    if (open && menu.classList.contains("open")) toggle(false);
    if (open) {
      lastFocus = document.activeElement;
      cin.value = "";
      render("");
    }
    cmd.classList.toggle("open", open);
    cmd.inert = !open;
    cmd.setAttribute("aria-hidden", !open);
    main.inert = open;
    document.body.classList.toggle("menu-open", open);
    if (open) cin.focus();
    else if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      cmdToggle(!cmd.classList.contains("open"));
      return;
    }
    if (!cmd.classList.contains("open")) return;
    if (e.key === "Escape") cmdToggle(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (items.length) choose((sel + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (items.length) choose((sel - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(sel);
    }
  });
  cin.addEventListener("input", function () {
    render(cin.value);
  });
  cmd.addEventListener("mousedown", function (e) {
    if (e.target === cmd) cmdToggle(false);
  });
  document.getElementById("kbd").addEventListener("click", function () {
    cmdToggle(true);
  });

  function onLang() {
    if (window.__wkReady) {
      if (typeof workLang === "function") workLang();
      if (typeof wyLang === "function") wyLang();
      if (typeof pkLang === "function") pkLang();
      if (typeof esLang === "function") esLang();
      if (typeof ftLang === "function") ftLang();
    }
    if (typeof fitSoon === "function") {
      fitSoon(30);
      setTimeout(fitHeads, 750);
    }
    if (!cin) return;
    if (typeof buildRot === "function" && rot) buildRot();
    cin.placeholder = T[curLang].ph;
    if (cmd.classList.contains("open")) render(cin.value);
  }

  /* ================= v5 HERO JS ================= */
  var hero = document.getElementById("hero"),
    rot = document.getElementById("rot"),
    stage = document.getElementById("stage"),
    tilt = document.getElementById("tilt"),
    deck = document.getElementById("deck"),
    cards = [].slice.call(deck.children),
    dots = [].slice.call(document.querySelectorAll("#dots button")),
    v1 = document.getElementById("viz1"),
    pre = document.getElementById("pre"),
    ri = 0,
    ci = 0,
    N = cards.length,
    revealed = false,
    preDone = false;

  /* rolling last word */
  function buildRot() {
    var w = T[curLang || "en"].words;
    ri = 0;
    rot.innerHTML = "";
    w.forEach(function (x, i) {
      var sp = document.createElement("span");
      sp.textContent = x;
      if (i === 0) sp.className = "on";
      rot.appendChild(sp);
    });
  }
  function nextWord() {
    var sp = rot.children;
    if (sp.length < 2) return;
    var old = rot.querySelector(".on");
    ri = (ri + 1) % sp.length;
    if (old) {
      old.classList.remove("on");
      old.classList.add("off");
      setTimeout(function () {
        old.style.transition = "none";
        old.classList.remove("off");
        old.offsetWidth;
        old.style.transition = "";
      }, 950);
    }
    sp[ri].classList.add("on");
  }
  if (!reduce) setInterval(nextWord, 2700);

  /* card deck */
  var timers = [];
  function later(fn, ms) {
    timers.push(setTimeout(fn, ms));
  }
  function director() {
    timers.forEach(clearTimeout);
    timers = [];
    v1.classList.add("nt");
    ["s1", "s2", "s3", "s4", "s5", "s6", "click"].forEach(function (c) {
      v1.classList.remove(c);
    });
    v1.offsetWidth;
    v1.classList.remove("nt");
    if (reduce) {
      ["s1", "s2", "s3", "s4", "s5", "s6"].forEach(function (c) {
        v1.classList.add(c);
      });
      return;
    }
    [250, 700, 1150, 1700, 2300].forEach(function (ms, i) {
      later(function () {
        v1.classList.add("s" + (i + 1));
      }, ms);
    });
    later(function () {
      v1.classList.add("click");
    }, 3600);
    later(function () {
      v1.classList.remove("click");
      v1.classList.add("s6");
    }, 3800);
  }
  function countTo(v) {
    var el = document.getElementById("cnt");
    el.textContent = reduce ? v : 0;
    if (reduce) return;
    var t0 = performance.now();
    requestAnimationFrame(function s(now) {
      var p = (now - t0 - 300) / 1500;
      if (p >= 1) {
        el.textContent = v;
        return;
      }
      el.textContent = p < 0 ? 0 : Math.round(v * (1 - Math.pow(1 - p, 3)));
      requestAnimationFrame(s);
    });
  }
  function layout() {
    cards.forEach(function (c, i) {
      var o = (i - ci + N) % N;
      c.style.setProperty("--o", o);
      c.setAttribute("aria-hidden", o !== 0);
      c.inert = o !== 0;
    });
  }
  function activate(i) {
    ci = ((i % N) + N) % N;
    layout();
    cards[ci].classList.add("on");
    cards.forEach(function (c) {
      if (c !== cards[ci] && c.classList.contains("on")) {
        setTimeout(function () {
          if (c !== cards[ci]) c.classList.remove("on");
        }, 1050);
      }
    });
    dots.forEach(function (d, k) {
      d.classList.remove("act");
      d.classList.toggle("done", k < ci);
    });
    dots[0].offsetWidth;
    dots[ci].classList.add("act");
    if (ci === 0) director();
    if (ci === 2) countTo(100);
  }
  layout();
  document
    .getElementById("dots")
    .addEventListener("animationend", function (e) {
      if (e.animationName === "prog") activate(ci + 1);
    });
  dots.forEach(function (d, k) {
    d.addEventListener("click", function () {
      activate(k);
    });
  });
  var drag = null;
  deck.addEventListener("pointerdown", function (e) {
    drag = { x: e.clientX };
  });
  window.addEventListener("pointerup", function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    drag = null;
    if (Math.abs(dx) > 50) activate(ci + (dx < 0 ? 1 : -1));
    else if (Math.abs(dx) < 6 && e.target.closest && e.target.closest("#deck"))
      activate(ci + 1);
  });

  /* reveal + preloader */
  function reveal() {
    if (revealed) return;
    revealed = true;
    hero.classList.add("ready");
    document.body.classList.add("go");
    setTimeout(
      function () {
        activate(0);
      },
      reduce ? 0 : 1100,
    );
  }
  function finishPre() {
    if (preDone || !pre) return;
    preDone = true;
    pre.classList.add("out");
    reveal();
    setTimeout(function () {
      pre.remove();
      document.documentElement.classList.remove("pre-on");
      try {
        sessionStorage.setItem("pre", "1");
      } catch (e) {}
    }, 1150);
  }
  if (pre && !reduce) {
    var preNum = document.getElementById("preNum"),
      pbar = pre.querySelector(".pre-bar i"),
      pt0 = performance.now(),
      fontsOk = false;
    Promise.race([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise(function (r) {
        setTimeout(r, 2500);
      }),
    ]).then(function () {
      fontsOk = true;
    });
    requestAnimationFrame(function step(now) {
      var p = Math.max(0, Math.min(1, (now - pt0) / 1300)),
        e = 1 - Math.pow(1 - p, 3);
      preNum.textContent = Math.round(e * 100);
      pbar.style.transform = "scaleX(" + e + ")";
      if (p < 1 || !fontsOk) requestAnimationFrame(step);
      else finishPre();
    });
    setTimeout(finishPre, 5200);
  } else {
    if (pre) pre.remove();
    document.documentElement.classList.remove("pre-on");
    reveal();
  }
  setTimeout(reveal, 5600);

  /* spotlight, lime comet trail and 3D tilt */
  var cv = document.getElementById("trail"),
    cx = cv.getContext("2d"),
    pts = [],
    dpr = Math.min(2, window.devicePixelRatio || 1);
  function sizeCv() {
    cv.width = hero.clientWidth * dpr;
    cv.height = hero.clientHeight * dpr;
  }
  sizeCv();
  window.addEventListener("resize", sizeCv);
  function drawTrail() {
    cx.clearRect(0, 0, cv.width, cv.height);
    var n = pts.length;
    if (n < 2) return;
    cx.lineCap = "round";
    for (var i = 1; i < n; i++) {
      var k = i / n;
      cx.strokeStyle = "rgba(182,255,60," + (k * k * 0.55).toFixed(3) + ")";
      cx.lineWidth = (1 + k * 11) * dpr;
      cx.beginPath();
      cx.moveTo(pts[i - 1].x * dpr, pts[i - 1].y * dpr);
      cx.lineTo(pts[i].x * dpr, pts[i].y * dpr);
      cx.stroke();
    }
    var p = pts[n - 1],
      g = cx.createRadialGradient(
        p.x * dpr,
        p.y * dpr,
        0,
        p.x * dpr,
        p.y * dpr,
        26 * dpr,
      );
    g.addColorStop(0, "rgba(182,255,60,.9)");
    g.addColorStop(1, "rgba(182,255,60,0)");
    cx.fillStyle = g;
    cx.beginPath();
    cx.arc(p.x * dpr, p.y * dpr, 26 * dpr, 0, 7);
    cx.fill();
  }
  var ptT = { x: innerWidth * 0.6, y: innerHeight * 0.4, rx: 0, ry: 0 },
    ptC = { x: ptT.x, y: ptT.y, rx: 0, ry: 0 },
    lastMove = 0,
    vis = true,
    raf = 0;
  hero.addEventListener("pointermove", function (e) {
    var r = hero.getBoundingClientRect();
    ptT.x = e.clientX - r.left;
    ptT.y = e.clientY - r.top;
    lastMove = performance.now();
    if (e.pointerType === "mouse") {
      var sr = stage.getBoundingClientRect();
      ptT.ry = Math.max(
        -14,
        Math.min(
          14,
          ((e.clientX - (sr.left + sr.width / 2)) / innerWidth) * 30,
        ),
      );
      ptT.rx = Math.max(
        -10,
        Math.min(
          10,
          (-(e.clientY - (sr.top + sr.height / 2)) / innerHeight) * 22,
        ),
      );
    }
  });
  hero.addEventListener("pointerleave", function () {
    lastMove = 0;
    ptT.rx = 0;
    ptT.ry = 0;
  });
  function frame(t) {
    if (!vis) {
      raf = 0;
      return;
    }
    if (!lastMove || t - lastMove > 2500) {
      var w = hero.clientWidth,
        h = hero.clientHeight;
      ptT.x = w * (0.5 + 0.3 * Math.cos(t / 2700));
      ptT.y = h * (0.42 + 0.26 * Math.sin(t / 3400));
    }
    ptC.x += (ptT.x - ptC.x) * 0.07;
    ptC.y += (ptT.y - ptC.y) * 0.07;
    ptC.rx += (ptT.rx - ptC.rx) * 0.08;
    ptC.ry += (ptT.ry - ptC.ry) * 0.08;
    hero.style.setProperty("--mx", ptC.x.toFixed(1) + "px");
    hero.style.setProperty("--my", ptC.y.toFixed(1) + "px");
    tilt.style.setProperty("--rx", ptC.rx.toFixed(2));
    tilt.style.setProperty("--ry", ptC.ry.toFixed(2));
    pts.push({ x: ptC.x, y: ptC.y });
    if (pts.length > 34) pts.shift();
    drawTrail();
    raf = requestAnimationFrame(frame);
  }
  if (!reduce) {
    new IntersectionObserver(
      function (en) {
        vis = en[0].isIntersecting;
        if (vis && !raf) raf = requestAnimationFrame(frame);
      },
      { threshold: 0 },
    ).observe(hero);
    raf = requestAnimationFrame(frame);
    var tick = false;
    window.addEventListener(
      "scroll",
      function () {
        if (tick) return;
        tick = true;
        requestAnimationFrame(function () {
          hero.style.setProperty(
            "--sy",
            Math.min(window.scrollY, innerHeight * 1.2),
          );
          tick = false;
        });
      },
      { passive: true },
    );
  }

  /* CTA click burst */
  var mainCta = document.querySelector(".btn-p");
  mainCta.addEventListener("click", function (e) {
    if (reduce) return;
    var r = mainCta.getBoundingClientRect(),
      x = e.clientX || r.left + r.width / 2,
      y = e.clientY || r.top + r.height / 2;
    for (var i = 0; i < 18; i++) {
      var d = document.createElement("i");
      d.className = "burst";
      d.style.left = x + "px";
      d.style.top = y + "px";
      document.body.appendChild(d);
      var a = (Math.PI * 2 * i) / 18 + Math.random() * 0.35,
        dist = 70 + Math.random() * 90;
      var an = d.animate(
        [
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
          {
            transform:
              "translate(calc(-50% + " +
              Math.cos(a) * dist +
              "px),calc(-50% + " +
              Math.sin(a) * dist +
              "px)) scale(0)",
            opacity: 0,
          },
        ],
        {
          duration: 650 + Math.random() * 350,
          easing: "cubic-bezier(.2,.8,.2,1)",
        },
      );
      (function (el) {
        an.onfinish = function () {
          el.remove();
        };
      })(d);
    }
  });

  /* ================= v6 WHAT WE DO JS ================= */
  var VIZ = {
    web: { t: [300, 800, 1300, 1900, 2500, 3100, 3800], total: 8200 },
    shop: { t: [300, 1300, 2400, 3200, 4500, 5200, 5700], total: 8800 },
    app: { t: [300, 800, 1400, 2200, 3300, 4000], total: 8000 },
  };
  function vizStop(el) {
    (el._t || []).forEach(clearTimeout);
    el._t = [];
  }
  function vizSet(el, n) {
    el.style.setProperty("--step", n);
    if (n) el.setAttribute("data-st", n);
    else el.removeAttribute("data-st");
  }
  function vizRun(el) {
    vizStop(el);
    var cfg = VIZ[el.dataset.viz];
    (function cycle() {
      el.classList.add("nt");
      vizSet(el, 0);
      el.offsetWidth;
      el.classList.remove("nt");
      if (reduce) {
        vizSet(el, el.dataset.viz === "shop" ? 4 : cfg.t.length);
        return;
      }
      cfg.t.forEach(function (ms, i) {
        el._t.push(
          setTimeout(function () {
            vizSet(el, i + 1);
          }, ms),
        );
      });
      el._t.push(setTimeout(cycle, cfg.total));
    })();
  }
  var ioViz = new IntersectionObserver(
    function (en) {
      en.forEach(function (e) {
        var sv = e.target.closest(".svc");
        if (e.isIntersecting) {
          vizRun(e.target);
          if (sv) sv.classList.add("live");
        } else {
          vizStop(e.target);
          if (sv) sv.classList.remove("live");
        }
      });
    },
    { threshold: 0.4 },
  );
  [].forEach.call(document.querySelectorAll(".vwrap"), function (v) {
    ioViz.observe(v);
  });

  var ioIn = new IntersectionObserver(
    function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          ioIn.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  [].forEach.call(
    document.querySelectorAll(".svc-head,.svc,.promise,.flow,.svc-end"),
    function (n) {
      ioIn.observe(n);
    },
  );

  var ioStep = new IntersectionObserver(
    function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("hit");
          ioStep.unobserve(e.target);
        }
      });
    },
    { threshold: 0.7 },
  );
  [].forEach.call(document.querySelectorAll(".fstep"), function (n, i) {
    n.style.transitionDelay = i * 0.05 + "s";
    ioStep.observe(n);
  });

  /* ================= shareable URLs =================
     "#work/<project id>" opens that case study and "#estimate" opens the
     estimator, so both can be linked to. Opening adds one history entry: the
     browser's back button closes it again. */
  var routing = false;
  function routePush(h, replace) {
    if (routing || location.hash === h) return;
    try {
      if (replace) history.replaceState(history.state, "", h);
      else history.pushState({ ov: 1 }, "", h);
    } catch (e) {}
  }
  function routeClear() {
    if (routing || !/^#(work\/|estimate$)/.test(location.hash)) return;
    if (history.state && history.state.ov) history.back();
    else
      try {
        history.replaceState(null, "", location.pathname + location.search);
      } catch (e) {}
  }
  function routeApply() {
    var m = /^#work\/(.+)$/.exec(location.hash),
      i = -1;
    if (m)
      PJ.forEach(function (p, k) {
        if (p.id === m[1]) i = k;
      });
    routing = true;
    if (i < 0) closeCase();
    else if (!cs.classList.contains("open")) openCase(i);
    else if (WK.open !== i) fillCase(i);
    if (location.hash === "#estimate") eOpen();
    else eClose();
    routing = false;
  }
  window.addEventListener("popstate", routeApply);

  /* ================= v7 WORK JS ================= */
  var PJ = window.PROJECTS || [],
    PAGE = 9,
    WK = { f: "all", n: PAGE, open: -1, from: null };
  var wkGrid = document.getElementById("wkGrid"),
    wkF = document.getElementById("wkF"),
    wkN = document.getElementById("wkN"),
    wkMore = document.getElementById("wkMore"),
    cs = document.getElementById("cs"),
    csBody = document.getElementById("csBody"),
    csCover = document.getElementById("csCover"),
    csScroll = document.getElementById("csScroll"),
    csIdx = document.getElementById("csIdx"),
    wkCur = document.getElementById("wkCur"),
    headerEl = document.getElementById("navWrap");
  function TT(k) {
    return (T[curLang] || T.en)[k];
  }
  /* data texts are ['English','Deutsch','Türkçe']; a missing or empty
     translation falls back to English */
  var LIX = { en: 0, de: 1, tr: 2 };
  function L(a) {
    if (!Array.isArray(a)) return a;
    var v = a[LIX[curLang] || 0];
    return v == null || v === "" ? a[0] : v;
  }
  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  function esc(t) {
    return String(t)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function catName(k) {
    return k === "all"
      ? TT("wk_all")
      : k === "web"
        ? TT("sv1")
        : k === "shop"
          ? TT("sv2")
          : TT("wk_app");
  }
  /* cat is 'web' or ['web','app']: a project can sit in more than one filter */
  function catsOf(p) {
    return Array.isArray(p.cat) ? p.cat : [p.cat];
  }
  function catLabel(p) {
    return catsOf(p).map(catName).join(" · ");
  }
  /* status: 'live' = real client project, anything else = concept */
  function isLive(p) {
    return p.status === "live";
  }
  function stName(p, long) {
    return TT((isLive(p) ? "st_live" : "st_con") + (long ? "_l" : ""));
  }

  /* every word of a title is one block: a line breaks between words first,
     and inside a long word (at its soft hyphen) only when it has to */
  function titleHTML(t) {
    return t
      .split(" ")
      .map(function (w) {
        return '<span class="tw">' + esc(w) + "</span>";
      })
      .join(" ");
  }

  /* --- generated cover art --- */
  function S(x, y, w, h, bg, r, ex) {
    return (
      '<i class="as" style="left:' +
      x +
      "%;top:" +
      y +
      "%;width:" +
      w +
      "%;height:" +
      h +
      "%;background:" +
      bg +
      ";border-radius:" +
      (r == null ? 3 : r) +
      "px" +
      (ex ? ";" + ex : "") +
      '"></i>'
    );
  }
  function D(x, y, d, bg, ex) {
    return (
      '<i class="ad" style="left:' +
      x +
      "%;top:" +
      y +
      "%;width:" +
      d +
      "%;background:" +
      bg +
      (ex ? ";" + ex : "") +
      '"></i>'
    );
  }
  function WIN(x, y, w, h, dark, inner, rot) {
    return (
      '<div class="aw" style="left:' +
      x +
      "%;top:" +
      y +
      "%;width:" +
      w +
      "%;height:" +
      h +
      "%;background:" +
      (dark ? "#101319" : "#F7F5EF") +
      ";rotate:" +
      (rot || 0) +
      'deg"><span class="ab"></span>' +
      inner +
      "</div>"
    );
  }
  var G = "linear-gradient(135deg,var(--c1),var(--c2))";
  var ART = {
    site: function () {
      return (
        WIN(
          9,
          13,
          66,
          86,
          0,
          S(6, 16, 6, 5, "var(--a)", 4) +
            S(15, 17.5, 9, 2, "#0002", 2) +
            S(27, 17.5, 9, 2, "#0002", 2) +
            S(6, 31, 50, 8, "#14171c", 4) +
            S(6, 42, 36, 8, "var(--a)", 4) +
            S(6, 56, 42, 2.6, "#0003", 2) +
            S(6, 61, 34, 2.6, "#0003", 2) +
            S(6, 71, 16, 7, "#14171c", 99) +
            S(62, 29, 32, 44, G, 8) +
            S(6, 84, 28, 12, "#0000000f", 6) +
            S(37, 84, 28, 12, "#0000000f", 6) +
            S(68, 84, 26, 12, "#0000000f", 6),
          -2,
        ) +
        WIN(
          70,
          28,
          22,
          68,
          1,
          S(10, 14, 80, 34, G, 6) +
            S(10, 54, 70, 4, "#fff3", 2) +
            S(10, 62, 50, 4, "#fff2", 2) +
            S(10, 74, 80, 10, "var(--a)", 99),
          3,
        )
      );
    },
    shop: function () {
      var i,
        h =
          S(5, 14, 10, 4, "#14171c", 3) +
          S(88, 12, 7, 7, "var(--a)", 99) +
          S(5, 24, 90, 22, "linear-gradient(120deg,var(--c1),var(--c2))", 8) +
          S(9, 30, 34, 5, "#fff", 3) +
          S(9, 38, 22, 3, "#fff9", 2);
      var g = [
        "linear-gradient(160deg,var(--c2),var(--c1))",
        "linear-gradient(160deg,var(--a),var(--c2))",
        "linear-gradient(160deg,var(--c1),var(--a))",
        "linear-gradient(160deg,var(--c2),var(--a))",
      ];
      for (i = 0; i < 4; i++)
        h +=
          S(5 + i * 23.5, 52, 21, 26, g[i], 6) +
          S(5 + i * 23.5, 81, 14, 2.6, "#0004", 2) +
          S(5 + i * 23.5, 86, 9, 2.6, "var(--a)", 2);
      return (
        WIN(8, 12, 74, 86, 0, h, 0) +
        WIN(
          66,
          52,
          26,
          42,
          1,
          S(10, 14, 60, 5, "#fff4", 2) +
            S(10, 26, 80, 20, "#ffffff12", 6) +
            S(10, 52, 80, 20, "#ffffff12", 6) +
            S(10, 80, 80, 12, "var(--a)", 99),
          4,
        )
      );
    },
    dash: function () {
      var i,
        h =
          S(0, 8, 9, 92, "#ffffff08", 0) +
          S(2.5, 14, 4, 5, "var(--a)", 2) +
          S(14, 14, 40, 5, "#ffffff10", 99);
      for (i = 1; i < 5; i++) h += S(2.5, 14 + i * 9, 4, 5, "#ffffff22", 2);
      for (i = 0; i < 3; i++)
        h +=
          S(14 + i * 29, 24, 27, 15, "#ffffff0d", 6) +
          S(16 + i * 29, 28, 10, 2.4, "#fff4", 2) +
          S(16 + i * 29, 33, 16, 4, "var(--a)", 2);
      h += S(14, 44, 58, 50, "#ffffff08", 8);
      var hs = [30, 45, 38, 60, 52, 70, 64, 82, 74];
      for (i = 0; i < 9; i++)
        h += S(
          17 + i * 6,
          92 - hs[i] * 0.5,
          4,
          hs[i] * 0.5,
          i % 3 === 2 ? "var(--a)" : "#ffffff26",
          2,
        );
      h += S(75, 44, 21, 50, "#ffffff08", 8);
      for (i = 0; i < 4; i++)
        h +=
          D(77, 48 + i * 11, 4, "#ffffff2a") +
          S(83, 49 + i * 11, 10, 2.4, "#fff4", 2);
      return WIN(7, 12, 86, 86, 1, h, 0);
    },
    cal: function () {
      var i,
        j,
        h = S(6, 14, 30, 5, "#14171c", 3) + S(70, 14, 24, 5, "var(--a)", 99);
      for (j = 0; j < 7; j++) h += S(6 + j * 12.6, 26, 9, 2, "#0003", 2);
      for (i = 0; i < 5; i++)
        for (j = 0; j < 7; j++)
          h += S(
            6 + j * 12.6,
            32 + i * 11.5,
            9.6,
            8,
            i === 2 && j === 3 ? "var(--a)" : "#0000000d",
            4,
          );
      return (
        WIN(7, 12, 70, 86, 0, h, 0) +
        WIN(
          58,
          44,
          36,
          48,
          0,
          S(10, 12, 50, 6, "#14171c", 3) +
            S(10, 26, 70, 4, "#0003", 2) +
            S(10, 36, 54, 4, "#0003", 2) +
            S(10, 52, 80, 14, "#0000000d", 6) +
            S(10, 76, 80, 14, "var(--a)", 99),
          3,
        )
      );
    },
    map: function () {
      var svg =
        '<svg class="mp" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice"><path d="M0 40C20 30 30 50 55 38S85 20 100 26M10 0C14 20 30 24 34 60M60 0C56 22 70 36 78 60M0 12C30 18 60 6 100 14"/><path class="rt" d="M14 46C28 38 36 30 52 30S76 22 88 16"/></svg>';
      return WIN(
        7,
        12,
        86,
        86,
        1,
        svg +
          D(
            14,
            60,
            5,
            "var(--a)",
            "box-shadow:0 0 0 6px rgba(255,255,255,.12)",
          ) +
          D(46, 44, 4, "#fff", "box-shadow:0 0 0 6px rgba(255,255,255,.12)") +
          D(
            84,
            24,
            5,
            "var(--a)",
            "box-shadow:0 0 0 6px rgba(255,255,255,.12)",
          ) +
          S(64, 52, 30, 40, "#101319ee", 8) +
          S(68, 58, 16, 3, "#fff5", 2) +
          S(68, 66, 22, 3, "#fff3", 2) +
          S(68, 73, 18, 3, "#fff3", 2) +
          S(68, 82, 22, 7, "var(--a)", 99),
        0,
      );
    },
  };
  /* real screenshots in a browser and a phone frame. p.shot is the file
     stem: <stem>-d-720.webp, <stem>-d-1440.webp (desktop) and <stem>-m.webp */
  function shotHTML(p, big) {
    var s = ROOT + p.shot,
      lazy = big ? "" : ' loading="lazy"';
    return (
      '<div class="aw sw sw-d' +
      (p.dark ? " dk" : "") +
      '"><span class="ab"></span><img src="' +
      esc(s) +
      '-d-720.webp" srcset="' +
      esc(s) +
      "-d-720.webp 720w, " +
      esc(s) +
      '-d-1440.webp 1440w" sizes="' +
      (big ? "(min-width:1000px) 800px, 80vw" : "(min-width:640px) 420px, 70vw") +
      '" width="1440" height="900" alt=""' +
      lazy +
      ' decoding="async"></div><div class="aw sw sw-m"><img src="' +
      esc(s) +
      '-m.webp" width="390" height="780" alt=""' +
      lazy +
      ' decoding="async"></div>'
    );
  }
  function artHTML(p, big) {
    return p.shot
      ? '<div class="art" role="img" aria-label="' +
          esc(TT("al_shot").replace("{n}", p.title)) +
          '"><div class="af shot">' +
          shotHTML(p, big) +
          "</div></div>"
      : '<div class="art"><div class="af">' +
          (ART[p.art] || ART.site)() +
          "</div></div>";
  }
  function cvars(p) {
    return "--c1:" + p.c1 + ";--c2:" + p.c2 + ";--a:" + p.a;
  }

  /* --- filters --- */
  function catList() {
    var out = [{ k: "all", n: PJ.length }];
    ["web", "shop", "app"].forEach(function (k) {
      var n = PJ.filter(function (p) {
        return catsOf(p).indexOf(k) > -1;
      }).length;
      if (n) out.push({ k: k, n: n });
    });
    return out;
  }
  function movePill(instant) {
    var pill = wkF.querySelector(".wk-pill"),
      on = wkF.querySelector('[aria-pressed="true"]');
    if (!pill || !on) return;
    if (instant) pill.style.transition = "none";
    pill.style.width = on.offsetWidth + "px";
    pill.style.transform = "translateX(" + on.offsetLeft + "px)";
    if (instant) {
      pill.offsetWidth;
      pill.style.transition = "";
    }
    if (on.scrollIntoView && wkF.scrollWidth > wkF.clientWidth)
      wkF.scrollTo({ left: on.offsetLeft - 20, behavior: "smooth" });
  }
  function renderFilters(instant) {
    wkF.innerHTML = '<span class="wk-pill"></span>';
    catList().forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.f = c.k;
      b.setAttribute("aria-pressed", c.k === WK.f);
      b.innerHTML = esc(catName(c.k)) + "<sup>" + c.n + "</sup>";
      b.addEventListener("click", function () {
        if (WK.f === c.k) return;
        WK.f = c.k;
        WK.n = PAGE;
        [].forEach.call(wkF.querySelectorAll("button"), function (x) {
          x.setAttribute("aria-pressed", x === b);
        });
        movePill();
        applyFilter(true);
        if (typeof showReset === "function") showReset();
      });
      wkF.appendChild(b);
    });
    movePill(instant);
  }

  /* --- cards --- */
  function cardText(c, p) {
    var res = c.querySelector(".wk-res");
    c.querySelector(".wk-cat").textContent = catLabel(p);
    c.querySelector(".wk-st").textContent = stName(p);
    res.hidden = !p.fact;
    res.querySelector("span").textContent = L(p.fact) || "";
    c.querySelector(".wk-cl").textContent = L(p.client);
    c.querySelector(".wk-t span").innerHTML = titleHTML(p.title);
    c.querySelector(".wk-s").textContent = L(p.summary);
    c.setAttribute("aria-label", p.title + ", " + stName(p, true));
  }
  function cardEl(p, i) {
    var c = document.createElement("article");
    c.className = "wk-c";
    c.dataset.i = i;
    c.tabIndex = 0;
    c.setAttribute("role", "button");
    c.innerHTML =
      '<div class="wk-cover" style="' +
      cvars(p) +
      '">' +
      artHTML(p, true) +
      '<span class="wk-cat"></span><span class="wk-tr"><span class="wk-st' +
      (isLive(p) ? " live" : "") +
      '"></span><span class="wk-yr">' +
      p.year +
      '</span></span><span class="wk-res"><svg><use href="#ar"/></svg><span></span></span></div>' +
      '<div class="wk-info"><p class="wk-cl"></p><h3 class="wk-t"><span></span><i class="wk-arr"><svg><use href="#ar"/></svg></i></h3><p class="wk-s"></p><ul class="wk-tags">' +
      p.tags
        .map(function (t) {
          return "<li>" + esc(t) + "</li>";
        })
        .join("") +
      "</ul></div>";
    cardText(c, p);
    return c;
  }
  function tileEl() {
    var a = document.createElement("a");
    a.className = "wk-c wk-new";
    a.href = "#pricing";
    a.innerHTML = '<b class="wk-plus">+</b><div><h3></h3><p></p></div>';
    tileText(a);
    return a;
  }
  function tileText(a) {
    a.querySelector("h3").textContent = TT("wk_nt");
    a.querySelector("p").textContent = TT("wk_nd");
  }
  function matches() {
    var m = [];
    PJ.forEach(function (p, i) {
      if (WK.f === "all" || catsOf(p).indexOf(WK.f) > -1) m.push(i);
    });
    return m;
  }

  var ioCards = new IntersectionObserver(
    function (en) {
      en.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          el.style.transitionDelay = (+el.dataset.col || 0) * 90 + "ms";
          el.classList.add("in");
          ioCards.unobserve(el);
          setTimeout(function () {
            el.style.transitionDelay = "";
          }, 1400);
        }
      });
    },
    { threshold: 0.12 },
  );

  function applyFilter(animate) {
    var cards = [].slice.call(wkGrid.querySelectorAll(".wk-c[data-i]")),
      tile = wkGrid.querySelector(".wk-new"),
      more = wkMore;
    var m = matches(),
      vis = m.slice(0, WK.n),
      visSet = {};
    vis.forEach(function (i) {
      visSet[i] = 1;
    });
    var was = cards.filter(function (c) {
      return !c.classList.contains("is-hidden");
    });
    was.forEach(function (c) {
      c.classList.add("in");
      c._r = c.getBoundingClientRect();
    });
    var out = was.filter(function (c) {
      return !visSet[c.dataset.i];
    });
    function finish() {
      out.forEach(function (c) {
        c.getAnimations().forEach(function (a) {
          a.cancel();
        });
        c.classList.add("is-hidden");
      });
      var incoming = [];
      cards.forEach(function (c) {
        if (visSet[c.dataset.i] && c.classList.contains("is-hidden")) {
          c.classList.remove("is-hidden");
          incoming.push(c);
        }
      });
      cards.forEach(function (c) {
        c.classList.remove("wk-feat");
      });
      if (vis.length >= 3) {
        cards.forEach(function (c) {
          if (+c.dataset.i === vis[0]) c.classList.add("wk-feat");
        });
      }
      tile.classList.toggle("is-hidden", vis.length !== m.length);
      more.hidden = !(m.length > vis.length);
      wkN.textContent = pad(m.length);
      var eo = "cubic-bezier(.2,.8,.2,1)";
      if (animate && !reduce) {
        cards
          .filter(function (c) {
            return was.indexOf(c) > -1 && visSet[c.dataset.i];
          })
          .forEach(function (c) {
            var r = c._r,
              n = c.getBoundingClientRect(),
              dx = r.left - n.left,
              dy = r.top - n.top;
            if (
              Math.abs(r.width - n.width) > 2 ||
              Math.abs(r.height - n.height) > 2
            )
              c.animate(
                [
                  { opacity: 0, transform: "scale(.96)" },
                  { opacity: 1, transform: "none" },
                ],
                { duration: 550, easing: eo },
              );
            else if (dx || dy)
              c.animate(
                [
                  { transform: "translate(" + dx + "px," + dy + "px)" },
                  { transform: "none" },
                ],
                { duration: 650, easing: eo },
              );
          });
        incoming.forEach(function (c, k) {
          c.classList.add("in");
          c.animate(
            [
              { opacity: 0, transform: "translateY(30px) scale(.96)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 650,
              delay: 120 + k * 70,
              easing: eo,
              fill: "backwards",
            },
          );
        });
      } else
        incoming.forEach(function (c) {
          c.classList.add("in");
        });
    }
    if (animate && !reduce && out.length) {
      Promise.all(
        out.map(function (c) {
          return c.animate(
            [
              { opacity: 1, transform: "none" },
              { opacity: 0, transform: "scale(.94)" },
            ],
            { duration: 220, fill: "forwards", easing: "ease-in" },
          ).finished;
        }),
      ).then(finish);
    } else finish();
  }
  function renderAll() {
    wkGrid.innerHTML = "";
    PJ.forEach(function (p, i) {
      var c = cardEl(p, i);
      wkGrid.appendChild(c);
    });
    wkGrid.appendChild(tileEl());
    renderFilters(true);
    applyFilter(false);
    [].forEach.call(
      wkGrid.querySelectorAll(".wk-c:not(.is-hidden)"),
      function (c, k) {
        c.dataset.col = k % 3;
        if (reduce) c.classList.add("in");
        else ioCards.observe(c);
      },
    );
  }
  document.getElementById("wkMoreBtn").addEventListener("click", function () {
    WK.n += PAGE;
    applyFilter(true);
  });
  wkGrid.addEventListener("click", function (e) {
    var c = e.target.closest(".wk-c[data-i]");
    if (c) openCase(+c.dataset.i, e, c);
  });
  wkGrid.addEventListener("keydown", function (e) {
    if (
      (e.key === "Enter" || e.key === " ") &&
      e.target.matches(".wk-c[data-i]")
    ) {
      e.preventDefault();
      openCase(+e.target.dataset.i, null, e.target);
    }
  });
  ioIn.observe(document.querySelector("#work .svc-head"));

  /* --- cursor bubble + card parallax (mouse only) --- */
  if (fine && !reduce) {
    var bx = 0,
      by = 0,
      tx = 0,
      ty = 0,
      running = false;
    function bubble() {
      bx += (tx - bx) * 0.2;
      by += (ty - by) * 0.2;
      wkCur.style.translate = bx.toFixed(1) + "px " + by.toFixed(1) + "px";
      if (Math.abs(tx - bx) > 0.3 || Math.abs(ty - by) > 0.3)
        requestAnimationFrame(bubble);
      else running = false;
    }
    wkGrid.addEventListener("pointermove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      if (!running) {
        running = true;
        requestAnimationFrame(bubble);
      }
      var c = e.target.closest(".wk-c");
      if (!c) {
        wkCur.classList.remove("on");
        return;
      }
      wkCur.dataset.k = c.classList.contains("wk-new") ? "go" : "view";
      wkCur.classList.add("on");
      var r = c.getBoundingClientRect();
      c.style.setProperty(
        "--px",
        ((e.clientX - r.left) / r.width - 0.5).toFixed(3),
      );
      c.style.setProperty(
        "--py",
        ((e.clientY - r.top) / r.height - 0.5).toFixed(3),
      );
    });
    wkGrid.addEventListener("pointerleave", function () {
      wkCur.classList.remove("on");
    });
  }

  /* --- case study --- */
  function btnHTML(cls, label, attrs) {
    return (
      '<a class="cta btn ' +
      cls +
      ' btn-s" ' +
      attrs +
      '><span class="fill"></span><span class="roll" data-t="' +
      esc(label) +
      '"><span>' +
      esc(label) +
      '</span></span><span class="ico"><svg><use href="#ar"/></svg><svg><use href="#ar"/></svg></span></a>'
    );
  }
  /* the link out: the live site of a client project, the demo of a concept */
  function outHTML(p, cls) {
    var u = L(p.url);
    return u
      ? btnHTML(
          cls,
          TT(isLive(p) ? "cs_live" : "cs_demo"),
          'href="' + esc(u) + '" target="_blank" rel="noopener"',
        )
      : "";
  }
  function metaHTML(k, v) {
    return v ? "<div><dt>" + k + "</dt><dd>" + esc(v) + "</dd></div>" : "";
  }
  /* p.lh holds one Lighthouse measurement of the public demo. Two numbers
     become tiles, the rest is spelled out in the note below them. */
  function lhStats(p) {
    var m = p.lh;
    return m
      ? [
          { n: m.perf, l: TT("lh_perf") },
          { n: m.lcp, d: 1, s: TT("lh_sec"), l: TT("lh_lcp") },
        ]
      : [];
  }
  function lhNote(p) {
    var m = p.lh;
    if (!m) return L(p.note) || "";
    var day = new Intl.DateTimeFormat(locOf(curLang || "en"), {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(m.on + "T00:00:00Z"));
    return TT("lh_note")
      .replace("{date}", day)
      .replace("{ver}", m.ver)
      .replace("{a11y}", m.a11y)
      .replace("{bp}", m.bp)
      .replace("{mp}", m.mPerf)
      .replace("{ml}", num(m.mLcp, 1) + TT("lh_sec"))
      .replace(
        "{seo}",
        m.seo == null ? TT("lh_noidx") : TT("lh_seo").replace("{n}", m.seo),
      );
  }
  function caseHTML(p, i) {
    var t = T[curLang || "en"],
      stats = lhStats(p).concat(p.stats || []),
      note = lhNote(p),
      live = isLive(p),
      h = "";
    h +=
      '<div class="cs-in"><div class="cs-top"><span class="cs-pill">' +
      esc(catLabel(p)) +
      " · " +
      p.year +
      '</span><span class="cs-stt' +
      (live ? " live" : "") +
      '">' +
      esc(stName(p, true)) +
      '</span></div><h2 class="cs-h' +
      (/[^\s\-]{14,}/.test(p.title.replace(/\u00AD/g, "")) ? " long" : "") +
      '" id="csT">' +
      titleHTML(p.title) +
      '</h2><p class="cs-sum">' +
      esc(L(p.summary)) +
      "</p>";
    if (L(p.url)) h += '<div class="cs-act">' + outHTML(p, "btn-p") + "</div>";
    /* a concept has no client: say so instead of naming one */
    h +=
      '<dl class="cs-meta">' +
      metaHTML(t.cs_type, live ? L(p.client) : t.cs_fict) +
      metaHTML(t.cs_svc, catLabel(p)) +
      metaHTML(t.cs_time, L(p.time)) +
      metaHTML(t.cs_year, p.year) +
      "</dl>";
    if (p.challenge)
      h +=
        '<div class="cs-sec"><div class="cs-lab">' +
        t.cs_chal +
        '</div><p class="cs-p">' +
        esc(L(p.challenge)) +
        "</p></div>";
    if (p.did && p.did.length)
      h +=
        '<div class="cs-sec"><div class="cs-lab">' +
        t.cs_did +
        '</div><ol class="cs-steps">' +
        p.did
          .map(function (d) {
            return "<li>" + esc(L(d)) + "</li>";
          })
          .join("") +
        "</ol></div>";
    /* only measured values belong here; no stats, no section */
    if (stats.length)
      h +=
        '<div class="cs-sec"><div class="cs-lab">' +
        t.cs_res +
        '</div><div class="cs-stats">' +
        stats
          .map(function (s) {
            var suf = L(s.s) || "",
              pre = L(s.p) || "";
            return (
              '<div class="cs-st"><b data-n="' +
              s.n +
              '" data-d="' +
              (s.d || 0) +
              '" data-p="' +
              esc(pre) +
              '" data-s="' +
              esc(suf) +
              '">' +
              esc(pre + num(0, s.d) + suf) +
              "</b><span>" +
              esc(L(s.l)) +
              "</span></div>"
            );
          })
          .join("") +
        "</div>" +
        (note ? '<p class="cs-note">' + esc(note) + "</p>" : "") +
        "</div>";
    /* a testimonial only for a real client; a concept shows its design idea */
    if (live && p.quote)
      h +=
        '<blockquote class="cs-q"><p>“' +
        esc(L(p.quote.t)) +
        "”</p><cite>" +
        esc(L(p.quote.w)) +
        ", " +
        esc(p.title) +
        "</cite></blockquote>";
    else if (!live && p.idea)
      h +=
        '<figure class="cs-q"><p>' +
        esc(L(p.idea)) +
        "</p><figcaption>" +
        esc(t.cs_idea) +
        " · " +
        esc(p.title) +
        "</figcaption></figure>";
    h +=
      '<div class="cs-sec"><div class="cs-lab">' +
      t.cs_tech +
      '</div><div class="cs-tech">' +
      p.tags
        .map(function (x) {
          return "<span>" + esc(x) + "</span>";
        })
        .join("") +
      "</div></div>";
    var nx = PJ[(i + 1) % PJ.length];
    h +=
      '<div class="cs-foot"><div class="cs-cta"><h3>' +
      t.cs_ct +
      '</h3><div class="row">' +
      btnHTML("btn-p", t.cs_cb, 'href="#pricing" data-close') +
      outHTML(p, "btn-g") +
      "</div></div>" +
      '<button class="cs-next" type="button" data-go="1"><div class="nc" style="' +
      cvars(nx) +
      '">' +
      artHTML(nx) +
      "</div><small>" +
      t.cs_next +
      " · " +
      esc(stName(nx)) +
      "</small><b>" +
      esc(nx.title) +
      "</b></button></div></div>";
    return h;
  }
  function countUp(el) {
    var n = parseFloat(el.dataset.n),
      d = parseInt(el.dataset.d, 10) || 0,
      pre = el.dataset.p || "",
      suf = el.dataset.s || "";
    if (reduce) {
      el.textContent = pre + num(n, d) + suf;
      return;
    }
    var t0 = performance.now();
    (function s(now) {
      var q = Math.min(1, (now - t0) / 1500),
        e = 1 - Math.pow(1 - q, 4);
      el.textContent = pre + num(n * e, d) + suf;
      if (q < 1) requestAnimationFrame(s);
    })(t0);
  }
  var ioStat = null;
  function fillCase(i) {
    var p = PJ[i];
    WK.open = i;
    csCover.style.cssText = cvars(p);
    csCover.innerHTML = artHTML(p, true);
    csBody.innerHTML = caseHTML(p, i);
    csIdx.textContent = pad(i + 1) + " / " + pad(PJ.length);
    cs.setAttribute("aria-label", p.title);
    if (ioStat) ioStat.disconnect();
    ioStat = new IntersectionObserver(
      function (en) {
        en.forEach(function (e) {
          if (e.isIntersecting) {
            countUp(e.target);
            ioStat.unobserve(e.target);
          }
        });
      },
      { root: csScroll, threshold: 0.6 },
    );
    [].forEach.call(csBody.querySelectorAll(".cs-st b"), function (b) {
      ioStat.observe(b);
    });
  }
  function openCase(i, e, from) {
    WK.from = from || null;
    fillCase(i);
    csScroll.scrollTop = 0;
    var r = from ? from.getBoundingClientRect() : null;
    var x =
        e && e.clientX ? e.clientX : r ? r.left + r.width / 2 : innerWidth / 2,
      y =
        e && e.clientY ? e.clientY : r ? r.top + r.height / 2 : innerHeight / 2;
    cs.style.setProperty("--bx", x + "px");
    cs.style.setProperty("--by", y + "px");
    cs.inert = false;
    cs.setAttribute("aria-hidden", "false");
    cs.classList.add("open");
    document.body.classList.add("cs-on");
    main.inert = true;
    headerEl.inert = true;
    setTimeout(function () {
      document.getElementById("csX").focus();
    }, 500);
    routePush("#work/" + PJ[i].id);
  }
  function closeCase() {
    if (!cs.classList.contains("open")) return;
    cs.classList.remove("open");
    cs.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cs-on");
    main.inert = false;
    headerEl.inert = false;
    setTimeout(function () {
      cs.inert = true;
    }, 900);
    if (WK.from && WK.from.focus) WK.from.focus({ preventScroll: true });
    routeClear();
  }
  function stepCase(d) {
    var i = (WK.open + d + PJ.length) % PJ.length;
    fillCase(i);
    routePush("#work/" + PJ[i].id, true);
    csScroll.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }
  document.getElementById("csX").addEventListener("click", closeCase);
  document.getElementById("csPrev").addEventListener("click", function () {
    stepCase(-1);
  });
  document.getElementById("csNext").addEventListener("click", function () {
    stepCase(1);
  });
  csBody.addEventListener("click", function (e) {
    if (e.target.closest("[data-go]")) stepCase(1);
    else if (e.target.closest("[data-close]")) closeCase();
  });
  document.addEventListener("keydown", function (e) {
    if (!cs.classList.contains("open")) return;
    if (e.key === "Escape") closeCase();
    else if (e.key === "ArrowRight") stepCase(1);
    else if (e.key === "ArrowLeft") stepCase(-1);
  });
  /* ================= work showcase ================= */
  var SH = { list: [], k: -1, el: null, play: true, vis: false, swiped: false };
  var shShow = document.getElementById("wkShow"),
    shStage = document.getElementById("wkStage"),
    shRail = document.getElementById("wkRail"),
    shIdx = document.getElementById("wkIdx"),
    shPP = document.getElementById("wkPP"),
    shAll = document.getElementById("wkAll"),
    shAllBtn = document.getElementById("wkAllBtn");
  var shDesk = window.matchMedia("(min-width:1000px)"),
    shEase = "cubic-bezier(.2,.8,.2,1)";
  if (reduce) {
    SH.play = false;
    shShow.classList.add("static");
  }
  function shRoll(btn, txt) {
    var r = btn.querySelector(".roll");
    r.dataset.t = txt;
    r.firstElementChild.textContent = txt;
  }
  function shRailText(li, p) {
    li.querySelector("small").textContent = stName(p) + " · " + catLabel(p);
    li.querySelector("b").textContent = p.title;
    li.querySelector("em").textContent = L(p.fact) || "";
    li.querySelector("button").setAttribute("aria-label", p.title);
  }
  function shBuild() {
    SH.list = matches();
    SH.k = -1;
    SH.el = null;
    shStage.innerHTML = "";
    shRail.innerHTML = "";
    shShow.classList.toggle("solo", SH.list.length < 2);
    SH.list.forEach(function (pi, n) {
      var p = PJ[pi],
        li = document.createElement("li");
      li.innerHTML =
        '<button type="button" class="wk-qi" data-n="' +
        n +
        '"><span class="wk-qt"><span class="wk-cover" style="' +
        cvars(p) +
        '">' +
        artHTML(p) +
        '</span></span><span class="wk-qx"><small></small><b></b><em></em></span><i class="wk-qp"></i></button>';
      shRailText(li, p);
      shRail.appendChild(li);
    });
    shLabel();
    if (SH.list.length) shGo(0, 1, true);
    else shIdx.textContent = "";
  }
  function shLabel() {
    var n = SH.list.length;
    shRoll(
      shAllBtn,
      TT(shAll.classList.contains("open") ? "wk_hide" : "wk_browse"),
    );
    var t = document.getElementById("wkAllT");
    if (!t.querySelector("sup")) {
      t.insertAdjacentHTML("beforeend", "<sup></sup>");
    }
    t.querySelector("sup").textContent = n;
  }
  function shSlide(pi) {
    var el = cardEl(PJ[pi], pi);
    el.classList.add("wk-sl", "in");
    el.setAttribute("aria-roledescription", "slide");
    return el;
  }
  function shScroll() {
    var li = shRail.children[SH.k];
    if (!li) return;
    var beh = reduce ? "auto" : "smooth";
    if (shDesk.matches)
      shRail.scrollTo({ top: Math.max(0, li.offsetTop - 4), behavior: beh });
    else
      shRail.scrollTo({
        left: Math.max(
          0,
          li.offsetLeft - (shRail.clientWidth - li.offsetWidth) / 2,
        ),
        behavior: beh,
      });
  }
  function shGo(k, dir, first) {
    var n = SH.list.length;
    if (!n) return;
    k = ((k % n) + n) % n;
    if (!first && k === SH.k && n > 1) return;
    var prev = SH.el,
      el = shSlide(SH.list[k]);
    shStage.appendChild(el);
    SH.k = k;
    SH.el = el;
    if (prev) {
      if (reduce || first) {
        prev.remove();
      } else {
        el.animate(
          [
            {
              opacity: 0,
              transform: "translateX(" + dir * 70 + "px) scale(1.035)",
            },
            { opacity: 1, transform: "none" },
          ],
          { duration: 850, easing: shEase },
        );
        prev.style.pointerEvents = "none";
        prev
          .animate(
            [
              { opacity: 1, transform: "none" },
              {
                opacity: 0,
                transform: "translateX(" + -dir * 50 + "px) scale(.965)",
              },
            ],
            { duration: 620, easing: shEase, fill: "forwards" },
          )
          .finished.then(
            function () {
              prev.remove();
            },
            function () {
              prev.remove();
            },
          );
      }
    }
    [].forEach.call(shRail.children, function (li, i) {
      li.classList.toggle("on", i === k);
      li.firstChild.setAttribute("aria-current", i === k ? "true" : "false");
    });
    shIdx.innerHTML = pad(k + 1) + "<span>/ " + pad(n) + "</span>";
    shScroll();
  }
  function shHold() {
    var hold =
      !SH.play ||
      !SH.vis ||
      document.hidden ||
      shHover ||
      shFocus ||
      (cs && cs.classList.contains("open"));
    shShow.classList.toggle("hold", !!hold);
  }
  var shHover = false,
    shFocus = false;
  shShow.addEventListener("mouseenter", function () {
    if (fine) {
      shHover = true;
      shHold();
    }
  });
  shShow.addEventListener("mouseleave", function () {
    shHover = false;
    shHold();
  });
  shShow.addEventListener("focusin", function (e) {
    if (e.target.matches(":focus-visible")) {
      shFocus = true;
      shHold();
    }
  });
  shShow.addEventListener("focusout", function () {
    shFocus = false;
    shHold();
  });
  document.addEventListener("visibilitychange", shHold);
  if (cs)
    new MutationObserver(shHold).observe(cs, {
      attributes: true,
      attributeFilter: ["class"],
    });
  new IntersectionObserver(
    function (en) {
      SH.vis = en[0].isIntersecting;
      shHold();
    },
    { threshold: 0.25 },
  ).observe(shShow);
  shRail.addEventListener("animationend", function (e) {
    if (e.animationName === "wkP" && !reduce && SH.play) shGo(SH.k + 1, 1);
  });
  shRail.addEventListener("click", function (e) {
    var b = e.target.closest(".wk-qi");
    if (!b) return;
    var n = +b.dataset.n;
    shGo(n, n > SH.k ? 1 : -1);
  });
  document.getElementById("wkNext").addEventListener("click", function () {
    shGo(SH.k + 1, 1);
  });
  document.getElementById("wkPrev").addEventListener("click", function () {
    shGo(SH.k - 1, -1);
  });
  shPP.addEventListener("click", function () {
    SH.play = !SH.play;
    shPP.setAttribute("aria-pressed", !SH.play);
    shPP.setAttribute("aria-label", TT(SH.play ? "wk_pause" : "wk_playb"));
    shShow.classList.toggle("static", !SH.play || reduce);
    if (SH.play && !reduce) {
      var on = shRail.querySelector("li.on");
      if (on) {
        on.classList.remove("on");
        void on.offsetWidth;
        on.classList.add("on");
      }
    }
    shHold();
  });
  /* open the case study / swipe on the stage */
  shStage.addEventListener("click", function (e) {
    if (SH.swiped) {
      SH.swiped = false;
      return;
    }
    var c = e.target.closest(".wk-c");
    if (c) openCase(+c.dataset.i, e, c);
  });
  shStage.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches(".wk-c")) {
      e.preventDefault();
      openCase(+e.target.dataset.i, null, e.target);
    } else if (e.key === "ArrowRight") {
      shGo(SH.k + 1, 1);
    } else if (e.key === "ArrowLeft") {
      shGo(SH.k - 1, -1);
    }
  });
  (function () {
    var x0 = 0,
      y0 = 0,
      down = false;
    shStage.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse") return;
      down = true;
      x0 = e.clientX;
      y0 = e.clientY;
      SH.swiped = false;
      shFocus = true;
      shHold();
    });
    function end(e) {
      if (!down) return;
      down = false;
      shFocus = false;
      shHold();
      var dx = e.clientX - x0,
        dy = e.clientY - y0;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        SH.swiped = true;
        shGo(SH.k + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        setTimeout(function () {
          SH.swiped = false;
        }, 350);
      }
    }
    shStage.addEventListener("pointerup", end);
    shStage.addEventListener("pointercancel", function () {
      down = false;
      shFocus = false;
      shHold();
    });
  })();
  /* mouse parallax on the big card */
  if (fine && !reduce)
    shStage.addEventListener("pointermove", function (e) {
      var c = e.target.closest(".wk-c");
      if (!c) return;
      var r = c.getBoundingClientRect();
      c.style.setProperty(
        "--px",
        ((e.clientX - r.left) / r.width - 0.5).toFixed(3),
      );
      c.style.setProperty(
        "--py",
        ((e.clientY - r.top) / r.height - 0.5).toFixed(3),
      );
    });
  /* "browse all" drawer with the full grid */
  shAllBtn.addEventListener("click", function () {
    var open = !shAll.classList.contains("open");
    shAll.classList.toggle("open", open);
    shAll.inert = !open;
    shAllBtn.setAttribute("aria-expanded", open);
    shLabel();
    if (open) {
      [].forEach.call(
        wkGrid.querySelectorAll(".wk-c:not(.is-hidden)"),
        function (c) {
          c.classList.add("in");
        },
      );
      setTimeout(function () {
        document
          .getElementById("wkAllBtn")
          .scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
          });
      }, 60);
    } else
      document
        .getElementById("wkShow")
        .scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "center",
        });
  });
  function showReset() {
    if (!reduce && SH.el)
      SH.el
        .animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 180,
          fill: "forwards",
        })
        .finished.then(shBuild, shBuild);
    else shBuild();
  }
  function shLang() {
    SH.list.forEach(function (pi, n) {
      shRailText(shRail.children[n], PJ[pi]);
    });
    if (SH.el && SH.k > -1) {
      var el = shSlide(SH.list[SH.k]);
      SH.el.replaceWith(el);
      SH.el = el;
    }
    shLabel();
    shPP.setAttribute("aria-label", TT(SH.play ? "wk_pause" : "wk_playb"));
    document.getElementById("wkPrev").setAttribute("aria-label", TT("wk_prev"));
    document
      .getElementById("wkNext")
      .setAttribute("aria-label", TT("wk_nextb"));
  }
  shBuild();
  shLang();

  /* language: refresh generated text in place */
  function workLang() {
    if (typeof shLang === "function") shLang();
    if (!wkGrid) return;
    [].forEach.call(wkGrid.querySelectorAll(".wk-c[data-i]"), function (c) {
      cardText(c, PJ[+c.dataset.i]);
    });
    var tl = wkGrid.querySelector(".wk-new");
    if (tl) tileText(tl);
    renderFilters(true);
    if (cs.classList.contains("open")) {
      var st = csScroll.scrollTop;
      fillCase(WK.open);
      csScroll.scrollTop = st;
    }
  }
  renderAll();

  /* ================= v8 WHY US JS ================= */
  var wy = document.getElementById("why"),
    wyLead = document.getElementById("wyLead"),
    wyWords = [];
  VIZ.wy1 = { t: [300, 800, 1300, 1800, 2600], total: 7200 };
  VIZ.wy2 = { t: [300, 1300, 2600, 3300], total: 8200 };
  VIZ.wy3 = { t: [300, 900, 1500, 2100, 2800], total: 7600 };
  VIZ.wy4 = { t: [300, 800, 1300, 2200, 3100], total: 7600 };
  [].forEach.call(document.querySelectorAll(".wy-v"), function (v) {
    ioViz.observe(v);
  });
  ioIn.observe(document.getElementById("wyGrid"));
  ioIn.observe(document.getElementById("wyEnd"));

  /* manifesto: words light up as you scroll */
  function wyScrub() {
    if (!wyWords.length) return;
    var r = wyLead.getBoundingClientRect(),
      vh = window.innerHeight;
    var p = reduce
      ? 1
      : Math.max(
          0,
          Math.min(1, (vh * 0.88 - r.top) / (vh * 0.45 + r.height * 0.6)),
        );
    var lit = p * wyWords.length * 1.08;
    wyWords.forEach(function (sp, i) {
      sp.style.opacity = (
        0.2 +
        0.8 * Math.max(0, Math.min(1, lit - i))
      ).toFixed(2);
    });
  }
  function wyLang() {
    var parts = T[curLang || "en"].wy_lead.split(" ");
    wyLead.textContent = "";
    wyWords = parts.map(function (w) {
      var sp = document.createElement("span");
      sp.textContent = w;
      wyLead.appendChild(sp);
      wyLead.appendChild(document.createTextNode(" "));
      return sp;
    });
    wyScrub();
  }
  var wyTick = false;
  window.addEventListener(
    "scroll",
    function () {
      if (wyTick) return;
      wyTick = true;
      requestAnimationFrame(function () {
        wyScrub();
        wyTick = false;
      });
    },
    { passive: true },
  );
  window.addEventListener("resize", wyScrub);

  /* dark dot spotlight that follows the pointer */
  if (fine && !reduce) {
    wy.addEventListener("pointermove", function (e) {
      var r = wy.getBoundingClientRect();
      wy.style.setProperty("--mx", e.clientX - r.left + "px");
      wy.style.setProperty("--my", e.clientY - r.top + "px");
      wy.classList.add("hov");
    });
    wy.addEventListener("pointerleave", function () {
      wy.classList.remove("hov");
    });
  }
  wyLang();

  /* ================= v9 PRICING JS ================= */
  var PR = window.PRICING || { plans: [], goals: [], faq: [], email: "" },
    PK = { goal: null, lite: {}, open: 0 },
    pkGrid = document.getElementById("pkGrid"),
    pkGoals = document.getElementById("pkGoals"),
    pkRec = document.getElementById("pkRec"),
    pkDots = document.getElementById("pkDots"),
    pkAcc = document.getElementById("pkAcc"),
    pkCu = document.getElementById("pkCu"),
    pkT = false;
  var AR2 =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    CK2 =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    CL2 =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  function fmt(n) {
    return formatMoney(n);
  }
  function planById(id) {
    return PR.plans.filter(function (p) {
      return p.id === id;
    })[0];
  }
  function isLite(p) {
    return !!(PK.lite[p.id] && p.lite);
  }
  function priceOf(p) {
    return isLite(p) ? p.lite.price : p.price;
  }
  function mailHref(sub, body) {
    return (
      "mailto:" +
      PR.email +
      "?subject=" +
      encodeURIComponent(sub) +
      "&body=" +
      encodeURIComponent(body)
    );
  }
  function planMail(p) {
    var t = T[curLang || "en"];
    return mailHref(
      t.mq_s + " " + L(p.name),
      t.mq_b1 +
        "\n\n" +
        L(p.name) +
        (isLite(p) ? " (" + t.pk_on + ")" : "") +
        " · " +
        t.pk_from +
        " " +
        fmt(priceOf(p)) +
        "\n\n" +
        t.mq_b2 +
        "\n",
    );
  }
  function talkMail() {
    var t = T[curLang || "en"];
    return mailHref(
      t.mq_s + " " + t.mq_c,
      t.mq_b1 + "\n\n" + t.mq_c + "\n\n" + t.mq_b2 + "\n",
    );
  }
  function ctaHTML(cls, label, extra) {
    return (
      '<a class="cta btn ' +
      cls +
      " " +
      (extra || "") +
      '" href="#pricing"><span class="fill"></span><span class="roll" data-t="' +
      esc(label) +
      '"><span>' +
      esc(label) +
      '</span></span><span class="ico">' +
      AR2 +
      AR2 +
      "</span></a>"
    );
  }
  function countAmt(el, to, animate, from) {
    if (el._raf) cancelAnimationFrame(el._raf);
    var f = from != null ? from : el._v != null ? el._v : to;
    if (!animate || reduce || f === to) {
      el._v = to;
      el.textContent = fmt(to);
      return;
    }
    var t0 = performance.now(),
      dur = Math.min(1200, 450 + Math.abs(to - f) * 0.45);
    (function step(now) {
      var q = Math.min(1, (now - t0) / dur),
        e = 1 - Math.pow(1 - q, 3),
        v = Math.round(f + (to - f) * e);
      el._v = v;
      el.textContent = fmt(v);
      if (q < 1) el._raf = requestAnimationFrame(step);
      else {
        el._v = to;
        el.textContent = fmt(to);
      }
    })(t0);
  }

  /* goal picker */
  function renderGoals() {
    pkGoals.innerHTML = "";
    PR.goals.forEach(function (g, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "pk-gb";
      b.textContent = L(g.t);
      b.setAttribute("aria-pressed", PK.goal === i);
      b.addEventListener("click", function () {
        setGoal(PK.goal === i ? null : i);
      });
      pkGoals.appendChild(b);
    });
  }
  function slideTo(c) {
    pkGrid.scrollTo({
      left: c.offsetLeft - (pkGrid.clientWidth - c.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }
  function renderRec() {
    var g = PK.goal == null ? null : PR.goals[PK.goal],
      t = T[curLang || "en"];
    pkRec.classList.toggle("on", !!g);
    pkRec.inert = !g;
    if (!g) return;
    var custom = g.plan === "custom",
      p = custom ? null : planById(g.plan),
      label = custom ? t.pk_talk : t.pk_get,
      a = document.getElementById("pkRecA"),
      r = document.getElementById("pkRecR");
    document.getElementById("pkRecN").textContent = custom ? t.mq_c : L(p.name);
    document.getElementById("pkRecP").textContent = custom
      ? t.pk_cu_p
      : t.pk_from + " " + formatMoney(priceOf(p));
    r.dataset.t = label;
    r.firstElementChild.textContent = label;
    a.href = custom ? talkMail() : planMail(p);
  }
  function applyGoal() {
    var g = PK.goal == null ? null : PR.goals[PK.goal],
      id = g ? g.plan : null;
    pkGrid.classList.toggle("has-goal", !!id && id !== "custom");
    [].forEach.call(pkGrid.children, function (c) {
      c.classList.toggle("match", c.dataset.id === id);
    });
    pkCu.classList.toggle("match", id === "custom");
    [].forEach.call(pkGoals.children, function (b, i) {
      b.setAttribute("aria-pressed", PK.goal === i);
    });
    renderRec();
  }
  function setGoal(i) {
    PK.goal = i;
    applyGoal();
    var g = i == null ? null : PR.goals[i];
    if (g && g.plan !== "custom" && window.innerWidth < 700) {
      var c = pkGrid.querySelector('[data-id="' + g.plan + '"]');
      if (c) slideTo(c);
    }
  }

  /* package cards */
  function renderPlans() {
    var t = T[curLang || "en"];
    pkGrid.innerHTML = "";
    PR.plans.forEach(function (p, i) {
      var lite = isLite(p),
        c = document.createElement("article");
      c.className = "pk-c" + (p.feat ? " feat" : "") + (lite ? " is-lite" : "");
      c.dataset.id = p.id;
      c.style.setProperty("--k", i);
      var h =
        '<div class="pk-top">' +
        (p.feat
          ? '<span class="pk-badge">' + esc(L(p.badge)) + "</span>"
          : "") +
        "</div>" +
        '<h3 class="pk-n">' +
        esc(L(p.name)) +
        '</h3><p class="pk-who">' +
        esc(L(p.who)) +
        "</p>" +
        '<div class="pk-price"><span class="pk-from"><span>' +
        esc(t.pk_from) +
        "</span><span>" +
        esc(t.pk_once) +
        '</span></span><b class="pk-amt">' +
        fmt(priceOf(p)) +
        "</b></div>";
      h += p.lite
        ? '<div class="pk-flex"><label class="pk-sw"><input type="checkbox" role="switch"' +
          (lite ? " checked" : "") +
          '><span class="pk-trk"><i></i></span><span class="pk-lbl">' +
          esc(lite ? t.pk_on : t.pk_q) +
          '</span></label><p class="pk-note">' +
          esc(lite ? L(p.lite.note) : t.pk_off) +
          "</p></div>"
        : '<div class="pk-flex"><p class="pk-note">' +
          esc(t.pk_solo) +
          "</p></div>";
      h +=
        '<ul class="pk-ul">' +
        p.feats
          .map(function (f) {
            return (
              "<li" +
              (lite && f.lite === false ? ' class="off"' : "") +
              '><span class="pk-ck">' +
              CK2 +
              "</span><span>" +
              esc(L(f.t)) +
              "</span></li>"
            );
          })
          .join("") +
        "</ul>";
      h +=
        '<p class="pk-time">' +
        CL2 +
        esc(L(p.time)) +
        "</p>" +
        ctaHTML(p.feat ? "btn-d" : "btn-g", t.pk_get, "pk-go");
      c.innerHTML = h;
      var amt = c.querySelector(".pk-amt");
      amt._v = priceOf(p);
      amt._t = priceOf(p);
      c.querySelector(".pk-go").href = planMail(p);
      var inp = c.querySelector("input");
      if (inp)
        inp.addEventListener("change", function () {
          PK.lite[p.id] = inp.checked;
          liteUpdate(c, p);
        });
      pkGrid.appendChild(c);
    });
    renderDots();
    applyGoal();
    fitAll();
  }
  function fitAll() {
    var amts = [].slice.call(pkGrid.querySelectorAll(".pk-amt"));
    if (!amts.length) return;
    amts.forEach(function (a) {
      a.style.fontSize = "";
    });
    var min = 1e9;
    amts.forEach(function (a) {
      var sv = a.textContent;
      a.textContent = fmt(a._t);
      a.classList.add("fit-now");
      var s = parseFloat(getComputedStyle(a).fontSize),
        av = a.parentNode.clientWidth;
      while (av > 0 && a.getBoundingClientRect().width > av + 0.5 && s > 16) {
        s--;
        a.style.fontSize = s + "px";
      }
      a.classList.remove("fit-now");
      if (s < min) min = s;
      a.textContent = sv;
    });
    amts.forEach(function (a) {
      a.style.fontSize = min + "px";
    });
  }
  window.addEventListener("resize", function () {
    fitAll();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
  function liteUpdate(c, p) {
    var t = T[curLang || "en"],
      on = isLite(p),
      amt = c.querySelector(".pk-amt");
    c.classList.toggle("is-lite", on);
    c.querySelector(".pk-lbl").textContent = on ? t.pk_on : t.pk_q;
    c.querySelector(".pk-note").textContent = on ? L(p.lite.note) : t.pk_off;
    [].forEach.call(c.querySelectorAll(".pk-ul li"), function (li, k) {
      li.classList.toggle("off", on && p.feats[k].lite === false);
    });
    amt._t = priceOf(p);
    fitAll();
    countAmt(amt, priceOf(p), true);
    c.querySelector(".pk-go").href = planMail(p);
    renderRec();
  }
  function renderDots() {
    pkDots.innerHTML = "";
    PR.plans.forEach(function (p, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", L(p.name));
      b.addEventListener("click", function () {
        slideTo(pkGrid.children[i]);
      });
      pkDots.appendChild(b);
    });
    updDots();
  }
  function updDots() {
    var mid = pkGrid.scrollLeft + pkGrid.clientWidth / 2,
      best = 0,
      bd = 1e9;
    [].forEach.call(pkGrid.children, function (c, i) {
      var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    [].forEach.call(pkDots.children, function (b, i) {
      b.classList.toggle("on", i === best);
    });
  }
  pkGrid.addEventListener(
    "scroll",
    function () {
      if (pkT) return;
      pkT = true;
      requestAnimationFrame(function () {
        updDots();
        pkT = false;
      });
    },
    { passive: true },
  );

  /* first reveal: cards rise in and the prices count up */
  var ioPk = new IntersectionObserver(
    function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        ioPk.unobserve(e.target);
        [].forEach.call(pkGrid.children, function (c, i) {
          var a = c.querySelector(".pk-amt");
          if (reduce) return;
          a._v = 0;
          a.textContent = fmt(0);
          setTimeout(
            function () {
              countAmt(a, a._t, true, 0);
            },
            300 + i * 130,
          );
        });
        pkGrid.classList.add("in");
      });
    },
    { threshold: 0.15 },
  );
  ioPk.observe(pkGrid);
  [].forEach.call(document.querySelectorAll(".pk-rise"), function (n) {
    ioIn.observe(n);
  });

  /* faq */
  function renderFaq() {
    pkAcc.innerHTML = "";
    PR.faq.forEach(function (f, i) {
      var d = document.createElement("div");
      d.className = "fq" + (PK.open === i ? " open" : "");
      d.innerHTML =
        '<button type="button" id="fqb' +
        i +
        '" aria-expanded="' +
        (PK.open === i) +
        '" aria-controls="fqa' +
        i +
        '"><span></span><i class="pl" aria-hidden="true"></i></button><div class="fa" id="fqa' +
        i +
        '" role="region" aria-labelledby="fqb' +
        i +
        '"><div><p></p></div></div>';
      d.querySelector("button span").textContent = L(f.q);
      d.querySelector(".fa p").textContent = L(f.a).replace(
        /\{(\w+)\}/g,
        function (m, id) {
          var pl = planById(id);
          return pl ? formatMoney(pl.price) : m;
        },
      );
      d.querySelector("button").addEventListener("click", function () {
        PK.open = PK.open === i ? -1 : i;
        [].forEach.call(pkAcc.children, function (x, k) {
          x.classList.toggle("open", k === PK.open);
          x.querySelector("button").setAttribute(
            "aria-expanded",
            k === PK.open,
          );
        });
      });
      pkAcc.appendChild(d);
    });
  }

  /* dynamic CTAs also get the cursor-origin fill */
  ["pointerenter", "pointerleave"].forEach(function (ev) {
    document.addEventListener(
      ev,
      function (e) {
        var b = e.target;
        if (!b || !b.classList || !b.classList.contains("cta")) return;
        var r = b.getBoundingClientRect();
        b.style.setProperty("--x", e.clientX - r.left + "px");
        b.style.setProperty("--y", e.clientY - r.top + "px");
      },
      true,
    );
  });

  function pkLang() {
    document.getElementById("pkTalk").href = talkMail();
    document.getElementById("pkMail").href = "mailto:" + PR.email;
    pkGoals.setAttribute("aria-label", TT("pk_ask"));
    /* "From …" lines in the services section, taken from the plan prices */
    [].forEach.call(document.querySelectorAll("[data-from]"), function (el) {
      var pl = planById(el.dataset.from);
      el.textContent = pl ? TT("pk_from") + " " + formatMoney(pl.price) : "";
    });
    renderGoals();
    renderPlans();
    renderFaq();
  }
  pkLang();

  /* ================= estimator ================= */
  var ES = window.ESTIMATOR,
    EU = ES.ui;
  var esEl = document.getElementById("es"),
    esBody = document.getElementById("esBody"),
    esProg = document.getElementById("esProg"),
    esBack = document.getElementById("esBack"),
    esNext = document.getElementById("esNext"),
    esDock = document.getElementById("esDock"),
    esCnt = document.getElementById("esCnt"),
    esSide = document.getElementById("esSide");
  var E0 = function () {
    return {
      type: null,
      size: null,
      feats: [],
      dsg: null,
      cnt: null,
      time: null,
      step: "type",
      done: {},
      name: "",
      email: "",
      msg: "",
      sent: false,
    };
  };
  var E = E0(),
    esLast = null,
    esKeys = {},
    esAdv = null;
  var IC = {
    page: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    pages:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="15" rx="3"/><path d="M8 3h10a3 3 0 0 1 3 3v10"/><path d="M7 11h5M7 15h3"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="11" width="8" height="10" rx="2"/><rect x="3" y="14" width="8" height="7" rx="2"/></svg>',
    loop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14-4M4 5v4h4"/><path d="M4 13a8 8 0 0 0 14 4m2 2v-4h-4"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 17h.01"/></svg>',
  };
  function eu(k) {
    return L(EU[k]);
  }
  function ef(s, o) {
    return s.replace(/\{(\w+)\}/g, function (m, k) {
      return o[k] == null ? m : o[k];
    });
  }
  function eType() {
    return ES.types.filter(function (t) {
      return t.id === E.type;
    })[0];
  }
  function eFam() {
    var t = eType();
    return t && t.fam ? ES.fams[t.fam] : null;
  }
  function eSteps() {
    return E.type === "unsure"
      ? ["type", "result"]
      : ["type", "size", "feats", "design", "time", "result"];
  }
  function eRound(n, up) {
    var st = n < 1000 ? 10 : 50;
    return (up ? Math.ceil(n / st) : Math.floor(n / st)) * st;
  }

  function eCalc(st) {
    var t = ES.types.filter(function (x) {
      return x.id === st.type;
    })[0];
    if (!t || !t.base) return null;
    var f = ES.fams[t.fam],
      lines = [{ k: "base", t: L(t.t), a: t.base, base: 1 }],
      sub = t.base,
      wk = t.wk,
      o;
    function add(k, o) {
      sub += o.p;
      wk += o.w || 0;
      if (o.p) lines.push({ k: k, t: L(o.t), a: o.p });
    }
    if (st.size != null) add("s", t.size[st.size]);
    (st.feats || []).forEach(function (i) {
      add("f" + i, f.feats[i]);
    });
    if (st.dsg != null) add("d", f.dsg[st.dsg]);
    if (st.cnt != null) add("c", f.cnt[st.cnt]);
    var total = sub,
      m = 1;
    if (st.time != null) {
      o = ES.time[st.time];
      if (o.m) {
        var a = Math.round((sub * o.m) / 10) * 10;
        total += a;
        lines.push({ k: "t", t: L(o.t), a: a });
      }
      m = o.wm;
    }
    var minP =
      t.base +
      Math.min.apply(
        null,
        t.size.map(function (x) {
          return x.p;
        }),
      );
    total = Math.max(total, minP);
    var p = Math.min(1, Object.keys(st.done).length / 5);
    var lo = eRound(total * (1 - (0.06 + 0.14 * (1 - p))), 0),
      hi = eRound(total * (1 + (0.14 + 0.36 * (1 - p))), 1);
    lo = Math.min(Math.max(lo, minP), total);
    hi = Math.max(hi, total);
    return {
      lines: lines,
      total: total,
      lo: lo,
      hi: hi,
      wk: Math.max(0.6, wk) * m,
      p: p,
    };
  }
  function eSpan(wk) {
    var d = wk * 5,
      lo = d * 0.85,
      hi = d * 1.3;
    if (hi <= 14) {
      var a = Math.max(2, Math.round(lo)),
        b = Math.max(a + 1, Math.round(hi));
      return a + "–" + b + " " + eu("u_days");
    }
    var a2 = Math.max(1, Math.round(lo / 5)),
      b2 = Math.max(a2 + 1, Math.ceil(hi / 5));
    return a2 + "–" + b2 + " " + eu("u_weeks");
  }
  function eSgn(n) {
    return (n < 0 ? "−" : "+") + fmt(Math.abs(n));
  }

  /* ---- fit + tween ---- */
  function eFit(els) {
    var min = 1e9;
    els.forEach(function (el) {
      el.style.fontSize = "";
    });
    els.forEach(function (el) {
      el.classList.add("fit-now");
      var s = parseFloat(getComputedStyle(el).fontSize);
      while (
        el.clientWidth > 0 &&
        el.scrollWidth > el.clientWidth + 1 &&
        s > 14
      ) {
        s--;
        el.style.fontSize = s + "px";
      }
      el.classList.remove("fit-now");
      if (s < min) min = s;
    });
    els.forEach(function (el) {
      el.style.fontSize = min + "px";
    });
  }
  function eTw(el, to, pre, done) {
    if (el._r) cancelAnimationFrame(el._r);
    var from = el._v == null ? to : el._v,
      t0 = performance.now(),
      tx = function (v) {
        return (pre || "") + fmt(v);
      };
    if (reduce || from === to) {
      el._v = to;
      el.textContent = tx(to);
      if (done) done();
      return;
    }
    (function f(n) {
      var p = Math.min(1, (n - t0) / 600),
        e = 1 - Math.pow(1 - p, 3),
        v = Math.round(from + (to - from) * e);
      el._v = v;
      el.textContent = tx(v);
      if (p < 1) el._r = requestAnimationFrame(f);
      else if (done) done();
    })(t0);
  }

  /* ---- live panel ---- */
  function eQ(k) {
    return [].slice.call(esEl.querySelectorAll('[data-es="' + k + '"]'));
  }
  function eUpd() {
    var c = E.type && E.type !== "unsure" ? eCalc(E) : null,
      unsure = E.type === "unsure",
      R = E.step === "result";
    var bigs = eQ("big"),
      los = eQ("lo"),
      his = eQ("hi");
    bigs.forEach(function (b) {
      b.classList.toggle("empty", !c && !unsure);
    });
    function fitAll() {
      los.forEach(function (lo, i) {
        eFit([lo, his[i]]);
      });
    }
    if (c) {
      los.forEach(function (el) {
        eTw(el, c.lo, "", fitAll);
      });
      his.forEach(function (el) {
        eTw(el, c.hi, "– ", fitAll);
      });
    } else {
      los.forEach(function (el) {
        el._v = null;
        el.textContent = unsure ? eu("talk") : "€ – –";
        el.style.fontSize = "";
      });
      his.forEach(function (el) {
        el._v = null;
        el.textContent = unsure ? "" : "€ – –";
        el.style.display = unsure ? "none" : "";
        el.style.fontSize = "";
      });
    }
    if (c)
      his.forEach(function (el) {
        el.style.display = "";
      });
    eQ("range").forEach(function (el) {
      el.textContent = c
        ? fmt(c.lo) + " – " + fmt(c.hi)
        : unsure
          ? eu("talk")
          : "€ – –";
    });
    eQ("time").forEach(function (el) {
      el.textContent = c ? eSpan(c.wk) : "–";
    });
    eQ("acc").forEach(function (el) {
      el.style.setProperty("--a", c ? c.p : 0);
    });
    eQ("note").forEach(function (el) {
      el.textContent = unsure
        ? eu("hintu")
        : !c
          ? eu("hint0")
          : c.p >= 1
            ? eu("hint2")
            : eu("hint1");
    });
    eQ("lines").forEach(function (ul) {
      var keys = {},
        h = "";
      if (!c) {
        ul.innerHTML = unsure
          ? ""
          : '<li class="es-empty" style="border:0;padding:0">' +
            esc(eu("hint0")) +
            "</li>";
        ul.style.display = unsure ? "none" : "";
        return;
      }
      ul.style.display = "";
      c.lines.forEach(function (l) {
        keys[l.k] = 1;
        h +=
          '<li class="' +
          (l.base ? "base " : "") +
          (l.a < 0 ? "neg " : "") +
          (esKeys[l.k] ? "" : "new") +
          '"><span>' +
          esc(l.t) +
          "</span><b>" +
          (l.base ? esc(eu("base")) + " " + fmt(l.a) : eSgn(l.a)) +
          "</b></li>";
      });
      ul.innerHTML = h;
    });
    var nk = {};
    if (c)
      c.lines.forEach(function (l) {
        nk[l.k] = 1;
      });
    esKeys = nk;
    eQ("time").forEach(function (el) {
      if (el.parentNode.classList.contains("es-time"))
        el.parentNode.style.display = c ? "" : "none";
    });
    esDock.hidden = R || (E.step === "type" && !c);
    if (E.step === "type" && !c) esDock.classList.remove("open");
  }

  /* ---- step renderers ---- */
  function oHTML(o, i, kind, sel, extra) {
    var on = kind === "f" ? E.feats.indexOf(i) > -1 : sel === i;
    var chip =
      extra && o.p != null && kind === "f"
        ? '<span class="es-op">' + esc(eSgn(o.p)) + "</span>"
        : "";
    return (
      '<button type="button" class="es-o" role="' +
      (kind === "f" ? "checkbox" : "radio") +
      '" aria-checked="' +
      on +
      '" data-a="' +
      kind +
      '" data-i="' +
      i +
      '" style="--i:' +
      i +
      '">' +
      '<span class="es-kb">' +
      (i + 1) +
      "</span>" +
      (o.ic ? '<span class="es-ic">' + IC[o.ic] + "</span>" : "") +
      '<span class="es-ot"><b>' +
      esc(L(o.t)) +
      "</b>" +
      (o.d ? "<small>" + esc(L(o.d)) + "</small>" : "") +
      "</span>" +
      chip +
      '<span class="es-ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span></button>'
    );
  }
  function head(q, s, k) {
    return (
      (k ? '<div class="es-k">' + esc(k) + "</div>" : "") +
      '<h2 class="es-h" id="esT" tabindex="-1">' +
      esc(eu(q)) +
      "</h2>" +
      (s ? '<p class="es-sub">' + esc(eu(s)) + "</p>" : "")
    );
  }
  function eStepHTML() {
    var s = E.step,
      t = eType(),
      f = eFam(),
      h = "",
      i;
    if (s === "type") {
      h =
        head("q_type", "q_type_s") +
        '<div class="es-opts two" role="radiogroup" aria-labelledby="esT">' +
        ES.types
          .map(function (o, i) {
            return oHTML(o, i, "type", ES.types.indexOf(eType()));
          })
          .join("") +
        "</div>";
    } else if (s === "size") {
      h =
        '<h2 class="es-h" id="esT" tabindex="-1">' +
        esc(L(t.sq)) +
        '</h2><p class="es-sub">' +
        esc(eu("q_type_s")) +
        '</p><div class="es-opts" role="radiogroup" aria-labelledby="esT">' +
        t.size
          .map(function (o, i) {
            return oHTML(o, i, "size", E.size);
          })
          .join("") +
        "</div>";
    } else if (s === "feats") {
      h =
        head("q_feat", "q_feat_s") +
        '<div class="es-opts two" role="group" aria-labelledby="esT">' +
        f.feats
          .map(function (o, i) {
            return oHTML(o, i, "f", null, 1);
          })
          .join("") +
        "</div>";
    } else if (s === "design") {
      h =
        head("q_dsg", "q_dsg_s") +
        '<div class="es-grp"><div class="es-gl">' +
        esc(eu("g_dsg")) +
        '</div><div class="es-opts" role="radiogroup">' +
        f.dsg
          .map(function (o, i) {
            return oHTML(o, i, "dsg", E.dsg);
          })
          .join("") +
        "</div></div>" +
        '<div class="es-grp"><div class="es-gl">' +
        esc(L(f.cq)) +
        '</div><div class="es-opts" role="radiogroup">' +
        f.cnt
          .map(function (o, i) {
            return oHTML(o, i, "cnt", E.cnt);
          })
          .join("") +
        "</div></div>";
    } else if (s === "time") {
      h =
        head("q_time", "q_time_s") +
        '<div class="es-opts" role="radiogroup" aria-labelledby="esT">' +
        ES.time
          .map(function (o, i) {
            return oHTML(o, i, "time", E.time);
          })
          .join("") +
        "</div>";
    } else {
      var un = E.type === "unsure";
      h = head(un ? "q_unsure" : "q_res", un ? "q_unsure_s" : "q_res_s");
      if (!un)
        h +=
          '<div class="es-sum"><div class="es-lbl"><span data-es-t="est_l"></span><span data-es="time" class="es-rt"></span></div><div class="es-big" data-es="big"><b data-es="lo"></b><b data-es="hi"></b></div><ul class="es-lines" data-es="lines"></ul></div>';
      h += E.sent ? okHTML() : formHTML(un);
    }
    return h;
  }
  function formHTML(un) {
    return (
      '<form class="es-form" novalidate>' +
      '<div class="es-f"><label for="esN">' +
      esc(eu("f_name")) +
      '</label><input id="esN" name="name" autocomplete="name" value="' +
      esc(E.name) +
      '"><span class="es-err" id="esNe"></span></div>' +
      '<div class="es-f"><label for="esM">' +
      esc(eu("f_mail")) +
      '</label><input id="esM" name="email" type="email" autocomplete="email" inputmode="email" value="' +
      esc(E.email) +
      '"><span class="es-err" id="esMe"></span></div>' +
      '<div class="es-f full"><label for="esG">' +
      esc(eu("f_msg")) +
      '</label><textarea id="esG" name="msg" rows="2">' +
      esc(E.msg) +
      "</textarea></div>" +
      '<div class="full"><button type="submit" class="cta btn btn-p es-send"><span class="fill"></span><span class="roll" data-t="' +
      esc(eu(un ? "sendu" : "send")) +
      '"><span>' +
      esc(eu(un ? "sendu" : "send")) +
      '</span></span><span class="ico">' +
      AR2 +
      AR2 +
      "</span></button></div>" +
      '<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" hidden>' +
      '<p class="es-err es-serr full" id="esSe" role="alert"></p>' +
      '<p class="es-fine full">' +
      esc(eu("fine")) +
      "</p>" +
      '<div class="es-alt full"><button type="button" class="es-lk" data-a="wa">' +
      esc(eu("wa")) +
      '</button><button type="button" class="es-lk" data-a="mail">' +
      esc(eu("mail")) +
      '</button><button type="button" class="es-lk" data-a="copy">' +
      esc(eu("copy")) +
      '</button><button type="button" class="es-lk" data-a="reset">' +
      esc(eu("reset")) +
      "</button></div></form>"
    );
  }
  function okHTML() {
    return (
      '<div class="es-ok"><span class="es-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><h3>' +
      esc(
        ef(eu(E.sent === "api" ? "ok_h2" : "ok_h"), {
          name: E.name.split(" ")[0],
        }),
      ) +
      "</h3><p>" +
      esc(
        E.sent === "api"
          ? ef(eu("ok_p2"), { email: E.email })
          : ef(eu("ok_p"), { email: PR.email }),
      ) +
      "</p>" +
      '<div class="es-alt"><button type="button" class="es-lk" data-a="wa">' +
      esc(eu("wa")) +
      '</button><button type="button" class="es-lk" data-a="copy">' +
      esc(eu("copy")) +
      '</button><button type="button" class="es-lk" data-a="reset">' +
      esc(eu("reset")) +
      "</button></div></div>"
    );
  }

  function eRender(dir, focus) {
    esBody.innerHTML =
      '<div class="es-step' +
      (dir < 0 ? " back" : "") +
      '">' +
      eStepHTML() +
      "</div>";
    esBody.scrollTop = 0;
    var st = eSteps(),
      idx = st.indexOf(E.step),
      n = st.length - 1;
    esEl.querySelectorAll("[data-es-t]").forEach(function (el) {
      el.textContent = eu(el.dataset.esT);
    });
    esEl.querySelectorAll("[data-es-al]").forEach(function (el) {
      el.setAttribute("aria-label", eu(el.dataset.esAl));
    });
    esCnt.textContent =
      E.step === "result" ? eu("ready") : ef(eu("step"), { n: idx + 1, m: n });
    esProg.innerHTML = st
      .map(function (s, i) {
        var on = i < idx,
          go = on && !E.sent;
        return (
          '<button type="button" tabindex="-1" aria-hidden="true" class="' +
          (on ? "on go" : i === idx ? "now" : "") +
          '" data-g="' +
          s +
          '"></button>'
        );
      })
      .join("");
    esBack.textContent = eu("back");
    esBack.hidden = idx === 0;
    eBtn();
    eUpd();
    if (focus !== false) {
      var h = esBody.querySelector("#esT");
      if (h) h.focus({ preventScroll: true });
    }
  }
  function eReady() {
    var s = E.step;
    if (s === "type") return E.type != null;
    if (s === "size") return E.size != null;
    if (s === "design") return E.dsg != null && E.cnt != null;
    if (s === "time") return E.time != null;
    return true;
  }
  function eBtn() {
    var s = E.step,
      lab = esNext.querySelector("span");
    esNext.hidden = s === "result";
    esNext.disabled = !eReady();
    lab.textContent =
      s === "feats"
        ? eu(E.feats.length ? "next" : "skip")
        : s === "time"
          ? eu("see")
          : eu("next");
  }
  function eGo(step, dir) {
    E.step = step;
    eRender(dir);
  }
  function eNext() {
    var st = eSteps(),
      i = st.indexOf(E.step);
    if (!eReady() || i >= st.length - 1) return;
    E.done[E.step] = 1;
    eGo(st[i + 1], 1);
  }
  function eBackF() {
    var st = eSteps(),
      i = st.indexOf(E.step);
    if (i > 0) eGo(st[i - 1], -1);
  }
  function eAuto() {
    clearTimeout(esAdv);
    if (eReady())
      esAdv = setTimeout(
        function () {
          if (esEl.classList.contains("open") && eReady()) eNext();
        },
        reduce ? 120 : 420,
      );
  }
  function ePick(a, i) {
    var t;
    if (a === "type") {
      var id = ES.types[i].id;
      if (E.type !== id) {
        E.type = id;
        E.size = null;
        E.feats = [];
        E.dsg = null;
        E.cnt = null;
        E.time = null;
        E.done = {};
      }
    } else if (a === "size") E.size = i;
    else if (a === "f") {
      var k = E.feats.indexOf(i);
      if (k > -1) E.feats.splice(k, 1);
      else E.feats.push(i);
      E.feats.sort(function (x, y) {
        return x - y;
      });
    } else if (a === "dsg") E.dsg = i;
    else if (a === "cnt") E.cnt = i;
    else if (a === "time") E.time = i;
    /* update selection state in place (no re-render = no flicker) */
    [].forEach.call(
      esBody.querySelectorAll('.es-o[data-a="' + a + '"]'),
      function (b) {
        var on =
          a === "f" ? E.feats.indexOf(+b.dataset.i) > -1 : +b.dataset.i === i;
        b.setAttribute("aria-checked", on);
      },
    );
    if (
      a === "type" ||
      a === "size" ||
      a === "f" ||
      a === "dsg" ||
      a === "cnt" ||
      a === "time"
    ) {
      var ds = {
        type: "type",
        size: "size",
        dsg: "design",
        cnt: "design",
        time: "time",
      };
      if (ds[a] && a !== "dsg" && a !== "cnt") E.done[ds[a]] = 1;
      if (a === "dsg" || a === "cnt") {
        if (E.dsg != null && E.cnt != null) E.done.design = 1;
      }
    }
    eBtn();
    eUpd();
    if (a !== "f") eAuto();
  }

  /* ---- summary + mail ---- */
  function eSummary() {
    var t = eType(),
      c = eCalc(E),
      o = [eu("s_title"), ""];
    o.push(eu("s_type") + ": " + L(t.t));
    if (c) {
      c.lines.forEach(function (l) {
        if (!l.base) o.push("- " + l.t + " (" + eSgn(l.a) + ")");
      });
      o.push(
        "",
        eu("s_range") + ": " + fmt(c.lo) + " – " + fmt(c.hi),
        eu("s_time") + ": " + eSpan(c.wk),
      );
    }
    o.push("", eu("s_name") + ": " + E.name, eu("s_mail") + ": " + E.email);
    if (E.msg.trim()) o.push("", eu("s_msg") + ":", E.msg.trim());
    return o.join("\n");
  }
  function eSubmit(form) {
    var n = form.elements.name.value.trim(),
      m = form.elements.email.value.trim(),
      g = form.elements.msg.value,
      ok = true;
    E.name = n;
    E.email = m;
    E.msg = g;
    var ne = form.querySelector("#esNe"),
      me = form.querySelector("#esMe");
    form.elements.name.setAttribute("aria-invalid", !n);
    ne.textContent = n ? "" : eu("e_name");
    if (!n) ok = false;
    var vm = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m);
    form.elements.email.setAttribute("aria-invalid", !vm);
    me.textContent = vm ? "" : eu("e_mail");
    if (!vm) ok = false;
    if (!ok) {
      (n ? form.elements.email : form.elements.name).focus();
      return;
    }
    /* window.FORM.key set: the request is posted to the form service and lands
       in your inbox. No key (or the request fails): the visitor's own email
       app opens with everything filled in, as before. */
    var key = (window.FORM && window.FORM.key) || "",
      sub = eu("s_title") + ": " + L(eType().t);
    if (!key) {
      eDone("mail");
      location.href = mailHref(sub, eSummary());
      return;
    }
    var btn = form.querySelector(".es-send"),
      se = form.querySelector("#esSe"),
      lbl = btn.querySelector(".roll span"),
      old = lbl.textContent;
    if (btn.disabled) return;
    btn.disabled = true;
    se.textContent = "";
    lbl.textContent = eu("sending");
    var fail = function () {
      btn.disabled = false;
      lbl.textContent = old;
      se.textContent = eu("e_send");
    };
    fetch(window.FORM.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: sub,
        from_name: n,
        name: n,
        email: m,
        replyto: m,
        message: eSummary(),
        botcheck: form.elements.botcheck.checked,
      }),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        if (j && j.success) eDone("api");
        else fail();
      })
      .catch(fail);
  }
  function eDone(how) {
    E.sent = how;
    eRender(1, false);
    var h = esBody.querySelector(".es-ok h3");
    if (h) {
      h.setAttribute("tabindex", "-1");
      h.focus({ preventScroll: true });
    }
  }

  /* ---- open / close ---- */
  function eOpen() {
    if (esEl.classList.contains("open")) return;
    esLast = document.activeElement;
    esEl.inert = false;
    document.documentElement.classList.add("es-lock");
    eRender(1, false);
    requestAnimationFrame(function () {
      esEl.classList.add("open");
      setTimeout(function () {
        var h = esBody.querySelector("#esT");
        if (h) h.focus({ preventScroll: true });
      }, 80);
    });
    routePush("#estimate");
  }
  function eClose() {
    if (!esEl.classList.contains("open")) return;
    clearTimeout(esAdv);
    esEl.classList.remove("open");
    esEl.inert = true;
    document.documentElement.classList.remove("es-lock");
    if (esLast && esLast.focus) esLast.focus({ preventScroll: true });
    routeClear();
  }
  document.addEventListener("click", function (e) {
    var o = e.target.closest && e.target.closest("[data-es-open]");
    if (o) {
      e.preventDefault();
      eOpen();
      return;
    }
    if (e.target.closest && e.target.closest("[data-es-close]")) eClose();
  });
  esBody.addEventListener("click", function (e) {
    var b = e.target.closest(".es-o");
    if (b) {
      ePick(b.dataset.a, +b.dataset.i);
      return;
    }
    var a = e.target.closest("[data-a]");
    if (!a) return;
    if (a.dataset.a === "reset") {
      clearTimeout(esAdv);
      E = E0();
      esKeys = {};
      eRender(-1);
    } else if (a.dataset.a === "mail") {
      location.href = mailHref(
        eu("s_title") + ": " + L(eType().t),
        eSummary(),
      );
    } else if (a.dataset.a === "wa") {
      window.open(waHref(eSummary()), "_blank", "noopener");
    } else if (a.dataset.a === "copy") {
      var done = function () {
        a.textContent = eu("copied");
        setTimeout(function () {
          a.textContent = eu("copy");
        }, 1800);
      };
      try {
        navigator.clipboard.writeText(eSummary()).then(done, done);
      } catch (x) {
        done();
      }
    }
  });
  esBody.addEventListener("submit", function (e) {
    e.preventDefault();
    eSubmit(e.target);
  });
  esBody.addEventListener("input", function (e) {
    var t = e.target;
    if (t.name === "name") E.name = t.value;
    else if (t.name === "email") E.email = t.value;
    else if (t.name === "msg") E.msg = t.value;
    if (t.getAttribute("aria-invalid") === "true") {
      t.setAttribute("aria-invalid", "false");
      var er = t.parentNode.querySelector(".es-err");
      if (er) er.textContent = "";
    }
  });
  esProg.addEventListener("click", function (e) {
    var b = e.target.closest(".go");
    if (b && !E.sent) {
      clearTimeout(esAdv);
      eGo(b.dataset.g, -1);
    }
  });
  esNext.addEventListener("click", function () {
    clearTimeout(esAdv);
    eNext();
  });
  esBack.addEventListener("click", function () {
    clearTimeout(esAdv);
    eBackF();
  });
  esDock.querySelector(".es-dk").addEventListener("click", function () {
    var on = !esDock.classList.contains("open");
    esDock.classList.toggle("open", on);
    this.setAttribute("aria-expanded", on);
  });
  document.addEventListener(
    "keydown",
    function (e) {
      if (!esEl.classList.contains("open")) return;
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        eClose();
        return;
      }
      if (e.key === "Tab") {
        var f = [].filter.call(
          esEl.querySelectorAll("button,input,textarea,a[href]"),
          function (x) {
            return (
              !x.disabled &&
              !x.hidden &&
              x.tabIndex >= 0 &&
              x.offsetParent !== null
            );
          },
        );
        if (!f.length) return;
        var a = f[0],
          z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a.focus();
        }
        return;
      }
      var tg = e.target.tagName;
      if (
        tg === "INPUT" ||
        tg === "TEXTAREA" ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return;
      if (/^[1-9]$/.test(e.key)) {
        var b = esBody.querySelectorAll(".es-o")[+e.key - 1];
        if (b) {
          e.preventDefault();
          b.click();
        }
      } else if (
        e.key === "Enter" &&
        tg !== "BUTTON" &&
        !esNext.disabled &&
        !esNext.hidden
      ) {
        e.preventDefault();
        clearTimeout(esAdv);
        eNext();
      }
    },
    true,
  );
  window.addEventListener("resize", function () {
    if (esEl.classList.contains("open")) eUpd();
  });

  /* ---- language ---- */
  function esLang() {
    esEl.querySelectorAll("[data-es-t]").forEach(function (el) {
      el.textContent = eu(el.dataset.esT);
    });
    esEl.querySelectorAll("[data-es-al]").forEach(function (el) {
      el.setAttribute("aria-label", eu(el.dataset.esAl));
    });
    if (esEl.classList.contains("open")) eRender(1, false);
    miInit();
  }

  /* ---- mini calculator in the band ---- */
  var miL = document.getElementById("emL"),
    miT = document.getElementById("emT"),
    miH = document.getElementById("emH"),
    miS = document.getElementById("emS"),
    miI = 0,
    miTm = null,
    miVis = false;
  function miDraw() {
    var sc = ES.mini[miI % ES.mini.length],
      st = {
        type: sc.type,
        size: sc.size,
        feats: sc.feats,
        dsg: sc.dsg,
        cnt: sc.cnt,
        time: sc.time,
        done: { a: 1, b: 1, c: 1, d: 1, e: 1 },
      },
      c = eCalc(st),
      rows = c.lines.slice(0, 4);
    miL.innerHTML = rows
      .map(function (l, i) {
        return (
          '<li style="--i:' +
          i +
          '"><span>' +
          esc(l.t) +
          "</span><b>" +
          (l.base ? esc(eu("base")) + " " + fmt(l.a) : esc(eSgn(l.a))) +
          "</b></li>"
        );
      })
      .join("");
    eTw(miT, c.total, "≈ ");
  }
  function miInit() {
    miH.textContent = eu("mini_h");
    miS.textContent = eu("est");
    miDraw();
  }
  function miTick() {
    clearInterval(miTm);
    if (reduce || !miVis) return;
    miTm = setInterval(function () {
      miI++;
      miDraw();
    }, 3400);
  }
  if (document.getElementById("esMini")) {
    new IntersectionObserver(
      function (en) {
        miVis = en[0].isIntersecting;
        miTick();
      },
      { threshold: 0.2 },
    ).observe(document.getElementById("esMini"));
  }
  esLang();

  /* ================= footer ================= */
  var FT = window.FOOTER,
    ftCols = document.getElementById("ftCols"),
    ftLegal = document.getElementById("ftLegal");
  var FAR =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  var FWA =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  function waHref(text) {
    var n = String(FT.whatsapp || "").replace(/\D/g, "");
    return (
      "https://wa.me/" + n + "?text=" + encodeURIComponent(text || L(FT.waText))
    );
  }
  function waLang() {
    var t = T[curLang || "en"];
    ["wa", "menuWa", "ftWa"].forEach(function (id) {
      var a = document.getElementById(id);
      if (a) a.href = waHref();
    });
    document.getElementById("waT").textContent = t.wa_t;
    document.getElementById("menuWaT").textContent = t.wa_t;
    document.getElementById("ftWaT").textContent = t.wa_t;
    document.getElementById("wa").setAttribute("aria-label", t.wa_t);
  }
  function ftLinks(arr) {
    return arr
      .map(function (l) {
        if (l.wa)
          return (
            '<li><a class="wa-link" href="' +
            esc(waHref()) +
            '" target="_blank" rel="noopener noreferrer">' +
            FWA +
            esc(L(l.t)) +
            "</a></li>"
          );
        if (!l.href) return "<li><span>" + esc(L(l.t)) + "</span></li>";
        return (
          '<li><a href="' +
          esc(l.href) +
          '"' +
          (l.ext ? ' target="_blank" rel="noopener noreferrer"' : "") +
          (l.estimator ? " data-es-open" : "") +
          ">" +
          esc(L(l.t)) +
          (l.ext ? FAR : "") +
          "</a></li>"
        );
      })
      .join("");
  }
  function ftLang() {
    var t = T[curLang || "en"];
    ftCols.innerHTML =
      '<div class="ft-col"><h4>' +
      esc(t.ft_c1) +
      "</h4><ul>" +
      ftLinks(FT.nav) +
      "</ul></div>" +
      '<div class="ft-col"><h4>' +
      esc(t.ft_c2) +
      "</h4><ul>" +
      ftLinks(FT.services) +
      "</ul></div>" +
      '<div class="ft-col"><h4>' +
      esc(t.ft_c3) +
      "</h4><ul>" +
      ftLinks(FT.contact) +
      "</ul></div>";
    ftLegal.innerHTML = FT.legal
      .map(function (l) {
        return '<a href="' + esc(ROOT + l.href) + '">' + esc(L(l.t)) + "</a>";
      })
      .join("");
    document.getElementById("ftMade").textContent =
      "© " + new Date().getFullYear() + " " + FT.name + " · " + t.ft_made;
    document.getElementById("ftMailT").textContent = ftCopied
      ? t.ft_copied
      : FT.email;
    document.getElementById("ftStart").href = "#pricing";
    waLang();
  }
  var ftCopied = false;
  document.getElementById("ftCopy").addEventListener("click", function () {
    var done = function () {
      ftCopied = true;
      document.getElementById("ftMailT").textContent =
        T[curLang || "en"].ft_copied;
      setTimeout(function () {
        ftCopied = false;
        document.getElementById("ftMailT").textContent = FT.email;
      }, 1800);
    };
    try {
      navigator.clipboard.writeText(FT.email).then(done, function () {
        location.href = "mailto:" + FT.email;
      });
    } catch (e) {
      location.href = "mailto:" + FT.email;
    }
  });
  document.getElementById("ftUp").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  document.getElementById("ftStart").addEventListener("click", function (e) {
    e.preventDefault();
    jump("pricing");
  });
  [].forEach.call(document.querySelectorAll(".ft-rise,.ft-mark"), function (n) {
    ioIn.observe(n);
  });
  ftLang();
  (function () {
    var w = document.getElementById("wa");
    setTimeout(
      function () {
        w.classList.add("on");
        var seen = false;
        try {
          seen = sessionStorage.getItem("wah");
        } catch (e) {}
        if (!seen && fine && !reduce) {
          setTimeout(function () {
            w.classList.add("hint");
            setTimeout(function () {
              w.classList.remove("hint");
            }, 4200);
            try {
              sessionStorage.setItem("wah", "1");
            } catch (e) {}
          }, 1200);
        }
      },
      document.getElementById("pre") ? 2600 : 900,
    );
  })();
  function ftFit() {
    var m = document.getElementById("ftMark"),
      w = m.parentNode;
    m.style.fontSize = "";
    var cw = w.clientWidth - 44,
      s = parseFloat(getComputedStyle(m).fontSize),
      r = document.createRange();
    r.selectNodeContents(m);
    var tw = r.getBoundingClientRect().width;
    if (tw > 0 && cw > 0) m.style.fontSize = ((s * cw) / tw) * 0.99 + "px";
  }
  ftFit();
  window.addEventListener("resize", ftFit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ftFit);

  /* ================= keep big headlines inside their column =================
     Syne ExtraBold is very wide, long words (E-commerce, Web-Anwendungen,
     Unternehmenswebsite ...) would be clipped. Each headline shrinks until the
     text of EVERY language fits (see fitHeads), so its size is the same in DE/EN/TR. */
  var FITS = [
    { s: ".svc-t", g: 1 },
    { s: ".svc-h" },
    { s: ".ft-h" },
    { s: ".pk-cu h3" },
    { s: ".es-band h3" },
    { s: ".pk-faq h3" },
    { s: ".wy-e1" },
    { s: ".wy-t h3", g: 1 },
    { s: ".card-t" },
    { s: ".pk-n", g: 1 },
    { s: ".hero h1" },
    { s: ".mask>span", g: 1 },
  ];
  function fOver(el) {
    if (el.scrollWidth > el.clientWidth + 1) return true;
    var k = el.querySelectorAll("*"),
      i,
      d;
    for (i = 0; i < k.length; i++) {
      if (k[i].scrollWidth > k[i].clientWidth + 1) {
        d = getComputedStyle(k[i]).display;
        if (d !== "inline" && d !== "contents") return true;
      }
    }
    return false;
  }
  function fOne(el) {
    el.classList.add("fit-now");
    el.style.fontSize = "";
    if (!el.clientWidth) {
      el.classList.remove("fit-now");
      return 0;
    }
    var s = parseFloat(getComputedStyle(el).fontSize),
      n = 0,
      s0 = s;
    while (fOver(el) && s > 14 && n < 60) {
      s *= 0.965;
      el.style.fontSize = s + "px";
      n++;
    }
    el.classList.remove("fit-now");
    return n ? s : 0;
  }
  /* hero cards: the second title line must stop before the lime chip that
     overlaps the card corner (layout offsets, so the 3D tilt does not matter) */
  function offIn(el, root) {
    var x = 0;
    while (el && el !== root) {
      x += el.offsetLeft;
      el = el.offsetParent;
    }
    return el === root ? x : null;
  }
  function chipClear() {
    var tilt = document.getElementById("tilt"),
      chip = tilt && tilt.querySelector(".chip");
    [].forEach.call(document.querySelectorAll(".card-t em"), function (em) {
      em.style.maxWidth = "";
      if (!chip || !em.clientWidth) return;
      var a = offIn(em, tilt),
        b = offIn(chip, tilt);
      if (a != null && b != null && b > a)
        em.style.maxWidth = Math.max(80, b - a - 12) + "px";
    });
  }
  /* SAME SIZE IN EVERY LANGUAGE: all translatable texts are switched to each
     language in turn and every headline is measured; each headline then gets
     the smallest size that fits all languages, so switching the language never
     changes its size or height. The texts are put back in the same task, so
     nothing of this is ever painted. */
  function fSet(el, v) {
    el.classList.add("fit-now");
    el.style.fontSize = v ? v + "px" : "";
    el.classList.remove("fit-now");
  }
  function fitHeads() {
    chipClear();
    var langs = I18N.langs,
      tx = [].slice.call(document.querySelectorAll("[data-i18n]")),
      keep = tx.map(function (x) {
        return x.textContent;
      }),
      rt = document.getElementById("rot"),
      rk = rt ? [].slice.call(rt.childNodes) : [],
      sets = FITS.map(function (f) {
        return [].slice.call(document.querySelectorAll(f.s));
      }),
      need = sets.map(function (els) {
        return els.map(function () {
          return Infinity;
        });
      });
    langs.forEach(function (l) {
      if (langs.length > 1) {
        /* lang drives hyphenation and Turkish upper case, so it switches too */
        document.documentElement.lang = l;
        tx.forEach(function (x) {
          x.textContent = T[l][x.dataset.i18n];
        });
        if (rt)
          rt.innerHTML = T[l].words
            .map(function (w) {
              return "<span>" + esc(w) + "</span>";
            })
            .join("");
      }
      sets.forEach(function (els, i) {
        els.forEach(function (el, j) {
          var s = fOne(el);
          if (s && s < need[i][j]) need[i][j] = s;
        });
      });
    });
    if (langs.length > 1) {
      document.documentElement.lang = curLang;
      tx.forEach(function (x, i) {
        x.textContent = keep[i];
      });
      if (rt) {
        rt.innerHTML = "";
        rk.forEach(function (n) {
          rt.appendChild(n);
        });
      }
    }
    sets.forEach(function (els, i) {
      var m = Math.min.apply(null, need[i]);
      els.forEach(function (el, j) {
        var v = FITS[i].g ? m : need[i][j];
        fSet(el, isFinite(v) ? v : 0);
      });
    });
  }
  var fitT;
  function fitSoon(d) {
    clearTimeout(fitT);
    fitT = setTimeout(fitHeads, d || 120);
  }
  window.addEventListener("resize", function () {
    fitSoon(150);
  });
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(function () {
      fitHeads();
    });
  window.addEventListener("load", function () {
    fitHeads();
  });
  fitHeads();
  window.__wkReady = true;
  onLang();
  routeApply();
  onScroll();
})();
