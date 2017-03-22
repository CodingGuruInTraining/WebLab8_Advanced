var express = require('express');
var router = express.Router();
//var rates = require('./rates.js');
var request = require('request');


// var exchangeRates = { 'EUR' : 0.9458, 'JPY' : 113.938, 'EP' : 17.4983, 'INR' : 66.6376, 'CUP' : 26.5 };

router.get('/', function(req, res){
    res.render('index');
});

router.get('/convert', function(req, res) {
    var input = req.query.dollar_amount;
    var convertTo = req.query.to_currency;
    var convertFrom = req.query.from_currency;

    console.log(convertFrom, convertTo)

    var baseURL = 'https://openexchangerates.org/api/latest.json';

    var queryParam = { app_id : process.env.RATES_API_KEY };

    request({ url : baseURL, qs : queryParam } , function(err, response, data){

      //todo check for error and handle
      if (err) {
         return next(err);
      }

      else {
        var ratesJSON = JSON.parse(data);
        console.log(ratesJSON);  // everything compared to USD

        var convertToCurrencyRelatedToUSD =  ratesJSON.rates[convertTo];
        var convertFromCurrencyRelatedToUSD =  ratesJSON.rates[convertFrom];

        console.log(convertFromCurrencyRelatedToUSD);
        console.log(convertToCurrencyRelatedToUSD);

        // math

        // not using the templates. res.send sends text.
        return res.send('convertTo ' + convertTo + " " + convertToCurrencyRelatedToUSD + " convertFrom " + convertFrom + " " + convertFromCurrencyRelatedToUSD);

        // todo put this back and render your template plus data. 
        //return res.render('results', { input : input, result: result, currencyTo: convertTo, currencyFrom: convertFrom})

      }

    })



    // var rateTo = exchangeRates[convertTo];
    // var rateFrom = exchangeRates[convertFrom];

});

module.exports = router;
