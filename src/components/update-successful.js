import React from 'react';
import { Button } from 'semantic-ui-react';

export const UpdateSuccessful = (props) => (
  <div>
    <h1 >Yay!</h1>
    <h5>Update completed successfully!</h5>
    <Button onClick={props.handleClick}>Return to account information</Button>
  </div>
)
