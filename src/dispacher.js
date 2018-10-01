import React,{Component} from 'react';
import { Divider, Segment,Button, Card,Image } from 'semantic-ui-react'
import Layout from './components/layout';

//component base class extend with our class
class CartIndex extends Component {
    renderRequests(){
        
        return (
            <Card>
                <Card.Content>
                    <Card.Header>Product Name</Card.Header>
                    <Card.Description>
                        Seller : <strong>xxxxxxxxxxxxxxxxxx</strong>
                    </Card.Description>
                    <Card.Description>
                        Buyer : <strong>xxxxxxxxxxxxxxxxxx</strong>  
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                        Send transportation fee
                        </Button>
                        <Button basic color='red'>
                        Send Delivery Receipt
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
    
    render(){
        return( 
            <Layout>
                <div>
                    <Segment color="red" padded="very" >
                        <div style={{ marginTop: '20px'}}></div>
                        <Button floated='left'>Dispatching unit</Button>
                        <Divider clearing/>
                        <Card.Group>
                            {//this.renderRequests()}
                            }
                        </Card.Group>
                    </Segment>
                </div>
            </Layout>
        );
    }
}

export default CartIndex;