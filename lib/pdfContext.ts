import fs from 'fs';
import path from 'path';

let cachedContext: string | null = null;

export function getRegulationsContext(): string {
  if (cachedContext) return cachedContext;

  const txtFiles = [
    'app/regulations/general-regulation.txt',
    'app/regulations/software-engineering-regulation.txt',
  ];

  const texts: string[] = [];

  for (const filePath of txtFiles) {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) continue;
    const text = fs.readFileSync(fullPath, 'utf8');
    const name = path.basename(filePath, '.txt');
    texts.push(`=== ${name} ===\n${text.trim()}`);
  }

  cachedContext = texts.join('\n\n');
  return cachedContext;
}
