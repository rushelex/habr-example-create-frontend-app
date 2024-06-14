import { $, chalk } from 'zx';

import { catchProcess } from '~/shared/catch-process';
import { Log } from '~/shared/Log';

interface TryGetRepositoryNameConfig {
  verbose: boolean;
}

export async function tryGetRepositoryName(
  config?: TryGetRepositoryNameConfig,
) {
  const { verbose } = config ?? {};

  try {
    let res;

    if (verbose) {
      res = await $`git config --get remote.origin.url`;
    } else {
      res = await $`git config --get remote.origin.url`.quiet();
    }

    const parts = res.stdout.replace('\n', '').split('/');
    const nameExt = parts[parts.length - 1];

    const name = nameExt.replace('.git', '').trim();

    if (verbose) {
      Log.info(`Repository name: ${chalk.cyan(name)}`);
    }

    return name;
  } catch (error) {
    return catchProcess('Failed to get repository name.', error);
  }
}
