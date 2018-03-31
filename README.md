# lyrics-breakdown

This repo had to be created because Heroku couln't operate on the other one due to permissions.
We will migrate this one once the application is complete.

## Deployment

We have 2 Heroku servers due to the service only allowing one context per application (unless we pay).

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

To start the server with the local database, ensure you have mongodb installed (use brew install mongodb on MAC).
Also ensure server/controllers/Environment.js has the right URI.
```
brew install mongodb
mkdir /SOME/PATH/lt-dt
sudo mongod --dbpath /Users/daniel/Repos/databases/lt-db
cd server
npm install
npm run
```

###### Note: npm install only needs to be executed once.

Last step:

Locally, you don't have 2 contexts so everything has to be dealt in terms of local host. 
In order for the front end to talk to the back end, simply change the URL end point on your local machine (client/controllers/Environment.js). The local URL is commented there by default.

###### DO NOT COMMIT YOUR LOCAL Environment.js FILE.
