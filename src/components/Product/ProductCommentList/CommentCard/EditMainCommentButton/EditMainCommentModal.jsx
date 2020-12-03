import React, {useState} from 'react';
import {Modal, Image} from 'react-bootstrap';
import './EditMainCommentModal.css';
import Cookies from 'universal-cookie';

function EditMainCommentModal(props) {
  const {
    commentId,
    commentator,
    // show,
    onHide,
    mainComment,
    setProductCommentList,
    productId,
  } = props;

  let [updatedMainComment, setMainComment] = useState(mainComment);

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.keyCode === 13 && updatedMainComment.trim() !== '') {
      try {
        const patchMainCommentResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/comments/main/comment/' +
            commentId,
          {
            method: 'PATCH',
            headers: {
              Authorization: 'Bearer '.concat(token),
              'content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({mainComment: updatedMainComment}),
          }
        );

        const patchMainCommentJson = await patchMainCommentResponse.json();

        if (patchMainCommentJson.doc) {
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
              'EditMainCommentModal re fetch productCommentList'
            );
          }
        } else {
          console.error(
            patchMainCommentJson,
            'EditMainCommentModal error in response json'
          );
        }
      } catch (err) {
        console.error('EditMainCommentModal err in fetching data', err);
      }
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
        <div className="edit__main__comment__modal">
          <Image src={commentator.avatar} roundedCircle />
          <textarea
            onKeyUp={handleSubmit}
            type="text"
            onChange={(e) => {
              setMainComment(e.target.value);
            }}
            value={updatedMainComment}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditMainCommentModal;
