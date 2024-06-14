import { createOption } from 'commander';

export interface WithNamespaceArgument {
  namespace: string;
}

export const namespaceArgument = createOption(
  '-n, --namespace <namespace>',
  'provides namespace for microfrontend',
);
