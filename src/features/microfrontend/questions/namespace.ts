import { type DistinctQuestion } from 'inquirer';

import { transformInput } from '~/core/questions/utils/transform-input';
import { validateInput } from '~/core/questions/utils/validate-input';
import { tryGetRepositoryName } from '~/shared/package/repository-name';

export interface WithNamespaceQuestion {
  namespace: string;
}

/**
 * @description Asks for a micro-microfrontend namespace.
 * @description Look for "`<% namespace %>`" and "`<% namespaceCamelCase %>`" in templates.
 * @default If the repository name contains "frontend-" at the beginning, the part after "frontend-" is used. Otherwise, the entire repository name will be used.
 */
export const namespaceQuestion: DistinctQuestion<WithNamespaceQuestion> = {
  name: 'namespace',
  type: 'input',
  message: "Please enter the micro-frontend's namespace.",
  default: getDefaultNamespace,
  suffix:
    '\n  The application will be available at http://localhost:8080/<namespace>',
  filter: transformInput({ toLowerCase: true }),
  validate: validateInput({ notEmpty: true, noSpaces: true }),
};

export async function getDefaultNamespace() {
  const repositoryName = await tryGetRepositoryName();

  const [_, microFrontendName] = /frontend-(.+)/gi.exec(repositoryName) ?? [];
  return microFrontendName || repositoryName;
}
