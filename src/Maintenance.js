import React, { Component } from 'react'
import { Segment, Divider, Container } from 'semantic-ui-react'
import Layout from './components/layout';

class Error extends Component {

  render(){
    return(
        <Segment inverted textAlign='center' as="h2">
          <Layout >
            <Segment inverted >
              <Divider inverted />
              <Divider horizontal inverted>
                Site is under Maintenance
              </Divider>
            </Segment>
          </Layout>
        </Segment>
    )
  }
}

export default Error;
