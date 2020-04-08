import React, { Component } from 'react';

export default class AnimatedTextCounter {
    
  state = { pleaseDisplayMe: 0 };

  componentDidMount() {
    setInterval(() => {
      this.setState({ pleaseDisplayMe: this.state.pleaseDisplayMe + 1 });
    }, 1000);
  }

  render() {
    return <Text>{this.state.pleaseDisplayMe}</Text>;
  }
}
