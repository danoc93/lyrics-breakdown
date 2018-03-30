const Environment = require("./Environment.js");

const request = require('request');

// MongoDB
const mongod = require('mongodb');
const mongoClient = mongod.MongoClient;

const mongoDbUrl = Environment.MONGO_URI;

let db = null;
let userCollection = null;
let scoresCollection = null;
let relationsCollection = null;

class DatabaseService {

    connectToDatabase() {
        if (db === null)
        //Connect to database
            mongoClient.connect(mongoDbUrl, function (err, database) {
                if (err) throw err;
                db = database.db('lt-db');
                userCollection = db.collection('users');
                scoresCollection = db.collection('scores');
                relationsCollection = db.collection('relations');
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
    doesUsernameExist(username) {
        if (this.isConnectedToDatabase()) {
            let query = {username: username};
            return userCollection.find(query).limit(1).toArray().length > 0;
        }
    }

    doesEmailExist(email_address) {
        if (this.isConnectedToDatabase()) {
            let query = {email_address: email_address};
            return userCollection.find(query).limit(1).toArray().length > 0;
        }
    }

    createUser(country_id, email_address, username, password) {
        if (this.isConnectedToDatabase() && !this.doesUsernameExist(username) && !this.doesEmailExist(email_address)) {
            try {
                let ins = {
                    country_id: country_id,
                    email_address: email_address,
                    username: username,
                    password: password
                };
                let response = userCollection.insertOne(ins);
                return response.insertedCount === 1;
            } catch (err) {
                console.log(err.stack);
            }
        }
        return false;
    }

    checkCredentialsEmailAddress(email_address, password) {
        if (this.isConnectedToDatabase())
            try {
                let query = {email_address: email_address, password: password};
                return 1 === userCollection.find(query).toArray();
            } catch (err) {
                console.log(err.stack);
            }
    }

    checkCredentialsUsername(username, password) {
        if (this.isConnectedToDatabase())
            try {
                let query = {username: username, password: password};
                return 1 === userCollection.find(query).toArray();
            } catch (err) {
                console.log(err.stack);
            }
    }

    removeUserByEmailAddr(email_address) {
        if (this.isConnectedToDatabase() && this.doesUsernameExist(email_address)) {
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

    removeUserByUsername(username) {
        if (this.isConnectedToDatabase() && this.doesUsernameExist(username)) {
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

    getUser(username) {
        if (this.isConnectedToDatabase()) {
            let query = {username: username};
            return userCollection.find(query).toArray();
        }
    }

    // SCORES
    getScores() {
        if (this.isConnectedToDatabase()) {
            let lim = 10;
            return scoresCollection.find().limit(lim);
        }
    }

    getScoresByCountry(country_id) {
        if (this.isConnectedToDatabase()) {
            let query = {country_id: country_id};
            return scoresCollection.find(query).toArray();
        }
    }

    getScoresByUser(username) {
        if (this.isConnectedToDatabase()) {
            let query = {username: username};
            return scoresCollection.find(query).toArray();
        }
    }

    addScore(username, score) {
        if (this.isConnectedToDatabase())
            try {
                let ins = {username: username, score: score};
                let response = scoresCollection.insertOne(ins);
                return response.insertCount === 1;
            } catch (err) {
                console.log(err.stack);
            }
    }

}

module.exports = DatabaseService;