const { Pool } = require('pg');

const pool = new Pool({
  user: 'zahrasalman',
  password: '123',
  host: 'localhost',
  database: 'lighthousebnb'
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};