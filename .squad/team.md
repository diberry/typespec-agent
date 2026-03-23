# typespec-agent — Squad Team

> **@agentspec/core** — The OpenAPI equivalent for agent definitions.
> *"Define once. Compile everywhere."*

## Project Context

- **Project:** @agentspec/core — Framework-agnostic TypeSpec agent specification
- **Owner:** Dina
- **Stack:** TypeScript (strict, ESM-only), TypeSpec v0.61+, Vitest
- **Repo:** https://github.com/diberry/typespec-agent
- **Vision:** The OpenAPI equivalent for agent definitions — a portable typed spec that compiles to any framework
- **Origin:** Extracted from bradygaster/squad [Issue #511](https://github.com/bradygaster/squad/issues/511) / PR #512

## Coordinator

| Name | Role | Notes |
|------|------|-------|
| Squad | Coordinator | Routes work, enforces handoffs and reviewer gates. Does not generate domain artifacts. |

## Members

| Name | Role | Scope | Emoji | Charter | Status |
|------|------|-------|-------|---------|--------|
| Flight | Lead | Architecture, decisions, code review | 🏗️ | `.squad/agents/flight/charter.md` | ✅ Active |
| EECOM | Core Dev | TypeSpec library, decorators, emitter | 🔧 | `.squad/agents/eecom/charter.md` | ✅ Active |
| CONTROL | Types Expert | Type safety, schema validation, compatibility | 🔧 | `.squad/agents/control/charter.md` | ✅ Active |
| RETRO | Security | PII diagnostics, sensitivity, trust boundaries | 🔒 | `.squad/agents/retro/charter.md` | ✅ Active |
| FIDO | Quality | Tests, CI, edge cases | 🧪 | `.squad/agents/fido/charter.md` | ✅ Active |
| Scribe | (silent) | Memory, decisions, session logs | 📋 | `.squad/agents/scribe/charter.md` | 📋 Silent |
| Ralph | (monitor) | Work queue, backlog | 🔄 | — | 🔄 Monitor |

## Coding Agent

<!-- copilot-auto-assign: false -->

| Name | Role | Status |
|------|------|--------|
| @copilot | Coding Agent | 🤖 Coding Agent |

### Capabilities

**🟢 Good fit — auto-route when enabled:**
- Decorator implementations and TypeSpec library additions
- Emitter output format changes
- Test coverage (unit tests for decorators, diagnostics, emitter)
- Lint/format fixes and code style cleanup
- Dependency updates within the minor-locked peer dep window
- Documentation fixes and README updates
- JSON Schema updates for agent-manifest.schema.json

**🟡 Needs review — route to @copilot but flag for squad member PR review:**
- New decorator proposals (affects the open standard)
- PII pattern additions (security-adjacent)
- Emitter output format breaking changes
- TypeSpec peer dep range updates

**🔴 Not suitable — route to squad member instead:**
- Architecture decisions about the layer boundary (core vs emitters)
- Adding framework-specific concepts to base spec
- Security-critical changes to PII diagnostics
- Decisions about what belongs in Phase 2 vs Phase 1
