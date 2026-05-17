# ADR-0000: <short, imperative title>

- **Status:** Proposed <!-- Proposed | Accepted | Deprecated | Superseded by ADR-XXXX -->
- **Date:** YYYY-MM-DD
- **Deciders:** <names or roles>
- **Affected component(s):** <backend | frontend | gateway | infrastructure | all>

## Context

One short paragraph: what situation forces a decision now? Include the
constraint, the trigger (a new feature, a scaling limit, a compliance
requirement, etc.), and what *must* remain true after the decision.

## Decision

| Aspect | Chosen option | Why this one |
|---|---|---|
| <area or concern> | <technology / approach> | <one-sentence rationale> |

Add one row per aspect when the decision spans multiple concerns (e.g.
"primary store + cache + ORM"). For a single-aspect decision, one row is
enough.

## Options considered

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **<Option A — chosen>** | … | … | **Chosen** |
| <Option B> | … | … | Rejected — <one-line reason> |
| <Option C> | … | … | Rejected — <one-line reason> |

## Consequences

- **Positive:** what gets better.
- **Trade-offs:** what we accept getting worse.
- **Follow-ups:** concrete tasks that this decision implies (migrations,
  documentation, schema updates in `../../../schemas/`, etc.).

## References

- Sequence schemas affected: `../../../schemas/sequences/*.md`
- Component schemas affected: `../../../schemas/components/*.drawio`
- External docs, RFCs, benchmarks, prior ADRs (`ADR-NNNN`).
