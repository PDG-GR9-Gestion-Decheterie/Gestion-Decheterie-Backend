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

import { EmployeOK, EmployeKO, Forbidden } from "./message.js";

describe("Employe not logged in", () => {
  test("CRUD", async () => {
    // create
    const employe = await request(app).post("/api/employes").send({
      idlogin: "tdoumas",
      mdplogin: "123",
      nom: "Doumas",
      prenom: "Tristan",
      datenaissance: "1990-01-01",
      datedebutcontrat: "2022-01-01",
      fk_fonction: "Chauffeur",
      numtelephone: "1234567890",
      typepermis: "C",
      fk_adresse: 1,
      fk_decheterie: 1,
    });
    expect(employe.statusCode).toEqual(403);
    expect(employe.body).toEqual({
      error: Forbidden.message,
    });

    // get one
    const employeGet = await request(app).get("/api/employes/tdoumas");
    expect(employeGet.statusCode).toEqual(403);
    expect(employeGet.body).toEqual({
      error: Forbidden.message,
    });

    // get all
    const employeGetAll = await request(app).get("/api/employes");
    expect(employeGetAll.statusCode).toEqual(403);
    expect(employeGetAll.body).toEqual({
      error: Forbidden.message,
    });

    // update
    const employeUpdate = await request(app).put("/api/employes/tdoumas").send({
      idlogin: "tdoumas",
      mdplogin: "password",
      nom: "TriTri",
      prenom: "TriTri",
      datenaissance: "1990-01-01",
      datedebutcontrat: "2022-01-01",
      fk_fonction: "Chauffeur",
      numtelephone: "1234567890",
      typepermis: "C",
      fk_adresse: 1,
      fk_decheterie: 1,
    });
    expect(employeUpdate.statusCode).toEqual(403);
    expect(employeUpdate.body).toEqual({
      error: Forbidden.message,
    });

    // delete
    const employeDelete = await request(app).delete("/api/employes/tdoumas");
    expect(employeDelete.statusCode).toEqual(403);
    expect(employeDelete.body).toEqual({
      error: Forbidden.message,
    });
  });
});

describe("Employe CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
    const cookie = list.headers["set-cookie"];

    // create
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employe.statusCode).toEqual(201);
    employe.body.employe.mdplogin = "";
    expect(employe.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(200);
    expect(employeGet.body).toEqual({
      employes: {
        idlogin: "tdoumas",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
        fk_fonction: "Chauffeur",
      },
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(200);
    expect(employeGetAll.body).toEqual({
      employes: [
        {
          id_decheterie: 1,
          nom_decheterie: "Decheterie Yverdon",
          id_employe: "tdoumas",
          nom_employe: "Doumas",
          prenom_employe: "Tristan",
          fonction_employe: "Chauffeur",
          date_naissance: "1990-01-01",
          date_debut_contrat: "2022-01-01",
          numero_telephone: "1234567890",
          type_permis: "C",
        },
      ],
    });

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "password",
        nom: "TriTri",
        prenom: "TriTri",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
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
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Secretaire));
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
    const cookie2 = list2.headers["set-cookie"];

    // create
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employe.statusCode).toEqual(500);
    expect(employe.body).toEqual({
      error: EmployeKO.add,
    });

    // create with Responsable
    const employe2 = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employe2.statusCode).toEqual(201);
    expect(employe2.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(500);
    expect(employeGet.body).toEqual({
      error: EmployeKO.get,
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(200);
    expect(employeGetAll.body).toEqual({
      employes: [],
    });

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "password",
        nom: "TriTri",
        prenom: "TriTri",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employeUpdate.statusCode).toEqual(500);
    expect(employeUpdate.body).toEqual({
      error: EmployeKO.update,
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(500);
    expect(employeDelete.body).toEqual({
      error: EmployeKO.delete,
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
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Employe));
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
    const cookie2 = list2.headers["set-cookie"];

    // create
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employe.statusCode).toEqual(500);
    employe.body.employe.mdplogin = "";
    expect(employe.body).toEqual({
      error: EmployeKO.add,
    });

    // create with Responsable
    const employe2 = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employe2.statusCode).toEqual(201);
    expect(employe2.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(500);
    expect(employeGet.body).toEqual({
      error: EmployeKO.get,
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(500);
    expect(employeGetAll.body).toEqual({
      employes: [],
    });

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "password",
        nom: "TriTri",
        prenom: "TriTri",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employeUpdate.statusCode).toEqual(500);
    expect(employeUpdate.body).toEqual({
      error: EmployeKO.update,
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(500);
    expect(employeDelete.body).toEqual({
      error: EmployeKO.delete,
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
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Chauffeur));
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
    const cookie2 = list2.headers["set-cookie"];

    // create
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employe.statusCode).toEqual(500);
    employe.body.employe.mdplogin = "";
    expect(employe.body).toEqual({
      error: EmployeKO.add,
    });

    // create with Responsable
    const employe2 = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employe2.statusCode).toEqual(201);
    expect(employe2.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(500);
    expect(employeGet.body).toEqual({
      error: EmployeKO.get,
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(500);
    expect(employeGetAll.body).toEqual({
      employes: [],
    });

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "password",
        nom: "TriTri",
        prenom: "TriTri",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      });
    expect(employeUpdate.statusCode).toEqual(500);
    expect(employeUpdate.body).toEqual({
      error: EmployeKO.update,
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(500);
    expect(employeDelete.body).toEqual({
      error: EmployeKO.delete,
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
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
    const cookie2 = list2.headers["set-cookie"];

    // create a employe with in a different primary decheterie
    const employe = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 6,
      });
    expect(employe.statusCode).toEqual(500);
    expect(employe.body).toEqual({
      error: EmployeKO.add,
    });

    // create a employe with in the same primary decheterie
    const employe2 = await request(app)
      .post("/api/employes")
      .set("Cookie", cookie2)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 6,
      });
    expect(employe2.statusCode).toEqual(201);
    expect(employe2.body).toEqual({
      message: EmployeOK.add,
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(500);
    expect(employeGet.body).toEqual({
      error: EmployeKO.get,
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(200);
    expect(employeGetAll.body).toEqual({
      employes: [],
    });

    // get all
    const employeGetAll2 = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie2);
    expect(employeGetAll2.statusCode).toEqual(200);
    expect(employeGetAll2.body).toEqual({
      employes: [
        {
          id_decheterie: 1,
          nom_decheterie: "Decheterie Yverdon",
          id_employe: "tdoumas",
          nom_employe: "Doumas",
          prenom_employe: "Tristan",
          fonction_employe: "Chauffeur",
          date_naissance: "1990-01-01",
          date_debut_contrat: "2022-01-01",
          numero_telephone: "1234567890",
          type_permis: "C",
        },
      ],
    });

    // update
    const employeUpdate = await request(app)
      .put("/api/employes/tdoumas")
      .set("Cookie", cookie)
      .send({
        idlogin: "tdoumas",
        mdplogin: "123",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 6,
      });
    expect(employeUpdate.statusCode).toEqual(500);
    expect(employeUpdate.body).toEqual({
      error: EmployeKO.update,
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(500);
    expect(employeDelete.body).toEqual({
      error: EmployeKO.delete,
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
