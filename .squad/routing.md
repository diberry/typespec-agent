# Work Routing

Routes incoming issues/PRs to the right squad member based on scope.

## Routing Table

| Topic | Route To | Notes |
|-------|----------|-------|
| TypeSpec library changes (`lib/main.tsp`) | EECOM | Core decorator definitions |
| Decorator implementations (`src/decorators.ts`) | EECOM | TypeScript decorator logic |
| Emitter changes (`src/emitter.ts`) | EECOM | Output generation |
| Type definitions (`src/types.ts`) | CONTROL | All types must be `readonly` |
| Schema validation changes | CONTROL | JSON Schema in `generated/` |
| TypeSpec peer dep compatibility | CONTROL | Minor-lock policy enforced |
| PII diagnostic patterns (`src/diagnostics.ts`) | RETRO | Security-sensitive |
| Sensitivity gating (A2A card) | RETRO | Trust boundary decisions |
| `@boundary` decorator semantics | RETRO | Scope/trust enforcement |
| Unit tests (`test/`) | FIDO | All new code needs tests |
| CI/CD workflow changes | FIDO | GitHub Actions in `.github/` |
| Edge case identification | FIDO | Unknown inputs, empty models |
| Architecture decisions | Flight | Layer boundary, Phase 1 vs 2 |
| New decorator proposals | Flight | Requires architecture review |
| README / documentation | EECOM + Flight | EECOM drafts, Flight approves |
| Session logs, decisions archive | Scribe | Silent; no PR authored |

## Labels → Members

| Label | Member |
|-------|--------|
| `squad:eecom` | EECOM |
| `squad:control` | CONTROL |
| `squad:retro` | RETRO |
| `squad:fido` | FIDO |
| `squad:flight` | Flight |

## Branch Convention

```
squad/{issue-number}-{kebab-case-slug}
```

Example: `squad/42-add-sensitivity-decorator`
