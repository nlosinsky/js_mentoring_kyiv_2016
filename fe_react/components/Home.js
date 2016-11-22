import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
  render() {
    let username = this.props.user.name;
    let greeting = `Hello, ${username || 'anonym'}`;

    return(
      <div>
        <h1>{greeting}</h1>
        {!username &&
          <RaisedButton containerElement={<Link to="/sign-in"/>}>Sign In</RaisedButton>
        }
      </div>
    )
  }
}

export default connect(
  (state) => ({user: state.user})
)(Home)