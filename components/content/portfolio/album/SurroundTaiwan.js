import React, { Component } from 'react';
import GetPhotoset from 'content/portfolio/GetPhotoset';

class SurroundTaiwan extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }
  componentDidMount() {
  }
  shouldComponentUpdate() {
    return true;
  }
  componentWillUpdate() { }
  componentWillUnmount() { }


  render() {
    return (
      <GetPhotoset photosetId="72157678188677763" />
    );
  }
}

export default SurroundTaiwan;

