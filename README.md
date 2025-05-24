# Tea and Scones Press Pty Ltd website

Static HTML site with minimal JavaScript created using [Eleventy](https://www.11ty.dev).

The `_site` directory contains the /generated/ content and is served to GitHub Pages via a GitHub Action.

To edit content, start with the `content` directory.

To build the site, install `nodejs` (to get `npx`) and run `build.sh`.

NB: The node_modules directory is excluded via a .gitignore file, so run `npm install` or `npx install` for local development.
