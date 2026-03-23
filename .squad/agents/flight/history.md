# Flight — Session History

## Session 1 — 2026-03-22 — Architecture established

**What was done:**
- Defined the two-phase architecture: Phase 1 = open standard core, Phase 2 = framework emitters
- Established the 12-decorator surface as the complete Phase 1 scope
- Decided layer boundaries: casting, `@model`, and framework-specific casting stay out of core
- Reviewed and approved EECOM's scaffold

**Key decisions made:**
- ADR-001: Casting in Squad layer only
- ADR-002: `@model` excluded from base spec
- ADR-005: Phase 1 vs Phase 2 split

**What's next:**
- Establish PR review gates for the open standard
- Define acceptance criteria for new decorator proposals (requires RFC + ADR)
- Consider governance model as community emitters emerge
