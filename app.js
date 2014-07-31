
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var https = require('https');
var path = require('path');
var hbs = require('hbs');
hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

var app = express();
//---NO PASSWORD---
//app.use(express.basicAuth('frat', 'ifc'));

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({uploadDir:'./tmp', keepExtensions: true}));
app.use(express.limit('75mb'));

//app.use(express.methodOverride());
// app.use(express.cookieParser('your secret here'));
// app.use(express.session());
app.use(app.router);
//app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.directory(__dirname+'/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//Get Partials
hbs.registerPartials(__dirname + '/views/partials');

var port = Number(process.env.PORT || 80);
http.createServer(app).listen(port, function(){
 console.log('Express server listening on port 80');
});


//HTTPS certs
// var options = {
//  key : fs.readFileSync('./ssl/fratword.key'),
//  cert : fs.readFileSync('./ssl/fratword_com.crt')
// };

//https.createServer(options, app).listen(443, function() {
// console.log('Express server listening on port 443');
//});
