import React from 'react';
import db from '../firebase';
import * as firebase from 'firebase';
import Popup from 'reactjs-popup';
import { Form, Button } from 'semantic-ui-react';
import { StreamerAboutEdit } from './streamer-about-edit'
import { StreamerAbout } from './streamer-about'
import { withOnSnapshot } from './with-on-snapshot';

export const StreamerAboutEditButton = (props) => {
  const { user, streamer } = props
  const { displayName } = streamer
  const StreamerAboutWithOnSnapshot = withOnSnapshot(StreamerAbout, displayName);
  const labelWidth = 6
  const contentStyle = {
    maxWidth: "600px",
    width: "90%"
  };

  const handleSubmit = async event => {
    event.preventDefault()
    const {
      name, photo, location, description, soundcloud, bandcamp,
      spotify, itunes, instagram, twitter, facebook, bio
    } = event.target
    try {
      db.collection('jammers').doc(user.email).set({
        ...user,
        displayName: name.value,
        imageUrl: photo.value,
        location: location.value, 
        description: description.value,
        soundcloud: soundcloud.value,
        bandcamp: bandcamp.value,
        spotify: spotify.value,
        itunes: itunes.value,
        instagram: instagram.value,
        twitter: twitter.value,
        facebook: facebook.value,
        bio: bio.value
      })
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <Popup
      trigger={
        <Button
          className="follow-button"
          icon="pencil"
          content='Edit'
        />        
      }
      modal
      contentStyle={contentStyle}
      >
      <Form id="form" onSubmit={handleSubmit}>
        <Form.Input name="name" label="Name"width={labelWidth} />
        <Form.Input name="photo" label="Photo"width={labelWidth} />
        <Form.Input name="location" label="Location"width={labelWidth} />
        <Form.Input name="description" label="Description"width={labelWidth} />
        <Form.Input name="soundcloud" label="Soundcloud"width={labelWidth} />
        <Form.Input name="bandcamp" label="Bandcamp"width={labelWidth} />
        <Form.Input name="spotify" label="Spotify"width={labelWidth} />
        <Form.Input name="itunes" label="iTunes"width={labelWidth} />
        <Form.Input name="instagram" label="Instagram"width={labelWidth} />
        <Form.Input name="twitter" label="Twitter"width={labelWidth} />
        <Form.Input name="facebook" label="Facebook"width={labelWidth} />
        <Form.Input name="bio" label="Bio"width={labelWidth} />
        <Form.Button id="submit-button" 
        type="submit">
        Submit</Form.Button>
      </Form>
    </Popup>
  )
};

