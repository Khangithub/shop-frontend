import React, {useState} from 'react';
import Cookies from 'universal-cookie';
// import {useHistory} from 'react-router-dom';
import {Modal, Form, Row, Col, Spinner} from 'react-bootstrap';

function CreateProductModal(props) {
  const {
    setProductList,
    setYourProductList,
    setProductListLoading,
    currentUser,
    onHide,
  } = props;
  const cookies = new Cookies();
  const token = cookies.get('token');
  // const history = useHistory();

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    productImage: '',
    discount: 0,
    category: '',
    manufacturer: '',
    description: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    let removeEmptiedInfoProduct = Object.entries(newProduct).filter(
      (keyValuePair) => {
        return keyValuePair[1] !== '';
      }
    );

    let revertedProduct = Object.fromEntries(removeEmptiedInfoProduct);

    try {
      const createProductResponse = await fetch(
        'https://shopeeholic-backend.herokuapp.com/products/',
        {
          method: 'POST',
          body: JSON.stringify({...revertedProduct}),
          headers: {
            Authorization: 'Bearer '.concat(token),
            'content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      const createProductJson = await createProductResponse.json();

      if (createProductJson.doc) {
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
              'err in productListJson CreateProductButton'
            );
          }
        } catch (err) {
          console.error(err, 'err in trycatch block CreateProductButton');
        }
      }
    } catch (err) {
      console.error(err, 'trycatch block CreateProductButton');
    }
  };

  return props.is_loading ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <Row className="create__product__modal">
          <Col xs={12} sm={6} className="add__product__modal__col">
            <Form.Group>
              <Form.Label>Name: </Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={(event) =>
                  setNewProduct({
                    ...newProduct,
                    name: event.target.value.toLowerCase(),
                  })
                }
                required
              />
            </Form.Group>

            <Row></Row>
            <Form.Group>
              <Form.Label>Price: </Form.Label>
              <Form.Control
                type="number"
                min="0"
                onChange={(event) =>
                  setNewProduct({
                    ...newProduct,
                    price: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Discount (%): </Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                onChange={(event) =>
                  setNewProduct({
                    ...newProduct,
                    discount: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image url: </Form.Label>
              <Form.Control
                type="text"
                onChange={(event) =>
                  setNewProduct({
                    ...newProduct,
                    productImage: event.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} className="add__product__modal__col">
            <Form.Group>
              <Form.Label>Category: </Form.Label>
              <Form.Control
                as="select"
                onChange={(event) =>
                  setNewProduct({
                    ...newProduct,
                    category: event.target.value,
                  })
                }
              >
                <option value="book" defaultValue>
                  book
                </option>
                <option value="technology">technology</option>
                <option value="food">food</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Manufacturer: </Form.Label>
              <Form.Control
                type="text"
                onChange={(event) =>
                  setNewProduct({
                    ...newProduct,
                    manufacturer: event.target.value.toLowerCase(),
                  })
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description: </Form.Label>
              <Form.Control
                as="textarea"
                rows="7"
                onChange={(event) =>
                  setNewProduct({
                    ...newProduct,
                    description: event.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleSubmit}>Add</button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateProductModal;
