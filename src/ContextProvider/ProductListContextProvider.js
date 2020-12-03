import React, {useState, useEffect, useContext} from 'react';
import {CurrentUserContext} from './CurrentUserContextProvider';
// import ProductCard from '../components/ProductCard';

export const ProductListContext = React.createContext();

export default function ProductContextProvider(props) {
  const [productList, setProductList] = useState([]);
  const {currentUser, getCurrentUserLoading} = useContext(CurrentUserContext);
  const [yourProductList, setYourProductList] = useState([]);
  const [getProductListLoading, setProductListLoading] = useState(true);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const productListResponse = await fetch(
          'https://shopeeholic-backend.herokuapp.com/products'
        );
        const productListJson = await productListResponse.json();

        if (productListJson.docs) {
          setProductList(productListJson.docs);

          setYourProductList(
            productListJson.docs.filter((product) => {
              return product.saler._id.localeCompare(currentUser._id) === 0;
            })
          );

          setProductListLoading(false);
        } else {
          console.error(
            productListJson,
            'err in productListJson ProductListContextProvider'
          );
        }
      } catch (err) {
        console.error(err, 'err in trycatch block productContextProvider');
      }
    };

    if (currentUser && !getCurrentUserLoading) fetchProductList();
  }, [currentUser, getCurrentUserLoading]);

  return (
    <ProductListContext.Provider
      value={{
        productList,
        setProductList,
        getProductListLoading,
        yourProductList,
        setYourProductList,
        setProductListLoading,
      }}
    >
      {props.children}
    </ProductListContext.Provider>
  );
}
