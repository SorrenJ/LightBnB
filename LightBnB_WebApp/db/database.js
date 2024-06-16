const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});

// the following assumes that you named your connection variable `pool`
pool.query(`SELECT title 
FROM properties 
LIMIT 10;`

).then(response => {
  console.log(response)
})


const query = (text, params) => {
  return pool.query(text, params);
}

module.exports = {
  pool,
  query
};






// const getAllReservations = function (guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// };

