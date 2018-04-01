var express = require('express');
var router = express.Router();
var objUtils = require('../utils/ObjectUtils.js');

/******

  Custom API Routes
  The following functions offer an augmented API to operate
  on custom Artists and Songs added by users of the application.

  ******/

router.get('/:creator_id', function(req, res, next) {
  var creator_id = req.params.creator_id;

  global.APP.dbService.getArtistByCreatorId(
      creator_id,

      (response) => {
        res.json({ data : response });
      },

      () => {
        res.status(500).send('Could not gather data.');
      }
  );

});

router.post('/:creator_id', function(req, res, next) {

  var query = req.query;
  var creator_id = req.params.creator_id;

  global.APP.dbService.addArtist(
      creator_id,
      query.artist_name,
      query.song_name,

      (response) => {
        res.json({ data : response });
      },

      () => {
        res.status(500).send('Could not gather data.');
      }
  );

});

router.delete('/', function(req, res, next) {

  global.APP.dbService.deleteArtist(
      req.query.song_id,

      (response) => {
        res.json({ data : response });
      },

      () => {
        res.status(500).send('Could not gather data.');
      }
  );

});

router.put('/:creator_id', function(req, res, next) {

  var query = req.query;
  var creator_id = req.params.creator_id;

  global.APP.dbService.updateArtist(
      query.song_id,
      creator_id,
      query.artist_name,
      query.song_name,

      (response) => {
        res.json({ data : response });
      },

      () => {
        res.status(500).send('Could not gather data.');
      }
  );

});


module.exports = router;
