# Neo4j migrations

Ordered, idempotent Cypher migration scripts for the LoreWeave graph.

## How they run

`LoreWeave.Infrastructure.Migrations.Neo4jMigrationRunner` applies every
`*.cypher` file in this directory in **filename order**, skipping files that
have already been applied. Applied versions are tracked as `(:__Migration
{Version})` nodes in the database, so re-running is safe.

Integration tests run these migrations to set up the schema
(`Neo4jContainerRunner.InitializeAsync`).

## File naming

```
V<NNN>__<snake_case_description>.cypher
```

e.g. `V003__add_location_node.cypher`. The `V001`, `V002`, … prefix defines
apply order and is the version key recorded in `__Migration`.

## Authoring rules

- One concern per file; never edit a migration that has already shipped — add a
  new one.
- Statements are separated by `;`. Make every statement idempotent with
  `IF NOT EXISTS`.
- `//` line comments are stripped before execution.
- We target Neo4j **Community**: only **node** uniqueness constraints are
  available. Relationship uniqueness/key/existence constraints are
  Enterprise-only — see `V001__init.cypher` for how the KNOWS uniqueness rule
  is handled.

See `.claude/skills/neo4j-migrations/SKILL.md` for the full guide.