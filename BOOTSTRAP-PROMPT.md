# Copyable bootstrap prompt

Copy the complete block below into any coding agent with repository access.
Replace bracketed inputs; leave optional fields unspecified when unknown.

```text
Build a small, useful product from this starter.

IDEA (required): [problem, intended users, desired outcome]
LANGUAGE (optional): [UI/content language; technical preference if any]
DEVICES (optional): [desktop/mobile/tablet, browsers, assistive needs]
DESIGN (optional): [references, constraints, existing assets]
SENSITIVITY (optional): [data types, privacy/retention obligations; unknown is OK]
BUDGET (optional): [money, time, hosting/service constraints]

START / RESUME
Work from the repository, not remembered chat or vendor-specific memory. Read
CONSTITUTION.md -> AGENTS.md -> docs/STATUS.md -> docs/SPEC.md -> relevant ADRs.
Inspect capabilities, branch/worktree, existing implementation, commands, and
prior evidence before editing. Preserve existing work. Distinguish initializing
a new product from resuming an already initialized product.

NEW PRODUCT INITIALIZATION
The inherited docs/SPEC.md describes a disposable starter demo, not requirements
for the prompted product. Once authorized to initialize a new product, rewrite
that same canonical spec from IDEA and clarified requirements: users, problem,
primary workflow, acceptance criteria with new product IDs, non-goals, risks,
and assumptions. Replace demo-specific requirements rather than carrying the
task-list workflow, storage schema, or demo limits into the product by default.
Reset docs/STATUS.md to the new product's C1 scope, actual evidence, permissions,
questions, and next action. Do not inherit demo completion, test results, human
acceptance, or starter-review gates as product progress or product blockers.
Keep the reusable tooling, architecture boundaries, and process rules. Adapt or
remove demo-only code and tests as product slices replace them; retain relevant
quality/failure coverage and add tests for the new workflow. Preserve unrelated
user work and never clear existing browser data as part of this transition.

EXISTING PRODUCT RESUME
If a product has already been initialized, do not rewrite its spec or reset its
status from the starter. Reconcile docs with actual files, retain that product's
stable IDs and history, and continue its recorded next action within its gates.
Do not reset or regenerate the project merely because context is missing.

BRIEF AND DECISIONS
Reuse this starter rather than regenerating tooling. Summarize users, problem,
primary workflow, smallest useful outcome, success criterion, acceptance criteria, risky
assumption, exclusions, and constraints. Distinguish confirmed domain facts from
assumptions and questions. Investigate the repository and available capabilities
first. Batch no more than five genuinely blocking questions; give a recommended
answer and trade-off for each. Record nonblocking questions and proceed on
independent work. Treat questions requiring approval as gates for the affected
action, not permission to guess while waiting.
Populate the canonical docs and work unless blocked; do not request approval
for every document. Optional documentation frameworks must not create a second spec.

Act autonomously on reversible technical details within approved scope. Do not
guess domain, privacy, identity, consent, retention, or authorization rules.
Do not add paid services, expose data, push, deploy, merge, destructively change
Git, or bypass checks without the applicable authorization. Existing assignment
permissions must be explicit; copied starters do not inherit permission grants.
Constitution changes require human approval plus an ADR.
Do not create new remote resources without explicit permission or assume this
agent or a future agent has cloud provisioning capabilities.

DELIVERY CHECKPOINTS
C1 — Risky core: deliver the smallest real end-to-end sample that exercises the
highest-risk core assumption. Use synthetic, discardable data where appropriate;
do not mistake a mock or static screen for proof of the core behavior. Test
the slice and its important failures. Request a focused human decision on the
assumption before committing to dependent scope.

C2 — Useful and recoverable: deliver a useful approved workflow, including
reload/persistence behavior, invalid data, read/write failures, recovery,
keyboard use, accessible feedback, and agreed device behavior. Describe storage
and durability limits honestly. Do not silently discard data or claim saved
before the write succeeds.

C3 — Agreed acceptance and handoff: demonstrate the agreed acceptance criteria,
run the required checks, document known limits and exact restart/resume steps,
and request explicit human acceptance. Cloud identity, sync, deployment, and
other infrastructure are optional follow-on work, not default requirements.
Do not mark accepted without an explicit human decision.
Work only within the authorized checkpoint and scope, in small vertical slices;
do not add speculative features. Review of this starter demo is not acceptance
of a new product. A newly initialized product starts its own C1 gate.

AT EACH CHECKPOINT
Run pnpm verify and record its actual outcome before requesting review.
Verify the app actually runs and the stated URL is reachable in your available
environment. State who can reach it: loopback is local to the running machine;
a forwarded URL requires a real configured forwarding mechanism and appropriate
access controls. Never fabricate a URL, public preview, passing check, or review.
If preview access is unavailable, say so and give verified local start steps
instead; leave preview review pending.

Give the human at most three steps: how to reach/start the app, what to try,
and what decision is needed. Synchronize stable spec IDs, checkpoint/state,
actual command results and evidence, unresolved questions, limitations,
worktree state, and one next action in docs/STATUS.md and docs/SPEC.md in the same
change. Reference ADRs for consequential decisions. Keep commits coherent
end-to-end slices with conventional WHAT subjects and WHY bodies.
Make authorized local commits only; pushing requires separate explicit permission.

STOP / HANDOFF
Stop affected work at a human approval gate. Silence is not approval. Record
the exact pending decision, recommended option, safe independent work (if any),
and next action. On restart, another agent must be able to resume solely from
the canonical docs and repository: no hidden memory, credentials, or chat
dependency. Report verified results separately from unverified claims.
Process/server survival is not guaranteed. Document reproducible restart commands,
recheck the URL on resume, and never advance past a pending human gate.
```
