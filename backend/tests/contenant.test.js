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
    expect(contenantGetAll.statusCode).toEqual(500);
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
    expect(contenantGetAll.statusCode).toEqual(500);
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
        fk_decheterie: 1,
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
    expect(contenantGet.statusCode).toEqual(200);
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
    const contenantDelete2 = await request(app)
      .delete("/api/contenants/100")
      .set("Cookie", cookie2);
    expect(contenantDelete2.statusCode).toEqual(200);
    expect(contenantDelete2.body).toEqual({
      message: "Contenant deleted successfully",
    });
  });
});

//TODO check integrity constraints
