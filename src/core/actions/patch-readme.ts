import { chalk, fs } from 'zx';

import { catchProcess } from '~/shared/catch-process';
import { Log } from '~/shared/Log';
import { Markdown } from '~/shared/Markdown';
import { AppType } from '~/shared/package/pkg-app-type';
import { getPackageData } from '~/shared/package/pkg-data';
import { Path } from '~/shared/Path';

interface TryPatchReadmeConfig {
  verbose: boolean;
  appType: AppType;
}

export async function tryPatchReadme(config: TryPatchReadmeConfig) {
  try {
    const { verbose, appType } = config;

    const pkg = await getPackageData();

    const path = Path.cwd('README.md');

    const rawData = await fs.readFile(path, { encoding: 'utf-8' });

    if (verbose) {
      Log.info(Log.withLine(`Patch README.md: ${path}`));
    }

    const newData = new Markdown(rawData)
      .cleanupTemplateData()
      .prepend(getHeading(pkg.name, appType))
      .toString();

    await fs.writeFile(path, newData, { encoding: 'utf-8' });
  } catch (error) {
    catchProcess(`Failed patch ${chalk.cyan('README.md')} file`, error);
  }
}

function getHeading(repositoryName: string, appType: AppType) {
  const repoName = repositoryName.replace('@', '');
  const workflowFileName = appType === AppType.Library ? 'ci.yml' : 'main.yml';
  return `# @${repoName} ![CI](https://github.com/${repoName}/actions/workflows/${workflowFileName}/badge.svg?branch=main)\n`;
}
