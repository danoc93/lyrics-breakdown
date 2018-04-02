import {Environment} from './Environment.js';

/**
 Controller: ScoreService
 Interface to request score data from the backend.
 */

const resource = 'score';

const BASE_REQ = `${Environment.BACKEND_ROOT}/${resource}`;
const INSERT_RESOURCE = 'insert';
const GET_RESOURCE = 'get';


let requestUtils = require('../utils/RequestUtils.js');

class ScoreService {

  insertScore(username, score, callbackSuccess, callbackError) {
    let url_req = `${BASE_REQ}/${INSERT_RESOURCE}`;
    let req_body = {username: username, score: score};
    requestUtils.preparePromise('POST', req_body, url_req,
      callbackSuccess, callbackError);
  }

  getUserScores(username, callbackSuccess, callbackError) {
    let url_req = `${BASE_REQ}/${GET_RESOURCE}/${username}`;
    requestUtils.preparePromise('GET', {}, url_req,
      callbackSuccess, callbackError);
  }

}

export default ScoreService;
