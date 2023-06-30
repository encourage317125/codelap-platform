/* eslint-disable */
export default {
  displayName: 'backend-domain-domain',
  preset: '../../../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/backend/domain/domain',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'backend-domain-domain.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
