// Creates a Request object.
var request = require('request');
var moment = require('moment');

// Defines the base URL.
var baseURL = 'https://openexchangerates.org/api/latest.json';

// Defines function that queries the API.
function ratesRequest(callback) {
    // Gets key from the server. Later it will come from Heroku.
    var APIKEY = process.env.RATES_API_KEY;
    // Creates object with all the query parameters (just one now).
    var queryParam = { 'app_id' : APIKEY };
    // Sends request to server using parameters.
    request( {uri: baseURL, qs: queryParam}, function(error, rates_response, body) {
        // todo deal with errors

        // Checks that everything worked before continuing.
        if (!error && rates_response.statusCode == 200) {
            // Exception handler for parsing object.
            try {
                // Parses the returned data.
                var ratesJSON = JSON.parse(body);
            } catch (error) {
                return callback(error);   // just for catching JSON parsing errors.
            }
            // Only gets to this point if no errors. Returns the parsed JSON object.
            return callback(null, ratesJSON.rates);
        }
        // Error...
        else {
            console.log("Error in JSON request: " + error);
            console.log(rates_response);
            console.log(body);
            return callback(error);
            // todo what if no error and status is not 200?
        }
    });
}
// Returns the function created above.
module.exports = ratesRequest;
