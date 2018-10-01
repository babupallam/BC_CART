import React from 'react';
import {Menu, Header,Dropdown } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom'
import user from '../User'
import Maintenance from '../Maintenance'
export default () =>{
    return(
        <Menu style={{marginTop: '20px'}}>
            <Menu.Item>
                <Header as='h3' block >
                    <img src='static/logo.png' role="presentation" />
                    BC-cart        
                </Header>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="./">Home</NavLink>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Dropdown text="Manage Shopping" pointing >
                        <Dropdown.Menu>
                            <Dropdown.Item><NavLink to="Maintenance">Orders</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink to="user">Messages</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink to="Maintenance">Feedback</NavLink></Dropdown.Item>
                            <Dropdown.Item><NavLink to="Maintenance">Logout</NavLink></Dropdown.Item> 
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>         
                
            </Menu.Menu>
        </Menu>
    );
};