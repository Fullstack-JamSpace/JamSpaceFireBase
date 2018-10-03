import React from 'react';

const SignupForm = props => (
  <form className="submit-form" onSubmit={props.handleSignup}>
    <div>
      <label htmlFor="firstName">First Name</label>
      <input type="text" name="firstName" required />
      <br />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" name="lastName" required />
      <br />
      <label htmlFor="email">Email Address</label>
      <input type="email" name="email" required />
      <br />
      <label htmlFor="password">Password</label>
      <input type="text" minLength='6' name="password" required />
      <br />
      <label htmlFor="displayName">Display Name</label>
      <input type="text" name="displayName" required />
      <br />
      <label htmlFor="imageUrl">Profile Picture</label>
      <input type="text" name="imageUrl" />
      <br />
      <button type="submit">Submit!</button>
    </div>
  </form>
);

export default SignupForm;
