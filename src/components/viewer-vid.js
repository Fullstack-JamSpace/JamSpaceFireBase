import Peer from 'peerjs';
import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class ViewerVid extends Component {
  // constructor () {
  //   super();
  // }

  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //console.log('USER HERE!: ', user);
      }
    });

    const { displayName } = this.props
    console.log('PROPS: ', displayName);
    // let viewerPeerId =
    //   'viewerJavierLilahJackie' + Math.floor(Math.random() * 1000);

    const peer = new Peer();
    console.log('peer created', peer);

    peer.on('open', id => {
      console.log('my id is ', id);
    });

    // omri suggested that we may need to use the connection to properly disconnect when a user closes the view - commenting out now b/c of the linter
    // commenting the line below out caused no viewer connection to be established
    let conn = peer.connect(displayName);
    // 'viewerJavierLilahJackie'

    peer.on('call', function(call) {
      // Answer the call, providing our mediaStream
      call.answer();
      console.log('call answered');
      call.on('stream', function(stream) {
        myVideo.srcObject = stream;
        console.log('stream added to video object');
      });
    });

    const myVideo = document.getElementById('myVideo');
  }

  render() {
    return (
      <div>
        <video id="myVideo" autoPlay />
      </div>
    );
  }
}
