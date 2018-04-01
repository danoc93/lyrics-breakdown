/**
 Controller: Environment.
 */

// Use mongodb://localhost:27017/lt-db locally.
// Use mongodb://ds127899.mlab.com:27899/lt-db remotely.
const Environment = {
    MONGO_URI:'mongodb://ds127899.mlab.com:27899/lt-db',
    MONGO_USER:'lt-sandbox',
    MONGO_PASS:'trb-b8o-vYz-nrn',
    SESSION_SECRET: 'universityoftears'
};

module.exports = Environment;
