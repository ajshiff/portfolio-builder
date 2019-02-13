const fs = requre('fs');

function getOutputs (html, outputDetails) {
    fs.writeFileSync(outputDetails, html);
    return;
}

module.exports = getOutputs;