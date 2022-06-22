const pool = require('../utils/pool');

module.exports = class Secret {
  id;
  title;
  description;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.title = row.first_name;
    this.description = row.last_name;
    this.created_at = row.created_at;
  }

  static async insert({ title, description }) {
    const { rows } = await pool.query(
      `
      INSERT INTO Secrets (title, description)
      VALUES ($1, $2)
      RETURNING *
    `,
      [title, description]
    );

    return new Secret(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT title, description, created_at FROM Secrets');
    return rows;
  }
};
