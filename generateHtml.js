const cheerio = require('cheerio');
const fs = require('fs');

function generateHtml (projectList) {
    // TODO make a more dynamic input for htmlTemplate file.
    let htmlTemplate = fs.readFileSync('./template-index.html'); 
    let $ = cheerio.load(htmlTemplate);
    let htmlProjectSnippits = projectList.map(generateHtmlSnippits);
    let htmlDoc = htmlProjectSnippits.reduce(addHtmlSnippits, $);
    return htmlDoc;
}
 
function generateHtmlSnippits (project) {
    return project;
}

function addHtmlSnippits ($, projectSnippit) {
    let projectsDiv = $('.portfolioBuilder #projects').first();
    return $;
}


module.exports = generateHtml;