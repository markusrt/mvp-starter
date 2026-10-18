# Current handoff

## Checkpoint and authorization

- Updated: 2026-10-18.
- Repository/branch: `markusrt/mvp-starter`, `copilot/populate-mvp-starter`.
- Checkpoint: **starter migrated to Spec Kit; awaiting human review**. This is
  not C1 of any product. No product feature exists in `specs/`.
- Active feature: none. The starter ships no sample spec (ADR 004).
- Approval: owner requested the Spec Kit migration on 2026-10-18, which covers
  the constitution move/amendment (v2.0.0) recorded in ADR 004. Branch work,
  push, and PR are authorized by this assignment; merge, deploy, new remote
  resources, and template-setting changes are not.
- Human acceptance of the starter: **none yet**.
- Prior commits: `ad5a7c0` (starter implementation), `8b79d3e` (initialization
  wording). Inspect actual `git status --short` and `git log` on resume.

## What changed and actual evidence

2026-10-18 Spec Kit migration:

- Constitution moved to `.specify/memory/constitution.md` in Spec Kit format,
  same rules, plus explicit C1–C3 checkpoints and mandatory tests.
- `docs/SPEC.md` (demo spec S1–S7) removed. Product specs come from
  `/speckit-specify` under `specs/NNN-*/`. Demo e2e titles no longer cite S-IDs.
- `.specify/templates/overrides/tasks-template.md` adds C1–C3 GATE tasks,
  mandatory tests, stack paths, and per-slice commits.
- `biome.json` excludes tool-managed `.specify/`.
- AGENTS.md, BOOTSTRAP-PROMPT.md, README.md, ADR 003 updated; ADR 004 added.

Commands actually run on 2026-10-18 (Windows 11, portable Node 22.23.3 with
corepack pnpm 10.34.7; the machine's default Node is 24.21.0, which the
`engines` pin correctly rejects):

- `specify init sk-probe --integration claude --script sh --non-interactive`
  (specify-cli 1.2.1, scratch copy): generated `.claude/skills/speckit-*` (10)
  and `.specify/` (memory, scripts, templates, workflows). No git repository or
  CLAUDE.md/AGENTS.md created.
- Biome on that initialized copy with the old config: **5 format errors** in
  generated `.specify/*.json`; with the `.specify` exclusion: **pass**.
- `specify init --here --force` on a scratch copy of this working tree:
  existing constitution **preserved**, no tracked file modified,
  `resolve-template.sh tasks-template` returns the GATE override, and Biome passes.
- `pnpm install --frozen-lockfile`: succeeded.
- **`pnpm verify`: passed.** Biome (18 files); typecheck; dependency-cruiser
  (13 modules, 14 dependencies, no violations); **12 unit tests**; production build
  (known Zod comment warnings only); **8 Playwright scenarios** (chromium + mobile).
  The first run failed on formatting from the e2e title change; fixed with
  `biome format --write`, then rerun green.
- `pnpm dev --host 127.0.0.1 --port 5173 --strictPort`: `http://127.0.0.1:5173/`
  returned HTTP 200 with the demo page title. Loopback only, on the agent's machine.

Not run: no `/speckit-*` command was executed end to end, because that needs a
product brief. Hosted CI not rechecked; the earlier run reported
`action_required`, zero jobs ([run 38950255088](https://github.com/markusrt/mvp-starter/actions/runs/38950255088)).

Earlier 2026-10-16 evidence (pnpm audit clean, CodeQL zero alerts, live browser
inspection) applies to unchanged application code. It was not re-executed.

## Start / review / resume

1. `pnpm install --frozen-lockfile`, then
   `pnpm dev --host 127.0.0.1 --port 5173 --strictPort`; the walking skeleton
   still runs at the printed local URL.
2. Read README "Make an independent project", BOOTSTRAP-PROMPT.md, and the GATE
   tasks in `.specify/templates/overrides/tasks-template.md`. Optionally try it
   in a scratch copy: `specify init --here --integration claude`, paste the prompt.
3. Decide: accept the Spec Kit starter, or request changes. Open choice: keep the
   demo walking skeleton (current) or strip it to a minimal shell.

The dev server may not survive the session; restart with the command above. No
forwarded or public preview exists.

Fresh agent: read constitution → AGENTS → this status → active `specs/` feature
(none) → relevant ADRs. Do not advance past the pending human review.

## Limits, decisions, and next action

- Discardable nonsensitive demo only; no backup/export, auth, backend, sync,
  conflict resolution, PWA/offline loading, or deployment. Storage limits: ADR 002.
- The tasks override copies the spec-kit 1.2.1 core template. On Spec Kit
  upgrades, diff the core template against the override (ADR 004).
- Spec Kit needs Python and `uv` on each machine that runs `specify`.
- `.sh` scripts are generated locally per product by `specify init`
  (`--script sh|ps`); the starter commits none.
- No license chosen. The template-repository setting remains the owner's choice
  after merge.
- **Exact next action:** human reviews this change using the three steps above
  and records acceptance or requested changes here.

## Subsequent handoff schema

Keep this file current in the same behavior-changing change: date; branch and
existing commit/reference; actual worktree state; active feature
(`specs/NNN-*`); checkpoint/scope/approval; spec IDs (US, `FR-`, `SC-`) with
planned/implemented/verified/accepted states; exact commands and outcomes
(including not run); preview reachability and restart commands;
assumptions/limits/questions; one next action. Never inherit test evidence or
acceptance into a copied product without rechecking it.
