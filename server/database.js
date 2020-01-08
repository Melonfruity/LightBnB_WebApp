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

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  
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
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
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
    .catch(err => {return null});
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
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
      .then(res => {
        return res.rows[0];
      })
      .catch(err => console.log(err.stack))
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
    SELECT *
      FROM reservations
      WHERE guest_id = $1
      LIMIT $2;
  ` 
  return pool.query(queryString, [guest_id, limit])
    .then(res => res.rows)
    .catch(err => console.log(err.stack))
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
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
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

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
      .then(res => console.log(res.rows));
  }
exports.addProperty = addProperty;
