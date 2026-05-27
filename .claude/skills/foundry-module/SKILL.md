---
name: foundry-module
description: Scaffold a Foundry VTT v14 module from the existing Vue 3 SPA in `frontend/`. Creates a `module.json` manifest at `frontend/module.json`, an entry file `frontend/src/foundry/main.ts` that registers `init`/`ready` hooks and exposes `game.modules.get(id).api`, and prints the Vite lib-mode tweaks the user must apply. Use when starting the SPA → Foundry-module conversion, or when the manifest needs to be regenerated. Invoke as `/foundry-module <module-id>` (kebab-case, matches the folder Foundry will load).
argument-hint: <module-id>
---

# Foundry module — scaffold

Scaffolds a Foundry VTT v14 module on top of the existing Vue 3 SPA in
`frontend/`. After running this skill the build artefact at `frontend/dist/`
becomes a Foundry-loadable module; the docker-compose `foundry` service
bind-mounts that directory into `/data/Data/modules/<module-id>`.

This skill **only writes files**. It does not run Vite, does not run docker,
and does not modify the existing Vue source. The user still has to switch Vite
to library mode and rebuild (see "Vite changes the user must apply" below).

## Inputs

- `$ARGUMENTS` is the **module id**: lower-case, hyphens only, no spaces or
  special characters. Must match the folder Foundry will load the module
  from. If the user did not pass one, ask before doing anything else.
- The id is the namespace for every settings key, hook name, CSS prefix,
  and socket event in the module. Pick it deliberately — renaming later
  breaks user data.

## Existing module manifest

!`ls frontend/module.json 2>/dev/null`

If `frontend/module.json` already exists, **stop and ask the user** before
overwriting. A re-scaffold should be deliberate, not accidental.

## Steps

1. **Validate the id.** Reject anything containing uppercase letters,
   underscores, dots, or non-ASCII characters. Reject ids shorter than 3
   characters. The id is final once users install the module — don't let it
   be sloppy.
2. **Write `frontend/module.json`** with this exact shape (substitute
   `$ARGUMENTS` for the id):

   ```json
   {
     "id": "$ARGUMENTS",
     "title": "RpgAssistant",
     "description": "Track tabletop RPG characters and their relationships inside Foundry VTT.",
     "version": "0.1.0",
     "compatibility": {
       "minimum": "13",
       "verified": "14",
       "maximum": "14"
     },
     "authors": [
       { "name": "RpgAssistant", "url": "" }
     ],
     "esmodules": ["dist/main.js"],
     "styles": ["dist/style.css"],
     "languages": [
       { "lang": "en", "name": "English", "path": "lang/en.json" }
     ],
     "url": "",
     "manifest": "",
     "download": "",
     "license": "",
     "readme": "README.md",
     "relationships": {
       "systems": [],
       "requires": []
     }
   }
   ```

   Leave `url`, `manifest`, `download`, `license` empty strings — the user
   fills them in when the module is published.

3. **Write `frontend/src/foundry/main.ts`** as the module entry point:

   ```ts
   import type { App } from "vue"

   const MODULE_ID = "$ARGUMENTS"

   declare global {
     // eslint-disable-next-line no-var
     var Hooks: {
       once(event: string, cb: (...args: unknown[]) => void): void
       on(event: string, cb: (...args: unknown[]) => void): void
     }
     // eslint-disable-next-line no-var
     var game: {
       modules: Map<string, { id: string; api?: unknown }>
       settings: {
         register(namespace: string, key: string, data: object): void
         get(namespace: string, key: string): unknown
         set(namespace: string, key: string, value: unknown): Promise<unknown>
       }
       i18n: { localize(key: string): string }
     }
   }

   let app: App | null = null

   Hooks.once("init", () => {
     // Register settings here. Always namespace with MODULE_ID.
     game.settings.register(MODULE_ID, "apiBaseUrl", {
       name: `${MODULE_ID}.settings.apiBaseUrl.name`,
       hint: `${MODULE_ID}.settings.apiBaseUrl.hint`,
       scope: "world",
       config: true,
       type: String,
       default: "http://api:8080",
     })

     // Expose a public api for other modules.
     const mod = game.modules.get(MODULE_ID)
     if (mod) {
       mod.api = {
         version: "0.1.0",
       }
     }
   })

   Hooks.once("ready", () => {
     // Mount the Vue app into a Foundry ApplicationV2 window here.
     // Concrete wiring is left for the conversion PR — this file is just
     // the entry point Foundry loads via the `esmodules` field.
     console.log(`[${MODULE_ID}] ready`)
   })

   export { MODULE_ID, app }
   ```

4. **Write `frontend/lang/en.json`** with the two i18n keys referenced above:

   ```json
   {
     "$ARGUMENTS.settings.apiBaseUrl.name": "Backend API base URL",
     "$ARGUMENTS.settings.apiBaseUrl.hint": "URL the module uses to reach the RpgAssistant backend API."
   }
   ```

5. **Report — do not perform — the Vite changes the user must apply.** Print
   this verbatim, do not silently edit `vite.config.ts`:

   - Switch Vite to library mode in `vite.config.ts` (`build.lib.entry`
     pointing at `src/foundry/main.ts`, `formats: ["es"]`, `fileName: "main"`).
     Foundry loads ES modules; an `iife`/`umd` build will not work.
   - Set `build.rollupOptions.output.assetFileNames: "style.css"` so the
     generated stylesheet matches the path in `module.json`.
   - Set `build.cssCodeSplit: false` to keep a single `style.css` bundle.
   - Externalise nothing — Foundry does not provide Vue at runtime; the
     module must ship its own copy.
   - Confirm `frontend/dist/` is the bind-mount target in the root
     `docker-compose.yaml` `foundry` service.

6. **Tell the user how to load the module.** After `bun run build`:
   - The compose `foundry` service mounts `frontend/dist` into
     `/data/Data/modules/<module-id>`.
   - In Foundry, enable the module inside a world, then reload.

## Rules

- **Never invent fields** in `module.json` that the user did not ask for —
  the manifest is a contract with the Foundry package registry and extra
  fields can break submission.
- **Do not touch `vite.config.ts`, `package.json`, or any existing Vue
  source** in this skill. Conversion is a separate PR; this skill only adds
  the manifest, entry file, and language file.
- **Do not bump the Foundry `verified` version** above 14 unless the user
  explicitly confirms they have tested the module against a higher version.
- If `frontend/module.json` already exists, stop and ask. Never overwrite a
  manifest the user may have hand-edited.
- The module id is also the i18n prefix, the CSS class prefix, the settings
  namespace, and the hook prefix. Use it consistently — do not introduce a
  second namespace.