# Nutritional-App

FYP project.

---

# NutriGoal AI

A mobile-first React frontend and Figma wireframe handoff for a goal-driven nutrition application. Includes a desktop presentation studio with direct navigation to every screen.

## Run locally

Requires Node.js 20.19+ or 22.12+ (tested on Node 24).

```sh
npm ci
npm run dev
```

Open the address printed by Vite in your local development environment. To produce a deployable static site:

```sh
npm run build
npm run preview
```

Deploy the `dist` directory to a static host. No backend configuration or API keys are needed. External Google Fonts are optional; system sans-serif fonts are the fallback.

## Bring the wireframes into Figma

Use `downloads/NutriGoal-Figma-Wireframes-v2.zip` for the corrected export. The original combined board used namespace-prefixed nested SVGs that some importers skipped. Version 2 uses one SVG root, ordinary groups, explicit transforms and resolved icon colours.

1. Unzip the wireframe archive, or open the `wireframes` directory.
2. Drag the `.svg` files into a Figma design file (desktop or browser).
3. Select each screen and place it in its own frame. Arrange related screens side by side.
4. Add your own Figma prototype connections between frames.

For a modified state, navigate to it in the running frontend, then select **Export screen to Figma** above the phone. The export contains native SVG shapes, icons and text rather than an HTML `foreignObject` or a flattened screenshot. Inputs are exported with their current values. SVG import is a static handoff: it does not create Figma components, constraints, Auto Layout or functioning interactions. Figma may convert SVG text into vector outlines. Shadows, emoji, gradients and other browser effects can differ or simplify. No live Figma integration is required or claimed.

The supplied SVGs include main screens, every onboarding step, account forms, scan results and the logging menu. PNG previews are included for visual reference.

## Prototype capabilities

- Welcome, mock sign-up/sign-in and five-step onboarding.
- Live dashboard totals, adjustable energy and macro targets.
- Diary meal categories, food search, portion editing, deletion, copying and favourites.
- Barcode sample recognition and editable AI sample review with ingredient removal.
- Recipe discovery, filtering, saved recipes, details and custom recipe creation.
- Suggestions, sample charts with inspectable bars, daily and longer-term views.
- Profile, dietary preferences, allergy notes, notification toggle and JSON data export.
- Free/Premium demo switching, paywall and simulated upgrade.
- Browser local storage for demo foods, recipes, preferences, targets and subscription state.

## Deliberate simulation boundaries

All people, nutrient calculations, scan results, trend data and prices are illustrative. Today’s dashboard and diary totals are computed from the actual demo entries. Other chart periods use fixed sample data. Date navigation demonstrates an empty earlier diary; this is not a real historical database. The welcome screen provides direct access without entering an account.

Authentication, social sign-in, camera access, barcode lookup, AI recognition, billing, notifications and account deletion are not connected to external services. Photo upload triggers the sample recognition result, not image analysis. Recipe ingredient calories use a labelled placeholder calculation. Preferences and allergy notes can be edited, but suggestions are not clinically or allergy validated. Do not enter sensitive information. No password is persisted.

## Files

- `src/main.jsx`: screen components, sample data, interactions and browser persistence.
- `src/style.css`: mobile interface and desktop presentation studio.
- `src/export.js`: native SVG export with text line measurement.
- `wireframes/`: pre-exported Figma import assets and previews.

## Validation

Production build passed. Headless Chromium verified logging and totals, reload persistence, portion replacement, barcode sample logging, AI ingredient removal, free-to-premium flow, recipe creation, onboarding and mock account validation. All principal screen SVGs parsed successfully as XML and contain native text without `foreignObject`. A 390 px mobile viewport was checked for horizontal overflow. No browser runtime errors occurred in those flows.

SVG files were also rendered in Chromium for visual inspection. Import inside Figma itself has not been verified. The corrected exports have structural regression checks (`python3 -m unittest discover -s tests`) to reject nested SVG viewports, namespace-prefixed tags, unresolved icon colours and missing screen groups.

`wireframes/All-Screens-Reference.png` is a flattened reference image that can also be dragged into Figma. It preserves the layout but is not editable as vector layers. To rebuild the vector board after exporting screens, run `python3 scripts/prepare-wireframes.py`.

## Download packages

- [Frontend source ZIP](downloads/NutriGoal-Frontend.zip)
- [Corrected Figma wireframes ZIP — v2](downloads/NutriGoal-Figma-Wireframes-v2.zip)

Open a ZIP on GitHub and select **Download raw file** to download it. Alternatively, select **Code → Download ZIP** from the repository homepage.
