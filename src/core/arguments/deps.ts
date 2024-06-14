import { createOption } from 'commander';

export interface WithDepsArgument {
  deps: boolean;
}

export const depsArgument = createOption(
  '--no-deps',
  "don't install dependencies",
);
