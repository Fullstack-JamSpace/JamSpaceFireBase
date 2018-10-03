import React from 'react';

const SignupForm = props => (
  <form className="submit-form" onSubmit={props.onFormSubmit}>
    <div>
      <label htmlFor="email">Email Address</label>
      <input type="email" name="email" required />
      <br />
      <label htmlFor="password">Password</label>
      <input type="text" name="password" required />
      <br />
      <button type="submit">Submit!</button>
    </div>
  </form>
);

export default SignupForm;
