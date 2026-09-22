const pool = require("../db/pool");

// Obtener todos los autores
async function getAll() {
  const result = await pool.query("SELECT * FROM authors ORDER BY id");
  return result.rows;
}

// Obtener un autor por id
async function getById(id) {
  const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);
  return result.rows[0]; // undefined si no existe
}

// Crear un autor
async function create({ name, email, bio }) {
  const result = await pool.query(
    "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
    [name, email, bio],
  );
  return result.rows[0];
}

// Actualizar un autor
async function update(id, { name, email, bio }) {
  const result = await pool.query(
    `UPDATE authors
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         bio = COALESCE($3, bio)
     WHERE id = $4
     RETURNING *`,
    [name, email, bio, id],
  );
  return result.rows[0]; // undefined si no existe
}

// Eliminar un autor
async function remove(id) {
  const result = await pool.query(
    "DELETE FROM authors WHERE id = $1 RETURNING id",
    [id],
  );
  return result.rows[0]; // undefined si no existía
}

module.exports = { getAll, getById, create, update, remove };
