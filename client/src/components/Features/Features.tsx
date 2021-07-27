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
import FeatureList from "./FeatureList";

class Features extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Features</title>
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
            <Typography variant="h3">Features</Typography>
            <Box m={2} />
            <FeatureList/>

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

export default Features;
