const path = require('path');

/***********************************************************
 * Verifies the input is valid, then sanitizes it to ensure
 * the data on their input will work for the whole program.
 ***********************************************************/
function getInput (portfolioJsonLocation) {
    if (!portfolioJsonLocation)
        portfolioJsonLocation = 'PortfolioBuilder.json';
    let rawInput = verifyInput(portfolioJsonLocation);
    let sanitizedInput = rawInput.map( input => sanitizeInput(input));
    Object.freeze(sanitizedInput);
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
        throw new Error('You must specify a .json file as your first command line argument.')
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
        });
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

module.exports = getInput;