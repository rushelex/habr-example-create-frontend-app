import { chalk } from 'zx';

import { getPackageData } from '~/shared/package/pkg-data';

const SET_UP_DOCUMENT_LINK = 'https://instructions.link';

export async function showPostGenerateInfo() {
  const pkg = await getPackageData();

  console.info(`
Success! Initialized ${chalk.cyan(pkg.name)}.

Now you can run several commands:

  ${chalk.cyan('npm run start')}
    Starts the development server.

  ${chalk.cyan('npm run build')}
    Bundles the app into static files for production.

  ${chalk.cyan('npm run test')}
    Starts the test runner.

What's next?

Now you need to set up a GitHub project and an Octopus project.
Follow the instructions: ${encodeURI(SET_UP_DOCUMENT_LINK)}.
`);

  return Promise.resolve();
}
