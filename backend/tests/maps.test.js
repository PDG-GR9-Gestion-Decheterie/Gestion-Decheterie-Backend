import { describe, test, expect } from "@jest/globals";
import app from "../server.js";
import request from "supertest";

import { Forbidden, Unauthorized } from "./message.js";

import {
  Responsable,
  Secretaire,
  Employe,
  Chauffeur,
  Responsable2,
  Secretaire2,
  Employe2,
  Chauffeur2,
} from "./credentials.js";

describe("API not logged in", () => {
  test("get", async () => {
    // get
    const api = await request(app).get("/api/apikey");
    expect(api.statusCode).toEqual(401);
    expect(api.body).toEqual({
      error: Unauthorized.error,
    });
  });
});

describe("API logged in", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // get
    const api = await request(app).get("/api/apikey").set("cookie", cookie);
    expect(api.statusCode).toEqual(200);
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    // get
    const api = await request(app).get("/api/apikey").set("cookie", cookie);
    expect(api.statusCode).toEqual(200);
  });

  test("Employe", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    // get
    const api = await request(app).get("/api/apikey").set("cookie", cookie);
    expect(api.statusCode).toEqual(200);
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    // get
    const api = await request(app).get("/api/apikey").set("cookie", cookie);
    expect(api.statusCode).toEqual(200);
  });
});
