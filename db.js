const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '11223344',
  database: 'test',
  host: 'localhost',
  port: 5432,
});

//module.export = pool;

module.exports = {
  query: (text, params) => pool.query(text, params),
};
