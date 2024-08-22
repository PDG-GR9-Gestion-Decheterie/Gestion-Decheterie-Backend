import { describe, test, expect } from "@jest/globals";
import app from "../server.js";
import request from "supertest";

const Responsable = { username: "jdoe", password: "123" }; // déchèterie 1
const Secretaire = { username: "jferrara", password: "123" }; // déchèterie 1
const Employe = { username: "asmith", password: "123" }; // déchèterie 1
const Chauffeur = { username: "rsmith2", password: "123" }; // déchèterie 1

const Responsable2 = { username: "jdurand", password: "123" }; // déchèterie 5
const Secretaire2 = { username: "jdoe3", password: "123" }; // déchèterie 5
const Employe2 = { username: "rlandry", password: "123" }; // déchèterie 6
const Chauffeur2 = { username: "lchevalier", password: "123" }; // déchèterie 5

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
    expect(list.body).toEqual({ message: "Login failed." });
  });

  test("should logout", async () => {
    const list = await request(app).get("/api/logout");
    expect(list.statusCode).toEqual(200);
    expect(list.text).toEqual({ message: "Logged out successfully." });
  });
});
