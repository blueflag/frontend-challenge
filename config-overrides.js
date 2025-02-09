const path = require("path");

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "react/jsx-runtime": path.resolve(
      __dirname,
      "node_modules/react/jsx-runtime.js"
    ),
    "@": path.resolve(__dirname, "src"),
  };
  return config;
};
