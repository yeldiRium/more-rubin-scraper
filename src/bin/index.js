#!/usr/bin/env node
const { runCli } = require("command-line-interface");

const loadConfiguration = require("../loadConfiguration");
const rootCommand = require("../cli/commands");

(async () => {
  const configuration = loadConfiguration();

  try {
    await runCli({
      rootCommand: rootCommand({ configuration }),
      argv: process.argv,
    });
  } catch (ex) {
    console.log(ex);
    process.exit(1);
  }
})();
