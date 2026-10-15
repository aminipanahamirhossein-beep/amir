# AGENTS.md — working notes for this repository

Non-obvious things only. `README.md` covers what the site is.

## Running the app here

```bash
docker compose -f docker-compose.base44.yml up -d      # web (host :3000) + api + postgres
docker compose -f docker-compose.base44.yml ps
docker compose -f docker-compose.base44.yml logs -f web
```

- `web` (Vite dev server, container port 5173 → **host 3000**) is the only published
  port. `api` (Express, port 8000) is **not** published: the browser reaches it
  through the Vite proxy at `/api`, so frontend and API share one origin and there
  is no CORS surface.
- Nothing is built into images. Both app services run `node:22` with the repo
  bind-mounted and install their own dependencies into named volumes
  (`web-node-modules`, `api-node-modules`) on container start using `npm ci`.
  After editing `package.json` or `package-lock.json`, recreate that service:
  `docker compose -f docker-compose.base44.yml up -d --force-recreate web`.
- Regenerate a lockfile from the same image the containers use:
  `docker run --rm -v "$PWD/web:/w" -w /w node:22 npm install --package-lock-only`.
  `npm ci` fails if the lockfile and `package.json` disagree.

## Database

- There is **no migration step**: `api/src/schema.js` runs idempotent
  `CREATE TABLE IF NOT EXISTS` statements on API boot before it starts listening.
- Contact submissions live in `contact_messages`. Inspect them with:
  ```bash
  docker compose -f docker-compose.base44.yml exec db psql -U atelier -d atelier \
    -c "SELECT id, name, email, project_type, created_at FROM contact_messages ORDER BY id DESC LIMIT 10;"
  ```
- Outbound email is **not wired up**. A submission is stored and the API returns
  201; nothing is emailed unless SMTP + `CONTACT_NOTIFICATION_EMAIL` are supplied
  (see README). Never claim a message was emailed.

## Preview environment specifics

- `BASE44_PREVIEW_MODE` is passed through as a bare compose `environment:` entry.
  The app does not need it today; keep it that way unless a change genuinely has to
  differ in the sandbox.
- Vite's dev-server host allowlist comes from `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`
  (set by the platform and passed through by compose). Do **not** hardcode
  `server.allowedHosts` in `web/vite.config.js`.
- `env_file` order matters: `.env.base44-defaults` (committed placeholders) comes
  first, `/run/base44/app.env` (platform secrets) last, because later entries win.

## Verifying a change

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/           # web
curl -s -X POST http://localhost:3000/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"","email":"x","projectType":"","message":""}'              # validation errors
```

A response containing `/@vite/client` and unhashed `/src/*.jsx` means the dev
server is serving the live source (edits are visible); a hashed bundle means
something is serving a production build instead — fix the compose file.

## Conventions

- Styling is plain CSS with one token layer: `src/styles/tokens.css` (colour, type,
  spacing) → `base.css` (reset, typography, utilities, form controls) →
  `sections.css` (home-page sections) → `pages.css` (sub-pages). Change tokens, not
  literals.
- All content lives in `src/data/site.js` and `src/data/projects.js`. Adding an
  object to `projects` publishes a new card, a portfolio entry and a detail route —
  no component changes needed.
- Architectural imagery is stored locally in `web/public/images` and desaturated in
  CSS (`.figure img` has `filter: grayscale(100%)`). Keep the source files in colour;
  never pre-process them.
- Motion always goes through `useReveal` / `lib/scroll.js`, which respect
  `prefers-reduced-motion`.
