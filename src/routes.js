import React from 'react';
import Home from './pages/Home';
import Product from './pages/Product';
import Orders from './pages/Orders';
import NotFound from './components/NotFound/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import ProductByCategory from './pages/ProductByCategory';
import Search from './pages/Search';
import Personalize from './pages/Personalize';
import YourProducts from './pages/YourProducts';
import YourBills from './pages/YourBills';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />,
  },
  {
    path: '/yourProducts',
    exact: true,
    main: () => <YourProducts />,
  },
  {
    path: '/yourBills',
    exact: true,
    main: () => <YourBills />,
  },
  {
    path: '/login',
    exact: true,
    main: () => <Login />,
  },
  {
    path: '/signup',
    exact: true,
    main: () => <Signup />,
  },
  {
    path: '/orders',
    exact: true,
    main: () => <Orders />,
  },
  {
    path: '/search/:index',
    exact: true,
    main: ({props}) => <Search {...props} />,
  },
  {
    path: '/personalize',
    exact: true,
    main: () => <Personalize />,
  },
  {
    path: '/productList/:category/:index', // tuyệt đối không được để route nào dưới route NotFound
    exact: false,
    main: ({match}) => <ProductByCategory match={match} />,
  },
  {
    path: '/productList/:index',
    exact: false,
    main: ({match}) => <Products match={match} />,
  },
  {
    path: '/:productId',
    exact: false,
    main: ({match}) => <Product match={match} />,
  },
  //    {---------------------------------------------------------------------------------------------------------------------------}
  {
    path: '',
    exact: false,
    main: () => <NotFound />,
  },
];

export default routes;
