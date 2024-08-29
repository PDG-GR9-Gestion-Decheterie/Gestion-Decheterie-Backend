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
  VehiculeOK,
  VehiculeKO,
  truck1CreateRequest,
  truck1GetOneResponse,
  truck1UpdateRequest,
  truck1getAllResponse,
  truck2CreateRequest,
  truck2GetOneResponse,
  truck2UpdateRequest,
  dechet1GetAllResponse,
  truck3CreateRequest,
} from "./vehiculeMessage.js";

describe("Vehicule not logged in", () => {
  test("CRUD", async () => {
    // create
    const vehicule = await request(app)
      .post("/api/vehicules")
      .send(truck1CreateRequest);
    expect(vehicule.statusCode).toEqual(401);
    expect(vehicule.body).toEqual({
      error: Unauthorized.error,
    });

    // get one
    const vehiculeGet = await request(app).get("/api/vehicules/VD999999");
    expect(vehiculeGet.statusCode).toEqual(401);
    expect(vehiculeGet.body).toEqual({
      error: Unauthorized.error,
    });

    // get all
    const vehiculeGetAll = await request(app).get("/api/vehicules");
    expect(vehiculeGetAll.statusCode).toEqual(401);
    expect(vehiculeGetAll.body).toEqual({
      error: Unauthorized.error,
    });

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .send(truck1UpdateRequest);
    expect(vehiculeUpdate.statusCode).toEqual(401);
    expect(vehiculeUpdate.body).toEqual({
      error: Unauthorized.error,
    });

    // delete
    const vehiculeDelete = await request(app).delete("/api/vehicules/VD999999");
    expect(vehiculeDelete.statusCode).toEqual(401);
    expect(vehiculeDelete.body).toEqual({
      error: Unauthorized.error,
    });
  });
});

describe("Vehicule CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create
    const vehicule = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie)
      .send(truck1CreateRequest);
    expect(vehicule.statusCode).toEqual(201);
    expect(vehicule.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(200);
    expect(vehiculeGet.body).toEqual(truck1GetOneResponse);

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual(truck1getAllResponse);

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .set("Cookie", cookie)
      .send(truck1UpdateRequest);
    expect(vehiculeUpdate.statusCode).toEqual(200);
    expect(vehiculeUpdate.body).toEqual({
      message: VehiculeOK.update,
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(200);
    expect(vehiculeDelete.body).toEqual({
      message: VehiculeOK.delete,
    });
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    // create
    const vehicule = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie)
      .send(truck1CreateRequest);
    expect(vehicule.statusCode).toEqual(201);
    expect(vehicule.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(200);
    expect(vehiculeGet.body).toEqual(truck1GetOneResponse);

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual(truck1getAllResponse);

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .set("Cookie", cookie)
      .send(truck1UpdateRequest);
    expect(vehiculeUpdate.statusCode).toEqual(200);
    expect(vehiculeUpdate.body).toEqual({
      message: VehiculeOK.update,
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(200);
    expect(vehiculeDelete.body).toEqual({
      message: VehiculeOK.delete,
    });
  });

  test("Employe", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const vehicule = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie)
      .send(truck1CreateRequest);
    expect(vehicule.statusCode).toEqual(403);
    expect(vehicule.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable rights
    const vehicule2 = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie2)
      .send(truck1CreateRequest);
    expect(vehicule2.statusCode).toEqual(201);
    expect(vehicule2.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(200);
    expect(vehiculeGet.body).toEqual(truck1GetOneResponse);

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual(truck1getAllResponse);

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .set("Cookie", cookie)
      .send(truck1UpdateRequest);
    expect(vehiculeUpdate.statusCode).toEqual(403);
    expect(vehiculeUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(403);
    expect(vehiculeDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable rights
    const vehiculeDelete2 = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie2);
    expect(vehiculeDelete2.statusCode).toEqual(200);
    expect(vehiculeDelete2.body).toEqual({
      message: VehiculeOK.delete,
    });
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const vehicule = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie)
      .send(truck1CreateRequest);
    expect(vehicule.statusCode).toEqual(403);
    expect(vehicule.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable rights
    const vehicule2 = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie2)
      .send(truck1CreateRequest);
    expect(vehicule2.statusCode).toEqual(201);
    expect(vehicule2.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(200);
    expect(vehiculeGet.body).toEqual(truck1GetOneResponse);

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual(truck1getAllResponse);

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .set("Cookie", cookie)
      .send(truck1UpdateRequest);
    expect(vehiculeUpdate.statusCode).toEqual(403);
    expect(vehiculeUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(403);
    expect(vehiculeDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable rights
    const vehiculeDelete2 = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie2);
    expect(vehiculeDelete2.statusCode).toEqual(200);
    expect(vehiculeDelete2.body).toEqual({
      message: VehiculeOK.delete,
    });
  });
});

describe("Vehicule CRUD on a diffrent decheterie", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable2);
    const cookie2 = list2.headers["set-cookie"];

    // create a vehicule with in a different primary decheterie
    const vehicule = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie)
      .send(truck2CreateRequest);
    expect(vehicule.statusCode).toEqual(403);
    expect(vehicule.body).toEqual({
      error: Forbidden.error,
    });

    // create a vehicule with in the same primary decheterie
    const vehicule2 = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie2)
      .send(truck2CreateRequest);
    expect(vehicule2.statusCode).toEqual(201);
    expect(vehicule2.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD888888")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(403);
    expect(vehiculeGet.body).toEqual({
      error: Forbidden.error,
    });

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual(dechet1GetAllResponse);

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD888888")
      .set("Cookie", cookie)
      .send(truck2UpdateRequest);
    expect(vehiculeUpdate.statusCode).toEqual(403);
    expect(vehiculeUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD888888")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(403);
    expect(vehiculeDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const vehiculeDelete2 = await request(app)
      .delete("/api/vehicules/VD888888")
      .set("Cookie", cookie2);
    expect(vehiculeDelete2.statusCode).toEqual(200);
    expect(vehiculeDelete2.body).toEqual({
      message: VehiculeOK.delete,
    });
  });
});

describe("Vehicule test invalid data", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create
    const vehicule = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie)
      .send(truck1CreateRequest);
    expect(vehicule.statusCode).toEqual(201);
    expect(vehicule.body).toEqual({
      message: VehiculeOK.add,
    });

    // create
    const vehicule2 = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie)
      .send(truck3CreateRequest);
    expect(vehicule2.statusCode).toEqual(403);
    expect(vehicule2.body).toEqual({
      error: Forbidden.error,
    });
  });
});
