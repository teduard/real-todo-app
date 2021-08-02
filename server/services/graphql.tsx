module.exports.GraphqlRoutes = function () {
  var { graphqlHTTP } = require("express-graphql");
  var { buildSchema } = require("graphql");
  let Parser = require("rss-parser");
  let parser = new Parser();

  // TODO: refactor by adding a cron job that fetches the rss feed hourly and stores it redis
  // TODO: make the categories editable, based on location

  var schema = buildSchema(`
  type Query {
    category(id: Int): Category
    categories: [Category]
    feed: [RssItem]
  }
  
  type Category {
      id: Int
      description: String
      link: String
  }
  type RssItem {
    title: String!
    description: String
    link: String!        
    guid: String
    pubDate: String
    category: Category
  }
`);

  const categories = [
    {
      id: 0,
      description: "Top Stories",
      link: "http://feeds.bbci.co.uk/news/rss.xml",
    },
    {
      id: 1,
      description: "World",
      link: "http://feeds.bbci.co.uk/news/world/rss.xml",
    },
    {
      id: 2,
      description: "UK",
      link: "http://feeds.bbci.co.uk/news/uk/rss.xml",
    },
    {
      id: 3,
      description: "Business",
      link: "http://feeds.bbci.co.uk/news/business/rss.xml",
    },
    {
      id: 4,
      description: "Politics",
      link: "http://feeds.bbci.co.uk/news/politics/rss.xml",
    },
    {
      id: 5,
      description: "Health",
      link: "http://feeds.bbci.co.uk/news/health/rss.xml",
    },
    {
      id: 6,
      description: "Education & Family",
      link: "http://feeds.bbci.co.uk/news/education/rss.xml",
    },
    {
      id: 7,
      description: "Science & Environment",
      link: "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
    },
    {
      id: 8,
      description: "Technology",
      link: "http://feeds.bbci.co.uk/news/technology/rss.xml",
    },
    {
      id: 9,
      description: "Entertainment & Arts",
      link: "http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml",
    },
  ];

  var root = {
    category: ({ id }) => {
      return categories[id];
    },
    categories: () => {
      return categories;
    },
    feed: async () => {
      var ret = new Array();

      for (const cat of categories) {
        await fetchFeed(cat, ret);
      }

      return ret;
    },
  };

  async function fetchFeed(cat, ret) {
    const feed = await parser.parseURL(cat.link);

    var i = 0;
    feed.items.forEach((item) => {
      i++;
      if (i < 5) {
        console.log(item);

        ret.push({
          title: item.title,
          description: item.content,
          link: item.link,
          guid: item.guid,
          pubDate: item.pubDate,
          category: cat,
        });
      }
    });
  }

  return graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  });
};
