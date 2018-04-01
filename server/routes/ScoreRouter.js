var express = require('express');
var router = express.Router();
var objUtils = require('../utils/ObjectUtils.js');
var reqUtils = require('../utils/RequestUtils.js');

router.post('/insert', function (req, res, next) {

  let requestData = req.body;

  if (objUtils.isEmpty(requestData)) {
    res.status(400).send('Invalid request data!');
    return;
  }

  let username = requestData.username;
  let score = requestData.score;

  if (objUtils.isEmpty(username) || objUtils.isEmpty(score)) {
    res.status(400).send('Invalid request data!');
    return;
  }

  let insertScoreRequest = global.APP.dbService.addScore(username, score,
    (response) => {
      if (response.insertedCount > 0) console.log('Score updated');
      else console.log('Error in inserting new score');
    },
    (error) => {
      console.log(error);
      res.status(500).send('Could not access database.');
    }
  );
});
