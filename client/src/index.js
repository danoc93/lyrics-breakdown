import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './styles/index.css';
import LyricsTrivia from './components/LyricsTrivia';

ReactDOM.render((
  <BrowserRouter>
    <LyricsTrivia />
  </BrowserRouter>), document.getElementById('root'));
