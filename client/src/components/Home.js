import React from 'react';
import { Jumbotron, Grid, Panel, Col, Row, Pager } from 'react-bootstrap';

import UserDescriptor from './UserDescriptor';
import LeaderboardService from '../controllers/LeaderboardService.js';
import UserService from '../controllers/UserService.js';
import MiniGameDescriptor from './MiniGameDescriptor.js';

import t100 from '../images/games/t100.png';
import canada from '../images/games/canada.png';
import japan from '../images/games/japan.png';

/**
Component: Home
Used as a starting point to choose games.

TODO: In the future support dynamic game design from a specialized module
and query the database to get such games. Right now this is hardcoded.

*/

let objUtils = require('../utils/ObjectUtils.js');

class Home extends React.Component {

  constructor(props) {
    super(props);

    /* Define every property we will need to keep track of a game.*/
    /* Default values come from the Constants Service. */

    this.state = {
      currUserName : '',
      currUserId : '',
      isUserLoggedIn : false
    };

  }

  componentDidMount() {

    this.setState({isUserLoggedIn : UserService.isUserLoggedIn() });
    this.setState({currUserName : UserService.getCurrentUserName() });
    this.setState({currUserId : UserService.getCurrentUserId() });

  }

  render (){
    return (
      <div>

        <Jumbotron>
          <Grid>
            <h1>
              <span role="img" aria-label="sound">🎧</span>
              &nbsp;Play a game now!
            </h1>
            <p className={objUtils.hideIf(this.state.isUserLoggedIn)}>
              <a href="/register">Sign up</a> to compete with your friends.
            </p>
          </Grid>
        </Jumbotron>

        <Grid>
        <Row>
          <Col sm={8}>
            <Panel className="gameSelectionPanel">
              <Row>

                <MiniGameDescriptor
                  image={canada}
                  title={'Canadian Charts'}
                  description={'Guess lyrics from the trendiest songs in Canada!'}
                  gameId={0}/>

                <MiniGameDescriptor
                  image={t100}
                  title={'Top Charts'}
                  description={'Guess songs from the current top songs around the world.'}
                  gameId={1}/>

                <MiniGameDescriptor
                  image={japan}
                  title={'Popular J-Pop'}
                  description={'Recent pop hits from Japanese artists.'}
                  gameId={2}/>

              </Row>
            </Panel>
            <Pager>
              <Pager.Item next disabled href="/">
                More &rarr;
              </Pager.Item>
            </Pager>
          </Col>

          <Col sm={4}>
            <div className={objUtils.showIf(this.state.isUserLoggedIn)}>
            <UserDescriptor/>
            </div>
            <Panel>
              <Panel.Heading>
                <span role="img" aria-label="world">🌎</span>
                Global Leaderboard
              </Panel.Heading>
              {LeaderboardService.buildGlobalLeaderBoard()}
            </Panel>
          </Col>

        </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
