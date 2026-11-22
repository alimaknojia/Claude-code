// Scoring engine: accords, pairing rules, fragrance catalog, pair scoring.
export function esc(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" })[c]); }
export const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
export const ACCORDS = {
  citrus:     { label: "Citrus",       w: 1,   c: "hsl(48 90% 50%)" },
  aquatic:    { label: "Aquatic",      w: 1,   c: "hsl(195 70% 50%)" },
  green:      { label: "Green",        w: 1.5, c: "hsl(120 45% 42%)" },
  aromatic:   { label: "Lavender/herbs", w: 2, c: "hsl(265 40% 58%)" },
  freshspicy: { label: "Fresh spice",  w: 2,   c: "hsl(25 65% 55%)" },
  fruity:     { label: "Fruity",       w: 2,   c: "hsl(340 65% 58%)" },
  floral:     { label: "Floral",       w: 3,   c: "hsl(320 45% 65%)" },
  musk:       { label: "Musk",         w: 2.5, c: "hsl(30 15% 65%)" },
  powdery:    { label: "Powdery/iris", w: 3,   c: "hsl(280 20% 72%)" },
  woody:      { label: "Woody",        w: 3,   c: "hsl(30 40% 38%)" },
  leather:    { label: "Leather",      w: 4,   c: "hsl(15 45% 30%)" },
  warmspicy:  { label: "Warm spice",   w: 4,   c: "hsl(10 70% 45%)" },
  amber:      { label: "Amber",        w: 4,   c: "hsl(36 85% 45%)" },
  vanilla:    { label: "Vanilla/sweet", w: 4,  c: "hsl(42 60% 70%)" },
  tobacco:    { label: "Tobacco",      w: 4,   c: "hsl(25 50% 35%)" },
  incense:    { label: "Incense/smoke", w: 4,  c: "hsl(220 10% 50%)" },
  oud:        { label: "Oud",          w: 5,   c: "hsl(350 35% 30%)" },
};
export const KEYS = Object.keys(ACCORDS);

// [a, b, affinity -2..3, why]
const RULES = [
  ["citrus","woody",3,"Citrus lifts a dry wood base, the classic cologne structure"],
  ["citrus","aromatic",3,"Citrus and herbs make a clean barbershop accord"],
  ["citrus","amber",2,"Bright citrus cuts through amber's warmth"],
  ["citrus","vanilla",2,"Citrus over vanilla reads creamy and bright"],
  ["citrus","freshspicy",2,"Pepper and ginger sharpen the citrus"],
  ["citrus","aquatic",2,"Two fresh profiles that stay clean together"],
  ["citrus","green",2,"Zest and crushed leaves: crisp daytime freshness"],
  ["citrus","fruity",2,"Fruit and zest blend into one juicy opening"],
  ["citrus","tobacco",1,"Citrus brightens a heavy tobacco"],
  ["citrus","incense",1,"Citrus over smoke gives a clean contrast"],
  ["citrus","warmspicy",1,"Orange and spice is a familiar warm pairing"],
  ["aquatic","woody",2,"Woods give a marine scent a longer-lasting base"],
  ["aquatic","green",1,"Sea air with greenery stays light"],
  ["aquatic","aromatic",2,"Marine notes and herbs: coastal and clean"],
  ["aquatic","vanilla",-2,"Sea salt and sugar tend to clash"],
  ["aquatic","oud",-2,"Oud swamps a light marine scent"],
  ["aquatic","warmspicy",-2,"Cinnamon-type spice muddies marine notes"],
  ["aquatic","tobacco",-1,"Tobacco fights the airy marine feel"],
  ["aquatic","leather",-1,"Leather weighs down aquatic freshness"],
  ["aquatic","powdery",-1,"Powder over marine notes can smell soapy-flat"],
  ["green","woody",2,"Green notes over woods smell like a forest floor"],
  ["green","floral",2,"Leaves and petals are a natural pairing"],
  ["green","aromatic",2,"Grass and herbs keep it outdoorsy"],
  ["green","vanilla",-1,"Sweetness blunts the green snap"],
  ["aromatic","woody",3,"Lavender and woods are the backbone of fougères"],
  ["aromatic","amber",2,"Herbs over amber give an aromatic warmth"],
  ["aromatic","vanilla",2,"Lavender with vanilla is a proven sweet-fresh duo"],
  ["aromatic","leather",2,"Herbs smooth out leather's edge"],
  ["aromatic","tobacco",1,"Herbal notes freshen tobacco"],
  ["aromatic","freshspicy",2,"Herbs and pepper stay crisp together"],
  ["aromatic","powdery",1,"Lavender and iris share a soft barbershop feel"],
  ["freshspicy","woody",3,"Pepper and cardamom on woods give clean spice"],
  ["freshspicy","amber",2,"Fresh spice keeps amber from going syrupy"],
  ["freshspicy","leather",2,"Spice and leather feel sharp and tailored"],
  ["freshspicy","vanilla",1,"A spice edge balances sweetness"],
  ["warmspicy","amber",3,"Warm spice and amber: cozy cold-weather depth"],
  ["warmspicy","vanilla",3,"Cinnamon-style spice and vanilla is pure warmth"],
  ["warmspicy","tobacco",3,"Spiced tobacco is a classic evening blend"],
  ["warmspicy","oud",2,"Spice rounds off oud's medicinal edge"],
  ["warmspicy","woody",2,"Warm spice settles well into woods"],
  ["warmspicy","floral",1,"Spice can give florals depth, in small doses"],
  ["floral","musk",2,"Musk makes florals softer and closer to skin"],
  ["floral","woody",2,"Woods ground a floral so it reads less sweet"],
  ["floral","oud",2,"Rose-and-oud style pairing is a Middle Eastern staple"],
  ["floral","amber",1,"Amber warms a floral"],
  ["floral","leather",1,"Florals soften leather"],
  ["floral","powdery",2,"Iris powder and petals blend smoothly"],
  ["floral","aquatic",0,""],
  ["woody","amber",3,"Woods and amber make a rich, long-lasting base"],
  ["woody","vanilla",2,"Vanilla rounds off dry woods"],
  ["woody","leather",2,"Leather over woods feels rugged and dry"],
  ["woody","oud",3,"Oud is a wood; they reinforce each other"],
  ["woody","incense",3,"Smoke and woods: a cathedral-and-campfire mix"],
  ["woody","tobacco",2,"Tobacco leaf sits naturally on woods"],
  ["woody","musk",2,"Musk makes woods feel like warm skin"],
  ["woody","powdery",2,"Iris over woods is a polished, elegant mix"],
  ["amber","vanilla",3,"Amber and vanilla melt into a resinous sweetness"],
  ["amber","tobacco",3,"Amber and tobacco: honeyed and smoky"],
  ["amber","oud",3,"Amber smooths oud into something wearable"],
  ["amber","incense",3,"Resins and smoke come from the same family"],
  ["amber","leather",2,"Amber warms leather"],
  ["amber","musk",2,"Musk softens amber's projection"],
  ["vanilla","tobacco",3,"Vanilla tobacco is one of the most loved combos"],
  ["vanilla","oud",2,"Vanilla makes oud approachable"],
  ["vanilla","leather",1,"Sweetness softens leather"],
  ["vanilla","fruity",1,"Fruit over vanilla goes dessert-like"],
  ["vanilla","powdery",2,"Vanilla and iris feel soft and cosy"],
  ["vanilla","incense",1,"Sweet smoke, nice in small doses"],
  ["leather","tobacco",3,"Leather and tobacco: old library armchair"],
  ["leather","oud",3,"Leather and oud are dark and intense together"],
  ["leather","incense",2,"Smoke deepens leather"],
  ["leather","fruity",-1,"Fruit can make leather smell off"],
  ["tobacco","oud",2,"Two dark notes; rich but heavy"],
  ["tobacco","incense",2,"Smoky on smoky, very evening"],
  ["tobacco","fruity",-1,"Bright fruit fights dry tobacco"],
  ["oud","incense",3,"Oud and incense is a traditional pairing"],
  ["oud","fruity",-1,"Fruit and oud often clash"],
  ["fruity","floral",2,"Fruit and flowers blend into one sweet heart"],
  ["fruity","woody",1,"Woods anchor fruity top notes"],
  ["fruity","musk",1,"Musk smooths fruity notes"],
  ["powdery","musk",2,"Iris and musk feel clean and soft"],
  ["musk","citrus",1,"Musk extends citrus, which fades fast"],
  ["musk","vanilla",2,"Musk and vanilla: soft skin scent"],
];
const AFF = {};
for (const [a,b,v,why] of RULES) { AFF[a+"|"+b] = AFF[b+"|"+a] = { v, why }; }
function aff(a, b) {
  if (a === b) return { v: 1, why: `Shared ${ACCORDS[a].label.toLowerCase()} note reinforces itself` };
  if (AFF[a+"|"+b]) return AFF[a+"|"+b];
  if (a === "musk" || b === "musk") return { v: 1, why: "Musk blends quietly with most notes" };
  return { v: 0, why: "" };
}

export const CATALOG = [
  ["Sauvage","Dior",["freshspicy","citrus","aromatic","amber"]],
  ["Bleu de Chanel","Chanel",["citrus","woody","aromatic","amber"]],
  ["Aventus","Creed",["fruity","woody","citrus","musk"]],
  ["Acqua di Giò","Giorgio Armani",["aquatic","citrus","aromatic","musk"]],
  ["Acqua di Giò Profumo","Giorgio Armani",["aquatic","aromatic","incense","woody"]],
  ["Eros","Versace",["vanilla","aromatic","fruity","amber"]],
  ["Le Male","Jean Paul Gaultier",["aromatic","vanilla","powdery"]],
  ["Le Male Elixir","Jean Paul Gaultier",["vanilla","aromatic","tobacco","amber"]],
  ["Ultra Male","Jean Paul Gaultier",["vanilla","fruity","aromatic","amber"]],
  ["Y Eau de Parfum","Yves Saint Laurent",["aromatic","fruity","freshspicy","woody"]],
  ["La Nuit de l'Homme","Yves Saint Laurent",["freshspicy","aromatic","woody"]],
  ["Spicebomb Extreme","Viktor&Rolf",["tobacco","warmspicy","vanilla"]],
  ["Tobacco Vanille","Tom Ford",["tobacco","vanilla","warmspicy","amber"]],
  ["Oud Wood","Tom Ford",["oud","woody","freshspicy","amber"]],
  ["Tuscan Leather","Tom Ford",["leather","fruity","woody"]],
  ["Ombré Leather","Tom Ford",["leather","floral","woody"]],
  ["Noir Extreme","Tom Ford",["warmspicy","vanilla","amber","woody"]],
  ["Grey Vetiver","Tom Ford",["woody","citrus","green","aromatic"]],
  ["Neroli Portofino","Tom Ford",["citrus","floral","aromatic"]],
  ["Baccarat Rouge 540","Maison Francis Kurkdjian",["amber","woody","floral"]],
  ["Oud Satin Mood","Maison Francis Kurkdjian",["oud","vanilla","floral","amber"]],
  ["Santal 33","Le Labo",["woody","leather","aromatic","freshspicy"]],
  ["Another 13","Le Labo",["musk","woody","amber"]],
  ["Terre d'Hermès","Hermès",["citrus","woody","freshspicy","green"]],
  ["Dior Homme Intense","Dior",["powdery","floral","woody","amber"]],
  ["Fahrenheit","Dior",["leather","floral","woody","freshspicy"]],
  ["Light Blue Pour Homme","Dolce & Gabbana",["citrus","aquatic","aromatic","woody"]],
  ["The One Eau de Parfum","Dolce & Gabbana",["tobacco","amber","warmspicy","citrus"]],
  ["Allure Homme Sport","Chanel",["citrus","aquatic","amber","musk"]],
  ["Silver Mountain Water","Creed",["green","citrus","musk","fruity"]],
  ["Green Irish Tweed","Creed",["green","floral","woody","aromatic"]],
  ["Layton","Parfums de Marly",["fruity","aromatic","vanilla","warmspicy"]],
  ["Herod","Parfums de Marly",["tobacco","vanilla","warmspicy","woody"]],
  ["Jazz Club","Maison Margiela",["tobacco","vanilla","fruity"]],
  ["By the Fireplace","Maison Margiela",["woody","vanilla","warmspicy","incense"]],
  ["Wanted by Night","Azzaro",["warmspicy","tobacco","fruity","amber"]],
  ["Stronger With You","Emporio Armani",["vanilla","warmspicy","aromatic","amber"]],
  ["Encre Noire","Lalique",["woody","musk","green"]],
  ["Wood Sage & Sea Salt","Jo Malone",["aquatic","aromatic","woody"]],
  ["Musc Ravageur","Frédéric Malle",["musk","vanilla","warmspicy","amber"]],
  ["Aqva Pour Homme","Bvlgari",["aquatic","green","woody"]],
  ["Explorer","Montblanc",["woody","citrus","leather","aromatic"]],
  ["Born in Roma Uomo","Valentino",["vanilla","aromatic","woody","freshspicy"]],
  ["Cedrat Boisé","Mancera",["citrus","woody","fruity","leather"]],
  ["Black Afgano","Nasomatto",["incense","oud","woody","tobacco"]],
  ["Interlude Man","Amouage",["incense","amber","leather","oud"]],
  ["Erba Pura","Xerjoff",["fruity","citrus","amber","musk"]],
  ["Molecule 01","Escentric Molecules",["woody","musk"]],
  ["Ambre Nuit","Dior",["amber","floral","woody"]],
];
const UNISEX = new Set(["Tobacco Vanille","Oud Wood","Tuscan Leather","Ombré Leather","Neroli Portofino","Baccarat Rouge 540","Oud Satin Mood","Santal 33","Another 13","Jazz Club","By the Fireplace","Wood Sage & Sea Salt","Musc Ravageur","Black Afgano","Erba Pura","Molecule 01","Ambre Nuit","Silver Mountain Water"]);
CATALOG.forEach(c => c.push(UNISEX.has(c[0]) ? "unisex" : "men's"));
const WOMEN = [
  ["Black Opium","Yves Saint Laurent",["vanilla","floral","amber"],"w"],
  ["Libre","Yves Saint Laurent",["aromatic","floral","vanilla","amber"],"w"],
  ["Miss Dior","Dior",["floral","fruity","musk","woody"],"w"],
  ["J'adore","Dior",["floral","fruity","musk"],"w"],
  ["Coco Mademoiselle","Chanel",["citrus","floral","woody","musk"],"w"],
  ["N°5","Chanel",["floral","powdery","musk","woody"],"w"],
  ["Chance Eau Tendre","Chanel",["fruity","floral","musk"],"w"],
  ["La Vie Est Belle","Lancôme",["vanilla","fruity","powdery","floral"],"w"],
  ["Idôle","Lancôme",["floral","musk","woody"],"w"],
  ["Good Girl","Carolina Herrera",["vanilla","floral","amber"],"w"],
  ["Flowerbomb","Viktor&Rolf",["floral","vanilla","fruity"],"w"],
  ["Daisy","Marc Jacobs",["fruity","floral","musk"],"w"],
  ["Light Blue","Dolce & Gabbana",["citrus","fruity","woody","musk"],"w"],
  ["Cloud","Ariana Grande",["vanilla","fruity","musk"],"w"],
  ["Bright Crystal","Versace",["fruity","floral","musk"],"w"],
  ["Sì","Giorgio Armani",["fruity","vanilla","floral","woody"],"w"],
  ["My Way","Giorgio Armani",["floral","citrus","vanilla","musk"],"w"],
  ["Alien","Mugler",["floral","amber","woody"],"w"],
  ["Angel","Mugler",["vanilla","fruity","woody","amber"],"w"],
  ["Delina","Parfums de Marly",["floral","fruity","musk","powdery"],"w"],
  ["Burberry Her","Burberry",["fruity","floral","musk"],"w"],
  ["Paradoxe","Prada",["floral","amber","musk"],"w"],
  ["Bloom","Gucci",["floral","green"],"w"],
  ["Flora Gorgeous Gardenia","Gucci",["floral","fruity","vanilla"],"w"],
  ["Nina","Nina Ricci",["fruity","citrus","floral","vanilla"],"w"],
  ["Shalimar","Guerlain",["amber","vanilla","citrus","powdery"],"w"],
  ["Mon Guerlain","Guerlain",["aromatic","vanilla","amber"],"w"],
  ["Portrait of a Lady","Frédéric Malle",["floral","incense","woody","amber"],"w"],
  ["Vanilla 28","Kayali",["vanilla","amber","floral"],"w"],
  ["Cheirosa 62","Sol de Janeiro",["vanilla","fruity","musk"],"w"],
  ["Gypsy Water","Byredo",["woody","aromatic","vanilla","citrus"],"u"],
  ["Mojave Ghost","Byredo",["floral","woody","musk","fruity"],"u"],
  ["Lost Cherry","Tom Ford",["fruity","vanilla","amber"],"u"],
  ["Rose 31","Le Labo",["floral","freshspicy","woody"],"u"],
  ["Philosykos","Diptyque",["green","fruity","woody"],"u"],
  ["Do Son","Diptyque",["floral","aquatic","musk"],"u"],
  ["English Pear & Freesia","Jo Malone",["fruity","floral","musk"],"u"],
  ["Peony & Blush Suede","Jo Malone",["floral","fruity","leather"],"u"],
  ["Bianco Latte","Giardini di Toscana",["vanilla","musk"],"u"],
  ["Kirke","Tiziana Terenzi",["fruity","musk","woody"],"u"],
  ["Glossier You","Glossier",["musk","woody","freshspicy"],"u"],
  ["Lazy Sunday Morning","Maison Margiela",["musk","floral","fruity"],"u"],
  ["Not a Perfume","Juliette Has a Gun",["woody","musk"],"u"],
];
for (const [n, h, a, g] of WOMEN) CATALOG.push([n, h, a, g === "w" ? "women's" : "unisex"]);

export function weightOf(acc) {
  if (!acc.length) return 2.5;
  let s = 0, t = 0;
  acc.forEach((a, i) => { const k = acc.length - i; s += ACCORDS[a].w * k; t += k; });
  return s / t;
}
function dominance(acc) { const n = acc.length, tot = n*(n+1)/2; return acc.map((a,i) => [(n-i)/tot, a]); }

export function scorePair(A, B) {
  const da = dominance(A.accords), dbm = dominance(B.accords);
  let total = 0; const contrib = [];
  for (const [wa, a] of da) for (const [wb, b] of dbm) {
    const r = aff(a, b); const c = wa * wb * r.v; total += c;
    if (r.why) contrib.push({ c, why: r.why });
  }
  let score = 40 + total * 22;
  const notes = [];
  const setA = new Set(A.accords), setB = new Set(B.accords);
  const inter = [...setA].filter(x => setB.has(x)).length;
  const jac = inter / new Set([...setA, ...setB]).size;
  if (jac >= 0.75) { score -= 15; notes.push({ c: -1, why: "Nearly the same accords, so layering adds little" }); }
  const wA = weightOf(A.accords), wB = weightOf(B.accords);
  if (wA >= 3.9 && wB >= 3.9) { score -= 10; notes.push({ c: -1, why: "Both are heavy; easy to overdo, go light on sprays" }); }
  const diff = Math.abs(wA - wB);
  if (diff >= 0.8 && diff <= 2.6) score += 6;
  score = Math.max(0, Math.min(100, Math.round(score)));

  const pos = contrib.filter(x => x.c > 0).sort((x,y) => y.c - x.c);
  const neg = contrib.filter(x => x.c < 0).sort((x,y) => x.c - y.c);
  const reasons = []; const seen = new Set();
  for (const p of pos) { if (!seen.has(p.why)) { seen.add(p.why); reasons.push({ c: 1, why: p.why }); } if (reasons.length === 2) break; }
  if (neg[0] && neg[0].c < -0.03) reasons.push({ c: -1, why: neg[0].why });
  reasons.push(...notes);

  const [base, top] = wA >= wB ? [A, B] : [B, A];
  const wBase = Math.max(wA, wB), wTop = Math.min(wA, wB), avg = (wA + wB) / 2;
  let how;
  if (wBase - wTop >= 1.5) how = `Spray <b>${esc(base.name)}</b> first, 1 spray on the chest. Let it dry, then 2 sprays of <b>${esc(top.name)}</b> on the neck.`;
  else if (wBase - wTop >= 0.5) how = `<b>${esc(base.name)}</b> on the chest, <b>${esc(top.name)}</b> on the neck, 1 spray each.`;
  else how = `Equal weight: 1 spray of each on the same spots, <b>${esc(base.name)}</b> first.`;
  const when = avg <= 2.2 ? "Warm days, daytime" : avg >= 3.5 ? "Cool weather, evenings" : "Any season";
  return { score, reasons, how, when, avgW: avg };
}

export const OCC = {
  any:    { label: "Any time" },
  office: { label: "Office",      good: "Light enough for a shared office", bad: "Likely too loud for the office" },
  summer: { label: "Summer day",  good: "Fresh enough for hot weather",     bad: "Too heavy for heat" },
  date:   { label: "Date night",  good: "Warm, close-up appeal for a date", bad: "Not much date-night warmth" },
  cold:   { label: "Cold weather", good: "Rich enough to carry in cold air", bad: "Too light to last in the cold" },
};
export function occasionAdj(occ, A, B, w) {
  const s = new Set([...A.accords, ...B.accords]);
  const sum = (keys, pts) => keys.reduce((t, k) => t + (s.has(k) ? pts : 0), 0);
  let adj = 0;
  if (occ === "office") { if (w > 3.2) adj -= (w - 3.2) * 16; adj += sum(["oud","incense","tobacco"], -5) + sum(["musk","citrus","aromatic","powdery"], 3); }
  if (occ === "summer") { if (w > 2.3) adj -= (w - 2.3) * 14; adj += sum(["citrus","aquatic","green"], 4) + sum(["vanilla","oud","amber","tobacco","warmspicy"], -5); }
  if (occ === "date")   { adj -= Math.abs(w - 3.5) * 9; adj += sum(["vanilla","amber","musk","warmspicy","floral"], 3); }
  if (occ === "cold")   { if (w < 3.3) adj -= (3.3 - w) * 14; adj += sum(["amber","vanilla","tobacco","warmspicy","oud","incense"], 4) + sum(["aquatic"], -8); }
  return Math.max(-30, Math.min(15, Math.round(adj)));
}

export const pairKey = (A, B) => [norm(A.name), norm(B.name)].sort().join("__");
export function verdict(score) { return score >= 80 ? ["signature","Signature"] : score >= 65 ? ["strong","Strong"] : score >= 50 ? ["try","Try it"] : score >= 35 ? ["risky","Risky"] : ["skip","Skip"]; }

// Final score: base accord score, adjusted for the chosen occasion and the viewer's own ratings.
export function evaluate(A, B, { occasion = "any", ratings = {} } = {}) {
  const r = scorePair(A, B); let score = r.score; const reasons = r.reasons.slice();
  if (occasion !== "any" && OCC[occasion]) {
    const adj = occasionAdj(occasion, A, B, r.avgW); score += adj;
    if (adj >= 4) reasons.unshift({ c: 1, why: OCC[occasion].good }); else if (adj <= -4) reasons.push({ c: -1, why: OCC[occasion].bad });
  }
  const key = pairKey(A, B), mine = ratings[key];
  if (mine === 1) { score += 15; reasons.push({ c: 1, why: "You liked this one" }); }
  if (mine === -1) { score -= 25; reasons.push({ c: -1, why: "You marked this as not for you" }); }
  score = Math.max(0, Math.min(100, Math.round(score)));
  return { ...r, score, reasons, v: verdict(score), key };
}
