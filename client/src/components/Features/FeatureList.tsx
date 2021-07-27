import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {Container } from "@material-ui/core";
import LoginImage from "../../assets/login.png";
import DashboardImage from "../../assets/dashboard.png";
import I18NImage from "../../assets/i18n.png";
import QuoteImage from "../../assets/todayQuote.png";
import TodosImage from "../../assets/todos.png";
import TodoSummaryImage from "../../assets/todo_summary.png";
import WeatherImage from "../../assets/weather.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    avatar: {
      width: "100px",
      height: "100px",
      border: "1px solid #ccc",
      margin: "0px 25px",
    },
  })
);

const listData = [
  {
    image: LoginImage,
    title: "Secure login",
    description:
      "The application allows users to sign up, login and see their personalized dashboard and todo list. This is performed through JWT.",
  },
  {
    image: TodosImage,
    title: "Todo list",
    description:
      "The todo list is persistent through the use of a postgresql database. The user can perform full CRUD operations on them.",
  },
  {
    image: DashboardImage,
    title: "Customized Dashboard",
    description:
      "Once logged in, the user will be presented with a personalized Dashboard containing settings, todo summary and some widgets.",
  },
  {
    image: TodoSummaryImage,
    title: "Summary of your todo items",
    description:
      "A summary of your todo list will be presented through the use of charts.js library.",
  },
  {
    image: WeatherImage,
    title: "Weather widget",
    description:
      "Geo-location based on ip is performed on the backend and then a weather service is called, in order to display the data.",
  },
  {
    image: QuoteImage,
    title: "Today's quote widget",
    description:
      "The backend also takes care of calling an external API that provides a new quote each day. Caching is implemented using Redis.",
  },
  {
    image: I18NImage,
    title: "Internationalization",
    description:
      "In order to make the application globally accessible, the i18n library has been used. This makes sure that additional languages cand be made available as needed.",
  },
];

export default function FeatureList() {
  const classes = useStyles();

  const features = listData.map((item: any) => {
    let key = item.title;
    let avatarKey = item.title + ".avatar";
    let itemTextKey = item.title + ".itemText";
    return (
      <>
        <ListItem key={key} alignItems="flex-start">
          <ListItemAvatar key={avatarKey}>
            <Avatar
              className={classes.avatar}
              alt="Secure login"
              src={item.image}
            />
          </ListItemAvatar>
          <ListItemText
            key={itemTextKey}
            primary={item.title}
            secondary={<React.Fragment>{item.description}</React.Fragment>}
          />
        </ListItem>
      </>
    );
  });

  return (
    <>
      <Container maxWidth="lg">
        <List className={classes.root}>{features}</List>
      </Container>
      <a target="_blank" href="https://github.com/teduard/real-todo-app.git">See all details on github</a>
    </>
  );
}
