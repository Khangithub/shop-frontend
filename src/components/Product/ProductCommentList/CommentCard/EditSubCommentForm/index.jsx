import React, {useState} from 'react';
import EditSubCommentModal from './EditSubCommentModal';

import PropTypes from 'prop-types';

export default function EditSubCommentForm({
  subcomment,
  productId,
  setProductCommentList,
}) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <small onClick={() => setModalShow(!modalShow)}>edit</small>

      <EditSubCommentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        subcomment={subcomment}
        productId={productId}
        setProductCommentList={setProductCommentList}
      />
    </>
  );
}

EditSubCommentForm.prototype = {
  content: PropTypes.string,
  sender: {
    username: PropTypes.string,
    avatar: PropTypes.string,
  },
  receiver: {
    username: PropTypes.string,
    avatar: PropTypes.string,
  },
};
