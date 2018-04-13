# lyrics-breakdown
A game to guess lyrics using the MusixMatch API.

## Deployment

The product is deployed in two end points:

Front-end of the application:
https://lyrics-breakdown-front.herokuapp.com/

Back-end API access point.
https://lyrics-breakdown-server.herokuapp.com/

* The first one is hooked to the "client" folder in this repo, the second one is hooked to the "server" folder.
* To commit changes you can use this repo.
* To push changes to heroku, you need to setup hooks.

How to setup the hooks for the first time:

```
git clone https://github.com/danoc93/lyrics-breakdown.git
cd lyrics-breakdown
heroku login
cd client
heroku git:remote -a lyrics-breakdown-front
git remote rename heroku heroku-front
cd ..
cd server
heroku git:remote -a lyrics-breakdown-server
git remote rename heroku heroku-server
```

From the parent folder, whenever you wanna deploy your changes to either front end or back end, use:

```
git subtree push --prefix client heroku-front master
git subtree push --prefix server heroku-server master
```

In case it fails to push, try:

```
git push heroku-front `git subtree split --prefix client master`:master --force
git push heroku-server `git subtree split --prefix server master`:master --force
```

Don't forget to also keep the origin updated.

```
git push origin master
```

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

Basic interaction:
```javascript
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    // do some work here with the database.
    //Close connection
    db.close();
  }
});
```

###### Note: npm install only needs to be executed once.

Last step:

Locally, you don't have 2 contexts so everything has to be dealt in terms of local host. 
In order for the front end to talk to the back end, simply change the URL end point on your local machine (client/controllers/Environment.js). The local URL is commented there by default.

###### DO NOT COMMIT YOUR LOCAL Environment.js FILE.
