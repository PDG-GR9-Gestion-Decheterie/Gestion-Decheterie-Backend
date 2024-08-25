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

import { RamassageOK, RamassageKO, Forbidden } from "./message.js";

describe("Ramassage not logged in", () => {
  test("CRUD", async () => {
    // create in futur
    const ramassage = await request(app).post("/api/ramassages").send({
      id: 6,
      date: 1960995200000,
      fk_status: "accepté",
      poids: 100,
      fk_contenant: 1,
      fk_employee: "rsmith2",
      fk_decheterie: 1,
      fk_vehicule: "VD756254",
    });
    expect(ramassage.statusCode).toEqual(403);
    expect(ramassage.body).toEqual({
      error: Forbidden.message,
    });

    // get one
    const ramassageGet = await request(app).get("/api/ramassages/6");
    expect(ramassageGet.statusCode).toEqual(403);
    expect(ramassageGet.body).toEqual({
      error: Forbidden.message,
    });

    // get all
    const ramassageGetAll = await request(app).get("/api/ramassages");
    expect(ramassageGetAll.statusCode).toEqual(403);
    expect(ramassageGetAll.body).toEqual({
      error: Forbidden.message,
    });

    // update
    const ramassageUpdate = await request(app).put("/api/ramassages/6").send({
      id: 6,
      date: 1640995200000,
      fk_status: "accepté",
      poids: 150,
      fk_contenant: 1,
      fk_employee: "rsmith2",
      fk_decheterie: 1,
      fk_vehicule: "VD756254",
    });
    expect(ramassageUpdate.statusCode).toEqual(403);
    expect(ramassageUpdate.body).toEqual({
      error: Forbidden.message,
    });

    // delete
    const ramassageDelete = await request(app).delete("/api/ramassages/6");
    expect(ramassageDelete.statusCode).toEqual(403);
    expect(ramassageDelete.body).toEqual({
      error: Forbidden.message,
    });
  });
});

describe("Ramassage CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
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
        fk_vehicule: "VD756254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
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
        fk_vehicule: "VD756254",
      });
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: RamassageOK.add,
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
        fk_vehicule: "VD756254",
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
          immatriculation_vehicule: "VD756254",
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
          immatriculation_vehicule: "VD756254",
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
        fk_vehicule: "VD756254",
      });
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
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Secretaire));
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
        fk_vehicule: "VD756254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
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
        fk_vehicule: "VD756254",
      });
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: RamassageOK.add,
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
        fk_vehicule: "VD756254",
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
          immatriculation_vehicule: "VD756254",
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
          immatriculation_vehicule: "VD756254",
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
        fk_vehicule: "VD756254",
      });
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
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Employe));
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
        fk_vehicule: "VD756254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
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
        fk_vehicule: "VD756254",
      });
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: RamassageOK.add,
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
        fk_vehicule: "VD756254",
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
          immatriculation_vehicule: "VD756254",
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
        fk_vehicule: "VD756254",
      });
    expect(ramassageUpdate.statusCode).toEqual(500);
    expect(ramassageUpdate.body).toEqual({
      error: RamassageKO.update,
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: RamassageKO.delete,
    });

    // delete all with Responsable
    const listResp = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
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
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Chauffeur));
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
        fk_vehicule: "VD756254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
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
        fk_vehicule: "VD756254",
      });
    expect(ramassagePast.statusCode).toEqual(201);
    expect(ramassagePast.body).toEqual({
      message: RamassageOK.add,
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
        fk_vehicule: "VD756254",
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
          immatriculation_vehicule: "VD756254",
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
        fk_vehicule: "VD756254",
      });
    expect(ramassageUpdate.statusCode).toEqual(500);
    expect(ramassageUpdate.body).toEqual({
      error: RamassageKO.update,
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: RamassageKO.delete,
    });

    // delete all with Responsable
    const listResp = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
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
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
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
        fk_vehicule: "VD756254",
      });
    expect(ramassage.statusCode).toEqual(201);
    expect(ramassage.body).toEqual({
      message: RamassageOK.add,
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
        fk_vehicule: "VD756254",
      });
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
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
    const cookie = list.headers["set-cookie"];

    const list2 = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable2));
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
        fk_vehicule: "VD756254",
      });
    expect(ramassage.statusCode).toEqual(500);
    expect(ramassage.body).toEqual({
      error: RamassageKO.add,
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
        fk_vehicule: "VD756254",
      });
    expect(ramassage2.statusCode).toEqual(201);
    expect(ramassage2.body).toEqual({
      message: RamassageOK.add,
    });

    // get one
    const ramassageGet = await request(app)
      .get("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageGet.statusCode).toEqual(500);
    expect(ramassageGet.body).toEqual({
      error: RamassageKO.get,
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
          immatriculation_vehicule: "VD756254",
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
        fk_vehicule: "VD756254",
      });
    expect(ramassageUpdate.statusCode).toEqual(500);
    expect(ramassageUpdate.body).toEqual({
      error: RamassageKO.update,
    });

    // delete
    const ramassageDelete = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie);
    expect(ramassageDelete.statusCode).toEqual(500);
    expect(ramassageDelete.body).toEqual({
      error: RamassageKO.delete,
    });
    const ramassageDelete2 = await request(app)
      .delete("/api/ramassages/6")
      .set("Cookie", cookie2);
    expect(ramassageDelete2.statusCode).toEqual(200);
    expect(ramassageDelete2.body).toEqual({
      message: RamassageOK.delete,
    });
  });
});

describe("Ramassage test employe have licence", () => {
  test("Responsable", async () => {
    const list = await request(app)
      .post("/api/login")
      .send(JSON.stringify(Responsable));
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
        fk_vehicule: "VD756254",
      });
    expect(ramassage.statusCode).toEqual(500);
    expect(ramassage.body).toEqual({
      error: RamassageKO.add,
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
        fk_vehicule: "VD756254",
      });
    expect(ramassage2.statusCode).toEqual(500);
    expect(ramassage2.body).toEqual({
      error: RamassageKO.add,
    });
  });
});
