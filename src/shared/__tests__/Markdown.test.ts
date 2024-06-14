import { Markdown } from '../Markdown';

function createTemplateData(data: string) {
  return `[//]: # (start template)
${data}

[//]: # (end template)`;
}

describe('Markdown', () => {
  describe('Markdown.toString', () => {
    it('should return provided markdown data', () => {
      const md = new Markdown('# Heading').toString();
      expect(md).toBe('# Heading');
    });
  });

  describe('Markdown.cleanupTemplateData', () => {
    it('should clear template data when there is 1 template block', () => {
      const rawData = `${createTemplateData('# Template string 1')}
## Source string 1`;

      const md = new Markdown(rawData).cleanupTemplateData().toString();

      expect(md).toBe(`## Source string 1`);
    });

    it('should ', () => {
      const rawData = `${createTemplateData('# Template string 1')}
## Source string 1

${createTemplateData('# Template string 2')}

Source string 2`;

      const md = new Markdown(rawData).cleanupTemplateData().toString();

      expect(md).toBe(`## Source string 1

Source string 2`);
    });
  });

  describe('Markdown.prepend', () => {
    it('should insert data before first row', () => {
      const md = new Markdown(`First string`)
        .prepend(`Inserted string`)
        .toString();
      expect(md).toBe(`Inserted string\nFirst string`);
    });

    it('should insert data with empty row before first row', () => {
      const md = new Markdown(`First string`)
        .prepend(`Inserted string`, { emptyRow: true })
        .toString();
      expect(md).toBe(`Inserted string\n\nFirst string`);
    });
  });

  describe('Markdown.append', () => {
    it('should insert data after last row', () => {
      const md = new Markdown(`Last string`)
        .append(`Inserted string`)
        .toString();
      expect(md).toBe(`Last string\nInserted string`);
    });

    it('should insert data with empty row after last row', () => {
      const md = new Markdown(`Last string`)
        .append(`Inserted string`, { emptyRow: true })
        .toString();
      expect(md).toBe(`Last string\n\nInserted string`);
    });
  });
});
