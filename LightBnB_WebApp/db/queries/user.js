// queries/user.js
const { pool } = require('../database');

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = (email) => {
    return pool
      .query(`SELECT * FROM users WHERE email = $1`, [email])
      .then((result) => {
        console.log("user from db" + result.rows[0]); // user from db
  
        return result.rows[0];
      })
      .catch(() => {
        return null;
      });
  };

  /**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserById = async (id) => {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

const getAllUsers = async () => {
  const result = await query('SELECT * FROM users');
  return result.rows;
}

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser = (user) => {
    const { name, password, email } = user; 
    return pool
      .query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',[name, email, password])
      .then((result) => {
        return result.rows[0];
      })
      .catch((error) => {
        console.error('Error executing addUser:', error);
        return null;
      });
  };
  

module.exports = {
    addUser,
    getUserWithEmail,
    getUserById,
  getAllUsers,
};