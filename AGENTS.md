# Agent operating guide

These instructions apply to any agent or human contributor; no vendor-specific
memory or agent service is required.

## Start or resume

Read, in order:

1. `CONSTITUTION.md`
2. `AGENTS.md`
3. `docs/STATUS.md`
4. `docs/SPEC.md`
5. Relevant decisions in `docs/adr/`

Inspect the worktree, branch, available tools, package scripts, and existing work.
If a canonical document is missing, report it and initialize only within your
authorized scope. Do not infer completion from a document or prior conversation:
compare claims with files and recorded evidence. Resume from the next action in
status; portable repository documents, not chat history, are the handoff.

For authorized initialization of a new product from this starter, follow
`BOOTSTRAP-PROMPT.md`'s **NEW PRODUCT INITIALIZATION** instructions: replace the
demo spec/status with the prompted product's requirements and C1 state, keeping
tooling and process rules. Demo evidence/approval is not product progress, and
inherited starter-review gates are not product blockers. For an existing
product, preserve its requirements/history and honor its pending gates instead.

## Autonomy and gates

- Independently perform reversible implementation, local inspection, and checks
  within the approved brief and environment permissions.
- Ask for decisions that change product acceptance, domain rules, privacy,
  retention, paid usage, external access, destructive operations, or architecture
  commitments. Do not substitute plausible guesses for those decisions.
- Batch at most five blocking questions, each with a recommended answer and its
  consequences. Track nonblocking questions without stopping unrelated work.
  A pending approval is a stop gate for the affected action.
- Preserve unrelated and uncommitted work. Do not use destructive Git operations,
  rewrite history, bypass checks, expose secrets, or alter unrelated files.
- Branch creation, push, PR creation, deployment, merging, and paid services
  require authorization. For the current starter implementation assignment,
  implementation branch work, pushing, and opening/updating its PR are authorized;
  merging and deployment are not. This grant does not transfer to copied projects.
- Changes to the constitution require human approval plus an ADR. Material
  departures from recorded architecture/process decisions need an ADR and the
  appropriate approval before implementation.

## Slice workflow

1. Select a small end-to-end slice and its stable spec IDs; identify its risk.
2. Implement behavior, failure handling, and proportionate tests together.
3. Run the smallest relevant checks, then the required verification gate before
   claiming readiness. A blocked check is a limitation, not a pass.
4. Update `docs/SPEC.md` and `docs/STATUS.md` in the same change. Include commands,
   outcomes, evidence references, questions, limits, and next action.
5. Commit the coherent slice when authorized, not individual files. Use a
   conventional WHAT subject and a WHY body with trade-offs and evidence.

## Commands and architecture

Inspect `package.json` and the available toolchain before running commands.
Command definitions are not execution evidence; record actual results in status.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps chromium
pnpm dev --host 127.0.0.1
pnpm test
pnpm test:watch
pnpm lint:fix
pnpm verify
```

Pinned toolchain: Node `22.23.3` in `.node-version`, `.nvmrc`, and package
`engines`; pnpm `10.34.7` in `packageManager`. `pnpm verify` runs, in order,
lint, typecheck, architecture, test, build, and test:e2e. Installing browser system
dependencies may require environment permission; report an unavailable capability.

Production boundaries: `src/domain` is pure and imports neither external packages nor
UI/storage; `src/storage` exposes an asynchronous `DemoStore` and localStorage
adapter; `src/ui` contains React UI; `src/main.tsx` composes implementations.
Boundary parsing may use Zod outside the domain. See the ADRs for rationale.
Dependency-cruiser prevents cycles, domain dependencies, storage-to-UI imports,
and UI-to-browser-adapter imports. Unit test files may import their test runner.

## Checkpoints and handoff

Follow C1–C3 in `BOOTSTRAP-PROMPT.md`. Before requesting review, verify the actual
running application and a reachable URL in the available environment. Never
invent a preview or imply loopback is reachable from another machine.
Give at most three user steps and link the matching spec IDs and evidence.
Record the worktree state and next action. Stop at pending human decisions;
silence is not acceptance.

Exact handoff procedure:
1. Inspect `git status --short`, branch, and recent commits; preserve existing work.
2. Reconcile implemented spec IDs with files and checks. Run `pnpm verify` for
   behavior-changing work and record any failure or check not run.
3. Start/restart the server using README commands; check the real review URL and
   its access scope. Never promise process survival or remote access from loopback.
4. Update `docs/STATUS.md` with checkpoint, approval, evidence, assumptions,
   limitations, questions, worktree state, and one exact next action. Update the
   canonical spec in the same change. Reference an existing commit where useful,
   not the yet-to-be-created handoff commit's own hash.
5. Review the diff for secrets and artifacts; make coherent authorized commits.
   Present URL (or restart limitation), what was proven, and ≤3 review steps.
   Stop and wait at the pending gate; a fresh agent may not advance past it.
