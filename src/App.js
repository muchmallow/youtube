import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Menu from "./components/Menu";
import AuthGuard from "./components/AuthGuard";
import Preloader from "./components/Preloader";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={AuthGuard} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/main" component={Menu} />
        <Route exact path="/loader" component={Preloader} />
      </Switch>
    </>
  );
};

export default withRouter(App);
