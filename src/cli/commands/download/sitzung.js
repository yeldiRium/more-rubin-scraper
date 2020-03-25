const fs = require("fs");
const path = require("path");
const stream = require("stream");
const util = require("util");

const axios = require("axios");
const shell = require("shelljs");

const encodePath = require("../../../util/encodePath");
const getSitzungUrl = require("../../../scrape/sitzungUrl");
const scrapeSitzung = require("../../../scrape/sitzung");

const pipeline = util.promisify(stream.pipeline);

const sitzung = () => {
  return {
    name: "sitzung",
    description: "Download a Sitzung and all documents related to it.",

    optionDefinitions: [
      {
        name: "sid",
        type: "string",
        description: "The sid of the Sitzung.",
        isRequired: true,
        defaultOption: true,
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
        loadTops: true,
      });
      const sitzungPath = path.join(
        options["download-path"],
        "sitzungen",
        encodePath(sitzung.title)
      );

      shell.mkdir("-p", sitzungPath);

      for (const top of sitzung.tagesordnungspunkts) {
        const topPath = path.join(
          sitzungPath,
          `${top.index}_${encodePath(top.subject)}`
        );

        shell.mkdir("-p", topPath);

        const downloads = [];

        if (top.vorlage.url) {
          downloads.push({ name: "Vorlage", url: top.vorlage.url });
        }
        if (top.anlagen.length > 0) {
          downloads.push(
            ...top.anlagen.map((anlage) => ({
              name: anlage.name,
              url: anlage.url,
            }))
          );
        }

        await Promise.all(
          downloads.map(async ({ name, url }) => {
            const fileStream = fs.createWriteStream(
              path.join(topPath, `${name}.pdf`)
            );

            const { data } = await axios({
              method: "get",
              url,
              responseType: "stream",
            });

            await pipeline(data, fileStream);
          })
        );
      }
    },
  };
};

module.exports = sitzung;
