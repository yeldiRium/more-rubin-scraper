const encodePath = string => string.replace(/[\\/?<>:*|".]/u, "").slice(0, 40);

module.exports = encodePath;
