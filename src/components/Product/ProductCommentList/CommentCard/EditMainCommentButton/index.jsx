import React, {useState} from 'react';
import EditMainCommentModal from './EditMainCommentModal';
import PropTypes from 'prop-types';

export default function Index({
  mainComment,
  commentator,
  commentId,
  setProductCommentList,
  productId,
}) {
  const [modalShow, setModalShow] = useState(false);
 
  return (
    <>
      <small onClick={() => setModalShow(true)}>edit</small>
      <EditMainCommentModal
        commentId={commentId}
        commentator={commentator}
        show={modalShow}
        onHide={() => setModalShow(false)}
        mainComment={mainComment}
        setProductCommentList={setProductCommentList}
        productId={productId}
      />
    </>
  );
}

Index.prototype = {
  mainComment: PropTypes.string,
  commentator: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
  commentId: PropTypes.string,
};
