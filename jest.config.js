import { defaults } from 'jest-config';

export default {
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  
  // The root of your source code, typically /src
  roots: ['<rootDir>/src'],
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.(js|jsx)',
    '**/*.(test|spec).(js|jsx)'
  ],
  
  // Module file extensions for importing modules
  moduleFileExtensions: ['js', 'jsx', 'json'],
  
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  
  // Transform files with babel before running tests
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  
  // Collect coverage from files
  collectCoverageFrom: [
    'src/**/*.(js|jsx)',
    '!src/main.jsx',
    '!src/index.css',
    '!src/**/*.test.(js|jsx)',
    '!src/**/*.spec.(js|jsx)'
  ],
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // The threshold for lines coverage
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
