import { HashRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import './App.css';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import Header from '../Header/Header';
import Home from '../Home/Home';
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import Submit from '../Submit/Submit';
import Admin from '../Admin/Admin';

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#d32f2f',
    },
  },
});

function App() {

  return (
    <Router>
      <ThemeProvider theme={outerTheme}>
      <div className='App'>
        <Header />
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
        <Route path='/admin' >
          <Admin />
        </Route>
      </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
