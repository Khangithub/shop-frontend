import React from 'react';
import {Col, Image} from 'react-bootstrap';

function ProductImg({product}) {
  return (
    <Col sm={12} md={4} className="product__product__img">
      <Image src={product.productImage} alt="productImage" />
    </Col>
  );
}

export default ProductImg;
