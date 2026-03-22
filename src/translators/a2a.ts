import type { AgentManifestData } from "../types.js";

// ΓöÇΓöÇΓöÇ Google A2A Agent Card types ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

export interface AgentCard {
  readonly name: string;
  readonly description: string;
  readonly instructions?: string;
  readonly skills: ReadonlyArray<AgentCardSkill>;
  readonly defaultInputModes: readonly string[];
  readonly defaultOutputModes: readonly string[];
}

export interface AgentCardSkill {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly examples?: readonly string[];
}

// ΓöÇΓöÇΓöÇ Translator ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ

export interface ToAgentCardOptions {
  /**
   * Whether to include `behavior.instructions` in the Agent Card output.
   * Default: false (instructions are behavioral config, not discovery metadata).
   */
  readonly publishInstructions?: boolean;
}

/**
 * Map an AgentManifestData to a Google A2A Agent Card.
 *
 * Sensitivity gating:
 * - "public"     ΓåÆ card generated and may be published
 * - "internal"   ΓåÆ card generated but not for external publishing
 * - "restricted" ΓåÆ returns null; no card generated
 */
export function toAgentCard(
  manifest: AgentManifestData,
  options: ToAgentCardOptions = {}
): AgentCard | null {
  if (manifest.sensitivity === "restricted") {
    return null;
  }

  const skills: AgentCardSkill[] = manifest.behavior.capabilities.map((cap) => ({
    id: cap.id,
    name: cap.id,
    ...(cap.description && { description: cap.description }),
    examples: manifest.communication.conversationStarters.slice() as string[],
  }));

  return {
    name: manifest.id,
    description: manifest.description,
    ...(options.publishInstructions && manifest.behavior.instructions !== undefined && {
      instructions: manifest.behavior.instructions,
    }),
    skills,
    defaultInputModes: manifest.communication.inputModes.slice() as string[],
    defaultOutputModes: manifest.communication.outputModes.slice() as string[],
  };
}