import * as firebase from 'firebase';
import db from './firebase';
import React, { Component } from 'react';
import SignupForm from './signup-form';
import history from './history';

export default class Login extends Component {
  constructor(){
    super();
    this.signOut = this.signOut.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  signOut(){
    firebase.auth().signOut();
  }

  handleSignup = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const displayName = event.target.displayName.value;
    const imageUrl = event.target.imageUrl.value;

    const emailRef = db.collection('jammers').doc(`${email}`)
    emailRef.get().then(user => {
      if (!user.exists) {
        firebase.auth().createUserWithEmailAndPassword(email, password)

          db.collection('jammers').doc(`${email}`).set({
            email,
            firstName,
            lastName,
            displayName,
            imageUrl
        })
      } else alert('That email already has an account with us')
    })
    history.push('/viewer')
  }

  handleLogin(event){

  }

  render(){
    console.log('current user: ', firebase.auth().currentUser());
    const currentUser = firebase.auth().currentUser()

    return (
      <React.Fragment>
        <h1>Welcome to Jamspace, baby!</h1>
        <SignupForm handleSignup={this.handleSignup} />
      </React.Fragment>
    )
  }
}
