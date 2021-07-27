import {
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  Container,
  Hidden,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import React from "react";
import Helmet from "react-helmet";
import Homepage from "../../assets/homepage.png";
import SimplePaper from "./HomeContent";

class Home extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Real Todo App</title>
        </Helmet>
        <Box
          sx={{
            minHeight: "100%",
            py: 3,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            m={2}
          >
            <Hidden only={["md", "lg", "xl"]}>
              <Typography variant="h3">
                Organize with
                <br />
                Real Todo App
                <br />
              </Typography>
            </Hidden>
            <Hidden only={["xs", "sm"]}>
              <Typography variant="h1">
                Organize with
                <br />
                Real Todo App
                <br />
              </Typography>
            </Hidden>

            <Box m={3} />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/signup"
            >
              Start today
            </Button>

            <Box m={3} />

            <Container maxWidth="sm">
              <img alt="Real Todo App" src={Homepage} width="100%"></img>
            </Container>

            <Box m={2} />
          </Box>
        </Box>
        <SimplePaper />
      </>
    );
  }
}

export default Home;
