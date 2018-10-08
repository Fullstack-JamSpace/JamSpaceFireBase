import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import * as firebase from 'firebase';
// import { } from 'semantic-ui-react';
import '../css/streamer-about.css';
import { getCurrentUser } from '../utils'

export default class StreamerAbout extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
    }
  }

  async componentDidMount(){
    try {
      const user = await getCurrentUser()
      this.setState({user})
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { displayName, imageUrl, facebook, twitter, instagram, website, soundcloud, bandcamp, spotify, bio, photos } = this.state.user
    
    return (
      <div id="streamer-about">
        <img id="streamer-profile-photo" src={imageUrl} />
        <div id="streamer-info">
          <h2 id="streamer-name">{displayName}></h2>
          <div id="streamer-social-media">

          </div>
        </div>
      </div>
    )
  }
}


