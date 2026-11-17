import { mkdir, copyFile, readFile, cp } from 'node:fs/promises';
import { Script } from 'node:vm';

const html = await readFile('index.html', 'utf8');
const inlineScript = html.match(/<script>([\s\S]*?)<\/script>/);

if (!inlineScript) throw new Error('Inline application script was not found.');
new Script(inlineScript[1], { filename: 'index.html' });

await mkdir('dist', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await cp('assets/icons', 'dist/assets/icons', { recursive: true });
