import React from 'react';
import {Link} from 'react-router-dom';

export const UpdateSuccessful = (props) => (
  <div>
    <h1 >Yay!</h1>
    <h5>Update completed successfully!</h5>
    <div><Link to={`/`}>Return to home</Link></div>
  </div>
)
