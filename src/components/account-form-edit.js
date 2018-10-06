import React from 'react';
import { Form } from 'semantic-ui-react'


const AccountFormEdit = props => {

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
  console.log('account-form-edit', props.user)
  return (
      <Form onSubmit={props.handleSubmit}>
          <Form.Input name="firstName" label="First name"
          defaultValue={user.firstName} width={lableWidth} />

          <Form.Input name="lastName" label="Last name"
          defaultValue={user.lastName} width={lableWidth} />

          <Form.Input name="email" label="Email"
          defaultValue={user.email} width={lableWidth} />

          <Form.Input name="password" label="Password"
          defaultValue={user.password} width={lableWidth} />

          <Form.Input name="displayName" label="Display name"
          defaultValue={user.displayName} width={lableWidth} />

          <Form.Input name="imageUrl" label="Image URL"
          defaultValue={user.imageUrl} width={lableWidth} />

          <Form.Button type="submit" >Submit</Form.Button>
      </Form>
)};

export default AccountFormEdit;
