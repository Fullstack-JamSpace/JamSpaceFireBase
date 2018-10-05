import React from 'react';
import {
  Form,
  List,
  Container,
  Segment,
  Button,
  Divider,
  Input,
  Icon
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SignupForm from './signup-form';
import * as firebase from 'firebase';

class AccountInfo extends React.Component {
  state = {};
  handleClick = e => this.setState({ item: e.target.innerText });
  handleSubmit = event => {
  const email = event.target.email.value;
  //const password = event.target.password.value;
  const firstName = event.target.firstName.value;
  const lastName = event.target.lastName.value;
  const displayName = event.target.displayName.value;
  const imageUrl = event.target.imageUrl.value;
  console.log('what!!!!', email, firstName, lastName, displayName)
  }

  render() {
    let currUser;
    firebase.auth().onAuthStateChanged( user => user ? currUser=firebase.auth().currentUser : false)
    return (
      <SignupForm handleSubmit={this.handleSubmit} user={currUser}/>
    )


  }
}
export default AccountInfo;
