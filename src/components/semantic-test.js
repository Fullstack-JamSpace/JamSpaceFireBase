import React from 'react';
import { List, Container, Segment, Button, Divider } from 'semantic-ui-react'
// import 'semantic-ui'
// import 'semantic-ui-css'
import 'semantic-ui-css/semantic.min.css';
// import '../semantic/dist/semantic.min.css';


class SemanticTest extends React.Component {
  state = {};

  handleClick = (e) => this.setState({ item: e.target.innerText });

  render() {
    // the learned lesson is that in JSX / Semantic, the rendering of the array
    // as a list depends on passing an array to the component - the mistake that
    // gets made is that you try to forEach or loop a function that generates
    // a new component with a different array element, but that just doesn't work
    const items = [
      { content: 'Item 1', onClick: this.handleClick },
      { content: 'Item 2', onClick: this.handleClick },
      { content: 'Item 3', onClick: this.handleClick },
    ]

return (
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

  <Container>
    <p>Selected Item: {this.state.item}</p>
    <Segment>
      <List items={items} />
    </Segment>
    <Segment>
      <List onClick={this.handleClick}>

        <List.Item content='Other 2' />
        <List.Item content='Other 3' />
      </List>
    </Segment>
  </Container>
</div>
);
      }
    }
export default SemanticTest
