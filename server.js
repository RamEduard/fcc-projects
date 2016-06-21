var express = require('express'),
    app     = express(),
    exphbs  = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

// Handlebars engine
app.set('view engine', 'handlebars')

// PORT
app.set('port', (process.env.PORT || 5000))

// APP URL
app.set('app_url', 'http://localhost:5000')

// Bing API_KEY
app.set('bing_api_key', 'niy2NLWsyAYs6VMp4D4os/d2R+xJS+7tilu1kDIcab4')

app.use('/mdl', express.static('./node_modules/material-design-lite'));

require('./controllers/index')(app)
require('./controllers/api')(app)
require('./controllers/timestamp')(app)
require('./controllers/url')(app)
require('./controllers/who-am-i')(app)

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
});