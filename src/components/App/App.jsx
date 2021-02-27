import { HashRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import './App.css';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { pink, blue } from '@material-ui/core/colors';

import Home from '../Home/Home';
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import Submit from '../Submit/Submit';

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

function App() {

  return (
    <Router>
      <ThemeProvider theme={outerTheme}>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Feedback!</h1>
          <h4>Don't forget it!</h4>
        </header>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/feeling' >
          <Feeling />
        </Route>
        <Route path='/understanding' >
          <Understanding />
        </Route>
        <Route path='/support' >
          <Support />
        </Route>
        <Route path='/comments' >
          <Comments />
        </Route>
        <Route path='/submit' >
          <Submit />
        </Route>
      </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
