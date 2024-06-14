import { isWindows } from '../os';

describe('isWindows', () => {
  const originalPlatform = process.platform;

  afterEach(() => {
    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
    });
  });

  it('should return true if the OS is Windows', async () => {
    Object.defineProperty(process, 'platform', {
      value: 'win32',
    });
    expect(isWindows()).toBe(true);
  });

  it('should return true if the OS is not Windows', async () => {
    Object.defineProperty(process, 'platform', {
      value: 'OtherOS',
    });
    expect(isWindows()).toBe(false);
  });
});
