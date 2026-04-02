# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Commit Rules
- Do NOT include "Co-Authored-By" lines in commit messages.

## Build & Development Commands

```bash
npm start          # Dev server on port 3000
npm run build      # Production build (CI=false to suppress warnings)
npm run prod       # Alias for build
npm test           # Jest tests via react-scripts
```

Deployed to **Netlify** — build command in production is `CI= npm run build` with SPA redirects (`/* → /index.html`).

## Architecture Overview

**Single-page React 17 app** (Create React App) for Vala Films, a film production company.

### Routing

Two routing layers:
1. **React Router (App.js)**: Three URL routes — `/` (main app), `/login`, `/admin` (protected via `PrivateRoute` + Firebase Auth)
2. **State-based view switching (main.js)**: The main app uses `useState` to toggle between views (home, projects, collab, adverts, about, team, photography) — these are NOT separate URL routes

### Backend — Firebase

All content is stored in Firebase Realtime Database at `/vala/` path. Firebase also provides Auth and Cloud Storage.

**Config**: Environment variables in `.env.production.local` (not committed):
```
REACT_APP_FIREBASE_KEY, REACT_APP_AUTH_DOMAIN, REACT_APP_FIREBASE_URL,
REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET,
REACT_APP_MESSAGING_SENDER_ID, REACT_APP_APP_ID, REACT_APP_MEASUREMENT_ID
```

Firebase config is initialized in `src/components/firebase.js`.

### State Management

No state library — purely React hooks (`useState`, `useEffect`) with Firebase as the source of truth. Components fetch data directly from Firebase using realtime listeners (`.on('value', ...)`).

### Styling

- **App.css** (~1900 lines): Monolithic CSS file with all component styles
- **index.css**: Global resets and `@font-face` declarations
- Some components use **Material-UI `makeStyles`** (Projects, About, Login, Photography)
- Dark theme: background `#010101`, text `#EEEEEE`, accent gold `#c1872b`
- Responsive breakpoints: 768px (tablet), 500px (mobile)
- Custom fonts: Akzidenz-Grotesk BQ, BauLF-Medium, pfdintextpro (loaded from `src/fonts/`)

### Key Component Structure (src/components/)

| File | Purpose |
|------|---------|
| `main.js` | Main app shell — nav, footer, view switching |
| `homepage.js` | Landing hero with YouTube video |
| `projects.js` | Film showcase with category filtering |
| `collabs.js` | Collaborations gallery |
| `ad.js` | Advertisements section |
| `about.js` / `creativejunkies.js` | Team bios with infinite scroll |
| `photography.js` | Photo gallery with sliders |
| `login.js` | Firebase auth login form |
| `admin.js` | CMS dashboard for content management |
| `upload.js` / `photoupload.js` | Firebase Storage file uploads |
| `firebase.js` | Firebase initialization |

### Third-Party Integrations

- **EmailJS**: Service `service_44a9us2`, templates for join/contact forms
- **Mailchimp**: Newsletter subscription embedded in nav
- **FormSubmit**: Contact form via `formsubmit.co/info@valafilms.com`

### Key Libraries

- `react-router-dom` v5 (routing)
- `@material-ui/core` v4 (UI components)
- `firebase` v8 (backend)
- `react-slick` + `slick-carousel` (carousels)
- `react-player` / `react-youtube` (video)
- `react-lazy-load-image-component` (performance)
- `rodal` (modals)
