# Architecture Decision Records

This directory holds the project's **Architecture Decision Records (ADRs)** —
short documents that capture *why* an architectural choice was made, what
alternatives were rejected, and what trade-offs were accepted.

## Conventions

- **Filename:** `NNNN-kebab-title.md`, e.g. `0007-adopt-signalr-for-push.md`.
  Pick the next free 4-digit number (zero-padded). Numbers are never reused;
  superseded ADRs stay in place with `Status: Superseded by ADR-XXXX`.
- **Template:** copy [`0000-template.md`](./0000-template.md) and fill the
  placeholders. The table-style "Options considered" section is mandatory —
  the value of an ADR is the rejected options, not the chosen one.
- **Status:** start as `Proposed`; flip to `Accepted` once merged. Mark a
  replaced ADR as `Superseded by ADR-XXXX` and link from the new one.
- **Scope:** one decision per ADR. If the change spans backend + frontend
  contracts, prefer a single ADR with both rows in the "Decision" table over
  splitting into two.

## When to write one

- A new third-party dependency that shapes the architecture (database,
  message broker, framework).
- A change to a cross-cutting pattern (CQRS handler shape, error mapping,
  optimistic concurrency, ID strategy).
- A reversal of an earlier ADR.

Trivial day-to-day code decisions go in commit messages, not ADRs.

## Using the skill

Run `/adr <kebab-title>` to scaffold a new record from the template with the
next free number. The skill also enforces the conventions above.
