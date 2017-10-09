import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
/** Type Check */
import PropTypes from 'prop-types';

import * as F_API from 'F_API';

const originPhotoIdx = 8;
const thumPhotoIdx = 4;

class GetPhotoset extends Component {
  constructor(props) {
    super(props);

    this.PHOTO_SET = [];

    this.handleServerPhotoset = this.handleServerPhotoset.bind(this);
    this.handleServerPhotoSize = this.handleServerPhotoSize.bind(this);

    this.state = {
      dataReady: false,
      data: [],
      photosetId: this.props.photosetId,
    };
  }

  componentWillMount() {
    this.handleServerPhotoset();
  }
  componentDidMount() {
  }
  shouldComponentUpdate() {
    return true;
  }
  componentWillUpdate() { }
  componentWillUnmount() { }


  handleServerPhotoSize(x) {
    fetch(
      `${F_API.URL}=flickr.photos.getSizes&api_key=${F_API.APIKEY}&photo_id=${x.id}&format=json&nojsoncallback=1`, {
        method: 'GET',
        headers: {},
        mode: 'cors',
      })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        this.PHOTO_SET.push(
          {
            src: data.sizes.size[originPhotoIdx].source,
            width: parseInt(data.sizes.size[originPhotoIdx].width, 10),
            height: parseInt(data.sizes.size[originPhotoIdx].height, 10),
            srcset: [
              `${data.sizes.size[originPhotoIdx].source} 1440w`,
              `${data.sizes.size[thumPhotoIdx].source} 720w`,
            ],
            sizes: [
              '(min-width: 720px) 50vw',
              '(min-width: 1440px) 33.3vw',
              '100vw',
            ],
          },
        );
        this.setState({ dataReady: true });
      })
      .catch(() => {
        this.setState({ dataReady: false });
      });
  }

  handleServerPhotoset() {
    fetch(
      `${F_API.URL}=flickr.photosets.getPhotos&api_key=${F_API.APIKEY}&photoset_id=${this.state.photosetId}&user_id=${F_API.UserID}&format=json&nojsoncallback=1`, {
        method: 'GET',
        headers: {},
        mode: 'cors',
      })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        data.photoset.photo.forEach((x) => {
          this.handleServerPhotoSize(x);
        });
        this.setState({ data });
      })
      .catch(() => {
        this.setState({ dataReady: false });
      });
  }


  render() {
    if (this.state.dataReady === false) {
      return (
        <div className="homeTitle">
          <h1>Data Fetching...</h1>
        </div>);
    }

    return (
      <div className="portfolioTitle">
        <h1>{this.state.data.photoset.title}</h1>
        <Gallery photos={this.PHOTO_SET} />
      </div>
    );
  }
}

GetPhotoset.propTypes = {
  photosetId: PropTypes.string.isRequired,
};

GetPhotoset.defaultProps = {

};

export default GetPhotoset;

