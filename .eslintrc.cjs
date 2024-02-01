module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    // 'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-this-alias': 'error',
    'prefer-const': 'off',
    'no-console': 'warn',
    camelcase: [2, { properties: 'always' }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        htmlWhitespaceSensitivity: 'strict'
        // jsxBracketSameLine: true
        // bracketSameLine: false,
        // singleAttributePerLine: true
      }
    ]
  }
}
