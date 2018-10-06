import React from 'react';
import {Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { getCurrentUser } from '../utils'
import AccountForm from './account-form';
import AccountFormEdit from './account-form-edit';
import db from '../firebase'


class AccountInfo extends React.Component {
  state = {
    jammer: '',
    editMode: false
  };

  handleSubmit = async (event) => {
    const email = event.target.email.value;
    //const password = event.target.password.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const displayName = event.target.displayName.value;
    const imageUrl = event.target.imageUrl.value;
    const jammerRef = await db.collection('jammers').doc(`${this.state.jammer.id}`)
    await jammerRef.update({...this.state.jammer, email, firstName, lastName, displayName, imageUrl})
    this.props.history.push("/")

    // console.log('account-information.js | event values: ', email, firstName, lastName, displayName, imageUrl)
  }

  handleEdit = event => {
    event.preventDefault();
    this.setState ({
      editMode: true
    })
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

      <Container>
      {this.state.editMode ?
      <AccountFormEdit handleSubmit={this.handleSubmit} user={this.state.jammer} />
      :
      <AccountForm handleSubmit={this.handleEdit} user={this.state.jammer} />
      }

      </Container>
    )
  }
}
export default AccountInfo;
