const getBaseUrlOption = configuration => ({
  name: "base-url",
  type: "string",
  description: "The base url of the base instance to scrape.",
  alias: "u",
  defaultValue: configuration.baseUrl,
  isRequired: configuration.baseUrl === undefined
});

module.exports = getBaseUrlOption;
