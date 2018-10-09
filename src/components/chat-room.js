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
        <div className="ui minimal comments">
          <h3 className="ui dividing header">Chat</h3>
          <div className="comment">
            <a className="avatar">
              <img src="/images/avatar/small/matt.jpg" />
            </a>
            <div className="content">
              <a className="author">Matt</a>
              <div className="metadata">
                <span className="date">Today at 5:42PM</span>
              </div>
              <div className="text">
                How artistic!
              </div>
              <div className="actions">
                <a className="reply">Reply</a>
              </div>
            </div>
          </div>
          <div className="comment">
            <a className="avatar">
              <img src="/images/avatar/small/elliot.jpg" />
            </a>
            <div className="content">
              <a className="author">Elliot Fu</a>
              <div className="metadata">
                <span className="date">Yesterday at 12:30AM</span>
              </div>
              <div className="text">
                <p>This has been very useful for my research. Thanks as well!</p>
              </div>
              <div className="actions">
                <a className="reply">Reply</a>
              </div>
            </div>
          </div>
          <div className="comments">
            <div className="comment">
              <a className="avatar">
                <img src="/images/avatar/small/jenny.jpg" />
              </a>
              <div className="content">
                <a className="author">Jenny Hess</a>
                <div className="metadata">
                  <span className="date">Just now</span>
                </div>
                <div className="text">
                  Elliot you are always so right :)
                </div>
                <div className="actions">
                  <a className="reply">Reply</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="ui reply form">
          <div className="field">
            <textarea></textarea>
          </div>
          <div className="ui blue labeled submit icon button">
            <i className="icon edit"></i> Add Reply
          </div>
        </form>
      </div>
    )
  }
}


