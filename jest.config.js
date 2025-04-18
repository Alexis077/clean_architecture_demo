/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/config/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
  resetMocks: true
}; 