---
name: adr
description: Scaffold and maintain Architecture Decision Records (ADRs) for the RpgAssistant project under `docs/adr/`. Use when the user is making a non-trivial architectural choice (new dependency, cross-cutting pattern change, reversal of an earlier ADR). Each ADR follows the project template — a short Context paragraph, a Decision table (chosen technology + why), an Options-considered table (alternatives + verdict), and Consequences. Invoke as `/adr <kebab-title>` to create a new numbered record.
argument-hint: <kebab-title>
---

# ADR — RpgAssistant

Scaffold a new Architecture Decision Record for the RpgAssistant project.
ADRs live at `docs/adr/`. The template is at `docs/adr/0000-template.md` and
the directory conventions are documented in `docs/adr/README.md`.

## Existing ADRs

!`ls docs/adr/ 2>/dev/null | sort`

## Inputs

- `$ARGUMENTS` is the new ADR's **kebab-case title slug** (without the
  number prefix). If the user did not pass a slug, ask for one before doing
  anything else.

## Steps

1. **Pick the next number.** Look at the file listing above. Pick the
   smallest 4-digit number that is **not already used**, skipping
   `0000-template.md`. The first real ADR is `0001-…`.
2. **Create the file** at `docs/adr/<NNNN>-$ARGUMENTS.md`. Start from the
   contents of `docs/adr/0000-template.md` and replace:
   - `ADR-0000` → `ADR-<NNNN>`
   - `<short, imperative title>` → a human-readable title derived from the
     slug (e.g. `0007-adopt-signalr-for-push` → "Adopt SignalR for server
     push").
   - `YYYY-MM-DD` → today's date in ISO format.
   - Leave the rest of the placeholders for the user to fill in — do **not**
     invent options, pros/cons, or rationales the user did not state.
3. **Confirm the framing with the user** before filling in the body:
   - What is the decision in one sentence?
   - Which options are on the table?
   - Which one is being chosen, and what is the single biggest trade-off?
4. **Fill in the body** based on the answers, keeping these rules:
   - The **Options considered** table is mandatory and must include at least
     two rejected options. An ADR with no rejected options has no value.
   - Each rejected option's `Verdict` cell ends with a one-line reason
     (`Rejected — <reason>`), not "n/a" or a dash.
   - The **Decision** table has one row per affected concern (backend
     contract, frontend contract, schema, deploy topology, …).
   - The **Consequences → Follow-ups** bullet must list concrete tasks —
     schema updates, sequence-diagram updates, contract regenerations,
     migrations — not aspirational goals.
5. **Cross-link schemas.** If the decision changes a flow or topology, add
   the affected `schemas/sequences/*.md` and `schemas/components/*.drawio`
   files to the **References** section, and remind the user (do not perform
   it automatically) that those schemas should be updated in the same PR.
6. **Status starts as `Proposed`.** Only the user flips it to `Accepted`
   once the PR is merged.

## Rules

- Do **not** modify any existing ADR's body. To replace an earlier decision,
  create a new ADR and set `Status: Superseded by ADR-<new-number>` on the
  old one (this is the *only* allowed edit to existing ADRs).
- Do **not** invent rationales. If the user has not given you a reason for
  rejecting an option, ask — do not fabricate one.
- Do **not** use this skill for trivial code-level decisions (variable
  naming, file layout, single-method refactors). Those belong in commit
  messages.
- Stay terse — an ADR longer than two screens is almost always over-detailed.