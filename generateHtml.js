const cheerio = require('cheerio');
const fs = require('fs');

function generateHtml (projectList, htmlTemplate = './template-index.html') {
    htmlTemplate = fs.readFileSync(htmlTemplate); 
    let $ = cheerio.load(htmlTemplate);
    let htmlProjectSnippits = projectList.map(generateHtmlSnippits);
    let htmlDoc = htmlProjectSnippits.reduce(addHtmlSnippits, $).html();
    console.log(htmlDoc)
    return htmlDoc;
}

function generateHtmlSnippits (project) {
    project = `\n<span>This Project is called ${project.name}</span>`;
    return project;
}

function addHtmlSnippits ($, projectSnippit) {
    let projectsDiv = $('.portfolioBuilder #projects').first();
    projectsDiv.append(projectSnippit);
    return $;
}


module.exports = generateHtml;