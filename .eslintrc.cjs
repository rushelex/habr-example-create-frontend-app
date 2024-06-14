const { configure, presets } = require('eslint-kit');

module.exports = configure({
  presets: [
    presets.imports({
      sort: {
        newline: true,
      },
      alias: {
        root: './src',
        paths: {
          '~': '.',
        },
      },
    }),
    presets.node(),
    presets.typescript({
      root: '.',
      tsconfig: './tsconfig.json',
    }),
  ],
  extend: {
    root: true,
    env: {
      es6: true,
      node: true,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
});
