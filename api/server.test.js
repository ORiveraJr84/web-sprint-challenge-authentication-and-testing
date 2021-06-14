const db = require("../data/dbConfig.js");
const server = require("./server.js");
const request = require("supertest");

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("2 test per endpoint: /api/jokes, /api/auth/login, /api/auth/register", () => {
  //
  describe("2 tests for /api/jokes", () => {
    let res;
    beforeAll(async () => {
      res = await request(server).get("/api/jokes");
    });
    test("returns 401", () => {
      expect(res.status).toBe(401);
    });
    test("body returns 'token required' ", () => {
      expect(res.body).toEqual({ message: "token required" });
    });
  });
  //
  //
  describe("2 tests for api/auth/register", () => {
    let body;
    const creds = { username: "test", password: "test" };

    test("receives 201 response", async () => {
      body = await request(server).post("/api/auth/register").send(creds);
      expect(body.status).toBe(201);
    });
    test("body.body.username should be 'test' ", async () => {
      expect(body.body.username).toEqual("test");
    });
  });

  describe("2 tests for api/auth/login", () => {
    let body2;
    const creds2 = { username: "test", password: "test" };

    test("status to be 200", async () => {
      await request(server).post("/api/auth/register").send(creds2);
      body2 = await request(server).post("/api/auth/login").send(creds2);
      expect(body2.status).toBe(200);
    });
    test("body2.message should equal 'welcome test' ", async () => {
      expect(body2.body.message).toEqual("welcome test");
    });
  });
});
