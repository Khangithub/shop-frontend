import React, {useState} from 'react';
import './EditSubCommentModal.css';
import {Modal, Image} from 'react-bootstrap';
import Cookies from 'universal-cookie';

function EditSubCommentModal(props) {
  const {subcomment, productId, setProductCommentList, onHide} = props;

  const [newContent, setNewContent] = useState(subcomment.content);

  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.keyCode === 13 && newContent.trim() !== '') {
      try {
        const editSubCommentResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/comments/sub/comment/' + subcomment._id,
          {
            method: 'PATCH',
            headers: {
              Authorization: 'Bearer '.concat(token),
              'content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({newContent}),
          }
        );

        const editSubCommentJson = await editSubCommentResponse.json();
        if (editSubCommentJson.doc) {
          try {
            const productCommentListResponse = await fetch(
              'https://shopeeholic-backend.herokuapp.com/comments/of/product/' + productId
            );
            const productCommentListJson = await productCommentListResponse.json();

            setProductCommentList(productCommentListJson.docs);
            onHide();
          } catch (err) {
            console.error(err, 'EditsubCommnentModal response back');
          }
        } else {
          console.error(
            editSubCommentJson,
            'EditSubCommentModal err in response json'
          );
        }
      } catch (err) {
        console.error(err, 'EditSubCommentModal err in trycatch block');
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
        <div className="edit__sub__comment">
          <Image src={subcomment.sender.avatar} roundedCircle />
          <textarea
            type="text"
            onChange={(e) => {
              setNewContent(e.target.value);
            }}
            value={newContent}
            onKeyUp={handleSubmit}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditSubCommentModal;
