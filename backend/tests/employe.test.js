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

describe("Employe CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
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
      message: "Employe added successfully",
      employe: {
        idlogin: "tdoumas",
        mdplogin: "",
        nom: "Doumas",
        prenom: "Tristan",
        datenaissance: "1990-01-01",
        datedebutcontrat: "2022-01-01",
        fk_fonction: "Chauffeur",
        numtelephone: "1234567890",
        typepermis: "C",
        fk_adresse: 1,
        fk_decheterie: 1,
      },
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(200);
    expect(employeGet.body).toEqual({
      employeData: {
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
      message: "Employe updated successfully",
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(200);
    expect(employeDelete.body).toEqual({
      message: "Employe deleted successfully",
    });
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
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
    expect(employe.statusCode).toEqual(500);
    employe.body.employe.mdplogin = "";
    expect(employe.body).toEqual({
      error: "Error adding employe",
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(500);
    expect(employeGet.body).toEqual({
      error: "Error getting employe",
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(500);
    expect(employeGetAll.body).toEqual({
      error: "Error getting employe",
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
      error: "Error updating employe",
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(500);
    expect(employeDelete.body).toEqual({
      error: "Error deleting employe",
    });
  });

  test("Employe", async () => {
    const list = await request(app).post("/api/login").send(Employe);
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
    expect(employe.statusCode).toEqual(500);
    employe.body.employe.mdplogin = "";
    expect(employe.body).toEqual({
      error: "Error adding employe",
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(500);
    expect(employeGet.body).toEqual({
      error: "Error getting employe",
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(500);
    expect(employeGetAll.body).toEqual({
      error: "Error getting employe",
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
      error: "Error updating employe",
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(500);
    expect(employeDelete.body).toEqual({
      error: "Error deleting employe",
    });
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
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
    expect(employe.statusCode).toEqual(500);
    employe.body.employe.mdplogin = "";
    expect(employe.body).toEqual({
      error: "Error adding employe",
    });

    // get one
    const employeGet = await request(app)
      .get("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeGet.statusCode).toEqual(500);
    expect(employeGet.body).toEqual({
      error: "Error getting employe",
    });

    // get all
    const employeGetAll = await request(app)
      .get("/api/employes")
      .set("Cookie", cookie);
    expect(employeGetAll.statusCode).toEqual(500);
    expect(employeGetAll.body).toEqual({
      error: "Error getting employe",
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
      error: "Error updating employe",
    });

    // delete
    const employeDelete = await request(app)
      .delete("/api/employes/tdoumas")
      .set("Cookie", cookie);
    expect(employeDelete.statusCode).toEqual(500);
    expect(employeDelete.body).toEqual({
      error: "Error deleting employe",
    });
  });
});

// TODO: test si la déchèterie principale est la même que celle de l'employé
