module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'lines-around-comment': ['warn', { beforeLineComment: true, beforeBlockComment: false, }],
    'quotes': ['warn', 'single', { 'avoidEscape': true }],
    'linebreak-style': ['warn', 'unix'],
    'eol-last': ['warn', 'always'],
    'semi': ['warn', 'always', { 'omitLastInOneLineBlock': false }],
    'semi-style': ['warn', 'last'],
    'no-extra-semi': ['warn'],
    'semi-spacing': ['warn', { 'before': false, 'after': false }],
    'comma-dangle': ['warn', {
      'arrays': 'always',
      'objects': 'always',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }],
    '@typescript-eslint/ban-ts-comment': ['warn'],
  },
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
};
