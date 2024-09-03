import { Sequelize } from "sequelize";
import { models } from "../database/orm.js";
import { flattenObject, findDecheteriePrinciaple } from "./utils.js";

// Get tous les decheteries - /decheteries
export async function getDecheteries(req, res) {
  try {
    let decheteriesData = [];

    let decheteriesDB = [];
    let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
    for (let idDecheterie of decheteriesDispo) {
      let decheterie = await models.Decheterie.findAll({
        where: {
          id: idDecheterie,
        },
      });
      decheteriesDB = decheteriesDB.concat(decheterie);
    }

    for (let decheterie of decheteriesDB) {
      let adresse = await models.Adresse.findByPk(
        decheterie.dataValues.fk_adresse
      );

      let decheterieData = { ...decheterie.dataValues };
      if (adresse) {
        decheterieData = {
          ...decheterieData,
          ...flattenObject(adresse.dataValues, "adresse_"),
        };
      }

      if (decheterie.dataValues.id == (await idPrinciaple(req))) {
        decheterieData.principal = true;
      } else {
        decheterieData.principal = false;
      }
      delete decheterieData.fk_adresse;
      delete decheterieData.adresse_id;
      decheteriesData.push(decheterieData);
    }
    res.status(200).json({ decheteriesData });
  } catch (err) {
    console.error("Error fetching decheteries:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Get une decheterie par id - /decheteries/:id
export async function getDecheterieById(req, res) {
  try {
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let decheterie = null;

    decheterie = await models.Decheterie.findByPk(req.params.id);

    if (decheterie === null) {
      throw new Error();
    }

    let decheterieData = decheterie.dataValues;
    res.status(200).json({ decheterieData });
  } catch (err) {
    console.error("Error fetching decheterie:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Créer une decheterie - /decheteries
export async function createDecheterie(req, res) {
  try {
    // if the next id is null, find the next id
    if (req.body.id == null) {
      let maxId = await models.Decheterie.max("id");
      req.body.id = maxId + 1;
    }

    const newDecheterie = await models.Decheterie.create(req.body);
    await newDecheterie.save();
    let principal = await idPrinciaple(req);
    const newPrincipal = await models.Principale.create({
      fk_principale: principal,
      fk_decheterie: newDecheterie.id,
    });
    await newPrincipal.save();
    res.status(201).json({
      message: "Decheterie added successfully",
    });
  } catch (err) {
    console.error("Error adding decheterie:", err);
    res.status(500).json({ error: "Error adding decheterie" });
  }
}

// Mettre à jour une decheterie - /decheteries/:id
export async function updateDecheterie(req, res) {
  try {
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let decheterie = null;

    decheterie = await models.Decheterie.findByPk(req.params.id);

    if (!decheterie) {
      throw new Error("Decheterie not found");
    }

    decheterie.set({
      ...req.body,
    });
    await decheterie.save();

    res.status(200).json({ message: "Decheterie updated successfully" });
  } catch (err) {
    console.error("Error updating decheterie:", err);
    res.status(500).json({ error: "Error updating decheterie" });
  }
}

// Supprimer une decheterie - /decheteries/:id
export async function deleteDecheterie(req, res) {
  try {
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let decheterie = null;
    let principale = null;
    decheterie = await models.Decheterie.findByPk(req.params.id);
    principale = await models.Principale.findOne({
      where: { fk_decheterie: req.params.id },
    });

    if (!decheterie || !principale) {
      throw new Error("Decheterie not found");
    }

    if (principale.fk_principale == req.params.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await principale.destroy(); // Supprimer le decheterie de la base de données
    await decheterie.destroy(); // Supprimer le decheterie de la base de données
    res.status(200).json({ message: "Decheterie deleted successfully" });
  } catch (err) {
    console.error("Error deleting decheterie:", err);
    res.status(500).json({ error: "Error deleting decheterie" });
  }
}

// Check if the decheterie is reachable
async function isIDreachable(req) {
  let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
  let id = parseInt(req.params.id, 10);
  return decheteriesDispo.includes(id);
}

// Check if the decheterie is principal
async function idPrinciaple(req) {
  let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
  let decheteries = await models.Principale.findOne({
    where: {
      fk_decheterie: { [Sequelize.Op.in]: decheteriesDispo },
    },
  });
  return decheteries.dataValues.fk_principale;
}
