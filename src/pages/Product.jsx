import React, {useState, useEffect, useContext} from 'react';
import {Container, Row, Spinner} from 'react-bootstrap';
import './Product.css';
import NavBar from '../components/NavBar';
import {ProductListContext} from '../ContextProvider/ProductListContextProvider';
import {CurrentUserContext} from '../ContextProvider/CurrentUserContextProvider';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard/';
import ProductAbout from '../components/Product/ProductAbout';
import AddMainCommentForm from '../components/Product/AddMainCommentForm/';
import ProductCommentList from '../components/Product/ProductCommentList/';

import {useRouteMatch} from 'react-router-dom';

export default function Product() {
  const match = useRouteMatch();
  const {productId} = match.params;
  const {currentUser} = useContext(CurrentUserContext);
  let [product, setProduct] = useState({});
  let [productCommentList, setProductCommentList] = useState([]);
  let [getProductLoading, setProductListLoading] = useState(true);

  let {productList, getProductListLoading} = useContext(ProductListContext);

  useEffect(() => {
    const fetchProduct = async (productId) => {
      try {
        const productResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/products/' + productId
        );

        const productJson = await productResponse.json();

        setProductListLoading(false);
        setProduct(productJson);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct(productId);
  }, [productId]);

  const getSameCategoryProducts = (productList, product) => {
    return productList
      .filter((productListItem) => {
        return productListItem.category === product.category;
      })
      .map((product, index) => {
        return <ProductCard key={index} product={product} />;
      })
      .splice(0, 6);
  };

  return getProductListLoading || getProductLoading ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <div className="product">
      <NavBar />
      <ProductAbout product={product} />
      <Container>
        <p className="section__title">productList of the same category</p>
        <Row>{getSameCategoryProducts(productList, product)}</Row>
      </Container>

      <Container>
        <p className="section__title">comments about this product</p>
        {currentUser && (
          <AddMainCommentForm
            productId={productId}
            setProductCommentList={setProductCommentList}
          />
        )}
        <ProductCommentList
          productId={productId}
          productCommentList={productCommentList}
          setProductCommentList={setProductCommentList}
        />
      </Container>

      <Footer />
    </div>
  );
}
