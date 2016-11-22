import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';


export class Header extends Component{
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title="Air Tickets Locator"
          onTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem containerElement={<Link to="/"/>} onTouchTap={this.handleClose}>Home</MenuItem>
          <Divider />
          <MenuItem containerElement={<Link to="/sign-in"/>} onTouchTap={this.handleClose}>Sign In</MenuItem>
        </Drawer>

        {this.props.children}
      </div>
    );
  }
}