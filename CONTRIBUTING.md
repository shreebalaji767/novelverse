# Contributing to NovelVerse

NovelVerse is a static GitHub Pages project. Contributions must preserve this architecture.

## Architecture rules
- Use HTML, CSS and vanilla JavaScript.
- Store public content and metadata as files in this repository (JSON plus Markdown/HTML chapter files).
- Store personal reader data only in browser storage such as localStorage or IndexedDB.
- Use the Service Worker and Cache API for offline support.
- Do not introduce a database, backend, server-side functions, API service, account/authentication provider, hosted user storage, paid dependency or subscription.
- Do not describe My Library as the public novel catalogue. Public discovery is **Novels**; **My Library** is the reader's local saved shelf.
- Do not claim local data syncs between devices. Provide user-controlled export/import when portability is implemented.

## Publishing content
1. Add files under `novels/<series-id>/`.
2. Update the relevant JSON catalogue.
3. Use stable unique IDs and repository-relative paths.
4. Run `node tests/validate-data.mjs` and JavaScript syntax checks.
5. Commit to `main` and confirm the GitHub Pages workflow succeeds.

Keep all features compatible with free static hosting.
