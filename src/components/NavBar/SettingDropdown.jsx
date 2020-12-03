import React from 'react';
import './SettingDropdown.css';
import {Image, NavDropdown} from 'react-bootstrap';

function SettingDropdown({currentUser, billList}) {
  return (
    <NavDropdown
      className="setting__dropdown"
      title={
        <span className="setting__dropdown__title">
          <span>Hello, {currentUser ? currentUser.role : 'Sign in'}</span>
          <br />
          <span>{currentUser ? currentUser.username : 'Guest'}</span>
        </span>
      }
    >
      {currentUser && currentUser.role !== 'client' && (
        <NavDropdown.Item
          href="/yourProducts"
          className="setting__dropdown__item"
        >
          <span className="setting__dropdown__item__title">
            Your Product List
          </span>
        </NavDropdown.Item>
      )}

      {currentUser && currentUser.role !== 'client' && (
        <NavDropdown.Item className="setting__dropdown__item" href="/yourBills">
          <span className="setting__dropdown__item__title">
            Your Order List
          </span>
          <span className="setting__dropdown__item__length">
            {billList ? billList.length : 'loading'}
          </span>
        </NavDropdown.Item>
      )}

      {currentUser && (
        <NavDropdown.Item
          className="setting__dropdown__item"
          href="/personalize"
        >
          <span className="setting__dropdown__item__title">Personalize</span>

          {currentUser && (
            <Image
              src={currentUser.avatar}
              className="setting__dropdown__item__img"
              roundedCircle
            />
          )}
        </NavDropdown.Item>
      )}

      <NavDropdown.Item
        className="setting__dropdown__item setting__dropdown__login__button"
        href="/login"
      >
        <span className="setting__dropdown__item__title">Log in</span>
      </NavDropdown.Item>

      <NavDropdown.Item
        className="setting__dropdown__item setting__dropdown__signup__button"
        href="/signup"
      >
        <span className="setting__dropdown__item__title">Sign up</span>
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SettingDropdown;
