const trimUrl = require("../util/trimUrl");

const sitzungUrl = ({ baseUrl, sid }) => {
  baseUrl = trimUrl(baseUrl);

  return `${baseUrl}/sitzungen_top.php?sid=${sid}`;
};

module.exports = sitzungUrl;
