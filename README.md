# mvp-starter

An agent-agnostic, local-first web starter with portable rules, small delivery
checkpoints, and a copyable [bootstrap prompt](BOOTSTRAP-PROMPT.md). The working
demo creates, checks, and deletes tasks with explicit persistence/recovery
behavior. See [docs/STATUS.md](docs/STATUS.md) for verification and pending human review.

## Make an independent project

- [ ] After this starter change is merged, its owner can enable **Settings →
  General → Template repository**. The template flag is currently false; do not
  assume **Use this template** is available before the owner enables it.
- [ ] Create a repository from the enabled template, or make an ordinary source
  copy into a new independent repository. Copying files does not require a
  generator, account service, or preserved upstream Git history; do not delete or
  rewrite an existing worktree/history to initialize a project.
- [ ] Customize the package name, page title, UI copy, canonical docs, and an
  application-owned storage key. Update adapter/tests/docs consistently; do not
  run global string replacement or delete unrelated origin storage.
- [ ] Review ownership, permissions, data needs, and licensing before publishing.
  No license grant is invented by these instructions; select one only with
  authority to do so.
- [ ] Fill in the bootstrap brief, confirm acceptance criteria, and initialize
  project status from actual files/evidence, not inherited completion claims.
  Reassess assignment permissions: source-repository authorization is not copied.

## First run and local development

Prerequisites: Node **22.23.3** pinned in `.node-version`, `.nvmrc`, and
`engines`; pnpm **10.34.7** pinned in `packageManager`.

Install that Node version (for example, `nvm install && nvm use` with nvm),
then install pnpm with `npm install --global pnpm@10.34.7`. From the project root:

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps chromium
pnpm dev --host 127.0.0.1
```

Use the actual URL printed by the running server; verify it responds. A
`127.0.0.1` URL works only on the machine running the server. A remote environment
needs an explicitly configured port-forwarded URL and suitable access controls;
no forwarded/public URL is implied or provided here. Browser/system dependency
installation may require environment permissions.

```sh
pnpm test         # fast unit checks
pnpm test:watch   # interactive unit loop
pnpm lint:fix     # modifies files; review the diff
pnpm verify      # lint → typecheck → architecture → test → build → test:e2e
```

These commands are not recorded execution evidence. See `docs/STATUS.md` for actual
results and limitations, including unavailable tooling or browser checks in
`docs/STATUS.md`. `pnpm test:e2e` expects a built app (`pnpm build` first);
Playwright starts and waits for its own production-preview server on port 4173.
Unit and browser runners fail when no tests are found.

To restart after a session ends, run `pnpm dev --host 127.0.0.1 --port 5173 --strictPort`.
Only if your environment offers authenticated forwarding, bind with
`pnpm dev --host 0.0.0.0 --port 5173 --strictPort` and forward port 5173;
check access controls and verify the actual forwarded URL before sharing it.
No server or preview is guaranteed to survive an agent session. No deployment runs.

## Architecture and storage

- `src/domain`: pure TypeScript; no external, UI, or storage imports.
- `src/storage`: asynchronous `DemoStore`, Zod boundary validation, localStorage
  adapter.
- `src/ui`: React presentation; `src/main.tsx`: composition root.

The demo owns `mvp-starter:demo:v1` and stores version 1
`{version:1,items:[{id,title,completed}]}`. Stable unique IDs, nonempty trimmed
titles of at most 120 characters, and boolean completion are validated.
Corrupt/unsupported data and read failures block writes until successful retry
or a deliberate confirmed own-key reset. Writes are shown as saved only on
success. No migration is implemented; future transforms must be explicit/tested.

This is discardable, nonsensitive demo storage: no durable-record guarantee,
backup/export, cloud sync, or guaranteed offline application loading. Revisit
storage before real product use. [ADR 002](docs/adr/002-storage.md) explains
IndexedDB/cloud decision criteria and recovery limits.

## Work with any agent

Read [CONSTITUTION.md](CONSTITUTION.md) → [AGENTS.md](AGENTS.md) → `docs/STATUS.md` →
[docs/SPEC.md](docs/SPEC.md) → relevant [ADRs](docs/adr/).
Copy [BOOTSTRAP-PROMPT.md](BOOTSTRAP-PROMPT.md), provide an idea and optional
language/devices/design/sensitivity/budget, and work through C1 risky core,
C2 useful reload/recovery, and C3 agreed acceptance/handoff. No agent-specific
memory is required; acceptance and external actions remain explicit human gates.

## Folder map

`src/` holds domain, storage, UI, and their unit tests; `e2e/` holds desktop/mobile
browser smoke tests. `docs/SPEC.md` is the only spec, `docs/STATUS.md` the live
handoff, and `docs/adr/` the decision record. Root configuration and
`.github/workflows/ci.yml` run the same local/CI gate. No environment file or
cloud credentials are needed.
