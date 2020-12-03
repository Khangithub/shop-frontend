import React, {useEffect, useState, useContext} from 'react';
import {CurrentUserContext} from '../../../ContextProvider/CurrentUserContextProvider';
import {Spinner} from 'reactstrap';
import CommentCard from './CommentCard';

function ProductCommentList({
  productId,
  setProductCommentList,
  productCommentList,
}) {
  let [getCommentListLoading, setCommentListLoading] = useState(true);
  let {currentUser, getCurrentUserLoading} = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchComment = async (productId) => {
      try {
        const productCommentListResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/comments/of/product/' + productId
        );
        const productCommentListJson = await productCommentListResponse.json();
        if (productCommentListJson.docs) {
          console.log(productCommentListJson, 'comment');
          setProductCommentList(productCommentListJson.docs);
          setCommentListLoading(false);
        }
      } catch (err) {
        console.error(err, 'trycatch ProductCommentList');
      }
    };

    fetchComment(productId);
  }, [
    productId,
    getCurrentUserLoading,
    getCommentListLoading,
    setProductCommentList,
  ]);

  return getCommentListLoading || getCurrentUserLoading ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    productCommentList
      .map((comment, index) => (
        <div key={index} style={{marginBottom: '30px'}}>
          <CommentCard
            key={index}
            comment={comment}
            currentUser={currentUser}
            setProductCommentList={setProductCommentList}
            productId={productId}
          />
        </div>
      ))
      .reverse()
  );
}

export default ProductCommentList;
