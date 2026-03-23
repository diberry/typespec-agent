# Architectural Decisions — @agentspec/core

> Maintained by Scribe. Submit new decisions to `.squad/decisions/inbox/`.

---

## ADR-001: Casting stays in Squad layer, not base

**Date:** 2026-03-22
**Status:** Accepted
**Author:** Flight / EECOM

**Context:** The base spec defines what an agent *is*. Casting (promoting a TypeSpec model into a runtime agent persona) is a Squad-SDK concern — it requires knowledge of the runtime, session context, and framework.

**Decision:** No casting primitives (`@cast`, `@persona`, promotion logic) in `@agentspec/core`. These belong in `@agentspec/emitter-squad` or the Squad SDK layer.

**Consequences:** Base spec stays clean and framework-agnostic. Squad-specific casting lives in a separate package.

---

## ADR-002: @model is Copilot-specific — not part of base spec

**Date:** 2026-03-22
**Status:** Accepted
**Author:** Flight

**Context:** `@model` would bind an agent definition to a specific LLM. This is useful for Copilot extensions but would make the spec vendor-locked.

**Decision:** `@model` is excluded from `@agentspec/core`. Framework emitters that need it (e.g., an OpenAI emitter) can define it locally.

**Consequences:** Base spec remains model-agnostic. Any framework can map agent definitions to their own model selection logic.

---

## ADR-003: TypeSpec peer dep is minor-locked (>=0.60.0 <0.62.0)

**Date:** 2026-03-22
**Status:** Accepted
**Author:** CONTROL

**Context:** TypeSpec is pre-1.0 and ships breaking changes between minor versions. Floating the range risks silent breakage.

**Decision:** Lock peer dep to a two-minor window: `>=0.60.0 <0.62.0`. When TypeSpec ships a new minor: run test suite, update peer dep range, update lockfile — all in one atomic PR.

**Consequences:** Consumers know exactly which TypeSpec versions are supported. Range bumps are intentional and tested.

---

## ADR-004: Emitter uses program.host.writeFile only — no raw fs access

**Date:** 2026-03-22
**Status:** Accepted
**Author:** RETRO

**Context:** Using Node.js `fs` directly in a TypeSpec emitter bypasses the compiler's virtual file system and breaks path traversal safety.

**Decision:** All file writes in `src/emitter.ts` go through `program.host.writeFile()`. Raw `fs` imports are prohibited in emitter code. A path-traversal diagnostic is emitted if the resolved output path escapes the project root.

**Consequences:** Safe in all TypeSpec host environments (local, in-memory, IDE). No escaping the project sandbox.

---

## ADR-005: Phase 1 is the open standard; Phase 2 is framework-specific emitters (separate repos)

**Date:** 2026-03-22
**Status:** Accepted
**Author:** Flight / Dina

**Context:** The 12 decorators and base emitter form a complete, self-contained spec. Framework-specific output (Squad manifests, OpenAI schemas, LangChain configs) requires knowing the target framework.

**Decision:**
- **Phase 1** (this repo): Open standard. 12 decorators + reference `agent-manifest.json` emitter. MIT licensed.
- **Phase 2** (separate repos): Framework emitters as `@agentspec/emitter-*` packages that depend on `@agentspec/core`.

**Consequences:** Clean separation of concerns. Community can publish their own emitters. The core spec doesn't get polluted with framework specifics.
