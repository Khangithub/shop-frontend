import React, {useContext} from 'react';
import {Row} from 'react-bootstrap';
import './ProductAbout.css';
import {CurrentUserContext} from '../../../ContextProvider/CurrentUserContextProvider';
import ProductImg from './ProductImg';
import ProductInfo from './ProductInfo';
import ProductCartCard from './ProductCartCard';
import SigninCard from './SigninCard';

function Index({product}) {
  const {currentUser, getCurrentUserLoading} = useContext(CurrentUserContext);

  return (
    <Row className="product__container">
      <ProductImg product={product} />
      <ProductInfo product={product} />
      {currentUser && !getCurrentUserLoading ? (
        <ProductCartCard product={product} />
      ) : (
        <SigninCard />
      )}
    </Row>
  );
}

export default Index;
