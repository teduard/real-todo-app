import React from "react";
import UserFront from "@userfront/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import { Container, Grid } from "@material-ui/core";
import AccountProfile from "../AccountProfile/AccountProfile";
import TodoListSummary from "../TodoList/TodoListSummary";
import Settings from "../Settings/Settings";
import QuoteOfDay from "../Widget/QuoteOfDay/QuoteOfDay";
import WeatherWidget from "../Widget/WeatherWidget/WeatherWidget";

function Dashboard() {
  function renderCore(location: string) {
    if (!UserFront.accessToken()) {
      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    }
    return (
      <>
        <Helmet>
          <title>Personal Dashboard</title>
        </Helmet>

        <Container maxWidth="lg">
          <Grid container spacing={2} alignContent="center">
            <Grid item xs={12} md={3}>
              <AccountProfile />
            </Grid>
            <Grid item xs={12} md={3}>
              <TodoListSummary />
            </Grid>
            <Grid item xs={12} md={3}>
              <QuoteOfDay />
            </Grid>
            <Grid item xs={12} md={3}>
              <WeatherWidget />
            </Grid>
          </Grid>
          <Settings />
        </Container>
      </>
    );
  }

  return <Route render={renderCore} />;
}

export default Dashboard;
