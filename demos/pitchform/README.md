# PitchForm portfolio demo

Adapted from Eselin1/PitchForm. Uses the actual client UI with fictional workouts and soccer activities generated relative to the current date. Session storage uses a portfolio-specific key. WHOOP connections and service worker registration are disabled. The Reset demo button restores the sample dataset.

Rebuild from this directory with `npm ci && npm run build`, then copy `dist/` into `../../public/demos/pitchform/`. Keep `icon.svg` in that output directory. The main portfolio build serves the checked-in demo assets without extra installation.
