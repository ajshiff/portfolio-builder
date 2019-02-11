const cheerio = require('cheerio');

function generateHtml (projectList) {
    let htmlDocTemplate = '';
    let htmlProjectSnippits = projectList.map(generateHtmlSnippits);
    let htmlDoc = htmlProjectSnippits.reduce(addHtmlSnippits, htmlDocTemplate);
    return htmlDoc;
}
 
function generateHtmlSnippits (project) {
    return project;
}

function addHtmlSnippits (htmlDoc, projectSnippit) {
    return htmlDoc;
}


module.exports = generateHtml;