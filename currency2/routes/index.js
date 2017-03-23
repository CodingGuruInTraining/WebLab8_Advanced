// Imports express.
var express = require('express');
// Creates Router object.
var router = express.Router();
// Imports function from helper file.
var getRatesFunction = require('../helpers/rates.js');

// Server retrieves index view page.
router.get('/', function(req, res){
    res.render('index');
});

// Server performs calculations based on inputs.
router.get('/convert', function(req, res) {
    // User's entered amount.
    var input = req.query.dollar_amount;
    // TO and FROM currency selections.
    var convertTo = req.query.to_currency;
    var convertFrom = req.query.from_currency;

    // Runs imported function and uses then uses the
    // returned results for calculations.
    getRatesFunction(function(err, rates) {

        //todo check for error and handle

        if (err) {
            return next(err);
        }

        else {
            // Gets matching currency codes from returned JSON object.
            var rateTo = rates[convertTo];
            var rateFrom = rates[convertFrom];
//  what if variable = undefined (incorrect currency code)....
            console.log(rateTo + " " + rateFrom);

            // Converts the User's input to USD first and then to the
            // selected currency.
            var toDollars = input/rateFrom;
            var result = toDollars * rateTo;

            // Renders template page with variables.
            return res.render('results', { input : input, result: result, currencyTo: convertTo, currencyFrom: convertFrom})
        }
    });
});

// Exports Router object to run.
module.exports = router;
