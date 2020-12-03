import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {ProductListContext} from '../../ContextProvider/ProductListContextProvider';
import {CurrentUserContext} from '../../ContextProvider/CurrentUserContextProvider';
import DeleteProductModal from './DeleteProductModal';

export default function DeleteOrderButton(props) {
  const {product} = props;
  const [modalShow, setModalShow] = useState(false);
  const {
    setProductList,
    setYourProductList,
    setProductListLoading,
  } = useContext(ProductListContext);
  const {getCurrentUserLoading, currentUser} = useContext(CurrentUserContext);

  return (
    !getCurrentUserLoading && (
      <>
        <button onClick={() => setModalShow(true)}>
          <span role="img" aria-label="">
            🧺
          </span>
        </button>
        <DeleteProductModal
          product={product}
          show={modalShow}
          onHide={() => setModalShow(false)}
          setProductList={setProductList}
          setYourProductList={setYourProductList}
          currentUser={currentUser}
          setProductListLoading={setProductListLoading}
        />
      </>
    )
  );
}

DeleteOrderButton.prototype = {
  product: PropTypes.shape({
    productImage: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
  }),
};
