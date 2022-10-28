module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: [
        '<rootDir>/jest.setupFilesAfterEnv.ts'
    ],
    globalSetup: 'jest-preset-angular/global-setup',
  };