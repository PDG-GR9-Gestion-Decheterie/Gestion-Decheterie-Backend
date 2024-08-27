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
  AdresseOK,
  AdresseKO,
  adresse1CreateRequest,
  adresse1UpdateRequest,
  adresse1GetOneResponse,
  adresse1GetAllResponse,
} from "./adresseMessage.js";

describe("Adresse not logged in", () => {
  test("CRUD", async () => {
    // create
    const adresse = await request(app)
      .post("/api/adresses")
      .send(adresse1CreateRequest);
    expect(adresse.statusCode).toEqual(401);
    expect(adresse.body).toEqual({
      error: Unauthorized.error,
    });

    // get one
    const adresseGet = await request(app).get("/api/adresses/10");
    expect(adresseGet.statusCode).toEqual(401);
    expect(adresseGet.body).toEqual({
      error: Unauthorized.error,
    });

    // get all
    const adresseGetAll = await request(app).get("/api/adresses");
    expect(adresseGetAll.statusCode).toEqual(401);
    expect(adresseGetAll.body).toEqual({
      error: Unauthorized.error,
    });

    // update
    const adresseUpdate = await request(app)
      .put("/api/adresses/10")
      .send(adresse1UpdateRequest);
    expect(adresseUpdate.statusCode).toEqual(401);
    expect(adresseUpdate.body).toEqual({
      error: Unauthorized.error,
    });

    // delete
    const adresseDelete = await request(app).delete("/api/adresses/10");
    expect(adresseDelete.statusCode).toEqual(401);
    expect(adresseDelete.body).toEqual({
      error: Unauthorized.error,
    });
  });
});

describe("Adresse CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create
    const adresse = await request(app)
      .post("/api/adresses")
      .set("Cookie", cookie)
      .send(adresse1CreateRequest);
    expect(adresse.statusCode).toEqual(201);
    expect(adresse.body).toEqual({
      message: AdresseOK.add,
    });

    // get one
    const adresseGet = await request(app)
      .get("/api/adresses/10")
      .set("Cookie", cookie);
    expect(adresseGet.statusCode).toEqual(200);
    expect(adresseGet.body).toEqual(adresse1GetOneResponse);

    // get all
    const adresseGetAll = await request(app)
      .get("/api/adresses")
      .set("Cookie", cookie);
    expect(adresseGetAll.statusCode).toEqual(200);
    expect(adresseGetAll.body).toEqual(adresse1GetAllResponse);

    // update
    const adresseUpdate = await request(app)
      .put("/api/adresses/10")
      .set("Cookie", cookie)
      .send(adresse1UpdateRequest);
    expect(adresseUpdate.statusCode).toEqual(200);
    expect(adresseUpdate.body).toEqual({
      message: AdresseOK.update,
    });

    // delete
    const adresseDelete = await request(app)
      .delete("/api/adresses/10")
      .set("Cookie", cookie);
    expect(adresseDelete.statusCode).toEqual(200);
    expect(adresseDelete.body).toEqual({
      message: AdresseOK.delete,
    });
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    // create
    const adresse = await request(app)
      .post("/api/adresses")
      .set("Cookie", cookie)
      .send(adresse1CreateRequest);
    expect(adresse.statusCode).toEqual(201);
    expect(adresse.body).toEqual({
      message: AdresseOK.add,
    });

    // get one
    const adresseGet = await request(app)
      .get("/api/adresses/10")
      .set("Cookie", cookie);
    expect(adresseGet.statusCode).toEqual(200);
    expect(adresseGet.body).toEqual(adresse1GetOneResponse);

    // get all
    const adresseGetAll = await request(app)
      .get("/api/adresses")
      .set("Cookie", cookie);
    expect(adresseGetAll.statusCode).toEqual(200);
    expect(adresseGetAll.body).toEqual(adresse1GetAllResponse);

    // update
    const adresseUpdate = await request(app)
      .put("/api/adresses/10")
      .set("Cookie", cookie)
      .send(adresse1UpdateRequest);
    expect(adresseUpdate.statusCode).toEqual(200);
    expect(adresseUpdate.body).toEqual({
      message: AdresseOK.update,
    });

    // delete
    const adresseDelete = await request(app)
      .delete("/api/adresses/10")
      .set("Cookie", cookie);
    expect(adresseDelete.statusCode).toEqual(200);
    expect(adresseDelete.body).toEqual({
      message: AdresseOK.delete,
    });
  });

  test("Employé", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    // create
    const adresse = await request(app)
      .post("/api/adresses")
      .set("Cookie", cookie)
      .send(adresse1CreateRequest);
    expect(adresse.statusCode).toEqual(201);
    expect(adresse.body).toEqual({
      message: AdresseOK.add,
    });

    // get one
    const adresseGet = await request(app)
      .get("/api/adresses/10")
      .set("Cookie", cookie);
    expect(adresseGet.statusCode).toEqual(200);
    expect(adresseGet.body).toEqual(adresse1GetOneResponse);

    // get all
    const adresseGetAll = await request(app)
      .get("/api/adresses")
      .set("Cookie", cookie);
    expect(adresseGetAll.statusCode).toEqual(200);
    expect(adresseGetAll.body).toEqual(adresse1GetAllResponse);

    // update
    const adresseUpdate = await request(app)
      .put("/api/adresses/10")
      .set("Cookie", cookie)
      .send(adresse1UpdateRequest);
    expect(adresseUpdate.statusCode).toEqual(200);
    expect(adresseUpdate.body).toEqual({
      message: AdresseOK.update,
    });

    // delete
    const adresseDelete = await request(app)
      .delete("/api/adresses/10")
      .set("Cookie", cookie);
    expect(adresseDelete.statusCode).toEqual(200);
    expect(adresseDelete.body).toEqual({
      message: AdresseOK.delete,
    });
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    // create
    const adresse = await request(app)
      .post("/api/adresses")
      .set("Cookie", cookie)
      .send(adresse1CreateRequest);
    expect(adresse.statusCode).toEqual(201);
    expect(adresse.body).toEqual({
      message: AdresseOK.add,
    });

    // get one
    const adresseGet = await request(app)
      .get("/api/adresses/10")
      .set("Cookie", cookie);
    expect(adresseGet.statusCode).toEqual(200);
    expect(adresseGet.body).toEqual(adresse1GetOneResponse);

    // get all
    const adresseGetAll = await request(app)
      .get("/api/adresses")
      .set("Cookie", cookie);
    expect(adresseGetAll.statusCode).toEqual(200);
    expect(adresseGetAll.body).toEqual(adresse1GetAllResponse);

    // update
    const adresseUpdate = await request(app)
      .put("/api/adresses/10")
      .set("Cookie", cookie)
      .send(adresse1UpdateRequest);
    expect(adresseUpdate.statusCode).toEqual(200);
    expect(adresseUpdate.body).toEqual({
      message: AdresseOK.update,
    });

    // delete
    const adresseDelete = await request(app)
      .delete("/api/adresses/10")
      .set("Cookie", cookie);
    expect(adresseDelete.statusCode).toEqual(200);
    expect(adresseDelete.body).toEqual({
      message: AdresseOK.delete,
    });
  });
});
