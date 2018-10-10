import React from 'react';
import { Form } from 'semantic-ui-react'

// OB/JD: might be able to squish this and AccountFormEdit into one component (can set `readOnly` to true or false), not an easy refactor

const AccountForm = props => {

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

  return (
      <Form>
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

          <Form.Button type="submit" onClick={props.handleSubmit}>Edit</Form.Button>
      </Form>
)};

export default AccountForm;
