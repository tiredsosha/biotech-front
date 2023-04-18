module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/no-unresolved': 0,
    'no-unused-vars': 0,
    'import/no-extraneous-dependencies': 0,
  },
};
