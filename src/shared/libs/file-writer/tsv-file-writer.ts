import { createWriteStream } from 'node:fs';
import { once } from 'node:events';

export const writeTsv = async (path: string, rows: string[]): Promise<void> => {
  const stream = createWriteStream(path, { encoding: 'utf-8' });

  for (const row of rows) {
    const awaitDrain = !stream.write(`${row}\n`);

    if (awaitDrain) {
      await once(stream, 'drain');
    }
  }

  stream.end();
};
