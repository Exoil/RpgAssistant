---
paths:
  - "docs/adr/**"
---

# ADR rules

These rules apply when editing files under `docs/adr/`. Full background and
the canonical template live in `docs/adr/README.md` and
`docs/adr/0000-template.md`. The `/adr` skill scaffolds new records from that
template.

## Hard rules

- **Never edit an existing ADR's body.** ADRs are an append-only history.
  The *only* allowed edit to an existing ADR is flipping its `Status` to
  `Superseded by ADR-<new-number>` and linking the replacement. To change a
  decision, write a new ADR.
- **Numbering is never reused.** Pick the next free 4-digit number; skip
  `0000-template.md`. Superseded ADRs keep their original number and file.
- **The Options-considered table is mandatory** and must contain at least
  two rejected options with a one-line reason each. An ADR without rejected
  options has no value — it is just a commit message in disguise.
- **Status starts at `Proposed`.** Flip to `Accepted` only when the PR
  merges; flip to `Superseded by ADR-XXXX` only when a replacement exists.

## Style

- Filename: `NNNN-kebab-title.md`.
- Title in the H1: `ADR-NNNN: <Imperative title>`.
- Date in ISO format (`YYYY-MM-DD`).
- Keep each section short — an ADR longer than two screens is over-detailed.
- The **Decision** table has one row per affected concern; use it instead of
  prose when the choice spans backend + frontend + schema.
- The **Consequences → Follow-ups** bullet lists concrete tasks (schema
  updates, contract regenerations, migrations), not aspirations.

## Cross-references

When an ADR changes a flow or topology, link the affected schemas in the
References section:

- Sequence schemas: `../../schemas/sequences/*.md`
- Component schemas: `../../schemas/components/*.drawio`

Updating those schemas is the author's responsibility and must happen in the
same PR as the ADR is accepted.