import React, {useContext} from 'react';
import ProductCard from '../components/ProductCard/';
import {CurrentUserContext} from '../ContextProvider/CurrentUserContextProvider';
import {ProductListContext} from '../ContextProvider/ProductListContextProvider';
import {useHistory} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import {Spinner, Row, Image} from 'react-bootstrap';
import './YourProducts.css';

export default function YourProducts() {
  const {getProductListLoading, yourProductList} = useContext(
    ProductListContext
  );
  const {currentUser, getCurrentUserLoading} = useContext(CurrentUserContext);
  const history = useHistory();

  if (!currentUser || currentUser.role === 'client') {
    return history.push('/');
  }

  return getProductListLoading || getCurrentUserLoading ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <div className="your__products">
      <NavBar />
      <Image
        className="your__product__avatar"
        src={currentUser.avatar}
        alt="currentUser avatar"
      />
      <Row className="your__product__container">
        {yourProductList.map((product, index) => (
          <ProductCard product={product} key={index} canDelete canEdit />
        ))}
      </Row>
      <Footer />
    </div>
  );
}
