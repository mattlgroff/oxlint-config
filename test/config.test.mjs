import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import config from '../index.mjs';
import antiSlop from '../vendor/anti-slop/index.ts';
import effect from '../vendor/anti-slop/effect/index.ts';
import shadcn from '@shadcn/lint';

const binary = fileURLToPath(new URL('../node_modules/oxlint/bin/oxlint', import.meta.url));

test('every upstream rule is enabled as an error, with no exemptions', () => {
  const expected = [
    ...Object.keys(antiSlop.rules).map(name => `anti-slop/${name}`),
    ...Object.keys(effect.rules).map(name => `anti-slop-effect/${name}`),
    ...Object.keys(shadcn.rules).map(name => `shadcn/${name}`),
    'oxc/no-accumulating-spread',
  ];
  assert.equal(expected.length, 30);
  assert.deepEqual(Object.keys(config.rules).sort(), expected.sort());
  assert.ok(Object.values(config.rules).every(value => value === 'error'));
  assert.equal(config.overrides, undefined);
  assert.equal(config.ignorePatterns, undefined);
});

test('Oxlint loads the config outside the package and enforces all three plugins', () => {
  const dir = mkdtempSync(join(tmpdir(), 'matt-oxlint-'));
  try {
    writeFileSync(join(dir, '.oxlintrc.json'), JSON.stringify(config));
    writeFileSync(join(dir, 'components.json'), JSON.stringify({ aliases: { ui: '@/components/ui' }, tailwind: { css: 'globals.css' } }));
    mkdirSync(join(dir, 'components/ui'), { recursive: true });
    writeFileSync(join(dir, 'tsconfig.json'), JSON.stringify({ compilerOptions: { paths: { '@/*': ['./*'] } } }));
    writeFileSync(join(dir, 'components/ui/button.tsx'), 'export const Button = () => <button />;\n');
    writeFileSync(join(dir, 'globals.css'), '@import "tailwindcss";\n');
    writeFileSync(join(dir, 'valid.ts'), 'export const answer = 42;\n');
    const run = file => spawnSync(process.execPath, [binary, '--format', 'json', file], { cwd: dir, encoding: 'utf8' });
    const valid = run('valid.ts');
    assert.equal(valid.status, 0, valid.stdout + valid.stderr);
    writeFileSync(join(dir, 'invalid.tsx'), `import { Button } from '@/components/ui/button';
export type Payload = unknown;
export const isReady = value._tag === 'Ready';
export const view = <Button style={{ color: 'red' }} className="bg-red-500 w-[37px] made-up-class" />;
export const dynamic = <Button className={externalClasses} />;
`);
    const invalid = run('invalid.tsx');
    assert.equal(invalid.status, 1, invalid.stdout + invalid.stderr);
    for (const rule of ['no-unknown-type-aliases', 'no-manual-tag-comparison', 'no-inline-styles', 'no-raw-colors', 'no-arbitrary-values', 'no-restyle', 'no-unknown-classes', 'require-static-classes']) {
      assert.ok(invalid.stdout.includes(rule), `${rule} missing: ${invalid.stdout} ${invalid.stderr}`);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
