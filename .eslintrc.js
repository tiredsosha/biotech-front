module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 0,
    'react/prop-types': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
  },
};
