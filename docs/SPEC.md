# Starter specification

## Scope and facts

A generic, agent-agnostic, local-first starter: a discardable task-list demo
illustrates a typed domain, asynchronous storage boundary, accessible UI,
verification, and portable delivery process. No particular business domain,
personal data, account, cloud service, or deployment is assumed.

The demo supports creating, checking/unchecking, and deleting items with stable
IDs. Titles are trimmed, nonempty, and at most 120 characters. IDs are unique
within a stored collection and remain unchanged across edits and reloads.

## Requirement register

States are **planned** (agreed target), **implemented** (code exists),
**verified** (recorded checks demonstrate it), and **accepted** (explicit human
approval recorded). These are not interchangeable. No human acceptance is
asserted here. `docs/STATUS.md` is the source of actual current state, evidence,
checkpoint decisions, and next action; do not infer execution from this plan.

| ID | Requirement and acceptance target | Current state |
| --- | --- | --- |
| S1 | Create, check/uncheck, and delete demo items; enforce trimmed nonempty titles ≤120 characters; preserve unique stable IDs. | Verified automatically |
| S2 | Persist successful changes and restore them on reload through asynchronous `DemoStore`; use the exact versioned schema and own key below. | Verified automatically |
| S3 | Reject malformed, semantically invalid, or future-version stored data; block writes after read errors until successful retry or deliberate confirmed own-key reset. Never silently drop data. | Verified automatically |
| S4 | Show saved state only after a successful write; surface failures, preserve a truthful last-saved view, and allow retry. Failed changes must not appear persisted or be lost silently. | Verified automatically |
| S5 | Semantic controls, explicit labels, keyboard completion, visible focus, accessible status/error feedback, and no horizontal overflow at desktop Chrome and Pixel 7 viewports. | Implemented; browser checks partial, human accessibility review pending |
| S6 | Frozen install and nonempty `pnpm verify` pass; no cycles or forbidden imports; CI uses identical gate with failure artifacts. | Local gate verified; hosted CI pending |
| S7 | Canonical docs support brief → C1–C3 → exact restart/handoff without chat; copyable prompt includes all product inputs and gates. | Implemented; human review pending |

Keep these IDs stable when updating scope. Add product requirements with new IDs;
do not quietly redefine completed requirements. Record evidence against IDs in
status, including failed or unavailable checks and outstanding human decisions.

## Storage contract (S2–S4)

- Key: `mvp-starter:demo:v1`; owned by this demo only.
- Version 1 runtime-validated Zod shape:
  `{version:1,items:[{id,title,completed}]}` where `id` is a nonempty unique
  string, `title` obeys S1, and `completed` is boolean.
- An absent key starts an empty demo. Malformed JSON, invalid fields, unsupported
  versions, and access exceptions are errors, not empty data.
- No migration is implemented. Future migrations require explicit, tested
  transforms and a deliberate unsupported-version policy; never auto-drop data.
- Failed reads block writes. A successful retry or user-confirmed reset of this
  key alone unlocks the flow. Failed reset must remain an error.
- Writes are asynchronous at the boundary even though localStorage is
  synchronous internally. Only successful persistence may be presented as saved.
  Recovery must not overwrite unread data or claim a failed change survived.

## Boundaries and verification (S6)

`src/domain` contains pure TypeScript and no external, UI, or storage imports.
`src/storage` contains `DemoStore`, persistence validation, and the adapter.
`src/ui` owns React presentation; `src/main.tsx` is the composition root.
Dependency-cruiser enforces the domain boundary.

Target Node `22.23.3`, pnpm `10.34.7`, and commands are documented in `AGENTS.md`.
`pnpm verify` means lint → typecheck → architecture → test → build → test:e2e.
Tests should exercise domain limits/IDs, reload, invalid/future data, blocked
reads, write/reset failures, retry, accessible interaction, and the useful demo
flow. CI success is evidence only when its actual result is recorded.

## Limits and open product decisions

localStorage is for discardable, nonsensitive demo data, not durable records.
No export/backup, cross-device sync, cloud auth, concurrent-write conflict
handling, or guaranteed offline application loading is included. A local data
store does not cache the application shell. Revisit storage before real product
data; see ADR 002 for IndexedDB and cloud decision criteria.

Confirm product users, domain rules, devices/design, data sensitivity/retention,
budget, and acceptance criteria during bootstrap. Unknowns are not permission
to invent facts. C1 tests the risky core, C2 tests usefulness/recovery, and C3
requests explicit acceptance; optional cloud work needs its own approved scope.

## Product brief to populate at initialization

- Idea/problem: **unset — this is the starter, not a product**.
- Product language: **English demo default; choose explicitly for your product**.
- Intended users: **starter users are builders/humans/agents; product users unset**.
- Primary workflow: **demo create/check/delete; replace with approved product workflow**.
- Sensitive data, retention, backup/export policy: **nonsensitive discardable demo
  only; product policy requires confirmation**.
- Success criterion: **starter verification passes and human demo review; product
  measurable outcome unset**.
- Non-goals: backend, auth/API integrations, synchronization, PWA, deployment,
  component framework, documentation framework dependency, product features.
- Assumptions: modern browser with site storage and `crypto.randomUUID` support,
  single active editing tab, no durable/sensitive demo records.
