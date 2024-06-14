import { fs } from 'zx';

import { Path } from '~/shared/Path';

import type PackageJson from '../../package.json';

export function getSelfPackage() {
  const rawPkgData = fs.readFileSync(Path.r('package.json'), {
    encoding: 'utf-8',
  });

  const pkg: Readonly<typeof PackageJson> = JSON.parse(rawPkgData);

  return pkg;
}
