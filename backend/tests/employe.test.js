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
  EmployeOK,
  EmployeKO,
  tdoumasCreateRequest,
  tdoumasCreateRequestPassword,
  tdoumasUpdateRequest,
  tdoumasUpdateRequestPassword,
  tdoumasGetOneResponse,
  tdoumasGetAllResponse,
  jdoeCreateRequest,
  jdoeUpdateRequest,
  jdoeGetOneResponse,
  jdoeGetAllResponse,
  dech1getAllResponse,
  secretaireGetOneResponse,
  employeGetOneResponse,
  chauffeurGetOneResponse,
  profileResponsable1Response,
  profileSecretaire1Response,
  profileEmploye1Response,
  profileChauffeur1Response,
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

    // test if the password is correct
    const list2 = await request(app)
      .post("/api/login")
      .send(tdoumasCreateRequestPassword);
    expect(list2.statusCode).toEqual(200);

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

    // test if the password is updated
    const list3 = await request(app)
      .post("/api/login")
      .send(tdoumasUpdateRequestPassword);
    expect(list3.statusCode).toEqual(200);

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

describe("Employe own info", () => {
  test("Not logged in", async () => {
    // get profile
    const employeGet = await request(app).get("/api/profile");
    expect(employeGet.statusCode).toEqual(401);
    expect(employeGet.body).toEqual({
      error: Unauthorized.error,
    });
  });

  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // get profile
    const employeGet = await request(app)
      .get("/api/profile")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(200);
    expect(employeGet.body).toEqual(profileResponsable1Response);
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    // get profile
    const employeGet = await request(app)
      .get("/api/profile")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(200);
    expect(employeGet.body).toEqual(profileSecretaire1Response);
  });

  test("Employe", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    // get profile
    const employeGet = await request(app)
      .get("/api/profile")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(200);
    expect(employeGet.body).toEqual(profileEmploye1Response);
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    // get profile
    const employeGet = await request(app)
      .get("/api/profile")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(200);
    expect(employeGet.body).toEqual(profileChauffeur1Response);
  });
});
