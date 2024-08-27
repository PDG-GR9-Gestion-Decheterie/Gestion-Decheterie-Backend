import { models } from "../database/orm.js";
import { findDecheteriePrinciaple } from "./utils.js";

// Get tous les Contenants - /contenants
export async function getContenantsDecheterie(req, res) {
  try {
    let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);

    let contenantsData = [];
    for (let idDecheterie of decheteriesDispo) {
      let contenants = await models.Contenant.findAll({
        where: {
          fk_decheterie: idDecheterie,
        },
      });
      contenantsData = contenantsData.concat(contenants);
    }
    res.status(200).json({ contenantsData });
  } catch (err) {
    console.error("Error fetching contenants:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Get une Contenant par id - /contenants/:id
export async function getContenantById(req, res) {
  try {
    let contenant = null;
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    contenant = await models.Contenant.findByPk(req.params.id);

    if (contenant === null) {
      throw new Error();
    }

    let contenantData = contenant.dataValues;
    res.status(200).json({ contenantData });
  } catch (err) {
    console.error("Error fetching contenant:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Créer une Contenant - /contenants
export async function createContenant(req, res) {
  try {
    let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);

    if (
      !decheteriesDispo.find(
        (decheterie) => decheterie == req.body.fk_decheterie
      )
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Validate the integrity of the contenant before creating it
    if (req.body.nom === "palette") {
      if (
        req.body.nbcadre < 0 ||
        req.body.nbcadre > 4 ||
        req.body.nbcadre === null ||
        req.body.taille !== null
      ) {
        return res.status(403).json({ error: "Forbidden" });
      }
    } else if (req.body.nom === "big bag") {
      if (
        (req.body.taille !== "petit" &&
          req.body.taille !== "moyen" &&
          req.body.taille !== "grand") ||
        req.body.nbcadre !== null
      ) {
        return res.status(403).json({ error: "Forbidden" });
      }
    } else {
      if (req.body.nbcadre != null || req.body.taille != null) {
        return res.status(403).json({ error: "Forbidden" });
      }
    }

    const newContenant = await models.Contenant.create(req.body);
    await newContenant.save();
    res.status(201).json({
      message: "Contenant added successfully",
    });
  } catch (err) {
    console.error("Error adding contenant:", err);
    res.status(500).json({ error: "Error adding contenant" });
  }
}
// Mettre à jour une Contenant - /contenants/:id
export async function updateContenant(req, res) {
  try {
    let contenant = null;
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    contenant = await models.Contenant.findByPk(req.params.id);

    if (!contenant) {
      throw new Error("Decheterie not found");
    }

    contenant.set({
      ...req.body,
    });
    await contenant.save();

    res.status(200).json({ message: "Contenant updated successfully" });
  } catch (err) {
    console.error("Error updating contenant:", err);
    res.status(500).json({ error: "Error updating contenant" });
  }
}
// Supprimer une Contenant - /contenants/:id
export async function deleteContenant(req, res) {
  try {
    let contenant = null;
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    contenant = await models.Contenant.findByPk(req.params.id);

    if (!contenant) {
      throw new Error("Contenant not found");
    }

    await contenant.destroy(); // Supprimer le contenant de la base de données
    res.status(200).json({ message: "Contenant deleted successfully" });
  } catch (err) {
    console.error("Error deleting contenant:", err);
    res.status(500).json({ error: "Error deleting contenant" });
  }
}

async function isIDreachable(req) {
  let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
  let contenantsData = [];
  for (let idDecheterie of decheteriesDispo) {
    let contenants = await models.Contenant.findAll({
      where: {
        fk_decheterie: idDecheterie,
      },
    });
    contenantsData = contenantsData.concat(contenants);
  }
  let contenant = contenantsData.find(
    (contenant) => contenant.dataValues.id == req.params.id
  );
  if (!contenant) {
    return false;
  }
  return true;
}
