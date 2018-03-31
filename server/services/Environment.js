/**
 Controller: Environment.
 */

// ROOT: Use mongodb://localhost:27017/lt-db locally.

const Environment = {
    MONGO_URI:'mongodb://localhost:27017/lt-db',
    SESSION_SECRET: 'universityoftears'
};

module.exports = Environment;
