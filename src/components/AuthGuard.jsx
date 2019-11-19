import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getToken } from "../reducers/loginReducer";
import Preloader from "./Preloader";

const AuthGuard = ({ isAuth, isLogging, getToken }) => {

  if (isAuth) {
    return <Redirect to="/main"/>;
  }

  if (isLogging) {
    getToken();
  } else {
    return <Redirect to="/login"/>;
  }

  return <Preloader/>;
};

AuthGuard.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isLogging: PropTypes.bool.isRequired,
  getToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.loginPage.isAuth,
  isLogging: state.loginPage.isLogging
});

export default connect(
  mapStateToProps,
  { getToken }
)(AuthGuard);
