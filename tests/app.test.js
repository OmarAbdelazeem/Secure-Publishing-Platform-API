const request = require("supertest");

const createApp = require("../src/app");

describe("Express foundation", () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test("GET /health returns API status and environment", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "API is healthy.",
      data: {
        status: "ok",
        environment: "test",
      },
    });
  });

  test("GET /api/version returns the configured API version", async () => {
    const response = await request(app).get("/api/version").expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "API version retrieved successfully.",
      data: {
        version: "1.0.0",
      },
    });
  });

  test("responses include a request ID header", async () => {
    const response = await request(app)
      .get("/health")
      .set("X-Request-Id", "test-request-id")
      .expect(200);

    expect(response.headers["x-request-id"]).toBe("test-request-id");
  });

  test("unknown routes return the standard error format", async () => {
    const response = await request(app).get("/missing").expect(404);

    expect(response.body).toMatchObject({
      success: false,
      message: "Route not found.",
      error: {
        code: "NOT_FOUND",
        details: [],
      },
    });
    expect(response.body.requestId).toEqual(expect.any(String));
  });
});
