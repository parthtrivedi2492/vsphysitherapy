# VS Physiotherapy — Image Generation Prompts

Ready-to-paste prompts for Gemini (Nano Banana / Imagen). Every prompt maps to a
real image slot in the site.

---

## How to use

1. Copy the **Style Block** below.
2. Paste it, then paste the **Scene** text for the image you want.
3. Generate, download, and save with the exact **filename** listed.
4. Drop it into `vs_physio_design_assets/` (overwrite the placeholder).
5. No HTML changes needed for anything marked *(replaces existing)*.
   Items marked **NEW** need a one-line `src` swap — noted per image.

> **Aspect ratio matters more than resolution.** The CSS crops with
> `object-fit: cover`, so a wrong ratio means heads get cut off. Match the ratio
> listed for each slot.

---

## Style Block (prepend to EVERY prompt)

```
Editorial healthcare photography for a premium physiotherapy clinic in
Mississauga, Ontario, Canada. Natural window light, soft and diffused, no harsh
shadows. Warm neutral colour grading on a sage-green and cream palette:
muted sage greens (#4F6F58, #6B8F74, #A3BEAA), warm off-white (#FAF7F0),
soft sand beige (#E8DECD), with a single warm terracotta accent (#C0724A).
Shot on a full-frame camera with a 50mm lens at f/2.0, shallow but not extreme
depth of field. Calm, unhurried, documentary feel - candid rather than posed
stock photography. Clean uncluttered composition with generous negative space.
Photorealistic, high detail, professional colour grading, subtle film grain.
```

## Negative prompt (paste into the negative field, or append)

```
no text, no lettering, no logos, no watermarks, no signage, no captions,
no distorted hands, no extra fingers, no malformed limbs, no uncanny faces,
no plastic AI skin, no oversaturated colours, no blue or teal clinical tint,
no cold fluorescent hospital lighting, no cluttered background, no medical gore,
no exposed injuries, no needles entering visible wounds, no stock-photo grins,
no thumbs up, no crossed arms power poses, not a spa, no candles, no hot stones
```

---

## Casting & consistency notes

The clinic is in **Cooksville, Mississauga**. Patients should look like the
actual GTA: predominantly South Asian, plus Black, East Asian, White and Latin
American across a wide age range. This is not decoration - it is the single
biggest signal that the site is local rather than generic.

**There is one practitioner: Sweni Shah, Registered Physiotherapist.** She
appears in the hero, in her portrait, and in most treatment scenes, so keeping
her consistent across images matters more than anything else here.

| Person | Role | Description to reuse verbatim |
|---|---|---|
| Sweni Shah | Registered Physiotherapist, founder | South Asian woman, mid-to-late 30s, shoulder-length dark hair tied back, warm brown eyes, wearing a sage-green clinical polo or tunic |

> **Tip:** generate her portrait first, then attach it as a reference image for
> every scene she appears in. Without a reference, she will look like a
> different person in each photo and the site will read as stock imagery.

---

# PRIORITY 1 — Sweni's portrait

This is the single most important image on the site. It currently uses a
service photo as a stand-in.

**Slot:** `.split__fig--arch img` in the `#team` section of [about.html](about.html)
**Aspect ratio:** `1:1.15` (portrait) — **1200 x 1380 px**
**Note:** rendered inside a tall arch shape. Keep her centred with headroom, or
the arch will crop the top of her head.

### `team_sweni_shah.png`
```
Environmental portrait of a South Asian woman in her mid-to-late 30s,
shoulder-length dark hair tied back, warm brown eyes, wearing a sage-green
clinical polo shirt. She is standing in a bright physiotherapy clinic, leaning
lightly against a treatment table, arms relaxed at her sides. Warm, confident,
approachable expression looking directly at the camera. Softly blurred clinic
background with a plant and a window. Vertical portrait orientation, subject
centred, head and upper body in frame with generous headroom above.
```

### `team_sweni_working.png` — **NEW** (optional second portrait)
```
Candid three-quarter shot of the same South Asian female physiotherapist in a
sage-green clinical polo, mid-conversation with a patient just out of frame,
gesturing toward an anatomical spine model on the desk beside her. Natural
unposed moment, not looking at the camera. Bright clinic with warm oak surfaces
and a window. Vertical portrait orientation.
```
Use it on [about.html](about.html) if you want a second image of her in the
story section.

---

# PRIORITY 2 — Hero image

**Slot:** `.hero__figure > img` on [index.html](index.html)
**Aspect ratio:** `1:1.18` (portrait) — **1200 x 1416 px**
**Note:** rendered inside a tall arch shape on desktop. Keep the subject
centred and leave headroom, or the arch will crop faces.

### `hero_manual_therapy.png` *(replaces `photo_manual_therapy.png` in the hero)*
```
A South Asian female physiotherapist in a sage-green polo performing hands-on
manual therapy on the shoulder of a seated middle-aged South Asian male patient
in a grey t-shirt. Her hands are placed professionally on his shoulder blade,
both hands clearly visible and anatomically correct. They are mid-conversation,
he looks comfortable and slightly relieved. Bright modern clinic with a large
window, a potted plant, warm oak flooring and sage-green wall accents.
Vertical portrait orientation with generous space above their heads.
Documentary candid moment, neither person looking at the camera.
```

---

# PRIORITY 3 — Service photos

**Slot:** `.tile--photo img` on [index.html](index.html) and `.split__fig img`
on [services.html](services.html)
**Aspect ratio:** `4:3.4` landscape — **1600 x 1360 px**
**Note:** on the home page these sit inside bento tiles of varying heights and
crop hard, under a dark gradient with white text over the bottom third. Keep the
subject centred and the lower third visually simple.

### `photo_manual_therapy.png` *(replaces existing)*
```
Close-up of a physiotherapist's hands performing manual therapy on a patient's
upper back, patient lying face down on a treatment table with a sage-green
towel. Hands anatomically correct with clean short nails. Warm side light from a
window. Shallow depth of field, focus on the hands. Horizontal composition, calm
uncluttered background in the lower third of the frame.
```

### `photo_pelvic_health.png` *(replaces existing)*
```
A South Asian female physiotherapist in a sage-green polo sitting and talking
with a female patient in a private consultation room, an anatomical pelvis model
on the desk between them. Fully clothed, seated conversation, warm and
reassuring body language. Discreet, dignified, private setting with a closed
door and a plant. Horizontal composition, soft natural light.
```

### `photo_sports_rehab.png` *(replaces existing)*
```
A young South Asian male athlete in athletic wear performing a single-leg squat
on a turf lane in a rehabilitation gym, while a South Asian female
physiotherapist in a sage-green polo crouches beside him observing his knee
alignment. Rehab equipment visible but tidy: resistance bands, a squat rack,
medicine balls. Bright gym with large windows and sage-green accent walls.
Horizontal composition, active candid moment.
```

### `photo_acupuncture_care.png` *(replaces existing)*
```
Close-up of fine acupuncture needles placed along a patient's relaxed upper
shoulder and trapezius, patient lying face down on a treatment table with a
sage-green towel. Clean, clinical, calm. No blood, no wounds, no distress.
Shallow depth of field with soft warm light. Horizontal composition, minimal
uncluttered background.
```

### `photo_custom_orthotics.png` *(replaces existing)*
```
A clinician examining a custom orthotic insole held in both hands, with a 3D
foot scanning plate and a pair of running shoes on the bench beside them.
Patient's foot resting on the scanner in soft focus in the background. Warm
clinic bench with oak surface and sage-green accents. Horizontal composition,
detail-focused product-style photography.
```

### `photo_claims_admin.png` — **NEW**
```
A South Asian female physiotherapist in a sage-green polo seated at a warm oak
desk, talking with a patient across from her while working at a computer.
Paperwork and a clipboard on the desk, but no readable text anywhere. Welcoming,
helpful, unhurried atmosphere. Bright room with a plant and a sage-green wall.
Horizontal composition, natural light.
```
**To use it,** in [services.html](services.html) replace the image in the
`#claims` section, or add it to the MVA/WSIB tile on [index.html](index.html).

---

# PRIORITY 4 — Clinic environment

**Aspect ratio:** `4:3.4` landscape — **1600 x 1360 px**
(the arch variant on [about.html](about.html) uses `1:1.15` portrait — see below)

### `photo_clinic_interior.png` *(replaces existing)*
```
Wide interior of a modern physiotherapy clinic: two treatment tables with
sage-green linens, warm oak flooring, large windows with sheer curtains,
abundant potted plants, cream walls with one sage-green accent wall. Empty of
people, immaculately tidy, warm morning light streaming in. Architectural
interior photography, straight-on composition, calm and inviting.
```

### `photo_clinic_reception.png` — **NEW** (portrait `1:1.15`, 1200 x 1380 px)
```
Reception area of a boutique physiotherapy clinic: warm oak front desk, cream
and sage-green colour scheme, a large monstera plant, comfortable linen waiting
chairs, soft pendant lighting and a window. Empty of people, warm and welcoming,
no signage or readable text anywhere. Vertical portrait orientation,
architectural interior photography.
```
**Use it in** [about.html](about.html) for the `#clinic` arch slot, if you move
Sweni's portrait to the `#team` arch.

### `photo_clinic_gym.png` — **NEW**
```
Rehabilitation gym inside a physiotherapy clinic: a short artificial turf lane,
a squat rack, dumbbells on a tidy rack, resistance bands, an exercise bike and a
wall mirror. Warm oak flooring, sage-green accent wall, large windows with
natural light. Empty of people, clean and organised, not a commercial big-box
gym. Horizontal composition.
```

---

# PRIORITY 5 — Social sharing card

**Slot:** `og:image` meta tag
**Aspect ratio:** `1.91:1` — **1200 x 630 px**

### `og_share_card.png` — **NEW**
```
Wide banner composition of a calm modern physiotherapy clinic interior, sage
green and warm cream palette, treatment table with sage linens on the right,
large window with soft morning light on the left, potted plants. Empty of people
and completely free of text or logos, with generous clean negative space in the
left half for a headline to be added later. Horizontal 1.91:1 banner crop.
```
Then update in [index.html](index.html):
`<meta property="og:image" content="vs_physio_design_assets/og_share_card.png">`

---

# OPTIONAL — Seasonal GTA cards

The "We treat a GTA calendar" section currently uses icons only. Images would
make it far more distinctive, but need a layout change first. Generate these
only if you want that section reworked.

**Aspect ratio:** `4:3` — 1200 x 900 px

### `season_winter_shovel.png`
```
A person in a winter coat and toque pausing mid-shovel on a suburban Ontario
driveway on an overcast winter morning, one hand pressed to their lower back.
Wet heavy snow, a red-brick suburban house, bare maple trees. Muted desaturated
winter palette with warm skin tones. Documentary photography, horizontal.
```

### `season_spring_running.png`
```
A runner on a lakeside trail on a crisp spring morning, Lake Ontario visible on
one side and bare early-spring trees on the other, distant city skyline in haze.
Soft golden morning light, muted sage and grey-blue palette. Candid documentary
photography, horizontal.
```

### `season_summer_cricket.png`
```
A cricket bowler mid-delivery on a suburban park pitch on a bright summer
evening, other players blurred in the background, low golden sunlight. Warm
summer palette with long shadows. Candid documentary sports photography,
horizontal. No team logos or readable text on clothing.
```

### `season_commute_desk.png`
```
Over-the-shoulder view of a person at a home-office desk in the late afternoon,
rolling their neck and shoulder, laptop screen dimmed and unreadable. Warm
domestic light, plant on the desk, muted sage and cream palette. Candid
documentary photography, horizontal.
```

---

# After generating — checklist

- [ ] **Filenames match exactly** (case-sensitive on most web hosts).
- [ ] **Check hands.** AI still mangles fingers, and half these images are about
      hands. Regenerate rather than ship a six-fingered therapist.
- [ ] **Check for invented text.** Any garbled lettering on signage, screens or
      clothing must be regenerated - it instantly reads as AI.
- [ ] **Convert to WebP** and keep PNG as fallback. These are large photos and
      currently ship as PNG, which is the heaviest possible choice:
      ```
      npx @squoosh/cli --webp auto vs_physio_design_assets/*.png
      ```
      Target under 250 KB each. Then update `src` to `.webp`.
- [ ] **Re-check the crop** at 390px, 768px and 1440px. The hero arch and the
      bento tiles crop aggressively.
- [ ] **Update `alt` text** if a scene differs from what the current alt says.
      The alt attributes are already written and descriptive - keep them accurate.

# Legal / ethical notes

- **Sweni Shah is a real, named, registered physiotherapist.** Do not publish an
  AI-generated face under her name. The site identifies her as registered with
  the College of Physiotherapists of Ontario, and putting a synthetic face to a
  regulated clinician's credentials is misleading and a genuine
  advertising-standards risk in Ontario.
- Treat `team_sweni_shah.png` as a **placeholder until you have a real photo of
  her**. A single half-hour photoshoot solves this permanently and will look
  better than anything generated.
- The clinic interiors, gym, reception and seasonal images carry no such issue -
  generate those freely.
- For treatment scenes, AI patients are fine, but avoid implying a specific
  medical outcome.
- Get written consent before publishing photos of real patients.
