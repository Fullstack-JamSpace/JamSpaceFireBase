import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import db from '../firebase'


export default class Channels extends Component {
  constructor () {
    super()
    this.state = {
      jammers : []
    }
  }

  // fetchJammers gets the full list of streamers (jammers!) in the firebase
  // database and returns an array of jammer objects, and tags those objects
  // with the id
  fetchJammers = async () => {
    const jammersList = []
    const tempList = await db.collection('jammers').get()
    await tempList.forEach(el => {
      jammersList.push({ ...el.data(), id: el.id })
    })
    return jammersList
  }

  async componentDidMount() {
    this.setState({
      jammers: await this.fetchJammers()
    })
  }

  render() {

    return (
      <React.Fragment>
      <div>Channels</div>
      {this.state.jammers ?
      <List>
        {this.state.jammers.map( el => (
          <List.Item as={Link} to={`/channels/${el.displayName}`} className='following-item' key={el.id}>{el.displayName}</List.Item>
        ))}
      </List>
      :
      <div>loading</div>}
      </React.Fragment>
    )
  }

}
