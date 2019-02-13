const cheerio = require('cheerio');
const fs = require('fs');
const makeProjectHtml = require('./makeProjectHtml.js');

function generateHtml (projectList, indexHtmlTemplate = './template-index.html') {
    indexHtmlTemplate = fs.readFileSync(indexHtmlTemplate);
    let $ = cheerio.load(indexHtmlTemplate);
    let htmlProjectSnippits = projectList.map(generateHtmlSnippits);
    let htmlDoc = htmlProjectSnippits.reduce(addHtmlSnippits, $).html();
    console.log(htmlDoc)
    return htmlDoc;
}

function generateHtmlSnippits (project) {
    return makeProjectHtml(project);
}

function addHtmlSnippits ($, projectSnippit) {
    let projectsDiv = $('.portfolioBuilder #projects').first();
    projectsDiv.append(projectSnippit);
    return $;
}


module.exports = generateHtml;