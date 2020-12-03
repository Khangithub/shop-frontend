import React, {useState, useContext} from 'react';
import './OrderCard.css';
import {useHistory} from 'react-router-dom';
import {Image, Badge} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import DeleteOrderButton from './DeleteOrderButton';
import {returnPrice, getRandomInRange, convertTimestamp} from '../../helpers';
import {OrderContext} from '../../ContextProvider/OrderContextProvider';
import PropTypes from 'prop-types';
import removedSound from '../../assets/sounds/removed.mp3';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function OrderCard({order, forSaleman, forBuyer}) {
  console.log('order', order);
  const {product, quantity, buyer, _id, published} = order;
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const cookies = new Cookies();
  const token = cookies.get('token');
  const rating = getRandomInRange(1, 5);
  const {setCartLoading, setCart} = useContext(OrderContext);
  const history = useHistory();
  let audio = new Audio(removedSound);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.keyCode === 13) {
      try {
        const patchOrderResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/orders/' + _id,
          {
            method: 'PATCH',
            headers: {
              Authorization: 'Bearer '.concat(token),
              'content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({quantity: updatedQuantity}),
          }
        );

        const patchOrderJson = await patchOrderResponse.json();

        if (patchOrderJson.doc) {
          const cartResponse = await fetch(
            'https://shopeeholic-backend.herokuapp.com/orders/',
            {
              headers: {
                Authorization: 'Bearer '.concat(token),
                'content-type': 'application/json; charset=UTF-8',
              },
            }
          );

          const cartJson = await cartResponse.json();

          if (cartJson.docs) {
            setCartLoading(false);
            setCart(cartJson.docs);
            audio.play();
          } else {
            setCartLoading(true);
            console.error('UpdateOrder error in set orderList back', cartJson);
          }
        } else {
          setCartLoading(true);
          console.error('UpdateOrder error in patchOrderJson', patchOrderJson);
        }
      } catch (err) {
        console.error('UpdateOrder error in trycatch block', err);
      }
    }
  };

  return (
    <div className="order__card">
      <div className="order__card__container">
        <div className="order__card__product__img__container">
          <Image src={product.productImage} alt="product image order" />
          <p>{product.manufacturer}</p>
        </div>

        <div className="order__card__info">
          <h4
            className="order__card__product__info__product__name"
            onClick={() => history.push(`/${order.product._id}`)}
          >
            {product.name}
          </h4>

          <div className="order__card__product__info__product__net__price">
            <span>
              ${product.discount ? returnPrice(product) : ` ${product.price}`}
            </span>

            {product.discount && (
              <Badge
                variant="danger"
                className="order__card__product__info__product__discount"
              >
                -{product.discount}%
              </Badge>
            )}
          </div>

          <div>
            {Array(rating)
              .fill()
              .map((_, index) => (
                <span role="img" key={index} aria-label="">
                  ⭐
                </span>
              ))}
          </div>

          {forBuyer && <DeleteOrderButton order={order} />}
        </div>
      </div>

      <div className="order__transaction__partner__info">
        <input
          type="number"
          min="1"
          placeholder={`x ${quantity}`}
          onChange={(e) => setUpdatedQuantity(e.target.value)}
          onKeyUp={handleSubmit}
          disabled={forBuyer ? false : true}
        />
        {forSaleman && buyer && (
          <Tippy content={`Buyer: ${buyer.username}`} placement="right">
            <Image src={buyer.avatar} alt="buyer avatar" />
          </Tippy>
        )}
        {forBuyer && (
          <Tippy
            content={`Saleman: ${product.saler.username}`}
            placement="right"
          >
            <Image src={product.saler.avatar} alt="saleman avatar" />
          </Tippy>
        )}
        <p>{convertTimestamp(published)}</p>
      </div>
    </div>
  );
}

OrderCard.prototype = {
  order: PropTypes.shape({
    product: PropTypes.shape({
      category: PropTypes.string,
      price: PropTypes.number,
      productImage: PropTypes.string,
      manufacturer: PropTypes.string,
      _id: PropTypes.string,
      name: PropTypes.string,
      discount: PropTypes.number,
      saler: {
        username: PropTypes.string,
        avatar: PropTypes.string,
        role: PropTypes.string,
        _id: PropTypes.string,
        email: PropTypes.string,
      },
    }),
    quantity: PropTypes.number,
    published: PropTypes.string,
    _id: PropTypes.string,
    buyer: {
      username: PropTypes.string,
      avatar: PropTypes.string,
      role: PropTypes.string,
      _id: PropTypes.string,
      email: PropTypes.string,
    },
  }),
};
