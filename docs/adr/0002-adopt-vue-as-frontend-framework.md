# ADR-0002: Adopt Vue 3 as the frontend framework

- **Status:** Accepted
- **Date:** 2026-05-24
- **Deciders:** Jakub Tederko
- **Affected component(s):** frontend

## Context

RpgAssistant needs a SPA to let game-masters browse characters and
visualize the relationship graph between them. The graph view is the
centerpiece of the UI and depends on a ready-made network-visualization
library rather than a bespoke implementation. The author is the sole
frontend developer on the project; framework familiarity directly affects
delivery speed and the risk of getting stuck on tooling rather than domain
problems.

## Decision

| Aspect | Chosen option | Why this one |
|---|---|---|
| Frontend framework | Vue 3 + TypeScript (Vite, Bun) | Lightweight, strong community, and a documented graph-visualization library (`v-network-graph`) that covers our core view; the framework the author already knows well. |

## Options considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Vue 3 — chosen** | Lightweight runtime; mature ecosystem; `v-network-graph` covers the relationship view out of the box; familiar to the author. | Smaller ecosystem than React for niche third-party widgets. | **Chosen** |
| Angular | Batteries-included (router, DI, forms); strong TypeScript story. | Heavier than the SPA needs; unfamiliar to the author — learning cost would dominate delivery. | Rejected — too heavy and unfamiliar for a single-developer SPA. |
| Raw JS/TypeScript (no framework) | Zero framework lock-in; no build-time framework cost. | Would require hand-rolling routing, reactivity, and the graph view integration; far more work than the project can absorb. | Rejected — too much work to stay framework-independent. |

## Consequences

- **Positive:** the relationship-graph view can be built on top of
  `v-network-graph` rather than written from scratch; the author can focus
  on domain features instead of climbing a framework learning curve.
- **Trade-offs:** the frontend is tied to the Vue ecosystem — any future
  component that doesn't have a Vue-friendly equivalent will need a wrapper
  or replacement; contributors must know Vue 3 + Composition API.
- **Follow-ups:**
  - Keep frontend coding rules in `frontend/CLAUDE.md` aligned with Vue 3
    + Composition API conventions.
  - When adding a new third-party UI library, prefer one with a Vue
    binding before reaching for a framework-agnostic wrapper.

## References

- Component schemas affected: `../../../schemas/components/ComponentSchema.drawio`
- `v-network-graph` — https://dash14.github.io/v-network-graph/