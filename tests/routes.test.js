const request = require("supertest");
const app = require("../index");
let server;

beforeAll(() => {
  server = app.listen(8000);
});

afterAll((done) => {
  server.close(done);
});

describe("Test All `GET` Routes", () => {
  test("GET /", async () => {
    const res = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).toHaveProperty("checkHealth");
    expect(res.body.checkHealth).toBe("done");
  });

  test("GET /students/", async () => {
    const res = await request(app)
      .get("/students/")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).not.toBe(null);
    expect(res.body).toHaveProperty("status");
    expect(res.body.status).toBe("success");
  });

  test("GET /last-gr", async () => {
    const res = await request(app)
      .get("/last-gr")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body).not.toBe(null);
    expect(res.body.status).toBe("success");
    expect(res.body).toHaveProperty("gr_no");
    expect(res.body.gr_no).toMatch(/GR-.*/);
  });

  test("GET /students/:id", async () => {
    const res = await request(app)
      .get("/students/invalid-id")
      .expect(404)
      .expect("Content-Type", /json/);

    expect(res.body).not.toBe(null);
    expect(res.body.status).toBe("failed");
  });

  test("GET /last-serial/tc", async () => {
    const res = await request(app)
      .get("/last-serial/tc")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).not.toBe(null);
    expect(res.body).toHaveProperty("status");
    expect(res.body.status).toBe("success");
  });

  test("GET /last-serial/invalid", async () => {
    const res = await request(app).get("/l");
  });

  // TODO: handle correct Student ID test case
});
