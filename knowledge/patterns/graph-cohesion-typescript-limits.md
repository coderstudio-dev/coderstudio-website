# graphify cohesion scores undercount TS/React prop-type coupling

Observed during the `page.tsx` refactor (2026-07-22): splitting the 552-line
`page.tsx` into `src/lib/content.ts` + 4 components in `src/components/` only
moved community cohesion from 0.11 to 0.12, despite the split being a clear
structural improvement (verified by `tsc --noEmit`, `next lint`, `next build`
all passing clean, and no other file in the repo importing `page.tsx`).

**Why:** graphify's AST extractor only emits `contains` and `imports`/
`imports_from` edges for TS/TSX. It does not emit an edge for "component X
uses type Y as its props type" (e.g. `ServiceCard()` using `ServiceCardProps`
is invisible to the graph even though the code enforces it structurally).
Because prop-type usage is exactly the coupling that ties a component file
together, cohesion scores for React/TS components will systematically read
low regardless of how well-factored the code actually is.

**How to apply:** when `/evaluate` or `/plan` cites a graphify cohesion score
for a TS/TSX community as evidence a file needs splitting (or as proof a
split worked), treat it as a weak signal only. Corroborate with a direct
read of the file (do the pieces actually share no logic beyond the file
container?) rather than trusting the score alone. This does not apply to
plain JS/JSON/config nodes, where `contains`/`imports` edges are the whole
story and cohesion is a much better proxy.
