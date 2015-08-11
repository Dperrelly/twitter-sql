 var tweetBank = require('../tweetBank');


module.exports = function (io) {
	var router = require('express').Router();

	router.get('/', function (req, res) {
		// will trigger res.send of the index.html file
		// after rendering with swig.renderFile
		tweetBank.list().then(function(data){
			res.render('index', {
			showForm: true,
			title: 'Home',
			tweets: data
			});
		});
	});

	router.get('/users/:name', function (req, res) {
		tweetBank.find({
			name: req.params.name
		}).then(function(data){
			res.render('index', {
				showForm: true,
				title: req.params.name,
				tweets: data,
				theName: req.params.name,
			});
		});
	});

	router.get('/users/:name/tweets/:id', function (req, res) {
		tweetBank.find({
			id: id
		}).then(function(tweet){
			var id = parseInt(req.params.id);
			res.render('index', {title: req.params.name, tweets: tweet});
		});
	});

	router.post('/submit', function (req, res) {
		tweetBank.list().then(function(data){
			tweetBank.add(req.body.shenanigans, req.body.text);
			var theNewTweet = data.pop();
			io.sockets.emit('new_tweet', theNewTweet);
			res.redirect('/');
		});
	});
	return router;
};