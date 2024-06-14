interface TransformInputConfig {
  toLowerCase?: boolean;
}

/**
 * @description Transforms the input according to some rules.
 * @example
 *  const rawInput = '   SomE InPut     ';
 *
 *  transformInput()(rawInput);
 *
 *  >>> 'SomE InPut'
 *
 *  transformInput({ toLowerCase: true })(rawInput);
 *
 *  >>> 'some input'
 */
export function transformInput(
  config?: TransformInputConfig,
): (input: string) => string {
  return (input: string) => {
    let result = input.trim();

    if (config?.toLowerCase) {
      result = result.toLowerCase();
    }

    return result;
  };
}
