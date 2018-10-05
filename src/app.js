import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './css/app.css';
import Routes from './routes';
import Following from './components/following';
import Navbar from './components/navbar/navbar.js';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div id="mainContainer">
          <Following />
          <Routes />
        </div>
      </div>
    );
  }
}

export default App;
