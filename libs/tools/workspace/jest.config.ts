/* eslint-disable */
export default {
  displayName: 'tools-workspace',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/tools/workspace',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'tools-workspace.xml',
        reportTestSuiteErrors: true,
      },
    ],
  ],
}
