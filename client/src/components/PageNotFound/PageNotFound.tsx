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

class PageNotFound extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Real Todo App - Page not found</title>
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
            <Typography variant="h1">404</Typography>
            <Box m={4} />
            <Typography variant="h5">
              This is not the page your are looking for.
            </Typography>
            <Box m={1} />
            <Typography variant="h5">
              It appears that this section does not exit.
            </Typography>
            <Box m={2} />

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

export default PageNotFound;
