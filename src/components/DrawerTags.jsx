import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { setNewTag, deleteTag, searchVideos } from "../reducers/mainReducer";

const useStyles = makeStyles(() => ({
  root: {
    padding: "0px 11px 23px 16px",
  },
  inputWrapper: {
    display: "block",
    width: "100%",
  },
  input: {
    width: "100%",
    margin: "14px 2px 18px 0",
  },
  inputIcon: {
    color: "#757575",
    "&:hover": {
      color: "#3a8378",
    },
  },
  inputButton: {
    position: "relative",
    top: "-4px",
    left: "10px",
  },
  tagsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    margin: 0,
    padding: 0,
  },
  chip: {
    margin: "2px 2px 2px 2px",
    transition: "0.3s",
    "&:hover": {
      border: "1px solid #3a8378",
    },
  },
}));

const DrawerTags = ({ tags, setNewTag, deleteTag, query, searchVideos }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");

  const handleInput = e => {
    setInputValue(e.target.value.trim());
  };

  const addNewTag = () => {
    if (!tags.includes(inputValue)) {
      setNewTag(inputValue);
      searchVideos(query);
      setInputValue("");
    }
  };

  const handleDelete = tag => () => {
    deleteTag(tag);
    searchVideos(query);
  };

  const tagsToRender = tags.map(tag => (
    <Chip
      key={tag}
      label={tag}
      onDelete={handleDelete(tag)}
      className={classes.chip}
      variant="outlined"
    />
  ));

  return (
    <div className={classes.root}>
      <FormControl className={classes.inputWrapper}>
        <Input
          id="addTag"
          placeholder="Please enter a tag"
          className={classes.input}
          onChange={handleInput}
          value={inputValue}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={addNewTag} className={classes.inputButton}>
                <AddCircleOutlineIcon className={classes.inputIcon} />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div className={classes.tagsWrapper}>{tagsToRender}</div>
    </div>
  );
};

DrawerTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setNewTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  searchVideos: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  tags: state.mainPage.tags,
  query: state.mainPage.query,
});

export default connect(mapStateToProps, {
  setNewTag,
  deleteTag,
  searchVideos
})(DrawerTags);
