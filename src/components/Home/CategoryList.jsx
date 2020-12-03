import React from 'react';
import './CategoryList.css';

import bookIcon from '../../images/common/book.jpg';
import phoneIcon from '../../images/common/phone.jpg';
import foodIcon from '../../images/common/food.jpg';
import shippingIcon from '../../images/common/shipping.jpg';
import {useHistory} from 'react-router-dom';
import {Container, Row, Col, Image} from 'react-bootstrap';

function CategoryList() {
  const history = useHistory();

  return (
    <div className="category">
      <Container className="container-fluid">
        <Row className="category__card__list">
          {[
            {name: 'book', icon: bookIcon},
            {name: 'technology', icon: phoneIcon},
            {name: 'food', icon: foodIcon},
          ].map((category, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={3}
              onClick={() => history.push(`/productList/${category.name}/1`)}
            >
              <div className="category__card__container">
                <h4 className="category__card__name">{category.name}</h4>
                <Image
                  src={category.icon}
                  alt="icon"
                  className="category__card__image"
                />
                <small className="category__card__link">See more</small>
              </div>
            </Col>
          ))}
          <Col xs={12} sm={6} md={3}>
            <div className="signin__container">
              <div className="signin__container__signin__button">
                <h5>Sign in for the best experience</h5>
                <button onClick={() => history.push('/login')}>
                  Sign in securely
                </button>
              </div>

              <div className="shipping__image">
                <Image
                  src={shippingIcon}
                  alt="shipping-icon"
                  className="category__image"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CategoryList;
