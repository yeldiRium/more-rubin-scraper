const getSitzungUrl = require("../../../scrape/sitzungUrl");
const scrapeSitzung = require("../../../scrape/sitzung");

const upcoming = () => {
  return {
    name: "upcoming",
    description: "Lists the upcoming events.",

    optionDefinitions: [
      {
        name: "sid",
        type: "string",
        description: "The sid of the Sitzung.",
        isRequired: true,
        defaultOption: true,
      },
      {
        name: "load-tops",
        type: "boolean",
        description:
          "Whether to load Tagenordnungspunkt data or just display their names and urls.",
        defaultValue: false,
      },
    ],

    async handle({ options }) {
      const sitzungUrl = getSitzungUrl({
        baseUrl: options["base-url"],
        sid: options["sid"],
      });
      const sitzung = await scrapeSitzung({
        baseUrl: options["base-url"],
        sitzungUrl,
        loadTops: options["load-tops"],
      });

      console.log(JSON.stringify(sitzung, null, 2));
    },
  };
};

module.exports = upcoming;
