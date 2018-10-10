import React from 'react';
import { Form } from 'semantic-ui-react';

const LoginForm = props => {

  const lableWidth = 6
  return (
  <Form onSubmit={props.handleLogin}>
    <Form.Input name="email" label="Email"
    placeholder="Email" width={lableWidth} required />

    <Form.Input type="password" name="password" label="Password"
    placeholder="Password" width={lableWidth} required />

    <Form.Button type="submit">Submit</Form.Button>
  </Form>
  // OB/JD: "this is thriller"
  // <form className="submit-form" onSubmit={props.handleLogin}>
  //   {/* <div>
  //     <label htmlFor="email">Email Address</label>
  //     <input type="email" name="email" required />
  //     <br />
  //     <label htmlFor="password">Password</label>
  //     <input type="text" name="password" required />
  //     <br />
  //     <button type="submit">Submit!</button>
  //   </div> */}
  // </form>
  )
}

export default LoginForm;
