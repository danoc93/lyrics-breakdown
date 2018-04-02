var express = require('express');
var router = express.Router();
var objUtils = require('../utils/ObjectUtils.js');
var reqUtils = require('../utils/RequestUtils.js');

function buildLeaderboardObject(scores, countries){

	return scores.map((user, i)=>{
		return {'key':i, 'name': user.username, 'flag': countries[Number(user.country_id)].flag, 'p': user.totalscore};
	});
}

router.post('/', (req, res, next)=>{
	let db = global.APP.dbService;
	let size = req.body.size;
	let country = null;
	if(req.body.country){
		country = req.body.country;
		db.getHighScoresByCountry(country, size).then((result)=>{
			let leaderboardArr = buildLeaderboardObject(result, req.body.countries);
			res.json({response : leaderboardArr});
		}).catch((err)=>{
			console.log(err);
		});
	}else{
		db.getHighScores(size).then((result)=>{
			let leaderboardArr = buildLeaderboardObject(result, req.body.countries);
			res.json({response : leaderboardArr});
		}).catch((err)=>{
			console.log(err);
		});
	}
})

module.exports = router;
