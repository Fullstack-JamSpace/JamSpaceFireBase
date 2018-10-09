import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import * as firebase from 'firebase';
import '../css/chat-room.css';
//import { Image, Header, Card, Container, Icon } from 'semantic-ui-react'
import { getCurrentUser, getStreamer} from '../utils'

export default class StreamerAbout extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
      streamer: {}
    }
  }

  async componentDidMount(){
    try {
      const { displayName } = this.props
      const user = await getCurrentUser()
      const streamer = await getStreamer(displayName)
      console.log('USSER:  ', user)
      this.setState({user, streamer})
    } catch (error) {
      console.log(error);
    }
  }

  //

  render() {
    return (
      <div className="left aligned segment" id="chat-room">
        <div class="ui minimal comments">
          <h3 class="ui dividing header">Chat</h3>
          <div class="comment">
            <a class="avatar">
              <img src="/images/avatar/small/matt.jpg" />
            </a>
            <div class="content">
              <a class="author">Matt</a>
              <div class="metadata">
                <span class="date">Today at 5:42PM</span>
              </div>
              <div class="text">
                How artistic!
              </div>
              <div class="actions">
                <a class="reply">Reply</a>
              </div>
            </div>
          </div>
          <div class="comment">
            <a class="avatar">
              <img src="/images/avatar/small/elliot.jpg" />
            </a>
            <div class="content">
              <a class="author">Elliot Fu</a>
              <div class="metadata">
                <span class="date">Yesterday at 12:30AM</span>
              </div>
              <div class="text">
                <p>This has been very useful for my research. Thanks as well!</p>
              </div>
              <div class="actions">
                <a class="reply">Reply</a>
              </div>
            </div>
          </div>
          <div class="comments">
            <div class="comment">
              <a class="avatar">
                <img src="/images/avatar/small/jenny.jpg" />
              </a>
              <div class="content">
                <a class="author">Jenny Hess</a>
                <div class="metadata">
                  <span class="date">Just now</span>
                </div>
                <div class="text">
                  Elliot you are always so right :)
                </div>
                <div class="actions">
                  <a class="reply">Reply</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form class="ui reply form">
          <div class="field">
            <textarea></textarea>
          </div>
          <div class="ui blue labeled submit icon button">
            <i class="icon edit"></i> Add Reply
          </div>
        </form>
      </div>
    )
  }
}


