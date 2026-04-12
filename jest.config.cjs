/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
  // Coverage settings: include profile folder and common source files
  collectCoverage: true,
  collectCoverageFrom: [
    "src/app/**/*.{ts,tsx}",
    "src/components/**/*.{ts,tsx}",
    "src/app/profile/**/*.{ts,tsx}",
    "!src/**/__tests__/**",
    "!**/*.d.ts",
  ],
  coverageDirectory: "coverage",
};
