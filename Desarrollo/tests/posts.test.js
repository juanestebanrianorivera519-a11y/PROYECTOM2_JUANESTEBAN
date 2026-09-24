require("dotenv").config();
const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/db/pool");

afterAll(async () => {
  await pool.end();
});

describe("CRUD de posts", () => {
  let createdId;

  test("POST /posts crea un post nuevo", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        title: "Post de prueba",
        content: "Contenido de prueba",
        author_id: 1,
        published: true,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Post de prueba");
    expect(response.body.id).toBeDefined();

    createdId = response.body.id;
  });

  test("GET /posts/:id obtiene el post creado", async () => {
    const response = await request(app).get(`/posts/${createdId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdId);
  });

  test("POST /posts con author_id inexistente responde 400", async () => {
    const response = await request(app)
      .post("/posts")
      .send({ title: "x", content: "y", author_id: 999999 });

    expect(response.status).toBe(400);
  });

  test("GET /posts/author/:authorId incluye el nombre del autor", async () => {
    const response = await request(app).get("/posts/author/1");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("author_name");
  });

  test("DELETE /posts/:id elimina el post creado", async () => {
    const response = await request(app).delete(`/posts/${createdId}`);

    expect(response.status).toBe(204);
  });
});
