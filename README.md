# Rustvim.org website

This repository contains the source for [rustvim.org](https://rustvim.org/).
The website repository is [tupos/rustvim.org](https://github.com/tupos/rustvim.org).

Report editor bugs in [tupos/rustvim](https://github.com/tupos/rustvim/issues).

## Contributing

Fork this repository and send a pull request.

## Setup

This site is statically generated using Hugo.

1. Install Hugo and Node.js:
   ```bash
   brew install hugo node
   ```
2. Optionally generate documentation from a Rustvim source checkout:
   ```bash
   ./gendoc.lua <path>/<to>/rustvim
   ```
   The editor executable is currently named `nvim`; it must be on `PATH`.
3. Build and preview the website with search:
   ```bash
   node scripts/build-site.mjs --serve
   ```
4. Open http://localhost:1313/. Hugo live reload and search indexing update
   automatically as you edit.

## Maintenance

### Creating news posts

```bash
hugo new content content/news/<filename>.md
```

News URLs use `/news/<year>/<month>/`, as configured in `hugo.toml`.
Rustvim news and its RSS feed exclude posts marked `upstream: true`.
The inherited Neovim newsletters remain available at `/news/archive/`, with
an upstream notice on each article. Their original names and links are preserved.
The inherited roadmap appears under "Upstream roadmap" on `/roadmap/` and is
also available separately at `/upstream-roadmap/`. Its links point upstream.

To include Markdown separately from the main content, use the [scratch]
[shortcode][shortcodes] and retrieve it with
`{{ .Page.Scratch.Get "<name>" }}` in a layout.

### Site search

Search uses [Pagefind](https://pagefind.app/). The shared build script runs
Hugo, then Pagefind 1.6.0 to index the generated HTML and write the search
index and browser assets to `public/pagefind/`. GitHub Actions runs the same
script after generating the editor documentation, and publishes the search
assets with the website.

The header's search button opens a dialog. Search includes the main page
content and generated editor documentation; navigation, sidebars, redirects,
and the 404 page are excluded. Search assets are served from this website.

Run `node scripts/build-site.mjs` for a production build. Use
`node scripts/build-site.mjs --serve` for local development: it builds the
initial index, starts Hugo's live server, and watches rendered HTML to
refresh search after rebuilds. A fresh temporary build keeps deleted pages
out of the index. Pagefind's own output is excluded from the watcher to avoid
rebuild loops. Hugo server options can follow `--serve`, for example
`--port 1314`.

Node.js 24 is used in CI. Node.js 22 or newer is required for the development
watcher. Plain `hugo server` still works for content previews, but does not
refresh the search index.

### Code highlighting

See [rustvim-hi.css](./static/css/rustvim-hi.css) and
[rustvim.min.css](./static/highlight/styles/rustvim.min.css) for the inherited
syntax palettes, which retain their upstream attribution and license.

Hugo code highlighting is configured in the `[markup]` section of `hugo.toml`.
To generate an alternative palette:

```bash
hugo gen chromastyles --style nord > static/css/syntax.css
```

Then update the stylesheet link in `layouts/baseof.html`.

### Hosting

The production domain is `https://rustvim.org/`. Configure that custom domain
and its DNS records in the GitHub Pages hosting settings. `static/CNAME` records
the intended domain in the published site.

The shared build action checks out `tupos/rustvim` to generate the editor
reference documentation and serves its PDF as `/doc/user/rustvim-help.pdf`.
The source links and documentation build use that same repository.

[scratch]: ./layouts/_shortcodes/scratch.html
[shortcodes]: https://gohugo.io/content-management/shortcodes/
