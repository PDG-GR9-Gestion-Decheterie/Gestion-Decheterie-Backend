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
  ContenantOK,
  ContenantKO,
  contenant1CreateRequest,
  contenant1UpdateRequest,
  contenant1GetOneResponse,
  contenant1GetAllResponse,
  contenant2CreateRequest,
  contenant2UpdateRequest,
  dechet1GetAllResponse,
  contenant3CreateRequest,
  contenant3UpdateRequest1,
  contenant3UpdateRequest2,
  contenant3UpdateRequest3,
  contenant3UpdateRequest4,
  contenant3UpdateRequest5,
  contenant3UpdateRequest6,
  contenant3UpdateRequest7,
  contenant3UpdateRequest8,
  contenant3UpdateRequest9,
  contenant3UpdateRequest10,
} from "./contenantMessage.js";

describe("Contenant not logged in", () => {
  test("CRUD", async () => {
    // create
    const contenant = await request(app)
      .post("/api/contenants")
      .send(contenant1CreateRequest);
    expect(contenant.statusCode).toEqual(401);
    expect(contenant.body).toEqual({
      error: Unauthorized.error,
    });

    // get one
    const contenantGet = await request(app).get("/api/contenants/100");
    expect(contenantGet.statusCode).toEqual(401);
    expect(contenantGet.body).toEqual({
      error: Unauthorized.error,
    });

    // get all
    const contenantGetAll = await request(app).get("/api/contenants");
    expect(contenantGetAll.statusCode).toEqual(401);
    expect(contenantGetAll.body).toEqual({
      error: Unauthorized.error,
    });

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .send(contenant1UpdateRequest);
    expect(contenantUpdate.statusCode).toEqual(401);
    expect(contenantUpdate.body).toEqual({
      error: Unauthorized.error,
    });

    // delete
    const contenantDelete = await request(app).delete("/api/contenants/100");
    expect(contenantDelete.statusCode).toEqual(401);
    expect(contenantDelete.body).toEqual({
      error: Unauthorized.error,
    });
  });
});

describe("Contenant CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create
    const contenant = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie)
      .send(contenant1CreateRequest);
    expect(contenant.statusCode).toEqual(201);
    expect(contenant.body).toEqual({
      message: ContenantOK.add,
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(200);
    expect(contenantGet.body).toEqual(contenant1GetOneResponse);

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual(contenant1GetAllResponse);

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send(contenant1UpdateRequest);
    expect(contenantUpdate.statusCode).toEqual(200);
    expect(contenantUpdate.body).toEqual({
      message: ContenantOK.update,
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(200);
    expect(contenantDelete.body).toEqual({
      message: ContenantOK.delete,
    });
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    // create
    const contenant = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie)
      .send(contenant1CreateRequest);
    expect(contenant.statusCode).toEqual(201);
    expect(contenant.body).toEqual({
      message: ContenantOK.add,
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(200);
    expect(contenantGet.body).toEqual(contenant1GetOneResponse);

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual(contenant1GetAllResponse);

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send(contenant1UpdateRequest);
    expect(contenantUpdate.statusCode).toEqual(200);
    expect(contenantUpdate.body).toEqual({
      message: ContenantOK.update,
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(200);
    expect(contenantDelete.body).toEqual({
      message: ContenantOK.delete,
    });
  });

  test("Employe", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const contenant = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie)
      .send(contenant1CreateRequest);
    expect(contenant.statusCode).toEqual(403);
    expect(contenant.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable rights
    const contenant2 = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie2)
      .send(contenant1CreateRequest);
    expect(contenant2.statusCode).toEqual(201);
    expect(contenant2.body).toEqual({
      message: ContenantOK.add,
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(200);
    expect(contenantGet.body).toEqual(contenant1GetOneResponse);

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual(contenant1GetAllResponse);

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send(contenant1UpdateRequest);
    expect(contenantUpdate.statusCode).toEqual(403);
    expect(contenantUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(403);
    expect(contenantDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable rights
    const contenantDelete2 = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie2);
    expect(contenantDelete2.statusCode).toEqual(200);
    expect(contenantDelete2.body).toEqual({
      message: ContenantOK.delete,
    });
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const contenant = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie)
      .send(contenant1CreateRequest);
    expect(contenant.statusCode).toEqual(403);
    expect(contenant.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable rights
    const contenant2 = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie2)
      .send(contenant1CreateRequest);
    expect(contenant2.statusCode).toEqual(201);
    expect(contenant2.body).toEqual({
      message: ContenantOK.add,
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(200);
    expect(contenantGet.body).toEqual(contenant1GetOneResponse);

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual(contenant1GetAllResponse);

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send(contenant1UpdateRequest);
    expect(contenantUpdate.statusCode).toEqual(403);
    expect(contenantUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(403);
    expect(contenantDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable rights
    const contenantDelete2 = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie2);
    expect(contenantDelete2.statusCode).toEqual(200);
    expect(contenantDelete2.body).toEqual({
      message: ContenantOK.delete,
    });
  });
});

describe("Contenant CRUD with different decheterie", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable2);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const contenant = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie)
      .send(contenant2CreateRequest);
    expect(contenant.statusCode).toEqual(403);
    expect(contenant.body).toEqual({
      error: Forbidden.error,
    });

    const contenant2 = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie2)
      .send(contenant2CreateRequest);
    expect(contenant2.statusCode).toEqual(201);
    expect(contenant2.body).toEqual({
      message: ContenantOK.add,
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/200")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(403);
    expect(contenantGet.body).toEqual({
      error: Forbidden.error,
    });

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual(dechet1GetAllResponse);

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/200")
      .set("Cookie", cookie)
      .send(contenant2UpdateRequest);
    expect(contenantUpdate.statusCode).toEqual(403);
    expect(contenantUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/200")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(403);
    expect(contenantDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const contenantDelete2 = await request(app)
      .delete("/api/contenants/200")
      .set("Cookie", cookie2);
    expect(contenantDelete2.statusCode).toEqual(200);
    expect(contenantDelete2.body).toEqual({
      message: ContenantOK.delete,
    });
  });
});

describe("Contenant CRUD check integrity", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create
    const contenant = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie)
      .send(contenant3CreateRequest);
    expect(contenant.statusCode).toEqual(201);
    expect(contenant.body).toEqual({
      message: ContenantOK.add,
    });

    // update test for:
    // les big bag ont une taille : petite, moyenne ou grande.
    const contenantUpdate = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest1);
    expect(contenantUpdate.statusCode).toEqual(500);
    expect(contenantUpdate.body).toEqual({
      error: ContenantKO.update,
    });

    const contenantUpdate2 = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest2);
    expect(contenantUpdate2.statusCode).toEqual(500);
    expect(contenantUpdate2.body).toEqual({
      error: ContenantKO.update,
    });

    const contenantUpdate3 = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest3);
    expect(contenantUpdate3.statusCode).toEqual(500);
    expect(contenantUpdate3.body).toEqual({
      error: ContenantKO.update,
    });

    const contenantUpdate4 = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest4);
    expect(contenantUpdate4.statusCode).toEqual(500);
    expect(contenantUpdate4.body).toEqual({
      error: ContenantKO.update,
    });

    const contenantUpdate5 = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest5);
    expect(contenantUpdate5.statusCode).toEqual(500);
    expect(contenantUpdate5.body).toEqual({
      error: ContenantKO.update,
    });

    // update test for:
    // les palettes possèdent un nombre de cadres (entre 0 et 4).
    const contenantUpdate6 = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest6);
    expect(contenantUpdate6.statusCode).toEqual(500);
    expect(contenantUpdate6.body).toEqual({
      error: ContenantKO.update,
    });

    const contenantUpdate7 = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest7);
    expect(contenantUpdate7.statusCode).toEqual(500);
    expect(contenantUpdate7.body).toEqual({
      error: ContenantKO.update,
    });

    const contenantUpdate8 = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest8);
    expect(contenantUpdate8.statusCode).toEqual(500);
    expect(contenantUpdate8.body).toEqual({
      error: ContenantKO.update,
    });

    const contenantUpdate9 = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest9);
    expect(contenantUpdate9.statusCode).toEqual(500);
    expect(contenantUpdate9.body).toEqual({
      error: ContenantKO.update,
    });

    const contenantUpdate10 = await request(app)
      .put("/api/contenants/300")
      .set("Cookie", cookie)
      .send(contenant3UpdateRequest10);
    expect(contenantUpdate10.statusCode).toEqual(500);
    expect(contenantUpdate10.body).toEqual({
      error: ContenantKO.update,
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/300")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(200);
    expect(contenantDelete.body).toEqual({
      message: ContenantOK.delete,
    });
  });
});
