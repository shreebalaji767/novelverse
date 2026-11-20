# Publishing guide

## Add a series
- Use a stable lowercase ID with hyphens.
- Create novels/<series-id>/ and add novel.json plus volumes.json.
- Register it in data/novels.json.
- Keep IDs stable after publication.

## Publish a chapter
- Add its Markdown file in the appropriate volume directory.
- Register its ID, title, order and relative content path.
- Update data/releases.json only for a genuinely announced or published release.
- Preview the chapter and validate links before committing.

## Safety
Treat Markdown as untrusted input. Use a safe renderer and sanitize generated HTML. Never put scripts, credentials, private drafts or reader data in public files.
