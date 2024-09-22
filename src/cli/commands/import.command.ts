import { Command } from './command.interface.js';
import { readTsv } from '../../shared/libs/file-reader/index.js';
import { parseRentOffer } from '../rent-offer-parser.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  static readonly name = '--import';

  public getName(): string {
    return ImportCommand.name;
  }

  public execute(...parameters: string[]): void {
    const [path] = parameters;

    try {
      const rentOffers = readTsv(path, parseRentOffer);
      console.log(rentOffers);
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${path}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}
