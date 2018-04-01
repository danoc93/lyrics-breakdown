import React from 'react';
import {Environment} from './Environment.js';
import {Constants} from '../utils/Constants.js';
const resource = 'leaderboards';
const BASE_REQ = `${Environment.BACKEND_ROOT}/${resource}`;
let requestUtils = require('../utils/RequestUtils.js');

/**
Controller: LeadeboardService
Maintains and interfaces with the back-end to load leaderboard data.

Pending:
- Connect it to the actual back-end, for now it is returning dummy data.
*/


class LeaderboardService{

  /* Get a list of the current top players.
    This is returning hardcoded data for now.
  */
  static getGlobalLeaderboardSummary(size, country, callbackSuccess, callbackError){
    let url_req = `${BASE_REQ}`;
    let countries = Constants.countries;
    if(!country){
      let body = {size: size, countries: countries};
      requestUtils.preparePromise(
        'POST', body, url_req, callbackSuccess, callbackError);      
    }else{
      let body = {size:size, countries: countries, country:country};
      requestUtils.preparePromise(
        'POST', body, url_req, callbackSuccess, callbackError); 
    }
  }

  static buildGlobalLeaderBoard(size){

    return new Promise((resolve, reject)=>{
      LeaderboardService.getGlobalLeaderboardSummary(size, null, (currentLeaders)=>{
            let table = <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Points</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  currentLeaders.response.map(
                  function(item, index){
                    return (<tr key={item.key}>
                              <th scope="row">{ index + 1 }</th>
                              <td>{ item.name }</td>
                              <td>{ item.p }</td>
                              <td>{ item.flag }</td>
                            </tr>)
                  })
                }
              </tbody>
            </table>;
           if (currentLeaders){
            resolve(table);
           }else{
            reject("Error");
           }
          
        });
      }, (err)=>{
        console.log(err);
      });
  }

  static buildCountryLeaderBoard(size, country){

    return new Promise((resolve, reject)=>{
      LeaderboardService.getGlobalLeaderboardSummary(size, country, (currentLeaders)=>{
            let table = <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Points</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  currentLeaders.response.map(
                  function(item, index){
                    return (<tr key={item.key}>
                              <th scope="row">{ index + 1 }</th>
                              <td>{ item.name }</td>
                              <td>{ item.p }</td>
                              <td>{ item.flag }</td>
                            </tr>)
                  })
                }
              </tbody>
            </table>;
           if (currentLeaders){
            resolve(table);
           }else{
            reject("Error");
           }
          
        });
      }, (err)=>{
        console.log(err);
      });
  }

}

export default LeaderboardService;
