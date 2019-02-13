const cheerio = require('cheerio');
const fs = require('fs');
const makeProjectHtml = require('./makeProjectHtml.js');


/***********************************************************
 * 
 ***********************************************************/
function generateHtml (projectList, htmlTemplateLocation) {
    let htmlTemplate = fs.readFileSync(htmlTemplateLocation);
    let $ = cheerio.load(htmlTemplate);
    let htmlProjectSnippits = projectList.map(generateHtmlSnippits);
    let htmlDoc = htmlProjectSnippits.reduce(addHtmlSnippits, $).html();
    return htmlDoc;
}

/***********************************************************
 * 
 ***********************************************************/
function generateHtmlSnippits (project) {
    return makeProjectHtml(project);
}

/***********************************************************
 * 
 ***********************************************************/
function addHtmlSnippits ($, projectSnippit) {
    let projectsDiv = $('.portfolioBuilder .projects').first();
    projectsDiv.append(projectSnippit);
    return $;
}


module.exports = generateHtml;