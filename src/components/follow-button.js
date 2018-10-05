import React, {Component} from 'react';
import * as firebase from 'firebase';
import db from '../firebase';

//get email of currently logged in user

//if following doesnt exist create collection on user's db before next step

//add userName of streamer to 'following' collection


export default class FollowButton extends Component {
  constructor() {
    super()
    this.state = {
      email: ''
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
    console.log('email:   ', this.state.email)
    console.log('name;    ', this.props.displayName)
    const userEmail = this.state.email
    const streamer = this.props.displayName
    const user = db.collection('jammers').doc(`${userEmail}`)
    await user.update({
      followers: firebase.firestore.FieldValue.arrayUnion(`${streamer}`)
    })
    //use array.remove() to drop users that dont exist in following
  }

  render() {
    return (
      <div>
        <button class="ui active button" onClick={this.handleClick}>
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
