CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(46) NOT NULL,
  lastname VARCHAR(46),
  email VARCHAR(62) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  wallet FLOAT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nourrain (
  id SERIAL PRIMARY KEY,
  name VARCHAR(62) NOT NULL,
  description TEXT,
  owner_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  wallet FLOAT NOT NULL DEFAULT 0,
  FOREIGN KEY (owner_id) REFERENCES users (id) ON UPDATE CASCADE
);

CREATE TABLE donations (
  user_id INTEGER,
  nourrain_id INTEGER,
  amount FLOAT NOT NULL,
  anonymous BOOLEAN DEFAULT false,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, date),
  FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
  FOREIGN KEY (nourrain_id) REFERENCES nourrain (id) ON DELETE CASCADE ON UPDATE CASCADE 
);

CREATE TABLE nourrains_users (
  user_id INTEGER,
  nourrain_id INTEGER,
  collect_vote BOOLEAN DEFAULT false,
  PRIMARY KEY (user_id, nourrain_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (nourrain_id) REFERENCES nourrain (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE join_query (
  user_id INTEGER,
  nourrain_id INTEGER,
  date TIMESTAMP,
  PRIMARY KEY (user_id, nourrain_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
  FOREIGN KEY (nourrain_id) REFERENCES nourrain (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    location POINT,
    name VARCHAR(62) NOT NULL
);
