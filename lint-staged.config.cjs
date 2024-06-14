module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json,md}': (filenames) => {
    return `prettier ${filenames.join(' ')} --write`;
  },
  'src/**/*.{js,jsx,ts,tsx}': (filenames) => {
    return `cross-env NODE_ENV=production eslint ${filenames.join(' ')} --fix --color`;
  },
  'src/**/*.{ts,tsx}': () => {
    return 'tsc --noEmit --pretty --project tsconfig.json';
  },
};
