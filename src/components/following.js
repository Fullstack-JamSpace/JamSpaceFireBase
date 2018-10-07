import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import * as firebase from 'firebase';
import { List, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../css/following.css';
import { getCurrentUser } from '../utils'

export default class Following extends Component {
  constructor(){
    super()
    this.state = {
      jammer: {},
      following: [],
      isStreaming: true
    }
  }

  async componentDidMount(){
    const jammer = await getCurrentUser()
    this.setState({
      jammer: jammer,
      following: jammer ? jammer.following : []
    })
    console.log('following.js | result of getCurrentUser:', jammer)


    // if (jammer && jammer.email) {
    //   try {
    //     await firebase.auth().onAuthStateChanged(async user => {
    //       const userRef = await db.collection('jammers').doc(`${user.email}`).get()
    //       const userData = await userRef.data()
    //       const following = userData.following
    //       this.setState({following})
    //     })
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

  }

  render() {
    console.log('following.js | render | this.state', this.state)
    const { following, isStreaming } = this.state
    return (
      <div id="following">
        <p>FOLLOWING:</p>
        <Segment inverted>
          <List divided inverted id='following-list'>
            { !following
            ? <h2>Follow somebody already cmon</h2>
            : following.map(userName => {
                return userName !== ''
                ? (
                  <List.Item as={Link} to={`/channels/${userName}`} className='following-item' key={userName}>{userName}
                    {/* <Link id='following-item-link' to='{`/channels/${userName}`}'>{userName}</Link> */}
                    <List.Content floated='right'>
                      { isStreaming ? <i className='red circle icon'></i> : <i disabled className='grey circle icon'></i> }
                    </List.Content>
                  </List.Item>
                )
                : <List.Item className='following-item-empty'>''</List.Item>
              })
            }
          </List>
        </Segment>
      </div>
    );
  }
}
