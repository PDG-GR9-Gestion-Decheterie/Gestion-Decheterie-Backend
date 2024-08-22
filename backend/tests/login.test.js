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
} from "./credentials.test.js";

import { LoginOK, LoginKO } from "./messages.test.js";

describe("The API default route", () => {
  test("should receive Hello world!", async () => {
    const list = await request(app).get("/api");
    expect(list.statusCode).toEqual(200);
    expect(list.text).toEqual("API Gestion Déchèterie");
  });
});

describe("Login/Logout", () => {
  test("should login", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    expect(list.statusCode).toEqual(200);
    expect(list.body).toEqual({
      idlogin: responsable.username,
      fonction: "Responsable",
    });
  });

  test("should not login", async () => {
    const list = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "admin1" });
    expect(list.statusCode).toEqual(401);
    expect(list.body).toEqual({ error: LoginKO.login });
  });

  test("should logout", async () => {
    const list = await request(app).get("/api/logout");
    expect(list.statusCode).toEqual(200);
    expect(list.text).toEqual({ message: LoginOK.logout });
  });
});
