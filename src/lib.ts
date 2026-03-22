import { createTypeSpecLibrary } from "@typespec/compiler";

// ΓöÇΓöÇΓöÇ Protocol version ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// Bumps only on breaking schema changes ΓÇö independent of npm package semver.
export const AGENTSPEC_PROTOCOL_VERSION = "0.1.0";

// ΓöÇΓöÇΓöÇ State keys ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

export const StateKeys = {
  /** stateMap: Model ΓåÆ { id, description } */
  agent: Symbol.for("@agentspec/core::agent"),
  /** stateSet: Set<Model> ΓÇö used by navigateProgram filter to skip built-ins */
  agentSet: Symbol.for("@agentspec/core::agentSet"),
  /** stateMap: Model ΓåÆ string */
  role: Symbol.for("@agentspec/core::role"),
  /** stateMap: Model ΓåÆ string */
  version: Symbol.for("@agentspec/core::version"),
  /** stateMap: Model ΓåÆ string */
  instruction: Symbol.for("@agentspec/core::instruction"),
  /** stateMap: Model ΓåÆ CapabilityEntry[] */
  capabilities: Symbol.for("@agentspec/core::capabilities"),
  /** stateMap: Model ΓåÆ BoundaryState */
  boundary: Symbol.for("@agentspec/core::boundary"),
  /** stateMap: Model ΓåÆ ToolEntry[] */
  tools: Symbol.for("@agentspec/core::tools"),
  /** stateMap: Model ΓåÆ KnowledgeEntry[] */
  knowledge: Symbol.for("@agentspec/core::knowledge"),
  /** stateMap: Model ΓåÆ string (MemoryStrategy value) */
  memory: Symbol.for("@agentspec/core::memory"),
  /** stateMap: Model ΓåÆ string[] */
  conversationStarters: Symbol.for("@agentspec/core::conversationStarters"),
  /** stateMap: Model ΓåÆ string[] (InputMode values) */
  inputModes: Symbol.for("@agentspec/core::inputModes"),
  /** stateMap: Model ΓåÆ string[] (OutputMode values) */
  outputModes: Symbol.for("@agentspec/core::outputModes"),
  /** stateMap: Model ΓåÆ string (SensitivityLevel value) */
  sensitivity: Symbol.for("@agentspec/core::sensitivity"),
} as const;

// ΓöÇΓöÇΓöÇ Library definition ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

const libDef = {
  name: "@agentspec/core",
  diagnostics: {
    "pii-in-decorator": {
      severity: "warning",
      messages: {
        default: "Possible PII or sensitive value detected in decorator argument. " +
          "Do not commit secrets, email addresses, phone numbers, or internal URLs. " +
          "All decorator values are serialized to plaintext artifacts in git history.",
      },
    },
    "path-traversal": {
      severity: "error",
      messages: {
        default: "Agent ID contains path traversal sequences ('..', '/', or '\\'). Manifest will not be emitted.",
      },
    },
  },
} as const;

export const $lib = createTypeSpecLibrary(libDef);
export const { reportDiagnostic } = $lib;