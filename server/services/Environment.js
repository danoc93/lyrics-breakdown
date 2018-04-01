/**
 Controller: Environment.
 */

// Use mongodb://localhost:27017/lt-db locally.
// Use mongodb://lt-sandbox:trb-b8o-vYz-nrn@ds127899.mlab.com:27899/lt-db remotely.
const Environment = {
    MONGO_URI:'mongodb://lt-sandbox:trb-b8o-vYz-nrn@ds127899.mlab.com:27899/lt-db',
    SESSION_SECRET: 'universityoftears'
};

module.exports = Environment;
