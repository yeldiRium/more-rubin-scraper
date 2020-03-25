const scrapeUpcomingSitzungs = require("../../../scrape/upcomingSitzungs");

const upcoming = () => {
  return {
    name: "upcoming",
    description: "Lists the upcoming events.",

    optionDefinitions: [],

    async handle({ options }) {
      const upcomingSitzungs = await scrapeUpcomingSitzungs({
        baseUrl: options["base-url"],
      });

      console.table(upcomingSitzungs);
    },
  };
};

module.exports = upcoming;
