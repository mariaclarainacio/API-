const request = require("supertest");
const app = require("../src/app");

let token;

beforeAll(async () => {
  const res = await request(app).post("/auth/login").send({
    email: "admin@teste.com",
    password: "123456"
  });
  token = res.body.token;
});

describe("Users CRUD", () => {
  it("GET /usuarios → lista usuários", async () => {
    const res = await request(app)
      .get("/usuarios")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it("GET /usuarios/:id → retorna usuário", async () => {
    const res = await request(app)
      .get("/usuarios/1")
      .set("Authorization", `Bearer ${token}`);

    expect([200,404]).toContain(res.status);
  });

  it("PUT /usuarios/:id → atualiza usuário", async () => {
    const res = await request(app)
      .put("/usuarios/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Novo Nome" });

    expect([200,404]).toContain(res.status);
  });

  it("DELETE /usuarios/:id → remove usuário", async () => {
    const res = await request(app)
      .delete("/usuarios/1")
      .set("Authorization", `Bearer ${token}`);

    expect([204,404]).toContain(res.status);
  });
});