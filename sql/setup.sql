-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS Secrets;

CREATE TABLE Secrets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Secrets (
  title,
  description
)
VALUES 
  ('Egg Soup Recipe', '1 egg'),
  ('Area 51 Egg Soup Recipe', '2 egg');