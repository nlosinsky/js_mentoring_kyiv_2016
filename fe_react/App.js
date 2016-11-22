import React, { Component } from 'react';
import { Header } from './partials/Header';

const styles = {
  position: 'relative',
  fontFamily: 'Roboto, sans-serif'
};

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={styles}>
          {this.props.children}
        </div>
      </div>
    );
  }
}



