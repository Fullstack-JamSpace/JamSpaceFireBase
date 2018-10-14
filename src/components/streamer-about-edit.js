import React from 'react';
import { Form } from 'semantic-ui-react';
import '../css/streamer-about-edit.css'
import { StreamerAbout } from './streamer-about'

export const StreamerAboutEdit = props => {

  const lableWidth = 6

  // If component isn't passed a user, initialize values to show
  // in the form
  const user = props.user ?
    props.user :
    {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      displayName: 'Display Name',
      imageUrl: 'Image URL'
    }
  const { close } = props

  return (
      <Form id="form">
          <Form.Input name="firstName" label="First name"
          value={user.firstName} width={lableWidth} readOnly />

          <Form.Input name="lastName" label="Last name"
          value={user.lastName} width={lableWidth} readOnly />

          <Form.Input name="email" label="Email"
          value={user.email} width={lableWidth} readOnly />

          <Form.Input type="password" name="password" label="Password"
          value={user.password} width={lableWidth} readOnly />

          <Form.Input name="displayName" label="Display name"
          value={user.displayName} width={lableWidth} readOnly />

          <Form.Input name="imageUrl" label="Image URL"
          value={user.imageUrl} width={lableWidth}readOnly />

          <Form.Button id="submit-button" 
          type="submit" onClick={close}>
          Submit</Form.Button>
      </Form>
    )
};
