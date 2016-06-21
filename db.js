var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	urlMLocal = 'mongodb://localhost:27017/admin-lte-express';

// Uncomment for use mongo database
//mongoose.connect(urlMLocal, function(err) {
//	if (err) console.log(err);
//});


var siteSchema = new Schema({
	url: String,
	originalUrl: String
})

var Site = mongoose.model('Site', siteSchema)
var sites = module.exports.sites = []

var getSite = function(url) {
	var originalUrl = false;

	sites.forEach(function(site) {
		if (site.url == url) {
			originalUrl = site.originalUrl
		}
	})

	return originalUrl
}

var newSite = function(site) {
	if (typeof site == 'object') {
		sites.push(site)
		return true
	} else {
		return false
	}
}

module.exports.Site = Site
module.exports.getSite = getSite
module.exports.newSite = newSite

var historieschema = new Schema({
	query: String,
	date: Date
})

var History = mongoose.model('History', historieschema)

var histories = module.exports.histories = []

var getHistories = function() {
	var result = []

	for (var i = histories.length - 1; i >= 0; i--) {
		result.push({
			query: histories[i].query,
			date: histories[i].date
		})
	}

	return result
}

var newHistory = function(history) {
	if (typeof history == 'object') {
		histories.push(history)
		console.log(history)
		return true
	} else {
		return false
	}
}

module.exports.History      = History
module.exports.getHistories = getHistories
module.exports.newHistory   = newHistory