import React, { Component } from 'react';
import { View, Text } from 'react-native';

class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
        test: '321'
    };
  }

  render() {
    return (
        this.state.test
    );
  }
}

export default test;
