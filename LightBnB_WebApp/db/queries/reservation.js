const { pool } = require('../database');


const getAllReservations = (guest_id) => {
 
  // Shows the details of the guest's reservation by earliest start date
    const query = `
      SELECT r.id, p.title, p.cost_per_night, r.start_date, AVG(pr.rating) as average_rating
      FROM reservations r
      JOIN properties p ON r.property_id = p.id
      JOIN property_reviews pr ON p.id = pr.property_id
      WHERE r.guest_id = $1
      GROUP BY p.id, r.id
      ORDER BY r.start_date
      LIMIT 10;
    `;
    
    // Use an array to pass the userID securely as a parameter to the query
    const values = [guest_id];
  
    
    return pool.query(query, values)
      .then((result) => {
     
        return result.rows;
      })
      .catch((error) => {
       
        console.error('Error executing getAllReservations:', error);
        return null;
      });
  };
  
  
  module.exports = {
    getAllReservations,

};