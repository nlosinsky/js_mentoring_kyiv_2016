import React, { Component } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export class ForgotPassword extends Component {
  render() {
    return(
      <div>
        <h1>Forgot password</h1>
        <RaisedButton containerElement={<Link to="/"/>}>Home</RaisedButton>
      </div>
    )
  }
}