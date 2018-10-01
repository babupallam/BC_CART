import React, {Component } from 'react';
import {Label, Menu, Tab } from 'semantic-ui-react';
import Layout from './components/layout';
import PlaceNew from './components/new'
import Messages from './components/messages'


const tabs = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Place new product' },
      render: () => 
        <Tab.Pane>
           <PlaceNew/>
        </Tab.Pane>
      ,
    },
    {
      menuItem: (
        <Menu.Item key='messages'>Messages
          <Label>BC</Label>
        </Menu.Item>
      ),
      render: () => 
        <Tab.Pane>
            <Messages/>
        </Tab.Pane>
      ,
    },
  ];
class Management extends Component{
         
    render(){
        return(
          
            <Layout>
                <Tab panes={tabs} />        
            </Layout>
        );
    }
}

export default Management;
