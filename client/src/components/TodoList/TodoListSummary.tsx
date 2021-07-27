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
import FetchService from "../../services/fetchservice";
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

function TodoListSummary() {
  const [listSummary, setListSummary] = React.useState<Array<number>>([0, 0]);
  const [initialFetch, setInitialFetch] = React.useState<Boolean>(false);

  useEffect(() => {
    if (initialFetch === false) {
      fetchTodoSummary();
      setInitialFetch(true);
    }
  });

  function fetchTodoSummary() {
    FetchService.fetchAuth("/items/summary", (data: Array<number>) => {
      setListSummary(data);
    });
  }

  const data = {
    labels: ["Active", "Completed"],
    datasets: [
      {
        label: "Todo List Overview",
        data: [listSummary[0], listSummary[1]],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const user = {
    avatar: UserFront.user.image,
    name: UserFront.user.name,
    email: UserFront.user.email,
  };

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
              Todo List Summary
            </Typography>
            <Box
              sx={{
                height: 170,
                position: "relative",
              }}
            >
              <Doughnut data={data} options={config} />
            </Box>
            <Box>
              <Typography>
                Active: {listSummary[0]} | Completed: {listSummary[1]}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" fullWidth component={Link} to="/todoList">
            See todos
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default TodoListSummary;
