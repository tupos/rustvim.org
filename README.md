# Rustvim.org website

This repository contains the source for [rustvim.org](https://rustvim.org/).
The website repository is [tupos/rustvim.org](https://github.com/tupos/rustvim.org).

Report editor bugs in [tupos/rustvim](https://github.com/tupos/rustvim/issues).

## Contributing

Fork this repository and send a pull request.

## Setup

This site is statically generated using Hugo.

1. Install Hugo:
   ```bash
   brew install hugo
   ```
2. Optionally generate documentation from a Rustvim source checkout:
   ```bash
   ./gendoc.lua <path>/<to>/rustvim
   ```
   The editor executable is currently named `nvim`; it must be on `PATH`.
3. Build and view the website locally:
   ```bash
   hugo serve -D
   ```
4. Open http://localhost:1313/.

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

TODO: Add Pagefind search. Generate its index from Hugo's built HTML during
site builds and publish the search assets with the website.

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
