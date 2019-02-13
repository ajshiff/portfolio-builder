const fs = require('fs');

function getOutputs (html, outputLocation) {
    fs.writeFileSync(outputLocation, html);
    return;
}

module.exports = getOutputs;