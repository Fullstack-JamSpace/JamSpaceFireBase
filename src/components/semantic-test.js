import React from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react'
// import 'semantic-ui'
// import 'semantic-ui-css'
// import 'semantic-ui-css/semantic.min.css';
import '../semantic/dist/semantic.min.css';

const SemanticTest = () => (
  <div>
    <h3>JamSpace Baby</h3>
      <Button>click here</Button>
      <Divider />
      <Segment padded>
    <Button primary fluid>
      Login
    </Button>
    <Divider horizontal>Or</Divider>
    <Button secondary fluid>
      Sign Up Now
    </Button>
  </Segment>

  </div>
);

export default SemanticTest
