import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ErrorsHandler from "./ErrorsHandler";
import { getAuthLink } from "../reducers/loginReducer";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    margin: "15% 20% 0 20%"
  },
  input: {
    margin: "0 0 1% 0"
  },
  hasError: {
    margin: "0 0 1% 0"
  },
  submit: {
    border: "none",
    height: "30px",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "rgba(38, 186, 67, 0.75)",
      color: "white"
    }
  }
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("It should be a valid e-mail adress")
    .min(4, "Enter a correct e-mail")
    .max(255, "Must be shorter then 255 symbols")
    .required("You must enter an e-mail")
});

const LoginPage = ({ isAuth, getAuthLink }) => {
  const classes = useStyles();

  if (isAuth) {
    return <Redirect to="/main"/>;
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        getAuthLink(values.email);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.container}>
            <label htmlFor="email">E-mail</label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your E-mail"
              className={
                touched.email && errors.email ? classes.hasError : classes.input
              }
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <ErrorsHandler touched={touched.email} message={errors.email}/>
            <button
              type="submit"
              className={classes.submit}
              disabled={isSubmitting}
            >
              Login with Google
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

LoginPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  getAuthLink: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.loginPage.isAuth
});

export default connect(
  mapStateToProps,
  { getAuthLink }
)(LoginPage);
