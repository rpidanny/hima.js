const baseConfig = require('./jest-base')

module.exports = {
  ...baseConfig,
  rootDir: '.',
  roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  testPathIgnorePatterns: ['<rootDir>/src/__mocks__/*'],
  setupFilesAfterEnv: ['./test/setup-test.js'],
  cacheDirectory: '<rootDir>/.cache/unit',
}
