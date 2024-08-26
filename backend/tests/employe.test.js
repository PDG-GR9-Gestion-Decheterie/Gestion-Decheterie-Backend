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

import { EmployeOK, EmployeKO, Forbidden, Unauthorized } from "./message.js";

import {
  tdoumasCreateRequest,
  tdoumasUpdateRequest,
  tdoumasGetOneResponse,
  tdoumasGetAllResponse,
  jdoeCreateRequest,
  jdoeUpdateRequest,
  jdoeGetOneResponse,
  jdoeGetAllResponse,
  dech1getAllResponse,
} from "./employeMessage.js";

describe("Employe not logged in", () => {
  test("CRUD", async () => {
    // create
    const employe = await request(app)
      .post("/api/employes")
      .send(tdoumasCreateRequest);
    expect(employe.statusCode).toEqual(401);
    expect(employe.body).toEqual({
      error: Unauthorized.error,
    });

    // get one
    const employeGet = await request(app).get("/api/employes/tdoumas");
    expect(employeGet.statusCode).toEqual(401);
    expect(employeGet.body).toEqual({
      error: Unauthorized.error,
    });

    // get all
    const employeGetAll = await request(app).get("/api/employes");
    expect(employeGetAll.statusCode).toEqual(401);
    expect(employeGetAll.body).toEqual({
      error: Unauthorized.error,
    });

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .send(tdoumasUpdateRequest);
    expect(employeUpdate.statusCode).toEqual(401);
    expect(employeUpdate.body).toEqual({
      error: Unauthorized.error,
    });

    // delete
    const employeDelete = await request(app).delete("/api/employes/tdoumas");
    expect(employeDelete.statusCode).toEqual(401);
    expect(employeDelete.body).toEqual({
      error: Unauthorized.error,
    });
  });
});

describe("Employe CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send(tdoumasCreateRequest);
    expect(employe.statusCode).toEqual(201);
    expect(employe.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(200);
    expect(employeGet.body).toEqual(tdoumasGetOneResponse);

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(200);
    expect(employeGetAll.body).toEqual(tdoumasGetAllResponse);

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send(tdoumasUpdateRequest);
    expect(employeUpdate.statusCode).toEqual(200);
    expect(employeUpdate.body).toEqual({
      message: EmployeOK.update,
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(200);
    expect(employeDelete.body).toEqual({
      message: EmployeOK.delete,
    });
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send(tdoumasCreateRequest);
    expect(employe.statusCode).toEqual(403);
    expect(employe.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable
    const employe2 = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie2)
      .send(tdoumasCreateRequest);
    expect(employe2.statusCode).toEqual(201);
    expect(employe2.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(403);
    expect(employeGet.body).toEqual({
      error: Forbidden.error,
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(403);
    expect(employeGetAll.body).toEqual({
      error: Forbidden.error,
    });

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send(tdoumasUpdateRequest);
    expect(employeUpdate.statusCode).toEqual(403);
    expect(employeUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(403);
    expect(employeDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable
    const employeDelete2 = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie2);
    expect(employeDelete2.statusCode).toEqual(200);
    expect(employeDelete2.body).toEqual({
      message: EmployeOK.delete,
    });
  });

  test("Employe", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send(tdoumasCreateRequest);
    expect(employe.statusCode).toEqual(403);
    expect(employe.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable
    const employe2 = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie2)
      .send(tdoumasCreateRequest);
    expect(employe2.statusCode).toEqual(201);
    expect(employe2.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(403);
    expect(employeGet.body).toEqual({
      error: Forbidden.error,
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(403);
    expect(employeGetAll.body).toEqual({
      error: Forbidden.error,
    });

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send(tdoumasUpdateRequest);
    expect(employeUpdate.statusCode).toEqual(403);
    expect(employeUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(403);
    expect(employeDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable
    const employeDelete2 = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie2);
    expect(employeDelete2.statusCode).toEqual(200);
    expect(employeDelete2.body).toEqual({
      message: EmployeOK.delete,
    });
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send(tdoumasCreateRequest);
    expect(employe.statusCode).toEqual(403);
    expect(employe.body).toEqual({
      error: Forbidden.error,
    });

    // create with Responsable
    const employe2 = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie2)
      .send(tdoumasCreateRequest);
    expect(employe2.statusCode).toEqual(201);
    expect(employe2.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(403);
    expect(employeGet.body).toEqual({
      error: Forbidden.error,
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(403);
    expect(employeGetAll.body).toEqual({
      error: Forbidden.error,
    });

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send(tdoumasUpdateRequest);
    expect(employeUpdate.statusCode).toEqual(403);
    expect(employeUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(403);
    expect(employeDelete.body).toEqual({
      error: Forbidden.error,
    });

    // delete with Responsable
    const employeDelete2 = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie2);
    expect(employeDelete2.statusCode).toEqual(200);
    expect(employeDelete2.body).toEqual({
      message: EmployeOK.delete,
    });
  });
});

describe("Employe CRUD with different decheterie", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app).post("/api/login").send(Responsable);
    const cookie2 = list2.headers["set-cookie"];

    // create a employe with in a different primary decheterie
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send(jdoeCreateRequest);
    expect(employe.statusCode).toEqual(403);
    expect(employe.body).toEqual({
      error: Forbidden.error,
    });

    // create a employe with in the same primary decheterie
    const employe2 = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie2)
      .send(jdoeCreateRequest);
    expect(employe2.statusCode).toEqual(201);
    expect(employe2.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/jdoe")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(403);
    expect(employeGet.body).toEqual({
      error: Forbidden.error,
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(200);
    expect(employeGetAll.body).toEqual(dech1getAllResponse);

    // get all
    const employeGetAll2 = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie2);
    expect(employeGetAll2.statusCode).toEqual(200);
    expect(employeGetAll2.body).toEqual(jdoeGetAllResponse);

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send(jdoeUpdateRequest);
    expect(employeUpdate.statusCode).toEqual(403);
    expect(employeUpdate.body).toEqual({
      error: Forbidden.error,
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(403);
    expect(employeDelete.body).toEqual({
      error: Forbidden.error,
    });
    const employeDelete2 = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie2);
    expect(employeDelete2.statusCode).toEqual(200);
    expect(employeDelete2.body).toEqual({
      message: EmployeOK.delete,
    });
  });
});
