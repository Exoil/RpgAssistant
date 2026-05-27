# ADR-0003: Ship both a Foundry VTT module and a standalone SPA from one codebase

- **Status:** Accepted
- **Date:** 2026-05-26
- **Deciders:** Jakub Tederko
- **Affected component(s):** frontend, gateway, infrastructure

> **Note:** This record merges the earlier ADR-0003 ("Convert Vue SPA to a
> Foundry VTT module") and ADR-0004 ("Restore standalone SPA alongside the
> Foundry module") into a single decision. The two-step history — convert to
> Foundry-only, then restore the standalone path — collapses here into one
> conclusion: **support both hosting modes from one shared codebase.**

## Context

The Vue 3 SPA grew toward a tabletop character manager — character identity, a
"knows" relationship graph, and a backlog of sheets, notes, and dice helpers.
Most of that backlog is functionality **Foundry Virtual Tabletop already
provides** (actors, sheets, journals, items, chat, dice), so our actual
differentiator is narrower: the **character-relationship graph and path
queries**. That argues for delivering the graph as a Foundry module rather than
re-implementing a whole VTT.

But making Foundry the *only* front door has real costs: it locks out tabletop
GMs (and contributors evaluating the project) who do not run Foundry, and it
makes day-to-day work harder — the graph is **easier to debug and test as a
plain web app than as a module living inside Foundry's `ApplicationV2`
lifecycle**. The decision must therefore keep the graph differentiator while
supporting **both** hosting modes from **one** frontend codebase:

- a **Foundry module/plugin** for GMs who run Foundry, and
- a **standalone SPA** for everyone else — also the faster surface to develop
  and test features on before they ship inside the module.

The backend API (`/v1/...`) and the Neo4j store are unchanged; only the
frontend hosting model is in scope.

## Decision

| Aspect | Chosen option | Why this one |
|---|---|---|
| Frontend hosting model | Ship **two** front doors from one codebase: a Foundry VTT v14 module (`module.json` → `esmodules`, mounted in `ApplicationV2`) **and** a standalone Vue SPA. | Foundry GMs get the graph inside their world; non-Foundry users still get the differentiator; the standalone app doubles as the easy debug/test surface. |
| Host-mode selection | Compile-time flag `__IS_FOUNDRY__`, injected via Vite `define`, surfaced as `isFoundry` / `isStandalone` from `src/env.ts`. | Replaces a fragile runtime DOM probe; lets Vite tree-shake the unused branch so neither bundle ships the other mode's code. |
| Frontend build | Foundry build → Vite **library mode** via `vite.config.foundry.ts`, output `frontend/dist/` (`main.js` + `style.css`, bind-mounted into the Foundry container). Standalone build → `frontend/dist-standalone/`. | Foundry loads ES modules from disk; separate `outDir`s stop the standalone build from silently overwriting the running module on every `vite build`. |
| CSS isolation (Foundry build only) | PostCSS `postcss-prefix-selector` scoping every selector under `.rpg-assistant`. | Bulma and `v-network-graph` ship global selectors that would repaint Foundry's own chrome; prefixing confines them to the module window. The standalone build needs no such scoping. |
| API base URL | **Foundry:** world setting `rpg-assistant.apiBaseUrl`, default `http://localhost:8080` (dev gateway). **Standalone:** same-origin `/v1/` proxied by the `ui` nginx container. | Foundry serves the module on `:30000` and reaches the API cross-origin via the gateway; the standalone SPA keeps everything same-origin so no CORS is needed. |
| Cross-origin (Foundry path) | `/v1/` location in `gateway/nginx.conf.template` adds CORS headers for `http://localhost:30000`. | The browser blocks Foundry's cross-origin call to the gateway without it; the gateway is the natural allow-list point. These headers stay scoped to the Foundry path only. |
| Standalone hosting | New `ui` nginx container (`ui/nginx.conf.template`) serving `frontend/dist-standalone/` on `:8080`, proxying `/v1/` to the API same-origin, with SPA fallback to `index.html`. | Keeps the standalone UX same-origin (no CORS) and gives vue-router HTML5 history shareable routes. |
| Deployment switch | Single `docker-compose.yaml` using Compose **profiles**: `gateway` + `foundry` under profile `foundry`; `ui` under profile `standalone`. `api` and `neo4j` are profile-less (always-on). The two `:8080` binders (`gateway`, `ui`) are mutually exclusive by design. | Profiles is the Compose-native mechanism for mutually-exclusive deployment variants; one source of truth, no `-f overlay.yaml` juggling. |
| Router history | `isFoundry ? createMemoryHistory() : createWebHistory(BASE_URL)`. | Foundry windows have no URL bar (memory history is correct); the SPA at `:8080/` needs HTML5 history for shareable routes. |
| Dev-time iteration | `bun run dev` (Vite dev server) remains for component-level work. | Fast HMR while tweaking individual Vue components; complements the standalone build as a development tool. |

## Options considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Both Foundry module + standalone SPA, one codebase, compile-time flag + Compose profiles (chosen)** | Serves Foundry and non-Foundry users; standalone is the easy debug/test surface; one codebase; per-build dead-branch elimination; idiomatic Compose. | Two bundles and two `outDir`s to keep straight; two nginx templates; users must remember `--profile`. | **Chosen** |
| Foundry-only module (drop the standalone path) | Smallest surface; one front door. | Locks out every non-Foundry user; the graph differentiator is trapped behind a heavy VTT dependency; harder to debug/test in isolation. | Rejected — contradicts the goal of reaching non-Foundry users and of an easy test surface. |
| Keep the standalone Vue SPA only (status quo before the conversion) | Full UX control; no Foundry dependency. | Forces us to reimplement sheets, notes, scenes, dice — none of which are our differentiator; users keep duplicate character data in two tools. | Rejected — duplicating Foundry built-ins is the work we explicitly want to stop. |
| Runtime detection (probe for `Hooks` / `#app`) | No build-time wiring. | Cannot drive tree-shaking; fragile in tests/SSR; the original router showed `!document.getElementById('app')` is a coincidence, not a contract. | Rejected — same fragility the compile-time flag removes. |
| Two Compose files via `-f overlay.yaml` | Familiar pattern. | Three files for what profiles do in one; easy to forget an overlay in the `-f` chain. | Rejected — profiles solve this in a single file. |
| Two separate frontend repos | Total isolation between modes. | Forks the codebase; graph fixes have to land twice; loses the share-everything point. | Rejected — duplicates the work this decision consolidates. |
| [`foundry-vue`](https://gitlab.com/foundry-projects/foundry-vue) bridge package | Looks Vue-native at first glance. | Last release v0.1.0 Beta, verified only against Foundry 0.6.4 (current is 14.x); predates Vue 3; effectively abandoned. | Rejected — depends on a dead upstream. |
| Standalone Electron/desktop app | Native packaging; offline use. | Multi-month build; reimplements VTT primitives from scratch; no added value over Foundry. | Rejected — cost orders of magnitude higher for no new value. |

## Consequences

- **Positive:**
  - Both audiences are served: `docker compose --profile foundry up` brings up
    `api` + `neo4j` + gateway (with CORS) + Foundry with `dist/` mounted
    read-only; `docker compose --profile standalone up` brings up `api` +
    `neo4j` + `ui` and serves the SPA on `:8080`.
  - The standalone app is the fast lane for developing and testing features —
    no Foundry runtime or `ApplicationV2` lifecycle to stand up first.
  - The module surface stays focused on its actual contribution: the
    relationship graph, path search, and the API client. Character identity,
    sheets, notes, dice, and sessions remain Foundry's job in that mode.
  - Each bundle is smaller than a single dual-mode bundle would be — Vite drops
    the dead branch when `__IS_FOUNDRY__` is known at build time. (Standalone
    ~351 kB raw / ~117 kB gzipped; Foundry ~519 kB raw / ~142 kB gzipped —
    Foundry is larger because of bundled Bulma + `v-network-graph` plus the
    CSS-prefix overhead.)
  - The fragile runtime DOM probe is gone — replaced by a typed compile-time
    constant.
- **Trade-offs:**
  - Two build commands and two `outDir`s: `bun run build:foundry-only` →
    `dist/`; `bun run build-only` → `dist-standalone/`. The comment in
    `vite.config.ts` calls this out to keep contributors from re-introducing
    the overwrite footgun.
  - Two nginx templates (`gateway/nginx.conf.template` for the Foundry-mode
    CORS gateway; `ui/nginx.conf.template` for the standalone host + same-origin
    API proxy). An API-surface change (new endpoint/header) means revisiting
    both.
  - The Foundry-mode CORS allow-list means the gateway is not safe to expose to
    the public internet without tightening the origin.
  - The standalone bundle still imports `@/foundry/injection-keys` (the API
    base-URL key). That resolves to a Vue `InjectionKey<string>` constant — no
    Foundry runtime dependency travels with it; keeping it shared avoids a
    second key purely for the standalone path.
- **Follow-ups:**
  - Update `schemas/components/ComponentSchema.drawio` to show **both**
    deployment topologies (foundry profile vs standalone profile) as a single
    annotated diagram.
  - Re-add a CI lane that builds **both** targets — without it, drift between
    the two modes stays silent until a user reports a broken bundle.
  - Adopt Foundry's `Actor` as the source of character identity (graph stays in
    Neo4j keyed by Foundry actor id) — a contract change spanning backend,
    schemas, and the API client, so it warrants its own follow-up ADR.
  - Decide whether the standalone build also pulls strings from
    `frontend/lang/en.json` (currently Foundry-only via `game.i18n.localize`)
    or keeps its own. Move remaining English literals out of components either
    way.
  - Register the `rpg-assistant` module id on foundryvtt.com before first public
    release; the id is final once published.
  - Audit Bulma against Foundry's own design system before public release —
    bundle size and the `.rpg-assistant` prefix workaround are both symptoms of
    carrying a parallel design system.

## References

- Sequence schemas affected: `../../../schemas/sequences/*.md` (behaviour
  unchanged; the standalone path reaches the same endpoints same-origin, the
  Foundry path cross-origin via the gateway).
- Component schemas affected:
  `../../../schemas/components/ComponentSchema.drawio` (needs both deployment
  topologies — see Follow-ups).
- External docs:
  - [Foundry VTT API (v14.360)](https://foundryvtt.com/api/)
  - [Foundry module development guide](https://foundryvtt.com/article/module-development/)
  - [felddy/foundryvtt-docker](https://github.com/felddy/foundryvtt-docker)
  - [Compose profiles](https://docs.docker.com/compose/profiles/)
  - [Vite `define`](https://vite.dev/config/shared-options.html#define)
- Module-scoped rules: `.claude/rules/foundry.md`
- Scaffold skill: `.claude/skills/foundry-module/SKILL.md`