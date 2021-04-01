/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],

    // An array of regexp pattern strings that are matched against all test paths,
    // matched tests are skipped
    testPathIgnorePatterns: [
        '\\\\node_modules\\\\',
    ],

    // This option sets the URL for the jsdom environment.
    // It is reflected in properties such as location.href
    testURL: 'http://localhost',
};
