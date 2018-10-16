import React, { Component } from 'react';
import { Form, } from 'semantic-ui-react';
import '../css/stream.css'
import { getStreamer } from '../utils';
import db from '../firebase';

export default class StreamTitleCat extends Component {
  constructor(){
    super()
    this.state = {
      streamTitle: '',
      streamCategory: '',
      streamer: {},
      activeButton: ''
    }
  }

  async componentDidMount(){
    const displayName = this.props.displayName;
    const streamer = await getStreamer(displayName);
    this.setState({ streamer });
  }

  handleChange = async (e, { name, value }) => {
    await this.setState({ [name]: value, upToDate: false })
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    const { streamTitle, streamCategory, streamer } = this.state
    try {
      const streamerRef = await db.collection('jammers').doc(`${streamer.email}`);
      await streamerRef.update({...streamer, streamTitle, streamCategory})
      this.setState( { upToDate: true })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { isStreamer } = this.props;
    const { streamTitle, streamCategory, streamer, upToDate } = this.state
    const options = [
      {key: 1, text: 'Single Performer', value: 'Single Performer'},
      {key: 2, text: 'Band', value: 'Band'},
      {key: 3, text: 'Production', value: 'Production'},
      {key: 4, text: 'Lessons', value: 'Lessons'}
    ]

    return (
      isStreamer ?
      <div className='flex stream-footer'>
        <img className='streamer-thumb' src={streamer.imageUrl} alt=''/>
        <Form id='title-category-form' onSubmit={this.handleSubmit} autoComplete='off'>
          <Form.Group>
            <Form.Input id='title-input' placeholder='Stream Title' name='streamTitle' value={streamTitle} onChange={this.handleChange} />
            <Form.Dropdown
              id='category-dropdown'
              placeholder='Stream Category'
              name='streamCategory'
              value={streamCategory}
              onChange={this.handleChange}
              options={options}
            />
            { upToDate ?
                <Form.Button positive id='update-btn' content='Updated!' />
              : <Form.Button id='update-btn' content='Update' />
            }
          </Form.Group>
        </Form>
      </div>
      : streamer.streamTitle && streamer.streamCategory ?
      <div className='flex stream-footer-viewer'>
        <img className='streamer-thumb' src={streamer.imageUrl} alt=''/>
        <div className='flex column'>
          <h1 className='footer-name'> {streamer.displayName}</h1>
          <h3 className='stream-title'>{streamer.streamTitle}</h3>
        </div>
        <p className='stream-category'>({streamer.streamCategory})</p>
      </div>
        : null
    )
  }
}
