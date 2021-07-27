import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import { Button, Hidden } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    customButton: {
      color: "#fff",
    },
  })
);

export default function Footer() {
  const classes = useStyles();
  const year = new Date().getFullYear();

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          ©<Hidden only="xs">&nbsp;Real Todo App</Hidden>
          &nbsp;{year}
          <div className={classes.grow} />
          <Button
            component={Link}
            to="/features"
            className={classes.customButton}
          >
            Features
          </Button>
          |
          <Button
            component={Link}
            to="/contact"
            className={classes.customButton}
          >
            Contact |
          </Button>
          <Button component={Link} to="/about" className={classes.customButton}>
            About
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
