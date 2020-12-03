import React, {useState} from 'react';
import './EditProductButton.css';
import UploadImgButton from './UploadImgButton';
import Cookies from 'universal-cookie';
import {Modal, Image, Form, Row, Col} from 'react-bootstrap';

const EditProductModal = (props) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const {
    product,
    setProductList,
    setYourProductList,
    setProductListLoading,
    currentUser,
    onHide,
  } = props;
  const [editedProduct, setEditProduct] = useState({
    ...product,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let removedEmptiedInfoProduct = Object.entries(editedProduct).filter(
      (keyValuePair) => {
        return keyValuePair[1] !== '';
      }
    );

    let revertEditedProduct = Object.fromEntries(removedEmptiedInfoProduct);

    try {
      const editProductResponse = await fetch(
        'https://shopeeholic-backend.herokuapp.com/products/' + product._id,
        {
          method: 'PATCH',
          body: JSON.stringify(revertEditedProduct),
          headers: {
            Authorization: 'Bearer '.concat(token),
            'content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      const editProductJson = await editProductResponse.json();

      if (editProductJson.doc) {
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
              'err in productListJson EditProductModal'
            );
          }
        } catch (err) {
          console.error(err, 'err in trycatch block EditProductModal');
        }
      }
    } catch (err) {
      console.error(err, 'trycatch block EditProductModal');
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
        <Modal.Title id="contained-modal-title-vcenter">
          <Modal.Title id="contained-modal-title-vcenter">
            <span>{product.name}</span>
            <Image src={product.productImage} alt="productImage" />
          </Modal.Title>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="edit__button__button">
          <Col xs={12} sm={6} className="edit__button__button__container">
            <Form.Group>
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="text"
                value={editedProduct.name}
                onChange={(e) =>
                  setEditProduct({
                    ...editedProduct,
                    name: e.target.value.toLowerCase(),
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price: </Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditProduct({...editedProduct, price: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Discount (%): </Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                value={editedProduct.discount}
                onChange={(e) =>
                  setEditProduct({...editedProduct, discount: e.target.value})
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Image url:
                <UploadImgButton
                  editedProduct={editedProduct}
                  setEditProduct={setEditProduct}
                />
              </Form.Label>
              <Form.Control
                type="text"
                value={editedProduct.productImage}
                onChange={(e) =>
                  setEditProduct({
                    ...editedProduct,
                    productImage: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} className="edit__button__button__container">
            <Form.Group>
              <Form.Label>Category: </Form.Label>
              <Form.Control
                as="select"
                value={editedProduct.category}
                onChange={(e) =>
                  setEditProduct({...editedProduct, category: e.target.value})
                }
              >
                <option value="book">book</option>
                <option value="technology">technology</option>
                <option value="food">food</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Manufacturer: </Form.Label>
              <Form.Control
                type="text"
                value={editedProduct.manufacturer}
                onChange={(e) =>
                  setEditProduct({
                    ...editedProduct,
                    manufacturer: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                value={editedProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editedProduct,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleSubmit}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
