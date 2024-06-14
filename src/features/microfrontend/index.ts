import { tryAddFilesToVCS } from '~/core/actions/add-files-to-vcs';
import { tryCompileTemplates } from '~/core/actions/compile-templates';
import { tryInstallDependencies } from '~/core/actions/install-dependencies';
import { tryPatchReadme } from '~/core/actions/patch-readme';
import { type Arguments } from '~/core/arguments/types';
import { AppType } from '~/shared/package/pkg-app-type';
import { tryGetRepositoryName } from '~/shared/package/repository-name';
import { Path } from '~/shared/Path';

import { showPostGenerateInfo } from './actions/show-post-generate-info';
import { getAnswers } from './questions';

interface InitMicrofrontendConfig {
  args: Arguments;
}

export async function initMicrofrontend(config: InitMicrofrontendConfig) {
  const { args } = config;

  const answers = await getAnswers({ args });

  const repositoryName = await tryGetRepositoryName({ verbose: args.verbose });

  await tryCompileTemplates({
    variables: {
      projectName: repositoryName,
      namespace: answers.namespace,
    },
    verbose: args.verbose,
  });

  await tryPatchReadme({
    verbose: args.verbose,
    appType: AppType.Microfrontend,
  });

  if (args.deps) {
    await tryInstallDependencies({
      verbose: args.verbose,
    });

    await tryInstallDependencies({
      cwd: Path.cwd('e2e'),
      verbose: args.verbose,
    });
  }

  await tryAddFilesToVCS({
    verbose: args.verbose,
  });

  if (args.postInfo) {
    await showPostGenerateInfo();
  }
}
