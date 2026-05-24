# ADR-0001: Convert Vue SPA to Foundry VTT module

- **Status:** Superseded by [ADR-0002](./0002-restore-standalone-spa-alongside-foundry-module.md)
- **Date:** 2026-05-24
- **Deciders:** Jakub Tederko
- **Affected component(s):** frontend, gateway, infrastructure

## Context

The Vue 3 SPA has been growing toward a "tabletop character manager": it
already stores character data (name, identity) and renders a graph of
"knows" relationships, and the backlog points at character sheets, notes,
and dice helpers. Every one of those follow-ups is functionality
**Foundry Virtual Tabletop already provides** as a first-class part of any
game world — actors, sheets, journals, items, chat, dice. Re-implementing
them in a standalone SPA duplicates effort and forces our users to keep
character data in two places.

The decision must preserve our actual differentiator — the
**character-relationship graph and path queries** — while delegating
everything else (storage of character identity, sheets, the entire VTT
shell) to Foundry. The backend API (`/v1/...`) and Neo4j store remain
unchanged; only the hosting model of the frontend moves.

## Decision

| Aspect | Chosen option | Why this one |
|---|---|---|
| Frontend hosting model | Foundry VTT v14 module loaded via `module.json` → `esmodules`, mounted inside `ApplicationV2` | Foundry owns character identity, sheets, sessions; the module ships only the graph view and API client. |
| Frontend build | Vite **library mode** via `vite.config.foundry.ts`, output `dist/main.js` + `dist/style.css` | Foundry loads ES modules from disk; library mode emits exactly that shape with one stylesheet to reference from `module.json`. |
| CSS isolation | PostCSS `postcss-prefix-selector` scoping every selector under `.rpg-assistant` (Foundry-build only) | Bulma and `v-network-graph` ship global selectors that would repaint Foundry's own chrome; prefixing confines them to the module window. |
| API base URL | Foundry world setting `rpg-assistant.apiBaseUrl`, default `http://localhost:8080` (the dev gateway) | Foundry serves the module on `:30000`; the API lives on the gateway on `:8080`. World scope lets the GM configure once for every player. |
| Cross-origin | `/v1/` location in `gateway/nginx.conf.template` adds CORS headers for `http://localhost:30000` | Browser blocks the cross-origin request from Foundry to the gateway without it; gateway is the natural place to allow-list. |
| Standalone SPA hosting | **Removed.** No `ui` container; gateway is API-only; the only deployed UI lives inside Foundry. | RpgAssistant must always be a Foundry modal — duplicating it as a separate web app on `:8080` confuses the product story and the deployment. |
| Dev-time iteration | `bun run dev` (Vite dev server with `index.html` + `src/main.ts`) remains for component-level work, but is never deployed | Developers still need fast HMR when tweaking individual Vue components; the dev path is a tool, not a product. |

## Options considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Foundry VTT module (chosen)** | Reuses Foundry's character/actor model, sheets, chat, dice; one source of truth for character identity; module distributed alongside the GM's world. | Locks the user-facing experience to Foundry users; CSS scoping work; ES module + ApplicationV2 lifecycle to learn. | **Chosen** |
| Keep standalone Vue 3 SPA | Full UX control; no Foundry dependency; works for non-Foundry GMs. | Forces us to reimplement character sheets, notes, scenes, dice — none of which are our differentiator; users keep duplicate character data in two tools. | Rejected — duplicating Foundry built-ins is the work we explicitly want to stop doing. |
| Run **both** Foundry module *and* standalone SPA in parallel | Lets non-Foundry users still get the graph; smaller jump from the current architecture. | Two UX surfaces drift apart; "which one is authoritative?" becomes a real question; CI, CSS, and i18n have to track both. | Rejected — the user explicitly wants RpgAssistant to *always* live inside Foundry; a parallel SPA contradicts that. |
| Build a standalone Electron/desktop app (Foundry-style) | Native packaging; offline use. | Multi-month build; no community; reimplements VTT primitives from scratch. | Rejected — cost is multiple orders of magnitude higher than the conversion and delivers no new value over Foundry. |
| Build for the [foundry-vue](https://gitlab.com/foundry-projects/foundry-vue) bridge package | Looks Vue-native at first glance. | Last release v0.1.0 Beta, verified only against Foundry 0.6.4 (current is 14.x); predates Vue 3; effectively abandoned. | Rejected — depending on it would block on a dead upstream. |

## Consequences

- **Positive:**
  - The module surface shrinks to its actual contribution: the
    relationship graph, path search, and the API client.
  - Character identity, sheets, notes, dice, and the user/session model
    become Foundry's problem, not ours.
  - The module is distributable through Foundry's package registry once
    the manifest URL / download URL are populated.
- **Trade-offs:**
  - Users who do not run Foundry lose access entirely. There is no
    longer a standalone deployment path — RpgAssistant exists only as a
    Foundry module.
  - First-render bundle is larger (Vue + `v-network-graph` + d3-force +
    Bulma + axios all bundled into `dist/main.js` because Foundry does
    not provide them). Current size: ~587 KB raw / ~162 KB gzipped.
  - CORS allow-list on the gateway means the gateway is no longer safe
    to expose to the public internet without tightening the origin.
  - `:8080` keeps existing as the API gateway (Foundry's browser calls
    `/v1/...` there), but no longer serves any UI; this can confuse
    operators expecting "the app" on `:8080`.
- **Follow-ups:**
  - Adopt Foundry's `Actor` as the source of character identity instead
    of the current backend `Character` entity. The graph stays in Neo4j
    keyed by Foundry actor id; this is a follow-up ADR because the
    contract change affects backend, schemas, and the API client.
  - Update `schemas/components/ComponentSchema.drawio` to show the
    Foundry container in front of the gateway and to remove the SPA
    `ui` service entirely.
  - Update existing sequence schemas under `schemas/sequences/` once the
    Foundry-side caller (the module entry / ApplicationV2 window)
    replaces the SPA in those flows.
  - Register a module id reservation on foundryvtt.com before the first
    public release; the id `rpg-assistant` is final once published.
  - Move all user-visible strings under `lang/en.json` (current
    components still hold English literals).
  - Replace Bulma with Foundry's own design system, or at least audit
    overlap, before public release — bundle size and the `.rpg-assistant`
    prefix workaround are both symptoms of carrying a parallel design
    system.

## References

- Sequence schemas affected: `../../../schemas/sequences/*.md`
  (all will be revisited once the Foundry-side caller replaces the SPA)
- Component schemas affected:
  `../../../schemas/components/ComponentSchema.drawio`
- External docs:
  - [Foundry VTT API (v14.360)](https://foundryvtt.com/api/)
  - [Foundry module development guide](https://foundryvtt.com/article/module-development/)
  - [felddy/foundryvtt-docker](https://github.com/felddy/foundryvtt-docker)
- Module-scoped rules: `.claude/rules/foundry.md`
- Scaffold skill: `.claude/skills/foundry-module/SKILL.md`
