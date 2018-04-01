import React from 'react';
import {
  Grid, Panel, Button, Jumbotron,
  ButtonGroup, Alert, ListGroupItem, ProgressBar
} from 'react-bootstrap';

import MusicService from '../controllers/MusicService.js';
import ScoreService from '../controllers/ScoreService.js';
import {Constants} from '../utils/Constants.js';


/**
 Component: Stage
 The stage defines the view for the state of a game. Show questions, results
 and query the music services for the data relevant to a game type.

 This component is generic and thus its configuration will define which
 game is displayed to the user.

 In case of errors, it will show the relevant information as well.
 */

let objUtils = require('../utils/ObjectUtils.js');

class Stage extends React.Component {

  constructor(props) {
    super(props);

    /* Define every property we will need to keep track of a game.*/
    /* Default values come from the Constants Service. */

    this.state = {

      gameTitle: this.props.match.params.gameTitle,
      gameId: this.props.match.params.gameId,

      maxTokensMore: Constants.maxTokensMore,
      maxTokensPlay: Constants.maxTokensPlay,
      maxTokens5050: Constants.maxTokens5050,
      maxTokensShowTitle: Constants.maxTokensShowTitle,
      pointsPerSuccess: Constants.pointsPerSuccess,

      currentScore: 0,
      currentLives: Constants.numInitialLives,
      currTokensMore: Constants.maxTokensMore,
      currTokensPlay: Constants.maxTokensPlay,
      curr5050Available: Constants.maxTokens5050,
      showTrackNameAvailable: Constants.maxTokensShowTitle,

      gameReady: false,
      gameData: [],
      gameOver: false,
      gameCompleted: false,
      numQuestions: 0,

      currQuestion: 0,
      currTrackName: '',
      trackNameVisible: false,
      currentLyricsOffset: 0,
      lyricBlobSize: 0,
      lyrics: '',
      correctIndex: 0,

      lyricsToShow: '',
      optData: ['', '', '', ''],
      optStyle: [
        Constants.colRegular,
        Constants.colRegular,
        Constants.colRegular,
        Constants.colRegular]
    };

    this.prepareBindings();

    this.musicService = new MusicService();
    this.scoreService = new ScoreService();

  }

  /* Bind 'this' to all handlers. */
  prepareBindings() {
    this.optionClicked = this.optionClicked.bind(this);
    this.showMoreLyricsClicked = this.showMoreLyricsClicked.bind(this);
    this.playSnippetClicked = this.playSnippetClicked.bind(this);
    this.on5050Clicked = this.on5050Clicked.bind(this);
    this.showSongTitleClicked = this.showSongTitleClicked.bind(this);
    this.dataLoaded = this.dataLoaded.bind(this);
  }

  /* When an option is selected, validate it. */
  optionClicked(e) {

    var oId = e.target.id;
    var id = parseInt(oId.substr(oId.length - 1), 10);
    var rrect = this.state.correctIndex === id;
    var style = this.state.optStyle;

    // Make sure the user cannot click the wrong answer again
    if (style[id] === Constants.colFail) return;

    if (!rrect) {

      /* Show the option is incorrect. */
      var lives = this.state.currentLives - 1;

      style[id] = Constants.colFail;
      this.setState({currentLives: lives, optStyle: style});

      /* Game's Over! */
      if (lives === 0) this.gameOver();
      return;

    }
    else {

      var score = this.state.currentScore + this.state.pointsPerSuccess;
      var currQuestion = this.state.currQuestion + 1;
      this.setState({
        currentScore: score,
        currQuestion: currQuestion
      }, this.questionStateUpdated);

    }
  }

  /* Report game status. */
  onNoMoreLives(completed) {
    this.setState({gameOver: true, gameCompleted: completed});
  }

  gameCompleted() {
    this.onNoMoreLives(true);
  }

  gameOver() {
    this.onNoMoreLives(false);
  }

  /* Event handler for when a question has been updated in memory. */
  questionStateUpdated() {

    if (this.state.gameData.length === 0) return;

    if (this.state.currQuestion >= this.state.numQuestions) {
      this.gameCompleted();
      return;
    }

    /* Show the initial lyrics. */
    var q = this.state.gameData[this.state.currQuestion];
    var lyrics = q.lyrics;
    var blobSize = Math.floor(lyrics.length / (this.state.maxTokensMore + 1));

    this.setState(
      {
        lyricBlobSize: blobSize,
        currentLyricsOffset: blobSize,
        optData: q.options,
        optStyle: ['info', 'info', 'info', 'info'],
        currTrackName: q.track_name,
        trackNameVisible: false,
        correctIndex: q.correct
      }, this.setLyricsToShow);
  }

  /* Using the state, show a piece of the lyrics up to the current offset.*/
  setLyricsToShow() {

    var q = this.state.gameData[this.state.currQuestion];
    var lyricBlock = q.lyrics;
    lyricBlock = lyricBlock.substring(0, this.state.currentLyricsOffset);

    if (lyricBlock.length < q.lyrics.length) {
      lyricBlock = lyricBlock + '...';
    }

    this.setState(
      {
        lyricsToShow: lyricBlock
      });
  }

  /* Token to show more lyrics click handler, increase the offset. */
  showMoreLyricsClicked() {

    var currValue = this.state.currTokensMore;
    if (currValue === 0) return;

    /* Increase the offset to show an extra block. */
    var newOffset =
      this.state.currentLyricsOffset + this.state.lyricBlobSize;

    this.setState({
      currentLyricsOffset: newOffset,
      currTokensMore: currValue - 1
    }, this.setLyricsToShow);

  }

  /* Play a snippet click handler, play the sound. */
  playSnippetClicked() {
    var currValue = this.state.currTokensPlay;
    if (currValue === 0) return;

    this.setState({currTokensPlay: currValue - 1});
  }

  on5050Clicked() {
    if (!this.state.curr5050Available) return;

    let style = this.state.optStyle;
    let currValue = this.state.curr5050Available;
    if (currValue === 0) return;

    let correctIndex = this.state.correctIndex;

    let rands = [];
    rands[rands.length] = correctIndex;

    // generate two randoms that are not the correct answer
    while (rands.length < 3) {
      let temp = Math.floor(Math.random() * 4);
      if (rands.indexOf(temp) === -1) rands[rands.length] = temp;
    }

    let wrongIndex1 = rands[1];
    let wrongIndex2 = rands[2];

    style[wrongIndex1] = Constants.colFail;
    style[wrongIndex2] = Constants.colFail;

    this.setState({curr5050Available: currValue - 1, optStyle: style});
  }

  showSongTitleClicked() {

    let currValue = this.state.showTrackNameAvailable;
    if (currValue === 0) return;

    this.setState(
      {
        showTrackNameAvailable: currValue - 1,
        trackNameVisible: true
      }
    )

  }

  /* Happens after rendering. */
  componentDidMount() {

    // Request the data for this game stage.
    this.musicService.getTracks(this.state.gameId, this.dataLoaded);

  }

  dataLoaded(questionData) {
    if (questionData === undefined) {
      this.setState({error: true});
      return;
    }

    questionData = questionData.body;

    this.setState(
      {
        gameReady: true,
        gameData: questionData,
        q: questionData[0],
        numQuestions: questionData.length
      }, this.questionStateUpdated);

  }

  render() {

    return (
      <div>
        <Jumbotron>
          <Grid className="gameHeaderGrid">
            <h2>
              <span role="img" aria-label="mic">🎤</span>
              &nbsp;{this.state.gameTitle}
            </h2>
          </Grid>
        </Jumbotron>

        <Grid>

          <div className={this.state.gameReady ? 'hidden' : ''}>
            <Panel className="gameSelectionPanel">
              <Panel.Body>

                <div className="centerText">
                  <Alert bsStyle="danger"
                         className={this.state.error ? '' : 'hidden'}>
                    <b>Error:</b> Empty response from API.
                  </Alert>
                </div>

                <div className={this.state.error ? 'hidden' : ''}>
                  <div className="centerText ">
                    <h2>
                      Preparing Game&nbsp;
                      <span role="img" aria-label="drums">🥁</span>
                      <span role="img" aria-label="trumpet">🎺</span>
                      <span role="img" aria-label="guitar">🎸</span>
                    </h2>
                    <ProgressBar active striped bsStyle="warning" now={100}/>
                  </div>
                </div>

              </Panel.Body>
            </Panel>
          </div>


          <div className={this.state.gameReady && !this.state.gameOver ? '' : 'hidden'}>
            <Panel>
              <Panel.Body>

                <Alert bsStyle="warning">
                  <h3>
                    <span role="img" aria-label="score">🏆</span>
                    <b>Current Score:</b> {this.state.currentScore}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span role="img" aria-label="lives">❤️</span>
                    <b>Lives:</b> {this.state.currentLives}
                  </h3>
                </Alert>

                <div className="tokensContainer">
                  <ButtonGroup>
                    <Button bsStyle="primary"
                            onClick={this.showMoreLyricsClicked}
                            disabled={this.state.currTokensMore === 0}>
                      <span role="img" aria-label="plus">➕</span>
                      Show More ({this.state.currTokensMore})
                    </Button>
                    <Button bsStyle="info"
                            className = {objUtils.hideIf(true)}
                            onClick={this.playSnippetClicked}
                            disabled={this.state.currTokensPlay === 0}>
                      <span role="img" aria-label="play">🔉</span>
                      Play Snippet ({this.state.currTokensPlay})
                    </Button>
                    <Button bsStyle="info"
                            onClick={this.on5050Clicked}
                            disabled={!this.state.curr5050Available}>
                      50/50 ({this.state.curr5050Available})
                    </Button>
                    <Button bsStyle="danger"
                            onClick={this.showSongTitleClicked}
                            disabled={!this.state.showTrackNameAvailable}>
                      Show title ({this.state.showTrackNameAvailable})
                    </Button>

                  </ButtonGroup>
                </div>

                <Panel className="gameSelectionPanel">
                  {this.state.trackNameVisible &&
                  <h3 className="songTitle centerText">
                    {this.state.currTrackName}
                  </h3>
                  }
                  <p className="lyricsText">
                    {this.state.lyricsToShow}
                  </p>
                </Panel>

                <div className="gameOptionsContainer">
                  <h4> Who is the artist? </h4>
                  <div className="optionsBlock">
                    <ListGroupItem id="opt0" bsStyle={this.state.optStyle[0]}
                                   onClick={this.optionClicked}>
                      {this.state.optData[0]}
                    </ListGroupItem>
                    <ListGroupItem id="opt1" bsStyle={this.state.optStyle[1]}
                                   onClick={this.optionClicked}>
                      {this.state.optData[1]}
                    </ListGroupItem>
                    <ListGroupItem id="opt2" bsStyle={this.state.optStyle[2]}
                                   onClick={this.optionClicked}>
                      {this.state.optData[2]}
                    </ListGroupItem>
                    <ListGroupItem id="opt3" bsStyle={this.state.optStyle[3]}
                                   onClick={this.optionClicked}>
                      {this.state.optData[3]}
                    </ListGroupItem>
                  </div>
                </div>

              </Panel.Body>
            </Panel>

          </div>

          <div className={this.state.gameReady && this.state.gameOver ? '' : 'hidden'}>
            <Panel className="gameSelectionPanel">
              <Panel.Body>
                <div className="centerText">
                  <Alert bsStyle="info">
                    <h2>
                      Game Complete &nbsp;&nbsp;
                      <span role="img" aria-label="notes">🎶</span>
                    </h2>
                  </Alert>
                  <Alert bsStyle="success"
                         className={
                           this.state.currQuestion === this.state.numQuestions ? '' : 'hidden'}>
                    <span role="img" aria-label="happy">😄</span>
                    Congratulations! You guessed every question in the set!
                  </Alert>
                  <Alert bsStyle="danger"
                         className={
                           this.state.currQuestion === this.state.numQuestions ? 'hidden' : ''}>
                    <span role="img" aria-label="sad">😭</span>
                    Unfortunately you did not get them all! Try again another time.
                  </Alert>
                  <h3>
                    <b>Total Score: </b>{this.state.currentScore}
                  </h3>
                  <h4>
                    Guessed {this.state.currQuestion}/{this.state.numQuestions} songs!
                  </h4>

                </div>
              </Panel.Body>
            </Panel>
          </div>

        </Grid>
      </div>
    );
  }

}

export default Stage;
