import React, { Component } from 'react';

import NavigationBar from './NavigationBar';
import MainRouter from './MainRouter';
import Footer from './Footer';

import '../styles/application.css';

/**
Component: LyricsTrivia
The central application controller. It instanciates the skeleton around
the routing logic.
*/

class LyricsTrivia extends Component {
  render() {
    return (

      <div>
        <NavigationBar/>
        <MainRouter/>
        <Footer/>
      </div>

    );
  }
}

export default LyricsTrivia;
