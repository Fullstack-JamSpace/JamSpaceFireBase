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
      jammer: {},
    }
  }

  async componentDidMount(){
    try {
      const jammer = await getCurrentUser()
      this.setState({jammer})
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { imageUrl, facebook, twitter, instagram, website, soundcloud, bandcamp, spotify, bio, photos } = this.state.jammer
    
    return (
      <div id="streamer-about">
        <div id='streamer-profile-photo' src={imageUrl}
      </div>
    )
  }
}


<i class="spotify icon"></i>
<i class="facebook f icon"></i>
<i class="twitter icon"></i>
<i class="instagram icon"></i>
<i class="soundcloud icon"></i>
<i class="bandcamp icon"></i>