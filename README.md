# Computer Shop Search

## Overview

This is a study Client-Server application based on [Amida API Boilerplate](https://github.com/amida-tech/api-boilerplate) and [Create React App](https://github.com/facebook/create-react-app) projects.

## Getting Started

## Requirements:
 - Preinstalled [Node.js](https://nodejs.org/)
 - Preinstalled [PostgreSQL](https://www.postgresql.org/)

###Step One:

Install yarn:
```js
npm install -g yarn
```

Install server-side app dependencies (execute it being in project root directory):
```sh
yarn
```

Set environment (vars):
```sh
cp .env.example .env
```

### Step Two:
Create new PostgreSQL Database and fill `.env` file with actual connection credentials 
- UNIQUE_NAME_PG_DB (UNIQUE_NAME_PG_TEST_DB) - Data Base name
- UNIQUE_NAME_PG_PORT - PostgreSQL port (*Default is* `5432`);
- UNIQUE_NAME_PG_HOST - PostgreSQL host address (*Assuming you run DB locally it should be* `localhost`);
- UNIQUE_NAME_PG_USER - your database username;
- UNIQUE_NAME_PG_PASSWD - your database password;

### Step Three:

Start server:
```sh
# Start server app
yarn start
```

Start client:
```sh
# Go to the client app folder
cd client
# Install client app dependencies
yarn
# Start client app
yarn start
```

Now if you want to try functionality you are able to import test data to your database from file `test-data.sql`
(**NOTE** *you can do this only in case of server-application was started and all the migrations already were performed in the database*). 
