// V001 — Initial schema
//
// ── Character node ──────────────────────────────────────────────────────────
// Character.Id is the internal GUID stored as a database string (see
// Domain.Extensions.ToDatabaseId). It must be globally unique. Community edition
// supports node uniqueness constraints, so this is enforced at the DB level.

CREATE CONSTRAINT character_UQ_characterid IF NOT EXISTS
FOR (ch:Character) REQUIRE ch.Id IS UNIQUE;

// ── KNOWS relationship ──────────────────────────────────────────────────────
// KNOWS only ever connects Character nodes and is DIRECTED:
//   (from:Character)-[:KNOWS]->(to:Character)   means `from` knows `to`.
// The reverse is a SEPARATE relationship — (c1)-[:KNOWS]->(c2) and
// (c2)-[:KNOWS]->(c1) can both exist independently.
//
// Uniqueness rule: a character may have at MOST ONE KNOWS edge to a specific
// other character (no doubled (c1)-[:KNOWS]->(c2)).
//
// IMPORTANT (Community edition): Neo4j Community cannot create relationship
// uniqueness / key / existence constraints — those are Enterprise-only. The
// "no doubled KNOWS" rule is enforced in application code via
//   MERGE (from)-[:KNOWS]->(to)
// in CharacterRepository.CreateKnowRelationAsync, which is idempotent on the
// (from, type, to) triple. On Enterprise, replace the index below with:
//   CREATE CONSTRAINT knows_UQ_id IF NOT EXISTS
//   FOR ()-[r:KNOWS]-() REQUIRE r.Id IS UNIQUE;
//
// For now we add a relationship range index on KNOWS.Id (supported in
// Community). Relationship indexes are keyed by relationship type only and
// cannot be scoped to endpoint node labels — fine here, since KNOWS is used
// exclusively between Character nodes.

CREATE INDEX knows_IDX_id IF NOT EXISTS
FOR ()-[r:KNOWS]-() ON (r.Id);
