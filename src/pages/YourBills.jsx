import React, {useContext} from 'react';
import './YourBills.css';
import NavBar from '../components/NavBar';
import {useHistory} from 'react-router-dom';
import {Spinner, Row, Col, Image} from 'react-bootstrap';
import orderAd from '../images/common/order-ad.jpg';
import {CurrentUserContext} from '../ContextProvider/CurrentUserContextProvider';
import {BillContext} from '../ContextProvider/BillContextProvider';
import OrderCard from '../components/OrderCard';
import {returnTotalPrice} from '../helpers';
import Footer from '../components/Footer/';

export default function YourBills() {
  const {currentUser, getCurrentUserLoading} = useContext(CurrentUserContext);
  const {billList, getBillListLoading} = useContext(BillContext);
  const history = useHistory();

  if ((currentUser && currentUser.role === 'client') || !currentUser) {
    return history.push('/');
  }

  return getBillListLoading || getCurrentUserLoading ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <div className="bill__list">
      <NavBar />
      <Row className="bill__list__container">
        <Col xs={12} sm={9} className="order__card__list">
          <div className="order__ad__image">
            <Image src={orderAd} alt="orderAd" />
            <h1>Your bill list</h1>
          </div>
          {billList.reverse().map((billList, index) => {
            return <OrderCard order={billList} key={index} forSaleman />;
          })}
        </Col>

        <Col xs={12} sm={3} className="order__checkout">
          <div className="order__checkout__total__price">
            <span>Subtotals {billList?.length} bills:</span>
            <span>${returnTotalPrice(billList)}</span>
          </div>
          <div className="order__checkout__gift__checkbox">
            <input type="checkbox" />
            <label for="gift"> These orders do not include VAT tax</label>
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}
