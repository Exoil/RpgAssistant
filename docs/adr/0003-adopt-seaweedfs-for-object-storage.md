# ADR-0003: Adopt SeaweedFS for object storage

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
storage choice must be (a) free, (b) runnable as another container, and
(c) **actively maintained** — a constraint that ruled out the otherwise
natural pick of MinIO after its repository was archived on 2026-04-25.

## Decision

| Aspect | Chosen option | Why this one |
|---|---|---|
| Object storage | SeaweedFS (self-hosted, S3-compatible, Apache 2.0) | Runs as another container in the existing `docker-compose`, no recurring cost, S3-compatible API (no code-level vendor lock-in), and unlike MinIO it is actively maintained under a permissive license. |

## Options considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **SeaweedFS — chosen** | Apache 2.0 (most permissive of the realistic options); actively maintained; S3-compatible; container-friendly; designed to handle large numbers of small files. | More moving parts than a single-binary store (master / volume / filer); smaller community than MinIO had at its peak. | **Chosen** |
| MinIO | Battle-tested; single-binary; widely known S3-compatible drop-in. | GitHub repository archived 2026-04-25; no further features, compatibility, or guaranteed security patches; pre-compiled community binaries no longer published. | Rejected — upstream no longer maintained. |
| Garage | Designed for self-hosting on modest hardware; active project; S3-compatible. | AGPL-3.0 — less permissive than Apache 2.0; smaller ecosystem than SeaweedFS. | Rejected — Apache 2.0 preferred to keep future options open. |
| Cloudflare R2 / Backblaze B2 / Azure Blob | Managed; generous free tiers (R2/B2); zero-ops. | Introduce a cloud-vendor dependency that contradicts the fully self-hosted target; Azure free tier is time-limited (12 months). | Rejected — conflicts with self-hosted goal. |

## Consequences

- **Positive:** the whole stack still comes up with a single
  `docker-compose up`; no external account or billing surface; Apache 2.0
  upstream keeps relicensing/maintenance risk low; if the project ever
  leaves the hobby phase, switching to R2/B2/S3 is a config change
  (endpoint + keys), not a code change.
- **Trade-offs:** durability, backups, and disk capacity are our
  responsibility; single-node SeaweedFS is not highly available; the
  master/volume/filer split adds a small amount of operational complexity
  compared with a single-binary store.
- **Follow-ups:**
  - Add a SeaweedFS service to `docker-compose.yml` (with the S3 gateway
    enabled) and wire credentials through `.env` / `.env.example`.
  - In `Infrastructure`, add an S3 client (AWS SDK for .NET) configured
    against the SeaweedFS S3 endpoint — write all code against the S3
    API, not a SeaweedFS-specific SDK, to preserve the "swap for a cloud
    provider later" property.
  - Update `../../../schemas/components/ComponentSchema.drawio` to show
    the SeaweedFS container alongside Neo4j.
  - Add a sequence schema for the first blob-using flow (e.g.
    `upload-character-sheet.md`) when that endpoint is built.

## References

- Component schemas affected: `../../../schemas/components/ComponentSchema.drawio`
- Related: [ADR-0001](./0001-adopt-neo4j-as-primary-store.md) — Neo4j
  remains the store for graph data; blobs live in SeaweedFS.
- MinIO repository archive notice: https://github.com/minio/minio
