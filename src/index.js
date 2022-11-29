#!/usr/bin/env node

const weather = require("./lib/weather");

const args = process.argv.slice(2);

weather(args[0], args[1])
    .then(console.log)
    .catch(console.error);
