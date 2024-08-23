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

import { LoginOK, LoginKO } from "./message.js";

describe("The API default route", () => {
  test("should receive Hello world!", async () => {
    const list = await request(app).get("/api");
    expect(list.statusCode).toEqual(200);
    expect(list.text).toEqual("API Gestion Déchèterie");
  });
});

describe("Login/Logout", () => {
  test("should login", async () => {
    // put credential in the body of the request
    // const list = await request(app).post("/api/login").send(Responsable);
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
    expect(list.statusCode).toEqual(200);
    expect(list.body).toEqual({
      idlogin: Responsable.username,
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
    const list = await request(app).post("/api/logout");
    expect(list.statusCode).toEqual(200);
    expect(list.body).toEqual({ message: LoginOK.logout });
  });
});
