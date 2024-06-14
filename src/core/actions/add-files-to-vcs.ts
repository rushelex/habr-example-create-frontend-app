import { $ } from 'zx';

import { catchProcess } from '~/shared/catch-process';
import { Log } from '~/shared/Log';

interface TryAddFilesToVCSConfig {
  verbose: boolean;
}

export async function tryAddFilesToVCS(config: TryAddFilesToVCSConfig) {
  const { verbose } = config;

  try {
    if (verbose) {
      await $`git add --verbose .`;
    } else {
      await $`git add .`.quiet();
    }

    Log.success('Project files are added to the index VCS');
  } catch (error) {
    return catchProcess('Project files are not added to the index VCS.', error);
  }
}
