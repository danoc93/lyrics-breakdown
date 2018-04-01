import React from 'react';
import { Jumbotron, Grid, Panel, Col, Row,
  Button, Pager } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import UserDescriptor from './UserDescriptor';
import LeaderboardService from '../controllers/LeaderboardService.js';
import UserService from '../controllers/UserService.js';
import t100 from '../images/games/t100.png';

/**
Component: Home
Used as a starting point to choose games.
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
                <Col sm={6} md={4}>
                  <div className="thumbnail">
                    <img src={t100} alt=""/>
                    <div className="caption">
                      <h3>Top Charts</h3>
                      <p> Guess songs from the current top songs around the world!</p>
                      <div>
                        <LinkContainer to="/game/0/Top 100">
                        <div className="centerText">
                          <Button className="btn btn-success">
                            Play
                          </Button>
                        </div>
                        </LinkContainer>
                      </div>
                    </div>
                  </div>
                </Col>
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
