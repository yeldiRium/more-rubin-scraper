const getDownloadPathOption = require("../../options/downloadPath");
const sitzung = require("./sitzung");

const download = ({ configuration }) => {
  return {
    name: "download",
    description: "Download stuff.",

    optionDefinitions: [getDownloadPathOption(configuration)],

    handle({ getUsage, ancestors }) {
      console.log(getUsage({ commandPath: [...ancestors, "download"] }));
    },

    subcommands: {
      sitzung: sitzung({ configuration }),
    },
  };
};

module.exports = download;
