import { models } from "../database/orm.js";
import { flattenObject } from "./utils.js";

// Get tous les decheteries - /decheteries
export async function getDecheteries(req, res) {
  try {
    let decheteries = null;
    let decheteriesData = [];
    decheteries = await models.Decheterie.findAll();
    if (decheteries === null) {
      throw new Error();
    }
    for (let decheterie of decheteries) {
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
    let decheterie = null;

    decheterie = await models.Decheterie.findByPk(req.params.id);

    if (decheterie === null) {
      throw new Error();
    }

    let DecheterieData = decheterie.dataValues;
    res.status(200).json({ DecheterieData });
  } catch (err) {
    console.error("Error fetching decheterie:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Créer une decheterie - /decheteries
export async function createDecheterie(req, res) {
  try {
    const newDecheterie = await models.Decheterie.create(req.body);
    await newDecheterie.save();
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
    let decheterie = null;

    decheterie = await models.Decheterie.findByPk(req.params.id);

    if (!decheterie) {
      throw new Error("Decheterie not found");
    }

    await decheterie.destroy(); // Supprimer le decheterie de la base de données
    res.status(200).json({ message: "Decheterie deleted successfully" });
  } catch (err) {
    console.error("Error deleting decheterie:", err);
    res.status(500).json({ error: "Error deleting decheterie" });
  }
}
