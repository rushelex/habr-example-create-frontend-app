import { createCommand } from 'commander';
import { chalk } from 'zx';

import { Log } from '~/shared/Log';

import { depsArgument } from './core/arguments/deps';
import { namespaceArgument } from './core/arguments/namespace';
import { postInfoArgument } from './core/arguments/post-info';
import { type Arguments } from './core/arguments/types';
import { verboseArgument } from './core/arguments/verbose';
import { initMicrofrontend } from './features/microfrontend';
import { AppType, getPackageAppType } from './shared/package/pkg-app-type';
import { getSelfPackage } from './shared/self';

const command = createCommand();

const pkg = getSelfPackage();

command
  .name(pkg.name)
  .version(pkg.version)
  .description(pkg.description)
  .addOption(depsArgument)
  .addOption(namespaceArgument)
  .addOption(postInfoArgument)
  .addOption(verboseArgument)
  .action(async (args: Arguments) => {
    const appType = await getPackageAppType();

    if (args.verbose) {
      Log.info(`Project type: ${chalk.cyan(appType)}`);
    }

    if (appType === AppType.Microfrontend) {
      return initMicrofrontend({ args });
    }

    // return initLibrary({ args });
  })
  .parse();
