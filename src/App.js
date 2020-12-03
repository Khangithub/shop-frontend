import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Route, Switch} from 'react-router-dom';
import routes from './routes';
import history from './history';

import ProductContextProvider from './ContextProvider/ProductListContextProvider';
import OrderContextProvider from './ContextProvider/OrderContextProvider';
import BillContextProvider from './ContextProvider/BillContextProvider';
import CurrentUserContextProvider from './ContextProvider/CurrentUserContextProvider';

export default function App() {
  const switchRoute = (routes) => {
    var result = null;
    if (routes) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            component={route.main}
          />
        );
      });
    }
    return result;
  };

  return (
    <CurrentUserContextProvider>
      <OrderContextProvider>
        <ProductContextProvider>
          <BillContextProvider>
            <Router history={history}>
              <div className="App">
                <Switch>{switchRoute(routes)}</Switch>
              </div>
            </Router>
          </BillContextProvider>
        </ProductContextProvider>
      </OrderContextProvider>
    </CurrentUserContextProvider>
  );
}
