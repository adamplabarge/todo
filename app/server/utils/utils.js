/*
 * Helpers for various task
 */

// Container for all the helpers
const utils = {};

// Parse a JSON string to an object in all cases w/o throwing error
utils.parseJsonToObject = (str) => {
    try{
        let obj = JSON.parse(str);
        return obj;
    } catch (e) {
        return {};
    }
}

// Create a string of random alphnumeric chars of a given lenght
utils.createRandomString = (strLength) => {
    strLength = typeof(strLength) === 'number' && strLength > 0 ? strLength : false;
    if (strLength) {
        // Define all the possible char that could go in
        let possibleChars = 'abcdefgihjklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let str = '';

        for (let i = 1; i <= strLength; i++) {
            // Get random char
            let randomChar = possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            // Append to final string
            str += randomChar
        }

        // Return string
        return str;
    } else {
        return false;
    }
};

// Export the module
module.exports = utils