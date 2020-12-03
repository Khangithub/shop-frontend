import React from 'react';
import {Col, Image} from 'react-bootstrap';
import shippingIcon from '../../../images/common/shipping.jpg';
import {useHistory} from "react-router-dom";

function SigninCard() {
  const history = useHistory();
  
  return (
    <Col sm={12} md={4} className="product__signin">
      <div>
        <h5>Sign in for the best experience</h5>
        <button onClick={() => history.push("/login")}>Sign in securely</button>
      </div>

      <div className="shipping__image">
        <Image
          src={shippingIcon}
          alt="shipping-icon"
          className="category__image"
        />
      </div>
    </Col>
  );
}

export default SigninCard;
