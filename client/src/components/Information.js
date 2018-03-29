import React from 'react';
import {Jumbotron, Grid} from 'react-bootstrap';

/**
Component: Information
Used for displaying general game information and some credits.
*/

const Information = () => (

    <div>
        <Jumbotron>
            <Grid>
                <p>
                    <br/>
                    This application has been built using
                    the <a href="https://www.musixmatch.com/">MusixMatch</a> API!
                </p>
            </Grid>
        </Jumbotron>

        <Grid>

            <h3><span role="img" aria-label="wonder">🤔</span> How to play?</h3>
            <p className="informationBlock">
                You have a limited amount of attempts to guess as many songs as you can.
                Use the tokens to visualize more lyrics and to play a piece of the song.<br/>
                From the Leaderboards you can see the top global and national players,
                and you can also compare your performance to that of your friends!
            </p>

            <h3><span role="img" aria-label="score">🎮</span> Scoring rules</h3>
            <p className="informationBlock">
                You start a regular game with XX lives. Each failure makes you lose one and
                each successful guess grants you XX points. For each game, a player has
                XX lyric tokens, and XX sound tokens.
                Your final score is included in your historical total, which is used by
                our system to rank you with respect to the other players.

            </p>
            <br/><br/>
            <h3>Created by</h3>
            <p>
                <li>Daniel Ortiz-Costa</li>
                <li>Derrick Afrifa</li>
                <li>Martino Mansoldo</li>
            </p>
            <br/>
            Version 1.0 - <b>2018</b><br/>
            Toronto, ON, Canada

        </Grid>
    </div>
);

export default Information;
