# Project constitution

Durable rules for humans and any coding agent. Product-specific facts belong in
`docs/SPEC.md`; current work and evidence belong in `docs/STATUS.md`.

1. **Learn before building.** Identify the riskiest assumption early. Deliver
   small, end-to-end slices that test it before adding breadth or infrastructure.
2. **Do not invent the domain.** Record confirmed facts, assumptions, unanswered
   questions, and explicit exclusions separately. Human silence is not approval.
3. **Local first, deliberately.** Prefer a useful local experience and reversible
   choices with a replaceable asynchronous storage seam for future cloud needs.
   Local storage is not automatically private, durable, backed up, or
   available offline. Reassess storage against actual product requirements.
4. **Keep boundaries honest and simple.** Prefer the smallest usable slice over
   speculative abstractions. Use strict typing. Validate untrusted input and
   persisted data at runtime; types alone do not validate boundaries. Keep domain
   logic independent of UI, storage, and external services.
5. **Make the experience usable.** Semantic structure, keyboard operation,
   visible focus, labels, understandable errors, accessible feedback, and
   mobile-friendly layouts are acceptance requirements, not finishing touches.
6. **Choose a compatible, maintained stack.** Prefer current stable releases
   supported together, not new majors for their own sake. Verify compatibility
   and record dated decisions. Pin the toolchain and preserve reproducibility.
7. **Protect people and credentials.** Never commit secrets or real personal
   data. Do not guess privacy, retention, consent, identity, or authorization
   rules. Obtain approval before sensitive integrations, paid services, or
   irreversible operations.
8. **Prove what changed.** Cover meaningful behavior, boundaries, failure paths,
   accessibility, and regressions with proportionate tests. Run the applicable
   checks and record actual commands, outcomes, and limitations. Never fabricate
   passing checks, reachable URLs, screenshots, or human acceptance. Tests are
   part of done, not a follow-up.
9. **Keep one truth.** Update the spec and status in the same change as behavior:
   stable requirement IDs, implementation state, evidence, open questions, and
   next action must agree. Distinguish planned, implemented, verified, and
   human-accepted work.
10. **Commit complete slices.** Use conventional commit subjects describing
    **WHAT** changed (for example, `feat: recover unreadable demo storage`).
    Explain **WHY**, trade-offs, and relevant evidence in the body. Do not create
    one commit per file merely because files changed.
11. **Preserve human control.** Respect existing work and explicit scope.
    Constitutional changes require explicit human approval and an ADR describing
    the reason and consequences; an agent cannot approve its own exception.

Reading order and operational approval gates are defined in `AGENTS.md`.
These are generic project defaults. Override them consciously for a project;
changes to this constitution still require human approval and a short ADR.
