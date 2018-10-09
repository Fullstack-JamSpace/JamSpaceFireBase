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

    // ice servers are used by webrtc / peerjs to establish the connection to the browser clients
    // when they are behind routers that sheild private networks from the public internet - when
    // peerJS makes connection it uses stun server to identify its external IP and then does some
    // math on how to get from that IP, through the private network to the users browser - then it
    // sends that to the peer its trying to connect to.
    // peerJS recommends we setup our own, and we had identified these settings when we were mucking
    // with webRTC
    const iceServers = {
       'iceServers': [
         { 'urls': 'stun:stun.services.mozilla.com' },
         { 'urls': 'stun:stun.l.google.com:19302' },
         { 'urls': 'turn:numb.viagenie.ca', 'credential': 'webrtc', 'username': 'javier3@gmail.com' }
        ] };

    const peer = new Peer({host: 'jampspace-01-peerjs-01.herokuapp.com', port: 80, config: iceServers});
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
