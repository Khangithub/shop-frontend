import React from 'react';
import {Col, Row} from 'react-bootstrap';
import './VideoAd.css';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import ad from '../../images/ads2/ad.mp4';

export default function VideoAd() {
  return (
    <div className="video__ad__container">
      <Row>
        <Col xs={12}>
          <ReactPlayer
            className="video__ad"
            url={[
              {src: ad, type: 'video/webm'},
              {src: ad, type: 'video/ogg'},
            ]}
            controls
            playing
            loop
          />
        </Col>
      </Row>
    </div>
  );
}

VideoAd.prototype = {
  productList: PropTypes.array,
  getProductListLoading: PropTypes.bool,
};
