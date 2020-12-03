import React, {useState} from 'react';
import './CommentCard.css';
import Linkify from 'react-linkify';
import {Image} from 'react-bootstrap';
import EditMainCommentButton from './EditMainCommentButton/';
import DeleteMainCommentButton from './DeleteMainCommentButton';
import AddSubCommentForm from './AddSubCommentForm/';
import SubCommentCard from './SubCommentCard';
import {convertTimestamp} from '../../../../helpers';
import PropTypes from 'prop-types';

export default function CommentCard({
  comment,
  currentUser,
  setProductCommentList,
  productId,
}) {
  let [showSubCommentForm, setShowSubCommentModal] = useState(false);

  return (
    <div className="comment__card">
      <div className="comment__card__comment">
        <Image src={comment.commentator.avatar} roundedCircle />
        <div>
          <span>{comment.commentator.username}</span>
          <Linkify>
            <span>{comment.mainComment}</span>
          </Linkify>
        </div>
      </div>

      <div className="comment__card__button__list align__left">
        {currentUser && (
          <small
            onClick={() => {
              setShowSubCommentModal(!showSubCommentForm);
            }}
          >
            reply
          </small>
        )}

        {currentUser && currentUser._id === comment.commentator._id && (
          <EditMainCommentButton
            mainComment={comment.mainComment}
            commentator={comment.commentator}
            commentId={comment._id}
            setProductCommentList={setProductCommentList}
            productId={productId}
          />
        )}

        {currentUser && currentUser._id === comment.commentator._id && (
          <DeleteMainCommentButton
            mainComment={comment.mainComment}
            commentator={comment.commentator}
            commentId={comment._id}
            setProductCommentList={setProductCommentList}
            productId={productId}
          />
        )}
        <small>{convertTimestamp(comment.published)}</small>
      </div>

      {comment.subComment.map((subcomment, index) => {
        return (
          <SubCommentCard
            key={index}
            currentUser={currentUser}
            commentId={comment._id}
            subcomment={subcomment}
            productId={productId}
            setProductCommentList={setProductCommentList}
          />
        );
      })}

      <div className="align__left">
        {showSubCommentForm && (
          <AddSubCommentForm
            commentId={comment._id}
            receiver={comment.commentator._id}
            setProductCommentList={setProductCommentList}
            productId={productId}
            setShowSubCommentModal={setShowSubCommentModal}
          />
        )}
      </div>
    </div>
  );
}

CommentCard.prototype = {
  mainComment: PropTypes.shape({
    _id: PropTypes.string,
    commentator: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
    mainComment: PropTypes.string,
    subComment: PropTypes.object,
    published: PropTypes.string,
  }),
};
