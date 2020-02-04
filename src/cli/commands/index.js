const download = require("./download");
const getBaseUrlOption = require("../options/baseUrl");
const get = require("./get");

const rootCommand = ({ configuration }) => {
  return {
    name: "mrs",
    description: "Scrapes data from a more-rubin rats info system.",

    optionDefinitions: [getBaseUrlOption(configuration)],

    handle({ getUsage }) {
      console.log(getUsage({ commandPath: ["mrs"] }));
    },

    subcommands: {
      download: download({ configuration }),
      get: get({ configuration })
    }
  };
};

module.exports = rootCommand;
