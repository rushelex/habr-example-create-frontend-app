import { ProcessOutput } from 'zx';

import { Log } from '~/shared/Log';

/**
 * @description Parse the error and print it to the console, and then terminate the Node.js process
 * @example
 *  catchProcess("Error text", new Error('This is an unknown error!'));
 *
 *  >>> ✗ Error text
 *  >>> ERROR: This is an unknown error!
 */
export function catchProcess(errorText: string, error?: unknown): never {
  const err =
    error instanceof ProcessOutput && Boolean(error.stderr)
      ? error.stderr
      : error;

  Log.error(Log.withLine(errorText), err);
  return process.exit(1);
}
