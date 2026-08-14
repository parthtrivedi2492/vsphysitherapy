# VS Physio & Rehab — Image Generation Prompts

Ready-to-paste prompts for Gemini. Every prompt maps to a real image slot on
the site, with the exact filename and aspect ratio the CSS expects.

**Clinic:** VS Physiotherapy & Rehabilitation Centre
**Address:** 5160 Explorer Dr, Unit 9, Mississauga, ON
**Services:** Physiotherapy · Chiropractic · Massage Therapy · Naturopathy · Acupuncture
**Tagline:** Move Better. Live Better.

---

## Current gap

The site reuses **6 photos across 14 slots**. The worst offenders:

| Photo | Used | Problem |
|---|---|---|
| `photo_clinic_interior.png` | 4x | Also standing in for **naturopathy** |
| `photo_manual_therapy.png` | 3x | Hero + service card + services page |
| `photo_sports_rehab.png` | 2x | Used as a generic "why here" image |

Priority 1 and 2 below fix the duplicates. Everything else is polish.

---

## How to use

1. Copy the **Style Block**.
2. Paste it, then the **Scene** for the image you want.
3. Set the **aspect ratio** listed — this matters more than resolution, because
   the CSS crops with `object-fit: cover` and a wrong ratio cuts off heads.
4. Save with the exact **filename** into `vs_physio_design_assets/`.
5. Files marked *(replaces existing)* need no code change. Files marked **NEW**
   need a one-line `src` swap — noted per image.

---

## Style Block — prepend to EVERY prompt

```
Editorial healthcare photography for a brand-new physiotherapy and
rehabilitation clinic in Mississauga, Ontario, Canada. Natural window light,
soft and diffused, no harsh shadows. Warm neutral colour grading on a
sage-green and cream palette: muted sage greens (#4F6F58, #6B8F74, #A3BEAA),
warm off-white (#FAF7F0), soft sand beige (#E8DECD), with a single warm
terracotta accent (#C0724A). Shot on a full-frame camera with a 50mm lens at
f/2.0, shallow but not extreme depth of field. Calm, unhurried, documentary
feel - candid rather than posed stock photography. Clean uncluttered
composition with generous negative space. The space is brand new: pristine
equipment, fresh paint, nothing worn or dated. Photorealistic, high detail,
professional colour grading, subtle film grain.
```

## Negative prompt

```
no text, no lettering, no logos, no watermarks, no signage, no captions,
no distorted hands, no extra fingers, no malformed limbs, no uncanny faces,
no plastic AI skin, no oversaturated colours, no blue or teal clinical tint,
no cold fluorescent hospital lighting, no cluttered background, no medical gore,
no exposed injuries, no stock-photo grins, no thumbs up, no crossed arms,
not a spa, no candles, no hot stones, no flower petals, no worn equipment
```

---

## Casting

The clinic is in Mississauga. Patients should reflect the actual local
population: predominantly South Asian, plus Black, East Asian, White and Latin
American, across a wide age range. This is the single biggest signal that the
site is local rather than generic stock.

**Do not generate faces for named practitioners.** See the note at the bottom.

---

# PRIORITY 1 — Naturopathy

The one service with no image at all. It currently borrows the clinic interior
shot, which tells the visitor nothing.

**Slot:** `.split__fig img` in `#naturopathy` on [services.html](services.html)
**Aspect ratio:** `4:3.4` landscape — **1600 x 1360 px**

### `photo_naturopathy.png` — **NEW**
```
A naturopathic practitioner in a sage-green clinical top sitting across a warm
oak desk from a patient in a bright consultation room, mid-conversation. On the
desk: a glass of water, a small potted herb, a notebook and a few unlabelled
amber glass bottles. Both fully clothed, relaxed, engaged body language. Soft
window light from the left, plants in the softly blurred background.
Horizontal composition. No readable text on any label.
```
**To use:** in [services.html](services.html), change the `#naturopathy` image
`src` from `photo_clinic_interior.png` to `photo_naturopathy.png`.

---

# PRIORITY 2 — Stop the hero and service card being identical

`photo_manual_therapy.png` appears three times, including twice on the home page
within one scroll of each other.

**Slot:** `.hero__figure > img` on [index.html](index.html)
**Aspect ratio:** `1:1.18` portrait — **1200 x 1416 px**
**Note:** rendered inside a tall arch on desktop. Keep subjects centred with
generous headroom or the arch will crop faces.

### `hero_clinic_welcome.png` — **NEW**
```
A physiotherapist in a sage-green clinical polo standing in a bright, brand-new
treatment room, mid-conversation with a seated patient, gesturing toward an
anatomical spine model on the counter. Neither looks at the camera. Pristine
treatment table with sage-green linens, large window with sheer curtains, warm
oak flooring, a potted monstera. Vertical portrait orientation with generous
space above their heads. Candid documentary moment.
```
**To use:** in [index.html](index.html), change the hero image `src` to
`hero_clinic_welcome.png`. Keep `photo_manual_therapy.png` for the service card.

---

# PRIORITY 3 — Service photos

**Slot:** `.tile--photo img` on [index.html](index.html) and `.split__fig img`
on [services.html](services.html)
**Aspect ratio:** `4:3.4` landscape — **1600 x 1360 px**
**Note:** on the home page these sit under a dark gradient with white text over
the bottom third. Keep the lower third visually simple.

### `photo_manual_therapy.png` *(replaces existing)*
```
Close-up of a physiotherapist's hands performing manual therapy on a patient's
upper back, the patient lying face down on a treatment table with a sage-green
towel. Hands anatomically correct with clean short nails. Warm side light from
a window. Shallow depth of field, focus on the hands. Horizontal composition,
calm uncluttered background in the lower third.
```

### `photo_chiropractic_care.png` *(replaces existing)*
```
A chiropractor assessing the spine of a seated patient, hands positioned
professionally along the patient's upper back. Both calm and focused, neither
looking at the camera. Brand-new treatment room with an adjustment table, warm
wood accents and a sage-green wall. Horizontal composition, natural window
light from the left.
```

### `photo_massage_therapy.png` *(replaces existing)*
```
A massage therapist performing therapeutic deep tissue massage on a patient's
upper back, the patient lying face down and draped modestly with cream and
sage-green linens. Clinical and professional rather than spa-like: no candles,
no stones, no petals. Warm treatment room, soft window light. Horizontal
composition, hands clearly visible and correctly formed.
```

### `photo_acupuncture_care.png` *(replaces existing)*
```
Close-up of fine acupuncture needles placed along a patient's relaxed shoulder
and upper trapezius, the patient lying face down on a treatment table with a
sage-green towel. Clean, calm, clinical. No blood, no wounds, no distress.
Shallow depth of field, soft warm light. Horizontal composition, minimal
uncluttered background.
```

### `photo_sports_rehab.png` *(replaces existing)*
```
A patient in athletic wear performing a single-leg squat while a physiotherapist
crouches beside them observing knee alignment. Brand-new rehab equipment, tidy
and unworn: resistance bands, dumbbells on a rack, an exercise mat. Bright room
with a large window and a sage-green accent wall. Horizontal composition,
active candid moment.
```

---

# PRIORITY 4 — Clinic environment

### `photo_clinic_interior.png` *(replaces existing)* — `4:3.4`, 1600 x 1360
```
Wide interior of a brand-new physiotherapy clinic: two pristine treatment tables
with sage-green linens, warm oak flooring, large windows with sheer curtains,
potted plants, cream walls with one sage-green accent wall. Empty of people,
immaculately tidy, warm morning light. Architectural interior photography,
straight-on composition, calm and inviting.
```

### `photo_clinic_reception.png` — **NEW**, portrait `1:1.15`, 1200 x 1380
```
Reception area of a brand-new boutique physiotherapy clinic: warm oak front
desk, cream and sage-green colour scheme, a large monstera plant, comfortable
linen waiting chairs, soft pendant lighting, a window. Empty of people, warm
and welcoming, no signage or readable text anywhere. Vertical portrait
orientation, architectural interior photography.
```
**To use:** on [about.html](about.html) for the `#clinic` arch slot, or on
[index.html](index.html) for the "Why here" arch slot.

### `photo_clinic_gym.png` — **NEW**, `4:3.4`, 1600 x 1360
```
Small rehabilitation gym inside a brand-new physiotherapy clinic: an exercise
mat area, a rack of dumbbells, resistance bands, a stability ball and a wall
mirror. Warm oak flooring, sage-green accent wall, large windows with natural
light. Empty of people, clean and organised, not a commercial big-box gym.
Horizontal composition.
```

---

# PRIORITY 5 — Social sharing card

**Slot:** `og:image` meta tag · **Aspect ratio:** `1.91:1` — **1200 x 630 px**

### `og_share_card.png` — **NEW**
```
Wide banner composition of a calm, brand-new physiotherapy clinic interior,
sage green and warm cream palette, treatment table with sage linens on the
right, large window with soft morning light on the left, potted plants. Empty
of people and completely free of text or logos, with generous clean negative
space in the left half for a headline to be added later. Horizontal 1.91:1
banner crop.
```
**To use:** in [index.html](index.html), update
`<meta property="og:image" content="vs_physio_design_assets/og_share_card.png">`

---

# OPTIONAL — Grand opening

For the `#opening` section on [index.html](index.html), if you want something
warmer than the clinic interior. `4:3.4`, 1600 x 1360.

### `photo_opening_ribbon.png` — **NEW**
```
A ribbon-cutting moment at the entrance of a brand-new health clinic: a wide
sage-green ribbon stretched across a glass doorway, hands holding oversized
scissors mid-cut, a small warm crowd of family and neighbours blurred in the
background. Late afternoon golden light. Celebratory but understated.
Horizontal composition, no readable signage or text.
```

---

# After generating — checklist

- [ ] **Filenames match exactly** (case-sensitive on most hosts).
- [ ] **Check hands.** AI still mangles fingers, and most of these images are
      about hands. Regenerate rather than ship a six-fingered therapist.
- [ ] **Check for invented text.** Any garbled lettering on labels, screens or
      clothing must be regenerated — it instantly reads as AI.
- [ ] **Convert to WebP.** These currently ship as PNG, the heaviest possible
      format for photographs:
      ```
      npx @squoosh/cli --webp auto vs_physio_design_assets/*.png
      ```
      Target under 250 KB each, then update the `src` to `.webp`.
- [ ] **Re-check crops** at 390px, 768px and 1440px. The hero arch and the
      bento tiles crop aggressively.
- [ ] **Update `alt` text** if a scene differs from the current description.

# Legal / ethical notes

- **Do not put AI-generated faces to named practitioners.** The site names real
  people (Vivek and Sweni). Presenting a synthetic face as a named, registered
  clinician is misleading and, for a regulated health profession in Ontario, an
  advertising-standards risk. A half-hour real photoshoot solves this
  permanently and will look better.
- Treatment scenes with anonymous AI patients are fine, but avoid implying a
  specific medical outcome.
- Get written consent before publishing photos of real patients or staff.
- Since the clinic is brand new, avoid any imagery implying a long history
  (worn equipment, "established" styling, crowded waiting rooms).
