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
    "<rootDir>/src/setupFetch.js",
    "<rootDir>/src/setupTests.js",
  ],
};
