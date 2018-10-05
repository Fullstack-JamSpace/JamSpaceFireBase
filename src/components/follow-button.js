import React, {Component} from 'react';
import * as firebase from 'firebase';
import db from '../firebase';
import '../css/follow-button.css'

//if following contains displayName render disabled button

export default class FollowButton extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      isFollowing: false
    }
  }

  async componentDidMount() {
    try {
      await firebase.auth().onAuthStateChanged(async user => {
        const userRef = await db.collection('jammers').doc(`${user.email}`).get()
        this.setState({user: userRef.data()})
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
    const { user, isFollowing } = this.state
    const streamer = this.props.displayName
    try{
      const userData = await db.collection('jammers').doc(`${user.email}`)
      if(!isFollowing) {
        await userData.update({...user,
          following: firebase.firestore.FieldValue.arrayUnion(`${streamer}`)
        })
      } else {
        await userData.update({...user,
          following: firebase.firestore.FieldValue.arrayRemove(`${streamer}`)
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
