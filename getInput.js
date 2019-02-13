const fs = require('fs');
const path = require('path');
const moment = require('moment');
const cheerio = require('cheerio');

/***********************************************************
 * Verifies the input is valid, then sanitizes it to ensure
 * the data on their input will work for the whole program.
 ***********************************************************/
function getInput (projectsJsonLocation, outputLocation, htmlTemplateLocation) {
    let rawInput = verifyJsonInput(projectsJsonLocation);
    let sanitizedInput = rawInput.map( input => sanitizeProjectList(input));
    Object.freeze(sanitizedInput);
    outputLocation = sanitizeOutputLocationInput(outputLocation);
    htmlTemplateLocation = sanitizeHtmlTemplateLocation(htmlTemplateLocation);
    verifyValidHtmlTemplate(htmlTemplateLocation);
    return {
        projectList: sanitizedInput,
        outputLocation: outputLocation,
        htmlTemplateLocation: htmlTemplateLocation
    }
}

/***********************************************************
 * If the input is a .json file, and it is valid json,
 * (as determined by Node's window.require() method ),
 * return a parsed version of their input file. Else, throw.
 ***********************************************************/
function verifyJsonInput(projectsJsonLocation) {
    let baseInput;
    if (!projectsJsonLocation || projectsJsonLocation === 'null') {
        let dirItems = fs.readdirSync('./');
        projectsJsonMatches = dirItems.filter(item => item.toLowerCase() === 'projectdata.json');
        if (projectsJsonMatches.length === 0)
            throw new Error('Couldn\'t find a ProjectData.json file in your working directory');
        projectsJsonLocation = path.resolve(projectsJsonMatches[0]);
    }
    projectsJsonLocation = path.resolve(projectsJsonLocation);
    if (path.extname(projectsJsonLocation) !== '.json'){
        throw new Error('You must specify a .json file as your first command line argument.')
    }
    baseInput = require(projectsJsonLocation);
    return baseInput

}

/***********************************************************
 * Delete unused keys, and make sure properties on the array
 * are valid types.
 ***********************************************************/
function sanitizeProjectList (rawInput) {
    let sanitizedInput;
    let verifyInput = {
        name: '',
        hours: '',
        link: '',
        timeframe: '',
        description: '',
        imgSrc: '',
        imgAlt: '',
        skills: [],
    }
    sanitizedInput = deleteUnusedKeys(verifyInput, rawInput);
    sanitizedInput = typifyInput(verifyInput, sanitizedInput);
    return sanitizedInput;

    /******************************************************
    * Keep keys on the source object, if those keys exist
    * on the template object. If keys don't exist on the
    * template object, create them on the source, and
    * initialize their value to null.
    *******************************************************/
    function deleteUnusedKeys (verifyInput, rawInput) {
        return Object.keys(verifyInput).reduce( (acc, key) => {
            if (key in rawInput)
                acc[key] = rawInput[key];
            else 
            acc[key] = null;
            return acc;
        }, {});
    }
    
    /******************************************************
    * This is the place to make sure each key is of the
    * correct type. As of right now, the only one that
    * matters that it is of the correct type is the skills
    * property. It needs to be an array for later. So check
    * for that, and fix it if needed.
    *******************************************************/
    function typifyInput (verifyInput, sanitizedInput) {
        if (!Array.isArray(sanitizedInput.skills)) {
            if (sanitizedInput.skills === null)
                sanitizedInput.skills = [];
            sanitizedInput.skills = [].concat(sanitizedInput.skills);
        }
        return sanitizedInput;
    }
}

/***********************************************************
 * - If faksy parameter was passed, set default name.
 * - else if parameter had no extension, assume it was a 
 *   directory, and join the default file name.
 * - else if the file extension name was not .html, throw.
 * - Also, if the container dir doesn't exist, throw.
 * - return sanitized outputLocation.
 ***********************************************************/
function sanitizeOutputLocationInput (outputLocation) {
    let defaultName = `${moment().format('YYYYMMDD_kkmm_ssSS')}-index.html`;
    let pathExt = path.extname(outputLocation || '');
    if (!outputLocation || outputLocation == "null")
        outputLocation = path.resolve(`./${defaultName}`);
    else if (pathExt === '')
        outputLocation = path.join(outputLocation, defaultName);
    else if (pathExt !== '.html')
        throw new Error(`Your output location, ${outputLocation} must have a ".html" extention.`);
    outputLocation = path.resolve(outputLocation);
    if (!fs.existsSync( path.dirname(outputLocation) ))
        throw new Error(`That html output location, ${outputLocation} , does not exist. Please try again.`);
    return outputLocation;
}


/***********************************************************
 * - If no parameter was passed, use default template
 * - else if the file extension name was not .html, throw.
 * - Also, if the specified file doesn't exist, throw.
 * - return sanitized outputLocation.
 ***********************************************************/
function sanitizeHtmlTemplateLocation (htmlTemplateLocation) {
    let pathExt = path.extname(htmlTemplateLocation || '');
    if (!htmlTemplateLocation || htmlTemplateLocation === 'null')
        htmlTemplateLocation = path.resolve(`./template-index.html`);
    else if (pathExt !== '.html')
        throw new Error(`Your html template, ${htmlTemplateLocation} , must have a ".html" extention.`);
    htmlTemplateLocation = path.resolve(htmlTemplateLocation);
    if (!fs.existsSync( htmlTemplateLocation ))
        throw new Error(`Your specified html template file, ${htmlTemplateLocation} , does not exist. Please try again.`);
    return htmlTemplateLocation;
}

/***********************************************************
 * - If no parameter was passed, use default template
 * - else if the file extension name was not .html, throw.
 * - Also, if the specified file doesn't exist, throw.
 * - return sanitized outputLocation.
 ***********************************************************/
function verifyValidHtmlTemplate (htmlTemplateLocation) {
    let htmlTemplate = fs.readFileSync(htmlTemplateLocation);
    let $ = cheerio.load(htmlTemplate);
    let vitalElement = $('.portfolioBuilder .projects');
    if (vitalElement.length === 0)
        throw new Error(`Your template html file, ${htmlTemplateLocation}, must contain a 'id="projects"' inside of a 'class="portfolioBuilder"' somewhere.`);
    return;
}

module.exports = getInput;