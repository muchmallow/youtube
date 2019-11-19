import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import DrawerHeader from "./DrawerHeader";
import DrawerFilters from "./DrawerFilters";
import DrawerTags from "./DrawerTags";
import DrawerFolders from "./DrawerFolders";
import { setType, setPublishedAfter, setOrder } from "../reducers/mainReducer";

const drawerWidth = 315;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    border: "none",
    // borderRight: "1px solid rgba(60, 56, 56, 0.1)"
  },
  drawerHeader: {
    display: "flex",
    flexDirection: "column",
    height: "143px",
    alignItems: "center",
    padding: theme.spacing(0, 0),
    ...theme.mixins.toolbar,
    justifyContent: "center"
  },
  breaker: {
    backgroundColor: "#3a8378",
    height: "40px",
    color: "white",
    padding: "12px 260px 12px 16px"
  }
}));

const DrawerComponent = ({
                           open,
                           setType,
                           setPublishedAfter,
                           setOrder,
                           searchType,
                           publishedAfter,
                           order,
                           searchTypeSelected,
                           publishedAfterSelected,
                           orderSelected
                         }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <DrawerHeader/>
      </div>
      <div className={classes.breaker}>
        <Typography variant="body2">Filters</Typography>
      </div>
      <DrawerFilters
        values={searchType}
        selected={searchTypeSelected}
        onChange={setType}
        id="typePlaceholder"
        placeholder="Type"
      />
      <DrawerFilters
        values={publishedAfter}
        selected={publishedAfterSelected}
        onChange={setPublishedAfter}
        id="publishedAfterPlaceholder"
        placeholder="Publication date"
      />
      <DrawerFilters
        values={order}
        selected={orderSelected}
        onChange={setOrder}
        id="orderPlaceholder"
        placeholder="Order"
      />
      <div className={classes.breaker}>
        <Typography variant="body2">Tags</Typography>
      </div>
      <DrawerTags/>
      <div className={classes.breaker}>
        <Typography variant="body2">Folders</Typography>
      </div>
      <DrawerFolders/>
    </Drawer>
  );
};

Drawer.propTypes = {
  searchType: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  publishedAfter: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  order: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  searchTypeSelected: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  publishedAfterSelected: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string)
  ),
  orderSelected: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
};

const mapStateToProps = (state) => ({
  searchType: state.mainPage.searchType,
  publishedAfter: state.mainPage.publishedAfter,
  order: state.mainPage.order,
  searchTypeSelected: state.mainPage.searchTypeSelected,
  publishedAfterSelected: state.mainPage.publishedAfterSelected,
  orderSelected: state.mainPage.orderSelected
});

export default connect(mapStateToProps, {
  setType,
  setPublishedAfter,
  setOrder
})(DrawerComponent);
