var express = require('express');
var router = express.Router();

var MusicService = require('./../services/MusicService');

router.get('/:game_id', function(req, res, next) {

  var gameIdentifier = req.params.game_id;

  let handler = function(data){ res.send(data); };
  let musicService = new MusicService(handler);

  // TO DO: interface DB to get the actual settings for a game id!
  musicService.getTracks(15, 'ca');

});


module.exports = router;
