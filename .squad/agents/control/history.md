# CONTROL — Session History

## Session 1 — 2026-03-22 — Type surface established

**What was done:**
- Defined `AgentManifestData` with all-readonly fields
- Established `noUncheckedIndexedAccess` in `tsconfig.json`
- Set TypeSpec peer dep minor-lock policy (ADR-003)
- Verified `generated/agent-manifest.schema.json` matches type surface

**Key decisions made:**
- ADR-003: Minor-locked peer dep `>=0.60.0 <0.62.0`
- All `AgentManifestData` fields readonly — no mutation after construction

**What's next:**
- Set up compatibility matrix tests for TypeSpec 0.60 and 0.61
- Automate schema generation from types (vs. maintaining manually)
- Track TypeSpec 0.62 release for next range bump
