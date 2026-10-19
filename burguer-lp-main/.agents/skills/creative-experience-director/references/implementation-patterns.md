# Creative-development implementation patterns

These are engineering patterns, not mandatory visual templates. Choose only the pieces justified by the approved creative direction.

## Foundation

Install a vanilla TS frontend with Vite. When dependencies are warranted:

```bash
npm create vite@latest my-experience -- --template vanilla-ts
cd my-experience
npm install
npm install gsap
# Only if 3D adds concrete value:
npm install three
npm install -D @types/three
```

Check currently published GSAP documentation for plugin import and registration before implementing ScrollSmoother or other plugins. Plugin access and licensing can evolve. Import GSAP modules from `gsap`, `gsap/ScrollTrigger`, etc., using valid paths in the installed version. GSAP's free/paid status, distribution, plugin capabilities, and limitations must be checked rather than assumed.

## 2D product hero scene transitions

Create a finite set of typed scene data containing palette, title, media asset, position, decorative layers, and copy. Render one semantic page with a real CTA; GSAP sequences out current text/image/panels, swaps safely, and transitions incoming scene. Guard against repeated activation, fast navigation, stale tweens, and resizing. Don't make the main content inaccessible while animating. Consider preload/decoding the next image before activating its timeline.

## Scroll-synced editorial sequence

For scene-based web stories, give each scene a semantic section and an independently readable content state. Where necessary, pin one parent with ScrollTrigger and scrub scene timelines, but ensure scroll duration is proportional, and mobile/reduced-motion experiences avoid heavy pinning. Prefer dynamic dimensions; `invalidateOnRefresh: true` where relevant. Do not nest or scatter dozens of pins uncritically.

## Layered cinematic image reveal

Use image layers with `object-fit: cover`, well-defined masking/overflow, motion transforms and text masks. Ensure each section has deliberate title, media crop, brightness/readability strategy, and accessible narrative structure. Use subtle color grading or overlays only when they improve legibility.

## Three.js scene decision gate

Use Three.js when the user wants: a genuine interactive 3D object (drag to rotate, alternate finishes), real-time camera choreography, spatial scenes, custom depth/material/shader behavior, or lighting/reactive interactions that 2D assets cannot adequately express.

Use pre-rendered transparent PNG/WebP/AVIF, layered 2D images, or short optimized videos for static 3D-looking art. Static hero art that appears 3D is not by itself proof that WebGL is required. For Three.js, have: proper renderer lifecycle, asset preload strategy, resize/DPR controls, reduced-motion/static fallback, loading/error states, cleanup, and touch interactions.

## ScrollSmoother gating

If the user asks for GSAP ScrollSmoother, confirm version/access first and implement with the documented HTML wrappers. Explicitly test ScrollTrigger sync, anchor links, native focus behavior, keyboard navigation, phone scroll, body sizing, sticky elements and browser navigation. Don't stack smooth-scroll libraries. Native scroll + ScrollTrigger is often a better default, especially on mobile.

## Motion tokens (starting points, not laws)

Use an explicit motion system with reusable `duration`, `ease`, `stagger`, and `distance` values. Small controls usually settle faster than full-scene changes. Choose a brand-specific cadence: luxury sites may have restrained, slower movements; energetic product brands may have sharp staging and lively transitions. Avoid using a single ease or timeline duration everywhere.

## Technical QA checklist

- Every view can be understood without JS-powered animation.
- Hero copy and main CTA are immediately discoverable and interactable.
- No incorrect `will-change` usage on dozens of elements.
- No unexpected horizontal scrollbar at phone sizes.
- No images load without dimensions or aspect-ratio stabilization.
- No extra-heavy 3D runtime for a scene that could be static.
- All pointer actions have keyboard/touch pathways.
- Reduced-motion CSS and JS behavior are handled.
- No scroll-lock trapping or broken anchors.
- All pinned scenes refresh after layout/media/font changes.
- No unlicensed fonts or scraped brand assets.
- Real functionality is implemented or honestly marked as not connected.
- Browser/performance tests are reported as actually performed, never fabricated.
