import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { searchVideos } from "../reducers/mainReducer";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: "8px 13px 16px 16px",
    minWidth: 120,
  },
  selectEmpty: {
    padding: "3px 0 0 0",
  },
  label: {
    fontWeight: "500",
    fontSize: "18px",
    color: "black",
    margin: "0",
  },
  disabled: {
    color: "#D2CACA",
  },
}));

const DrawerFilters = ({
  values,
  selected,
  onChange,
  searchVideos,
  query,
  id,
  placeholder,
}) => {
  const classes = useStyles();

  const handleChange = e => {
    onChange(e.target.value);
    searchVideos(query);
  };

  const menuItems = values.map(val => {
    return (
      <MenuItem key={val.value} value={val.value}>
        <Typography>{val.name}</Typography>
      </MenuItem>
    );
  });
  
  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor={id} className={classes.label}>
        {placeholder}
      </InputLabel>
      <Select
        id={id}
        value={Object.keys(selected).length === 0 ? "" : selected[0].value}
        onChange={handleChange}
        displayEmpty
        name={Object.keys(selected).length === 0 ? "None" : selected[0].name}
        className={classes.selectEmpty}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

DrawerFilters.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  selected: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  onChange: PropTypes.func.isRequired,
  searchVideos: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  query: state.mainPage.query,
});

export default connect(mapStateToProps, {
  searchVideos
})(DrawerFilters);
