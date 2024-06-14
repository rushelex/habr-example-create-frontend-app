import { chalk } from 'zx';

import { isWindows } from '~/shared/os';

const SUCCESS_SYMBOL = isWindows() ? '√' : '✓';
const WARNING_SYMBOL = isWindows() ? '‼' : '⚠';
const ERROR_SYMBOL = isWindows() ? '×' : '✗';
const INFO_SYMBOL = isWindows() ? 'i' : 'ℹ';

type LogText = string | number;

export class Log {
  /**
   * @example
   *  Log.success('Some text')
   *
   *  >>> ✓ Some text
   */
  static success(text: LogText, ...args: unknown[]): void {
    const msg = chalk.green(SUCCESS_SYMBOL, text, ...args);
    console.info(msg);
  }

  /**
   * @example
   *  Log.warning('Some text')
   *
   *  >>> ⚠ Some text
   */
  static warning(text: LogText, ...args: unknown[]): void {
    const msg = chalk.yellow(WARNING_SYMBOL, text, ...args);
    console.info(msg);
  }

  /**
   * @example
   *  Log.error('Some text')
   *
   *  >>> ✗ Some text
   */
  static error(text: LogText, ...args: unknown[]): void {
    const msg = chalk.red(ERROR_SYMBOL, text, ...args);
    console.info(msg);
  }

  /**
   * @example
   *  Log.info('Some text')
   *
   *  >>> ℹ Some text
   */
  static info(text: LogText, ...args: unknown[]): void {
    const msg = chalk.blue(INFO_SYMBOL, chalk.italic(text), ...args);
    console.info(msg);
  }

  /**
   * @example
   *  Log.withLine('Some text')
   *
   *  >>> Some text
   *  >>>
   */
  static withLine(text: LogText): string {
    return `${text}\n `;
  }
}
