import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const jestConfig = {
  testEnvironment: 'jsdom',
  setupFiles: ['jest-environment-jsdom', 'jest-localstorage-mock'],
  resetMocks: false,
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['/dist/', '<rootDir>/node_modules/', '/.git/'],
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
}
module.exports = jestConfig
