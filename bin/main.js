#!/usr/bin/env node
const getInput = require('../getInput.js');
const generateHtml = require('../generateHtml.js')
const getOutput = require('../getOutput.js');
const chalk = require('chalk');

function main (projectListFile, outputLocation) {
    const input = getInput(projectListFile, outputLocation);
    const html = generateHtml(input.projectList);
    getOutput(html, input.outputLocation);
}

try {
    main(process.argv[2], process.argv[3]);
} catch (e) {
    e.message = chalk.red(e.message)
    console.error(e);
}