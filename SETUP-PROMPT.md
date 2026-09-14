# Setup prompt

Copy the following into your coding agent in the target project:

```text
Set up Matt's personal lint recommendations for this new TypeScript project:

- Oxlint: https://oxc.rs/docs/guide/usage/linter.html
- All anti-slop rules, including its Effect-specific plugin:
  https://github.com/dmmulroy/anti-slop
- All shadcn lint rules:
  https://github.com/shadcn-ui/lint
- Oxlint's native oxc/no-accumulating-spread rule.
- Type-aware Oxlint with the nine rules listed in this repository's README,
  including no-floating-promises with ignoreVoid: false:
  https://oxc.rs/docs/guide/usage/linter/type-aware.html
- Knip for unused files, exports, and dependencies: https://knip.dev/
- React projects: official recommended React Hooks rules, all as errors:
  https://react.dev/reference/eslint-plugin-react-hooks
- TanStack Query projects: official recommended Query rules, all as errors:
  https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
- React projects: all nine unnecessary-effect rules as errors:
  https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect

Read Matt's exact rule selections and effect policy here before configuring:
https://github.com/mattlgroff/oxlint-config/blob/main/README.md

Read the target repository's current instructions and inspect its package
manager, Node version, module format, lint setup, framework, and UI structure.
Read current upstream installation instructions and rule inventories. Use
compatible versions and record them in the project's lockfile. Get the tools
from upstream, not from mattlgroff/oxlint-config as a package.

Enable every anti-slop, shadcn, and unnecessary-effect rule as an error,
including the anti-slop Effect plugin. For React Hooks and Query, use the
official recommended presets with all enabled rules promoted to errors.
Use the complete selections above, including the explicit type-aware list.
Explain upstream rules added or removed since Matt's documented inventory.
Ask me before disabling a rule, weakening its options, adding an exemption,
or installing a framework to satisfy a rule. Do not add blanket ignores for
tests, mocks, or UI component directories just to make lint pass.

Follow anti-slop's current distribution instructions. If it still requires
vendoring, record the source commit and preserve all license notices. Ensure
its plugin files really load with this project's Node and module setup.

For shadcn lint, configure the real component aliases and theme CSS using
upstream guidance. Check each UI project separately in a monorepo. Verify
that components are recognized and theme classes are resolved; an enabled
rule that cannot recognize the project's components is not a working setup.
If the project has no UI or does not use Effect, explain how that affects
these rules before making architectural changes or relaxing enforcement.

Treat useEffect as a last resort, including useLayoutEffect and custom
wrappers. For every remaining effect, identify the external system being
synchronized and explain why render-time calculation, event handlers, keys,
state initializers, framework loaders, Query, or useSyncExternalStore do not
reasonably solve the problem. Put a concise justification near the effect;
review its dependencies and cleanup. Do not move side effects into render or
useMemo, add timers, or hide warnings to satisfy a rule. Passing lint does
not establish that an effect is necessary. Use React's guidance:
https://react.dev/learn/you-might-not-need-an-effect

Configure Knip using real entry points and public interfaces. Check dynamic
loading and external consumers before removing anything it flags. Run Knip
as a separate check. Verify type-aware analysis actually runs and keep the
project's TypeScript type check. Check external plugin compatibility and
avoid duplicate native/plugin diagnostics. If necessary, use a narrowly
scoped ESLint runner for unsupported rules and explain why.

Integrate with the existing lint command and project conventions. Preserve
existing checks. Do not modify GitHub Actions, workflow triggers, job names,
path filters, or branch protection without my explicit approval. Inspect
whether the existing CI runs that lint command and report whether lint
failures actually block merging. Do not claim enforcement if it is missing.

Verify the setup with valid and deliberately invalid temporary examples.
Confirm valid code passes and violations produce the expected rule messages
and a nonzero exit status. Check both plugin loading and rule discovery,
including the Effect plugin, all six shadcn rules, type-aware promise checks,
React Hooks, Query, and the unnecessary-effect rules where applicable.
Verify a derived-state effect fails and a justified external synchronization
passes. Verify an awaited promise passes and an unhandled promise fails.
Verify Knip catches an intentionally unused example with the actual project
configuration. Report untested rules or compatibility gaps honestly.
Remove only the temporary examples you created afterward.

If existing application code is present, triage violations before fixing
them. Do not change runtime behavior or visual styling just to satisfy lint.
Run the smallest relevant existing checks for any actual code changes.

Finish with the installed versions, enabled rule inventory, changed files,
verification results, and any decisions or CI enforcement gaps needing me.
```
