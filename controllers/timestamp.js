var express = require('express'),
    unix_time = require('unix-time')

function getNatureDate(timestamp) {
    var pad   = function (n) {
            return (n < 10) ? '0' + n : n
        },
        getMonth = function(m) {
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            return months[m]
        },
        date  = new Date(timestamp),
        year  = date.getFullYear(),
        month = getMonth(date.getUTCMonth()),
        day   = pad(date.getDate())

    return month + ' ' + day + ', ' + year
}

module.exports = function(parent) {
    var app = express()

    app.get('/:timestamp', function(request, response) {
        var timestamp = (isNaN(request.params.timestamp))
            ? request.params.timestamp
            : request.params.timestamp*1000
        var unix = unix_time(timestamp)

        if (!unix) timestamp = null

        else if (!isNaN(timestamp))
            timestamp = getNatureDate(timestamp)

        response.json({
            unix: unix,
            natural: timestamp
        })
    });

    parent.use('/timestamp', app)
}