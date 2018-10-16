import React, { Component } from 'react';
import './css/app.css';
import Routes from './routes';
import { Following } from './components/following';
import Navbar from './components/navbar/navbar.js';
import 'semantic-ui-css/semantic.min.css';
import * as firebase from 'firebase';
import { withOnSnapshot } from './components/with-on-snapshot';
const FollowingWithOnSnapshot = withOnSnapshot(Following);

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
    return this.state.authStateEstablished && (
      <div className="App">
        <Navbar />
        <div id="mainContainer">
          <FollowingWithOnSnapshot />
          <Routes />
        </div>
      </div>
    )
  }
}

export default App;
