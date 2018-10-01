import React, { Component } from 'react'
import { Segment, Divider, Container } from 'semantic-ui-react'
import Layout from './components/layout';

class Error extends Component {

  render(){
    return(
        <Segment inverted textAlign='center' as="h2">
          <h1>404 Error</h1>
        </Segment>
    )
  }
}

export default Error;
