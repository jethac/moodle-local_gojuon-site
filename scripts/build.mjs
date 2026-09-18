import { cp, mkdir, readFile, access, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { japanesePage } from './japanese.mjs';

const root = resolve(import.meta.dirname, '..');
const html = await readFile(resolve(root, 'public/index.html'), 'utf8');
for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
  if (asset === '/ja/' || asset.startsWith('/?')) continue;
  await access(resolve(root, `public${asset}`));
}
await access(resolve(root, 'public/og.png'));
await mkdir(resolve(root, 'dist'), { recursive: true });
await cp(resolve(root, 'public'), resolve(root, 'dist'), { recursive: true });
await mkdir(resolve(root, 'dist/ja'), { recursive: true });
await writeFile(resolve(root, 'dist/ja/index.html'), japanesePage(html));
console.log('Static site built in dist; all linked local assets exist.');
