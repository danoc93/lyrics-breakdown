# MongoDB
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
