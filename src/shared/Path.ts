import { fileURLToPath } from 'url';
import { fs, path } from 'zx';

export class Path {
  static r(...parts: string[]): string {
    return path.join(Path.projectRoot, ...parts);
  }

  static cwd(...parts: string[]): string {
    return path.join(process.cwd(), ...parts);
  }

  /**
   * @example
   *  const fullPath = '/Users/username/some/directory/to/project/project-name/some/directory/to/file.json';
   *  const repositoryName = 'project-name';
   *  const normalizePath = Path.cwdPkgRoot(fullPath, 'project-name');
   *
   *  >>> 'project-name/some/directory/to/file.json'
   */
  static substringFromProjectName(
    fullPath: string,
    repositoryName: string,
  ): string {
    const PKG_ROOT_REGEXP = new RegExp(`.+${repositoryName}/(.+)`, 'gi');

    const parts = PKG_ROOT_REGEXP.exec(fullPath);

    return parts?.[1] || fullPath;
  }

  /**
   * @description Recursively climbs up and looks for the `package.json` file. If the file is found, this directory is assumed to be the root directory of the project.
   * @returns Path to the root directory of the current project.
   * @example
   *  .
   *  ├── 1.ts
   *  ├── 2.ts
   *  ├── dir-1
   *  │   ├── 1-1.ts
   *  │   └── 1-2.ts
   *  ├── dir-2
   *  │   ├── dir-2-1
   *  │   │   ├── 2-1-1.ts
   *  │   │   └── Path.ts
   *  │   └── package.json
   *  └── package.json
   *
   *  Path.projectRoot()
   *
   *  >>> ./dir-2
   */
  static get projectRoot(): string {
    let currentDir = fileURLToPath(import.meta.url);
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
      currentDir = path.join(currentDir, '..');
    }
    return currentDir;
  }
}
