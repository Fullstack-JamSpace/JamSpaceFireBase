import React from 'react';
import { Form } from 'semantic-ui-react'
import '../css/account-form-edit.css'

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

  return (
      <Form id='account-form-edit' onSubmit={props.handleSubmit}>
          <Form.Input name="firstName" label="First name"
          defaultValue={user.firstName} width={lableWidth} />

          <Form.Input name="lastName" label="Last name"
          defaultValue={user.lastName} width={lableWidth} />

          <Form.Input name="email" label="Email (cannot be changed at this time)"
          defaultValue={user.email} width={lableWidth} disabled />

          <Form.Input type="password" name="password" label="Password (cannot be changed at this time)"
          value='123456' width={lableWidth} disabled />

          <Form.Input name="displayName" label="Display name"
          defaultValue={user.displayName} width={lableWidth} />

          <Form.Input name="imageUrl" label="Image URL"
          defaultValue={user.imageUrl} width={lableWidth} />

          <Form.Button id='account-form-edit-submit-btn' type="submit" >Submit</Form.Button>
      </Form>
)};

export default AccountFormEdit;
