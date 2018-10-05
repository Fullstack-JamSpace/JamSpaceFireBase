import React from 'react';
import { Form, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const SignupForm = props => {
  // <form className="submit-form" onSubmit={props.handleSignup}>
  //   <div>
  //     <label htmlFor="firstName">First Name</label>
  //     <input type="text" name="firstName" required />
  //     <br />
  //     <label htmlFor="lastName">Last Name</label>
  //     <input type="text" name="lastName" required />
  //     <br />
  //     <label htmlFor="email">Email Address</label>
  //     <input type="email" name="email" required />
  //     <br />
  //     <label htmlFor="password">Password</label>
  //     <input type="text" minLength='6' name="password" required />
  //     <br />
  //     <label htmlFor="displayName">Display Name</label>
  //     <input type="text" name="displayName" required />
  //     <br />
  //     <label htmlFor="imageUrl">Profile Picture</label>
  //     <input type="text" name="imageUrl" />
  //     <br />
  //     <button type="submit">Submit!</button>
  //   </div>
  // </form>

  const lableWidth = 6
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
          placholder={user.password} width={lableWidth} minLength="6" required />

          <Form.Input name="displayName" label="Display name"
          placeholder={user.displayName} width={lableWidth} />

          <Form.Input name="imageUrl" label="Image URL"
          placeholder={user.imageUrl} width={lableWidth}/>

          <Form.Button type="submit">Submit</Form.Button>
      </Form>
)};

export default SignupForm;
