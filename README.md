# Matt's Oxlint config

These are my personal recommendations for starting a new TypeScript project. If I were starting a new project from scratch today, this is what I would use.

All anti-slop and shadcn lint rules are enabled as errors. This is an opinionated starting point that I intend to expand over time.

## Use it

Requires Node.js 24 or newer and Oxlint 1.83.0. This package is installed from GitHub; it is not published to npm.

```sh
npm install --save-dev oxlint@1.83.0 github:mattlgroff/oxlint-config#v0.1.0
```

Set `"type": "module"` in your project's `package.json`, then create `oxlint.config.ts`:

```ts
import { defineConfig } from 'oxlint';
import matt from '@mattlgroff/oxlint-config';

export default defineConfig(matt);
```

Run `npx oxlint`. An enabled rule violation returns a failing exit code. Your project's existing lint command can run this config; merge blocking still depends on your repository requiring that check. This package does not install or modify GitHub Actions.

For shadcn UI projects, use Tailwind CSS v4 and a project-local `components.json` pointing at the real theme CSS and UI component alias. Ensure the alias resolves through your TypeScript paths or package exports. Without that setup, component rules can miss components and class validation can fall back to the plugin's bundled grammar. In a monorepo, configure each UI project separately.

## What's enforced

The complete default contains 30 explicitly configured errors: 18 general anti-slop rules, all five Effect-specific anti-slop rules, all six shadcn rules, and Oxlint's native accumulating-spread check. Oxlint's own default rules also remain active.

The Effect rules are included deliberately. They prescribe Effect APIs for tagged values and services and can flag similar patterns in code that does not use Effect. The shadcn rules enforce a token-based component design system. These are architectural opinions, not proof that every flagged program is broken.

There are no blanket test, mock, or component-directory exemptions. Every plugin rule uses its default options. In particular, shadcn's `no-restyle` does not receive the upstream example's layout allowance. Upstream recommends component-directory overrides for some rules; this complete preset does not add them. A project that needs exceptions should make that policy explicit in its own config.

### anti-slop

- `anti-slop/no-array-filter-map`
- `anti-slop/no-reduce-accumulator-copy`
- `anti-slop/no-chained-type-assertions`
- `anti-slop/no-conditional-empty-object-spread`
- `anti-slop/no-known-value-widening`
- `anti-slop/no-module-mocking`
- `anti-slop/no-object-parameters`
- `anti-slop/no-reflect-apply`
- `anti-slop/no-reflect-get`
- `anti-slop/no-runtime-typeof`
- `anti-slop/no-unsafe-dictionary-type`
- `anti-slop/no-shape-in-symbol-names`
- `anti-slop/no-unknown-parameters`
- `anti-slop/no-unknown-returns`
- `anti-slop/no-unknown-type-aliases`
- `anti-slop/no-widen-then-assert`
- `anti-slop/require-readable-spacing`
- `anti-slop/require-safety-comment-for-type-assertion`

### anti-slop-effect

- `anti-slop-effect/no-manual-effect-error-tag`
- `anti-slop-effect/no-manual-tag-comparison`
- `anti-slop-effect/no-manual-tagged-construction`
- `anti-slop-effect/no-service-constructor-imports`
- `anti-slop-effect/prefer-effect-match`

### shadcn

- `shadcn/no-restyle`
- `shadcn/no-raw-colors`
- `shadcn/no-arbitrary-values`
- `shadcn/no-inline-styles`
- `shadcn/no-unknown-classes`
- `shadcn/require-static-classes`

### oxc

- `oxc/no-accumulating-spread`

## Versioning and verification

Plugin dependencies and the Oxlint peer version are pinned. Adopt a new config release deliberately; new enforced rules can require changes in consuming projects. Rule additions or stricter options will be called out as breaking policy changes.

`npm test` checks the complete upstream rule inventory and runs real Oxlint processes from a separate project directory. Valid TypeScript passes; representative anti-slop and Effect violations and all six shadcn violations fail. This verifies integration, not every upstream rule's implementation or application behavior.

## Credits

- [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop), vendored at `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b` because upstream distributes source rather than an npm package. Original production source is unmodified; `npm run build` strips types and rewrites local import extensions into the committed JavaScript under `dist`. License notices are preserved under `vendor/anti-slop`.
- [shadcn-ui/lint](https://github.com/shadcn-ui/lint), installed as `@shadcn/lint@0.1.0`.
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html), version `1.83.0`.

MIT licensed. Third-party source retains its own notices.
