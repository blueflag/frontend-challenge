module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  jest: {
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
  },
};
