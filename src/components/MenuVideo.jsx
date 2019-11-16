import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Typography } from "@material-ui/core";
import {
  setVideoSelected,
  setAllSelected,
  setAllUnselected,
} from "../reducers/mainReducer";
import Video from "./Video";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    margin: "0 0 5px 0",
  },
  gridList: {
    maxWidth: "100%",
    margin: "0 auto",
  },
  iconOkAll: {
    color: "#31C7AE",
  },
  videoSelect: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  // subheaderIcon: {
  //   color: "#010101",
  //   opacity: "0.54",
  // },
  subheaderGutters: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: "0 12px 0 0",
    color: "rgba(0, 0, 0, 0.87)",
  },
}));

const MenuVideo = ({
                     videos,
                     setVideoSelected,
                     setAllSelected,
                     setAllUnselected,
                     altView,
                   }) => {
  const classes = useStyles();

  const selectedItemsCount = videos.reduce((accum, video) => {
    if (video.selected) {
      return accum + 1;
    }
    return accum;
  }, 0);

  const isAllSelected =
    selectedItemsCount === videos.length && selectedItemsCount > 0;

  const listItems = videos.map(video => (
    <Video
      key={video.etag}
      id={video.etag}
      url={video.snippet.thumbnails.high.url}
      title={video.snippet.title}
      subtitle={video.snippet.description}
      onSelect={setVideoSelected}
      selected={video.selected}
      videoId={video.id.videoId}
      altView={altView}
    />
  ));

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile
          key="Subheader"
          cols={2}
          style={{ height: "auto" }}
          classes={{ tile: classes.videoSelect }}
        >
          <IconButton
            onClick={isAllSelected ? setAllUnselected : setAllSelected}
          >
            {isAllSelected ? (
              <CheckBoxIcon className={classes.iconOkAll}/>
            ) : (
              <CheckBoxOutlineBlankIcon/>
            )}
          </IconButton>
          <ListSubheader
            component="div"
            classes={{ gutters: classes.subheaderGutters }}
          >
            <Typography variant="body1" component="p">
              Select All
            </Typography>
            <Typography variant="subtitle2" component="p">
              {selectedItemsCount} item(s) selected
            </Typography>
          </ListSubheader>
        </GridListTile>
        {listItems}
      </GridList>
    </div>
  );
};

MenuVideo.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.any).isRequired,
  setVideoSelected: PropTypes.func.isRequired,
  setAllSelected: PropTypes.func.isRequired,
  setAllUnselected: PropTypes.func.isRequired,
  altView: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  videos: state.mainPage.videos,
});

export default connect(
  mapStateToProps,
  {
    setVideoSelected,
    setAllSelected,
    setAllUnselected,
  },
)(MenuVideo);
