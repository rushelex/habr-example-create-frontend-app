import { fs } from 'zx';

import { Path } from '../Path';

export async function getPackageData() {
  const pkgPath = Path.cwd('package.json');

  const rawData = await fs.readFile(pkgPath, { encoding: 'utf-8' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: Record<string, any> = JSON.parse(rawData);

  return data;
}
