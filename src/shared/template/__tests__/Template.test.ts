import { Template } from '../Template';

describe('Template', () => {
  it('should be instantiatable', () => {
    const template = new Template('test', { var: 'test' });
    expect(template).toBeDefined();
    expect(template).toBeInstanceOf(Template);
  });

  describe('Template.canCompile', () => {
    it('should return true if template contains variables', () => {
      const template = new Template('_% var %_/path', { var: 'test' });

      // @ts-expect-error "templateContent" is a private getter
      vi.spyOn(template, 'templateContent', 'get').mockImplementation(
        () => '<% var %> data',
      );

      expect(template.canCompile).toBe(true);
    });
  });

  describe('Template.compiledPath', () => {
    it('should return the provided path if there are no variables', () => {
      const template = new Template('test/path');
      expect(template.compiledPath).toBe('test/path');
    });

    it('should compile and return the provided path if there are variables', () => {
      const template = new Template('_% var %_/path', { var: 'test' });
      expect(template.compiledPath).toBe('test/path');
    });
  });

  describe('Template.compile', () => {
    it('should return the read template if there are no variables', () => {
      const template = new Template('test/path');

      // @ts-expect-error "templateContent" is a private getter
      vi.spyOn(template, 'templateContent', 'get').mockImplementation(
        () => 'test data',
      );

      expect(template.compile()).toBe('test data');
    });

    it('should compile and return the read if there are variables', () => {
      const template = new Template('test/path', { var: 'test' });

      // @ts-expect-error "templateContent" is a private getter
      vi.spyOn(template, 'templateContent', 'get').mockImplementation(
        () => '<% var %> data',
      );

      expect(template.compile()).toBe('test data');
    });
  });
});
