var getHttp = require('../utils').getHttp;

var getRandomDeveloperExcuse = function (cb) {
  getHttp({
    hostname: 'developerexcuses.com',
    path: '/',
    method: 'GET'
  }, function onResult(statusCode, data) {
    // adapted from https://github.com/github/hubot-scripts/blob/master/src/scripts/excuse.coffee#L55
    var matches = data.match(/<a [^>]+>(.+)<\/a>/i);
    if (matches && matches[1]) {
      cb(matches[1]);
    } else {
      cb('');
    }
  }, function onError() {
    cb('');
  });
};

var getRandomDesignerExcuse = (function () {
  // Taken from http://designerexcuses.com/js/excuses.js
  var quotes = [
    "Oui oui",
    "k",
    "GovCo is so far",
    "linguistics is so cool",
    "French guys are so hot",
    "Sorry I have rehearsal",
    "Sorry I'm at rehearsal",
    "I had me a boy turned into a man",
    "SymSys",
    "Paris",
    "Baguette",
    "oui",
    "Hey, fuck you, buddy",
    "*wink*",
    "It's snowing!!",
    "I have a performance that night",
    "TAPS stands for 'The Awesomest Part Of Stanford'",
    "Sops on top!",
    "Come drink chamomile tea and read checkhov with me",
    "Anyone else auditioning for the show this quarter?"
  ];

  return function (cb) {
    cb(quotes[Math.floor(Math.random() * quotes.length)]);
  };
})();

module.exports = function (registerCommand) {
  registerCommand(
    'excuse',
    'excuse [designer]: Get a random developer or designer excuse',
    function (groupLocalID, userDisplayName, msgTokens, callback) {
      if (msgTokens[0] === 'designer') {
        getRandomDesignerExcuse(function (excuse) {
          if (excuse) {
            callback('Designer excuse: ' + excuse);
          }
        });
      } else {
        getRandomDeveloperExcuse(function (excuse) {
          if (excuse) {
            callback('Developer excuse: ' + excuse);
          }
        });
      }
    }
  );
};
