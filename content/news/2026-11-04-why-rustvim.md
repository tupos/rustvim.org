---
title: "Why Rustvim?"
date: 2026-11-04
category: news
url: /news/why-rustvim/
---

You might ask why we want to rewrite Neovim in Rust. The migration itself
may not be particularly interesting, and others may have different
motivations. My reasons are highly subjective:

- I do not want to write C. I do not think C is well suited to modern
  software development.
- I want Vim and the ideas behind it to survive for decades to come. I would
  like people to continue using editors other than VS Code. This requires
  rapid iteration, and in my opinion, Rust is much better suited to
  LLM-assisted development than C.
- Neovim lags behind in support for remote development and development in
  devcontainers. These are areas that should be improved, and I believe Rust
  is a better choice than C for this work.
- The C code does not need to be rewritten in full. C and Rust code can
  coexist, allowing components to be migrated incrementally.

The project goals are:

- Rustvim is a fork of Neovim with a long-term goal: evolve the editor's
  implementation in Rust while preserving the editing model, configuration, and
  plugin interfaces. We aim to be compatible with Neovim.

- Documentation is another part of the work. The Rustvim Book, built with
  mdBook, should explain how the editor works, how its components fit together,
  and how they operate.

- We want to keep the Neovim editor we love while making its internals easier
  to understand, change, improve, and maintain. Rust lets us make ownership,
  lifetimes, and component boundaries explicit.

- The migration is incremental. Existing behavior provides the reference for
  moving components from C to Rust. Compatibility and behavior tests guide the
  work, and unavoidable unsafe code belongs at small, explicit interfaces
  between the two languages. The goal is to develop maintainable Rust
  implementations as the migration progresses.

- Compatibility is central to the project. Existing Vimscript and Lua
  configuration and plugins should continue to work as the implementation
  changes. Following Vim development is also part of the direction, with
  Vim9script support as a longer-term goal. Migration bugs will happen; they
  need to be reported, understood, and fixed against the intended behavior.

Rustvim builds on the work of the Vim and Neovim communities. Their editing
model, interfaces, and accumulated knowledge provide the foundation for this
project.
