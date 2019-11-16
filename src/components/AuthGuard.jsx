import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getToken } from "../reducers/loginReducer";

const ColorCircularProgress = withStyles({
  root: {
    color: "#00695c",
  },
})(CircularProgress);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const AuthGuard = ({ isAuth, token, getToken }) => {
  const classes = useStyles();

  useEffect(() => {
    getToken();
  }, []);

  if (isAuth && token) {
    return <Redirect to="/main" />;
  }

  return (
    <div className={classes.root}>
      <ColorCircularProgress size={90} thickness={5} />
    </div>
  );
};

AuthGuard.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  token: PropTypes.string,
  getToken: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuth: state.loginPage.isAuth,
  token: state.loginPage.token,
});

export default connect(
  mapStateToProps,
  { getToken },
)(AuthGuard);
