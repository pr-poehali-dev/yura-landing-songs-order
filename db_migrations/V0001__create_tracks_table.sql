CREATE TABLE IF NOT EXISTS t_p69811192_yura_landing_songs_o.tracks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  genre VARCHAR(100),
  duration VARCHAR(20),
  file_url TEXT NOT NULL,
  file_key TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);