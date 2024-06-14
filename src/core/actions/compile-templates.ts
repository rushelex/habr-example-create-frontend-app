import { chalk, fs, globby } from 'zx';

import { catchProcess } from '~/shared/catch-process';
import { Log } from '~/shared/Log';
import { tryGetRepositoryName } from '~/shared/package/repository-name';
import { Path } from '~/shared/Path';
import { Template, type Variables } from '~/shared/template';

interface TryCompileTemplatesConfig {
  variables: Variables;
  verbose: boolean;
}

/**
 * @description Looks for templates in the target directory and compiles them. After compilation deletes the original template files in the target directory.
 * @see Template
 */
export async function tryCompileTemplates(
  config: TryCompileTemplatesConfig,
): Promise<void> {
  const { variables, verbose } = config;

  try {
    const projectName = await tryGetRepositoryName();
    const normalizePath = (path: string) => getNormalizePath(path, projectName);

    await moveCIConfigs(verbose, normalizePath);

    const templates = await getPathsByGlob(['**/*']);

    for (const templatePath of templates) {
      const templateFullPath = Path.cwd(templatePath);

      const template = new Template(templateFullPath, variables);

      const shouldCompileTemplate =
        template.canCompile || templatePath.includes('.template');

      if (!shouldCompileTemplate) {
        continue;
      }

      const templateCompiledPath = template.compiledPath;

      if (verbose) {
        if (
          (await normalizePath(templateFullPath)) ===
          (await normalizePath(templateCompiledPath))
        ) {
          Log.info(
            `Compile file: ${chalk.cyan(
              await normalizePath(templateFullPath),
            )}`,
          );
        } else {
          Log.info(
            `Compile file
   Source:      ${chalk.cyan(await normalizePath(templateFullPath))}
   Destination: ${chalk.cyan(await normalizePath(templateCompiledPath))}`,
          );
        }
      }

      await fs.outputFile(templateCompiledPath, template.compile(), {
        encoding: 'utf-8',
      });
    }

    const originTemplateFiles = await getPathsByGlob([
      '**/*.template*',
      '**/*_%*',
    ]);

    for (const originTemplateFile of originTemplateFiles) {
      if (verbose) {
        Log.info(
          `Remove file:  ${chalk.cyan(
            await normalizePath(originTemplateFile),
          )}`,
        );
      }

      await fs.rm(originTemplateFile);
    }

    Log.success('Templates compiled');
  } catch (error) {
    return catchProcess('Templates are not compiled.', error);
  }
}

async function getPathsByGlob(pattern: string[]) {
  return globby(pattern, {
    cwd: Path.cwd(),
    ignore: [
      '**/.vscode',
      '**/.idea',
      '**/.cache',
      '**/.git',
      '**/.husky',
      '**/build',
      '**/node_modules',
    ],
    dot: true,
  });
}

async function removeTemplateCIConfig(verbose: boolean) {
  const templateCIConfigsPath = Path.cwd('.github', 'workflows');

  if (verbose) {
    Log.info('Remove template workflows');
  }

  await fs.rm(templateCIConfigsPath, { recursive: true });
}

async function moveCIConfigs(
  verbose: boolean,
  normalizePath: (path: string) => Promise<string>,
) {
  await removeTemplateCIConfig(verbose);

  const srcCIConfigsDir = Path.cwd('.github', '__workflows__');
  const destCIConfigsDir = Path.cwd('.github', 'workflows');

  if (verbose) {
    Log.info(
      `Move CI workflows with overwrite
   Source:      ${chalk.cyan(await normalizePath(srcCIConfigsDir))}
   Destination: ${chalk.cyan(await normalizePath(destCIConfigsDir))}`,
    );
  }

  await fs.move(srcCIConfigsDir, destCIConfigsDir, { overwrite: true });
}

async function getNormalizePath(fullPath: string, projectName: string) {
  return Path.substringFromProjectName(fullPath, projectName);
}
