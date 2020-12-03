import React from 'react';
import Cookies from 'universal-cookie';
import './DeleteMainCommentModal.css';

import {Modal, Button, Image} from 'react-bootstrap';

function DeleteMainCommentModal(props) {
  const {
    // show,
    onHide,
    mainComment,
    commentator,
    commentId,
    setProductCommentList,
    productId,
  } = props;

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const deleteMainCommentResponse = await fetch(
        'https://shopeeholic-backend.herokuapp.com/comments/main/comment/' +
          commentId,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer '.concat(token),
            'content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      const deleteMainCommentJson = await deleteMainCommentResponse.json();

      if (deleteMainCommentJson.doc) {
        try {
          const productCommentListResponse = await fetch(
            'https://shopeeholic-backend.herokuapp.com/comments/of/product/' +
              productId
          );
          const productCommentListJson = await productCommentListResponse.json();
          setProductCommentList(productCommentListJson.docs);
          onHide();
        } catch (err) {
          console.error(
            err,
            'DeleteMainCommentModal re fetch productCommentList'
          );
        }
      } else {
        console.error(
          deleteMainCommentJson,
          'EditMainCommentModal error in response json'
        );
      }
    } catch (err) {
      console.error(err, 'DeleteMainCommentModal err in trycatch block');
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="delete__main__comment__modal">
          <Image src={commentator.avatar} roundedCircle />
          <span>{mainComment}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteMainCommentModal;
