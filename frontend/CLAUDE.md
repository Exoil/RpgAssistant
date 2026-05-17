# CLAUDE.md — Frontend (RpgAssistant SPA)

This file applies to all code under `frontend/`.

## Context

You are an expert **Vue 3** / **TypeScript** developer helping build the
RpgAssistant single-page application. The SPA consumes the backend REST API and
visualizes characters and their relationships as a graph. Follow the official
Vue, Vite, and TypeScript documentation for best practices.

## Stack

| Concern | Tool |
|---------|------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript (strict) |
| Build / dev server | Vite |
| Package manager / runtime | Bun (`bun.lock` is the lockfile) |
| Router | `vue-router` |
| HTTP | `axios` |
| Event bus | `mitt` |
| Styling | Bulma |
| Graph rendering | `v-network-graph` (+ `d3-force` layout) |
| Linting / formatting | ESLint, Prettier |
| Type check | `vue-tsc` |

## Directory layout

```
frontend/src/
├── App.vue                  <- root component
├── main.ts                  <- bootstrap (createApp, router, mount)
├── router/                  <- vue-router config
├── components/              <- reusable Vue components
├── composables/             <- reusable composition functions (use*)
├── models/                  <- TS types / DTOs mirroring backend contracts
├── services/                <- axios-based API clients
└── __tests__/               <- Vitest unit tests (separate test rules)
```

## Rules

<Rules>
    <Rule>
        Always give generated code for review. Help the user understand the code.
    </Rule>
    <Rule>
        Before you edit/create a file you must plan each step and inform the user about the plan.
    </Rule>
    <Rule>
        Answers must be short and understandable.
    </Rule>
    <Rule>
        Use the latest Vue 3 features. Write single-file components with
        `<script setup lang="ts">`, Composition API only — no Options API.
    </Rule>
    <Rule>
        TypeScript:
            - `strict` mode is on; do not weaken it.
            - Avoid `any`; prefer `unknown` + narrowing or precise types.
            - Type all props, emits, and composable return values explicitly.
    </Rule>
    <Rule>
        Naming:
            - Components: `PascalCase.vue`.
            - Composables: `useXxx.ts`, returning a plain object of refs / functions.
            - Models: `PascalCase` interfaces / types mirroring backend payloads.
            - Services: `xxx.service.ts`, exporting an object or factory of API calls.
    </Rule>
    <Rule>
        Performance:
            - Use `computed` for derived state; do not duplicate reactive sources.
            - Prefer `shallowRef` / `shallowReactive` for large external objects (e.g. graph data).
            - Lazy-load route components with dynamic `import()`.
            - Avoid unnecessary deep watchers; use targeted watchers or `computed`.
    </Rule>
    <Rule>
        HTTP / API:
            - All HTTP calls go through `services/` (axios). Components and composables must not call axios directly.
            - Reflect backend DTOs in `models/`; keep field names aligned with the API.
            - Handle errors at the service boundary; surface user-facing messages from composables/components.
    </Rule>
    <Rule>
        Styling:
            - Use Bulma utility classes first; add scoped `<style>` only when Bulma cannot express the layout.
            - Keep component styles `scoped` to avoid leaks.
    </Rule>
    <Rule>
        Tooling:
            - Run `bun run lint` and `bun run format` before finishing work.
            - Run `bun run type-check` and ensure it passes.
            - Do not disable ESLint or Prettier rules without a comment explaining why.
    </Rule>
    <Rule>
        Before implementing a feature, check the matching sequence schema in
        `../../schemas/sequences/` and the component schema in
        `../../schemas/components/`. Update the schema when the flow changes.
        See the "Schemas" section below for the full layout.
    </Rule>
    <Rule>
        If you do not know the answer, write "Don't know."
    </Rule>
</Rules>

## Schemas

Schemas live at the **repo root**, above `backend/` and `frontend/`, so both
stacks share the same design source of truth.

| Kind | Directory (from this file) | Format |
|------|----------------------------|--------|
| Component / architecture | `../../schemas/components/` | `*.drawio` |
| Sequence diagrams | `../../schemas/sequences/` | `*.md` (mermaid) |

Rule: drawio for everything **except sequence diagrams**, which are mermaid.

Read the matching sequence schema **before** implementing a feature, and update
it when the flow changes. For the canonical schemas list see the top-level
`../CLAUDE.md`.

## Commands

```bash
# Install
bun install

# Dev server
bun run dev

# Type check
bun run type-check

# Lint / format
bun run lint
bun run format

# Tests (Vitest)
bun run test
bun run test:run
bun run coverage

# Production build
bun run build
```
