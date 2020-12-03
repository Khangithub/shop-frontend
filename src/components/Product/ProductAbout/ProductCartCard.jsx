import React, {useState, useContext} from 'react';
import {Col, Row, Image} from 'react-bootstrap';
import lockIcon from '../../../images/common/lock.png';
import locationIcon from '../../../images/common/location.png';
import {OrderContext} from '../../../ContextProvider/OrderContextProvider';
import selectedSound from '../../../assets/sounds/selected.mp3';

function ProductCartCard({product}) {
  let [quantity, setQuantity] = useState(1);
  let audio = new Audio(selectedSound);
  
  const {createOrder} = useContext(OrderContext);

  const getNetPrice = (product) => {
    if (product.discount) {
      let price = product.price - (product.discount * product.price) / 100;
      return price.toFixed(3);
    }

    return product.price;
  };

  return (
    <Col sm={12} md={4} className="product__cart__card">
      <div className="product__cart__card__container">
        <Row className="product__cart__card__price">
          <span>${getNetPrice(product)}</span>
          <p>+ FREE Shipping & Import Fees Deposit to Vietnam</p>
        </Row>

        <Row className="product__cart__card__arrival__time">
          <span>Arrives:</span>
          <span>Nov 25 - Dec 18</span>
        </Row>

        <Row className="product__cart__card__instock">
          <p>In Stock</p>
        </Row>

        <Row className="product__cart__card__quantity">
          <span>Qty:</span>
          <span>
            <input
              type="number"
              className="product__cart__card__quantity__input"
              min={1}
              placeholder={`   ${quantity}`}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </span>
        </Row>

        <Row className="product__cart__card__add_to_cart__button">
          <button
            onClick={() => {
              audio.play();
              createOrder(product, quantity);
            }}
          >
            Add to card
          </button>
        </Row>

        <Row className="product__cart__card__transaction divider">
          <Image src={lockIcon} alt="lock icon" />
          <p>Secure transaction</p>
          <table>
            <tr>
              <td>Ships from </td>
              <td>Amazon.com</td>
            </tr>
            <tr>
              <td>Sold by </td>
              <td>Amazon.com</td>
            </tr>
            <tr>
              <td>Packaging </td>
              <td>Shows what’s inside. T…</td>
            </tr>
          </table>
        </Row>

        <Row className="product__cart__card__detail divider">
          <p>Details</p>
          <div>
            <input type="checkbox" />
            <label for="vehicle1"> Add gift options</label>
          </div>
        </Row>

        <Row className="product__cart__card__location">
          <Image src={locationIcon} alt="location icon" />
          <p>Deliver to Vietnam</p>
          <button>Add to List</button>
        </Row>
      </div>
    </Col>
  );
}

export default ProductCartCard;
