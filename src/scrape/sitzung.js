const axios = require("axios");
const jQuery = require("jquery");
const { JSDOM } = require("jsdom");

const getTagesordnungspunktUrl = require("./tagesordnungspunktUrl");
const tagesordnungspunkt = require("./tagesordnungspunkt");
const trimUrl = require("../util/trimUrl");

/**
 *
 * @param {string}  baseUrl    A rubin instance's base url.
 * @param {string}  sitzungUrl The Sitzung's url.
 * @param {boolean} loadTops   Whether to load the Tagesordnungspunkts or just
 *                             show their name and url.
 */
const sitzung = async ({ baseUrl, sitzungUrl, loadTops = false }) => {
  baseUrl = trimUrl(baseUrl);

  const { data } = await axios({
    method: "get",
    url: sitzungUrl,
    responseEncoding: "latin1",
  });

  const $ = jQuery(new JSDOM(data).window);

  const getContentInRow = (name) =>
    $(`td:contains('${name}')`).next().text().trim();

  const title = $("b.Suchueberschrift").first().text();
  const date = getContentInRow("Termin");
  const location = getContentInRow("Raum");
  const councils = getContentInRow("Gremien");

  // TODO: Scrape invitees.
  const invitees = [];

  const tagesordnungspunkts = await Promise.all(
    $("#ajax_sitzungsmappe tr")
      .map((i, tr) => {
        const $tr = $(tr);

        const $form = $tr.find("form[name='aufgaben']");

        const vid = $form.find("input[name='vid']").val();
        const nid = $form.find("input[name='nid']").val();
        const status = $form.find("input[name='status']").val();
        const url = getTagesordnungspunktUrl({ baseUrl, vid, nid, status });

        if (loadTops) {
          return tagesordnungspunkt({ baseUrl, tagesordnungspunktUrl: url });
        }

        const index = $($tr.find("td").get(1)).text();
        const subject = $($tr.find("td").get(4)).text();

        return {
          index,
          subject,
          url,
        };
      })
      .get()
  );

  return {
    title,
    date,
    location,
    councils,
    invitees,
    tagesordnungspunkts,
  };
};

module.exports = sitzung;
