const express = require("express");
const router = express.Router();
const authorsService = require("../services/authorsService");

// GET /authors -> listar todos
router.get("/", async (req, res, next) => {
  try {
    const authors = await authorsService.getAll();
    res.json(authors);
  } catch (err) {
    next(err);
  }
});

// GET /authors/:id -> detalle de uno
router.get("/:id", async (req, res, next) => {
  try {
    const author = await authorsService.getById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json(author);
  } catch (err) {
    next(err);
  }
});

// POST /authors -> crear
router.post("/", async (req, res, next) => {
  try {
    const { name, email, bio } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: "name y email son obligatorios" });
    }
    const newAuthor = await authorsService.create({ name, email, bio });
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
});

// PUT /authors/:id -> actualizar
router.put("/:id", async (req, res, next) => {
  try {
    const { name, email, bio } = req.body || {};
    const updated = await authorsService.update(req.params.id, {
      name,
      email,
      bio,
    });
    if (!updated) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /authors/:id -> eliminar
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await authorsService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
