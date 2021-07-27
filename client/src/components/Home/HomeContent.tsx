import React from "react";
import Simple from "../../assets/simple.png";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Button,
  Grid,
  Container,
  Divider,
} from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#eee",
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
      },
    },
  })
);

export default function HomeContent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignContent="center">
        <Grid item sm={6}>
          <Box height="300px">
            <Typography variant="h4">Free your day</Typography>
            <br />
            <Typography variant="h5">
              Gain time by having your tasks transfered into your todo list.
            </Typography>
            <Typography variant="h6">
              Make your updates from any device, simple and easy.
            </Typography>
            <Box m={3} />
            <Divider />
            <Box m={3} />
            <Button component={Link} to="/features" color="primary">See full list of features</Button>
          </Box>
        </Grid>

        <Grid item sm={6}>
          <Box>
            <Container maxWidth="xs">
              <img alt="Real Todo App" src={Simple} width="100%"></img>
            </Container>
          </Box>
        </Grid>
      </Grid>

      <br />
    </div>
  );
}
