const axios = require("axios");
const jQuery = require("jquery");
const { JSDOM } = require("jsdom");

const trimUrl = require("../util/trimUrl");

/**
 * @param {string} baseUrl A rubin instance's base url.
 */
const upcomingSitzungs = async ({ baseUrl }) => {
  baseUrl = trimUrl(baseUrl);

  const { data } = await axios({
    method: "get",
    url: baseUrl,
    responseEncoding: "latin1",
  });

  const $ = jQuery(new JSDOM(data).window);

  // The td with the table's caption
  const upcomingEventRows = $(`td:contains('Sitzungen der nächsten 30 Tage')`)
    // The tr in which the caption is
    .parent()
    // All trs in the table
    .siblings()
    // All trs with actual upcoming events
    .filter((i, tr) => $(tr).children().length > 1);

  const upcomingSitzungs = upcomingEventRows
    .map((i, tr) => {
      const $tr = $(tr);
      const $dateTd = $($tr.children()[1]);
      const $nameTd = $($tr.children()[2]);

      return {
        url: `${baseUrl}/${$dateTd.find("a").prop("href")}`,
        date: $dateTd.text(),
        name: $nameTd.text(),
      };
    })
    .get();

  return upcomingSitzungs;
};

module.exports = upcomingSitzungs;
