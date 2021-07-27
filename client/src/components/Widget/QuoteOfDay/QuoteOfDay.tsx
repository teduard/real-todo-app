import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import FetchService from "../../../services/fetchservice";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import UserFront from "@userfront/react";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import moment from "moment";

function QuoteOfDay() {
  const [listSummary, setListSummary] = React.useState<Array<number>>([0, 0]);
  const [initialFetch, setInitialFetch] = React.useState<Boolean>(false);

  const [todayQuote, setTodayQuote] = React.useState<any>({
    quote: "...",
    author: "...",
    today: moment().format("MMM Do YY"),
  });

  useEffect(() => {
    if (initialFetch === false) {
      fetchTodayQuote();
      setInitialFetch(true);
    }
  });

  function fetchTodayQuote() {
    FetchService.fetchAuth("/api/todayQuote", (data:any) =>
    {
      var q = {
        quote: data.quote,
        author: data.author,
        today: moment().format("MMM Do YY"),
      };
      setTodayQuote(q);
    })
  }

  return (
    <Box
      sx={{
        minHeight: "100%",
        py: 3,
      }}
    >
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography color="textSecondary" variant="body1">
              Today's Quote
            </Typography>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Typography variant="h6">{todayQuote.quote}</Typography>
              <Typography variant="h6">- by {todayQuote.author}</Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Box m="auto">
            <Typography>{todayQuote.today}</Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}

export default QuoteOfDay;
