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

describe("Contenant CRUD", () => {
  test("Responsable", async () => {
    const list = await request(app).post("/api/login").send(Responsable);
    const cookie = list.headers["set-cookie"];

    // create
    const contenant = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 1,
        fk_dechet: "papier",
      });
    expect(contenant.statusCode).toEqual(201);
    expect(contenant.body).toEqual({
      message: "Contenant added successfully",
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(200);
    expect(contenantGet.body).toEqual({
      contenants: {
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 1,
        fk_dechet: "papier",
      },
    });

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual({
      contenants: [
        {
          id: 100,
          nom: "benne",
          capacitemax: 40,
          nbcadre: null,
          taille: null,
          couleur: "blue",
          fk_decheterie: 1,
          fk_dechet: "papier",
        },
      ],
    });

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate.statusCode).toEqual(200);
    expect(contenantUpdate.body).toEqual({
      message: "Contenant updated successfully",
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(200);
    expect(contenantDelete.body).toEqual({
      message: "Contenant deleted successfully",
    });
  });

  test("Secretaire", async () => {
    const list = await request(app).post("/api/login").send(Secretaire);
    const cookie = list.headers["set-cookie"];

    // create
    const contenant = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 1,
        fk_dechet: "papier",
      });
    expect(contenant.statusCode).toEqual(201);
    expect(contenant.body).toEqual({
      message: "Contenant added successfully",
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(200);
    expect(contenantGet.body).toEqual({
      contenants: {
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 1,
        fk_dechet: "papier",
      },
    });

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual({
      contenants: [
        {
          id: 100,
          nom: "benne",
          capacitemax: 40,
          nbcadre: null,
          taille: null,
          couleur: "blue",
          fk_decheterie: 1,
          fk_dechet: "papier",
        },
      ],
    });

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate.statusCode).toEqual(200);
    expect(contenantUpdate.body).toEqual({
      message: "Contenant updated successfully",
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(200);
    expect(contenantDelete.body).toEqual({
      message: "Contenant deleted successfully",
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
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 1,
        fk_dechet: "papier",
      });
    expect(contenant.statusCode).toEqual(500);
    expect(contenant.body).toEqual({
      message: "Error adding contenant",
    });

    // create with Responsable rights
    const contenant2 = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie2)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 1,
        fk_dechet: "papier",
      });
    expect(contenant2.statusCode).toEqual(201);
    expect(contenant2.body).toEqual({
      message: "Contenant added successfully",
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(500);
    expect(contenantGet.body).toEqual({
      message: "Error getting contenant",
    });

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual({
      contenants: [],
    });

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate.statusCode).toEqual(500);
    expect(contenantUpdate.body).toEqual({
      message: "Error updating contenant",
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(500);
    expect(contenantDelete.body).toEqual({
      message: "Error deleting contenant",
    });

    // delete with Responsable rights
    const contenantDelete2 = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie2);
    expect(contenantDelete2.statusCode).toEqual(200);
    expect(contenantDelete2.body).toEqual({
      message: "contenant deleted successfully",
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
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 1,
        fk_dechet: "papier",
      });
    expect(contenant.statusCode).toEqual(500);
    expect(contenant.body).toEqual({
      message: "Error adding contenant",
    });

    // create with Responsable rights
    const contenant2 = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie2)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 1,
        fk_dechet: "papier",
      });
    expect(contenant2.statusCode).toEqual(201);
    expect(contenant2.body).toEqual({
      message: "Contenant added successfully",
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(500);
    expect(contenantGet.body).toEqual({
      message: "Error getting contenant",
    });

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual({
      contenants: [],
    });

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate.statusCode).toEqual(500);
    expect(contenantUpdate.body).toEqual({
      message: "Error updating contenant",
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(500);
    expect(contenantDelete.body).toEqual({
      message: "Error deleting contenant",
    });

    // delete with Responsable rights
    const contenantDelete2 = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie2);
    expect(contenantDelete2.statusCode).toEqual(200);
    expect(contenantDelete2.body).toEqual({
      message: "contenant deleted successfully",
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
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 6,
        fk_dechet: "papier",
      });
    expect(contenant.statusCode).toEqual(500);
    expect(contenant.body).toEqual({
      message: "Error adding contenant",
    });

    const contenant2 = await request(app)
      .post("/api/contenants")
      .set("Cookie", cookie2)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 6,
        fk_dechet: "papier",
      });
    expect(contenant2.statusCode).toEqual(201);
    expect(contenant2.body).toEqual({
      message: "Contenant added successfully",
    });

    // get one
    const contenantGet = await request(app)
      .get("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantGet.statusCode).toEqual(500);
    expect(contenantGet.body).toEqual({
      message: "Error getting contenant",
    });

    // get all
    const contenantGetAll = await request(app)
      .get("/api/contenants")
      .set("Cookie", cookie);
    expect(contenantGetAll.statusCode).toEqual(200);
    expect(contenantGetAll.body).toEqual({
      contenants: [],
    });

    // update
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "red",
        fk_decheterie: 6,
        fk_dechet: "carton",
      });
    expect(contenantUpdate.statusCode).toEqual(200);
    expect(contenantUpdate.body).toEqual({
      message: "Error updating contenant",
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(500);
    expect(contenantDelete.body).toEqual({
      message: "Error deleting contenant",
    });

    // delete
    const contenantDelete2 = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie2);
    expect(contenantDelete2.statusCode).toEqual(200);
    expect(contenantDelete2.body).toEqual({
      message: "Contenant deleted successfully",
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
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: "blue",
        fk_decheterie: 1,
        fk_dechet: "papier",
      });
    expect(contenant.statusCode).toEqual(201);
    expect(contenant.body).toEqual({
      message: "Contenant added successfully",
    });

    // update test for:
    // les big bag ont une taille : petite, moyenne ou grande.
    const contenantUpdate = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "big bag",
        capacitemax: null,
        nbcadre: null,
        taille: null,
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate.statusCode).toEqual(500);
    expect(contenantUpdate.body).toEqual({
      message: "Error updating contenant",
    });

    const contenantUpdate2 = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "big bag",
        capacitemax: null,
        nbcadre: null,
        taille: "test",
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate2.statusCode).toEqual(500);
    expect(contenantUpdate2.body).toEqual({
      message: "Error updating contenant",
    });

    const contenantUpdate3 = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "grande caisse",
        capacitemax: null,
        nbcadre: null,
        taille: "petite",
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate3.statusCode).toEqual(500);
    expect(contenantUpdate3.body).toEqual({
      message: "Error updating contenant",
    });

    const contenantUpdate4 = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: null,
        nbcadre: null,
        taille: "petite",
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate4.statusCode).toEqual(500);
    expect(contenantUpdate4.body).toEqual({
      message: "Error updating contenant",
    });

    const contenantUpdate5 = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "palette",
        capacitemax: null,
        nbcadre: null,
        taille: "petite",
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate5.statusCode).toEqual(500);
    expect(contenantUpdate5.body).toEqual({
      message: "Error updating contenant",
    });

    // update test for:
    // les palettes possèdent un nombre de cadres (entre 0 et 4).
    const contenantUpdate6 = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "palette",
        capacitemax: 40,
        nbcadre: null,
        taille: null,
        couleur: null,
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate6.statusCode).toEqual(500);
    expect(contenantUpdate6.body).toEqual({
      message: "Error updating contenant",
    });

    const contenantUpdate7 = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "palette",
        capacitemax: 40,
        nbcadre: 5,
        taille: null,
        couleur: null,
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate7.statusCode).toEqual(500);
    expect(contenantUpdate7.body).toEqual({
      message: "Error updating contenant",
    });

    const contenantUpdate8 = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "big bag",
        capacitemax: 40,
        nbcadre: 1,
        taille: null,
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate8.statusCode).toEqual(500);
    expect(contenantUpdate8.body).toEqual({
      message: "Error updating contenant",
    });

    const contenantUpdate9 = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "benne",
        capacitemax: 40,
        nbcadre: 1,
        taille: null,
        couleur: "red",
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate9.statusCode).toEqual(500);
    expect(contenantUpdate9.body).toEqual({
      message: "Error updating contenant",
    });

    const contenantUpdate10 = await request(app)
      .put("/api/contenants/100")
      .set("Cookie", cookie)
      .send({
        id: 100,
        nom: "grande caisse",
        capacitemax: 40,
        nbcadre: 1,
        taille: null,
        couleur: null,
        fk_decheterie: 1,
        fk_dechet: "carton",
      });
    expect(contenantUpdate10.statusCode).toEqual(500);
    expect(contenantUpdate10.body).toEqual({
      message: "Error updating contenant",
    });

    // delete
    const contenantDelete = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie);
    expect(contenantDelete.statusCode).toEqual(200);
    expect(contenantDelete.body).toEqual({
      message: "Contenant deleted successfully",
    });
  });
});
