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

import {
  RamassageOK,
  RamassageKO,
  Forbidden,
  Unauthorized,
} from "./message.js";

import {
  ram6CreateRequest,
  ram10CreateRequest,
  ram6UpdateRequest,
  ram6GetOneResponse,
  responsableGetAllResponse,
  employeGetAllResponse,
  ram11CreateRequest,
  ram11UpdateRequest,
  dechet1GetAllResponse,
  ram12CreateRequest,
  ram13CreateRequest,
} from "./ramassageMessage.js";

describe("Ramassage not logged in", () => {
  test("CRUD", async () => {
    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassages")
      .send(ram6CreateRequest);
    expect(ramassage.statusCode).toEqual(401);
    expect(ramassage.body).toEqual({
      error: Unauthorized.error,
    });

    // get one
    const ramassageGet = await request(app).get("/api/ramassages/6");
    expect(ramassageGet.statusCode).toEqual(401);
    expect(ramassageGet.body).toEqual({
      error: Unauthorized.error,
    });

    // get all
    const ramassageGetAll = await request(app).get("/api/ramassages");
    expect(ramassageGetAll.statusCode).toEqual(401);
    expect(ramassageGetAll.body).toEqual({
      error: Unauthorized.error,
    });

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassages/6")
      .send(ram6UpdateRequest);
    expect(ramassageUpdate.statusCode).toEqual(401);
    expect(ramassageUpdate.body).toEqual({
      error: Unauthorized.error,
    });

    // delete
    const ramassageDelete = await request(app).delete("/api/ramassages/6");
    expect(ramassageDelete.statusCode).toEqual(401);
    expect(ramassageDelete.body).toEqual({
      error: Unauthorized.error,
    });
  });
});

describe("Ramassage CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram6CreateRequest);
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram10CreateRequest);
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: RamassageOK.add,
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(200);
    expect(ramassageGet.body).toEqual(ram6GetOneResponse);

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassages")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual(responsableGetAllResponse);

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassages/6")
      .set("Cookie", cookie)
      .send(ram6UpdateRequest);
    expect(ramassageUpdate.statusCode).toEqual(200);
    expect(ramassageUpdate.body).toEqual({
      message: RamassageOK.update,
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(200);
    expect(ramassageDelete.body).toEqual({
      message: RamassageOK.delete,
    });

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/10")
      .set("Cookie", cookie);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: RamassageOK.delete,
    });
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram6CreateRequest);
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram10CreateRequest);
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: RamassageOK.add,
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(200);
    expect(ramassageGet.body).toEqual(ram6GetOneResponse);

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassages")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual(responsableGetAllResponse);

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassages/6")
      .set("Cookie", cookie)
      .send(ram6UpdateRequest);
    expect(ramassageUpdate.statusCode).toEqual(200);
    expect(ramassageUpdate.body).toEqual({
      message: RamassageOK.update,
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(200);
    expect(ramassageDelete.body).toEqual({
      message: RamassageOK.delete,
    });

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/10")
      .set("Cookie", cookie);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: RamassageOK.delete,
    });
  });

  test("Employe", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram6CreateRequest);
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram10CreateRequest);
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: RamassageOK.add,
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(200);
    expect(ramassageGet.body).toEqual(ram6GetOneResponse);

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassages")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual(employeGetAllResponse);

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassages/6")
      .set("Cookie", cookie)
      .send(ram6UpdateRequest);
    expect(ramassageUpdate.statusCode).toEqual(403);
    expect(ramassageUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(403);
    expect(ramassageDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete all with Responsable
    const listResp = await request(app).post("/api/login").send(Responsable);
    const cookieResp = listResp.headers["set-cookie"];

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookieResp);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: RamassageOK.delete,
    });
    const ramassageDelete3 = await request(app)
      .delete("/api/ramassages/10")
      .set("Cookie", cookie);
    expect(ramassageDelete3.statusCode).toEqual(200);
    expect(ramassageDelete3.body).toEqual({
      message: RamassageOK.delete,
    });
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram6CreateRequest);
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram10CreateRequest);
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: RamassageOK.add,
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(200);
    expect(ramassageGet.body).toEqual(ram6GetOneResponse);

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassages")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual(employeGetAllResponse);

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassages/6")
      .set("Cookie", cookie)
      .send(ram6UpdateRequest);
    expect(ramassageUpdate.statusCode).toEqual(403);
    expect(ramassageUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(403);
    expect(ramassageDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete all with Responsable
    const listResp = await request(app).post("/api/login").send(Responsable);
    const cookieResp = listResp.headers["set-cookie"];

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookieResp);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: RamassageOK.delete,
    });
    const ramassageDelete3 = await request(app)
      .delete("/api/ramassages/10")
      .set("Cookie", cookie);
    expect(ramassageDelete3.statusCode).toEqual(200);
    expect(ramassageDelete3.body).toEqual({
      message: RamassageOK.delete,
    });
  });
});

// TODO check if necessary
describe("Ramassage CRUD not working", () => {
  test("Responsable not working", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram6CreateRequest);
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
    });

    // create the same
    const ramassage2 = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram6CreateRequest);
    expect(ramassage2.statusCode).toEqual(500);
    expect(ramassage2.body).toEqual({
      error: RamassageKO.add,
    });

    // get one that does not exist
    const ramassageGet = await request(app)
      .get("/api/ramassages/99")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(500);
    expect(ramassageGet.body).toEqual({
      error: RamassageKO.get,
    });

    // update one that does not exist
    const ramassageUpdate = await request(app)
      .put("/api/ramassages/99")
      .set("Cookie", cookie)
      .send({
        id: 99,
        date: 1640995200000,
        fk_status: "accepté",
        poids: 150,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD756254",
      });
    expect(ramassageUpdate.statusCode).toEqual(500);
    expect(ramassageUpdate.body).toEqual({
      error: RamassageKO.update,
    });

    // delete one that does not exist
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/99")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: RamassageKO.delete,
    });
  });
});

describe("Ramassage CRUD with different decheterie", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable2);
    const cookie2 = list2.headers["set-cookie"];

    // create a ramassage with in a different primary decheterie
    const ramassage = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram11CreateRequest);
    expect(ramassage.statusCode).toEqual(500);
    expect(ramassage.body).toEqual({
      error: RamassageKO.add,
    });

    // create a ramassage with in the same primary decheterie
    const ramassage2 = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie2)
      .send(ram11CreateRequest);
    expect(ramassage2.statusCode).toEqual(201);
    expect(ramassage2.body).toEqual({
      message: RamassageOK.add,
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/11")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(403);
    expect(ramassageGet.body).toEqual({
      error: Forbidden.error,
    });

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassages")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual(dechet1GetAllResponse);

    // get all
    const ramassageGetAll2 = await request(app)
      .get("/api/ramassages")
      .set("Cookie", cookie2);
    expect(ramassageGetAll2.statusCode).toEqual(200);
    expect(ramassageGetAll2.body).toEqual(ram11GetAllResponse);

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassages/11s")
      .set("Cookie", cookie)
      .send(ram11UpdateRequest);
    expect(ramassageUpdate.statusCode).toEqual(403);
    expect(ramassageUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/11")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(403);
    expect(ramassageDelete.body).toEqual({
      error: Forbidden.error,
    });
    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/11")
      .set("Cookie", cookie2);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: RamassageOK.delete,
    });
  });
});

describe("Ramassage test employe have licence", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create with employe who have no licence
    const ramassage = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram12CreateRequest);
    expect(ramassage.statusCode).toEqual(500);
    expect(ramassage.body).toEqual({
      error: RamassageKO.add,
    });

    // create with employe who have wrong licence for truck
    const ramassage2 = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send(ram13CreateRequest);
    expect(ramassage2.statusCode).toEqual(500);
    expect(ramassage2.body).toEqual({
      error: RamassageKO.add,
    });
  });
});
