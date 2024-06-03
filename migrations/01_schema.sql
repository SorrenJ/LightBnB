CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
);


CREATE TABLE reservations (
  id INTEGER PRIMARY KEY,
  start_date DATE,
  end_date DATE,
  property_id INTEGER,
  guest_id INTEGER,
      FOREIGN KEY (guest_id) REFERENCES users(id)
     
);


CREATE TABLE property_reviews (
  guest_id INTEGER,
  property_id INTEGER,
 reservation_id INTEGER,
 rating SMALLINT,
 message TEXT,
 FOREIGN KEY (guest_id) REFERENCES users(id)
);



CREATE TABLE properties (
    id INT PRIMARY KEY,
    owner_id INTEGER,
    title VARCHAR(255),
    description TEXT,
    thumbnail_photo_url VARCHAR(255),
    cover_photo_url VARCHAR(255),
    cost_per_night INTEGER,
    parking_spaces INTEGER,
    number_of_bathrooms INTEGER,
    number_of_bedrooms INTEGER,
    country VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(255),
    province VARCHAR(255),
    post_code VARCHAR(255),
    active BOOLEAN,
     FOREIGN KEY (id) REFERENCES property_reviews(property_id),
          FOREIGN KEY (owner_id) REFERENCES users(id)
);
