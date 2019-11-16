import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getToken } from "../reducers/loginReducer";

const ColorCircularProgress = withStyles({
  root: {
    color: "#00695c"
  }
})(CircularProgress);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const AuthGuard = ({ isAuth, isLogging, getToken }) => {
  const classes = useStyles();

  if (isLogging) {
    getToken();
  } else {
    return <Redirect to="/login"/>;
  }

  if (isAuth) {
    return <Redirect to="/main"/>;
  }

  return (
    <div className={classes.root}>
      <ColorCircularProgress size={90} thickness={5}/>
    </div>
  );
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
