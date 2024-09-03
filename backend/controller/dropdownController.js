import { models } from "../database/orm.js";

// Get tous les Fonctions - /fonctions
export async function getFonctions(req, res) {
  try {
    let fonctionsData = null;

    fonctionsData = await models.Fonction.findAll();
    if (fonctionsData === null) {
      throw new Error();
    }

    res.status(200).json({ fonctionsData });
  } catch (err) {
    console.error("Error fetching fonctions:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Get tous les Status - /status
export async function getStatus(req, res) {
  try {
    let statusData = null;

    statusData = await models.Status.findAll();
    if (statusData === null) {
      throw new Error();
    }

    res.status(200).json({ statusData });
  } catch (err) {
    console.error("Error fetching status:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Get tous les Dechets - /dechets
export async function getDechets(req, res) {
  try {
    let dechetsData = null;

    dechetsData = await models.Dechet.findAll();
    if (dechetsData === null) {
      throw new Error();
    }

    res.status(200).json({ dechetsData });
  } catch (err) {
    console.error("Error fetching dechets:", err);
    res.status(404).json({ error: "Error" });
  }
}
