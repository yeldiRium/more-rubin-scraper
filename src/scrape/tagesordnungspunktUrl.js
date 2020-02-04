const trimUrl = require("../util/trimUrl");

const tagesordnungspunktUrl = ({ baseUrl, nid, vid, status }) => {
  baseUrl = trimUrl(baseUrl);

  return `${baseUrl}/beschluesse_details.php?&nid=${nid}&vid=${vid}&status=${status}`;
};

module.exports = tagesordnungspunktUrl;
