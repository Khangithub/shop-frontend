import React from 'react';
import {Row, Col} from 'react-bootstrap';

import './Footer.css';

export default function Index() {
  
  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <div className="footer__back__to__top__button" onClick={backToTop}>
        <p>Back to top</p>
      </div>

      <Row className="footer__info__container container-fluid">
        <Col xs={12} sm={6} md={3} className="footer__section">
          <h5>Get to Know Us</h5>
          <p>Careers</p>
          <p>Blog</p>
          <p>About Amazon</p>
          <p>Investor Relations</p>
          <p>Amazon Devices</p>
          <p>Amazon Tours</p>
        </Col>

        <Col xs={12} sm={6} md={3} className="footer__section">
          <h5>Sell productList on Amazon</h5>
          <p>Sell apps on Amazon</p>
          <p>Become an Affiliate</p>
          <p>Advertise Your Products</p>
          <p>Self-Publish with Us</p>
          <p>Host an Amazon Hub</p>
          <p>›See More Make Money with Us</p>
        </Col>

        <Col xs={12} sm={6} md={3} className="footer__section">
          <h5> Amazon Payment Products</h5>
          <p>Amazon Business Card</p>
          <p>Shop with Points</p>
          <p>Reload Your Balance</p>
          <p>Amazon Currency Converter</p>
        </Col>

        <Col xs={12} sm={6} md={3} className="footer__section">
          <h5>Let Us Help You</h5>
          <p>Amazon and COVID-19</p>
          <p>Your Account</p>
          <p>Your Orders</p>
          <p>Shipping Rates & Policies</p>
          <p>Returns & Replacements</p>
          <p>Manage Your Content and Devices</p>
          <p>Amazon Assistant</p>
          <p> Help</p>
        </Col>
      </Row>
    </>
  );
}
