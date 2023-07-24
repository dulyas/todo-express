const { pathsToModuleNameMapper } = require('ts-jest');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: 'node',
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
};