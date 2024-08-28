import { models } from "../database/orm.js";

// Get tous les Adresses - /adresses
export async function getAdresses(req, res) {
  try {
    let adressesData = null;

    adressesData = await models.Adresse.findAll();
    if (adressesData === null) {
      throw new Error();
    }

    res.status(200).json({ adressesData });
  } catch (err) {
    console.error("Error fetching adresses:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Get une Adresse par id - /adresses/:id
export async function getAdresseById(req, res) {
  try {
    let adresse = null;

    adresse = await models.Adresse.findByPk(req.params.id);

    if (adresse === null) {
      throw new Error();
    }

    let adresseData = adresse.dataValues;
    res.status(200).json({ adresseData });
  } catch (err) {
    console.error("Error fetching adresse:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Créer une Adresse - /adresses
export async function createAdresse(req, res) {
  try {
    const newAdresse = await models.Adresse.create(req.body);
    await newAdresse.save();
    res.status(201).json({
      message: "Adresse added successfully",
    });
  } catch (err) {
    console.error("Error adding adresse:", err);
    res.status(500).json({ error: "Error adding adresse" });
  }
}
// Mettre à jour une Adresse - /adresses/:id
export async function updateAdresse(req, res) {
  try {
    let adresse = null;

    adresse = await models.Adresse.findByPk(req.params.id);

    if (!adresse) {
      throw new Error("Decheterie not found");
    }

    adresse.set({
      ...req.body,
    });
    await adresse.save();

    res.status(200).json({ message: "Adresse updated successfully" });
  } catch (err) {
    console.error("Error updating adresse:", err);
    res.status(500).json({ error: "Error updating adresse" });
  }
}
// Supprimer une Adresse - /adresses/:id
export async function deleteAdresse(req, res) {
  try {
    let adresse = null;

    adresse = await models.Adresse.findByPk(req.params.id);

    if (!adresse) {
      throw new Error("Contenant not found");
    }

    await adresse.destroy(); // Supprimer l'adresse de la base de données
    res.status(200).json({ message: "Adresse deleted successfully" });
  } catch (err) {
    console.error("Error deleting adresse:", err);
    res.status(500).json({ error: "Error deleting adresse" });
  }
}
