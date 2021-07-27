import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  FormControl,
  Container,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Helmet from "react-helmet";

function ContactMessageSent() {
  return (
    <>
      <Helmet>
        <title>Contact</title>
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
          <Typography variant="h3">Contact us</Typography>
          <Box m={4} />
          <Typography variant="body1">
            Thank you for your message, we'll look into it shortly.
          </Typography>
          <Box m={4} />
          <Button color="primary" component={Link} to="/">
            Go to homepage
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ContactMessageSent;
