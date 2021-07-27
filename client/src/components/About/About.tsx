import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import Helmet from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

class About extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>About</title>
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
            <Box m={4} />
            <Typography variant="h3">About</Typography>
            <Box m={4} />
            
            <Typography>The goal of this application is be a complete guide for building a secure, production-ready Todo List.</Typography>

            <Typography>
              Both the frontend and backend are developed entirely using Javascript, and deployed using 
              the <a target="_blank" href="https://wwww.heroku.com">Heroku</a> platform.
            </Typography>
            <Box m={2} />

            <Typography>Please see all development details in the github repo: <a target="_blank" href="https://github.com/teduard/real-todo-app.git">github</a></Typography>

            <Box m={4} />
            <Button color="primary" component={Link} to="/">
              Go to homepage
            </Button>

            <Box m={3} />
          </Box>
        </Box>
      </>
    );
  }
}

export default About;
