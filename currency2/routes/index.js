var express = require('express');
var router = express.Router();
var getRatesFunction = require('../helpers/rates.js');

// var exchangeRates = { 'EUR' : 0.9458, 'JPY' : 113.938, 'EP' : 17.4983, 'INR' : 66.6376, 'CUP' : 26.5 };

router.get('/', function(req, res){
    res.render('index');
});

router.get('/convert', function(req, res) {
    var input = req.query.dollar_amount;
    var convertTo = req.query.to_currency;
    var convertFrom = req.query.from_currency;

    console.log(convertFrom, convertTo)

    getRatesFunction(function(err, rates) {

      //todo check for error and handle
      if (err) {
         return next(err);
      }

      else {

        // math here.
        //return res.send('convertTo ' + convertTo + " " + convertToCurrencyRelatedToUSD + " convertFrom " + convertFrom + " " + convertFromCurrencyRelatedToUSD);
        return res.send(JSON.stringify(rates))
        // todo put this back and render your template plus data.
        //return res.render('results', { input : input, result: result, currencyTo: convertTo, currencyFrom: convertFrom})

      }
});

  
});

module.exports = router;
