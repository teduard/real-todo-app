import React from "react";

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
  Grid,
  Tabs,
  Tab,
  Typography,
  CardHeader,
} from "@material-ui/core";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

function LatestNews() {
  const [latestNews, setLatestNews] = React.useState<any>(null);
  const [initialFetch, setInitialFetch] = React.useState<Boolean>(false);
  const [tabValue, setTabValue] = React.useState(0);

  const handleCategoryChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setTabValue(newValue);
  };
  const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
  });

  interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  React.useEffect(() => {
    if (initialFetch === false) {
      setInitialFetch(true);

      client
        .query({
          query: gql`
            {
              categories {
                id
                description
                link
              }
              feed {
                title
                link
                pubDate
                description
                category {
                  id
                }
              }
            }
          `,
        })
        .then((result) => {
          setLatestNews(result);
        });
    }
  });

  const tabs =
    latestNews != null &&
    latestNews.data.categories.map((value: any) => {
      return <Tab label={value.description} key={value.id} />;
    });

  const fetchRssFeed = (id: any) => {
    const feed = latestNews.data.feed.map((item: any) => {
      if (item.category.id == id) {
        return (
          <>
            <a href={item.link} target="_blank">
              <b>{item.title}</b>
            </a>
            <br />
            {item.description}
            <br /> <i>- {item.pubDate}</i>
            <Box m={3} />
            <Divider />
          </>
        );
      }
    });

    return <> {feed}</>;
  };

  const tabPanels =
    latestNews != null &&
    latestNews.data.categories.map((value: any) => {
      return (
        <TabPanel value={tabValue} index={value.id} key={value.id}>
          {fetchRssFeed(value.id)}
        </TabPanel>
      );
    });

  return (
    <>
      <Box
        sx={{
          minHeight: "100%",
          py: 3,
        }}
      >
        <Card>
          <CardHeader
            subheader="Check Real-todo-app latest news"
            title="Latest News"
          />
          <Divider />
          <CardContent>
            <Grid container>
              <Grid item xs={4}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={tabValue}
                  onChange={handleCategoryChange}
                  aria-label="Vertical tabs example"
                >
                  {tabs}
                </Tabs>
              </Grid>

              <Grid item xs={8}>
                {tabPanels}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default LatestNews;
