import { $, cd, within } from 'zx';

import { catchProcess } from '~/shared/catch-process';
import { Log } from '~/shared/Log';
import { Path } from '~/shared/Path';

interface InstallDependenciesConfig {
  cwd?: string;
  verbose: boolean;
}

/**
 * @description Install NPM dependencies in the target project.
 * @description The list of dependencies is read from `package.json`.
 */
export async function tryInstallDependencies(
  config: InstallDependenciesConfig,
) {
  const { cwd = Path.cwd(), verbose } = config;

  try {
    // Run in a detached context.
    // It is necessary that the `cd(cwd)` command does not affect subsequent invocations of other commands.
    await within(async () => {
      // If we are in a directory other than `cwd`, then change to the `cwd` directory
      if (Path.cwd() !== cwd) {
        await cd(cwd);
      }

      console.info(`Installing dependencies...`);

      // Install dependencies with all outputs to the main console
      if (verbose) {
        await $`npm install --loglevel verbose`.stdio(
          'inherit',
          'inherit',
          'inherit',
        );
      } else {
        await $`npm install --no-audit`.stdio('inherit', 'inherit', 'inherit');
      }
    });

    Log.success(Log.withLine('Dependencies installed'));
  } catch (error) {
    return catchProcess("Dependencies haven't been installed.", error);
  }
}
