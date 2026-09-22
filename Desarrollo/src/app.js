const express = require("express");

const app = express();

// Middleware: permite leer el cuerpo JSON de las peticiones (POST, PUT)
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API MiniBlog funcionando" });
});

// Rutas de authors
const authorsRouter = require("./routes/authors");
app.use("/authors", authorsRouter);

// Rutas de posts
const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

module.exports = app;
