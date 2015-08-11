var _ = require('underscore');
var db = require('./models/index.js');
red = function (text) {
  console.error(require('chalk').red(text));
};

//var data = [];
var icon = 'https://cdn4.iconfinder.com/data/icons/iconset-addictive-flavour/png/emote_biggrin.png';

var add = function (name, text) {
  db.User.findOne({ where: {name: name} }).then(function(user) {
    if (!user) db.User.create({ name: name, pictureUrl: })
      .then(function(newUser){
        db.Tweet.create({ UserId: newUser.id, tweet: text});
  });
    else db.Tweet.create({ UserId: user.id, tweet: text});
  });
};

var list = function () {
  return db.Tweet.findAll({ include: [ db.User ]}).then(function(tweets){
    var array = [];
    tweets.forEach(function(tweet){
      array.push({
        name: tweet.User.name,
        text: tweet.tweet,
        id: tweet.id,
        pictureUrl: tweet.User.pictureUrl
      });

    });
    return array;
  });
  // return _.clone(data);
};

setTimeout(function(){
  list().then(function(n){console.dir(n[0]);});
}, 4000);

var find = function (properties) {
  return db.Tweet.findAll({ include: [ db.User ], where: properties}).then(function(tweets){
    var array = [];
    tweets.forEach(function(tweet){
      array.push({
        name: tweet.User.name,
        text: tweet.tweet,
        id: tweet.id
      });

    });
    return array;
  });
};

module.exports = { add: add, list: list, find: find };

// seeding...
var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
  var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The fellows are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}


// var _ = require('underscore');

// var data = [];

// var add = function (name, text) {
//   data.push({ name: name, text: text, id: data.length });
// };

// var list = function () {
//   return _.clone(data);
// };

// var find = function (properties) {
//   return _.where(data, properties);
// };

// module.exports = { add: add, list: list, find: find };

// // seeding...
// var randArrayEl = function(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// };

// var getFakeName = function() {
//   var fakeFirsts = ['Nimit', 'Dave', 'Will', 'Charlotte', 'Jacob','Ethan','Sophia','Emma','Madison'];
//   var fakeLasts = ["Alley", 'Stacky', 'Fullstackerson', 'Nerd', 'Ashby', 'Gatsby', 'Hazelnut', 'Cookie', 'Tilde', 'Dash'];
//   return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
// };

// var getFakeTweet = function() {
//   var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
//   return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The fellows are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
// };

// for(var i=0; i<10; i++) {
//   module.exports.add( getFakeName(), getFakeTweet() );
// }