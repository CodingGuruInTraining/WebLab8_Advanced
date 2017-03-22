var request = require('request');
var moment = require('moment');

var baseURL = 'https://openexchangerates.org/api/';

function ratesRequest(callback) {
    var queryParam = {};
    var APIKEY = process.env.RATES_API_KEY;
}