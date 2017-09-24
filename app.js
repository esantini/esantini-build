"use strict";
var compress = require("compression");
var express = require("express");
var path = require("path");
var app = express();
app.use(compress());
// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// // uncomment after placing your favicon in /public
// import * as favicon from 'serve-favicon';
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/$', function (req, res, next) {
    res.render('index', { page: "home" });
});
app.use('/logo$', function (req, res, next) {
    res.render('logo', { page: "logo" });
});
app.use('/earthVenus$', function (req, res, next) {
    res.render('earthVenus', { page: "tattoo" });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log("Bitacaro!!", new Date(), err);
    // render the error page
    res.status(err.status || 500);
    res.render('error', { page: "error", error: err.message });
});
app.listen(port);
console.log("\nListening on port: " + port);
// import * as httpLib from 'http';
// /**
//  * Create HTTP server.
//  */
// var server = httpLib.createServer(app);
// server.listen(port, function() {
// 	console.log('Express server listening on port ' + port);
// });
// server.on('error', onError);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
module.exports = app;

//# sourceMappingURL=app.js.map
