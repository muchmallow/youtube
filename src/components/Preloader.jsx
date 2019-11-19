import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const ColorCircularProgress = withStyles({
  root: {
    color: "#00695c"
  }
})(CircularProgress);

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    flexGrow: 1
  }
}));

const Preloader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorCircularProgress size={150} thickness={5}/>
    </div>
  );
};

export default Preloader;
