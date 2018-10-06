import React, {Component} from 'react';
import * as firebase from 'firebase';
import db from '../firebase';
import '../css/follow-button.css'
import { getStreamer } from '../utils'

export default class FollowButton extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      streamer: {},
      isFollowing: false
    }
  }

  async componentDidMount() {
    let streamer = {}
    try {
      await firebase.auth().onAuthStateChanged(async user => {
        const userRef = await db.collection('jammers').doc(`${user.email}`).get()
        const streamerRef = await db.collection('jammers').where('displayName', '==', `${this.props.displayName}`).get()
        streamerRef.forEach(doc => streamer = doc.data())
        //const streamerData = await getStreamer(streamerRef)

        this.setState({user: userRef.data(), streamer})
        const following = userRef.data().following
        if(following && following.indexOf(this.props.displayName) !== -1) {
          this.setState({isFollowing: true})
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = async () => {
    const { user, isFollowing, streamer } = this.state
    if(!streamer.followers) streamer.followers = 0
    try{
      const userData = await db.collection('jammers').doc(`${user.email}`)
      const streamerData = await db.collection('jammers').doc(`${streamer.email}`)
      if(!isFollowing) {
        await userData.update({...user,
          following: firebase.firestore.FieldValue.arrayUnion(`${streamer.displayName}`),
        })
        await streamerData.update({...streamer,
          followers: streamer.followers += 1
        })
      } else {
        await userData.update({...user,
          following: firebase.firestore.FieldValue.arrayRemove(`${streamer.displayName}`)
        })
        await streamerData.update({...streamer,
          followers: streamer.followers -= 1
        })  
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { isFollowing } = this.state
    return (
      !isFollowing
      ? 
      <button className="follow-button ui active button" onClick={this.handleClick}>
        <i className="user icon"></i>
        Follow
      </button>
      : 
      <button className="follow-button active ui button" onClick={this.handleClick}>
        <i className="user icon"></i>
        UnFollow
      </button>
    )
  }
};
