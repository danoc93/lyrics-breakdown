import React from 'react';
import {Environment} from './Environment.js';
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
    console.log('get summary ')
    let url_req = `${BASE_REQ}`;
    if(!country){
      let body = {size: size};
      requestUtils.preparePromise(
        'POST', body, url_req, callbackSuccess, callbackError);      
    }else{
      let body = {size:size, country:country};
      requestUtils.preparePromise(
        'POST', body, url_req, callbackSuccess, callbackError); 
    }



    // var dummyList = [
    //   {'key' : 0, 'name': 'person1', 'flag' : '🇦🇷', 'p': 1000},
    //   {'key' : 1, 'name': 'person2', 'flag' : '🇧🇪', 'p': 800},
    //   {'key' : 2, 'name': 'person3', 'flag' : '🇨🇦', 'p': 500},
    //   {'key' : 3, 'name': 'person4', 'flag' : '🇩🇰', 'p': 500},
    //   {'key' : 4, 'name': 'person5', 'flag' : '🇨🇮', 'p': 300}
    // ];

    // var dummyList2 = [
    //   {'key' : 0, 'name': 'person3', 'flag' : '🇨🇦', 'p': 500},
    //   {'key' : 1, 'name': 'person7', 'flag' : '🇨🇦', 'p': 200},
    //   {'key' : 2, 'name': 'person6', 'flag' : '🇨🇦', 'p': 150}
    // ];

    // if(country)
    // {
    //   return dummyList2;
    // }else {
    //   return dummyList;
    // }

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





  //   var currentLeaders = LeaderboardService.getGlobalLeaderboardSummary(country);

  //   return (
  //     <table className="table table-striped">
  //       <thead>
  //         <tr>
  //           <th scope="col">#</th>
  //           <th scope="col">Name</th>
  //           <th scope="col">Points</th>
  //           <th scope="col"></th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {
  //           currentLeaders.map(
  //           function(item, index){
  //             return (<tr key={item.key}>
  //                       <th scope="row">{ index + 1 }</th>
  //                       <td>{ item.name }</td>
  //                       <td>{ item.p }</td>
  //                       <td>{ item.flag }</td>
  //                     </tr>)

  //           })
  //         }
  //       </tbody>
  //     </table>
  //    );
  }

}

export default LeaderboardService;
