import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import PasswordReset from "../components/PasswordReset/PasswordReset";
import Dashboard from "../components/Dashboard/Dashboard";
import SignUp from "../components/SignUp/SignUp";
import Logout from "../components/Logout/Logout";
import Settings from "../components/Settings/Settings";
import TodoList from "../components/TodoList/TodoList";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import Features from "../components/Features/Features";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import ContactMessageSent from "../components/Contact/ContactMessageSent";

import { Toolbar } from "@material-ui/core";

class Navigation extends React.Component {
  render() {
    return (
      <>
        <Toolbar />
        <Switch>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/reset">
            <PasswordReset />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/todoList">
            <TodoList />
          </Route>
          <Route exact path="/features">
            <Features />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/contactMessageSent">
            <ContactMessageSent />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </>
    );
  }
}

export default Navigation;
