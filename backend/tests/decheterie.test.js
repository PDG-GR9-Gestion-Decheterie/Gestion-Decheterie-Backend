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
  DecheterieOK,
  DecheterieKO,
  decheterie1CreateRequest,
  decheterie1UpdateRequest,
  decheterie1GetOneResponse,
  decheterie1GetAllResponse,
} from "./decheterieMessage.js";

describe("Decheterie not logged in", () => {
  test("CRUD", async () => {
    // create
    const decheterie = await request(app)
      .post("/api/decheteries")
      .send(decheterie1CreateRequest);
    expect(decheterie.statusCode).toEqual(401);
    expect(decheterie.body).toEqual({
      error: Unauthorized.error,
    });

    // get one
    const decheterieGet = await request(app).get("/api/decheteries/10");
    expect(decheterieGet.statusCode).toEqual(401);
    expect(decheterieGet.body).toEqual({
      error: Unauthorized.error,
    });

    // get all
    const decheterieGetAll = await request(app).get("/api/decheteries");
    expect(decheterieGetAll.statusCode).toEqual(401);
    expect(decheterieGetAll.body).toEqual({
      error: Unauthorized.error,
    });

    // update
    const decheterieUpdate = await request(app)
      .put("/api/decheteries/10")
      .send(decheterie1UpdateRequest);
    expect(decheterieUpdate.statusCode).toEqual(401);
    expect(decheterieUpdate.body).toEqual({
      error: Unauthorized.error,
    });

    // delete
    const decheterieDelete = await request(app).delete("/api/decheteries/10");
    expect(decheterieDelete.statusCode).toEqual(401);
    expect(decheterieDelete.body).toEqual({
      error: Unauthorized.error,
    });
  });
});

describe("Decheterie CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create
    const decheterie = await request(app)
      .post("/api/decheteries")
      .set("Cookie", cookie)
      .send(decheterie1CreateRequest);
    expect(decheterie.statusCode).toEqual(201);
    expect(decheterie.body).toEqual({
      message: DecheterieOK.add,
    });

    // get one
    const decheterieGet = await request(app)
      .get("/api/decheteries/10")
      .set("Cookie", cookie);
    expect(decheterieGet.statusCode).toEqual(200);
    expect(decheterieGet.body).toEqual(decheterie1GetOneResponse);

    // get all
    const decheterieGetAll = await request(app)
      .get("/api/decheteries")
      .set("Cookie", cookie);
    expect(decheterieGetAll.statusCode).toEqual(200);
    expect(decheterieGetAll.body).toEqual(decheterie1GetAllResponse);

    // update
    const decheterieUpdate = await request(app)
      .put("/api/decheteries/10")
      .set("Cookie", cookie)
      .send(decheterie1UpdateRequest);
    expect(decheterieUpdate.statusCode).toEqual(200);
    expect(decheterieUpdate.body).toEqual({
      message: DecheterieOK.update,
    });

    // delete
    const decheterieDelete = await request(app)
      .delete("/api/decheteries/10")
      .set("Cookie", cookie);
    expect(decheterieDelete.statusCode).toEqual(200);
    expect(decheterieDelete.body).toEqual({
      message: DecheterieOK.delete,
    });
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const decheterie = await request(app)
      .post("/api/decheteries")
      .set("Cookie", cookie)
      .send(decheterie1CreateRequest);
    expect(decheterie.statusCode).toEqual(403);
    expect(decheterie.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable
    const decheterie2 = await request(app)
      .post("/api/decheteries")
      .set("Cookie", cookie2)
      .send(decheterie1CreateRequest);
    expect(decheterie.statusCode).toEqual(201);
    expect(decheterie.body).toEqual({
      message: DecheterieOK.add,
    });

    // get one
    const decheterieGet = await request(app)
      .get("/api/decheteries/10")
      .set("Cookie", cookie);
    expect(decheterieGet.statusCode).toEqual(200);
    expect(decheterieGet.body).toEqual(decheterie1GetOneResponse);

    // get all
    const decheterieGetAll = await request(app)
      .get("/api/decheteries")
      .set("Cookie", cookie);
    expect(decheterieGetAll.statusCode).toEqual(200);
    expect(decheterieGetAll.body).toEqual(decheterie1GetAllResponse);

    // update
    const decheterieUpdate = await request(app)
      .put("/api/decheteries/10")
      .set("Cookie", cookie)
      .send(decheterie1UpdateRequest);
    expect(decheterieUpdate.statusCode).toEqual(403);
    expect(decheterieUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const decheterieDelete = await request(app)
      .delete("/api/decheteries/10")
      .set("Cookie", cookie);
    expect(decheterieDelete.statusCode).toEqual(403);
    expect(decheterieDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable
    const decheterieDelete2 = await request(app)
      .delete("/api/decheteries/10")
      .set("Cookie", cookie2);
    expect(decheterieDelete2.statusCode).toEqual(200);
    expect(decheterieDelete2.body).toEqual({
      message: DecheterieOK.delete,
    });
  });

  test("Employé", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const decheterie = await request(app)
      .post("/api/decheteries")
      .set("Cookie", cookie)
      .send(decheterie1CreateRequest);
    expect(decheterie.statusCode).toEqual(403);
    expect(decheterie.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable
    const decheterie2 = await request(app)
      .post("/api/decheteries")
      .set("Cookie", cookie2)
      .send(decheterie1CreateRequest);
    expect(decheterie.statusCode).toEqual(201);
    expect(decheterie.body).toEqual({
      message: DecheterieOK.add,
    });

    // get one
    const decheterieGet = await request(app)
      .get("/api/decheteries/10")
      .set("Cookie", cookie);
    expect(decheterieGet.statusCode).toEqual(200);
    expect(decheterieGet.body).toEqual(decheterie1GetOneResponse);

    // get all
    const decheterieGetAll = await request(app)
      .get("/api/decheteries")
      .set("Cookie", cookie);
    expect(decheterieGetAll.statusCode).toEqual(200);
    expect(decheterieGetAll.body).toEqual(decheterie1GetAllResponse);

    // update
    const decheterieUpdate = await request(app)
      .put("/api/decheteries/10")
      .set("Cookie", cookie)
      .send(decheterie1UpdateRequest);
    expect(decheterieUpdate.statusCode).toEqual(403);
    expect(decheterieUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const decheterieDelete = await request(app)
      .delete("/api/decheteries/10")
      .set("Cookie", cookie);
    expect(decheterieDelete.statusCode).toEqual(403);
    expect(decheterieDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable
    const decheterieDelete2 = await request(app)
      .delete("/api/decheteries/10")
      .set("Cookie", cookie2);
    expect(decheterieDelete2.statusCode).toEqual(200);
    expect(decheterieDelete2.body).toEqual({
      message: DecheterieOK.delete,
    });
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const decheterie = await request(app)
      .post("/api/decheteries")
      .set("Cookie", cookie)
      .send(decheterie1CreateRequest);
    expect(decheterie.statusCode).toEqual(403);
    expect(decheterie.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable
    const decheterie2 = await request(app)
      .post("/api/decheteries")
      .set("Cookie", cookie2)
      .send(decheterie1CreateRequest);
    expect(decheterie.statusCode).toEqual(201);
    expect(decheterie.body).toEqual({
      message: DecheterieOK.add,
    });

    // get one
    const decheterieGet = await request(app)
      .get("/api/decheteries/10")
      .set("Cookie", cookie);
    expect(decheterieGet.statusCode).toEqual(200);
    expect(decheterieGet.body).toEqual(decheterie1GetOneResponse);

    // get all
    const decheterieGetAll = await request(app)
      .get("/api/decheteries")
      .set("Cookie", cookie);
    expect(decheterieGetAll.statusCode).toEqual(200);
    expect(decheterieGetAll.body).toEqual(decheterie1GetAllResponse);

    // update
    const decheterieUpdate = await request(app)
      .put("/api/decheteries/10")
      .set("Cookie", cookie)
      .send(decheterie1UpdateRequest);
    expect(decheterieUpdate.statusCode).toEqual(403);
    expect(decheterieUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const decheterieDelete = await request(app)
      .delete("/api/decheteries/10")
      .set("Cookie", cookie);
    expect(decheterieDelete.statusCode).toEqual(403);
    expect(decheterieDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable
    const decheterieDelete2 = await request(app)
      .delete("/api/decheteries/10")
      .set("Cookie", cookie2);
    expect(decheterieDelete2.statusCode).toEqual(200);
    expect(decheterieDelete2.body).toEqual({
      message: DecheterieOK.delete,
    });
  });
});

// todo check if necessary to test with different primary decheterie
