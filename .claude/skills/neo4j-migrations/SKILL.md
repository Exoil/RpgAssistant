---
name: neo4j-migrations
description: Author and apply Neo4j schema/data migrations for LoreWeave. Migrations are ordered, idempotent `*.cypher` files in the repo-root `migrations/` directory, applied by `LoreWeave.Infrastructure.Migrations.Neo4jMigrationRunner` and used to set up the integration-test database. Use when adding/changing constraints, indexes, or seed data, or when changing how migrations run. The project targets Neo4j **Community** — only node uniqueness constraints are available; relationship constraints are Enterprise-only.
---

# Neo4j migrations — LoreWeave

Schema and data changes to the graph are made through **migration files**, never
by hand-editing the live database. This keeps every environment (local, CI,
integration tests) reproducible.

## When to use this skill

- Adding or changing a **constraint** or **index**.
- Adding **seed / reference data** that must exist in every environment.
- Adding a new node label or relationship type that needs schema.
- Changing **how** migrations are discovered or applied (the runner).

## Layout

| Path | Role |
|---|---|
| `migrations/` (repo root) | Source of truth — ordered `*.cypher` files. |
| `migrations/V001__init.cypher` | Initial schema (Character constraint + KNOWS index). |
| `migrations/README.md` | Short operator-facing summary. |
| `src/LoreWeave.Infrastructure/Migrations/Neo4jMigrationRunner.cs` | Applies the files. |
| `test/LoreWeave.Api.Integration.Test/Containers/Neo4jContainerRunner.cs` | Runs migrations to set up the test DB. |

## How the runner works

`Neo4jMigrationRunner(IDriver driver, string migrationsDirectory)`:

1. Lists `*.cypher` files in `migrationsDirectory`, ordered by **filename**
   (ordinal).
2. For each file, the **filename without extension** is the *version key*
   (e.g. `V001__init`).
3. Skips any version already recorded as a `(:__Migration {Version})` node, so
   re-running is safe / idempotent.
4. Splits the file into statements on `;`, strips `//` line comments, and runs
   **each statement in its own auto-commit transaction** — Neo4j forbids mixing
   schema commands (`CREATE CONSTRAINT/INDEX`) with data writes in one explicit
   transaction.
5. Records the version as applied.

The integration tests copy `migrations/*.cypher` next to the test assembly (see
the `<Content Include="..\..\migrations\*.cypher" .../>` item in the test
`.csproj`) and run the runner against `AppContext.BaseDirectory/migrations` in
`Neo4jContainerRunner.InitializeAsync`.

## Authoring a new migration

1. Create `migrations/V<NNN>__<snake_case_description>.cypher` with the **next**
   number (e.g. `V002__add_location_node.cypher`). Zero-pad to keep ordinal sort
   correct (`V010` sorts after `V009`).
2. **Never edit a migration that has already shipped.** Add a new file instead —
   an already-recorded version will be skipped, so edits won't re-run.
3. Make every statement **idempotent** with `IF NOT EXISTS` (constraints,
   indexes) or `MERGE` (data). The runner skips applied versions, but idempotent
   statements keep things safe if the `__Migration` node is ever lost.
4. Separate statements with `;`. Comment freely with `//` — comment lines are
   stripped before execution.
5. Avoid `;` inside string literals — the splitter is a simple `;` split.

### Statement templates

```cypher
// Node uniqueness constraint (Community-supported)
CREATE CONSTRAINT <label>_UQ_<prop> IF NOT EXISTS
FOR (n:<Label>) REQUIRE n.<Prop> IS UNIQUE;

// Node range index
CREATE INDEX <label>_IDX_<prop> IF NOT EXISTS
FOR (n:<Label>) ON (n.<Prop>);

// Relationship range index (keyed by type only; not label-scoped)
CREATE INDEX <type>_IDX_<prop> IF NOT EXISTS
FOR ()-[r:<TYPE>]-() ON (r.<Prop>);

// Idempotent seed data
MERGE (n:<Label> {Id: '<db-id>'})
SET n.Name = '<name>', n.Version = 1;
```

Naming convention (matches existing schema): `<label>_UQ_<prop>` for unique
constraints, `<label/type>_IDX_<prop>` for indexes.

## Community vs Enterprise — IMPORTANT

The project runs Neo4j **Community**. Available constraints:

| Constraint / index | Community | Enterprise |
|---|---|---|
| Node uniqueness | ✅ | ✅ |
| Node / relationship range index | ✅ | ✅ |
| Node key, node/relationship existence | ❌ | ✅ |
| **Relationship uniqueness / key** | ❌ | ✅ |

Consequences:

- **Character.Id** uniqueness is a real DB constraint.
- The **KNOWS** "no doubled `(c1)-[:KNOWS]->(c2)`" rule **cannot** be a DB
  constraint on Community. It is enforced in application code via
  `MERGE (from)-[:KNOWS]->(to)` in
  `CharacterRepository.CreateKnowRelationAsync` (idempotent on the
  `(from, type, to)` triple). We add a relationship range index on `KNOWS.Id`
  instead. If the project moves to Enterprise, replace that index with a
  `REQUIRE r.Id IS UNIQUE` relationship constraint.

## KNOWS relationship facts

- Directed: `(from:Character)-[:KNOWS]->(to:Character)` means `from` knows `to`.
- The reverse is a **separate** relationship; both directions can coexist.
- KNOWS only ever connects **Character** nodes.

## Checklist before committing a migration

- [ ] Filename `V<NNN>__<desc>.cypher`, number is the next free, zero-padded.
- [ ] No edits to an already-shipped migration.
- [ ] Every statement idempotent (`IF NOT EXISTS` / `MERGE`).
- [ ] No relationship constraints (Community) — index + app-level `MERGE` instead.
- [ ] Integration tests pass (`dotnet test --filter Category=Integration`).