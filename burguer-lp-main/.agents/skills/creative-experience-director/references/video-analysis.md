# Visual evidence — seven user-supplied video references

This log is based on sampled frames throughout all seven provided videos. It describes visible design and transitions, not verified source-code implementation. Source filenames are kept to map notes to the supplied files. Social media overlays/creator commentary are not part of the underlying sites.

## 1 — Klickpin “Beautiful growth mindset ideas…” (5.85 s): DONRICO beverage/product experience

**Observed:** A strong electric-blue product hero, overscale uppercase display words behind a central product bottle, floating sliced fruit accents, tiny editorial labels, and a row of accordion-like informational links. Rapid horizontal/state changes introduce warm terracotta and green/turquoise color worlds, swap the hero bottle/color story, and update the large background word. The product object remains a consistent focal point while panels and colors shift; lower content peeks into the hero.

**Reusable principle:** product-led scene changes organized around a continuously dominant visual anchor. Build as well-composed slide states with coordinated GSAP timelines (headline, backdrop, hero asset, decorative pieces, sidebar content). Consider Three.js only if bottle needs interactive real-time rotation or depth; static high-quality cutouts with 2D GSAP may match observed effects more efficiently.

## 2 — Klickpin “Aesthetic Wedding DIY Ideas…” (15 s): ZUBOR architecture/nature experience

**Observed:** Full-bleed illustrated/CGI environmental scenes: blue mountain sky, modern glass residence, fog/cloud geometry, pine landscape, green slopes and wildlife. Large clean text overlays and small refined navigation. Scene changes replace whole environments and shift atmospheric colors from blue into near-black/forest green. A dark section with three-column numbered feature blocks changes focus/active color; another light-blue customer story scene reveals a floating testimonial card; a snowy red-house environment supports a search form.

**Reusable principle:** immersive environmental storytelling plus readable layered UI. Treat the website as a succession of visual worlds, not a pile of generic sections. Use art-directed scenes, poster imagery, or 3D based on user interaction needs, with carefully mapped transitions and readable text. Three.js is plausible but not provable from the recording.

## 3 — Klickpin “Smart sewing room tips…” (46.14 s): NORTH editorial architecture/hospitality experience

**Observed:** A striking typographic prelude with a large serif NORTH wordmark on warm off-white, contrasted with a dark cinematic building/mountain environment. Large black/white editorial headlines, bold asymmetry, full-screen architecture photography, narrow utility labels and a high-contrast chartreuse/yellow accent. Transitions swap between expansive dark visuals, architectural image backdrops, light editorial info panels, a vivid yellow typography screen, statistics in minimal columns, and a compact side navigation/menu overlay.

**Reusable principle:** editorial precision and carefully paced high-contrast scene alternation. Avoid visual clutter. Use CSS typography, photography, layer transitions, and selective GSAP pin/reveal choreography. Three.js is not required to reproduce most observable compositions.

## 4 — Instagram “snapinsta-1792170657726(1)” (46.72 s): Wepink website showcase

**Observed:** A creator-led video cuts to a website sequence shown within a pink creator-branded presentation frame. Visible site designs include oversized lifestyle/product imagery, expressive product photography, large bold pink/black type, pink-to-white section shifts, product listing/cards, editorial campaign treatment and bright CTA surfaces. The frame and creator name are video-edit embellishments, not site UI.

**Reusable principle:** confident single-brand maximalism and photo/product direction; clearly separate promotional presentation graphics from website implementation. The recording is a montage; exact scroll/hover interactions cannot be established.

## 5 — Instagram “snapinsta-1792170679139(1)” (33.36 s): dark banking/fintech showcase

**Observed:** A creator-led cut to a dark navy/black financial-product concept with amber/yellow accents, compact fintech interface visualizations, product/card renders, visual chaptering, centered typography, progressive cards/steps and final offer/CTA compositions. Presentation margins and developer labels belong to the video edit.

**Reusable principle:** restrained dark surfaces with one strong luminous accent, cinematic product renders, deliberate sequencing of information, and motion-driven progression. Protect legibility and trust; don't make core financial data vague for style.

## 6 — Instagram “snapinsta-1792170795446(1)” (43.63 s): politician/public-figure website shown on a monitor

**Observed:** The creator records a monitor displaying political/public-figure site concepts: bold saturated blue blocks, bright orange/yellow/teal graphic ribbons or chevrons, image cutouts and strong editorial framing, campaign/personal branding headline, prominent media sections and an “in the press” area. A number of frames show work in a design/editor interface as well as website previews.

**Reusable principle:** large geometric graphic motifs, strong visual identity, photo cutouts, crisp modular information architecture, and campaign-style hierarchy. Do not copy public figure branding or infer working interactions from screen filming.

## 7 — Instagram “snapinsta-1792170920573(1)” (24.59 s): multi-project portfolio/site showcase

**Observed:** Creator footage followed by a montage of multiple different websites: orange/white payment-card brand composition with oversized typography, a highly saturated multicolor gaming/sweepstakes-style product presentation featuring screen mockups and overlapping arcs, and a green-black payments/service design with minimal modular cards. The orange, multicolor and green scenes are distinct projects, not necessarily sections of one website.

**Reusable principle:** design the motion and visual language per individual brand; motion motifs can be different for orange-finance, vivid-product and green-tech projects. Do not force every site into the same look. A video montage does not prove the underlying 3D or GSAP library.

## Cross-video synthesis: what to extract

1. **A strong visual anchor:** product packshot, a house, expressive type, a photograph, or brand-specific geometry.
2. **A planned sequence:** scene changes, not generic stock layouts.
3. **Type as graphic material:** large display text, layered with photography/products and complementary tiny system labels.
4. **Distinct worlds:** strong palettes, dark/light resets, shifts in background and mood.
5. **Intentional visual hierarchy:** big visual gesture; calm, readable product information and CTA near it.
6. **Media quality:** well-lit subject, compositing, masking, image treatment, and premium craft.
7. **Interaction with purpose:** transitions explain options, move the story forward, or enrich exploration.
8. **Brand-dependent aesthetics:** loud consumer brands and quiet architecture brands do not use identical UI.

## Evidence limitations

Samples were inspected from recorded MP4 frames, not live interactive websites. Exact fonts, color values, responsiveness, source libraries, scroll easing curves, WebGL usage, and live behavior cannot be reliably established from compressed screen recordings. Do not market assumptions as verified reverse-engineering.
