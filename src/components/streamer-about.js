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
    const { jammer } = this.state
    console.log('streamer-about current jammer:  ', jammer)
    return (
      <div id="streamer-about">
        yo streamah
      </div>
    )
  }
}
