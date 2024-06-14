import { TemplateRenderer } from '../TemplateRenderer';

describe('TemplateRenderer', () => {
  it.each([
    ['<%', '%>'],
    ['_%', '%_'],
  ])(
    'should compile template without variables [tags: "%s" and "%s"]',
    (openTag, closeTag) => {
      const template = `${openTag} variable ${closeTag} test text`;
      const variables = {};
      const expected = ' test text';

      expect(new TemplateRenderer().render(template, variables)).toEqual(
        expected,
      );
    },
  );

  it.each([
    ['<%', '%>'],
    ['_%', '%_'],
  ])(
    'should compile template with variable [tags: "%s" and "%s"]',
    (openTag, closeTag) => {
      const template = `${openTag} variable ${closeTag} test text`;
      const variables = {
        variable: 'TestVariable',
      };
      const expected = 'TestVariable test text';

      expect(new TemplateRenderer().render(template, variables)).toEqual(
        expected,
      );
    },
  );

  it('should compile template if different tags are specified', () => {
    const template = '<% variable1 %> test _% variable2 %_ text';
    const variables = {
      variable1: 'TestVariable1',
      variable2: 'TestVariable2',
    };
    const expected = 'TestVariable1 test TestVariable2 text';

    expect(new TemplateRenderer().render(template, variables)).toEqual(
      expected,
    );
  });

  it.each([
    { helper: 'lowercase', input: 'TestVariable', expected: 'testvariable' },
    { helper: 'uppercase', input: 'TestVariable', expected: 'TESTVARIABLE' },
    { helper: 'camelcase', input: 'test-variable', expected: 'testVariable' },
    { helper: 'pascalcase', input: 'test-variable', expected: 'TestVariable' },
    { helper: 'kebabcase', input: 'TestVariable', expected: 'test-variable' },
    { helper: 'snakecase', input: 'TestVariable', expected: 'test_variable' },
  ])(
    'should compile template if helper $helper is provided',
    ({ helper, input, expected }) => {
      const template = `<% ${helper} variable %> test text`;
      const variables = { variable: input };

      expect(new TemplateRenderer().render(template, variables)).toEqual(
        `${expected} test text`,
      );
    },
  );
});
