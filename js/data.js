/* ==========================================================================
   PROJECTS  -  this is the ONLY place you edit to add or change portfolio work.
   To add a project: copy one object below, paste it where it should appear,
   and change the fields. Texts are ['English','Deutsch','Türkçe'] triples.

   status: 'live'    = a real client project
           'concept' = our own work for a fictional brand. The page then says
                       "Fictional brand · Concept project" instead of a client,
                       and shows `idea` where a testimonial would be.
   cat   : 'web' | 'shop' | 'app', or a list like ['web','app']
           (filter buttons and their counts build themselves)
   shot  : file stem of the screenshots in img/work/ (see README)
   dark  : true = dark browser frame around the screenshot
   art   : only without a shot: 'site' | 'shop' | 'dash' | 'cal' | 'map' draws
           a generated cover instead of screenshots
   c1,c2 : cover gradient, taken from the project's own palette
   a     : accent colour of the project
   client: who it is for, as a kind of business (shown on the card)
   fact  : one short, checkable fact for the label on the cover
   url   : live site or demo (string or [en,de,tr]). No url, no button.
   lh    : Lighthouse, measured against `url`. Desktop: perf, a11y, bp, seo,
           lcp (seconds). Mobile: mPerf, mLcp. seo: null when the page is set
           to noindex on purpose. on = day of the measurement, ver = version.
   stats : n = number, d = decimals, p = prefix, s = suffix (string or triple)

   HONESTY RULES. They are the point of this list:
   - Only measured or countable values in `lh` and `stats`. No business
     results ("2x more inquiries") unless the client gave them to you.
   - quote and time only on a 'live' project, and only real ones.
   - If you do not know a value, leave the field out. The page copes.
   ========================================================================== */
window.PROJECTS = [
  {
    id: "kansel",
    status: "live",
    cat: "web",
    year: 2026,
    shot: "img/work/kansel",
    dark: true,
    c1: "#1D57B8",
    c2: "#0A1630",
    a: "#5E97E0",
    /* \u00AD = a soft hyphen: the long word may break there on a phone */
    title: "Kansel Dienst\u00ADleistungen",
    client: [
      "Waste disposal & cleaning · Rhine-Neckar",
      "Entsorgung & Reinigung · Rhein-Neckar",
      "Atık bertarafı ve temizlik · Rhein-Neckar",
    ],
    summary: [
      "A company website that says in seconds what Kansel does, and keeps the phone call one tap away.",
      "Eine Firmenwebsite, die in Sekunden klärt, was Kansel macht – und den Anruf einen Tipp entfernt hält.",
      "Kansel'in ne yaptığını saniyeler içinde anlatan ve aramayı tek dokunuş uzakta tutan bir firma sitesi.",
    ],
    fact: [
      "Live since September 2026",
      "Live seit September 2026",
      "Eylül 2026'dan beri yayında",
    ],
    tags: ["Next.js", "Tailwind CSS"],
    url: "https://www.kansel-dienstleistungen.de/",
    challenge: [
      "Someone who needs a flat cleared or rubble removed wants three answers fast: do they do this, do they come to me, and how do I reach them? The site had to answer exactly that, with no detours.",
      "Wer eine Wohnung entrümpeln oder Bauschutt abholen lassen muss, will drei Dinge schnell wissen: Machen die das, kommen sie zu mir, und wie erreiche ich sie? Genau das sollte die Website beantworten – ohne Umwege.",
      "Evini boşalttırmak ya da molozunu aldırmak isteyen biri üç şeyi hemen öğrenmek ister: Bu işi yapıyorlar mı, bana geliyorlar mı, onlara nasıl ulaşırım? Site tam olarak bunu, dolandırmadan yanıtlamalıydı.",
    ],
    did: [
      [
        "Four services at a glance, each with a direct path to an inquiry.",
        "Vier Leistungen auf einen Blick, jede mit direktem Weg zur Anfrage.",
        "Dört hizmet tek bakışta; her birinden doğrudan talep oluşturulabiliyor.",
      ],
      [
        "Call, WhatsApp or e-mail, straight from the phone in your hand.",
        "Anruf, WhatsApp oder E-Mail – direkt vom Handy aus.",
        "Arama, WhatsApp ya da e-posta: hepsi doğrudan telefondan.",
      ],
      [
        "The service area in the Rhine-Neckar region, named town by town.",
        "Das Einsatzgebiet in der Metropolregion Rhein-Neckar, Stadt für Stadt benannt.",
        "Rhein-Neckar bölgesindeki hizmet alanı, şehir şehir belirtildi.",
      ],
    ],
  },

  {
    id: "monamie",
    status: "concept",
    cat: "app",
    year: 2026,
    shot: "img/work/monamie",
    c1: "#E63946",
    c2: "#A81E2B",
    a: "#FFCA3A",
    title: "Mon Amie Chicken",
    client: [
      "Chicken restaurant · Ordering app",
      "Hähnchen-Restaurant · Bestell-App",
      "Tavuk restoranı · Sipariş uygulaması",
    ],
    summary: [
      "An ordering app that belongs to one restaurant, from the menu to the live status of the order.",
      "Eine Bestell-App, die einem einzigen Restaurant gehört – von der Speisekarte bis zum Live-Status der Bestellung.",
      "Tek bir restorana ait sipariş uygulaması: menüden siparişin canlı durumuna kadar.",
    ],
    fact: [
      "Order status in real time",
      "Bestellstatus in Echtzeit",
      "Gerçek zamanlı sipariş takibi",
    ],
    tags: ["Astro", "React", "Node.js", "PostgreSQL", "Stripe"],
    challenge: [
      "Delivery marketplaces bring orders, but they take a commission and keep the relationship with the guest. Many restaurants want their own ordering channel, one that still feels as easy as the big apps.",
      "Liefer-Marktplätze bringen Bestellungen, kosten aber Provision und behalten den Kontakt zum Gast. Viele Restaurants wünschen sich deshalb einen eigenen Bestellweg, der sich trotzdem so bequem anfühlt wie die großen Apps.",
      "Yemek sipariş platformları sipariş getirir, ama komisyon alır ve misafirle ilişkiyi kendinde tutar. Birçok restoran bu yüzden kendi sipariş kanalını ister; yine de büyük uygulamalar kadar rahat olmalıdır.",
    ],
    did: [
      [
        "A menu with categories, search, favourites and a cart, in German and English.",
        "Speisekarte mit Kategorien, Suche, Favoriten und Warenkorb – auf Deutsch und Englisch.",
        "Kategoriler, arama, favoriler ve sepetle bir menü; Almanca ve İngilizce.",
      ],
      [
        "Checkout with card payment through Stripe and saved delivery addresses.",
        "Checkout mit Kartenzahlung über Stripe und gespeicherten Lieferadressen.",
        "Stripe üzerinden kartla ödeme ve kayıtlı teslimat adresleriyle sipariş tamamlama.",
      ],
      [
        "Live order status in four steps over WebSockets, plus push notifications.",
        "Live-Bestellstatus in vier Schritten über WebSockets, dazu Push-Mitteilungen.",
        "WebSocket üzerinden dört adımlı canlı sipariş durumu ve anlık bildirimler.",
      ],
    ],
    stats: [
      {
        n: 4,
        l: [
          "steps in the live order status",
          "Schritte im Live-Bestellstatus",
          "adımlı canlı sipariş durumu",
        ],
      },
      {
        n: 2,
        l: [
          "languages: German and English",
          "Sprachen: Deutsch und Englisch",
          "dil: Almanca ve İngilizce",
        ],
      },
      {
        n: 1,
        l: [
          "app for phone and desktop, installable as a PWA",
          "App für Handy und Desktop, als PWA installierbar",
          "uygulama: telefonda ve masaüstünde, PWA olarak kurulabilir",
        ],
      },
    ],
    note: [
      "The app currently runs as a development build, so there is no public demo and no Lighthouse measurement yet.",
      "Die App läuft derzeit als Entwicklungsversion. Deshalb gibt es noch keine öffentliche Demo und keine Lighthouse-Messung.",
      "Uygulama şu an geliştirme sürümü olarak çalışıyor; bu yüzden henüz herkese açık bir demo ve Lighthouse ölçümü yok.",
    ],
    idea: [
      "Ordering like the big apps. Just straight from the restaurant.",
      "Bestellen wie bei den Großen. Nur eben direkt beim Restaurant.",
      "Büyük uygulamalardaki kadar kolay sipariş. Ama doğrudan restorandan.",
    ],
  },

  {
    id: "atelier-sera",
    status: "concept",
    cat: ["web", "app"],
    year: 2026,
    shot: "img/work/sera",
    dark: true,
    c1: "#7A1F2B",
    c2: "#2B0F14",
    a: "#C9B28F",
    title: "Atelier Sera",
    client: [
      "Hair & beauty salon · Hamburg",
      "Friseur- & Beauty-Salon · Hamburg",
      "Kuaför ve güzellik salonu · Hamburg",
    ],
    summary: [
      "A salon site that reads like a fashion magazine, with online booking thought through to the confirmation.",
      "Ein Salon-Auftritt wie ein Modemagazin – mit einer Online-Buchung, die bis zur Bestätigung durchdacht ist.",
      "Moda dergisi gibi okunan bir salon sitesi; online randevusu onay ekranına kadar düşünülmüş.",
    ],
    fact: [
      "Online booking in 4 steps",
      "Online-Buchung in 4 Schritten",
      "4 adımda online randevu",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    url: [
      "https://ekremilkan.github.io/atelier-sera/en/",
      "https://ekremilkan.github.io/atelier-sera/de/",
      "https://ekremilkan.github.io/atelier-sera/en/",
    ],
    challenge: [
      "Many salons still take bookings by phone, in the middle of the working day, between two clients. And the website looks like every other salon's, in the one trade where style decides.",
      "Viele Salons vergeben Termine noch am Telefon – mitten im Arbeitstag, zwischen zwei Kundinnen. Und die Website sieht aus wie bei jedem anderen Salon, obwohl gerade hier der Stil entscheidet.",
      "Birçok salon randevuyu hâlâ telefonla veriyor; iş gününün ortasında, iki müşteri arasında. Site ise diğer bütün salonlarınkine benziyor; oysa bu işte belirleyici olan tarzdır.",
    ],
    did: [
      [
        "An editorial design in ink, bone and oxblood, with large type and numbered chapters.",
        "Editorial-Design in Tinte, Bone und Ochsenblut, mit großer Typografie und nummerierten Kapiteln.",
        "Mürekkep siyahı, kemik ve bordo tonlarında, büyük tipografili ve numaralı bölümlü bir dergi tasarımı.",
      ],
      [
        "Booking in four steps: service, artist, date & time, your details.",
        "Buchung in vier Schritten: Leistung, Artist, Datum & Zeit, deine Daten.",
        "Dört adımda randevu: hizmet, uzman, tarih ve saat, bilgileriniz.",
      ],
      [
        "Free slots follow the length of the chosen services, and the confirmation comes with a calendar file (.ics).",
        "Freie Zeiten richten sich nach der Dauer der gewählten Leistungen; die Bestätigung kommt mit Kalenderdatei (.ics).",
        "Boş saatler seçilen hizmetlerin süresine göre hesaplanıyor; onay ekranı takvim dosyasıyla (.ics) geliyor.",
      ],
    ],
    lh: {
      on: "2026-10-06",
      ver: 13,
      perf: 94,
      a11y: 97,
      bp: 100,
      seo: null,
      lcp: 1.4,
      mPerf: 81,
      mLcp: 4.7,
    },
    stats: [
      {
        n: 4,
        l: [
          "steps from service to booked slot",
          "Schritte von der Leistung bis zum Termin",
          "adımda hizmetten randevuya",
        ],
      },
    ],
    idea: [
      "Hair, as you mean it.",
      "Haar, wie du es meinst.",
      "Saç, tam senin kastettiğin gibi.",
    ],
  },

  {
    id: "maison-lume",
    status: "concept",
    cat: "shop",
    year: 2026,
    shot: "img/work/lume",
    c1: "#E6DCCD",
    c2: "#C4B39B",
    a: "#94553A",
    title: "Maison Lume",
    client: [
      "Fashion boutique · Leipzig",
      "Modeboutique · Leipzig",
      "Moda butiği · Leipzig",
    ],
    summary: [
      "A quiet online shop for a fashion boutique, built all the way from the filter to the order confirmation.",
      "Ein ruhiger Onlineshop für eine Modeboutique – vom Filter bis zur Bestellbestätigung komplett durchgebaut.",
      "Bir moda butiği için sakin bir online mağaza; filtreden sipariş onayına kadar eksiksiz kuruldu.",
    ],
    fact: [
      "Checkout in 3 steps",
      "Checkout in 3 Schritten",
      "3 adımda ödeme",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://ekremilkan.github.io/maison-lume/",
    challenge: [
      "Small boutiques often end up with an off-the-shelf shop: the selection is special, the storefront is interchangeable. And by the time you reach the cart, it gets awkward.",
      "Kleine Boutiquen landen online oft bei einem Shop von der Stange: Die Auswahl ist besonders, der Auftritt austauschbar. Und spätestens im Warenkorb wird es umständlich.",
      "Küçük butikler internette çoğu zaman hazır kalıp bir mağazayla yetiniyor: seçki özel, vitrin sıradan. Sepete gelindiğinde ise iş zorlaşıyor.",
    ],
    did: [
      [
        "A shop you can filter by category, size, colour and price, and sort.",
        "Shop mit Filtern nach Kategorie, Größe, Farbe und Preis, dazu eine Sortierung.",
        "Kategori, beden, renk ve fiyata göre filtrelenen, sıralanabilen bir mağaza.",
      ],
      [
        "Product pages with colour and size choice, material and care notes, and matching pieces.",
        "Produktseiten mit Farb- und Größenwahl, Material- und Pflegehinweisen und passenden Stücken.",
        "Renk ve beden seçimi, malzeme ve bakım bilgileri ile uyumlu parçalar sunan ürün sayfaları.",
      ],
      [
        "A cart drawer that shows how far it is to free shipping, then a checkout in three steps.",
        "Warenkorb als Seitenleiste mit Fortschritt bis zum Gratisversand, danach Checkout in drei Schritten.",
        "Ücretsiz kargoya ne kadar kaldığını gösteren yan panel sepet, ardından üç adımlı ödeme.",
      ],
    ],
    lh: {
      on: "2026-10-06",
      ver: 13,
      perf: 91,
      a11y: 97,
      bp: 100,
      seo: null,
      lcp: 1.2,
      mPerf: 89,
      mLcp: 2.8,
    },
    stats: [
      {
        n: 3,
        l: [
          "steps to check out: contact, shipping, payment",
          "Schritte im Checkout: Kontakt, Versand, Zahlung",
          "adımlı ödeme: iletişim, kargo, ödeme",
        ],
      },
    ],
    idea: [
      "Quiet pieces for a considered wardrobe.",
      "Leise Stücke für eine durchdachte Garderobe.",
      "Özenle kurulmuş bir gardırop için sakin parçalar.",
    ],
  },

  {
    id: "motorwerk-kessler",
    status: "concept",
    cat: "web",
    year: 2026,
    shot: "img/work/kessler",
    dark: true,
    c1: "#2A6A50",
    c2: "#143325",
    a: "#B08D57",
    title: "Motorwerk Kessler",
    client: [
      "Independent car workshop · Stuttgart",
      "Freie Kfz-Werkstatt · Stuttgart",
      "Bağımsız oto servis · Stuttgart",
    ],
    summary: [
      "A workshop site that names the price before anyone asks, and shows where the car is right now.",
      "Eine Werkstatt-Website, die den Preis nennt, bevor jemand fragt – und zeigt, wo das Auto gerade steht.",
      "Fiyatı kimse sormadan söyleyen ve aracın o an hangi aşamada olduğunu gösteren bir servis sitesi.",
    ],
    fact: [
      "Follow the repair live",
      "Reparatur live verfolgen",
      "Onarımı canlı takip edin",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    url: "https://ekremilkan.github.io/motorwerk-kessler/",
    challenge: [
      "People who drop off their car rarely know what it will cost or when it will be ready. And then there is the call everyone dreads: “We found something else.”",
      "Wer sein Auto in die Werkstatt bringt, weiß selten, was es kostet und wann es fertig ist. Dazu kommt der Anruf, den alle fürchten: „Wir haben da noch etwas gefunden.“",
      "Aracını servise bırakan çoğu kişi ne kadar tutacağını ve ne zaman hazır olacağını bilmez. Bir de herkesin çekindiği o telefon vardır: “Bir şey daha bulduk.”",
    ],
    did: [
      [
        "Service finder: enter make, model, first registration and mileage, get an estimate with price and workshop time.",
        "Service-Finder: Marke, Modell, Erstzulassung und Kilometerstand eingeben, Schätzung mit Preis und Werkstattzeit erhalten.",
        "Servis bulucu: marka, model, ilk tescil ve kilometre girilir; fiyat ve atölye süresiyle bir tahmin gelir.",
      ],
      [
        "Repair status by reference number. Extra work is approved or declined by the customer.",
        "Reparaturstatus per Auftragsnummer. Zusatzarbeiten gibt die Kundschaft selbst frei oder lehnt sie ab.",
        "İş emri numarasıyla onarım durumu. Ek işleri müşteri kendisi onaylar ya da reddeder.",
      ],
      [
        "A price list with a fixed price, a duration and a job code for every job.",
        "Preisliste mit Festpreis, Dauer und Auftragscode für jede Arbeit.",
        "Her iş için sabit fiyat, süre ve iş kodu içeren bir fiyat listesi.",
      ],
    ],
    lh: {
      on: "2026-10-06",
      ver: 13,
      perf: 97,
      a11y: 84,
      bp: 100,
      seo: 100,
      lcp: 1.0,
      mPerf: 86,
      mLcp: 3.7,
    },
    stats: [
      {
        n: 14,
        l: [
          "fixed prices on the price list",
          "Festpreise in der Preisliste",
          "sabit fiyat, fiyat listesinde",
        ],
      },
    ],
    idea: [
      "Engineered care for your car.",
      "Ihr Auto. Präzise gewartet.",
      "Aracınız için mühendis titizliği.",
    ],
  },

  {
    id: "hafenkraft",
    status: "concept",
    cat: "web",
    year: 2026,
    shot: "img/work/hafenkraft",
    dark: true,
    c1: "#F2C230",
    c2: "#D9A915",
    a: "#1C1E1F",
    title: "Hafenkraft",
    client: [
      "Moving company · Bremen",
      "Umzugsunternehmen · Bremen",
      "Nakliye firması · Bremen",
    ],
    summary: [
      "A moving company that doesn't hide its price: cost estimator, coverage and the moving day on one page.",
      "Ein Umzugsunternehmen, das seinen Preis nicht versteckt: Kostenrechner, Einsatzgebiet und Umzugstag auf einer Seite.",
      "Fiyatını saklamayan bir nakliye firması: maliyet hesaplayıcı, hizmet bölgesi ve taşınma günü tek sayfada.",
    ],
    fact: [
      "Price range after 6 questions",
      "Preisrahmen nach 6 Fragen",
      "6 soruda fiyat aralığı",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    url: "https://ekremilkan.github.io/logistics-demo/",
    challenge: [
      "For customers, the price of a move is a black box: first a form, then days of silence. Ask three companies and you end up comparing gut feelings.",
      "Umzugspreise sind für Kunden eine Blackbox: Erst kommt das Formular, dann tagelang nichts. Wer drei Firmen anfragt, vergleicht am Ende Bauchgefühle.",
      "Taşınma fiyatı müşteri için kapalı bir kutudur: önce bir form, sonra günlerce sessizlik. Üç firmaya soran, sonunda yalnızca hislerini karşılaştırır.",
    ],
    did: [
      [
        "A cost estimator with six questions. The price range updates live and narrows with every answer.",
        "Kostenrechner mit sechs Fragen. Der Preisrahmen rechnet live mit und wird mit jeder Antwort enger.",
        "Altı soruluk maliyet hesaplayıcı. Fiyat aralığı anında güncellenir ve her yanıtla daralır.",
      ],
      [
        "An animated map of Germany with the main routes from Bremen, with distance and driving time.",
        "Animierte Deutschlandkarte mit den wichtigsten Routen ab Bremen, samt Kilometern und Fahrzeit.",
        "Bremen çıkışlı ana rotaları, mesafe ve sürüş süresiyle gösteren hareketli Almanya haritası.",
      ],
      [
        "The moving day as a timeline in five stations, from the survey to the last lamp.",
        "Der Umzugstag als Zeitleiste in fünf Stationen, von der Besichtigung bis zur letzten Lampe.",
        "Taşınma günü, keşiften son lambaya kadar beş duraklı bir zaman çizelgesinde.",
      ],
    ],
    lh: {
      on: "2026-10-06",
      ver: 13,
      perf: 87,
      a11y: 90,
      bp: 100,
      seo: 100,
      lcp: 2.0,
      mPerf: 73,
      mLcp: 6.9,
    },
    stats: [
      {
        n: 6,
        l: [
          "questions to a price range",
          "Fragen bis zum Preisrahmen",
          "soruda fiyat aralığı",
        ],
      },
    ],
    idea: [
      "We move what matters.",
      "Wir bewegen, was zählt.",
      "Önemli olanı biz taşırız.",
    ],
  },

  {
    id: "kornblume",
    status: "concept",
    cat: "web",
    year: 2026,
    shot: "img/work/kornblume",
    c1: "#8EA3DC",
    c2: "#4F6DB8",
    a: "#8B4A2B",
    title: "Kornblume",
    client: [
      "Bakery & café · Freiburg",
      "Bäckerei & Café · Freiburg",
      "Fırın ve kafe · Freiburg",
    ],
    summary: [
      "A bakery site with an oven log, a menu set like print, and a sign that knows whether the door is open.",
      "Eine Bäckerei-Website mit Ofenbuch, einer Karte wie gedruckt und einer Anzeige, die weiß, ob gerade geöffnet ist.",
      "Fırın defteri, basılı gibi dizilmiş menüsü ve dükkânın açık olup olmadığını bilen göstergesiyle bir fırın sitesi.",
    ],
    fact: [
      "Shows live whether it's open",
      "Zeigt live, ob geöffnet ist",
      "Açık mı, canlı gösterir",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    url: "https://ekremilkan.github.io/kornblume/",
    challenge: [
      "Bakery websites are often just an address and opening hours. Yet guests mostly want to know two things: are you open right now, and is there anything left?",
      "Bäckerei-Websites sind oft nur Adresse und Öffnungszeiten. Dabei wollen Gäste vor allem zwei Dinge wissen: Habt ihr gerade offen – und ist noch etwas da?",
      "Fırın siteleri çoğu zaman adres ve çalışma saatlerinden ibarettir. Oysa misafir en çok iki şeyi merak eder: Şu an açık mısınız, ve bir şey kaldı mı?",
    ],
    did: [
      [
        "“Out of the oven”: a log that lists every tray with its time and shows what is still warm or already sold out.",
        "„Aus dem Ofen“: ein Ofenbuch, das jedes Blech mit Uhrzeit führt und zeigt, was noch warm oder schon ausverkauft ist.",
        "“Fırından yeni çıktı”: her tepsiyi saatiyle yazan, neyin hâlâ sıcak, neyin tükendiğini gösteren bir fırın defteri.",
      ],
      [
        "An open sign in the header that follows the bakery's own clock.",
        "Eine Geöffnet-Anzeige im Kopf der Seite, die sich nach der Uhr der Bäckerei richtet.",
        "Sayfanın üstünde, fırının kendi saatine göre çalışan bir “açık” göstergesi.",
      ],
      [
        "The menu set like a printed card, in five sections from bread to breakfast.",
        "Die Karte gesetzt wie eine gedruckte Speisekarte, in fünf Rubriken von Brot bis Frühstück.",
        "Basılı bir menü gibi dizilmiş, ekmekten kahvaltıya beş bölümlü bir menü.",
      ],
    ],
    lh: {
      on: "2026-10-06",
      ver: 13,
      perf: 88,
      a11y: 97,
      bp: 100,
      seo: null,
      lcp: 1.6,
      mPerf: 72,
      mLcp: 5.3,
    },
    stats: [
      {
        n: 5,
        l: [
          "sections on the menu, from bread to breakfast",
          "Rubriken auf der Karte, von Brot bis Frühstück",
          "bölümlü menü, ekmekten kahvaltıya",
        ],
      },
    ],
    idea: ["Bread takes time.", "Brot braucht Zeit.", "Ekmek zaman ister."],
  },

  {
    id: "aegean-harmony",
    status: "concept",
    cat: ["web", "app"],
    year: 2025,
    shot: "img/work/aegean",
    c1: "#2FB8AE",
    c2: "#0C7C8A",
    a: "#0AA5B5",
    title: "Aegean Harmony Hotel",
    client: [
      "Coastal hotel · Izmir",
      "Küstenhotel · Izmir",
      "Sahil oteli · İzmir",
    ],
    summary: [
      "A hotel site on the Aegean with its own online booking, from the travel dates to the payment, with no booking portal in between.",
      "Ein Hotelauftritt an der Ägäis mit eigener Online-Buchung – von den Reisedaten bis zur Zahlung, ohne Buchungsportal dazwischen.",
      "Ege kıyısında bir otel sitesi; kendi online rezervasyonuyla, tarih seçiminden ödemeye kadar arada rezervasyon portalı olmadan.",
    ],
    fact: [
      "Booking in 3 steps",
      "Buchung in 3 Schritten",
      "3 adımda rezervasyon",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Supabase"],
    url: "https://lifepointotel.netlify.app/",
    challenge: [
      "Many hotels sell their rooms through booking portals and pay a commission on every night. Their own website often stays a brochure: beautiful pictures, but the booking happens somewhere else.",
      "Viele Hotels verkaufen ihre Zimmer über Buchungsportale und zahlen für jede Nacht Provision. Die eigene Website bleibt dabei oft eine Broschüre: schöne Bilder, aber gebucht wird woanders.",
      "Birçok otel odalarını rezervasyon portalları üzerinden satar ve her gece için komisyon öder. Kendi sitesi ise çoğu zaman bir broşür olarak kalır: güzel fotoğraflar var, ama rezervasyon başka yerde yapılır.",
    ],
    did: [
      [
        "Booking in three steps: choose a room, guest details, payment.",
        "Buchung in drei Schritten: Zimmer wählen, Gästedaten, Zahlung.",
        "Üç adımda rezervasyon: oda seçimi, misafir bilgileri, ödeme.",
      ],
      [
        "A calendar for arrival and departure. The available rooms and the total for the stay appear at once.",
        "Ein Kalender für An- und Abreise. Verfügbare Zimmer und der Gesamtpreis für den Aufenthalt erscheinen sofort.",
        "Giriş ve çıkış için bir takvim. Müsait odalar ve konaklamanın toplam fiyatı anında görünür.",
      ],
      [
        "Three room categories with price, capacity and view, and the whole site in English and Turkish.",
        "Drei Zimmerkategorien mit Preis, Belegung und Ausblick, dazu die ganze Seite auf Englisch und Türkisch.",
        "Fiyatı, kapasitesi ve manzarasıyla üç oda kategorisi; sitenin tamamı İngilizce ve Türkçe.",
      ],
    ],
    lh: {
      on: "2026-10-06",
      ver: 13,
      perf: 100,
      a11y: 88,
      bp: 96,
      seo: 82,
      lcp: 0.6,
      mPerf: 97,
      mLcp: 2.4,
    },
    stats: [
      {
        n: 3,
        l: [
          "steps from the travel dates to the payment",
          "Schritte von den Reisedaten bis zur Zahlung",
          "adımda tarih seçiminden ödemeye",
        ],
      },
    ],
    idea: [
      "Your dream Aegean getaway begins here.",
      "Ihr Traumurlaub an der Ägäis beginnt hier.",
      "Hayalinizdeki Ege kaçamağınız burada başlıyor.",
    ],
  },
];
/* ==========================================================================
   PRICING  -  the only place to edit packages, goals and FAQ.
   Texts are ['English','Deutsch','Türkçe'] triples.
   price : the "from" price in EUR.
   lite  : optional lighter version {price, note}. Powers the "Simpler needs?"
           switch, so visitors see that the starting price can go DOWN.
   feats : each feature; lite:false means "not part of the lighter version".
   feat  : true = the highlighted (lime) package.
   goals : the "What do you want to do?" chips; plan = plan id or 'custom'.

   EVERYTHING BELOW IS PLACEHOLDER (prices, promises, payment terms, e-mail).
   Replace it with your real offer before publishing.
   ========================================================================== */
window.PRICING = {
  email: "hello@yourdomain.com",
  plans: [
    {
      id: "landing",
      price: 199,
      lite: null,
      name: ["Landing page", "Landingpage", "Açılış sayfası"],
      who: [
        "One focused page to introduce yourself or your offer, on a small budget.",
        "Eine fokussierte Seite, um dich oder dein Angebot vorzustellen, mit kleinem Budget.",
        "Kendinizi veya teklifinizi tanıtan, küçük bütçeye uygun, tek odaklı bir sayfa.",
      ],
      time: ["Ready in 3–5 days", "Fertig in 3–5 Tagen", "3–5 günde hazır"],
      feats: [
        {
          t: [
            "One focused page",
            "Eine fokussierte Seite",
            "Tek sayfa, net mesaj",
          ],
        },
        {
          t: [
            "Responsive design",
            "Responsives Design",
            "Mobil uyumlu tasarım",
          ],
        },
        { t: ["Contact form", "Kontaktformular", "İletişim formu"] },
        { t: ["Basic SEO", "Basis-SEO", "Temel SEO"] },
        {
          t: [
            "Live within days",
            "In wenigen Tagen live",
            "Birkaç günde yayında",
          ],
        },
      ],
    },
    {
      id: "business",
      price: 499,
      feat: true,
      badge: ["Most popular", "Am beliebtesten", "En popüler"],
      lite: {
        price: 349,
        note: [
          "3 pages, no blog section.",
          "3 Seiten, ohne Blog-Bereich.",
          "3 sayfa, blog bölümü yok.",
        ],
      },
      name: ["Business website", "Business-Website", "Kurumsal web sitesi"],
      who: [
        "For businesses that want to look credible and receive inquiries.",
        "Für Unternehmen, die glaubwürdig auftreten und Anfragen erhalten wollen.",
        "Güvenilir görünmek ve talep almak isteyen işletmeler için.",
      ],
      time: ["Ready in 1–2 weeks", "Fertig in 1–2 Wochen", "1–2 haftada hazır"],
      feats: [
        { t: ["Up to 5 pages", "Bis zu 5 Seiten", "5 sayfaya kadar"] },
        { t: ["Custom design", "Individuelles Design", "Özel tasarım"] },
        {
          t: [
            "Contact & booking forms",
            "Kontakt- & Buchungsformulare",
            "İletişim ve randevu formları",
          ],
        },
        {
          t: [
            "Blog or news section",
            "Blog- oder News-Bereich",
            "Blog veya haber bölümü",
          ],
          lite: false,
        },
        {
          t: [
            "SEO & analytics setup",
            "SEO- & Analytics-Setup",
            "SEO ve analitik kurulumu",
          ],
          lite: false,
        },
      ],
    },
    {
      id: "shop",
      price: 899,
      lite: {
        price: 599,
        note: [
          "Up to 20 products, no subscriptions.",
          "Bis zu 20 Produkte, ohne Abos.",
          "20 ürüne kadar, abonelik yok.",
        ],
      },
      name: ["Online shop", "Onlineshop", "Online mağaza"],
      who: [
        "For brands ready to sell online with a checkout that just works.",
        "Für Marken, die online verkaufen wollen, mit einem Checkout, der einfach funktioniert.",
        "Online satışa hazır, sorunsuz bir ödeme deneyimi isteyen markalar için.",
      ],
      time: ["Ready in 3–5 weeks", "Fertig in 3–5 Wochen", "3–5 haftada hazır"],
      feats: [
        { t: ["Product catalogue", "Produktkatalog", "Ürün kataloğu"] },
        {
          t: [
            "Secure checkout & payments",
            "Sicherer Checkout & Zahlungen",
            "Güvenli ödeme ve tahsilat",
          ],
        },
        {
          t: [
            "Shipping, tax & invoices",
            "Versand, Steuern & Rechnungen",
            "Kargo, vergi ve faturalar",
          ],
        },
        {
          t: [
            "Discounts & subscriptions",
            "Rabatte & Abos",
            "İndirimler ve abonelikler",
          ],
          lite: false,
        },
        {
          t: ["Stock management", "Bestandsverwaltung", "Stok yönetimi"],
          lite: false,
        },
      ],
    },
    {
      id: "app",
      price: 2400,
      lite: {
        price: 1500,
        note: [
          "One core workflow, no integrations.",
          "Ein Kernablauf, ohne Integrationen.",
          "Tek ana iş akışı, entegrasyon yok.",
        ],
      },
      name: ["Web application", "Web-Anwendung", "Web uygulaması"],
      who: [
        "For teams replacing spreadsheets and manual work with one custom tool.",
        "Für Teams, die Tabellen und Handarbeit durch ein eigenes Tool ersetzen.",
        "Tabloları ve elle yapılan işleri tek bir özel araçla değiştirmek isteyen ekipler için.",
      ],
      time: [
        "Ready in 6–12 weeks",
        "Fertig in 6–12 Wochen",
        "6–12 haftada hazır",
      ],
      feats: [
        {
          t: [
            "Custom dashboard",
            "Individuelles Dashboard",
            "Özel yönetim paneli",
          ],
        },
        {
          t: [
            "Logins & user roles",
            "Logins & Nutzerrollen",
            "Girişler ve kullanıcı rolleri",
          ],
        },
        {
          t: [
            "Integrations & APIs",
            "Integrationen & APIs",
            "Entegrasyonlar ve API'ler",
          ],
          lite: false,
        },
        {
          t: [
            "Automated reports",
            "Automatische Berichte",
            "Otomatik raporlar",
          ],
          lite: false,
        },
        {
          t: [
            "Documentation & handover",
            "Dokumentation & Übergabe",
            "Dokümantasyon ve teslim",
          ],
        },
      ],
    },
  ],
  goals: [
    {
      t: [
        "Get found online",
        "Online gefunden werden",
        "İnternette görünür olmak",
      ],
      plan: "business",
    },
    {
      t: [
        "Launch fast on a small budget",
        "Schnell und günstig starten",
        "Küçük bütçeyle hızlı başlamak",
      ],
      plan: "landing",
    },
    {
      t: [
        "Sell products online",
        "Produkte online verkaufen",
        "Online ürün satmak",
      ],
      plan: "shop",
    },
    {
      t: [
        "Automate my work",
        "Meine Arbeit automatisieren",
        "İşlerimi otomatikleştirmek",
      ],
      plan: "app",
    },
    {
      t: [
        "I am not sure yet",
        "Ich bin mir noch nicht sicher",
        "Henüz emin değilim",
      ],
      plan: "custom",
    },
  ],
  faq: [
    {
      q: [
        "How much does a website cost?",
        "Was kostet eine Website?",
        "Bir web sitesi ne kadar tutar?",
      ],
      a: [
        "It depends on the scope. A simple one-page site starts at {landing}, a full business website at {business}, an online shop at {shop} and a custom web application at {app}. These are starting points: if you need less, we scale the scope down and quote you less. Third-party costs such as hosting or domain renewals are listed separately in your quote, so nothing comes as a surprise.",
        "Das hängt vom Umfang ab. Eine einfache One-Page-Website startet bei {landing}, eine komplette Unternehmenswebsite bei {business}, ein Onlineshop bei {shop} und eine individuelle Webanwendung bei {app}. Das sind Startpunkte: Brauchst du weniger, reduzieren wir den Umfang und den Preis. Kosten von Dritten wie Hosting oder Domain-Verlängerungen führen wir separat im Angebot auf, damit nichts überrascht.",
        "Kapsama bağlı. Başlangıç fiyatları şöyle: basit, tek sayfalık bir site {landing}, kapsamlı bir kurumsal web sitesi {business}, bir online mağaza {shop}, özel bir web uygulaması {app}. Bunlar başlangıç noktalarıdır: daha azına ihtiyacınız varsa kapsamı küçültür, size daha düşük bir teklif veririz. Hosting veya alan adı yenileme gibi üçüncü taraf maliyetleri teklifinizde ayrıca listelenir; böylece sürprizle karşılaşmazsınız.",
      ],
    },
    {
      q: [
        "How long does a website take?",
        "Wie lange dauert eine Website?",
        "Bir web sitesi ne kadar sürede hazır olur?",
      ],
      a: [
        "A simple site is usually live in 3 to 5 days, a full business website in 1 to 2 weeks and an online shop in 3 to 5 weeks. Web applications take longer, often 6 to 12 weeks. You get a concrete timeline in writing before we start.",
        "Eine einfache Seite ist meist in 3 bis 5 Tagen online, eine komplette Unternehmenswebsite in 1 bis 2 Wochen und ein Onlineshop in 3 bis 5 Wochen. Webanwendungen dauern länger, oft 6 bis 12 Wochen. Einen konkreten Zeitplan bekommst du schriftlich, bevor wir starten.",
        "Basit bir site genellikle 3 ila 5 günde, kapsamlı bir kurumsal web sitesi 1 ila 2 haftada, bir online mağaza 3 ila 5 haftada yayına girer. Web uygulamaları daha uzun sürer, çoğunlukla 6 ila 12 hafta. Başlamadan önce somut bir zaman planını yazılı olarak alırsınız.",
      ],
    },
    {
      q: [
        "Do you work with businesses outside Germany?",
        "Arbeitet ihr auch mit Unternehmen außerhalb Deutschlands?",
        "Almanya dışındaki işletmelerle de çalışıyor musunuz?",
      ],
      a: [
        "Yes. We are based in Germany and work with clients worldwide. Calls happen online, we work in English or German, and everything is handled remotely, so your location makes no difference.",
        "Ja. Wir sitzen in Deutschland und arbeiten mit Kunden weltweit. Gespräche laufen online, wir arbeiten auf Englisch oder Deutsch und alles wird remote abgewickelt. Dein Standort spielt keine Rolle.",
        "Evet. Almanya'dayız ve dünyanın her yerinden müşterilerle çalışıyoruz. Görüşmeler online yapılır, İngilizce veya Almanca çalışırız ve her şey uzaktan yürütülür; bulunduğunuz yer fark etmez.",
      ],
    },
    {
      q: [
        "Can you redesign my existing website?",
        "Könnt ihr meine bestehende Website neu gestalten?",
        "Mevcut web sitemi yeniden tasarlayabilir misiniz?",
      ],
      a: [
        "Absolutely. We look at what works today, keep the content and rankings worth keeping, and rebuild the rest to be faster, clearer and easier to use on mobile. Send us the link and we will tell you honestly what is worth changing.",
        "Sehr gern. Wir schauen, was heute funktioniert, behalten Inhalte und Rankings, die es wert sind, und bauen den Rest schneller, klarer und mobil besser nutzbar neu auf. Schick uns den Link, und wir sagen dir ehrlich, was sich zu ändern lohnt.",
        "Elbette. Bugün neyin işe yaradığına bakar, korumaya değer içerikleri ve sıralamaları korur, gerisini daha hızlı, daha net ve mobilde daha kolay kullanılır hâle getirerek yeniden kurarız. Bağlantıyı bize gönderin, neyi değiştirmeye değdiğini dürüstçe söyleyelim.",
      ],
    },
    {
      q: [
        "Do I need to know exactly what I want?",
        "Muss ich genau wissen, was ich will?",
        "Tam olarak ne istediğimi bilmem gerekiyor mu?",
      ],
      a: [
        'No. Most clients start with a problem, not a plan, like "I need more enquiries" or "my shop is hard to use". In a first call we work out what you need, what can wait and what it should cost. If a simpler option is enough, we will say so.',
        "Nein. Die meisten Kunden starten mit einem Problem statt mit einem Plan, etwa „Ich brauche mehr Anfragen“ oder „Mein Shop ist umständlich“. Im ersten Gespräch klären wir, was du brauchst, was warten kann und was es kosten soll. Reicht eine einfachere Lösung, sagen wir das.",
        "Hayır. Çoğu müşteri bir planla değil, bir sorunla gelir: “Daha fazla talep almalıyım” ya da “Mağazam kullanışsız” gibi. İlk görüşmede neye ihtiyacınız olduğunu, neyin bekleyebileceğini ve bunun ne kadar tutması gerektiğini birlikte netleştiririz. Daha basit bir seçenek yeterliyse bunu söyleriz.",
      ],
    },
    {
      q: [
        "What happens after I request a quote?",
        "Was passiert nach meiner Angebotsanfrage?",
        "Teklif istedikten sonra ne olur?",
      ],
      a: [
        "We reply within one working day. Usually there is a short call to understand your goal, then you receive a written quote with scope, price and timeline. There is no obligation, and you decide whether to go ahead.",
        "Wir antworten innerhalb eines Werktags. Meist folgt ein kurzes Gespräch, um dein Ziel zu verstehen, danach bekommst du ein schriftliches Angebot mit Umfang, Preis und Zeitplan. Es besteht keine Verpflichtung, du entscheidest, ob es weitergeht.",
        "Bir iş günü içinde yanıt veririz. Genellikle hedefinizi anlamak için kısa bir görüşme yaparız, ardından kapsamı, fiyatı ve zaman planını içeren yazılı bir teklif alırsınız. Hiçbir yükümlülük yoktur; devam edip etmemeye siz karar verirsiniz.",
      ],
    },
    {
      q: [
        "How does payment work?",
        "Wie läuft die Bezahlung?",
        "Ödeme nasıl yapılıyor?",
      ],
      a: [
        "Usually half at the start and half at launch. For larger projects we split the payments into milestones. It is all written in your quote.",
        "Meist die Hälfte zum Start und die Hälfte beim Launch. Bei größeren Projekten teilen wir die Zahlungen in Meilensteine auf. Alles steht in deinem Angebot.",
        "Genellikle yarısı başlangıçta, yarısı yayına alırken. Büyük projelerde ödemeleri aşamalara böleriz. Hepsi teklifinizde yazılıdır.",
      ],
    },
    {
      q: [
        "Will I own the website?",
        "Gehört mir die Website danach?",
        "Web sitesi bana mı ait olacak?",
      ],
      a: [
        "Yes. The code, the content and the domain belong to you. You are never locked in.",
        "Ja. Code, Inhalte und Domain gehören dir. Du bist nie gebunden.",
        "Evet. Kod, içerik ve alan adı size aittir. Hiçbir zaman bize bağımlı kalmazsınız.",
      ],
    },
  ],
};
/* ==========================================================================
   ESTIMATOR  -  the price calculator. All prices are PLACEHOLDERS in euros.
   Edit the numbers (p = price change in EUR, w = change in weeks) and the
   texts (['English','Deutsch','Türkçe'] triples) here; nothing else needs to change.
   base = starting price of the project type, wk = typical weeks.
   The result is shown as a range that narrows with every answer.
   ========================================================================== */
(function () {
  var PAGES = [
    {
      t: ["Up to 3 pages", "Bis zu 3 Seiten", "3 sayfaya kadar"],
      p: -150,
      w: -0.5,
    },
    { t: ["Up to 5 pages", "Bis zu 5 Seiten", "5 sayfaya kadar"], p: 0, w: 0 },
    { t: ["6 to 10 pages", "6 bis 10 Seiten", "6 ila 10 sayfa"], p: 350, w: 1 },
    {
      t: ["11 to 20 pages", "11 bis 20 Seiten", "11 ila 20 sayfa"],
      p: 800,
      w: 2.5,
    },
    {
      t: ["More than 20 pages", "Mehr als 20 Seiten", "20 sayfadan fazla"],
      p: 1500,
      w: 5,
    },
  ];
  window.ESTIMATOR = {
    types: [
      {
        id: "landing",
        fam: "web",
        ic: "page",
        base: 199,
        wk: 0.8,
        t: [
          "A simple one-page website",
          "Eine einfache One-Page-Website",
          "Basit, tek sayfalık bir web sitesi",
        ],
        d: [
          "One focused page for you or your offer.",
          "Eine fokussierte Seite für dich oder dein Angebot.",
          "Sizi veya teklifinizi tanıtan tek odaklı bir sayfa.",
        ],
        sq: [
          "How long should the page be?",
          "Wie lang soll die Seite werden?",
          "Sayfa ne kadar uzun olmalı?",
        ],
        size: [
          {
            t: [
              "Short, up to 5 sections",
              "Kurz, bis zu 5 Abschnitte",
              "Kısa, 5 bölüme kadar",
            ],
            p: 0,
            w: 0,
          },
          {
            t: [
              "Standard, up to 8 sections",
              "Standard, bis zu 8 Abschnitte",
              "Standart, 8 bölüme kadar",
            ],
            p: 90,
            w: 0.4,
          },
          {
            t: [
              "Long, 9 or more sections",
              "Lang, 9 oder mehr Abschnitte",
              "Uzun, 9 veya daha fazla bölüm",
            ],
            p: 200,
            w: 0.8,
          },
        ],
      },
      {
        id: "business",
        fam: "web",
        ic: "pages",
        base: 499,
        wk: 1.5,
        t: [
          "A multi-page business website",
          "Eine mehrseitige Unternehmenswebsite",
          "Çok sayfalı bir kurumsal web sitesi",
        ],
        d: [
          "Services, about, contact and more.",
          "Leistungen, Über uns, Kontakt und mehr.",
          "Hizmetler, hakkımızda, iletişim ve daha fazlası.",
        ],
        sq: [
          "How many pages do you need?",
          "Wie viele Seiten brauchst du?",
          "Kaç sayfaya ihtiyacınız var?",
        ],
        size: PAGES,
      },
      {
        id: "shop",
        fam: "shop",
        ic: "bag",
        base: 899,
        wk: 4,
        t: ["An online shop", "Ein Onlineshop", "Bir online mağaza"],
        d: [
          "Products, checkout and payments.",
          "Produkte, Checkout und Zahlungen.",
          "Ürünler, sepet ve ödemeler.",
        ],
        sq: [
          "How many products will you sell?",
          "Wie viele Produkte willst du verkaufen?",
          "Kaç ürün satacaksınız?",
        ],
        size: [
          {
            t: ["Up to 20 products", "Bis zu 20 Produkte", "20 ürüne kadar"],
            p: -300,
            w: -1,
          },
          {
            t: ["Up to 100 products", "Bis zu 100 Produkte", "100 ürüne kadar"],
            p: 0,
            w: 0,
          },
          {
            t: ["Up to 500 products", "Bis zu 500 Produkte", "500 ürüne kadar"],
            p: 500,
            w: 1,
          },
          {
            t: [
              "More than 500 products",
              "Mehr als 500 Produkte",
              "500'den fazla ürün",
            ],
            p: 1200,
            w: 2.5,
          },
        ],
      },
      {
        id: "app",
        fam: "app",
        ic: "grid",
        base: 2400,
        wk: 8,
        t: [
          "A custom web application",
          "Eine individuelle Webanwendung",
          "Özel bir web uygulaması",
        ],
        d: [
          "Dashboards, portals and internal tools.",
          "Dashboards, Portale und interne Tools.",
          "Paneller, portallar ve şirket içi araçlar.",
        ],
        sq: [
          "How big is the tool?",
          "Wie groß ist das Tool?",
          "Araç ne kadar büyük olacak?",
        ],
        size: [
          {
            t: ["One core workflow", "Ein Kernablauf", "Tek ana iş akışı"],
            d: [
              "One job done really well.",
              "Eine Aufgabe, richtig gut gelöst.",
              "Tek bir işi gerçekten iyi yapar.",
            ],
            p: -900,
            w: -3,
          },
          {
            t: ["2 to 3 workflows", "2 bis 3 Abläufe", "2 ila 3 iş akışı"],
            d: [
              "A small system that covers a team.",
              "Ein kleines System für ein Team.",
              "Bir ekibin işini karşılayan küçük bir sistem.",
            ],
            p: 0,
            w: 0,
          },
          {
            t: ["4 to 6 workflows", "4 bis 6 Abläufe", "4 ila 6 iş akışı"],
            d: [
              "A full internal platform.",
              "Eine vollständige interne Plattform.",
              "Kapsamlı bir şirket içi platform.",
            ],
            p: 2500,
            w: 4,
          },
          {
            t: [
              "A large platform",
              "Eine große Plattform",
              "Büyük bir platform",
            ],
            d: [
              "Many roles, modules and integrations.",
              "Viele Rollen, Module und Integrationen.",
              "Çok sayıda rol, modül ve entegrasyon.",
            ],
            p: 6000,
            w: 10,
          },
        ],
      },
      {
        id: "redesign",
        fam: "web",
        ic: "loop",
        base: 399,
        wk: 1.2,
        t: [
          "Redesign my existing website",
          "Meine bestehende Website neu gestalten",
          "Mevcut web sitemi yeniden tasarlamak",
        ],
        d: [
          "Keep what works, rebuild the rest.",
          "Bewährtes behalten, den Rest neu bauen.",
          "İşe yarayanı korur, gerisini yeniden kurarız.",
        ],
        sq: [
          "How many pages does it have?",
          "Wie viele Seiten hat sie?",
          "Kaç sayfası var?",
        ],
        size: PAGES,
      },
      {
        id: "unsure",
        ic: "help",
        t: [
          "I am not sure yet",
          "Ich bin mir noch nicht sicher",
          "Henüz emin değilim",
        ],
        d: [
          "No problem. We will work it out together.",
          "Kein Problem. Wir klären es gemeinsam.",
          "Sorun değil. Birlikte netleştiririz.",
        ],
      },
    ],
    fams: {
      web: {
        feats: [
          {
            t: [
              "Blog or news section",
              "Blog- oder News-Bereich",
              "Blog veya haber bölümü",
            ],
            p: 150,
            w: 0.3,
          },
          {
            t: ["Online booking", "Online-Terminbuchung", "Online randevu"],
            p: 300,
            w: 0.6,
          },
          {
            t: [
              "Two languages (EN/DE)",
              "Zwei Sprachen (EN/DE)",
              "İki dil (EN/DE)",
            ],
            p: 250,
            w: 0.5,
          },
          {
            t: [
              "Edit content yourself (CMS)",
              "Inhalte selbst bearbeiten (CMS)",
              "İçerikleri kendiniz yönetin (CMS)",
            ],
            p: 350,
            w: 0.7,
          },
          {
            t: [
              "Newsletter or CRM connection",
              "Newsletter- oder CRM-Anbindung",
              "Bülten veya CRM bağlantısı",
            ],
            p: 120,
            w: 0.2,
          },
          {
            t: [
              "Advanced animations",
              "Aufwendige Animationen",
              "Gelişmiş animasyonlar",
            ],
            p: 250,
            w: 0.5,
          },
          {
            t: [
              "Member area with login",
              "Mitgliederbereich mit Login",
              "Girişli üye alanı",
            ],
            p: 800,
            w: 1.5,
          },
        ],
        dsg: [
          {
            t: [
              "I already have a design",
              "Ich habe schon ein Design",
              "Hazır bir tasarımım var",
            ],
            p: -150,
            w: -0.3,
          },
          {
            t: [
              "I need a design",
              "Ich brauche ein Design",
              "Tasarıma ihtiyacım var",
            ],
            p: 0,
            w: 0,
          },
          {
            t: [
              "I need a design and brand identity",
              "Ich brauche Design und Markenauftritt",
              "Tasarım ve marka kimliğine ihtiyacım var",
            ],
            d: [
              "Logo, colours and typography.",
              "Logo, Farben und Typografie.",
              "Logo, renkler ve tipografi.",
            ],
            p: 250,
            w: 0.7,
          },
        ],
        cq: ["Texts and images", "Texte und Bilder", "Metinler ve görseller"],
        cnt: [
          {
            t: [
              "I have texts and images ready",
              "Texte und Bilder liegen vor",
              "Metinlerim ve görsellerim hazır",
            ],
            p: 0,
            w: 0,
          },
          {
            t: [
              "I need help with the content",
              "Ich brauche Hilfe bei den Inhalten",
              "İçerik konusunda yardıma ihtiyacım var",
            ],
            d: [
              "Copywriting and image selection.",
              "Texte und Bildauswahl.",
              "Metin yazımı ve görsel seçimi.",
            ],
            p: 200,
            w: 0.5,
          },
        ],
      },
      shop: {
        feats: [
          {
            t: [
              "Subscriptions or recurring orders",
              "Abos oder wiederkehrende Bestellungen",
              "Abonelikler veya tekrarlayan siparişler",
            ],
            p: 500,
            w: 1,
          },
          {
            t: [
              "Multiple currencies and international tax",
              "Mehrere Währungen und internationale Steuern",
              "Çoklu para birimi ve uluslararası vergi",
            ],
            p: 300,
            w: 0.6,
          },
          {
            t: [
              "Discount codes and gift cards",
              "Rabattcodes und Geschenkgutscheine",
              "İndirim kodları ve hediye kartları",
            ],
            p: 150,
            w: 0.3,
          },
          {
            t: ["Customer accounts", "Kundenkonten", "Müşteri hesapları"],
            p: 200,
            w: 0.4,
          },
          {
            t: ["Product reviews", "Produktbewertungen", "Ürün yorumları"],
            p: 120,
            w: 0.3,
          },
          {
            t: [
              "Two languages (EN/DE)",
              "Zwei Sprachen (EN/DE)",
              "İki dil (EN/DE)",
            ],
            p: 250,
            w: 0.5,
          },
          {
            t: [
              "Stock or ERP synchronisation",
              "Bestands- oder ERP-Synchronisation",
              "Stok veya ERP senkronizasyonu",
            ],
            p: 700,
            w: 1.5,
          },
          {
            t: [
              "Product configurator",
              "Produktkonfigurator",
              "Ürün yapılandırıcı",
            ],
            p: 900,
            w: 2,
          },
        ],
        dsg: [
          {
            t: [
              "I already have a design",
              "Ich habe schon ein Design",
              "Hazır bir tasarımım var",
            ],
            p: -200,
            w: -0.5,
          },
          {
            t: [
              "I need a design",
              "Ich brauche ein Design",
              "Tasarıma ihtiyacım var",
            ],
            p: 0,
            w: 0,
          },
          {
            t: [
              "I need a design and brand identity",
              "Ich brauche Design und Markenauftritt",
              "Tasarım ve marka kimliğine ihtiyacım var",
            ],
            d: [
              "Logo, colours and typography.",
              "Logo, Farben und Typografie.",
              "Logo, renkler ve tipografi.",
            ],
            p: 300,
            w: 0.8,
          },
        ],
        cq: ["Product content", "Produktinhalte", "Ürün içeriği"],
        cnt: [
          {
            t: [
              "My product data and photos are ready",
              "Produktdaten und Fotos liegen vor",
              "Ürün verilerim ve fotoğraflarım hazır",
            ],
            p: 0,
            w: 0,
          },
          {
            t: [
              "I need help with product texts and photos",
              "Ich brauche Hilfe bei Produkttexten und Fotos",
              "Ürün metinleri ve fotoğraflar için yardıma ihtiyacım var",
            ],
            p: 250,
            w: 0.7,
          },
        ],
      },
      app: {
        feats: [
          {
            t: [
              "User logins and roles",
              "Nutzer-Logins und Rollen",
              "Kullanıcı girişleri ve roller",
            ],
            p: 400,
            w: 1,
          },
          {
            t: [
              "Payments or subscriptions",
              "Zahlungen oder Abos",
              "Ödemeler veya abonelikler",
            ],
            p: 600,
            w: 1.2,
          },
          {
            t: [
              "Connections to other tools (APIs)",
              "Anbindung anderer Tools (APIs)",
              "Diğer araçlarla bağlantılar (API'ler)",
            ],
            p: 500,
            w: 1.2,
          },
          {
            t: [
              "Dashboards and reports",
              "Dashboards und Berichte",
              "Paneller ve raporlar",
            ],
            p: 500,
            w: 1,
          },
          {
            t: [
              "Email or SMS notifications",
              "E-Mail- oder SMS-Benachrichtigungen",
              "E-posta veya SMS bildirimleri",
            ],
            p: 250,
            w: 0.5,
          },
          {
            t: [
              "File uploads and documents",
              "Datei-Uploads und Dokumente",
              "Dosya yükleme ve belgeler",
            ],
            p: 250,
            w: 0.5,
          },
          {
            t: ["Admin panel", "Admin-Bereich", "Yönetim paneli"],
            p: 600,
            w: 1.2,
          },
          {
            t: [
              "Works like an app on phones (PWA)",
              "Funktioniert wie eine App auf dem Handy (PWA)",
              "Telefonda uygulama gibi çalışır (PWA)",
            ],
            p: 400,
            w: 1,
          },
          {
            t: [
              "Smart automation or AI features",
              "Intelligente Automatisierung oder KI-Funktionen",
              "Akıllı otomasyon veya yapay zekâ özellikleri",
            ],
            p: 900,
            w: 2,
          },
        ],
        dsg: [
          {
            t: [
              "I already have a design",
              "Ich habe schon ein Design",
              "Hazır bir tasarımım var",
            ],
            p: -450,
            w: -1,
          },
          {
            t: [
              "I need a design",
              "Ich brauche ein Design",
              "Tasarıma ihtiyacım var",
            ],
            p: 0,
            w: 0,
          },
          {
            t: [
              "I need a design and brand identity",
              "Ich brauche Design und Markenauftritt",
              "Tasarım ve marka kimliğine ihtiyacım var",
            ],
            p: 300,
            w: 0.8,
          },
        ],
        cq: ["Requirements", "Anforderungen", "Gereksinimler"],
        cnt: [
          {
            t: [
              "I have specs or a clear idea",
              "Ich habe Vorgaben oder eine klare Idee",
              "Net bir fikrim ya da dokümanım var",
            ],
            p: 0,
            w: 0,
          },
          {
            t: [
              "I need help defining the requirements",
              "Ich brauche Hilfe bei den Anforderungen",
              "Gereksinimleri belirlemek için yardıma ihtiyacım var",
            ],
            d: [
              "A short planning workshop first.",
              "Zuerst ein kurzer Planungs-Workshop.",
              "Önce kısa bir planlama toplantısı yaparız.",
            ],
            p: 400,
            w: 1,
          },
        ],
      },
    },
    time: [
      {
        t: [
          "As soon as possible",
          "So schnell wie möglich",
          "Mümkün olan en kısa sürede",
        ],
        d: [
          "Priority slot, about 20% extra.",
          "Bevorzugter Termin, etwa 20 % Aufpreis.",
          "Öncelikli takvim, yaklaşık %20 ek ücret.",
        ],
        m: 0.2,
        wm: 0.7,
      },
      {
        t: [
          "In the next 1 to 2 months",
          "In den nächsten 1 bis 2 Monaten",
          "Önümüzdeki 1 ila 2 ay içinde",
        ],
        d: [
          "Our standard schedule.",
          "Unser Standardzeitplan.",
          "Standart zaman planımız.",
        ],
        m: 0,
        wm: 1,
      },
      {
        t: [
          "Flexible, no rush",
          "Flexibel, kein Zeitdruck",
          "Esnek, acelem yok",
        ],
        d: [
          "Scheduled around other projects, 5% less.",
          "Wir planen es flexibel ein, 5 % günstiger.",
          "Takvimimize göre planlarız, %5 indirimli.",
        ],
        m: -0.05,
        wm: 1.2,
      },
    ],
    mini: [
      { type: "shop", size: 1, feats: [0, 2], dsg: 1, cnt: 0, time: 1 },
      { type: "business", size: 2, feats: [0, 3], dsg: 1, cnt: 1, time: 1 },
      { type: "app", size: 1, feats: [0, 3, 6], dsg: 0, cnt: 0, time: 2 },
    ],
    ui: {
      eb: ["Project estimator", "Projekt-Rechner", "Proje hesaplayıcı"],
      step: ["Step {n} of {m}", "Schritt {n} von {m}", "Adım {n} / {m}"],
      ready: ["Your estimate", "Dein Ergebnis", "Sonucunuz"],
      close: ["Close", "Schließen", "Kapat"],
      back: ["Back", "Zurück", "Geri"],
      next: ["Continue", "Weiter", "Devam"],
      skip: ["Skip this step", "Schritt überspringen", "Bu adımı atla"],
      see: ["See my estimate", "Ergebnis ansehen", "Tahminimi gör"],
      est: ["Estimate", "Schätzung", "Tahmin"],
      est_l: ["Your estimate", "Deine Schätzung", "Tahmininiz"],
      acc: ["Accuracy", "Genauigkeit", "Doğruluk"],
      timeline: ["Typical timeline", "Typischer Zeitrahmen", "Tipik süre"],
      hint0: [
        "Pick what you want to build and your estimate appears here. It updates with every answer.",
        "Wähle, was du umsetzen möchtest, und deine Schätzung erscheint hier. Sie aktualisiert sich mit jeder Antwort.",
        "Ne yaptırmak istediğinizi seçin, tahmininiz burada görünsün. Her yanıtla güncellenir.",
      ],
      hint1: [
        "This range narrows with every answer you give.",
        "Diese Spanne wird mit jeder Antwort genauer.",
        "Bu aralık verdiğiniz her yanıtla daralır.",
      ],
      hint2: [
        "An indicative range. You always get a fixed price in writing before we start.",
        "Eine Orientierung. Den Festpreis bekommst du immer schriftlich, bevor wir starten.",
        "Yaklaşık bir aralıktır. Başlamadan önce her zaman yazılı, sabit bir fiyat alırsınız.",
      ],
      hintu: [
        "Every project is different. We will work out scope and price together in a short call.",
        "Jedes Projekt ist anders. Umfang und Preis klären wir gemeinsam in einem kurzen Gespräch.",
        "Her proje farklıdır. Kapsamı ve fiyatı kısa bir görüşmede birlikte belirleriz.",
      ],
      t1: [
        "No sign-up, no spam",
        "Keine Anmeldung, kein Spam",
        "Kayıt yok, spam yok",
      ],
      t2: [
        "Fixed price in writing before we start",
        "Festpreis schriftlich vor dem Start",
        "Başlamadan önce yazılı sabit fiyat",
      ],
      t3: [
        "Reply within one working day",
        "Antwort innerhalb eines Werktags",
        "Bir iş günü içinde yanıt",
      ],
      from: ["From", "Ab", "Başlangıç"],
      talk: ["Free call", "Kostenloses Gespräch", "Ücretsiz görüşme"],
      base: ["starting at", "ab", "başlangıç"],
      q_type: [
        "What are you looking to build?",
        "Was möchtest du umsetzen?",
        "Ne yaptırmak istiyorsunuz?",
      ],
      q_type_s: [
        "Choose the closest match. You can change it any time.",
        "Wähle das, was am besten passt. Du kannst es jederzeit ändern.",
        "Size en yakın seçeneği seçin. İstediğiniz zaman değiştirebilirsiniz.",
      ],
      q_feat: [
        "Which features do you need?",
        "Welche Funktionen brauchst du?",
        "Hangi özelliklere ihtiyacınız var?",
      ],
      q_feat_s: [
        "Pick everything that applies, or skip if you are unsure.",
        "Wähle alles, was passt, oder überspringe den Schritt.",
        "Uygun olanların hepsini seçin ya da emin değilseniz bu adımı atlayın.",
      ],
      q_dsg: [
        "What do you already have?",
        "Was ist schon vorhanden?",
        "Elinizde neler var?",
      ],
      q_dsg_s: [
        "This helps us avoid work you do not need.",
        "So vermeiden wir Arbeit, die du nicht brauchst.",
        "Böylece ihtiyacınız olmayan işlerden kaçınırız.",
      ],
      g_dsg: ["Design", "Design", "Tasarım"],
      q_time: [
        "When do you want to launch?",
        "Wann soll es live gehen?",
        "Ne zaman yayına almak istiyorsunuz?",
      ],
      q_time_s: [
        "A rough idea is enough.",
        "Eine grobe Vorstellung genügt.",
        "Kabaca bir fikir yeterli.",
      ],
      q_res: [
        "Your estimate is ready",
        "Deine Schätzung ist fertig",
        "Tahmininiz hazır",
      ],
      q_res_s: [
        "Send it to us and we come back with a written quote within one working day. No obligation.",
        "Schick sie uns, und wir melden uns innerhalb eines Werktags mit einem schriftlichen Angebot. Unverbindlich.",
        "Bize gönderin, bir iş günü içinde yazılı bir teklifle dönelim. Hiçbir yükümlülük yok.",
      ],
      q_unsure: [
        "Let us figure it out together",
        "Lass es uns gemeinsam klären",
        "Birlikte netleştirelim",
      ],
      q_unsure_s: [
        "Tell us a little about your idea. We will suggest the simplest solution and a fair price after a short call.",
        "Erzähl uns kurz von deiner Idee. Nach einem kurzen Gespräch schlagen wir die einfachste Lösung und einen fairen Preis vor.",
        "Fikrinizden kısaca bahsedin. Kısa bir görüşmenin ardından en basit çözümü ve adil bir fiyatı önerelim.",
      ],
      f_name: ["Your name", "Dein Name", "Adınız"],
      f_mail: ["Your email", "Deine E-Mail", "E-posta adresiniz"],
      f_msg: [
        "Anything we should know? (optional)",
        "Sollen wir noch etwas wissen? (optional)",
        "Bilmemiz gereken başka bir şey var mı? (isteğe bağlı)",
      ],
      e_name: [
        "Please enter your name.",
        "Bitte gib deinen Namen ein.",
        "Lütfen adınızı girin.",
      ],
      e_mail: [
        "Please enter a valid email address.",
        "Bitte gib eine gültige E-Mail-Adresse ein.",
        "Lütfen geçerli bir e-posta adresi girin.",
      ],
      send: [
        "Send my estimate request",
        "Schätzung anfragen",
        "Talebimi gönder",
      ],
      sendu: [
        "Request a free call",
        "Kostenloses Gespräch anfragen",
        "Ücretsiz görüşme iste",
      ],
      fine: [
        "We only use your details to reply to this request.",
        "Wir nutzen deine Angaben nur, um auf diese Anfrage zu antworten.",
        "Bilgilerinizi yalnızca bu talebe yanıt vermek için kullanırız.",
      ],
      wa: ["Send via WhatsApp", "Per WhatsApp senden", "WhatsApp ile gönder"],
      copy: ["Copy summary", "Zusammenfassung kopieren", "Özeti kopyala"],
      copied: ["Copied", "Kopiert", "Kopyalandı"],
      reset: ["Start over", "Neu starten", "Baştan başla"],
      mail: ["Send by email", "Per E-Mail senden", "E-posta ile gönder"],
      sending: ["Sending…", "Wird gesendet…", "Gönderiliyor…"],
      e_send: [
        "That did not go through. Please try again, or use one of the options below.",
        "Das hat leider nicht geklappt. Versuch es bitte noch einmal oder nutze eine der Optionen unten.",
        "Gönderilemedi. Lütfen tekrar deneyin ya da aşağıdaki seçeneklerden birini kullanın.",
      ],
      ok_h2: ["Thank you, {name}!", "Danke, {name}!", "Teşekkürler, {name}!"],
      ok_p2: [
        "Your request has reached us. You will get a reply at {email} within one working day.",
        "Deine Anfrage ist bei uns angekommen. Du bekommst innerhalb eines Werktags eine Antwort an {email}.",
        "Talebiniz bize ulaştı. Bir iş günü içinde {email} adresine yanıt alacaksınız.",
      ],
      ok_h: [
        "Almost done, {name}!",
        "Fast geschafft, {name}!",
        "Neredeyse bitti, {name}!",
      ],
      ok_p: [
        "Your email app should open with everything filled in. Just press send. Nothing opened? Copy the summary and email it to {email}.",
        "Dein E-Mail-Programm sollte sich mit allem Ausgefüllten öffnen. Du musst nur noch senden. Nichts passiert? Kopiere die Zusammenfassung und schick sie an {email}.",
        "E-posta uygulamanız her şey doldurulmuş hâlde açılmalı. Sadece gönder'e basın. Hiçbir şey açılmadı mı? Özeti kopyalayıp {email} adresine gönderin.",
      ],
      s_title: [
        "Project estimate request",
        "Anfrage Projektschätzung",
        "Proje tahmini talebi",
      ],
      s_type: ["Project", "Projekt", "Proje"],
      s_range: [
        "Estimated range (indicative)",
        "Geschätzte Spanne (unverbindlich)",
        "Tahmini aralık (gösterge niteliğinde)",
      ],
      s_time: ["Typical timeline", "Typischer Zeitrahmen", "Tipik süre"],
      s_name: ["Name", "Name", "Ad"],
      s_mail: ["Email", "E-Mail", "E-posta"],
      s_msg: ["Notes", "Anmerkungen", "Notlar"],
      u_days: ["days", "Tage", "gün"],
      u_weeks: ["weeks", "Wochen", "hafta"],
      key: [
        "Tip: press 1 to 9 to choose",
        "Tipp: Mit 1 bis 9 auswählen",
        "İpucu: seçmek için 1–9 tuşlarını kullanın",
      ],
      mini_h: ["Live estimate", "Live-Schätzung", "Canlı tahmin"],
      shared: [" ", " ", " "],
    },
  };
})();
/* ==========================================================================
   SITE  -  the public address of the site. build.mjs uses it for everything
   search engines and link previews read: canonical and hreflang links, the
   sitemap, Open Graph tags and the structured data.
   PLACEHOLDER: put your real domain here (no slash at the end), then run
   "node build.mjs" again.
   ========================================================================== */
window.SITE = {
  url: "https://ekremilkan.github.io/portfolio",
  name: "Yourname",
};
/* ==========================================================================
   FORM  -  where the estimator sends a request. The site has no server of its
   own; a form service forwards each request to your inbox.
   key : your free access key from https://web3forms.com (it is meant to be
         public). While it is empty, the form opens the visitor's own email
         app with everything filled in instead.
   ========================================================================== */
window.FORM = {
  url: "https://api.web3forms.com/submit",
  key: "e358d6bf-9507-45a7-9ef6-af1051ca2dbd",
};
/* ==========================================================================
   FOOTER  -  edit links, company name and contact details here.
   Texts are ['English','Deutsch','Türkçe']. The legal pages live in
   src/legal/ (German law, DDG / DSGVO, requires at least an Impressum and a
   privacy policy on commercial sites; have them written or checked by a
   professional).
   ========================================================================== */
window.FOOTER = {
  name: "Yourname",
  email: "hello@yourdomain.com",
  whatsapp:
    "490000000000" /* PLACEHOLDER: your number, country code first, digits only (49 = Germany) */,
  waText: [
    "Hi! I found your website and would like to talk about a project.",
    "Hallo! Ich habe eure Website gefunden und würde gern über ein Projekt sprechen.",
    "Merhaba! Web sitenizi gördüm, bir proje hakkında konuşmak istiyorum.",
  ],
  nav: [
    { t: ["Work", "Projekte", "Projeler"], href: "#work" },
    { t: ["Services", "Leistungen", "Hizmetler"], href: "#services" },
    { t: ["Pricing", "Preise", "Fiyatlar"], href: "#pricing" },
    {
      t: ["Price estimator", "Projekt-Rechner", "Fiyat hesaplayıcı"],
      href: "#estimate",
      estimator: true,
    },
  ],
  services: [
    { t: ["Websites", "Websites", "Web siteleri"], href: "#services" },
    { t: ["E-commerce", "E-Commerce", "E-ticaret"], href: "#services" },
    {
      t: ["Web applications", "Web-Anwendungen", "Web uygulamaları"],
      href: "#services",
    },
    { t: ["Redesign", "Redesign", "Yeniden tasarım"], href: "#pricing" },
  ],
  contact: [
    {
      t: [
        "hello@yourdomain.com",
        "hello@yourdomain.com",
        "hello@yourdomain.com",
      ],
      href: "mailto:hello@yourdomain.com",
    },
    {
      t: ["+49 000 0000000", "+49 000 0000000", "+49 000 0000000"],
      href: "tel:+490000000000",
    },
    { t: ["WhatsApp", "WhatsApp", "WhatsApp"], wa: true },
    {
      t: [
        "Germany, working worldwide",
        "Deutschland, weltweit aktiv",
        "Almanya merkezli, dünya çapında",
      ],
    },
  ],
  legal: [
    {
      t: ["Legal notice (Impressum)", "Impressum", "Künye (Impressum)"],
      href: "impressum/",
    },
    {
      t: ["Privacy policy", "Datenschutzerklärung", "Gizlilik politikası"],
      href: "datenschutz/",
    },
    { t: ["Terms (AGB)", "AGB", "Genel şartlar (AGB)"], href: "agb/" },
  ],
};
/* ==========================================================================
   CURRENCY  -  all prices are in EUR. "locale" only decides how a number is
   written per language ("199 €" in German, "€199" in English).
   ========================================================================== */
window.CURRENCY = {
  base: "EUR",
  locale: { de: "de-DE", en: "en-US", tr: "tr-TR" },
};
