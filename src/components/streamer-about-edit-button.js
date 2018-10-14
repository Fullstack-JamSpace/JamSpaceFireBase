import React, { Fragment } from 'react';
import db from '../firebase';
import * as firebase from 'firebase';
import Popup from 'reactjs-popup';
import { Form, Button, Icon } from 'semantic-ui-react';
import '../css/streamer-about-edit.css'
import { StreamerAbout } from './streamer-about'
import { withOnSnapshot } from './with-on-snapshot';

export const StreamerAboutEditButton = (props) => {
  const { user } = props
  const { email, displayName, imageUrl, location, description, soundcloud, bandcamp,
          spotify, itunes, instagram, twitter, facebook, bio } = user

  const labelWidth = 14
  const contentStyle = {
    border: "solid lightgray 1px",
    display: "block",
    maxWidth: "600px"
  };

  const handleSubmit = event => {
    const {
      name, photo, location, description, soundcloud, bandcamp,
      spotify, itunes, instagram, twitter, facebook, bio
    } = event.target
    try {
      db.collection('jammers').doc(email).set({
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
        <Form.Input name="name" label="Name (required)"width={labelWidth} defaultValue={displayName}/>
        <Form.Input name="photo" label="Photo"width={labelWidth} defaultValue={imageUrl}/>
        <Form.Input name="location" label="Location"width={labelWidth} defaultValue={location} />
        <Form.Input name="description" label="Description"width={labelWidth} defaultValue={description} />
        <Form.Input name="soundcloud" label="Soundcloud"width={labelWidth} defaultValue={soundcloud} />
        <Form.Input name="bandcamp" label="Bandcamp"width={labelWidth} defaultValue={bandcamp} />
        <Form.Input name="spotify" label="Spotify"width={labelWidth} defaultValue={spotify} />
        <Form.Input name="itunes" label="iTunes"width={labelWidth} defaultValue={itunes} />
        <Form.Input name="instagram" label="Instagram"width={labelWidth} defaultValue={instagram} />
        <Form.Input name="twitter" label="Twitter"width={labelWidth} defaultValue={twitter} />
        <Form.Input name="facebook" label="Facebook"width={labelWidth} defaultValue={facebook} />
        <Form.TextArea name="bio" label="Bio"width={labelWidth} defaultValue={bio} />
        <Form.Button id="submit-button" 
        type="submit">
        Submit</Form.Button>
      </Form>
    </Popup>
  )
};

