import React from 'react';
import { Jumbotron, Grid, Panel, Col, Row,
  Button, Pager } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import LeaderboardService from '../controllers/LeaderboardService.js';
import t100 from '../images/games/t100.png';

/**
Component: Home
Used as a starting point to choose games.
*/

const Home = () => (
  <div>

    <Jumbotron>
      <Grid>
        <h1>
          <span role="img" aria-label="sound">🎧</span>
          &nbsp;Play the game now!
        </h1>
        <p>
          <a href="">Sign up</a> to compete with your friends.
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

export default Home;
