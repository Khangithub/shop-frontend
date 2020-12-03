import React, {useState, useContext} from 'react';
import './AddSubCommentForm.css';
import {Image, Spinner} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {CurrentUserContext} from '../../../../../ContextProvider/CurrentUserContextProvider';
import PropTypes from 'prop-types';

export default function AddSubCommentForm(props) {
  var {
    commentId,
    receiver,
    setProductCommentList,
    productId,
    setShowSubCommentModal,
  } = props;
  const {currentUser, getCurrentUserLoading} = useContext(CurrentUserContext);
  let [content, setContent] = useState('');
  let cookies = new Cookies();
  let token = cookies.get('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const subContent = {
      content: content,
      sender: currentUser._id,
      receiver: receiver,
    };

    if (event.keyCode === 13 && content.trim() !== '') {
      try {
        const addSubCommentResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/comments/sub/comment/' +
            commentId,
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer '.concat(token),
              'content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(subContent),
          }
        );

        const addSubCommentJson = await addSubCommentResponse.json();

        if (addSubCommentJson.doc) {
          try {
            const productCommentListResponse = await fetch(
              'https://shopeeholic-backend.herokuapp.com/comments/of/product/' + productId
            );
            const productCommentListJson = await productCommentListResponse.json();
            setProductCommentList(productCommentListJson.docs);
            setContent('');
            setShowSubCommentModal(false);
          } catch (err) {
            console.error(err, 'AddSubCommnetForm response back');
          }
        } else {
          console.error(
            addSubCommentJson,
            'AddSubCommentForm err in response json'
          );
        }
      } catch (err) {
        console.error(err, 'AddSubCommentForm err in trycatch block');
      }
    }
  };

  return getCurrentUserLoading || !currentUser ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <div className="add__sub__comment__form">
      <Image src={currentUser.avatar} roundedCircle />

      <textarea
        type="text"
        placeholder="Write a reply"
        onChange={(event) => {
          setContent(event.target.value);
        }}
        value={content}
        onKeyUp={handleSubmit}
      />
    </div>
  );
}

AddSubCommentForm.prototype = {
  commentId: PropTypes.string,
  receiver: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
};
