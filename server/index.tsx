const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const database = require("./services/database.tsx");
const bodyParser = require("body-parser");
const { lookup } = require("geoip-lite");
const nodeFetch = require("node-fetch");
const nodemailer = require("nodemailer");
const RedisClient = require("./services/RedisClient.js");
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";
dotenv.config();
const app = express();
const statusMonitor = require("express-status-monitor")();
// TODO: add basic authentication for the /status route
app.use(statusMonitor);
app.use(cors());
app.use(bodyParser.json());

const pgclient = database.DB();

const getItems = (request, response) => {
  pgclient.query(
    "SELECT * FROM items where userid = $1 order by id desc",
    [request.auth.userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

function authenticateToken(req, res, callback) {
  // Read the JWT access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // Return 401 if no token

  jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, (err, verifiedJwt) => {
    if (err) {
      res.send(err.message);
    } else {
      req.auth = verifiedJwt;
      callback(res);
    }
  });
}

app.get("/api/todayQuote", (req, res) => {
  authenticateToken(req, res, (res) => {
    var quoteUrl = process.env.TODAY_QUOTE_URL;
    var cd = new Date();
    var quoteKey = [
      "todayQuote",
      cd.getDate(),
      cd.getMonth() + 1,
      cd.getFullYear(),
    ].join("-");

    RedisClient.client.get(quoteKey, (err, reply) => {
      if (err) {
        // key does not exist, or connection failed
        // TODO: refactor redis client so that it auto-connects
        console.log(err);
      } else {
        if (reply == null) {
          nodeFetch(quoteUrl)
            .then((response) => response.json())
            .then((data) => {
              RedisClient.client.set(
                quoteKey,
                JSON.stringify({
                  quote: data[0].q,
                  author: data[0].a,
                })
              );

              res.json({
                quote: data[0].q,
                author: data[0].a,
              });
            });
        } else {
          // key exists
          res.json(JSON.parse(reply));
        }
      }
    });
  });
});

app.get("/api/weather", (req, res) => {
  authenticateToken(req, res, (res) => {
    var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (isProduction == false) {
      ip = process.env.LOCAL_IP;
    }

    var cd = new Date();
    var weatherKey = [
      ip,
      cd.getDate(),
      cd.getMonth() + 1,
      cd.getFullYear(),
      cd.getHours(),
    ].join("-");

    RedisClient.client.get(weatherKey, (err, reply) => {
      if (err) {
        // key does not exist, or connection failed
        // TODO: refactor redis client so that it auto-connects
        console.log(err);
      } else {
        if (reply == null) {
          var location = lookup(ip);
          if (location) {
            var lat = location.ll[0];
            var lon = location.ll[1];
            var city = location.city;

            var weather_url = process.env.WEATHER_URL.replace(
              "{lat}",
              lat
            ).replace("{lon}", lon);
            // get weather
            var weather = nodeFetch(weather_url)
              .then((response) => response.json())
              .then((data) => {
                var result = {
                  city: city,
                  temp: data.main.temp,
                  desc:
                    data.weather[0].description.charAt(0).toUpperCase() +
                    data.weather[0].description.slice(1),
                  icon:
                    "http://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    "@2x.png",
                };

                RedisClient.client.set(weatherKey, JSON.stringify(result));

                res.json(result);
              });
          } else {
            res.json({ error: "unable to get location" });
          }
        } else {
          res.json(JSON.parse(reply));
        }
      }
    });
  });
});

app.get("/api/user/settings", (req, res) => {
  authenticateToken(req, res, (res) => {
    pgclient.query(
      "SELECT * FROM settings where userId=($1)",
      [req.auth.userId],
      (error, results) => {
        if (error) {
          throw error;
        }

        if (results.rowCount === 1) {
          res.json({
            language: results.rows[0].language,
            timezone: results.rows[0].timezone,
          });
        } else {
          res.json({
            language: "",
            timezone: "",
          });
        }
      }
    );
  });
});

app.post("/api/user/settings", (req, res) => {
  authenticateToken(req, res, (res) => {
    pgclient.query(
      "SELECT * FROM settings where userId=($1)",
      [req.auth.userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rowCount === 0) {
          //new insert
          pgclient.query(
            "INSERT INTO settings(userId, language, timezone) VALUES($1, $2, $3)",
            [req.auth.userId, req.body.language, req.body.timezone],
            (error) => {
              if (error) {
                throw error;
              } else {
                res.status(200).json({ message: "insert ok" });
              }
            }
          );
        } else {
          // update existing
          pgclient.query(
            "UPDATE settings set language = $2, timezone = $3 where userId = $1",
            [req.auth.userId, req.body.language, req.body.timezone],
            (error) => {
              if (error) {
                throw error;
              } else {
                res.status(200).json({ message: "update ok" });
              }
            }
          );
        }
      }
    );
  });
});

app.post("/api/contactForm", async (req, res) => {
  if (!req.subject && !req.email && !req.name && !req.message) {
    //TODO: Perform extra checks on the email info

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_SMTP_SERVER,
      port: process.env.MAIL_SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from: '"Real Todo App - ' + req.body.name + '" <' + req.body.email + ">",
      to: process.env.MAIL_RECEIVER_EMAIL,
      subject: "Real Todo app contact form: " + req.body.subject,
      text: "Message from " + req.body.email + ": " + req.body.message,
    });
    //TODO: check info for errors

    res.json({ message: "Message has been sent", success: true });
  } else {
    res.json({ message: "Invalid contact form fields", success: false });
  }
});

app.get("/items/all", (req, res) => {
  authenticateToken(req, res, (res) => {
    getItems(req, res);
  });
});

app.get("/items/summary", (req, res) => {
  authenticateToken(req, res, (res) => {
    pgclient.query(
      "SELECT active, completed from \
      (SELECT COUNT(*) as active FROM items where \
      userid = $1 AND status = 'Active') f1,\
       \
      (SELECT COUNT(*) as completed FROM items WHERE \
      userid = $1 AND status = 'Completed') f2",
      [req.auth.userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        var data = new Array();

        data.push(results.rows[0]["active"]);
        data.push(results.rows[0]["completed"]);

        res.json(data);
      }
    );
  });
});

app.post("/items/add", (req, res) => {
  authenticateToken(req, res, (res) => {
    pgclient.query(
      "INSERT INTO items(userid, todo, description, status) VALUES($1, $2, $3, $4)",
      [req.auth.userId, req.body.newItem, "", "Active"],
      (error) => {
        if (error) {
          throw error;
        }
        res.json("new item was inserted");
      }
    );
  });
});

app.post("/items/delete", (req, res) => {
  authenticateToken(req, res, (res) => {
    pgclient.query(
      "DELETE FROM items WHERE userid = $1 AND id = $2",
      [req.auth.userId, req.body.id],
      (error) => {
        if (error) {
          throw error;
        }
        res.json("item was deleted");
      }
    );
  });
});

app.post("/items/updateStatus", (req, res) => {
  authenticateToken(req, res, (res) => {
    pgclient.query(
      "UPDATE items SET status = $3 WHERE userId = $1 and id = $2",
      [
        req.auth.userId,
        req.body.id,
        req.body.status === "Active" ? "Active" : "Completed",
      ],
      (error) => {
        if (error) {
          throw error;
        }
        res.json("item status was updated");
      }
    );
  });
});

app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
