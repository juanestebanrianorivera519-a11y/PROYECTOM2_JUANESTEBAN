const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "API MiniBlog funcionando" });
});

const authorsRouter = require("./routes/authors");
app.use("/authors", authorsRouter);

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

// Middleware de errores (va al final, después de todas las rutas)
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
