import React, { Component } from 'react';
import db from '../firebase';
import * as firebase from 'firebase';
import { List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../css/following.css';

export default class Following extends Component {
  constructor(){
    super()
    this.state = {
      following: ['dang', 'jav1jav', 'friendoBuddyfriendGuy']
    }
  }

  async componentDidMount(){
    try {
      await firebase.auth().onAuthStateChanged(async user => {
        const emailRef = await db.collection('jammers').doc(`${user.email}`).get()
        const email = emailRef.id //email to be used for querying user's following field

        //this.setState({following: })
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { following } = this.state
    return (
      <div id="following">
        <p>following</p>
        <List>
          {following.map(userName => {
            return (
              <div>
              <List.Item className='following-item'
              >{userName}</List.Item>
              <List.Icon name='following-live-icon' />
              </div>
          )})}
        </List>
      </div>
    );
  }
}
