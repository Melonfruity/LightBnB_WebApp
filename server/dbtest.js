const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
  const property = {
    owner_id:103, 
    title:'descript', 
    description:'Daily every', 
    thumbnail_photo_url: 'https://images.pexels.com/photos/2088258/table-dining-room-chair-dining-area-2088258.jpeg', 
    cover_photo_url:'https://images.pexels.com/photos/2088258/table-dining-room-chair-dining-area-2088258.jpeg?auto=compress&cs=tinysrgb&h=350', 
    cost_per_night: 2438, 
    parking_spaces: 8, 
    number_of_bathrooms: 2, 
    number_of_bedrooms:1,
    province:'Prince Edward Island', 
    city:'Charlottetown', 
    country:'Canada', 
    active: true,
    street:'1716 Misih Highway', 
    post_code:'48752'
  }

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
    active,
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