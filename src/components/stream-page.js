import React, { Fragment, Component } from 'react';
import { StreamerVid, ViewerVid } from '.';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import db from '../firebase';
import FollowButton from './follow-button'



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
    try {
      let jammer = [];
      const channelOwner = this.props.match.params.displayName;
      const jammerRef = await db.collection('jammers').where('displayName', '==', `${channelOwner}`).get();

      await jammerRef.forEach(x => {
        if (x.data()) jammer.push(x.data());
      });

      await firebase.auth().onAuthStateChanged(user => {
        if ((jammer.length && user) && (user.email === jammer[0].email)) this.setState( { isStreamer: true })
    });
    } catch (error) {
      console.log(error);
    }
  }


  render(){
    const { isStreamer } = this.state;
    const displayName = this.props.match.params.displayName;

    return (
      isStreamer ?
        <Fragment>
          <StreamerVid displayName={displayName} />
        </Fragment> :
        <Fragment>
          <ViewerVid displayName={displayName} />
          <FollowButton displayName={displayName} />
        </Fragment>
    )
  }
}
