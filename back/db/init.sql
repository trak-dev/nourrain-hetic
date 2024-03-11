DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(46) NOT NULL,
  lastname VARCHAR(46),
  email VARCHAR(62) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  wallet FLOAT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (id, firstname, lastname, email, password, wallet) VALUES
  (1, 'Ilies', 'AAARRRR', 'ilies-testttt@yopmail.com', '$2b$10$cqFUpksLhwmAqjICekIK1un0PbWPoiDqiqoPoApXCTVTFS.l1SVve', 30),
  (2, 'Yann', 'UUUUU', 'yann-testttt@yopmail.com', '$2b$10$cqFUpksLhwmAqjICekIK1un0PbWPoiDqiqoPoApXCTVTFS.l1SVve', 40);

DROP TABLE IF EXISTS nourrain CASCADE;
CREATE TABLE IF NOT EXISTS nourrain (
  id SERIAL PRIMARY KEY,
  name VARCHAR(62) NOT NULL,
  description TEXT,
  owner_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  wallet FLOAT NOT NULL DEFAULT 0,
  FOREIGN KEY (owner_id) REFERENCES users (id) ON UPDATE CASCADE
);
INSERT INTO nourrain (name, description, owner_id, wallet) VALUES
  ('Team Ilies', 'This is a lorem ipsum dolor sit amet', 1, 32),
  ('Team Yann', 'Le nourrain incroyable de TEAM YANN', 2, 0);

DROP TABLE IF EXISTS donations CASCADE;
CREATE TABLE IF NOT EXISTS donations (
  user_id INTEGER,
  nourrain_id INTEGER,
  amount FLOAT NOT NULL,
  anonymous BOOLEAN DEFAULT false,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, date),
  FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
  FOREIGN KEY (nourrain_id) REFERENCES nourrain (id) ON DELETE CASCADE ON UPDATE CASCADE 
);

DROP TABLE IF EXISTS nourrains_users CASCADE;
CREATE TABLE IF NOT EXISTS nourrains_users (
  user_id INTEGER,
  nourrain_id INTEGER,
  collect_vote BOOLEAN DEFAULT false,
  PRIMARY KEY (user_id, nourrain_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (nourrain_id) REFERENCES nourrain (id) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO nourrains_users (nourrain_id, user_id) VALUES
  (1, 1),
  (1, 2),
  (2, 2);

DROP TABLE IF EXISTS join_query CASCADE;
CREATE TABLE IF NOT EXISTS join_query (
  user_id INTEGER,
  nourrain_id INTEGER,
  date TIMESTAMP,
  PRIMARY KEY (user_id, nourrain_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE,
  FOREIGN KEY (nourrain_id) REFERENCES nourrain (id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS guirk_pricing CASCADE;
CREATE TABLE IF NOT EXISTS guirk_pricing (
    id SERIAL PRIMARY KEY,
    amount FLOAT NOT NULL,
    euro_price FLOAT NOT NULL
);
INSERT INTO guirk_pricing (amount, euro_price) VALUES
(5, 9.99),
(10, 17.99),
(20, 29.99),
(100, 99.99);

DROP TABLE IF EXISTS guirk_purchase CASCADE;
CREATE TABLE IF NOT EXISTS guirk_purchase (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    guirk_id INTEGER NOT NULL,
    stripe_id TEXT NOT NULL UNIQUE,
    is_handled BOOLEAN NOT NULL DEFAULT false,
    date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE NO ACTION,
    FOREIGN KEY (guirk_id) REFERENCES guirk_pricing (id) ON UPDATE CASCADE ON DELETE NO ACTION
);

DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    location POINT,
    name VARCHAR(62) NOT NULL
);
INSERT INTO companies (location, name) VALUES
  ('(48.851502, 2.4181134)', 'Lolo Cuisine Mésopotamienne et Anatolienne'),
  ('(48.8509177, 2.4182935)', 'Birdie’s Cafe'),
  ('(48.8526531, 2.4204547)', 'Le Soleil de Provence');
