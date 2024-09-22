import { readFileSync } from 'node:fs';

const rowExists = (row: string): boolean => row.trim().length > 0;

export const readTsv = <T>(path: string, parseRow: (raw: string) => T): T[] =>
  readFileSync(path, 'utf-8')
    .split('\n')
    .filter(rowExists)
    .map(parseRow);


