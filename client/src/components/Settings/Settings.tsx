import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import UserFront from "@userfront/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  CardHeader,
} from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FetchService from "../../services/fetchservice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

function Settings() {
  const classes = useStyles();
  const [language, setLanguage] = React.useState("");
  const [timezone, setTimezone] = React.useState("");
  const [initialFetch, setInitialFetch] = React.useState<Boolean>(false);

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLanguage(event.target.value as string);
  };

  const handleTimezoneChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTimezone(event.target.value as string);
  };

  useEffect(() => {
    if (initialFetch === false) {
      FetchService.fetchAuth("/api/user/settings", handleSettingsResponse);
      setInitialFetch(true);
    }
  });

  function handleSettingsResponse(data: any) {
    setLanguage(data.language);
    setTimezone(data.timezone);
  }

  function handleFormSubmit(event: React.SyntheticEvent) {
    const payload = {
      language: language,
      timezone: timezone,
    };
    FetchService.postAuth("/api/user/settings", payload, (res: any) => {
      
    });
    event.preventDefault();
  }

  function renderCore(location: string) {
    if (!UserFront.accessToken()) {
      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    }

    return (
      <>
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <Box
            sx={{
              minHeight: "100%",
              py: 3,
            }}
          >
            <Card>
              <CardHeader subheader="Update settings" title="Settings" />
              <Divider />
              <CardContent>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Language
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="timezone-label">Timezone</InputLabel>
                  <Select
                    labelId="timezone"
                    id="timezone"
                    value={timezone}
                    onChange={handleTimezoneChange}
                  >
                    <MenuItem value="gmt-12">GMT -12</MenuItem>
                    <MenuItem value="gmt-11">GMT -11</MenuItem>
                    <MenuItem value="gmt-10">GMT -10</MenuItem>
                    <MenuItem value="gmt-9">GMT -9</MenuItem>
                    <MenuItem value="gmt-8">GMT -8</MenuItem>
                    <MenuItem value="gmt-7">GMT -7</MenuItem>
                    <MenuItem value="gmt-6">GMT -6</MenuItem>
                    <MenuItem value="gmt-5">GMT -5</MenuItem>
                    <MenuItem value="gmt-4">GMT -4</MenuItem>
                    <MenuItem value="gmt-3">GMT -3</MenuItem>
                    <MenuItem value="gmt-2">GMT -2</MenuItem>
                    <MenuItem value="gmt-1">GMT -1</MenuItem>
                    <MenuItem value="gmt">GMT</MenuItem>
                    <MenuItem value="UTC">UTC</MenuItem>
                    <MenuItem value="gmt+1">GMT +1</MenuItem>
                    <MenuItem value="gmt+2">GMT +2</MenuItem>
                    <MenuItem value="gmt+3">GMT +3</MenuItem>
                    <MenuItem value="gmt+4">GMT +4</MenuItem>
                    <MenuItem value="gmt+5">GMT +5</MenuItem>
                    <MenuItem value="gmt+6">GMT +6</MenuItem>
                    <MenuItem value="gmt+7">GMT +7</MenuItem>
                    <MenuItem value="gmt+8">GMT +8</MenuItem>
                    <MenuItem value="gmt+9">GMT +9</MenuItem>
                    <MenuItem value="gmt+10">GMT +10</MenuItem>
                    <MenuItem value="gmt+11">GMT +11</MenuItem>
                    <MenuItem value="gmt+12">GMT +12</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <Button type="submit" color="primary" variant="contained">
                  Update
                </Button>
              </Box>
            </Card>
          </Box>
        </form>
      </>
    );
  }

  return <Route render={renderCore} />;
}

export default Settings;
