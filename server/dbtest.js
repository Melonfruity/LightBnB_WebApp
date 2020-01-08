const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
  const queryString = `
  SELECT *
    FROM reservations
    WHERE guest_id = $1
    LIMIT $2;
` 
return pool.query(queryString, [269, 3])
  .then(res => console.log(res.rows))
  .catch(err => console.log(err.stack))