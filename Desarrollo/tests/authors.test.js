require("dotenv").config();
const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/db/pool");

// Cierra el pool de conexiones al terminar todos los tests,
// para que Jest no se quede "colgado" esperando
afterAll(async () => {
  await pool.end();
});

describe("CRUD de authors", () => {
  let createdId; // guardamos el id del autor creado para reusarlo en otros tests

  test("POST /authors crea un autor nuevo", async () => {
    const email = `test${Date.now()}@example.com`; // email único en cada ejecución

    const response = await request(app)
      .post("/authors")
      .send({ name: "Autor de Prueba", email, bio: "Bio de prueba" });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Autor de Prueba");
    expect(response.body.id).toBeDefined();

    createdId = response.body.id;
  });

  test("GET /authors/:id obtiene el autor creado", async () => {
    const response = await request(app).get(`/authors/${createdId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdId);
  });

  test("GET /authors/:id con id inexistente responde 404", async () => {
    const response = await request(app).get("/authors/999999");

    expect(response.status).toBe(404);
  });

  test("POST /authors sin campos obligatorios responde 400", async () => {
    const response = await request(app).post("/authors").send({});

    expect(response.status).toBe(400);
  });

  test("DELETE /authors/:id elimina un recurso inexistente y responde 404", async () => {
    const response = await request(app).delete("/authors/999999");

    expect(response.status).toBe(404);
  });

  test("DELETE /authors/:id elimina el autor creado", async () => {
    const response = await request(app).delete(`/authors/${createdId}`);

    expect(response.status).toBe(204);
  });
});
