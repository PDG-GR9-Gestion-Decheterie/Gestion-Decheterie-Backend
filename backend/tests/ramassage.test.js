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

describe("Ramassage CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create in futur
    const ramassage = await request(app)
      .post("/api/ramassages")
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
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassages")
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
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
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
      .get("/api/ramassages")
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
      .put("/api/ramassages/6")
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
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(200);
    expect(ramassageDelete.body).toEqual({
      message: "Ramassage deleted successfully",
    });

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/10")
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
      .post("/api/ramassages")
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
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassages")
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
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
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
      .get("/api/ramassages")
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
      .put("/api/ramassages/6")
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
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(200);
    expect(ramassageDelete.body).toEqual({
      message: "Ramassage deleted successfully",
    });

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/10")
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
      .post("/api/ramassages")
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
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassages")
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
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
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
      .get("/api/ramassages")
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
      .put("/api/ramassages/6")
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
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: "Error deleting ramassage",
    });

    // delete all with Responsable
    const listResp = await request(app).post("/api/login").send(Responsable);
    const cookieResp = listResp.headers["set-cookie"];

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookieResp);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: "Ramassage deleted successfully",
    });
    const ramassageDelete3 = await request(app)
      .delete("/api/ramassages/10")
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
      .post("/api/ramassages")
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
    });

    // create in past
    const ramassagePast = await request(app)
      .post("/api/ramassages")
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
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
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
      .get("/api/ramassages")
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
      .put("/api/ramassages/6")
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
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: "Error deleting ramassage",
    });

    // delete all with Responsable
    const listResp = await request(app).post("/api/login").send(Responsable);
    const cookieResp = listResp.headers["set-cookie"];

    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookieResp);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: "Ramassage deleted successfully",
    });
    const ramassageDelete3 = await request(app)
      .delete("/api/ramassages/10")
      .set("Cookie", cookie);
    expect(ramassageDelete3.statusCode).toEqual(200);
    expect(ramassageDelete3.body).toEqual({
      message: "Ramassage deleted successfully",
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
    });

    // create the same
    const ramassage2 = await request(app)
      .post("/api/ramassages")
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
      .get("/api/ramassages/99")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(500);
    expect(ramassageGet.body).toEqual({
      error: "Error getting ramassage",
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
        fk_vehicule: "VD 756 254",
      });
    expect(ramassageUpdate.statusCode).toEqual(500);
    expect(ramassageUpdate.body).toEqual({
      error: "Error updating ramassage",
    });

    // delete one that does not exist
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/99")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: "Error deleting ramassage",
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
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rlandry",
        fk_decheterie: 6,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage.statusCode).toEqual(500);
    expect(ramassage.body).toEqual({
      error: "Error adding ramassage",
    });

    // create a ramassage with in the same primary decheterie
    const ramassage2 = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie2)
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rsmith2",
        fk_decheterie: 6,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage2.statusCode).toEqual(201);
    expect(ramassage2.body).toEqual({
      message: "Ramassage added successfully",
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(500);
    expect(ramassageGet.body).toEqual({
      error: "Error getting ramassage",
    });

    // get all
    const ramassageGetAll = await request(app)
      .get("/api/ramassages")
      .set("Cookie", cookie);
    expect(ramassageGetAll.statusCode).toEqual(200);
    expect(ramassageGetAll.body).toEqual({
      ramassages: [],
    });

    // get all
    const ramassageGetAll2 = await request(app)
      .get("/api/ramassages")
      .set("Cookie", cookie2);
    expect(ramassageGetAll2.statusCode).toEqual(200);
    expect(ramassageGetAll2.body).toEqual({
      ramassages: [
        {
          id_ramassage: 6,
          date_ramassage: "2032-02-21",
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
      .put("/api/ramassages/6")
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
      message: "Error updating ramassage",
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      message: "Error deleting ramassage",
    });
    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie2);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: "Ramassage deleted successfully",
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
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "jdoe",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage.statusCode).toEqual(500);
    expect(ramassage.body).toEqual({
      message: "Error adding ramassage",
    });

    // create with employe who have wrong licence for truck
    const ramassage2 = await request(app)
      .post("/api/ramassages")
      .set("Cookie", cookie)
      .send({
        id: 6,
        date: 1960995200000,
        fk_status: "accepté",
        poids: 100,
        fk_contenant: 1,
        fk_employee: "rfournier",
        fk_decheterie: 1,
        fk_vehicule: "VD 756 254",
      });
    expect(ramassage2.statusCode).toEqual(500);
    expect(ramassage2.body).toEqual({
      message: "Error adding ramassage",
    });
  });
});
