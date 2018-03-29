# lyrics-breakdown

Deployment

1. We have 2 Heroku servers due to the service only allowing one context per application (unless we pay).

```
https://lyrics-breakdown-front.herokuapp.com/
https://lyrics-breakdown-server.herokuapp.com/
```

2. The first one is hooked to the "client" folder in this repo, the second one is hooked to the "server" folder.
3. To commit changes you can use this repo.
4. To push changes to heroku, you need to setup hooks.

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
git subtree push --prefix client heroku-server master
```

Don't forget to also keep the origin updated.

```
git push origin master
```
