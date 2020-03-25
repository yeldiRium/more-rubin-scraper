const getTagesordnungspunktUrl = require("../../../scrape/tagesordnungspunktUrl");
const scrapeTagesordnungspunkt = require("../../../scrape/tagesordnungspunkt");

const upcoming = () => {
  return {
    name: "tagesordnungspunkt",
    description: "Fetches data for Tagesordnungspunkt with given id.",

    optionDefinitions: [
      {
        name: "nid",
        type: "string",
        description: "The nid of the Tagesordnungspunkt.",
        isRequired: true,
      },
      {
        name: "vid",
        type: "string",
        description: "The vid of the Tagesordnungspunkt.",
        isRequired: true,
      },
      {
        name: "status",
        type: "string",
        description: "The status of the Tagesordnungspunkt.",
        isRequired: true,
      },
    ],

    async handle({ options }) {
      const tagesordnungspunktUrl = getTagesordnungspunktUrl({
        baseUrl: options["base-url"],
        nid: options["nid"],
        vid: options["vid"],
        status: options["status"],
      });
      const tagesordnungspunkt = await scrapeTagesordnungspunkt({
        baseUrl: options["base-url"],
        tagesordnungspunktUrl,
      });

      console.log(JSON.stringify(tagesordnungspunkt, null, 2));
    },
  };
};

module.exports = upcoming;
