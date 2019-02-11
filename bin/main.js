#!/usr/bin/env node
const getInput = require('../getInput.js');
const generateHtml = require('../generateHtml.js')
const getOutput = require('../getOutput.js');
const chalk = require('chalk');

function main (projectListFile, outputDetails) {
    const projectList = getInput(projectListFile);
    const html = generateHtml(projectList);
    getOutput(html, outputDetails);
}

try {
    main(process.argv[2], process.argv[3]);
} catch (e) {
    e.message = chalk.red(e.message)
    console.error(e);
}