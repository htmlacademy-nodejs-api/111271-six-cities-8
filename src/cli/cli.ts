import { Command } from './commands/command.interface.js';
import { parseCommand } from './command-parser.js';

export class CLIApplication {
  private readonly commands = new Map<string, Command>();

  constructor(
    private readonly defaultCommand: string
  ) {}

  public registerCommands(commandList: Command[]): void {
    for (const command of commandList) {
      this.commands.set(command.getName(), command);
    }
  }

  public processCommand(argv: string[]): void {
    const { commandName, commandArguments } = parseCommand(argv);
    const command = this.getCommand(commandName ?? this.defaultCommand);
    command.execute(...commandArguments);
  }

  private getCommand(commandName: string): Command {
    return this.commands.get(commandName) ?? this.getDefaultCommand();
  }

  private getDefaultCommand(): Command | never {
    const command = this.commands.get(this.defaultCommand);

    if (!command) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }

    return command;
  }
}
