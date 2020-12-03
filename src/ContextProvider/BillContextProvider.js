import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';

export const BillContext = React.createContext(); // export to App.js

export default function BillContextProvider(props) {
  // export to destination component

  let [billList, setBillList] = useState([]);
  let [getBillListLoading, setBillListLoading] = useState(true);
  let cookies = new Cookies();
  let token = cookies.get('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
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
        if (billListJson.docs) {
          setBillList(billListJson.docs);
          setBillListLoading(false);
        } else {
          console.error(billListJson, 'err in billListJson');
        }
      } catch (err) {
        console.error(err, 'err in BillContextProvider');
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <BillContext.Provider
      value={{billList, getBillListLoading, setBillList, setBillListLoading}}
    >
      {props.children}
    </BillContext.Provider>
  );
}
