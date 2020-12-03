import React from 'react';
import './Banner.css';
import {Col, Row, Container, Carousel} from 'react-bootstrap';

import PropTypes from 'prop-types';

import ads11 from '../../images/ads/ads11.jpg';
import ads12 from '../../images/ads/ads12.jpg';
import ads13 from '../../images/ads/ads13.jpg';
import ads14 from '../../images/ads/ads14.jpg';
import ads15 from '../../images/ads/ads15.jpg';
import ads16 from '../../images/ads/ads16.jpg';
import ads17 from '../../images/ads/ads17.jpg';
import ads18 from '../../images/ads/ads18.jpg';
import ads19 from '../../images/ads/ads19.jpg';

export default function Banner() {
  return (
    <Container fluid className="banner__container">
      <Row>
        <Col xs={12}>
          <Carousel>
            {[
              ads11,
              ads12,
              ads13,
              ads14,
              ads15,
              ads16,
              ads17,
              ads18,
              ads19,
            ].map((image, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="banner__img d-block w-100"
                    src={image}
                    alt="First slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

Banner.prototype = {
  productList: PropTypes.array,
  getProductListLoading: PropTypes.bool,
};
