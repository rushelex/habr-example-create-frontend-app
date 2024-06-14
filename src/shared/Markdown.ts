interface InjectDataConfig {
  emptyRow?: boolean;
}

export class Markdown {
  constructor(private rawData: string) {}

  public prepend(data: string, config?: InjectDataConfig): Markdown {
    const { emptyRow } = config ?? {};
    let newData = `${data}\n`;
    if (emptyRow) {
      newData = `${newData}\n`;
    }
    this.rawData = newData + this.rawData;
    return this;
  }

  public append(data: string, config?: InjectDataConfig): Markdown {
    const { emptyRow } = config ?? {};
    let newData = `\n${data}`;
    if (emptyRow) {
      newData = `\n${newData}`;
    }
    this.rawData += newData;
    return this;
  }

  public cleanupTemplateData(): Markdown {
    const regexpForRemove = getRegexpForCleanup();
    this.rawData = this.rawData.replace(regexpForRemove, '');
    return this;
  }

  public toString(): string {
    return this.rawData;
  }
}

function getRegexpForCleanup() {
  const COMMENT_PATTERN = '\\[\\/\\/\\]: # ';
  const startPattern = `\n?${COMMENT_PATTERN}\\(start template\\)`;
  const endPattern = `${COMMENT_PATTERN}\\(end template\\)\n?`;
  return new RegExp(`${startPattern}(.|\n)+?${endPattern}`, 'gim');
}
