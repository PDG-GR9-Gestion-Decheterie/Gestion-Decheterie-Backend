import { models } from "../database/orm.js";
import { flattenObject, findDecheteriePrinciaple } from "./utils.js";
import Sequelize from "sequelize";

// Get tous les ramassage - /ramassages
export async function getRamassages(req, res) {
  try {
    let ramassages = null;
    let ramassagesData = [];
    let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
    ramassages = await models.Ramassage.findAll({
      where: {
        fk_decheterie: { [Sequelize.Op.in]: decheteriesDispo },
      },
    });
    if (ramassages === null) {
      throw new Error();
    }

    for (let ramassage of ramassages) {
      if (
        (req.user.fk_fonction == "Employé" ||
          req.user.fk_fonction == "Chauffeur") &&
        ramassage.dataValues.date < new Date().toISOString().split("T")[0]
      ) {
        continue;
      }
      let contenant = await models.Contenant.findByPk(
        ramassage.dataValues.fk_contenant
      );
      let employe = await models.Employe.findByPk(
        ramassage.dataValues.fk_employee
      );
      let decheterie = await models.Decheterie.findByPk(
        ramassage.dataValues.fk_decheterie
      );
      let vehicule = await models.Vehicule.findByPk(ramassage.fk_vehicule);
      let ramassageData = { ...ramassage.dataValues };
      if (contenant) {
        ramassageData = {
          ...ramassageData,
          ...flattenObject(contenant.dataValues, "contenant_"),
        };
      }
      if (employe) {
        ramassageData = {
          ...ramassageData,
          ...flattenObject(employe.dataValues, "employe_"),
        };
      }
      if (decheterie) {
        ramassageData = {
          ...ramassageData,
          ...flattenObject(decheterie.dataValues, "decheterie_"),
        };
      }
      if (vehicule) {
        ramassageData = {
          ...ramassageData,
          ...flattenObject(vehicule.dataValues, "vehicule_"),
        };
      }
      delete ramassageData.fk_contenant;
      delete ramassageData.fk_employee;
      delete ramassageData.fk_decheterie;
      delete ramassageData.fk_vehicule;
      delete ramassageData.contenant_fk_decheterie;
      delete ramassageData.decheterie_id;
      delete ramassageData.vehicule_fk_decheterie;
      delete ramassageData.employe_idlogin;
      delete ramassageData.employe_mdplogin;
      delete ramassageData.employe_datenaissance;
      delete ramassageData.employe_datedebutcontrat;
      delete ramassageData.employe_numtelephone;
      delete ramassageData.employe_typepermis;
      delete ramassageData.employe_fk_adresse;
      delete ramassageData.employe_fk_decheterie;
      delete ramassageData.employe_fk_fonction;

      ramassagesData.push(ramassageData);
    }
    res.status(200).json({ ramassagesData });
  } catch (err) {
    console.error("Error fetching ramassages:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Get un ramassage par id - /ramassages/:id
export async function getRamassageById(req, res) {
  try {
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let ramassage = null;

    ramassage = await models.Ramassage.findByPk(req.params.id);

    if (ramassage === null) {
      throw new Error();
    }
    if (
      (req.user.fk_fonction == "Employé" ||
        req.user.fk_fonction == "Chauffeur") &&
      ramassage.dataValues.date < new Date().toISOString().split("T")[0]
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let ramassageData = ramassage.dataValues;
    res.status(200).json({ ramassageData });
  } catch (err) {
    console.error("Error fetching ramassage:", err);
    res.status(404).json({ error: "Error" });
  }
}
// Créer un ramassage - /ramassages
export async function createRamassage(req, res) {
  try {
    let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
    if (
      !decheteriesDispo.find(
        (decheterie) => decheterie == req.body.fk_decheterie
      ) ||
      !(await isInRightDecheterie(req)) ||
      !(await isRightLicence(req.body))
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Créer un nouveau ramassage avec les données reçues
    const newRamassage = await models.Ramassage.create(req.body);
    await newRamassage.save();
    res.status(201).json({
      message: "Ramassage added successfully",
    });
  } catch (err) {
    console.error("Error adding ramassage:", err);
    res.status(500).json({ error: "Error adding ramassage" });
  }
}
// Mettre à jour un ramassage - /ramassages/:id
export async function updateRamassage(req, res) {
  try {
    if (
      !(await isIDreachable(req)) ||
      !(await isRightLicence(req.body)) ||
      !(await isInRightDecheterie(req))
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let ramassage = await models.Ramassage.findByPk(req.params.id);

    if (!ramassage) {
      throw new Error("Ramassage not found");
    }

    ramassage.set({
      ...req.body,
    });
    await ramassage.save();

    res.status(200).json({ message: "Ramassage updated successfully" });
  } catch (err) {
    console.error("Error updating ramassage:", err);
    res.status(500).json({ error: "Error updating ramassage" });
  }
}
// Supprimer un ramassage - /ramassages/:id
export async function deleteRamassage(req, res) {
  try {
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let ramassage = await models.Ramassage.findByPk(req.params.id);

    if (!ramassage) {
      throw new Error("Ramassage not found");
    }

    await ramassage.destroy(); // Supprimer le ramassage de la base de données
    res.status(200).json({ message: "Ramassage deleted successfully" });
  } catch (err) {
    console.error("Error deleting ramassage:", err);
    res.status(500).json({ error: "Error deleting ramassage" });
  }
}
async function isIDreachable(req) {
  let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
  let ramassagesData = await models.Ramassage.findAll({
    where: {
      fk_decheterie: { [Sequelize.Op.in]: decheteriesDispo },
    },
  });
  let ramassage = ramassagesData.find(
    (ramassage) => ramassage.id == req.params.id
  );
  if (!ramassage) {
    return false;
  }
  return true;
}

async function isRightLicence(ramassage) {
  let employe = await models.Employe.findByPk(ramassage.fk_employee);
  let vehicule = await models.Vehicule.findByPk(ramassage.fk_vehicule);

  if (!employe || !vehicule) {
    return false;
  }
  if (vehicule.type == "camion" && employe.typepermis !== "C") {
    return false;
  } else if (
    vehicule.type == "camionette" &&
    (employe.typepermis !== "B" || employe.typepermis !== "C")
  ) {
    return false;
  }
  return true;
}
async function isInRightDecheterie(req) {
  let contenant = await models.Contenant.findByPk(req.body.fk_contenant);
  let employe = await models.Employe.findByPk(req.body.fk_employee);
  let vehicule = await models.Vehicule.findByPk(req.body.fk_vehicule);

  let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
  if (!contenant || !employe || !vehicule) {
    return false;
  }

  console.log(contenant.fk_decheterie);
  console.log(employe.fk_decheterie);
  console.log(vehicule.fk_decheterie);
  console.log(decheteriesDispo);

  if (
    contenant.fk_decheterie !== req.body.fk_decheterie ||
    !decheteriesDispo.includes(parseInt(contenant.fk_decheterie, 10))
  ) {
    return false;
  }
  if (!decheteriesDispo.includes(parseInt(employe.fk_decheterie, 10))) {
    return false;
  }
  if (!decheteriesDispo.includes(parseInt(vehicule.fk_decheterie, 10))) {
    return false;
  }
  return true;
}
