import Case from 'case';

import {
  CustomHandlebars,
  type OpeningAndClosingTags,
} from './CustomHandlebars';

export type Variables = Record<string, string | number | boolean>;

export class TemplateRenderer {
  /**
   * @description The tags that are searched for in the template. Inside these tags is the variable that needs to be replaced.
   */
  static DEFAULT_TEMPLATE_TAGS: OpeningAndClosingTags = ['<%', '%>'];

  /**
   * @description Same as {@link TemplateRenderer.DEFAULT_TEMPLATE_TAGS}, but for the file path. Windows does not support the "`<`" and "`>`" characters, so they must be replaced.
   */
  static DEFAULT_TEMPLATE_PATH_TAGS: OpeningAndClosingTags = ['_%', '%_'];

  static ALL_DEFAULT_TEMPLATE_TAGS = [
    ...TemplateRenderer.DEFAULT_TEMPLATE_TAGS,
    ...TemplateRenderer.DEFAULT_TEMPLATE_PATH_TAGS,
  ];

  private readonly handlebars: CustomHandlebars;

  constructor() {
    this.handlebars = new CustomHandlebars();
    this.registerHandlebarsHelpers();
  }

  /**
   * @description Compiles template strings into final strings.
   * @param template Template for compilation containing {@link TemplateRenderer.DEFAULT_TEMPLATE_TAGS} tags for content in a file or {@link TemplateRenderer.DEFAULT_TEMPLATE_PATH_TAGS} for file path.
   * @param variables Variables provided to the {@link template}. These variables will be substituted inside {@link TemplateRenderer.DEFAULT_TEMPLATE_TAGS} tags for file content or {@link TemplateRenderer.DEFAULT_TEMPLATE_PATH_TAGS} for file path.
   * @param [tags] {@link variables Variables} with different tags can be specified in the {@link template} (for example, when a file is imported that has a {@link variables} in its name). This parameter specifies which tags to start compiling the template with. Default: {@link TemplateRenderer.DEFAULT_TEMPLATE_TAGS}
   */
  public render(
    template: string,
    variables: Variables,
    tags = TemplateRenderer.DEFAULT_TEMPLATE_TAGS,
  ): string {
    const compiledTemplate = this.handlebars.compile(template, variables, tags);

    if (this.isFullyCompiled(compiledTemplate)) {
      return compiledTemplate;
    }

    return this.render(
      compiledTemplate,
      variables,
      TemplateRenderer.DEFAULT_TEMPLATE_PATH_TAGS,
    );
  }

  public hasVariables(template: string) {
    return TemplateRenderer.ALL_DEFAULT_TEMPLATE_TAGS.some((tag) =>
      template.includes(tag),
    );
  }

  private isFullyCompiled(template: string) {
    return TemplateRenderer.ALL_DEFAULT_TEMPLATE_TAGS.every(
      (tag) => !template.includes(tag),
    );
  }

  private registerHandlebarsHelpers() {
    this.handlebars.instance.registerHelper('lowercase', (str) => {
      return str.toLowerCase();
    });

    this.handlebars.instance.registerHelper('uppercase', (str) => {
      return str.toUpperCase();
    });

    this.handlebars.instance.registerHelper('camelcase', (str) => {
      return Case.camel(str);
    });

    this.handlebars.instance.registerHelper('pascalcase', (str) => {
      return Case.pascal(str);
    });

    this.handlebars.instance.registerHelper('kebabcase', (str) => {
      return Case.kebab(str);
    });

    this.handlebars.instance.registerHelper('snakecase', (str) => {
      return Case.snake(str);
    });
  }
}
