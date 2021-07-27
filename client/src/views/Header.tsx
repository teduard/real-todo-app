import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserFront from "@userfront/react";
import Logo from "../components/Logo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Hidden,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Users as UsersIcon, List as TodoListIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    top: 0,
    bottom: "auto",
  },
}));

function Header() {
  const classes = useStyles();
  const appBarButtons = !UserFront.accessToken() ? (
    <>
      <Button color="inherit" component={Link} to="/signup">
        Sign Up
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    </>
  ) : (
    <>
      <Button component={Link} to="/dashboard">
        <UsersIcon color="white" />
      </Button>

      <Button component={Link} to="/todoList">
        <TodoListIcon color="white" />
      </Button>
      <Button color="inherit" onClick={UserFront.logout}>
        Logout
      </Button>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Logo />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Hidden only={"xs"}>Real Todo App</Hidden>
          </Typography>

          {appBarButtons}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default Header;
