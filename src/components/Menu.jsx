import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PropTypes from "prop-types";
import DrawerComponent from "./Drawer";
import MenuSearch from "./MenuSearch";
import { getPlaylists, searchVideos } from "../reducers/mainReducer";
import MenuVideo from "./MenuVideo";
import MenuHeader from "./MenuHeader";

const drawerWidth = 315;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  wrapper: {
    maxWidth: "1440px",
    flexGrow: 1,
    display: "flex",
    margin: "0 auto",
    position: "relative",
  },
  appBar: {
    backgroundColor: "#3a8378",
    height: "51px",
    justifyContent: "center",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  mainHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: "0 20px 0 20px",
    backgroundColor: "#ffffff",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Menu = ({ isAuth, getPlaylists, searchVideos }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [altView, setAltView] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    getPlaylists();
    searchVideos("Apple");
  }, []);

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            {open ? (
              <IconButton
                onClick={handleClick}
                color="inherit"
                edge="start"
                className={classes.menuButton}
              >
                {theme.direction === "ltr" && <ChevronLeftIcon />}
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleClick}
                edge="start"
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography className={classes.title} variant="h6" noWrap>
              Logo
            </Typography>
            <MenuSearch searchVideos={searchVideos} />
          </Toolbar>
        </AppBar>
        <DrawerComponent open={open} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.mainHeader} />
          <MenuHeader altView={altView} setAltView={setAltView}/>
          <MenuVideo altView={altView}/>
        </main>
      </div>
    </div>
  );
};

Menu.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  getPlaylists: PropTypes.func.isRequired,
  searchVideos: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuth: state.loginPage.isAuth,
});

export default connect(
  mapStateToProps,
  {
    getPlaylists,
    searchVideos,
  },
)(Menu);
