import { models } from "../database/orm.js";
import bcrypt from "bcrypt";
import Sequelize from "sequelize";
import { flattenObject, findDecheteriePrinciaple } from "./utils.js";

// Get tous les employes - /employes
export async function getEmployees(req, res) {
  try {
    let employes = null;
    let employesData = [];
    let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
    employes = await models.Employe.findAll({
      where: {
        fk_decheterie: { [Sequelize.Op.in]: decheteriesDispo },
      },
    });
    if (employes === null) {
      throw new Error();
    }
    for (let employe of employes) {
      let decheterie = await models.Decheterie.findByPk(
        employe.dataValues.fk_decheterie
      );
      let adresse = await models.Adresse.findByPk(
        employe.dataValues.fk_adresse
      );
      let employeData = { ...employe.dataValues };
      if (decheterie) {
        employeData = {
          ...employeData,
          ...flattenObject(decheterie.dataValues, "decheterie_"),
        };
      }
      if (adresse) {
        employeData = {
          ...employeData,
          ...flattenObject(adresse.dataValues, "adresse_"),
        };
      }

      delete employeData.mdplogin;
      delete employeData.fk_adresse;
      delete employeData.fk_decheterie;
      delete employeData.decheterie_id;
      delete employeData.decheterie_fk_adresse;
      delete employeData.adresse_id;
      employesData.push(employeData);
    }
    res.status(200).json({ employesData });
  } catch (err) {
    console.error("Error fetching employes:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Get un employe par id - /employes/:id
export async function getEmployeeById(req, res) {
  try {
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let employe = null;

    employe = await models.Employe.findByPk(req.params.id);

    if (employe === null) {
      throw new Error();
    }

    let employeData = employe.dataValues;
    delete employeData.mdplogin;
    res.status(200).json({ employeData });
  } catch (err) {
    console.error("Error fetching employe:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Créer un employe - /employes
export async function createEmployee(req, res) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.mdplogin, salt);
    const newEmploye = await models.Employe.create({
      ...req.body,
      mdplogin: hashedPassword,
    });
    const newSuperieur = await models.Superviseur.create({
      fk_employee: newEmploye.idlogin,
      fk_superviseur: req.user.idlogin,
    });

    let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
    let id = parseInt(newEmploye.dataValues.fk_decheterie, 10);
    if (!decheteriesDispo.includes(id)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    await newEmploye.save();
    await newSuperieur.save();
    res.status(201).json({
      message: "Employe added successfully",
    });
  } catch (err) {
    console.error("Error adding employe:", err);
    res.status(500).json({ error: "Error adding employe" });
  }
}

// Mettre à jour un employe - /employes/:id
export async function updateEmployee(req, res) {
  try {
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let employe = null;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.mdplogin, salt);

    employe = await models.Employe.findByPk(req.params.id);

    if (!employe) {
      throw new Error("Employe not found");
    }

    employe.set({
      ...req.body,
      mdplogin: hashedPassword,
    });
    await employe.save();

    res.status(200).json({ message: "Employe updated successfully" });
  } catch (err) {
    console.error("Error updating employe:", err);
    res.status(500).json({ error: "Error updating employe" });
  }
}

// Supprimer un employe - /employes/:id
export async function deleteEmployee(req, res) {
  try {
    if (!(await isIDreachable(req))) {
      return res.status(403).json({ error: "Forbidden" });
    }
    let employe = null;
    let superieur = null;

    employe = await models.Employe.findByPk(req.params.id);
    superieur = await models.Superviseur.findOne({
      where: { fk_employee: req.params.id },
    });

    if (!employe) {
      throw new Error("Employe not found");
    }
    await superieur.destroy(); // Supprimer le superviseur de la base de données
    await employe.destroy(); // Supprimer le ramassage de la base de données
    res.status(200).json({ message: "Employe deleted successfully" });
  } catch (err) {
    console.error("Error deleting employe:", err);
    res.status(500).json({ error: "Error deleting employe" });
  }
}

// Recuperer le profil de l'employe connecté - /employes/profil
export async function getEmployeeProfile(req, res) {
  try {
    let employe = null;
    employe = await models.Employe.findByPk(req.user.idlogin);

    if (employe === null) {
      throw new Error();
    }

    let decheterie = await models.Decheterie.findByPk(
      employe.dataValues.fk_decheterie
    );

    let adresse = await models.Adresse.findByPk(employe.dataValues.fk_adresse);
    let employeData = { ...employe.dataValues };
    if (decheterie) {
      employeData = {
        ...employeData,
        ...flattenObject(decheterie.dataValues, "decheterie_"),
      };
    }
    if (adresse) {
      employeData = {
        ...employeData,
        ...flattenObject(adresse.dataValues, "adresse_"),
      };
    }

    delete employeData.mdplogin;
    delete employeData.fk_adresse;
    delete employeData.fk_decheterie;
    delete employeData.decheterie_id;
    delete employeData.decheterie_fk_adresse;
    delete employeData.adresse_id;
    res.status(200).json({ employeData });
  } catch (err) {
    console.error("Error fetching employe:", err);
    res.status(404).json({ error: "Error" });
  }
}

// Check if the employe is reachable by the user
async function isIDreachable(req) {
  let decheteriesDispo = await findDecheteriePrinciaple(req.user.idlogin);
  let employesData = await models.Employe.findAll({
    where: {
      fk_decheterie: { [Sequelize.Op.in]: decheteriesDispo },
    },
  });
  let employe = employesData.find(
    (employe) => employe.idlogin === req.params.id
  );
  if (!employe) {
    return false;
  }
  return true;
}
