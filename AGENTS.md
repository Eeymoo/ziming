# Agent Notes

## Commands
- Use `pnpm`, not npm or yarn. This repo has `pnpm-lock.yaml`.
- Install deps with `pnpm install`.
- Typecheck with `pnpm exec tsc --noEmit`.
- Start web with `pnpm web -- --port <port> --host localhost`.
- Create UI components only with `pnpm run create:ui <UIPascalName>`; names must start with `UI` and the script refuses to overwrite existing `ui/<Name>` directories.

## App Wiring
- This is an Expo Router app; entry is `expo-router/entry`, routes live in `app/`, and the root layout is `app/_layout.tsx`.
- Web uses Metro via `app.json` and NativeWind via `metro.config.js`: `withNativeWind(config, { input: "./global.css" })`.
- NativeWind className transformation also depends on `babel.config.js` with `plugins: ['nativewind/babel']`; without it Web falls back to unstyled vertical React Native output.
- NativeWind requires Tailwind v3 here; do not upgrade `tailwindcss` to v4 unless NativeWind support is verified.
- `tailwind.config.js` must keep `presets: [require('nativewind/preset')]` and include both `app/**/*` and `ui/**/*`.

## UI Component Creation Flow
- Run `pnpm run create:ui UIComponentName` first; do not hand-create the initial component folder/files.
- The generator copies `dev/templates/ComponentTemp` into `ui/UIComponentName/` and creates `index.tsx`, `types.ts`, and `UIComponentName.test.tsx`.
- After generation, replace the scaffold implementation in place. If a failed attempt leaves an empty target folder, remove only that target folder before rerunning the generator.
- Keep component-specific style tokens inside that component folder, for example `ui/UIBottomNavBar/tokens.ts`; do not create shared UI token files unless explicitly requested.

## Component Style Rules
- Default component styling should come from NativeWind `className` strings stored in component-local token files.
- Do not add `StyleSheet.create` for default component styles when a token file exists. `style`, `itemStyle`, etc. are only caller override escape hatches.
- Token names should reflect the design spec (`bg-surface`, `bg-primary-container`, `text-primary`, `text-on-surface-variant`, `font-label-bold`, `shadow-lg`, `rounded-full`, `active:scale-90`). Add Tailwind theme values in `tailwind.config.js` when a token class needs a color/font/shadow definition.
- Add short Chinese comments for non-obvious component behavior and public prop intent.

## Icon Rules
- Font Awesome is the icon library: use `@fortawesome/free-solid-svg-icons` plus the repo `UIIcon` wrapper.
- Do not use `FontAwesomeIcon` directly in feature components when inherited color is expected; use `ui/UIIcon` so `UIIconProvider` can provide parent token color.
- `UIBottomNavBar` provides active/inactive icon colors through `UIIconProvider` because Font Awesome does not inherit React Native `Text` color automatically.

## Testing State
- There is no real test runner configured yet; generated `*.test.tsx` files are type-level placeholders.
- For current verification, run `pnpm exec tsc --noEmit` after code changes.

## Current Gotchas
- Expo may warn that some package versions differ from its expected versions; do not silently change versions unless the task is dependency alignment.
- React Native DevTools may fail to install in this environment due missing system library `libnspr4.so`; this does not necessarily block the web app.
