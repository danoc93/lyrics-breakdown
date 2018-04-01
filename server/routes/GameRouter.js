var express = require('express');
var router = express.Router();

var MusicService = require('./../services/MusicService');

var GAMES = {'0' : 'ca', '1' : 'us', '2' : 'jp'};
var LIMIT_QUERY = 15;

router.get('/:game_id', function(req, res, next) {

  // This has to change in the future to support dynamic settings.
  var gameIdentifier = GAMES[req.params.game_id];
  if (gameIdentifier == null) gameIdentifier = GAMES[1];

  let handler = function(data){ res.send(data); };
  let musicService = new MusicService(handler);

  musicService.getTracks(LIMIT_QUERY, gameIdentifier);

});


module.exports = router;
