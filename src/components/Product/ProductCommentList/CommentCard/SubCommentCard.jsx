import React, {useState} from 'react';
import Linkify from 'react-linkify';
import './SubCommentCard.css';
import {Image} from 'react-bootstrap';
import AddSubCommentForm from './AddSubCommentForm';
import EditSubCommentForm from './EditSubCommentForm/';
import DeleteSubCommentButton from './DeleteSubCommentButton';
import {convertTimestamp} from '../../../../helpers';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function SubCommentCard({
  currentUser,
  commentId,
  subcomment,
  productId,
  setProductCommentList,
}) {
  let [showSubCommentForm, setShowSubCommentModal] = useState(false);

  return (
    <div className="sub__comment__card align-left">
      <div className="sub__comment__card__comment">
        <Tippy
          placement="bottom"
          content={
            <p id="sub__comment__card__comment__sender__name">
              {subcomment.sender.username}
            </p>
          }
          arrow
        >
          <Image src={subcomment.sender.avatar} roundedCircle />
        </Tippy>

        <div className="sub__comment__card__comment__content">
          <Linkify>
            <span>@{subcomment.receiver.username}&nbsp;&nbsp;&nbsp;</span>
            <span>{subcomment.content}</span>
          </Linkify>
        </div>
      </div>

      <div className="sub__comment__card__button__list">
        {currentUser && (
          <small
            onClick={() => {
              setShowSubCommentModal(!showSubCommentForm);
            }}
          >
            reply
          </small>
        )}

        {currentUser && currentUser._id === subcomment.sender._id && (
          <EditSubCommentForm
            subcomment={subcomment}
            productId={productId}
            setProductCommentList={setProductCommentList}
          />
        )}

        {currentUser && currentUser._id === subcomment.sender._id && (
          <DeleteSubCommentButton
            subcomment={subcomment}
            commentId={commentId}
            setProductCommentList={setProductCommentList}
            productId={productId}
          />
        )}
        <small>{convertTimestamp(subcomment.published)}</small>
      </div>

      {showSubCommentForm && (
        <AddSubCommentForm
          commentId={commentId}
          receiver={subcomment.sender._id}
          setProductCommentList={setProductCommentList}
          productId={productId}
          setShowSubCommentModal={setShowSubCommentModal}
        />
      )}
    </div>
  );
}

SubCommentCard.prototype = {
  sender: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.username,
    _id: PropTypes.string,
  }),
  content: PropTypes.string,
  receiver: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
    _id: PropTypes.string,
  }),
  published: PropTypes.string,
};
