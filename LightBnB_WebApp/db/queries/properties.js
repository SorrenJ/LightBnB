/// Properties
const { pool } = require('../database');
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
    // 1
    const queryParams = [];
    // 2
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE 1=1
    `;
  
    // 3
    if (options.city) {
      queryParams.push(`%${options.city.trim()}%`);
      //const prefix = queryParams.length === 0 ? `WHERE`: 'AND'; 
      queryString += ` AND city ILIKE $${queryParams.length} `;
    }
  
    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += ` AND owner_id = $${queryParams.length} `;
    }
  
    if (options.minimum_price_per_night) {
      queryParams.push(options.minimum_price_per_night * 100); // Convert dollars to cents
      queryString += ` AND cost_per_night >= $${queryParams.length} `;
    }
  
    if (options.maximum_price_per_night) {
      queryParams.push(options.maximum_price_per_night * 100); // Convert dollars to cents
      queryString += ` AND cost_per_night <= $${queryParams.length} `;
    }
  
    // 4
    queryString += `
    GROUP BY properties.id
    `;
  
    if (options.minimum_rating) {
      queryParams.push(options.minimum_rating);
      queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
    }
  
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length + 1};
    `;
  
    queryParams.push(limit);
  
    // 5
    console.log(queryString, queryParams);
  
    // 6
    return pool.query(queryString, queryParams)
      .then((res) => res.rows)
      .catch((err) => {
        console.error(err);
        throw err;
      });

  };
  

  /**
   * Add a property to the database
   * @param {{}} property An object containing all of the property details.
   * @return {Promise<{}>} A promise to the property.
   */
  const addProperty = function (property) {
    
    
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
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
  `;
  
  const queryParams = [
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
  ];
  
  return pool.query(queryString, queryParams)
  .then(res => {
    console.log("Guest ID that posted the property:", owner_id);
    return res.rows[0];
  })
  .catch(err => console.error('query error', err.stack));

  };
  
  module.exports = {
 
    getAllProperties,
    addProperty,
  };