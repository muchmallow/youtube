import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import Divider from "@material-ui/core/Divider";
import DrawerFoldersHeader from "./DrawerFoldersHeader";
import CustomListItem from "./CustomListItem";
import { getPlaylistVideos } from "../reducers/mainReducer";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    padding: "2px 16px 2px 16px"
  },
  listItemNested: {
    padding: "2px 16px 2px 72px"
  },
  listItemSelected: {
    padding: "2px 16px 2px 72px",
    backgroundColor: "#60B2A5",
    "&:hover": {
      backgroundColor: "#3a8378"
    }
  },
  listItemIcon: {
    minWidth: "24px",
    margin: "0 10px 0 0",
    color: "#757575"
  },
  foldersHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "49px"
  },
  foldersHeaderLeft: {
    margin: "0 0 0 4px"
  }
}));

const DrawerFolders = ({
                         playlists,
                         selectedPlaylist,
                         getPlaylistVideos
                       }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  let listItems;
  if (playlists) {
    listItems = playlists.map(playlist => (
      <ListItem
        button
        className={
          playlist.id !== selectedPlaylist
            ? classes.listItemNested
            : classes.listItemSelected
        }
        key={playlist.id}
        onClick={() => getPlaylistVideos(playlist.id)}
      >
        <ListItemIcon classes={{ root: classes.listItemIcon }}>
          <FolderIcon/>
        </ListItemIcon>
        <ListItemText primary={playlist.snippet.title}/>
      </ListItem>
    ));
  }

  return (
    <div>
      <DrawerFoldersHeader/>
      <Divider/>
      <List dense>
        <ListItem button onClick={handleClick} className={classes.listItem}>
          <ListItemIcon classes={{ root: classes.listItemIcon }}>
            <FolderIcon/>
          </ListItemIcon>
          <ListItemText primary="My Library"/>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense component="div" disablePadding>
            {listItems}
          </List>
        </Collapse>
        <CustomListItem
          button
          classname={classes.listItem}
          classes={{ root: classes.listItemIcon }}
          primary="Shared"
          type="share"
        />
        <CustomListItem
          button
          classname={classes.listItem}
          classes={{ root: classes.listItemIcon }}
          primary="Unassigned"
          type="unassigned"
        />
        <CustomListItem
          button
          classname={classes.listItem}
          classes={{ root: classes.listItemIcon }}
          primary="Encoding"
          type="encoding"
        />
      </List>
    </div>
  );
};

DrawerFolders.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedPlaylist: PropTypes.string.isRequired,
  getPlaylistVideos: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  playlists: state.mainPage.playlists,
  selectedPlaylist: state.mainPage.selectedPlaylist
});

export default connect(mapStateToProps, {
  getPlaylistVideos
})(DrawerFolders);
