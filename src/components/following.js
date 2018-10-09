import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import { List, Segment } from 'semantic-ui-react';
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
    // const currUser = await getCurrentUser() ? await getCurrentUser() : {}

    // db.collection('jammers').doc(currUser.email).onSnapshot( (doc) => {
    //   const userData = doc.data()
    //   this.setState({
    //     jammer: userData,
    //     following: userData.following
    //   })
    // })
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
