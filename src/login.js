import * as firebase from 'firebase';
import db from './firebase';
import React, { Component, Fragment } from 'react';
import LoginForm from './login-form';
import history from './history';

export default class Login extends Component {
  constructor(){
    super();
    this.handleLogin = this.handleLogin.bind(this) //do we need this? OB: nope!
  }

  handleLogin = event => {
    event.preventDefault();
    // OB: migh be worthwhile to have the form deal with getting the data and packaging it into an object (SRP) single responsibility principle from OOP (object oriented programming)
    const email = event.target.email.value;
    const password = event.target.password.value;
    // OB: anywhere you are using `.then` you can use `await` instead (make the enclosing function `async`)
    const emailRef = db.collection('jammers').doc(`${email}`)
    emailRef.get().then(user => {
      if (user.exists) {
        // OB: silent error
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() => firebase.auth().signInWithEmailAndPassword(email, password))

      } else alert('This user does not exist')
    })
    // OB: might want to move this
    history.push('/viewer')
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
