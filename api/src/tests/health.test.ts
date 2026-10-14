import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("get /api/v1/healt", () => {
  it("debe responder con estado 200 y confirmar que la api funciona", async () => {
    const response = await request(app).get("/api/v1/healt");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      status: "OK",
      message: "StockPilot Funcionando",
    });
  });
});
