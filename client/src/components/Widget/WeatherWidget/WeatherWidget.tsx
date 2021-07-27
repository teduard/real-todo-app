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
import { useEffect } from "react";

function WeatherWidget() {
  const [currentWeather, setCurrentWeather] = React.useState<any>({
    city: "...city",
    temp: "...temp",
    desc: "...desc",
    icon: "",
  });
  const [initialFetch, setInitialFetch] = React.useState<Boolean>(false);

  useEffect(() => {
    if (initialFetch === false) {
      fetchWeather();
      setInitialFetch(true);
    }
  });

  function fetchWeather() {
    FetchService.fetchAuth("/api/weather", (data: any) => {
      setCurrentWeather(data);
    });
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
              Today's weather
            </Typography>
            <Box>
              <Typography variant="h4">{currentWeather.desc}</Typography>
              <Typography variant="h5">
                {currentWeather.temp} Celsius
              </Typography>
              <Box alignItems="center" display="flex">
                <Box m="auto">
                  <img src={currentWeather.icon} height="90px" alt="weather" />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Box m="auto">
            <Typography>{currentWeather.city}</Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}

export default WeatherWidget;
