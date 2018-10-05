import React, {Component} from 'react';
import * as firebase from 'firebase';
import db from '../firebase';

//if following contains displayName render disabled button

export default class FollowButton extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      isFollowing: false
    }
  }

  async componentDidMount() {
    try {
      await firebase.auth().onAuthStateChanged(async user => {
        const emailRef = await db.collection('jammers').doc(`${user.email}`).get()
        const email = emailRef.id //email to be used for querying user's following field
        this.setState({email})
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = async () => {
    try{
      const userEmail = this.state.email
      const streamer = this.props.displayName
      const userRef = await db.collection('jammers').doc(`${userEmail}`)
      const user = await db.collection('jammers').doc(`${userEmail}`).get()
      
      await userRef.update({...user.data(),
        following: firebase.firestore.FieldValue.arrayUnion(`${streamer}`)
      })      
    } catch (error) {
      console.error(error)
    }
    //use array.remove() to drop users that dont exist in following
  }

  render() {
    return (
      <div>
        <button class="ui active button" onClick={this.handleClick} floated='right'>
          <i class="user icon"></i>
          Follow
        </button>
      </div>
    )
  }
};

//if already following :

/*

<button class="ui disabled button">
  <i class="user icon"></i>
  Followed
</button>

*/
