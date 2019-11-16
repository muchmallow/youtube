import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DrawerFoldersOption from "./DrawerFoldersOption";
import { createPlaylist, editPlaylist, deletePlaylist } from "../reducers/mainReducer";

const useStyles = makeStyles(() => ({
  foldersHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "49px",
  },
  foldersHeaderLeft: {
    margin: "0 0 0 4px",
  },
}));

const DrawerFoldersHeader = ({
  createPlaylist,
  selectedPlaylist,
  editPlaylist,
  deletePlaylist,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.foldersHeader}>
      <div className={classes.foldersHeaderLeft}>
        <DrawerFoldersOption
          onSubmit={createPlaylist}
          type="addPlaylist"
          text="To add a new playlist, please enter its title and save changes."
          title="Add Playlist"
          label="Name of the new playlist"
        />
        <DrawerFoldersOption
          selected={selectedPlaylist}
          onSubmit={editPlaylist}
          type="editPlaylist"
          text="To edit your playlist, please enter the new title and save changes."
          title="Edit Playlist"
          label="New name of the playlist"
        />
        <IconButton>
          <ShareIcon />
        </IconButton>
      </div>
      <IconButton onClick={() => deletePlaylist(selectedPlaylist)} disabled={selectedPlaylist === ""}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

DrawerFoldersHeader.propTypes = {
  selectedPlaylist: PropTypes.string.isRequired,
  createPlaylist: PropTypes.func.isRequired,
  editPlaylist: PropTypes.func.isRequired,
  deletePlaylist: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  selectedPlaylist: state.mainPage.selectedPlaylist,
});

export default connect(mapStateToProps, {
  createPlaylist,
  editPlaylist,
  deletePlaylist
})(DrawerFoldersHeader);
