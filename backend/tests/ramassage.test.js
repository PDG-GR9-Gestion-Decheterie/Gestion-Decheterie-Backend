import { describe, test, expect } from "@jest/globals";
import app from "../server.js";
import request from "supertest";

const Responsable = { username: "jdoe", password: "123" };
const Secretaire = { username: "jferrara", password: "123" };
const Employe = { username: "asmith", password: "123" };
const Chauffeur = { username: "rsmith2", password: "123" };

describe("The API default route", () => {
  test("should receive Hello world!", async () => {
    const list = await request(app).get("/api");
    expect(list.statusCode).toEqual(200);
    expect(list.text).toEqual("Hello World!");
  });
});

describe("Login/Logout", () => {
  test("should login", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    expect(list.statusCode).toEqual(200);
    expect(list.body).toEqual({
      idlogin: responsable.username,
      fonction: "Responsable",
    });
  });

  test("should not login", async () => {
    const list = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "admin1" });
    expect(list.statusCode).toEqual(401);
    expect(list.body).toEqual({ message: "Login failed." });
  });

  test("should logout", async () => {
    const list = await request(app).get("/api/logout");
    expect(list.statusCode).toEqual(200);
    expect(list.text).toEqual({ message: "Logged out successfully." });
  });
});

describe("Ramassage CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 6,
        date: "2032-02-21",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 10,
        date: 1660995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 10,
        date: "2022-08-20",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassage/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(200);
    expect(ramassageGet.body).toEqual({
      ramassages: {
        id: 6,
        date: "2028-01-01",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
        fk_status: "accepté",
      },
    });

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassage")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual({
      ramassages: [
        {
          id_ramassage: 6,
          date_ramassage: "2028-01-01",
          id_decheterie: 1,
          nom_decheterie: "Decheterie Yverdon",
          status_ramassage: "accepté",
          id_employe: "rsmith2",
          nom_employe: "Smith",
          prenom_employe: "Rebecca",
          id_contenant: 1,
          nom_contenant: "benne",
          poids: 100,
          taille_contenant: null,
          nbcadre_contenant: null,
          type_vehicule: "camion",
          immatriculation_vehicule: "VD 756 254",
        },
        {
          id_ramassage: 10,
          date_ramassage: "2022-08-20",
          id_decheterie: 1,
          nom_decheterie: "Decheterie Yverdon",
          status_ramassage: "accepté",
          id_employe: "rsmith2",
          nom_employe: "Smith",
          prenom_employe: "Rebecca",
          id_contenant: 1,
          nom_contenant: "benne",
          poids: 100,
          taille_contenant: null,
          nbcadre_contenant: null,
          type_vehicule: "camion",
          immatriculation_vehicule: "VD 756 254",
        },
      ],
    });

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassage/6")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1640995200000,
        fk_status: "accepté",
        poids: 150,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassageUpdate.statusCode).toEqual(200);
    expect(ramassageUpdate.body).toEqual({
      message: "Ramassage updated successfully",
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassage/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(200);
    expect(ramassageDelete.body).toEqual({
      message: "Ramassage deleted successfully",
    });
    const ramassageDelete2 = await request(app)
      .delete("/api/ramassage/10")
      .set("Cookie", cookie);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: "Ramassage deleted successfully",
    });
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 6,
        date: "2032-02-21",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 10,
        date: 1660995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 10,
        date: "2022-08-20",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassage/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(200);
    expect(ramassageGet.body).toEqual({
      ramassages: {
        id: 6,
        date: "2028-01-01",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
        fk_status: "accepté",
      },
    });

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassage")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual({
      ramassages: [
        {
          id_ramassage: 6,
          date_ramassage: "2028-01-01",
          id_decheterie: 1,
          nom_decheterie: "Decheterie Yverdon",
          status_ramassage: "accepté",
          id_employe: "rsmith2",
          nom_employe: "Smith",
          prenom_employe: "Rebecca",
          id_contenant: 1,
          nom_contenant: "benne",
          poids: 100,
          taille_contenant: null,
          nbcadre_contenant: null,
          type_vehicule: "camion",
          immatriculation_vehicule: "VD 756 254",
        },
        {
          id_ramassage: 10,
          date_ramassage: "2022-08-20",
          id_decheterie: 1,
          nom_decheterie: "Decheterie Yverdon",
          status_ramassage: "accepté",
          id_employe: "rsmith2",
          nom_employe: "Smith",
          prenom_employe: "Rebecca",
          id_contenant: 1,
          nom_contenant: "benne",
          poids: 100,
          taille_contenant: null,
          nbcadre_contenant: null,
          type_vehicule: "camion",
          immatriculation_vehicule: "VD 756 254",
        },
      ],
    });

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassage/6")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1640995200000,
        fk_status: "accepté",
        poids: 150,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassageUpdate.statusCode).toEqual(200);
    expect(ramassageUpdate.body).toEqual({
      message: "Ramassage updated successfully",
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassage/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(200);
    expect(ramassageDelete.body).toEqual({
      message: "Ramassage deleted successfully",
    });
    const ramassageDelete2 = await request(app)
      .delete("/api/ramassage/10")
      .set("Cookie", cookie);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: "Ramassage deleted successfully",
    });
  });

  test("Employe", async () => {
    const list = await request(app).post("/api/login").send(Employe);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 6,
        date: "2032-02-21",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 10,
        date: 1660995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 10,
        date: "2022-08-20",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassage/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(200);
    expect(ramassageGet.body).toEqual({
      ramassages: {
        id: 6,
        date: "2028-01-01",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
        fk_status: "accepté",
      },
    });

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassage")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual({
      ramassages: [
        {
          id_ramassage: 6,
          date_ramassage: "2028-01-01",
          id_decheterie: 1,
          nom_decheterie: "Decheterie Yverdon",
          status_ramassage: "accepté",
          id_employe: "rsmith2",
          nom_employe: "Smith",
          prenom_employe: "Rebecca",
          id_contenant: 1,
          nom_contenant: "benne",
          poids: 100,
          taille_contenant: null,
          nbcadre_contenant: null,
          type_vehicule: "camion",
          immatriculation_vehicule: "VD 756 254",
        },
      ],
    });

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassage/6")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1640995200000,
        fk_status: "accepté",
        poids: 150,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassageUpdate.statusCode).toEqual(500);
    expect(ramassageUpdate.body).toEqual({
      error: "Error updating ramassage",
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassage/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: "Error deleting ramassage",
    });

    // delete all with Responsable
    const listResp = await request(app).post("/api/login").send(Responsable);
    const cookieResp = listResp.headers["set-cookie"];

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassage/6")
      .set("Cookie", cookieResp);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: "Ramassage deleted successfully",
    });
    const ramassageDelete3 = await request(app)
      .delete("/api/ramassage/10")
      .set("Cookie", cookie);
    expect(ramassageDelete3.statusCode).toEqual(200);
    expect(ramassageDelete3.body).toEqual({
      message: "Ramassage deleted successfully",
    });
  });

  test("Chauffeur", async () => {
    const list = await request(app).post("/api/login").send(Chauffeur);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 6,
        date: "2032-02-21",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 10,
        date: 1660995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 10,
        date: "2022-08-20",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassage/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(200);
    expect(ramassageGet.body).toEqual({
      ramassages: {
        id: 6,
        date: "2028-01-01",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
        fk_status: "accepté",
      },
    });

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassage")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual({
      ramassages: [
        {
          id_ramassage: 6,
          date_ramassage: "2028-01-01",
          id_decheterie: 1,
          nom_decheterie: "Decheterie Yverdon",
          status_ramassage: "accepté",
          id_employe: "rsmith2",
          nom_employe: "Smith",
          prenom_employe: "Rebecca",
          id_contenant: 1,
          nom_contenant: "benne",
          poids: 100,
          taille_contenant: null,
          nbcadre_contenant: null,
          type_vehicule: "camion",
          immatriculation_vehicule: "VD 756 254",
        },
      ],
    });

    // update
    const ramassageUpdate = await request(app)
      .put("/api/ramassage/6")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1640995200000,
        fk_status: "accepté",
        poids: 150,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassageUpdate.statusCode).toEqual(500);
    expect(ramassageUpdate.body).toEqual({
      error: "Error updating ramassage",
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassage/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: "Error deleting ramassage",
    });

    // delete all with Responsable
    const listResp = await request(app).post("/api/login").send(Responsable);
    const cookieResp = listResp.headers["set-cookie"];

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassage/6")
      .set("Cookie", cookieResp);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: "Ramassage deleted successfully",
    });
    const ramassageDelete3 = await request(app)
      .delete("/api/ramassage/10")
      .set("Cookie", cookie);
    expect(ramassageDelete3.statusCode).toEqual(200);
    expect(ramassageDelete3.body).toEqual({
      message: "Ramassage deleted successfully",
    });
  });
});

describe("Ramassage CRUD not working", () => {
  test("Responsable not working", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: "Ramassage added successfully",
      ramassage: {
        id: 6,
        date: "2032-02-21",
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      },
    });

    // create the same
    const ramassage2 = await request(app)
      .post("/api/ramassage")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage2.statusCode).toEqual(500);
    expect(ramassage2.body).toEqual({
      error: "Error adding ramassage",
    });

    // get one that does not exist
    const ramassageGet = await request(app)
      .get("/api/ramassage/99")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(500);
    expect(ramassageGet.body).toEqual({
      error: "Error getting ramassage",
    });

    // update one that does not exist
    const ramassageUpdate = await request(app)
      .put("/api/ramassage/99")
      .set("Cookie", cookie)
      .send({
        id: 99,
        date: 1640995200000,
        fk_status: "accepté",
        poids: 150,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassageUpdate.statusCode).toEqual(500);
    expect(ramassageUpdate.body).toEqual({
      error: "Error updating ramassage",
    });

    // delete one that does not exist
    const ramassageDelete = await request(app)
      .delete("/api/ramassage/99")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: "Error deleting ramassage",
    });
  });
});

// TODO: test si la déchèterie principale est la même que celle du ramassage qu'on veut ajouter
