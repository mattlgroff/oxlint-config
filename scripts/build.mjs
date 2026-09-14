import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { stripTypeScriptTypes } from 'node:module';

for (const entry of readdirSync('vendor/anti-slop', { recursive: true })) {
  if (!entry.endsWith('.ts') || entry.endsWith('.d.ts')) continue;
  const source = readFileSync(join('vendor/anti-slop', entry), 'utf8');
  const output = join('dist/anti-slop', entry.replace(/\.ts$/, '.js'));
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, stripTypeScriptTypes(source).replace(/(from\s+["'][^"']+)\.ts(["'])/g, '$1.js$2').replace(/[ \t]+$/gm, ''));
}
