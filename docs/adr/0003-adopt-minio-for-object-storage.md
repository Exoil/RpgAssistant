# ADR-0003: Adopt MinIO for object storage

- **Status:** Pending
- **Date:** 2026-05-24
- **Deciders:** Jakub Tederko
- **Affected component(s):** backend, infrastructure

## Context

RpgAssistant will need to store binary documents alongside the graph data —
the first concrete use case is character-sheet PDFs (potentially
interactive). Neo4j is the wrong place for blobs, so an object store is
needed. The project is currently a hobby project with a fully self-hosted
target deployment (everything already runs via `docker-compose`), so the
storage choice should not introduce a cloud-vendor dependency or an ongoing
bill.

## Decision

| Aspect | Chosen option | Why this one |
|---|---|---|
| Object storage | MinIO (self-hosted, S3-compatible) | Runs as another container in the existing `docker-compose`, zero recurring cost, and the S3-compatible API keeps the door open to swap in a cloud provider later without code changes. |

## Options considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **MinIO — chosen** | Self-hosted; fits existing `docker-compose` stack; S3-compatible API (no vendor lock-in at the code level); no recurring cost. | One more container to operate; backups and disk capacity are our problem. | **Chosen** |
| Cloudflare R2 | 10 GB free forever; zero egress fees; S3-compatible. | Adds a cloud-vendor dependency that contradicts the self-hosted target; account + credentials to manage. | Rejected — conflicts with self-hosted goal. |
| Backblaze B2 | 10 GB free forever; S3-compatible. | Same vendor-dependency objection as R2; egress is billed past the free tier. | Rejected — conflicts with self-hosted goal. |
| Azure Blob Storage | Mature; integrates well with .NET. | Free tier is only 5 GB for 12 months, then billed — wrong cost profile for a hobby project. | Rejected — no permanent free tier. |

## Consequences

- **Positive:** the whole stack still comes up with a single
  `docker-compose up`; no external account or billing surface; if the
  project ever leaves the hobby phase, switching to R2/B2/S3 is a config
  change (endpoint + keys), not a code change.
- **Trade-offs:** durability, backups, and disk capacity become our
  responsibility; a single-node MinIO is not highly available.
- **Follow-ups:**
  - Add a `minio` service to `docker-compose.yml` and wire the credentials
    through `.env` / `.env.example`.
  - In `Infrastructure`, add an S3 client (AWS SDK for .NET) configured
    against the MinIO endpoint — write all code against the S3 API, not
    a MinIO-specific SDK.
  - Update `../../../schemas/components/ComponentSchema.drawio` to show
    the MinIO container alongside Neo4j.
  - Add a sequence schema for the first blob-using flow (e.g.
    `upload-character-sheet.md`) when that endpoint is built.

## References

- Component schemas affected: `../../../schemas/components/ComponentSchema.drawio`
- Related: [ADR-0001](./0001-adopt-neo4j-as-primary-store.md) — Neo4j
  remains the store for graph data; blobs live in MinIO.
