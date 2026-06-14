# CLAUDE.md — RpgAssistant project overview

This is the top-level guide for the **RpgAssistant** monorepo. Component-specific
rules live in nested `CLAUDE.md` files — see the layout below.

## Context

**RpgAssistant** helps tabletop RPG game-masters track characters and the
relationships between them. This repository contains the backend API and the
docker-compose stack. The Foundry VTT UI lives in a **separate repository**:
[Exoil/Loreweave-plugin](https://github.com/Exoil/Loreweave-plugin) — folder
`LoreweaveUi/`, sibling to `RpgAssistantProject/` on local disk.

A centralized `schemas/` directory at this repo's root is the design source of
truth for both projects.

## Repository layout

The repo root is `RpgAssistantProject/`. `schemas/` sits at the root, **above**
`backend/`, so both this repo and the sibling Loreweave UI repo reference the
same design source of truth.

```
Projects/
├── RpgAssistantProject/         <- this repo (backend + stack)
│   ├── schemas/                 <- design schemas (see "Schemas" below)
│   │   ├── components/          <- *.drawio
│   │   └── sequences/           <- *.md (mermaid)
│   └── RpgAssistant/
│       ├── CLAUDE.md            <- this file: project overview + schema pointers
│       ├── docs/
│       │   └── adr/             <- Architecture Decision Records (see "ADRs" below)
│       ├── backend/             <- ASP.NET Core 10 Web API (C#, Neo4j)
│       │   ├── CLAUDE.md        <- general backend coding rules
│       │   ├── src/RpgAssistant.Application/CLAUDE.md
│       │   │                    <- Application-layer CQRS patterns
│       │   └── test/CLAUDE.md   <- backend test rules
│       └── gateway/             <- Nginx reverse proxy in front of API
└── LoreweaveUi/                 <- separate repo: Foundry VTT module (Vue 3 + Vite)
```

When in doubt, follow the rules in the **nearest** `CLAUDE.md`. The further it
sits from the file you are editing, the lower its priority.

## Components

| Component | Path | Stack |
|-----------|------|-------|
| API | `backend/src/RpgAssistant.Api` | ASP.NET Core 10 minimal API |
| Application | `backend/src/RpgAssistant.Application` | CQRS via MessagePipe |
| Domain | `backend/src/RpgAssistant.Domain` | Entities, repository contracts |
| Infrastructure | `backend/src/RpgAssistant.Infrastructure` | Neo4j driver + transactions |
| Foundry module (separate repo) | `../../LoreweaveUi/` | Vue 3, vue-router, axios, v-network-graph |
| Gateway | `gateway` | Nginx reverse proxy |
| Database | (container) | Neo4j 5 (bolt port `17687` on local compose) |

## Schemas

Schemas are the design source of truth. Read the relevant schema **before**
implementing or refactoring a flow, and update the schema whenever the flow
changes.

**Format rules**
- All schemas are **drawio** (`.drawio`) **except sequence schemas**.
- **Sequence schemas are mermaid** in markdown files (`.md`).

**Locations** — relative to this file (`RpgAssistant/CLAUDE.md`), schemas live
at `../schemas/`.

| Kind | Directory (from this file) | Format |
|------|----------------------------|--------|
| Component / architecture | `../schemas/components/` | `*.drawio` |
| Sequence diagrams | `../schemas/sequences/` | `*.md` (mermaid) |

Current sequence diagrams (one per backend operation):

- `../schemas/sequences/create-character.md`
- `../schemas/sequences/update-character.md`
- `../schemas/sequences/delete-character.md`
- `../schemas/sequences/get-character-by-id.md`
- `../schemas/sequences/get-character-page.md`
- `../schemas/sequences/create-know-relation.md`
- `../schemas/sequences/delete-know-relation.md`

Current component diagrams:

- `../schemas/components/ComponentSchema.drawio` — overall service topology

When you add a new endpoint or flow, add a matching schema in the same style.

## Architecture Decision Records (ADRs)

Non-trivial architectural choices (new third-party dependencies,
cross-cutting pattern changes, reversals of earlier decisions) are recorded
under `docs/adr/`. Each ADR captures the **context**, the **chosen option**,
the **alternatives rejected**, and the **trade-offs accepted**.

- Template: `docs/adr/0000-template.md`.
- Conventions: `docs/adr/README.md`.
- Scaffold a new ADR with the `/adr <kebab-title>` skill — it picks the next
  free number and copies the template.

Existing ADRs are append-only: to change a decision, write a new ADR that
supersedes the old one rather than editing the body of the old one.

## Local development

```bash
# Build the Loreweave UI module first (in the sibling repo)
cd ../../LoreweaveUi && bun install && bun run build:foundry && cd -

# Full stack (API + Neo4j + gateway + Foundry serving the built module)
docker compose --profile foundry up
```

Per-component dev commands live in each component's `CLAUDE.md`.

## Configuration

Secrets are read from `.env` (not committed). The included `.env.example` lists
the required variables (e.g. `NEO4J_PASSWORD`). The backend uses Steeltoe
placeholder resolution — values like `${Neo4j:ConnectionString}` in
`appsettings.json` are substituted from environment variables at runtime.

## Working rules (apply everywhere)

- Before editing or creating files, plan the steps and share the plan first.
- Keep answers short and understandable.
- Always give generated code for review and help the user understand it.
- If you don't know the answer, say **"Don't know."**
