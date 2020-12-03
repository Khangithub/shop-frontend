import React, {useContext} from 'react';
import Cookies from 'universal-cookie';
import {OrderContext} from '../../ContextProvider/OrderContextProvider';
import {BillContext} from '../../ContextProvider/BillContextProvider';
import removedSound from '../../assets/sounds/removed.mp3';

export default function DeleteOrderButton({order}) {
  const {setCartLoading, setCart} = useContext(OrderContext);
  const {setBillList, setBillListLoading} = useContext(BillContext);
  const cookies = new Cookies();
  const token = cookies.get('token');
  let audio = new Audio(removedSound);

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const deleteOrderResponse = await fetch(
        'https://shopeeholic-backend.herokuapp.com/orders/' + order._id,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer '.concat(token),
            'content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      const deleteOrderJson = await deleteOrderResponse.json();

      if (deleteOrderJson.doc) {
        const cartResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/orders/ofUser',
          {
            headers: {
              Authorization: 'Bearer '.concat(token),
              'content-type': 'application/json; charset=UTF-8',
            },
          }
        );

        const billListResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/orders/ofSaler',
          {
            headers: {
              Authorization: 'Bearer '.concat(token),
              'content-type': 'application/json; charset=UTF-8',
            },
          }
        );

        const billListJson = await billListResponse.json();

        const cartJson = await cartResponse.json();

        if (cartJson.docs && billListJson.docs) {
          setBillList(billListJson.docs);
          setBillListLoading(false);
          setCartLoading(false);
          setCart(cartJson.docs);
          audio.play();
        } else {
          console.error(
            'DeleteOrderButton error in set orderList back',
            cartJson
          );
        }
      } else {
        setCartLoading(true);
        console.error(
          'DeleteOrderButton error in deleteOrderJson',
          deleteOrderJson
        );
      }
    } catch (err) {
      console.error('DeleteOrderButton error in trycatch block', err);
    }
  };

  return <button onClick={handleDelete}>Remove from cart</button>;
}
