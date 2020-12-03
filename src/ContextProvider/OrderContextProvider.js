import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
export const OrderContext = React.createContext(); // export to App.js

export default function OrderContextProvider(props) {
  // export to destination component

  let [cart, setCart] = useState([]);
  let [isOrderAdded, setOrderAdded] = useState(false);
  let [getCartLoading, setCartLoading] = useState(true);
  let cookies = new Cookies();
  let token = cookies.get('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const cartResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/orders/ofUser',
          {
            method: 'GET',
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
        } else {
          setCartLoading(true);
          console.error('OrderContextProvider', cartJson);
        }
      } catch (err) {
        setCartLoading(true);
        console.error('OrderContextProvider', err);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  const createOrder = async (product, quantity) => {
    try {
      const addOrderResponse = await fetch('https://shopeeholic-backend.herokuapp.com/orders/', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer '.concat(token),
          'content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          product: product._id,
          quantity: quantity,
        }),
      });

      const addOrderJson = await addOrderResponse.json();

      if (addOrderJson.doc) {
        try {
          const cartResponse = await fetch(
            'https://shopeeholic-backend.herokuapp.com/orders/ofUser',
            {
              method: 'GET',
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
            setOrderAdded(true);
            setTimeout(() => setOrderAdded(false), 3000);
          } else {
            setCartLoading(true);
            setOrderAdded(false);

            console.error('OrderContextProvider createOrder', cartJson);
          }
        } catch (err) {
          setCartLoading(true);
          setOrderAdded(false);
          console.error('OrderContextProvider createOrder', err);
        }
      } else {
        console.error(
          'Error of createOrder Response OrderContextProvider',
          addOrderJson
        );
      }
    } catch (err) {
      console.error(
        'Error in trycatch block createOrder OrderContextProvider',
        err
      );
    }
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        getCartLoading,
        setCartLoading,
        setCart,
        createOrder,
        isOrderAdded,
        setOrderAdded,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}
