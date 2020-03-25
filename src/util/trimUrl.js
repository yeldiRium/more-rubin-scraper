const trimUrl = (url) => (url.slice(-1) === "/" ? url.slice(0, -1) : url);

module.exports = trimUrl;
