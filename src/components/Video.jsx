import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import YouTube from "react-youtube";
import { setVideoSelected } from "../reducers/mainReducer";

const useStyles = makeStyles(theme => ({
  listItem: {
    display: "flex",
    maxWidth: "264px",
    maxHeight: "180px",
    padding: 0,
    margin: "0 0 5px 6px",
  },
  img: {
    width: "264px",
    height: "180px",
    cursor: "pointer",
  },
  videoBarRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    margin: "0 16px 0 0",
  },
  title: {
    maxWidth: "190px",
  },
  rootSubtitleHeight: {
    height: "55px",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  iconOk: {
    color: "#31C7AE",
  },
  listItemAlternative: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "350px",
    maxHeight: "80px",
    overflow: "hidden",
    margin: "0 110px 0 2px"
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "0 0 10px 0",
  },
  iconAlternative: {
    position: "relative",
  },
  imgWrapper: {
    display: "flex",
    maxHeight: "64px",
    maxWidth: "93px",
    margin: "0 9px 10px 0",
    cursor: "pointer",
  },
  imgAlternative: {
    height: "64px",
    width: "93px",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "0 0 10px 0",
    cursor: "pointer",
    maxWidth: "191px",
    textOverflow: "ellipsis",
  },
  titleAlternative: {
    fontWeight: 500,
    overflow: "hidden",
    fontSize: "1rem",
    letterSpacing: "-0.03px",
    lineHeight: "24px",
    margin: 0,
    maxWidth: "188px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  subtitleAlternative: {
    fontWeight: 600,
    overflow: "hidden",
    fontSize: "0.75rem",
    letterSpacing: "-0.03px",
    lineHeight: 1,
    margin: 0,
    color: "#000000",
    maxWidth: "188px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: 0,
  },
}));

const Video = ({ id, title, subtitle, onSelect, selected, url, videoId, altView }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const opts = {
    minWidth: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return !altView ? <>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <YouTube videoId={videoId} opts={opts}/>
        </div>
      </Fade>
    </Modal>
    <GridListTile className={classes.listItem} key={id}>
      <img src={url} alt={title} className={classes.img} onClick={handleOpen}/>
      <GridListTileBar
        title={title}
        subtitle={subtitle}
        classes={{
          titleWrapActionPosLeft: classes.videoBarRight,
          rootSubtitle: classes.rootSubtitleHeight,
          title: classes.title,
          subtitle: classes.title,
        }}
        actionIcon={
          <IconButton
            aria-label={`select ${title}`}
            className={classes.icon}
            onClick={() => onSelect(id)}
          >
            {!selected ? (
              <CheckBoxOutlineBlankIcon/>
            ) : (
              <CheckBoxIcon className={classes.iconOk}/>
            )}
          </IconButton>
        }
        actionPosition="left"
      />
    </GridListTile>
  </> : <div className={classes.listItemAlternative} key={id}>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <YouTube videoId={videoId} opts={opts}/>
        </div>
      </Fade>
    </Modal>
    <div className={classes.iconWrapper}>
      <IconButton aria-label={`selected ${title}`}
                  className={classes.iconAlternative}
                  onClick={() => onSelect(id)}>
        {!selected ? <CheckBoxOutlineBlankIcon/> : <CheckBoxIcon className={classes.iconOk}/>}
      </IconButton>
    </div>
    <div className={classes.imgWrapper} onClick={handleOpen}>
      <img src={url} alt={title} className={classes.imgAlternative}/>
    </div>
    <div className={classes.titleWrapper} onClick={handleOpen}>
      <p className={classes.titleAlternative}>{title}</p>
      <p className={classes.subtitleAlternative}>{subtitle}</p>
    </div>
  </div>;
};

Video.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  altView: PropTypes.bool.isRequired,
};

export default connect(
  null,
  {
    setVideoSelected,
  },
)(Video);
