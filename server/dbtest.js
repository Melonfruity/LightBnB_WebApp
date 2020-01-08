const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
const queryString = `
    SELECT email
    FROM users
    WHERE id = $1
    LIMIT 1;
  `
  
  pool.query(queryString, ['9999999999999'])
    .then(res => {
      if (res.rows) {
        console.log(res.rows)
        return res.rows[0];
      } else {
        return null
      }
    })
    .catch(err => {return null});