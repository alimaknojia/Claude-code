# Fragrance Layering Lab

A web app where people sign in with **Google** or **Apple**, save the colognes and perfumes they own, and get ranked layering pairs. Friends add each other by code to borrow bottles and find gift ideas.

Without Firebase settings the app runs in **demo mode**: both sign-in buttons log you in to a local account kept only in that browser.

## Try it now (demo mode, 2 minutes)

```
cd fragrance-lab
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

## Go live with real Google + Apple sign-in

Total time: about 45 minutes for Google only. Add about 30 minutes for Apple, plus the wait for Apple to approve a developer account if you don't have one yet.

### Part 1: Firebase project and Google sign-in (about 20 min)

1. Go to https://console.firebase.google.com and click **Create a project**. Analytics is optional.
2. Click the **Web** icon (`</>`) to add a web app. Copy the config values it shows.
3. In this folder, copy `.env.example` to `.env` and paste in `apiKey`, `authDomain`, `projectId` and `appId`.
4. In the console, open **Build → Authentication → Get started → Sign-in method**, then enable **Google**.
5. Open **Build → Firestore Database → Create database**. Choose production mode and a location near your users.

### Part 2: Deploy (about 15 min)

1. Run `npm install -g firebase-tools`
2. Run `firebase login`
3. Run `firebase use --add` and pick your project.
4. Run `npm run deploy`. This builds the site, uploads it, and applies the security rules in `firestore.rules`.
5. Open the `https://<project>.web.app` address it prints and test **Continue with Google**.

Using your own domain? Add it under **Authentication → Settings → Authorized domains**, or sign-in fails with an "approved domain" message.

### Part 3: Apple sign-in (about 30 min, needs a paid Apple Developer account at $99/year)

1. At https://developer.apple.com/account, under **Certificates, IDs & Profiles**, create an **App ID** with **Sign in with Apple** turned on.
2. Create a **Services ID**, for example `com.yourname.fragrancelab.web`. Turn on Sign in with Apple and configure it:
   - Domain: `<project>.firebaseapp.com`
   - Return URL: `https://<project>.firebaseapp.com/__/auth/handler`
3. Under **Keys**, create a key with Sign in with Apple enabled. Download the `.p8` file and note the Key ID and your Team ID.
4. In Firebase, go to **Authentication → Sign-in method → Add provider → Apple**. Paste the Services ID, Team ID, Key ID and the contents of the `.p8` file.
5. Test **Continue with Apple** on the live site.

Firebase's guide has screenshots for each Apple step: https://firebase.google.com/docs/auth/web/apple

## How data is stored

| Firestore path | Who can read | Who can write | Contents |
|---|---|---|---|
| `profiles/{uid}` | Any signed-in user | Only that user | Display name, bottles |
| `private/{uid}` | Only that user | Only that user | Pair ratings, friends list |

- Email addresses are never stored in Firestore. Firebase Authentication keeps them.
- A friend code is the user's account id. Anyone with the code who is signed in can see that person's shelf. Nobody can change it except the owner.
- **Delete my account data** removes both documents. To remove the login too, delete the user under **Authentication → Users**.

## Files

- `src/engine.js`: accords, pairing rules, the catalog of about 90 fragrances, scoring
- `src/store.js`: Firebase sign-in and Firestore, plus the demo-mode fallback
- `src/main.js`: the interface
- `firestore.rules`: security rules, deployed by `npm run deploy`
