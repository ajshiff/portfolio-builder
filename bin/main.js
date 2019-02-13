#!/usr/bin/env node
const getInput = require('../getInput.js');
const generateHtml = require('../generateHtml.js')
const getOutput = require('../getOutput.js');
const chalk = require('chalk');

function main (projectListFile, outputLocation, htmlTemplateLocation) {
    const input = getInput(projectListFile, outputLocation, htmlTemplateLocation);
    const html = generateHtml(input.projectList, input.htmlTemplateLocation);
    getOutput(html, input.outputLocation);
}

try {
    main(process.argv[2], process.argv[3], process.argv[4]);
} catch (e) {
    e.message = chalk.red(e.message)
    console.error(e);
}