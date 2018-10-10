import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import * as firebase from 'firebase';
import '../css/chat-room.css';
import { getCurrentUser, getStreamer} from '../utils'

export default class ChatRoom extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
      streamer: {},
      messages: []
    }
    this.textInput = React.createRef()
    this.scroll = React.createRef()
  }

  async componentDidMount(){
    try {
      const { displayName } = this.props
      const user = await getCurrentUser()
      const streamer = await getStreamer(displayName)
      db.collection('jammers').doc(streamer.email).onSnapshot(doc => {
        const streamerData = doc.data()
        this.setState({
          user, streamer,
          messages: streamerData.messages})
        })
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = () => {
    this.focusTextInput()
    this.updateScroll()
  }

  focusTextInput = () => {
    this.textInput.current.focus();
  }

  updateScroll = () => {
    this.scroll.current.scrollTop = this.scroll.current.scrollHeight;
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { user, streamer } = this.state
    const newMessage = event.target.message.value
    event.target.message.value = ''
    //const message = user.displayName + ':    ' + text
    try {
      const streamerData = await db.collection('jammers').doc(streamer.email)
      await streamerData.update({...streamer,
        messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
      })
    } catch(error) {
      console.error(error)
    }
  }

  render() {
    const { user, messages } = this.state
    return (
      <div className="left aligned segment" id="chat-room">
        <div className="ui comments" id="messages" ref={this.scroll}>
          { !messages
            ? <div className="comment">-------------------------</div>
            : messages.map(message => <div className="comment" key={message}>
              <b>{user.displayName + ':       '}</b>}{message}
              </div>
            )
          }
        <br/>
        </div>
        <form className="ui reply form" onSubmit={this.handleSubmit}>
          <div className="field">
            <textarea name="message" ref={this.textInput} id="message-input"></textarea>
          </div>
          <button id="write-message-button" type="submit" onClick={this.handleClick}>
            <i className="icon edit"></i>
          </button>
        </form>
      </div>
    )
  }
}


