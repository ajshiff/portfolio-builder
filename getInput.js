const fs = require('fs');
const path = require('path');
const moment = require('moment');

/***********************************************************
 * Verifies the input is valid, then sanitizes it to ensure
 * the data on their input will work for the whole program.
 ***********************************************************/
function getInput (projectsJsonLocation, outputLocation) {
    let rawInput = verifyJsonInput(projectsJsonLocation);
    let sanitizedInput = rawInput.map( input => sanitizeProjectList(input));
    Object.freeze(sanitizedInput);
    outputLocation = sanitizeOutputLocationInput(outputLocation);
    return {
        projectList: sanitizedInput,
        outputLocation: outputLocation
    }
}

/***********************************************************
 * If the input is a .json file, and it is valid json,
 * (as determined by Node's window.require() method ),
 * return a parsed version of their input file. Else, throw.
 ***********************************************************/
function verifyJsonInput(projectsJsonLocation) {
    let baseInput;
    if (!projectsJsonLocation) {
        let fs = require('fs');
        let dirItems = fs.readdirSync('./');
        projectsJsonLocation = dirItems.filter(item => item.toLocaleLowerCase() === 'projectdata.json')[0];
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
 * - If no parameter was passed, set default name.
 * - else if parameter had no extension, assume it was a 
 *   directory, and join the default file name.
 * - else if the file extension name was not .html, throw.
 * - Also, if the container dir doesn't exist, throw.
 * - return sanitized outputLocation.
 ***********************************************************/
function sanitizeOutputLocationInput (outputLocation) {
    let defaultName = `${moment().format('YYYYMMDD_kkmm_ssSS')}-index.html`;
    let pathExt = path.extname(outputLocation || '');
    if (!outputLocation)
        outputLocation = path.resolve(`./${defaultName}`);
    else if (pathExt === '')
        outputLocation = path.join(outputLocation, defaultName);
    else if (pathExt !== '.html')
        throw new Error('Your output location must have a ".html" extention.');
    if (!fs.existsSync( path.dirname(outputLocation) ))
        throw new Error('That output location does not exist. Please try again.');
    outputLocation = path.resolve(outputLocation);
    return outputLocation;
}

module.exports = getInput;