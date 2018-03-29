import React from 'react';

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
  static getGlobalLeaderboardSummary(country){

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
    ];

    if(country)
    {
      return dummyList2;
    }else {
      return dummyList;
    }

  }

  static buildGlobalLeaderBoard(){

    var currentLeaders = LeaderboardService.getGlobalLeaderboardSummary(null);

    return (
      <table className="table table-striped">
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
            currentLeaders.map(
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
      </table>
     );
  }

  static buildCountryLeaderBoard(country){

    var currentLeaders = LeaderboardService.getGlobalLeaderboardSummary(country);

    return (
      <table className="table table-striped">
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
            currentLeaders.map(
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
      </table>
     );
  }

}

export default LeaderboardService;
