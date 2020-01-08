// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

module.exports = {
  getUserWithEmail: function(email) {
  
    const queryString = `
      SELECT email
      FROM users
      WHERE email = $1
      LIMIT 1;
    `
    
    return pool.query(queryString, [email])
      .then(res => {
        if (res) {
          return res.rows[0];
        } else {
          return null
        }
      })
      .catch(err => console.log(err.stack));
  },
  getUserWithId: function(id) {
    const queryString = `
      SELECT email
      FROM users
      WHERE id = $1
      LIMIT 1;
    `
    
    return pool.query(queryString, [id])
      .then(res => {
        if (res.rows) {
          return res.rows[0];
        } else {
          return null
        }
      })
      .catch(err => console.log(err.stack));
  },
  addUser: function(user) {
    const {name, email, password} = user;
    const queryString = `
      INSERT INTO users (name, email, password)
      VALUES (
        $1,
        $2,
        $3
      ) RETURNING *;
    `
    return pool.query(queryString, [name, email, password])
        .then(res => res.rows[0])
        .catch(err => console.log(err.stack))
  },
  getAllReservations: function(guest_id, limit = 10) {
    const queryString = `
      SELECT *
        FROM reservations
        WHERE guest_id = $1
        LIMIT $2;
    ` 
    return pool.query(queryString, [guest_id, limit])
      .then(res => res.rows)
      .catch(err => console.log(err.stack))
  },
  getAllProperties: function(options, limit = 10) {
    const queryString = `
      SELECT *
      FROM properties
      LIMIT $1;
    `;
    let limitedProperties = {}
    
    return pool.query(queryString, [limit])
      .then(res => {
        res.rows.forEach((row, i) => limitedProperties[i] = row);
        return limitedProperties;
      })
      .catch(err => console.error('query error', err.stack));
  },
  addProperty: function(property) {

    const {
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    } = property;
  
   
    const queryString = `
    INSERT INTO properties (
      title, 
      description, 
      owner_id, 
      cover_photo_url, 
      thumbnail_photo_url, 
      cost_per_night, 
      parking_spaces, 
      number_of_bathrooms, 
      number_of_bedrooms, 
      active, 
      province, 
      city, 
      country, 
      street, 
      post_code) 
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        )
        RETURNING *;
    `
    return pool.query(queryString, [
      title,
      description,
      owner_id,
      cover_photo_url,
      thumbnail_photo_url,
      cost_per_night,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms,
      active,
      province,
      city,
      country,
      street,
      post_code,
      ])
        .then(res => res.rows)
        .catch(err => console.log(err.stack));
    }
}