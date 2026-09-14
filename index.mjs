import { fileURLToPath } from 'node:url';
import rules from './rules.json' with { type: 'json' };

/** Matt's complete starting policy for new TypeScript projects. */
export default {
  jsPlugins: [
    fileURLToPath(new URL('./dist/anti-slop/index.js', import.meta.url)),
    fileURLToPath(new URL('./dist/anti-slop/effect/index.js', import.meta.url)),
    fileURLToPath(import.meta.resolve('@shadcn/lint')),
  ],
  rules,
};
