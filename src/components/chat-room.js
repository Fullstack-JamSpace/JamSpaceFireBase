import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import * as firebase from 'firebase';
import '../css/chat-room.css';
import { getCurrentUser, getStreamer} from '../utils'

export default class StreamerAbout extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
      streamer: {},
      messages: []
    }
    this.textInput = React.createRef();
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

  focusTextInput = () => {
    this.textInput.current.focus();
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { user, streamer } = this.state
    const text = event.target.message.value
    event.target.message.value = ''
    const message = user.displayName + ':    ' + text
    try {
      const streamerData = await db.collection('jammers').doc(streamer.email)
      await streamerData.update({...streamer,
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      })
    } catch(error) {
      console.error(error)
    }
  }

  render() {
    const { user, messages } = this.state
    return (
      <div className="left aligned segment" id="chat-room">
        <div className="ui comments">
          <h3 className="ui dividing header">Chat</h3>
          { !messages
            ? <div className="comment">-------------------------</div>
            : messages.map(message => <div className="comment" key={message}>{message}</div>)
          }
        </div>
        <form className="ui reply form" onSubmit={this.handleSubmit}>
          <div className="field">
            <textarea name="message" ref={this.textInput}></textarea>
          </div>
          <button id="write-message-button" type="submit" onClick={this.focusTextInput}>
            <i className="icon edit"></i>
          </button>
        </form>
      </div>
    )
  }
}


