const getDownloadPathOption = configuration => ({
  name: "download-path",
  type: "string",
  description: "The path to where to download stuff.",
  alias: "d",
  defaultValue: configuration.downloadPath,
  isRequired: configuration.downloadPath === undefined
});

module.exports = getDownloadPathOption;
