# NovelVerse

A free static light novel publishing and reading platform for GitHub Pages.

## Principles
- Free public reading; no ads, subscriptions, mandatory accounts or paid APIs.
- Static HTML, CSS and vanilla JavaScript.
- Novel content will use Markdown and JSON.
- Reader preferences and personal progress stay in the reader's browser.
- Publishing is manual through Git commits and GitHub Pages.

## Local preview
Serve this repository over HTTP because the app loads JSON using fetch:

```sh
python -m http.server 8000
```

Open http://localhost:8000/.

## Publishing a series
1. Create a directory under novels/<series-id>/.
2. Add novel metadata and volume/chapter catalogues.
3. Register the series in data/novels.json.
4. Validate IDs, paths, chapter order and cross-references.
5. Commit to main and verify the GitHub Pages deployment.

## Current status
Phase 1 foundation: homepage, responsive design system, library and calendar shells, global JSON catalogues, basic service-worker shell and GitHub Pages workflow. Reader, encyclopedia, bookmarks, statistics and export features are planned for later phases.
