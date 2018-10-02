import * as firebase from 'firebase';
import db from './firebase';
import firebaseui from 'firebaseui';
import React, { Component } from 'react';

export default class Login extends Component {
  constructor(){
    super();
    this.signOut = this.signOut.bind(this)
  }

  componentDidMount(){
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    {
    // ui.start('#firebaseui-auth-container', {
    //   signInOptions: [
    //     {
    //       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //       requireDisplayName: false
    //     }
    //   ]
    // });
    }
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '/viewer',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      // tosUrl: '<your-tos-url>',
      // Privacy policy url.
      // privacyPolicyUrl: '<your-privacy-policy-url>'
    };
    ui.start('#firebaseui-auth-container', uiConfig)
  }

  signOut(){
    firebase.auth().signOut();
  }

  render(){
    console.log('current user: ', firebase.auth());

    return (
      <React.Fragment>
        <h1>Welcome to Jamspace, baby!</h1>

        {
        firebase.auth().currentUser ? <button onClick={this.signOut}>Sign out</button> : null
        }
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>


      </React.Fragment>
    )
  }
}
