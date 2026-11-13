---
title: ""
redirect_from:
  - /development-wiki/
---

## Evolving in Rust

- Gradually replace Neovim's C code with Rust.
- Stay compatible with existing Neovim configuration and plugins.
- Replace custom implementations with standard libraries to reduce bugs and
  simplify maintenance.

## Features inherited from Neovim

Rustvim inherits the features below from upstream [Neovim](https://neovim.io/).
Our work focuses on evolving the implementation in Rust; see the
[roadmap](/roadmap/) for Rustvim's development plans.

### Extensible

- [Repeat anything](/doc/user/repeat/#excalibur) with `CmdAtom`.
- Create [Lua plugins](/doc/user/lua-plugin/#lua-plugin-new) easily.
  Your config lives in `init.lua`!
- API is [discoverable](/doc/user/api/#api-mapping),
  [versioned](/doc/user/api/#api-contract),
  [documented](/doc/user/api/#api-global).
- Ubiquitous [RPC](http://msgpack.org/) enables extensions in any language.
- [GUIs](#guis), IDEs, web browsers can `nvim --embed` as editor or script host.
- [Tree-sitter parsing](https://tree-sitter.github.io/) enables accurate syntax
  highlighting, text-objects, and more.

### Usable

- [Multicursor](/doc/user/repeat/#multicursor) instantly
  replays commands and mappings on a set of marks.
- Strong [defaults](/doc/user/vim_diff/#nvim-defaults) include a unique,
  minimalist colorscheme.
- [LSP](/doc/user/lsp/) provides semantic code inspection and refactoring.
- Multiplex with [:connect, :detach, :restart](https://www.youtube.com/watch?v=bqWIibaUN_A&list=PLvTJMxH60GZ8EJszAxm-IxUv12xaCcUlG)
  (like tmux, but works everywhere).
- No "Press ENTER" messages ([ui2](/doc/user/lua/#ui2)).
- Works the same everywhere: one build-type, one command.
- Modern terminal features are enabled by default: progress bar, cursor styling,
  focus events, bracketed paste, ….
- Builtin [:terminal](https://www.youtube.com/watch?v=xZbMVj9XSUo) set
  the standard for "TTY as a basic component".

### Drop-in Vim

- Fully compatible with Vim's editing model and Vimscript v1.
- Start with [`:help nvim-from-vim`](/doc/user/nvim/#nvim-from-vim)
  if you already use Vim. If not, try `:Tutor`.


{{% scratch "chat" %}}
## Community

- Follow development and contribute to [Rustvim on GitHub](https://github.com/tupos/rustvim).
- [Report bugs and request features](https://github.com/tupos/rustvim/issues).
- Read the [news](/news/) and [roadmap](/roadmap/) for project updates.
{{% /scratch %}}

{{% scratch "GUIs" %}}
## GUIs

Rustvim retains the editor UI protocol. These third-party interfaces may
need configuration to use a Rustvim build:
- [Firenvim](https://github.com/glacambre/firenvim) (an editor in your web
  browser!)
- [vscode-neovim](https://github.com/vscode-neovim/vscode-neovim) (an editor
  in VSCode!)
- [Neovide](https://neovide.dev/)
- [Goneovim](https://github.com/akiyosi/goneovim)
- [GNvim (GTK4)](https://github.com/vhakulinen/gnvim)
- [FVim](https://github.com/yatli/fvim)
- [Nvy](https://github.com/RMichelsen/Nvy)
- [Neovim Qt (Qt5)](https://github.com/equalsraf/neovim-qt)
- [VimR (macOS)](https://github.com/qvacua/vimr)
- [More...](https://github.com/neovim/neovim/wiki/Related-projects#gui)
{{% /scratch %}}


{{% scratch "faq" %}}
## FAQ {#faqs}

**What is the project status?**\
Rustvim is under active development toward release **0.1.0**. See the
[news](/news/) and [roadmap](/roadmap/) for progress and plans.

**Is Rustvim trying to turn Vim into an IDE?**\
The [vision](/vision/) of Rustvim is to preserve Vim's editing model while
improving the implementation and supporting extensions and external interfaces.
In addition, we would like to be able to write an editor in a modern language.

**Will Rustvim deprecate Vimscript?**\
No. Rustvim retains Vimscript support alongside its built-in Lua interface.
In the roadmap we would like to fully support the original vim development.

**Which plugins does Rustvim support?**\
Rustvim aims to preserve existing Vimscript and Lua plugin behavior as the
implementation moves to Rust. We aim to be fully compatible with the neovim
modulo bugs that will arise during migration. Report compatibility issues in
the [issue tracker](https://github.com/tupos/rustvim/issues).
{{% /scratch %}}
