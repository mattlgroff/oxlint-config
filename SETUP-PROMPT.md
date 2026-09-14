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

Read the target repository's current instructions and inspect its package
manager, Node version, module format, lint setup, framework, and UI structure.
Read current upstream installation instructions and rule inventories. Use
compatible versions and record them in the project's lockfile. Get the tools
from upstream, not from mattlgroff/oxlint-config as a package.

Enable every rule from both plugins as an error, including the Effect plugin.
Use the full inventories, not a smaller recommended preset. Explain any
upstream rules added or removed since Matt's documented inventory.
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

Integrate with the existing lint command and project conventions. Preserve
existing checks. Do not modify GitHub Actions, workflow triggers, job names,
path filters, or branch protection without my explicit approval. Inspect
whether the existing CI runs that lint command and report whether lint
failures actually block merging. Do not claim enforcement if it is missing.

Verify the setup with valid and deliberately invalid temporary examples.
Confirm valid code passes and violations produce the expected rule messages
and a nonzero exit status. Check both plugin loading and rule discovery,
including the Effect plugin and all six initially listed shadcn rules.
Remove only the temporary examples you created afterward.

If existing application code is present, triage violations before fixing
them. Do not change runtime behavior or visual styling just to satisfy lint.
Run the smallest relevant existing checks for any actual code changes.

Finish with the installed versions, enabled rule inventory, changed files,
verification results, and any decisions or CI enforcement gaps needing me.
```
