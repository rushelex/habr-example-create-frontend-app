import { createOption } from 'commander';

export interface WithVerboseArgument {
  verbose: boolean;
}

export const verboseArgument = createOption('--verbose', 'show all logs');
