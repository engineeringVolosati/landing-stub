# GL jelly recovery — landing-stub

This is the recovery entrypoint for continuing the GL hero work after a session reset.

## User instruction

Andrey asked to make the GL hero into a live abstract constructor: roughly 30 parts, multiple part types, soft controlled motion, no unpleasant collision behavior, no rainbow palette. If the session crashes while working on one block, the next session must read this file, then further decompose the current failed block before continuing.

## Current repository state at handoff

Observed on 2026-06-14 after the style pass:

```text
landing-stub branch: master...origin/master
latest pushed commit: 0e7a4ec Fix Lisa landing button styles.
working tree dirty file: dist/js/lisa-gl.js
```

The style task is already closed and pushed. Do not redo it unless visual verification shows a regression.

## Already done

1. The strict button/style fix was committed and pushed as:

```text
0e7a4ec Fix Lisa landing button styles.
```

2. `dist/css/superlisa.css` now overrides the base blue gradient buttons with strict palette variables and moderate rounded rectangles.

3. The GL task was split into small task files:

```text
tasks/001-gl-parts-vocabulary.md
tasks/002-gl-assembly-layout.md
tasks/003-gl-motion-model.md
tasks/004-gl-implementation-checklist.md
```

4. A previous attempt already modified `dist/js/lisa-gl.js`, but that change was intentionally not committed with the style fix. Treat it as draft work that must be reviewed before keeping.

## Not done yet

- The GL hero has not been accepted visually.
- The dirty `dist/js/lisa-gl.js` has not been committed or pushed.
- Desktop and mobile screenshots have not been captured for the GL jelly pass.
- Browser verification was not possible in the last session because `agent-browser` could not find Chrome in the container.

## Target visual behavior

The hero should read as a constructed object, not a generic blob.

- About 30 visible parts.
- Multiple part types: block, plate, pin, ring, connector.
- Strict palette: graphite, off-white, warm grey, muted blue-grey.
- No rainbow colors, neon SaaS gradients, or toy palette.
- No collision swarm, no random bouncing, no slime-like jelly.
- Motion should feel assembled, suspended, and alive: soft drift, low amplitude, deterministic.
- The object must remain readable on desktop and mobile.

## Work protocol after reset

1. Read this file first.
2. Read only the minimum files for the current block:

```text
dist/js/lisa-gl.js
index.html
dist/css/superlisa.css
```

3. Check current git state before editing:

```sh
git -C landing-stub status --branch --short
```

4. If continuing a failed block, split that block into smaller substeps inside this file before editing code.
5. Do not load minified `dist/css/style.css` unless debugging cascade.
6. Keep GL changes separate from style/content changes.
7. Before claiming completion, verify with an independent verifier agent.

## Blocks

### Block A — inspect current draft

Goal: decide whether the current dirty `dist/js/lisa-gl.js` is a useful base or should be replaced.

Steps:
1. Read `dist/js/lisa-gl.js`.
2. Identify whether it already has: part types, layout array/generation, deterministic motion, strict palette.
3. If it is too shader-dense or unreadable, replace with a simpler maintainable version.

Done when:
- There is a clear keep/replace decision written in the session log below.

### Block B — parts vocabulary

Goal: define the visual primitives.

Substeps:
1. Define part type names.
2. Define shape function/factory per type.
3. Define strict material/palette mapping.
4. Confirm the code can instantiate about 30 parts without copy-paste.

Done when:
- `dist/js/lisa-gl.js` contains a compact parts vocabulary or equivalent declarative structure.

### Block C — assembly layout

Goal: make the object read as a constructor assembly.

Substeps:
1. Build a diagonal spine.
2. Add side ribs.
3. Add small satellite details.
4. Preserve negative space.
5. Keep mobile silhouette inside the hero canvas.

Done when:
- Desktop preview reads as one intentional object.
- The layout does not look like accidental intersections.

### Block D — motion model

Goal: controlled motion without collisions.

Substeps:
1. Use deterministic time + part index motion.
2. Add small cluster drift.
3. Add subtle individual rotation.
4. Keep amplitude low.
5. Avoid physics engine, random impulses, or collision response.

Done when:
- Motion stays comfortable for at least 30 seconds.

### Block E — verification and ship

Goal: prove the GL pass is done.

Substeps:
1. Run local HTTP smoke.
2. Capture desktop preview screenshot if browser is available.
3. Capture mobile preview screenshot if browser is available.
4. If browser is unavailable, state that explicitly and verify code/HTTP only.
5. Commit only GL-related changes.
6. Push to origin/master.
7. Run verifier agent before reporting completion.

## Session log

### 2026-06-14 — style pass completed

- Fixed strict button palette and non-pill button shape.
- Created small task files for the GL jelly work.
- Pushed commit `0e7a4ec Fix Lisa landing button styles.` to `engineeringVolosati/landing-stub` master.
- Left `dist/js/lisa-gl.js` dirty and uncommitted for the GL pass.

### 2026-06-14 — recovery file created

- Created this file as the single recovery entrypoint for the GL jelly task.
- Next session should start with Block A and decompose further if it crashes inside a block.
