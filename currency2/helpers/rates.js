var request = require('request');
var moment = require('moment');

var baseURL = 'https://openexchangerates.org/api/';

function ratesRequest(callback) {
    var APIKEY = process.env.RATES_API_KEY;
    var queryParam = { 'api_key' : APIKEY };
    request( {uri: baseURL, qs: queryParam}, function(error, rates_response, body) {
        if (!error && rates_response.statusCode == 200) {
            console.log("no errors?");
            var ratesJSON = JSON.parse(body);
        }
    })
}




module.exports = ratesRequest;