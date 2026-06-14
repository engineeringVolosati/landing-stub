# 004 — GL implementation checklist

Before editing:
- Read only `dist/js/lisa-gl.js`, `index.html`, and `dist/css/superlisa.css`.
- Do not load minified `dist/css/style.css` unless debugging cascade.

Implementation order:
1. Preserve current canvas boot and resize logic.
2. Replace single-object scene with parts palette and layout array.
3. Add deterministic motion layer.
4. Verify desktop screenshot.
5. Verify mobile screenshot.
6. Commit only GL-related changes.

Acceptance:
- Around 30 visible parts.
- Multiple part types.
- Strict palette.
- No rainbow gradients.
- No unpleasant collision behavior.
- Preview screenshots captured before push.
