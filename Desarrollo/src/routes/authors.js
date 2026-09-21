const express = require('express');
const router = express.Router();

let authors = [
    { id: 1, name: 'Ana Garcia', email: 'ana@example.com', bio: 'Desarrolladora full-stack apasionada por Node.js' },
    { id: 2, name: 'Carlos Ruiz', email: 'carlos@example.com', bio: 'Escritor tecnico especializado en bases de datos' },
    { id: 3, name: 'Maria Lopez', email: 'maria@example.com', bio: 'Ingeniera de software con foco en APIs REST' },
];

router.get('/', (req, res) =>{
    res.json(authors);
});

router.get('/:id', (req, res) => {
    const author = authors.find((a) => a.id === Number(req.params.id));
    if (!author) {
        return res.status(404).json({ error: 'Autor no encontrado' });
    }
    res.json(author);
});

router.post('/', (req, res) => {
    const { name, email, bio } = req.body;
    const newAuthor = { id: authors.length + 1, name, email, bio };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

router.put('/:id', (req, res) => {
    const author = authors.find((a) => a.id === Number(req.params.id));
    if (!author) {
        return res.status(404).json({ error: 'Autor no encontrado' });
    }
    const { name, email, bio } = req.body;
    author.name = name ?? author.name;
    author.email = email ?? author.email;
    author.bio = bio ?? author.bio;
    res.json(author);
});
router.delete('/:id', (req, res) => {
    const index = authors.findIndex((a) => a.id === Number(req.params.id));
    if (index === -1) {
    return res.status(404).json({ error: 'Autor no encontrado' });
    }
    authors.splice(index, 1);
    res.status(204).send();
});

module.exports = router;