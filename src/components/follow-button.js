import React, {Component} from 'react';
import * as firebase from 'firebase';
import db from '../firebase';
import '../css/follow-button.css'
import { Button } from 'semantic-ui-react';
import { getCurrentUser } from '../utils';

//if following contains displayName render disabled button

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
    let streamer = {};
    try {
      const user = await getCurrentUser()
      const following = user.following;
      if (following && following.includes(this.props.displayName)) {
        this.setState({isFollowing: true})
      }

      const streamerRef = await db.collection('jammers').where('displayName', '==', `${this.props.displayName}`).get()
      streamerRef.forEach(doc => streamer = doc.data())

      this.setState({ user, streamer })
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

      this.setState({ isFollowing : !isFollowing })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { isFollowing } = this.state
    return (
      !isFollowing
      ? <Button className='follow-button' onClick={this.handleClick} icon='user' content='Follow' />
      : <Button positive className='follow-button' onClick={this.handleClick} icon='checkmark' content='Following'/>
    )
  }
};
