import { describe, test, expect } from "@jest/globals";
import app from "./server.js";
import request from "supertest";

const responsable = { username: "jdoe", password: "123" };
const secretaire = { username: "jferrara", password: "123" };
const employe = { username: "asmith", password: "123" };
const chauffeur = { username: "rsmith2", password: "123" };

describe("The API default route", () => {
  test("should receive Hello world!", async () => {
    const list = await request(app).get("/api");
    expect(list.statusCode).toEqual(200);
    expect(list.text).toEqual("Hello World!");
  });
});

describe("Login/Logout", () => {
  test("should login", async () => {
    const list = await request(app).post("/api/login").send(responsable);
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

describe("Ramassage employe", () => {
  test("create ramassage", async () => {
    const list = await request(app).post("/api/login").send(employe);
    const cookie = list.headers["set-cookie"];
    const ramassage = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 6,
        date: "2022-01-01",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });
  });

  test("create ramassage error", async () => {
    const list = await request(app).post("/api/login").send(employe);
    const cookie = list.headers["set-cookie"];
    const ramassage = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 1,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage.statusCode).toEqual(500);
    expect(ramassage.body).toEqual({ error: "Error adding ramassage" });
  });

  test("get ramassage", async () => {
    const list = await request(app).post("/api/login").send(employe);
    const cookie = list.headers["set-cookie"];
    const ramassage = await request(app)
      .get("/api/ramassage/1")
      .set("Cookie", cookie);
    expect(ramassage.statusCode).toEqual(200);
    expect(ramassage.body).toEqual([
      {
        id: 1,
        date: "2032-02-21",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    ]);
  });

  //test("get all futurs ramassages", async () => {

  // get all des ramassages futurs

  // get qui plante

  // delete qui plante

  // modifier qui plante

  ////// responsable

  // create

  // get all avec tous

  // update

  // delete
});
