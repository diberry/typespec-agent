# RETRO — Session History

## Session 1 — 2026-03-22 — Security baseline established

**What was done:**
- Implemented PII diagnostic patterns: email, E.164 phone, `Bearer` token, Azure SAS URL
- Wired `checkForPii` into `@instruction`, `@knowledge`, `@role` decorators
- Set A2A `publishInstructions` to `false` by default (opt-in for instruction leakage)
- Implemented sensitivity gating: `restricted` → no output, `internal` → gated, `public` → safe
- Added path-traversal diagnostic in emitter for malformed agent IDs

**Key decisions made:**
- ADR-004: `program.host.writeFile()` only — no raw `fs`
- `a2a-publish-instructions: false` as the safe default

**What's next:**
- Consider adding `@sensitivity` as a first-class decorator (currently only applies to A2A output)
- Document PII pattern customization for enterprise environments
- Review whether SAS URL pattern needs to be more specific (avoid false positives)
