import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import drawerImage from "../images/group-9.png";
import { logOut } from "../reducers/mainReducer";

const useStyles = makeStyles({
  root: {
    height: "143px",
    backgroundImage: `url(${drawerImage})`,
    color: "white"
  },
  avatarAndExit: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatar: {
    margin: "16px 0 7px 16px",
    height: "64px",
    width: "64px"
  },
  iconButton: {
    position: "relative",
    color: "white"
  },
  name: {
    margin: "0 0 0 16px",
    fontWeight: 500
  },
  email: {
    margin: "0 0 17px 16px"
  }
});

const DrawerHeader = ({ userInfo, logOut }) => {
  const classes = useStyles();

  const handleClick = () => {
    logOut();
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
    >
      <div className={classes.avatarAndExit}>
        <Avatar className={classes.avatar} src={userInfo.picture}/>
        <IconButton className={classes.iconButton} onClick={handleClick}>
          <ExitToAppIcon/>
        </IconButton>
      </div>
      <Typography variant="body2" className={classes.name}>
        {userInfo.name}
      </Typography>
      <Typography variant="body2" className={classes.email}>
        {userInfo.email}
      </Typography>
    </Grid>
  );
};

DrawerHeader.propTypes = {
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
  }),
  logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userInfo: state.loginPage.decodedToken
});

export default connect(
  mapStateToProps,
  { logOut }
)(DrawerHeader);
