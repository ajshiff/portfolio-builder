#!/usr/bin/env node
const getInput = require('../getInput.js');
const generateHtml = require('../generateHtml.js')
const getOutput = require('../getOutput.js');

function main (projectListFile, outputDetails) {
    const projectList = getInput(projectListFile);
    const html = generateHtml(projectList);
    getOutput(html, outputDetails);
}

main(process.argv[2], process.argv[3]);