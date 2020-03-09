const axios = require("axios");
const jQuery = require("jquery");
const { JSDOM } = require("jsdom");

/**
 * @param {string} baseUrl               A rubin instance's base url.
 * @param {string} tagesordnungspunktUrl The Tagesordnungspunkt's url.
 */
const tagesordnungspunkt = async ({ baseUrl, tagesordnungspunktUrl }) => {
  const { data } = await axios({
    method: "get",
    url: tagesordnungspunktUrl,
    responseEncoding: "latin1"
  });

  const $ = jQuery(new JSDOM(data).window);

  const getContentInRow = name =>
    $(`td:contains('${name}')`)
      .next()
      .next()
      .text()
      .trim();

  const topRowMatch = /(?<index>.+).\[(?<publicString>.+)\]/u.exec(
    getContentInRow("TOP-Nr")
  );
  const { index, publicString } = topRowMatch ? topRowMatch.groups : {};
  const isPublic = publicString === "öffentlich";

  const event = getContentInRow("Sitzung");
  const subject = getContentInRow("Betreff");
  // TODO: parse this once more information is known.
  const date = getContentInRow("Termin");
  const location = getContentInRow("Raum");
  const councils = getContentInRow("Gremien");

  let vorlage = {};
  const hasVorlage = $(`.InfoBlock`).length >= 3;
  if (hasVorlage) {
    vorlage.number = getContentInRow("Nummer");
    vorlage.responsible = getContentInRow("Federführung");

    const $form = $("form[action='show_pdf.php']");

    vorlage.url = `${baseUrl}/show_pdf.php?_typ_432=${$form
      .find("input[name='_typ_432']")
      .val()}&_doc_n1=${$form
      .find("input[name='_doc_n1']")
      .val()}&_nk_nr=${$form
      .find("input[name='_nk_nr']")
      .val()}&_nid_nr=${$form
      .find("input[name='_nid_nr']")
      .val()}&_neu_dok=${$form
      .find("input[name='_neu_dok']")
      .val()}&status=${$form
      .find("input[name='status']")
      .val()}&sitzungsnummer=${$form
      .find("input[name='sitzungsnummer']")
      .val()}`;
  }

  let anlagen = [];
  const hasAnlagen = $(`.InfoBlock`).length >= 4;
  if (hasAnlagen) {
    anlagen = $("form[action='show_anlagen.php']")
      .map((i, form) => {
        const $form = $(form);

        return {
          name: $form.find("div.Anlagen").text(),
          url: `${baseUrl}/show_anlagen.php?_typ_432=${$form
            .find("input[name='_typ_432']")
            .val()}&_doc_n1=${$form
            .find("input[name='_doc_n1']")
            .val()}&_vorl_nr=${$form
            .find("input[name='_vorl_nr']")
            .val()}&_nid_nr=${$form
            .find("input[name='_nid_nr']")
            .val()}&_nk_nr=${$form.find("input[name='_nk_nr']").val()}`
        };
      })
      .get();
  }

  return {
    event,
    index,
    isPublic,
    subject,
    date,
    location,
    councils,
    vorlage,
    anlagen
  };
};

module.exports = tagesordnungspunkt;
