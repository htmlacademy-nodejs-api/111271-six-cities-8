import { Command } from './command.interface.js';
import chalk from 'chalk';
export class VersionCommand implements Command {
  static readonly name = '--version';

  public getName(): string {
    return VersionCommand.name;
  }

  execute(..._parameters: string[]): void {
    console.info(chalk.blue(process.env.npm_package_version));
  }
}
