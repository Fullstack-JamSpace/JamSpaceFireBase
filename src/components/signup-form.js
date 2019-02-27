import React from 'react';
import { Form } from 'semantic-ui-react'
import '../css/signup-form.css'

const SignupForm = props => {

  const lableWidth = 30

  // If component isn't passed a user, initialize values to show
  // in the form
  const user = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      displayName: 'Display Name',
      imageUrl: 'Image URL'
    }

  return (
      <Form id='signup-form' onSubmit={props.handleSubmit}>
          <Form.Input name="firstName" label="First name"
          placeholder={user.firstName} width={lableWidth} />

          <Form.Input name="lastName" label="Last name"
          placeholder={user.lastName} width={lableWidth} />

          <Form.Input name="email" label="Email"
          placeholder={user.email} width={lableWidth} required />

          <Form.Input name="password" label="Password"
          placeholder={user.password} width={lableWidth} minLength="6" required />

          <Form.Input name="displayName" label="Display name"
          placeholder={user.displayName} width={lableWidth} />

          <Form.Input name="imageUrl" label="Image URL"
          placeholder={user.imageUrl} width={lableWidth}/>

          <Form.Button id='signup-submit-btn' type="submit">Submit</Form.Button>
      </Form>
)};

export default SignupForm;
