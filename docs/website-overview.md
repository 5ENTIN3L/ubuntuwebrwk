# Ubuntu Nexus Website — Comprehensive Overview

> **Last Updated:** 31 March 2026  
> **Version:** 2.x  
> **Stack:** React 18 + TypeScript, Vite, TailwindCSS, Framer Motion, React Router v6, Node/Express backend, Netlify hosting

---

## 1. Purpose & Organisational Context

The Ubuntu Nexus website is the primary digital presence for Ubuntu Nexus — a youth-led organisation based in Nairobi working across four pillars: Crime Prevention & Social Justice, Youth Peace & Security, Restorative Justice & Reintegration, and Education & Empowerment.

The website serves three audiences simultaneously:
- **Youth & Communities** — as a resource, information hub, and engagement point
- **Potential Partners & Donors** — as a credibility and partnership gateway
- **The Public & Media** — as a platform for Ubuntu Nexus's thought leadership and published insights

---

## 2. Functional Requirements

### 2.1 Navigation & Routing

| ID | Requirement | Status |
|----|------------|--------|
| F-01 | Multi-page single-page application (SPA) with client-side routing | ✅ Implemented |
| F-02 | Fixed responsive navigation bar with active link highlighting | ✅ Implemented |
| F-03 | Mobile hamburger menu with animated overlay | ✅ Implemented |
| F-04 | Scroll-aware navbar (transparent → frosted glass on scroll) | ✅ Implemented |
| F-05 | Footer with full navigation links and social media links | ✅ Implemented |

**Pages:**
- `/` — Home
- `/about` — About (The Human Element)
- `/initiatives` — Our Pillars
- `/programs` — Programs & Events
- `/insights` — Latest Insights
- `/partners` — Work With Us (Collaborations)
- `/contact` — Contact / Get Involved

---

### 2.2 Home Page

| ID | Requirement | Status |
|----|------------|--------|
| F-10 | Hero section with animated headline and gradient text | ✅ Implemented |
| F-11 | Auto-advancing image slideshow with manual prev/next controls and dot indicators | ✅ Implemented |
| F-12 | Slideshow auto-discovers images from `/public/images/slideshow/` at build time via Vite glob | ✅ Implemented |
| F-13 | Two-column "Core Paradigm" and "Justice & Peace" split section with links | ✅ Implemented |
| F-14 | Trust indicators block (statistics: 4 Core Pillars, 40+ Lives Impacted, 1 Founding Principle) | ✅ Implemented |
| F-15 | Latest Insights section displaying the 3 most recent articles | ✅ Implemented |
| F-16 | Parallax background gradient animation on scroll | ✅ Implemented |

---

### 2.3 Pillars Page (formerly Initiatives)

| ID | Requirement | Status |
|----|------------|--------|
| F-20 | Display all 4 organisational pillars with icon, heading, description, and bullet list | ✅ Implemented |
| F-21 | Alternating image/text layout for each pillar | ✅ Implemented |
| F-22 | Tilt and hover animations on pillar images | ✅ Implemented |
| F-23 | Scroll-triggered entrance animations per pillar | ✅ Implemented |

**Pillars:**
1. Crime Prevention & Social Justice
2. Youth, Peace & Security (YPS)
3. Restorative Justice & Reintegration
4. Education & Empowerment

---

### 2.4 Programs & Events Page

| ID | Requirement | Status |
|----|------------|--------|
| F-30 | Display programs with real-time auto-archiving based on `startDate`/`endDate` ISO timestamps | ✅ Implemented |
| F-31 | Dynamic categorisation: Upcoming → Ongoing → Past based on current system time | ✅ Implemented |
| F-32 | Featured card layout for active/upcoming programs; compact archive grid for past events | ✅ Implemented |
| F-33 | Full-screen overlay panel with detailed content (background, objectives, speakers, outcomes, themes, media gallery) | ✅ Implemented |
| F-34 | Registration link displayed only while event is live; auto-hides after end time | ✅ Implemented |
| F-35 | Event poster images supported as primary card imagery | ✅ Implemented |
| F-36 | `linkExpired` flag to manually suppress registration links independent of time | ✅ Implemented |

**Current Programs (as of 31 March 2026):**
- *Stop Selling Your Data for Free!* — Digital Privacy Webinar (31 March 2026)
- *Why Are We So Angry Online?* — Ubuntu Nexus Dialogues Webinar 1 (Past, Jan 2026)
- *Wezesha Program* — Phase 1 & 2 completed (Past, Oct–Dec 2025)

---

### 2.5 Insights Page

| ID | Requirement | Status |
|----|------------|--------|
| F-40 | Article listing page with category filter and card grid | ✅ Implemented |
| F-41 | Articles link externally to LinkedIn publications | ✅ Implemented |
| F-42 | Article cards show cover image, category, title, and excerpt | ✅ Implemented |
| F-43 | First 3 articles displayed as preview on Home page | ✅ Implemented |

**Published Insights:**
- *Labelling Young Offenders: How a Thief Becomes a Person* — Crime Prevention
- *Urban Poverty & Gangs: Why Youth in Nairobi's Informal Settlements Join* — Crime Prevention

---

### 2.6 About Page (The Human Element)

| ID | Requirement | Status |
|----|------------|--------|
| F-50 | Mission and Vision cards | ✅ Implemented |
| F-51 | Full team section with photo cards (grayscale → colour on hover) | ✅ Implemented |
| F-52 | Click-to-expand full bio modal overlay for each team member | ✅ Implemented |
| F-53 | Separate Volunteers section with compact cards | ✅ Implemented |
| F-54 | Founding Strategic Board (FSB) section with member cards and bios | ✅ Implemented |
| F-55 | "How We Understand Our Work" section with organisational philosophy | ✅ Implemented |

**Team Members:**
- Stacie Mwangi — Founder & Executive Director
- Mercy Tania — Programs Officer
- William Rui — Digital Operations Lead
- Benjamin Kitonga — Research Lead

**Volunteers:**
- David Diah — Digital Operations
- Lina Mukashumbusho — Digital Operations

**Founding Strategic Board:**
- Karlijn van der Poel (human rights specialist, King's College London / Leiden University)

---

### 2.7 Collaborations / Partners Page

| ID | Requirement | Status |
|----|------------|--------|
| F-60 | Partnership invitation section with vision statement | ✅ Implemented |
| F-61 | "Work With Us" CTA linking to Contact page | ✅ Implemented |
| F-62 | Why collaborate list (community safety, mentorship, restorative justice, local impact) | ✅ Implemented |

---

### 2.8 Contact Page

| ID | Requirement | Status |
|----|------------|--------|
| F-70 | Contact form with name, email, message fields | ✅ Implemented |
| F-71 | Form submits to backend API | ✅ Implemented |
| F-72 | Social media contact links (LinkedIn, Twitter/X, Instagram, Facebook, Email) | ✅ Implemented |

---

## 3. Non-Functional Requirements

### 3.1 Performance

| ID | Requirement | Notes |
|----|------------|-------|
| NF-01 | Fast initial page load — SPA served via Vite production bundle | Images lazy-loaded via Framer Motion |
| NF-02 | Auto-slideshow images discovered at build time — no runtime API calls | Zero server dependency for media |
| NF-03 | Fonts served from Google Fonts CDN (`Inter`, `Outfit`) | May be replaced with local hosting for offline resilience |
| NF-04 | Article images served from LinkedIn CDN | External dependency — could be proxied |

---

### 3.2 Accessibility

| ID | Requirement | Notes |
|----|------------|-------|
| NF-10 | Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) | ✅ Used throughout |
| NF-11 | `alt` attributes on all images | ✅ Implemented |
| NF-12 | Keyboard navigable links and buttons | ✅ Native `<a>` and `<button>` elements |
| NF-13 | Colour contrast — navy/white and red/white combinations | Should be verified against WCAG AA |
| NF-14 | Mobile-first responsive layouts throughout | ✅ Tailwind responsive breakpoints used |

---

### 3.3 Security

| ID | Requirement | Notes |
|----|------------|-------|
| NF-20 | All external links use `target="_blank"` with `rel="noopener noreferrer"` | ✅ Implemented |
| NF-21 | No user data stored client-side beyond session state (React state only) | ✅ Confirmed |
| NF-22 | Contact form data submitted to backend — backend should validate and sanitise | Backend API exists; sanitisation should be audited |
| NF-23 | No API keys or secrets in frontend code | ✅ Confirmed |

---

### 3.4 Maintainability

| ID | Requirement | Notes |
|----|------------|-------|
| NF-30 | All program data managed in a single typed `allPrograms` array in `Programs.tsx` | Easy to add new programs without code restructuring |
| NF-31 | All article data managed in `src/utils/data.ts` | Centralised, easy to extend |
| NF-32 | Team member bios self-contained in `About.tsx` array | Simple to update without touching layout code |
| NF-33 | Slideshow images are file-drop managed — no code changes needed to add slides | Just drop images into `/public/images/slideshow/` |
| NF-34 | TypeScript strict typing on program and team data | Catches data errors at compile time |

---

### 3.5 Deployment

| ID | Requirement | Notes |
|----|------------|-------|
| NF-40 | Deployed to Netlify with `netlify.toml` configuration | SPA redirect rule configured (`/* → /index.html`) |
| NF-41 | CI/CD pipeline via GitHub Actions | Automated build on push |
| NF-42 | Separate frontend (`/frontend`) and backend (`/backend`) sub-projects | Monorepo structure |

---

## 4. How The Website Helps The Organisation

### 4.1 Visibility & Reach

| Impact Area | Detail |
|-------------|--------|
| **Digital Presence** | Ubuntu Nexus has a fully indexed, SEO-friendly website — critical for any funding applications, media mentions, or partnership outreach. Without this, the organisation has no verifiable online presence beyond social media. |
| **Social Media Links** | LinkedIn, Twitter/X, Instagram, Facebook all linked from footer and contact page — consolidating all platforms in one place. |
| **Article Publications** | 2 published LinkedIn articles surfaced on the website, extending their reach beyond LinkedIn's algorithm-limited feed. |

---

### 4.2 Program Promotion

| Impact Area | Detail |
|-------------|--------|
| **Event Registration** | The registration link for the *Stop Selling Your Data for Free!* webinar (31 March 2026) was promoted on the Programs page with a live registration button that auto-expired at event end time. |
| **Wezesha Program Visibility** | Wezesha's impact — 2 completed phases, 40+ participants — is documented and discoverable online, creating a record of impact for future grant and funding applications. |
| **Auto-archiving** | Programs automatically move from "Upcoming" → "Ongoing" → "Past" using real-time comparison to ISO timestamps. Zero manual maintenance required. |

---

### 4.3 Credibility & Fundraising

| Metric | Estimated Value |
|--------|----------------|
| **Team bios + photos** | Demonstrates professional legitimacy — critical for grant applications that ask "who is behind this organisation?" |
| **Founding Strategic Board** | 1 confirmed FSB member (Karlijn van der Poel, King's College London) publicly visible — signals international credibility and governance |
| **Published Insights** | 2 peer-facing articles on labelling theory and urban youth gangs demonstrate intellectual rigour and sector knowledge |
| **Programs archive** | 3 documented programs (1 upcoming, 2 past) with full background, objectives, and outcomes — evidence base for impact reporting |
| **40+ Participants** | Wezesha Phases 1 & 2 combined — surfaced prominently on home page as a trust indicator |

---

### 4.4 Partnership Gateway

| Feature | Organisational Benefit |
|---------|----------------------|
| **Work With Us page** | Creates a low-friction entry point for organisations and individuals wanting to partner — drives them to the Contact page |
| **Vision statement on Partners page** | "A unified world where shared humanity, inclusion, and dignity shape how communities live, govern, and thrive" — mission-aligned messaging that resonates with potential institutional partners |
| **Contact form** | Captures formal partnership inquiries asynchronously without requiring intermediaries |

---

### 4.5 Internal Operations

| Feature | Benefit |
|---------|---------|
| **Centralised program records** | Every program's background, objectives, outcomes, and impact is documented in one place — useful for annual reports and board updates |
| **Staff directory** | Onboarding new team members or volunteers is documented publicly, reducing the need for repeated introductions |
| **Consistent branding** | Navy, red, yellow, and cream colour palette, Ubuntu-rooted language, and consistent visual design builds brand recognition |

---

## 5. Technical Architecture Summary

```
ubuntuwebrwk/
├── frontend/                  # React + TypeScript SPA
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx        # Hero, slideshow, pillars intro, stats, articles
│       │   ├── About.tsx       # Team, volunteers, FSB, philosophy
│       │   ├── Initiatives.tsx # 4 pillars detailed view
│       │   ├── Programs.tsx    # Events with auto-archiving
│       │   ├── Insights.tsx    # Articles listing
│       │   ├── Partners.tsx    # Partnership invitation
│       │   └── Contact.tsx     # Contact form
│       ├── components/
│       │   └── Layout.tsx      # Navbar, footer, mobile menu
│       └── utils/
│           └── data.ts         # Articles data
├── backend/                   # Node.js/Express API
│   └── (contact form handler, future API endpoints)
├── docs/                      # This documentation
└── netlify.toml               # Netlify deployment config
```

---

## 6. Open Items / Future Enhancements

| Priority | Item |
|----------|------|
| 🔴 High | Confirm total Wezesha participant count with Tania — currently showing "40+" |
| 🔴 High | Add Karlijn van der Poel's photo to `/public/images/staff/` |
| 🟡 Medium | Add more FSB members when confirmed |
| 🟡 Medium | Add more articles to `data.ts` as they are published |
| 🟡 Medium | Rename the "How We Understand Our Work" section title (alternative still being considered) |
| 🟢 Low | Proxy LinkedIn article images locally to remove external CDN dependency |
| 🟢 Low | Add WCAG contrast audit |
| 🟢 Low | Add OpenGraph / Twitter Card meta tags for social sharing |
