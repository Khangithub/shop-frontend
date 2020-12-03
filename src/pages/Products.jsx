import React, {useContext} from 'react';
import './Products.css';
import {Row, Container, Spinner} from 'react-bootstrap';
import ProductCard from '../components/ProductCard/';
import {ProductListContext} from '../ContextProvider/ProductListContextProvider';
import NavBar from '../components/NavBar/';
import Footer from '../components/Footer/';
import CategoryList from '../components/Home/CategoryList';
import VideoAd from '../components/Products/VideoAd';
import Pagination from '../components/Pagination/Pagination';
import PropTypes from 'prop-types';

export default function Products(match) {
  const {productList, getProductListLoading} = useContext(ProductListContext);
  const {index} = match.match.params;
  const pivot = 12;
  const start = (parseInt(index) - 1) * pivot;
  const end = parseInt(index) * pivot;

  const getSlicedProductList = (productList) => {
    return Object.values(productList)
    .slice(start, end);
  };
  return getProductListLoading ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <div className="productList">
      <NavBar />
      <VideoAd />
      <CategoryList />
      <Container className="products__paginated__list">
        <Pagination
          index={parseInt(index)}
          to="/productList"
          total={Math.ceil(productList.length / pivot)}
        />
        <Row>
          {getSlicedProductList(productList).map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

Products.prototype = {
  productList: PropTypes.array,
  getProductListLoading: PropTypes.bool,
};
