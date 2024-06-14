import { fileURLToPath } from 'url';
import { path } from 'zx';

import { Path } from '../Path';

describe('Path', () => {
  describe('Path.projectRoot', () => {
    it('should return correct path to project root', () => {
      const expectedPathToRoot = path.resolve(
        fileURLToPath(import.meta.url),
        '../../../..',
      );

      expect(Path.projectRoot).toBe(expectedPathToRoot);
    });
  });

  describe('Path.r', () => {
    it('should return resolved path from project root', () => {
      const expectedPath = path.join(
        fileURLToPath(import.meta.url),
        '../../../..',
        'test',
        'file.json',
      );

      expect(Path.r('test', 'file.json')).toBe(expectedPath);
      expect(Path.r('test/file.json')).toBe(expectedPath);
    });
  });

  describe('Path.cwd', () => {
    const originalProcessCWD = process.cwd();

    afterEach(() => {
      Object.defineProperty(process, 'cwd', {
        value: () => originalProcessCWD,
      });
    });

    it('should return path to file starting from project root', () => {
      Object.defineProperty(process, 'cwd', {
        value: () => 'mocked_cwd',
      });

      expect(Path.cwd()).toBe('mocked_cwd');
      expect(Path.cwd('to', 'test-project')).toBe('mocked_cwd/to/test-project');
      expect(Path.cwd('to/test-project')).toBe('mocked_cwd/to/test-project');
    });
  });

  describe('Path.substringFromProjectName', () => {
    it('should return path to file starting from project root', () => {
      const fullPath = '/path/to/test-project/src/feature/file.json';
      const expectedPath = 'src/feature/file.json';

      expect(Path.substringFromProjectName(fullPath, 'test-project')).toBe(
        expectedPath,
      );
    });
  });
});
