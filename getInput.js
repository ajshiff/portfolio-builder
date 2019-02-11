const path = require('path');


/***********************************************************
 * Verifies the input is valid, then sanitizes it to ensure
 * the data on their input will work for the whole program.
 ***********************************************************/
function getInput (portfolioJsonLocation) {
    if (!portfolioJsonLocation)
        portfolioJsonLocation = 'PortfolioBuilder.json';
    let rawInput = verifyInput(portfolioJsonLocation);
    let sanitizedInput = sanitizeInput(rawInput);
    return sanitizedInput;
}

/***********************************************************
 * If the input is a .json file, and it is valid json,
 * (as determined by Node's window.require() method ),
 * return a parsed version of their input file. Else, throw.
 ***********************************************************/
function verifyInput(portfolioJsonLocation) {
    let baseInput;
    portfolioJsonLocation = path.resolve(portfolioJsonLocation);
    if (path.extname(portfolioJsonLocation) !== '.json'){
        throw new Error(chalk.red('You must specify a .json file as your first command line argument.'))
    }
    baseInput = require(portfolioJsonLocation);
    return baseInput

}

/***********************************************************
 * Delete unused keys, and make sure properties on the array
 * are valid types.
 ***********************************************************/
function sanitizeInput (rawInput) {
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
    * 
    *******************************************************/
    function deleteUnusedKeys (verifyInput, rawInput) {
        return Object.keys(verifyInput).reduce( (acc, key) => {
            if (key in rawInput)
                acc[key] = rawInput[key];
            else 
                acc[key] = null;
            return acc;
        });
    }
    
    /******************************************************
    * 
    *******************************************************/
    function typifyInput (verifyInput, sanitizedInput) {
        // TODO decide whether or not to push null into the array, or leave array empty. 
        if (!Array.isArray(sanitizedInput.skills)){
            if (sanitizedInput.skills === null)
                sanitizedInput.skills = [];
            sanitizedInput.skills = [].concat(sanitizedInput.skills);
        }
        return sanitizedInput;
    }
}

module.exports = getInput;