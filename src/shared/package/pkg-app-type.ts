import { chalk } from 'zx';

import { catchProcess } from '~/shared/catch-process';

import { getPackageData } from './pkg-data';

export enum AppType {
  Microfrontend = 'microfrontend',
  Library = 'library',
}

export async function getPackageAppType(): Promise<AppType> {
  const pkg = await getPackageData();

  if (pkg.mindbox?.appType && isValidAppType(pkg.mindbox.appType)) {
    return pkg.mindbox.appType;
  }

  return catchProcess(
    `The field ${chalk.cyan('mindbox.appType')} must be defined in ${chalk.cyan(
      'package.json',
    )} and must contain the value ${chalk.cyan(
      AppType.Microfrontend,
    )} or ${chalk.cyan(AppType.Library)}.`,
  );
}

function isValidAppType(appType: unknown): appType is AppType {
  return (
    typeof appType === 'string' &&
    Object.values(AppType).includes(appType as AppType)
  );
}
