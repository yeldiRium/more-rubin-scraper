const sitzung = require("./sitzung");
const tagesordnungspunkt = require("./tagesordnungspunkt");
const upcoming = require("./upcoming");

const get = ({ configuration }) => {
  return {
    name: "get",
    description: "Read various data.",

    optionDefinitions: [],

    handle({ getUsage, ancestors }) {
      console.log(getUsage({ commandPath: [...ancestors, "get"] }));
    },

    subcommands: {
      sitzung: sitzung({ configuration }),
      tagesordnungspunkt: tagesordnungspunkt({ configuration }),
      upcoming: upcoming({ configuration }),
    },
  };
};

module.exports = get;
