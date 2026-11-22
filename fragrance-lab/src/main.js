import "./style.css";
import { ACCORDS, KEYS, CATALOG, OCC, evaluate, esc, norm } from "./engine.js";
import { createStore } from "./store.js";

const $ = id => document.getElementById(id);
const rid = () => Math.random().toString(36).slice(2, 10);

/* ---------------- State ---------------- */
let store;
let me = null;                 // { uid, name, provider }
let myProfile = null;          // { name, bottles }
let myPrivate = { ratings: {}, friends: [] };
const friendProfiles = {};     // uid -> profile
const friendUnsubs = {};
let unsubs = [];
let viewing = "me";            // "me" or a friend's uid
let occasion = "any";
let picked = [];
let saveChain = Promise.resolve();
try { const o = localStorage.getItem("occ"); if (OCC[o]) occasion = o; } catch {}

function showBanner(t) { const b = $("banner"); b.textContent = t || ""; b.hidden = !t; }
function cleanBottles(list) {
  return (Array.isArray(list) ? list : []).slice(0, 80).map(b => ({
    id: String(b.id || rid()), name: String(b.name || "?").slice(0, 60), house: String(b.house || "").slice(0, 40),
    accords: (Array.isArray(b.accords) ? b.accords : []).filter(k => ACCORDS[k]).slice(0, 5),
  })).filter(b => b.accords.length);
}
function shelfOf(id) {
  if (id === "me") return myProfile ? { id: "me", name: myProfile.name || "My", bottles: cleanBottles(myProfile.bottles), mine: true } : null;
  const p = friendProfiles[id];
  return p ? { id, name: String(p.name || "Friend").slice(0, 40), bottles: cleanBottles(p.bottles), mine: false } : null;
}
const friendIds = () => (Array.isArray(myPrivate.friends) ? myPrivate.friends : []).filter(x => typeof x === "string").slice(0, 50);
const opts = () => ({ occasion, ratings: myPrivate.ratings || {} });

function queue(fn) {
  saveChain = saveChain.then(fn).catch(e => { console.error(e); showBanner("Couldn't save just now. Check your connection and try again."); });
  return saveChain;
}
const saveProfile = () => queue(() => store.saveProfile(me.uid, { name: myProfile.name, bottles: cleanBottles(myProfile.bottles) }));
const savePrivate = () => queue(() => store.savePrivate(me.uid, myPrivate));

/* ---------------- Account header ---------------- */
function renderAcct() {
  const el = $("acct");
  if (!me) { el.innerHTML = ""; return; }
  const via = me.provider === "apple.com" || me.provider === "apple" ? "Apple" : me.provider === "google.com" || me.provider === "google" ? "Google" : "";
  el.innerHTML = `<span class="muted">Signed in${via ? " with " + via : ""}${store.mode === "demo" ? " (demo)" : ""}</span><button type="button" id="signOut">Sign out</button>`;
}

/* ---------------- Sign-in screen ---------------- */
const G_ICON = `<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;
const A_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M16.37 12.79c-.02-2.33 1.9-3.45 1.99-3.5-1.09-1.59-2.78-1.8-3.38-1.83-1.44-.15-2.81.85-3.54.85-.73 0-1.86-.83-3.06-.81-1.57.02-3.02.92-3.83 2.33-1.63 2.83-.42 7.03 1.17 9.33.78 1.12 1.7 2.38 2.91 2.34 1.17-.05 1.61-.76 3.02-.76 1.41 0 1.81.76 3.05.73 1.26-.02 2.05-1.14 2.82-2.27.89-1.3 1.25-2.56 1.27-2.62-.03-.01-2.43-.93-2.45-3.69zM14.05 5.95c.64-.78 1.08-1.86.96-2.95-.93.04-2.05.62-2.71 1.4-.6.69-1.12 1.79-.98 2.85 1.03.08 2.09-.53 2.73-1.3z"/></svg>`;
function renderSignIn(err) {
  $("app").innerHTML = `<section class="signin" aria-labelledby="si-h">
    <h2 id="si-h">Sign in to save your collection</h2>
    <p>Your shelf is stored on your account, so it's there on any phone or computer you sign in from. Friends can add you with your friend code to see what pairs with their bottles.</p>
    <button type="button" class="sbtn" data-signin="google">${G_ICON}Continue with Google</button>
    <button type="button" class="sbtn apple" data-signin="apple">${A_ICON}Continue with Apple</button>
    ${store.mode === "demo" ? `<p class="hint">Demo mode: this copy isn't connected to Firebase yet, so either button signs you in to a local demo account kept in this browser only.</p>` : ""}
    ${err ? `<p class="err">${esc(err)}</p>` : ""}
  </section>`;
}
const SIGNIN_ERRORS = {
  "auth/unauthorized-domain": "This website isn't on the app's approved domain list yet. The app owner needs to add it in Firebase → Authentication → Settings.",
  "auth/operation-not-allowed": "That sign-in method isn't turned on yet. The app owner needs to enable it in Firebase → Authentication.",
  "auth/account-exists-with-different-credential": "That email already has an account through the other sign-in button. Use that one instead.",
  "auth/network-request-failed": "Couldn't reach the sign-in service. Check your connection and try again.",
};

/* ---------------- Main app ---------------- */
function renderShell() {
  $("app").innerHTML = `<div class="grid">
    <section class="panel" aria-labelledby="shelf-h">
      <div class="row between"><h2 id="shelf-h">Shelves</h2><span class="label">${store.mode === "demo" ? "Demo · this browser" : "Saved to your account"}</span></div>
      <div class="people" id="people" role="group" aria-label="Choose a shelf"></div>
      <div id="shelf" class="section"></div>
      <form class="add" id="addBottle">
        <h3>Add a bottle to your shelf</h3>
        <div class="row">
          <input type="text" id="bottleName" list="catalog" placeholder="Start typing: Sauvage, Black Opium, Santal 33…" maxlength="60" aria-label="Fragrance name" autocomplete="off">
          <input type="text" id="bottleHouse" placeholder="House" maxlength="40" aria-label="House" style="flex:0 1 140px">
        </div>
        <datalist id="catalog">${CATALOG.map(c => `<option value="${esc(c[0])}">${esc(c[1])} · ${esc(c[3])}</option>`).join("")}</datalist>
        <div>
          <div class="label" style="margin-bottom:6px">Main accords, strongest first</div>
          <div class="toggles" id="toggles"></div>
          <div class="hint" id="accHint">About 90 known fragrances fill these in. Tap to change. Pick 1–5.</div>
        </div>
        <div class="row"><button type="submit" class="primary">Add to shelf</button><span class="hint" id="addMsg" aria-live="polite"></span></div>
      </form>
      <div class="section" id="friendsSec">
        <h3>Friends</h3>
        <div class="hint">Your friend code. Send it to a friend so they can add you:</div>
        <div class="row"><span class="code" id="myCode">${esc(me.uid)}</span><button type="button" id="copyCode">Copy</button></div>
        <form class="row" id="addFriend">
          <input type="text" id="friendCode" placeholder="Paste a friend's code" maxlength="128" aria-label="Friend code" autocomplete="off">
          <button type="submit">Add friend</button>
        </form>
        <div class="hint" id="friendMsg" aria-live="polite"></div>
      </div>
      <div class="section">
        <button type="button" class="ghost" id="deleteAll">Delete my account data</button>
      </div>
    </section>
    <section class="panel" aria-labelledby="lab-h">
      <h2 id="lab-h">Mix lab</h2>
      <div class="section"><div class="label">Occasion</div><div class="occ" id="occ" role="group" aria-label="Occasion"></div></div>
      <div class="section"><h3 id="bestH">Best pairs</h3><div class="pairs" id="best"></div></div>
      <div class="section" id="borrowSec"><h3 id="borrowH">Borrow from a friend</h3><div class="pairs" id="borrow"></div></div>
      <div class="section"><h3 id="nextH">Next bottle to buy</h3><div class="pairs" id="next"></div></div>
      <div class="section"><h3>Test any two</h3>
        <div class="tester"><select id="tA" aria-label="First fragrance"></select><span class="plus label">+</span><select id="tB" aria-label="Second fragrance"></select></div>
        <div class="pairs" id="tOut"></div>
      </div>
    </section>
  </div>`;
  renderToggles();
}

function chip(k) { return `<span class="chip"><i style="background:${ACCORDS[k].c}"></i>${esc(ACCORDS[k].label)}</span>`; }
function renderToggles() {
  const el = $("toggles"); if (!el) return;
  el.innerHTML = KEYS.map(k => { const i = picked.indexOf(k); return `<button type="button" class="toggle" data-acc="${k}" aria-pressed="${i >= 0}"><i style="background:${ACCORDS[k].c}"></i>${esc(ACCORDS[k].label)}${i >= 0 ? ` <span class="muted">${i + 1}</span>` : ""}</button>`; }).join("");
}

function pairCard(a, b, r, sub) {
  const mine = (myPrivate.ratings || {})[r.key];
  return `<article class="pair"><div><div class="score v-${r.v[0]}">${r.score}<small>${r.v[1]}</small></div><div class="meter"><b class="bg-${r.v[0]}" style="width:${r.score}%"></b></div></div>
  <div style="min-width:0"><div class="pname">${esc(a.name)}<span class="plus">+</span>${esc(b.name)}</div>${sub ? `<div class="owner">${sub}</div>` : ""}
  <ul class="why">${r.reasons.map(x => `<li class="${x.c < 0 ? "neg" : ""}">${esc(x.why)}</li>`).join("")}</ul>
  <div class="how">${r.how}<br><span class="muted">${r.when}</span></div>
  <div class="acts"><button type="button" class="vote" data-vote="1" data-key="${r.key}" aria-pressed="${mine === 1}">👍 Liked it</button><button type="button" class="vote" data-vote="-1" data-key="${r.key}" aria-pressed="${mine === -1}">👎 Not for me</button></div></div></article>`;
}

function nextBottles(cur) {
  if (!cur.bottles.length) return [];
  const own = new Set(cur.bottles.map(b => norm(b.name)));
  const out = [];
  for (const c of CATALOG) {
    if (own.has(norm(c[0]))) continue;
    const cand = { id: "cat" + norm(c[0]), name: c[0], house: c[1], accords: c[2] };
    const sc = cur.bottles.map(b => ({ b, s: evaluate(cand, b, opts()).score })).sort((x, y) => y.s - x.s);
    const strong = sc.filter(x => x.s >= 65), top = sc.slice(0, 3);
    out.push({ cand, aud: c[3], strong, best: sc[0], rank: strong.length * 10 + top.reduce((t, x) => t + x.s, 0) / top.length });
  }
  return out.sort((x, y) => y.rank - x.rank).slice(0, 3);
}

let lastOpts = [];
function render() {
  if (!me || !myProfile || !$("people")) return;
  const shelves = ["me", ...friendIds()].map(shelfOf).filter(Boolean);
  if (!shelves.some(s => s.id === viewing)) viewing = "me";
  const cur = shelfOf(viewing);

  $("people").innerHTML = shelves.map(s => `<button type="button" class="person" data-view="${esc(s.id)}" aria-pressed="${s.id === viewing}">${s.mine ? "My shelf" : esc(s.name)}<span class="n">${s.bottles.length}</span></button>`).join("");

  let html = `<div class="row between">`;
  if (cur.mine) html += `<label class="row" style="flex:1 1 220px"><span class="label">Shown to friends as</span><input type="text" id="myName" class="namefield" value="${esc(myProfile.name || "")}" maxlength="40" aria-label="Your display name"></label>`;
  else html += `<h3>${esc(cur.name)}'s bottles</h3><button type="button" class="ghost" data-unfriend="${esc(cur.id)}">Remove friend</button>`;
  html += `</div>`;
  if (!cur.bottles.length) html += `<div class="empty">${cur.mine ? "Your shelf is empty. Add your first bottle below." : "No bottles on this shelf yet."}</div>`;
  else html += `<ul class="bottles">${cur.bottles.map(b => `<li class="bottle"><span class="vial" aria-hidden="true"><i style="top:35%;background:${ACCORDS[b.accords[0]].c};opacity:.75"></i></span><div style="min-width:0"><div class="bname">${esc(b.name)}</div>${b.house ? `<div class="bhouse">${esc(b.house)}</div>` : ""}<div class="chips">${b.accords.map(chip).join("")}</div></div>${cur.mine ? `<button type="button" class="ghost" data-rm="${esc(b.id)}" aria-label="Remove ${esc(b.name)}">Remove</button>` : "<span></span>"}</li>`).join("")}</ul>`;
  $("shelf").innerHTML = html;
  $("addBottle").hidden = !cur.mine;

  $("occ").innerHTML = Object.entries(OCC).map(([k, o]) => `<button type="button" data-occ="${k}" aria-pressed="${k === occasion}">${esc(o.label)}</button>`).join("");

  const label = cur.mine ? "your shelf" : `${cur.name}'s shelf`;
  $("bestH").textContent = `Best pairs on ${label}`;
  const pairs = [];
  for (let i = 0; i < cur.bottles.length; i++) for (let j = i + 1; j < cur.bottles.length; j++)
    pairs.push({ a: cur.bottles[i], b: cur.bottles[j], r: evaluate(cur.bottles[i], cur.bottles[j], opts()) });
  pairs.sort((x, y) => y.r.score - x.r.score);
  $("best").innerHTML = cur.bottles.length < 2 ? `<div class="empty">Add at least two bottles to see pairings.</div>`
    : pairs.slice(0, 5).map(p => pairCard(p.a, p.b, p.r)).join("") + (pairs.length > 5 ? `<div class="hint">Showing the top 5 of ${pairs.length} pairs. Use “Test any two” for the rest.</div>` : "");

  const others = shelves.filter(s => s.id !== cur.id);
  const borrow = [];
  for (const mine of cur.bottles) for (const s of others) for (const theirs of s.bottles) {
    if (cur.bottles.some(x => norm(x.name) === norm(theirs.name))) continue;
    borrow.push({ a: mine, b: theirs, owner: s.mine ? "your" : `${s.name}'s`, r: evaluate(mine, theirs, opts()) });
  }
  borrow.sort((x, y) => y.r.score - x.r.score);
  $("borrow").innerHTML = !others.length ? `<div class="empty">Add a friend with their code to find pairings across collections.</div>`
    : !borrow.length ? `<div class="empty">No new bottles to borrow yet.</div>`
    : borrow.slice(0, 3).map(p => pairCard(p.a, p.b, p.r, `${esc(p.b.name)} is on ${esc(p.owner)} shelf`)).join("");

  $("nextH").textContent = cur.mine ? "Next bottle to buy" : `Gift idea for ${cur.name}`;
  $("next").innerHTML = !cur.bottles.length ? `<div class="empty">Add a bottle first. Suggestions come from what pairs best with the shelf.</div>`
    : nextBottles(cur).map(n => `<article class="nb"><div class="row between" style="align-items:start"><div style="min-width:0"><div class="bname">${esc(n.cand.name)}</div><div class="bhouse">${esc(n.cand.house)} · ${esc(n.aud)}</div></div>${cur.mine ? `<button type="button" data-addcat="${esc(n.cand.name)}">I bought it</button>` : ""}</div>
      <div class="hint">${n.strong.length ? `Strong match with ${n.strong.length} of ${cur.bottles.length} bottles. ` : ""}Best with ${esc(n.best.b.name)} (${n.best.s}).</div>
      <div class="chips">${n.cand.accords.map(chip).join("")}</div></article>`).join("");

  const o = [];
  for (const s of shelves) for (const b of s.bottles) o.push({ key: s.id + "::" + b.id, label: `${b.name} (${s.mine ? "you" : s.name})`, b });
  lastOpts = o;
  const fill = (sel, idx) => { const prev = sel.value; sel.innerHTML = o.map(x => `<option value="${esc(x.key)}">${esc(x.label)}</option>`).join(""); if (o.some(x => x.key === prev)) sel.value = prev; else if (o[idx]) sel.value = o[idx].key; };
  fill($("tA"), 0); fill($("tB"), 1);
  if ($("tA").value === $("tB").value && o.length > 1) $("tB").value = o.find(x => x.key !== $("tA").value).key;
  renderTest();
}
function renderTest() {
  const a = lastOpts.find(o => o.key === $("tA").value), b = lastOpts.find(o => o.key === $("tB").value);
  $("tOut").innerHTML = !a || !b ? `<div class="empty">Add bottles to test a pair.</div>`
    : (a.key === b.key || norm(a.b.name) === norm(b.b.name)) ? `<div class="empty">Pick two different fragrances.</div>`
    : pairCard(a.b, b.b, evaluate(a.b, b.b, opts()));
}

/* ---------------- Friends ---------------- */
function syncFriendWatchers() {
  const want = new Set(friendIds());
  for (const id of Object.keys(friendUnsubs)) if (!want.has(id)) { friendUnsubs[id](); delete friendUnsubs[id]; delete friendProfiles[id]; }
  for (const id of want) if (!friendUnsubs[id]) {
    friendUnsubs[id] = store.watchProfile(id, p => { if (p) friendProfiles[id] = p; else delete friendProfiles[id]; render(); }, () => {});
  }
}

/* ---------------- Events ---------------- */
document.addEventListener("click", async e => {
  const t = e.target.closest("button"); if (!t) return;
  const d = t.dataset;
  if (d.signin) {
    t.disabled = true;
    try { await store.signIn(d.signin); }
    catch (err) { console.error(err); renderSignIn(SIGNIN_ERRORS[err?.code] || "Sign-in didn't finish. Try again."); }
    finally { t.disabled = false; }
    return;
  }
  if (t.id === "signOut") { store.signOut(); return; }
  if (t.id === "copyCode") {
    try { await navigator.clipboard.writeText(me.uid); t.textContent = "Copied"; }
    catch { const r = document.createRange(); r.selectNodeContents($("myCode")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); t.textContent = "Selected, press copy"; }
    setTimeout(() => { if (t.isConnected) t.textContent = "Copy"; }, 2000);
    return;
  }
  if (t.id === "deleteAll") {
    if (t.dataset.armed !== "1") { t.dataset.armed = "1"; t.textContent = "Confirm: delete my shelf, ratings and friends"; t.classList.add("danger"); setTimeout(() => { if (t.isConnected) { t.dataset.armed = ""; t.textContent = "Delete my account data"; t.classList.remove("danger"); } }, 5000); return; }
    try { await store.deleteAll(me.uid); } catch (err) { console.error(err); showBanner("Couldn't delete your data. Try again."); }
    return;
  }
  if (d.view) { viewing = d.view; render(); return; }
  if (d.occ) { occasion = d.occ; try { localStorage.setItem("occ", occasion); } catch {} render(); return; }
  if (d.acc) {
    const i = picked.indexOf(d.acc);
    if (i >= 0) picked.splice(i, 1); else if (picked.length < 5) picked.push(d.acc);
    renderToggles(); return;
  }
  if (d.rm) { myProfile.bottles = cleanBottles(myProfile.bottles).filter(b => b.id !== d.rm); render(); saveProfile(); return; }
  if (d.vote) {
    const r = { ...(myPrivate.ratings || {}) }; const v = Number(d.vote);
    if (r[d.key] === v) delete r[d.key]; else r[d.key] = v;
    myPrivate = { ...myPrivate, ratings: r }; render(); savePrivate(); return;
  }
  if (d.addcat) {
    const c = CATALOG.find(x => x[0] === d.addcat); const bottles = cleanBottles(myProfile.bottles);
    if (!c || bottles.some(b => norm(b.name) === norm(c[0]))) return;
    myProfile.bottles = [...bottles, { id: rid(), name: c[0], house: c[1], accords: c[2].slice() }]; render(); saveProfile(); return;
  }
  if (d.unfriend) { myPrivate = { ...myPrivate, friends: friendIds().filter(x => x !== d.unfriend) }; viewing = "me"; syncFriendWatchers(); render(); savePrivate(); }
});

document.addEventListener("input", e => {
  if (e.target.id === "bottleName") {
    const c = CATALOG.find(x => norm(x[0]) === norm(e.target.value));
    if (c) { $("bottleHouse").value = c[1]; picked = c[2].slice(); renderToggles(); $("accHint").textContent = "Filled in from the catalog. Tap to adjust."; }
  }
});
document.addEventListener("change", e => {
  if (e.target.id === "tA" || e.target.id === "tB") renderTest();
  if (e.target.id === "myName") {
    const v = e.target.value.trim().slice(0, 40); if (!v || v === myProfile.name) return;
    myProfile.name = v; saveProfile();
  }
});

document.addEventListener("submit", async e => {
  e.preventDefault();
  if (e.target.id === "addBottle") {
    const name = $("bottleName").value.trim(); const msg = $("addMsg");
    if (!name) { msg.textContent = "Enter the fragrance name."; return; }
    if (!picked.length) { msg.textContent = "Pick at least one accord."; return; }
    const bottles = cleanBottles(myProfile.bottles);
    if (bottles.some(b => norm(b.name) === norm(name))) { msg.textContent = `${name} is already on your shelf.`; return; }
    if (bottles.length >= 80) { msg.textContent = "Your shelf is full (80 bottles). Remove one first."; return; }
    myProfile.bottles = [...bottles, { id: rid(), name, house: $("bottleHouse").value.trim(), accords: picked.slice() }];
    $("bottleName").value = ""; $("bottleHouse").value = ""; picked = []; renderToggles();
    msg.textContent = `Added ${name}.`; render(); saveProfile();
  }
  if (e.target.id === "addFriend") {
    const code = $("friendCode").value.trim(); const msg = $("friendMsg");
    if (!code) return;
    if (code === me.uid) { msg.textContent = "That's your own code."; return; }
    if (friendIds().includes(code)) { msg.textContent = "Already on your friends list."; return; }
    if (!/^[A-Za-z0-9_-]{1,128}$/.test(code) || !(await store.profileExists(code))) { msg.textContent = "No shelf found for that code. Check it and try again."; return; }
    myPrivate = { ...myPrivate, friends: [...friendIds(), code] };
    $("friendCode").value = ""; msg.textContent = "Friend added."; viewing = code;
    syncFriendWatchers(); render(); savePrivate();
  }
});

/* ---------------- Boot ---------------- */
function signedOut() {
  unsubs.forEach(u => u()); unsubs = [];
  Object.values(friendUnsubs).forEach(u => u()); for (const k in friendUnsubs) delete friendUnsubs[k];
  me = null; myProfile = null; myPrivate = { ratings: {}, friends: [] }; viewing = "me";
  renderAcct(); renderSignIn();
}
(async () => {
  store = await createStore();
  if (store.mode === "demo") showBanner("Demo mode: not connected to Firebase yet, so everything stays in this browser. See README.md to connect real Google and Apple sign-in.");
  store.onUser(u => {
    if (!u) return signedOut();
    if (me?.uid === u.uid) return;
    me = u; renderAcct(); renderShell();
    unsubs.push(store.watchProfile(u.uid, p => { myProfile = p || { name: u.name || "New member", bottles: [] }; render(); }, err => { console.error(err); showBanner("Couldn't load your shelf. Reload the page to try again."); }));
    unsubs.push(store.watchPrivate(u.uid, p => { myPrivate = { ratings: p?.ratings || {}, friends: p?.friends || [] }; syncFriendWatchers(); render(); }, err => console.error(err)));
  });
})();
