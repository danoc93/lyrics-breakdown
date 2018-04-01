import {Environment} from './Environment.js';

/**
 Controller: MusicService
 Interface to request game data from the backend.
 */

const request = require('request');
const resource = 'game';

class MusicService {

  getTracks(game_id, callback) {
    let url_req = `${Environment.BACKEND_ROOT}/${resource}/${game_id}`;
    let promise = new Promise((resolve, reject) => {
      request(url_req, {json: true}, (err, res, body) => {
        resolve(res);
        reject(err);
      });
    });

    promise.then(callback);

  }
}

export default MusicService;
