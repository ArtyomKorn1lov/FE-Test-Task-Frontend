export default {
  verbose: true,
  collectCoverageFrom: ['**/*.{js,jsx,mjs,cjs}', '!**/node_modules/**'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs)$': ['babel-jest'],
  },
};
