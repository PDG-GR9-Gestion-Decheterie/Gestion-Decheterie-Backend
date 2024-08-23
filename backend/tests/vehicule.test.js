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

import { VehiculeOK, VehiculeKO, Forbidden } from "./message.test.js";

describe("Vehicule not logged in", () => {
  test("CRUD", async () => {
    // create
    const vehicule = await request(app).post("/api/vehicules").send({
      immatriculation: "VD999999",
      type: "camion",
      remorque: false,
      anneefabrication: "2010",
      dateexpertise: "2022-01-01",
      consocarburant: 10.5,
      fk_decheterie: 1,
    });
    expect(vehicule.statusCode).toEqual(403);
    expect(vehicule.body).toEqual({
      error: Forbidden.message,
    });

    // get one
    const vehiculeGet = await request(app).get("/api/vehicules/VD999999");
    expect(vehiculeGet.statusCode).toEqual(403);
    expect(vehiculeGet.body).toEqual({
      error: Forbidden.message,
    });

    // get all
    const vehiculeGetAll = await request(app).get("/api/vehicules");
    expect(vehiculeGetAll.statusCode).toEqual(403);
    expect(vehiculeGetAll.body).toEqual({
      error: Forbidden.message,
    });

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: true,
        anneefabrication: "2011",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
    expect(vehiculeUpdate.statusCode).toEqual(403);
    expect(vehiculeUpdate.body).toEqual({
      error: Forbidden.message,
    });

    // delete
    const vehiculeDelete = await request(app).delete("/api/vehicules/VD999999");
    expect(vehiculeDelete.statusCode).toEqual(403);
    expect(vehiculeDelete.body).toEqual({
      error: Forbidden.message,
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
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
    expect(vehicule.statusCode).toEqual(201);
    expect(vehicule.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(200);
    expect(vehiculeGet.body).toEqual({
      vehicules: {
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      },
    });

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual({
      vehicules: [
        {
          immatriculation: "VD999999",
          type: "camion",
          remorque: false,
          anneefabrication: "2010",
          dateexpertise: "2022-01-01",
          consocarburant: 10.5,
          fk_decheterie: 1,
        },
      ],
    });

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .set("Cookie", cookie)
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: true,
        anneefabrication: "2011",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
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
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
    expect(vehicule.statusCode).toEqual(201);
    expect(vehicule.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(200);
    expect(vehiculeGet.body).toEqual({
      vehicules: {
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      },
    });

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual({
      vehicules: [
        {
          immatriculation: "VD999999",
          type: "camion",
          remorque: false,
          anneefabrication: "2010",
          dateexpertise: "2022-01-01",
          consocarburant: 10.5,
          fk_decheterie: 1,
        },
      ],
    });

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .set("Cookie", cookie)
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: true,
        anneefabrication: "2011",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
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
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
    expect(vehicule.statusCode).toEqual(500);
    expect(vehicule.body).toEqual({
      error: VehiculeKO.add,
    });

    // create with Responsable rights
    const vehicule2 = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie2)
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
    expect(vehicule2.statusCode).toEqual(201);
    expect(vehicule2.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(500);
    expect(vehiculeGet.body).toEqual({
      error: VehiculeKO.get,
    });

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual({
      vehicules: [],
    });

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .set("Cookie", cookie)
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: true,
        anneefabrication: "2011",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
    expect(vehiculeUpdate.statusCode).toEqual(500);
    expect(vehiculeUpdate.body).toEqual({
      error: VehiculeKO.update,
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(500);
    expect(vehiculeDelete.body).toEqual({
      error: VehiculeKO.delete,
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
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
    expect(vehicule.statusCode).toEqual(500);
    expect(vehicule.body).toEqual({
      error: VehiculeKO.add,
    });

    // create with Responsable rights
    const vehicule2 = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie2)
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
    expect(vehicule2.statusCode).toEqual(201);
    expect(vehicule2.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(500);
    expect(vehiculeGet.body).toEqual({
      error: VehiculeKO.get,
    });

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual({
      vehicules: [],
    });

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .set("Cookie", cookie)
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: true,
        anneefabrication: "2011",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 1,
      });
    expect(vehiculeUpdate.statusCode).toEqual(500);
    expect(vehiculeUpdate.body).toEqual({
      error: VehiculeKO.update,
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(500);
    expect(vehiculeDelete.body).toEqual({
      error: VehiculeKO.delete,
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

    // create a employe with in a different primary decheterie
    const vehicule = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie)
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 6,
      });
    expect(vehicule.statusCode).toEqual(500);
    expect(vehicule.body).toEqual({
      error: VehiculeKO.add,
    });

    // create a employe with in the same primary decheterie
    const vehicule2 = await request(app)
      .post("/api/vehicules")
      .set("Cookie", cookie2)
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: false,
        anneefabrication: "2010",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 6,
      });
    expect(vehicule2.statusCode).toEqual(201);
    expect(vehicule2.body).toEqual({
      message: VehiculeOK.add,
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(500);
    expect(vehiculeGet.body).toEqual({
      error: VehiculeKO.get,
    });

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(200);
    expect(vehiculeGetAll.body).toEqual({
      vehicules: [],
    });

    // update
    const vehiculeUpdate = await request(app)
      .put("/api/vehicules/VD999999")
      .set("Cookie", cookie)
      .send({
        immatriculation: "VD999999",
        type: "camion",
        remorque: true,
        anneefabrication: "2012",
        dateexpertise: "2022-01-01",
        consocarburant: 10.5,
        fk_decheterie: 5,
      });
    expect(vehiculeUpdate.statusCode).toEqual(500);
    expect(vehiculeUpdate.body).toEqual({
      error: VehiculeKO.update,
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(500);
    expect(vehiculeDelete.body).toEqual({
      error: VehiculeKO.delete,
    });

    // delete
    const vehiculeDelete2 = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie2);
    expect(vehiculeDelete2.statusCode).toEqual(200);
    expect(vehiculeDelete2.body).toEqual({
      message: VehiculeOK.delete,
    });
  });
});
