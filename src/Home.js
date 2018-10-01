import React, { Component } from 'react'
import ShippingContract from '../build/contracts/Shipments.json'
import getWeb3 from './utils/getWeb3'
import { Card, Button,Segment, Container } from 'semantic-ui-react'
import Layout from './components/layout';
import {NavLink} from 'react-router-dom'

class CartIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      consignments: [],
      loaded:false
    }
    this.componentWillMount();
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
      })
      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {

    const contract = require('truffle-contract')
    const shipment = contract(ShippingContract)
    shipment.setProvider(this.state.web3.currentProvider)

    var ShippingInstance;

    this.state.web3.eth.getAccounts((error, accounts) => {
      shipment.deployed().then((instance) => {
        ShippingInstance = instance
        return ShippingInstance.getDeployedConsignments.call(accounts[0]);
      }).then((results) => {
        this.setState({consignments:results});
      })
    })
  }

  renderConsignments(){
    console.log(this.state.consignments)
    const workingconsign = this.state.consignments;
    const result = Object.keys(workingconsign).map(function(key) {
      return (workingconsign[key]);
    });
    const items = result.map(address =>{
            return(
                <Card>
                    <Card.Content>
                        <Card.Header>Product Name</Card.Header>
                        <Card.Meta >Address : {String(address).substr(0,20)+" . . . ."}</Card.Meta>
                        <Card.Meta>Seller pub address:{}</Card.Meta>
                        <Card.Meta>Quantity:{}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='violet'>
                            Buy
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            )
            fluid: true
    });
    return <Card.Group > {items} </Card.Group>;
  }
  render() {
/*    const numbers = [1, 2, 3, 4, 5];
    const items=numbers.map(abc=>{
      return(<h1>abc</h1>)
    });
  */
    return( 
      <Layout>
          <div>
              <h3>Smart Shopping.. Better living..</h3>
              <Segment inverted></Segment>
              <h3>Recently added products</h3>
                <NavLink to="./manage"><Button 
                  floated='right'
                  icon="add circle"
                  content="Submit new Ad"
                  primary
                  size="big"
                /></NavLink>
            </div>
          <Container textAlign="center">
              <Card.Group>
                {this.renderConsignments()}
              </Card.Group>                    
          </Container>
      </Layout>
    );
  }
}

export default CartIndex;
