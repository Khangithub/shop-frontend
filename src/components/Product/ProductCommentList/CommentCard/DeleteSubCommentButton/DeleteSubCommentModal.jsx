import React from 'react';
import Cookies from 'universal-cookie';
import {Modal, Button, Image} from 'react-bootstrap';
import './DeleteSubCommentModal.css';

function DeleteSubCommentModal(props) {
  const {onHide, subcomment, commentId, setProductCommentList, productId} = props;

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const deleteSubCommentResponse = await fetch(
        'https://shopeeholic-backend.herokuapp.com/comments/sub/comment/' + commentId,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer '.concat(token),
            'content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({subCommentId: subcomment._id}),
        }
      );

      const deleteSubCommentJson = await deleteSubCommentResponse.json();

      if (deleteSubCommentJson.doc) {
        try {
          const productCommentListResponse = await fetch(
            'https://shopeeholic-backend.herokuapp.com/comments/of/product/' + productId
          );
          const productCommentListJson = await productCommentListResponse.json();
          setProductCommentList(productCommentListJson.docs);
          onHide();
        } catch (err) {
          console.error(
            err,
            'DeleteSubCommentModal re fetch productCommentList'
          );
        }
      } else {
        console.error(
          deleteSubCommentJson,
          'DeleteSubCommentModal error in response json'
        );
      }
    } catch (err) {
      console.error(err, 'DeleteSubCommentModal err in trycatch block');
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
        <div className="delete__sub__comment__modal">
          <Image src={subcomment.sender.avatar} roundedCircle />

          <span>{subcomment.content}</span>
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

export default DeleteSubCommentModal;
