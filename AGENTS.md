## Cursor Cloud specific instructions

### Project overview

TripTune is a purely static front-end web app (vanilla HTML/CSS/JS, no framework, no build step, no dependencies). It is a Japanese-language travel destination quiz that recommends a destination based on mood-scored answers.

### Running the app

Serve the repo root with any static HTTP server:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/` in a browser.

### Known issue — HTML/JS ID mismatches

The JavaScript (`app.js`) references element IDs `picks-list`, `share-btn`, and `share-status`, but `index.html` uses different IDs (`selection-trail`, `share-native-btn`/`share-copy-btn`/`share-x-link`, and `share-feedback`). This causes `TypeError: Cannot read properties of null` at page load, which breaks the quiz start flow. The intro screen still renders, but clicking "Start Diagnosis" fails because earlier `addEventListener` calls on null elements throw. A page refresh after the error sometimes allows partial functionality. Fixing these ID mismatches is required for the app to work correctly.

### No lint, test, or build tooling

There is no `package.json`, linter config, test framework, or build system. No automated tests exist.
