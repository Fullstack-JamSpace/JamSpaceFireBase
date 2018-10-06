import React from 'react';
import { Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const SignupForm = props => {

  const lableWidth = 6

  // If AccountForm component isn't passed a user, initialize values to show
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
      <Form onSubmit={props.handleSubmit}>
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

          <Form.Button type="submit">Submit</Form.Button>
      </Form>
)};

export default SignupForm;
