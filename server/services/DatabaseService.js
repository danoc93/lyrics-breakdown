import {Environment} from "./Environment.js";

const request = require('request');

// MongoDB
const mongod = require('mongodb');
const mongoClient = mongod.MongoClient;

const mongoDbUrl = Environment.MONGO_URI;

let db = [];
let userCollection = [];
let scoresCollection = [];
let relationsCollection = [];

//Connect to database
mongoClient.connect(mongoDbUrl, function (err, database) {
    if (err) throw err;
    console.log('Connected to database ', mongoDbUrl);
    db = database;
    userCollection = db.collection('users');
    scoresCollection = db.collection('scores');
    relationsCollection = db.collection('relations');
});

class DatabaseService {

    // User queries
    doesUsernameExist(username) {
        let query = {username: username};
        return userCollection.find(query).limit(1).toArray().length > 0;
    }

    doesEmailExist(email_address) {
        let query = {email_addr: email_address};
        return userCollection.find(query).limit(1).toArray().length > 0;
    }

    addUser(country_id, email_address, username, password) {
        if (!this.doesUsernameExist(username) && !this.doesEmailExist(email_address)) {
            try {
                let ins = {country_id: country_id, email_addr: email_address, username: username, password: password};
                let response = userCollection.insertOne(ins);
                return response.insertedCount === 1;
            } catch (err) {
                console.log(err.stack);
            }
        }
        return false;
    }

    removeUserByEmailAddr(email_address) {
        if (this.doesUsernameExist(email_address)) {
            try {
                let del = {email_addr: email_address};
                let response = userCollection.deleteOne(del);
                return response.deletedCount === 1;
            } catch (err) {
                console.log(err.stack)
            }
        }
        return false;
    }

    removeUserByUsername(username) {
        if (this.doesUsernameExist(username)) {
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
        let query = {username: username};
        return userCollection.find(query).toArray();
    }

    // SCORES
    getScores() {
        let lim = 10;
        return scoresCollection.find().limit(lim);
    }

    getScoresByCountry(country_id) {
        let query = {country_id: country_id};
        return scoresCollection.find(query).toArray();
    }

    getScoresByUser(username) {
        let query = {username: username};
        return scoresCollection.find(query).toArray();
    }

    addScore(username, score) {
        try {
            let ins = {username: username, score: score};
            let response = scoresCollection.insertOne(ins);
            return response.insertCount === 1;
        } catch (err) {
            console.log(err.stack);
        }
    }A
}

module.exports = DatabaseService;