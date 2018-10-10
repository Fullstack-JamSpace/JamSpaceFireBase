import * as firebase from 'firebase';
import db from '../firebase';
import React, { Component, Fragment } from 'react';
import LoginForm from './login-form';
import history from '../history';

export default class Login extends Component {
  constructor(){
    super();
    this.handleLogin = this.handleLogin.bind(this) //do we need this? // OB/JD: nope
  }

  handleLogin = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const emailRef = db.collection('jammers').doc(`${email}`)
    emailRef.get().then(user => {
      if (user.exists) {
        // OB/JD: this might belong in a setup code somewhere (maybe app.js)
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() => firebase.auth().signInWithEmailAndPassword(email, password))

      } else alert('This user does not exist')
    })
    history.push('/')
  }

  render(){
    return (
      <Fragment>
        <h1>Welcome to Jamspace, baby!</h1>
        <LoginForm handleLogin={this.handleLogin} />
      </Fragment>
    )
  }
}
