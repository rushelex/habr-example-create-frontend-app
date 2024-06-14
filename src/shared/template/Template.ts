import { fs } from 'zx';

import { TemplateRenderer, type Variables } from './TemplateRenderer';

/**
 * @description Wrapper for templates.
 */
export class Template {
  /**
   * @description Origin file path, preserving the characters in the path.
   * @description On Windows, the characters "`<`" and "`>`" are not allowed for the file path. If you run the CLI in a Windows environment, the characters in the path will turn into "`_`" automatically.
   * @example
   *  const templatePath = '/some/dir/_% someVariable %_-file-name.spec.ts';
   *  const templateVariables = { someVariable: 'test' };
   *  const template = new Template(templatePath, templateVariables);
   *
   *  >>> /some/dir/_% someVariable %_-file-name.spec.ts
   * @private
   */
  private readonly path: string;

  /**
   * @description Variables that will be substituted into the template.
   * @private
   */
  private readonly variables: Variables;

  private readonly renderer: TemplateRenderer;

  public constructor(path: string, variables: Variables = {}) {
    this.path = path;
    this.variables = variables;
    this.renderer = new TemplateRenderer();
  }

  /**
   * @description Compiles a template using {@link Variables}.
   */
  public compile(): string {
    return this.renderer.render(this.templateContent, this.variables);
  }

  /**
   * @description Compiled file path.
   * @example
   *  const templatePath = '/some/dir/_% someVariable %_-file-name.spec.ts';
   *  const templateVariables = { someVariable: 'test' };
   *  const template = new Template(templatePath, templateVariables);
   *
   *  >>> /some/dir/test-file-name.spec.ts
   */
  public get compiledPath() {
    return this.renderer.render(this.path, this.variables);
  }

  /**
   * @description If `true`, the template has variables and can be compiled
   */
  public get canCompile() {
    return this.renderer.hasVariables(this.templateContent);
  }

  private get templateContent(): string {
    return fs.readFileSync(this.path, { encoding: 'utf-8' });
  }
}
