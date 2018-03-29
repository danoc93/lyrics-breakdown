/**
Controller: MusicService
Interface to request game data from the backend.
*/

const request = require('request');

/* API communication essentials.*/
const API_ROOT = 'http://localhost:5000';
const RESOURCE = 'game';

class MusicService{

	getTracks(game_id, callback) {
		let url_req = `${API_ROOT}/${RESOURCE}/${game_id}`;
		let promise =  new Promise((resolve, reject)=>{
			request(url_req, { json: true }, (err, res, body) => {
				resolve(res);
				reject(err);
			});
		});

		promise.then(callback);

	}

}

	export default MusicService;
