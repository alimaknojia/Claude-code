// Data layer. Uses Firebase (Google / Apple sign-in + Firestore) when configured,
// otherwise a local demo mode that keeps data in this browser only.
//
// Firestore layout:
//   profiles/{uid}  public to signed-in users: { name, bottles, updatedAt }
//   private/{uid}   owner only:                { ratings, friends, updatedAt }

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const configured = Boolean(cfg.apiKey && cfg.projectId && cfg.appId);

export async function createStore() {
  return configured ? firebaseStore() : demoStore();
}

/* ---------------- Firebase ---------------- */
async function firebaseStore() {
  const { initializeApp } = await import("firebase/app");
  const A = await import("firebase/auth");
  const F = await import("firebase/firestore");
  const app = initializeApp(cfg);
  const auth = A.getAuth(app);
  const db = F.getFirestore(app);
  const profileRef = uid => F.doc(db, "profiles", uid);
  const privateRef = uid => F.doc(db, "private", uid);

  return {
    mode: "firebase",
    onUser(cb) {
      return A.onAuthStateChanged(auth, async u => {
        if (!u) return cb(null);
        // First sign-in: create the public profile with the account's name.
        try {
          const snap = await F.getDoc(profileRef(u.uid));
          if (!snap.exists()) await F.setDoc(profileRef(u.uid), { name: (u.displayName || "New member").slice(0, 40), bottles: [], updatedAt: F.serverTimestamp() });
        } catch (e) { console.error(e); }
        cb({ uid: u.uid, name: u.displayName || "", provider: u.providerData[0]?.providerId || "" });
      });
    },
    async signIn(which) {
      const provider = which === "apple" ? new A.OAuthProvider("apple.com") : new A.GoogleAuthProvider();
      if (which === "apple") { provider.addScope("name"); provider.addScope("email"); }
      try { await A.signInWithPopup(auth, provider); }
      catch (e) {
        if (e?.code === "auth/popup-blocked" || e?.code === "auth/operation-not-supported-in-this-environment") return A.signInWithRedirect(auth, provider);
        if (e?.code === "auth/popup-closed-by-user" || e?.code === "auth/cancelled-popup-request") return;
        throw e;
      }
    },
    signOut: () => A.signOut(auth),
    watchProfile(uid, cb, onErr) {
      return F.onSnapshot(profileRef(uid), s => cb(s.exists() ? s.data() : null), onErr);
    },
    watchPrivate(uid, cb, onErr) {
      return F.onSnapshot(privateRef(uid), s => cb(s.exists() ? s.data() : {}), onErr);
    },
    saveProfile: (uid, data) => F.setDoc(profileRef(uid), { name: data.name, bottles: data.bottles, updatedAt: F.serverTimestamp() }),
    savePrivate: (uid, data) => F.setDoc(privateRef(uid), { ratings: data.ratings || {}, friends: data.friends || [], updatedAt: F.serverTimestamp() }),
    async profileExists(uid) { try { return (await F.getDoc(profileRef(uid))).exists(); } catch { return false; } },
    async deleteAll(uid) {
      await F.deleteDoc(privateRef(uid));
      await F.deleteDoc(profileRef(uid));
      await A.signOut(auth);
    },
  };
}

/* ---------------- Demo (no Firebase config) ---------------- */
function demoStore() {
  const KEY = "fragrance-lab-demo";
  const listeners = { user: [], profile: [], private: [] };
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const write = d => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} };
  const SAMPLE_FRIEND = {
    uid: "sample-friend",
    profile: { name: "Sample friend", bottles: [
      { id: "s1", name: "Black Opium", house: "Yves Saint Laurent", accords: ["vanilla","floral","amber"] },
      { id: "s2", name: "Santal 33", house: "Le Labo", accords: ["woody","leather","aromatic","freshspicy"] },
      { id: "s3", name: "Neroli Portofino", house: "Tom Ford", accords: ["citrus","floral","aromatic"] },
    ] },
  };
  const emitUser = () => { const d = read(); listeners.user.forEach(cb => cb(d.signedIn ? { uid: "demo", name: d.profile?.name || "Demo user", provider: d.signedIn } : null)); };
  return {
    mode: "demo",
    onUser(cb) { listeners.user.push(cb); setTimeout(emitUser, 0); return () => {}; },
    async signIn(which) {
      const d = read(); d.signedIn = which;
      d.profile ||= { name: "Demo user", bottles: [] };
      d.private ||= { ratings: {}, friends: [SAMPLE_FRIEND.uid] };
      write(d); emitUser();
    },
    async signOut() { const d = read(); d.signedIn = null; write(d); emitUser(); },
    watchProfile(uid, cb) {
      if (uid === SAMPLE_FRIEND.uid) { setTimeout(() => cb(SAMPLE_FRIEND.profile), 0); return () => {}; }
      const fn = () => cb(read().profile || null);
      listeners.profile.push(fn); setTimeout(fn, 0);
      return () => { listeners.profile = listeners.profile.filter(x => x !== fn); };
    },
    watchPrivate(uid, cb) {
      const fn = () => cb(read().private || {});
      listeners.private.push(fn); setTimeout(fn, 0);
      return () => { listeners.private = listeners.private.filter(x => x !== fn); };
    },
    async saveProfile(uid, data) { const d = read(); d.profile = { name: data.name, bottles: data.bottles }; write(d); listeners.profile.forEach(f => f()); },
    async savePrivate(uid, data) { const d = read(); d.private = { ratings: data.ratings || {}, friends: data.friends || [] }; write(d); listeners.private.forEach(f => f()); },
    async profileExists(uid) { return uid === SAMPLE_FRIEND.uid; },
    async deleteAll() { try { localStorage.removeItem(KEY); } catch {} emitUser(); },
  };
}
