module.exports = {
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'test-reports/' }],
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
  transform: { '^.+\\.(js|jsx)$': 'babel-jest' },
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['__tests__/util'],
  testPathIgnorePatterns: ['__tests__/util'],
  globals: {
    google: {},
    dataLayer: {},
  },
  coverageDirectory: 'test-reports/',
  coverageThreshold: {
    global: {
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
