import { chalk, ProcessOutput } from 'zx';

import { catchProcess } from '../catch-process';

describe('catch-process', () => {
  const originalConsoleInfo = console.info;
  const originalProcessExit = process.exit;

  beforeEach(() => {
    Object.defineProperty(global.process, 'exit', {
      value: vi.fn(),
    });

    Object.defineProperty(global.console, 'info', {
      value: vi.fn().mockImplementation(makeSimpleText),
    });
  });

  afterEach(() => {
    Object.defineProperty(global.console, 'info', {
      value: originalConsoleInfo,
    });

    Object.defineProperty(global.process, 'exit', {
      value: originalProcessExit,
    });
  });

  it('should calls console.log', () => {
    catchProcess('message');

    expect(global.process.exit).toHaveBeenCalledTimes(1);
    expect(global.console.info).toHaveBeenCalledTimes(1);
  });

  it('should calls console.log with provided error', () => {
    catchProcess('message', 'error');

    expect(global.console.info).toHaveReturnedWith(
      makeSimpleText(chalk.red('message\nerror')),
    );
  });

  it('should calls console.log with provided ProcessOutput error', () => {
    const mockedProcessOutput = new ProcessOutput(
      1,
      null,
      'mocked-stdout',
      'mocked-stderr',
      'mocked-combined',
      'mocked-message',
    );

    catchProcess('message', mockedProcessOutput);

    expect(global.console.info).toHaveReturnedWith(
      makeSimpleText(chalk.red(`message\nmocked-stderr`)),
    );
  });
});

function makeSimpleText(...args: unknown[]) {
  return args
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]/gimu, '');
}
