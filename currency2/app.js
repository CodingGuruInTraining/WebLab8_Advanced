var express = require('express');
var exp_hbs = require('express-handlebars');
var path = require('path');
var routes = require('./routes/index');
var about = require('./routes/about');

var app = express();

// Changes the extension name for handlebars.
app.engine('.hbs',
    exp_hbs({ extname:'.hbs',
    defaultLayout: 'main'
}));

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'static')));

// Sets up home and about pages.
app.use('/', routes);
app.use('/about', about);

// Tells program which port to listen to on local machine.
app.listen(process.env.PORT || 3000, function(){
    console.log('Currency app running on port 3000');
});
// Exports program.
module.exports = app;