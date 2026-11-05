---
title: Vision
layout: mainpage
aliases:
  - /charter/
---

Rustvim continues the tradition of Vim while incrementally moving editor
internals to Rust. The migration aims to preserve established editing behavior
and plugin interfaces while improving the implementation's maintainability.

### Goals

Compatible. Maintainable. Extensible.

- Retain the character of Vim—fast, versatile, quasi-minimal.
- Move implementation logic into safe Rust, with small, explicit C interfaces.
- Validate migrated components against existing editor behavior.
- Enable new contributors, remove barriers to entry.
- Create rustvim book and mdbook documentation of how the editor works and
  how it can be improved.
- Unblock plugin authors.
- Deliver a first-class Lua interface, as an alternative to Vimscript.
- Favor composability (long-term thinking) instead of new, incompatible
  concepts (short-term thinking).
- Follow relevant upstream editor development.
- Optimize "out of the box", for new users but especially regular users.
- Deliver a consistent cross-platform experience, targeting all libuv-supported
  platforms.
- In matters of taste/ambiguity, favor tradition/compatibility...
- ...but prefer usability if the benefits are extreme.
- Add support for the Vim9script

### Non-goals

- Turn Vim into an IDE
- Limit third-party applications (such as IDEs!) built with Rustvim
- Deprecate Vimscript
- Conform to POSIX vi

### Project management

- Development: [Rustvim on GitHub](https://github.com/tupos/rustvim)
- Contributing: [CONTRIBUTING.md](https://github.com/tupos/rustvim/blob/master/CONTRIBUTING.md)
