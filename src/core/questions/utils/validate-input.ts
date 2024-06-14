interface ValidateInputConfig {
  notEmpty?: boolean;
  noSpaces?: boolean;
}

/**
 * @description Validates an input. If the input does not match any rule, the error text is returned and prompt requires you to enter the value again.
 */
export function validateInput(
  config?: ValidateInputConfig,
): (input: string) => string | true {
  const CYRILLIC_PATTERN = /[\u0400-\u04FF]/;

  return (input: string) => {
    if (config?.notEmpty && !input) {
      return 'Value cannot be empty';
    }

    if (config?.noSpaces && input.includes(' ')) {
      return 'Value cannot contains spaces';
    }

    if (CYRILLIC_PATTERN.test(input)) {
      return 'Value cannot contains cyrillic symbols';
    }

    return true;
  };
}
