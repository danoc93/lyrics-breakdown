var express = require('express');
var router = express.Router();
var objUtils = require('../utils/ObjectUtils.js');
var reqUtils = require('../utils/RequestUtils.js');

// Make database return this data
var dummyList = [
  {'key' : 0, 'name': 'person1', 'flag' : '🇦🇷', 'p': 1000},
  {'key' : 1, 'name': 'person2', 'flag' : '🇧🇪', 'p': 800},
  {'key' : 2, 'name': 'person3', 'flag' : '🇨🇦', 'p': 500},
  {'key' : 3, 'name': 'person4', 'flag' : '🇩🇰', 'p': 500},
  {'key' : 4, 'name': 'person5', 'flag' : '🇨🇮', 'p': 300}
];

var dummyList2 = [
  {'key' : 0, 'name': 'person3', 'flag' : '🇨🇦', 'p': 500},
  {'key' : 1, 'name': 'person7', 'flag' : '🇨🇦', 'p': 200},
  {'key' : 2, 'name': 'person6', 'flag' : '🇨🇦', 'p': 150}
]

var dummyDatabaseResponse1 = {
	response: dummyList
}

var dummyDatabaseResponse2 = {
	response: dummyList2
}

router.post('/', (req, res, next)=>{
	let db = global.APP.dbService;
	let size = req.body.size;
	let country = null;
	if(req.body.country){
		country = req.body.country;
		db.getHighScores(size).then((scores)=>{
			res.json(dummyDatabaseResponse2); //Use this to send the country scores back to the front end
		}).catch((err)=>{
			console.log('err');
		});
	}else{
		db.getHighScores(size).then((scores)=>{
			res.json(dummyDatabaseResponse1); //Use this to send the global scores back to the front end
		}).catch((err)=>{
			console.log('err');
		});
	}
})

module.exports = router;
