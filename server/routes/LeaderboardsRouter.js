var express = require('express');
var router = express.Router();
var objUtils = require('../utils/ObjectUtils.js');
var reqUtils = require('../utils/RequestUtils.js');

// Make database return this data 
// var dummyList = [
//   {'key' : 0, 'name': 'person1', 'flag' : '🇦🇷', 'p': 1000},
//   {'key' : 1, 'name': 'person2', 'flag' : '🇧🇪', 'p': 800},
//   {'key' : 2, 'name': 'person3', 'flag' : '🇨🇦', 'p': 500},
//   {'key' : 3, 'name': 'person4', 'flag' : '🇩🇰', 'p': 500},
//   {'key' : 4, 'name': 'person5', 'flag' : '🇨🇮', 'p': 300}
// ];

var dummyList2 = [
  {'key' : 0, 'name': 'person3', 'flag' : '🇨🇦', 'p': 500},
  {'key' : 1, 'name': 'person7', 'flag' : '🇨🇦', 'p': 200},
  {'key' : 2, 'name': 'person6', 'flag' : '🇨🇦', 'p': 150}
]

var dummyDatabaseResponse2 = {
	response: dummyList2
}

function buildLeaderboardObject(scores, countries){
	return scores.map((user, i)=>{
		return {'key':i, 'name': user.username, 'flag': countries[Number(user.country_id)].flag, 'p': user.score};
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
			// res.json(dummyDatabaseResponse2); //Use this to send the country scores back to the front end
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