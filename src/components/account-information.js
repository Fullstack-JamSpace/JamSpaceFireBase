import React from 'react';
import {Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { getCurrentUser } from '../utils'
import AccountForm from './account-form';
import AccountFormEdit from './account-form-edit';

import db from '../firebase'
import { UpdateSuccessful } from './update-successful';
import { UpdateError } from './update-error';

// form edit modes
const UPDATE_ERROR = 'UPDATE_ERROR'
const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
const READING = 'READING'
const EDITING = 'EDITING'


class AccountInfo extends React.Component {
  state = {
    jammer: '',
    editMode: READING
  };

  handleEdit = event => {
    event.preventDefault();
    this.setState ({
      editMode: EDITING
    })
  }

  handleClickSuccessError = event => {
    event.preventDefault();
    this.setState ({
      editMode: READING
    })
  }

  handleSubmit = async (event) => {
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const displayName = event.target.displayName.value;
    const imageUrl = event.target.imageUrl.value;
    try {
      const jammerRef = await db.collection('jammers').doc(`${this.state.jammer.email}`)
      await jammerRef.update({...this.state.jammer, firstName, lastName, displayName, imageUrl})
      const updatedJammer = await getCurrentUser()
      this.setState ({
        jammer: updatedJammer,
        editMode: UPDATE_SUCCESS
      })
    } catch (error) {
      console.log('account-information.js | error writing update to firebase:', error)
      this.setState ({
        editMode: UPDATE_ERROR
      })
    }
  }

  async componentDidMount(){
    const jammer = await getCurrentUser()
    this.setState({
      jammer: jammer
    })
  }

  renderEditForm = () => {
      switch (this.state.editMode) {
      case READING: {
        return  <AccountForm handleSubmit={this.handleEdit} user={this.state.jammer} />
      }
      case EDITING: {
        return <AccountFormEdit handleSubmit={this.handleSubmit} user={this.state.jammer} />
      }
      case UPDATE_SUCCESS: {
        return  <UpdateSuccessful handleClick={this.handleClickSuccessError} user={this.state.jammer} />
      }
      case UPDATE_ERROR: {
        return  <UpdateError handleClick={this.handleClickSuccessError} user={this.state.jammer} />
      }
      default: {
        return  <UpdateError user={this.state.jammer} />
      }
    }
  }


  render() {
    console.log('account-information.js | this.state', this.state)
    return (
      <Container>
        {this.renderEditForm()}
      </Container>
    )
  }
}
export default AccountInfo;
