module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(scss)$": require.resolve("./emptyModule.js"),
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/test/setupFetch.js",
    "<rootDir>/src/test/setupTests.js",
  ],
};
