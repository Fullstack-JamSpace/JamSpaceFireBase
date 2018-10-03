import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './app.css';
import Routes from './routes';
import Following from './following';
import Navbar from './navbar';

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
