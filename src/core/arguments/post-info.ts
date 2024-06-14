import { createOption } from 'commander';

export interface WithPostInfoArgument {
  postInfo: boolean;
}

export const postInfoArgument = createOption(
  '-npi, --no-post-info',
  "don't show information after generate a project",
);
