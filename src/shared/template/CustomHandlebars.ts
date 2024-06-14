import Handlebars from 'handlebars';

export type OpeningAndClosingTags = [string, string];

export class CustomHandlebars {
  public readonly instance: typeof Handlebars;

  constructor() {
    this.instance = Handlebars.create();
  }

  public compile<T = any>(
    input: string,
    data: T,
    tags: OpeningAndClosingTags,
  ): string {
    this.useTags(tags);

    return this.instance.compile(input)(data);
  }

  private useTags(tags: OpeningAndClosingTags) {
    const useCustomTags = createUseCustomTags();

    useCustomTags(this.instance, tags);

    return this;
  }
}

// Copied implementation of https://www.npmjs.com/package/handlebars-delimiters with a typings
function createUseCustomTags() {
  const cache: Record<string, RegExp | undefined> = {};

  function replaceDelimiters(
    input: string,
    source: string,
    escape?: boolean,
  ): string {
    const regex = cache[source] || (cache[source] = new RegExp(source, 'g'));
    let match;
    let newInput = input;

    while ((match = regex.exec(newInput))) {
      const prefix = newInput.slice(0, match.index);
      const inner = (escape ? '\\' : '') + '{{' + match[1] + '}}';
      const suffix = newInput.slice(match.index + match[0].length);
      newInput = prefix + inner + suffix;
    }

    return newInput;
  }

  function escapeDelimiters(input: string): string {
    return replaceDelimiters(input, '{{([\\s\\S]+?)}}', true);
  }

  type CustomHandlebarsType = typeof Handlebars & {
    _compile: typeof Handlebars.compile;
  };

  function useCustomTags(
    handlebarsInstance: typeof Handlebars,
    delimiters: [string, string],
  ) {
    if (!delimiters[0].endsWith('=')) {
      delimiters[0] += '(?!=)';
    }

    const source = delimiters[0] + '([\\s\\S]+?)' + delimiters[1];

    // Idea for compile method from http://stackoverflow.com/a/19181804/1267639
    if (!('_compile' in handlebarsInstance)) {
      (handlebarsInstance as CustomHandlebarsType)._compile =
        handlebarsInstance.compile;
    }

    handlebarsInstance.compile = function (input: any) {
      const args: Parameters<typeof Handlebars.compile> = [].slice // eslint-disable-next-line prefer-rest-params
        .call(arguments) as unknown as Parameters<typeof Handlebars.compile>;

      if (typeof input === 'string') {
        if (delimiters[0] !== '{{' && delimiters[1] !== '}}') {
          args[0] = escapeDelimiters(args[0]);
        }

        args[0] = replaceDelimiters(args[0], source);
      }

      return (handlebarsInstance as CustomHandlebarsType)._compile.apply(
        handlebarsInstance,
        args,
      );
    };
  }

  return useCustomTags;
}
