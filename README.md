<div align="center">

# ⚡ FLUX

### Build Apps. Learn React. Ship Ideas.

The official website of **Flux**, the app development club of **PESU ECC**.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-EAB308?style=for-the-badge&logo=framer&logoColor=black)

</div>

---

## 🚀 How to Run

You need **Node.js 18+** and **npm**.

**1. Clone the repo**

```bash
git clone <your-repo-url>
cd <repo-folder>
```

**2. Install packages**

```bash
npm install
```

If something is missing, these are the libraries the code uses:

```bash
npm install next react react-dom framer-motion motion lenis ogl lucide-react clsx tailwind-merge
```

**3. Start the dev server**

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

**4. Build for production**

```bash
npm run build
npm start
```

> 📝 **Heads up**
> - Images live in `public/images` (team photos) and `public/icons` (logos, favicon).
> - The teams API keeps data in memory. It resets whenever the server restarts. Plug in a real database before going live.
> - The `/api/labs/submit` route is not built yet. Connect it to a database, sheet or webhook.

---

## 📁 App Folders

Everything lives in `src/app`. Each folder is one page or feature.

| Folder | What it does |
| :-- | :-- |
| 🏠 **`home/`** | The hero section on the landing page. A glowing circuit with the FLUX wordmark and moving pulses. |
| 👥 **`about/`** | Meet the team. Shows core members and seniors as profile cards. `page_jr.tsx` is a spare version that also lists juniors. |
| 🎟️ **`events/`** | Upcoming and past events, with an Aurora background. |
| ✉️ **`contact/`** | A simple contact form. It opens the user's mail app with the message filled in. |
| 🧪 **`labs/`** | Flux Labs. A floating, draggable window with the current challenge, a countdown, team sign up and project submission. |
| 🔌 **`api/labs/teams/`** | The teams API. `GET` lists teams (names only). `POST` registers a team. |
| 🎨 **`layout.tsx`** | Root layout. Loads fonts and wraps every page with the navbar, footer, preloader and transitions. |
| 📄 **`page.tsx`** | The landing page. Hero, about, and cards for Labs, Team and Events. |
| 💅 **`globals.css`** | Global styles. |

### Inside `labs/`

| File | What it does |
| :-- | :-- |
| `LabsWindow.tsx` | The window itself. Drag, minimize, maximize, close. |
| `LabsContent.tsx` | Decides what to show: brief, team form or submission form. |
| `challenges.ts` | The list of challenges. Each runs for 14 days. Edit this to change the live problem. |
| `Countdown.tsx` | Live timer to the start or end of a challenge. |
| `TeamForm.tsx` | Register a team of 1 to 4 members. |
| `TeamList.tsx` | Shows teams that have joined. |
| `SubmissionForm.tsx` | Submit a GitHub link for the project. |
| `Labs.module.css` | Styles for all of the above. |

---

## 🧩 Components

Everything lives in `src/components`.

### Layout

| Component | What it does |
| :-- | :-- |
| `Navbar` | A "Navigate" button that opens a full screen menu. |
| `Footer` | Logos, tagline and social links. |
| `preLoader` | Loading screen on the first visit. Locks scroll until done. |
| `PageTransition` | Quick fade between pages. Respects reduced motion. |
| `smoothScroll` | Smooth scrolling powered by Lenis. |

### UI

| Component | What it does |
| :-- | :-- |
| `profile-card` | Member card with photo, role, short line and Instagram button. Shows initials if there is no photo. |

### Reactbits

Animated backgrounds and effects, built with WebGL (`ogl`) and Framer Motion.

| Component | What it does |
| :-- | :-- |
| `Dock` | Mac style dock with a zoom on hover. Used for quick scrolling on the home page. |
| `Aurora` | Soft moving aurora glow. Used on Events. |
| `Topography` | Flowing contour lines. Used on Contact. |
| `LineWaves` | Wavy animated lines. Ready to use. |
| `WebThreads` | Glowing threads that fan out. Ready to use. |

---

## 🛠️ Other Folders

| Folder | What it does |
| :-- | :-- |
| `src/context/` | `LabsContext` holds the open, minimize and maximize state of the Labs window. |
| `src/constants/` | Shared constants like nav links. |
| `src/lib/` | `siteReady` tells the page when the preloader is done. `utils` has the `cn` class helper. |
| `src/styles/` | Extra shared section styles. |

---

## 🔤 Fonts

| Font | Used for |
| :-- | :-- |
| **Syne** | Headings |
| **DM Sans** | Body text |
| **Poppins** | Extra UI text |

---

<div align="center">

Made with ⚡ by the Flux team · PESU ECC

</div>
