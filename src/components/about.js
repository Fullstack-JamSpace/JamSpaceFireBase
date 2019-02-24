import React from 'react';
import { Link } from 'react-router-dom';
import css from '../css/about.css'

export const About = () => (
  <div id='about-container'>
    <h1 id='about-header'>About JamSpace.TV</h1>

    <h3>LiveStreaming platform for musical performance & interaction.</h3>

    <p>
      JamSpace is a live-streaming and interaction app built by musicians for
      musicians. We specifically cater to musicians that want to live stream
      their performances, lessons, or production to a virtual audience that can
      interact via a real-time chatroom.
    </p>

    <p>
      While there are many streaming apps that exist, their music sections are
      usually buried below video-game streamers. We wanted to build an app as
      well as a culture for musicians so they can have a place to call their own
      in the fast evolving virtual world.
    </p>

    <h3>Background</h3>

    <p>
      JamSpace was built by James Byrd, Dan Gilbert and Javier Carey as their
      capstone project prior to graduating from FullStack Academy's Remote
      Intensive Program in October 2018.
    </p>
    <p>
      See our presentation{' '}
      <a className='about-link' href="https://www.youtube.com/watch?v=qcCDYTLqq5w">here</a>.
    </p>
    <p>
      Our code is <a className='about-link' href="https://github.com/Fullstack-JamSpace">here</a>.
    </p>

    <h3>PLEASE NOTE: </h3>
    <ul>
      <li>
        The website works! If you setup an account and start a stream then
        anyone on the site could see you are live and then go see what you are
        streaming.
      </li>
      <li>
        Not that there's any traffic on the site, but some people would be mad
        if we didn't say explicitly somewhere that "hey - you're potentially
        broadcasting a stream to anyone!"
      </li>
      <li>
        The chat window works, so if you do catch someone streaming you could
        communicate to them via chat. Everyone else watching that stream will
        see all the same messages.
      </li>
      <li>
        For demo purposes, the BobbyD test account has been hard-coded to always
        appear online, but there's no one streaming on that channel.
      </li>
      <li>
        The website works best on the Chrome browser. We have not tested with
        other browsers.
      </li>
    </ul>

    <h3>Core Technologies </h3>
    <ul>
      <li>WebRTC / PeerJS - peer to peer video and data streaming</li>
      <li>
        Firebase - auth and data storage, and event hooks for getting realtime
        updates to back end data changes
      </li>
      <li>Semantic UI - front-end CSS</li>
    </ul>

    <h3>Biggest Challenges</h3>
    <ul>
      <li>
        Understanding webRTC handshake process and handing off media streams
      </li>
      <li> Understanding firebase concepts</li>
      <li> Trying to understand all of the above simultaneously</li>
    </ul>

    <h3>Shout Outs</h3>
    <ul>
      <li> Muaz Kahn - webRTC muse</li>
      <li>
        Omri Bernstein - resolving hours of troubleshooting with the letter 's'
      </li>
      <li> Jessie De La Cruz Santos - suggesting PeerJS and general support</li>
      <li> Jack Lye - Morgan just use Firebase for everything!</li>
    </ul>

    <h3>Team Members: </h3>
    <ul>
      <li>
        <a className='about-link' href="https://www.linkedin.com/in/james-s-byrd/">James Byrd</a>
      </li>
      <li>
        <a className='about-link' href="https://www.linkedin.com/in/d-gilbert/">Dan Gilbert</a>
      </li>
      <li>
        <a className='about-link' href="https://www.linkedin.com/in/javiercarey/">Javier Carey</a>
      </li>
    </ul>
    <br/>
    <div>
      <Link className='about-link' to="/">Return to Home Page</Link>
    </div>
  </div>
);
