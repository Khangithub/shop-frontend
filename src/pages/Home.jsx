import React, {useContext} from 'react';
import NavBar from '../components/NavBar/';
import {Container, Spinner, Row} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import ProductCard from '../components/ProductCard/';
import {ProductListContext} from '../ContextProvider/ProductListContextProvider'; // luoon luoon phair cos dau {} khi import context api
import Banner from '../components/Home/Banner';
import Footer from '../components/Footer/';
import CategoryList from '../components/Home/CategoryList';
import './Home.css';
import PropTypes from 'prop-types';

function Home() {
  const {productList, getProductListLoading} = useContext(ProductListContext);
  let randomly = Math.floor(Math.random() * Object.values(productList).length);

  const getRandomProductList = (productList, randomly) => {
    const firstPart = Object.values(productList).splice(randomly, 12); // get random 12 productList from a random position

    if (firstPart.length < 12) {
      // if the length of firstPart < 12 then add a later part to get enough 12 productList
      const laterPartLength = 12 - firstPart.length;
      const laterPart = Object.values(productList).splice(
        randomly - laterPartLength,
        laterPartLength
      );

      return [...laterPart, ...firstPart];
    }

    // if length of firstPart === 12 then render it out
    return firstPart;
  };

  return getProductListLoading ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <div className="home">
      <NavBar />
      <Banner />
      <CategoryList />
      <Container className="container-fluid home__random__product__list">
        <Row>
          {getRandomProductList(productList, randomly).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

Home.prototype = {
  productList: PropTypes.object,
  getProductListLoading: PropTypes.bool,
};
export default withRouter(Home);
