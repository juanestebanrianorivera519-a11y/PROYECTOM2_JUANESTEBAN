const express = require('express');
const router = express.Router();
const postsService = require('../services/postsService');

// GET /posts -> listar todos
router.get('/', async (req, res) => {
  const posts = await postsService.getAll();
  res.json(posts);
});

// GET /posts/author/:authorId -> posts de un autor, con su nombre
router.get('/author/:authorId', async (req, res) => {
  const posts = await postsService.getByAuthorId(req.params.authorId);
  res.json(posts);
});

// GET /posts/:id -> detalle de uno
router.get('/:id', async (req, res) => {
  const post = await postsService.getById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }
  res.json(post);
});

// POST /posts -> crear
router.post('/', async (req, res) => {
  const { title, content, author_id, published } = req.body;
  const newPost = await postsService.create({ title, content, author_id, published });
  res.status(201).json(newPost);
});

// PUT /posts/:id -> actualizar
router.put('/:id', async (req, res) => {
  const { title, content, published } = req.body;
  const updated = await postsService.update(req.params.id, { title, content, published });
  if (!updated) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }
  res.json(updated);
});

// DELETE /posts/:id -> eliminar
router.delete('/:id', async (req, res) => {
  const deleted = await postsService.remove(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Post no encontrado' });
  }
  res.status(204).send();
});

module.exports = router;