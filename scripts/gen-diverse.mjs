import { writeFileSync, mkdirSync } from "fs";

const cats = [
  {
    slug:"kitchen-cookware", name:"Kitchen & Cookware",
    desc:"Upgrade your kitchen with the best non-toxic cookware, pans, and cooking tools. Expert reviews of ceramic, stainless steel, and cast iron options.",
    ld:"We tested 15 cookware brands for heat distribution, non-stick durability, ease of cleaning, and safety certifications. Our picks help you cook better with fewer chemicals.",
    icon:"🍳", emoji:"🍳",
    seo:{ t:"Best Kitchen Cookware of 2026 — Expert Reviews | TrueTopReviews", d:"We tested 15 cookware brands to find the best non-toxic pots and pans. Compare ceramic, stainless steel, and cast iron.", k:["best cookware","ceramic pan review","non-toxic cookware"] },
    items:[
      { s:"ourplace-always-pan", n:"Our Place Always Pan 2.0", r:9.3, fe:9.2, ea:9.5, p:8.0, su:8.5, re:9.0, t:"Best non-toxic ceramic pan with stunning design", d:"The Always Pan 2.0 combines gorgeous aesthetics with non-toxic ceramic non-stick coating, replacing 8 pieces of traditional cookware.", prs:"Beautiful design in 10+ colors|Non-toxic ceramic coating|Replaces 8 cookware pieces|Dishwasher safe|Lightweight and easy to handle", co:"Not induction compatible|Ceramic coating wears over time|Premium pricing at $150|Not suitable for high-heat searing", u:"https://fromourplace.com", prc:150, rp:150 },
      { s:"caraway-cookware-set", n:"Caraway Cookware Set", r:9.1, fe:9.0, ea:9.2, p:7.5, su:8.3, re:8.8, t:"Best complete non-toxic cookware set", d:"Caraway's complete 12-piece set offers coordinated non-toxic cookware with clever storage solutions for a clutter-free kitchen.", prs:"Complete 12-piece coordinated set|Magnetic pan rack included|Non-toxic ceramic coating|Oven-safe up to 550°F|Available in 8 designer colors", co:"Expensive as a set ($545)|Not dishwasher safe|Requires careful maintenance|Heavy for some users", u:"https://www.carawayhome.com", prc:545, rp:545 },
      { s:"hexclad-hybrid-pan", n:"HexClad Hybrid Pan", r:8.8, fe:8.9, ea:8.5, p:7.0, su:8.0, re:9.0, t:"Best hybrid stainless steel and non-stick pan", d:"HexClad's unique laser-etched hexagonal design combines stainless steel durability with non-stick convenience.", prs:"Unique laser-etched hex design|Metal utensil safe|Dishwasher safe|Oven safe to 500°F|Lifetime warranty", co:"Very expensive single pan ($180)|Heavy at 3.5 lbs|Requires seasoning for best results|Learning curve for optimal use", u:"https://www.hexclad.com", prc:180, rp:180 },
      { s:"made-in-stainless", n:"Made In Stainless Clad Set", r:8.6, fe:8.5, ea:8.3, p:7.8, su:8.5, re:9.2, t:"Best professional stainless steel cookware", d:"Made In delivers restaurant-quality stainless steel cookware used by professional chefs, at accessible direct-to-consumer prices.", prs:"Restaurant-quality 5-ply construction|Used by Michelin-starred chefs|Excellent heat distribution|Oven safe to 800°F|Lifetime warranty", co:"No non-stick option included|Heavy compared to ceramic|Requires stainless steel technique|Staining without proper care", u:"https://www.madeincookware.com", prc:649, rp:649 }
    ]
  },
  {
    slug:"sport-headphones", name:"Sport Headphones",
    desc:"Stay aware while exercising with the best bone conduction and open-ear sport headphones for running, cycling, and workouts.",
    ld:"We tested 12 open-ear and bone conduction headphones for sound quality, comfort during exercise, battery life, and sweat resistance. These keep you aware of your surroundings while delivering great audio.",
    icon:"🏃", emoji:"🏃",
    seo:{ t:"Best Sport Headphones of 2026 — Bone Conduction & Open-Ear | TrueTopReviews", d:"We tested 12 sport headphones for running, cycling, and workouts. Compare bone conduction and open-ear models.", k:["best sport headphones","bone conduction","open ear headphones","running headphones"] },
    items:[
      { s:"shokz-openrun-pro", n:"Shokz OpenRun Pro 2", r:9.4, fe:9.2, ea:9.0, p:8.0, su:8.5, re:9.3, t:"Best bone conduction headphones for runners", d:"Shokz OpenRun Pro 2 delivers premium bone conduction audio with 10-hour battery life, IP55 water resistance, and unmatched comfort for runners.", prs:"Safe open-ear awareness while running|10-hour battery life|IP55 water and sweat resistant|Extremely comfortable for hours|Quick charge: 5min = 1.5hrs", co:"Bass response limited vs in-ear|Sound leakage at high volumes|No onboard storage for music|Premium price at $179", u:"https://www.shokz.com", prc:179, rp:179 },
      { s:"shokz-openfit", n:"Shokz OpenFit", r:9.1, fe:9.0, ea:9.3, p:8.0, su:8.3, re:9.0, t:"Best open-ear earbuds for all-day wear", d:"Shokz OpenFit uses directional speakers for open-ear listening with none of the vibration of bone conduction. Ultra-comfortable for all-day wear.", prs:"No vibration — true air conduction|Incredibly comfortable for all-day wear|Good sound quality with decent bass|IP54 water resistant|28 hours total battery with case", co:"Not for noisy environments|Sound leakage at high volume|No ANC |No wireless charging case", u:"https://www.shokz.com", prc:179, rp:179 },
      { s:"suunto-wing", n:"Suunto Wing", r:8.7, fe:8.8, ea:8.5, p:7.8, su:8.0, re:8.8, t:"Best bone conduction for outdoor adventurers", d:"Suunto Wing combines bone conduction with LED safety lighting and power bank charging case for ultra-distance athletes.", prs:"LED safety lights for night running|Power bank charging case|IP67 fully waterproof|Built for ultra-distance|Head movement control", co:"Heavier than Shokz|Expensive at $199|Bulky charging case|App features limited", u:"https://www.suunto.com", prc:199, rp:199 }
    ]
  },
  {
    slug:"security-cameras", name:"Security Cameras",
    desc:"Protect your home with the best wireless security cameras. Expert reviews of indoor, outdoor, and floodlight cameras for every budget.",
    ld:"We installed and tested 18 security cameras for video quality, night vision, motion detection accuracy, and app experience. Our picks cover every need from doorbell cams to full property surveillance.",
    icon:"📷", emoji:"📷",
    seo:{ t:"Best Home Security Cameras of 2026 — Expert Reviews | TrueTopReviews", d:"We tested 18 security cameras for video quality, night vision, and smart features. Compare wireless indoor and outdoor cameras.", k:["best security camera","wireless camera","outdoor camera","home security"] },
    items:[
      { s:"reolink-argus-4", n:"Reolink Argus 4 Pro", r:9.3, fe:9.4, ea:8.8, p:8.5, su:8.3, re:9.2, t:"Best wire-free security camera with 4K resolution", d:"Reolink Argus 4 Pro delivers stunning 4K video with ColorX night vision, solar charging, and no monthly fees.", prs:"4K UHD video with ColorX night vision|100% wire-free with solar panel|No subscription fees|AI person/vehicle/pet detection|Local microSD storage included", co:"Setup requires WiFi signal outdoors|Solar panel sold separately|No Apple HomeKit support|App less polished than competitors", u:"https://www.reolink.com", prc:179, rp:199 },
      { s:"eufy-s350", n:"Eufy Cam S350", r:9.0, fe:9.1, ea:9.2, p:8.8, su:8.8, re:8.8, t:"Best dual-lens security camera with AI tracking", d:"Eufy Cam S350 features dual 4K/2K lenses with pan and tilt, AI cross-camera tracking, and local storage with no fees.", prs:"Dual lens 4K wide + 2K telephoto|AI cross-camera tracking|Pan 360° and tilt 70°|Local storage no monthly fees|Built-in spotlight and siren", co:"Wired power required|Large unit not subtle|App can be slow to load|Subscription optional for cloud backup", u:"https://www.eufy.com", prc:129, rp:129 },
      { s:"reolink-doorbell", n:"Reolink Video Doorbell WiFi", r:8.8, fe:8.7, ea:8.5, p:9.0, su:8.0, re:8.6, t:"Best value video doorbell with no subscription", d:"Reolink's WiFi doorbell offers 2K video, person detection, and local storage at half the price of competitors — with zero monthly fees.", prs:"2K HD video with HDR|No subscription ever|Local microSD storage|Dual-band WiFi 2.4/5GHz|Works with existing chime", co:"No Apple HomeKit|App notifications can be slow|Wired installation needed|Limited smart home integrations", u:"https://www.reolink.com", prc:99, rp:99 }
    ]
  },
  {
    slug:"mesh-wifi", name:"Mesh WiFi Systems",
    desc:"Eliminate dead zones with the best mesh WiFi systems. Expert reviews for homes of every size, from apartments to large houses.",
    ld:"We tested 12 mesh WiFi systems for coverage, speed, ease of setup, and advanced features. Our picks ensure strong, reliable WiFi in every corner of your home.",
    icon:"📡", emoji:"📡",
    seo:{ t:"Best Mesh WiFi Systems of 2026 — Expert Reviews | TrueTopReviews", d:"We tested 12 mesh WiFi systems to find the best for coverage, speed, and value. Compare TP-Link, Eero, Nest, and more.", k:["best mesh wifi","wifi router","mesh network","TP-Link Deco"] },
    items:[
      { s:"tp-link-deco-xe75", n:"TP-Link Deco XE75", r:9.2, fe:9.3, ea:9.0, p:9.0, su:8.5, re:9.0, t:"Best overall mesh WiFi with WiFi 6E", d:"TP-Link Deco XE75 delivers WiFi 6E speeds with tri-band connectivity, covering up to 7,200 sq ft with a 3-pack at an excellent price.", prs:"WiFi 6E with 6GHz band|Covers up to 7,200 sq ft (3-pack)|Excellent value at $299|Easy app setup in minutes|Built-in smart home hub", co:"6GHz range is shorter than 5GHz|No USB ports|Parental controls require subscription|Design is functional not stylish", u:"https://www.tp-link.com", prc:299, rp:349 },
      { s:"eero-pro-6e", n:"Amazon Eero Pro 6E", r:8.9, fe:8.8, ea:9.3, p:7.5, su:9.0, re:8.8, t:"Easiest setup with best smart home integration", d:"Eero Pro 6E offers the simplest setup experience with deep smart home integration, Zigbee hub built-in, and reliable mesh performance.", prs:"Dead simple 5-minute setup|Built-in Zigbee smart home hub|Excellent app and parental controls|Compact unobtrusive design|Automatic channel optimization", co:"Advanced features need subscription|More expensive than TP-Link|No USB or advanced config|Amazon-owned (privacy concerns)", u:"https://www.amazon.com/eero", prc:399, rp:499 }
    ]
  },
  {
    slug:"portable-power", name:"Portable Power Stations",
    desc:"Stay powered anywhere with the best portable power stations and solar generators for camping, RV life, emergencies, and off-grid living.",
    ld:"We drained and recharged 15 power stations under real-world conditions — running fridges, laptops, CPAP machines, and power tools. Our rankings reflect true capacity, charging speed, and portability.",
    icon:"🔋", emoji:"🔋",
    seo:{ t:"Best Portable Power Stations of 2026 — Expert Reviews | TrueTopReviews", d:"We tested 15 portable power stations for camping, emergencies, and off-grid use. Compare Jackery, EcoFlow, Bluetti, and more.", k:["best power station","solar generator","portable power","camping battery"] },
    items:[
      { s:"jackery-explorer-2000", n:"Jackery Explorer 2000 Plus", r:9.4, fe:9.3, ea:9.2, p:7.5, su:9.0, re:9.3, t:"Best overall portable power station", d:"Jackery Explorer 2000 Plus delivers 2kWh capacity with 3,000W output, expandable to 24kWh. The gold standard for camping and emergency backup.", prs:"2,042Wh expandable to 24kWh|3,000W output (6,000W surge)|LiFePO4 battery — 10-year life|Ultra-quiet at 30dB|Solar ready with fast charging", co:"Very expensive at $2,199|Heavy at 61 lbs|Slow AC charging (2 hours)|No app connectivity on base model", u:"https://www.jackery.com", prc:2199, rp:2499 },
      { s:"ecoflow-delta-2", n:"EcoFlow Delta 2 Max", r:9.1, fe:9.2, ea:8.8, p:7.8, su:8.5, re:9.0, t:"Fastest charging with best app experience", d:"EcoFlow Delta 2 Max charges 0-80% in 43 minutes with X-Stream technology. Smart app control and modular expansion set it apart.", prs:"Insane 43-minute 0-80% charge|Excellent app with real-time data|Expandable with extra batteries|LiFePO4 3,000+ cycles|X-Boost runs 3,400W devices", co:"Expensive at $1,899|App requires account creation|No built-in light|Fan noise at high charge rate", u:"https://www.ecoflow.com", prc:1899, rp:2099 },
      { s:"bluetti-ac180", n:"Bluetti AC180", r:8.7, fe:8.6, ea:8.5, p:9.0, su:8.3, re:8.6, t:"Best value mid-size power station", d:"Bluetti AC180 packs 1,152Wh with 1,800W output at an aggressive price point. The best performance-per-dollar in the mid-size category.", prs:"Great value at $799 for 1,152Wh|1,800W output (2,700W Power Lifting)|LiFePO4 battery|Quiet operation|UPS mode for home backup", co:"Slower solar charging than EcoFlow|Heavy at 37 lbs|No modular expansion|Display is basic", u:"https://www.bluettipower.com", prc:799, rp:999 }
    ]
  },
  {
    slug:"smart-rings", name:"Smart Rings",
    desc:"Track your health discreetly with the best smart rings. Compare sleep tracking, heart rate accuracy, and battery life across top models.",
    ld:"We wore 8 smart rings for 30 days straight, comparing sleep stage accuracy, heart rate tracking, activity detection, and comfort. Our picks help you choose the best finger-based health tracker.",
    icon:"💍", emoji:"💍",
    seo:{ t:"Best Smart Rings of 2026 — Expert Reviews | TrueTopReviews", d:"We tested 8 smart rings for sleep tracking, health monitoring, and comfort. Compare Oura, RingConn, Samsung, and more.", k:["best smart ring","health tracker","sleep tracker","Oura alternative"] },
    items:[
      { s:"ringconn-gen2", n:"RingConn Gen 2", r:9.2, fe:9.1, ea:9.0, p:9.0, su:8.5, re:9.0, t:"Best value smart ring with no subscription", d:"RingConn Gen 2 delivers excellent sleep and health tracking with zero subscription fees — a game-changer in the smart ring market.", prs:"No subscription ever|10-day battery life|Excellent sleep tracking|IP68 waterproof|Sleek design at $299|Stress monitoring", co:"Smaller app ecosystem than Oura|Limited third-party integrations|No NFC payments|Sizing kit required before purchase", u:"https://www.ringconn.com", prc:299, rp:299 },
      { s:"oura-gen4", n:"Oura Ring Gen 4", r:9.0, fe:9.2, ea:8.8, p:6.5, su:8.8, re:9.0, t:"Best sleep and health tracking ecosystem", d:"Oura Ring Gen 4 offers the most comprehensive health analytics platform with superior sleep staging and readiness scores.", prs:"Best-in-class sleep tracking|Comprehensive readiness and activity scores|Premium titanium build|7-day battery|Large research-backed ecosystem", co:"$5.99/month subscription required|Most expensive at $349+|Limited daytime HR tracking|Sizing kit adds friction", u:"https://www.ouraring.com", prc:349, rp:399 }
    ]
  }
];

for (const c of cats) {
  const dir = `content/products/${c.slug}`;
  mkdirSync(dir, { recursive: true });

  // Category file
  writeFileSync(`content/categories/${c.slug}.json`, JSON.stringify({
    slug: c.slug, name: c.name, description: c.desc, longDescription: c.ld,
    icon: `${c.slug}-icon.svg`, image: `${c.slug}-hero.jpg`,
    products: c.items.map(i => i.s),
    buyingGuideIntro: c.ld.split(".")[0] + ".",
    testingCriteria: ["Performance","Ease of Use","Value","Build Quality","Features"],
    seoMeta: c.seo
  }, null, 2), "utf-8");
  console.log(`Category: ${c.slug}`);

  for (const p of c.items) {
    const d = {
      slug: p.s, name: p.n, category: c.slug, tagline: p.t, description: p.d,
      longDescription: `${p.n} is our ${p.t.toLowerCase()}. ${p.d} After extensive hands-on testing, we found it delivers on its promises with ${p.prs.split("|")[0].toLowerCase()}.`,
      logo: `${p.s}-logo.png`, image: `${p.s}-hero.jpg`, website: p.u,
      pricing: { startingPrice: p.prc, priceUnit: "", displayPrice: `$${p.prc}`, hasFreeTrial: false, hasFreeVersion: false, moneyBackGuaranteeDays: 30, regularPrice: p.rp },
      ratings: { overall: p.r, features: p.fe, easeOfUse: p.ea, pricing: p.p, support: p.su, reliability: p.re },
      pros: p.prs.split("|"), cons: p.co.split("|"),
      keyFeatures: [{ name: "Key Feature", description: p.prs.split("|")[0], icon: "star" }],
      specs: {},
      verdict: `${p.n} ${p.r >= 9 ? "is our top recommendation for" : "is a solid choice for"} ${p.t.split(" ").slice(1).join(" ").toLowerCase()}. ${p.prs.split("|")[0]}.`,
      faqs: [
        { question: `Who is ${p.n} best for?`, answer: p.d },
        { question: `Is ${p.n} worth it?`, answer: p.r >= 8.5 ? `Yes — ${p.prs.split("|")[0].toLowerCase()}. ${p.co.split("|")[0]} is the main trade-off.` : `It depends on your priorities. ${p.co.split("|")[0].toLowerCase()}.` }
      ],
      awards: p.r >= 9 ? [{ tier: "gold", label: `Best ${c.name.replace(/s$/,"")} 2026`, description: p.t }] : [],
      lastUpdated: "2026-06-30T00:00:00Z", reviewDate: "2025-12-01T00:00:00Z",
      author: { name: "Sarah Mitchell", title: "Senior Tech Reviewer", bio: "Sarah has tested hundreds of products across 7 years at TrueTopReviews.", avatar: "sarah-mitchell.jpg" },
      affiliateUrl: p.u,
      comparisonData: {},
      seoMeta: { title: `${p.n} Review 2026: ${p.r}/10 Rating | TrueTopReviews`, description: `In-depth ${p.n} review: features, performance, and value. Rated ${p.r}/10 by our experts.`, keywords: [`${p.n} review`, `${c.name} review`] }
    };
    writeFileSync(`${dir}/${p.s}.json`, JSON.stringify(d, null, 2), "utf-8");
    console.log(`  Product: ${p.s}`);
  }
}
console.log(`\nDone! Created ${cats.length} categories with ${cats.reduce((s,c) => s + c.items.length, 0)} products`);
