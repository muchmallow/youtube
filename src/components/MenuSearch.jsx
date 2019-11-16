import React from "react";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  iconButton: {
    color: "#fff",
    opacity: "0.54",
    top: "1px",
    "&:hover": {
      opacity: "1",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 80,
      "&:focus": {
        width: 200,
      },
    },
  },
}));

const MenuSearch = ({ searchVideos }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ globalSearch: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const query = values.globalSearch;
        searchVideos(query);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.search}>
            <InputBase
              id="globalSearch"
              type="text"
              name="globalSearch"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.globalSearch}
              inputProps={{ "aria-label": "search" }}
              startAdornment={
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    disabled={isSubmitting}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

MenuSearch.propTypes = {
  searchVideos: PropTypes.func.isRequired,
};

export default MenuSearch;
