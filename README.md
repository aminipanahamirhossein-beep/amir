# ATELIER — Architecture, Design & Build

A premium, monochrome portfolio website for an architecture studio, built as a
single-page home experience plus dedicated portfolio, studio, project-detail and
contact routes.

- **Frontend** — React 19 + Vite, plain CSS with a token layer, no UI framework.
- **API** — Express 5 contact endpoint, backed by PostgreSQL.
- **Dev environment** — Docker Compose (see [Running locally](#running-locally)).

## Structure

```
web/                      React app (Vite dev server, published on port 3000)
  public/images/          architectural photography (local, committed)
  public/video/           hero film (scroll-scrubbed) + its first-frame poster
  src/components/         Header, MobileNavigation, HeroSection, HeroOverlay, AboutSection,
                          Statistics, FeaturedProjects, ProjectCard,
                          ServicesSection, ServiceItem, ContactCTA,
                          ContactForm, Footer, SectionIndex, ArrowLink, Logo
  src/pages/              Home, ProjectsPage, ProjectDetail, StudioPage,
                          ContactPage, NotFound
  src/data/               site.js (studio copy, nav, services) and projects.js
  src/hooks/              useReveal (entrance animation), useActiveSection,
                          useCinematicHero (hero scroll timeline)
  src/styles/             tokens.css → base.css → sections.css → hero.css → pages.css
api/                      Express contact API + schema bootstrap
docker-compose.base44.yml Development stack (web, api, postgres)
```

### Routes

| Route | Content |
| --- | --- |
| `/` | Hero, About (01), Featured Projects (02), Services (03), Contact CTA (04), Footer |
| `/projects` | Full portfolio grid — every entry in `src/data/projects.js` |
| `/projects/:slug` | Project detail: facts, scope, narrative, gallery, next project |
| `/about` | Studio page behind the "Learn More" link |
| `/contact` | Contact details and the working enquiry form |

Header and footer navigation point at the home-page sections (`Home`, `Projects`,
`About`, `Services`, `Contact`) and scroll to them smoothly; the section links in
each section lead to the dedicated pages.

## The hero

The home hero is a film the visitor scrubs with the page scroll. A full-height
stage is pinned inside a 320vh scroll track (210vh on phones); the scroll
position inside that track is normalised to a 0–1 progress value that drives both
the clip's `currentTime` and four crossfaded text states, so the sequence runs
forwards and backwards with the scroll. The clip is never autoplayed — it is
seeked.

- `useCinematicHero` owns the timeline (one `requestAnimationFrame` loop, no
  React re-render while scrolling); `HeroOverlay` renders the states; the copy,
  clip path and states live in `site.js` (`hero`).
- Both hero call-to-actions scroll to Featured Projects.
- With `prefers-reduced-motion` the hero renders the film's poster frame and the
  first state, and the page scrolls normally.

## Running locally

```bash
docker compose -f docker-compose.base44.yml up -d
# web  → http://localhost:3000   (Vite dev server, live reload)
# api  → internal only, proxied by the web dev server at /api
# db   → postgres 16, internal only
```

The stack runs the cloned source with hot reload; dependencies install on start
into named volumes. Useful commands:

```bash
docker compose -f docker-compose.base44.yml ps
docker compose -f docker-compose.base44.yml logs -f web
docker compose -f docker-compose.base44.yml down          # keep volumes (data)
docker compose -f docker-compose.base44.yml down -v       # also drop the database
```

To run the frontend outside Docker: `cd web && npm ci && npm run dev` (expects the
API at `http://127.0.0.1:8000`; override with `VITE_API_PROXY_TARGET`).

## Editing content

| What | Where |
| --- | --- |
| Hero copy, About copy, services, statistics, nav, footer, socials | `web/src/data/site.js` |
| Projects (title, category, year, facts, narrative, gallery) | `web/src/data/projects.js` |
| Colours, type scale, spacing, layout rhythm | `web/src/styles/tokens.css` |
| Imagery | `web/public/images/` (see credits below) |

Adding a project = adding one object to `projects.js`. It automatically appears in
the portfolio grid, and (with `featured: true`, first three) on the home page, and
gets its own `/projects/<slug>` page.

### Before going live

- `site.js` → `contact.email` is a placeholder (`studio@atelier.example`) and
  `contact.studio`/`responseTime` are illustrative. Replace them with the studio's
  real details.
- `site.js` → `socials` entries ship with empty `url` values, so they render as
  muted labels rather than links to accounts that do not exist. Add a URL to turn
  one into a live link.
- `web/index.html` → `og:image` uses a relative path; make it absolute once the
  production domain is known.
- Confirm the Unsplash licence still fits your use before commercial launch.

## Contact form and email

`POST /api/contact` validates the payload server-side, stores it in the
`contact_messages` table and returns `201`. The UI shows inline field errors, a
sending state and a success panel; a failure surfaces an honest error message.

**Submissions are stored, not emailed.** Outbound notification is optional and off
until configured. Provide these (compose reads them from `.env.base44-defaults`
locally, or from the platform's secret store) and extend
`api/src/routes/contact.js` with the relay call:

```
CONTACT_NOTIFICATION_EMAIL=studio@example.com
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
```

Read recent enquiries directly:

```bash
docker compose -f docker-compose.base44.yml exec db psql -U atelier -d atelier \
  -c "SELECT id, name, email, project_type, created_at FROM contact_messages ORDER BY id DESC;"
```

## Accessibility and performance

Semantic landmarks and heading order, keyboard-operable navigation with visible
focus states, labelled form fields with inline validation messages, a skip link,
`prefers-reduced-motion` honoured for every animation, descriptive alt text, lazy
loading below the fold, and one shared monochrome image treatment.

## Image credits

Photography in `web/public/images/` is from [Unsplash](https://unsplash.com) under
the Unsplash License, downloaded locally so the site never depends on a temporary
URL. Each file maps to the source photo it came from:

| File | Source |
| --- | --- |
| `hero-atelier-house.jpg` | `images.unsplash.com/photo-1657346088167-b982455bf29a` |
| `about-studio-concrete.jpg` | `images.unsplash.com/photo-1591394197887-b27e1ba3b2f9` |
| `about-studio-interior.jpg` | `images.unsplash.com/photo-1616577711667-3da65b20c36a` |
| `project-horizon-house.jpg` | `images.unsplash.com/photo-1523217582562-09d0def993a6` |
| `project-valley-cultural-center.jpg` | `images.unsplash.com/photo-1531591022136-eb8b0da1e6d0` |
| `project-riverside-office.jpg` | `images.unsplash.com/photo-1602150137620-510810591dff` |
| `project-cedar-ridge-residence.jpg` | `images.unsplash.com/photo-1684691376857-5dfb87f6bc65` |
| `project-meridian-civic-hall.jpg` | `images.unsplash.com/photo-1690357737706-b421b193048a` |
| `project-atrium-arts-pavilion.jpg` | `images.unsplash.com/photo-1614595737476-42487331b8a1` |
| `detail-white-concrete.jpg` | `images.unsplash.com/photo-1628012209120-d9db7abf7eab` |
| `detail-concrete-facade.jpg` | `images.unsplash.com/photo-1615406020658-6c4b805f1f30` |
| `detail-courtyard-pool.jpg` | `images.unsplash.com/photo-1670589953882-b94c9cb380f5` |

The hero film in `web/public/video/` is supplied by the studio
(`atelier-hero.mp4`, 640×480, 24 fps, 6 s); `atelier-hero-poster.jpg` is its first
frame, shown before the clip is ready.

## Deployment

This repository has no deployment configuration yet — no CI workflow, hosting
manifest or Dockerfile for production. The compose file here is a **development**
stack (bind-mounted source, dev servers, development database credentials) and is
not a production deployment.

To take it live: build the frontend (`cd web && npm ci && npm run build`) behind a
static host or CDN, run `api` as a long-lived Node service with production
`DATABASE_URL` and `NODE_ENV=production`, point the web tier's `/api` traffic at
it, and set `SMTP_*`/`CONTACT_NOTIFICATION_EMAIL` for notifications.
