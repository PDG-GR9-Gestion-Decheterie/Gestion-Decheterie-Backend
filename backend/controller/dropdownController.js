import { models } from "../database/orm.js";

// Get tous les Fonctions - /fonctions
export async function getFonctions(req, res) {
  try {
    let FonctionsData = null;

    FonctionsData = await models.Fonction.findAll();
    if (FonctionsData === null) {
      throw new Error();
    }

    res.status(200).json({ FonctionsData });
  } catch (err) {
    console.error("Error fetching fonctions:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Get tous les Status - /status
export async function getStatus(req, res) {
  try {
    let StatusData = null;

    StatusData = await models.Status.findAll();
    if (StatusData === null) {
      throw new Error();
    }

    res.status(200).json({ StatusData });
  } catch (err) {
    console.error("Error fetching status:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Get tous les Dechets - /dechets
export async function getDechets(req, res) {
  try {
    let DechetsData = null;

    DechetsData = await models.Dechet.findAll();
    if (DechetsData === null) {
      throw new Error();
    }

    res.status(200).json({ DechetsData });
  } catch (err) {
    console.error("Error fetching dechets:", err);
    res.status(404).json({ error: "Error" });
  }
}
