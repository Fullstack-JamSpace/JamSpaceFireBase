import React from 'react';
import { Button } from 'semantic-ui-react';

export const UpdateError = (props) => (
  <div>
    <h1 >Bummer...</h1>
    <h5>Error completing update.</h5>
    <Button onClick={props.handleClick}>Return to account information</Button>
  </div>
)
