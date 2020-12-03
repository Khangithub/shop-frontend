import React, {useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import {Navbar, Nav, Image, Badge} from 'react-bootstrap';
import {withRouter, useHistory} from 'react-router-dom';
import {OrderContext} from '../../ContextProvider/OrderContextProvider';
import {BillContext} from '../../ContextProvider/BillContextProvider';
import {CurrentUserContext} from '../../ContextProvider/CurrentUserContextProvider';
import CreateProductButton from './CreateProductButton';
import SettingDropdown from './SettingDropdown';

import logo from '../../images/common/logo.JPG';
import cartIcon from '../../images/common/cart.png';
import productListIcon from '../../images/common/products.svg';

import PropTypes from 'prop-types';
import {removeAscent} from '../../helpers';

function NavBar() {
  const history = useHistory();
  const {currentUser} = useContext(CurrentUserContext);
  let [input, setInput] = useState('');

  const {cart, getCartLoading, isOrderAdded} = useContext(OrderContext);

  const {billList} = useContext(BillContext);

  const handleSearch = (event) => {
    event.preventDefault();

    history.push({
      pathname: '/search/1',
      search: `?keyword=${removeAscent(input)}`,
      state: {input},
    });
  };

  return (
    <div className="NavBar navbar__container">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <Image
            className="navbar__container__img"
            src={logo}
            alt="logo image"
            rounded
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/productList/1">
              <Image
                className="navbar__container__img"
                src={productListIcon}
                alt="productListIcon"
              />
            </Nav.Link>

            {currentUser && currentUser.role !== 'client' && (
              <div className="navbar__container__create__product__button">
                <CreateProductButton />
              </div>
            )}

            {currentUser && (
              <Nav.Link
                className={isOrderAdded && 'navbar__container__img__shake'}
                href="/orders"
              >
                <Image
                  src={cartIcon}
                  className="navbar__container__img"
                  alt="cartIcon"
                />

                <Badge variant="danger">
                  {getCartLoading ? 'loading' : cart.length}
                </Badge>
              </Nav.Link>
            )}

            <SettingDropdown currentUser={currentUser} billList={billList} />
          </Nav>

          <form className="navbar__searchbox" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="mì tôm, Iphone, ..."
              name="keyword"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />

            <button onClick={handleSearch}>
              <span role="img" aria-label="">
                🔍
              </span>
            </button>
          </form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

NavBar.prototype = {
  currentUser: PropTypes.shape({
    role: PropTypes.string,
    avatar: PropTypes.string,
    username: PropTypes.string,
  }),
  getCurrentUserLoading: PropTypes.bool,
  cart: PropTypes.array,
  billList: PropTypes.array,
};

export default withRouter(NavBar);
