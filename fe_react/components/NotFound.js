import React, { Component } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export class NotFound extends Component {
  render() {
    const styles = {
      padding: '0 15px'
    };

    return(
      <div>
        <h1>Page not found!</h1>
        <RaisedButton style={styles} containerElement={<Link to="/"/>}>Go to Homepage</RaisedButton>
      </div>
    )
  }
}