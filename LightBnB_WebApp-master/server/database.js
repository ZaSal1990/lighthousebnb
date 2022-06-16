const properties = require('./json/properties.json');
const users = require('./json/users.json');

const db = require('./db');



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query('SELECT * FROM users WHERE email = $1',[email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};
getUserWithEmail('whatever@hotmail.com');

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db
    .query(
      'SELECT * FROM users WHERE id = $1',[id])
    .then((result) => {
      if (!result.rows.id) {
        return null;
      } else return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) { //RETRUNING * returns newest insertion
  return db.query('INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *;', [user.name, user.email, user.password]).then(result => result.rows);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return db.query('SELECT reservations.*, properties.*, avg(rating) as average_rating FROM reservations JOIN properties ON reservations.property_id = properties.id JOIN property_reviews ON properties.id = property_reviews.property_id WHERE reservations.guest_id = $1 GROUP BY properties.id, reservations.id ORDER BY reservations.start_date LIMIT $2;',[guest_id, limit]).then(result => result.rows);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  let filters = '';

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    filters += ` WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    filters += ` ${filters === '' ? 'WHERE' : 'AND'} owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`); //breaking query to utilize .length with .push properly, as mentor to get better solution, pushingh and accessing later two arguments is not working properly
    filters += ` ${filters === '' ? 'WHERE' : 'AND'} cost_per_night BETWEEN $${queryParams.length}`;
    queryParams.push(`${options.maximum_price_per_night}`);
    filters += ` AND $${queryParams.length}`;
  }
  if (options.minimun_rating) {
    queryParams.push(`${options.minimun_rating}`);
    filters += ` HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryString += `${filters}`;
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log(queryString, queryParams);

  return db.query(queryString, queryParams).then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query('INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;',[property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms]).then(result => result.rows);
};
exports.addProperty = addProperty;
