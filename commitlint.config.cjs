module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0, 'always', 90],
    'footer-max-line-length': [0, 'always', 256],
  },
};
