import React, {Component } from 'react';
import {Button, Card,Image } from 'semantic-ui-react';
import Layout from './layout';

//import shipments from '../../../ethereum/shipments';
//import web3 from '../../../ethereum/web3';

class Messages extends Component{
   
    renderMessages(){
        
        return (
            <Card>
                <Card.Content>
                    <Card.Header>Product Name</Card.Header>
                    <Card.Meta>Seller</Card.Meta>
                    <Card.Description>
                        Buyer : <strong>xxxxxxxxxxxxxxxxxx</strong> interested in your item to be sold  
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                        Accept
                        </Button>
                        <Button basic color='red'>
                        Reject
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
    
    render(){
        return(
            <Card.Group>
                {this.renderMessages()}
            </Card.Group>
        );
    }
    
}

export default Messages;
