# Current handoff

## Checkpoint and authorization

- Updated: 2026-10-16.
- Repository/branch: `markusrt/mvp-starter`, `copilot/populate-mvp-starter`.
- Checkpoint: **starter demo implemented; awaiting human review**. This is not C1
  acceptance of a new product. Product C1–C3 have not begun.
- Approval: implementation branch, push, and PR authorized by this assignment.
  No merge, deploy, new remote resources, or template-setting change authorized.
- Human acceptance: **none**. Automated success never substitutes for approval.
- Baseline commit: `f875639` (initial plan). Implementation/handoff are in this
  change; use `git log -1` for its final hash rather than a self-referential hash.
- Worktree at this handoff: intended scaffold/docs only, pending authorized
  commit; dependency/build/browser artifacts ignored. Inspect actual
  `git status --short` and recent commits on resume; this snapshot is not a claim
  that future worktrees are clean.

## Requirements and actual evidence

Canonical requirements: [SPEC.md](SPEC.md). No competing product spec.

| IDs | State / evidence |
| --- | --- |
| S1–S2 | Automatically verified: pure domain tests and desktop/mobile browser create/check/reload/delete flows. |
| S3–S4 | Automatically verified: invalid JSON/shape/version/duplicate IDs, denied access, quota, write validation, own-key reset, blocked UI, cancellation, failed reset, retained input and retry. |
| S5 | Implemented: semantic labels/status/errors, visible focus, responsive layout. Browser checks use keyboard submit and desktop/Pixel 7 viewport. Mobile screenshot inspected; not a complete accessibility audit or human acceptance. |
| S6 | Local full gate verified. Pinned workflow, frozen install and failure artifacts implemented; hosted project CI not yet observed at this snapshot. |
| S7 | Canonical rules, bootstrap, brief fields, three ADRs, independent-project checklist and handoff implemented; human review pending. |

Commands actually run in this environment on 2026-10-16:

- `pnpm install`, then `pnpm install --frozen-lockfile`: succeeded with Node
  22.23.3 and pnpm 10.34.7; real generated lockfile committed with source.
- `pnpm exec playwright install --with-deps chromium`: succeeded.
- Targeted `pnpm typecheck`, `pnpm architecture`, `pnpm test`, `pnpm build`,
  `pnpm test:e2e`: succeeded after fixing initial scaffold type/boundary errors.
- **`pnpm verify`: passed**, including the final Vitest 4.1.12 upgrade:
  Biome; strict TypeScript; no forbidden dependencies/cycles (13 modules,
  14 dependencies); **12 unit tests**; production build; **8 Chromium browser
  scenarios** (four each on desktop and mobile).
- `pnpm audit`: **no known vulnerabilities** after replacing initial Vitest 3,
  whose full transitive audit found advisories missed by the initial package
  advisory lookup. No advisory suppression or vulnerable override used.
- Live browser inspection using installed Playwright: opened the running dev
  app at `http://127.0.0.1:5173/`, created/checked a sample, reloaded, confirmed
  checked state; no page errors. Inspected a 390×844 screenshot in `/tmp`
  (not a repository artifact).

Known non-failing build output: two upstream Zod comments contain pure annotations
Rollup cannot interpret; Rollup removes those comments and the build succeeds.
Security/code review results are recorded below when available; do not infer
hosted CI or review success from local test success.

## Start / review / resume

From the repository root with the pinned tools:

1. `pnpm install --frozen-lockfile` then
   `pnpm dev --host 127.0.0.1 --port 5173 --strictPort`; open the printed local URL.
2. Add a sample, check it, reload, then delete it; optionally inspect the
   confirmed reset and narrow-screen layout. Use nonsensitive sample data only.
3. Review S1–S7 and decide whether to accept the **starter demo**, requesting
   changes if needed. New product work needs a new brief and authorization.

Loopback was verified only inside the agent environment. No authenticated
forwarded URL was available/verified, so no remotely reachable preview is
promised. The browser MCP transport was unavailable; installed Playwright was
used successfully instead. The dev process may stop at session end: restart
with the command above. README describes optional environment-specific
forwarding; bind beyond loopback only with appropriate access controls.

Fresh agent: read CONSTITUTION → AGENTS → this status → SPEC → relevant ADRs.
Inspect actual branch/worktree, reconcile evidence, and do not advance past
the pending human gate. No previous chat or private memory is needed.

## Limits, decisions, and next action

- Discardable nonsensitive demo only; no backup/export/import, auth, backend,
  synchronization, conflict resolution, PWA/offline loading, or deployment.
- Storage is origin/browser-specific and single-editor. Multiple tabs can
  overwrite each other's changes. Site clearing/eviction loses demo data.
- Only schema v1 exists. Future versions require explicit tested migrations
  and a recovery policy; unsupported data currently remains untouched.
- IndexedDB/cloud adoption and real product sensitivity/retention/export policy
  remain product decisions, not solved by the asynchronous storage seam.
- No license chosen. Owner must enable **Settings → General → Template
  repository** after merge if desired; this task does not change the setting.
- Open review questions: Does the starter workflow/process meet expectations?
  What is the next product idea/language/data policy? These do not block the
  starter implementation but require a new product brief before product work.
- **Exact next action:** human reviews this PR and the starter demo using the
  three steps above; record explicit acceptance or requested changes here.

## Subsequent handoff schema

Keep this file current in the same behavior-changing change: date; branch and
existing commit/reference; actual worktree state; checkpoint/scope/approval;
requirement IDs and planned/implemented/verified/accepted states; exact commands
and outcomes (including not run); preview reachability and restart commands;
assumptions/limits/questions; one next action. Never inherit test evidence or
acceptance into a copied product without rechecking it.
