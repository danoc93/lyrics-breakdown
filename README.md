# lyrics-breakdown
A game to guess lyrics using the MusixMatch API.

Disclaimer: This is an old toy project for university :).

## Deployment

The product is deployed in two end points:

Front-end of the application:
https://lyrics-breakdown-front.herokuapp.com/

Back-end API access point.
https://lyrics-breakdown-server.herokuapp.com/

## Local Setup

To start the front-end:

```
cd lyrics-breakdown
npm install --prefix client
npm start --prefix client
```

To start the back-end:

```
cd lyrics-breakdown
npm install --prefix server
npm start --prefix server
```

Database: 

Service to query and perform operations on the database - DatabaseService.js  
Added Environment.js in server/services containing the database URI - must change accordingly to the corresponding database running on localhost.
### MongoDB set up
1. Install https://docs.mongodb.com/manual/administration/install-community/
2. Create directory 'data'
3. Create db `mongod --port 27017 --dbpath=./data`
4. Can interact with database via shell `mongo mongodb://localhost:27017/`

Go to server folder, and run `npm install mongodb`.

###### Note: npm install only needs to be executed once per package added.

Last step:

Locally, you don't have 2 contexts so everything has to be dealt in terms of local host. 
In order for the front end to talk to the back end, simply change the URL end point on your local machine (client/controllers/Environment.js). The local URL is commented there by default.

###### DO NOT COMMIT YOUR LOCAL Environment.js FILE.
