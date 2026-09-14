# Matt's TypeScript starting recommendations

These are my personal recommendations for starting a new TypeScript project. If I were starting a new project from scratch today, this is what I would use.

## The list

| Tool | What I want |
| --- | --- |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) | The lint runner, including `oxc/no-accumulating-spread`. |
| [anti-slop](https://github.com/dmmulroy/anti-slop) | All rules, including the Effect-specific rules, enforced as errors. |
| [shadcn lint](https://github.com/shadcn-ui/lint) | All rules enforced as errors, with the project's actual UI components and theme configured. |

I'll add more recommendations here as I find things I want in new projects.

## Give this to your agent

Copy the [setup prompt](./SETUP-PROMPT.md) into your coding agent while working in the new project's repository. The agent should get the tools from their upstream sources and configure them for that project.

This repository is a recommendations list. There is nothing here to install. The earlier `v0.1.0` tag contains a package experiment; use this guide for new setups.

## My policy

Enable all rules. Don't silently substitute a smaller recommended preset or add blanket ignores to get a green result. Ask me before disabling a rule, weakening its options, or adding an exemption.

These are opinions about how I want to start a project. The Effect rules prescribe Effect patterns, and shadcn lint assumes a component design system. If those assumptions don't fit the project, explain the conflict before changing the policy or adding a framework.

Existing projects need a separate assessment before applying fixes that could change behavior or appearance. Setting up lint is not permission to rewrite GitHub Actions.

## Rule inventory

This inventory records the initial selection: 18 general anti-slop rules, five Effect rules, six shadcn rules, and one native Oxlint rule. The agent should check upstream for additions and explain any changes to this list.

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
