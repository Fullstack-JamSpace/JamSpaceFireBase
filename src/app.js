import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './css/app.css';
import Routes from './routes';
import Following from './components/following';
import Navbar from './components/navbar/navbar.js';
import 'semantic-ui-css/semantic.min.css';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authStateEstablished: false,
      loggedIn: false
    };
  }

  async componentDidMount() {
    try {
      await firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          this.setState({ authStateEstablished: true, loggedIn: true });
        }
          this.setState({ authStateEstablished: true, loggedIn: false });
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log('app.js | this.state (login status)', this.state)

    return this.state.authStateEstablished ? (
      <div className="App">
        <Navbar />
        <div id="mainContainer">
          <Following />
          <Routes />
        </div>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default App;
