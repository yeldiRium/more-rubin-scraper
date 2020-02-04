const path = require("path");

const rc = require("rc");

const loadConfiguration = () => {
  return rc("mrs", {
    downloadPath: path.join(__dirname, "..", "download"),
    baseUrl: undefined
  });
};

module.exports = loadConfiguration;
