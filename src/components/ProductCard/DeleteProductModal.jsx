import React from 'react';
import {Modal, Button, Image, Container, Alert} from 'react-bootstrap';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('token');

const DeleteProductModal = (props) => {
  const {
    product,
    setProductList,
    setYourProductList,
    currentUser,
    setProductListLoading,
    onHide,
  } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const deleteProductResponse = await fetch(
        'https://shopeeholic-backend.herokuapp.com/products/' + product._id,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer '.concat(token),
            'content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      const deleteProductJson = await deleteProductResponse.json();

      if (deleteProductJson.doc) {
        try {
          const productListResponse = await fetch(
            'https://shopeeholic-backend.herokuapp.com/products/'
          );
          const productListJson = await productListResponse.json();

          if (productListJson.docs) {
            setProductList(productListJson.docs);

            setYourProductList(
              productListJson.docs.filter((product) => {
                return product.saler._id.localeCompare(currentUser._id) === 0;
              })
            );

            setProductListLoading(false);
            onHide();
          } else {
            console.error(
              productListJson,
              'err in productListJson DeleteProductButton'
            );
          }
        } catch (err) {
          console.error(err, 'err in trycatch block DeleteProductButton');
        }
      }
    } catch (err) {
      console.error(err, 'trycatch block DeleteProductButton');
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{textTransform: 'capitalize'}}
        >
          {product.name}
          <Image
            src={product.productImage}
            alt="productImage"
            style={{
              width: '70px',
              height: '70px',
            }}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Alert variant="danger">
            Removing a {`${product.category}`} places it into a read-only state
            until 2020-04-13, at which point the {`${product.category}`} will be
            permanantly removed. Are you ABSOLUTELY sure?
          </Alert>
          <p>
            This action can lead to data loss. To prevent accidental actions we
            ask you to confirm your intention. Please type
            <strong>{product.name}</strong> to proceed or close this modal to
            cancel.
          </p>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;
