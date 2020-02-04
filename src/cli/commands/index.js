const download = require("./download");
const getBaseUrlOption = require("../options/baseUrl");
const get = require("./get");

const rootCommand = ({ configuration }) => {
  return {
    name: "mrs",
    description: "Scrapes data from a more-rubin rats info system.",

    optionDefinitions: [getBaseUrlOption(configuration)],

    handle({ getUsage, options }) {
      console.log(getUsage({ commandPath: ["mrs"] }));

      console.log("Current configuration:");
      console.log(JSON.stringify(configuration, null, 2));

      console.log("Current options:");
      console.log(JSON.stringify(options, null, 2));
    },

    subcommands: {
      download: download({ configuration }),
      get: get({ configuration })
    }
  };
};

module.exports = rootCommand;
