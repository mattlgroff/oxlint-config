# Matt's TypeScript starting recommendations

These are my personal recommendations for starting a new TypeScript project. If I were starting a new project from scratch today, this is what I would use.

## The list

| Tool | What I want |
| --- | --- |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) | The lint runner, including `oxc/no-accumulating-spread`. |
| [anti-slop](https://github.com/dmmulroy/anti-slop) | All rules, including the Effect-specific rules, enforced as errors. |
| [shadcn lint](https://github.com/shadcn-ui/lint) | All rules enforced as errors, with the project's actual UI components and theme configured. |
| [Oxlint type-aware linting](https://oxc.rs/docs/guide/usage/linter/type-aware.html) | Catch async mistakes and unsafe types with the rules below. |
| [Knip](https://knip.dev/) | Check unused files, exports, and dependencies using the project's actual entry points. |
| [React Hooks](https://react.dev/reference/eslint-plugin-react-hooks) | For React projects, enable the official recommended rules as errors. |
| [TanStack Query](https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query) | For projects using Query, enable the official recommended rules as errors. |
| [You Might Not Need an Effect](https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect) | For React projects, enable all nine effect rules below as errors. |

I'll add more recommendations here as I find things I want in new projects.

## Give this to your agent

Copy the [setup prompt](./SETUP-PROMPT.md) into your coding agent while working in the new project's repository. The agent should get the tools from their upstream sources and configure them for that project.

This repository is a recommendations list. There is nothing here to install. The earlier `v0.1.0` tag contains a package experiment; use this guide for new setups.

## My policy

Enable all anti-slop, shadcn, and unnecessary-effect rules. Use the official recommended React Hooks and TanStack Query rules, promoted to errors, and the explicit type-aware selection below. Don't silently substitute a smaller preset or add blanket ignores to get a green result. Ask me before disabling a rule, weakening its options, or adding an exemption.

These are opinions about how I want to start a project. The Effect rules prescribe Effect patterns, and shadcn lint assumes a component design system. If those assumptions don't fit the project, explain the conflict before changing the policy or adding a framework.

Existing projects need a separate assessment before applying fixes that could change behavior or appearance. Setting up lint is not permission to rewrite GitHub Actions.

## useEffect is a last resort

My default is to avoid `useEffect`. Before keeping one, explain which external system needs synchronization and why render-time calculation, an event handler, component identity (`key`), a state initializer, a framework data loader, TanStack Query, or `useSyncExternalStore` cannot reasonably handle it. Apply the same reasoning to `useLayoutEffect` and custom effect wrappers; wrapping an effect does not justify it.

For an effect that is necessary, document the reason near the code and explain its dependencies and cleanup in the review. Subscriptions, imperative widgets, and browser integrations can justify an effect when a suitable existing abstraction does not cover the need. Never move side effects into render or `useMemo`, hide dependency warnings, or delay a state update with a timer just to pass lint.

The lint rules catch known patterns. The agent must review every remaining effect's justification; a passing lint run does not prove an effect is necessary. This follows [React's guidance](https://react.dev/learn/you-might-not-need-an-effect). React's [`set-state-in-effect`](https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect) is part of the recommended baseline and complements the specialized plugin.

## Additional checks

Knip is a separate project-wide check, not an Oxlint plugin. Configure framework entry points, workspaces, dynamic loading, and public exports before enforcing its findings. Do not automatically delete code based on a diagnostic. Verify suspected unused code has no dynamic or external consumers.

For React Hooks and TanStack Query, inspect the installed recommended presets, promote their enabled rules to errors, and record the exact inventory. At minimum, verify React's `rules-of-hooks`, `exhaustive-deps`, and `set-state-in-effect`, plus Query's `exhaustive-deps`, `stable-query-client`, `no-unstable-deps`, and `no-void-query-fn` are active. Report upstream changes rather than silently dropping these checks.

Prefer native Oxlint rules where equivalent. Verify external plugin compatibility against the chosen versions; don't assume every ESLint rule works in Oxlint. If a rule needs ESLint, keep that runner scoped to the missing coverage and explain the requirement. Continue running the project's TypeScript type check.

## Rule inventory

The original selection remains: 18 general anti-slop rules, five Effect rules, six shadcn rules, and one native Oxlint rule. The agent should check upstream for additions and explain any changes to this list.

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

### Type-aware Oxlint

Enable type-aware linting with compatible `oxlint` and `oxlint-tsgolint` versions and set these rules to errors:

- `typescript/no-floating-promises`, with `ignoreVoid: false`
- `typescript/no-misused-promises`
- `typescript/await-thenable`
- `typescript/switch-exhaustiveness-check`
- `typescript/no-unsafe-assignment`
- `typescript/no-unsafe-call`
- `typescript/no-unsafe-argument`
- `typescript/no-unsafe-member-access`
- `typescript/no-unsafe-return`

Adding `void` must not be a way to silence an unhandled promise. A catch handler still needs meaningful error handling, which requires review.

### Unnecessary effects

Use the following Oxlint plugin namespace with every rule set to `error`:

- `react-you-might-not-need-an-effect/no-derived-state`
- `react-you-might-not-need-an-effect/no-chain-state-updates`
- `react-you-might-not-need-an-effect/no-event-handler`
- `react-you-might-not-need-an-effect/no-adjust-state-on-prop-change`
- `react-you-might-not-need-an-effect/no-reset-all-state-on-prop-change`
- `react-you-might-not-need-an-effect/no-pass-live-state-to-parent`
- `react-you-might-not-need-an-effect/no-pass-data-to-parent`
- `react-you-might-not-need-an-effect/no-external-store-subscription`
- `react-you-might-not-need-an-effect/no-initialize-state`

The upstream plugin documents Oxlint support and recommends using exhaustive-dependency and floating-promise checks alongside it. Its detection is heuristic; ask before suppressing a finding and investigate behavior before applying a suggested rewrite.
