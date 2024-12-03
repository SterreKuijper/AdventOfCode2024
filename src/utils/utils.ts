import { readFileSync } from 'fs';

export function utils(filePath: string): string {
    return readFileSync(filePath, 'utf-8').trim();
}

export function isNumber(value: string): boolean {
    return !isNaN(Number(value));
}
