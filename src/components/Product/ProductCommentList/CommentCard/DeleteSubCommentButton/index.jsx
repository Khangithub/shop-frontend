import React, {useState} from 'react';

import DeleteSubCommentModal from './DeleteSubCommentModal';
import PropTypes from 'prop-types';

export default function DeleteSubCommentButton({
  subcomment,
  commentId,
  setProductCommentList,
  productId,
}) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <small onClick={() => setModalShow(!modalShow)}>delete</small>

      <DeleteSubCommentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        subcomment={subcomment}
        commentId={commentId}
        setProductCommentList={setProductCommentList}
        productId={productId}
      />
    </>
  );
}

DeleteSubCommentButton.prototype = {
  subcomment: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    sender: {
      username: PropTypes.string,
      avatar: PropTypes.string,
    },
    receiver: {
      username: PropTypes.string,
      avatar: PropTypes.string,
    },
  }),
  commentId: PropTypes.string,
};
