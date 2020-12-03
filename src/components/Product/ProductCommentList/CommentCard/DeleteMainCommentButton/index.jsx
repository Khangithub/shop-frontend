import React, {useState} from 'react';
import DeleteMainCommentModal from './DeleteMainCommentModal';
import PropTypes from 'prop-types';

export default function DeleteMainCommentButton({
  mainComment,
  commentator,
  commentId,
  setProductCommentList,
  productId,
}) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <small onClick={() => setModalShow(true)}>delete</small>
      <DeleteMainCommentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        mainComment={mainComment}
        commentator={commentator}
        commentId={commentId}
        setProductCommentList={setProductCommentList}
        productId={productId}
      />
    </>
  );
}

DeleteMainCommentButton.prototype = {
  mainComment: PropTypes.string,
  commentator: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
  commentId: PropTypes.string,
};
