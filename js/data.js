/* ==========================================================================
   PROJECTS  -  this is the ONLY place you edit to add or change portfolio work.
   To add a project: copy one object below, paste it at the end of the list,
   and change the fields. Texts are ['English','Deutsch','Türkçe'] triples.

   cat   : 'web' | 'shop' | 'app'           (filter buttons build themselves)
   art   : 'site' | 'shop' | 'dash' | 'cal' | 'map'   generated cover artwork
   img   : optional screenshot URL/path. If set, it replaces the generated art.
   c1,c2 : cover gradient colours    a : accent colour used inside the artwork
   stats : n = number, d = decimals, p = prefix, s = suffix (string or [en,de,tr]; p too)
   NOTE: Turkish puts % in front (%38), so % stats use p/s triples.
   url   : optional live site link (shows a "Visit live site" button)
   quote : optional testimonial (delete the line if you have none)

   NOTE: everything below is PLACEHOLDER content (invented clients, numbers and
   a sample quote). Replace it with real projects before publishing.
   ========================================================================== */
window.PROJECTS = [
  {
    id: "nordlicht",
    cat: "web",
    year: 2025,
    art: "site",
    c1: "#0E3B43",
    c2: "#3FD0C9",
    a: "#3FD0C9",
    title: "Nordlicht Studio",
    client: ["Architecture studio", "Architekturbüro", "Mimarlık ofisi"],
    summary: [
      "A portfolio site that turns visitors into project inquiries.",
      "Eine Portfolio-Website, die Besucher zu Anfragen macht.",
      "Ziyaretçileri proje talebine dönüştüren bir portfolyo sitesi.",
    ],
    result: ["2× more inquiries", "2× mehr Anfragen", "2× daha fazla talep"],
    tags: ["Next.js", "Sanity CMS", "SEO"],
    time: ["3 weeks", "3 Wochen", "3 hafta"],
    url: "",
    challenge: [
      "The projects were beautiful, but the old site was slow and hid the contact path. Visitors left before they got in touch.",
      "Die Projekte waren stark, aber die alte Seite war langsam und versteckte den Kontaktweg. Besucher gingen, bevor sie sich meldeten.",
      "Projeler etkileyiciydi, ama eski site yavaştı ve iletişime geçmeyi zorlaştırıyordu. Ziyaretçiler ulaşmadan ayrılıyordu.",
    ],
    did: [
      [
        "Restructured the site around three clear entry points.",
        "Die Website rund um drei klare Einstiege neu aufgebaut.",
        "Siteyi üç net giriş noktası etrafında yeniden yapılandırdık.",
      ],
      [
        "Rebuilt the design for speed and large imagery.",
        "Das Design für Tempo und große Bilder neu gebaut.",
        "Tasarımı hızlı açılacak ve büyük görselleri öne çıkaracak şekilde yeniledik.",
      ],
      [
        "Added a simple inquiry flow with clear next steps.",
        "Einen einfachen Anfrageweg mit klaren nächsten Schritten eingebaut.",
        "Ziyaretçiyi adım adım iletişime yönlendiren basit bir talep formu ekledik.",
      ],
    ],
    stats: [
      {
        n: 2,
        s: "×",
        l: ["more inquiries", "mehr Anfragen", "daha fazla talep"],
      },
      {
        n: 0.9,
        d: 1,
        s: [" s", " s", " sn"],
        l: [
          "average load time",
          "durchschnittliche Ladezeit",
          "ortalama yüklenme süresi",
        ],
      },
      {
        n: 100,
        l: [
          "Lighthouse SEO score",
          "Lighthouse-SEO-Score",
          "Lighthouse SEO puanı",
        ],
      },
    ],
    quote: {
      t: [
        "We finally have a website that feels like our work.",
        "Endlich haben wir eine Website, die sich wie unsere Arbeit anfühlt.",
        "Sonunda işimizi yansıtan bir web sitemiz var.",
      ],
      w: ["Managing partner", "Geschäftsführende Partnerin", "Yönetici ortak"],
    },
  },

  {
    id: "kaffeeklatsch",
    cat: "shop",
    year: 2025,
    art: "shop",
    c1: "#3B2416",
    c2: "#D9A066",
    a: "#C27A3A",
    title: "Kaffeeklatsch Roasters",
    client: ["Coffee roastery", "Kaffeerösterei", "Kahve kavurma atölyesi"],
    summary: [
      "An online shop with subscriptions for a small roastery.",
      "Ein Onlineshop mit Abos für eine kleine Rösterei.",
      "Küçük bir kavurma atölyesi için abonelikli bir online mağaza.",
    ],
    result: [
      "+38% repeat orders",
      "+38 % Wiederholungskäufe",
      "+%38 tekrar sipariş",
    ],
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    time: ["5 weeks", "5 Wochen", "5 hafta"],
    url: "",
    challenge: [
      "Orders arrived by message and spreadsheet, and regular customers had no easy way to reorder.",
      "Bestellungen kamen per Nachricht und Tabelle, und Stammkunden konnten nicht einfach nachbestellen.",
      "Siparişler mesajla ve tablolar üzerinden geliyordu; düzenli müşteriler kolayca yeniden sipariş veremiyordu.",
    ],
    did: [
      [
        "A catalogue with variants and grind options.",
        "Ein Katalog mit Varianten und Mahlgraden.",
        "Varyant ve öğütme seçenekleri sunan bir katalog.",
      ],
      [
        "Subscriptions for regular deliveries.",
        "Abos für regelmäßige Lieferungen.",
        "Düzenli teslimatlar için abonelikler.",
      ],
      [
        "Order and invoice emails sent automatically.",
        "Bestell- und Rechnungs-E-Mails automatisch versendet.",
        "Sipariş ve fatura e-postaları otomatik gönderiliyor.",
      ],
    ],
    stats: [
      {
        n: 38,
        p: ["+", "+", "+%"],
        s: ["%", "%", ""],
        l: ["repeat orders", "Wiederholungskäufe", "tekrar sipariş"],
      },
      {
        n: 12,
        s: [" h", " h", " sa"],
        l: ["saved every week", "pro Woche gespart", "haftalık tasarruf"],
      },
      {
        n: 3,
        s: [" min", " min", " dk"],
        l: [
          "average checkout",
          "durchschnittlicher Checkout",
          "ortalama ödeme süresi",
        ],
      },
    ],
  },

  {
    id: "flowdesk",
    cat: "app",
    year: 2024,
    art: "dash",
    c1: "#2B1F6B",
    c2: "#8B7CFF",
    a: "#8B7CFF",
    title: "FlowDesk",
    client: ["Service company", "Dienstleistungsunternehmen", "Hizmet şirketi"],
    summary: [
      "A dashboard that replaced a weekly spreadsheet routine.",
      "Ein Dashboard, das eine wöchentliche Tabellen-Routine ersetzt hat.",
      "Haftalık tablo rutininin yerini alan bir yönetim paneli.",
    ],
    result: [
      "12 h saved every week",
      "12 h pro Woche gespart",
      "Haftada 12 saat tasarruf",
    ],
    tags: ["React", "Node.js", "PostgreSQL"],
    time: ["8 weeks", "8 Wochen", "8 hafta"],
    url: "",
    challenge: [
      "Every Friday, reports were assembled by hand from five different spreadsheets.",
      "Jeden Freitag wurden Berichte von Hand aus fünf Tabellen zusammengebaut.",
      "Her cuma raporlar beş farklı tablodan elle derleniyordu.",
    ],
    did: [
      [
        "One dashboard with live numbers.",
        "Ein Dashboard mit Live-Zahlen.",
        "Canlı rakamlar gösteren tek bir panel.",
      ],
      [
        "Logins and roles for each team.",
        "Logins und Rollen für jedes Team.",
        "Her ekip için kullanıcı girişleri ve roller.",
      ],
      [
        "An automatic weekly report by email.",
        "Ein automatischer Wochenbericht per E-Mail.",
        "E-postayla gelen otomatik haftalık rapor.",
      ],
    ],
    stats: [
      {
        n: 12,
        s: [" h", " h", " sa"],
        l: ["saved every week", "pro Woche gespart", "haftalık tasarruf"],
      },
      { n: 5, l: ["tools replaced", "Tools ersetzt", "araç tek panelde"] },
      {
        n: 100,
        p: ["", "", "%"],
        s: ["%", "%", ""],
        l: ["reports on time", "Berichte pünktlich", "raporlar zamanında"],
      },
    ],
  },

  {
    id: "alpenphysio",
    cat: "web",
    year: 2024,
    art: "cal",
    c1: "#7FA36B",
    c2: "#DDE8D6",
    a: "#3F7A2C",
    title: "Alpen Physio",
    client: [
      "Physiotherapy clinic",
      "Physiotherapie-Praxis",
      "Fizyoterapi kliniği",
    ],
    summary: [
      "A clinic website with online booking that keeps the calendar full.",
      "Eine Praxis-Website mit Online-Buchung, die den Kalender füllt.",
      "Online randevuyla takvimi dolu tutan bir klinik web sitesi.",
    ],
    result: [
      "60% fewer booking calls",
      "60 % weniger Buchungsanrufe",
      "%60 daha az randevu araması",
    ],
    tags: ["Next.js", "Booking API", "Accessibility"],
    time: ["4 weeks", "4 Wochen", "4 hafta"],
    url: "",
    challenge: [
      "The front desk spent hours on the phone booking appointments.",
      "Die Anmeldung verbrachte Stunden am Telefon mit Terminbuchungen.",
      "Resepsiyon, randevu vermek için telefonda saatler harcıyordu.",
    ],
    did: [
      [
        "A clear page for each treatment.",
        "Eine klare Seite für jede Behandlung.",
        "Her tedavi için net bir sayfa.",
      ],
      [
        "Online booking synced with their calendar.",
        "Online-Buchung, synchron mit ihrem Kalender.",
        "Kliniğin takvimiyle senkronize online randevu.",
      ],
      [
        "Reminders that reduce no-shows.",
        "Erinnerungen, die Terminausfälle senken.",
        "Randevuya gelmeme oranını düşüren hatırlatmalar.",
      ],
    ],
    stats: [
      {
        n: 60,
        p: ["−", "−", "−%"],
        s: ["%", "%", ""],
        l: ["booking calls", "Buchungsanrufe", "randevu araması"],
      },
      {
        n: 24,
        p: ["", "", "7/"],
        s: ["/7", "/7", ""],
        l: ["online booking", "Online-Buchung", "online randevu"],
      },
      {
        n: 100,
        p: ["", "", "%"],
        s: ["%", "%", ""],
        l: ["mobile friendly", "mobilfreundlich", "mobil uyumlu"],
      },
    ],
  },

  {
    id: "fahrwerk",
    cat: "app",
    year: 2023,
    art: "map",
    c1: "#18202B",
    c2: "#FF8A3D",
    a: "#FF8A3D",
    title: "Fahrwerk Logistik",
    client: [
      "Regional delivery company",
      "Regionales Lieferunternehmen",
      "Bölgesel teslimat şirketi",
    ],
    summary: [
      "A live tracking portal for customers and dispatchers.",
      "Ein Live-Tracking-Portal für Kunden und Disponenten.",
      "Müşteriler ve sevkiyat ekibi için canlı takip portalı.",
    ],
    result: [
      "45% fewer status calls",
      "45 % weniger Statusanrufe",
      "%45 daha az durum araması",
    ],
    tags: ["React", "Node.js", "Maps API"],
    time: ["10 weeks", "10 Wochen", "10 hafta"],
    url: "",
    challenge: [
      "Customers kept calling to ask where their delivery was.",
      "Kunden riefen ständig an, um zu fragen, wo ihre Lieferung ist.",
      "Müşteriler teslimatlarının nerede olduğunu sormak için sürekli arıyordu.",
    ],
    did: [
      [
        "A live map with delivery status.",
        "Eine Live-Karte mit Lieferstatus.",
        "Teslimat durumunu gösteren canlı bir harita.",
      ],
      [
        "One portal for customers and dispatchers.",
        "Ein Portal für Kunden und Disponenten.",
        "Müşteriler ve sevkiyat ekibi için tek bir portal.",
      ],
      [
        "Automatic notifications on delivery.",
        "Automatische Benachrichtigungen bei Lieferung.",
        "Teslimatta otomatik bildirimler.",
      ],
    ],
    stats: [
      {
        n: 45,
        p: ["−", "−", "−%"],
        s: ["%", "%", ""],
        l: ["status calls", "Statusanrufe", "durum araması"],
      },
      {
        n: 1,
        l: ["portal for everyone", "Portal für alle", "herkes için tek portal"],
      },
      {
        n: 10,
        s: [" weeks", " Wochen", " hafta"],
        l: ["from idea to live", "von der Idee bis live", "fikirden yayına"],
      },
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
   FOOTER  -  edit links, company name and legal pages here.
   href values are PLACEHOLDERS: point them to your real pages
   (for example /impressum, /datenschutz). Texts are ['English','Deutsch','Türkçe'].
   German law (DDG / DSGVO) requires at least an Impressum and a privacy
   policy on commercial sites; have them written or checked by a professional.
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
  social: [
    {
      t: ["LinkedIn", "LinkedIn", "LinkedIn"],
      href: "https://www.linkedin.com/",
      ext: 1,
    },
    { t: ["GitHub", "GitHub", "GitHub"], href: "https://github.com/", ext: 1 },
    {
      t: ["Instagram", "Instagram", "Instagram"],
      href: "https://www.instagram.com/",
      ext: 1,
    },
  ],
  legal: [
    {
      t: ["Legal notice (Impressum)", "Impressum", "Künye (Impressum)"],
      href: "/impressum",
    },
    {
      t: ["Privacy policy", "Datenschutzerklärung", "Gizlilik politikası"],
      href: "/datenschutz",
    },
    { t: ["Terms (AGB)", "AGB", "Genel şartlar (AGB)"], href: "/agb" },
    {
      t: ["Cookie settings", "Cookie-Einstellungen", "Çerez ayarları"],
      href: "#cookies",
      cookies: true,
    },
  ],
};
/* ==========================================================================
   RATES  -  hand-maintained exchange rates for the "≈" hint next to prices.
   EUR is the real (contract and invoice) currency. Nothing is fetched live:
   update the numbers and the date yourself. 1 EUR = <value> units.
   The values below are PLACEHOLDERS (1.00). While a rate is missing or not a
   positive number, no "≈" hint is shown for that currency.
   ========================================================================== */
window.RATES = {
  updated: "2026-10-01",
  base: "EUR",
  USD: 1.0,
  TRY: 1.0,
};
/* ==========================================================================
   CURRENCY  -  which hint currency each language shows next to EUR, and the
   locale used to format numbers. null = EUR only (no hint).
   Regional pricing later: a price may also be an object such as
   { EUR: 499, TRY: 17900 }. formatMoney() in js/app.js then shows that fixed
   TRY price instead of converting with RATES. Nothing else has to change.
   ========================================================================== */
window.CURRENCY = {
  base: "EUR",
  show: { de: null, en: "USD", tr: "TRY" },
  locale: { de: "de-DE", en: "en-US", tr: "tr-TR" },
};
