import React, { Component } from 'react';
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
      // OB/JD: I don't think `.onAuthStateChanged` returns a promise, so no need for await
      // OB/JD: you start listening when the component mounts, also stop listening when it unmounts (not the most relevant to this component)
      await firebase.auth().onAuthStateChanged(async user => {
        // OB/JD: async fn with no await inside
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
    // OB/JD: channel your inner lumberjack
    console.log('app.js | this.state (login status)', this.state)

    return this.state.authStateEstablished ? (
      <div className="App">
        <Navbar />
        {/* OB/JD: common html/css naming convention to use dash case instead of camel case, what you have is also out there */}
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
