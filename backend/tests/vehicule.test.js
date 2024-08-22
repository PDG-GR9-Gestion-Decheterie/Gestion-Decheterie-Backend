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
      message: "Vehicule added successfully",
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
      message: "Vehicule updated successfully",
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(200);
    expect(vehiculeDelete.body).toEqual({
      message: "Vehicule deleted successfully",
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
      message: "Vehicule added successfully",
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
      message: "Vehicule updated successfully",
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(200);
    expect(vehiculeDelete.body).toEqual({
      message: "Vehicule deleted successfully",
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
      message: "Error adding vehicule",
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
      message: "Vehicule added successfully",
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(500);
    expect(vehiculeGet.body).toEqual({
      message: "Error getting vehicule",
    });

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(500);
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
      message: "Error updating vehicule",
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(500);
    expect(vehiculeDelete.body).toEqual({
      message: "Error deleting vehicule",
    });

    // delete with Responsable rights
    const vehiculeDelete2 = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie2);
    expect(vehiculeDelete2.statusCode).toEqual(200);
    expect(vehiculeDelete2.body).toEqual({
      message: "Vehicule deleted successfully",
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
      message: "Error adding vehicule",
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
      message: "Vehicule added successfully",
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(500);
    expect(vehiculeGet.body).toEqual({
      message: "Error getting vehicule",
    });

    // get all
    const vehiculeGetAll = await request(app)
      .get("/api/vehicules")
      .set("Cookie", cookie);
    expect(vehiculeGetAll.statusCode).toEqual(500);
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
      message: "Error updating vehicule",
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(500);
    expect(vehiculeDelete.body).toEqual({
      message: "Error deleting vehicule",
    });

    // delete with Responsable rights
    const vehiculeDelete2 = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie2);
    expect(vehiculeDelete2.statusCode).toEqual(200);
    expect(vehiculeDelete2.body).toEqual({
      message: "Vehicule deleted successfully",
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
      message: "Error adding vehicule",
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
      message: "Vehicule added successfully",
    });

    // get one
    const vehiculeGet = await request(app)
      .get("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeGet.statusCode).toEqual(500);
    expect(vehiculeGet.body).toEqual({
      message: "Error getting vehicule",
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
      message: "Error updating vehicule",
    });

    // delete
    const vehiculeDelete = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie);
    expect(vehiculeDelete.statusCode).toEqual(500);
    expect(vehiculeDelete.body).toEqual({
      message: "Error deleting vehicule",
    });
    const vehiculeDelete2 = await request(app)
      .delete("/api/vehicules/VD999999")
      .set("Cookie", cookie2);
    expect(vehiculeDelete2.statusCode).toEqual(200);
    expect(vehiculeDelete2.body).toEqual({
      message: "Vehicule deleted successfully",
    });
  });
});
