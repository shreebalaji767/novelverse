# NovelVerse

NovelVerse is a **100% static light-novel publishing and reading website** hosted on GitHub Pages.

## Non-negotiable architecture

NovelVerse does not use a database or backend. Do not add Supabase, Firebase, SQL databases, server APIs, paid APIs, serverless functions, authentication services, or hosted storage.

| Need | Static implementation |
|---|---|
| Website | HTML, CSS and vanilla JavaScript |
| Published novels and chapter metadata | JSON files committed to this repository |
| Chapter text | Markdown or HTML/text files committed to this repository |
| Characters, places, world lore and timelines | JSON data files committed to this repository |
| Release calendar and announcements | JSON files committed to this repository |
| My Library (personal saved novels) | Browser `localStorage` |
| Reading preferences, bookmarks and progress | Browser `localStorage` |
| Offline app shell and downloaded chapters | Service Worker, Cache API and browser storage |
| Publishing and updates | Git commits to `main`, deployed by GitHub Pages |

Local browser data is private to that browser profile and device. It is not synchronized between devices and is not uploaded to GitHub. Users should be offered export/import backups for portable personal data.

## Principles
- Free public reading; no ads, subscriptions, mandatory accounts or paid APIs.
- Static HTML, CSS and vanilla JavaScript only.
- No database, backend, server-side runtime or user-account system.
- Novel content and all public catalogues are version-controlled files.
- My Library is a local personal shelf, not the public catalogue.
- The public discovery page is named **Novels**.
- Publishing is manual through Git commits and GitHub Pages.

## Local preview
Serve this repository over HTTP because the app loads JSON using fetch:

```sh
python -m http.server 8000
```

Open http://localhost:8000/.

## Publishing a series
1. Create a directory under `novels/<series-id>/`.
2. Add series metadata, volume/chapter catalogues and chapter text files.
3. Register the series in `data/novels.json`. Each series uses a stable `id`, `title`, `synopsis`, optional `subtitle`, `author`, `status`, `genres`, `tags`, `updatedAt`, and ordered `volumes`.
4. Each volume has a stable `id`, `title`, optional `order`, and a `chapters` array. Each chapter has a stable `id`, `title`, safe repository-relative `path`, and optional `order` and `subtitle`.
5. Optional `characters` entries use `id`, `name`, `role`, `description`, and optional `spoiler`. Optional `world` metadata uses `name`, `summary`, and `details` entries with `title` and `description`.
6. Validate IDs, paths, chapter order and cross-references.
7. Commit to `main`; GitHub Actions validates and deploys the static files to GitHub Pages.

The public catalogue and series pages are read-only displays of committed content. No in-browser authoring or remote publishing service is required.

## Current status
The repository includes the homepage, responsive design system, public Novels catalogue with series-detail pages, volume/chapter navigation, character and world overview sections, browser-local My Library, release-calendar shell, global JSON catalogues, reading room with adjustable typography/themes/width, local bookmarks and saved scroll position, service-worker app-shell caching, and GitHub Pages deployment validation.

The public catalogue currently contains no published series. The reader displays an unavailable state until actual series and chapter files are committed. Character/world encyclopedias, statistics, personal-data backup/export and richer offline downloads are planned as static-file and browser-storage features only.

## Character and world encyclopedias

The public encyclopedia uses two committed JSON catalogues:
- `data/characters.json` — character profiles, aliases, appearance, personality, history, abilities, affiliations, relationships and chapter appearances.
- `data/worlds.json` — world settings, geography, history, locations, organizations/factions and chronological events.

Each character record has a stable `id`, its parent `novelId`, a `name`, and optional `role`, `summary`, `aliases`, `appearance`, `personality`, `history`, `abilities`, `affiliations`, `relationships`, and `appearances`. Relationship entries can point to another character ID in the same series. Appearance entries can reference a chapter ID.

Each world record has a stable `id`, its parent `novelId`, and a `name`. Optional fields include `type`, `summary`, `geography`, `history`, `locations`, `organizations`, and `timeline`. Location, organization and timeline entries each require their own stable `id` and `name` or `title`. Timeline entries may reference a published chapter ID.

Use `spoiler: true` on a character, world, relationship or individual world entry to hide that information by default. Readers must deliberately enable spoiler reveal on the encyclopedia page. Keep public descriptions spoiler-safe; the toggle is a reader convenience, not access control.

The pages `characters.html` and `worlds.html` provide searchable, series-filtered directories. `character.html` and `world.html` provide individual profiles. Series detail pages link to filtered encyclopedia views. All public data is static and committed to Git; no account, server or database is involved.


## Publishing Studio

Open `publish.html` to prepare your own series metadata, volumes, chapter Markdown and optional character/world JSON. The Studio validates the local draft and exports one JSON publishing package containing the metadata and chapter file contents. You can import that package back into the Studio to continue editing.

The Studio saves optional drafts only in this browser's `localStorage`. Exported packages are downloaded to the user's device. Nothing is uploaded, committed, or deployed by the Studio. To publish, manually create the listed chapter files, merge the supplied entries into the relevant JSON catalogues, and commit the changes to `main`. GitHub Actions performs the repository validation and deploys the static site.

The publishing package is a preparation/export format, not a server-side publisher. Never put GitHub tokens or other credentials into the Studio. It is designed for one-series-at-a-time authoring; existing repository catalogues must be merged rather than replaced.
