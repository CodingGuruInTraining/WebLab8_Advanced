var express = require('express');
var router = express.Router();

var exchangeRates = { 'EUR' : 0.9458, 'JPY' : 113.938, 'EP' : 17.4983, 'INR' : 66.6376, 'CUP' : 26.5 };

router.get('/', function(req, res){
    res.render('index');
});

router.get('/convert', function(req, res) {
    var input = req.query.dollar_amount;
    var convertTo = req.query.to_currency;
    var convertFrom = req.query.from_currency;

    var rateTo = exchangeRates[convertTo];
    var rateFrom = exchangeRates[convertFrom];

    var toDollars = input/rateFrom;
    var fromDollars = toDollars * rateTo;

    var result = fromDollars;

    res.render('results', { input : input, result: result, currencyTo: convertTo, currencyFrom: convertFrom})
});

module.exports = router;