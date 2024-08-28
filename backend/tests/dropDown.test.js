import { describe, test, expect } from "@jest/globals";
import app from "../server.js";
import request from "supertest";

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

import { Forbidden, Unauthorized } from "./message.js";

import {
  statusResponse,
  dechetResponse,
  fonctionResponse,
} from "./dropDownMessage.js";

describe("DropDown not logged in", () => {
  test("Status", async () => {
    // Get all
    const status = await request(app).get("/api/status");
    expect(status.statusCode).toEqual(401);
    expect(status.body).toEqual({
      error: Unauthorized.error,
    });
  });

  test("Dechets", async () => {
    // Get all
    const dechets = await request(app).get("/api/dechets");
    expect(dechets.statusCode).toEqual(401);
    expect(dechets.body).toEqual({
      error: Unauthorized.error,
    });
  });

  test("Fonctions", async () => {
    // Get all
    const fonctions = await request(app).get("/api/fonctions");
    expect(fonctions.statusCode).toEqual(401);
    expect(fonctions.body).toEqual({
      error: Unauthorized.error,
    });
  });
});

describe("DropDown logged in", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // Get all
    const status = await request(app).get("/api/status").set("Cookie", cookie);
    expect(status.statusCode).toEqual(200);
    expect(status.body).toEqual(statusResponse);

    // Get all
    const dechets = await request(app)
      .get("/api/dechets")
      .set("Cookie", cookie);
    expect(dechets.statusCode).toEqual(200);
    expect(dechets.body).toEqual(dechetResponse);

    // Get all
    const fonctions = await request(app)
      .get("/api/fonction")
      .set("Cookie", cookie);
    expect(fonctions.statusCode).toEqual(200);
    expect(fonctions.body).toEqual(fonctionResponse);
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    // Get all
    const status = await request(app).get("/api/status").set("Cookie", cookie);
    expect(status.statusCode).toEqual(200);
    expect(status.body).toEqual(statusResponse);

    // Get all
    const dechets = await request(app)
      .get("/api/dechets")
      .set("Cookie", cookie);
    expect(dechets.statusCode).toEqual(200);
    expect(dechets.body).toEqual(dechetResponse);

    // Get all
    const fonctions = await request(app)
      .get("/api/fonction")
      .set("Cookie", cookie);
    expect(fonctions.statusCode).toEqual(200);
    expect(fonctions.body).toEqual(fonctionResponse);
  });

  test("Employe", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    // Get all
    const status = await request(app).get("/api/status").set("Cookie", cookie);
    expect(status.statusCode).toEqual(200);
    expect(status.body).toEqual(statusResponse);

    // Get all
    const dechets = await request(app)
      .get("/api/dechets")
      .set("Cookie", cookie);
    expect(dechets.statusCode).toEqual(200);
    expect(dechets.body).toEqual(dechetResponse);

    // Get all
    const fonctions = await request(app)
      .get("/api/fonction")
      .set("Cookie", cookie);
    expect(fonctions.statusCode).toEqual(200);
    expect(fonctions.body).toEqual(fonctionResponse);
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    // Get all
    const status = await request(app).get("/api/status").set("Cookie", cookie);
    expect(status.statusCode).toEqual(200);
    expect(status.body).toEqual(statusResponse);

    // Get all
    const dechets = await request(app)
      .get("/api/dechets")
      .set("Cookie", cookie);
    expect(dechets.statusCode).toEqual(200);
    expect(dechets.body).toEqual(dechetResponse);

    // Get all
    const fonctions = await request(app)
      .get("/api/fonction")
      .set("Cookie", cookie);
    expect(fonctions.statusCode).toEqual(200);
    expect(fonctions.body).toEqual(fonctionResponse);
  });
});
