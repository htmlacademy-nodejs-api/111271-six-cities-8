
type ParsedCommand = {
  commandName: string | null;
  commandArguments: string[];
}

export const parseCommand = (cliArguments: string[]): ParsedCommand => {
  const parsedCommand: ParsedCommand = {
    commandName: null,
    commandArguments: [],
  };

  for (const argument of cliArguments) {
    if (argument.startsWith('--')) {
      if (parsedCommand.commandName) {
        break;
      }
      parsedCommand.commandName = argument;
    } else if (parsedCommand.commandName && argument) {
      parsedCommand.commandArguments.push(argument);
    }
  }

  return parsedCommand;
};
