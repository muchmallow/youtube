import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import { Formik } from "formik";

const useStyles = makeStyles(() => ({
  btnsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    padding: "6px 35px 6px 35px",
  },
}));

const DrawerFoldersOption = ({ selected, onSubmit, type, text, title, label }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton onClick={handleClick} disabled={type === "editPlaylist" && selected === ""}>
        {typeof(selected) === "undefined" ? <AddCircleOutlineIcon /> : <EditIcon />}
      </IconButton>
      <Dialog open={open} onClose={handleClick} aria-labelledby={type}>
        <DialogTitle id={type}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          <Formik
            initialValues={{ playlist: "" }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              if (selected) {
                onSubmit(selected, values.playlist);
              } else {
                onSubmit(values.playlist);
              }
              resetForm();
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  className={classes.textField}
                  autoFocus
                  margin="dense"
                  id="playlist"
                  name="playlist"
                  label={label}
                  type="text"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type}
                />
                <div className={classes.btnsContainer}>
                  <Button
                    onClick={handleClick}
                    color="primary"
                    className={classes.btn}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={classes.btn}
                    type="submit"
                    onClick={handleClick}
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

DrawerFoldersOption.propTypes = {
  selected: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DrawerFoldersOption;
