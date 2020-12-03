import React, {useContext} from 'react';
import './Orders.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import {OrderContext} from '../ContextProvider/OrderContextProvider';
import OrderCard from '../components/OrderCard/';
import {Image, Spinner, Row, Col} from 'react-bootstrap';
import {returnTotalPrice} from '../helpers';
import orderAd from '../images/common/order-ad.jpg';
import PropTypes from 'prop-types';

export default function Order() {
  const {cart, getCartLoading} = useContext(OrderContext);

  return getCartLoading ? (
    <Spinner variant="danger" animation="grow" />
  ) : (
    <div className="order">
      <NavBar />
      <Row className="order__list__container">
        <Col sm={12} md={9} className="order__card__list">
          <div className="order__ad__image">
            <Image src={orderAd} alt="orderAd" />
            <h1>Your shopping cart</h1>
          </div>

          {cart
            .map((order, index) => {
              return <OrderCard order={order} key={index} forBuyer/>;
            })
            .reverse()}
        </Col>

        <Col sm={12} md={3} className="order__checkout">
          <div className="order__checkout__total__price">
            <span>Subtotals {cart?.length} items:</span>
            <span>${returnTotalPrice(cart)}</span>
          </div>
          <div className="order__checkout__gift__checkbox">
            <input type="checkbox" />
            <label for="gift"> This order contains a gift</label>
          </div>
          <button>Proceed to Checkout</button>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

Order.prototype = {
  cart: PropTypes.array,
  getCartLoading: PropTypes.bool,
};
