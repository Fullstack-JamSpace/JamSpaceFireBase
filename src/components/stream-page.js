import React, { Component } from 'react';
import { StreamerVid, ViewerVid } from '.';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import db from '../firebase';



// To get here, need to have visited /channels/:displayName
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
    const channelOwner = this.props.match.params.displayName;
    const jammerRef = await db.collection('jammers').doc(`${channelOwner}`).get()
    const jammer = await jammerRef.data() || {};
    await firebase.auth().onAuthStateChanged(user => {
      if (user.email === jammer.email) this.setState( { isStreamer: true } )
    });
    console.log('state check: ', this.state);
  }


  render(){
    const { isStreamer } = this.state;
    return (
      isStreamer ?
        <div>Welcome to your stream page, streamer!</div> :
        <div>Welcome to the streamer's page, viewer!</div>

    )
  }
}
