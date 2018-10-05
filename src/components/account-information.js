import React from 'react';
import {Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SignupForm from './signup-form';
import { getCurrentUser } from '../utils'


class AccountInfo extends React.Component {
  state = {};

  handleSubmit = event => {
    const email = event.target.email.value;
    //const password = event.target.password.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const displayName = event.target.displayName.value;
    const imageUrl = event.target.imageUrl.value;
    console.log('account-information.js | event values: ', email, firstName, lastName, displayName, imageUrl)
  }

  async componentDidMount(){
    const jammer = await getCurrentUser()
    this.setState({
      jammer: jammer
    })
  }

  render() {
    console.log('account-information.js | this.state', this.state)
    return (

      <Container width={7}>
      <SignupForm handleSubmit={this.handleSubmit} user={this.state.jammer} />
      </Container>
    )
  }
}
export default AccountInfo;
