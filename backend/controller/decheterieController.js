import { models } from "../database/orm.js";
import { flattenObject } from "./utils.js";

// Get tous les vehicules - /vehicules
export async function getVehicules(req, res) {
  try {
    let vehicules = null;
    let vehiculesData = [];
    vehicules = await models.Vehicule.findAll();
    if (vehicules === null) {
      throw new Error();
    }
    for (let vehicule of vehicules) {
      let decheterie = await models.Decheterie.findByPk(
        vehicule.dataValues.fk_decheterie
      );

      let vehiculeData = { ...vehicule.dataValues };
      if (decheterie) {
        vehiculeData = {
          ...vehiculeData,
          ...flattenObject(decheterie.dataValues, "decheterie_"),
        };
      }
      delete vehiculeData.fk_decheterie;
      vehiculesData.push(vehiculeData);
    }
    res.status(200).json({ vehiculesData });
  } catch (err) {
    console.error("Error fetching employes:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Get un vehicule par id - /vehicules/:id
export async function getVehiculeById(req, res) {
  try {
    let vehicule = null;

    vehicule = await models.Vehicule.findByPk(req.params.id);

    if (vehicule === null) {
      throw new Error();
    }

    let VehiculeData = vehicule.dataValues;
    res.status(200).json({ VehiculeData });
  } catch (err) {
    console.error("Error fetching employe:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Créer un vehicule - /vehicules
export async function createVehicule(req, res) {
  try {
    const newVehicule = await models.Vehicule.create(req.body);
    await newVehicule.save();
    res.status(201).json({
      message: "Vehicule added successfully",
    });
  } catch (err) {
    console.error("Error adding vehicule:", err);
    res.status(500).json({ error: "Error adding vehicule" });
  }
}
// Mettre à jour un vehicule - /vehicules/:id
export async function updateVehicule(req, res) {
  try {
    let vehicule = null;

    vehicule = await models.Vehicule.findByPk(req.params.id);

    if (!vehicule) {
      throw new Error("Vehicule not found");
    }

    vehicule.set({
      ...req.body,
    });
    await vehicule.save();

    res.status(200).json({ message: "Vehicule updated successfully" });
  } catch (err) {
    console.error("Error updating vehicule:", err);
    res.status(500).json({ error: "Error updating vehicule" });
  }
}
// Supprimer un vehicule - /vehicules/:id
export async function deleteVehicule(req, res) {
  try {
    let vehicule = null;

    vehicule = await models.Vehicule.findByPk(req.params.id);

    if (!vehicule) {
      throw new Error("Vehicule not found");
    }

    await vehicule.destroy(); // Supprimer le vehicule de la base de données
    res.status(200).json({ message: "Vehicule deleted successfully" });
  } catch (err) {
    console.error("Error deleting vehicule:", err);
    res.status(500).json({ error: "Error deleting vehicule" });
  }
}
