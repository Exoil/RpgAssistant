## ADR-0002: Restore standalone SPA alongside the Foundry VTT module

- **Status:** Accepted
- **Date:** 2026-05-24
- **Deciders:** Jakub Tederko
- **Affected component(s):** frontend, gateway, infrastructure
- **Supersedes:** [ADR-0001](./0001-convert-spa-to-foundry-vtt-module.md)

## Context

[ADR-0001](./0001-convert-spa-to-foundry-vtt-module.md) removed the
standalone Vue SPA so the only deployed UI lived inside Foundry. In
practice that constrained adoption to Foundry users and made the project
unusable for tabletop GMs (and contributors evaluating the project) who do
not run Foundry. The relationship-graph differentiator is valuable on its
own — even without Foundry's actor/sheet/chat stack — so the deployment
model has to support **both** hosting modes, with one shared frontend
codebase. The conversion work from ADR-0001 (Vite library build, CSS
prefix-scoping, `ApplicationV2` window, world-setting API URL) all
remains correct **for the Foundry path**; we only need to bring the
standalone path back online without forking the source.

## Decision

| Aspect | Chosen option | Why this one |
|---|---|---|
| Host-mode selection | Compile-time flag `__IS_FOUNDRY__`, injected via Vite `define`, surfaced as `isFoundry` / `isStandalone` from `src/env.ts`. | Replaces the fragile runtime DOM probe in the router; lets Vite tree-shake the unused branch from each bundle so the standalone build does not ship Foundry-only code and vice-versa. |
| Build outputs | Foundry build → `frontend/dist/` (bind-mounted into the Foundry container, unchanged from ADR-0001). Standalone build → `frontend/dist-standalone/`. | A shared `dist/` made the standalone build silently overwrite the running Foundry module on every `vite build`. Separate `outDir`s let both bundles coexist. |
| Standalone hosting | New `ui` nginx container (`ui/nginx.conf.template`) serving `frontend/dist-standalone/` on `:8080`, proxying `/v1/` to the API same-origin. SPA fallback to `index.html` for vue-router HTML5 history. | Keeps the standalone UX same-origin so no CORS allow-list is needed; the gateway's foundry-specific CORS headers stay scoped to the Foundry path. |
| Deployment switch | Single `docker-compose.yaml` using Compose **profiles** (`foundry`, `standalone`). The `gateway` + `foundry` services run under profile `foundry`; the `ui` service runs under profile `standalone`. `api` and `neo4j` are profile-less (always-on). | Profiles is the Compose-native mechanism for mutually-exclusive deployment variants; avoids `-f overlay.yaml` juggling and keeps a single source of truth. |
| Router history | `isFoundry ? createMemoryHistory() : createWebHistory(BASE_URL)`. | Foundry windows have no URL bar so memory history is correct there; the SPA at `:8080/` needs HTML5 history for shareable routes. |

## Options considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Compile-time flag + Compose profiles (chosen)** | One codebase; dead-branch elimination per build; idiomatic Compose. | Two bundles to maintain; users must remember `--profile`. | **Chosen** |
| Keep Foundry-only (status quo from ADR-0001) | No work; smaller surface. | Locks out every non-Foundry user; project's graph differentiator is uselessly trapped behind a heavy VTT dependency. | Rejected — directly contradicts the reason this ADR exists. |
| Runtime detection (probe for `Hooks` / `#app`) | No build-time wiring. | Cannot drive tree-shaking; fragile in tests and SSR; the ADR-0001 router already showed this approach is brittle (`!document.getElementById('app')` is a coincidence, not a contract). | Rejected — same fragility we are trying to leave behind. |
| Two Compose files via `-f overlay.yaml` | Familiar pattern. | Three files (`docker-compose.yaml` + foundry overlay + standalone overlay) for what profiles do in one; easy to forget one in the `-f` chain. | Rejected — Compose profiles solve this exact problem in a single file. |
| Two separate frontend repos | Total isolation between modes. | Forks the codebase; relationship-graph fixes have to land twice; the share-everything point of the conversion is lost. | Rejected — duplicates the work this ADR is trying to consolidate. |

## Consequences

- **Positive:**
  - Non-Foundry users can run RpgAssistant again. `docker compose --profile standalone up` brings up `api` + `neo4j` + `ui` and serves the SPA on `:8080`.
  - Foundry users are unaffected: `docker compose --profile foundry up` matches the ADR-0001 topology bit-for-bit (gateway with CORS + Foundry container, dist mounted read-only).
  - Each bundle is smaller than a single dual-mode bundle would be — Vite eliminates the dead branch when `__IS_FOUNDRY__` is known at build time. (Standalone ~351 kB raw / ~117 kB gzipped; Foundry ~519 kB raw / ~142 kB gzipped — Foundry is larger because it bundles Bulma+v-network-graph that the SPA also has, plus the CSS-prefix overhead.)
  - The runtime DOM probe in the router is gone — replaced by a typed compile-time constant.
- **Trade-offs:**
  - Two build commands and two `outDir`s. `bun run build:foundry-only` → `dist/`; `bun run build-only` → `dist-standalone/`. Forgetting which is which is easy; the comment in `vite.config.ts` calls this out explicitly to keep contributors from re-introducing the overwrite footgun.
  - Two nginx templates to maintain (`gateway/nginx.conf.template` for the Foundry-mode CORS gateway; `ui/nginx.conf.template` for the standalone SPA host + same-origin API proxy). When the API surface changes (new endpoint, new header) both templates must be revisited.
  - The standalone bundle still imports from `@/foundry/injection-keys` (the API base URL key). That import is intentional and resolves to a Vue `InjectionKey<string>` constant — no Foundry runtime dependency travels with it. Keeping it shared avoids inventing a second key purely for the standalone path.
- **Follow-ups:**
  - Update `schemas/components/ComponentSchema.drawio` to show the two deployment topologies (foundry profile vs standalone profile) as a single annotated diagram, rather than the single Foundry topology ADR-0001 left it at.
  - Re-add a CI lane that builds **both** targets — without it, drift between the two modes is silent until a user reports a broken bundle.
  - Once the user-visible string surface stabilises, decide whether the standalone build also pulls from `frontend/lang/en.json` (currently Foundry-only via `game.i18n.localize`) or keeps its own hard-coded strings. Out of scope for this ADR.

## References

- Supersedes: [ADR-0001](./0001-convert-spa-to-foundry-vtt-module.md)
- Sequence schemas affected: `../../../schemas/sequences/*.md` (unchanged in behaviour; the standalone path now reaches the same endpoints via same-origin instead of cross-origin)
- Component schemas affected: `../../../schemas/components/ComponentSchema.drawio` (needs the second deployment topology added — see Follow-ups)
- External docs: [Compose profiles](https://docs.docker.com/compose/profiles/), [Vite `define`](https://vite.dev/config/shared-options.html#define)
