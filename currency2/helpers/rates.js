var request = require('request');
var moment = require('moment');

var baseURL = 'https://openexchangerates.org/api/latest.json';

function ratesRequest(callback) {
  var APIKEY = process.env.RATES_API_KEY;
  var queryParam = { 'app_id' : APIKEY };
  request( {uri: baseURL, qs: queryParam}, function(error, rates_response, body) {
    // todo deal with errors

    if (!error && rates_response.statusCode == 200) {
      console.log("no errors?");

      try {
        var ratesJSON = JSON.parse(body);
      } catch (error) {
        return callback(error);   // just for cactching JSON parsing errors.
      }

      return callback(null, ratesJSON.rates);

    }

    else {
      return callback(error);
      // todo what if no error and status is not 200?
    }
  });
}




module.exports = ratesRequest;
