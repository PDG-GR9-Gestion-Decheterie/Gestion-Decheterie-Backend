import { describe, test, expect } from "@jest/globals";
import app from "../server.js";
import request from "supertest";

import { getInfo } from "./infoMessage.js";

describe("Check good response", () => {
  test("get", async () => {
    // get
    const api = await request(app).get("/api/infos");
    expect(api.statusCode).toEqual(200);
    expect(api.body).toEqual(getInfo);
  });
});
