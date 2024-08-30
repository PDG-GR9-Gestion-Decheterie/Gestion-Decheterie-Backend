import { describe, test, expect } from "@jest/globals";
import app from "../server.js";
import request from "supertest";

import {
  Responsable,
  ResponsableWrong,
  Secretaire,
  Employe,
  Chauffeur,
  Responsable2,
  Secretaire2,
  Employe2,
  Chauffeur2,
} from "./credentials.js";

import { Forbidden, Unauthorized } from "./message.js";

import { LoginOK, LoginKO } from "./loginMessage.js";

describe("Login/Logout", () => {
  test("should login", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    expect(list.statusCode).toEqual(200);
    expect(list.body).toEqual({
      idlogin: Responsable.username,
      fonction: "Responsable",
    });
  });

  test("should not login", async () => {
    const list = await request(app).post("/api/login").send(ResponsableWrong);
    expect(list.statusCode).toEqual(401);
    expect(list.body).toEqual({ error: LoginKO.login });
  });

  test("should not login", async () => {
    const list = await request(app).post("/api/login").send(ResponsableWrong);
    expect(list.statusCode).toEqual(401);
    expect(list.body).toEqual({ error: LoginKO.login });
  });

  test("should not login", async () => {
    const list = await request(app).post("/api/login").send(ResponsableWrong);
    expect(list.statusCode).toEqual(401);
    expect(list.body).toEqual({ error: LoginKO.login });
  });

  test("should not login", async () => {
    const list = await request(app).post("/api/login").send(ResponsableWrong);
    expect(list.statusCode).toEqual(401);
    expect(list.body).toEqual({ error: LoginKO.login });
  });

  test("should not login", async () => {
    const list = await request(app).post("/api/login").send(ResponsableWrong);
    expect(list.statusCode).toEqual(401);
    expect(list.body).toEqual({ error: LoginKO.login });
  });

  test("should return too many login", async () => {
    const list = await request(app).post("/api/login").send(ResponsableWrong);
    expect(list.statusCode).toEqual(429);
    expect(list.body).toEqual({ error: LoginKO.loginTooMuch });
  });

  test("should logout", async () => {
    const list = await request(app).post("/api/logout");
    expect(list.statusCode).toEqual(200);
    expect(list.body).toEqual({ message: LoginOK.logout });
  });
});
