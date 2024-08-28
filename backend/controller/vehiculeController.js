import { models } from "../database/orm.js";
import { flattenObject, findDecheteriePrinciaple } from "./utils.js";

// Get tous les vehicules - /vehicules
export async function getVehicules(req, res) {
  try {
    let vehiculesDB = [];
    let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
    for (let idDecheterie of decheteriesDispo) {
      let vehicules = await models.Vehicule.findAll({
        where: {
          fk_decheterie: idDecheterie,
        },
      });
      vehiculesDB = vehiculesDB.concat(vehicules);
    }

    let vehiculesData = [];
    for (let vehicule of vehiculesDB) {
      let decheterie = await models.Decheterie.findByPk(vehicule.fk_decheterie);

      let vehiculeData = { ...vehicule.dataValues };
      if (decheterie) {
        vehiculeData = {
          ...vehiculeData,
          ...flattenObject(decheterie.dataValues, "decheterie_"),
        };
      }
      delete vehiculeData.fk_decheterie;
      delete vehiculeData.decheterie_fk_adresse;
      delete vehiculeData.decheterie_id;
      vehiculesData.push(vehiculeData);
    }
    res.status(200).json({ vehiculesData });
  } catch (err) {
    console.error("Error fetching vehicules:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Get un vehicule par id - /vehicules/:id
export async function getVehiculeById(req, res) {
  try {
    let vehicule = null;
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    vehicule = await models.Vehicule.findByPk(req.params.id);

    if (vehicule === null) {
      throw new Error();
    }

    let vehiculeData = vehicule.dataValues;
    res.status(200).json({ vehiculeData });
  } catch (err) {
    console.error("Error fetching vehicule:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Créer un vehicule - /vehicules
export async function createVehicule(req, res) {
  try {
    let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
    if (
      !decheteriesDispo.find(
        (decheterie) => decheterie == req.body.fk_decheterie
      )
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }
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
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
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
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
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
async function isIDreachable(req) {
  let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
  let vehiculesData = [];
  for (let idDecheterie of decheteriesDispo) {
    let vehicules = await models.Vehicule.findAll({
      where: {
        fk_decheterie: idDecheterie,
      },
    });
    vehiculesData = vehiculesData.concat(vehicules);
  }
  let vehicule = vehiculesData.find(
    (vehicule) => vehicule.dataValues.immatriculation == req.params.id
  );
  if (!vehicule) {
    return false;
  }
  return true;
}
