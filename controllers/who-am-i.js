var express = require('express')

module.exports = function(parent) {
    var app = express()

    app.get('/who-am-i', function (request, response) {
        var ipaddress = request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress,
            language  = request.headers["accept-language"].split(',')[0],
            software  = request.headers['user-agent'].split(') ')[0].split(' (')[1]

        response.json({
            ipaddress: ipaddress,
            language: language,
            software: software
        })
    });

    parent.use(app)
}