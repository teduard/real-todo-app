## Real Todo App


<img src="https://github.com/teduard/real-todo-app/blob/main/client/src/assets/homepage.png" height="300px"/> |
<img src="https://github.com/teduard/real-todo-app/blob/main/deployed_app.png" height="300px"/>

This repository contains details on how to build a Todo List/Dashboard application and deploy it on Heroku.

### Codebase

#### Technology stack
The application is created using **Full-stack Javascript**. Nodejs with **Express** powers the backend while the frontend is created using **React**.

The next table contains the main used technologies and public APIs

Name | Description
-----|------------
Postgresql | Data Storage
React with Material-UI| Front end application
Heroku | Used for deployment with CD
Redis | Used as cache for widgets
GraphQL | Simple usage for fetching BBC RSS feed.
Docker | Used for running needed servers as containers
RedisLabs.com | Free-tier account for the redis-server.
UserFront | Used for user management through JWT
api.openweathermap.org | Used to fetch current weather based on geo-location
zenquotes.io | Used to fetch Today's Quote
Custom Gmail account | Used for sending emails from the Contact form

### Deployment
A demo installation of this repository is available at https://real-todo-app.herokuapp.com/

The created accounts are persistent and stored using UserFront's API, while the changes to the Todo List and application's settings are stored in the Postgres database provided by Heroku.


### First Time Setup
In order to run the application locally the first step is to clone the repository

`git clone https://github.com/teduard/real-todo-app.git`

The application needs to have both the `server` and `client` applications up and running:
- in / run: npm install && npm start
- in /client: npm install && npm run build
- visit application at localhost://3001

In order to run a Redis instance we either need to setup a free-tier option in a RedisLabs.com account(used for deployment on Heroku also), or have Docker locally installed, with the `docker/redis/run_redis.sh -start` command executed.

Also, a valid UserFront account, a valid email account and a Postgres server are needed. And at this point, in order to have all the available functionalities the .env file needs to be properly filled in:
Field | Description
------|------------
USERFRONT_PUBLIC_KEY | The public key from the UserFront account
DB_USER | Database User
DB_PASSWORD | Database password
DB_HOST | Host of the postgres server
DB_PORT | Postgres port, default is 5432
DB_DATABASE | Name of the local Postgres database
WEATHER_URL | The weather api.
TODAY_QUOTE_URL | Api for unique quote each day
LOCAL_IP | Ip-based geo-location does not work, we must manually enter a public ip
MAIL_USER | The email account
MAIL_PASSWORD | The email password
MAIL_SMTP_SERVER | The smtp server of the email service
MAIL_SMTP_PORT | Smpt port. for gmail should work with 465
MAIL_RECEIVER_EMAIL | Email address
REDIS_PWD | Password used for Redis server.
REDIS_HOST | Hostname used for Redis installation.
REDIS_PORT | Port used for redis. Localhost default is 6379.

Todos:
- add prisma.io ORM
- refactor all endpoints to GraphQL
- implement cron job for fetching RSS feed hourly
- refactor express app
- implement unit tests

