import { readFileSync } from 'fs';

export function readFile(filePath: string): string {
    return readFileSync(filePath, 'utf-8').trim();
}
