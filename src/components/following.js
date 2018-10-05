import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import * as firebase from 'firebase';
import { List, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../css/following.css';

export default class Following extends Component {
  constructor(){
    super()
    this.state = {
      following: ['dang', 'jav1jav', 'friendoBuddyfriendGuy', 'myfriendbuddy', 'guypal', 'friendo', 'personIKnow', 'anotherPersonIknow', 'personIdontknonw', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      isStreaming: true
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
    const { following, isStreaming } = this.state
    return (
      <div id="following">
        <p>FOLLOWING:</p>
        <Segment inverted>
          <List divided inverted id='following-list'>
            { following.map(userName => {
              return userName !== ''
              ? (
                <List.Item className='following-item'>
                  <Link id='following-item-link' to='{`/channels/${userName}`}'>{userName}</Link>
                  <List.Content floated='right'>
                    { isStreaming ? <i className='red circle icon'></i> : <i disabled className='grey circle icon'></i> }
                  </List.Content>
                </List.Item>
              )
              : <List.Item className='following-item-empty'>''</List.Item>
            })}
          </List>
        </Segment>
      </div>
    );
  }
}
