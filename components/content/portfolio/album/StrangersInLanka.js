import React, { Component } from 'react';
import GetPhotoset from 'content/portfolio/GetPhotoset';

class StrangersInLanka extends Component {
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
      <GetPhotoset photosetId="72157672651198134" />
    );
  }
}

export default StrangersInLanka;

