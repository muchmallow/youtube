import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  invalid: {
    color: "red"
  },
  valid: {
    color: "green"
  }
}));

const ErrorsHandler = ({ touched, message }) => {
  const classes = useStyles();

  if (!touched) {
    return <div className={classes.invalid}>&nbsp;</div>;
  }

  if (message) {
    return <div className={classes.invalid}>{message}</div>;
  }

  return <div className={classes.valid}>&nbsp;</div>;
};

export default ErrorsHandler;
