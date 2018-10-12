import React from 'react';
import { Link } from 'react-router-dom'
import db from '../firebase';
import * as firebase from 'firebase';
// import { } from 'semantic-ui-react';
import '../css/streamer-about.css';
import { Image, Header, Card, Container, Icon } from 'semantic-ui-react'

const StreamerAbout = props => {
  console.log('PROPS:  ', props)
  const { displayName, location, imageUrl, description, facebook, twitter, instagram, website, soundcloud, bandcamp, spotify, itunes, bio, photos, followers } = props.streamer
  const followerHeader = followers === 1 ? 'Follower' : 'Followers'
  return (
    <div id="streamer-about">
      <Card id="card">
        <Image id="profile-photo" src={imageUrl} />
        <Card.Content id="card-info">
          <h2 id="name">{displayName}</h2>
          <Card.Meta>
            <span id="location">{location}</span>
          </Card.Meta>
          <Card.Description id="description">{description}</Card.Description> <br/>
          <Card.Description as={Link} to={`${website}`} id="website">{website}</Card.Description>
        </Card.Content>
        <Card.Content id="social-media">
          <div id="social-media-buttons">
            <a href={`${soundcloud}`} target="_blank">
              <button className="fluid ui button" id="soundcloud">
                <Icon name='soundcloud' /> Soundcloud</button>
            </a>
            <a href={`${bandcamp}`} target="_blank">
              <button className="fluid ui button" id="bandcamp">
                <Icon name='bandcamp' /> Bandcamp</button>
            </a>
            <a  href={`${spotify}`} target="_blank">
              <button className="fluid ui button" id="spotify">
                <Icon name='spotify' /> Spotify</button>
            </a>
            <a href={`${itunes}`} target="_blank">
              <button className="fluid ui button" id="itunes">
                <Icon name='itunes' /> iTunes</button>
            </a>
            <a href={`${instagram}`} target="_blank">
              <button className="fluid ui button instagram" id="instagram">
                <Icon name='instagram' /> Instagram</button>
            </a>
            <a href={`${twitter}`} target="_blank">
              <button className="fluid ui button twitter" id="twitter">
                <Icon name='twitter' /> Twitter</button>
            </a>
            <a href={`${facebook}`} target="_blank">
              <button className="fluid ui button facebook" id="facebook">
                <Icon name='facebook' /> Facebook</button>
            </a>
          </div>
        </Card.Content>
        <Card.Content extra id="followers">
          <Icon name='user' />{followers} {followerHeader}
        </Card.Content>
      </Card>
      <div id="bio">
        <h2 id="bio-header">Bio:</h2> <br/>
        <Container text><p id='bio-text'>{bio}</p></Container>
      </div>
    </div>
  )
}

export default StreamerAbout

