import React, { Component } from 'react';
import { StreamerVid, ViewerVid } from '.';
import { Link } from 'react-router-dom';
import * as firebase from '../firebase';
import db from '../firebase';



// To get here, need to have visited /channels/:streamerDisplayName
// Using props.match.params.streamerDisplayName(?) we can pull displayName from URL and use that to determine the user being viewed
// If the logged in user is the user in the URL, offer option start/end stream.
// Otherwise, let them view only.

export default class StreamPage extends Component {
  constructor(){
    super()
    this.state = {
      isStreamer: false
    }
  }

  async componentDidMount(){
    // const user = await firebase.auth().currentUser;
    // console.log(user);
    const jammer = await db.collection('jammers').get()
    await firebase.auth().onAuthStateChanged(user => {
      // if (user.email)
    });
  }


  render(){
    return (
      <div>This is going to be an amazing full stream page</div>
    )
  }
}
