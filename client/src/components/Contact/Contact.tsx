import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Container,
} from "@material-ui/core";
import Helmet from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import FetchService from "../../services/fetchservice";

import { useHistory } from "react-router-dom";

function Contact() {
  const history = useHistory();
  const [formName, setFormName] = React.useState("");
  const [formNameError, setFormNameError] = React.useState<string | null>(null);
  const [formEmail, setFormEmail] = React.useState("");
  const [formEmailError, setFormEmailError] = React.useState<string | null>(
    null
  );
  const [formSubject, setFormSubject] = React.useState("");
  const [formSubjectError, setFormSubjectError] = React.useState<string | null>(
    null
  );
  const [formMessage, setFormMessage] = React.useState("");
  const [formMessageError, setFormMessageError] = React.useState<string | null>(
    null
  );

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let error = false;

    // clear all previous errors
    setFormEmailError(null);
    setFormNameError(null);
    setFormMessageError(null);
    setFormSubjectError(null);

    if (!formName || !formName.trim() || formName.length < 3) {
      setFormNameError("Please enter at least three character for the name.");
      error = true;
    }

    if (!formEmail || !formEmail.trim() || validateEmail(formEmail) === false) {
      setFormEmailError("Please enter a valid email address.");
      error = true;
    }

    if (!formSubject || !formSubject.trim() || formSubject.length < 3) {
      setFormSubjectError(
        "Please enter at least three characters for the subject."
      );
      error = true;
    }
    if (!formMessage || !formMessage.trim()) {
      setFormMessageError("Please enter a message.");
      error = true;
    }

    if (!error) {
      let message = {
        name: formName,
        email: formEmail,
        subject: formSubject,
        message: formMessage,
      };
      //sent contact form
      FetchService.postAuth("/api/contactForm", message, () => {
        history.push("/contactMessageSent");
      });
    }
  };

  const handleFormName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormName(event.target.value as string);
  };
  const handleFormEmail = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormEmail(event.target.value as string);
  };
  const handleFormSubject = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormSubject(event.target.value as string);
  };
  const handleFormMessage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormMessage(event.target.value as string);
  };

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

          <form autoComplete="off" onSubmit={handleFormSubmit}>
            <Container maxWidth="md">
              <FormControl fullWidth>
                <TextField
                  id="form-name"
                  label="Name"
                  fullWidth
                  onChange={handleFormName}
                  value={formName}
                />
                {formNameError != null && (
                  <Typography variant="body2" style={{ color: "red" }}>
                    {formNameError}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth>
                <Box m={1}></Box>
                <TextField
                  id="form-email"
                  label="Email"
                  fullWidth
                  onChange={handleFormEmail}
                  value={formEmail}
                />
                {formEmailError != null && (
                  <Typography variant="body2" style={{ color: "red" }}>
                    {formEmailError}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth>
                <Box m={1}></Box>
                <TextField
                  id="form-subject"
                  label="Subject"
                  fullWidth
                  onChange={handleFormSubject}
                  value={formSubject}
                />
                {formSubjectError != null && (
                  <Typography variant="body2" style={{ color: "red" }}>
                    {formSubjectError}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth>
                <Box m={1}></Box>
                <TextField
                  id="form-message"
                  label="Message"
                  multiline
                  rows={10}
                  fullWidth
                  variant="filled"
                  onChange={handleFormMessage}
                  value={formMessage}
                />
                {formMessageError != null && (
                  <Typography variant="body2" style={{ color: "red" }}>
                    {formMessageError}
                  </Typography>
                )}
              </FormControl>
            </Container>

            <Box m={4}></Box>
            <FormControl fullWidth>
              <Box m="auto">
                <Button color="primary" variant="contained" type="submit">
                  Send message
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default Contact;
