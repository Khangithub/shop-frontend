import React, {useState} from 'react';
import {Col, Row, Badge} from 'react-bootstrap';
import {getRandomInRange, disappearWhen} from '../../../helpers';

function ProductInfo({product}) {
  const rating = getRandomInRange(1, 5);
  const soldQuantity = getRandomInRange(1, 1000);
  let [seeMoreText, setSeeMore] = useState(true);

  const getNetPrice = (product) => {
    if (product.discount) {
      let price = product.price - (product.discount * product.price) / 100;
      return price.toFixed(3);
    }

    return product.price;
  };

  const truncatDescription = (description) => {
    let copiedDescription = ''.concat(description);
    let firstPart = copiedDescription.slice(0, 500);
    let text = seeMoreText ? firstPart : copiedDescription;
    let spanName = seeMoreText ? 'see more' : 'see less';

    return (
      <div>
        <span>{text}</span>
        <span onClick={() => setSeeMore(!seeMoreText)}>
          <strong style={{color: 'gray'}}>
            &nbsp;&nbsp;...&nbsp;{spanName}
          </strong>
        </span>
      </div>
    );
  };

  return (
    <Col sm={12} md={4} className="product__info__container">
      {/* <Row>
            <EditProductButton product={product} />

            <DeleteProductButton product={product} />
          </Row> */}
      <Row className="product__info">
        <h1>{product.name}</h1>
      </Row>

      {/* {manufacturer} */}
      <Row className="product__info">
        <p className="product__info__manufacturer">
          Visit the {product.manufacturer} Store
        </p>
      </Row>

      <Row className="product__info divider">
        {Array(rating)
          .fill()
          .map((_, index) => (
            <span role="img" key={index} aria-label="">
              ⭐
            </span>
          ))}
        <span className="product__info__manufacturer">
          &nbsp;sold {soldQuantity} | 189 answered questions
        </span>
      </Row>

      {/* {hien thi gia} */}
      <Row className="product__info product__by__id__price divider">
        <span>Price: </span>
        <span>${getNetPrice(product)}</span>
        <Badge
          variant="danger"
          style={disappearWhen(!product.discount)}
          className="product__by__id__discount"
        >
          -{product.discount}%
        </Badge>
        <span>+ FREE Shipping & Import Fees Deposit to Vietnam</span>
      </Row>

      {/* {product description} */}
      <Row className="product__info product__info__description">
        <h3>About this item</h3>
        {truncatDescription(product.description)}
      </Row>
    </Col>
  );
}

export default ProductInfo;
