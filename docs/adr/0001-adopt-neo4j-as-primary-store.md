# ADR-0001: Adopt Neo4j as the primary data store

- **Status:** Accepted
- **Date:** 2026-05-24
- **Deciders:** Jakub Tederko
- **Affected component(s):** backend, infrastructure

## Context

The core domain of RpgAssistant is *characters and the relationships between
them*. The main read workload is traversal-style queries — "who does this
character know", "find a path between two characters", "page through
characters that share a relation type" — rather than tabular aggregation. The
chosen store must execute these traversals on the database engine itself
(not by joining application-side), and must support ACID transactions so we
can later layer a transactional outbox on top of domain writes.

## Decision

| Aspect | Chosen option | Why this one |
|---|---|---|
| Primary data store | Neo4j 5 | Native graph engine executes relationship traversals server-side; ACID transactions leave room for a future transactional outbox. |

## Options considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **Neo4j 5 — chosen** | Native graph traversal in the engine; Cypher expresses our queries directly; ACID transactions; mature .NET driver. | New query language for the team; fewer hosted-managed options than mainstream SQL. | **Chosen** |
| MSSQL | Familiar; strong tooling; ACID. | Relational engine — relationship traversal requires recursive CTEs or self-joins that do not scale with the depth our domain needs. | Rejected — not suited for engine-side relationship queries. |
| PostgreSQL | Open source; ACID; rich ecosystem. | Same relational-engine limitation as MSSQL for our traversal workload; graph extensions (e.g. AGE) are less mature than a native graph DB. | Rejected — relational engine, no native graph traversal. |

## Consequences

- **Positive:** relationship-centric queries are expressed in Cypher and
  executed by the database; the schema-free nature of nodes/edges fits a
  domain where new relation types are expected to appear.
- **Trade-offs:** team must learn Cypher and Neo4j operational concerns
  (memory config, store files, backups); fewer turnkey managed offerings
  than mainstream SQL.
- **Follow-ups:**
  - Keep `Infrastructure` project as the only layer that talks to the
    Neo4j driver; `Domain` and `Application` stay driver-agnostic.
  - When the transactional outbox is added, reuse Neo4j transactions to
    write the domain change and the outbox record atomically (separate
    ADR at that time).
  - Document the local Neo4j container (bolt port `17687`) in the backend
    `CLAUDE.md` if it changes.

## References

- Sequence schemas affected: `../../../schemas/sequences/create-character.md`,
  `../../../schemas/sequences/update-character.md`,
  `../../../schemas/sequences/delete-character.md`,
  `../../../schemas/sequences/get-character-by-id.md`,
  `../../../schemas/sequences/get-character-page.md`,
  `../../../schemas/sequences/create-know-relation.md`,
  `../../../schemas/sequences/delete-know-relation.md`
- Component schemas affected: `../../../schemas/components/ComponentSchema.drawio`