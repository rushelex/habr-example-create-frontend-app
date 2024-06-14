import { type WithDepsArgument } from './deps';
import { type WithNamespaceArgument } from './namespace';
import { type WithPostInfoArgument } from './post-info';
import { type WithVerboseArgument } from './verbose';

export type Arguments = WithDepsArgument &
  WithNamespaceArgument &
  WithPostInfoArgument &
  WithVerboseArgument;
