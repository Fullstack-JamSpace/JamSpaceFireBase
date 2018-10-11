import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import * as firebase from 'firebase';
import '../css/chat-room.css';

const ChatRoom = props => {
  const { user, streamer } = props
  const { messages } = streamer
  const textInput = React.createRef()
  const scroll = React.createRef()

  const focusTextInput = () => {
    textInput.current.focus();
  }

  const updateScroll = () => {
    const scrollBar = scroll.current
    scrollBar.scrollTop = scrollBar.scrollHeight
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const text = event.target.message.value
    event.target.message.value = ''
    const message = user.displayName + ':    ' + text
    focusTextInput()
    updateScroll()

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

  return (
    <div className="left aligned segment" id="chat-room">
      <div className="ui comments" id="messages" ref={scroll}>
        { !messages
          ? <div className="comment">-------------------------</div>
          : messages.map(message => <div className="comment" key={message}>
            {message}
            </div>
          )
        }
      <br/>
      </div>
      <form className="ui reply form" onSubmit={handleSubmit}>
        <div className="field">
          <textarea name="message" ref={textInput} id="message-input"></textarea>
        </div>
        <button id="write-message-button" type="submit">
          <i className="icon edit"></i>
        </button>
      </form>
    </div>
  )
}

export default ChatRoom
