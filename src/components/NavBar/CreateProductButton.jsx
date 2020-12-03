import React, {useContext} from 'react';
import './CreateProductButton.css';
import CreateProductModal from './CreateProductModal';
import {Image} from 'react-bootstrap';
import {CurrentUserContext} from '../../ContextProvider/CurrentUserContextProvider';
import {ProductListContext} from '../../ContextProvider/ProductListContextProvider';
import addProductIcon from '../../images/common/addProduct.svg';

export default function CreateProductButton() {
  const [showModal, setShowModal] = React.useState(false);
  const {getCurrentUserLoading, currentUser} = useContext(CurrentUserContext);
  const {setProductList, setYourProductList, setProductListLoading} = useContext(
    ProductListContext
  );

  return (
    !getCurrentUserLoading && (
      <div className="create__product__button__container">
        <Image
          src={addProductIcon}
          alt="add product icon"
          rounded
          onClick={() => setShowModal(!showModal)}
        />

        <CreateProductModal
          show={showModal}
          is_loading={getCurrentUserLoading}
          onHide={() => setShowModal(false)}
          setYourProductList={setYourProductList}
          setProductListLoading={setProductListLoading}
          setProductList={setProductList}
          currentUser={currentUser}
        />
      </div>
    )
  );
}
