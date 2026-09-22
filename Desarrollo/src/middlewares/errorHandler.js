function errorHandler(err, req, res, next) {
  console.error(err); // Para que veas el error completo en la terminal, útil al depurar

  // Error de PostgreSQL: violación de restricción UNIQUE (ej. email duplicado)
  if (err.code === '23505') {
    return res.status(409).json({ error: 'El valor ya existe (dato duplicado)' });
  }

  // Error de PostgreSQL: violación de llave foránea (ej. author_id que no existe)
  if (err.code === '23503') {
    return res.status(400).json({ error: 'Referencia inválida: el recurso relacionado no existe' });
  }

  // Cualquier otro error no controlado
  res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = errorHandler;