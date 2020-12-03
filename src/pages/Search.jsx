import React, {useContext, useState} from 'react';
import NavBar from '../components/NavBar';
import {Row, Form, Spinner} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {ProductListContext} from '../ContextProvider/ProductListContextProvider';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer/';
import {removeAscent, sortAccordType} from '../helpers';
import './Search.css';

function Search({history}) {
  let {search} = history.location;
  let [sortType, setSortType] = useState('priceDesc');
  const {productList, getProductListLoading} = useContext(ProductListContext);

  let keyword = search.split('=')[1].replace(/\+/g, ' ').replace(/%20/g, ' ');

  const results = Object.values(productList).filter((product) => {
    return (
      removeAscent(product.name).toLowerCase().match(keyword) ||
      removeAscent(product.saler.username).toLowerCase().match(keyword)
    );
  });

  return getProductListLoading ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <div className="search">
      <NavBar />
      <div className="container search__overview__container">
        <div className="search__results__quantity">
          <span>{`${results.length} results for keyword `} </span>
          <span>"{keyword}"</span>
        </div>

        <Form.Group>
          <Form.Control
            as="select"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="" defaultValue>
              No Order
            </option>
            <option value="priceDesc">Price ⬆ </option>
            <option value="priceAsce">Price ⬇ </option>
          </Form.Control>
        </Form.Group>
      </div>

      <Row className="search__product__list__container">
        {sortAccordType(sortType, results).map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}
      </Row>

      <Footer />
    </div>
  );
}

export default withRouter(Search);
