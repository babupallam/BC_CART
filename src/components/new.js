import React, {Component } from 'react';
import {Form, Button, Input, Grid,Segment,Divider, Checkbox, Loader, Message, Flag } from 'semantic-ui-react';
const contract = require('truffle-contract')

import ShippingContract from '../../build/contracts/Shipments.json'
import getWeb3 from '../utils/getWeb3'

import { Redirect} from 'react-router-dom'

class PlaceNew extends Component{
    state = {
        price :'',
        quantity:'',
        name:'',
        Error:'',
        loading:'',
        flag:false
    };
    constructor(props) {
        super(props)

        this.state = {
            web3: null,
            consignments: [],
            loaded:false
        }
        getWeb3
        .then(results => {
            this.setState({
            web3: results.web3,
            })
        })
        .catch(() => {
            console.log('Error finding web3.')
        })
    }
    
    onSubmit= async (event)=>{
        event.preventDefault();
        this.setState({loading:true});
        try{

            const shipment = contract(ShippingContract)
            shipment.setProvider(this.state.web3.currentProvider)

            var ShippingInstance;

            this.state.web3.eth.getAccounts((error, accounts) => {
                //console.log(accounts)
                shipment.deployed().then((instance) => {
                    ShippingInstance = instance 
                    return ShippingInstance.createConsignment(this.state.name,parseInt(this.state.price),parseInt(this.state.quantity),{from:accounts[1],gas:4500000});
                }).then((results) => {
                    console.log(results);
                    alert('Your product has been placed')
                    this.setState({flag:true});
                })
            })
        }catch(err){
            this.setState({Error: err.message});
        }
        this.setState({loading: false});
          
    };
    render(){
        if(this.state.flag){
            return (<Redirect to="./"/>)
        }
        return(
        
            <Grid textAlign='center' style={{ height: '100%' }} >
                <Grid.Column style={{ maxWidth: 800 }}>
                    <Segment color="red" padded="very" >
                        <div style={{ marginTop: '20px'}}></div>
                        <Button floated='left'>Add your product</Button>
                        <Divider clearing/>
                     
                            <Form onSubmit={ this.onSubmit } error={this.state.Error}>
                                <Form.Field>
                                    <label>- name of the product -</label>
                                    <Input 
                                        placeholder="Name of the product"
                                        value={this.state.name}
                                        onChange={event =>this.setState({name:event.target.value})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>- price -</label>
                                    <Input 
                                        label="wei" 
                                        labelPosition="right" 
                                        placeholder="Price of the product"
                                        value={this.state.price}
                                        onChange={event =>this.setState({price:event.target.value})}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>- quantity -</label>
                                    <Input 
                                        placeholder="Quantity"
                                        value={this.state.quantity}
                                        onChange={event =>this.setState({quantity:event.target.value})}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox label='I agree to the Terms and Conditions'/>
                                </Form.Field>                        
                                <Message error header="Oops!" content={this.state.Error}/>
                                <Message error header="Oops!" content={this.state.name}/>
                                <Message error header="Oops!" content={this.state.price}/>
                                <Message error header="Oops!" content={this.state.quantity}/>
                                <div>
                                    <Button type="submit" loading={this.state.loading} positive size="huge" content="Create"/>
                                </div>
                            </Form>                        
                    
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default PlaceNew;
