import React, {Component} from 'react';
import db from '../firebase';
import * as firebase from 'firebase';
import '../css/chat-room.css';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.scroll = React.createRef()
  }

  updateScroll = () => {
    const scrollBar = this.scroll.current
    scrollBar.scrollTop = scrollBar.scrollHeight
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { streamer, user } = this.props
    const text = event.target.message.value
    event.target.message.value = ''
    const message = user.displayName + ':    ' + text

    try {
      const streamerData = await db.collection('jammers').doc(streamer.email)
      await streamerData.update({
        messages: firebase.firestore.FieldValue.arrayUnion(message),
        merge: true
      })
    } catch(error) {
      console.error(error)
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.streamer !== prevProps.streamer) {
      this.updateScroll()
    }
  }
  render() {
    const currentUser = this.props.user
    const currentStreamer = this.props.streamer
    const {messages} = currentStreamer ? currentStreamer : []
    return (
      <div className="left aligned segment" id="chat-room">
        <div className="ui comments" id="messages" ref={this.scroll}>
          { !messages
            ? <div className="comment">-------------------------</div>
            : messages.map(message => <div className="comment" key={message}>
              {message}
              </div>
            )
          }
        <br/>
        </div>
        {currentUser &&
        <form className="ui reply form" onSubmit={this.handleSubmit}>
          <input autoComplete='off' name="message" id="message-input"></input>
          <button id="write-message-button" type="submit">
            <i className="icon edit"></i>
          </button>
        </form>
        }
      </div>
    )  
  }
}

export default ChatRoom
