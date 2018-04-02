import {Environment} from './Environment.js';

/**
 Controller: MusicService
 Interface to request game data from the backend.
 */

const request = require('request');
const resource_game = 'game';
const resource_artist = 'artist';

let objUtils = require('../utils/ObjectUtils.js');

class MusicService {

  getTracks(game_id, callback) {

    let url_req =
      `${Environment.BACKEND_ROOT}/${resource_game}/${game_id}`;

    let promise = new Promise((resolve, reject) => {
      request(url_req, {json: true}, (err, res, body) => {
        resolve(res);
        reject(err);
      });
    });

    promise.then(callback);

  }

  /******

  The following functions query the augmented API to operate
  on custom Artists and Songs added by users of the application.

  ******/

  getUserTracks(creator_id, callback) {

    let url_req =
      `${Environment.BACKEND_ROOT}/${resource_artist}/${creator_id}`;

    let promise = new Promise((resolve, reject) => {
      request(url_req, {json: true}, (err, res, body) => {
        resolve(res);
        reject(err);
      });
    });

    promise.then(callback);

  }

  addUserTrack(payload, creator_id, callback) {

    delete payload.song_id;
    let params = objUtils.encodeQueryData(payload);

    let url_req =
    `${Environment.BACKEND_ROOT}/${resource_artist}/${creator_id}?${params}`;

    let promise = new Promise((resolve, reject) => {
      request.post({url: url_req}, (err, res, body) => {
        resolve(res);
        reject(err);
      });
    });

    promise.then(callback);

  }

  editUserTrack(payload, creator_id, callback) {

    let params = objUtils.encodeQueryData(payload);

    let url_req =
    `${Environment.BACKEND_ROOT}/${resource_artist}/${creator_id}?${params}`;

    let promise = new Promise((resolve, reject) => {
      request.put({url: url_req}, (err, res, body) => {
        resolve(res);
        reject(err);
      });
    });

    promise.then(callback);

  }

  deleteUserTrack(payload, creator_id, callback) {

    delete payload.song_name;
    delete payload.artist_name;
    delete payload.creator_id;

    let params = objUtils.encodeQueryData(payload);
    let url_req =
      `${Environment.BACKEND_ROOT}/${resource_artist}?${params}`;

    let promise = new Promise((resolve, reject) => {
      request.delete({url: url_req}, (err, res, body) => {
        resolve(res);
        reject(err);
      });
    });

    promise.then(callback);

  }
}

export default MusicService;
