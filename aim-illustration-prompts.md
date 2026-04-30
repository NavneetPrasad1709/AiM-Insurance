# AIM Insurance — Final Illustration Set

**12 prompts mapped 1:1 to actual sections on your live home page.**

Each prompt produces one PNG. Drop it into `public/brand/illustrations/` with the
exact filename listed. Once all 12 are in, I wire them into the matching component
and delete the old webp/SVG decorations they replace.

---

## Brand reference (locks every prompt)

- **Style**: **premium 3D character render** — Cinema 4D + Octane / Redshift render quality. Reference: **Klarna app illustrations**, **Apple Vision Pro / Apple Memoji-grade rendering** (more adult), **Spline 3D characters**, **Notion's recent chunky 3D objects**, **Walmart+ 3D promos**. Modeled forms with subtle materials (fabric, soft skin SSS, glossy car), cinematic lighting, depth and dimension. **NOT flat 2D vector**, **NOT Plasticine**, **NOT claymation**, **NOT cartoonish/childish toy renders**. Think **adult premium 3D illustration**, the kind a Series-A SaaS uses on its hero.
- **Lighting**: cinematic warm sunset light from upper-left through the windshield. Golden rim light on hair/shoulder, soft ambient orange on the left, cool charcoal shadow on the right. Subtle subsurface scattering on skin. NOT a flat Photoshop halo glow.
- **Color palette**: yellow `#FFC83D`, coral `#FF8C42`, mint `#4FE0B0`, cream `#F5E6C8`, warm peach skin tones, charcoal `#1A1A1F`. **Avoid navy / dark blue / deep purple** — invisible on the black site.
- **Speech bubble** — keep it. Matches legacy mascot art. Rounded cream interior, 2px charcoal outline, small tail. Inside text in 3 short lines max: dollar amounts in mint `#4FE0B0`, the word **AiM** in yellow `#FFC83D`, rest charcoal. Nano Banana handles short bubble text reasonably well — regen 3–5 times for clean rendering.
- **Background**: pure transparent PNG outside a warm radial halo. The halo is `#FF8C42` orange in center → `#FFC83D` yellow ring → fading to transparent. Halo is what makes the character pop on `#0A0A0A`. No scenery, no scenery clutter.
- **Frame shape**: do **NOT** worry about the organic arch/wave shape your legacy mascots had. Generate **square 1:1 PNG** — I will mask the silhouette to an arch/blob shape via CSS `clip-path` in code so all 12 illustrations share the same custom frame.
- **Hands**: render fully — both hands wrapped naturally on the steering wheel, fingers properly modeled. If first 2 generations have melted hands, add `hands carefully modeled, fingers wrapped naturally on wheel rim, anatomically correct, no extra fingers` to the prompt.
- **Universal negative**: `no flat 2D vector illustration, no cartoon outline drawing, no childish proportions, no toy-like, no Plasticine, no claymation, no Lego, no Funko Pop, no Memoji-cute, no AI uncanny, no melted hands, no extra fingers, no garbled text, no navy or dark blue, no logo, no watermark, no border frame, no busy dashboard knobs, no scenery clutter, no oversaturated neon.`

> **Gemini Nano Banana workflow**:
> 1. Generate prompt #1 four to six times, pick the best. The render quality varies wildly per seed — do not give up after 1–2 tries.
> 2. Once prompt #1 looks premium, **attach that image as a reference** in prompts #2, #11, #12 so the cast shares identical face modeling + materials + lighting.
> 3. For icon prompts (#4–#8): paste them all in one Gemini message and ask for them as a set so scale/lighting/material match.

---

## 1. Hero mascot — RICH HERO COMPOSITION (v3)

**File:** `hero-driver.png` · **Aspect:** **4:3 landscape** (wider than tall — fills the hero column properly and gives room for supporting story elements) · **Slot:** Hero right column · **Bg:** solid `#0A0A0A` pitch black (matches site bg, image floats seamlessly).

This hero illustration carries the WHOLE pitch in one frame: the client, the savings number, the risk-free guarantee, the carrier-comparison story, and the live-concierge feel. Multiple confidently-arranged elements — not a single bare character.

```
Premium 3D editorial hero illustration, Cinema 4D + Octane / Redshift render quality.
Reference style: Klarna app graphics, Stripe.com hero scenes, Apple Vision Pro promo
shots, modern Series-A SaaS hero illustration. Adult premium 3D — confident commercial
illustration. Never childish, never Pixar-baby, never Funko, never Plasticine, never
flat 2D.

CENTRAL SUBJECT (occupying the LEFT 50% of the canvas):
A stylized woman in her late 20s, mixed warm-toned skin with subsurface scattering,
dark brown hair tied back in a low neat ponytail with visible volumetric strands
catching the rim light, calm confident closed-mouth smile, modeled almond eyes with
gentle iris highlight (not flat anime, not creepy realistic). She wears a #FFC83D
yellow zip hoodie over a cream tee — subtle fabric weave texture. She sits at the
wheel of a stylized modern sedan, three-quarter front view. Both hands wrap naturally
around the steering wheel rim — fingers carefully modeled, four fingers and a thumb
each, no melting, no extra digits. Car interior is clean charcoal #1A1A1F, simple
round wheel, no busy knobs. Cinematic warm sunset rim light from the upper-left
through the windshield: golden glow on her hair and left shoulder, soft warm orange
ambient on the left, cool charcoal shadow on the right, subtle dashboard bounce. A
soft warm radial halo behind her head — center #FF8C42 coral-orange, mid #FFC83D
yellow, fading to pitch black.

SUPPORTING UI ELEMENTS (occupying the RIGHT 50% of the canvas, arranged confidently):

(1) PRIMARY SAVINGS CARD — large rounded #F5E6C8 cream rectangle with 2px charcoal
#1A1A1F outline and soft drop shadow, subtle 3D depth. Stacked content inside:
   • tiny uppercase charcoal label "AIM SAVINGS" letter-spaced
   • bold mint-green #4FE0B0 huge numeral "$1,247/yr"
   • small charcoal subtitle "same coverage"
   • a small mint check seal in the upper-right corner
This card is the visual anchor of the right side, slightly tilted toward the driver.

(2) SPEECH BUBBLE — smaller rounded cream bubble with charcoal outline + small tail
pointing to her mouth. Two short lines: "Same coverage," "way less cost!" in charcoal.
Keep it short (no dollar amounts duplicated here). Positioned above her right
shoulder.

(3) CARRIER-COMPARISON CHIPS — three small rounded charcoal pill shapes in a gentle
arc above the savings card, each with abstract non-readable typography (suggesting
carrier brand names without resembling any real brand). Leading chip has a tiny mint
checkmark badge.

(4) RISK-FREE SHIELD — translucent mint-green #4FE0B0 shield emblem with a soft "$0"
in its center (charcoal), floating above and slightly behind the savings card,
gently glowing.

(5) FLOATING COINS — five to seven small soft-edged 3D gold coins drifting in a
gentle arc from the bottom-right toward the driver, soft cast shadows under each,
suggesting incoming savings.

(6) LIVE-CONCIERGE PILL — tiny rounded charcoal pill near the bottom-right with a
mint pulsing dot and the abstract label "LIVE · DAY 4" in tiny charcoal text.

LIGHTING: unified cinematic — same warm sunset key from upper-left across all
elements. Every floating object casts a soft consistent shadow on a virtual ground
plane. Materials feel modeled: matte plastic on the chips, glossy mint on the
shield, brushed gold on the coins, subtle paper texture on the savings card.

BACKGROUND: solid pitch-black #0A0A0A everywhere except the warm halo behind the
driver. No scenery, no horizon, no road, no buildings, no clutter. Will be placed
on a #0A0A0A site so the bg blends seamlessly.

COMPOSITION: 4:3 landscape, driver+car LEFT 50%, supporting UI elements RIGHT 50%
in a confidently asymmetric arrangement. Generous breathing room — elements aren't
crammed, they hover in considered positions. The savings card "$1,247/yr" is the
most prominent secondary element after the driver.

QUALITY: award-winning Behance 3D illustration grade, considered restrained color,
high-end commercial 3D, premium SaaS hero. Cinematic depth and dimension.

Negative: no flat 2D vector, no cartoon outline drawing, no childish toy proportions,
no Funko Pop, no Lego, no Plasticine, no claymation, no Memoji-cute, no Pixar baby
face, no AI uncanny face, no melted hands, no extra fingers, no warped face, no
garbled paragraph text in the savings card or speech bubble, no real brand logos
(no Tesla, no BMW, no GEICO, no Allstate visible), no scenery, no road, no horizon,
no buildings, no busy dashboard, no navy or dark blue colors, no logo or watermark
on the canvas, no border frame, no oversaturated neon glow.
```

**Generation tips for this richer composition:**
- This prompt has 6 elements — Gemini varies a lot per seed. **Regenerate 6–8 times**, the best one usually appears in attempt 4–7. Do not give up after 1–2 tries.
- If elements feel cramped, append `, generous negative space, considered minimal arrangement, breathable composition`.
- If the savings card text is garbled (`$1,247/yr`), regen — short numerics usually clean up by attempt 4. If it never lands, drop the card text by adding `omit text from the savings card, leave the card area visually clean for typesetting in code` and I'll typeset over it.
- If hands are melted, append `hands carefully modeled, fingers wrapped naturally on the steering-wheel rim, anatomically correct, no extra fingers`.
- If the right side feels chaotic, drop element (3) or (6) by adding `omit the carrier chips` or `omit the live pill`.
- If face looks childish, append `face modeled with subtle realistic proportions, professional adult character, never cute, never babyish`.
- If the result still looks 2D, prepend `Award-winning Behance 3D illustration, Cinema 4D + Octane render, dimensional 3D form with proper depth and modeled materials,`.

---

## 2. Pain section character

**File:** `pain-overpay.png` · **Aspect:** 1:1 · **Slot:** Pain Stats section, right column (replaces `<CoinStack />` decorative SVG)

```
A soft 3D cartoon illustration of a worried young person in a #FFC83D yellow hoodie
sitting at a small charcoal round table holding a large cream-colored insurance bill
in both hands, eyes wide, tiny "o" mouth shape showing surprise, dark brown hair.
Three tiny gold coins drift upward away from them — money escaping. A bold red
upward arrow rises from the bill. Warm yellow sunset glow halo behind them. Bold
chunky dark cartoon outlines. Upper-right of canvas: a rounded cartoon speech bubble
with thick charcoal outline and cream interior. Inside the bubble: "Wait — am I
overpaying $2,000 a year?!" The $2,000 in red, rest charcoal. Soft cast shadow
under the chair. Pure transparent background; halo fades to black at edges. No
watermark, no logo, no navy blue.
```

---

## 3. Carrier savings comparison

**File:** `savings-comparison.png` · **Aspect:** 1:1 · **Replaces:** `savings-comparison.webp` · **Slot:** Carrier Savings section, right column

```
A soft 3D cartoon illustration showing two cars on a curved continuous mint-green
#4FE0B0 ribbon road that snakes from top-right to bottom-left. Top-right: a stylized
red premium sedan parked on a small charcoal podium with a faded city skyline
silhouette behind it, a small cream "BEFORE" rounded label tag beside it with charcoal
text. Bottom-left: a stylized #FFC83D yellow modern sedan parked on a larger glowing
podium with warm orange sunset glow halo behind it, a small mint "AFTER" rounded
label tag beside it with charcoal text. The road is a bold mint ribbon with subtle
dashed line texture. Two floating cartoon labels along the road in cream rounded
tags with charcoal outlines: near top "Initial $5,362" in charcoal; near bottom
"Final $3,828 — saved $1,534 with AiM" with the dollar amounts in mint #4FE0B0 and
the word AiM in yellow #FFC83D. A tiny gold coin and a translucent mint shield float
between the two cars. Bold chunky dark cartoon outlines throughout. Soft cast shadows
under each vehicle. Pure transparent background. No watermark, no logo outside
labels, no navy blue.
```

---

## 4–8. Service icons (Services Grid — REALISTIC PHOTOGRAPHY)

These five are **photorealistic studio product photography** — not illustration.
Solid pitch-black `#0A0A0A` background (matches the site bg seamlessly, so the
subject appears to float on the dark site). Apple / Porsche / Tesla / Architectural
Digest catalog aesthetic. Hero 3/4 angle, dramatic warm sunset rim lighting, no
people, no logos, no scenery clutter.

**Shared style block** (already baked into each prompt below):
photorealistic, premium catalog product photography, hero 3/4 front angle, warm
sunset rim light from upper-left, cool charcoal ambient on right, solid pitch
black #0A0A0A studio background, soft cast shadow beneath subject, no people, no
brand logos / badges / license plates / tail numbers / dealer marks, no text, no
watermarks, no clutter, no extra vehicles or buildings in frame, no busy scenery.

**Generate as a set** — paste prompts 4–8 in one Gemini message and ask for them
all together so lighting / angle / scale / black bg match across the 5.

---

### 4. Car insurance

**File:** `service-car.png` · **Aspect:** 1:1 square · **Slot:** Services Grid card 1

```
Photorealistic studio product photograph of a sleek modern luxury electric sedan
in vivid mustard-yellow paint with subtle metallic flake — generic premium silhouette
similar to a Lucid Air or Polestar 2 fastback, but no recognizable brand markings,
no badges, no logos, no license plate. Hero 3/4 front angle, dramatic warm sunset
rim light from the upper-left catching the front fender, hood, and headlight,
cooler charcoal ambient shadow on the right side. Headlights softly glowing warm
yellow. Glossy clear-coat reflections subtly. Tires matte black. Sitting on
invisible reflective floor with a soft cast shadow beneath. Solid pitch-black
#0A0A0A studio background, no scenery beyond the shadow. Square 1:1, subject
occupies center 75% of frame. Apple / Porsche catalog photography aesthetic.
Negative: no brand logos, no badges, no license plate, no people, no other cars,
no garage, no road, no scenery clutter, no flash overexposure, no motion blur,
no AI uncanny details.
```

---

### 5. Home insurance

**File:** `service-home.png` · **Aspect:** 1:1 square · **Slot:** Services Grid card 2

```
Photorealistic architectural photograph of a single modern luxury single-family
home at twilight — clean horizontal lines, cream stucco upper level, warm cedar
wood lower level, large floor-to-ceiling windows with warm interior lights glowing
soft yellow through them, a covered front porch with one slim hanging pendant
light. Hero 3/4 front angle, warm sunset rim light catching the roof edge from the
upper-left, cool charcoal ambient on the right. Minimal landscaping — one small
sculpted shrub silhouette beside the entry, otherwise the ground fades to black.
Solid pitch-black #0A0A0A surrounding sky and ground, only the home is illuminated.
Square 1:1, home occupies center 70% of frame. Architectural Digest dusk-photo
aesthetic. Negative: no people, no cars in driveway, no street, no neighboring
houses, no busy gardens, no power lines, no signage, no logos, no flash overexposure,
no AI uncanny window distortions.
```

---

### 6. Boat insurance

**File:** `service-boat.png` · **Aspect:** 1:1 square · **Slot:** Services Grid card 3

```
Photorealistic product photograph of a sleek modern open-bow motorboat / center-
console runabout, generic premium silhouette, cream hull with a single mustard-
yellow waterline accent stripe, polished chrome rails, a low windshield. No brand
logos, no hull numbers. Hero 3/4 front-side angle, the boat appears to float
slightly above an invisible reflective surface. Dramatic warm sunset rim light
from the upper-left catching the bow and railing, cooler charcoal shadow on the
right. A subtle dark water reflection beneath, fading to black quickly. Solid
pitch-black #0A0A0A background, no horizon, no sky, no marina, no other boats.
Square 1:1, boat occupies center 70% of frame. Premium catalog photography aesthetic.
Negative: no brand logos, no flags with text, no people, no marina, no dock, no
horizon, no sky, no other boats, no busy water spray, no flash overexposure.
```

---

### 7. Yacht insurance

**File:** `service-yacht.png` · **Aspect:** 1:1 square · **Slot:** Services Grid card 4

```
Photorealistic product photograph of a sleek luxury cruising yacht (40-50 ft class
silhouette) with a clean cream hull, a single mustard-yellow waterline accent
stripe, polished chrome rails, two upper-deck sections, large tinted windows. No
brand markings, no hull numbers, no flags. Hero 3/4 front-side angle, the yacht
appears to float on an invisible mirror-still dark water surface with subtle
reflection. Dramatic warm sunset rim light from the upper-left wrapping the bow
and upper-deck edge, cooler charcoal ambient on the right side. Solid pitch-black
#0A0A0A background, no horizon, no sky, no marina, no other vessels. Square 1:1,
yacht occupies center 75% of frame. Premium catalog photography quality, Architectural
Digest sea-craft aesthetic. Negative: no brand logos, no flags with text, no people,
no marina, no dock, no horizon, no sky, no other yachts, no waves crashing, no
busy water spray, no flash overexposure.
```

---

### 8. Jet insurance

**File:** `service-jet.png` · **Aspect:** 1:1 square · **Slot:** Services Grid card 5

```
Photorealistic product photograph of a sleek modern private jet (mid-size business
jet silhouette, generic premium aircraft, no recognizable brand) with a clean cream
fuselage, a mustard-yellow tail and wingtip accent, two engines mounted at the rear,
large oval cabin windows. No brand markings, no tail number, no airline livery.
Hero 3/4 front angle, parked on an invisible reflective tarmac surface. Dramatic
warm sunset rim light from the upper-left catching the nose, fuselage top, and tail
tip, cooler charcoal shadow underneath the wing. Subtle soft cast shadow on the
ground beneath. Solid pitch-black #0A0A0A surrounding background, no sky, no other
aircraft, no airport buildings, no people, no luggage, no ground crew. Square 1:1,
jet occupies center 75% of frame. Premium catalog photography aesthetic. Negative:
no brand logos, no tail numbers, no airline names, no people, no airport scenery,
no clouds, no other aircraft, no flash overexposure, no AI uncanny window distortions.
```

---

**File map (for the photographic set):**

| File | Subject | Composition |
|---|---|---|
| `service-car.png` | Yellow electric sedan | Hero 3/4 front, no logos |
| `service-home.png` | Modern luxury home at dusk | Warm windows glowing |
| `service-boat.png` | Sleek motorboat | Hero 3/4 on dark water |
| `service-yacht.png` | Luxury cruising yacht | Hero 3/4 on mirror-still water |
| `service-jet.png` | Private business jet | Hero 3/4 on tarmac at sunset |

**Why these work on the dark site:** the solid `#0A0A0A` bg matches the site bg
exactly, so each photo will appear to *float* with no visible edge — you'll see
just the lit subject and its soft shadow on the dark site. No PNG transparency
needed; the bg literally is the site bg.

---

## 9. How-it-works journey

**File:** `journey-road.png` · **Aspect:** 16:9 landscape · **Slot:** How It Works section header (above the 6 sticky-stacked cards)

```
A soft 3D cartoon illustration of a winding mint-green #4FE0B0 ribbon road that
flows from bottom-left to top-right across the canvas, with six small charcoal
milestone markers along the route, each topped with a tiny different cartoon icon:
a folded document, a magnifying glass, a balanced scale, a shield with a dollar
symbol, a credit card, and a smiling face. A small #FFC83D yellow cartoon car drives
along the road near the lower-left, a translucent mint shield floats above it, tiny
gold coins orbit the shield. Warm yellow sunset glow halo softly along the road's
midpoint. Bold chunky dark cartoon outlines. Soft cast shadows beneath each marker
and the car. Pure transparent background outside the halo. Plenty of negative space
top and bottom for headlines. No text on markers, no logo, no navy blue.
```

---

## 10. Pricing $0 guarantee mascot

**File:** `guarantee-zero.png` · **Aspect:** 1:1 · **Slot:** Pricing section, $0 Risk-Free tier (replaces or sits beside the existing `<GuaranteeShield />` SVG)

```
A soft 3D cartoon illustration of a confident young woman in a #FFC83D yellow hoodie
standing behind an oversized translucent mint-green #4FE0B0 shield that has a bold
"$0" symbol embossed in its center in charcoal. Both her hands rest on the top edge
of the shield, warm friendly smile, dark brown hair, minimal facial features. A small
mint-green checkmark seal in the upper-right corner of the shield. Two tiny gold
coins float gently beside her shoulders. Warm yellow sunset glow halo behind her.
Bold chunky dark cartoon outlines. Upper-right of canvas: a rounded cartoon speech
bubble with thick charcoal outline and cream interior. Inside: "$0 if no savings —
that's our promise." The $0 in mint #4FE0B0, rest charcoal. Soft cast shadow under
her feet. Pure transparent background outside the halo. No watermark, no logo, no
navy blue.
```

---

## 11. Testimonial featured mascot

**File:** `testimonial-client.png` · **Aspect:** 1:1 portrait · **Replaces:** `character-driver-male.webp` · **Slot:** Testimonials featured block

```
A soft 3D cartoon illustration of a cheerful man in his early 30s sitting in the
driver seat of a stylized SUV, one hand on the wheel and the other giving a relaxed
thumbs-up, broad warm smile, friendly minimal facial features, short dark brown
hair. He wears a bright #FF8C42 coral-orange hoodie over a cream tee. Car interior
charcoal black, warm yellow morning light streams through the windshield from the
upper-right, creating a glowing halo around his head and shoulders. Bold chunky dark
cartoon outlines. Upper-right of canvas: a rounded cartoon speech bubble with thick
charcoal outline and cream interior, small tail pointing toward his mouth. Inside:
"Thanks to AiM, I saved $1,236 annually with the same reliable, safe coverage." The
$1,236 in mint #4FE0B0, the word AiM in yellow #FFC83D, rest charcoal. Soft cast
shadow under the seat. Pure transparent background outside the halo. No watermark,
no logo, no navy blue.
```

---

## 12. CTA banner family

**File:** `cta-family.png` · **Aspect:** 4:3 · **Slot:** Final CTA Banner section (the "Stop overpaying. Start saving today." moment)

```
A soft 3D cartoon illustration of a happy family of three (mother, father, child)
standing together beside a stylized #FFC83D yellow modern sedan parked on a small
podium. Mother in a coral hoodie, father in a yellow hoodie, child in cream — all
warm friendly cartoon characters with rounded shapes, minimal facial features, soft
brown hair. Warm orange-yellow sunset glow halo behind the group. Above the family
floats a translucent mint #4FE0B0 shield with a tiny dollar symbol on it, gently
glowing. Three tiny gold coins float gently around the family. Upper-right of canvas:
a rounded cartoon speech bubble with thick charcoal outline and cream interior.
Inside: "Same coverage. Lower premium. Forever — that's the AiM way." The phrase
"Lower premium" in mint #4FE0B0, the word AiM in yellow #FFC83D, rest charcoal.
Bold chunky dark cartoon outlines. Soft cast shadows under each figure and the car.
Pure transparent background outside the halo, halo fades to black at edges. Plenty
of negative space for a headline + CTA button overlay. No watermark, no logo, no
navy blue.
```

---

## Final filename → component map

Save all 12 PNGs into `D:/AIMinsurance/public/brand/illustrations/` with these exact names. Once they exist, I do the wiring.

| # | Filename | Component file | Replaces |
|---|---|---|---|
| 1 | `hero-driver.png` | `src/components/sections/hero.tsx` | `/brand/character-driver.webp` |
| 2 | `pain-overpay.png` | `src/components/sections/pain-stats.tsx` | `<CoinStack />` SVG decoration |
| 3 | `savings-comparison.png` | `src/components/sections/carrier-savings.tsx` | `/brand/savings-comparison.webp` |
| 4 | `service-car.png` | `src/components/sections/services-grid.tsx` | lucide `Car` icon (card 1) |
| 5 | `service-home.png` | `src/components/sections/services-grid.tsx` | lucide `Home` icon (card 2) |
| 6 | `service-boat.png` | `src/components/sections/services-grid.tsx` | lucide `Ship` icon (card 3) |
| 7 | `service-yacht.png` | `src/components/sections/services-grid.tsx` | lucide `Anchor` icon (card 4) |
| 8 | `service-jet.png` | `src/components/sections/services-grid.tsx` | lucide `Plane` icon (card 5) |
| 9 | `journey-road.png` | `src/components/sections/how-it-works.tsx` | (new — added above sticky stack) |
| 10 | `guarantee-zero.png` | `src/components/sections/pricing-section.tsx` | `<GuaranteeShield />` SVG |
| 11 | `testimonial-client.png` | `src/components/sections/testimonials.tsx` | `/brand/character-driver-male.webp` |
| 12 | `cta-family.png` | `src/components/sections/cta-banner.tsx` | (new — added beside CTA copy) |

---

## Workflow

1. Create folder: `D:/AIMinsurance/public/brand/illustrations/` (I'll do this when you say go).
2. Generate prompt #1 in Gemini → save as `hero-driver.png` in that folder.
3. Generate prompts #2, #11, #12 attaching #1 as reference (locks face/style).
4. Generate prompts #3, #9, #10 (new compositions, can use #1 as reference for line-weight consistency).
5. Generate prompts #4–#8 as a batch (paste all five together) for icon consistency.
6. Drop all 12 files into the folder.
7. Tell me "**files daal diye**" and I wire them in + delete old webp + remove now-unused SVG decorations.

---

## Sections that get NO illustration (intentional)

- **Trust Banner** — uses real BBB / Google / Newswire badges. Real third-party trust artifacts beat illustrated stand-ins.
- **Calculator Preview** — a code-built mock UI (Initial / After / Savings rows). Showing actual product UI > showing illustration of a calculator.
- **FAQ** — text-only accordion. No illustration needed.

These three stay as-is. Total illustration set = 12 PNGs.
