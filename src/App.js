import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Routes from './routes'
import Navbar from './navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
      <Routes />
      </div>
    );
  }
}

export default App;
