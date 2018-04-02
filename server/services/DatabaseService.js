const Environment = require("./Environment.js");

const request = require('request');

// MongoDB
const mongod = require('mongodb');
const mongoClient = mongod.MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoDbUrl = Environment.MONGO_URI;
const mongoDbUser= Environment.MONGO_USER;

let db = null;
let artistCollection = null;
let userCollection = null;
let scoresCollection = null;
let userRelationCollection = null;
let userFavouriteArtistCollection = null;

class DatabaseService {
    // Database connections
    connectToDatabase() {
        if (db === null)
        //Connect to database
            mongoClient.connect(mongoDbUrl, function (err, database) {
                if (err) throw err;
                db = database.db('lt-db');
                artistCollection = db.collection('artists');
                userCollection = db.collection('users');
                scoresCollection = db.collection('scores');
                userRelationCollection = db.collection('relations');
                console.log('Connected to database ', mongoDbUrl);
            });
        else console.log('Already connected to database!')
    }

    disconnectFromDatabase() {
        db.close();
    }

    isConnectedToDatabase() {
        if (db === null) {
            console.log('You haven\'t connected to the database yet!');
            return false;
        }
        return true;
    }

    // User queries
    doesUsernameExist(username, successCallback, errorCallback) {
        if (this.isConnectedToDatabase()) {
            try {
                let query = {username: username};
                let req = userCollection.find(query).limit(1).toArray();
                return req.then(successCallback).catch(errorCallback);
            } catch (err) {
                console.log(err.stack);
            }
        }
        return null;
    }

    doesEmailExist(email_address) {
        if (this.isConnectedToDatabase()) {
            try {
                let query = {email_address: email_address};
                return userCollection.find(query).limit(1).toArray().length > 0;
            } catch (err) {
                console.log(err.stack);
            }
        }
        return false;
    }

    createUser(country_id, email_address, username, password,
      createdCallBack, errorCallback) {
        if (this.isConnectedToDatabase()) {
            try {
                let ins = {
                    country_id: country_id,
                    email_address: email_address,
                    username: username,
                    password: password,
                    totalscore: 0
                };
                return userCollection.insertOne(ins).then(createdCallBack).catch(errorCallback);
            } catch (err) {
                console.log(err.stack);
            }
        }
        return null;
    }

    deleteUserByEmailAddr(email_address) {
        if (this.isConnectedToDatabase()) {
            try {
                let del = {email_address: email_address};
                let response = userCollection.deleteOne(del);
                return response.deletedCount === 1;
            } catch (err) {
                console.log(err.stack)
            }
        }
        return false;
    }

    deleteUserByUsername(username) {
        if (this.isConnectedToDatabase()) {
            try {
                let del = {username: username};
                let response = userCollection.deleteOne(del);
                return response.deletedCount === 1;
            } catch (err) {
                console.log(err.stack)
            }
        }
        return false;
    }


    checkCredentialsUsername(username, password,
      successCallback, errorCallback) {
        if (this.isConnectedToDatabase())
            try {
                let query = {username: username, password: password};
                return userCollection.find(query).toArray().then(successCallback).catch(errorCallback);
            } catch (err) {
                console.log(err.stack);
            }
        return false;
    }

    getUser(username) {
        if (this.isConnectedToDatabase()) {
            let query = {username: username};
            return userCollection.find(query).toArray();
        }
        return null;
    }

    // Scores queries
    getScores(num_high_scores) {
        if (this.isConnectedToDatabase()) {
            try {
                return (num_high_scores > 0 ? scoresCollection.find({}).limit(num_high_scores).toArray()
                    : scoresCollection.find({}).toArray());
            } catch (err) {
                console.log(err.stack);
            }
        }
        return null;
    }

    getHighScores(num_high_scores) {
        if (this.isConnectedToDatabase()) {
            try {
                // sort in descending order
                let sort = {totalscore: -1};

                return new Promise((resolve, reject)=>{
                    userCollection.find({}).sort(sort).limit(num_high_scores).toArray((err, scores)=>{
                        if(scores){
                            resolve(scores);
                        }else{
                            reject(err);
                        }
                    });
                });
            }
            catch (err) {
                console.log(err.stack);
            }
        }
        return null;
    }

    getScoresByCountry(country_id, num_high_scores) {
        if (this.isConnectedToDatabase()) {
            try {
                let query = {country_id: country_id};
                return num_high_scores > 0 ? scoresCollection.find(query).limit(num_high_scores).toArray()
                    : scoresCollection.find(query).toArray();
            } catch (err) {
                console.log(err.stack);
            }
        }
        return null;
    }

    getHighScoresByCountry(country_id, num_high_scores) {
        if (this.isConnectedToDatabase()) {
            try {
                let query = {country_id: country_id};
                let sort = {score: -1};

                return new Promise((resolve, reject)=>{
                    userCollection.find(query).sort(sort).limit(num_high_scores).toArray((err, scores)=>{
                        if(scores){
                            resolve(scores);
                        }else{
                            reject(err);
                        }
                    });
                });
            }
            catch (err) {
                console.log(err.stack);
            }
        }
        return null;
    }

    getScoresByUser(username, num_high_scores) {
        if (this.isConnectedToDatabase()) {
            try {
                let query = {username: username};
                return num_high_scores > 0 ? scoresCollection.find(query).limit(num_high_scores).toArray()
                    : scoresCollection.find(query).toArray();
            } catch (err) {
                console.log(err.stack);
            }
        }
        return null;
    }

    getHighScoresByUser(username, num_high_scores) {
        if (this.isConnectedToDatabase()) {
            try {
                let query = {username: username};
                let sort = {score: -1};
                return num_high_scores > 0 ? scoresCollection.find(query).sort(sort).limit(num_high_scores).toArray()
                    : scoresCollection.find(query).sort(sort).toArray();
            }
            catch (err) {
                console.log(err.stack);
            }
        }
    }

    addScore(username, score) {
        if (this.isConnectedToDatabase())
            try {
                let ins = {username: username, score: score};
                let response = scoresCollection.insertOne(ins);
                let response2 = userCollection.findOneAndUpdate(
                  {username: username},
                  { $inc: {totalscore: score} }
                );
                return response.insertedCount === 1;
            } catch (err) {
                console.log(err.stack);
            }
        return false;
    }

    // Artist queries
    updateArtist(song_id, creator_id, artist_name, song_name,
      successCallback, errorCallback) {
        if (this.isConnectedToDatabase())
            try {
              let data = {
                creator_id: creator_id,
                song_name: song_name,
                artist_name : artist_name
              };
                let response = artistCollection.findOneAndUpdate(
                  {_id: ObjectId(song_id)},
                  data
                );
                return response.then(successCallback).catch(errorCallback);
            } catch (err) {
                console.log(err.stack);
            }
        return false;
    }

    // Artist queries
    addArtist(creator_id, artist_name, song_name,
      successCallback, errorCallback) {
        if (this.isConnectedToDatabase())
            try {
                let ins = {
                  creator_id: creator_id,
                  song_name: song_name,
                  artist_name : artist_name
                };
                let response = artistCollection.insertOne(ins);
                return response.then(successCallback).catch(errorCallback);
            } catch (err) {
                console.log(err.stack);
            }
        return false;
    }

    deleteArtist(song_id,
      successCallback, errorCallback) {
        if (this.isConnectedToDatabase()) {
            try {
                let del = {_id: ObjectId(song_id)};
                let response1 = artistCollection.findOneAndDelete(del);
                return response1.then(successCallback).catch(errorCallback);
            } catch (err) {
                console.log(err.stack);
            }
        }
        return false;
    }

    getArtistByCreatorId(creator_id,
      successCallback, errorCallback) {
        if (this.isConnectedToDatabase()) {
            try {
                let query = {creator_id: creator_id};
                return artistCollection.find(query).toArray().
                  then(successCallback).catch(errorCallback);
            }
            catch (err) {
                console.log(err.stack);
            }
        }
        return null;
    }

}

module.exports = DatabaseService;
