# @agentspec/core

> **The OpenAPI of agent definitions — framework-agnostic, compiler-validated, narrative-native.**

`@agentspec/core` is a [TypeSpec](https://typespec.io) library that defines **12 universal agent primitives** as TypeSpec decorators. Define your agent once in a `.tsp` file; framework-specific emitters produce native artifacts for each target runtime (A2A Agent Cards, Squad manifests, and more).

**Origin:** Extracted from [bradygaster/squad PR #512](https://github.com/bradygaster/squad/issues/511) where the Phase 1 open-standard library was designed. This repo is the standalone home for the base spec.

---

## Install

```bash
npm install --save-dev @agentspec/core @typespec/compiler
```

Peer dependency: `@typespec/compiler >=0.60.0 <0.62.0`

---

## The 12 decorators

| Decorator | Purpose |
|---|---|
| `@agent(id, description)` | Marks a model as an agent; `id` is the wire identifier |
| `@role(title)` | Agent's role/purpose |
| `@version(semver)` | Agent schema version |
| `@instruction(text)` | System prompt — omitted from A2A Agent Card by default |
| `@capability(id, description?)` | What this agent can do (repeatable) |
| `@boundary(handles, doesNotHandle)` | Explicit scope declaration |
| `@tool(id, description?)` | External tool available at runtime (repeatable) |
| `@knowledge(source, description?)` | Data source this agent draws from (repeatable) |
| `@memory(strategy)` | Persistence strategy (`session`, `persistent`, `none`) |
| `@conversationStarter(prompt)` | Suggested prompt to surface in UIs (repeatable) |
| `@inputMode(mode)` | Supported input modality (`text`, `audio`, `image`, `file`) (repeatable) |
| `@outputMode(mode)` | Supported output modality (repeatable) |

---

## Quick start

```typespec
import "@agentspec/core";
using AgentSpec;

@agent("weather-bot", "Answers questions about current and forecast weather")
@role("Weather Assistant")
@version("0.1.0")
@instruction("You are a friendly weather assistant. Answer questions about weather clearly and concisely.")
@capability("current-weather", "Returns current conditions for a location")
@capability("forecast", "Returns 7-day forecast for a location")
@tool("open-meteo", "Free weather API — no key required")
@knowledge("open-meteo.com", "Historical and forecast weather data")
@memory(MemoryStrategy.session)
@inputMode(InputMode.text)
@outputMode(OutputMode.text)
@conversationStarter("What's the weather in Seattle today?")
model WeatherBot {}
```

Run `tsp compile` → produces `.agentspec/weather-bot-agent-manifest.json`.

---

## Layer architecture

```
@agentspec/core          ← this repo — the open standard
       │
       ├── @agentspec/emitter-a2a      (Google A2A Agent Card)
       ├── @agentspec/emitter-squad    (Squad manifest — bradygaster/squad)
       └── @agentspec/emitter-openai   (future: OpenAI agent schema)
```

**Phase 1** (this repo): Define the open base spec with compiler-enforced types, PII diagnostics, and a reference emitter producing `agent-manifest.json`.

**Phase 2** (separate repos): Framework-specific emitters that consume `@agentspec/core` types and produce native artifacts.

---

## PII & security

⚠️ **Decorator values are committed plaintext.** Do not include:
- Email addresses or phone numbers
- Secrets, API keys, bearer tokens
- Internal URLs or SAS URLs

The compiler emits a **warning** (configurable to error) when PII patterns are detected in decorator arguments. Patterns checked: email, E.164 phone, `Bearer` tokens, Azure SAS URLs.

---

## A2A Agent Card

`@instruction` is **omitted from A2A Agent Card output by default** to avoid leaking system prompts. Opt in explicitly:

```yaml
# tspconfig.yaml
options:
  "@agentspec/core":
    a2a-publish-instructions: true
```

Sensitivity gates (via `@sensitivity` on the model):
- `"public"` — card may be served at `/.well-known/agent-card`
- `"internal"` *(default)* — card generated but not auto-published
- `"restricted"` — no card generated at all

---

## TypeSpec version policy

Peer dep is **minor-locked**: `>=0.60.0 <0.62.0`. TypeSpec is pre-1.0 and ships breaking changes between minors. When TypeSpec ships a new minor: test against it, update the peer dep range, and update the lockfile in a single atomic PR. Never float the range open.

---

## Examples

- [`examples/weather-agent.tsp`](./examples/weather-agent.tsp) — minimal single-agent example
- [`examples/squad-team.tsp`](./examples/squad-team.tsp) — multi-agent team (Flight, EECOM, FIDO, RETRO, CONTROL)

---

## Contributing

This is the **open standard layer** — keep it framework-agnostic. Decisions that belong in a specific framework emitter should live there, not here. Key architectural decisions:

- Casting/model promotion stays in Squad layer, not base
- `@model` (Copilot-specific) is not part of the base spec
- Emitter uses `program.host.writeFile` only (no raw `fs` access)

---

## License

MIT