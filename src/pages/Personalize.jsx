import React, {useContext} from 'react';
import {Spinner, Row, Col} from 'react-bootstrap';
import NavBar from '../components/NavBar';
import {CurrentUserContext} from '../ContextProvider/CurrentUserContextProvider';
import EditAvatar from '../components/Personalize/EditAvatar';
import EditInfo from '../components/Personalize/EditInfo';
import ChangePwd from '../components/Personalize/ChangePwd';
import Footer from "../components/Footer/";
import './Personalize.css';
import PropTypes from 'prop-types';

export default function Personalize() {
  const {currentUser, getCurrentUserLoading} = useContext(CurrentUserContext);
  return getCurrentUserLoading ? (
    <Spinner animation="grow" variant="danger" />
  ) : (
    <div className="personalize">
      <NavBar />
      <div className="container-fluid personalize__container">
        <Row>
          <Col xs={12} sm={4}>
            <EditAvatar currentUser={currentUser} />
          </Col>
          <Col xs={12} sm={4}>
            <EditInfo currentUser={currentUser} />
          </Col>
          <Col xs={12} sm={4}>
            <ChangePwd />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

Personalize.proptype = {
  currentuser: PropTypes.object,
  getCurrentUserLoading: PropTypes.bool,
};
