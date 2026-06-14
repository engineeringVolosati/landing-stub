# 001 — GL parts vocabulary

Target: replace a single hero object with an abstract constructor made from roughly 30 visible parts.

Scope:
- Define 4-5 part types: block, plate, pin, ring, connector.
- Keep geometry low-poly and readable on mobile.
- Use strict light-system colors: graphite, off-white, warm grey, muted blue-grey.
- No rainbow palette, neon SaaS gradients, or random toy colors.

Done when:
- `dist/js/lisa-gl.js` has a small declarative parts palette.
- Each part type has one reusable geometry/material factory.
- The scene can instantiate 30 parts without copy-paste blocks.
