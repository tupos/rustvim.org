---
title: Roadmap
layout: mainpage
---

Rustvim is working toward release **0.1.0** through an incremental migration of
editor internals to Rust. Follow the [news](/news/) for updates and the
[source repository](https://github.com/tupos/rustvim) for implementation work.

## Toward 0.1.0

- Preserve established Vim editing behavior and existing plugin interfaces.
- Move editor components into Rust while keeping their C interfaces compatible.
- Keep implementation logic in safe Rust and isolate unavoidable unsafe code at
  the language boundary.
- Validate migrations with focused compatibility and behavior tests.
- Document the implementation and provide clear build and installation guidance.

Priorities will evolve as the migration progresses. This page describes the
current direction rather than a fixed release schedule.

## Upstream roadmap

The inherited Neovim roadmap is presented below as upstream context. For the
latest plans, see [Neovim's roadmap](https://neovim.io/roadmap/).

{{< upstream-roadmap >}}
