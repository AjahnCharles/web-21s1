module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    'google',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module'
  },
  ignorePatterns: [
    '/dist/**/*',
    '/lib/**/*'
  ],
  plugins: [
    '@typescript-eslint',
    'import'
  ]
}
