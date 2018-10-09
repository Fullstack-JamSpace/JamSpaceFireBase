import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { categoryTranslator } from '../utils'
import db from '../firebase'


export default class SingleCategory extends Component {
  constructor () {
    super()
    this.state = {
      jammers: []
    }
  }

  // fetchJammers gets the full list of streamers (jammers!) in the firebase
  // database and returns an array of jammer objects, and tags those objects
  // with the id
  fetchJammers = async () => {
    const preCategory = this.props.match.params.category;
    const category = categoryTranslator(preCategory);
    const tempList = await db.collection('jammers').where('streamCategory', '==', `${category}`).get()

    await tempList.forEach(el => {
      console.log('ELE: ', el.data());
      this.setState( {jammers: [...this.state.jammers, el.data()]} )
    })
    console.log('STATE CHECK 1: ', tempList)
  }

  async componentDidMount() {
    await this.fetchJammers()
    // console.log('STATE CHECK: ', this.state)

  }

  render() {
    // const allJammers = this.state.jammers;
    // const liveJammers = allJammers.filter(jammer => jammer.isStreaming);

    return (
      <div></div>
    )
  }

}
