---
title: Roadmap
layout: mainpage
---

## Toward 0.1.0

Release **0.1.0** will be a proof of concept showing that Rust and C code can
coexist.

The release will be complete when the rendering code has been fully migrated
to safe Rust, with C code calling it only through an FFI layer. This release
will be based on Neovim **0.13**.

The goals for this release are:

- Preserve established Vim editing behavior and existing plugin interfaces.
- Move the rendering code into safe Rust while keeping an FFI layer so C code
  can call it.
- Keep implementation logic in safe Rust and isolate unavoidable unsafe code at
  the language boundary.
- Validate migrations with focused compatibility and behavior tests.
- Document the implementation and provide clear build and installation guidance.
- Document the migrated Rust code in the Rustvim Book, an
  [mdBook](https://rust-lang.github.io/mdBook/) explaining how the editor's
  rendering code works.

## Upstream roadmap

The inherited Neovim roadmap is presented below as upstream context. For the
latest plans, see [Neovim's roadmap](https://neovim.io/roadmap/).

{{< upstream-roadmap >}}
