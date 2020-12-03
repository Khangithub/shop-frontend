import React from 'react';
import {useHistory} from 'react-router-dom';
import {Row, Col, Badge, Image} from 'react-bootstrap';
import './ProductCard.css';
import {getRandomInRange, returnPrice} from '../../helpers';
import PropTypes from 'prop-types';
import EditProductButton from './EditProductButton';
import DeleteProductButton from './DeleteProductButton';

export default function ProductCard({product, canEdit, canDelete}) {
  const history = useHistory();
  const rating = getRandomInRange(1, 5);
  const soldProgress = getRandomInRange(1, 100);
  const soldQuantity = getRandomInRange(1, 1000);

  return (
    <Col xs={6} sm={4} md={3} lg={2} className="product__card">
      <div className="product__card__button__list">
        {canEdit && <EditProductButton product={product} />}
        {canDelete && <DeleteProductButton product={product} />}
      </div>
      <div
        className="product__card__container"
        onClick={() => {
          history.push(`/${product._id}`);
        }}
      >
        <Image
          src={product.productImage}
          alt="productImage"
          className="product__card__img"
        />

        <Row>
          <Col className="product__card__name">
            <p>{product.name}</p>
          </Col>
        </Row>

        <Row>
          <Col className="product__card__price">
            <Row
              className={
                product.discount
                  ? 'product__card__net__price'
                  : 'product__card__net__price__hide'
              }
            >
              <span>{returnPrice(product)}$ &nbsp;&nbsp;</span>
              <Badge variant="danger" className="product__card__discount">
                -{product.discount}%
              </Badge>
            </Row>
            <p
              className={
                product.discount
                  ? 'product__card__gross__price__remove'
                  : 'product__card__gross__price'
              }
            >
              {product.price}$
            </p>
          </Col>
        </Row>

        <Row>
          <Col className="product__card__rating">
            {Array(rating)
              .fill()
              .map((_, index) => (
                <span role="img" key={index} aria-label="">
                  ⭐
                </span>
              ))}
          </Col>
        </Row>

        <Row>
          <Col xs={11} className="product__card__sold__progress">
            <progress value={soldProgress} max="100" />
          </Col>
          <Col xs={12} className="product__card__sold__quantity">
            <small>{`sold ${Math.round(
              (soldQuantity * soldProgress) / 100
            )}/${soldQuantity}`}</small>
          </Col>
        </Row>
      </div>
    </Col>
  );
}

ProductCard.prototype = {
  product: PropTypes.shape({
    productImage: PropTypes.string,
    discount: PropTypes.number,
    price: PropTypes.number,
    name: PropTypes.string,
  }),
};
