const cheerio = require('cheerio');
var htmlDocTemplate = require('./htmlDocTemplate.js');

function generateHtml(projectList) {
    var templates = projectList.map((project) => {
        htmlDocTemplate(project);
    });
    let htmlProjectSnippits = projectList.map(generateHtmlSnippits);
    let htmlDoc = htmlProjectSnippits.reduce(addHtmlSnippits, htmlDocTemplate);
    return htmlDoc;
}

// 
function generateHtmlSnippits(project) {
    return project;
}

function addHtmlSnippits(htmlDoc, projectSnippit) {
    return htmlDoc;
}


module.exports = generateHtml;