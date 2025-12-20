export default {
  verbose: true,
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
  moduleNameMapper: {
    '^../__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest'],
  },
};
