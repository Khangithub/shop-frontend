import React, {useState, useContext} from 'react';
import {CurrentUserContext} from '../../../ContextProvider/CurrentUserContextProvider';
import {Image, Spinner} from 'react-bootstrap';
import './AddMainCommentForm.css';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

function AddMainCommentForm({productId, setProductCommentList}) {
  const {currentUser, getCurrentUserLoading} = useContext(CurrentUserContext);
  let [mainComment, setMainComment] = useState('');
  let cookies = new Cookies();
  let token = cookies.get('token');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.keyCode === 13 && mainComment.trim() !== '') {
      const addMainComment = async () => {
        try {
          const addCommentResponse = await fetch(
            'https://shopeeholic-backend.herokuapp.com/comments/main/comment',
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer '.concat(token),
                'content-type': 'application/json; charset=UTF-8',
              },
              body: JSON.stringify({mainComment, product: productId}),
            }
          );

          const addCommentJson = await addCommentResponse.json();

          if (addCommentJson.doc) {
            try {
              const productCommentListResponse = await fetch(
                'https://shopeeholic-backend.herokuapp.com/comments/of/product/' +
                  productId
              );
              const productCommentListJson = await productCommentListResponse.json();
              setProductCommentList(productCommentListJson.docs);
              setMainComment('');
            } catch (err) {
              console.error(err, 'AddMainCommnetForm response back');
            }
          } else {
            console.error(addCommentJson, 'AddMainCommnetForm fetching');
          }
        } catch (err) {
          console.error(err, 'trycatch AddMainCommentForm');
        }
      };

      addMainComment();
    }
  };
  return getCurrentUserLoading || !currentUser ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <div className="add__main__comment">
      <Image src={currentUser.avatar} roundedCircle />

      <textarea
        type="text"
        placeholder="What is your first impression about this product?"
        onKeyUp={handleSubmit}
        value={mainComment}
        onChange={(e) => {
          setMainComment(e.target.value);
        }}
      />
    </div>
  );
}

export default AddMainCommentForm;

AddMainCommentForm.prototype = {
  productId: PropTypes.string,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),
};
