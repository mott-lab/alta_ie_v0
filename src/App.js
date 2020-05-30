import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';

import Home from './Home';

import AltaTerminal from './AltaTerminal';

import './App.css';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Router>
          <div className="nav">
            <NavLink to="/terminal" className="custom-link" activeClassName="custom-link-active">terminal</NavLink>
            <NavLink exact to="/" className="custom-link" activeClassName="custom-link-active">info</NavLink>
          </div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/terminal">
              <AltaTerminal />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
